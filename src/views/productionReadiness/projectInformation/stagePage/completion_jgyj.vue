<template>
  <!-- <div>
    <h2>竣工验收-竣工验收</h2>
  </div>-->
  <div class="main-userSelect">
    <div class="searchForm_glf">
      <el-form ref="form" inline>
        <!-- <el-form-item label="负责班组">
          <el-select v-model="form.group" clearable placeholder="请选择" @change="getJcrList">
            <el-option
              v-for="item in group"
              :key="item.objId"
              :label="item.groupname"
              :value="item.objId"
            ></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="相关处理人">
          <el-select v-model="tableParam.clrid" clearable placeholder="请选择">
            <el-option
              v-for="item in userinfo"
              :key="item.objId"
              :label="item.name"
              :value="item.objId"
            />
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
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column prop="gcmc" label="工程名称" align="center" />
          <el-table-column prop="ysry" label="验收人员" align="center" />
          <el-table-column prop="yssj" label="验收时间" align="center" />
          <el-table-column prop="jgyshghsydw" label="竣工验收合格后试验单位" align="center" />
          <el-table-column prop="syry" label="试验人员" align="center" />
          <el-table-column prop="sysj" label="试验时间" align="center" width="100" />
          <el-table-column prop="tysj" label="投运时间" align="center" width="100" />
          <el-table-column prop="xlzsmm" :label="`${$xl}正式命名`" align="center" />
          <el-table-column prop="dqjd" label="当前节点" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.dqjd==1?"录入":scope.row.dqjd==2?"审核":scope.row.dqjd==3?"结束":""}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="lczt" label="处理状态" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.lczt==1?"提交":scope.row.lczt==2?"退回":scope.row.lczt==3?"审批通过":""}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="clrmc" label="当前处理人" align="center" />
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
          :page.sync="form.pageNum"
          :limit.sync="form.limit"
          @pagination="getTableList"
        />
      </div>
    </div>
    <div v-if="isShowDialog">
      <completionTransferAdd
        @childFn="parentFn"
        :isEdit="isEdit"
        :openID="openID"
        :isAdd="isAdd"
        :isLc="isLc"
        :sopenId="sopenId"
          :isendtitle="isendtitle"
          
      />
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import completionTransferAdd from "./completionTransferAdd";
import qs from "qs";
import {
  getList,
  DeleteList
} from "@/api/productionReadiness/projectInformation/CompletionAcceptance.js";
import { GropList, UserList } from "@/api/public";
export default {
  name: "FirstFounded",
  components: {
    Pagination,
    completionTransferAdd
  },
  props: {
    /**父页面传的id */
    sonOpenId: {
      default: null
    }
  },
  data() {
    return {
      group: [], // 班组
      userinfo: [], // 处理人
      isShowDialog: false, // 查看弹框打开
      isEdit: false, // 是否是编辑弹框
      openID: null, // 打开弹框的id值
      isAdd: false, // 是否是新增弹框
      sopenId: null, //现在表中的id
      form: {
        // group: "",
        clrid: "",
        limit: 10,
        total: 2
      },
      selection: {
        personnel: [{ id: "1", qb: "全部" }]
      },
      // 选中的数据
      CheckedSelection: [],
      tableParam: {
        // 列表查询的参数
        gcid: this.sonOpenId,
        pageNum: 1,
        pageSize: 10,
        // bzid: "",
        clrid: null
      },
      tableData: [],
      selectedIDs: [],
      lczt: null,
      isLc: false,
      group: [],
      userinfo: [],
       isendtitle: 1
    };
  },
  created() {},
  mounted() {
    this.getTableList();
    this.getSelectfun();
    this.UserListfun();
  },
  methods: {
    getJcrList(groupname) {
      //console.log(groupname);
      this.userinfo = null;
      /**当前处理人 */
      UserList(groupname).then(res => {
        //console.log(res);
        this.userinfo = res.data.rows;
      });
    },
    // 获取列表信息
    getTableList() {
      // this.tableParam.bzid = this.form.group;
      // this.tableParam.clrid = this.form.userinfo;
      const list = qs.stringify(this.tableParam);
      getList(list).then(response => {
        if (response.status == 200) {
          this.tableData = response.data.rows;
          this.form.total = response.data.total;
        }
      });
    },
    getSelectfun() {
      GropList().then(res => {
        if (res.status == 200) {
          this.group = res.data.rows;
        }
      });
    },
    UserListfun() {
      UserList().then(res => {
        if (res.status == 200) {
          this.userinfo = res.data.rows;
        }
      });
    },
    onSearch() {
      this.getTableList();
    },
    // 新增流程
    addFlow() {
      this.isendtitle = 1;
      this.isAdd = true;
      this.isEdit = false;
      this.isLc = false;
      this.isShowDialog = true;
      this.openID = this.sonOpenId;
    },
    // 选中数据
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
    exportFun() {
      //console.log("exportFun");
    },
    view(val) {
       val.dqjd == 1
        ? (this.isendtitle = 1)
        : val.dqjd == 2
        ? (this.isendtitle = 2)
        : val.dqjd == 3
        ? (this.isendtitle = 3)
        : val.dqjd == null
        ? (this.isendtitle = 1)
        : (this.isendtitle = 1);
      //console.log("查看");
      this.isAdd = false;
      this.isEdit = false;
      this.openID = this.sonOpenId; //工程ID
      this.isLc = false;
      this.isShowDialog = true;
      this.sopenId = val.objId; //子ID
    },
    //处理流程
    disposeFn(val) {
       val.dqjd == 1
        ? (this.isendtitle = 1)
        : val.dqjd == 2
        ? (this.isendtitle = 2)
        : val.dqjd == 3
        ? (this.isendtitle = 3)
        : val.dqjd == null
        ? (this.isendtitle = 1)
        : (this.isendtitle = 1);
      //console.log("处理流程");
      this.isShowDialog = true;
      this.isEdit = true;
      this.sopenId = val.objId;
      this.openID = this.sonOpenId;
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
    }
  }
};
</script>
