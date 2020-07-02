<template>
  <!-- 老旧规模地图 -->
   <div class="allmapBox">
        <div id="allmap" ref="allmap" class="allmap" />
      </div>
</template>

<script>
  export default {
    name: 'oldmap',
    components: {
    },
    props: {
       lineidpn:{//xl值
         type: String,
         default: function() {
           return ''
         }
       }
    },
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
        _this.map.centerAndZoom(new BMap.Point(120.3727709532369, 31.580562985116053), 14) // 初始化地图,设置中心点坐标和地图级别
        _this.map.setCurrentCity('无锡') // 设置地图中心显示的城市 new！
        _this.map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
      },

    }
  }
</script>

<style scoped="scoped">
.allmapBox {
  position: relative;
  top: 0;
  width: 100%;
  height:600px;
  float: left;
}
.allmap {
  width: 100%;
  height: 100%;
}

</style>
