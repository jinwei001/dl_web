<template>
  <!-- <h2>
      outage application
      停电申请
  </h2>-->
  <div>
    <div class="main-body" v-if="isShowStageInfo">
      <div class="main-userSelect">
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <el-form-item :label="`${$dydj}:`">
              <el-select v-model="userselect.voltageRank" clearable placeholder="请选择">
                <el-option
                  v-for="item in selectinfo_All.dydj"
                  :key="item.objId"
                  :label="item.bzmc"
                  :value="item.bzmc"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="计划停电时间:">
              <el-col>
                <el-date-picker
                  v-model="date"
                  type="daterange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="~"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </el-col>
            </el-form-item>
            <el-form-item style="float: right;margin-right: 0 !important">
              <el-button class="onSearch" @click="onSearch">查询</el-button>
              <el-button class="onSearch" @click="reset" style="margin-right: 0 !important">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="content">
        <div class="respont-content">
          <el-form>
            <el-col>
              <el-form-item style="float: left;">
                <el-button class="onSearch" @click="AddFn">
                  <i class="el-icon-plus">新增</i>
                </el-button>
                <el-button class="onSearch" @click="EditFn">
                  <i class="el-icon-edit-outline">编辑</i>
                </el-button>
                <el-button type="danger" plain @click="deleteFun">删除</el-button>
              </el-form-item>

              <el-form-item style="float: right;">
                <el-button class="onSearch" @click="exportFn">
                  <i class="el-icon-document"></i> 导出
                </el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="table">
          <i-table
            :list="tableData"
            @handleSelectionChange="CheckFun"
            :options="options"
            :columns="columns"
            :operates="operates"
          ></i-table>
          <pagination
            v-show="form.total>0"
            :total="form.total"
            :page.sync="userselect.pageNum"
            :limit.sync="form.limit"
            @pagination="getList"
          />
        </div>
      </div>
    </div>
    <div v-if="AddshowDialog">
      <add @childFn="parentFn" :openobj="openobj" />
    </div>
  </div>
</template>

<script>
import iTable from "@/components/TabList";
import Pagination from "@/components/Pagination";
import {
  getList,
  remove,
  getSelect,
  exportFun
} from "@/api/recondition/outage";
import Add from "./add";
import qs from "qs";
export default {
  name: "Rplan",
  components: {
    Pagination,
    iTable,
    Add
  },
  data() {
    return {
      isShowStageInfo: true,
      AddshowDialog: false,
      openobj: {},
      form: {
        limit: 10,
        total: 0
      },
      userselect: {
        voltageRank: null,
        scheduledOutageStartTime: null,
        scheduledOutageEndTime: null,
        pageNum: 1,
        pageSize: 10
      },
      selection: {},
      selectinfo_All: {
        dydj: [],
        PROJECT_TYPE: []
      },

      openID: null, // 选择某一条的id
      CheckedSelection: [],
      // table数据
      tableData: [],
      // table 的参数
      options: {
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: true, // 是否支持列表项选中功能
        xh: true //是否支持列表中的序号功能
      },
      // 需要展示的列
      columns: [
        {
          prop: "responsibleUnit",
          label: "责任单位",
          align: "center"
        },
        {
          prop: "voltageRank",
          label: this.$dydj,
          align: "center"
        },
        {
          prop: "tdjgOrLine",
          label: "停电间隔或" + this.$xl,
          align: "center",
          width: 120
        },
        // {
        //   prop: "licensor",
        //   label: "许可人",
        //   align: "center"
        // },
        {
          prop: "blackoutRange",
          label: "停电范围",
          align: "center"
        },
        {
          prop: "jobContent",
          label: "工作内容",
          align: "center"
        },
        {
          prop: "scheduledOutageStartTime",
          label: "计划停电开始时间",
          align: "center",
          width: 160
        },
        {
          prop: "scheduledOutageEndTime",
          label: "计划停电结束时间",
          align: "center",
          width: 160
        },
        {
          prop: "workSource",
          label: "工作来源",
          align: "center"
        },
        {
          label: this.$xl + "是否跨区",
          prop: "isLineSpanned",
          align: "center",
          formatter: (row, column, cellValue) => {
            return `${
              row.isLineSpanned == 0
                ? "不跨区"
                : row.isLineSpanned == 1
                ? "跨区"
                : ""
            }`;
          }
        },
        {
          label: "上次检修日期",
          prop: "lastMaintenanceDate",
          align: "center",
          formatter: (row, column, cellValue) => {
            return `${row.lastMaintenanceDate?row.lastMaintenanceDate.substring(0, 10):""}`;
          }
        },
        // {
        //   label: "调度管辖",
        //   prop: "dispatch",
        //   align: "center"
        // },
        {
          label: "备注",
          prop: "remark",
          align: "center",
          fixed: "right"
        }
      ],
      // 列操作按钮
      operates: {},
      date: []
    };
  },
  created() {},
  mounted() {
    this.getList();
    this.getdydj();
  },
  methods: {
    /**dydj下拉 */
    getdydj() {
      getSelect({ fzmc: "电压等级" })
        .then(res => {
          console.log(res);
          this.selectinfo_All.dydj = res.data.rows;
        })
        .catch(err => {});
    },
    // 编辑
    handleEdit(index, row) {
      //console.log(" index:", index);
    },
    viw(index, row) {
      //console.log(" index:", index);
    },
    // 获取列表信息
    getList() {
      if (this.date) {
        this.userselect.scheduledOutageStartTime = this.date[0];
        this.userselect.scheduledOutageEndTime = this.date[1];
      } else {
        this.userselect.scheduledOutageStartTime = null;
        this.userselect.scheduledOutageEndTime = null;
      }
      getList(this.userselect)
        .then(res => {
          this.tableData = res.data.rows;
          this.form.total = res.data.total;
        })
        .catch(err => {});
    },

    /**新增 */
    AddFn() {
      this.AddshowDialog = true;
      this.openobj.isadd = true;
    },
    /**编辑 */
    EditFn() {
      if (this.CheckedSelection.length == 1) {
        this.AddshowDialog = true;
        this.openobj.isadd = false;
        this.openobj.openID = this.CheckedSelection[0].id;
      } else {
        this.$message("请选择一条数据");
      }
    },
    /**删除数据 */
    deleteFun() {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(result => {
          remove({ ids: this.selectedIDs })
            .then(res => {
              this.getList();
              this.$message({
                message: "删除成功",
                type: "success"
              });
            })
            .catch(err => {});
        })
        .catch(err => {
          //console.log(err);
        });
    },

    /**重置 */
    reset() {
      this.userselect = {
        gcmc: null,
        date: "",
        pageNum: 1,
        pageSize: 10,
        scheduledOutageStartTime: null,
        scheduledOutageEndTime: null
      };
      this.date = [];
      this.getList();
    },
    onSearch() {
      this.getList();
    },
    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val;
      let ids = [];
      this.CheckedSelection.map(item => {
        ids.push(item.id);
      });
      var chosenId = ids.join(","); // 数组转字符串
      this.selectedIDs = chosenId; //选中数据中的所有id
    },

    view(val) {
      //console.log("查看");
      //console.log(val);
      this.isview = false;
    },
    /**导出 */
    exportFn() {
      if (this.date) {
        this.userselect.scheduledOutageStartTime = this.date[0];
        this.userselect.scheduledOutageEndTime = this.date[1];
      } else {
        this.userselect.scheduledOutageStartTime = null;
        this.userselect.scheduledOutageEndTime = null;
      }
      exportFun(this.userselect).then(response => {
        window.location.href =
          process.env.VUE_APP_BASE_API +
          "/common/download?fileName=" +
          response.data.msg;
      });
    },
    parentFn(val) {
      this.AddshowDialog = false;
    }
  }
};
</script>

<style scoped>
</style>
