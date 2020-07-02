<template>
  <div>
    <div class="main-body">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="reportbase">基本资料与信息查询</el-menu-item>
        <el-menu-item index="reportplan">工作内容管理</el-menu-item>
      </el-menu>
      <router-view></router-view>
    </div>

  </div>
</template>
<script>
 import {
   line_list
 } from '@/api/statusE/cycle'
  import qs from 'qs'
export default {
  data() {
    return {
      activeIndex: '',
      aa: this.$route.query.aa,
      bb: this.$route.query.bb,
      cc: this.$route.query.cc,
      jbxxccobj:{
        lineName:'',
        show:false
      }
    }
  },
  mounted() {
    this.lineList()
    console.log(this.$route.query.aa)
    this.activeIndex = this.$route.name
  },
  beforeRouteUpdate (to, from, next) {
    // 同一页面，刷新不同数据时调用，
  console.log(from)
  next()
},
  methods: {
    //线路
    lineList(){
      let data={
        lineNature: '主线'
      }

      line_list(qs.stringify(data)).then(response => {
        if (response.status === 200) {
          if (response.data.code === 0) {
            for(let i=0;i<response.data.rows.length;i++){
              if(response.data.rows[i].id===this.$route.query.aa){
                console.log(response.data.rows[i])
                this.jbxxccobj.lineName=response.data.rows[i].lineName
              }
            }
          } else {

            this.$message({
              message: '线路列表获取失败',
              type: 'error'
            })
          }
        }
      })
    },
    handleSelect(ind) {
      this.$router.push({path: `/wxdl/recondition/rtask/report/${ind}`,query: {aa: this.aa,bb: this.bb,cc: this.cc}})
    }
  }
}
</script>
<style lang="scss" scope>

</style>
