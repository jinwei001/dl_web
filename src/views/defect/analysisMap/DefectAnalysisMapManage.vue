<template>
  <div class="main-body">
    <div class="content">
      <div class="allmapBox">
        <div id="allmap" ref="allmap" class="allmap" />
         <div class="markerBox" v-if="dialogVisible">
          <div class="detailTitle">
            <div class="titleType">缺陷信息</div>
            <div class="guanbi" @click="handleClose">X</div>
          </div>
          <div class="titleContent">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="基本信息" name="first">
                <div class="basicInfo">
                  <div class="basicInfoItem">DYDJ: &nbsp;{{itemObj.voltage_rank}}</div>
                  <div class="basicInfoItem">XL名称:&nbsp;{{itemObj.line_name}}</div>
                  <div class="basicInfoItem">班组:&nbsp;{{itemObj.group_name}}</div>
                  <div class="basicInfoItem">代维班组:&nbsp;</div>
                  <div class="basicInfoItem">发现人:&nbsp;{{itemObj.user_name}}</div>
                  <div class="basicInfoItem">发现时间:&nbsp;{{itemObj.discovery_time}}</div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="流程信息" name="second">
                <div class="basicInfo">
                  <div
                    class="basicInfoItem"
                     v-for="(item,index) in lcList" :key="index"
                   >{{index+1}}.{{item.current_node_name}}:&nbsp;{{item.handler_name}}&nbsp;{{item.operate_time}}</div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getDefectMap,getLc
} from '@/api/defectManagement/defectDistribution/index.js'
export default {
  name: 'InfomationMap',
  components: {},
  data() {
    return {
      ruleFrom: {
        voltage: '',
        line: ''
      },
      itemObj:{},
      dialogVisible:false,
      lcList:[ 
          ],
      img: require('../../../icons/static/quexian_yanzhong.png'),
      voltageArr: [],
      activeName: "first",
      lineArr: [],
      tableData: []
    }
  },
  mounted() {
    this.createMap()
    this.getDefectMapPoint()
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
      // 关闭按钮
    handleClose() {
      this.dialogVisible = false;
    },
     handleClick() {},
    // 地图坐标点
    async getDefectMapPoint() {
      var that = this
      const res = await getDefectMap()
      var markerPointArr = res.data.data
     var tempArr = [] // 遍历坐标点画线用
      if (markerPointArr) {
        for (var i = 0; i < markerPointArr.length; i++) {
          var item = markerPointArr[i]
          var point = new BMap.Point(item.longitude, item.latitude) // 生成点longitude
          tempArr.push(point) // 每遍历一次把点放在数组里  留画线或轨迹用
          var myIcon = new BMap.Icon(that.img, new BMap.Size(30, 30)) // 创建坐标图
          myIcon.imageSize = new BMap.Size(30,30);
          var marker = new BMap.Marker(point, { icon: myIcon }) //  创建标记点
          // var timer = item.INSPECT_TIME.substring(11, 16) // 截取时间
           var address
         if(item.address !=undefined && item.address !=null && item.address != '' ){
            address = item.address.substring(0, 6)
         }else{
           address = item.address
         }
          var label = new BMap.Label(address, { offset: new BMap.Size(-25, -20) })
          label.setStyle({
            background: '#fff',
            border: '1px solid #0088a1',
            color: '#000',
            padding: '1px 5px',
            borderRadius: '5px'
          })
          marker.setLabel(label) // 生成 文字提示
          marker.item = item //  每一个坐标 等于marker的 一个点
          this.map.addOverlay(marker);
           marker.addEventListener('click',function(e){

                that.itemObj = e.currentTarget.item;
                  that.dialogVisible = true;
                    var ruleFrom = {
                     
                    };
                that.getLiucheng()
                 })
        }
        
      }
    },
    async   getLiucheng(){
      var that=this;
             const res = await getLc(that.itemObj.obj_id)
              that.lcList = res.data.data

      },

  }
}
</script>
<style scoped>
#allmap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  font-family: "微软雅黑";
}
.content {
  background-color: #fff !important;
  color: #118477 !important;
  border-right: none;
  position: relative;
  height:100%;
}

.allmapBox {
  position: relative;
  top: 0;
  width: 100%;
  height: 100%;
}
.allmap {
  width: 100%;
  height:100%;
}
/* 弹出框 */

.markerBox {
  position: absolute;
  top: 12%;
  right: 4px;
   width: 340px;
  height: 480px;
  border:2px solid #05c5b9;
  color: #2a2a2a;
  background: #fff;
  z-index: 33;
  box-sizing: border-box;
}
.detailTitle {
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #fff;
  background: #10a89f;
}
.titleType {
  float: left;
  width: 60%;
  height: 40px;
  margin-left: 20%;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.guanbi {
  float: right;
  width: 16%;
  margin-right: 1%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
}

/* tabs样式 */
.markerBox .el-tabs {
  width: 100%;
}
.markerBox >>> .el-tabs__nav-scroll {
  padding-left: 10px;
  /* padding-right:10px */
}
.markerBox >>> .el-tabs__nav-wrap::after {
  content: "";
  position: absolute;
  left: 10px;
  right: 0;
  bottom: 0;
  width: 94%;
  height: 1px;
  background-color: #2a71b3;
  z-index: 1;
}
.markerBox >>> .el-tabs__item {
  padding: 0 0 0 18px;
  color: #2a2a2a;
  font-size: 14px;
}
.markerBox >>> .el-tabs__active-bar.is-top{

      width: 56px !important;
      margin-left: 0px;
}
.markerBox >>> .el-tabs__active-bar {
  background-color: #10a89f;
}
.markerBox >>> .el-tabs__item.is-active {
  color: #0a8780;
}
.titleContent {
  width: 100%;
  height: calc(100% - 50px);
  color: #2a2a2a;
  /* background: red; */
  overflow: auto;
}
.titleContent >>> .basicInfo {
  position: relative;
  top: 0;
  padding: 0 10px;
  height: 100%;
  overflow: auto;
  /* background: red; */
}
.titleContent .basicInfo >>> .basicInfoItem {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

