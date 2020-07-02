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
              <el-select clearable v-model="form.lineId" filterable class="form-item-select">
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
        <el-button type="primary" size="small" @click="bitch" class="onSearch">缺陷审核</el-button>
        <!-- <el-button type="primary" size="small" class="">缺陷处置案例</el-button> -->
      </div>
      <!--数据列表-->
      <el-table border stripe :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}" :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}" highlight-current-row @selection-change="CheckFun">
        <!--表格列-->
        <el-table-column type="selection" :selectable='selectInit' width="55" align="center"></el-table-column>
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column prop="qxNumber" label="缺陷编号" min-width="160"></el-table-column>
        <el-table-column prop="discoveryTime" label="发现时间" min-width="160"></el-table-column>
        <el-table-column prop="voltageRank" :label="`${$dydj}`" min-width="120"></el-table-column>
        <el-table-column prop="qxGrade" label="缺陷等级" min-width="120"></el-table-column>

        <el-table-column prop="lineName" :label="`${$xl}`" min-width="150"></el-table-column>
        <el-table-column prop="dlName" :label="`缺陷${$dl}`" min-width="180"></el-table-column>
       
        <el-table-column prop="groupName" label="发现班组" min-width="120"></el-table-column>
        <el-table-column prop="userName" label="发现人" min-width="90"></el-table-column>
        <el-table-column prop="discoveryMethod" label="发现方式" min-width="120"></el-table-column>
        <el-table-column prop="bj" label="缺陷部件" min-width="120"></el-table-column>
        <el-table-column prop="bw" label="缺陷部位" min-width="120"></el-table-column>
        <el-table-column prop="longitude" label="经度" min-width="120"></el-table-column>
        <el-table-column prop="latitude" label="纬度" min-width="120"></el-table-column>
        <el-table-column prop="xqContent" label="缺陷内容" min-width="120"></el-table-column>
         <el-table-column prop="channelName" label="通道" min-width="180"></el-table-column>
        <el-table-column prop="channelJdName" label="通道段/井" min-width="150"></el-table-column>
        <!--操作模板-->
        <el-table-column fixed="right" label="操作" width="280" align="center">
          <template slot-scope="scope">
            <el-button v-if="!!scope.row.planXqUser && scope.row.qxStatus == 1" class="onSearch" type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button v-if="scope.row.qxStatus == 1&&!scope.row.planXqUser" class="onSearch" type="primary" size="mini" @click="addNew(scope.row)">消缺计划</el-button>
            <el-button v-if='!!scope.row.planXqUser && scope.row.qxStatus == 1' type="danger" size="small" @click="del(scope.row.objId)" plain>删除计划</el-button>
            <el-button v-if="scope.row.qxStatus >= 2" class="onSearch" type="primary" size="mini" @click="checkDetail(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination v-show="pageDetail.total>0" :total="pageDetail.total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize" @pagination="getData" />
    </div>
    <div v-if="isShowDialog">
      <Add :selection='selection' @childFn="parentFn" :isEdit='isEdit' :isCheck='isCheck' :thisDetail='thisDetail' />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import Add from './Add'

import {
  planList as list,
  qxAdd, // 新增
  xlList, // xl列表
  getDy, // 电压
  getBz, // 发现班组
  planAdd,
  batchPlan, // 批量下发
  palnDel, // 删除
  dyGetxl, // 电压获取线路
} from '@/api/defect'

export default {
  name: 'register',
  components: {
    Pagination,
    Add
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
  },
  data() {
    return {
      thisDetail: {},
      CheckedSelection: [],
      isCheck: true, // ture 查看 fasle 审批
      isEdit: false,
      loginUserId: false,
      thisTitle: '',
      openID: '',
      tableData: [],
      isShowDialog: false,
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

    del(ids) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          palnDel(ids).then(val => {
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
    // 下发
    bitch() {
      if (this.CheckedSelection.length == 0) {
        this.$message('请选择要编辑的数据')
        return
      }
      this.$confirm('是否缺陷审核?', '提示', {
        confirmButtonText: '审核',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let ids = []
          this.CheckedSelection.forEach(res => {
            ids.push(res.objId)
          })

          batchPlan({ ids: ids.join(',') }).then(val => {
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
    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val
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
    selectInit(row, index) {
      if (!!row.planXqUser) {
        return true
      } else {
        return false
      }
    },
      dyGetxlFun() {
      dyGetxl(this.form.voltageRank).then(res => {
        // xl
        this.form.lineId = '';
        this.selection.linesSelectArr = res.data.data
      })
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
    addNew(thisDetail) {
      this.thisDetail = thisDetail
      this.isShowDialog = true
      this.isCheck = false
      this.isEdit = false
    },
    edit(thisDetail) {
      this.thisDetail = thisDetail
      this.isShowDialog = true
      this.isCheck = false
      this.isEdit = true
    },
    checkDetail(thisDetail) {
      this.thisDetail = thisDetail
      this.isShowDialog = true
      this.isCheck = true
      this.isEdit = true
    },
    parentFn(val) {
      this.isShowDialog = false
      this.isShowNext = false
      this.isShowCheckAndSure = false
      this.getData()
    }
  }
}
</script>

<style scoped>
</style>
