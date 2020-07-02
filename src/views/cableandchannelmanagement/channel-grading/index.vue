<template>
  <!-- <div>
    <h2>通道定级</h2>
  </div>-->
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="form" inline>
          <el-form-item label="通道名称:">
            <el-input v-model="form.sdmc" clearable/>
            <!--<el-select v-model="form.xlmc" clearable placeholder="请选择">-->
              <!--<el-option-->
                <!--v-for="item in selection.xlmc"-->
                <!--:key="item.id"-->
                <!--:label="item.qb"-->
                <!--:value="item.id"-->
              <!--&gt;</el-option>-->
            <!--</el-select>-->
          </el-form-item>
          <el-form-item label="通道等级:">
            <!--<el-input v-model="form.grade" clearable/>-->
            <el-select v-model="form.grade" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.tddj"
                :key="item.tddj"
                :label="item.tddjmc"
                :value="item.tddj"
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
          <el-table-column prop="sdmc" label="通道名称" align="center"></el-table-column>
          <el-table-column prop="sbzr" label="设备主人" align="center"></el-table-column>
          <el-table-column prop="whbz" label="运维班组" align="center"></el-table-column>
          <el-table-column prop="grade" label="通道等级" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.grade == ''"></div>
              <div v-if="scope.row.grade == 1">一级高压{{$dl}}通道{{$dl}}</div>
              <div v-if="scope.row.grade == 2">二级高压{{$dl}}通道{{$dl}}</div>
              <div v-if="scope.row.grade == 3">三级高压{{$dl}}通道{{$dl}}</div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button class="onSearch" size="small" @click="editFun(scope.row.channelId)">编辑</el-button>
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
    <div class="hastitle">
      <show
        ref="show"
        :isShowDialog="isShowDialog"
        :isEdit="isEdit"
        :openID="openID"
        @childFn="parentFn"
      />
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import Show from "./show";
import {
  List,
  Echo,
  Edit
} from "@/api/cableandchannel/channel-grading/channel-grading";
export default {
  name: "CableEquipmentLedger",
  components: {
    Pagination,
    Show
  },
  data() {
    return {
      form: {
        sdmc: '',
        grade: '',
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      isShowDialog: false,
      isEdit: true,
      openID: null, //打开弹框的id值
      //选中的数据
      CheckedSelection: [],
      tableData: [],
      selection: {
        tddj: [{
          tddj: '1',
          tddjmc: '一级高压' + this.$dl + '通道' + this.$dl
        }, {
          tddj: '2',
          tddjmc: '二级高压' + this.$dl + '通道' + this.$dl
        }, {
          tddj: '3',
          tddjmc: '三级高压' + this.$dl + '通道'  + this.$dl
        }]
      }
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
    /**
     * 重置按钮
     */
    reset() {
      // //console.log("reset");
      this.form = { brand_right: 0 }
      this.form.pageNum = 1
      this.form.pageSize = 10
      this.getList()
    },
    /**
     * 查询按钮
     */
    onSearch() {
      // //console.log("onSearch");
      this.form.pageNum = 1
      this.getList()
    },
    // 表格数据
    getList() {
      // //console.log(this.form);
      List(this.$qs.stringify(this.form)).then(response => {
        //console.log(response);
        if(response.status == 200) {
          this.tableData = response.data.rows;
          this.form.total = response.data.total;
        }
      });
    },
    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val;
      //console.log(this.CheckedSelection);
    },
    /**
     * 编辑按钮
     */
    editFun(val) {
      //console.log(val);
      this.isShowDialog = true;
      this.isEdit = true;
      this.openID = val;
      this.$refs.show.getEcho(val) // 调用子页面方法
    },
    /**
     * 接收子组件的数据
     */
    parentFn(val) {
      this.isShowDialog = val.showDialog;
      this.isEdit = val.editbtn;
    }
  }
};
</script>
<style lang="scss" scoped>
.result {
  height: 300px;
}
</style>
