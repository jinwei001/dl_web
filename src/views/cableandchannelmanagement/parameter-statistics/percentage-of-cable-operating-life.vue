<template>
  <!--   <h2>
   DLXL运行年限占比
  </h2>-->
  <div>
    <!-- ----------------------------------[图表区]---------------------------------------- -->
    <el-row :gutter="20" style="margin-bottom: 1rem;">
      <el-col :span="12">
        <el-card class="tz-box-card" style="height: 400px;width: 100%;">
          <!-- 图表待开发 -->
           <PieCharts :chartHeight="chartHeight" v-if="hasChartData" :id="id1" :chartdata="chartdata1" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="tz-box-card">
          <!-- 图表待开发 -->
          <PieCharts :chartHeight="chartHeight" v-if="hasChartData2"  :id="id2" :chartdata="chartdata2" />
        </el-card>
      </el-col>
    </el-row>
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
              <!--<el-input v-model="form.LineName" clearable/>-->
              <el-select v-model="form.lineId" clearable filterable placeholder="请选择">
                <el-option
                  v-for="item in selection.xlmc"
                  :key="item.lineId"
                  :label="item.lineName"
                  :value="item.lineId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="运行班组:">
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
              <el-input v-model="form.facilityMaster" clearable />
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
import ParameterStatisticsDefault from "../../../charts/parameter-statistics/parameter-statistics-default.js";
import Pagination from "@/components/Pagination";
import PieCharts from "@/charts/Hcharts/pie/3Dpie";

// import DPile from "@/views/statusEvaluationManagement/charts/DPile";

import {
  List,
  getLineLength,
  getLineCount
} from "@/api/cableandchannel/parameter-statistics/percentageOfCable";
import { getLineSelect } from "@/api/cableandchannel/cable-equipment-ledger/Line/index";
import { GETTBList, POSTTBList } from "@/api/public";
export default {
  name: "",
  components: {
    Pagination,
    PieCharts,
    // DPile
  },
  data() {
    return {
      chartHeight: 400,
      id1: "charts1", // 图表1ID
      id2: "charts2", // 图表2ID
      hasChartData: false,
      hasChartData2: false,
      chartdata1: {
        title: this.$xl + "长度", // 标题（参数必传可以为空）
        unit: "m", // 单位(参数必传可以为空)
        colors: ["#00e5de", "#ffde1f", "#ff9a26", "#ff6b6b"], // 图表项目颜色
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "top",
          itemMarginTop: 10,
          // borderWidth: 0,
          x: -50, //距离x轴的距离
          y: 0 //距离Y轴的距离
        },
        data: [
          {
            name: "一年之内",
            y: 10
          },
          {
            name: "1-5年",
            y: 30
          },
          {
            name: "5-10年",
            y: 40
          },
          {
            name: "10年以上",
            y: 60
          }
        ]
      },
      chartdata2: {
        title: this.$xl + "条数", // 标题（参数必传可以为空）
        unit: "条", // 单位(参数必传可以为空)
        colors: ["#7cb5ec", "#90ec7c", "#8085e9", "#f15c80"], // 图表项目颜色（参数必传不可以为空）
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "top",
          itemMarginTop: 10,
          // borderWidth: 0,
          x: -50, //距离x轴的距离
          y: 0 //距离Y轴的距离
        },
        data: [
          {
            name: "一年之内",
            y: 10
          },
          {
            name: "1-5年",
            y: 30
          },
          {
            name: "5-10年",
            y: 40
          },
          {
            name: "10年以上",
            y: 60
          }
        ]
      },
      form: {
        // ----------搜素绑定关键字-----------
         voltageRank: "", // dydj关键字        LineName: "", // XL名称关键字
        groupname: "", // 运维班组关键字
        facilityMaster: "", // 设备主人关键字
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
          label: this.$xl + "名称",
          prop: "lineName"
        },
        {
          label: this.$dydj,
          prop: "voltageRank"
        },
        {
          label: "设备主人",
          prop: "facilityMaster"
        },
        {
          label: "运维班组",
          prop: "groupName"
        },
        // {
        //   label: "评价状态",
        //   prop: "appraiseStatus"
        // },
        {
          label: "投运时间",
          prop: "transportTime"
        }
      ],
      // 列表数据集合
      tableData: [],
      selection: {
        ywbz: [],
        dydj: [],
        xlmc: []
      },
      xAxisData: ["12", "3", "4", "5", "6", "7", "8"],
      yAxisData: [
        [220, 182, 191, 234, 290, 330, 310],
        [0, 0, 0, 0, 0, 0, 0],
        [111, 222, 333, 444, 555, 333, 222]
      ],
      legendData: ["柱体1", "柱体2", "柱体3"],

      charts: "charts"
    };
  },
  created() {
    this.posttb();
  },
  mounted() {
    // this.renderChart();
    this.getList();
    this.getSelect();
    this.getLength();
    this.option = {
      data: []
    };
    this.getCount();
  },
  methods: {
    posttb() {
      POSTTBList("/cable/cableOperationAgeLimit/lineLength")
        .then(res => {
          //console.log(res, "图表数据 ");
          if(res){
            const data = res.data.data.lineLength;
            var data1=0,data2=0,data3=0,data4=0;
            data.forEach(e => {
              if(e.num == "10年以上"){
                data4 = e.length
              }
              if(e.num == "5-10年"){
                data3 = e.length
              }
              if(e.num == "1-5年"){
                data2 = e.length
              }
              if(e.num == "一年之内"){
                data1 = e.length
              }
            });

          }
          this.$set(this.chartdata1, "data", [
            ["一年之内", data1],
            ["1-5年", data2],
            ["5-10年", data3],
            ["10年以上", data4]
          ]);
          //console.log(this.chartdata1.data)
          this.hasChartData = true;
        })
        .catch(err => {
          //console.log(err);
        });
      POSTTBList('/cable/cableOperationAgeLimit/lineCount').then(res => {
        //console.log(res, '图表数据2')
        if(res){
          const data = res.data.rows;
          var data1=0,data2=0,data3=0,data4=0;
          data.forEach(e => {
            if(e.num == "10年以上"){
              data4 = Number(e.count)
            }
            if(e.num == "5-10年"){
              data3 = Number(e.count)
            }
            if(e.num == "1-5年"){
              data2 = Number(e.count)
            }
            if(e.num == "一年之内"){
              data1 = Number(e.count)
            }
          });

        }
        this.$set(this.chartdata2, "data", [
          ["一年之内", data1],
          ["1-5年", data2],
          ["5-10年", data3],
          ["10年以上", data4]
        ]);
        //console.log(this.chartdata2.data)
        this.hasChartData2 = true;
      })
        .catch(err => {
          //console.log(err)
        })
    },
    // 获取下拉数据
    getSelect() {
      getLineSelect().then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.selection.ywbz = response.data.data.groupList;
          this.selection.dydj = response.data.data.dydjList;
          this.selection.xlmc = response.data.data.lineList;
        }
      });
    },
    /**
     * 查询按钮
     */
    onSearch() {
      // if (this.form.groupName) {
      //   // 运维班组
      //   let searcharr = this.selection.ywbz.filter(res => {
      //     return this.form.groupName == res.groupId;
      //   });
      //   this.form.groupName = searcharr[0]["groupname"];
      // }
      // if (this.form.lineName) {
      //   // XL名称
      //   let searcharr = this.selection.xlmc.filter(res => {
      //     return this.form.lineName == res.lineId;
      //   });
      //   this.form.lineName = searcharr[0]["lineName"];
      // }
      // if (this.form.voltageRank) {
      //   // dydj      
      //     let searcharr = this.selection.dydj.filter(res => {
      //     return this.form.voltageRank == res.dydj;
      //   });
      //   this.form.voltageRank = searcharr[0]["dydjmc"];
      // }
      // //console.log('查询')
      this.form.pageNum = 1;
      this.getList();
    },
    /**
     * 重置按钮
     */
    reset() {
      // //console.log('重置按钮')
      this.form = { brand_right: 0 };
      this.form.pageNum = 1;
      this.form.total = 0
      this.form.pageSize = 10;
      this.getList();
    },
    // 选中数据
    CheckFun(val) {
      this.CheckedSelection = val;
      //console.log(this.CheckedSelection);
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
    // 获取XL长度
    getLength() {
      getLineLength().then(response => {
        //console.log(response);
      });
    },
    // 获取XL长度
    getCount() {
      getLineCount().then(response => {
        //console.log(response);
      });
    }
  }
};
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
