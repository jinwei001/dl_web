<template>
  <!-- <h2>xl巡视周期管理</h2> -->
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="form" inline>
          <el-form-item label="通道名称:">
            <el-select v-model="form.tdId" filterable clearable placeholder="请选择" :filter-method="filterList">
              <el-option v-for="item in tDList" :key="item.id" :label="item.tdName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运维单位:">
            <el-input v-model="form.opsCompany"></el-input>
          </el-form-item>
          <el-form-item label="运维班组:">
            <el-select v-model="form.opsGroup" clearable placeholder="请选择">
              <el-option v-for="item in selection.groupsArr" :key="item.id" :label="item.groupName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备主人:">
            <el-input v-model="form.sbzr"></el-input>
          </el-form-item>

          <el-form-item label="巡视类型:">
            <el-select v-model="form.xslx" clearable placeholder="请选择">
              <el-option v-for="item in selection.patrolTypesArr" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
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
                <i class="el-icon-plus"> 新增</i>
              </el-button>
              <el-button class="onSearch" @click="editBatch">
                <i class="el-icon-edit"> 批量编辑</i>
              </el-button>
              <el-button type="danger" plain @click="DelAllFn">
                <i class="el-icon-close"></i> 删除
              </el-button>
              <el-button type="primary" @click="creatPatrolCycle"> 生成巡视计划</el-button>
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
          <el-table-column label="通道名称" align="center" prop="tdName" width="200"></el-table-column>
          <el-table-column label="运维单位" align="center" prop="opsCompany" width="250"></el-table-column>
          <el-table-column label="运维班组" align="center" prop="opsGroup" width="250"></el-table-column>
          <el-table-column label="设备主人" align="center" prop="equipmentHost" width="110"></el-table-column>
          <el-table-column label="周期" align="center">
            <template slot-scope="scope" class="bottleGreenBtnCon">
              {{scope.row.zq }}{{scope.row.dw}}
            </template>
          </el-table-column>
          <el-table-column label="投运日期" align="center" prop="tyrq" width="180"></el-table-column>
          <el-table-column label="上次巡视时间" align="center" prop="scxssj" width="180"></el-table-column>
          <el-table-column label="要求" align="center" prop="yq"></el-table-column>
          <el-table-column label="巡视类型" align="center" width="130">
            <template slot-scope="scope" class="bottleGreenBtnCon">
              {{scope.row.xslx | patrolType(selection.patrolTypesArr)}}
            </template>
          </el-table-column>
          <el-table-column label="提前预警天数" align="center" prop="tqyjts" width="160"></el-table-column>

          <el-table-column align="center" label="操作" class-name="small-padding fixed-width" width="200">
            <template slot-scope="scope">
              <el-col>
                <el-button class="onSearch" size="small" @click="editFun(scope.row.objId)">编辑</el-button>
                <el-button type="danger" size="small" plain @click="del(scope.row.objId)">删除</el-button>
              </el-col>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="pageDetail.total>0" :total="pageDetail.total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize" @pagination="getData" />
      </div>
    </div>

    <div v-if="isShowDialog">
      <add :selection='selection' @childFn="parentFn" :isEdit="isEdit" :openID="openID" />
    </div>
    <div v-if="isShowBatchEdit">
      <EditBatch :selection='selection' @childFn="parentFn" :batchId="batchId" />
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import Add from './add'
import EditBatch from './EditBatch'

import { Message } from 'element-ui'
import {
  PatrolCycleChannerList as list,
  PatrolCycleChannerDel as delData,
  channels,
  lines,
  groups,
  PatrolChannelsCreatPlan,
  patrolTypes
} from '@/api/patrolmanagement'
export default {
  components: {
    Pagination,
    Add,
    EditBatch
  },
  data() {
    return {
      tDList: [],
      isShowDialog: false, // 控制弹窗显示
      isEdit: false, //是否是编辑弹框
      openID: null, //打开弹框的id值
      isShowBatchEdit: false,
      batchId: '',
      form: {
        tdId: '',
        opsCompany: '',
        opsGroup: '',
        sbzr: '',
        xslx: '',
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
        channelsArr: [], //通道名称
        patrolTypesArr: [], // 巡视类型
        groupsArr: [] // 运维班组
      },
      //选中的数据
      CheckedSelection: [],
      tableData: []
    }
  },
  created() {
    this.getData() // 获取数据
    channels().then(res => {
      this.selection.channelsArr = res.data.data
      this.filterList()
    })

    groups().then(res => {
      this.selection.groupsArr = res.data.data
    })

    patrolTypes().then(res => {
      this.selection.patrolTypesArr = res.data.data
    })
  },
  methods: {
    async getData() {
      // 获取列表数据
      let res = await list(this.searchForm)
      this.tableData = res.data.rows
      this.pageDetail.total = res.data.total
    },

    /**删除所有 */
    DelAllFn() {
      if (this.CheckedSelection.length == 0) {
        this.$message('请选择要编辑的数据')
        return
      }
      let idsArr = []
      this.CheckedSelection.forEach(v => {
        idsArr.push(v.objId)
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
    filterList(query = '') {
      let arr = this.selection.channelsArr.filter(item => {
        return item.tdName.includes(query) || item.id.includes(query)
      })
      if (arr.length > 20) {
        this.tDList = arr.slice(0, 20)
      } else {
        this.tDList = arr
      }
    },
    /** 生成巡视周期 PatrolLineCreatPlan */
    creatPatrolCycle() {
      if (this.CheckedSelection.length == 0) {
        this.$message('请选择列表数据')
        return
      }
      let idsArr = []
      this.CheckedSelection.forEach(v => {
        idsArr.push(v.objId)
      })

      PatrolChannelsCreatPlan({ ids: idsArr.join(',') }).then(val => {
        val = val.data
        let type = val.code == 0 ? 'success' : 'error'
        this.$message({ type, message: val.msg })
        if (val.code == 0) this.getData()
      })
      //  this.$refs.singleTable.setCurrentRow();
    },

    /**
     * 重置按钮
     */
    reset() {
      this.form = {
        tdId: '',
        opsCompany: '',
        opsGroup: '',
        equipmentHost: '',
        xslx: '',
        pageNum: 1,
        pageSize: 10
      }
    },
    /**
     * 查询按钮
     */
    onSearch() {
      for (let key in this.form) {
        this.searchForm[key] = this.form[key]
      }
      this.getData()
    },

    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val
    },

    /**
     * 编辑按钮
     */
    editFun(val) {
      this.openID = val
      this.isShowDialog = true
      this.isEdit = true
    },
    /** 批量编辑 */
    editBatch() {
      // batchId
      if (this.CheckedSelection.length == 0) {
        this.$message('请选择要编辑的数据')
        return
      }
      let ids = []
      this.CheckedSelection.forEach(res => {
        ids.push(res.objId)
      })
      this.batchId = ids.join(',')
      this.isShowBatchEdit = true
      // this.CheckedSelection
    },
    /**新增按钮 */
    Addfun() {
      this.isShowDialog = true
      this.isEdit = false
    },

    /**
     * 接收子组件的数据
     */
    parentFn(val) {
      this.isShowDialog = val.showDialog
      this.isShowBatchEdit = false
      this.getData()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
