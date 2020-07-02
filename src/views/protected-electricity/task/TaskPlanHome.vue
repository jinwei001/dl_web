<template>
    <div style="padding: 20px;">
        <el-tabs v-model="activeName">
            <el-tab-pane lazy label="巡视计划" name="one">
                <Tourplan v-if="activeName=='one'" :Taskidname='TaskdetailsName' @childFn2="parentFn"></Tourplan>
            </el-tab-pane>
            <el-tab-pane lazy label="保电值守计划" name="two">
                <duty-plan-manage v-if="activeName=='two'" :taskidname='TaskdetailsName' @childFn2="parentFn"></duty-plan-manage>
            </el-tab-pane>
           <el-tab-pane lazy label="检修计划" name="three">
                <overhaul-plan-manage v-if="activeName=='three'" :Taskidname='TaskdetailsName' @childFn2="parentFn"></overhaul-plan-manage>
            </el-tab-pane>
            <el-tab-pane lazy label="带电检测计划" name="four">
                <LiveTestPlan v-if="activeName=='four'" :Taskidname='TaskdetailsName' @childFn2="parentFn"></LiveTestPlan>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
  import LiveTestPlan from './LiveTestPlan/index.vue'
  import Tourplan from './Tourplan/index.vue'
    export default {
        name: "TaskPlanHome",
        components: {
             LiveTestPlan,
             Tourplan,
            'duty-plan-manage': () => import('../duty/DutyPlanManage'),
            'tour-plan-manage': () => import('./TourPlanManage'),
            'overhaul-plan-manage': () => import('./OverhaulPlanManage'),
            'inspection-plan-manage': () => import('./InspectionPlanManage'),
        },
        data() {
            return {
                //激活的TAB名称
                activeName: 'one',
            }
        },
        props: {
          TaskdetailsName:{
            type: Object,
            // 对象或数组且一定会从一个工厂函数返回默认值
            default: function() {
              return {}
            }
          }
        },
        mounted() {
        },
        methods: {
          parentFn(val) {
            //console.log('父组件')
            //关闭计划管理
              this.$emit('childFn1', {
                back:val.back, // 成功后告诉父组件刷新
              })
          },
        }
    }
</script>

<style scoped>

</style>
