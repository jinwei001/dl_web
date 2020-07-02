<template>
  <!-- 状态量历史列表 -->
  <div  class="single-row-title">

      <el-col :span="24">
      <el-card class="box-card" style="width: 100%;margin-bottom: 30px;">
        <el-form class="jczqBOX" ref="form1" :model="form1" style="width:100% ;margin: 0 auto;" label-position="right" :inline="false" label-width="120px">

         <el-col :span="6" >
         <el-form-item label="部件名称" prop="getPjBjval" class="bottomstyle">
           <el-select v-model="form1.getPjBjval" clearable placeholder="请选择" filterable>
            <el-option v-for="(item,index) in getPjBjArry" :key="index" :label="item" :value="item"
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
           <el-table-column prop="bj" label="部件名称" min-width="200" />
           <el-table-column prop="statusName" label="状态量名称" min-width="180" />
           <el-table-column prop="degradateDegree" label="劣化程度" min-width="150" />
           <el-table-column prop="pjNumber" label="扣分值" min-width="150" />
           <el-table-column prop="dynamicDate" label="评价时间" min-width="150" />


           <el-table-column prop="decideBasis" label="扣分理由" min-width="150" />

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
    bjList,
    getPjBj
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
        getPjBjArry:[],//部件下拉
        tableParam:{//列表渲染集合
         total: 0,
         pageNum: 1,
         pageSize: 5,
         limit: 5,
         bj:'',
         lineId:this.dialogParameterpgb.Details.lineId,
        },
        tableData:[],//列表数据
        form1:{//查询集合
           getPjBjval:'',
        }
      }
    },
    watch: {

    },
    created: function() {
    },
    mounted() {
        this.bjchaxunList()
        this.getList()
    },
    methods: {
      getList(){
       this.tableParam.bj=this.form1.getPjBjval
        bjList(qs.stringify(this.tableParam)).then(response => {
          if (response.status === 200) {
            if (response.data.code === 0) {
              this.tableData = response.data.rows
              this.tableParam.total = response.data.total
            } else {
              this.tableData = []
              this.tableParam.total = 0
              this.$message({
                message: '状态历史信息列表获取失败',
                type: 'error'
              })
            }
          }
        })
      },
      bjchaxunList(){
        getPjBj(qs.stringify(this.tableParam)).then(response => {
          if (response.status === 200) {
            if (response.data.code === 0) {
                 this.getPjBjArry=response.data.data
            } else {
             this.getPjBjArry=[]
              this.$message({
                message: '部件下拉列表获取失败',
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
