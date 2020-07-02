<template>
  <!-- <h2>
      xl巡视计划管理
  </h2>-->
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="form" inline>
          <el-form-item :label="$dydj">
            <el-select v-model="form.dydj" clearable placeholder="请选择">
              <el-option v-for="item in selection.dySelectArr" :key="item.kv" :label="item.kv" :value="item.kv"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$xl+'名称'">
            <el-select v-model="form.xlid" clearable filterable placeholder="请选择" @change='getDlList'>
              <el-option v-for="item in selection.linesSelectArr" :key="item.id" :label="item.lineName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  :label="$dl">
            <el-select v-model="form.dlid" clearable placeholder="请选择">
              <el-option v-for="item in selection.dlSelectArr" :key="item.id" :label="item.logicCableStageName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="带电检测类型:">
            <el-select v-model="form.ddjclx" clearable placeholder="请选择" @change='getSblxList'>
              <el-option v-for="(item,ind) in selection.ddjcArr" :key="ind" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="检测设备类型:">
            <el-select v-model="form.sblx" clearable placeholder="请选择">
              <el-option v-for="(item,ind) in selection.jcsblxArr" :key="ind" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择生成计划时间：">
            <el-col>
              <el-date-picker v-model="form.date" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="creatCyclePlan"> 生成计划</el-button>
          </el-form-item>
          <el-form-item style="float: right;margin-right: 0">
            <el-button size="small" class="onSearch" @click="onSearch">查询</el-button>
            <el-button size="small" class="onSearch" @click="reset" style="margin-right: 0">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div></div>
    <div class="content">
      <div class="respont-content">
        <el-form>
          <el-col>
            <el-form-item style="float: left;">
              <el-button size="small" class="onSearch" @click="Addfun">
                <i class="el-icon-plus"> 新增</i>
              </el-button>
              <el-button size="small" type="danger" plain @click="DelAllFn">
                <i class="el-icon-close"></i> 删除
              </el-button>
              <el-button size="small" class="onSearch" @click="batchBtn">
                <i class="el-icon-plus"> 批量新增</i>
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="tableData" height="600" style="border: 1px solid #c7c7c7;width:100%" :cell-style="{borderColor: '#c7c7c7'}" :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}" border fit highlight-current-row @selection-change="CheckFun">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{(searchForm.pageNum - 1) * 10 + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$dydj" align="center" prop="detectionCycle.dydj"></el-table-column>
          <el-table-column :label="$xl+'名称'" align="center" prop="detectionCycle.xlmc" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column :label="$dl" align="center" prop="detectionCycle.dlmc" width="200"></el-table-column>
          <el-table-column label="带电检测类型" align="center" prop="detectionCycle.ddjclx" width="120"></el-table-column>
          <el-table-column label="检测设备" align="center" prop="detectionCycle.sblx"></el-table-column>
          <el-table-column label="设备名称" align="center" prop="detectionCycle.sbmc"></el-table-column>
          <el-table-column label="上次检测时间" align="center" prop="scjcsj" width="160"></el-table-column>
          <el-table-column label="检测周期" align="center" prop="detectionCycle.jczq">
            <template slot-scope="scope">
              {{scope.row.detectionCycle.jczq + scope.row.detectionCycle.dw}}
            </template>
          </el-table-column>
          <el-table-column label="提前预警天数" align="center" prop="detectionCycle.tqyjts" width="120"></el-table-column>
          <el-table-column label="检测班组" align="center" prop="detectionCycle.jcbz"></el-table-column>
          <el-table-column label="检测人" align="center" prop="detectionCycle.jcr"></el-table-column>
          <el-table-column label="检测单位" align="center" prop="detectionCycle.jcdw"></el-table-column>
          <el-table-column label="周期调整" align="center" width="120">
            <template slot-scope="scope" class="bottleGreenBtnCon">
              <el-button class="onSearch" size="mini" @click="lookOverBtn(scope.row.detectionCycle.id)">查看周期调整</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" class-name="small-padding fixed-width" width="120">
            <div slot-scope="scope" class="">
              <el-button class="onSearch" size="mini" @click="editFun(scope.row.detectionCycle.id)">编辑</el-button>
              <el-button plain size="mini" type="danger" @click="del(scope.row.detectionCycle.id)">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
        <pagination v-show="pageDetail.total>0" :total="pageDetail.total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize" @pagination="getData" />
      </div>
    </div>

    <div v-if="isShowDialog">
      <Add :selection='selection' @childFn="parentFn" :isEdit="isEdit" :openID="openID" />
    </div>
    <div v-if="isShowAddBatch">
      <AddBatch :selection='selection' @childFn="parentFn" />
    </div>
    <div v-if="isShowLookOver">
      <LookOver :selection='selection' @childFn="parentFn" :openID="openID" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import Add from './Add'
import AddBatch from './AddBatch'
import LookOver from './LookOver'
import { Message } from 'element-ui'
import {
  cycleList as list,
  cycleDel as delData,
  dySelect, // 电压下拉
  linesSelect, // xl下拉
  dlSelect, // dl下拉
  jcbzSelect, // 检测班组
  planLineUpload, // 导出
  cycleCreatePlan,// 生成计划
} from '@/api/liveDetectionManage'
export default {
  components: {
    Pagination,
    Add,
    AddBatch,
    LookOver
  },
  data() {
    return {
      isShowDialog: false, //查看弹框打开
      isShowAddBatch: false,
      isShowLookOver: false,
      isEdit: false, //是否是编辑弹框
      openID: null, //打开弹框的id值
      ddjc_sb_arr: {
        sb: [
          [this.$dl+'终端', this.$dl+'接头', this.$dl+'分支箱', '接地箱'],
          [this.$dl+'终端', this.$dl+'接头', '交叉互联箱', '接地箱'],
          [this.$dl+'终端', this.$dl+'接头']
        ]
      },
      form: {
        dydj: '',
        xlid: '',
        dlid: '',
        ddjclx: '',
        sblx: '',
        date: [],
        pageNum: 1,
        pageSize: 10
      },
      pageDetail: {
        total: 0
      },
      searchForm: {
        pageNum: 1,
        pageSize: 10
      },
      selection: {
        dySelectArr: [], //dydj
        linesSelectArr: [], // xl名称
        dlSelectArr: [], // dl
        ddjcArr: ['红外测温', '金属护层接地电流测量', '局部放电检测'], // 带电检测类型
        jcsblxArr: [], // 检测设备类型
        jcbzSelectArr: [] ,// 检测班组
        sbmcArr:[],
      },
      //选中的数据
      CheckedSelection: [],
      tableData: []
    }
  },
  created() {
    this.getData()
    dySelect().then(res => {
      // 电压
      this.selection.dySelectArr = res.data.data
    })
    linesSelect().then(res => {
      // xl
      this.selection.linesSelectArr = res.data.rows
    })
    jcbzSelect().then(res => {
      // 检测班组
      this.selection.jcbzSelectArr = res.data.rows
    })
  },
  mounted() {},
  methods: {
    async getData() {
      // 获取列表数据
      let res = await list(this.searchForm)
      this.tableData = res.data.rows
      this.pageDetail.total = res.data.total
    },
    /** dl change 获取dl */
    getDlList(lineId) {
      dlSelect({ lineId }).then(res => {
        // dl
        this.selection.dlSelectArr = res.data.rows
      })
    },
    /** 带电检测类型change 获取设备类型 */
    getSblxList(ind) {
      this.selection.jcsblxArr = this.ddjc_sb_arr.sb[this.selection.ddjcArr.indexOf(ind)]
    },
    /**删除所有 */
    DelAllFn() {
      if (this.CheckedSelection.length == 0) {
        this.$message('请选择要编辑的数据')
        return
      }
      let idsArr = []
      this.CheckedSelection.forEach(v => {
        idsArr.push(v.detectionCycle.id)
      })

      this.del(idsArr.join(','))
    },

    del(ids) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delData({ ids }).then(val => {
            val = val.data
            let type = val.code == 0 ? 'success' : 'error'
            this.$message({ type, message: val.msg })
            if (val.code == 0) this.getData()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },

     creatCyclePlan() {
       //console.log(this.form.data)
       if(this.form.date.length == 0){
         this.$message('请选择生成计划时间')
         return
       }
      if (this.CheckedSelection.length == 0) {
        this.$message('请选择列表数据')
        return
      }

      let idsArr = []
      this.CheckedSelection.forEach(v => {
        idsArr.push(v.detectionCycle.id)
      })

      cycleCreatePlan({ ids: idsArr.join(','), begin:this.form.date[0], end:this.form.date[1]}).then(val => {
        val = val.data
        let type = val.code == 0 ? 'success' : 'error'
        this.$message({ type, message: val.msg })
        if (val.code == 0) this.getData()
      })
      //  this.$refs.singleTable.setCurrentRow();
    },
    /** 导出 */
    upload() {
      for (let key in this.form) {
        this.searchForm[key] = this.form[key]
      }
      this.searchForm.beginTime = this.form.date[0]
      this.searchForm.endTime = this.form.date[1]
      delete this.searchForm.date
      planLineUpload(this.searchForm).then(res => {
        window.location.href =
          process.env.VUE_APP_BASE_API +
          '/common/download?fileName=' +
          res.data.msg +
          '&delete=true'
      })
    },
    reset() {
      this.form = {
        dydj: '',
        xlid: '',
        dlid: '',
        ddjclx: '',
        sblx: '',
        date: [],
        pageNum: 1,
        pageSize: 10
      }
    },
    onSearch() {
      for (let key in this.form) {
        this.searchForm[key] = this.form[key]
      }
      this.searchForm.beginTime = this.form.date[0]
      this.searchForm.endTime = this.form.date[1]
      delete this.searchForm.date
      this.getData()
    },
    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val
    },
    editFun(val) {
      this.isShowDialog = true
      this.isEdit = true
      this.openID = val
    },
    /**新增按钮 */
    Addfun() {
      this.isShowDialog = true
      this.isEdit = false
    },
    /** 批量新增 */
    batchBtn() {
      this.isShowAddBatch = true
      this.isEdit = false
    },
    lookOverBtn(val) {
      this.isShowLookOver = true
      this.isEdit = false
      this.openID = val
    },
    /**
     * 接收查看/编辑子组件的数据
     */
    parentFn(val) {
      this.isShowDialog = false
      this.isShowAddBatch = false
      this.isShowLookOver = false
      this.getData()
    }
  }
}
</script>
