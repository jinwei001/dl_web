<template>
  <!--   <h2>
   附件类型统计
  </h2>-->
  <div>
    <!-- ----------------------------------[图表区]---------------------------------------- -->
    <el-row :gutter="20" style="margin-bottom: 1rem;">
      <el-col :span="12">
        <el-card class="tz-box-card">
          <!-- 图表待开发 -->
          <PieCharts
            :id="id1"
            v-if="hasData1"
            style="height: 400px;width: 100%;"
            :chartdata="chartdata1"
            :chartHeight="chartHeight"
          />
          <el-col
            v-for="(list,index) in chartdata1.data"
            :key="index"
            :span="24/chartdata1.data.length"
            style="display: flex;"
          >
            <p
              :style="{'background-color':chartdata1.colors[index]}"
              style="width: 16px;height:16px;border-radius:50%;line-height: 50px;margin-right: 5px;"
            />
            <p style="font-weight: 600; font-size: 15px">{{ list.name }}{{ list.y }}</p>
          </el-col>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="tz-box-card">
          <!-- 图表待开发 -->
          <PieCharts
            :id="id2"
            style="height: 400px;width: 100%;"
            v-if="hasData2"
            :chartdata="chartdata2"
            :chartHeight="chartHeight"
          />
          <el-col>
            <el-col
              v-for="(list,index) in chartdata2.data"
              :key="index"
              :span="24/chartdata2.data.length"
              style="display: flex;"
            >
              <p
                :style="{'background-color':chartdata2.colors[index]}"
                style="width: 16px;height:16px;border-radius:50%;line-height: 50px;margin-right: 5px;"
              />
              <p style="font-weight: 600; font-size: 15px">{{ list.name }}{{ list.y }}</p>
            </el-col>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
    <!-- ----------------------------------[搜索栏]---------------------------------------- -->
    <div class="content" style="margin-top: 1rem">
      <div class="main-userSelect">
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <!-- <el-form-item label="设备主人:">
              <el-input v-model="form.facilityMasterId" clearable/>
            </el-form-item>-->
            <el-form-item label="附件类型:">
              <!--<el-input v-model="form.groupId" clearable/>-->
              <el-select v-model="form.fjlx" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.fjlx"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="运维班组:">
              <!--<el-input v-model="form.groupId" clearable/>-->
              <el-select v-model="form.groupId" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.ywbz"
                  :key="item.groupId"
                  :label="item.groupname"
                  :value="item.groupId"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="类型:">
              <el-input v-model="form.spliceType" clearable />
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
        @pagination="getPagination"
      />
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import PieCharts from "@/charts/Hcharts/pie/3Dpie";
import { POSTTBList } from "@/api/public";
import {
  ListSplice,
  ListTerminal,
  getLineLength
} from "@/api/cableandchannel/parameter-statistics/attachmentTypeStatistics.js";
import { getLineSelect } from "@/api/cableandchannel/channel-ledger-management/channel-ledger-management/cl-management";

export default {
  name: "",
  components: {
    Pagination,
    PieCharts
  },
  data() {
    return {
      chartHeight: 400,
      hasData1: false,
      hasData2: false,
      id1: "charts1", // 图表1ID
      id2: "charts2", // 图表2ID
      chartdata1: {
        title: "接头", // 标题（参数必传可以为空）
        unit: "", // 单位(参数必传可以为空)
        colors: ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c"], // 图表项目颜色
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "top",
          itemMarginTop: 10,
          // borderWidth: 0,
          x: -20, //距离x轴的距离
          y: 0 //距离Y轴的距离
        },
        data: [
          {
            name: "符合",
            y: 10
          },
          {
            name: "嵌套",
            y: 10
          },
          {
            name: "GIs",
            y: 10
          },
          {
            name: "其他",
            y: 10
          }
        ]
      },
      chartdata2: {
        title: "终端", // 标题（参数必传可以为空）
        unit: "", // 单位(参数必传可以为空)
        colors: [
          "#7cb5ec",
          "#90ec7c",
          "#8085e9",
          "#f15c80",
          "#7cb5ec",
          "#90ec7c",
          "#8085e9"
        ], // 图表项目颜色（参数必传不可以为空）
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
            name: "符合",
            y: 10
          },
          {
            name: "嵌套",
            y: 10
          },
          {
            name: "GIs",
            y: 10
          },
          {
            name: "其他",
            y: 10
          }
        ]
      },
      activeName: "first",
      form: {
        // ----------搜素绑定关键字-----------
        fjlx: 1,
        groupId: "", // 运维班组关键字
        bzmc: "",
        facilityMasterId: "", // 设备主人关键字
        spliceType: "", // 类型关键字
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
          label: "设备名称",
          prop: "facilityName"
        },
        {
          label: "运维班组",
          prop: "groupName"
        },
        {
          label: this.$xb,
          prop: "phase"
        },
        {
          label: this.$dydj,
          prop: "voltageRankName"
        },
        {
          label: "所属" + this.$xl,
          prop: "lineName"
        }
      ],
      // 列表数据集合
      tableData: [],
      selection: {
        ywbz: [],
        fjlx: [
          {
            name: "接头",
            value: 1
          },
          {
            name: "终端",
            value: 2
          }
        ]
      }
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
    posttb() {
      POSTTBList("/cable/accessoryType/spliceType")
        .then(res => {
          //console.log(res, "附件类型统计");
          this.chartdata1.data = [];
          res.data.data.spliceList.forEach(e => {
            if (e.spliceType == "其他") {
              const obj = {};
              obj.name = e.spliceType;
              obj.y = Number(e.count);
              this.chartdata1.data.push(obj);
            }
            if (e.spliceType == "直通接头") {
              const obj = {};
              obj.name = e.spliceType;
              obj.y = Number(e.count);
              this.chartdata1.data.push(obj);
            }
            if (e.spliceType == "绝缘接头") {
              const obj = {};
              obj.name = e.spliceType;
              obj.y = Number(e.count);
              this.chartdata1.data.push(obj);
            }
            if (e.spliceType == "过渡接头") {
              const obj = {};
              obj.name = e.spliceType;
              obj.y = Number(e.count);
              this.chartdata1.data.push(obj);
            }
          });
          //console.log(this.chartdata1.data);
          this.hasData1 = true;
        })
        .catch(err => {
          //console.log(err);
        });
      POSTTBList("/cable/accessoryType/terminalType")
        .then(res => {
          //console.log(res, "终端");
          this.chartdata2.data = [];
          res.data.data.terminalList.forEach(item => {
            if (item.terminalType == "GIS终端") {
              const obj = {};
              obj.name = item.terminalType;
              obj.y = Number(item.count);
              this.chartdata2.data.push(obj);
            }
            if (item.terminalType == "其他") {
              const obj = {};
              obj.name = item.terminalType;
              obj.y = Number(item.count);
              this.chartdata2.data.push(obj);
            }
            if (item.terminalType == "冷缩") {
              const obj = {};
              obj.name = item.terminalType;
              obj.y = Number(item.count);
              this.chartdata2.data.push(obj);
            }
            if (item.terminalType == "复合套+应力锥") {
              const obj = {};
              obj.name = item.terminalType;
              obj.y = Number(item.count);
              this.chartdata2.data.push(obj);
            }
            if (item.terminalType == "油浸式终端") {
              const obj = {};
              obj.name = item.terminalType;
              obj.y = Number(item.count);
              this.chartdata2.data.push(obj);
            }
            if (item.terminalType == "热缩") {
              const obj = {};
              obj.name = item.terminalType;
              obj.y = Number(item.count);
              this.chartdata2.data.push(obj);
            }
            if (item.terminalType == "预制") {
              const obj = {};
              obj.name = item.terminalType;
              obj.y = Number(item.count);
              this.chartdata2.data.push(obj);
            }
          });
          //console.log(this.chartdata2.data, "2323232323232323");
          this.hasData2 = true;
        })
        .catch(err => {
          //console.log(err);
        });
    },
    // 获取下拉数据
    getSelect() {
      getLineSelect().then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.selection.ywbz = response.data.data.groupList;
        }
      });
    },
    getPagination() {
      if (this.form.fjlx == 1) {
        POSTTBList(
          "/cable/accessoryType/spliceList",
          this.$qs.stringify(this.form)
        ).then(response => {
          this.tableData = response.data.rows;
          this.form.total = response.data.total;
        });
      } else if (this.form.fjlx == 2) {
        POSTTBList(
          "/cable/accessoryType/terminalList",
          this.$qs.stringify(this.form)
        ).then(response => {
          this.tableData = response.data.rows;
          this.form.total = response.data.total;
        });
      } else if (this.form.fjlx == null) {
        this.$message("请选择附件类型");
      }
    },
    /**
     * 查询按钮
     */
    onSearch() {
      if (this.form.fjlx == 1) {
        POSTTBList(
          "/cable/accessoryType/spliceList",
          this.$qs.stringify(this.form)
        ).then(response => {
          this.tableData = response.data.rows;
          this.form.total = response.data.total;
          this.form.pageNum = 1;
        });
      } else if (this.form.fjlx == 2) {
        POSTTBList(
          "/cable/accessoryType/terminalList",
          this.$qs.stringify(this.form)
        ).then(response => {
          this.tableData = response.data.rows;
          this.form.total = response.data.total;
          this.form.pageNum = 1;
        });
      } else if (this.form.fjlx == null) {
        this.$message("请选择附件类型");
      }
    },
    /**
     * 重置按钮
     */
    reset() {
      // //console.log('重置按钮')
      this.form = { brand_right: 0 };
      this.form.pageNum = 1;
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
      ListSplice(this.$qs.stringify(this.form)).then(response => {
        //console.log(response);
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
</style>
<style lang="scss">
.change_contant {
  .el-card__body {
    padding: 0 !important;
  }
}
</style>
