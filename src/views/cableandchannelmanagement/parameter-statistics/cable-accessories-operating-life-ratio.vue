<template>
  <!--  <h2>
    dl附件运行年限占比
  </h2> -->
  <div>
    <el-card class="tz-box-card">
      <!-- 图表待开发 -->
      <div ref="chart" style="height: 300px"></div>
    </el-card>
    <div class="content" style="margin-top: 1rem">
      <div class="main-userSelect">
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <el-form-item label="运行年限:">
              <el-input v-model="form.runAgeLimit" clearable/>
              <!--<el-select v-model="form.OperatingLife" clearable placeholder="请选择">-->
                <!--<el-option v-for="item in selection.CheckOperatingLife" :key="item.id" :label="item.qb" :value="item.id" />-->
              <!--</el-select>-->
            </el-form-item>
            <!--<el-form-item label="运行班组:">-->
              <!--<el-select v-model="form.OperatingTeam" clearable placeholder="请选择">-->
                <!--<el-option v-for="item in selection.OperatingTeam" :key="item.id" :label="item.qb" :value="item.id" />-->
              <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="设备主人:">-->
              <!--<el-select v-model="form.EquipmentOwner" clearable placeholder="请选择">-->
                <!--<el-option v-for="item in selection.CheckEquipmentOwner" :key="item.id" :label="item.qb" :value="item.id" />-->
              <!--</el-select>-->
            <!--</el-form-item>-->
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
import columchart from "@/charts/charts/columnar_js";
// import ParameterStatisticsDefault from '../../../charts/parameter-statistics/parameter-statistics-default.js'
import Pagination from '@/components/Pagination'
import {
  List,
  getLineLength
} from "@/api/cableandchannel/parameter-statistics/cableAccessoriesOperating";
import {GETTBList} from '@/api/public';
import { clgcAdd } from '../../../api/faultManagement/faultDesign/faultDesign'
export default {
  name: '',
  components: {
    Pagination
  },
  data() {
    return {
      newData: [],
      form: {
        // ----------搜素绑定关键字-----------
        runAgeLimit: '', // 运行年限关键字
        OperatingTeam: '', // 运行班组关键字
        EquipmentOwner: '', // 设备主人关键字
        // ----------分页关键字-----------
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      chart: {
        //图表实例
        dom: null,
        //X轴的数据
        xAxisData: [],
        //Y轴的数据
        legend: [],
        series: [],
        dataZoom: [
          //给x轴设置滚动条
          {
            type: "slider",
            show: false, //flase直接隐藏图形
            xAxisIndex: [0],
            left: "4%", //滚动条靠左侧的百分比
            bottom: -5,
            right: "10%",
            start: 0, //滚动条的起始位置
            end: '', //滚动条的截止位置（按比例分割你的柱状图x轴长度）
            zoomLock: false,
            startValue: 0, // 从头开始。
            endValue: 30 // 一次性展示10个。
          }
        ],
        mouthdata: [],
        yeardata: [],
        servernamedata: []
      },
      // 选中的数据
      CheckedSelection: [],
      tabisoverflow: true,
      // 表头
      tableTitle: [{
        label: '年限',
        prop: 'runAgeLimit'
      },
      {
        label: this.$dl + '接头',
        prop: 'count'
      },
      {
        label: '接地箱',
        prop: 'count3'
      },
      {
        label: '终端',
        prop: 'count1'
      },
      {
        label: '避雷器',
        prop: 'count2'
      },
      {
        label: '交叉互联箱',
        prop: 'count4'
      }
      ],
      // 列表数据
      tableData: [],
      selection: { // 查询条件集合
        CheckOperatingLife: [{
          id: '1',
          qb: '全部'
        }], // 运行年限条件数据
        CheckOperatingTeam: [{
          id: '1',
          qb: '全部'
        }], // 运行班组条件数据
        CheckEquipmentOwner: [{
          id: '1',
          qb: '全部'
        }] // 设备主人条件数据
      },
      xAxisData: ['12', '3', '4', '5', '6', '7', '8'],
      yAxisData: [
        [],
        [220, 182, 191, 234, 290, 330, 310]
      ],
      legendData: ['柱体2']
    }
  },
  mounted() {
    GETTBList('/cable/accessoryOpeAgeLimit/select')
      .then(res => {
        if (res) {
          const data = res.data.data
          this.renderChart(data);
        }
      }).catch(res => {})
    this.getList()
  },
  methods: {
    /**
       * 创建图表实例
       */
    renderChart(res) {
      this.newData = [
        {
          name: '1年以内',
          data: [],
          type: "bar"
        },
        {
          name: '1-5年',
          data: [],
          type: "bar"
        },
        {
          name: '5-10年',
          data: [],
          type: "bar"
        },
        {
          name: '10年以上',
          data: [],
          type: "bar"
        }
      ]
      //console.log(res, this.$dl + '附件运行年限占比')
      this.chart.xAxisData.push(res.Y[0].arresterList[0].arresterList)
      this.chart.xAxisData.push(res.Y[0].branchBoxList[0].branchBoxList)
      this.chart.xAxisData.push(res.Y[0].crossInterconnectBoxList[0].crossInterconnectBoxList)
      this.chart.xAxisData.push(res.Y[0].earthBoxList[0].earthBoxList)
      this.chart.xAxisData.push(res.Y[0].spliceList[0].spliceList)
      this.chart.xAxisData.push(res.Y[0].terminalList[0].terminalList)

      this.newData[0].data.push(Number(res.Y[0].arresterList[0]['1年之内']))
      this.newData[0].data.push(Number(res.Y[0].branchBoxList[0]['1年之内']))
      this.newData[0].data.push(Number(res.Y[0].crossInterconnectBoxList[0]['1年之内']))
      this.newData[0].data.push(Number(res.Y[0].earthBoxList[0]['1年之内']))
      this.newData[0].data.push(Number(res.Y[0].spliceList[0]['1年之内']))
      this.newData[0].data.push(Number(res.Y[0].terminalList[0]['1年之内']))

      this.newData[1].data.push(Number(res.Y[0].arresterList[0]['1-5年']))
      this.newData[1].data.push(Number(res.Y[0].branchBoxList[0]['1-5年']))
      this.newData[1].data.push(Number(res.Y[0].crossInterconnectBoxList[0]['1-5年']))
      this.newData[1].data.push(Number(res.Y[0].earthBoxList[0]['1-5年']))
      this.newData[1].data.push(Number(res.Y[0].spliceList[0]['1-5年']))
      this.newData[1].data.push(Number(res.Y[0].terminalList[0]['1-5年']))

      this.newData[2].data.push(Number(res.Y[0].arresterList[0]['5-10年']))
      this.newData[2].data.push(Number(res.Y[0].branchBoxList[0]['5-10年']))
      this.newData[2].data.push(Number(res.Y[0].crossInterconnectBoxList[0]['5-10年']))
      this.newData[2].data.push(Number(res.Y[0].earthBoxList[0]['5-10年']))
      this.newData[2].data.push(Number(res.Y[0].spliceList[0]['5-10年']))
      this.newData[2].data.push(Number(res.Y[0].terminalList[0]['5-10年']))

      this.newData[3].data.push(Number(res.Y[0].arresterList[0]['10年以上']))
      this.newData[3].data.push(Number(res.Y[0].branchBoxList[0]['10年以上']))
      this.newData[3].data.push(Number(res.Y[0].crossInterconnectBoxList[0]['10年以上']))
      this.newData[3].data.push(Number(res.Y[0].earthBoxList[0]['10年以上']))
      this.newData[3].data.push(Number(res.Y[0].spliceList[0]['10年以上']))
      this.newData[3].data.push(Number(res.Y[0].terminalList[0]['10年以上']))
      //console.log(this.newData)
      const dom = this.$echarts.init(this.$refs.chart)
      dom.setOption(columchart)
      // 渲染图表
      dom.setOption({
        title: {
          text: "",
          top: "5%",
          x: "center",
          textStyle: {
            align: "center",
            color: "#303133",
            fontSize: 20
          }
        },
        legend: {
          right: "2%",
          y: "center",
          orient: "vertical",
          icon: "circle",
          data: this.chart.xAxisData
        },
        dataZoom: [{ end: (20 / 19) * 100 }],
        xAxis: {
          data: this.chart.xAxisData
        },
        series: this.newData
      });
    },
    /**
       * 查询按钮
       */
    onSearch() {
      //console.log('查询')
      this.getList()
    },
    /**
       * 重置按钮
       */
    reset() {
      //console.log('重置按钮')
      this.form = { brand_right: 0 }
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
<style lang="scss">
  .change_contant {
    .el-card__body {
      padding: 0 !important;
    }
  }
</style>
