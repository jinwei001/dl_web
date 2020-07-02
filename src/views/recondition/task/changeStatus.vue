<template>
  <div class="hastitle">
    <el-dialog
      :visible.sync="showDialog"
      title="更改状态"
      :center="true"
      top="10vh"
      width="30%"
      v-dialogDrag
      :before-close="handleClose"
    >
      <div style="text-align:center;margin: 2rem">
        <el-radio v-model="form.taskstatus" label="1">已执行</el-radio>
        <el-radio v-model="form.taskstatus" label="2">未执行</el-radio>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="save">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { changeStatus } from "@/api/recondition/jobtask";
export default {
  props: {
    ids: ""
  },
  data() {
    return {
      showDialog: true,
      form: {
        ids: this.ids
      }
    };
  },
  methods: {
    save() {
      changeStatus(this.$qs.stringify(this.form)).then(res => {
        if (res.data.code == 0) {
          this.$message({ message: "修改成功", type: "success" });
          this.$parent.getData();
          this.$emit("childFn", {
            showDialog: false
          });
        } else {
          this.$message({ message: res.data.msg, type: "error" });
          this.$parent.getData();
          this.$emit("childFn", {
            showDialog: false
          });
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

<style>
</style>