<template>
<div class=''>
<indexcmp :jbxxccobjpgg='jbxxccobj'></indexcmp>
</div>
</template>

<script>
 import indexcmp from "../../../patrolmanagement/inspection-result-management/Line-Result/index.vue";
export default {
components: {indexcmp},
data() {
return {
   jbxxccobj:{
     lineid:this.$route.query.bb,
     show:false,
   }
};
},
computed: {},
watch: {},
methods: {

},
created() {

},
mounted() {

},
}
</script>
<style lang='scss' scoped>
</style>
