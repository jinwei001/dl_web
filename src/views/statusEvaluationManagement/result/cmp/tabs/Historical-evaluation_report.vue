<template>
  <!-- 历史评价报告 -->
  <div  class="single-row-title">

      <el-col :span="24">
      <el-card class="box-card" style="width: 100%;margin-bottom: 30px;">
        <el-form class="jczqBOX" ref="form1" :model="form1" style="width:100% ;margin: 0 auto;" label-position="right" :inline="false" label-width="120px">
         <el-col :span="12">
         <el-form-item label="评价时间" prop="dateval" class="bottomstyle">
           <el-date-picker v-model="form1.dateval" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="daterange"
             range-separator=" 至 " start-placeholder="开始日期" end-placeholder="结束日期" />
         </el-form-item>
         </el-col>
         <el-col :span="12">
         <el-form-item label="评价结果" prop="regularResult" class="bottomstyle">
           <el-select v-model="form1.regularResult" clearable placeholder="请选择" filterable>
            <el-option v-for="(item,index) in Jgarry" :key="item.id" :label="item.value" :value="item.id"
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
           <el-table-column type="index" label="序号" width="50" align="center" />
           <el-table-column prop="regularResult" label="评价结果" min-width="200" >
             <template slot-scope="scope">
               <p v-for="(item,index) in Jgarry" :key='index'>
                 <span v-if="scope.row.regularResult===item.id">{{item.value}}</span>
               </p>
             </template>
           </el-table-column>
           <el-table-column prop="regularResult" label="评价类型" min-width="180" >
               <template slot-scope="scope">
                   定期评价
               </template>
           </el-table-column>
           <el-table-column prop="regularDate" label="评价日期" min-width="150" />
           <el-table-column prop="cljy" label="处理建议" min-width="150" />

           <el-table-column prop="jsons" label="状态量扣分描述" min-width="180" />
         <!--操作模板-->
         <el-table-column
           fixed="right"
           label="操作"
           min-width="100"
           align="center"
           class-name="small-padding fixed-width"
         >
           <template slot-scope="scope">
             <el-button class="onSearch" type="primary" size="mini" @click="Viewreport(scope.row)">查看报告</el-button>
           </template>
         </el-table-column>
         </el-table>
         <pagination :total="tableParam.total" :page.sync="tableParam.pageNum" :limit.sync="tableParam.limit" @pagination="getList" />
         <el-dialog
           :title="LSdialogParameterpg.title"
           :visible.sync="LSdialogParameterpg.showDialog"
           :width="LSdialogParameterpg.dialogWidth"

           append-to-body
           >
           <BG :detailspg='LSdialogParameterpg.Details' v-if='LSdialogParameterpg.showDialog'></BG>
         </el-dialog>
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
    historyList
  } from '@/api/statusE/result'
  import Pagination from '@/components/Pagination'
  import BG from './BG.vue'
  import qs from 'qs'
  export default {
    components: {
      Pagination,
      BG
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
         lineId:this.dialogParameterpgb.Details.lineId,
         regularDateStart:'',
         regularDateEnd:'',
         regularResult:'',
        },
        tableData:[],
        form1:{
           dateval:[],
           regularResult:''
        },
        Jgarry:[
          {
            id:1,
            value:'正常状态'
          },{
            id:2,
            value:'注意状态'
          },{
            id:3,
            value:'异常状态'
          },{
            id:4,
            value:'严重状态'
          }
        ],
        // 弹窗参数配置
        LSdialogParameterpg: {
          title: "未知",
          showDialog: false, // 打开弹框
          Details: {}
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
        this.tableParam.regularDateStart=this.form1.dateval!==''?this.form1.dateval[0]:''
        this.tableParam.regularDateEnd=this.form1.dateval!==''?this.form1.dateval[1]:''
        this.tableParam.regularResult=this.form1.regularResult
        historyList(qs.stringify(this.tableParam)).then(response => {
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
      Viewreport(val){
        this.LSdialogParameterpg = {
          dialogWidth: "80%",
          title: "报告详情",
          showDialog: true, // 打开弹框
          Details: val
         };
        this.LSdialogParameterpg.Details.starts=3
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
