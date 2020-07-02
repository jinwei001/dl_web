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
          <el-form-item label="工作内容：" prop="batchname" label-width="150px" style="width:50%">
            <el-input v-model="addlist.devicetypename" clearable />
          </el-form-item>
          <el-form-item label="责任单位：" prop="devicetypename" label-width="150px" style="width:50%">
            <el-select
              v-model="addlist.devicetypename"
              filterable
              @change="SblxFn"
              value-key="objId"
              clearable
              placeholder="请选择"
              style="width:100%"
            >
              <el-option v-for="item in sblx" :key="item.objId" :label="item.bzmc" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item :label="`检修${$xl}：`" prop="batchname" label-width="150px" style="width:50%">
            <el-input v-model="addlist.devicetypename" clearable />
          </el-form-item>
          <el-form-item label="设备名称：" prop="devicetypename" label-width="150px" style="width:50%">
            <el-select
              v-model="addlist.devicetypename"
              filterable
              @change="SblxFn"
              value-key="objId"
              clearable
              placeholder="请选择"
              style="width:100%"
            >
              <el-option v-for="item in sblx" :key="item.objId" :label="item.bzmc" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item
            label="计划开始时间："
            prop="manufacturedate"
            label-width="150px"
            style="width:50%"
          >
            <el-date-picker
              v-model="addlist.manufacturedate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择日期"
              :picker-options="startDatePicker"
              style="width:100%"
            />
          </el-form-item>
          <el-form-item label="计划结束时间：" prop="putdate" label-width="150px" style="width:50%">
            <el-date-picker
              v-model="addlist.putdate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择日期"
              :picker-options="endDatePicker"
              style="width:100%"
            />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="编制人" prop="batchname" label-width="150px" style="width:50%">
            <el-input v-model="addlist.devicetypename" clearable />
          </el-form-item>
          <el-form-item label="工作班组：" prop="devicetypename" label-width="150px" style="width:50%">
            <el-select
              v-model="addlist.devicetypename"
              filterable
              @change="SblxFn"
              value-key="objId"
              clearable
              placeholder="请选择"
              style="width:100%"
            >
              <el-option v-for="item in sblx" :key="item.objId" :label="item.bzmc" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          
          <el-form-item label="任务状态：" prop="devicetypename" label-width="150px" style="width:50%">
            <el-select
              v-model="addlist.devicetypename"
              filterable
              @change="SblxFn"
              value-key="objId"
              clearable
              placeholder="请选择"
              style="width:100%"
            >
              <el-option v-for="item in sblx" :key="item.objId" :label="item.bzmc" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否停电：" prop="devicetypename" label-width="150px" style="width:50%">
            <el-select
              v-model="addlist.devicetypename"
              filterable
              @change="SblxFn"
              value-key="objId"
              clearable
              placeholder="请选择"
              style="width:100%"
            >
              <el-option v-for="item in sblx" :key="item.objId" :label="item.bzmc" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
     
        <div class="Form-input">
          <el-form-item
            label="任务等级："
            prop="devicetypename"
            label-width="150px"
            style="width:50%"
          >
            <el-select
              v-model="addlist.devicetypename"
              filterable
              value-key="objId"
              clearable
              placeholder="请选择"
              style="width:100%"
            >
              <el-option v-for="item in sblx" :key="item.objId" :label="item.bzmc" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入池时间：" label-width="150px" style="width:50%">
            <el-date-picker
              v-model="addlist.putdate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择日期"
              style="width:100%"
            />
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
import qs from "qs";
import info from "@/api/YSsystem/gather";
import { GETTBList, POSTTBList } from "@/api/public";
export default {
  props: {
    openobj: {
      default: null,
      type: Object
    }
  },
  data() {
    return {
      addlist: {
        manufacturedate: null,
        putdate: null,
        devicetypename: null
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
            message: "请选责任单位",
            trigger: "change"
          }
        ],
        manufacturedate: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        putdate: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        batchname: [
          {
            required: true,
            message: "请输入批次名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    if (this.openobj.isadd) {
      this.title = "新增";
    } else {
      this.title = "编辑";
    }
  },
  methods: {
    // 时间选择器
    beginDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.addlist.manufacturedate) {
            // 如果结束时间不为空，则小于结束时间
            return (
              new Date(self.addlist.manufacturedate).getTime() < time.getTime()
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
          if (self.addlist.putdate) {
            // 如果开始时间不为空，则结束时间大于开始时间
            return new Date(self.addlist.putdate).getTime() > time.getTime();
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
    SuerFun() {
      this.$refs["formrules"].validate(val => {
        if (val) {
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