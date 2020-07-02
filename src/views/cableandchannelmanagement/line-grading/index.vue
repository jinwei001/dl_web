<template>
  <!-- <div>
    <h2>XL定级</h2>
  </div>-->
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="form" inline>
          <el-form-item :label="`${$xl}名称:`">
            <!--<el-input v-model="form.lineId" clearable/>-->
            <el-select v-model="form.lineName" clearable filterable placeholder="请选择">
              <el-option
                v-for="item in selection.xlmc"
                :key="item.lineId"
                :label="item.lineName"
                :value="item.lineName"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item :label="`${$dl}名称:`">
            <el-select v-model="form.dlmc" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.xlmc"
                :key="item.id"
                :label="item.qb"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item :label="`${$dl}等级:`">
            <!--<el-input v-model="form.grade" clearable/>-->
            <el-select v-model="form.grade" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.dldj"
                :key="item.dldj"
                :label="item.dldjmc"
                :value="item.dldj"
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
          <el-table-column prop="lineName" :label="`${$xl}名称`" align="center"></el-table-column>
          <el-table-column prop="voltageRank" :label="`${$dydj}`" align="center"></el-table-column>
          <el-table-column prop="grade" :label="`${$dl}等级`" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.grade == ''"></div>
              <div v-if="scope.row.grade == 1">一级高压{{$dl}}</div>
              <div v-if="scope.row.grade == 2">二级高压{{$dl}}</div>
              <div v-if="scope.row.grade == 3">三级高压{{$dl}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="reason" label="归档原因" width="200" align="center"></el-table-column>
          <el-table-column prop="totalLength" :label="`${$dl}长度`" align="center"></el-table-column>
          <el-table-column prop="lineType" label="架设方式" align="center"></el-table-column>
          <el-table-column prop="transportTime" label="投运时间" align="center"></el-table-column>
          <el-table-column prop="groupname" label="运维班组" align="center"></el-table-column>
          <el-table-column prop="facilityMaster" label="设备主人" align="center"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button class="onSearch" size="small" @click="editFun(scope.row.lineId)">编辑</el-button>
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
} from "@/api/cableandchannel/line-grading/line-grading";
import {getLineSelect} from "@/api/cableandchannel/cable-equipment-ledger/Line/index";
export default {
  name: "CableEquipmentLedger",
  components: {
    Pagination,
    Show
  },
  data() {
    return {
      form: {
        lineName: '',
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
        xlmc: [],
        dldj: [{
          dldj: '1',
          dldjmc: '一级高压' + this.$dl
        }, {
          dldj: '2',
          dldjmc: '二级高压' + this.$dl
        }, {
          dldj: '3',
          dldjmc: '三级高压' + this.$dl
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
    this.getSelect()
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
      this.form.total = 0
      this.getList()
    },
    // 获取下拉数据
    getSelect() {
      getLineSelect().then(response => {
        //console.log(response)
        if (response.status == 200) {
          this.selection.xlmc = response.data.data.lineList
        }
      })
    },
    /**
     * 查询按钮
     */
    onSearch() {
      // if (this.form.lineName){ // XL名称
      //   let searcharr = this.selection.xlmc.filter(res=>{
      //     return this.form.lineName == res.lineId
      //   })
      //   this.form.lineName = searcharr[0]['lineName']
      // }
      // //console.log("onSearch");
      this.form.pageNum = 1
      this.getList()
    },
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
      // //console.log(val);
      this.isShowDialog = true;
      this.isEdit = true;
      this.openID = val;
      this.$refs.show.getEcho(val) // 调用子页面方法
    },
    /**
     * 接收子组件的数据
     */
    parentFn(val) {
      // //console.log(val);
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
