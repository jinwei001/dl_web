<template>
  <div class="xs-hastitle">
    <el-dialog :visible.sync="showDialog" :title="title" v-dialogDrag :center="true" width="80%" :before-close="handleClose">
      <el-table :data="tableData" height="550" style="border: 1px solid #c7c7c7;width:100%" :cell-style="{borderColor: '#c7c7c7'}" :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}" border fit highlight-current-row>
        <!-- <el-table-column fixed type="selection" width="55" align="center"></el-table-column> -->
        <el-table-column fixed type="index" label="序号" width="60" align="center">
          <template slot-scope="scope">
            <span>{{(searchForm.pageNum - 1) * 10 + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="发现时间" align="center" prop="discoveryTime" width="150"></el-table-column>
        <el-table-column :label="`${$dydj}`" align="center" prop="voltageRank"></el-table-column>
        <el-table-column :label="`${$xl}名称`" align="center" prop="lineName" show-overflow-tooltip width="250"></el-table-column>
        <el-table-column label="通道" align="center" prop="channelName"></el-table-column>
        <el-table-column label="通道段/井" align="center" prop="channelJdName" width="150"></el-table-column>
        <el-table-column label="缺陷编号" align="center" prop="qxNumber" width="200"></el-table-column>
        <el-table-column label="发现班组" align="center" prop="groupName"></el-table-column>
        <el-table-column label="发现人" align="center" prop="userName"></el-table-column>
        <el-table-column label="发现方式" align="center" prop="discoveryMethod"></el-table-column>
        <el-table-column label="缺陷部件" align="center" prop="bj"></el-table-column>
        <el-table-column label="缺陷部位" align="center" prop="bw"></el-table-column>
        <!-- <el-table-column label="是否停电" align="center" prop="device_name" width="160"></el-table-column> -->

        <el-table-column label="是否集中处理" align="center" width="150">
          <template slot-scope="scope">
            <div>
              {{scope.row.ifFocusHandle=='1'?'是':'否'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="经度" align="center" prop="longitude" width="130"></el-table-column>
        <el-table-column label="纬度" align="center" prop="latitude" width="130"></el-table-column>
        <el-table-column label="当前节点" align="center" prop="currentNodeName"></el-table-column>
        <el-table-column label="处理状态" align="center" prop="qxStatus">
          <template slot-scope="scope">
            <div>
              {{scope.row.qxStatus | statusName}}
            </div>
          </template>

        </el-table-column>
        <el-table-column label="当前处理人" align="center" prop="currentHandlerName"></el-table-column>

        <el-table-column label="缺陷内容" align="center" prop="xqContent"></el-table-column>
        <el-table-column fixed="right" align="center" label="操作" class-name="small-padding fixed-width">
          <div slot-scope="scope" class="">
            <el-button class="onSearch" size="mini" @click="CheckBtn(scope.row)">查看</el-button>
          </div>
        </el-table-column>
      </el-table>
      <Pagination v-show="pageDetail.total>0" :total="pageDetail.total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize" @pagination="getData" />

    </el-dialog>
    <div v-if="isShowCheckAndSure">
      <CheckAndSure :isCheck='isCheck' @childFn="parentFn" :thisDetail='thisDetail' :title="thisTitle" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import CheckAndSure from '@/views/defect/register/CheckAndSure'

import { warningHistoryList as list } from '@/api/patrolmanagement'
export default {
  props: {
    title: '查看历史',
    openID: ''
  },
  components: {
    Pagination,
    CheckAndSure
  },
  data() {
    return {
      tableData: [],
      thisTitle: '',
      thisDetail: {},
      isCheck: true,
      isShowCheckAndSure: false,
      showDialog: true,
      pageDetail: {
        total: 0
      },
      searchForm: {
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      // 获取列表数据
      let res = await list({ deviceName: this.openID, qxStatus: 1 })
      this.tableData = res.data.rows
      this.pageDetail.total = res.data.total
    },
    CheckBtn(val) {
      // 查看
      this.isShowCheckAndSure = true
      this.thisTitle = '查看'
      this.thisDetail = val
      this.isCheck = true
    },
    parentFn(val) {
      this.isShowCheckAndSure = false
    },
    /**
     * 取消按钮
     */
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('childFn', {
            showDialog: this.showDialog
          })
          done()
        })
        .catch(_ => {})
    }
  },
  filters: {
    statusName(e) {
      switch (e) {
        case 0:
          return '确认 '
          break
        case 1:
          return '计划  '
          break
        case 2:
          return '处理'
          break
        case 3:
          return '验收'
          break
        case 4:
          return '消缺'
          break
      }
    }
  }
}
</script>
