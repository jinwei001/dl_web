<template>
  <div>
    <div class="main-body">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="statusLine">{{$xl}}统计</el-menu-item>
        <el-menu-item index="statusAssembly">部件统计</el-menu-item>
        <el-menu-item index="assemblyDistribution">部件分布</el-menu-item>
      </el-menu>

 <!-- 统计 -->
    <router-view></router-view>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: ''
    }
  },
  mounted(){
    this.activeIndex = this.$route.name
  },
  methods: {
    handleSelect(ind) {
      this.$router.push({ name:ind })
    }
  }
}
</script>
