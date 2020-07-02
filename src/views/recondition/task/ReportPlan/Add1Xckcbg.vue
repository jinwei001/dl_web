<template>
  <div class="xs-hastitle">
    <el-dialog
      :visible.sync="showDialog"
      :title="title"
      v-dialogDrag
      :center="true"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
        class="required-ruleForm"
      >
        <!-- <el-form-item label="编号：">
          <el-input v-model="ruleForm.serialnumber" placeholder="请输入内容"></el-input>
        </el-form-item>-->
        <el-form-item label="勘察地点：" prop="prospectingplace">
          <el-input v-model="ruleForm.prospectingplace" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="勘察单位：">
          <el-input v-model="ruleForm.prospectingunits" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="勘察工程：" :disabled="oldPlanstarts">
          <el-input v-model="ruleForm.prospectingengineering" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="勘察负责人：" prop="prospectinghead">
          <el-input v-model="ruleForm.prospectinghead" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="勘察时间：" prop="prospectingdate">
          <el-date-picker
            type="date"
            placeholder="开始时间"
            v-model="ruleForm.prospectingdate"
            :picker-options="startDatePicker"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="勘察配合单位：">
          <el-input v-model="ruleForm.prospectingcooperateunit" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item :label="`勘察${$xl}:`" prop="xlid">
          <el-select v-model="ruleForm.xlid" filterable clearable placeholder="请选择">
            <el-option
              v-for="item in selection.xlmc"
              :key="item.id"
              :label="item.lineName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作任务:" prop="jobtask">
          <el-input v-model="ruleForm.jobtask" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
            class="upload-demo"
            ref="upload"
            action="#"
            :file-list="fileList"
            :limit="1"
            :on-change="change"
            :on-exceed="onexceed"
            :auto-upload="false"
            accept=".xls, .xlsx, .doc, .PDF"
          >
            <el-button type="primary">上传文件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GropList, UserList, downloadImg } from "@/api/public";
import "@/styles/myStyle/index.scss";
import {
  dlSelect,
  jcbzSelect,
  jcrSelect,
  plangetSb, // 获取 设备名称
  planAdd as add,
  planEdit as edit,
  planList as detail
} from "@/api/liveDetectionManage";
import { getLineSelect } from "@/api/recondition/yearPlan";
import {
  addoverhauLiveinvestigationreport,
  getoverhauLiveinvestigationreport,
  editoverhauLiveinvestigationreport
} from "@/api/recondition/jobtask";
export default {
  props: {
    /**
     * 接收是否打开页面
     */
    openID: "",
    jobtaskid: "",
    isEdit: {
      type: Boolean,
      default: false
    },
    oldobjplanpn: {
      //老旧来源参数
      type: Object,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      id: this.jobtaskid,
      objId: this.openID,
      edit: this.isEdit,
      title: "",
      fileList: [],
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate(),
      isShowDialog: false,
      ddjc_sb_arr: {
        sb: [
          [this.$dl + "终端", this.$dl + "接头", this.$dl + "分支箱", "接地箱"],
          [this.$dl + "终端", this.$dl + "接头", "交叉互联箱", "接地箱"],
          [this.$dl + "终端", this.$dl + "接头"]
        ]
      },
      selection: {
        xlmc: []
      },
      dwArr: ["年", "半年", "季", "月", "周", "天"],
      jcrSelectArr: [], // 检测人
      ruleForm: {

      },
      rules: {
        // jcdw: [{ required: true, message: '请输入检测单位', trigger: 'change' }]
        prospectinghead: [
          { required: true, message: "请输入勘察负责人", trigger: "change" }
        ],
        prospectingdate: [{required: true, message: "请选择勘察时间", trigger: "change"}],
        xlid: [{required: true, message: "请选择勘察"+this.$xl, trigger: "change"}],
        prospectingplace: [{required: true, message: "请输入勘察地点", trigger: "change"}],
        jobtask: [{required: true, message: "请输入工作任务", trigger: "change"}]
      },
      showDialog: true, //打开弹框
      oldPlanstarts: false
    };
  },
  created() {},
  mounted() {
    this.getSelectionList();
    console.log(this.edit);
    if (this.edit) {
      this.title = "编辑";
      this.getData();
    } else {
      this.title = "新增";
    }
  },
  methods: {
    getData() {
      // 获取列表数据
      getoverhauLiveinvestigationreport(this.$qs.stringify({objId: this.objId})).then(res => {
        this.ruleForm = res.data.rows[0];
        const obj = {};
        this.$set(obj, "name", this.ruleForm.filename);
        this.$set(obj, "url", this.ruleForm.fileurl);
        this.fileList.push(obj);
      });
    },
    getSelectionList() {
      // 获取线路名称下拉框
      getLineSelect(this.$qs.stringify({ lineNature: "主线" })).then(
        response => {
          if (response.status == 200) {
            this.selection.xlmc = response.data.rows;
          }
        }
      );
    },
    getLine(e) {
      this.tableData = e.lines;
      this.tableSelect = [];

      for (let n = 0; n < this.tableData.length; n++) {
        this.tableSelect.push({
          patrolCycle: "",
          patrolType: "",
          lastPlanTime: ""
        });
      }
    },
    /** xl change 获取dl */
    getDlList(lineId) {
      let dydl = this.selection.linesSelectArr.filter(res => {
        if (res.id == this.ruleForm.xlid) {
          return res;
        }
      });
      this.ruleForm.dydj = dydl[0] ? dydl[0]["voltageRank"] : "";
      if (!dydl[0]) {
        this.selection.dlSelectArr = [];
        this.selection.sbmcArr = [];
        this.ruleForm.dlid = "";
        this.ruleForm.sbmc = "";
        return;
      }

      dlSelect({ lineId }).then(res => {
        // dl
        this.selection.dlSelectArr = res.data.rows;
        this.ruleForm.dlid = "";
      });
      this.ruleForm.sbmc = "";
      if (!!this.ruleForm.sblx && !!this.ruleForm.xlid) {
        plangetSb({ xlid: lineId, sblx: this.ruleForm.sblx }).then(
          res => {
            // 设备名称 plangetSb
            this.selection.sbmcArr = res.data.data;
          },
          () => {
            this.selection.sbmcArr = [];
          }
        );
      } else {
        this.selection.sbmcArr = [];
      }
    },

    /** dl change 获xb */
    setXw() {
      let xwdl = this.selection.dlSelectArr.filter(res => {
        if (res.id == this.ruleForm.dlid) {
          return res;
        }
      });
      this.ruleForm.xw = xwdl[0] ? xwdl[0]["phase"] : "";
    },
    /** 设备类型  change 获取设备名称 */
    getSblxList(ind) {
      this.ruleForm.sbmc = "";

      if (!!this.ruleForm.sblx && !!this.ruleForm.xlid) {
        plangetSb({ xlid: this.ruleForm.xlid, sblx: ind }).then(res => {
          // 设备名称 plangetSb
          this.selection.sbmcArr = res.data.data;
        });
      } else {
        this.selection.sbmcArr = [];
        this.ruleForm.sbmc = "";
      }
    },

    /** 检测班组 获取 检测人 */
    getJcrList(groupname) {
      this.ruleForm.jcr = null;
      jcrSelect(groupname).then(res => {
        // dl

        this.jcrSelectArr = res.data.data;
      });
    },
    /**
     * 取消按钮
     */
    handleClose() {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.$emit("childFn", {
            showDialog: false
          });
        })
        .catch(_ => {});
    },
    /**
     * 确认按钮
     */
    SuerFun() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          var formdata = new FormData();
          console.log(this.fileList);
          if (this.fileList.length !== 0) {
            let filel = this.fileList[0]["raw"];
            if (filel) { 
              formdata.append("file", filel);
            } else {
              formdata.append("file", null);
            }
          }

          
          formdata.append("prospectingunits", this.ruleForm.prospectingunits);
          formdata.append(
            "prospectingengineering",
            this.ruleForm.prospectingengineering
          );
          formdata.append("prospectingplace", this.ruleForm.prospectingplace);
          formdata.append("jobtask", this.ruleForm.jobtask);
          formdata.append("prospectinghead", this.ruleForm.prospectinghead);
          formdata.append("prospectingdate", this.ruleForm.prospectingdate);
          formdata.append(
            "prospectingcooperateunit",
            this.ruleForm.prospectingcooperateunit
          );
          formdata.append("xlid", this.ruleForm.xlid);
          formdata.append("serialnumber", this.ruleForm.serialnumber);
          if (this.edit) {
            formdata.append("objId", this.ruleForm.objId);
            if (this.fileList.length == 0) {
              formdata.append("filename", this.ruleForm.filename);
            }
            editoverhauLiveinvestigationreport(formdata).then(res => {
              if (res.data.code == 0) {
                this.showDialog = false;
                this.$emit("childFn", {
                  showDialog: false
                });
                this.$message({ message: "保存成功", type: "success" });
                this.$parent.getData();
              }
            });
          } else {
            formdata.append("jobtaskid", this.id)
            addoverhauLiveinvestigationreport(formdata).then(res => {
              if (res.data.code == 0) {
                this.showDialog = false;
                this.$emit("childFn", {
                  showDialog: false
                });
                this.$message({ message: "保存成功", type: "success" });
                this.$parent.getData();
              }
            });
          }
        }
      });
    },
    /**上传按钮触发 */
    change(file, fileList) {
      this.fileList = fileList;
      console.log(this.fileList);
    },
    onexceed(file, fileList) {
      this.$message({
        message: "只能上传一个文件，请先删除文件！！！",
        type: "warning"
      });
    },
    parentFn(val) {
      this.isShowDialog = false;
    },

    /**
     * 选择通道按钮--取消按钮
     */
    selecthandleClose() {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.selectshowDialog = false;
        })
        .catch(_ => {});
    },
    beginDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.ruleForm.jhjssj) {
            //如果结束时间不为空，则小于结束时间
            return new Date(self.ruleForm.jhjssj).getTime() < time.getTime();
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      };
    },
    processDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.ruleForm.jhkssj) {
            //如果开始时间不为空，则结束时间大于开始时间
            return new Date(self.ruleForm.jhkssj).getTime() > time.getTime();
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      };
    }
  }
};
</script>
<style lang="scss" scope>
.el-select {
  width: 100%;
}
.el-date-editor.el-input {
  width: 100%;
}
</style>
