<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="隐患类型统计" name="first">
      <hiddenDangerType v-if="isFirst" :hidden-danger-type="hiddenDangerType" />
    </el-tab-pane>
    <el-tab-pane label="隐患来源统计" name="second">
      <hiddenDangerSource v-if="isSecond" :hidden-danger-source="hiddenDangerSource" />
    </el-tab-pane>
    <el-tab-pane label="隐患等级统计" name="three">
      <hiddenDangerGrade v-if="isThree" :hidden-danger-grade="hiddenDangerGrade" />
    </el-tab-pane>
    <el-tab-pane label="隐患设备统计" name="four">
      <hiddenDangerEquipment v-if="isFourth" :hidden-danger-equipment="hiddenDangerEquipment" />
    </el-tab-pane>
    <el-tab-pane label="隐患处置状态统计" name="five">
      <hiddenDangerDispositionState v-if="isFive" :hidden-danger-disposition-state="hiddenDangerDispositionState" />
    </el-tab-pane>
    <el-tab-pane label="隐患变化数量趋势" name="six">
      <hiddenDangerChanneNum v-if="isSix" :hidden-danger-channe-num="hiddenDangerChanneNum" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import hiddenDangerType from './hiddenDangerType'
import hiddenDangerSource from './hiddenDangerSource'
import hiddenDangerGrade from './hiddenDangerGrade'
import hiddenDangerEquipment from './hiddenDangerEquipment'
import hiddenDangerDispositionState from './hiddenDangerDispositionState'
import hiddenDangerChanneNum from './hiddenDangerChanneNum'
export default {
  components: {
    hiddenDangerType, hiddenDangerSource, hiddenDangerGrade, hiddenDangerEquipment, hiddenDangerDispositionState, hiddenDangerChanneNum
  },
  data() {
    return {
      activeName: 'first',
      isFirst: true,
      hiddenDangerType: '隐患类型统计',
      isSecond: false,
      hiddenDangerSource: '隐患来源统计',
      isThree: false,
      hiddenDangerGrade: '隐患等级统计',
      isFourth: false,
      hiddenDangerEquipment: '隐患设备统计',
      isFive: false,
      hiddenDangerDispositionState: '隐患处置状态统计',
      isSix: false,
      hiddenDangerChanneNum: '隐患变化数量趋势'
    }
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      if (tab.name === 'first') {
        this.isFirst = true
        this.isSecond = false
        this.isThree = false
        this.isFourth = false
        this.isFive = false
        this.isSix = false
      } else if (tab.name === 'second') {
        this.isSecond = true
        this.isFirst = false
        this.isThree = false
        this.isFourth = false
        this.isFive = false
        this.isSix = false
      } else if (tab.name === 'three') {
        this.isThree = true
        this.isFirst = false
        this.isSecond = false
        this.isFourth = false
        this.isFive = false
        this.isSix = false
      } else if (tab.name === 'four') {
        this.isFourth = true
        this.isFirst = false
        this.isSecond = false
        this.isThree = false
        this.isFive = false
        this.isSix = false
      } else if (tab.name === 'five') {
        this.isFive = true
        this.isFirst = false
        this.isSecond = false
        this.isThree = false
        this.isFourth = false
        this.isSix = false
      } else if (tab.name === 'six') {
        this.isSix = true
        this.isFirst = false
        this.isSecond = false
        this.isThree = false
        this.isFourth = false
        this.isFive = false
      }
    }
  }
}
</script>

<style lang="less" scoped>


</style>
