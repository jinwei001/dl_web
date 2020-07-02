<template>
  <!-- <h2>
      xl巡视计划管理
  </h2>-->
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="form" inline>
          <el-form-item :label="`${$xl}名称:`">
            <el-select v-model="form.lineId" clearable filterable placeholder="请选择">
              <el-option v-for="item in selection.linesSelectArr" :key="item.id" :label="item.lineName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运维班组:">
            <el-select v-model="form.groupId" clearable placeholder="请选择">
              <el-option v-for="item in selection.jcbzSelectArr" :key="item.objId" :label="item.groupname" :value="item.objId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="float: right;margin-right: 0">

            <el-button size="small" class="onSearch" @click="onSearch">查询</el-button>
            <el-button size="small" class="onSearch" @click="reset" style="margin-right: 0">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content">
      <div class="respont-content">
        <el-form>
          <el-col>
            <el-form-item style="float: left;">
              <el-button size="small" type="danger" plain @click="DelAllFn">
                <i class="el-icon-close"></i> 删除
              </el-button>
              <el-button size="small" class="onSearch" @click="setDefectCount">设置</el-button>
              <el-button size="small" type="success" plain @click="resetCount"> 重置次数</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="tableData" height="550" style="border: 1px solid #c7c7c7;width:100%" :cell-style="{borderColor: '#c7c7c7'}" :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}" border fit highlight-current-row @selection-change="CheckFun" :row-style="tableRowStyle">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{(searchForm.pageNum - 1) * 10 + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="`${$xl}名称`" align="center" prop="line_name" show-overflow-tooltip></el-table-column>
          <el-table-column :label="`${$dydj}`" align="center" prop="voltage_rank"></el-table-column>
          <el-table-column label="运维班组" align="center" prop="groupname" width="120"></el-table-column>
          <el-table-column label="设备主人" align="center" prop="facility_master"></el-table-column>
          <el-table-column label="设备名称" align="center" prop="device_name" width="160"></el-table-column>
          <el-table-column label="缺陷次数" align="center" prop="qx_count"></el-table-column>
          <el-table-column align="center" label="操作" class-name="small-padding fixed-width" width="230">
            <div slot-scope="scope" class="">
              <el-button class="onSearch" size="mini" @click="checkHistory(scope.row.device_name)">查看历史</el-button>
            </div>
          </el-table-column>
        </el-table>
        <pagination v-show="pageDetail.total>0" :total="pageDetail.total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize" @pagination="getData" />
      </div>
    </div>

    <div v-if="isShowDialog">
      <SetCount @childFn="parentFn" :openID="openID" />
    </div>
    <div v-if="isShowHistory">
      <History @childFn="parentFn" :openID="openID" />
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import SetCount from './SetCount'
import History from './History'

import { Message } from 'element-ui'
import {
  linesSelect, // xl下拉
  jcbzSelect // 检测班组
} from '@/api/liveDetectionManage'

import {
  warningList as list,
  warningDel as delData,
  warningReset
} from '@/api/patrolmanagement'
export default {
  components: {
    Pagination,
    SetCount,
    History
  },
  data() {
    return {
      isShowDialog: false, //查看弹框打开
      isEdit: false, //是否是编辑弹框
      isShowHistory: false,
      openID: null, //打开弹框的id值
      thisDetail: {},

      form: {
        lineId: '',
        groupId: '',
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
        linesSelectArr: [], // xl名称
        jcbzSelectArr: [] // 检测班组
      },
      //选中的数据
      CheckedSelection: [],
      tableData: []
    }
  },
  created() {
    this.getData()

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
    /**删除所有 */
    DelAllFn() {
      if (this.CheckedSelection.length == 0) {
        this.$message('请选择要编辑的数据')
        return
      }
      let idsArr = []
      this.CheckedSelection.forEach(v => {
        idsArr.push(v.device_name)
      })

      this.del(idsArr.join(','))
    },

    del(deviceNames) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delData({ deviceNames }).then(val => {
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
    resetCount() {
      if (this.CheckedSelection.length == 0) {
        this.$message('请选择要重置的数据')
        return
      }

      this.$confirm('是否重置?', '提示', {
        confirmButtonText: '重置',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let idsArr = []
          this.CheckedSelection.forEach(v => {
            idsArr.push(v.device_name)
          })
          warningReset({ deviceNames: idsArr.join(',') }).then(val => {
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
    setDefectCount() {
      // if (this.CheckedSelection.length == 0) {
      //   this.$message('请选择要设置的数据')
      //   return
      // }
      // let idsArr = []
      // this.CheckedSelection.forEach(v => {
      //   idsArr.push(v.device_name)
      // })
      // this.openID = idsArr.join(',')
      this.isShowDialog = true
    },
    /** 查看历史 */
    checkHistory(name) {
      this.openID = name
      this.isShowHistory = true
    },
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      if (row.alarm_count < row.qx_count) {
        return {background: '#ffc3cb'}
      }
    },
    reset() {
      this.form = {
        lineId: '',
        groupId: '',
        pageNum: 1,
        pageSize: 10
      }
      this.onSearch()
    },
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
     * 接收查看/编辑子组件的数据
     */
    parentFn(val) {
      this.isShowDialog = false
      this.isShowHistory = false
      this.getData()
    }
  }
}
</script>
