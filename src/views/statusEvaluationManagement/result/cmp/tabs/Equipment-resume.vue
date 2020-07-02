<template>
<!-- 设备履历 -->
  <div  class="single-row-title">
      <cableequipmentledger :zhpjobjpg='zhpjobj' v-if="dialogParameterpgb"/>

  </div>
</template>

<script>
  import {
    bjList,
    getPjBj
  } from '@/api/statusE/result'
  import Pagination from '@/components/Pagination'
  import cableequipmentledger from '../../../../cableandchannelmanagement/cable-equipment-ledger/index.vue'
  import qs from 'qs'
  export default {
    components: {
      Pagination,
      cableequipmentledger
    },
    props: {
      /**
       * 接收是否打开页面
       */
      dialogParameterpgb: {
        type: Object,
        default: function() {
        return {

        }
      }},
    },
    data() {
      return {
        zhpjobj:{
          lineName:this.dialogParameterpgb.Details.lineName,
          show:false
        }
      }
    },
    watch: {

    },
    created: function() {
    },
    mounted() {

    },
    methods: {

    }
  }
</script>
<style lang="scss">

</style>
