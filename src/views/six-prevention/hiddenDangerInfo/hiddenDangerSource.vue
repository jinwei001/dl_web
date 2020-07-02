<template>
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="ruleForm" inline>
          <el-form-item>
            <el-select v-model="ruleFrom.hiddenSource" clearable placeholder="请选择">
              <el-option
                v-for="item in hiddenSourceArr"
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
          <el-table-column property="faXianFangShiName" :show-overflow-tooltip="true" label="隐患来源" />
          <el-table-column property="faXianYuanDanWeiName" :show-overflow-tooltip="true" label="发现原单位名称" />
          <el-table-column property="faXianYuanLanXiRenName" :show-overflow-tooltip="true" label="隐患原联系人" />

          <el-table-column label="操作" width="60" fixed="right">
            <template slot-scope="scope">
              <!-- <p style="color:#1e88e5" @click="showPerson(scope.row)">查看</p> -->
            </template>
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
        <div v-if="dialogVisible" class="markerBox">
          <div class="detailTitle">
            <div class="titleType">{{ hiddenSource }}</div>
            <div class="guanbi" @click="handleClose">X</div>
          </div>
          <div class="detailContent">
            <div class="contentItem">隐患来源名称：{{ itemObj.faXianFangShiName }}</div>
            <div class="contentItem">经度：{{ itemObj.longitude }}</div>
            <div class="contentItem">纬度：{{ itemObj.latitude }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHiddenType, getHiddenPageSize, getHiddenTypeSelect, getHiddenMapPoint } from '@/api/Sixdefensemanagement/hiddenDangerInfo.js'
import Pagination from '@/components/Pagination2'

export default {
  components: {
    Pagination
  },
  props: ['hiddenDangerSource'],
  data() {
    return {
      center: {
        'text-align': 'center'
      },
      hiddenSource: this.hiddenDangerSource,
      ruleFrom: {
        hiddenSource: '',
        startTime: '',
        endTime: '',
        total: 0,
        pageNum: 1,
        limit: 10
      },
      img: require('../../../icons/static/yinhuan.png'),
      tableData: [],
      hiddenSourceArr: [],
      // 隐患图表list
      hiddenEchart: [],
      // map点list
      resultArr: [],
      marker: null,
      dialogVisible: false,
      itemObj: {}

    }
  },
  created() {},
  mounted() {
    // echarts实例显示
    // this.getEcharts1()
    // 获取地图实例
    this.createMap()
    // 获取隐患信息管理类型
    this.getHiddenList()
    this.getHiddenSourceSelectList()
    // 默认进来展示列表
    this.getHiddenPageSizeList()
    // 获取地图坐标点
    // this.getMapPointList()
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
    // 重置
    onReset() {
      this.ruleFrom.startTime = ''
      this.ruleFrom.endTime = ''
      this.ruleFrom.hiddenSource = ''
      this.map.clearOverlays(this.marker)
      this.dialogVisible = false
    },
    // 搜索
    async onSearch() {
      this.map.clearOverlays(this.marker)

      var that = this
      var params = {
        startTime: that.ruleFrom.startTime,
        endTime: that.ruleFrom.endTime,
        findtype: that.ruleFrom.hiddenSource
      }
      const res = await getHiddenPageSize(params)
      var resultArr = res.data.rows
      that.tableData = resultArr[0].dataList
      that.ruleFrom.total = resultArr[0].totleNumber
      if (that.ruleFrom.hiddenSource == '') {
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
    // 隐患来源下拉框
    async getHiddenSourceSelectList() {
      var that = this
      const res = await getHiddenTypeSelect()
      var result = res.data
      that.hiddenSourceArr = result[0].faXianFangShi
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
    // 隐患类型接口
    async getHiddenList() {
      var that = this
      var hiddenEchart1 = []
      var hiddenEchart2 = []
      var params = {
        hdType: 2,
        startTime: that.ruleFrom.startTime,
        endTime: that.ruleFrom.endTime
      }
      const res = await getHiddenType(params)
      // //console.log(res)
      that.hiddenEchart = res.data.data.tu
      for (var i = 0; i < that.hiddenEchart.length; i++) {
        hiddenEchart1.push(that.hiddenEchart[i].sixType)
        hiddenEchart2.push(that.hiddenEchart[i].num)
      }

      // this.getEcharts1(hiddenEchart1, hiddenEchart2)
    },
    // 获取地图坐标点
    async getMapPointList() {
      var that = this
      var params = {
        findtype: that.ruleFrom.hiddenSource,
        startTime: that.ruleFrom.startTime,
        endTime: that.ruleFrom.endTime
      }
      const res = await getHiddenMapPoint(params)
      that.resultArr = res.data.rows
      // var tempArr = []
      if (that.resultArr.length > 0) {
        for (var i = 0; i < that.resultArr.length; i++) {
          var item = that.resultArr[i]
          var point = new BMap.Point(item.longitude, item.latitude) // 生成点
          var myIcon = new BMap.Icon(that.img, new BMap.Size(40, 40)) // 创建坐标图
          that.marker = new BMap.Marker(point, { icon: myIcon }) //  创建标记点
          that.map.addOverlay(that.marker)
          var piontName = item.hdeqtype // 截取时间
          var label = new BMap.Label(piontName, { offset: new BMap.Size(-30, -22) })
          label.setStyle({
            background: '#fff',
            border: '1px solid #0088a1',
            color: '#000',
            padding: '1px 5px',
            borderRadius: '5px'
          })
          that.marker.setLabel(label) // 生成 文字提示

          that.marker.addEventListener('click', function(e) {
            // that.map.openInfoWindow(infoWindow, point) // 开启信息窗口
            // //console.log(e)
            that.itemObj = e.target.item
            that.dialogVisible = true
          })
          that.marker.item = item //  每一个坐标 等于marker的 一个点
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
.chakan{
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
  color:#fff;
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
</style>
