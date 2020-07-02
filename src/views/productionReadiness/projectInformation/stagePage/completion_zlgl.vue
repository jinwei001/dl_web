<template>
  <!-- <div>
    <h2>竣工验收-资料管理</h2>
  </div>-->
  <div class="main-userSelect">
    <div class="searchForm_glf">
      <el-form ref="form" inline>
        <el-form-item label="所属大阶段">
          <el-select v-model="form.ywdw" clearable placeholder="请选择">
            <el-option
              v-for="item in selection.dw"
              :key="item.id"
              :label="item.qb"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件小类型">
          <el-select v-model="form.ywdw" clearable placeholder="请选择">
            <el-option
              v-for="item in selection.dw"
              :key="item.id"
              :label="item.qb"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件小类">
          <el-select v-model="form.ywdw" clearable placeholder="请选择">
            <el-option
              v-for="item in selection.dw"
              :key="item.id"
              :label="item.qb"
              :value="item.id"
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
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column prop="name" label="所属大阶段" align="center"></el-table-column>
          <el-table-column prop="name" label="所属小阶段" align="center"></el-table-column>
          <el-table-column prop="name" label="文件名称" align="center"></el-table-column>
          <el-table-column prop="name" :label="`${$xl}`" align="center"></el-table-column>
          <el-table-column prop="name" :label="`${$xl}段`" align="center"></el-table-column>
          <el-table-column prop="name" label="文件大小（KB）" align="center"></el-table-column>
          <el-table-column prop="name" label="上传人员" align="center"></el-table-column>
          <el-table-column prop="name" label="文件类型" align="center"></el-table-column>
          <el-table-column prop="name" label="文件小类" align="center"></el-table-column>
          <el-table-column prop="name" label="上传时间" align="center"></el-table-column>
          <el-table-column prop="name" label="备注" align="center"></el-table-column>
          <el-table-column prop="name" label="下载链接" align="center"></el-table-column>
          <el-table-column align="center" label="操作" width="200">
            <template slot-scope="scope">
              <el-button class="onSearch" size="small" @click="EditFn(scope.row.id)">编辑</el-button>
              <el-button type="danger" size="small" plain @click="deleteFun(scope.row.objId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="form.total>0"
          :total="form.total"
          :page.sync="form.pageNum"
          :limit.sync="form.limit"
          @pagination="getList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";

export default {
  name: "firstFounded",
  components: {
    Pagination,
  },
  data() {
    return {
      isShowDialog: false, // 查看弹框打开
      isEdit: false, // 是否是编辑弹框
      openID: null, // 打开弹框的id值
      isAdd: false, // 是否是新增弹框
      form: {
        xlmc: "",
        pageNum: 1,
        limit: 10,
        total: 2
      },
      selection: {
        xlmc: [{ id: "1", qb: "全部" }]
      },
      //选中的数据
      CheckedSelection: [],
      tableParam: { // 列表查询的参数
        gcid: this.sonOpenId,
        
      },
      tableData: []
    };
  },
  props: {
    /**父页面传的id */
    sonOpenId: {
      default: null
    },
  },
  created() {},
  mounted() {
    this.getList()
  },
  methods: {
    // 获取列表信息
    
    onSearch() {
      //console.log("onSearch");
    },
    // 新增流程
    addFlow() {
      this.isAdd = true;
      this.isShowDialog = true;
    },
    getList() {},
    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val;
      //console.log(this.CheckedSelection);
    },
    /**
     * 编辑
     */
    EditFn(val){
      //console.log("编辑");
      //console.log(val);
    },
    /**
     * 删除
     */
    deleteFun(val){
        //console.log(val);
        //console.log("删除");
    }
  }
};
</script>


