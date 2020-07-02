<template>
  <!-- <div>
    <h2>可研审查</h2>
  </div>-->
  <div class="main-userSelect">
    <div class="searchForm_glf">
      <el-form ref="form" inline>
        <el-form-item label="负责班组">
          <el-select v-model="tableParam.bzid" clearable placeholder="请选择" @change="getJcrList">
            <el-option
              v-for="item in group"
              :key="item.objId"
              :label="item.groupname"
              :value="item.objId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="当前处理人">
          <el-select v-model="tableParam.clrid" clearable placeholder="请选择">
            <el-option
              v-for="item in userinfo"
              :key="item.objId"
              :label="item.name"
              :value="item.objId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float: right;margin-right: 0 !important">
          <el-button class="onSearch" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <div class="respont-content">
        <el-form>
          <el-col>
            <el-form-item style="float: left;">
              <el-button class="onSearch" @click="addFlow">
                <i class="el-icon-plus">新增</i>
              </el-button>
              <el-button type="danger" plain @click="DelFn">
                <i class="el-icon-close"></i> 删除
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
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
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column prop="gcmc" label="工程名称" align="center"></el-table-column>
          <el-table-column prop="gcxz" label="工程性质" align="center"></el-table-column>
          <!-- <el-table-column prop="gcsx" label="工程属性" align="center"></el-table-column> -->
          <el-table-column prop="bzmc" label="负责班组" align="center"></el-table-column>
          <el-table-column prop="dydj" :label="`${$dydj}`" align="center"></el-table-column>
          <el-table-column prop="sjdw" label="设计单位" align="center"></el-table-column>
          <el-table-column prop="cyry" label="可研审查人员" align="center"></el-table-column>
          <el-table-column prop="cysj" label="参与时间" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.cysj | format('yyyy-MM-dd')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="dqjd" label="当前节点" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.dqjd==1?"录入":scope.row.dqjd==2?"审核":scope.row.dqjd==3?"结束":""}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="lczt" label="流程状态" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.lczt==1?"提交":scope.row.lczt==2?"退回":scope.row.lczt==3?"审批通过":""}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="clrmc" label="当前处理人" align="center"></el-table-column>
          <el-table-column align="center" label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                class="onSearch"
                size="small"
                v-if="scope.row.sfsdqclr == 1?false:scope.row.sfsdqclr==2?true:true"
                @click="view(scope.row)"
              >查看</el-button>
              <el-button
                class="onSearch"
                size="small"
                v-if="scope.row.sfsdqclr == 1?true:scope.row.sfsdqclr==2?false:false"
                @click="disposeFn(scope.row)"
              >处理流程</el-button>
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
    <div v-if="isShowDialog">
      <feasibility-add
        :isShowDialog="isShowDialog"
        @childFn="parentFn"
        :isEdit="isEdit"
        :openID="openID"
        :sopenId="sopenId"
        :isAdd="isAdd"
        :isLc="isLc"
        :isendtitle="isendtitle"
      />
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import FeasibilityAdd from "./feasibility_add";
import {
  getList,
  group,
  UserList,
  DeleteList
} from "@/api/productionReadiness/projectInformation/feasibilityResearch";

import qs from "qs";
import request from "@/utils/request";
export default {
  name: "FeasibilityResearch",
  components: {
    Pagination,
    FeasibilityAdd
  },
  data() {
    return {
      isShowDialog: false, // 查看弹框打开
      isEdit: false, // 是否是编辑弹框
      openID: null, // 父页面传过来的id
      isAdd: false, // 是否是新增弹框
      sopenId: null, //现在表中的id
      isLc: false,
      isendtitle: 1,
      group: [], //班组列表
      form: {
        xlmc: "",
        limit: 10,
        total: 0
      },
      selection: {
        xlmc: [{ id: "1", qb: "全部" }]
      },
      //选中的数据
      CheckedSelection: [],
      tableParam: {
        // 列表查询的参数
        gcid: this.faOpenId,
        pageNum: 1,
        pageSize: 10,
        bzid: null,
        clrid: null
      },
      tableData: [],
      userinfo: [],
      selectedIDs: [],
      lczt: null
    };
  },
  props: {
    /**父页面传的id */
    faOpenId: {
      default: null
    }
  },
  created() {},
  mounted() {
    this.getTableList();
    this.getgroup();
    this.getUser();
  },
  methods: {
    getJcrList(groupname) {
      this.userinfo = null;
      /**当前处理人 */
      UserList(groupname).then(res => {
        this.userinfo = res.data.rows;
      });
    },
    // 获取列表信息
    getTableList() {
      let list = qs.stringify(this.tableParam);
      getList(list).then(response => {
        // //console.log(response);
        if (response.status == 200) {
          this.tableData = response.data.rows;
          this.form.total = response.data.total;
        }
      });
    },
    /**获取班组列表 */
    getgroup() {
      group().then(res => {
        if (res.status == 200) {
          this.group = res.data.rows;
        }
      });
    },
    /**当前处理人 */
    getUser() {
      UserList().then(res => {
        this.userinfo = res.data.rows;
      });
    },
    /**查询 */
    onSearch() {
      // //console.log("onSearch");
      this.getTableList();
    },
    // 新增流程
    addFlow() {
      this.isendtitle = 1;
      this.isAdd = true;
      this.isEdit = false;
      this.isLc = false;
      this.isAdd = true;
      this.isShowDialog = true;
      this.openID = this.faOpenId;
    },

    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val;
      //console.log(this.CheckedSelection);
      let ids = [];
      this.CheckedSelection.map(item => {
        ids.push(item.objId);
      });
      var chosenId = ids.join(); // 数组转字符串
      this.selectedIDs = chosenId; //选中数据中的所有id
    },
    DelFn() {
      if (this.selectedIDs.length == 0) {
        this.$message({
          message: "请选择数据！！！",
          type: "error"
        });
        return false;
      }
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(result => {
          //console.log(this.selectedIDs);
          DeleteList(this.selectedIDs).then(res => {
            // //console.log(res);
            this.getTableList();
            this.$message({
              message: "删除成功",
              type: "success"
            });
          });
        })
        .catch(err => {
          //console.log(err);
        });
    },
    //导出
    exportFun() {
      //console.log("exportFun");
    },
    //查看
    view(val) {
      //console.log("查看");
      //console.log(val, "查看");
      val.dqjd == 1
        ? (this.isendtitle = 1)
        : val.dqjd == 2
        ? (this.isendtitle = 2)
        : val.dqjd == 3
        ? (this.isendtitle = 3)
        : val.dqjd == null
        ? (this.isendtitle = 1)
        : (this.isendtitle = 1);

      this.isShowDialog = true;
      this.isAdd = false;
      this.isEdit = false;
      this.isLc = false;
      this.isend = false;
      this.sopenId = val.objId;
    },
    //处理流程
    disposeFn(val) {
      //console.log("处理流程");
      val.dqjd == 1
        ? (this.isendtitle = 1)
        : val.dqjd == 2
        ? (this.isendtitle = 2)
        : val.dqjd == 3
        ? (this.isendtitle = 3)
        : val.dqjd == null
        ? (this.isendtitle = 1)
        : (this.isendtitle = 1);
      this.isShowDialog = true;
      this.isEdit = true;
      this.isAdd = false;
      this.sopenId = val.objId;
      //console.log(val);
      if (val.lczt == null) {
        this.isLc = false;
      } else if (val.lczt == 2) {
        this.isLc = false;
      } else {
        this.isLc = true;
      }
    },
    /**
     * 接收查看/编辑子组件的数据
     */
    parentFn(val) {
      this.isShowDialog = val.showDialog;
      this.isEdit = val.editbtn;
      this.isAdd = val.addbtn;
      this.sopenId = null;
    }
  }
};
</script>

