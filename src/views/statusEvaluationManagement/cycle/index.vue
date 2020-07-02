<template>
  <div class="main-body">
    <!-- <div>状态评价周期首页</div> -->
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <div class="search-container">
          <!--查询表单-->
          <el-form ref="Inquire" class="search-form" inline :model="Inquire">
            <!--    //XL -->
            <el-form-item :label="$xl+'名称'" prop="lineobj">
              <el-select v-model="Inquire.lineobj" clearable placeholder="请选择" @change="line_changeFun" value-key="id">
                <el-option v-for="(item,index) in selection.linearry" :key="item.id" :label="item.lineName" :value="item"
                  />
              </el-select>
            </el-form-item>
            <el-form-item :label="$dydj" prop="voltageRank">
              <el-input v-model="Inquire.voltageRank" disabled />
            </el-form-item>
            <el-form-item label="运维班组" prop="groupId">
              <el-select v-model="Inquire.groupId" clearable placeholder="请选择">
               <el-option v-for="(item,index) in selection.BZarry" :key="item.objId" :label="item.groupname" :value="item.objId"
                  />
              </el-select>
            </el-form-item>
            <el-form-item label="设备主人" prop="facilityMaster">
              <el-select v-model="Inquire.facilityMaster" clearable placeholder="请选择"  filterable>
              <el-option v-for="(item,index) in selection.sbzrarry" :key="item.obj_id" :label="item.name" :value="item.name"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$xl+'等级'" prop="lineGrade">
              <el-select v-model="Inquire.lineGrade" clearable placeholder="请选择">
               <el-option v-for="(item,index) in selection.xldjarry" :key="index" :label="item.value" :value="item.id"
                  />
              </el-select>
            </el-form-item>
          </el-form>
          <!--查询按钮-->-
          <div class="search-buttons">
            <el-button type="primary" size="small" class="onSearch" @click="getList">查询</el-button>
            <el-button type="primary" size="small" class="UserSearchFun" @click="ClickResetFun">重置</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <!--数据操作-->
      <div class="record-operation">
        <el-button type="primary" size="small" plain @click="addFun" class="onSearch">新增</el-button>
        <el-button v-if="CheckedidArry.length>0" type="danger" size="small" plain @click="deleteFun">删除</el-button>
        <el-button v-if="CheckedidArry.length>0" type="danger" size="small" plain @click="Generate_periodic_reviewsFun" class="onSearch">生成定期评价</el-button>
      </div>
      <!--数据列表-->
      <el-table :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}"
        :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}" border fit highlight-current-row
        @selection-change="CheckFun">
        <!--表格列-->
        <el-table-column type="selection" width="40" align="center" />
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="lineName" :label="$xl+'名称'" min-width="200" />
        <el-table-column prop="voltageRank" :label="$dydj" min-width="180" />
        <el-table-column prop="groupName" label="运维班组" min-width="150" />
        <el-table-column prop="facilityMaster" label="设备主人" min-width="150" />
        <!-- <el-table-column prop="lineGrade" label="线路等级" min-width="150" />
        <el-table-column prop="cycle" label="周期" min-width="150" /> -->

        <el-table-column prop="lineGrade" label="线路等级" min-width="150" >
          <template slot-scope="scope">
            <span>{{scope.row.lineGrade==1?"一级高压"+$dl:scope.row.lineGrade==2?"二级高压"+$dl:scope.row.lineGrade==3?"三级高压"+$dl:""}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cycle" label="周期" min-width="150" >
          <template slot-scope="scope">
            <span>{{scope.row.cycle}}&nbsp;{{scope.row.cycleUnit}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="transportTime" label="投运日期" min-width="150">
          <!--       <template slot-scope="scope">
            {{scope.row.transportTime.trim().split(" ")[0]}}
          </template> -->
        </el-table-column>
        <el-table-column prop="lastPjDate" label="上次定期评价" min-width="150" />
        <el-table-column prop="requires" label="要求" min-width="150" />
        <el-table-column prop="earlyWarnDays" label="提前预警天数" min-width="150" />
        <!--操作模板-->
        <el-table-column fixed="right" label="操作" min-width="220" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button class="onSearch" type="primary" size="mini" @click="editFun(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="tableParam.total" :page.sync="tableParam.pageNum" :limit.sync="tableParam.limit" @pagination="getList" />
    </div>
    <AddorEditPopups :dialogParameterpg='dialogParameter' @childFn='parentFn' v-if='dialogParameter.showDialog===true'></AddorEditPopups>
  </div>
</template>

<script>
  import {
    list, // 删除任务
    line_list,
    group_list,
    sbzrList,
    remove,
    regular,
  } from '@/api/statusE/cycle'

  import qs from 'qs'
  import Pagination from '@/components/Pagination'
  import AddorEditPopups from './cmp/AddorEdit-Pop-ups_cmp.vue'//新增编辑合用组件
  export default {
    name: 'CableMaintenance',
    components: {
      Pagination,
      AddorEditPopups
    },
    data() {
      return {
        CheckedidArry:[],
        tableData: [], // 值守任务列列表数据
        tableData1: [], // 电井列表数据
        DLlist: [],
        tableParam: { // 值守列表分页和查询参数集合
          total: 0,
          pageNum: 1,
          pageSize: 10,
          limit: 10,
          lineId: '',
          voltageRank:'',
          groupId: '',
          lineGrade: '',
          facilityMaster: '',
        },
        Inquire: { //列表查询绑定集合
          lineobj: '',
          voltageRank:'',
          groupId: '',
          lineGrade: '',
          facilityMaster: '',
        },
        // 弹窗参数配置
        dialogParameter: {
          dialogWidth: '60%',
          title: '未知',
          showDialog: false, // 打开弹框
          Details:{}
        },
        selection: {//下拉数据集合
             linearry:[],//线路
             BZarry:[],//班组
             sbzrarry:[],//设备主人
             xldjarry:[
               {
                 id:'1',
                 value:'一级高压'+this.$dl
               },{
                 id:'2',
                 value:'二级高压'+this.$dl
               },{
                 id:'3',
                 value:'三级高压'+this.$dl
               }
             ],
        }
      }
    },
    mounted() {
      this.getList()
      this.lineList()
      this.BZList()
      this.sbzrListFun()
    },
    methods:{
      //线路改变获取电压等级
        line_changeFun(val) {
          this.Inquire.voltageRank=''
          if(val.voltageRank){
              this.Inquire.voltageRank=val.voltageRank
          }

        },
        //列表
        getList() {
            this.tableParam.lineId=this.Inquire.lineobj.id!=='undefined'  ? this.Inquire.lineobj.id :''
            this.tableParam.voltageRank=this.Inquire.voltageRank
            this.tableParam.groupId=this.Inquire.groupId
            this.tableParam.lineGrade=this.Inquire.lineGrade
            this.tableParam.facilityMaster=this.Inquire.facilityMaster
            list(qs.stringify(this.tableParam)).then(response => {
              if (response.status === 200) {
                if (response.data.code === 0) {
                  this.tableData = response.data.rows
                  this.tableParam.total = response.data.total
                } else {
                  this.tableData = []
                  this.tableParam.total = 0
                  this.$message({
                    message: '周期列表获取失败',
                    type: 'error'
                  })
                }
              }
            })
        },
        //线路
        lineList(){
          let data={
            lineNature: '主线'
          }

          line_list(qs.stringify(data)).then(response => {
            if (response.status === 200) {
              if (response.data.code === 0) {
                this.selection.linearry=response.data.rows
              } else {
                this.selection.linearry=[]
                this.$message({
                  message: '线路列表获取失败',
                  type: 'error'
                })
              }
            }
          })
        },
        //班组
        BZList(){
          group_list().then(response => {
            if (response.status === 200) {
              if (response.data.code === 0) {
                   this.selection.BZarry=response.data.rows
              } else {
                 this.selection.BZarry=[]
                this.$message({
                  message: '班组列表获取失败',
                  type: 'error'
                })
              }
            }
          })
        },
        //设备主人
        sbzrListFun(){
          sbzrList().then(response => {
            if (response.status === 200) {
              if (response.data.code === 0) {
                   this.selection.sbzrarry=response.data.data
              } else {
                 this.selection.sbzrarry=[]
                this.$message({
                  message: '设备主人列表获取失败',
                  type: 'error'
                })
              }
            }
          })
        },
        //重置
        ClickResetFun() {
          this.$refs['Inquire'].resetFields()
          this.$message({
            message: '重置成功',
            type: 'success'
          })
          this.getList()
        },
      // 选中数据处理
      CheckFun(val) {
        this.CheckedidArry = []
        const CheckedSelection = val
        if (CheckedSelection.length > 0) {
          for (let i = 0; i < CheckedSelection.length; i++) {
            this.CheckedidArry.push(CheckedSelection[i].id)
          }
        }
      },
      //删除
      deleteFun(){
         const data = {
            ids: this.CheckedidArry.toString()
          }
          remove(qs.stringify(data)).then(response => {
            if (response.status == 200) {
              if (response.data.msg == '操作成功') {
                this.$message({
                  message: response.data.msg,
                  type: 'success'
                })
                this.CheckedidArry=[]
                this.getList()
              } else {
                this.$message({
                  message: response.data.msg,
                  type: 'error'
                })
              }
            }
          })

      },
   //生成定期评价
    Generate_periodic_reviewsFun(val){
     const data = {
        ids: this.CheckedidArry.toString()
      }
      regular(qs.stringify(data)).then(response => {
        if (response.status == 200) {
          if (response.data.msg == '操作成功') {
            this.$message({
              message: response.data.msg,
              type: 'success'
            })
            this.CheckedidArry=[]
            this.getList()
          } else {
            this.$message({
              message: response.data.msg,
              type: 'error'
            })
          }
        }
      })
     },
      //新增
      addFun(){
        this.dialogParameter={
          dialogWidth: '60%',
          title: '新增',
          showDialog: true ,// 打开弹框
          Details:{}
        }
      },
      //编辑
      editFun(val){
         this.dialogParameter={
           dialogWidth: '60%',
           title: '编辑',
           showDialog: true,// 打开弹框
           Details:val
         }
         console.log(this.dialogParameter)
      },
      //弹出回调
      parentFn(val) {
        this.dialogParameter.showDialog=val.showDialog
        this.getList()
        this.dialogParameter={
          dialogWidth: '60%',
          title: '未知',
          showDialog: false ,
          Details:{}
        }
      }
    }
  }
</script>
<style lang="scss">
  .table_style_zj {

    .el-table td,
    .el-table th {
      text-align: center;
    }
  }

  .el-form-itemstyle {
    margin-bottom: 20px;
  }

  .baodianrenwuxianqingbox {
    .el-form-item__label {
      font-size: 15px;
    }

    .el-form-item__content {
      font-size: 17px;
    }
  }
</style>
