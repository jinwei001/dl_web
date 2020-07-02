<template>
  <div class="mainContainer">
    <div class="searchForm">
      <div class="formInput">
        <el-form inline :model="userselect" class="mm-form-inline">
          <el-form-item :label="`${$dydj}：`">
            <el-select v-model="userselect.voltageRank" clearable placeholder="请选择">
              <el-option
                v-for="item in selectinfo_All.dydj"
                :key="item.objId"
                :label="item.bzmc"
                :value="item.bzmc"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用年限">
            <el-select v-model="userselect.serviceLife" placeholder="选择年限">
              <el-option label="1年以内" value="1"></el-option>
              <el-option label="1~5年" value="2"></el-option>
              <el-option label="5~10年" value="3"></el-option>
              <el-option label="10~15年" value="4"></el-option>
              <el-option label="15~25年" value="5"></el-option>
              <el-option label="25年以上" value="6"></el-option>
            </el-select>
          </el-form-item>
          <div class="formBtn">
            <button type="button" class="el-button onSearch el-button--default" @click="onSearch">查询</button>
            <button
              type="button"
              class="el-button onSearch el-button--default"
              style="margin-right: 0px !important;"
              @click="rest"
            >重置</button>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mainFlex">
      <el-row>
        <el-col>
          <el-card class="tz-box-card">
            <PieCharts
              :id="id1"
              :chartHeight="chartHeight"
              v-if="hasChartData"
              :chartdata="chartdata1"
            />
          </el-card>
        </el-col>
      </el-row>
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
        :page.sync="userselect.pageNum"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import iTable from "@/components/TabList";
import Pagination from "@/components/Pagination";
import PieCharts from "@/charts/Hcharts/pie/3Dpie";

import { getSelect } from "@/api/statusE/defend/plot";
import { getList, getxl } from "@/api/statusE/statisc";
export default {
  components: {
    PieCharts,
    Pagination,
    iTable
  },
  created() {},
  data() {
    return {
      userselect: {
        voltageRank: null,
        serviceLife: null,
        pageNum: 1,
        pageSize: 10
      },
      selectinfo_All: {
        dydj: []
      },
      charts: "charts",
      form: {
        total: 100,

        limit: 66
      },
      chartHeight: 300,
      hasChartData: false,
      id1: "charts1", // 图表ID
      id2: "charts2", // 图表2ID
      chartdata1: {
        title: "", // 标题（参数必传可以为空）
        unit: "", // 单位(参数必传可以为空)
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "top",
          itemMarginTop: 10,
          // borderWidth: 0,
          x: -100, //距离x轴的距离
          y: 50 //距离Y轴的距离
        },
        colors: [
          "#7cb5ec",
          "#434348",
          "#90ed7d",
          "#f7a35c",
          "#8085e9",
          "#f15c80",
          "#e4d354",
          "#7dedc4",
          "#5ceaf7",
          "#d280e9"
        ], // 图表项目颜色
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
              row.regular_result
                ? row.regular_result == 1
                  ? "正常"
                  : row.regular_result == 2
                  ? "注意"
                  : row.regular_result == 3
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
  created() {},
  mounted() {
    this.getdydj();
    this.getList();
    this.getxl();
  },
  methods: {
    CheckFun(val) {},
    /**dydj */
    getdydj() {
      getSelect({ fzmc: this.$dydj })
        .then(res => {
          this.selectinfo_All.dydj = res.data.rows;
        })
        .catch(err => {});
    },
    /**图表 */
    getxl() {
      /**清空数据 */
      this.hasChartData = false;
      this.chartdata1.data = [];
      getxl(this.userselect)
        .then(res => {
          console.log("res :>> ", res);
          if (res.data.code == 0) {
            this.hasChartData = true;
            let e = res.data.data;
            let tb = [
              {
                name: "未评分",
                y: Number(e.wpj)
              },
              {
                name: "正常",
                y: Number(e.zc)
              },
              {
                name: "注意",
                y: Number(e.zy)
              },
              {
                name: "异常",
                y: Number(e.yc)
              },
              {
                name: "严重",
                y: Number(e.yz)
              }
            ];
            tb.forEach(e => {
              this.chartdata1.data.push(e);
            });
            // this.$set(this.chartdata1, "data", tb);
          }
        })
        .catch(err => {});
    },
    /**列表 */
    getList() {
      getList(this.userselect)
        .then(res => {
          this.tableData = res.data.rows;
          this.form.total = res.data.total;
        })
        .catch(err => {});
    },
    /**查询 */
    onSearch() {
      this.getList();
      this.getxl();
    },
    /**重置 */
    rest() {
      this.userselect = {
        voltageRank: null,
        serviceLife: null,
        pageNum: 1,
        pageSize: 10
      };
      this.getList();
      this.getxl();
    }
  }
};
</script>
<style lang='scss' scoped>
@import "@/styles/myStyle/style_mm.scss";
</style>
