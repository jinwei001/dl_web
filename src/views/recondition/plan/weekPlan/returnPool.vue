<template>
  <div class="hastitle">
    <el-dialog
      :visible.sync="showDialog"
      title="回池调整时间"
      :center="true"
      top="10vh"
      v-dialogDrag
      :before-close="handleClose"
    >
      <el-form
        ref="formrules"
        :model="form"
        label-position="right"
        style="width:100% ;margin: 0 auto;"
      >
        <div class="Form-input">
          <el-form-item label="计划开始时间：" prop="batchname" label-width="150px" style="width:50%">
            <el-date-picker
              style="width: 100%;"
              v-model="form.planstarttime"
              :picker-options="startDatePicker"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="计划结束时间：" prop="devicetypename" label-width="150px" style="width:50%">
            <el-date-picker
              style="width: 100%;"
              v-model="form.planendtime"
              :picker-options="endDatePicker"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="save">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {returnPool} from '@/api/recondition/yearPlan'
export default {
  props: {
    id: '',
  },
  data() {
    return {
      startDatePicker: this.beginDate(), // 时间选择器
      endDatePicker: this.processDate(),
      showDialog: true,
      form: {
        data: "",
        planSource: 'week',
        planstarttime: '',
        planendtime: '',
        ids: this.id
      }
    };
  },
  methods: {
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
    // 保存
    save() {
      returnPool(this.$qs.stringify(this.form)).then((result) => {
        this.$message({message: '回池成功', type: 'success'})
        this.showDialog = false;
          this.form = { brand_right: 0 };
          this.$parent.getList()
          this.$emit("childFn", {
            showDialog: false
          });
      }).catch((err) => {
        
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
            showDialog: false
          });
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style>
</style>