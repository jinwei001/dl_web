<template>
  <div>
   <!-- //基础台账 -->
     <indexcmp :zhpjobjpg='jbxxccobj' v-if="jbxxccobj.cmpshow"></indexcmp>
  </div>

</template>

<script>
  import {
    line_list
  } from '@/api/statusE/cycle'
   import qs from 'qs'
import indexcmp from "../../../cableandchannelmanagement/cable-equipment-ledger/index.vue";
export default {
components: {
  indexcmp
},
data() {
return {
     jbxxccobj:{
        lineName:'',
        show:false,
        cmpshow:false
      }
};
},
props: {
      /**
       * 接收是否打开页面
       */
      // jbxxccobjpgB: {
      //   type: Object,
      //   default: function() {
      //     return {

      //     }
      //   }
      // }
    },
computed: {

},
watch: {},
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
              if(response.data.rows[i].id===this.$route.query.bb){
                this.jbxxccobj.lineName=response.data.rows[i].lineName
                this.jbxxccobj.cmpshow=true
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
},
created() {
this.lineList()
},
mounted() {

},
}
</script>
<style lang='scss' scoped>
</style>
