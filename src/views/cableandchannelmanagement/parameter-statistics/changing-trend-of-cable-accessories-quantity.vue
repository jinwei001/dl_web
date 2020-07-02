<template>
  <!-- <h2>
    changing-trend-of-cable-accessories-quantity
    近十年DL附件数量变化趋势
  </h2>-->
  <div>
    <el-card class="tz-box-card">
      <div ref="chart" style="height: 300px"></div>
    </el-card>
    <div class="content" style="margin-top: 1rem">
      <div class="main-userSelect">
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <!-- <el-form-item label="设备主人:">
              <el-input v-model="form.facilityMaster" clearable />
            </el-form-item>-->
            <el-form-item label="设备类型:">
              <!--<el-input v-model="form.groupname" clearable />-->
              <el-select v-model="form.sblx" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.sblx"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="运维班组:">
              <!--<el-input v-model="form.groupname" clearable />-->
              <el-select v-model="form.groupId" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.ywbz"
                  :key="item.groupId"
                  :label="item.groupname"
                  :value="item.groupId"
                ></el-option>
              </el-select>
            </el-form-item>
            <!--<el-form-item label="投运日期:">
              <el-input v-model="form.startDate" clearable />
            </el-form-item>!-->
            <el-form-item style="float: right;margin-right: 0">
              <el-button class="onSearch" @click="onSearch">查询</el-button>
              <el-button class="onSearch" @click="reset" style="margin-right: 0">重置</el-button>
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
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column
          v-for="item in tableTitle"
          :key="item.index"
          :prop="item.prop"
          :label="item.label"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <!-- <el-table-column
          align="center"
          label="操作"
          class-name="small-padding fixed-width"
          width="250"
        ></el-table-column> -->
      </el-table>
      <pagination
        v-show="form.total>0"
        :total="form.total"
        :page.sync="form.pageNum"
        :limit.sync="form.pageSize"
        @pagination="getPagination"
      />
    </div>
  </div>
</template>

<script>
import Quantity from "../../../charts/parameter-statistics/changing-trend-of-cable-accessories-quantity";
import Pagination from "@/components/Pagination";
import { GETTBList, POSTTBList } from "@/api/public";
import {
  List,
  getLineLength
} from "@/api/cableandchannel/parameter-statistics/changingTrendCableAccessories";
import { getLineSelect } from "@/api/cableandchannel/cable-equipment-ledger/Line/index";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      chartHeight: 400,
      form: {
        facilityMaster: "",
        groupname: "",
        startDate: "",
        sblx: 5,
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      // 选中的数据
      CheckedSelection: [],
      // 表头
      tableTitle: [
        {
          // label: this.$xl + "名称",
          label:"附件名称",
          prop: "sbmc"
        },
        {
          label: "运维班组",
          prop: "groupname"
        },
        {
          label: "设备主人",
          prop: "facilityMaster"
        },
        {
          label: "所属" + this.$xl,
          prop: "lineName"
        },
        {
          label: "所属" + this.$dl,
          prop: "logicCableStageName"
        }
      ],
      tableData: [],
      selection: {
        ywbz: [],
        sblx: [
          {
            name: this.$dl + "避雷器",
            value: 1
          },
          {
            name: this.$dl + "分支箱",
            value: 2
          },
          {
            name: "交叉互联箱",
            value: 3
          },
          {
            name: this.$dl + "接地箱",
            value: 4
          },
          {
            name: this.$dl + "接头",
            value: 5
          },
          {
            name: this.$dl + "终端",
            value: 6
          }
        ]
      },
      xAxisData: ["12", "3", "4", "5", "6", "7", "8"],
      yAxisData: [
        [220, 182, 191, 234, 290, 330, 310],
        [300, 313, 234, 255, 690, 444, 666],
        [111, 222, 333, 444, 555, 333, 222],
        [111, 112, 431, 444, 223, 123, 444],
        [111, 444, 343, 666, 888, 333, 222],
        [111, 444, 343, 666, 888, 333, 222]
      ],
      legendData: [
        this.$dl + "避雷器",
        this.$dl + "分支箱",
        "交叉互联箱",
        this.$dl + "接地箱",
        this.$dl + "接头",
        this.$dl + "终端"
      ]
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    this.renderChart();
    this.getSelect();
  },
  methods: {
    // 获取下拉数据
    getSelect() {
      getLineSelect().then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.selection.ywbz = response.data.data.groupList;
        }
      });
    },
    /**
     * 创建图表实例
     */
    renderChart() {
      GETTBList("/cable/cableAccessoryCount/select")
        .then(params => {
          //console.log(params, "图表数据");
          const data = params.data.data;
          this.xAxisData = [];
          data.X.forEach(item => {
            this.xAxisData.push(item.year);
          });
          this.yAxisData[0] = [];
          data.Y[0]["arresterList"].forEach(item => {
            this.yAxisData[0].push(Number(item.count));
          });
          this.yAxisData[1] = [];
          data.Y[0]["branchBoxList"].forEach(item => {
            this.yAxisData[1].push(Number(item.count));
          });
          this.yAxisData[2] = [];
          data.Y[0]["crossInterconnectBoxList"].forEach(item => {
            this.yAxisData[2].push(Number(item.count));
          });
          this.yAxisData[3] = [];
          data.Y[0]["earthBoxList"].forEach(item => {
            this.yAxisData[3].push(Number(item.count));
          });
          this.yAxisData[4] = [];
          data.Y[0]["spliceList"].forEach(item => {
            this.yAxisData[4].push(Number(item.count));
          });
          this.yAxisData[5] = [];
          data.Y[0]["terminalList"].forEach(item => {
            this.yAxisData[5].push(Number(item.count));
          });
          let dom = this.$echarts.init(this.$refs.chart);
          dom.setOption(Quantity);
          //渲染图表
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
                name: this.$dl + "避雷器",
                data: this.yAxisData[0]
              },
              {
                name: this.$dl + "分支箱",
                data: this.yAxisData[1]
              },
              {
                name: "交叉互联箱",
                data: this.yAxisData[2]
              },
              {
                name: this.$dl + "接地箱",
                data: this.yAxisData[3]
              },
              {
                name: this.$dl + "接头",
                data: this.yAxisData[4]
              },
              {
                name: this.$dl + "终端",
                data: this.yAxisData[5]
              }
            ]
          });
        })
        .catch(err => {
          //console.log(err);
        });
    },
    getPagination() {
      if (this.form.sblx == 1) {
        POSTTBList(
          "/cable/cableAccessoryCount/arresterList",
          this.$qs.stringify(this.form)
        ).then(res => {
          this.tableData = res.data.rows;
          this.form.total = res.data.total;
        });
      } else if (this.form.sblx == 2) {
        POSTTBList(
          "/cable/cableAccessoryCount/branchBoxList",
          this.$qs.stringify(this.form)
        ).then(res => {
          this.tableData = res.data.rows;
          this.form.total = res.data.total;
        });
      } else if (this.form.sblx == 3) {
        POSTTBList(
          "/cable/cableAccessoryCount/crossInterconnectBoxList",
          this.$qs.stringify(this.form)
        ).then(res => {
          this.tableData = res.data.rows;
          this.form.total = res.data.total;
        });
      } else if (this.form.sblx == 4) {
        POSTTBList(
          "/cable/cableAccessoryCount/earthBoxList",
          this.$qs.stringify(this.form)
        ).then(res => {
          this.tableData = res.data.rows;
          this.form.total = res.data.total;
        });
      } else if (this.form.sblx == 5) {
        POSTTBList(
          "/cable/cableAccessoryCount/spliceList",
          this.$qs.stringify(this.form)
        ).then(res => {
          this.tableData = res.data.rows;
          this.form.total = res.data.total;
        });
      } else if (this.form.sblx == 6) {
        POSTTBList(
          "/cable/cableAccessoryCount/terminalList",
          this.$qs.stringify(this.form)
        ).then(res => {
          this.tableData = res.data.rows;
          this.form.total = res.data.total;
        });
      } else if (this.form.sblx == null) {
        this.$message("请选择一个设备类型");
      }
    },
    /**
     * 查询按钮
     */
    onSearch() {
      if (this.form.sblx == 1) {
        POSTTBList(
          "/cable/cableAccessoryCount/arresterList",
          this.$qs.stringify(this.form)
        ).then(res => {
          this.tableData = res.data.rows;
          this.form.total = res.data.total;
          this.form.pageNum = 1;
        });
      } else if (this.form.sblx == 2) {
        POSTTBList(
          "/cable/cableAccessoryCount/branchBoxList",
          this.$qs.stringify(this.form)
        ).then(res => {
          this.tableData = res.data.rows;
          this.form.total = res.data.total;
          this.form.pageNum = 1;
        });
      } else if (this.form.sblx == 3) {
        POSTTBList(
          "/cable/cableAccessoryCount/crossInterconnectBoxList",
          this.$qs.stringify(this.form)
        ).then(res => {
          this.tableData = res.data.rows;
          this.form.total = res.data.total;
          this.form.pageNum = 1;
        });
      } else if (this.form.sblx == 4) {
        POSTTBList(
          "/cable/cableAccessoryCount/earthBoxList",
          this.$qs.stringify(this.form)
        ).then(res => {
          this.tableData = res.data.rows;
          this.form.total = res.data.total;
          this.form.pageNum = 1;
        });
      } else if (this.form.sblx == 5) {
        POSTTBList(
          "/cable/cableAccessoryCount/spliceList",
          this.$qs.stringify(this.form)
        ).then(res => {
          this.tableData = res.data.rows;
          this.form.total = res.data.total;
          this.form.pageNum = 1;
        });
      } else if (this.form.sblx == 6) {
        POSTTBList(
          "/cable/cableAccessoryCount/terminalList",
          this.$qs.stringify(this.form)
        ).then(res => {
          this.tableData = res.data.rows;
          this.form.total = res.data.total;
          this.form.pageNum = 1;
        });
      } else if (this.form.sblx == null) {
        this.$message("请选择一个设备类型");
      }
      this.form.pageNum = 1;
    },
    /**
     * 重置按钮
     */
    reset() {
      //console.log("重置按钮");
      this.form = { brand_right: 0 };
      this.form.pageNum = 1;
      this.form.total = 0;
      this.form.pageSize = 10;
      this.form.sblx = 5;
      this.getList();
    },
    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val;
      //console.log(this.CheckedSelection);
    },
    // 获取数据
    getList() {
      POSTTBList(
        "/cable/cableAccessoryCount/spliceList",
        this.$qs.stringify(this.form)
      ).then(res => {
        this.tableData = res.data.rows;
        this.form.total = res.data.total;
      });
    }
  }
};
</script>
