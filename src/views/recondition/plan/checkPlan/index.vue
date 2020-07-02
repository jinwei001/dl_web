<template>
  <!-- <h2>
  检修试验计划
  </h2>-->
  <div>
    <div class="main-body" v-if="isShowStageInfo">
      <div class="main-userSelect" v-if="baojiuhideshow">
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <el-form-item :label="`检修${$xl}:`">
              <el-select v-model="form.jxxl" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.jxxl"
                  :key="item.id"
                  :label="item.lineName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="`${$dydj}:`">
              <el-select v-model="form.dydj" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.dydj"
                  :key="item.objId"
                  :label="item.bzmc"
                  :value="item.bzmc"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="任务来源:">
              <el-select v-model="form.tasksourcename" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.work"
                  :key="item.objId"
                  :label="item.bzmc"
                  :value="item.bzmc"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="计划时间:">
              <el-col>
                <el-date-picker
                  v-model="form.date"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
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
                <el-button class="onSearch" @click="EditFn" v-if="baojiuhideshow">
                  <i class="el-icon-edit-outline">编辑</i>
                </el-button>
                <el-button type="danger" plain @click="deleteFun" v-if="baojiuhideshow">删除</el-button>
                <el-button type="primary" @click="fun" v-if="baojiuhideshow">生成检修计划</el-button>
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
            v-show="pagination.total>0"
            :total="pagination.total"
            :page.sync="form.pageNum"
            :limit.sync="pagination.limit"
            @pagination="getListtab"
          />
        </div>
      </div>
    </div>
    <div v-if="AddshowDialog">
      <add
        @childFn="parentFn"
        :openobj="openobj"
        :openID="this.openID"
        :objjxxl="this.objjxxl"
        :objsblx="this.objsblx"
        :isadd="this.isadd"
        :baodianjxpg='Taskidnamepg'
      />
    </div>
    <div class="single-row-title">
      <el-dialog
        v-dialogDrag
        :visible.sync="showDialog"
        title="生成检修计划"
        :center="true"
        :before-close="handleClose"
        top="10vh"
      >
        <div style="margin: 2rem">
          <el-radio style="margin-left: 5%" v-model="planType" label="year">生成年检修计划</el-radio>
          <el-radio v-model="planType" label="month">生成月检修计划</el-radio>
          <el-radio v-model="planType" label="week">生成周检修计划</el-radio>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button class="UserSearchFun" @click="getNext">生成</el-button>
          <el-button class="onSearch" @click="handleClose">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getList,
  getSelectMultiple,
  getLineSelect,
  deleteOverHaulPool,
  generateNextPlan
} from "@/api/recondition/checkPlan";
import iTable from "@/components/TabList";
import Pagination from "@/components/Pagination";
import Add from "./add";
import qs from "qs";
export default {
  name: "checkPlan",
  components: {
    Pagination,
    iTable,
    Add
  },
  data() {
    return {
      planType: "year",
      isShowStageInfo: true,
      AddshowDialog: false,
      baojiuhideshow:true,
      showDialog: false,
      isadd: true,
      objjxxl: "",
      objsblx: "",
      openobj: {},
      form: {
        ids: "",
        tasksourcename: "",
        gcmc: null,
        date: "",
        pageNum: 1,
        pageSize: 10
      },
      pagination: {
        pageNum: 1,
        limit: 10,
        total: 2
      },
      selection: {
        dydj: [],
        work: [],
        jxxl: []
      },
      selectinfo_All: {
        CABLE_VOLTAGE_RANK: [],
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
          prop: "jobcontent",
          label: "工作内容",
          align: "center"
        },
        {
          prop: "tasksourcename",
          label: "任务来源",
          align: "center"
        },
        {
          prop: "xlmc",
          label: "检修" + this.$xl,
          align: "center",
          width: 150
        },
        
        
        {
          prop: "dydj",
          label: this.$dydj,
          align: "center"
        },
        {
          prop: "planstarttime",
          label: "计划开始时间",
          align: "center",
          width: 200,
          formatter: (row, column, cellValue) => {
            return `${row.planstarttime.substring(0, 10)}`;
          }
        },
        {
          prop: "planendtime",
          label: "计划结束时间",
          align: "center",
          isbtn: true,
          width: 200,
          formatter: (row, column, cellValue) => {
            return `${row.planendtime.substring(0, 10)}`;
          }
        },
        
        {
          prop: "groupname",
          label: "工作班组",
          align: "center",
          isbtn: true,
          width: 200
        },
        {
          prop: "taskstatus",
          label: "任务状态",
          align: "center",
          isbtn: true,
          width: 200,
          formatter: (row, column, cellValue) => {
            return `${row.taskstatus == 1 ? "已执行" : "未执行"}`;
          }
        },
        {
          prop: "ispowercut",
          label: "是否停电",
          align: "center",
          isbtn: true,
          width: 200,
          formatter: (row, column, cellValue) => {
            return `${row.ispowercut == 1 ? "是" : "否"}`;
          }
        },
        {
          prop: "tasklevel",
          label: "任务等级",
          align: "center",
          isbtn: true,
          width: 200,
          formatter: (row, column, cellValue) => {
            return `${
              row.tasklevel == 1
                ? "一般任务"
                : row.tasklevel == 2
                ? "重要任务"
                : row.tasklevel == 3
                ? "紧急任务"
                : ""
            }`;
          }
        },
        {
          prop: "pooltime",
          label: "入池时间",
          align: "center",
          isbtn: true,
          width: 200
          // formatter: (row, column, cellValue) => {
          //   return `${row.pooltime.substring(0, 10)}`;
          // }
        },
        {
          prop: "devicetypename",
          label: "设备类型",
          align: "center",
          width: 200
        },
        {
          prop: "devicename",
          label: "设备名称",
          align: "center",
          width: 200
        },
        {
          prop: "compilingpersonnel",
          label: "编制人",
          align: "center",
          isbtn: true,
          width: 200
        },
      ],
      // 列操作按钮
      operates: {
        width: 200,
        fixed: "right",
        label: "操作",
        show: true,
        list: [
          {
            label: "查看",
            show: true,
            icon: "",
            class: "onSearch",
            type: "primary",
            align: "center",
            plain: true,
            disabled: false,
            formatter: "id",
            method: (index, row) => {
              this.handleView(index, row);
            }
          }
        ]
      }
    };
  },
  created() {
    //保电检修计划来源调取该组件
    if (Object.keys(this.Taskidnamepg).length > 0) {
         let arry=[]
         let bdxl=JSON.parse(this.Taskidnamepg.bdxl)
         this.selection.jxxl=bdxl;
         for(let i=0;i<bdxl.length;i++){
           arry.push(bdxl[i].id)
         }
        this.form.ids=arry.toString()
        this.baojiuhideshow=false
    }
    this.getListtab();

    this.getSelection();
  },
  props: {
    Taskidnamepg:{
      type: Object,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function() {
        return {}
      }
    }
  },
  mounted() {

  },
  methods: {
    // 获取检修任务池数据
    getListtab() {
      console.log(this.form.date);
      if (this.form.date) {
        this.form.planstarttime = this.form.date[0];
        this.form.planendtime = this.form.date[1];
      }

      getList(this.$qs.stringify(this.form)).then(res => {
        this.tableData = res.data.rows;
        this.pagination.total = res.data.total;
      });
    },
    // 获取dydj 任务来源的下拉框数据
    getSelection() {
      // 获取检修分类  状态评价  电压等级
      getSelectMultiple(
        this.$qs.stringify({
          fzids: "CABLE_VOLTAGE_RANK,JXSY_TASK_SOURCE"
        })
      ).then(res => {
        this.selection.dydj = res.data.data.CABLE_VOLTAGE_RANK;
        this.selection.work = res.data.data.JXSY_TASK_SOURCE;
      });
      // 获取检修线路下拉框
      getLineSelect(this.$qs.stringify({ lineNature: "主线" })).then(res => {
        if (Object.keys(this.Taskidnamepg).length===0) {//如果保电检修参数不存在才执行
             this.selection.jxxl = res.data.rows;
        }

      });
    },
    /**生成检修计划 */
    fun() {
      if (this.CheckedSelection.length > 0) {
        this.showDialog = true;
      } else {
        this.$message("请选择一条数据");
      }
    },
    // 选中行
    re(val) {
      //console.log("val:", val);
    },

    // 查看
    handleView(index, row) {
      console.log(this.objjxxl, this.objsblx);
      this.openID = row.objId;
      this.objjxxl = row.xlid;
      this.objsblx = row.devicetypename;
      this.isadd = false;
      this.AddshowDialog = true;
      this.openobj.isadd = 3;
    },

    /**新增 */
    AddFn() {
      this.AddshowDialog = true;
      this.isadd = true;
      this.openobj.isadd = 1;
    },
    EditFn() {
      if (this.CheckedSelection.length == 1) {
        this.openID = this.form.ids;
        this.objjxxl = this.CheckedSelection[0].xlid;
        this.objsblx = this.CheckedSelection[0].devicetypename;
        this.AddshowDialog = true;
        this.isadd = true;
        this.openobj.isadd = 2;
      } else {
        this.$message("请选择一条数据");
      }
    },
    /**删除数据 */
    deleteFun(val) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(result => {
          deleteOverHaulPool(this.$qs.stringify(this.form)).then(res => {
            this.getListtab();
          });
        })
        .catch(err => {
          //console.log(err);
        });
    },

    /**重置 */
    reset() {
      this.form = { brand_right: 0 };
      this.form.pageSize = 10;
      this.form.pageNum = 1;
      this.getListtab();
    },
    onSearch() {
      console.log(11111);
      this.getListtab();
    },
    //选中数据
    CheckFun(val) {
      console.log(val)
      this.CheckedSelection = val;
      let ids = [];
      this.CheckedSelection.map(item => {
        ids.push(item.objId);
      });
      var chosenId = ids.join(); // 数组转字符串
      this.form.ids = chosenId; //选中数据中的所有id
      console.log(chosenId);
    },

    view(val) {
      //console.log("查看");
      //console.log(val);
      this.isview = false;
    },
    /**导出 */
    exportFn() {
      //console.log("导出");
      // ExportFn("/zjgc/gc/export").then(response => {
      //   //console.log(response);
      //   window.location.href =
      //     process.env.VUE_APP_BASE_API +
      //     "/common/download?fileName=" +
      //     response.data.msg +
      //     "&delete=true";
      // });
    },
    parentFn(val) {
      this.AddshowDialog = false;
    },
    getNext() {
      console.log(this.planType);
      generateNextPlan(
        this.$qs.stringify({ ids: this.form.ids, planType: this.planType })
      ).then(res => {
        if (res.data.code == 0) {
          this.$message({ message: "生成检修计划成功", type: "success" });
          this.getListtab();
          this.showDialog = false;
        } else {
          this.$message({ message: res.data.msg, type: "error" });
        }
      });
    },
    handleClose() {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.showDialog = false;
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style scoped>
</style>
