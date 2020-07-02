<template>
  <!-- <h2>
      检修试验计划
  </h2>-->
  <div class="single-row-title">
    <el-dialog
      v-dialogDrag
      :visible.sync="showDialog"
      :title="title"
      :center="true"
      :before-close="handleClose"
      top="10vh"
      width="36%"
    >
      <!-- :rules="rules" -->

      <el-form
        ref="formrules"
        :model="addlist"
        :rules="rules"
        label-position="right"
        style="width:100% ;margin: 0 auto;"
      >
        <div class="Form-input">
          <el-form-item label="责任单位：" prop="responsibleUnit" label-width="150px" style="width:100%">
            <el-input v-model="addlist.responsibleUnit" clearable />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="停电间隔或线路：" prop="lineId" label-width="150px" style="width:100%">
            <el-select
              v-model="addlist.lineId"
              filterable
              value-key="objId"
              clearable
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in selectinfo.tdjg"
                :key="item.lineId"
                :label="item.lineName"
                :value="item.lineId"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="停电范围：" prop="blackoutRange" label-width="150px" style="width:100%">
            <el-input v-model="addlist.blackoutRange" clearable />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="工作内容：" prop="jobContent" label-width="150px" style="width:100%">
            <el-input v-model="addlist.jobContent" clearable />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item
            label="计划停电开始时间："
            prop="scheduledOutageStartTime"
            label-width="150px"
            style="width:100%"
          >
            <!-- :picker-options="startDatePicker" -->
            <el-date-picker
              v-model="addlist.scheduledOutageStartTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择日期"
              style="width:100%"
            />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item
            label="计划停电结束时间："
            prop="scheduledOutageEndTime"
            label-width="150px"
            style="width:100%"
          >
            <!-- :picker-options="endDatePicker" -->
            <el-date-picker
              v-model="addlist.scheduledOutageEndTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择日期"
              style="width:100%"
            />
          </el-form-item>
        </div>
        <div class="Form-input">
          <!-- <el-form-item label="工作来源：" prop="workSource" label-width="150px" style="width:100%"> -->
            <!-- <el-input v-model="addlist.workSource" clearable /> -->
             <el-form-item label="工作来源：" prop="workSource" label-width="150px" style="width:100%">
            <el-select
              v-model="addlist.workSource"
              filterable
              clearable
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in selectinfo.workSource"
                :key="item.objId"
                :label="item.bzmc"
                :value="item.bzmc"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- </el-form-item> -->
        </div>
        <div class="Form-input">
          <el-form-item label="线路是否跨区：" prop="isLineSpanned" label-width="150px" style="width:100%">
            <el-select
              v-model="addlist.isLineSpanned"
              filterable
              value-key="objId"
              clearable
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in selectinfo.isLineSpanned"
                :key="item.objId"
                :label="item.bzmc"
                :value="item.objId"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="上次检修日期：" label-width="150px" style="width:100%">
            <el-date-picker
              v-model="addlist.lastMaintenanceDate"
              type="date"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择日期"
              style="width:100%"
            />
          </el-form-item>
        </div>
        <!-- <div class="Form-input">
          <el-form-item label="调度管辖：" prop="dispatch" label-width="150px" style="width:100%">
            <el-input v-model="addlist.dispatch" clearable />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="许可人：" prop="licensor" label-width="150px" style="width:100%">
            <el-input v-model="addlist.licensor" clearable />
          </el-form-item>
        </div> -->

        <div class="Form-input">
          <div class="dltz-dltz"></div>
          <el-form-item label="备注：" label-width="150px" style="width:100%;font-size:1rem">
            <el-input type="textarea" v-model="addlist.remark"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getlineList, add, edit, getList } from "@/api/recondition/outage";
import {POSTTBList} from '@/api/public'
import qs from "qs";
export default {
  props: {
    openobj: {
      default: null,
      type: Object
    }
  },
  data() {
    return {
      startDatePicker: this.beginDate(), // 时间选择器
      endDatePicker: this.processDate(),
      addlist: {
        objId: null,
        responsibleUnit: this.$dl+'运检室', //责任单位
        licensor: null, //许可人
        blackoutRange: null, // 停电范围
        jobContent: null, // 工作内容
        scheduledOutageStartTime: null, //计划停电开始时间
        scheduledOutageEndTime: null, //计划停电结束时间
        workSource: null, //工作来源
        isLineSpanned: null, //线路是否跨区
        lastMaintenanceDate: null, //上次检修日期
        dispatch: null, //调度管辖
        remark: null //备注
      },
      title: null,
      showDialog: true,
      selectinfo: {
        tdjg: [],
        isLineSpanned: [
          { objId: 0, bzmc: "不跨区" },
          { objId: 1, bzmc: "跨区" }
        ],
        workSource:[ {}]
      },

      pickerOptionsEnd: {},
      rules: {
        lineId: [
          {
            required: true,
            message: "请选择停电间隔或线路",
            trigger: "change"
          }
        ],
        responsibleUnit: [
          {
            required: true,
            message: "请选择责任单位",
            trigger: "change"
          }
        ],
        scheduledOutageStartTime: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        devicetypename: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        scheduledOutageEndTime: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        isLineSpanned: [
          {
            required: true,
            message: "请选择线路是否跨区",
            trigger: "change"
          }
        ],
        jobContent: [
          {
            required: true,
            message: "请输入工作内容",
            trigger: "blur"
          }
        ],
        workSource: [
          {
            required: true,
            message: "请输入工作来源",
            trigger: "blur"
          }
        ],
        blackoutRange: [
          {
            required: true,
            message: "请输入停电范围",
            trigger: "blur"
          }
        ],
        // licensor: [
        //   {
        //     required: true,
        //     message: "请输入许可人",
        //     trigger: "blur"
        //   }
        // ],
        // dispatch: [
        //   {
        //     required: true,
        //     message: "请输入调度管辖",
        //     trigger: "blur"
        //   }
        // ]
      }
    };
  },
  created() {


    POSTTBList('/bzsj/getSelect',qs.stringify({fzid:"TDSQ_GZLY"})).then((res) => {
      // console.log('res :>> ', res);
      if(res.data.code==0){
        this.selectinfo.workSource= res.data.data
      }
    }).catch((err) => {
      
    });
    if (this.openobj.isadd) {
      this.title = "新增";
    } else {
      this.title = "编辑";
    }
  },
  mounted() {
    this.SblxFn();
    if (!this.openobj.isadd) {
      getList({ id: this.openobj.openID })
        .then(res => {
          this.addlist = res.data.rows[0];
          if (res.data.rows[0]["isLineSpanned"]) {
            this.addlist.isLineSpanned = Number(
              res.data.rows[0]["isLineSpanned"]
            );
          }
        })
        .catch(err => {});
    }
  },
  methods: {
    // 时间选择器
    beginDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.addlist.scheduledOutageEndTime) {
            // 如果结束时间不为空，则小于结束时间
            return (
              new Date(self.addlist.scheduledOutageEndTime).getTime() <
              time.getTime()
            );
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
          if (self.addlist.scheduledOutageStartTime) {
            // 如果开始时间不为空，则结束时间大于开始时间
            return (
              new Date(self.addlist.scheduledOutageStartTime).getTime() >
              time.getTime()
            );
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
    /**下拉框 */
    SblxFn() {
      getlineList()
        .then(res => {
          console.log(res);
          this.selectinfo.tdjg = res.data.data;
        })
        .catch(err => {});
    },
    // 保存
    addfn() {
      add(this.addlist)
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            this.$message({ message: "新增成功", type: "success" });
            this.$parent.getList();
            this.showDialog = false;
            this.$emit("childFn", {
              showDialog: this.showDialog
            });
          }
        })
        .catch(err => {});
    },
    editFn() {
      this.addlist.objId = edit(this.addlist)
        .then(res => {
          if (res.data.code == 0) {
            this.$message({ message: "编辑成功", type: "success" });
            this.$parent.getList();
            this.showDialog = false;
            this.$emit("childFn", {
              showDialog: this.showDialog
            });
          }
        })
        .catch(err => {});
    },
    /**确定 */
    SuerFun() {
      this.$refs["formrules"].validate(val => {
        if (val) {
          if (this.openobj.isadd) {
            this.addfn();
          } else {
            this.editFn();
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