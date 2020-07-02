<template>
  <div class="main-body" style="height:auto;" >
    <div style="padding: 10px 0;">
      <el-button size="small" @click="handleSelect('Report1_jctz',$event)" :class="{onSearch:activeTab==='Report1_jctz'}" class="tab">基础台账</el-button>
      <el-button size="small" @click="handleSelect('Report2_scjcbg',$event)" :class="{onSearch:activeTab==='Report2_scjcbg'}" class="tab">上次检修报告</el-button>
      <el-button size="small" @click="handleSelect('Report3_scsybg',$event)" :class="{onSearch:activeTab==='Report3_scsybg'}" class="tab">上次试验报告</el-button>
      <el-button size="small" @click="handleSelect('Report4_scztpjbg',$event)" :class="{onSearch:activeTab==='Report4_scztpjbg'}" class="tab">上次状态评价报告</el-button>
      <el-button size="small" @click="handleSelect('Report5_yxxsxx',$event)" :class="{onSearch:activeTab==='Report5_yxxsxx'}" class="tab">运行巡视信息</el-button>
      <el-button size="small" @click="handleSelect('Report6_qxxx',$event)" :class="{onSearch:activeTab==='Report6_qxxx'}" class="tab">缺陷信息</el-button>
      <el-button size="small" @click="handleSelect('Report7_yhxx',$event)" :class="{onSearch:activeTab==='Report7_yhxx'}" class="tab">隐患信息</el-button>
    </div>
   <div v-if="reportControl.Report1_jctz">
      <Report1_jctz />
    </div>
    <div v-if="reportControl.Report2_scjcbg">
      <Report2_scjcbg />
    </div>
    <div v-if="reportControl.Report3_scsybg">
      <Report3_scsybg />
    </div>
    <div v-if="reportControl.Report4_scztpjbg">
      <Report4_scztpjbg />
    </div>
    <div v-if="reportControl.Report5_yxxsxx">
      <Report5_yxxsxx />
    </div>
    <div v-if="reportControl.Report6_qxxx">
      <Report6_qxxx />
    </div>
    <div v-if="reportControl.Report7_yhxx">
      <Report7_yhxx />
    </div>
  </div>
</template>

<script>
import Report1_jctz from './Report1_jctz'
import Report2_scjcbg from './Report2_scjcbg'
import Report3_scsybg from './Report3_scsybg'
import Report4_scztpjbg from './Report4_scztpjbg'
import Report5_yxxsxx from './Report5_yxxsxx'
import Report6_qxxx from './Report6_qxxx'
import Report7_yhxx from './Report7_yhxx'

export default {
  components: {
    Report1_jctz,
    Report2_scjcbg,
    Report3_scsybg,
    Report4_scztpjbg,
    Report5_yxxsxx,
    Report6_qxxx,
    Report7_yhxx
  },
  data() {
    return {
      activeTab: 'Report1_jctz',
      reportControl: {
        Report1_jctz: true,
        Report2_scjcbg: false,
        Report3_scsybg: false,
        Report4_scztpjbg: false,
        Report5_yxxsxx: false,
        Report6_qxxx: false,
        Report7_yhxx: false
      }
    }
  },
    props: {
      /**
       * 接收是否打开页面
       */
      // jbxxccobjpgA: {
      //   type: Object,
      //   default: function() {
      //     return {

      //     }
      //   }
      // }
    },
    mounted() {



    },
  methods: {

    handleSelect(e, event) {
      this.activeTab = e
      Object.keys(this.reportControl).forEach(key => {
        this.reportControl[key] = false
      })
      this.reportControl[e] = true
    }
  }
}
</script>

<style lang="scss" scope>
</style>
