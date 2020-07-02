<template>
  <!--<h2>-->
  <!--检修试验计划-->
  <!--</h2>-->
  <div>
    <div class="main-body" v-if="isShowStageInfo">
      <div class="main-userSelect">
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <el-form-item :label="`${$dydj}:`">
              <el-select v-model="form.dydj" clearable placeholder="请选择">
                <el-option
                  v-for="item in selectinfo_All.CABLE_VOLTAGE_RANK"
                  :key="item.objId"
                  :label="item.bzmc"
                  :value="item.bzmc"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="计划停电时间:">
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
            @handleSelectionChange="handleSelectionChange"
            :options="options"
            :columns="columns"
            :operates="operates"
          ></i-table>
          <pagination
            v-show="pagination.total>0"
            :total="pagination.total"
            :page.sync="form.pageNum"
            :limit.sync="pagination.limit"
            @pagination="getTableList"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import iTable from "@/components/TabList";
import Pagination from "@/components/Pagination";
import qs from "qs";
export default {
  name: "Rplan",
  components: {
    Pagination,
    iTable
  },
  data() {
    return {
      isShowStageInfo: true,
      AddshowDialog: false,
      form: {
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
      selection: {},
      selectinfo_All: {
        CABLE_VOLTAGE_RANK: [],
        PROJECT_TYPE: []
      },

      openID: null, // 选择某一条的id
      CheckedSelection: [],
      // table数据
      tableData: [
        {
          liuFangName: "123123",
          yinHuanBuWeiName: "shasa"
        }
      ],
      tableTitle: [
        {
          label: "许可人",
          prop: "phase"
        },
        {
          label: "停电范围",
          prop: "sheBeiTypeName"
        },
        {
          label: "工作内容",
          prop: "sheBeiName"
        },
        {
          label: "计划停电开始时间",
          prop: "liuFangName",
          istrue: true
        },
        {
          label: "计划停电结束时间",
          prop: "yinHuanBuWeiName",
          temp: (row, column, cellValue) => {
            return `<span style="white-space: nowrap;color: dodgerblue;">${row}</span>`;
          }
        },
        {
          label: "工作来源",
          prop: "yinHuanLeiXingName"
        },
        {
          label: this.$xl + "是否跨区",
          prop: "hdreason"
        },
        {
          label: "上次检修日期",
          prop: "hdreason"
        },
        {
          label: "调度管辖",
          prop: "hdreason"
        },
        {
          label: "备注",
          prop: "hdreason"
        }
      ],
      // table 的参数
      options: {
        stripe: true, // 是否为斑马纹 table
        loading: true, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: true, // 是否支持列表项选中功能
        xh: true //是否支持列表中的序号功能
      },
      // 需要展示的列
      columns: [
        {
          prop: "id",
          label: "责任单位",
          align: "center"
        },
        {
          prop: "id",
          label: this.$dydj,
          align: "center"
        },
        {
          prop: "id",
          label: "停电间隔或" + this.$xl,
          align: "center"
        },
        {
          prop: "id",
          label: "许可人",
          align: "center"
        },
        {
          prop: "id",
          label: "停电范围",
          align: "center"
        },
        {
          prop: "id",
          label: "工作内容",
          align: "center"
        },
        {
          prop: "id",
          label: "计划停电开始时间",
          align: "center"
        },
        {
          prop: "time",
          label: "计划停电结束时间",
          align: "center",
          formatter: (row, column, cellValue) => {
            return `${row.id | format("yyyy-MM-dd")}`;
          }
        },
        {
          prop: "id",
          label: "工作来源",
          align: "center"
        },
        {
          prop: "id",
          label: "工作来源",
          align: "center"
        },
        {
          prop: "title",
          label: "标题",
          align: "center",
          formatter: (row, column, cellValue) => {
            return `<span style="white-space: nowrap;color: dodgerblue;">${row.id}</span>`;
          }
        },
        {
          prop: "title",
          label: "标题123",
          align: "center",
          formatter: (row, column, cellValue) => {
            return `${row.id > 20 ? "sad" : "as"}`;
          }
        }
      ],
      // 列操作按钮
      operates: {
        width: 200,
        fixed: "right",
        label: "炒作",
        show: false,
        list: [
          {
            label: "编辑",
            type: "warning",
            show: true,
            icon: "el-icon-edit",
            plain: true,
            disabled: false,
            method: (index, row) => {
              this.handleEdit(index, row);
            }
          },
          {
            label: "删除",
            type: "danger",
            show: true,
            icon: "el-icon-delete",
            plain: false,
            disabled: false,
            method: (index, row) => {
              this.handleDel(index, row);
            }
          },
          {
            label: "茶卡",
            type: "danger",
            show: true,
            icon: "el-icon-delete",
            plain: false,
            disabled: false,
            method: (index, row) => {
              this.viw(index, row);
            }
          }
        ]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 选中行
    handleSelectionChange(val) {
      //console.log("val:", val);
    },
    // 编辑
    handleEdit(index, row) {
      //console.log(" index:", index);
      //console.log(" row:", row);
    },
    // 删除
    handleDel(index, row) {
      //console.log(" index:", index);
      //console.log(" row:", row);
    },
    viw(index, row) {
      //console.log(" index:", index);
      //console.log(" row:", row);
    },
    parentFn(val) {
      this.isShowStageInfo = val.back;
      this.getTableList(); // 刷新方法
    },
    // 获取列表信息
    getTableList() {
      let list = qs.stringify(this.form);
    },

    /**新增 */
    AddFn() {
      this.AddshowDialog = true;
      this.isadd = true;
    },
    /**编辑 */
    EditFn(val) {
      //console.log("编辑");
      this.AddshowDialog = true;
      this.isedit = true;
    },
    /**删除数据 */
    deleteFun(val) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(result => {
          // return request
          //   .post(
          //     "/zjgc/gc/remove",
          //     qs.stringify({
          //       ids: val
          //     })
          //   )
          //   .then(res => {
          //     this.$message({
          //       message: res.data.msg,
          //       type: "success"
          //     });
          //     this.getTableList();
          //   })
          //   .catch(err => {
          //     message.error("异常 " + err.msg);
          //   });
        })
        .catch(err => {
          //console.log(err);
        });
    },

    /**重置 */
    reset() {
      // //console.log("reset");
      this.form = { brand_right: 0 };
      this.form.pageSize = 10;
      this.form.pageNum = 1;
      this.getTableList();
    },
    onSearch() {
      this.getTableList();
    },
    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val;
      //console.log(this.CheckedSelection);
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
    }
  }
};
</script>

<style scoped>
</style>



