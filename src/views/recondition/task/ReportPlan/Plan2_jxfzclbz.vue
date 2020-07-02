<template>
  <!-- <h2>
      检修辅助策略编制
  </h2>-->
  <div class>
    <div class="content">
      <div class="respont-content">
        <el-form>
          <el-col>
            <el-form-item style="float: left;">
              <el-button size="mini" class="onSearch" @click="Addfun">
                <i class="el-icon-plus">新增</i>
              </el-button>
              
              <el-button size="mini" type="danger" plain @click="Delfun">
                <i class="el-icon-close">删除</i>
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          height="600"
          style="border: 1px solid #c7c7c7;width:100%"
          :cell-style="{borderColor: '#c7c7c7'}"
          :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}"
          border
          fit
          highlight-current-row
          @selection-change="CheckFun"
        >
          <el-table-column fixed type="selection" width="55" align="center"></el-table-column>
          <el-table-column fixed type="index" label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{(searchForm.pageNum - 1) * 10 + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="编制人" align="center" prop="compilingpersonnel"></el-table-column>
          <el-table-column label="编制日期" align="center" prop="compilingdate"></el-table-column>
          <el-table-column label="勘察单编号" align="center" prop="investigationnum"></el-table-column>
          <el-table-column label="检修班组" align="center" prop="groupname"></el-table-column>
          <el-table-column label="施工单位" align="center" prop="constructionunit"></el-table-column>
          <el-table-column :label="`检修${$xl}`" align="center" prop="xlmc"></el-table-column>
          <el-table-column label="检修地点" align="center" prop="repairsite"></el-table-column>
          <el-table-column label="操作" align="center" prop="fileurl">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" class="onSearch" v-if="scope.row.fileurl" @click="download(scope.row.fileurl)">下载</el-button>
              <el-button size="mini" class="onSearch" @click="Editfun(scope.row)">
              编辑
              </el-button>
              <el-button size="mini" class="onSearch" @click="Viewfun(scope.row)">
                查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="pageDetail.total>0"
          :total="pageDetail.total"
          :page.sync="searchForm.pageNum"
          :limit.sync="searchForm.pageSize"
          @pagination="getData"
        />
      </div>
    </div>

    <div v-if="isShowDialog">
      <Add :selection="selection" @childFn="parentFn" :isEdit="isEdit" :openID="openID" :jobtaskid="jobtaskid"/>
    </div>
    <div v-if="jxbgDialog">
      <jxbgDialog @childFn="parentFn" :parentVal="parentVal" :isView="isView"/>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import Add from "./Add2Jxfzclbz";
import jxbgDialog from "./jxbgDialog"
import { Message } from "element-ui";
import {
  planList as list,
  planDel as delData,
  xw, // xb
  linesSelect, // xl下拉
  dlSelect, // dl下拉
  jcbzSelect // 检测班组
} from "@/api/liveDetectionManage";
import {
  removeoverhauConstructionplan,
  getoverhauConstructionplan
} from "@/api/recondition/jobtask";
export default {
  components: {
    jxbgDialog,
    Pagination,
    Add
  },
  data() {
    return {
      objId: this.$route.query.aa,
      isShowDialog: false, //查看弹框打开
      jxbgDialog: false, // 检修报告弹窗
      isView: false,
      v1: "",
      openID: "",
      parentVal: '', // 传给编辑的数据
      thisDetail: {},
jobtaskid: '',
      form: {
        date: [],
        pageNum: 1,
        pageSize: 10
      },
      pageDetail: {
        total: 0
      },
      searchForm: {
        pageNum: 1,
        pageSize: 10
      },
      selection: {
        jhlyArr: []
      },
      //选中的数据
      CheckedSelection: [],
      tableData: [{}]
    };
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      // 获取列表数据
      getoverhauConstructionplan(this.$qs.stringify({jobtaskid: this.objId})).then(res => {
        this.tableData = res.data.rows;
        this.pageDetail.total = res.data.total;
      });
    },
    routerFun(roterPath, e) {
      this.$router.push(`report/${roterPath}`);
    },
    del(ids) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delData({ ids }).then(val => {
            val = val.data;
            let type = val.code == 0 ? "success" : "error";
            this.$message({ type, message: val.msg });
            if (val.code == 0) this.getData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    /** 导出 */
    upload() {
      for (let key in this.form) {
        this.searchForm[key] = this.form[key];
      }
      this.searchForm.beginTime = this.form.date[0];
      this.searchForm.endTime = this.form.date[1];
      delete this.searchForm.date;
      planLineUpload(this.searchForm).then(res => {
        window.location.href =
          process.env.VUE_APP_BASE_API +
          "/common/download?fileName=" +
          res.data.msg +
          "&delete=true";
      });
    },
    reset() {
      this.form = {
        date: [],
        pageNum: 1,
        pageSize: 10
      };
    },
    Delfun() {
      console.log(111);
      if (this.CheckedSelection.length > 0) {
        removeoverhauConstructionplan(
          this.$qs.stringify({ ids: this.form.ids })
        ).then(res => {
          if (res.data.code == 0) {
            this.$message({ message: "删除成功", type: "success" });
            this.getData();
          }
        });
      } else {
        this.$message("请选择数据");
      }
    },
    download(val) {
      window.location.href =
        process.env.VUE_APP_BASE_API + "/common/downloadFile?url=" + val;
    },
    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val;
      let ids = [];
      this.CheckedSelection.map(item => {
        ids.push(item.objId);
      });
      var chosenId = ids.join(); // 数组转字符串
      this.form.ids = chosenId; //选中数据中的所有id
    },
    /**新增按钮 */
    Addfun() {
      this.isShowDialog = true;
      this.isEdit = false;
      this.jobtaskid = this.objId
    },
    Editfun(val) {
      this.parentVal = val
      this.jxbgDialog = true
    },
    Viewfun(val) {
      this.parentVal = val
      this.isView = true
      this.jxbgDialog = true
      
    },

    /**
     * 接收查看/编辑子组件的数据
     */
    parentFn(val) {
      this.isShowDialog = false;
      this.jxbgDialog = false
      this.isView = false
      this.getData()
    }
  }
};
</script>

<style lang="scss" scope>
</style>
