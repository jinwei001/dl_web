<template>
  <!-- <div>
    <h2>竣工验收-土建验收</h2>
  </div>-->
  <div class="main-userSelect">
    <div class="searchForm_glf">
      <el-form ref="form" inline>
        <el-form-item label="负责班组">
          <el-select v-model="tableParam.fzbzid" clearable placeholder="请选择" @change="getJcrList">
            <el-option
              v-for="item in group"
              :key="item.objId"
              :label="item.groupname"
              :value="item.objId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="相关处理人">
          <el-select v-model="tableParam.clridys" clearable placeholder="请选择">
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
          <el-table-column prop="gcxz" label="工程性质" align="center" />
          <!-- <el-table-column prop="gcsx" label="工程属性" align="center" /> -->
          <el-table-column prop="dydj" :label="`${$dydj}`" align="center" />
          <el-table-column prop="tdjslxmc" label="通道建设类型" align="center" />
          <el-table-column prop="kgsj" label="开工时间" align="center" width="100" />
          <el-table-column prop="ysry" label="验收人员" align="center" />
          <el-table-column prop="yssj" label="验收时间" align="center" width="100" />
          <el-table-column prop="sgfascsffhyq" label="施工方案审查是否符合要求" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.sgfascsffhyq==1?"是":scope.row.sgfascsffhyq==2?"否":""}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="scsj" label="审查时间" align="center" width="100" />
          <el-table-column prop="ysjl" label="验收结论" align="center" />

          <el-table-column prop="fzbz" label="负责班组" align="center" />
          <el-table-column prop="lcztys" label="流程状态" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.lczt==1?"提交":scope.row.lczt==2?"退回":scope.row.lczt==3?"审批通过":""}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="dqjdys" label="当前节点" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.dqjdys==1?"录入":scope.row.dqjdys==2?"审核":scope.row.dqjdys==3?"结束":""}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="clrmcys" label="当前处理人" align="center" />
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
        :btnview="btnview"
        :isview="isview"
        :isendtitle="isendtitle"
      />
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import completionTransferAdd from "./jgys_jsys";
import qs from "qs";
import { GropList, UserList } from "@/api/public";
import info from "@/api/productionReadiness/projectInformation/sgys_tdys";
export default {
  name: "FirstFounded",
  components: {
    Pagination,
    completionTransferAdd
  },
  props: {
    /** 父页面传的id */
    sonOpenId: {
      default: null
    }
  },
  data() {
    return {
      isShowDialog: false, // 查看弹框打开
      isEdit: false, // 是否是编辑弹框
      openID: null, // 打开弹框的id值
      isAdd: false, // 是否是新增弹框
      sopenId: null, //现在表中的id
      form: {
        xlmc: "",

        limit: 10,
        total: 2
      },
      selection: {
        xlmc: [{ id: "1", qb: "全部" }]
      },
      // 选中的数据
      CheckedSelection: [],
      tableParam: {
        // 列表查询的参数
        gcid: this.sonOpenId,
        pageNum: 1,
        pageSize: 10,
        clridys: null,
        fzbzid: null
      },
      tableData: [],
      userinfo: [],
      group: [],
      selectedIDs: [],
      lczt: null,
      isLc: false,
      group: [],
      userinfo: [],
      btnview: false,
      isview: false,
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
      this.userinfo = null;
      /**当前处理人 */
      UserList(groupname).then(res => {
        this.userinfo = res.data.rows;
      });
    },
    // 获取列表信息
    getTableList() {
      const list = qs.stringify(this.tableParam);
      info.getList(list).then(response => {
        //console.log(response);
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
      //console.log("onSearch");
      this.getTableList();
    },
    // 新增流程
    addFlow() {
      this.isendtitle = 1;
      this.isAdd = true;
      this.isEdit = false;
      this.isLc = false;
      this.isShowDialog = true;
    },
    getList() {},
    // 选中数据

    exportFun() {
      //console.log("exportFun");
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
    view(val) {
      val.dqjdys == 1
        ? (this.isendtitle = 1)
        : val.dqjdys == 2
        ? (this.isendtitle = 2)
        : val.dqjdys == 3
        ? (this.isendtitle = 3)
        : val.dqjdys == null
        ? (this.isendtitle = 1)
        : (this.isendtitle = 1);
      //console.log("查看");
      this.isEdit = false;
      this.isAdd = false;
      this.btnview = false; //新增
      this.isAdd = false;
      this.openID = this.sonOpenId; //工程ID
      this.$nextTick(function() {
        this.isShowDialog = true;
        this.sopenId = val.objId; //子ID
        this.isview = true;
      });
    },
    disposeFn(val) {
      val.dqjdys == 1
        ? (this.isendtitle = 1)
        : val.dqjdys == 2
        ? (this.isendtitle = 2)
        : val.dqjdys == 3
        ? (this.isendtitle = 3)
        : val.dqjdys == null
        ? (this.isendtitle = 1)
        : (this.isendtitle = 1);
      //console.log("处理流程");
      this.isShowDialog = true;
      this.sopenId = val.objId;
      
      this.openID = this.sonOpenId;
      //console.log(val);
      if (val.lcztys == null || val.lcztys == "") {
        this.isLc = false;
        this.btnview = false; //新增
        this.isAdd = true;
      } else if (val.lcztys == 2) {
        this.isLc = false;
        this.btnview = true; //不通过
        this.isEdit = true;
        this.isAdd = false
      } else {
        this.isLc = true;
        this.btnview = true; //通过
        this.isEdit = true;
        this.isAdd = false
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

