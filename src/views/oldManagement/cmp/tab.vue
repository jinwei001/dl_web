<template>
  <!--  <h1>老旧tab</h1> -->
  <div style="padding: 20px;">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane lazy label="状态评价" name="one">
        <resultindex :ljyxpg='oldobj' v-if="oldobjfPn"></resultindex>
      </el-tab-pane>
      <el-tab-pane lazy label="历史缺陷" name="two">
        <tableList v-if="activeName==='two'&&type" :tableheaderpn="table_headerData" :typepn='type' :oldobj-pn='oldobj' />
      </el-tab-pane>
      <el-tab-pane lazy label="历史隐患" name="three">
        <tableList v-if="activeName==='three'" :tableheaderpn="table_headerData" :typepn='type' :oldobj-pn='oldobj' />
      </el-tab-pane>
      <el-tab-pane lazy label="故障信息" name="four">
        <tableList v-if="activeName==='four'" :tableheaderpn="table_headerData" :typepn='type' :oldobj-pn='oldobj' />
      </el-tab-pane>
      <el-tab-pane lazy label="带电检测" name="fives" />
      <liveDetectionManagePlanindex v-if="activeName==='fives'" :oldobj-pn='oldobj' />
      <el-tab-pane lazy label="检修及试验" name="six">
        <MainPage :ljyxpg='oldobj'></MainPage>
      </el-tab-pane>
      <el-tab-pane lazy label="原因分析" name="Seven">
        <fileLiit :tableheaderpn="table_headerData" :typepn='type' :oldobj-pn='oldobj' />
      </el-tab-pane>
      <el-tab-pane lazy label="< 返回" name="back"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import tableList from './tableList.vue'
  import falutDesignindex from '@/views/falutManage/falutDesign/index'
  import liveDetectionManagePlanindex from '@/views/liveDetectionManage/result'
  import fileLiit from './file/index.vue'
  import resultindex from '../../statusEvaluationManagement/result/index'
  import MainPage from '../../recondition/task/MainPage'
  import {
    All_table_H
  } from './js/All_table_H.js'
  export default {
    name: 'OldTab',
    components: {
      tableList,
      falutDesignindex,
      liveDetectionManagePlanindex,
      fileLiit,
      resultindex,
      MainPage
    },
    props: {
      oldobjfPn: {
        type: Object,
        // 对象或数组且一定会从一个工厂函数返回默认值
        default: function() {
          return {}
        }
      }
    },
    data() {
      return {
        // 激活的TAB名称
        activeName: '',
        table_headerData: [],
        type: '',
        oldobj: {}
      }
    },
    mounted() {
      this.oldobj = this.oldobjfPn
      this.activeName = 'one'
    },
    methods: {
      handleClick() {
        this.table_headerData = []
        this.type = ''
        if (this.activeName === 'one') {
          // this.table_headerData = All_table_H.table_ZT
        }
        if (this.activeName === 'two') {
          this.table_headerData = All_table_H.table_QX
          this.type = 'qx'
        }
        if (this.activeName === 'three') {
          this.table_headerData = All_table_H.table_YH
          this.type = 'yh'
        }
        if (this.activeName === 'four') {
          this.table_headerData = All_table_H.table_GZ
          this.type = 'gz'
        }
        if (this.activeName === 'fives') {
          // this.table_headerData = All_table_H.table_DD
          // this.type='dd'
        }
        if (this.activeName === 'Seven') {
          this.type = 'lh'
        }
        if (this.activeName === 'back') {
          this.parentFn(this.activeNam)
        }
      },
      parentFn(val) {
        // //console.log('父组件')
        // 关闭计划管理
        this.$emit('childFn1', {
          back: false // 成功后告诉父组件刷新
        })
      }
    }
  }
</script>

<style scoped>

</style>
