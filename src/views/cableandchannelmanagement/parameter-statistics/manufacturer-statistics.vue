<template>
  <!--   <h2>
    生产厂家统计
  </h2>-->
  <div>
    <!-- ----------------------------------[图表区]---------------------------------------- -->
    <el-row :gutter="20" style="margin-bottom: 1rem;">
      <el-col :span="12">
        <el-card class="tz-box-card">
          <!-- 图表待开发 -->
          <div ref="chartaa" style="height: 300px"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="tz-box-card" style="position: relative">
          <div style="position: absolute;top:5px;z-index: 999">
            <el-col
              v-for="(item,index) in chartSelect"
              :key="index"
              :span="25/chartSelect.length"
              style="display: flex;cursor: pointer"
            >
              <div
                style="display: flex"
                @click="chooseSelect(index)"
                :class="{ classred:index==current}"
              >
                <p
                  style="width: 16px;height:16px;border-radius:50%;line-height: 50px;margin-right: 5px;background: #c23531"
                />
                <p style="font-weight: 600; font-size: 15px;">{{ item }}</p>
              </div>
            </el-col>
          </div>
          <!-- 图表待开发 -->
          <div ref="chart2" style="height: 300px"></div>
        </el-card>
      </el-col>
    </el-row>
    <!-- ----------------------------------[搜索栏]---------------------------------------- -->
    <div class="content" style="margin-top: 1rem">
      <div class="main-userSelect">
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <el-form-item :label="`${$dydj}:`">
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
              <el-select v-model="form.id" clearable filterable placeholder="请选择">
                <el-option
                  v-for="item in selection.xlmc"
                  :key="item.lineId"
                  :label="item.lineName"
                  :value="item.lineId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="运维班组:">
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
              <el-input v-model="form.facilityMasterId" clearable/>
            </el-form-item>-->
            <el-form-item style="float: right;margin-right: 0">
              <el-button class="onSearch" @click="onSearch">查询</el-button>
              <el-button class="onSearch" style="margin-right: 0" @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="dl制造厂家" name="first" />
      <el-tab-pane label="附件制造厂家" name="second" />
    </el-tabs>-->
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
import Pagination from "@/components/Pagination";
import MonochromeStereoHistogram from "@/charts/Histogram/MonochromeStereoHistogram";
import columchart from "@/charts/charts/columnar_js";
import { POSTTBList } from "@/api/public";
import {
  List,
  getLineLength
} from "@/api/cableandchannel/parameter-statistics/manufacturerStatistics";
import { clgcAdd } from "../../../api/faultManagement/faultDesign/faultDesign";
import { getLineSelect } from "@/api/cableandchannel/cable-equipment-ledger/Line/index";

export default {
  name: "",
  components: {
    Pagination,
    MonochromeStereoHistogram
  },
  data() {
    return {
      hasData1: false,
      current: "",
      chartSelect: [
        this.$dl + "接头",
        this.$dl + "终端",
        this.$dl + "避雷器",
        this.$dl + "接地箱",
        "交叉互联箱",
        this.$dl + "分支箱"
      ],
      activeName: "first",
      form: {
        // ----------搜素绑定关键字-----------
        voltageRankName: "", // 电压关键关键字
        lineName: "", // dl名称关键字
        groupId: "", // 运行班组关键字
        facilityMasterId: "", // 设备主人关键字
        // ----------分页关键字-----------
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      selection: {
        // 查询条件集合
        CheckVoltageLevel: [{ id: "1", qb: "全部" }], // 电压条件数据
        CheckLineName: [{ id: "1", qb: "全部" }], //  DL名称条件数据
        CheckOperationsTeam: [{ id: "1", qb: "全部" }], // 运行班组条件数据
        CheckEquipmentOwner: [{ id: "1", qb: "全部" }] // 设备主人条件数据
      },
      // 选中的数据
      CheckedSelection: [],
      tabisoverflow: true,
      // 表头
      tableTitle: [
        {
          label: "所属" + this.$xl,
          prop: "lineName"
        },
        {
          label: this.$dydj,
          prop: "voltageRank"
        },
        {
          label: "运维班组",
          prop: "groupName"
        },
        {
          label: "设备主人",
          prop: "facilityMaster"
        }
      ],
      // 列表数据集合
      tableData: [],
      selection: {
        ywbz: [],
        dydj: [],
        xlmc: []
      },
      charts1Configuration: {
        title: ""
      },
      charts2Configuration: {
        title: ""
      },
      scrollbar: {
        enabled: true // 是否显示滚动条
      },
      chart1: {
        //图表实例
        dom: null,
        //X轴的数据
        xAxisData: [],
        //Y轴的数据
        legend: [],
        series: [],

        mouthdata: [],
        yeardata: [],
        servernamedata: []
      },
      chart2: {
        //图表实例
        dom: null,
        //X轴的数据
        xAxisData: [],
        //Y轴的数据
        legend: [],
        series: [],

        mouthdata: [],
        yeardata: [],
        servernamedata: []
      },
      chart2data: [
        {
          xAxisName: "厂家1",
          value: "102",
          edgecolor: "#ff8484",
          columnColor: "#ff6b6b"
        },
        {
          xAxisName: "厂家2",
          value: "68",
          edgecolor: "#ff8484",
          columnColor: "#ff6b6b"
        },
        {
          xAxisName: "厂家3",
          value: "98",
          edgecolor: "#ff8484",
          columnColor: "#ff6b6b"
        },
        {
          xAxisName: "厂家4",
          value: "35",
          edgecolor: "#ff8484",
          columnColor: "#ff6b6b"
        },
        {
          xAxisName: "厂家5",
          value: "120",
          edgecolor: "#ff8484",
          columnColor: "#ff6b6b"
        },
        {
          xAxisName: "厂家6",
          value: "110",
          edgecolor: "#ff8484",
          columnColor: "#ff6b6b"
        }
      ],
      newData: []
    };
  },
  created() {
    this.posttb();
  },
  mounted() {
    this.getList();
    this.getSelect();
  },
  methods: {
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
     * 左边柱状图*/
    posttb() {
      POSTTBList("/cable/manufacturer/makeFactoryList")
        .then(res => {
          //console.log(res, '生产厂家左边柱状图')
          this.renderChart(res);
        })
        .catch(err => {
          //console.log(err)
        });
      POSTTBList("/cable/manufacturer/spliceList")
        .then(res => {
          //console.log(res, this.$dl + '接头')
          // this.renderChartRight(res.data.data.spliceList);
          const val = 100/parseInt(res.data.data.spliceList.length/13)
            // console.log(val, '1111111')
            this.renderChartRight(res.data.data.spliceList, val);
          
        })
        .catch(err => {
          //console.log(err)
        });
    },
    /**
     * 创建左边柱状图图表实例
     *
     */
    renderChart(res) {
      this.chart1.xAxisData = [];
      this.chart1.yAxisData = [];
      this.chart1.servernamedata = [];
      var newData = [];
      res.data.data.physicalcablestageList.forEach(item => {
        this.chart1.servernamedata.push(Number(item.count));
        const obj = {};
        obj.name = item.makeFactory;
        obj.data = [];
        obj.type = "bar";
        newData.push(obj);
        this.chart1.xAxisData.push(item.makeFactory);
      });
      this.chart1.dom = this.$echarts.init(this.$refs.chartaa);
      this.chart1.dom.setOption(columchart);
      this.chart1.dom.setOption({
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
        // legend: {
        //   right: "2%",
        //   y: "center",
        //   orient: "vertical",
        //   icon: "circle",
        //   data: this.chart1.xAxisData
        // },
        dataZoom: [
          {
            start: 0, //数据窗口范围的起始百分比,表示30%
            end: 15, //数据窗口范围的结束百分比,表示70%
            startValue: 10, //数据窗口范围的起始数值
            endValue: 100 //数据窗口范围的结束数值。
          }
        ],
        // dataZoom: {
        //   show: true
        // },

        xAxis: {
          data: this.chart1.xAxisData
        },
        series: [
          {
            data: this.chart1.servernamedata,
            type: "bar",
            itemStyle: {
              normal: {
                //颜色随机改变

                color: function(value) {
                  return (
                    "#" +
                    Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(
                      16
                    )
                  );
                }
              }
            }
          }
        ]
      });
    },
    /**
     * 创建右边柱状图图表实例*/
    renderChartRight(res, val) {
      this.chart2.xAxisData = [];
      this.chart2.yAxisData = [];
      this.chart2.servernamedata = [];
      var newData = [];
      res.forEach(item => {
        this.chart2.servernamedata.push(Number(item.count));
        const obj = {};
        obj.name = item.makeFactory;
        obj.data = [];
        obj.type = "bar";
        newData.push(obj);
        this.chart2.xAxisData.push(item.makeFactory);
      });
      this.chart1.dom = this.$echarts.init(this.$refs.chart2);
      this.chart1.dom.setOption(columchart);
      this.chart1.dom.setOption({
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
        // legend: {
        //   right: "2%",
        //   y: "center",
        //   orient: "vertical",
        //   icon: "circle",
        //   data: this.chart1.xAxisData
        // },
        dataZoom: [
          {
            start: 0, //数据窗口范围的起始百分比,表示30%
            end: val, //数据窗口范围的结束百分比,表示70%
            startValue: 20, //数据窗口范围的起始数值
            endValue: 100 //数据窗口范围的结束数值。
          }
        ],
        // dataZoom: {
        //   show: true
        // },
        xAxis: {
          data: this.chart2.xAxisData
        },
        series: [
          {
            data: this.chart2.servernamedata,
            type: "bar",
            itemStyle: {
              normal: {
                //颜色随机改变

                color: function(value) {
                  return (
                    "#" +
                    Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(
                      16
                    )
                  );
                }
              }
            }
          }
        ]
      });
    },
    /**
     * 右边柱状图选择select*/
    chooseSelect(index) {
      this.current = index;
      if (index == 0) {
        POSTTBList("/cable/manufacturer/spliceList")
          .then(res => {
            const val = 100/parseInt(res.data.data.spliceList.length/13)
            // console.log(val, '1111111')
            this.renderChartRight(res.data.data.spliceList, val);
          })
          .catch(err => {
            //console.log(err)
          });
      } else if (index == 1) {
        POSTTBList("/cable/manufacturer/terminalList")
          .then(res => {
            //console.log(res, this.$dl + '终端')
            // this.renderChartRight(res.data.data.terminalList);
            const val = 100/parseInt(res.data.data.terminalList.length/13)
            // console.log(val, '1111111')
            this.renderChartRight(res.data.data.terminalList, val);
          })
          .catch(err => {
            //console.log(err)
          });
      } else if (index == 2) {
        POSTTBList("/cable/manufacturer/arresterList")
          .then(res => {
            //console.log(res, this.$dl + '避雷器 ')
            // this.renderChartRight(res.data.data.arresterList);
            const val = 100/parseInt(res.data.data.arresterList.length/13)
            this.renderChartRight(res.data.data.arresterList, val);
          })
          .catch(err => {
            //console.log(err)
          });
      } else if (index == 3) {
        POSTTBList("/cable/manufacturer/earthBoxList")
          .then(res => {
            //console.log(res, this.$dl + '接地箱')
            // this.renderChartRight(res.data.data.earthBoxList);
             const val = 100/parseInt(res.data.data.earthBoxList.length/13)
            this.renderChartRight(res.data.data.earthBoxList, val);
          })
          .catch(err => {
            //console.log(err)
          });
      } else if (index == 4) {
        POSTTBList("/cable/manufacturer/crossInterconnectBoxList")
          .then(res => {
            //console.log(res, '交叉互联箱')
            // this.renderChartRight(res.data.data.crossInterconnectBoxList);
            const val = 100/parseInt(res.data.data.crossInterconnectBoxList.length/13)
            this.renderChartRight(res.data.data.crossInterconnectBoxList, val);
          })
          .catch(err => {
            //console.log(err)
          });
      } else if (index == 5) {
        POSTTBList("/cable/manufacturer/branchBoxList")
          .then(res => {
            //console.log(res, this.$dl + '分支箱')
            // this.renderChartRight(res.data.data.branchBoxList);
            const val = 100/parseInt(res.data.data.branchBoxList.length/13)
            this.renderChartRight(res.data.data.branchBoxList, val);
          })
          .catch(err => {
            //console.log(err)
          });
      }
    },
    /**
     * 查询按钮
     */
    onSearch() {
      //console.log('查询')
      this.getList();
    },
    /**
     * 重置按钮
     */
    reset() {
      //console.log('重置按钮')
      this.form = { brand_right: 0 };
      this.form.pageSize = 10;
      this.form.pageNum = 1;
      this.getList();
    },
    // 选中数据
    CheckFun(val) {
      this.CheckedSelection = val;
      //console.log(this.CheckedSelection)
    },
    // 获取数据
    getList() {
      //console.log(1111111111111111111111)
      List(this.$qs.stringify(this.form)).then(response => {
        //console.log(response, '22222222222223223')
        if (response.status == 200) {
          this.tableData = response.data.rows;
          this.form.total = response.data.total;
        }
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

.classred {
  color: #037077;
}
</style>
<style lang="scss">
.change_contant {
  .el-card__body {
    padding: 0 !important;
  }
}
</style>
