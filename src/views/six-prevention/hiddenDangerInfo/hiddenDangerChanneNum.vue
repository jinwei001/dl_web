<template>
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="ruleForm" inline>
          <!-- <el-form-item>
            <el-select v-model="ruleFrom.voltage" clearable placeholder="请选择">
              <el-option
                v-for="item in voltageArr"
                :key="item.objId"
                :label="item.groupname"
                :value="item.objId"
              />
            </el-select>
          </el-form-item> -->
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
          size="mini"
          :header-cell-style="{'background':'#cddce6',borderColor: '#c4c8cf'}"
          :cell-style="center"
          :data="tableData"
          highlight-current-row
        >
          <el-table-column type="index" label="序号" />
          <el-table-column property="sixType" :show-overflow-tooltip="true" label="六防类型" />
          <el-table-column property="dianLan" :show-overflow-tooltip="true" :label="`${$dl}名称`" />
          <el-table-column
            property="yinHuanSheBeiLeiXing"
            :show-overflow-tooltip="true"
            label="隐患设备类型"
          />
          <el-table-column property="yinHuanBuWei" :show-overflow-tooltip="true" label="隐患部位" />
          <el-table-column property="yinHuanSheBei" :show-overflow-tooltip="true" label="隐患设备" />
          <el-table-column property="lineName" :show-overflow-tooltip="true" :label="`${$xl}名称`" />
          <el-table-column property="xiangWei" :show-overflow-tooltip="true" :label="`${$xb}`" />
          <el-table-column label="操作" width="60" fixed="right">
            <template slot-scope="scope">
              <p style="color:#1e88e5" @click="showPerson(scope.row)">查看</p>
            </template>
          </el-table-column>
        </el-table>

        <div class="listPagination">
          <pagination
            v-show="ruleFrom.total>=0"
            class="pagination"
            :total="ruleFrom.total"
            style="position:left:0;top:0"
            :page.sync="ruleFrom.nowPage"
            :limit.sync="ruleFrom.pageSize"
            @current-change="handleCurrentChange"
            @pagination="getList"
          />
        </div>
      </div>
      <div class="allmapBox">
        <div id="allmap" ref="allmap" class="allmap" />
        <div v-if="dialogVisible" class="markerBox">
          <div class="detailTitle">
            <div class="titleType">{{ hiddenChanneNum }}</div>
            <div class="guanbi" @click="handleClose">X</div>
          </div>
          <div class="detailContent">
            <div class="contentItem">发现单位:{{ itemObj.faXianBanZuName }}</div>
            <div class="contentItem">经度：{{ itemObj.longitude }}</div>
            <div class="contentItem">纬度：{{ itemObj.latitude }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getHiddenType6,
  getHiddenPage,
  getHiddenMapPoint
} from '@/api/Sixdefensemanagement/hiddenDangerInfo.js'
import Pagination from '@/components/Pagination2'
export default {
  components: {
    Pagination
  },
  props: ['hiddenDangerChanneNum'],

  data() {
    return {
      center: {
        'text-align': 'center'
      },
      hiddenChanneNum: this.hiddenDangerChanneNum,

      ruleFrom: {
        voltage: '',
        startTime: '',
        endTime: '',
        nowPage: 1,
        pageSize: 10,
        total: 0
      },
      img: require('../../../icons/static/yinhuan.png'),
      tableData: [],
      voltageArr: [],
      resultArr: [],
      marker: null,
      dialogVisible: false,
      itemObj: {}
    }
  },
  mounted() {
    // this.getEcharts1()
    this.createMap()
    this.getHiddenList()
    this.gethiddenPageList()
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
    // 重置
    onReset() {
      this.ruleFrom.startTime = ''
      this.ruleFrom.endTime = ''
      // this.ruleFrom.hiddenType = ''
      this.map.clearOverlays(this.marker)
      this.dialogVisible = false
    },
    // 搜索
    onSearch() {
      this.map.clearOverlays(this.marker)

      this.gethiddenPageList()
    },
    // 左上角图表
    getEcharts1(x, y) {
      var myChart1 = this.$echarts.init(document.getElementById('echart1'))
      var dataX = x
      var dayY = y
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
          top: '2%',
          left: '2%',
          right: '1%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          name: '日期',
          type: 'category',
          axisLine: {
            // y轴
            show: false
          },
          // splitLine: {
          //   show: false
          // },
          axisTick: {
            alignWithLabel: true,
            show: false
          },
          data: dayY,
          nameTextStyle: {
            fontSize: 16
          }
        },
        yAxis: {
          name: '数值',
          type: 'value',
          axisLine: {
            // y轴线
            show: false
          },
          axisTick: {
            // y轴刻度线
            show: false
          },
          // y轴 内图线
          splitLine: {
            show: true
          }
        },
        series: [
          {
            name: '日期',
            data: dataX,
            nameTextStyle: {
              fontSize: 16
            },
            type: 'line'
          }
        ]
      }
      myChart1.setOption(option)
    },
    // 隐患变化数量趋势接口
    async getHiddenList() {
      var that = this
      var EchartDataList = []
      var EchartDayList = []
      var params = {
        startTime: that.ruleFrom.startTime,
        endTime: that.ruleFrom.endTime
      }
      const res = await getHiddenType6(params)
      EchartDataList = res.data.data.dataList
      EchartDayList = res.data.data.dayList
      // that.getEcharts1(EchartDataList, EchartDayList)
    },
    // 获取表格
    async gethiddenPageList() {
      var that = this
      var params = {
        nowPage: that.ruleFrom.nowPage,
        pageSize: that.ruleFrom.pageSize,
        startTime: that.ruleFrom.startTime,
        endTime: that.ruleFrom.endTime
      }
      const res = await getHiddenPage(params)
      that.tableData = res.data.data.showList
    },
    // 获取地图坐标点
    async getMapPointList() {
      var that = this
      var params = {
        status: that.ruleFrom.disposeState,
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
          var label = new BMap.Label(piontName, {
            offset: new BMap.Size(-30, -22)
          })
          label.setStyle({
            background: '#fff',
            border: '1px solid #0088a1',
            color: '#000',
            padding: '1px 5px',
            borderRadius: '5px'
          })
          that.marker.setLabel(label) // 生成 文字提示
          that.marker.addEventListener('click', function(e) {
            // //console.log(e)
            that.itemObj = e.target.item
            that.dialogVisible = true
          })
          that.marker.item = item //  每一个坐标 等于marker的 一个点
        }
      }
    },
    // 分页封装
    getList() {},
    // 切换分页
    handleCurrentChange(cpage) {
      this.ruleFrom.nowPage = cpage
      this.gethiddenPageList()
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
  position: relative;
  height: 100%;
}

.content .leftWarp {
  float: left;
  position: relative;
  top: 0;
  width: 320px;
  height: 100%;
}
.leftWarp >>> .el-table {
  width: 100%;
  height: 100%;
}
.tableBox {
  width: 100%;
  /* height:100%; */
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
/deep/.listPagination {
  position: absolute;
  bottom: 50px;
  width: 100%;
  height: 50px;
}
.listPagination >>> .pagination {
  width: 100%;
  height: 50px;
  padding: none;
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
