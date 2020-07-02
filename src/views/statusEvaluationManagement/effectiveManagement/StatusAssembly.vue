<template>
  <!-- <h2>
      XL巡视计划管理
  </h2>-->
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="form" inline>
          <el-form-item :label="`${$xl}名称:`">
            <el-select v-model="form.dldj" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.xlmc"
                :key="item.id"
                :label="item.qb"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="`${$dydj}:`">
            <el-select v-model="form.dldj" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.xlmc"
                :key="item.id"
                :label="item.qb"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="敷设方式：">
            <el-select v-model="form.dldj" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.xlmc"
                :key="item.id"
                :label="item.qb"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="投运时间：">
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
          <el-table-column prop="name" label="运维单位" align="center"></el-table-column>
          <el-table-column prop="name" :label="`${$xl}名称`" align="center"></el-table-column>
          <el-table-column prop="name" :label="`${$dydj}`" align="center"></el-table-column>
          <el-table-column prop="name" label="投运日期" align="center"></el-table-column>
          <el-table-column prop="name" label="长度（㎞）" align="center"></el-table-column>

          <el-table-column prop="name" label="资产单位" align="center"></el-table-column>
          <el-table-column prop="name" label="敷设方式" align="center"></el-table-column>
          <el-table-column prop="name" label="起始位置" align="center"></el-table-column>
          <el-table-column prop="name" label="终止位置" align="center"></el-table-column>
          <el-table-column prop="name" label="评价结果" align="center"></el-table-column>
          <el-table-column prop="name" label="操作" align="center" width="300">
            <div slot-scope="scope" class="bottleGreenBtnCon">
              <el-button class="onSearch bottleGreenBtnCon" size="small" @click="EditFn(scope.row.id)">故障信息</el-button>
              <el-button class="onSearch bottleGreenBtnCon" size="small" @click="EditFn(scope.row.id)">老旧{{$dl}}信息</el-button>
              <el-button class="onSearch bottleGreenBtnCon" size="small" @click="EditFn(scope.row.id)">有效性说明</el-button>
            </div>
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
  components: {
    Pagination,

  },
  data() {
    return {
      isShowDialog: false, //查看弹框打开
      isEdit: false, //是否是编辑弹框
      openID: null, //打开弹框的id值
      isAdd: false, //是否是新增弹框
      isview: true,
      form: {
        ywdw: "",
        date: "",
        dydj: "",
        xlmc: "",
        ysfs: "",
        pageNum: 1,
        limit: 10,
        total: 2
      },
      selection: {
        dw: [{ id: "1", qb: "全部" }],
        zcdw: [{ id: "1", qb: "全部" }],
        dydj: [{ id: "1", qb: "全部" }],
        xlmc: [{ id: "1", qb: "全部" }],
        ysfs: [{ id: "1", qb: "全部" }]
      },
      //选中的数据
      CheckedSelection: [],
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
    reset() {
      //console.log("reset");
    },
    onSearch() {
      //console.log(this.form.date);
      //console.log("onSearch");
    },
    getList() {},
    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val;
      //console.log(this.CheckedSelection);
    },
    EditFn(val) {
      //console.log("编辑");
      //console.log(val);
    },
    /**新增按钮 */
    Addfun() {
      //console.log("新增");
      this.isShowDialog = true;
      this.isAdd = true;
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
<style lang="scss" scoped>
</style>
