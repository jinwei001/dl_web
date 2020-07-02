<template>
  <div class="main-body">

    <div class="allmapBox">
      <div id="allmap" ref="allmap" class="allmap" />
    </div>
  </div>

</template>

<script>

export default {
  name: 'PersonnelControlMgr',

  components: {

  },
  data() {
    return {

    }
  },
  created() {},
  mounted() {
    this.createMap()
  },
  methods: {
    // 地图实例
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
  .allmapBox{
    position:absolute;
    width:100%;
    height:100%;
    left:0;
    top:0;
    right:0;
    bottom:0

  }
  #allmap {
    width: 100%;
    height: 100%;

    overflow: hidden;
    margin: 0;
    font-family: "微软雅黑";
  }
</style>
