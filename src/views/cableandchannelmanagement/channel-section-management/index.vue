<template>
  <!-- <div>
    <h2>通道断面管理</h2>
  </div>-->
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="form" inline>
          <el-form-item label="通道断面名称:">
            <el-select v-model="form.xlmc" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.xlmc"
                :key="item.id"
                :label="item.qb"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属通道名称:">
            <el-select v-model="form.dldj" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.xlmc"
                :key="item.id"
                :label="item.qb"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属通道段名称:">
            <el-select v-model="form.dldj" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.xlmc"
                :key="item.id"
                :label="item.qb"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="断面类型:">
            <el-select v-model="form.dldj" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.xlmc"
                :key="item.id"
                :label="item.qb"
                :value="item.id"
              ></el-option>
            </el-select>
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
              <el-button type="danger" plain @click="onSearch">
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
          <!-- <el-table-column prop="name" label="运维单位" align="center"></el-table-column> -->
          <el-table-column
            v-for="item in tableTitle"
            :key="item.index"
            :prop="item.prop"
            :label="item.label"
            align="center"
            :show-overflow-tooltip="tabisoverflow"
          ></el-table-column>
          <el-table-column
            align="center"
            label="操作"
            class-name="small-padding fixed-width"
            width="250"
          >
            <template slot-scope="scope">
              <el-col>
                <el-button class="onSearch" size="small" @click="editFun(scope.row.id)">编辑</el-button>
                <el-button type="danger" size="small" plain @click="DelFunOne(scope.row.id)">删除</el-button>
                <el-button class="onSearch" size="small" @click="GlFun(scope.row.id)">断面管理</el-button>
              </el-col>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="关联台账" align="center"></el-table-column>
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
    <add
      v-if="isShowDialog"
      :isShowDialog="isShowDialog"
      @childFn="parentFn"
      :isEdit="isEdit"
      :openID="openID"
      :isAdd="isAdd"
    />
    <section-show
      v-if="isSectionShowDialog"
      :isSectionShowDialog="isSectionShowDialog"
      @sectionFun="sectionparentFn"
    />
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import Add from "./add";
import SectionShow from "./section";
export default {
  components: {
    Pagination,
    Add,
    SectionShow
  },
  data() {
    return {
      isSectionShowDialog: false, //断面弹框打开
      isShowDialog: false, //查看弹框打开
      isEdit: false, //是否是编辑弹框
      openID: null, //打开弹框的id值
      isAdd: false, //是否是新增弹框
      tabisoverflow: true,
      form: {
        dlmc: "",
        xlmc: "",
        dlmc: "",
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      selection: {
        xlmc: [{ id: "1", qb: "全部" }]
      },
      isedit: true,
      //选中的数据
      CheckedSelection: [],
      //表头
      tableTitle: [
        {
          label: "通道断面",
          prop: "address"
        },
        {
          label: "所属通道",
          prop: "name"
        },
        {
          label: "通道段",
          prop: "date"
        },
        {
          label: "断面类型",
          prop: "id"
        },
        {
          label: "左侧支架层数",
          prop: "date"
        },
        {
          label: "右侧支架层数",
          prop: "name"
        }
      ],
      tableData: [
        {
          id: "1",
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: "2",
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    /**
     * 重置按钮
     */
    reset() {
      //console.log("reset");
    },
    /**
     * 查询按钮
     */
    onSearch() {
      //console.log("onSearch");
    },
    getList() {},
    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val;
      //console.log(this.CheckedSelection);
    },
    /**
     * 编辑按钮
     */
    editFun(val) {
      //console.log("编辑按钮");
      //console.log(val);
      this.isShowDialog = true;
      this.isEdit = true;
    },
    /**新增按钮 */
    Addfun() {
      //console.log("新增");
      this.isAdd = true;
      this.isShowDialog = true;
    },
    /**断面管理 */
    GlFun(val) {
      //console.log("断面管理22222222222");
      //console.log(val);
      this.isSectionShowDialog = true;
      //console.log(this.isSectionShowDialog);
    },
    /**DelFunOne 删除一条 */
    DelFunOne(val) {
      //console.log("删除一条");
      //console.log(val);
    },
    /**
     * 接收子组件的数据
     */
    parentFn(val) {
      this.isShowDialog = val.showDialog;
      this.isEdit = val.editbtn;
      this.isAdd = val.addbtn;
    },
    /**
     * 接收来自断面的数据
     * */
    sectionparentFn(val) {
      //console.log(val);
       this.isSectionShowDialog = val;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
