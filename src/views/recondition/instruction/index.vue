<template>
  <!-- <h2>
      标准化作业指导书
  </h2>-->
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="userselect" inline>
          <el-form-item label="编制人:">
            <el-select
              v-model="userselect.bzr"
              filterable
              clearable
              placeholder="请选择"
              style=" width: 100%;"
            >
              <el-option
                v-for="item in bzr"
                :key="item.objId"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="编制日期：">
            <el-col>
              <el-date-picker
                style="width: 100%;"
                v-model="userselect.bssj"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item style="float: right;margin-right: 0">
            <el-button class="onSearch" @click="onSearch">查询</el-button>
            <el-button class="onSearch" @click="reset" style="margin-right: 0">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content">
      <div class="respont-content">
        <el-form>
          <el-col>
            <el-form-item style="float: left;">
              <el-button class="onSearch" @click="Addfun">
                <i class="el-icon-plus">新增</i>
              </el-button>
              <el-button type="danger" plain @click="deleteFn">
                <i class="el-icon-close"></i> 删除
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
    <div v-if="isShowDialog">
      <addshow @childFn="parentFn" :openobj="openobj" />
    </div>
  </div>
</template>

<script>
import iTable from "@/components/TabList";
import addshow from "./add";
import Pagination from "@/components/Pagination";
import { getList, getuser, remove } from "@/api/recondition/instruction";
import qs from "qs";
export default {
  name: "Rinstruction",
  components: {
    Pagination,
    iTable,
    addshow
  },
  data() {
    return {
      isShowDialog: false,
      bzr: [],
      tableData: [],
      // table 的参数
      options: {
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: true, // 是否支持列表项选中功能
        xh: true //是否支持列表中的序号功能
      },
      columns: [
        {
          prop: "wjmc",
          label: "文件名称",
          align: "center"
        },
        {
          prop: "bzhzyzdsmc",
          label: "标准化作业指导书名称",
          align: "center"
        },
        {
          prop: "bzr",
          label: "编制人",
          align: "center",
          width: 120
        },
        {
          prop: "bssj",
          label: "编制日期",
          align: "center",
          formatter: (row, column, cellValue) => {
            return `${row.bssj.substring(0, 10)}`;
          }
        },
        {
          prop: "shhr",
          label: "审核人",
          align: "center"
        },
        {
          prop: "pzr",
          label: "批准人",
          align: "center"
        }
      ],
      operates: {
        width: 300,
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
            plain: false,
            class: "UserSearchFun",
            disabled: false,
            method: (index, row) => {
              this.handleView(index, row);
            }
          }
        ]
      },
      form: {
        limit: 10,
        total: 0
      },
      userselect: {
        pageNum: 1,
        pageSize: 10,
        bssj: null,
        bzr: null
      },
      //选中的数据
      CheckedSelection: [],
      selectedIDs: [],
      openobj: {
        isEdit: false, //是否是编辑弹框
        openID: null, //打开弹框的id值
        isAdd: false //是否是新增弹框
      }
    };
  },
  created() {},
  mounted() {
    this.getList();
    this.getuser();
  },
  methods: {
    getuser() {
      getuser()
        .then(res => {
          if (res.data.code == 0) {
            this.bzr = res.data.rows;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getList() {
      getList(this.userselect)
        .then(res => {
          // console.log(res);
          this.tableData = res.data.rows;
          this.form.total =res.data.total
        })
        .catch(err => {});
    },
    handleEdit(index, val) {
      // console.log(val);
      this.openobj.isAdd = false;
      this.isShowDialog = true;
      this.openobj.isEdit = true;
      this.openobj.openID = val.id;
    },
    handleView(index, val) {
      // console.log(val);
      this.openobj.isAdd = false;
      this.isShowDialog = true;
      this.openobj.isEdit = false;
      this.openobj.openID = val.id;
    },
    Addfun() {
      this.openobj.isAdd = true;
      this.isShowDialog = true;
      this.openobj.isEdit = false;
      this.openobj.openID = null;
    },
    deleteFn() {
      if (this.CheckedSelection.length == 0) {
        this.$message("请选择要删除的数据");
        return false;
      }
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          remove({ids:this.selectedIDs}).then(res => {
            this.getList();
            this.$message({
              message: "删除成功",
              type: "success"
            });
          });
          done();
        })
        .catch(_ => {});
    },
    reset() {
      this.userselect = {
        pageNum: 1,
        pageSize: 10,
        bssj: null,
        bzr: null
      };
      this.getList();
    },
    onSearch() {
      this.getList();
    },
    CheckFun(val) {
      // console.log(val);
      this.CheckedSelection = val;
      let ids = [];
      this.CheckedSelection.map(item => {
        ids.push(item.id);
      });
      var chosenId = ids.join(","); // 数组转字符串
      this.selectedIDs = chosenId; //选中数据中的所有id
    },
    /**
     * 接收子组件的数据
     */
    parentFn(val) {
      this.isShowDialog = val.showDialog;
      this.openobj.isAdd = val.isAdd;
      this.openobj.isEdit = val.isEdit;
    }
  }
};
</script>

<style scoped>
</style>
