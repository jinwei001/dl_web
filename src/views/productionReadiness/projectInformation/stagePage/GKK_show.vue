<template>
  <!-- 管控卡查看 -->
  <div>
    <el-dialog
      :visible.sync="isshowGKK"
      title="参考标准"
      v-dialogDrag
      :center="true"
      :before-close="handleClose"
      width="30%"
    >
      <el-form label-position="left" style="width:100% ;margin: 0 auto;">
        <div class="view">{{openGKK.bz==null||openGKK.bz==""?"暂无参考标准":openGKK.bz}}</div>
        <!-- {{openGKK}} -->
      </el-form>
      <div slot="footer" class="dialog-footer"></div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    openGKK: {
      default: null,
      type: Object
    }
  },
  data() {
    return {
      isshowGKK: true
    };
  },
  methods: {
    /**
     * 取消按钮
     */
    handleClose() {
      var obj = this.objIdson;
      this.isshowGKK = false;
      this.$emit("childFn", {
        isshowGKK: this.isshowGKK
      });
    }
  }
};
</script>
<style lang="scss" scope>
.view {
  line-height: 45px;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>