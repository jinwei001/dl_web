<template>
  <!-- <h2>策略plot</h2> -->
  <div>
    <div class="main-body" v-if="isShowStageInfo">
      <div class="main-userSelect">
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <el-form-item :label="`${$xl}名称:`">
              <el-select v-model="userselect.xlid" filterable clearable placeholder="请选择">
                <el-option
                  v-for="item in selectinfo_All.xlmc"
                  :key="item.id"
                  :label="item.lineName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="维护班组:">
              <el-select v-model="userselect.bzid" clearable placeholder="请选择">
                <el-option
                  v-for="item in selectinfo_All.ywbz"
                  :key="item.objId"
                  :label="item.groupname"
                  :value="item.objId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="`${$dydj}:`">
              <el-select v-model="userselect.dydj" clearable placeholder="请选择">
                <el-option
                  v-for="item in selectinfo_All.dydj"
                  :key="item.objId"
                  :label="item.bzmc"
                  :value="item.bzmc"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="最新评价结果:">
              <el-select v-model="userselect.newestResult" clearable placeholder="请选择">
                <el-option
                  v-for="item in selectinfo_All.newestResult"
                  :key="item.objId"
                  :label="item.bzmc"
                  :value="item.objId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="最新评价日期:">
              <el-col>
                <!-- <el-date-picker
                  v-model="userselect.newestDate"
                  type="date"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="请选择日期"
                  style="width:100%"
                />-->
                <el-date-picker
                  v-model="newestDate"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator=" ~ "
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </el-col>
            </el-form-item>
            <el-form-item style="width:10%;height:2.5rem"></el-form-item>
            <!-- <el-form-item label="动态评价结果:">
              <el-select v-model="userselect.regularResult" clearable placeholder="请选择">
                <el-option
                  v-for="item in selectinfo_All.regularResult"
                  :key="item.objId"
                  :label="item.bzmc"
                  :value="item.bzmc"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="动态评价日期:">
              <el-col>
                <el-date-picker
                  v-model="userselect.cljy"
                  type="date"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="请选择日期"
                  style="width:100%"
                />
              </el-col>
            </el-form-item>-->
            <!-- <el-form-item label="定期评价结果:">
              <el-select v-model="userselect.regularResult" clearable placeholder="请选择">
                <el-option
                  v-for="item in selectinfo_All.newestResult"
                  :key="item.objId"
                  :label="item.bzmc"
                  :value="item.bzmc"
                ></el-option>
              </el-select>
            </el-form-item>-->
            <!-- <el-form-item label="定期评价日期:">
              <el-col>
                <el-date-picker
                  v-model="userselect.lastMaintenanceDate"
                  type="date"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="请选择日期"
                  style="width:100%"
                />
              </el-col>
            </el-form-item>-->
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
                <el-button class="onSearch" @click="EditFn">
                  <i class="el-icon-edit-outline">批量编辑</i>
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
    <div v-if="editshow">
      <editshow @childFn="parentFn" :openobj="openobj" />
    </div>
    <div v-if="editAllshow">
      <editAllshow @childFn="parentFn" :openobj="openobj" />
    </div>
  </div>
</template>

<script>
import iTable from "@/components/TabList";
import Pagination from "@/components/Pagination";
import editshow from "./editshow";
import editAllshow from "./editAll";
import {
  plotgetList,
  postAllList,
  getSelect,
  remove,
  exportFun
} from "@/api/statusE/defend/plot";
import qs from "qs";
export default {
  name: "Rplan",
  components: {
    Pagination,
    iTable,
    editshow,
    editAllshow
  },
  data() {
    return {
      isShowStageInfo: true,
      editshow: false,
      editAllshow: false,
      openobj: {},
      form: {
        limit: 10,
        total: 0
      },
      newestDate: null,
      userselect: {
        xlid: null,
        dydj: null,
        bzid: null,
        newestResult: null,

        startTime: "",
        endTime: "",
        pageNum: 1,
        pageSize: 10
      },
      selection: {},
      selectinfo_All: {
        dydj: [],
        xlmc: [],
        ywbz: [],
        newestResult: [
          { bzmc: "正常状态", objId: 1 },
          { bzmc: "注意状态", objId: 2 },
          { bzmc: "异常状态", objId: 3 },
          { bzmc: "严重状态", objId: 4 }
        ]
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
          prop: "ywbz",
          label: "维护班组",
          align: "center"
        },
        {
          prop: "xlmc",
          label: this.$xl + "名称",
          align: "center"
        },
        {
          prop: "tyrq",
          label: "投运日期",
          align: "center",
          width: 160,
          formatter: (row, column, cellValue) => {
            return `${row.tyrq ? row.tyrq.substring(0, 10) : ""}`;
          }
        },
        {
          prop: "dydj",
          label: this.$dydj,
          align: "center"
        },
        {
          prop: "newestDate",
          label: "最新评价日期",
          align: "center",
          width: 160,
          formatter: (row, column, cellValue) => {
            return `${row.newestDate ? row.newestDate.substring(0, 10) : ""}`;
          }
        },
        {
          prop: "newestResult",
          label: "最新评价结果",
          align: "center",
          width: 160,
          formatter: (row, column, cellValue) => {
            return `${
              row.newestResult == 1
                ? "正常状态"
                : row.newestResult == 2
                ? "注意状态"
                : row.newestResult == 3
                ? "异常状态"
                : row.newestResult == 4
                ? "严重状态"
                : ""
            }`;
          }
        },
        {
          prop: "jyms",
          label: "评价设备简要描述",
          align: "center",
          width: 160
        },
        {
          prop: "scjxfl",
          label: "上次检修分类",
          align: "center",
          width: 160,

          formatter: (row, column, cellValue) => {
            return `${
              row.scjxfl == 1
                ? "A类检修"
                : row.scjxfl == 2
                ? "B类检修"
                : row.scjxfl == 3
                ? "C类检修"
                : row.scjxfl == 4
                ? "D类检修"
                : ""
            }`;
          }
        },
        {
          prop: "scjxrq",
          label: "上传检修日期",
          align: "center",
          width: 160,
          formatter: (row, column, cellValue) => {
            return `${row.scjxrq ? row.scjxrq.substring(0, 10) : ""}`;
          }
        },
        {
          prop: "jyjxfl",
          label: "建议检修分类",
          align: "center",
          width: 160,
          formatter: (row, column, cellValue) => {
            return `${
              row.jyjxfl == 1
                ? "A类检修"
                : row.jyjxfl == 2
                ? "B类检修"
                : row.jyjxfl == 3
                ? "C类检修"
                : row.jyjxfl == 4
                ? "D类检修"
                : ""
            }`;
          }
        },
        {
          prop: "jyjxsj",
          label: "建议检修时间",
          align: "center",
          width: 160,
          formatter: (row, column, cellValue) => {
            return `${row.jyjxsj ? row.jyjxsj.substring(0, 10) : ""}`;
          }
        },
        {
          prop: "cljy",
          label: "处理建议",
          align: "center",
          width: 160
        }
      ],
      // 列操作按钮
      operates: {
        width: 250,
        fixed: "right",
        label: "操作",
        show: true,
        list: [
          {
            label: "编辑",
            type: "warning",
            show: true,
            class: "onSearch",
            plain: true,
            disabled: false,
            method: (index, row) => {
              this.handleEdit(index, row);
            }
          },
          {
            label: "查看详情",
            show: true,
            class: "onSearch",
            plain: true,
            disabled: false,
            method: (index, row) => {
              this.handleView(index, row);
            }
          }
        ]
      },
      date: []
    };
  },
  created() {},
  mounted() {
    this.getList();
    this.getdydj();
    this.getxlFn();
    this.getbzFn();
  },
  methods: {
    /**dydj下拉 */
    getdydj() {
      getSelect({ fzmc: "电压等级" })
        .then(res => {
          this.selectinfo_All.dydj = res.data.rows;
        })
        .catch(err => {});
    },

    /**xl下拉 */
    getxlFn() {
      postAllList("/cable/line/list", { lineNature: "主线" })
        .then(res => {
          this.selectinfo_All.xlmc = res.data.rows;
        })
        .catch(err => {});
    },
    /**bz下拉 */
    getbzFn() {
      postAllList("/group/list")
        .then(res => {
          console.log(res);
          this.selectinfo_All.ywbz = res.data.rows;
        })
        .catch(err => {});
    },
    // 编辑
    handleEdit(index, row) {
      console.log("编辑row :>> ", row);
      this.editshow = true;
      this.openobj.isedit = true;
      this.openobj.openID = row.id;
      this.openobj.obj = row;
    },
    // 查看详情
    handleView(index, row) {
      console.log("查看详情row :>> ", row);
      this.editshow = true;
      this.openobj.isedit = false;
      this.openobj.openID = row.id;
      this.openobj.obj = row;
    },

    // 获取列表信息
    getList() {
      console.log(this.newestDate);
      if (this.newestDate != null) {
        this.userselect.startTime = this.newestDate[0];
        this.userselect.endTime = this.newestDate[1];
      } else {
        this.userselect.startTime = null;
        this.userselect.endTime = null;
      }
      plotgetList(this.userselect)
        .then(res => {
          this.tableData = res.data.rows;
          this.form.total = res.data.total;
        })
        .catch(err => {});
    },
    /**批量编辑 */
    EditFn() {
      if (this.CheckedSelection.length > 0) {
        this.editAllshow = true;
        this.openobj.objID = this.selectedIDs;
      } else {
        this.$message("请选择至少一条数据");
      }
    },
    /**删除数据 */
    deleteFun() {
      if (this.CheckedSelection.length <= 0) {
        this.$message("请选择至少一条数据");
        return false;
      }
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
        xlmc: null,
        dydj: null,
        ywbz: null,
        newestResult: null,

        pageNum: 1,
        pageSize: 10,
        starttime: null,
        endtime: null
      };
      this.date = [];
      (this.newestDate = null), this.getList();
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
    /**导出 */
    exportFn() {
      console.log(this.userselect);
      exportFun(this.userselect).then(response => {
        window.location.href =
          process.env.VUE_APP_BASE_API +
          "/common/download?fileName=" +
          response.data.msg;
      });
    },
    parentFn(val) {
      this.editshow = false;
      this.editAllshow = false;
    }
  }
};
</script>

<style scoped>
</style>
