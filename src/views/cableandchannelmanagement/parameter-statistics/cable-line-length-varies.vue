<template>
  <!--   <h2>
   近十年dlxl长度变化
  </h2> -->
  <div>
    <!-- ----------------------------------[图表区]---------------------------------------- -->
    <el-card class="tz-box-card">
      <!-- 图表待开发 -->
      <div id="myChart" style="height: 300px" />
      <!--          <div ref="chart" style="height: 300px">3D饼图图表待开发</div> -->
    </el-card>
    <!-- ----------------------------------[搜索栏]---------------------------------------- -->
    <div class="content" style="margin-top: 1rem">
      <div class="main-userSelect">
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <el-form-item :label="`${$dydj}:`">
              <!--<el-input v-model="form.voltageRank" clearable/>-->
              <el-select v-model="form.voltageRank" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.dydj"
                  :key="item.dydj"
                  :label="item.dydjmc"
                  :value="item.dydjmc"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="`${$xl}名称:`">
              <!--<el-input v-model="form.lineName" clearable/>-->
              <el-select v-model="form.lineId" clearable filterable placeholder="请选择">
                <el-option
                  v-for="item in selection.xlmc"
                  :key="item.lineId"
                  :label="item.lineName"
                  :value="item.lineId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="运维班组:">
              <!--<el-input v-model="form.groupname" clearable/>-->
              <el-select v-model="form.groupId" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.ywbz"
                  :key="item.groupId"
                  :label="item.groupname"
                  :value="item.groupId"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="设备主人:">
              <el-input v-model="form.facilityMaster" clearable/>
            </el-form-item> -->
            <el-form-item style="float: right;margin-right: 0">
              <el-button class="onSearch" @click="onSearch">查询</el-button>
              <el-button class="onSearch" style="margin-right: 0" @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
      <!--<el-tab-pane :label="`220${$qf}`" name="first" />-->
      <!--<el-tab-pane :label="`110${$qf}`" name="second" />-->
      <!--<el-tab-pane :label="`35${$qf}`" name="third" />-->
    <!--</el-tabs>-->
    <div class="content">
      <el-table
        :data="tableData"
        style="border: 1px solid #c7c7c7"
        height="400px"
        :cell-style="{borderColor: '#c7c7c7'}"
        :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}"
        border
        fit
        highlight-current-row
        @selection-change="CheckFun"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column
          v-for="item in tableTitle"
          :key="item.index"
          :prop="item.prop"
          :label="item.label"
          align="center"
          :show-overflow-tooltip="tabisoverflow"
        />
      </el-table>
      <pagination
        v-show="form.total>0"
        :total="form.total"
        :page.sync="form.pageNum"
        :limit.sync="form.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import {GETTBList} from '@/api/public'
import {
  List,
  getLineLength
} from "@/api/cableandchannel/parameter-statistics/cableLineLengthVaries";
import {getLineSelect} from "@/api/cableandchannel/cable-equipment-ledger/Line/index";
import Quantity from '../../../charts/parameter-statistics/changing-trend-of-cable-accessories-quantity'
export default {
  name: '',
  components: {
    Pagination
  },
  data() {
    return {
      list: [],
      echarts: null,
      activeName: 'first',
      dydj: ['220'+this.$qf,'110'+this.$qf,'35'+this.$qf],
      form: {
        // ----------搜素绑定关键字-----------
        voltageRank: '', // dydj关键字
        lineName: '', // xl名称关键字
        groupname: '', // 运维班组关键字
        facilityMaster: '', // 设备主人关键字
        // ----------分页关键字-----------
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      // 选中的数据
      CheckedSelection: [],
      tabisoverflow: true,
      // 表头
      tableTitle: [
        {
          label: this.$xl + '名称',
          prop: 'lineName'
        },
        {
          label: this.$dydj,
          prop: 'voltageRank'
        },
        {
          label: '设备主人',
          prop: 'facilityMaster'
        },
        {
          label: '运维班组',
          prop: 'groupName'
        },
        // {
        //   label: '评价状态',
        //   prop: 'appraiseStatus'
        // },
        {
          label: '投运时间',
          prop: 'transportTime'
        }
      ],
      // 列表数据集合
      tableData: [],
      selection: {
        ywbz: [],
        dydj: [],
        xlmc: [],
      },
      xAxisData: ['12', '3', '4', '5', '6', '7', '8'],
      yAxisData: [
        [220, 182, 191, 234, 290, 330, 310],
        [0, 0, 0, 0, 0, 0, 0],
        [111, 222, 333, 444, 555, 333, 222]
      ],
      legendData: ['柱体1', '柱体2', '柱体3']
    }
  },
  created() {
    this.gettb()
  },
  mounted() {
    this.renderChart()
    this.getList()
    this.getSelect()
  },
  methods: {
    handleClick(tab, event) {
      //console.log(tab, event)
      // 根据索引切换列表数据
    },
    // 获取下拉数据
    getSelect() {
      getLineSelect().then(response => {
        //console.log(response);
        if(response.status == 200) {
          this.selection.ywbz = response.data.data.groupList
          this.selection.dydj = response.data.data.dydjList
          this.selection.xlmc = response.data.data.lineList
        }
      })
    },
    gettb() {
      const _this = this
      GETTBList('/cable/cableAccessoryLength/select')
        .then(res => {
          //console.log(res, this.$dl + '附件长度')
          //console.log(_this.dydj[0])
          const data = res.data.data
          const xAxisData = []
          data.X.forEach(item =>{
            xAxisData.push(item.year)
          })
          const data1 = []
          xAxisData.forEach(item => {
            data1.push(0)
          })
          data.Y.forEach(function (item, index) {
            item.lineList.forEach(item => {
              if (item.voltageRank == _this.dydj[0]) {
                data1[index] = item.length
              }
            })
          })
          const data2 = []
          xAxisData.forEach(item => {
            data2.push(0)
          })
          data.Y.forEach(function (item, index) {
            item.lineList.forEach(item => {
              if (item.voltageRank == _this.dydj[1]) {
                data2[index] = item.length
              }
            })
          })
          //console.log(data2)
          const data3 = []
          xAxisData.forEach(item => {
            data3.push(0)
          })
          data.Y.forEach(function (item, index) {
            item.lineList.forEach(item => {
              if (item.voltageRank == _this.dydj[2]) {
                data3[index] = item.length
              }
            })
          })
          // 基于准备好的dom，初始化echarts实例
          const myChart = this.$echarts.init(document.getElementById('myChart'))
          // 绘制图表
          myChart.setOption({
            // 绘制图表
            title: {
              text: '',
              textStyle: {
                fontWeight: 'normal',
                fontSize: 16,
                color: '#F1F1F3'
              },
              left: '6%'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                lineStyle: {
                  color: '#57617B'
                }
              }
            },
            legend: {
              right: '2%',
              orient: 'vertical',
              icon: 'circle',
              itemWidth: 16, // 设置宽度
              itemHeight: 16, // 设置高度
              itemGap: 20, // 设置间距
              top: 90,
              data: ['220' + this.$qf, '110' + this.$qf, '35' + this.$qf],
              textStyle: {
                fontSize: 16,
                color: 'black'
              }
            },
            grid: {
              left: '3%',
              right: '10%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              boundaryGap: false,
              axisLine: {
                lineStyle: {
                  color: 'black'
                }
              },
              data: xAxisData
            }],
            yAxis: [{
              name: '公里',
              type: 'value',
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: 'black'
                }
              },
              axisLabel: {
                margin: 10,
                textStyle: {
                  fontSize: 14
                }
              },
              splitLine: {
                lineStyle: {
                  color: '#e6e6e6'
                }
              }
            }],
            series: [{
              name: '220' + this.$qf,
              type: 'line',
              smooth: true,
              lineStyle: {
                normal: {
                  width: 1
                }
              },
              areaStyle: {
                normal: {
                  color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(124,181,236, 0.3)'
                  }, {
                    offset: 0.8,
                    color: 'rgba(124,181,236, 0)'
                  }], false),
                  shadowColor: 'rgba(0, 0, 0, 0.1)',
                  shadowBlur: 10
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgb(124,181,236, 0.5)',
                  lineStyle: {
                    color: 'rgba(124,181,236,1)' // 改变折线颜色
                  }
                }
              },
              data: data1
            }, {
              name: '110' + this.$qf,
              type: 'line',
              smooth: true,
              lineStyle: {
                normal: {
                  width: 1
                }
              },
              areaStyle: {
                normal: {
                  color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(67,67,72, 0.3)'
                  }, {
                    offset: 0.8,
                    color: 'rgba(67,67,72, 0)'
                  }], false),
                  shadowColor: 'rgba(0, 0, 0, 0.1)',
                  shadowBlur: 10
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgba(67,67,72, 0.5)',
                  lineStyle: {
                    color: 'rgba(67,67,72,1)' // 改变折线颜色
                  }
                }
              },
              data: data2
            }, {
              name: '35' + this.$qf,
              type: 'line',
              smooth: true,
              lineStyle: {
                normal: {
                  width: 1
                }
              },
              areaStyle: {
                normal: {
                  color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(128,133,233, 0.3)'
                  }, {
                    offset: 0.8,
                    color: 'rgba(128,133,233, 0)'
                  }], false),
                  shadowColor: 'rgba(0, 0, 0, 0.1)',
                  shadowBlur: 10
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgba(128,133,233, 0.5)',
                  lineStyle: {
                    color: 'rgba(128,133,233,1)' // 改变折线颜色
                  }
                }
              },
              data: data3
            }]
          })
        })
        .catch(err => {
          //console.log(err)
        })
    },
    /**
     * 创建图表实例
     */
    renderChart(res, res1) {

    },
    /**
     * 查询按钮
     */
    onSearch() {
      // //console.log('查询')
      // if(this.form.groupName){ // 运维班组
      //   let searcharr = this.selection.ywbz.filter(res=>{
      //     return this.form.groupName == res.groupId
      //   })
      //   this.form.groupName = searcharr[0]['groupname']
      // }
      // if(this.form.lineName){ // xl名称
      //   let searcharr = this.selection.xlmc.filter(res=>{
      //     return this.form.lineName == res.lineId
      //   })
      //   this.form.lineName = searcharr[0]['lineName']
      // }
      // if(this.form.voltageRank){ // dydj
      //   let searcharr = this.selection.dydj.filter(res=>{
      //     return this.form.voltageRank == res.dydj
      //   })
      //   this.form.voltageRank = searcharr[0]['dydjmc']
      // }

      this.form.pageNum = 1
      this.getList()
    },
    /**
     * 重置按钮
     */
    reset() {
      // //console.log('重置按钮')
      this.form = { brand_right: 0 }
      this.form.pageNum = 1
      this.form.total = 0
      this.form.pageSize = 10
      this.getList()
    },
    // 选中数据
    CheckFun(val) {
      this.CheckedSelection = val
      //console.log(this.CheckedSelection)
    },
    // 获取数据
    getList() {
      List(this.$qs.stringify(this.form)).then(response => {
        //console.log(response,"asdasdsa");
        if (response.status == 200) {
          this.tableData = response.data.rows;
          this.form.total = response.data.total;
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  width: 100%;
  .el-card__body {
    padding: 0 !important;
  }
}
</style>
<style  lang="scss">
.change_contant {
  .el-card__body {
    padding: 0 !important;
  }
}
</style>
