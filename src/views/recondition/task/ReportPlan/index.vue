<template>
  <div class="main-body" style="height:auto;">
    <div style="padding: 10px 0;">
      <el-button size="small" @click="handleSelect('xckcbg')" :class="{onSearch:activeTab==='xckcbg'}">现场勘察报告</el-button>
      <el-button size="small" @click="handleSelect('jxfzclbz')" :class="{onSearch:activeTab==='jxfzclbz'}">检修施工方案编制</el-button>
      <el-button size="small" @click="handleSelect('gzrw')" :class="{onSearch:activeTab==='gzrw'}">工作任务</el-button>
      <el-button size="small" @click="handleSelect('sybg')" :class="{onSearch:activeTab==='sybg'}">试验报告</el-button>
      <el-button size="small" @click="handleSelect('jxbg')" :class="{onSearch:activeTab==='jxbg'}">检修报告</el-button>
    </div>
    <div v-if="planControl.xckcbg">
      <Plan1Xckcbg />
    </div>
    <div v-if="planControl.jxfzclbz">
      <Plan2Jxfzclbz />
    </div>
   <div iv v-if="planControl.gzrw">
      <Plan3Gzrw />
    </div>
    <div iv v-if="planControl.sybg" >
      <Plan4Sybg />
    </div>
    <div iv v-if="planControl.jxbg">
      <Plan5Jxbg />
    </div>
  </div>
</template>
<script>
import Plan1Xckcbg from './Plan1_xckcbg'
import Plan2Jxfzclbz from './Plan2_jxfzclbz'
import Plan3Gzrw from './Plan3_gzrw'
import Plan4Sybg from './Plan4_sybg'
import Plan5Jxbg from './Plan5_jxbg'
export default {
  components: {
    Plan1Xckcbg,Plan2Jxfzclbz,
    Plan3Gzrw,Plan5Jxbg,Plan4Sybg

  },
  data() {
    return {
      activeTab: 'xckcbg',
      planControl: {
        xckcbg: true,
        gzrw: false,
        jxbg: false
      }
    }
  },

  methods: {
    handleSelect(e) {
      this.activeTab = e
      Object.keys(this.planControl).forEach(key => {
        this.planControl[key] = false
      })
      this.planControl[e] = true
    }
  }
}
</script>

<style lang="scss" scope>
</style>
