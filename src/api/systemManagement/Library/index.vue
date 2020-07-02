<template>
  <div>
    <div class="main-body" style="padding-top:0">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="qxlibrary">标准缺陷库</el-menu-item>
        <el-menu-item index="gwlibrary">国网工艺库</el-menu-item>
        <el-menu-item index="xmlibrary">项目工艺库</el-menu-item>
        <!-- <el-menu-item index="cjlibrary">采集模板库</el-menu-item>
        <el-menu-item index="lflibrary">标准六防库</el-menu-item> -->
      </el-menu>
      <router-view></router-view>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: 'qxlibrary'
    }
  },
  mounted() {
    this.activeIndex = this.$route.name
  },
  beforeRouteUpdate (to, from, next) {
    // 同一页面，刷新不同数据时调用，
  next()
},
  methods: {
    handleSelect(name) {
      this.$router.push({name})
    }
  }
}
</script>
<style lang="scss" scope>

</style>