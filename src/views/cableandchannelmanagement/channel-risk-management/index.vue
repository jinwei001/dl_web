<template>
  <!-- <div> -->
  <!-- <h2>通道风险管理</h2> -->
  <!-- </div> -->
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="form" inline>
          <el-form-item label="通道名称:">
            <el-input placeholder="请输入内容" v-model="form.sdmc" clearable></el-input>
            <!--<el-select v-model="form.xlmc" clearable placeholder="请选择">-->
            <!--<el-option-->
            <!--v-for="item in selection.xlmc"-->
            <!--:key="item.id"-->
            <!--:label="item.qb"-->
            <!--:value="item.id"-->
            <!--&gt;</el-option>-->
            <!--</el-select>-->
          </el-form-item>
          <el-form-item label="结构形式:">
            <!--<el-input placeholder="请输入内容" v-model="form.jgxs" clearable></el-input>-->
            <el-select v-model="form.jgxs" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.jgxs"
                :key="item.jgxs"
                :label="item.jgxsmc"
                :value="item.jgxs"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="风险状态：">
            <el-select v-model="form.riskStatus" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.riskStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!-- <el-input placeholder="请输入内容" v-model="form.riskAssessment" clearable></el-input> -->
          </el-form-item>
          <el-form-item style="float: right;margin-right: 0">
            <el-button class="onSearch" @click="onSearch">查询</el-button>
            <el-button class="onSearch" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content">
      <div class="table">
        <el-table
          v-loading="loading"
          :data="tableData"
          style="border: 1px solid #c4c8cf"
          :cell-style="{borderColor: '#c4c8cf'}"
          :header-cell-style="{'background':'#cddce6',borderColor: '#c4c8cf'}"
          border
          fit
          highlight-current-row
          @selection-change="CheckFun"
          element-loading-text="数据正在加载中"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column
            v-for="item in tableTitle"
            :key="item.index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            align="center"
          ></el-table-column>
          <el-table-column align="center" label="操作" width="200" fixed="right">
            <template slot-scope="scope">
              <el-button class="onSearch" size="small" @click="view(scope.row)">查看评分</el-button>
              <el-button
                class="onSearch"
                size="small"
                v-if="scope.row.sfdfg!='1'||scope.row.sfdfg==null"
                @click="grade(scope.row)"
              >评分</el-button>
              <el-button
                class="onSearch"
                size="small"
                v-if="scope.row.sfdfg=='1'"
                @click="Editgrade(scope.row)"
              >编辑评分</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="form.total>0"
          :total="form.total"
          :page.sync="form.pageNum"
          :limit.sync="form.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
    <Seeabout
      ref="seeAbout"
      :isShowDialog="isShowDialog"
      @childFn="parentFn"
      :openID="openID"
      :objId="objId"
      :year="year"
    />
    <div v-if="ShowEditDialog">
      <edit-view
        ref="EditView"
        :obj='obj'
        @childFn="parentFnEdit"
        :openID="openID"
        :objId="objId"
        :year="year"
      />
    </div>

    <div v-if="ShowLookDialog">
      <look-view ref="LookView" @childFn="parentFnEdit" :openID="openID" :year="year"/>
    </div>
    <!-- <div v-if="ishow">
      <showView @childFn="parentFnEdit" :obj="obj" />
    </div>-->
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import Seeabout from "./view";
import EditView from "./editview";
import LookView from "./lookview";
// import showView from "./show";
import {
  List,
  getLineLength,
  isGrade
} from "@/api/cableandchannel/channelRiskManagement/channelRiskManagement";
import { getLineSelect } from "@/api/cableandchannel/channel-ledger-management/channel-ledger-management/cl-management";

export default {
  components: {
    Pagination,
    Seeabout,
    EditView,
    LookView
    // showView
  },
  data() {
    return {
      obj: {},
      // ishow: false,
      loading: true,
      form: {
        sdmc: "",
        jgxs: "",
        riskAssessment: "",
        riskStatus: '', // 风险状态
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      selection: {
        jgxs: [],
        riskStatus: [{
          value: '正常状态',
          label: '正常状态'
        },{
          value: '低风险状态',
          label: '低风险状态'
        },{
          value: '中风险状态',
          label: '中风险状态'
        },{
          value: '高风险状态',
          label: '高风险状态'
        }]
      },
      isShowDialog: false,
      ShowEditDialog: false, // 编辑弹窗
      ShowLookDialog: false, // 查看弹窗
      openID: null,
      objId: null,
      year: '', // 年度
      //选中的数据
      CheckedSelection: [],
      //表格头部
      tableTitle: [
        {
          label: "通道名称",
          prop: "sdmc",
          width: "300"
        },
        {
          label: "通道等级",
          prop: "grade"
        },
        {
          label: "起始名称",
          prop: "qjmc"
        },
        {
          label: "结束名称",
          prop: "hjmc"
        },
        {
          label: "隧道结构形式",
          prop: "jgxs"
        },
        {
          label: "风险评估主要扣分原因",
          prop: "pointsReason"
        },
        {
          label: "风险状态",
          prop: "riskStatus"
        },
        {
          label: "单项扣分最大值",
          prop: "singleMax"
        },
        // {
        //   label: "风险评分",
        //   prop: "riskAssessment"
        // },
        {
          label: "评分人",
          prop: "gradePerson"
        },
        {
          label: "年度",
          prop: "year"
        }
      ],
      tableData: []
    };
  },
  mounted() {
    this.getList();
    this.getSelect();
  },
  provide() {
    // 父页面方法
    return {
      getList: this.getList
    };
  },
  methods: {
    // 获取下拉数据
    getSelect() {
      getLineSelect().then(response => {
        // //console.log(response);
        if (response.status == 200) {
          this.selection.jgxs = response.data.data.jgxsList;
        }
      });
    },
    /**
     * 查询按钮
     */
    onSearch() {
      if (this.form.jgxs) {
        // 结构形式
        let searcharr = this.selection.jgxs.filter(res => {
          return this.form.jgxs == res.jgxs;
        });
        this.form.jgxs = searcharr[0]["jgxsmc"];
      }
      // //console.log("onSearch");
      this.pageNum = 1;
      this.getList();
    },
    /**
     * 重置
     */
    reset() {
      this.form = { brand_right: 0 };
      // this.tableData = []
      this.form.pageNum = 1;
      this.form.pageSize = 10;
      this.getList();
    },
    // 获取数据
    getList() {
      List(this.$qs.stringify(this.form)).then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.tableData = response.data.rows;
          this.form.total = response.data.total;
          this.loading = false;
          this.tableData.forEach(element => {
            console.log(element);
            if (element.grade == 1) {
              element.grade = "一级高压" + this.$dl + "通道" + this.$dl;
            } else if (element.grade == 2) {
              element.grade = "二级高压" + this.$dl + "通道" + this.$dl;
            } else if (element.grade == 3) {
              element.grade = "三级高压" + this.$dl + "通道" + this.$dl;
            }
          });
        }
      });
    },
    CheckFun(val) {
      this.CheckedSelection = val;
      //console.log(this.CheckedSelection);
    },
    // 评分
    grade(val) {
      //console.log(val);
      this.isShowDialog = true;
      this.openID = val.channelId;
      this.objId = val.id;
      this.year = val.year;
      //console.log(this.openID);
      this.$refs.seeAbout.getChannelType(val.channelId);
      this.$refs.seeAbout.getChannelSelect(val.channelId);
      // isGrade(val).then(response => {
      //   //console.log(response);
      //   if(response.data.status == 1){ //未评分情况
      //     this.isShowDialog = true;
      //     this.$refs.seeAbout.getChannelType(val.channelId)
      //   } else if(response.data.status == 0) { // 已评分情况
      //
      //   }
      // })
      // this.$refs.seeAbout.getRisk(val) // 调用子页面方法(传通道类型参数)
    },
    // 已评分
    Editgrade(val) {
      this.ShowEditDialog = true;
      this.openID = val.channelId;
      this.year = val.year;
      this.obj = val
      // this.$refs.EditView.getChannelType(val.channelId);
      // this.$refs.EditView.getChannelSelect(val.channelId);
    },
    // 查看
    view(val) {
      this.ShowLookDialog = true;
      this.openID = val.channelId;
      this.year = val.year;
      // this.$refs.LookView.getChannelType(val.channelId)
      // this.$refs.LookView.getChannelSelect(val.channelId)
    },
    //查看通道信息及评估结果
    // viewjg(val) {
    //   console.log(val);
    //   this.ishow = true;
    //   this.obj = val;
    // },
    /**
     * 接收查看/编辑子组件的数据
     */
    parentFn(val) {
      this.isShowDialog = val.showDialog;

      this.openID = null;
    },
    parentFnEdit(val) {
      //console.log(val);
      this.ShowEditDialog = val.ShowEditDialog;
      this.ShowLookDialog = val.ShowEditDialog;
      this.ishow = val.ShowEditDialog;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
