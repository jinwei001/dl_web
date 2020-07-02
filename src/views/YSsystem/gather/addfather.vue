<template>
  <!-- <h2>
      采集模板库-父节点名称
  </h2>-->
  <div class="single-row-title">
    <el-dialog
      v-dialogDrag
      :visible.sync="showDialog"
      title="新增父菜单"
      :center="true"
      :before-close="handleClose"
      top="25vh"
      width="36%"
    >
      <!-- :rules="formRules" -->
      <el-form ref="formrules" :model="addlist" style="width:100% ;margin: 0 auto;">
        <div class="Form-input">
          <el-form-item label="父菜单名称" label-width="100px" style="width:100%;">
            <el-input  v-model="addlist.name"></el-input>
            <!-- type="textarea" -->
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
export default {
  props: {
    openobj: {
      default: null
    }
  },
  data() {
    return {
      addlist: {
        name: null,
        pid: 0,
        lv:1
      },
      showDialog: true
    };
  },
  created() {},
  mounted() {},
  methods: {
    /**保存 */
    SuerFun() {
      info
        .addFather(this.addlist)
        .then(res => {
          //console.log(res);
          this.showDialog = false;
          this.$emit("childFn", {
            showDialog: this.showDialog
          });
          this.$parent.getList();
        })
        .catch(err => {});
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

<style lang="scss" scoped>
.single-row-title {
  textarea.el-textarea__inner {
    min-height: 100px !important;
  }
}
</style>