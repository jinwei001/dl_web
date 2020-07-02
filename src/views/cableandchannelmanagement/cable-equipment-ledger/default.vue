<template />

<script>
export default {
  name: 'Refresh',
  data() {
    return {
    }
  },
  beforeRouteEnter(to, from, next) {
    //console.log(to)
    //console.log(next)
    next(vm => {
      vm.$router.replace('/cableandchannelmanagement/CableEquipmentLedger')
    })
  }
}

</script>
