<template>
  <div class="mainContainer">
    <el-card class="tz-box-card">
      <div ref="chartaa" style="height: 450px;margin-bottom: 1rem;"></div>
    </el-card>
    <div class="table">
      <i-table
        :list="tableData"
        :options="options"
        @handleSelectionChange="CheckFun"
        :columns="columns"
        :operates="operates"
      ></i-table>
      <Pagination
        v-show="form.total>0"
        :total="form.total"
        :page.sync="form.pageNum"
        @pagination="getListbj"
      />
    </div>
  </div>
</template>

<script>
import columchart from "@/charts/charts/columnar_js";
import iTable from "@/components/TabList";
import Pagination from "@/components/Pagination";
import { getbjtj, getbjlist } from "@/api/statusE/statisc";
// import myCharts from "@/views/statusEvaluationManagement/charts/chartsOption";
// Vue.use(myCharts);
export default {
  components: {
    Pagination,
    Pagination,
    iTable
  },
  created() {},
  data() {
    return {
      charts1: "charts1",

      formInline: {
        year: "",
        area: ""
      },
      form: {
        total: 100,
        pageNum: 2,
        limit: 66
      },
      tableData: [],
      // table 的参数
      options: {
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: false, // 是否支持列表项选中功能
        xh: true //是否支持列表中的序号功能
      },
      // 需要展示的列
      columns: [
        {
          prop: "operation_unit",
          label: "运维单位",
          align: "center"
        },
        {
          prop: "line_name",
          label: this.$xl + "名称",
          align: "center"
        },
        {
          prop: "voltage_rank",
          label: this.$dydj,
          align: "center"
        },
        {
          prop: "transport_time",
          label: "投运日期",
          align: "center",
          width: 160,
          formatter: (row, column, cellValue) => {
            return `${
              row.transport_time ? row.transport_time.substring(0, 10) : ""
            }`;
          }
        },
        {
          prop: "total_length",
          label: "长度",
          align: "center",
          width: 160
        },
        {
          prop: "asset_unit",
          label: "资产单位",
          align: "center",
          width: 160
        },
        {
          prop: "line_type",
          label: "敷设方式",
          align: "center",
          width: 160
        },
        {
          prop: "start_positon_name",
          label: "起始位置",
          align: "center",
          width: 160
        },
        {
          prop: "end_positon_name",
          label: "终止位置",
          align: "center",
          width: 160
        },
        {
          prop: "jyjxsj",
          label: "状态评价",
          align: "center",
          width: 160,
          formatter: (row, column, cellValue) => {
            return `${
              row.dynamic_result
                ? row.dynamic_result == 1
                  ? "正常"
                  : row.dynamic_result == 2
                  ? "注意"
                  : row.dynamic_result == 3
                  ? "异常"
                  : row.regular_result == 4
                  ? "严重"
                  : row.regular_result == null || row.regular_result == ""
                  ? "未评价"
                  : ""
                : ""
            }`;
          }
        }
      ],
      // 列操作按钮
      operates: {},
      chart: {
        //图表实例
        dom: null,
        //X轴的数据
        xAxisData: [],
        //Y轴的数据
        legend: [],
        yAxisData: [
          {
            data: []
          },
          {
            data: []
          }
        ],
        mouthdata: [],
        yeardata: [],
        servernamedata: []
      }
    };
  },
  mounted() {
    this.getListbj();
    this.renderContent();
  },
  methods: {
    CheckFun() {},
    getListbj() {
      getbjlist()
        .then(res => {
          let reds = res.data.rows;
          this.tableData = reds;
          this.form.total = res.data.total;
        })
        .catch(err => {});
    },
    renderContent() {
      getbjtj()
        .then(res => {
          if (res.data.code == 0) {
            // console.log("部件统计res :>> ", res);
            this.renderChart(res.data.data);
            if (res.data.data.length > 0) {
              this.renderChart(res.data.data);
            }
          }
        })
        .catch(err => {});
    },
    /**
     * 创建图表实例
     */
    renderChart(res) {
      //把之前的数据清空
      this.chart.xAxisData = [];
      this.chart.yAxisData = [];
      this.chart.legend = ["正常", "注意", "异常", "严重"];
      var color = ["#FCCE10", "#26C0C0", "#FE8463", "#F3A43B"];
      let zcdata = [];
      let zydata = [];
      let ycdata = [];
      let yzdata = [];
      // let bjdata = [];
      res.forEach((e, k) => {
        const { yc, zc, yz, zy, bj } = e;
        // var AxisData = {
        //   name: this.chart.legend[k],
        //   data: [],
        //   type: "bar",
        //   itemStyle: {
        //     normal: {
        //       barBorderRadius: 6,
        //       color: color[k]
        //     }
        //   }
        // };
        zcdata.push(zc);
        zydata.push(zy);
        ycdata.push(yc);
        yzdata.push(yz);
        // yzdata.push(yz);
        // console.log("yc :>> ", yc);
        // this.chart.yAxisData.push(AxisData);
        this.chart.xAxisData.push(e.bj);
        // console.log("res中的e :>> ", e);
      });
      // console.log("zcdata :>> ", zcdata);
      // this.chart.yAxisData.forEach((item, index) => {
      //   if (item.name == this.chart.legend[0]) {
      //     this.$set(item, "data", zcdata);
      //   }
      //   if (item.name == this.chart.legend[1]) {
      //     this.$set(item, "data", zydata);
      //   }
      //   if (item.name == this.chart.legend[2]) {
      //     this.$set(item, "data", ycdata);
      //   }
      //   if (item.name == this.chart.legend[3]) {
      //     this.$set(item, "data", yzdata);
      //   }
      // });

      this.chart.dom = this.$echarts.init(this.$refs.chartaa);
      this.chart.dom.setOption(columchart);
      this.chart.dom.setOption({
        title: {
          text: "部件各状态数量",
          top: "5%",
          x: "center",
          textStyle: {
            align: "center",
            color: "#303133",
            fontSize: 20
          }
        },
        legend: {
          data: this.chart.legend
        },
        dataZoom: [{ end: 100 }],
        xAxis: {
          data: this.chart.xAxisData
        },
        // series: this.chart.yAxisData
        series: [
          {
            name: this.chart.legend[0],
            data: zcdata,
            type: "bar",
            barWidth: 30, // 柱图宽度
            barMaxWidth: 30, // 最大宽度
            itemStyle: {
              normal: {
                barBorderRadius: 10,
                color: color[0]
              }
            }
          },
          {
            name: this.chart.legend[1],
            data: zydata,
            type: "bar",
            barWidth: 30, // 柱图宽度
            barMaxWidth: 30, // 最大宽度
            itemStyle: {
              normal: {
                barBorderRadius: 10,
                color: color[1]
              }
            }
          },
          {
            name: this.chart.legend[2],
            data: ycdata,
            type: "bar",
            barWidth: 30, // 柱图宽度
            barMaxWidth: 30, // 最大宽度
            itemStyle: {
              normal: {
                barBorderRadius: 10,
                color: color[2]
              }
            }
          },
          {
            name: this.chart.legend[3],
            data: yzdata,
            type: "bar",
            barWidth: 30, // 柱图宽度
            barMaxWidth: 30, // 最大宽度
            itemStyle: {
              normal: {
                barBorderRadius: 10,
                color: color[3]
              }
            }
          }
        ]
      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "@/styles/myStyle/style_mm.scss";
</style>