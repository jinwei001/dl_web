<template>
  <section class="app-main">
    <tabs-views class="breadcrumb-container" />
    <!-- <transition name="fade-transform" mode="out-in">
      
    </transition> -->
    <router-view :key="key" />
  </section>
</template>

<script>
import TabsViews from "./TagsView/index";
export default {
  name: "AppMain",
  components: {
    TabsViews
  },
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: 100vh;
  /* min-height: calc(100vh - 50px); */
  width: 100%;
  position: relative;
  overflow: hidden;
  padding-top: 50px;
}
.fixed-header + .app-main {
  padding-top: 50px;
  padding-left: 240px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
