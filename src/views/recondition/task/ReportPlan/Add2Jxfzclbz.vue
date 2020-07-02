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
        <el-form-item label="编制人：">
          <el-input v-model="ruleForm.compilingpersonnel" disabled></el-input>
        </el-form-item>
        <el-form-item label="编制日期：" prop="compilingdate">
          <el-date-picker
            type="date"
            placeholder="开始时间"
            v-model="ruleForm.compilingdate"
            :picker-options="startDatePicker"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="勘察单编号：" prop="investigationnum">
          <el-input v-model="ruleForm.investigationnum"></el-input>
        </el-form-item>
        <el-form-item label="检修班组：" prop="groupid">
          <el-select v-model="ruleForm.groupid" clearable placeholder="请选择">
            <el-option
              v-for="item in selection.gzbz"
              :key="item.objId"
              :label="item.groupname"
              :value="item.objId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="施工单位：" prop="constructionunit">
          <el-input v-model="ruleForm.constructionunit"></el-input>
        </el-form-item>
        <el-form-item :label="`检修${$xl}：`" prop="xlid">
          <el-select v-model="ruleForm.xlid" filterable placeholder="请选择">
            <el-option
              v-for="item in selection.xlmc"
              :key="item.id"
              :label="item.lineName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="检修地点:" prop="repairsite">
          <el-input v-model="ruleForm.repairsite" placeholder="请输入内容"></el-input>
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
import { upload } from "@/api/liveDetectionManage/quality";
import {
  getLineSelect,
  getSelectMultiple,
  getLineGroup
} from "@/api/recondition/yearPlan";
import {
  addoverhauConstructionplan,
  editoverhauAuxiliarystrategy,
  getoverhauAuxiliarystrategy
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
      edit: this.isEdit,
      objId: this.openID,
      title: "",
      selection: {
        xlmc: [],
        dydj: [],
        qxdj: [
          { bzmc: "一般", bzid: 1 },
          { bzmc: "危急", bzid: 2 },
          { bzmc: "严重", bzid: 3 }
        ],
        gzlx: [],
        gzbz: []
      },
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
      dwArr: ["年", "半年", "季", "月", "周", "天"],
      jcrSelectArr: [], // 检测人
      ruleForm: {
        xlmc: "",
        fileurl: ""
      },
      rules: {
        // jcdw: [{ required: true, message: '请输入检测单位', trigger: 'change' }]
        constructionunit: [
          { required: true, message: "请输入施工单位", trigger: "change" }
        ],
        xlid: [
          {
            required: true,
            message: "请选择" + this.$xl + "名称",
            trigger: "change"
          }
        ],
        repairsite: [
          { required: true, message: "请输入检修地点", trigger: "change" }
        ],
        groupid: [
          { required: true, message: "请选择检修班组", trigger: "change" }
        ],
        compilingdate: [
          { required: true, message: "请选择编制日期", trigger: "change" }
        ],
        investigationnum: [
          { required: true, message: "请输入勘察单编号", trigger: "change" }
        ]
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
      this.ruleForm.compilingpersonnel = this.$store.getters.name;
    }
  },
  methods: {
    getData() {
      // 获取列表数据
      getoverhauAuxiliarystrategy(
        this.$qs.stringify({ objId: this.objId })
      ).then(res => {
        this.ruleForm = res.data.rows[0];
        if (this.ruleForm.fileurl) {
          const obj = {};
          this.$set(obj, "name", this.ruleForm.filename);
          this.$set(obj, "url", this.ruleForm.fileurl);
          this.fileList.push(obj);
        }
      });
    },
    getXl() {
      // 获取线路名称下拉框
      getLineSelect(
        this.$qs.stringify({
          lineNature: "主线",
          voltageRank: this.ruleForm.dydj
        })
      ).then(response => {
        if (response.status == 200) {
          this.selection.xlmc = response.data.rows;
        }
      });
     
    },
    getSelectionList() {
       // 获取xl班组
      getLineGroup().then(res => {
        this.selection.gzbz = res.data.rows;
      });
      // 获取线路名称下拉框
      getLineSelect(this.$qs.stringify({ lineNature: "主线" })).then(
        response => {
          if (response.status == 200) {
            this.selection.xlmc = response.data.rows;
          }
        }
      );
      // 获取任务来源 设备名称
      getSelectMultiple(
        this.$qs.stringify({
          fzids:
            "LINE_DEVICE_TYPE,JXSY_JOB_NATRUE,JXSY_JOB_CLASS,JXSY_JOB_TYPE,JXSY_DDGX,JXSY_PLAN_ADJUSTWHY,CABLE_VOLTAGE_RANK"
        })
      ).then(res => {
        this.selection.sblx = res.data.data.LINE_DEVICE_TYPE;
        this.selection.gzxz = res.data.data.JXSY_JOB_NATRUE;
        this.selection.gzfl = res.data.data.JXSY_JOB_CLASS;
        this.selection.jhtzyy = res.data.data.JXSY_PLAN_ADJUSTWHY;
        this.selection.gzlx = res.data.data.JXSY_JOB_TYPE;
        this.selection.tdgx = res.data.data.JXSY_DDGX;
        this.selection.dydj = res.data.data.CABLE_VOLTAGE_RANK;
      });
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
          var formdata = {};
          formdata.compilingpersonnel = this.ruleForm.compilingpersonnel;

          formdata.compilingdate = this.ruleForm.compilingdate;
          formdata.investigationnum = this.ruleForm.investigationnum;
          formdata.groupid = this.ruleForm.groupid;
          this.selection.gzbz.forEach(item => {
            if (this.ruleForm.groupid == item.objId) {
              formdata.groupname = item.groupname;
            }
          });
          formdata.constructionunit = this.ruleForm.constructionunit;
          formdata.xlid = this.ruleForm.xlid
          this.selection.xlmc.forEach(item => {
            if (this.ruleForm.xlid == item.id) {
              formdata.xlmc = item.lineName;
            }
          });
          formdata.repairsite = this.ruleForm.repairsite;
          formdata.fileurl = this.ruleForm.fileurl;
          formdata.jobtaskid = this.id;
          // console.log('formdata :>> ', formdata);
          addoverhauConstructionplan(formdata).then(res => {
            if (res.data.code == 0) {
              this.$message.success("新增成功");
              this.$emit("childFn", {
                showDialog: false
              });
            } else {
              this.$message.error(res.data.msg);
              this.$emit("childFn", {
                showDialog: false
              });
            }
          });
        }
      });
    },
    /**上传按钮触发 */
    change(file, fileList) {
      this.fileList = fileList;
      console.log("file :>> ", file);
      console.log(this.fileList);
      let data = new FormData();
      data.append("file", file.raw);
      data.append("type", "jxsgfabz");
      upload(data).then(res => {
        if (res.data.code == 0) {
          this.ruleForm.fileurl = res.data.msg;
        } else {
          this.$message.error(res.data.msg);
        }
      });
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
