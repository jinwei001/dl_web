<template>
  <!-- <h2>检修试验计划</h2> -->
  <div class="single-row-title">
    <el-dialog
      v-dialogDrag
      :visible.sync="showDialog"
      :title="title"
      :center="true"
      :before-close="handleClose"
      top="10vh"
      width="50%"
    >
      <el-form
        ref="formrules"
        :model="addlist"
        :rules="rules"
        label-position="right"
        style="width:100% ;margin: 0 auto;"
      >
        <div class="Form-input">
          <el-form-item :label="`检修${$xl}：`" label-width="150px" style="width:50%">
            <el-select
              v-model="addlist.xlid"
              clearable
              filterable
              placeholder="请选择"
              :disabled="isreadonly||laojiudisabledshow"
              @change="getsbmc"
            >
              <el-option
                v-for="item in selection.xlmc"
                :key="item.id"
                :label="item.lineName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="工作内容：" prop="jobcontent" label-width="150px" style="width:50%">
            <el-input v-model="addlist.jobcontent" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item label="任务来源：" label-width="150px" style="width:50%">
            <el-select
              v-model="addlist.tasksourcename"
              filterable
              @change="SblxFn"
              value-key="objId"
              clearable
              placeholder="请选择"
              :disabled="isreadonly||laojiudisabledshow||baodianjxpgshow"
              style="width:100%"
            >
              <el-option
                v-for="item in selection.work"
                :key="item.objId"
                :label="item.bzmc"
                :value="item.bzmc"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="设备类型："  label-width="150px" style="width:50%">
            <el-select
              v-model="addlist.devicetypename"
              filterable
              multiple
              @change="getsbmc"
              value-key="objId"
              clearable
              placeholder="请选择"
              :disabled="isreadonly"
              style="width:100%"
            >
              <el-option
                v-for="item in selection.sblx"
                :key="item.objId"
                :label="item.bzmc"
                :value="item.bzmc"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入池时间：" label-width="150px" style="width:50%">
            <el-date-picker
              v-model="addlist.pooltime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择日期"
              style="width:100%"
              :disabled="isreadonly"
            />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="计划开始时间：" prop="planstarttime" label-width="150px" style="width:50%">
            <el-date-picker
              v-model="addlist.planstarttime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择日期"
              :picker-options="startDatePicker"
              :disabled="isreadonly"
              style="width:100%"
            />
          </el-form-item>
          <el-form-item label="计划结束时间：" prop="planendtime" label-width="150px" style="width:50%">
            <el-date-picker
              v-model="addlist.planendtime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择日期"
              :picker-options="endDatePicker"
              :disabled="isreadonly"
              style="width:100%"
            />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="编制人" label-width="150px" style="width:50%">
            <el-input v-model="addlist.compilingpersonnel" disabled clearable />
          </el-form-item>
          <el-form-item label="工作班组："  label-width="150px" style="width:50%">
            <el-select
              v-model="addlist.groupid"
              filterable
              @change="SblxFn"
              value-key="objId"
              clearable
              placeholder="请选择"
              :disabled="isreadonly"
              style="width:100%"
            >
              <el-option
                v-for="item in selection.gzbz"
                :key="item.objId"
                :label="item.groupname"
                :value="item.objId"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">

          <el-form-item label="是否停电：" prop="ispowercut" label-width="150px" style="width:50%">
            <el-select
              v-model="addlist.ispowercut"
              filterable
              @change="SblxFn"
              value-key="objId"
              clearable
              placeholder="请选择"
              :disabled="isreadonly"
              style="width:100%"
            >
              <el-option
                v-for="item in selection.sftd"
                :key="item.objId"
                :label="item.bzmc"
                :value="item.bzid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务等级："  label-width="150px" style="width:50%">
            <el-select
              v-model="addlist.tasklevel"
              filterable
              value-key="objId"
              clearable
              placeholder="请选择"
              style="width:100%"
              :disabled="isreadonly"
            >
              <el-option
                v-for="item in selection.rwdj"
                :key="item.objId"
                :label="item.bzmc"
                :value="item.bzid"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div class="Form-input">
          <!-- <el-form-item v-if="this.openobj.isadd !== 1" label="任务状态：" prop="taskstatus" label-width="150px" style="width:50%">
            <el-select
              v-model="addlist.taskstatus"
              filterable
              @change="SblxFn"
              value-key="objId"
              clearable
              placeholder="请选择"
              :disabled="isreadonly"
              style="width:100%"
            >
              <el-option
                v-for="item in selection.rwzt"
                :key="item.taskstatus"
                :label="item.bzmc"
                :value="item.taskstatus"
              ></el-option>
            </el-select>
          </el-form-item> -->

          
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" v-if="isbtn" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" v-if="isbtn" @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
import info from "@/api/YSsystem/gather";
import { GETTBList, POSTTBList } from "@/api/public";
import {
  getLineGroup,
  getSelectMultiple,
  addOverTaskpool,
  getLineSelect,
  getselectByLx,
  getList,
  editOverTaskpool
} from "@/api/recondition/checkPlan";
export default {
  props: {
    openobj: {
      default: null,
      type: Object
    },
    openID: "",
    objjxxl: "",
    objsblx: "",
    isadd: "",
    laojiudlpg: {//老旧来源参数
      type: Object,
      default: function() {
      return {

      }
    }},
    baodianjxpg: {//保电来源参数
      type: Object,
      default: function() {
      return {

      }
    }}
  },
  data() {
    return {
      baodianjxpgshow:false,//保电列表来源生成时候禁止状态
      laojiudisabledshow:false,//老旧dl列表来源生成时候禁止状态
      isbtn: this.isadd,
      isreadonly: null,
      objId: this.openID,
      selection: {
        work: [],
        gzbz: [],
        sblx: [],
        xlmc: [],
        sbmc: [],
        rwzt: [
          { bzmc: "已执行", taskstatus: "1" },
          { bzmc: "未执行", taskstatus: "2" }
        ],
        sftd: [
          { bzmc: "是", bzid: "1" },
          { bzmc: "否", bzid: "2" }
        ],
        rwdj: [
          { bzmc: "一般任务", bzid: "1" },
          { bzmc: "重要任务", bzid: "2" },
          { bzmc: "紧急任务", bzid: "3" }
        ]
      },
      addlist: {
        jobcontent: "",
        tasksourcename: "",
        xlid: "",
        devicename: "",
        devicetypename: this.objsblx,
        planstarttime: this.objjxxl,
        planendtime: "",
        compilingpersonnel: "",
        groupid: "",
        taskstatus: "",
        ispowercut: "",
        tasklevel: "",
        pooltime: ""
      },
      title: null,
      showDialog: true,
      sblx: [],
      startDatePicker: this.beginDate(), // 时间选择器
      endDatePicker: this.processDate(),
      rules: {
        devicetypename: [
          {
            required: true,
            message: "请选择设备名称",
            trigger: "change"
          }
        ],
        devicename: [
          {
            required: true,
            message: "请选择设备名称",
            trigger: "change"
          }
        ],
        xlid: [
          {
            required: true,
            message: "请填写检修" + this.$xl,
            trigger: "change"
          }
        ],
        tasksourcename: [
          {
            required: true,
            message: "请选择任务来源",
            trigger: "change"
          }
        ],
        jobcontent: [
          {
            required: true,
            message: "请填写工作内容",
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
        compilingpersonnel: [
          {
            required: true,
            message: "请填写编制人",
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
        taskstatus: [
          {
            required: true,
            message: "请选择任务状态",
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
        tasklevel: [
          {
            required: true,
            message: "请选择任务等级",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {

    this.getSelection();
    if (this.openobj.isadd == 1) {
      this.title = "新增";
      this.addlist.compilingpersonnel = this.$store.getters.name
      this.addlist = {};
    } else if (this.openobj.isadd == 2) {
      this.title = "编辑";
      this.getList();
      this.getsbmc();
    } else if (this.openobj.isadd == 3) {
      this.title = "查看";
      this.getList();
      this.getsbmc();
      this.isreadonly = true;
    }
  },
  mounted() {
    if (this.openobj.isadd == 1) {
      this.addlist.compilingpersonnel = this.$store.getters.name
    }
     //老旧列表来源调取该组件
     if (Object.keys(this.laojiudlpg).length > 0) {
      this.isbtn=1//打开按钮
      this.laojiudisabledshow=true
      this.addlist.tasksourcename='老旧'
      this.addlist.xlid=this.laojiudlpg.lineId
    }
    //保电计划检修列表来源调取该组件
     if (Object.keys(this.baodianjxpg).length > 0) {
      this.isbtn=1//打开按钮
      this.baodianjxpgshow=true
      this.addlist.tasksourcename='保电'
      let bdxl=JSON.parse(this.baodianjxpg.bdxl)
      for(let i=0;i<bdxl.length;i++){
        this.selection.xlmc.push({lineName:bdxl[i].value,id:bdxl[i].id})
      }
    }
  },
  methods: {
    // 获取查看数据
    getList() {
      console.log('this.objId :>> ', this.objId);
      getList(this.$qs.stringify({objId: this.objId})).then(res => {
        this.addlist = res.data.rows[0];
        if(this.addlist.devicetypename !== null) {
          this.addlist.devicetypename = res.data.rows[0].devicetypename.split(',')
        } else {
          this.addlist.devicetypename = []
        }
        
        console.log(this.addlist.devicetypename)
      });
    },
    // 获取dydj 任务来源的下拉框数据
    getSelection() {
      // 获取xl班组
      getLineGroup().then(res => {
        this.selection.gzbz = res.data.rows;
      });
      getLineSelect(this.$qs.stringify({ lineNature: "主线" })).then(
        response => {
          if (response.status == 200) {
             if (Object.keys(this.baodianjxpg).length===0) {//保电检修不存在时
                   this.selection.xlmc = response.data.rows;
             }

          }
        }
      );
      // 获取任务来源 设备名称
      getSelectMultiple(
        this.$qs.stringify({
          fzids: "JXSY_TASK_SOURCE,LINE_DEVICE_TYPE"
        })
      ).then(res => {
        this.selection.work = res.data.data.JXSY_TASK_SOURCE;
        this.selection.sblx = res.data.data.LINE_DEVICE_TYPE;
      });
    },
    // 时间选择器
    beginDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.addlist.planendtime) {
            // 如果结束时间不为空，则小于结束时间
            return (
              new Date(self.addlist.planendtime).getTime() < time.getTime()
            );
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      };
    },
    // 时间选择器
    processDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.addlist.planstarttime) {
            // 如果开始时间不为空，则结束时间大于开始时间
            return new Date(self.addlist.planstarttime).getTime() > time.getTime();
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      };
    },
    /**匹配数字类型 */
    period(e) {
      // 清除"数字"和"."以外的字符
      e.target.value = e.target.value.replace(/[^\d.]/g, "");
    },
    SblxFn(val) {},
    // 选择设备类型查询设备名称下拉框
    getsbmc() {
      console.log('this.addlist.devicetypename :>> ', this.addlist.devicetypename);
      getselectByLx({
        sblx: this.addlist.devicetypename,
        xlid: this.addlist.xlid
      }).then(res => {
        this.selection.sbmc = res.data.data;
      });
    },
    SuerFun() {
      this.$refs["formrules"].validate(val => {
        if (val) {
          this.addlist.devicetypename = this.addlist.devicetypename.join()
          if (this.openobj.isadd == 1) {
            addOverTaskpool(this.$qs.stringify(this.addlist)).then(res => {
              if (res.data.code == 0) {
                this.$message({ message: "保存成功", type: "success" });
                if(Object.keys(this.laojiudlpg).length===0){//如果老旧的来源存在则不需要走这个方法
                   this.$parent.getListtab();
                }
                this.showDialog = false;
                this.$emit("childFn", {
                  showDialog: this.showDialog
                });
              }
            });
          } else if (this.openobj.isadd == 2) {
            editOverTaskpool(this.$qs.stringify(this.addlist)).then(res => {
              if (res.data.code == 0) {
                this.$message({ message: "保存成功", type: "success" });
                this.$parent.getListtab();
                this.showDialog = false;
                this.$emit("childFn", {
                  showDialog: this.showDialog
                });
              }
            });
          }
        } else {
          this.$message({
            message: "必填项未填！！！",
            type: "error"
          });
        }
      });
    },
    /**取消*/
    handleClose() {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.showDialog = false;
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
