<template>
  <div class="hastitle">
    <el-dialog
      :visible.sync="showDialog"
      :title = title
      :center="true"
      top="10vh"
      v-dialogDrag
      :before-close="handleClose"
    >
      <el-form
        ref="dataForm"
        :model="form"
        label-position="left"
        :rules="dataForm"
        style="width:100% ;margin: 0 auto;"
      >
        <div class="Form-title">
          <div class="form-item">
            <label class="form-title"></label>
          </div>
        </div>
        <div class="Form-input">
          <el-form-item label="编制人：" label-width="150px" style="width:50%;text-align:right">
            <el-input v-model="form.compilingpersonnel" clearable disabled />
          </el-form-item>
          <el-form-item :label="`检修${$xl}：`" label-width="150px" style="width: 50%;">
            <el-select
              v-model="form.xlid"
              clearable
              filterable
              :disabled="isdisabled"
              placeholder="请选择"
              @change="getsbmc"
            >
              <el-option
                v-for="item in selection.jxxl"
                :key="item.id"
                :label="item.lineName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="工作内容：" label-width="150px" prop="jobcontent" style="width:50%">
            <el-input v-model="form.jobcontent" clearable :disabled="isdisabled" />
          </el-form-item>
          <el-form-item label="停电范围：" label-width="150px" style="width:50%">
            <el-input v-model="form.powercutscope" clearable :disabled="isdisabled1" />
          </el-form-item>
          
        </div>
        <div class="Form-input">
          <el-form-item label="任务来源：" label-width="150px" style="width:50%">
            <el-select
              v-model="form.tasksourcename"
              clearable
              placeholder="请选择"
              :disabled="isdisabled"
              @change="getsbmc"
            >
              <el-option
                v-for="item in selection.work"
                :key="item.objId"
                :label="item.bzmc"
                :value="item.bzmc"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务等级：" label-width="150px" style="width:50%">
            <el-select v-model="form.tasklevel" clearable placeholder="请选择" :disabled="isdisabled">
              <el-option
                v-for="item in selection.rwdj"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="工作班组：" label-width="150px" style="width:50%">
            <el-select v-model="form.groupid" clearable placeholder="请选择" :disabled="isdisabled">
              <el-option
                v-for="item in selection.gzbz"
                :key="item.objId"
                :label="item.groupname"
                :value="item.objId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否停电：" label-width="150px" prop="ispowercut" style="width:50%">
            <el-select v-model="form.ispowercut" clearable placeholder="请选择" :disabled="isdisabled" @change="istd(form.ispowercut)">
              <el-option
                v-for="item in selection.sftd"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="设备类型：" label-width="150px" style="width:50%">
            <el-select
              v-model="form.devicetypename"
              clearable
              multiple
              placeholder="请选择"
              :disabled="isdisabled"
              @change="getsbmc"
            >
              <el-option
                v-for="item in selection.sblx"
                :key="item.objId"
                :label="item.bzmc"
                :value="item.bzmc"
              ></el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item label="计划开始时间：" label-width="150px" prop="planstarttime" style="width:50%">
            <el-date-picker
              style="width: 100%;"
              :picker-options="startDatePicker"
              v-model="form.planstarttime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期时间"
              :disabled="isdisabled"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="计划结束时间：" label-width="150px" prop="planendtime" style="width:50%">
            <el-date-picker
              style="width: 100%;"
              v-model="form.planendtime"
              :picker-options="endDatePicker"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期时间"
              :disabled="isdisabled"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="是否带电作业：" label-width="150px"  style="width:50%">
            <el-select v-model="form.ischarged" clearable placeholder="请选择" :disabled="isdisabled">
              <el-option
                v-for="item in selection.sfdd"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="是否委外：" label-width="150px" style="width:50%">
            <el-select
              v-model="form.isoutsourcing"
              clearable
              placeholder="请选择"
              :disabled="isdisabled"
            >
              <el-option
                v-for="item in selection.sfww"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工作性质：" label-width="150px" style="width:50%">
            <el-select v-model="form.jobnature" clearable placeholder="请选择" :disabled="isdisabled">
              <el-option
                v-for="item in selection.gzxz"
                :key="item.bzid"
                :label="item.bzmc"
                :value="item.bzid"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="调度管辖：" label-width="150px" style="width:50%">
            <el-select
              v-model="form.schedulingjurisdiction"
              clearable
              placeholder="请选择"
              :disabled="isdisabled"
            >
              <el-option
                v-for="item in selection.tdgx"
                :key="item.bzid"
                :label="item.bzmc"
                :value="item.bzid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工作分类：" label-width="150px"  style="width:50%">
            <el-select v-model="form.jobclass" clearable placeholder="请选择" :disabled="isdisabled">
              <el-option
                v-for="item in selection.gzfl"
                :key="item.bzid"
                :label="item.bzmc"
                :value="item.bzid"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          
          <el-form-item
            label="是否有送电方案："
            label-width="150px"
            style="width:50%;line-height:20px"
          >
            <el-select
              v-model="form.ispowerplan"
              clearable
              placeholder="请选择"
              :disabled="isdisabled"
            >
              <el-option
                v-for="item in selection.sfsd"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="工作类型：" label-width="150px"  style="width:50%">
            <el-select v-model="form.jobtype" clearable placeholder="请选择" :disabled="isdisabled">
              <el-option
                v-for="item in selection.gzlx"
                :key="item.bzid"
                :label="item.bzmc"
                :value="item.bzid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计划停电开始时间：" label-width="150px" style="width:50%">
            <el-date-picker
              style="width: 100%;"
              :picker-options="startDatePicker1"
              v-model="form.powercutplanstrattime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期时间"
              :disabled="isdisabled"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="计划停电结束时间：" label-width="150px" style="width:50%">
            <el-date-picker
              style="width: 100%;"
              :picker-options="endDatePicker1"
              v-model="form.powercutplanendtime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期时间"
              :disabled="isdisabled"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="大修技改项目编号：" label-width="150px" style="width:50%">
            <el-input v-model="form.dxjgxmbh" clearable :disabled="isdisabled" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="计划新增调整原因：" label-width="150px" style="width:50%">
            <el-select v-model="form.planaddwhy" clearable placeholder="请选择" :disabled="isdisabled">
              <el-option
                v-for="item in selection.jhtzyy"
                :key="item.bzid"
                :label="item.bzmc"
                :value="item.bzid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="复役要求：" label-width="150px" style="width:50%">
            <el-input v-model="form.fyyq" clearable :disabled="isdisabled" />
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" v-if="addbtn || editbtn" @click="save">保存</el-button>
        <el-button class="onSearch" v-if="addbtn || editbtn" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getLineSelect,
  getSelectMultiple,
  getselectByLx,
  getLineGroup
} from "@/api/recondition/yearPlan";
import { add, edit, getData } from "@/api/recondition/weekPlan";
export default {
  props: {
    isadd: {
      type: Boolean
    },
    openId: "",
    isedit: "",
    isview: ""
  },
  data() {
    return {
      title: '',
      startDatePicker: this.beginDate(), // 时间选择器
      endDatePicker: this.processDate(),
      startDatePicker1: this.beginDate1(), // 时间选择器
      endDatePicker1: this.processDate1(),
      value1: "",
      isdisabled: false,
      isdisabled1: true,
      addbtn: this.isadd,
      viewbtn: this.isedit,
      editbtn: this.isedit,
      showDialog: true,
      form: {
        devicetype: [],
        powercutscope: '',
        objId: this.openId
      },
      selection: {
        ywbz: [],
        jxxl: [],
        sblx: [],
        gzbz: [],
        gzlx: [],
        gzfl: [],
        tdgx: [],
        jhtzyy: [],
        gzxz: [],
        rwdj: [{name: "一般任务", value: "1"},{name: "重要任务", value: "2"},{name: "紧急任务", value: "3"}],
        sftd: [
          { name: "是", value: "1" },
          { name: "否", value: "2" }
        ],
        sfdd: [
          { name: "是", value: "1" },
          { name: "否", value: "2" }
        ],
        sfww: [
          { name: "是", value: "1" },
          { name: "否", value: "2" }
        ],
        zt: [
          { name: "已执行", value: "1" },
          { name: "未执行", value: "2" }
        ],
        sfsd: [
          { name: "是", value: "1" },
          { name: "否", value: "2" }
        ],
        sbmc: []
      },
      dataForm: {
        compilingpersonnel: [
          {
            required: true,
            message: "请输入编制人",
            trigger: "change"
          }
        ],
        xlmc: [
          {
            required: true,
            message: "请输入" + this.$xl + "名称",
            trigger: "change"
          }
        ],
        devicetypename: [
          {
            required: true,
            message: "请选择设备类型",
            trigger: "change"
          }
        ],
        deviceid: [
          {
            required: true,
            message: "请选择设备名称",
            trigger: "change"
          }
        ],
        groupid: [
          {
            required: true,
            message: "请选择工作班组",
            trigger: "change"
          }
        ],
        ispowercut: [
          {
            required: true,
            message: "请选择是否停电",
            trigger: "change"
          }
        ],
        jobcontent: [
          {
            required: true,
            message: "请输入工作内容",
            trigger: "change"
          }
        ],
        planstarttime: [
          {
            required: true,
            message: "请选择计划开始时间",
            trigger: "change"
          }
        ],
        planendtime: [
          {
            required: true,
            message: "请选择计划结束时间",
            trigger: "change"
          }
        ],
        ischarged: [
          {
            required: true,
            message: "请选择是否带电",
            trigger: "change"
          }
        ],
        isoutsourcing: [
          {
            required: true,
            message: "请选择是否委外",
            trigger: "change"
          }
        ],
        jobnature: [
          {
            required: true,
            message: "请选择工作性质",
            trigger: "change"
          }
        ],
        jobclass: [
          {
            required: true,
            message: "请选择工作分类",
            trigger: "change"
          }
        ],
        tasklevel: [
          {
            required: true,
            message: "请选择状态",
            trigger: "change"
          }
        ],
        ispowerplan: [
          {
            required: true,
            message: "请选择是否有送电方案",
            trigger: "change"
          }
        ],
        jobtype: [
          {
            required: true,
            message: "请选择工作类型",
            trigger: "change"
          }
        ],
        powercutplanstrattime: [
          {
            required: true,
            message: "请选择计划停电开始时间",
            trigger: "change"
          }
        ],
        powercutplanendtime: [
          {
            required: true,
            message: "请选择计划停电结束时间",
            trigger: "change"
          }
        ],
        dxjgxmbh: [
          {
            required: true,
            message: "请输入大修技改项目编号",
            trigger: "change"
          }
        ],
        powercutscope: [
          {
            required: true,
            message: "请选择停电范围",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    console.log(this.isadd, this.isedit, this.isview);
    if(this.isadd) {
      this.title = "新增"
    }
    if(this.isedit) {
      this.title = "编辑"
    }
    if(this.isview) {
      this.title = "查看"
    }
    this.getSelectionList();
    if (this.form.objId && this.isview) {
      this.isdisabled = true;
      this.getList();
    }
    if (this.form.objId && this.isedit) {
      this.getList();
    }
  },
  mounted() {
    if (this.isadd) {
      this.form.compilingpersonnel = this.$store.getters.name;
    }
  },
  methods: {
    // 选了停电才能选停电范围
    istd(val) {
      console.log('val :>> ', val);
      if(val == 1) {
        this.isdisabled1 = false
      } else {
        this.isdisabled1 = true
        this.form.powercutscope = ''
      }
    },
    // 获取年计划数据列表
    getList() {
      console.log(111);
      getData(this.$qs.stringify(this.form)).then(res => {
        console.log(res.data.rows);
        this.form = res.data.rows[0];
        if(this.form.devicetypename !== null) {
          this.form.devicetypename = res.data.rows[0].devicetypename.split(",");
          this.form.devicetype = [];
        }
        else {
          this.form.devicetypename = [];
          this.form.devicetype = []
        }
        this.getsbmc();
      });
    },
    // 获取下拉框数据
    getSelectionList() {
      // 获取线路名称下拉框
      getLineSelect(this.$qs.stringify({ lineNature: "主线" })).then(
        response => {
          if (response.status == 200) {
            this.selection.jxxl = response.data.rows;
          }
        }
      );
      // 获取任务来源 设备名称
      getSelectMultiple(
        this.$qs.stringify({
          fzids:
            "LINE_DEVICE_TYPE,JXSY_JOB_NATRUE,JXSY_JOB_CLASS,JXSY_JOB_TYPE,JXSY_DDGX,JXSY_PLAN_ADJUSTWHY,JXSY_TASK_SOURCE"
        })
      ).then(res => {
        this.selection.sblx = res.data.data.LINE_DEVICE_TYPE;
        this.selection.gzxz = res.data.data.JXSY_JOB_NATRUE;
        this.selection.gzfl = res.data.data.JXSY_JOB_CLASS;
        this.selection.jhtzyy = res.data.data.JXSY_PLAN_ADJUSTWHY;
        this.selection.gzlx = res.data.data.JXSY_JOB_TYPE;
        this.selection.tdgx = res.data.data.JXSY_DDGX;
        this.selection.work = res.data.data.JXSY_TASK_SOURCE
      });
      // 获取xl班组
      getLineGroup().then(res => {
        this.selection.gzbz = res.data.rows;
      });
    },
    // 时间选择器
    beginDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.form.planendtime) {
            // 如果结束时间不为空，则小于结束时间
            return new Date(self.form.planendtime).getTime() < time.getTime();
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
          if (self.form.planstarttime) {
            // 如果开始时间不为空，则结束时间大于开始时间
            return new Date(self.form.planstarttime).getTime() > time.getTime();
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      };
    },
    // 时间选择器
    beginDate1() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.form.powercutplanendtime) {
            // 如果结束时间不为空，则小于结束时间
            return (
              new Date(self.form.powercutplanendtime).getTime() < time.getTime()
            );
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      };
    },
    processDate1() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.form.powercutplanstrattime) {
            // 如果开始时间不为空，则结束时间大于开始时间
            return (
              new Date(self.form.powercutplanstrattime).getTime() >
              time.getTime()
            );
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      };
    },
    // 选择设备类型查询设备名称下拉框
    getsbmc() {
      if (this.form.devicetypename && this.form.xlid) {
        getselectByLx({
          sblx: this.form.devicetypename,
          xlid: this.form.xlid
        }).then(res => {
          this.selection.sbmc = res.data.data;
        });
      }
    },
    save() {
      this.$refs["dataForm"].validate(val => {
        if (val) {
          if (this.form.devicetypename) {
            this.form.devicetypename.forEach(val => {
              this.selection.sblx.forEach(item => {
                if (val == item.bzmc) {
                  this.form.devicetype.push(item.bzid);
                }
              });
            });
            this.form.devicetypename = this.form.devicetypename.join(",");
          this.form.devicetype = this.form.devicetype.join(',')
          }
          
          if (this.form.xlid) {
            this.selection.jxxl.forEach(item => {
              if (this.form.xlid == item.id) {
                this.form.xlmc = item.lineName;
              }
            });
          }
          if (this.form.deviceid) {
            this.selection.sbmc.forEach(item => {
              if (this.form.deviceid == item.id) {
                this.form.devicename = item.name;
              }
            });
          }
          if (this.form.groupid) {
            this.selection.gzbz.forEach(item => {
              if (this.form.groupid == item.objId)
                this.form.groupname = item.groupname;
            });
          }
          if (this.form.jobnature) {
            this.selection.gzxz.forEach(item => {
              if (this.form.jobnature == item.bzid) {
                this.form.jobnaturename = item.bzmc;
              }
            });
          }
          if (this.form.schedulingjurisdiction) {
            this.selection.tdgx.forEach(item => {
              if (this.form.schedulingjurisdiction == item.bzid) {
                this.form.schedulingjurisdictionname = item.bzmc;
              }
            });
          }
          if (this.form.jobclass) {
            this.selection.gzfl.forEach(item => {
              if (this.form.jobclass == item.bzid) {
                this.form.jobclassname = item.bzmc;
              }
            });
          }
          if (this.form.jobtype) {
            this.selection.gzlx.forEach(item => {
              if (this.form.jobtype == item.bzid) {
                this.form.jobtypename = item.bzmc;
              }
            });
          }
          if (this.form.planaddwhy) {
            this.selection.jhtzyy.forEach(item => {
              if (this.form.planaddwhy == item.bzid) {
                this.form.planaddwhyname = item.bzmc;
              }
            });
          }
          if (this.isadd == true) {
            add(this.$qs.stringify(this.form)).then(res => {
              if (res.data.code == 0) {
                this.$message({ message: "新增成功", type: "success" });
                this.$parent.getList();
                this.showDialog = false;
                this.addbtn = false;
                this.viewbtn = false;
                this.editbtn = false;
                this.form = { brand_right: 0 };
                this.$emit("childFn", {
                  showDialog: this.showDialog
                });
              }
            });
          }
          if (this.isedit == true) {
            edit(this.$qs.stringify(this.form)).then(res => {
              if (res.data.code == 0) {
                this.$message({ message: "保存成功", type: "success" });
                this.$parent.getList();
                this.showDialog = false;
                this.addbtn = false;
                this.viewbtn = false;
                this.editbtn = false;
                this.form = { brand_right: 0 };
                this.$emit("childFn", {
                  showDialog: this.showDialog
                });
              }
            });
          }
        }
      });
    },
    /**
     * 取消
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.showDialog = false;
          this.form = { brand_right: 0 };
          this.$emit("childFn", {
            showDialog: this.showDialog
          });
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style lang="scss">
// .el-form--label-left .el-form-item__label {
//     line-height: 20px;
//   }
</style>