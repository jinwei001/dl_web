<template>
  <div class="mainContainer">
    <div class="mainFlex thrPileCon">
      <PieCharts :id="id1" :chartHeight="chartHeight" v-if="hasChartData1" :chartdata="chartdata1" />
      <PieCharts :id="id2" :chartHeight="chartHeight" v-if="hasChartData2" :chartdata="chartdata2" />
      <PieCharts :id="id3" :chartHeight="chartHeight" v-if="hasChartData3" :chartdata="chartdata3" />
    </div>

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
import iTable from "@/components/TabList";
import Pagination from "@/components/Pagination";
import PieCharts from "@/charts/Hcharts/pie/3Dpie";
import { getbj, getbjlist } from "@/api/statusE/statisc";
export default {
  components: {
    PieCharts,
    Pagination,
    iTable
  },
  data() {
    return {
      form: {
        total: 0,
        pageNum: 1,
        limit: 66
      },
      chartHeight: 300,
      hasChartData1: false,
      hasChartData2: false,
      hasChartData3: false,
      id1: "charts1", // 图表ID
      id2: "charts2", // 图表2ID
      id3: "charts3", // 图表2ID
      chartdata1: {
        title: "注意状态各部件占比", // 标题（参数必传可以为空）
        unit: "", // 单位(参数必传可以为空)
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "top",
          itemMarginTop: 10,
          // borderWidth: 0,
          x: 0, //距离x轴的距离
          y: 50 //距离Y轴的距离
        },
        colors: ["#f7a35c", "#8085e9", "#f15c80"], // 图表项目颜色
        data: []
      },
      chartdata2: {
        title: "异常状态各部件占比", // 标题（参数必传可以为空）
        unit: "", // 单位(参数必传可以为空)
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "top",
          itemMarginTop: 10,
          // borderWidth: 0,
          x: 0, //距离x轴的距离
          y: 50 //距离Y轴的距离
        },
        colors: ["#7dedc4", "#5ceaf7", "#d280e9"], // 图表项目颜色
        data: []
      },
      chartdata3: {
        title: "严重状态各部件占比", // 标题（参数必传可以为空）
        unit: "", // 单位(参数必传可以为空)
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "top",
          itemMarginTop: 10,
          // borderWidth: 0,
          x: 0, //距离x轴的距离
          y: 50 //距离Y轴的距离
        },
        colors: ["#7cb5ec", "#5ceaf7", "#d280e9"], // 图表项目颜色
        data: []
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
      operates: {}
    };
  },
  mounted() {
    this.getListbj();
    this.gettb();
  },
  methods: {
    CheckFun(val) {},
    getListbj() {
      getbjlist()
        .then(res => {
          let reds = res.data.rows;
          this.tableData = reds;
          console.log("assemres :>> ", res);
          this.form.total = res.data.total;
          console.log("this.form.total :>> ", this.form.total);
        })
        .catch(err => {});
    },
    gettb() {
      getbj()
        .then(res => {
          this.chartdata1.data = [];
          this.chartdata2.data = [];
          this.chartdata3.data = [];
          let list = res.data.data;
          let da = [];
          list.forEach(e => {
            let yctb = {
              name: e.bj,
              y: Number(e.yc ? (e.yc == null ? 0 : e.yc) : 0)
            };
            let yztb = {
              name: e.bj,
              y: Number(e.yz)
            };
            let zytb = {
              name: e.bj,
              y: Number(e.zy)
            };
            this.chartdata1.data.push(zytb);
            this.chartdata2.data.push(yctb);
            this.chartdata3.data.push(yztb);
          });

          this.hasChartData1 = true;
          this.hasChartData2 = true;
          this.hasChartData3 = true;
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang='scss' scoped>
@import "@/styles/myStyle/style_mm.scss";
</style>