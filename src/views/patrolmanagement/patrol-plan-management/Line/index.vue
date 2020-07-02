<template>
  <!-- <h2>
      xl巡视计划管理
  </h2>-->
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="form" inline>
          <el-form-item :label="`${$dydj}:`">
            <el-select v-model="form.kv" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.voltagesArr"
                :key="item.id"
                :label="item.kv"
                :value="item.kv"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="`${$xl}名称:`">
            <el-select v-model="form.lineId" clearable filterable placeholder="请选择">
              <el-option
                v-for="item in selection.linesArr"
                :key="item.id"
                :label="item.lineName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运维班组:">
            <el-select v-model="form.opsGroup" clearable placeholder="请选择" @change="xsbz">
              <el-option
                v-for="item in selection.groupsArr"
                :key="item.id"
                :label="item.groupName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="巡视人:">
            <el-select v-model="form.patrolUser" clearable filterable placeholder="请选择">
              <el-option
                v-for="item in selection.usersArr"
                :key="item.id"
                :label="item.username"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="巡视状态:">
            <el-select v-model="form.patrolStatus" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.patrolStatusArr"
                :key="item.id"
                :label="item.patrolStatus"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="计划来源:">
            <el-select v-model="form.planFrom" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.patrolFromArr"
                :key="item.id"
                :label="item.planFrom"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="巡视类型:">
            <el-select v-model="form.patrolType" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.patrolTypesArr"
                :key="item.id"
                :label="item.typeName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计划巡视时间：">
            <el-col>
              <el-date-picker
                v-model="form.date"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
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
              <el-button type="danger" plain @click="DelAllFn">
                <i class="el-icon-close"></i> 删除
              </el-button>
              <el-button type="primary" @click="upload">导出巡视记录</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="table">
        <el-table
          :row-style="tableRowStyle"
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
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{(searchForm.pageNum - 1) * 10 + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="`${$xl}名称`" align="center" prop="lineName"></el-table-column>
          <!-- <el-table-column
            :label="`${$dl}`"
            align="center"
            prop="physicalName"
            width="200"
            show-overflow-tooltip
          ></el-table-column>-->
          <el-table-column label="计划巡视到期时间" align="center" prop="jhxsrq" width="200"></el-table-column>
          <el-table-column label="运维班组" align="center" prop="groupName"></el-table-column>
          <el-table-column label="巡视人" align="center" prop="patrolUserName"></el-table-column>
          <el-table-column label="计划来源" align="center">
            <template
              slot-scope="scope"
              class="bottleGreenBtnCon"
            >{{scope.row.jhly | patrolFrom(selection.patrolFromArr)}}</template>
          </el-table-column>
          <el-table-column :label="`${$dydj}`" align="center" prop="voltageRank"></el-table-column>
          <el-table-column label="巡视状态" align="center">
            <template
              slot-scope="scope"
              class="bottleGreenBtnCon"
            >{{scope.row.xszt | patrolStatus(selection.patrolStatusArr)}}</template>
          </el-table-column>
          <!-- <el-table-column label="执行时间" align="center" prop="zxsj" width="180"></el-table-column> -->
          <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-col>
                <el-button class="onSearch" size="small" @click="editFun(scope.row.objId)">编辑</el-button>
              </el-col>
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
      <add :selection="selection" @childFn="parentFn" :isEdit="isEdit" :openID="openID" />
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import Add from "./Add";
import { Message } from "element-ui";
import {
  PatrolPlanManagementList as list,
  PatrolPlanManagementDel as delData,
  voltages,
  lines,
  groups,
  users,
  cables, // dl
  patrolWorker, // 巡视人
  patrolStatus, // 巡视状态
  patrolTypes, // 巡视类型
  patrolFrom, // 计划来源
  planLineUpload // 导出
} from "@/api/patrolmanagement";
import { GETTBList } from "@/api/public";
export default {
  components: {
    Pagination,
    Add
  },
  data() {
    return {
      isShowDialog: false, //查看弹框打开
      isEdit: false, //是否是编辑弹框
      openID: null, //打开弹框的id值
      isAdd: false, //是否是新增弹框
      isview: true,
      form: {
        kv: "",
        lineId: "",
        patrolType: "",
        opsGroup: "",
        patrolType: "",
        patrolStatus: "",
        planFrom: "",
        patrolUser: "",
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
        voltagesArr: [], //xl
        linesArr: [], // xl名称
        groupsArr: [], // 运维班组
        patrolWorker: [], // 巡视人
        patrolTypesArr: [], // 巡视类型
        patrolStatusArr: [], // 巡视状态
        patrolFromArr: [],
        usersArr: [],
        cablesArr: [] // dl
      },
      //选中的数据
      CheckedSelection: [],
      tableData: []
    };
  },
  created() {
    this.getData();
    voltages().then(res => {
      this.selection.voltagesArr = res.data.data;
    });
    lines().then(res => {
      this.selection.linesArr = res.data.data;
    });
    groups().then(res => {
      this.selection.groupsArr = res.data.data;
    });
    users().then(res => {
      this.selection.usersArr = res.data.data;
    });
    patrolStatus().then(res => {
      this.selection.patrolStatusArr = res.data.data;
    });
    patrolFrom().then(res => {
      this.selection.patrolFromArr = res.data.data;
    });
    patrolTypes().then(res => {
      this.selection.patrolTypesArr = res.data.data;
    });
    cables().then(res => {
      this.selection.cablesArr = res.data.data;
    });
  },
  mounted() {},
  methods: {
    xsbz(val) {
      GETTBList("/api/select/getUsers", { groupId: val }).then(res => {
        //console.log(res);
        this.selection.usersArr = res.data.data;
      });
    },
    async getData() {
      // 获取列表数据
      let res = await list(this.searchForm);
      this.tableData = res.data.rows;
      this.pageDetail.total = res.data.total;
    },
    /**删除所有 */
    DelAllFn() {
      if (this.CheckedSelection.length == 0) {
        this.$message("请选择要编辑的数据");
        return;
      }
      let idsArr = [];
      this.CheckedSelection.forEach(v => {
        idsArr.push(v.objId);
      });

      this.del(idsArr.join(","));
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
      let idsArr = [];
      this.CheckedSelection.forEach(v => {
        idsArr.push(v.objId);
      });

      this.searchForm.xsjhids = idsArr.join(",");

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
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      console.log(row.isTimeout);
      console.log(row.planStatus);
      if (row.isTimeout == "0") {
        // return "background-color: #ffc3cb";
        return "color:rgb(245, 9, 9)";
      } else {
        if (row.planStatus == "2") {
          // return "background-color: #edf0c5";
          return "color:#e6c627";
        }
      }
      // if (row.planStatus == 2) {
      //   return "background-color: #edf0c5";
      // } else if (row.patrolStatus == 3) {
      //   return "background-color: #ffc3cb";
      // }
    },
    /** 检测班组 获取 检测人 */
    getJcrList(groupname) {
      this.ruleForm.jcr = null;
      jcrSelect(groupname).then(res => {
        // dl

        this.jcrSelectArr = res.data.data;
      });
    },
    reset() {
      this.form = {
        kv: "",
        lineId: "",
        patrolType: "",
        opsGroup: "",
        patrolType: "",
        patrolStatus: "",
        patrolUser: "",
        planFrom: "",
        patrolUser: "",
        date: [],
        pageNum: 1,
        pageSize: 10
      };
      this.onSearch();
    },
    onSearch() {
      for (let key in this.form) {
        this.searchForm[key] = this.form[key];
      }
      if (this.form.date != null) {
        this.searchForm.beginTime = this.form.date[0];
        this.searchForm.endTime = this.form.date[1];
      } else {
        this.searchForm.beginTime = null;
        this.searchForm.endTime = null;
      }

      delete this.searchForm.date;
      this.getData();
    },
    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val;
    },
    editFun(val) {
      this.isShowDialog = true;
      this.isEdit = true;
      this.openID = val;
    },
    /**新增按钮 */
    Addfun() {
      this.isShowDialog = true;
      this.isEdit = false;
    },
    /**
     * 接收查看/编辑子组件的数据
     */
    parentFn(val) {
      this.isShowDialog = false;
      this.getData();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>