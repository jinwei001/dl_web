<template>
  <!-- <h2>通道附属设施 -->
  <div>
    <div class="main-body" v-if="isview">
      <div class="main-userSelect">
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <el-form-item label="通道名称:">
              <el-input v-model="form.sdmc" clearable placeholder="请输入" />
              <!--<el-select v-model="form.sdmc" clearable placeholder="请选择">-->
              <!--<el-option-->
              <!--v-for="item in selection.sdmc"-->
              <!--:key="item.id"-->
              <!--:label="item.qb"-->
              <!--:value="item.id"-->
              <!--&gt;</el-option>-->
              <!--</el-select>-->
            </el-form-item>
            <el-form-item label="结构形式:">
              <el-select v-model="form.jgxs" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.jgxs"
                  :key="item.jgxs"
                  :label="item.jgxsmc"
                  :value="item.jgxs"
                ></el-option>
              </el-select>
            </el-form-item>
            <!--<el-form-item label="投运日期：">-->
            <!--<el-col>-->
            <!--<el-date-picker-->
            <!--v-model="form.tyrq"-->
            <!--type="daterange"-->
            <!--value-format="yyyy-MM-dd"-->
            <!--range-separator="~"-->
            <!--start-placeholder="开始日期"-->
            <!--end-placeholder="结束日期"-->
            <!--&gt;</el-date-picker>-->
            <!--</el-col>-->
            <!--</el-form-item>-->
            <el-form-item label="运维单位:">
              <el-input v-model="form.ywdw" clearable placeholder="请输入" />
              <!--<el-select v-model="form.ywdw" clearable placeholder="请选择">-->
              <!--<el-option-->
              <!--v-for="item in selection.ywdw"-->
              <!--:key="item.id"-->
              <!--:label="item.qb"-->
              <!--:value="item.id"-->
              <!--&gt;</el-option>-->
              <!--</el-select>-->
            </el-form-item>
          </el-form>
        </div>
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <el-form-item label="运维班组:">
              <el-select v-model="form.bzmc" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.ywbz"
                  :key="item.groupId"
                  :label="item.groupname"
                  :value="item.groupId"
                ></el-option>
              </el-select>
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
                <el-button class="onSearch" @click="AddNewFn">
                  <i class="el-icon-plus">新增</i>
                </el-button>
                <el-button class="onSearch" @click="EditFn">
                  <i class="el-icon-edit-outline">编辑</i>
                </el-button>
                <el-button type="danger" plain @click="deleteFn">
                  <i class="el-icon-close"></i> 删除
                </el-button>
              </el-form-item>
              <el-form-item style="float: right;">
                <el-button class="onSearch" @click="reset">
                  <i class="el-icon-plus"></i> 导入
                </el-button>
                <el-button class="onSearch" @click="exportData">
                  <i class="el-icon-document"></i> 导出
                </el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="table">
          <el-table
            height="530"
            :data="tableData"
            style="border: 1px solid #c7c7c7"
            :cell-style="{borderColor: '#c7c7c7'}"
            :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}"
            border
            fit
            highlight-current-row
            @selection-change="CheckFun"
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
            <!-- :show-overflow-tooltip="tabisoverflow" ||||超出表格字体隐藏 -->
            <el-table-column align="center" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button class="onSearch" size="small" @click="view(scope.row.objId)">查看</el-button>
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
    </div>
    <seeabout v-if="!isview" :clickID="clickID"  @childFn1="seeaboutparentFn" />
    <div v-if="isShowDialog">
      <add-new ref="addNew" @childFn="parentFn" :isEdit="isEdit" :openID="openID" :isAdd="isAdd" />
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import Seeabout from "./view";
import AddNew from "./addnew";
import {
  List,
  Add,
  DeleteList,
  Edit,
  downLoadFileName,
  getLineSelect
} from "@/api/cableandchannel/channel-ledger-management/channel-ledger-management/cl-management";

export default {
  components: {
    Pagination,
    Seeabout,
    AddNew
  },
  data() {
    return {
      isview: true,
      clickID: null,
      isShowDialog: false, //查看弹框打开
      isEdit: false, //是否是编辑弹框
      openID: null, //打开弹框的id值
      isAdd: false, //是否是新增弹框
      form: {
        sdmc: "",
        jgxs: "",
        ywdw: "",
        whbz: "",
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      //表格头部
      tableTitle: [
        {
          label: "通道名称",
          prop: "sdmc",
          width: "300"
        },
        {
          label: "前井名称",
          prop: "qjmc",
          width: "200"
        },
        {
          label: "前井坐标",
          prop: "qjzb",
          width: "200"
        },
        {
          label: "后井坐标",
          prop: "hjzb",
          width: "200"
        },
        {
          label: "起点位置",
          prop: "qdwz"
        },
        {
          label: "终点位置",
          prop: "zdwz"
        },
        {
          label: "总段数",
          prop: "name"
        },
        {
          label: "通道长度",
          prop: "tdcd"
        },
        {
          label: "结构形式",
          prop: "jgxs"
        },
        {
          label: "运维班组",
          prop: "whbz"
        },
        {
          label: "通道主人",
          prop: "sbzr"
        },
        {
          label: "运行状态",
          prop: "yxzt"
        },
        {
          label: "资产性质",
          prop: "zcxz"
        },
        {
          label: "资产单位",
          prop: "zcdw"
        },
        {
          label: "资产编号",
          prop: "zcbh"
        },
        // {
        //   label: "工程编号",
        //   prop: "name"
        // },
        {
          label: "投运日期",
          prop: "tyrq"
        },
        {
          label: "运维单位",
          prop: "ywdw"
        },
        {
          label: "设备编码",
          prop: "sbbm"
        }
      ],
      selection: {
        jgxs: [],
        ywbz: []
      },
      //选中的数据
      CheckedSelection: [],
      tableData: []
    };
  },
  provide() {
    // 父页面方法
    return {
      getList: this.getList
    };
  },
  created() {},
  mounted() {
    this.getList();
    this.getSelect();
  },
  methods: {
     seeaboutparentFn(val) {
      this.isShowStageInfo = val.back
      this.getList() // 刷新方法
    },
    /**获取数据 */
    getList() {
      // //console.log(this.form);
      List(this.$qs.stringify(this.form)).then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.tableData = response.data.rows;
          this.form.total = response.data.total;
        }
      });
    },
    // 获取下拉数据
    getSelect() {
      getLineSelect().then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.selection.ywbz = response.data.data.groupList;
          this.selection.jgxs = response.data.data.jgxsList;
        }
      });
    },
    /**重置 */
    reset() {
      // //console.log("reset");
      this.form = { brand_right: 0 };
      this.form.pageNum = 1;
      this.form.pageSize = 10;
      this.getList();
    },
    /**查询 */
    onSearch() {
      if (this.form.jgxs) {
        // 结构形式
        let searcharr = this.selection.jgxs.filter(res => {
          return this.form.jgxs == res.jgxs;
        });
        this.form.jgxs = searcharr[0]["jgxsmc"];
      }
      if (this.form.bzmc) {
        // 运维班组
        let searcharr = this.selection.ywbz.filter(res => {
          return this.form.bzmc == res.groupId;
        });
        this.form.bzmc = searcharr[0]["groupname"];
      }
      // //console.log("onSearch");
      this.form.pageNum = 1;
      this.getList();
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
      // var chosenId = ids.join(","); // 数组转字符串
      this.selectedIDs = chosenId; //选中数据中的所有id
    },
    /**新增 */
    AddNewFn() {
      //console.log("新增");
      this.isAdd = true;
      this.isShowDialog = true;
    },
    /**编辑按钮 */
    EditFn() {
      if (
        this.CheckedSelection.length > 1 ||
        this.CheckedSelection.length <= 0
      ) {
        this.$message("请选择一条要编辑的数据");
        return false;
      }
      this.isShowDialog = true;
      this.isEdit = true;
      this.openID = this.CheckedSelection[0].objId;
      // //console.log(this.gruClickID);
      // //console.log(this.openID);
      this.$refs.addNew.getEcho(this.openID); // 调用子页面方法
    },
    /**查看 */
    view(val) {
      //console.log("查看");
      //console.log(val);
      this.isview = false;
      this.clickID = val;
    },
    // 删除按钮
    deleteFn() {
      if (this.CheckedSelection.length == 0) {
        this.$message("请选择要删除的数据");
        return false;
      }
      this.$confirm("确认要删除数据吗？")
        .then(_ => {
          DeleteList(this.selectedIDs).then(res => {
            // //console.log(res);
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
    /** 接收查看/编辑子组件的数据*/
    parentFn(val) {
      //console.log(val,"assssssssssss");
      this.isShowDialog = val.ShowDialog;
      this.isEdit = val.editbtn;
      this.isAdd = val.addbtn;
    },
    // 导出功能
    exportData() {
      downLoadFileName(this.form).then(response => {
        // //console.log(response)
        window.location.href =
          process.env.VUE_APP_BASE_API +
          "/common/download?fileName=" +
          response.data.msg +
          "&delete=true";
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
