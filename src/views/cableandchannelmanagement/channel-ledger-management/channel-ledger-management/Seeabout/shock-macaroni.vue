<template>
  <!-- <h2>排管</h2> -->
  <div class="main-userSelect">
    <div class="searchForm_glf">
      <el-form ref="form" inline>
        <el-form-item label="通道名称：">
          <el-input v-model="form.tdmc" clearable />
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
              <el-button class="onSearch" @click="exportData">
                <i class="el-icon-document"></i> 导出
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
          <el-table-column
            v-for="item in tableTitle"
            :key="item.index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            align="center"
          ></el-table-column>
          <el-table-column prop="name" label="操作" align="center">
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
    <div v-if="isShowDialog">
      <shock-macaroni-show
        ref="ShockMacaroniShow"
        @childFn="parentFn"
        :isEdit="isEdit"
        :openID="openID"
        :gruClickID="gruClickID"
        :isAdd="isAdd"
      />
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import ShockMacaroniShow from "./shock-macaroni-show";
import {
  List,
  Add,
  DeleteList,
  Edit,
  downLoadFileName
} from "@/api/cableandchannel/channel-ledger-management/channel-ledger-management/cl-shockMacaroni";
export default {
  components: {
    Pagination,
    ShockMacaroniShow
  },
  props: {
    childclickID: {
      default: null
    }
  },
  data() {
    return {
      gruClickID: this.childclickID, //祖父传的Id
      isShowDialog: false, //查看弹框打开
      isEdit: false, //是否是编辑弹框
      openID: null, //打开弹框的id值
      isAdd: false, //是否是新增弹框
      //表格头部
      tableTitle: [
        {
          label: "通道名称",
          prop: "tdmc",
          width: '300'
        },
        {
          label: "设备编码",
          prop: "sbbm"
        },
        {
          label: "管道类型",
          prop: "lx"
        },
        {
          label: "起始点",
          prop: "qdwz"
        },
        {
          label: "管道长度",
          prop: "dlgcd"
        },
        {
          label: "井数量",
          prop: "jsl"
        }
      ],
      form: {
        sstd: this.childclickID,
        tdmc: "",
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      //选中的数据
      CheckedSelection: [],
      selectedIDs: [],
      tableData: []
    };
  },
  provide() { // 父页面方法
    return {
      getList: this.getList,
    }
  },
  created() {},
  mounted() {
    this.getList()
  },
  methods: {
    onSearch() {
      // //console.log("onSearch");
      this.form.pageNum = 1
      this.getList()
    },

    /**获取数据 */
    getList() {
      List(this.$qs.stringify(this.form)).then(res => {
        //console.log(res);
        this.tableData = res.data.rows;
        this.form.total = res.data.total;
      })
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
    /**新增按钮 */
    AddNewFn() {
      //console.log("新增");
      this.isAdd = true;
      this.isShowDialog = true;
    },
    /**查看按钮 */
    view(val) {
      //console.log(val);
      this.isShowDialog = true;
      this.openID = val;
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
      // this.$refs.ShockMacaroniShow.getEcho(this.openID) // 调用子页面方法
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
    /**
     * 接收查看/编辑子组件的数据
     */
    parentFn(val) {
      this.isShowDialog = val.showDialog;
      this.isEdit = val.editbtn;
      this.isAdd = val.addbtn;
    },
    // 导出功能
    exportData() {
      downLoadFileName(this.form).then(response => {
        // //console.log(response)
        window.location.href = process.env.VUE_APP_BASE_API+'/common/download?fileName='+response.data.msg+'&delete=true'
      })
    },
  }
};
</script>
