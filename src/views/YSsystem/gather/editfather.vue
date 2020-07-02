<template>
  <!-- <h2>
      采集模板库-编辑-父节点名称
  </h2>-->
  <div class="single-row-title">
    <el-dialog
      v-dialogDrag
      :visible.sync="showDialog"
      title="编辑菜单"
      :center="true"
      :before-close="handleClose"
      top="25vh"
      width="36%"
    >
      <!-- :rules="formRules" -->
      <el-form ref="formrules" :model="addlist" style="width:100% ;margin: 0 auto;">
        <div class="Form-input">
          <el-form-item label="菜单名称" label-width="100px" style="width:100%;">
            <el-input v-model="addlist.name"></el-input>
            <!-- type="textarea" -->
          </el-form-item>
        </div>
      </el-form>
      <!-- {{openobj}} -->
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
        pid: null,
        objId: null
      },
      showDialog: true
    };
  },
  created() {
    this.addlist.name = this.openobj.name
  },
  mounted() {},
  methods: {
    /**保存 */
    SuerFun() {
      this.addlist.objId = this.openobj.objId;
      this.addlist.pid = this.openobj.pid
      info
        .editSon(this.addlist)
        .then(res => {
          //console.log(res);

        })
        .catch(err => {});
      setTimeout(() => {
        this.$parent.getList();
        this.$emit("childFn", {
          showDialog: false
        });
      }, 100);
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