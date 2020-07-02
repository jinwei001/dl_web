<template>
  <div class="main-body">
    <div class="allmapBox">
      <div id="allmap" ref="allmap" class="allmap" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HiddenDangerInfo1',
  data() {
    return {

    }
  },
  mounted() {
    this.createMap()
  },
  methods: {
    createMap() {
      var _this = this
      // 创建Map实例
      _this.map = new BMap.Map('allmap', { minZoom: 11, maxZoom: 16 }) // 创建Map实例
      _this.map.centerAndZoom(new BMap.Point(120.299, 31.568), 14) // 初始化地图,设置中心点坐标和地图级别
      _this.map.setCurrentCity('无锡') // 设置地图中心显示的城市 new！
      _this.map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
    }
  }
}
</script>

<style  scoped>
.main-body {
  height: calc(100vh - 160px);
  overflow: auto;
  padding: 0 20px 0 20px;
}
.allmapBox{
  position: relative;
  left:0;
  top:0;
  height:100%;
  width:100%;
}
.allmap{
  width:100%;
  height:100%;
}
</style>
