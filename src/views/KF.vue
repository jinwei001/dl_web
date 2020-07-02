<template>
  <div>
    <el-dialog
      :visible.sync="isKF"
      :title="title"
      v-dialogDrag
      top="25vh"
      :center="true"
      :before-close="handleClose"
      width="30%"
    >
    <div class="kf">功能正在开发中......</div>
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
      isKF: true,
      title:"开发中......",
    };
  },
  methods: {
    /**
     * 取消按钮
     */
    handleClose() {
      this.isKF = false;
      this.$emit("childFn", {
        isKF: this.isKF
      });
    }
  }
};
</script>
<style lang="scss" scope>
.kf {
  line-height: 45px;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>