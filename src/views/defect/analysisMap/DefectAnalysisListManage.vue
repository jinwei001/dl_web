<template>
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="ruleForm" inline>
          <el-form-item :label="`${$dydj}`">
            <el-select v-model="ruleFrom.voltage" clearable placeholder="请选择">
              <el-option
                v-for="item in voltageArr"
                :key="item.id"
                :label="item.voltageRank "
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="`所属${$xl}`">
            <el-select v-model="ruleFrom.lineName" clearable placeholder="请选择">
              <el-option
                v-for="item in lineNameArr"
                :key="item.line_id"
                :label="item.line_name"
                :value="item.line_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="年份">
            <el-date-picker
              v-model="ruleFrom.year"
              type="year"
              placeholder="选择年"
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
      <div class="topWarp">
        <div id="echart1" ref="echart1" class="echart1" />
      </div>
      <div class="zhongWarp">
        <div id="echart2" ref="echart2" class="echart2" />
        <div id="echart3" ref="echart3" class="echart3" />
      </div>
      <el-table
        id="tableData"
        ref="singleTable"
        class="tableBox"
        size="mini"
        :header-cell-style="{'background':'#cddce6',borderColor: '#c4c8cf',textAlign:'center'}"
        :cell-style="center"
        :data="tableData"
        highlight-current-row
      >
        <el-table-column type="index" :show-overflow-tooltip="true" label="序号" width="70" />
        <el-table-column property="line_name" :show-overflow-tooltip="true" :label="`${$xl}名称`" />
        <el-table-column property="discovery_time" :show-overflow-tooltip="true" label="发现时间" />
        <el-table-column property="bj" :show-overflow-tooltip="true" label="所属部件" />
        <el-table-column property="qx_status" :show-overflow-tooltip="true" label="状态">
          <template slot-scope="scope">
            <p v-if="scope.row.qx_status == '0'">待确认</p>
            <p v-if="scope.row.qx_status == '1'">已确认</p>
            <p v-if="scope.row.qx_status == '2'">计划中</p>
            <p v-if="scope.row.qx_status == '3'">处理中</p>
            <p v-if="scope.row.qx_status == '4'">已消缺</p>
          </template>
        </el-table-column>
        <el-table-column property="voltage_rank" :show-overflow-tooltip="true" :label="`${$dydj}`" />

        <el-table-column label="操作" width="60" fixed="right">
          <!-- <template slot-scope="scope"> -->
            <!-- <p style="color:#1e88e5" @click="showPerson(scope.row)">查看</p> -->
          <!-- </template> -->
        </el-table-column>
      </el-table>
      <div class="listPagination">
        <pagination
          v-show="ruleFrom.total>=0"
          class="pagination"
          :total="ruleFrom.total"
          style="position:left:0;top:0"
          :page.sync="ruleFrom.PageNum"
          :limit.sync="ruleFrom.pageSize"
          @current-change="handleCurrentChange"
          @pagination="getList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  getLine,
  getEcharts1,
  getEcharts2,
  getEcharts3,
  getDefectPage

} from '@/api/defect/infomationList/index'
import Pagination from '@/components/Pagination2'
export default {
  name: 'InfomationList',
  components: {
    Pagination
  },
  data() {
    return {
      center: {
        'text-align': 'center'
      },
      ruleFrom: {
        voltage: '',
        lineName: '',
        year: '' + new Date().getFullYear(),
        PageNum: 1,
        pageSize: 10,
        total: 0
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }],

      voltageArr: [
        { id: '1', voltageRank: '35'+this.$qf },
        { id: '2', voltageRank: '110'+this.$qf },
        { id: '3', voltageRank: '220'+this.$qf }
      ],
      lineNameArr: []
    }
  },
  mounted() {
    //   图表
    this.getEcharts1()
    this.getEcharts2()
    this.getEcharts3()
    // 所属xl
    this.getLineList()
    // 获取列表
    this.getDefectPageList()
  },
  methods: {
    //   所属xl
    async getLineList() {
      var that = this
      const res = await getLine()
      that.lineNameArr = res.data.data
    },
    // 重置
    onReset() {
      this.voltageArr = []
      this.lineNameArr = []
    },
    // 搜索
    onSearch() {
    //   this.gethiddenPageList()
    },
    // 图表1
    async getEcharts1() {
      var myChart1 = this.$echarts.init(document.getElementById('echart1'))
      var params = {
        year: this.ruleFrom.year,
        voltageRank: this.ruleFrom.voltage,
        lineId: this.ruleFrom.lineName
      }
      const res = await getEcharts1(params)
      var dataArr = res.data.data
      var dataX = []
      var dataY = []
      dataArr.forEach(item => {
        dataX.push(item.num)
        dataY.push(item.qx_date)
      })
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
          bottom: '1%',
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
          data: dataY,
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
    // 图表2
    async getEcharts2() {
      var myChart2 = this.$echarts.init(document.getElementById('echart2'))
      var params = {
        year: this.ruleFrom.year,
        voltageRank: this.ruleFrom.voltage,
        lineId: this.ruleFrom.lineName
      }
      const res = await getEcharts2(params)
      var dataArr = res.data.data
      var data1 = []
      dataArr.forEach(item => {
        data1.push(item.name)
      })
      var option = {
        // title: {
        //   text: '某站点用户访问来源',
        //   subtext: '纯属虚构',
        //   left: 'center'
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: data1,
          icon: 'circle',
          x: 'right', // 'center' | 'left' | {number},

          y: 'top', // 'center' | 'bottom' | {number}
          padding: 30 // [5, 10, 15, 20]

        },
        color: ['#00e5de', '#ffde1f', '#ff9a26'],
        series: [
          {
            name: '部件扇形统计',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: dataArr,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart2.setOption(option)
    },
    // 图表3
    async getEcharts3() {
      var myChart3 = this.$echarts.init(document.getElementById('echart3'))
      var params = {
        year: this.ruleFrom.year,
        voltageRank: this.ruleFrom.voltage,
        lineId: this.ruleFrom.lineName
      }
      const res = await getEcharts3(params)
      var dataArr = res.data.data
      var data1 = []
      dataArr.forEach(item => {
        data1.push(item.name)
      })
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: data1,
          icon: 'circle',
          x: 'right', // 'center' | 'left' | {number},

          y: 'top', // 'center' | 'bottom' | {number}
          padding: 30 // [5, 10, 15, 20]
        },
        color: ['#00e5de', '#ffde1f', '#ff9a26', '#ff6b6b'],
        series: [
          {
            name: '状态扇形统计',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: dataArr,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      myChart3.setOption(option)
    },
    // 获取表格
    async getDefectPageList() {
      var that = this
      var params = {
        year: that.ruleFrom.year,
        voltageRank: that.ruleFrom.voltage,
        lineId: that.ruleFrom.lineName
      }
      const res = await getDefectPage(params)
      //console.log(res)
      that.tableData = res.data.rows
    },

    // 分页封装
    getList() {},
    // 切换分页
    handleCurrentChange(cpage) {
      this.ruleFrom.nowPage = cpage
      this.gethiddenPageList()
    }
  }
}
</script>

<style  scoped>
.main-body {
  height: 100%;
  overflow: auto;
  padding: 20px 10px 1rem;
}

.content {
  background-color: #fff !important;
  color: #118477 !important;
  border-right: none;
  position: relative;
  height: 100%;
}

.content .topWarp {
  position: relative;
  top: 0;
  width: 100%;
  height: 260px;
}
.echart1 {
  width: 100%;
  height: 100%;
  text-align: center;
}
.content .zhongWarp {
  position: relative;
  top: 0;
  width: 100%;
  height: 260px;
  margin-top: 20px;
}
.echart2 {
  float: left;
  width: 49%;
  height: 100%;
  text-align: center;
  margin-right: 2%;
}
.echart3 {
  float: left;
  width: 49%;
  height: 100%;
  text-align: center;
}

.topWarp >>> .el-table {
  width: 100%;
  height: 100%;
}
.topWarp >>> .el-table .has-gutter >>> tr {
  text-align: center;
}
.tableBox {
  width: 100%;
  height: 100%;
}

.tableBox >>> tr {
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
  width: 100%;
  height: 60px;
  margin-top: 20px;
}
.listPagination >>> .pagination {
  width: 100%;
  height: 50px;
  padding: none;
}
</style>
