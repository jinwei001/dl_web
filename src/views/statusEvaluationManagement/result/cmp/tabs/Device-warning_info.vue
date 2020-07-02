<template>
  <!-- 设备警告信息 -->
  <div  class="single-row-title">
      <el-col :span="24">
      <el-card class="box-card" style="width: 100%;margin-bottom: 30px;">
        <el-form class="jczqBOX" ref="form1" :model="form1" style="width:100% ;margin: 0 auto;" label-position="right" :inline="false" label-width="120px">
         <!--数据列表-->
         <el-table :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}"
           :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}" border fit highlight-current-row
           >
           <!--表格列-->
           <el-table-column type="index" label="序号" width="50" align="center" />
           <el-table-column prop="voltageRank" :label="$dydj" min-width="150" />
           <el-table-column prop="bj" label="部件" min-width="150" />
           <el-table-column prop="dynamicDate" label="预警时间" min-width="150" />
           <el-table-column prop="dynamicResult" label="预警原因" min-width="150">
              <template slot-scope="scope">
                <span v-if="scope.row.dynamicResult===3">评价结果由正常状态转为异常状态</span>
                <span  v-if="scope.row.dynamicResult===4">评价结果由正常状态转为严重状态</span>
              </template>
           </el-table-column>
         </el-table>
         <pagination :total="tableParam.total" :page.sync="tableParam.pageNum" :limit.sync="tableParam.limit" @pagination="getList" />
         </el-form>
      </el-card>
        </el-col>
      <div slot="footer" class="dialog-footer">
      <!--  <el-button class="onSearch" @click="addFun"  v-if="dialogParameterpg.title==='新增'">提交</el-button>
        <el-button class="onSearch" @click="editFun" v-if="dialogParameterpg.title==='编辑'">提交</el-button>
        <el-button class="onSearch" @click="handleClose">取消</el-button> -->
      </div>
  </div>
</template>

<script>
  import {
    alarmList
  } from '@/api/statusE/result'
  import Pagination from '@/components/Pagination'
  import qs from 'qs'
  export default {
    components: {
      Pagination
    },
    props: {
      /**
       * 接收是否打开页面
       */
      dialogParameterpgb: {
        type: Object,
        default: function() {
        return {

        }
      }},
    },
    data() {
      return {
        tableParam:{
         total: 0,
         pageNum: 1,
         pageSize: 5,
         limit: 5,
         lineId:this.dialogParameterpgb.Details.lineId
        },
        tableData:[],
        form1:{


        },
        selection:{sbzrarry:[]}
      }
    },
    watch: {

    },
    created: function() {
    },
    mounted() {

        this.getList()
    },
    methods: {
      getList(){
        alarmList(qs.stringify(this.tableParam)).then(response => {
          if (response.status === 200) {
            if (response.data.code === 0) {
              this.tableData = response.data.rows
              this.tableParam.total = response.data.total
            } else {
              this.tableData = []
              this.tableParam.total = 0
              this.$message({
                message: '线路列表获取失败',
                type: 'error'
              })
            }
          }
        })
      },
      //重置
      ClickResetFun() {
        this.$refs['form1'].resetFields()
        this.$message({
          message: '重置成功',
          type: 'success'
        })
        this.getList()
      }
    }
  }
</script>
<style lang="scss">

</style>
