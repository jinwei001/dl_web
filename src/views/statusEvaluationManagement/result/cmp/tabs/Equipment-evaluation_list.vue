<template>
  <!-- 设备评价列表 -->
  <div  class="single-row-title">

      <el-col :span="24">
      <el-card class="box-card" style="width: 100%;margin-bottom: 30px;">
        <el-form class="jczqBOX" ref="form1" :model="form1" style="width:100% ;margin: 0 auto;" label-position="right" :inline="false" label-width="120px">
         <el-col :span="12">
         <el-form-item label="最新评价时间" prop="Bzval" class="bottomstyle">
           <el-date-picker v-model="form1.sbzrval" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="daterange"
             range-separator=" 至 " start-placeholder="开始日期" end-placeholder="结束日期" />
         </el-form-item>
         </el-col>
         <el-col :span="12">
         <el-form-item label="最新评价结果" prop="sbzrval" class="bottomstyle">
           <el-select v-model="form1.sbzrval" clearable placeholder="请选择" filterable>
            <el-option v-for="(item,index) in selection.sbzrarry" :key="item.obj_id" :label="item.name" :value="item.obj_id"
              />
           </el-select>
         </el-form-item>
         </el-col>
         <el-col :span="24" style="text-align: right;margin-bottom: 20px;margin-top: 20px;">
         <el-button type="primary" size="small" plain @click='getList'>查询</el-button>
         <el-button type="primary" size="small" plain @click='ClickResetFun'>重置</el-button>
         </el-col>
         <!--数据列表-->
         <el-table :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}"
           :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}" border fit highlight-current-row
           >
           <!--表格列-->
           <el-table-column type="selection" width="40" align="center" />
           <el-table-column type="index" label="序号" width="50" align="center" />
           <el-table-column prop="lineName" label="运行单位" min-width="200" />
           <el-table-column prop="voltageRank" label="维护班组" min-width="180" />
           <el-table-column prop="groupName" label="设备名称" min-width="150" />
           <el-table-column prop="facilityMaster" label="设备类型" min-width="150" />
           <el-table-column prop="runStatus" :label="$dydj" min-width="150" />
           <el-table-column prop="lineRank" label="运行状态" min-width="150" />

           <el-table-column prop="voltageRank" label="定期评价时间" min-width="180" />
           <el-table-column prop="groupName" label="定期评价结果" min-width="150" />
           <el-table-column prop="facilityMaster" label="最新评价时间" min-width="150" />
           <el-table-column prop="runStatus" label="最新评价结果" min-width="150" />
           <el-table-column prop="lineRank" label="得分项" min-width="150" />
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
  // import {
  //   line_list,
  //   group_list,
  //   sbzrList,
  //   add,
  //   edit
  // } from '@/api/statusE/cycle'
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
      dialogParameterpg: {
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
         limit: 5
        },
        tableData:[],
        form1:{
           ljDydj:'',
           Bzval:'',
           djval:'',
           sbzrval:'',
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
        // this.tableParam.voltageRank=this.form1.ljDydj
        // this.tableParam.groupId=this.form1.Bzval
        // this.tableParam.lineRank=this.form1.djval
        // this.tableParam.facilityMasterId=this.form1.sbzrval
        // line_list(qs.stringify(this.tableParam)).then(response => {
        //   if (response.status === 200) {
        //     if (response.data.code === 0) {
        //       this.tableData = response.data.rows
        //       this.tableParam.total = response.data.total
        //     } else {
        //       this.tableData = []
        //       this.tableParam.total = 0
        //       this.$message({
        //         message: '线路列表获取失败',
        //         type: 'error'
        //       })
        //     }
        //   }
        // })
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
