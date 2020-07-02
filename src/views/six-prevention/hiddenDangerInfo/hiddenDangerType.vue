<template>
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="ruleForm" inline>
          <el-form-item>
            <el-select v-model="ruleFrom.hiddenType" clearable placeholder="请选择">
              <el-option
                v-for="item in hiddenTypeArr"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item style="float: left;" label="开始日期">
            <el-date-picker
              v-model="ruleFrom.startTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item style="float: left;" label="结束日期">
            <el-date-picker
              v-model="ruleFrom.endTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item>
            <el-button class="onSearch" @click="onReset">重置</el-button>
            <el-button class="onSearch" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content">
      <div class="leftWarp">
        <!-- <div id="echart1" class="leftWarp-echart" /> -->
        <el-table
          id="tableData"
          ref="singleTable"
          class="tableBox"
          :header-cell-style="{'background':'#cddce6',borderColor: '#c4c8cf'}"
          :cell-style="center"
          :data="tableData"
          highlight-current-row
        >
          <el-table-column property="liuFangName" :show-overflow-tooltip="true" label="隐患类型" />
          <el-table-column property="dianLanName" :show-overflow-tooltip="true" :label="`${$dl}名称`" />
          <el-table-column property="faXianRenName" :show-overflow-tooltip="true" label="发现人" />

          <el-table-column label="操作" width="60" fixed="right">
          
          </el-table-column>
        </el-table>
        <div class="listPagination">
          <pagination
            v-show="ruleFrom.total>0"
            class="pagination"
            :total="ruleFrom.total"
            style="position:left:0;top:0"
            :page.sync="ruleFrom.pageNum"
            :limit.sync="ruleFrom.limit"
            @current-change="handleCurrentChange"
            @pagination="getList"
          />
        </div>
      </div>
      <div class="allmapBox">
        <div id="allmap" ref="allmap" class="allmap" />
          <div class="markerBox" v-if="dialogVisible">
                        <div class="detailTitle">
                          <div class="titleType">隐患信息</div>
                          <div class="guanbi" @click="handleClose">X</div>
                        </div>
                        <div class="titleContent">
                          <el-tabs v-model="activeName" @tab-click="handleClick">
                              <el-tab-pane label="基本信息" name="first" >
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
import { getHiddenMapPoint, getHiddenTypeSelect, getHiddenPageSize ,tHiddendangerMessagegetEditeInfo} from '@/api/Sixdefensemanagement/hiddenDangerInfo.js'
import Pagination from '@/components/Pagination2'
  import qs from 'qs'
export default {
  components: {
    Pagination
  },
  props: ['hiddenDangerType'],
  data() {
    return {
      center: {
        'text-align': 'center'
      },
      hiddenType: this.hiddenDangerType,
      ruleFrom: {
        hiddenType: '',
        startTime: '',
        endTime: '',
        total: 0,
        pageNum: 1,
        limit: 10
      },
      activeName: "first",
      map: null,
      img: require('../../../icons/static/yinhuan.png'),
       yiban: require('../../../icons/static/yinhuan_yiban.png'),
      yanzhong:require('../../../icons/static/yinhuan_yanzhong.png'),
      weiji: require('../../../icons/static/yinhuan_weiji.png'), 
      tableData: [],
      // 隐患图表list
      hiddenEchart: [],
      hiddenTypeArr: [],
      // map点list
      resultArr: [],
      marker: null,
     itemObj:{},
      dialogVisible:false,
      resData:[ 
          ],

    }
  },
  created() {
  },
  mounted() {
    // echarts实例显示
    // this.getEcharts1()
    // 获取地图实例
    this.createMap()
    // 获取隐患信息管理类型
    // this.getHiddenList()
    // 隐患信息下拉框
    this.getHiddenTypeSelectList()
    // 左侧列表
    this.getHiddenPageSizeList()
    // 获取地图坐标点
    this.getMapPointList()
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
    // 重置
    onReset() {
      this.ruleFrom.startTime = ''
      this.ruleFrom.endTime = ''
      this.ruleFrom.hiddenType = ''
      this.map.clearOverlays(this.marker)
      this.dialogVisible = false
    },
     handleClick() {},
    // 搜索
    async onSearch() {
      this.map.clearOverlays(this.marker)
      var that = this
      var params = {
        sixhdtype: that.ruleFrom.hiddenType,
        startTime: that.ruleFrom.startTime,
        endTime: that.ruleFrom.endTime
      }
      const res = await getHiddenPageSize(params)
      var resultArr = res.data.rows
      that.tableData = resultArr[0].dataList
      that.ruleFrom.total = res.data.total
      if (that.ruleFrom.hiddenType == '') {
        return false
      } else {
        that.getMapPointList()
      }
    },
    // 左上角 echarts
    getEcharts1(x, y) {
      var myChart1 = this.$echarts.init(document.getElementById('echart1'))
      var dataX = x
      var dataY = y
      var option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '4%',
          left: '2%',
          right: '1%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {
              // y轴
              show: false
            },
            splitLine: {
              show: true
            },
            data: dataX,
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            axisLabel: {
              interval: 0,
              rotate: 40,
              fontSize: 14, // 字体大小
              formatter: function(params) {
                var newParamsName = ''
                var paramsNameNumber = params.length
                var provideNumber = 3
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
                if (paramsNameNumber > provideNumber) {
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = ''
                    var start = p * provideNumber
                    var end = start + provideNumber
                    if (p == rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber)
                    } else {
                      if (p > 2) {
                        tempStr = '...'
                        newParamsName += tempStr
                        break
                      } else {
                        tempStr = params.substring(start, end)
                        if (p < 2) {
                          tempStr += '\n'
                        }
                      }
                    }
                    newParamsName += tempStr
                  }
                } else {
                  newParamsName = params
                }
                return newParamsName
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              // y轴
              show: false
            },
            axisTick: {
              // y轴刻度线
              show: false
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '数量',
            type: 'bar',
            barWidth: '60%',
            data: dataY,
            itemStyle: {
              normal: {
                // 柱形图圆角，初始化效果
                barBorderRadius: [12, 12, 12, 12],
                // 每根柱子颜色设置
                color: function(params) {
                  const colorList = [
                    '#8d0d8d',
                    '#00ffff',
                    '#ffff19',
                    '#1919ff',
                    '#199919',
                    '#ff1919'
                  ]
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      }

      myChart1.setOption(option)
    },

    // 隐患类型下拉框
    async getHiddenTypeSelectList() {
      var that = this
      const res = await getHiddenTypeSelect()
      var result = res.data
      that.hiddenTypeArr = result[1].liuFangYinHuan
    },
    // 左侧列表
    async getHiddenPageSizeList() {
      var that = this
      var params = {
        nowPage: that.ruleFrom.ruleFrom,
        pageSize: that.ruleFrom.limit
      }
      const res = await getHiddenPageSize(params)
      var resultArr = res.data.rows
      that.tableData = resultArr[0].dataList
      that.ruleFrom.total = resultArr[0].totleNumber
    },
    // 分页
    handleCurrentChange(cpage) {
      this.ruleFrom.pageNum = cpage
      this.getHiddenPageSizeList()
    },
    // 分页
    getList() {},
    // // 获取地图坐标点
    async getMapPointList() {
      var that = this
      var params = {
        sixhdtype: that.ruleFrom.hiddenType,
        startTime: that.ruleFrom.startTime,
        endTime: that.ruleFrom.endTime
      }
      const res = await getHiddenMapPoint(params)
       var  resultArr = res.data.rows;
        if (resultArr.length > 0) {
             that.allPoint=[];
            for (var i = 0; i < resultArr.length; i++) {
              var item = resultArr[i];
              var marker;
              if (item.longitude && item.latitude) {
                var point = new BMap.Point(item.longitude, item.latitude);
                console.log(item.longitude, item.latitude)
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
    // 关闭
    handleClose() {
      this.dialogVisible = false
    }

  }
}
</script>

<style  scoped>
#allmap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  font-family: "微软雅黑";
}
.main-body {
  height: calc(100vh - 160px);
  overflow: auto;
  padding: 0 20px 0 1rem;
}
/* .leftWarp-echart {
  width: 100%;
  height: 280px;
}
.leftWarp-echart1{
  width: 100%;
  height: 280px;
  text-align: center;
} */
.content {
  background-color: #fff !important;
  color: #118477 !important;
  border-right: none;
  height: 100%;
}

.content .leftWarp {
  float: left;
  position: relative;
  top: 0;
  width: 320px;
  height: 100%;
}

.tableBox {
  width: 100%;
  /* height: 100%; */
  height: calc(100%-80px);
}
.allmapBox {
  position: relative;
  top: 0;
  width: calc(100% - 320px);
  height: 100%;
  float: left;
}
.allmap {
  width: 100%;
  height: 100%;
}
.tableBox >>> tr{
  padding: 0 !important;
  height: 48px;
  line-height: 48px;
  font-size: 12px;
}
.tableBox >>> td {
  padding: 0 !important;
  height: 14px;
  line-height: 14px;
  font-size: 12px;
}
.chakan {
  cursor: pointer;
}
.markerBox {
  position: absolute;
  top: 5%;
  right: 0;
  width: 240px;
  height: 300px;
  background: rgba(0, 33, 104, 0.4);
}
.detailTitle {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #fff;
  background: rgba(72, 209, 204, 0.6);
}
.titleType {
  float: left;
  width: 85%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.guanbi {
  float: left;
  width: 10%;
  margin-right: 5%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
}
.detailContent {
  width: 100%;
  height: calc(100% - 50px);
  color: #fff;
  padding: 10px;
}
.contentItem {
  width: 100%;
  height: 40px;
  line-height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
.markerBox >>> .el-tabs--top.el-tabs--card .el-tabs__item:nth-child(2) {
    padding-left: 0px 
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
 padding: 0 !important;
  color: #2a2a2a;
  font-size: 14px;
}
.markerBox >>> .el-tabs__item:last-child {
 margin-left: 18px;
  
}
.markerBox >>>.el-tabs--top.el-tabs--card .el-tabs__item:nth-child(2) {

    padding-left:18px;
}
.main-body >>>.el-tabs__item:first-child{
padding-left: 0 !important;

}
.markerBox >>> .el-tabs__active-bar {
  background-color: #10a89f;
}
.markerBox >>> .el-tabs__item.is-active {
  color: #0a8780;
}
.el-tabs__item:first-child{

  padding-left: 0px !important;
}

</style>
