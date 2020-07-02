<template>
<!--  bdxl -->
<checkPlanindex :Taskidnamepg='Taskidname'></checkPlanindex>
</template>

<script>
    import checkPlanindex from '../../recondition/plan/checkPlan/index'
    export default {
        name: 'OverhaulPlanManage',
        components: {checkPlanindex},
        data() {
            return {

        }
        },
        props: {
          Taskidname:{
            type: Object,
            // 对象或数组且一定会从一个工厂函数返回默认值
            default: function() {
              return {}
            }
          }
        },
        computed: {

        },
        mounted() {
 
        },
        methods: {

        }
    }
</script>
