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
        <el-form-item :label="`${$dydj}：`" prop="dydj">
          <el-select v-model="ruleForm.dydj" @change="getxl()" placeholder="请选择">
            <el-option
              v-for="item in selection.dydj"
              :key="item.objId"
              :label="item.bzmc"
              :value="item.bzmc"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="`${$xl}名称：`" prop="xlid">
          <el-select v-model="ruleForm.xlid" @change="getywbz()"  filterable  clearable placeholder="请选择">
            <el-option
              v-for="item in selection.xlmc"
              :key="item.id"
              :label="item.lineName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运维班组：" >
         <el-input v-model="ruleForm.ywbz"></el-input>
        </el-form-item>
        <el-form-item label="设备主人：" >
         <el-input v-model="ruleForm.sbzr"></el-input>
        </el-form-item>
        <el-form-item label="实施单位:" prop="implementunit">
          <el-input v-model="ruleForm.implementunit" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="配合单位:" prop="cooperateunit">
          <el-input v-model="ruleForm.cooperateunit" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="工作日期：" prop="jobdate">
          <el-date-picker
            type="date"
            placeholder="请选择时间"
            v-model="ruleForm.jobdate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
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
import { getLineSelect, getSelectMultiple } from "@/api/recondition/yearPlan";
import {
  addoverhauJob,
  editoverhauJob,
  getoverhauJob
} from "@/api/recondition/jobtask";
export default {
  props: {
    
    /**
     * 接收是否打开页面
     */
    openID: "",
    jobtaskid: '',
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
        ]
      },
      fileList: [],
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
        xlmc: '',
        ywbz: '',
        sbzr: ''
      },
      rules: {
        // jcdw: [{ required: true, message: '请输入检测单位', trigger: 'change' }]
        dydj: [{required: true, message: '请选择停电时间', trigger: 'change'}],
        implementunit: [{required: true, message: '请输入实施单位', trigger: 'change'}],
        cooperateunit: [{required: true, message: '请输入配合单位', trigger: 'change'}],
        jobdate: [{required: true, message: '请选择工作日期', trigger: 'change'}]
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
      getoverhauJob(this.$qs.stringify({objId: this.objId})).then(res => {
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
    getxl() {
      getLineSelect(this.$qs.stringify({voltageRank: this.ruleForm.dydj,lineNature: "主线"})).then(res => {
        this.selection.xlmc = res.data.rows
      })
    },
    getywbz() {
      this.selection.xlmc.forEach(item => {   
        if(this.ruleForm.xlid == item.id) {
          this.ruleForm.ywbz = item.groupName
          this.ruleForm.sbzr = item.facilityMaster
        }
      })
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
          if (this.edit) {
            editoverhauJob(this.$qs.stringify(this.ruleForm)).then(res => {
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
            this.ruleForm.jobtaskid = this.id
            addoverhauJob(this.$qs.stringify(this.ruleForm)).then(res => {
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
    parentFn(val) {
      this.isShowDialog = false;
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
