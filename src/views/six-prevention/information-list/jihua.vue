<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="巡视计划" name="first">
       <Tourplancmp :objId='juhuadata.objId' v-if="activeName=='first'" :lineid='juhuadata.lineid' @childFn2="parentFn"></Tourplancmp>
      </el-tab-pane>
 <!--    <el-tab-pane label="检修计划" name="second">
        <Overhaulplancmp :objId='juhuadata.objId' v-if="activeName=='second'" @childFn2="parentFn"></Overhaulplancmp>
      </el-tab-pane>
      <el-tab-pane label="带电检测计划" name="third">
        <LiveTestPlancmp :objId='juhuadata.objId' v-if="activeName=='third'" @childFn2="parentFn" :lineid='juhuadata.lineid'></LiveTestPlancmp>
      </el-tab-pane> -->
      <el-tab-pane label="查看值守" name="fourth">
        <Viewondutycmp :objId='juhuadata.objId' v-if="activeName=='fourth'" @childFn2="parentFn"></Viewondutycmp>
      </el-tab-pane>
    </el-tabs>
</template>

<script>
   import Tourplancmp from './cmp/Tourplan/index.vue'
   import Overhaulplancmp from './cmp/Overhaulplan/index.vue'
   import LiveTestPlancmp from './cmp/LiveTestPlan/index.vue'
   import Viewondutycmp from './cmp/Viewonduty/index.vue'
   export default {
      data() {
        return {
          activeName: 'first'
        };
      },
      props: {
        juhuadata: {
          type: Object,
          // 对象或数组且一定会从一个工厂函数返回默认值
          default: function() {
            return {

            }
          }
        }
      },
      components: {
        Tourplancmp,
        Overhaulplancmp,
        LiveTestPlancmp,
        Viewondutycmp,
      },
      methods: {
        parentFn(val) {
          // //console.log(val,'父组件')
          //关闭计划管理
            this.$emit('childFn1', {
              back:val.back, // 成功后告诉父组件刷新
            })
        },
        handleClick(tab, event) {
          // //console.log(this.juhuadata,'111111')
          // //console.log(tab, event);
        }
      }
    };
</script>

<style>
</style>
