<template>
  <!-- 设备评价信息 -->
  <div  class="single-row-title">
    <div class="search-buttons" style="margin-bottom: 20px;">
      <el-button type="primary" size="small"  :class="isActive1===true?'onSearch':'UserSearchFun'"  @click='BGfun'>评价报告</el-button>
      <el-button type="primary" size="small" :class="isActive2===true?'onSearch':'UserSearchFun' " @click='BJfun'>部件评价情况</el-button>
    </div>
     <BG v-if='isActive1' :detailspg='dialogParameterpgb.Details'></BG>
      <el-col :span="24" v-if='isActive2'>
      <el-card class="box-card" style="width: 100%;margin-bottom: 30px;">
        <el-form class="jczqBOX" ref="form1" :model="form1" style="width:100% ;margin: 0 auto;" label-position="right" :inline="false" label-width="120px">
         <!--数据列表-->
         <el-table :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}"
           :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}" border fit highlight-current-row
           >
           <!--表格列-->
           <el-table-column type="selection" width="40" align="center" />
           <el-table-column type="index" label="序号" width="50" align="center" />
           <el-table-column prop="bj" label="部件名称" min-width="150" />
           <el-table-column prop="dynamicDate" label="评价时间" min-width="150" />
           <el-table-column prop="pjNumber" label="扣分值" min-width="150" />
           <el-table-column prop="dynamicResult" label="评价结果" min-width="150" />
           <el-table-column prop="decideBasis" label="扣分情况描述" min-width="150" />
           <el-table-column prop="statusName" label="状态量描述" min-width="150" />
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
    bjList
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
        isActive1:true,
        isActive2:false,
        tableParam:{
         total: 0,
         pageNum: 1,
         pageSize: 5,
         limit: 5,
         lineId:this.dialogParameterpgb.Details.lineId
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
      BGfun(){
        this.isActive1=true
        this.isActive2=false
      },
      BJfun(){
        this.isActive1=false
        this.isActive2=true
      },
      getList(){
        bjList(qs.stringify(this.tableParam)).then(response => {
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
