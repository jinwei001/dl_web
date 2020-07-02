<template>
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">

        <div class="search-container">
          <!--查询表单-->
          <el-form class="search-form" ref="form" inline>
            <el-form-item :label="`${$dydj}`" label-width="90">
              <el-select clearable v-model="form.voltageRank">
                <el-option :value="`35${$qf}`">35{{$qf}}</el-option>
                <el-option :value="`110${$qf}`">110{{$qf}}</el-option>
                <el-option :value="`220${$qf}`">220{{$qf}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="`所属${$xl}`" label-width="100">
              <el-select clearable v-model="form.lineId" filterable  class="form-item-select">
                <el-option v-for="item in selection.linesSelectArr" :key="item.line_id" :label="item.line_name" :value="item.line_id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="缺陷日期" label-width="90">
              <el-date-picker v-model="form.date" type="daterange" class="date-range" format="yyyy-MM-dd" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="缺陷等级" label-width="90">
              <el-select clearable v-model="form.qxGrade">
                <el-option value="一般">一般</el-option>
                <el-option value="危急">危急</el-option>
                <el-option value="严重">严重</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发现班组" label-width="90">
              <el-select clearable v-model="form.groupId" class="form-item-select">
                <el-option v-for="item in selection.bzSelectArr" :key="item.group_id" :label="item.group_name" :value="item.group_id"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <!--查询按钮-->
          <div class="search-buttons">
            <el-button type="primary" size="small" @click="onSearch" class="onSearch">查询</el-button>
            <el-button type="primary" size="small" @click="reset" class="UserSearchFun">重置</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <!--数据操作-->
      <div class="record-operation">
        <el-button type="primary" size="small" @click="addNew" class="onSearch">新增</el-button>
        <el-button type="primary" size="small" @click="batchSp" class="onSearch">批量审批</el-button>
        <el-button type="danger" size="small" plain @click="DelAllFn">
          <i class="el-icon-close"> 批量删除</i>
        </el-button>
      </div>
      <!--数据列表-->
      <el-table border stripe :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}" :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}" highlight-current-row @selection-change="CheckFun">
        <!--表格列-->
        <el-table-column fixed type="selection" width="55" align="center" :selectable='selectable'></el-table-column>
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column prop="qxNumber" label="缺陷编号" min-width="160"></el-table-column>
        <el-table-column prop="discoveryTime" label="发现时间" min-width="160"></el-table-column>
        <el-table-column prop="bj" label="缺陷部件" min-width="120"></el-table-column>
        <el-table-column prop="bw" label="缺陷部位" min-width="120"></el-table-column>
        <el-table-column prop="voltageRank" :label="`${$dydj}`" min-width="120"></el-table-column>
        <el-table-column prop="qxGrade" label="缺陷等级" min-width="120"></el-table-column>
        <el-table-column prop="lineName" :label="`${$xl}`" min-width="150"></el-table-column>
        <el-table-column prop="dlName" :label="`缺陷${$dl}`" min-width="180"></el-table-column>

        <el-table-column prop="groupName" label="发现班组" min-width="120"></el-table-column>
        <el-table-column prop="userName" label="发现人" min-width="90"></el-table-column>
        <el-table-column prop="discoveryMethod" label="发现方式" min-width="120"></el-table-column>

        <el-table-column prop="longitude" label="经度" min-width="120"></el-table-column>
        <el-table-column prop="latitude" label="纬度" min-width="120"></el-table-column>
        <el-table-column prop="currentNodeName" label="当前节点" min-width="120"></el-table-column>
        <!-- <el-table-column prop="processingStatus" label="处理状态" min-width="120"></el-table-column> -->
        <el-table-column prop="currentHandlerName" label="当前处理人" min-width="150"></el-table-column>
        <el-table-column prop="xqContent" label="缺陷内容" min-width="120"></el-table-column>
        <el-table-column prop="channelName" label="通道" width="180"></el-table-column>
        <el-table-column prop="channelJdName" label="通道段/井" min-width="150"></el-table-column>
        <!--操作模板-->
        <el-table-column fixed="right" label="操作" width="280" align="center">
          <template slot-scope="scope">
            <!-- qxStatus 1 审批结束 0 审批中 -->
            <el-button v-if='scope.row.currentHandlerId == loginUserId&&scope.row.currentNode==1&&scope.row.qxStatus == 0' class="onSearch" type="primary" size="mini" @click="progress(scope.row)">开启流程</el-button>
            <el-button v-if='scope.row.currentHandlerId == loginUserId&&scope.row.currentNode!=1&&scope.row.qxStatus == 0' class="onSearch" type="primary" size="mini" @click="SureBtn(scope.row)">审批</el-button>
            <el-button v-if='scope.row.currentHandlerId != loginUserId||scope.row.qxStatus != 0' class="onSearch" type="primary" size="mini" @click="CheckBtn(scope.row)">查看</el-button>
            <el-button v-if='scope.row.currentHandlerId == loginUserId&&scope.row.currentNode==1&&scope.row.qxStatus == 0' type="default" size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button v-if='scope.row.currentHandlerId == loginUserId&&scope.row.currentNode==1&&scope.row.qxStatus == 0' type="danger" size="small" @click="del(scope.row.objId)" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination v-show="pageDetail.total>0" :total="pageDetail.total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize" @pagination="getData" />
    </div>
    <div v-if="isShowDialog">
      <Add :selection='selection' @childFn="parentFn" :isEdit="isEdit" :thisDetail='thisDetail' />
    </div>
    <div v-if="isShowNext">
      <Next :selection='selection' @childFn="parentFn" :isEdit="isEdit" :thisDetail='thisDetail' />
    </div>
    <div v-if="isShowCheckAndSure">
      <CheckAndSure :selection='selection' :isCheck='isCheck' @childFn="parentFn" :thisDetail='thisDetail' :title="thisTitle" />
    </div>
    <div v-if="qxIdArr.length>0">
      <BatchSp :selection='selection' :qxIdArr='qxIdArr' @childFn="parentFn" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import Add from './Add'
import Next from './Next'
import CheckAndSure from './CheckAndSure'
import BatchSp from './BatchSp'
// import Progress from './Progress'
import {
  registerList as list,
  registerDel as delData,
  qxAdd, // 新增
  xlList, // xl列表
  getDy, // 电压
  getDl, // $dl
  getXw, //相位
  getSblx, //设备类型
  getSbMc, // 设备名称
  getBj, // 缺陷部件
  getTd, // 通道
  getBw, // 部位
  getMs, // 描述
  getWorkOrWell, // 通道段/井
  getyjAdj, // 依据和等级
  getFxfs, // 发现方式
  getBz, // 发现班组
  getFxr, // 发现人
  dyGetxl, // 电压获取线路
  registerBatch // 批量审批
} from '@/api/defect'

export default {
  name: 'register',
  components: {
    Pagination,
    Add,
    Next,
    CheckAndSure,
    BatchSp
    // Progress
  },

  created() {
    this.loginUserId = this.getCookie('userId')
    xlList().then(res => {
      // xl
      this.selection.linesSelectArr = res.data.data
    })
    getBz().then(res => {
      // 发现方式getBz
      this.selection.bzSelectArr = res.data.data
    })
    this.getData()
    // dySelect().then(res => {
    //   // 电压
    //   this.selection.dySelectArr = res.data.data
    // })
  },
  data() {
    return {
      thisDetail: {},
      isCheck: true, // ture 查看 fasle 审批
      isEdit: false,
      qxIdArr: [],
      thisTitle: '',
      loginUserId: '',
      openID: '',
      tableData: [],
      isShowDialog: false,
      isShowNext: false,
      isShowCheckAndSure: false,
      CheckedSelection: [],
      form: {
        lineId: '',
        voltageRank: '',
        qxGrade: '',
        groupId: '',
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
        linesSelectArr: [],
        bzSelectArr: []
      }
    }
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
    /** 开启批量审批 */
    batchSp() {
      if (this.CheckedSelection.length == 0) {
        this.$message('请选择要审批的数据')
        return
      }
      this.qxIdArr = this.CheckedSelection.map(res => {
        return res.objId
      })
    },
    /** 判断能否多选 */
    selectable(row) {
      // return row.currentHandlerId == this.loginUserId&&row.currentNode==1&&row.qxStatus == 0 // 返回false不可选
      return true
    },
    onSearch() {
      for (let key in this.form) {
        this.searchForm[key] = this.form[key]
      }
      this.searchForm.startTime = this.form.date[0]
      this.searchForm.endTime = this.form.date[1]
      delete this.searchForm.date
      this.getData()
    },
    reset() {
      this.form = {
        lineId: '',
        voltageRank: '',
        qxGrade: '',
        groupId: '',
        date: [],
        pageNum: 1,
        pageSize: 10
      }
      this.onSearch()
    },
    addNew() {
      this.isShowDialog = true
      this.isEdit = false
    },
    edit(thisDetail) {
      this.thisDetail = thisDetail
      this.isShowDialog = true
      this.isEdit = true
    },
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      if (row.planStatus == 2) {
        return 'background-color: #edf0c5'
      } else if (row.planStatus == 3) {
        return 'background-color: #ffc3cb'
      }
    },
    dyGetxlFun() {
      dyGetxl(this.form.voltageRank).then(res => {
        // xl
        this.form.lineId = ''
        this.selection.linesSelectArr = res.data.data
      })
    },
    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val
    },
    parentFn(val) {
      this.isShowDialog = false
      this.isShowNext = false
      this.isShowCheckAndSure = false
      this.qxIdArr = []
      this.getData()
    },
    progress(detail) {
      this.thisDetail = detail
      this.isShowNext = true
    },
    CheckBtn(val) {
      // 查看
      this.isShowCheckAndSure = true
      this.thisTitle = '查看'
      this.thisDetail = val
      this.isCheck = true
    },
    SureBtn(val) {
      // 审批
      this.isShowCheckAndSure = true
      this.thisTitle = '审批'
      this.thisDetail = val
      this.isCheck = false
    },
    getCookie(name) {
      var prefix = name + '='
      var start = document.cookie.indexOf(prefix)
      if (start == -1) {
        return null
      }

      var end = document.cookie.indexOf(';', start + prefix.length)
      if (end == -1) {
        end = document.cookie.length
      }

      var value = document.cookie.substring(start + prefix.length, end)
      return unescape(value)
    }
  }
}
</script>

<style scoped>
</style>
