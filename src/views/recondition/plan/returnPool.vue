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
              v-model="form.date"
              type="datetime"
              format="yyyy-MM-dd hh:mm"
              value-format="yyyy-MM-dd hh:mm"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="计划结束时间：" prop="devicetypename" label-width="150px" style="width:50%">
            <el-date-picker
              style="width: 100%;"
              v-model="form.date"
              type="datetime"
              format="yyyy-MM-dd hh:mm"
              value-format="yyyy-MM-dd hh:mm"
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
export default {
  data() {
    return {
      showDialog: true,
      form: {
        data: ""
      }
    };
  },
  methods: {
    // 保存
    save() {},
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