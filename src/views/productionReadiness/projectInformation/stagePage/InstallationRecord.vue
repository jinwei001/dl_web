<template>
  <!-- <div>
    <h2>竣工验收-安装记录</h2>
  </div>-->
  <div class="main-userSelect">
    <div class="searchForm_glf">
      <el-form ref="form" inline>
        <el-form-item label="文件类型">
          <el-select v-model="tableParam.wjlx" clearable placeholder="请选择">
            <el-option
              v-for="item in selection.xlmc"
              :key="item.id"
              :label="item.qb"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item style="float: right;margin-right: 0 !important">
          <el-button class="onSearch" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <div class="table">
        <el-table
          :data="tableData"
          style="border: 1px solid #c4c8cf"
          :cell-style="{borderColor: '#c4c8cf'}"
          :header-cell-style="{'background':'#cddce6',borderColor: '#c4c8cf'}"
          border
          fit
          highlight-current-row
          @selection-change="CheckFun"
        >
          <!-- <el-table-column type="selection" width="55" align="center" /> -->
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column prop="gcmc" label="工程名称" align="center" />
          <el-table-column prop="wjlx" label="文件类型" align="center" >
            <template slot-scope="scope">
              {{scope.row.wjlx==1?$dl+"敷设记录":scope.row.wjlx==2?$dl+"接头安装记录":scope.row.wjlx==3?$dl+"终端安装记录":scope.row.wjlx==4?"单芯"+$dl+"箱安装记录":scope.row.wjlx==5?"同轴"+$dl+"箱安装记录":""}}
            </template>
          </el-table-column>
          <el-table-column prop="wjmc" label="安装记录名称" align="center" />

          <el-table-column align="center" label="操作" width="200">
            <template slot-scope="scope">
              <el-col>
                <el-button type="primary" size="small">
                  <a class="download" :href="assetsURL+scope.row.wjlj" download title="下载">下载</a>
                </el-button>
              </el-col>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="form.total>0"
          :total="form.total"
          :page.sync="tableParam.pageNum"
          :limit.sync="form.limit"
          @pagination="getTableList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
// import completionTransferAdd from "./completionTransferAdd";
import qs from "qs";
import { gcjc_azjl_list } from "@/api/productionReadiness/projectInformation/completion_jgyj";
export default {
  name: "FirstFounded",
  components: {
    Pagination
    // completionTransferAdd
  },
  props: {
    /** 父页面传的id */
    sonOpenId: {
      default: null
    }
  },
  data() {
    return {
      assetsURL: process.env.VUE_APP_BASE_API + "/common/downloadFile?url=",
      isShowDialog: false, // 查看弹框打开
      isEdit: false, // 是否是编辑弹框
      openID: null, // 打开弹框的id值
      isAdd: false, // 是否是新增弹框
      form: {
        xlmc: "",

        limit: 10,
        total: 0
      },
      selection: {
        xlmc: [
          { id: "1", qb: this.$dl+"敷设记录" },
          { id: "2", qb: this.$dl+"接头安装记录" },
          { id: "3", qb: this.$dl+"终端安装记录" },
          { id: "4", qb: "单芯"+this.$dl+"箱安装记" },
          { id: "5", qb: "同轴"+this.$dl+"箱安装记" }
        ]
      },
      // 选中的数据
      CheckedSelection: [],
      tableParam: {
        // 列表查询的参数\
        wjlx: "",
        gcid: this.sonOpenId,
        pageNum: 1,
        pageSize: 10
      },
      tableData: []
    };
  },
  created() {},
  mounted() {
    this.getTableList();
  },
  methods: {
    // 获取列表信息
    getTableList() {
      const list = qs.stringify(this.tableParam);
      gcjc_azjl_list(list).then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.tableData = response.data.rows;
          if (response.data.total) {
            this.form.total = response.data.total;
          }
        }
      });
    },
    onSearch() {
      this.getTableList();
      //console.log("onSearch");
    },
    // 新增流程
    addFlow() {
      this.isAdd = true;
      this.isShowDialog = true;
    },
    getList() {},
    // 选中数据
    CheckFun(val) {
      this.CheckedSelection = val;
      //console.log(this.CheckedSelection);
    },

    exportFun() {
      //console.log("exportFun");
    },
    view() {
      //console.log("查看");
    },
    /**
     * 接收查看/编辑子组件的数据
     */
    parentFn(val) {
      this.isShowDialog = val.showDialog;
      this.isEdit = val.editbtn;
      this.isAdd = val.addbtn;
    }
  }
};
</script>
