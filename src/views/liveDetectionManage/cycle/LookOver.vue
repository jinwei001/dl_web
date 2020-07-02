<template>
  <!-- <h2>xl巡视计划管理</h2> -->
  <div class="xs-hastitle">
    <el-dialog :visible.sync="showDialog" title="查看调整进度" v-dialogDrag :center="true" :before-close="handleClose">

      <el-form ref="dataForm" label-position="left" style="width:100% ;margin: 0 auto;">

        <div class="table">
          <div class="table">
            <el-table height="200" :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}" :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}" border fit highlight-current-row>
              <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
              <el-table-column prop="tzsj" label="调整时间"></el-table-column>
              <el-table-column prop="tzyy" label="调整原因"></el-table-column>
              <el-table-column prop="xgr" label="修改人"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="onSearch" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import '@/styles/myStyle/index.scss'
import AddLine from './AddLine'
import { cheackCycleAdjustment as check } from '@/api/liveDetectionManage'
export default {
  props: {
    selection: {},
    openID: ''
  },
  data() {
    return {
      tableData: [],
      showDialog: true
    }
  },
  created() {
    this.getLine()
  },
  methods: {
    async getLine() {
      // 获取列表数据
      let res = await check({ jczqid: this.openID })

      this.tableData = res.data.rows
      this.pageDetail.total = res.data.total
    },

    /**
     * 取消按钮
     */
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('childFn', {
            showDialog: this.showDialog,
            editbtn: this.editbtn,
            addbtn: this.addbtn
          })
          done()
        })
        .catch(_ => {})
    },

    /**
     * 选择通道按钮--取消按钮
     */
    selecthandleClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.selectshowDialog = false
        })
        .catch(_ => {})
    }
  }
}
</script>

