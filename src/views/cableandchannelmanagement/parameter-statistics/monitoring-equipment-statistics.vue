<template>
  <!--   <h2>
     监测设备统计
  </h2> -->
  <div>
    <!-- ----------------------------------[图表区]---------------------------------------- -->
    <el-row :gutter="20" style="margin-bottom: 1rem;">
      <el-col :span="12">
        <el-card class="tz-box-card">
          <!-- 图表待开发 -->
          <MonochromeStereoHistogram style="height: 300px;" :chartdata="chart1data" :chartsConfiguration='charts1Configuration'/>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="tz-box-card">
          <!-- 图表待开发 -->
          <MonochromeStereoHistogram style="height: 300px;" :chartdata="chart2data" :chartsConfiguration='charts1Configuration'/>
        </el-card>
      </el-col>
    </el-row>
    <!-- ----------------------------------[搜索栏]---------------------------------------- -->

    <div class="content">
      <el-table
        :data="tableData"
        style="border: 1px solid #c7c7c7"
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
import MonochromeStereoHistogram from '@/charts/Histogram/MonochromeStereoHistogram'
export default {
  name: '',
  components: {
    Pagination,
    MonochromeStereoHistogram
  },
  data() {
    return {
      form: {
        // ----------分页关键字-----------
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      tabisoverflow: true,
      // 表头
      tableTitle: [
        {
          label: this.$xl + '名称',
          prop: 'LineName'
        },
        {
          label: this.$dydj,
          prop: 'VoltageLevel'
        },
        {
          label: '设备主人',
          prop: 'EquipmentOwner'
        },
        {
          label: '运维班组',
          prop: 'OwnedLine'
        },
        {
          label: '评论状态',
          prop: 'OperationsTeam'
        },
        {
          label: '投运时间',
          prop: 'CommissioningTime'
        }
      ],
      // 列表数据集合
      tableData: [
        {
          id: '1',
          LineName: this.$xl + '一',
          VoltageLevel: '一级',
          EquipmentOwner: '王大',
          OwnedLine: 'A组',
          OperationsTeam: '好评',
          CommissioningTime: '2018-6-8',
        },
        {
          id: '2',
          LineName: this.$xl + '二',
          VoltageLevel: '一级',
          EquipmentOwner: '王大',
          OwnedLine: 'A组',
          OperationsTeam: '好评',
          CommissioningTime: '2018-6-8',
        }
      ],
      charts1Configuration: {
        title: ''
      },
      charts2Configuration: {
        title: ''
      },
      chart1data: [
        {
          xAxisName: '气体传感器',
          value: '102',
          edgecolor: '#97cfff',
          columnColor: '#69b9fd'
        },
        {
          xAxisName: '光纤传感器',
          value: '68',
          edgecolor: '#97cfff',
          columnColor: '#69b9fd'
        },
        {
          xAxisName: '烟雾传感器',
          value: '98',
          edgecolor: '#97cfff',
          columnColor: '#69b9fd'
        }, {
          xAxisName: '水位传感器',
          value: '35',
          edgecolor: '#97cfff',
          columnColor: '#69b9fd'
        },
        {
          xAxisName: '摄像头传感器',
          value: '120',
          edgecolor: '#97cfff',
          columnColor: '#69b9fd'
        },
        {
          xAxisName: '井盖电控锁',
          value: '110',
          edgecolor: '#97cfff',
          columnColor: '#69b9fd'
        }
      ],
      chart2data: [
        {
          xAxisName: '气体传感器',
          value: '102',
          edgecolor: '#ff8484',
          columnColor: '#ff6b6b'
        },
        {
          xAxisName: '光纤传感器',
          value: '68',
          edgecolor: '#ff8484',
          columnColor: '#ff6b6b'
        },
        {
          xAxisName: '烟雾传感器',
          value: '98',
          edgecolor: '#ff8484',
          columnColor: '#ff6b6b'
        }, {
          xAxisName: '水位传感器',
          value: '35',
          edgecolor: '#ff8484',
          columnColor: '#ff6b6b'
        },
        {
          xAxisName: '摄像头传感器',
          value: '120',
          edgecolor: '#ff8484',
          columnColor: '#ff6b6b'
        },
        {
          xAxisName: '井盖电控锁',
          value: '110',
          edgecolor: '#ff8484',
          columnColor: '#ff6b6b'
        }
      ]
    }
  },
  mounted() {
    // this.renderChart();
  },
  methods: {
    /**
     * 创建图表实例
     */
    renderChart() {
      const dom = this.$echarts.init(this.$refs.chart)
      dom.setOption(ParameterStatisticsDefault)
      // 渲染图表
      dom.setOption({
        legend: [
          {
            data: this.legendData
          }
        ],
        xAxis: [
          {
            data: this.xAxisData
          }
        ],
        series: [
          {
            data: this.yAxisData[0]
          },
          {
            data: this.yAxisData[0]
          },
          {
            data: this.yAxisData[0]
          },
          {
            data: this.yAxisData[1]
          },
          {
            data: this.yAxisData[1]
          },
          {
            data: this.yAxisData[1]
          },
          {
            data: this.yAxisData[2]
          },
          {
            data: this.yAxisData[2]
          },
          {
            data: this.yAxisData[2]
          }
        ]
      })
    },
    /**
     * 查询按钮
     */
    onSearch() {
      //console.log('查询')
    },
    /**
     * 重置按钮
     */
    reset() {
      //console.log('重置按钮')
    },
    // 选中数据
    CheckFun(val) {
      this.CheckedSelection = val
      //console.log(this.CheckedSelection)
    },
    getList() {}
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
