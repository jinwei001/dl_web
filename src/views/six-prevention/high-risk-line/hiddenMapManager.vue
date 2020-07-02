<template>
  <div class="main-body">
    <div class="content">
      <div class="allmapBox">
        <div id="allmap" ref="allmap" class="allmap" />
        <div class="markerBox" v-if="dialogVisible">
                        <div class="detailTitle">
                          <div class="titleType">隐患信息</div>
                          <div class="guanbi" @click="handleClose">X</div>
                        </div>
                        <div class="titleContent">
                          <el-tabs v-model="activeName" @tab-click="handleClick">
                              <el-tab-pane label="基本信息" name="first">
                                <div class="basicInfo">
                                  <div
                                    class="basicInfoItem"
                                    :title="itemObj.liuFangName"
                                  >YH类型:&nbsp; {{itemObj.liuFangName}}</div>
                                  <div
                                    class="basicInfoItem"
                                    :title="itemObj.sheBeiTypeName"
                                  >SB类型:&nbsp; {{itemObj.sheBeiTypeName}}</div>
                                  <div
                                    class="basicInfoItem"
                                    :title="itemObj.chuzZhiZhuangTaiName"
                                  >处置状态:&nbsp; {{itemObj.chuzZhiZhuangTaiName}}</div>
                                  <div
                                    class="basicInfoItem"
                                    :title="itemObj.dianYaName"
                                  >DYDJ: &nbsp;{{itemObj.dianYaName}}</div>
                                  <div
                                    class="basicInfoItem"
                                    :title="itemObj.linename"
                                  >XL名称:&nbsp;{{itemObj.linename}}</div>
                                  <div
                                    class="basicInfoItem"
                                    :title="itemObj.faXianBanZuName"
                                  >发现班组:&nbsp;{{itemObj.faXianBanZuName}}</div>
                                  <div
                                    class="basicInfoItem"
                                    :title="itemObj.faXianRenName"
                                  >发现人:&nbsp;{{itemObj.faXianRenName}}</div>
                                  <div
                                    class="basicInfoItem"
                                    :title="itemObj.finddate"
                                  >发现时间:&nbsp;{{itemObj.finddate}}</div>
                                </div>
                              </el-tab-pane>
                              <el-tab-pane label="流程信息" name="second">
                                <div class="liuchengInfo">
                                  <div class="liuchengInfoBox" v-for="(item,index) in resData" :key="index">
                                    <div class="basicInfoItem" :title="item.currentnodename">{{index+1}}.&nbsp;当前节点: &nbsp;{{item.currentnodename}} </div>
                                    <div class="basicInfoItem" :title="item.currentprocessor + ' '+ item.currentdate">&nbsp;当前处理人：{{item.currentprocessor}} &nbsp;&nbsp;处理时间：{{item.currentdate}}</div>
                                    <div class="basicInfoItem" :title="item.opinion">&nbsp;处理意见：{{item.opinion}}</div>
                                  </div>
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
  diTuDianlist,tHiddendangerMessagegetEditeInfo
} from '@/api/Sixdefensemanagement/HiddenDangerReview.js'
  import qs from 'qs'
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
      resData:[ 
          ],
      yiban: require('../../../icons/static/yinhuan_yiban.png'),
      yanzhong:require('../../../icons/static/yinhuan_yanzhong.png'),
      weiji: require('../../../icons/static/yinhuan_weiji.png'),   
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
      _this.map = new BMap.Map('allmap', { minZoom: 11, maxZoom: 19 }) // 创建Map实例
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
      const res = await diTuDianlist()
      var resultArr = res.data.rows;
        if (resultArr.length > 0) {
             that.allPoint=[];
            for (var i = 0; i < resultArr.length; i++) {
              var item = resultArr[i];
              var marker;
              if (item.longitude && item.latitude) {
                var point = new BMap.Point(item.longitude, item.latitude); // 116是经度 X 32是纬度Y
                  that.allPoint.push(point);
                if (item.yinHuanDengJiName.indexOf("一般")>=0) {
                  var myIcon35 = new BMap.Icon(
                    that.yiban,
                    new BMap.Size(42, 42)
                  );
                  marker = new BMap.Marker(point, { icon: myIcon35 });
                } else if (item.yinHuanDengJiName.indexOf("严重")>=0) {
                  var myIcon110 = new BMap.Icon(
                    that.yanzhong,
                    new BMap.Size(42, 42)
                  );
                  marker = new BMap.Marker(point, { icon: myIcon110 });
                } else if (item.yinHuanDengJiName.indexOf("危急")>=0) {
                  var myIcon220 = new BMap.Icon(
                    that.weiji,
                    new BMap.Size(42, 42)
                  );
                  marker = new BMap.Marker(point, { icon: myIcon220 });
                }
                marker.item=item;
                that.map.addOverlay(marker); // 将点添加到地图中
               marker.addEventListener("click", function(e) {
                  that.itemObj =  e.currentTarget.item;
                  that.dialogVisible = true;
                  that.getliuchengInfo();
                });
              }
            }
           
            
          }
    },
    getliuchengInfo(){
      var that=this;
     
      const data = {
        objId: that.itemObj.objId
      }
      tHiddendangerMessagegetEditeInfo(qs.stringify(data)).then(response => {
        if (response.status === 200) {
           that.resData=response.data.rows[0].liuChengXinXi
        }
      })
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
  padding: 0 0 18px;
  color: #2a2a2a;
  font-size: 14px;
}
.markerBox >>> .el-tabs__item:first-child{
  margin-left: -20px;
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
.liuchengInfo {
  position: relative;
  top: 0;
  padding: 0 10px;
  height: calc(100% - 100px);
  overflow: auto;
  font-size: 12px;
}
.liuchengInfo .liuchengInfoBox {
  width: 100%;
  height: 120px;
  line-height: 120px;
}
.liuchengInfo .liuchengInfoBox >>> .basicInfoItem {
  width: 100%;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

