<template>
  <!-- <h2>保电管理-值守任务-地图展示</h2> -->
  <div class="single-row-title">
    <el-dialog
      v-dialogDrag
      :visible.sync="mapdialogConfigurationPn.showDialog"
      :title="mapdialogConfigurationPn.title"
      :center="true"
      :before-close="handleClose"
      :width="mapdialogConfigurationPn.dialogWidth"
    >
      <!-- 经纬度{{ longitude }},{{ latitude }} -->
      <div class="allmapBox">
        <div id="allmap" ref="allmap" class="allmap" />
      </div>

    </el-dialog>
  </div>
</template>

<script>
import { getWatchMap } from '@/api/protected-electricity/task'
export default {
  props: {
    mapdialogConfigurationPn: { // 保电值守任务DL井详情参数名称
      type: Object,
      default: function() {
        return {

        }
      },
      required: true
    }
  },
  data() {
    return {
      longitude: this.mapdialogConfigurationPn.electricWellsdata.jd, // 经度
      latitude: this.mapdialogConfigurationPn.electricWellsdata.wd, // 纬度
      id: this.mapdialogConfigurationPn.electricWellsdata.id,
      // id: 'ec5ea8ca68664cfaaa2af49562e9ed29',
      // 弹窗参数配置
      img: require('../../../../icons/static/zhishou.png')

    }
  },
  watch: {

  },
  created: function() {
  },
  mounted() {
    setTimeout(() => {
      this.createMap()
    }, 200)
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
    },
    //   获取地图所有人员点
    async getPersonLocation() {
      var that = this
      var params = {
        bdzsrwdljid: that.id
      }
      const res = await getWatchMap(params)
      var markerPointArr = res.data.data.list.rows
      // var tempArr = [] // 遍历坐标点画线用
      if (markerPointArr.length > 0) {
        for (var i = 0; i < markerPointArr.length; i++) {
          var item = markerPointArr[i]
          if (item.jd != 0 && item.wd != 0) {
            var point = new BMap.Point(item.jd, item.wd) // 生成点
            // tempArr.push(point) // 每遍历一次把点放在数组里  留画线或轨迹用

            var myIcon = new BMap.Icon(that.img, new BMap.Size(30, 30)) // 创建坐标图
            var marker = new BMap.Marker(point, { icon: myIcon }) //  创建标记点
            // var timer = item.INSPECT_TIME.substring(11, 16) // 截取时间
            var label = new BMap.Label(item.zsrmc, {
              offset: new BMap.Size(-25, -25)
            })
            label.setStyle({
              background: '#fff',
              border: '1px solid #0088a1',
              color: '#000',
              padding: '1px 5px',
              borderRadius: '5px'
            })
            marker.setLabel(label) // 生成 文字提示
            marker.item = item //  每一个坐标 等于marker的 一个点
            this.map.addOverlay(marker)
          }
        }
      }
    },

    // 关闭弹窗函数
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('childFn1', {
            showDialog: false
          })
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style scoped="scoped">
#allmap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    font-family: "微软雅黑";
  }
.allmapBox{
  position: relative;
  top: 0;
  width: 100%;
  height: 540px;
}
.allmapBox >>> .allmap{width:100%;height:100%}
</style>
