<template>
  <!--  <h2>
   dl通道运行年限占比
  </h2> -->
  <div>
    <el-card class="tz-box-card">
      <!-- 图表待开发 -->
      <PieCharts :id="id1" style="height: 400px;width: 100%;" :chartdata="chartdata1" />
    </el-card>
    <div class="content" style="margin-top: 1rem">
      <div class="main-userSelect">
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <el-form-item label="运行年限:">
              <el-input v-model="form.OperatingLife" clearable/>
              <!--<el-select v-model="form.OperatingLife" clearable placeholder="请选择">-->
                <!--<el-option-->
                  <!--v-for="item in selection.CheckOperatingLife"-->
                  <!--:key="item.id"-->
                  <!--:label="item.qb"-->
                  <!--:value="item.id"-->
                <!--/>-->
              <!--</el-select>-->
            </el-form-item>
            <el-form-item label="运行班组:">
              <!--<el-input v-model="form.whbz" clearable/>-->
              <el-select v-model="form.groupname" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.ywbz"
                  :key="item.groupId"
                  :label="item.groupname"
                  :value="item.groupname"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="设备主人:">
              <el-input v-model="form.sbzr" clearable/>
            </el-form-item> -->
            <el-form-item style="float: right;margin-right: 0">
              <el-button class="onSearch" @click="onSearch">查询</el-button>
              <el-button class="onSearch" style="margin-right: 0" @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
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
import ParameterStatisticsDefault from '../../../charts/parameter-statistics/parameter-statistics-default.js'
import Pagination from '@/components/Pagination'
import PieCharts from '@/charts/Hcharts/pie/3Dpie'
import {
  List,
  getLineLength,
} from "@/api/cableandchannel/parameter-statistics/cableChannelOperation";
import {getLineSelect} from '@/api/cableandchannel/channel-ledger-management/channel-ledger-management/cl-management'
export default {
  name: '',
  components: {
    Pagination,
    PieCharts
  },
  data() {
    return {
      id1: 'charts1', // 图表1ID
      chartdata1: {
        title: '', // 标题（参数必传可以为空）
        unit: '米', // 单位(参数必传可以为空)
        colors: ['#00e5de', '#ffde1f', '#ff9a26', '#ff6b6b'], // 图表项目颜色
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          itemMarginTop: 10,
          // borderWidth: 0,
          x: -20, // 距离x轴的距离
          y: 0 // 距离Y轴的距离
        },
        data: [
          {
            name: '1年之内',
            y: 10
          },
          {
            name: '1-5年',
            y: 10
          }, {
            name: '5-10年',
            y: 10
          }, {
            name: '10年以上',
            y: 10
          }
        ]
      },
      form: {
        // ----------搜素绑定关键字-----------
        OperatingLife: '', // 运行年限关键字
        whbz: '', // 运行班组关键字
        bzmc: '',
        sbzr: '', // 设备主人关键字
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
          label: '通道名称',
          prop: 'sdmc'
        },
        {
          label: '设备主人',
          prop: 'sbzr'
        },
        {
          label: '运维班组',
          prop: 'whbz'
        },
        {
          label: '风险评估',
          prop: 'riskStatus'
        },
        {
          label: '工井数量',
          prop: 'jsl'
        }
      ],
      tableData: [],
      selection: {
        ywbz: []
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
  mounted() {
    // this.renderChart();
    this.getList()
    this.getSelect()
  },
  methods: {
    // 获取下拉数据
    getSelect() {
      getLineSelect().then(response => {
        //console.log(response);
        if(response.status == 200) {
          this.selection.ywbz = response.data.data.groupList
        }
      })
    },
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
      // if(this.form.groupName){ // 运维班组
      //   let searcharr = this.selection.ywbz.filter(res=>{
      //     return this.form.groupName == res.groupId
      //   })
      //   this.form.groupName = searcharr[0]['groupname']
      // }
      // //console.log('查询')
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
        //console.log(response);
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
