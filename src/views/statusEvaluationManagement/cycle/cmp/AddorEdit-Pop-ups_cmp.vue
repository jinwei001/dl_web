<template>
  <!-- 该组件为状态周期新增和编辑共用组件 周期新增和编辑弹出 -->
  <div v-if="dialogParameterpg.showDialog===true" class="single-row-title">
    <el-dialog v-dialogDrag :visible.sync="dialogParameterpg.showDialog" :title="dialogParameterpg.title" :center="true"
      :before-close="handleClose" :width="dialogParameterpg.dialogWidth">
      <el-form class="jczqBOX" ref="form" :model="form" style="width:100% ;margin: 0 auto;" label-position="right"
        :inline="false" label-width="130px" :rules="formRules">
        <el-col :span="12">
        <el-form-item label="周期单位" prop="Cycle_unit" class="bottomstyle">
          <el-select v-model="form.Cycle_unit" clearable placeholder="请选择">
           <el-option v-for="(item,index) in selection.ZQarry" :key="index" :label="item.value" :value="item.value"
              />
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="周期" prop="Cycle" class="bottomstyle is-lableNO">
          <el-input v-model="form.Cycle"></el-input>
        </el-form-item>
        </el-col>
       <el-col :span="12">
        <el-form-item label="超期报警天数" prop="Daysofoverduealarm" class="bottomstyle is-lableNO">
          <el-input v-model="form.Daysofoverduealarm"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="上定期评价日期" prop="LastperiodicReviewDate" class="bottomstyle">
          <el-date-picker
                v-model="form.LastperiodicReviewDate"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
        </el-form-item>
        </el-col>
        <el-col :span="12">
         <el-form-item label="需求" prop="demand" class="bottomstyle">
           <el-input v-model="form.demand"></el-input>
         </el-form-item>
         </el-col>
         <el-col :span="12">
         <el-form-item label="提前报警天数" prop="Alarmdaysinadvance" class="bottomstyle is-lableNO">
           <el-input v-model="form.Alarmdaysinadvance"></el-input>
         </el-form-item>
         </el-col>
         <el-col :span="24">
         <el-form-item label="备注" prop="Remarks" class="bottomstyle">
           <el-input v-model="form.Remarks" type="textarea" :rows="7"></el-input>
         </el-form-item>
         </el-col>
      </el-form>
      <el-col :span="24">
      <el-card class="box-card" style="width: 100%;margin-bottom: 30px;" v-if="dialogParameterpg.title==='新增'">
        <el-form class="jczqBOX" ref="form1" :model="form1" style="width:100% ;margin: 0 auto;" label-position="right" :inline="false" label-width="120px">
         <p style="font-weight: 600;text-align: center;font-size: 18px;margin-bottom: 20px;">{{$xl}}查询</p>
         <el-col :span="12">
         <el-form-item :label="$dydj" prop="ljDydj" class="bottomstyle">
           <el-select v-model="form1.ljDydj" clearable placeholder="请选择">
            <el-option v-for="(item,index) in selection.DYDJarry" :key="index" :label="item.value" :value="item.value"
               />
           </el-select>
         </el-form-item>
         </el-col>
         <el-col :span="12">
         <el-form-item label="运维班组" prop="Bzval" class="bottomstyle">
           <el-select v-model="form1.Bzval" clearable placeholder="请选择">
            <el-option v-for="(item,index) in selection.BZarry" :key="item.objId" :label="item.groupname" :value="item.objId"
               />
           </el-select>
         </el-form-item>
         </el-col>
         <el-col :span="12">
         <el-form-item :label="$xl+'等级'" prop="djval" class="bottomstyle">
          <el-select v-model="form1.djval" clearable placeholder="请选择">
           <el-option v-for="(item,index) in selection.xlarry" :key="item.id" :label="item.value" :value="item.id"
             />
          </el-select>
         </el-form-item>
         </el-col>
         <el-col :span="12">
         <el-form-item label="设备主人" prop="sbzrval" class="bottomstyle">
           <el-select v-model="form1.sbzrval" clearable placeholder="请选择" filterable>
            <el-option v-for="(item,index) in selection.sbzrarry" :key="item.obj_id" :label="item.name" :value="item.name"
              />
           </el-select>
         </el-form-item>
         </el-col>
         <el-col :span="24" style="text-align: right;margin-bottom: 20px;">
         <el-button type="primary" size="small" plain @click='getList'>查询</el-button>
         <el-button type="primary" size="small" plain @click='ClickResetFun'>重置</el-button>
         </el-col>
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
           <el-table-column prop="runStatus" label="设备状态" min-width="150" />
           <el-table-column prop="lineRank" :label="$xl+'等级'" min-width="150" >
            <template slot-scope="scope">
              <p v-for="(list,index) in selection.xlarry" :key='list.id'>
                <span v-if="scope.row.lineRank===list.id">{{list.value}}</span>
              </p>
            </template>
           </el-table-column>
         </el-table>
         <pagination :total="tableParam.total" :page.sync="tableParam.pageNum" :limit.sync="tableParam.limit" @pagination="getList" />
         </el-form>
      </el-card>
        </el-col>
      <div slot="footer" class="dialog-footer">
        <el-button class="onSearch" @click="addFun"  v-if="dialogParameterpg.title==='新增'">提交</el-button>
        <el-button class="onSearch" @click="editFun" v-if="dialogParameterpg.title==='编辑'">提交</el-button>
        <el-button class="onSearch" @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    line_list,
    group_list,
    sbzrList,
    add,
    edit
  } from '@/api/statusE/cycle'
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
      isstatspg: {
        type: String,
        default: function() {
        return ''
        }
      },
      Detailspg: {
        type: Object,
        default: function() {
        return {

        }
      }}


    },
    data() {
      const reg3 = /^[1-9]*$/
      const validateAcquaintance = (rule, value, callback) => {
        // if (!reg3.test(value)) {
        //   callback(new Error('1～9（整数）'))
        // } else {

        // }
        callback()
      }
      return {
        tableParam:{
         total: 0,
         pageNum: 1,
         pageSize: 5,
         limit: 5,
         lineNature: '主线'
        },
        tableData:[],
        form: {
           Cycle_unit:'',//周期单位
           Cycle:'',//周期
           Daysofoverduealarm:'',//超期报警天数
           LastperiodicReviewDate:'',//上定期评价日期
           demand:'',//需求
           Alarmdaysinadvance:'',//提前报警天数
           Remarks:'',//备注
        },
        form1:{
           ljDydj:'',
           Bzval:'',
           djval:'',
           sbzrval:'',
        },
        shangchuArry:[],
        selection: {
           DYDJarry:[
             {
               value:'35kV'
             },     {
               value:'110kV'
             },     {
               value:'220kV'
             },

           ],
           BZarry:[],
           xlarry:[
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
           ZQarry:[{
             value:'年'
           },{
             value:'月'
           },{
             value:'周'
           },{
             value:'日'
           }]
        },
        formRules: {
          Cycle_unit:[{
            required: true,
            message: '请选择周期单位',
            trigger: 'change'
          }],
          Cycle: [{
            required: true,
            trigger: 'change',
            validator: validateAcquaintance
          }],
          Daysofoverduealarm: [{
            required: true,
            trigger: 'change',
            validator: validateAcquaintance
          }],
          LastperiodicReviewDate: [{
            required: true,
            message: '请选择上定期评价日期',
            trigger: 'change'
          }],
          Alarmdaysinadvance: [{
            required: true,
            trigger: 'change',
            validator: validateAcquaintance
          }],
        }
      }
    },
    watch: {

    },
    created: function() {
    },
    mounted() {
      if(this.dialogParameterpg.title==='编辑'){
         let Details=this.dialogParameterpg.Details
           this.form.Cycle_unit=Details.cycleUnit
           this.form.Cycle=Details.cycle
           this.form.Daysofoverduealarm=Details.overdueWarnDays
           this.form.LastperiodicReviewDate=Details.lastPjDate
           this.form.demand=Details.requires
           this.form.Alarmdaysinadvance=Details.earlyWarnDays
           this.form.Remarks=Details.remark
      }

        this.BZList()
        this.sbzrListFun()
        this.getList()
    },
    methods: {
      getList(){
        this.tableParam.voltageRank=this.form1.ljDydj
        this.tableParam.groupId=this.form1.Bzval
        this.tableParam.lineRank=this.form1.djval
        this.tableParam.facilityMaster=this.form1.sbzrval
        line_list(qs.stringify(this.tableParam)).then(response => {
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
      },
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
     // 选中数据处理
     CheckFun(val) {
       this.shangchuArry = []
       const CheckedSelection = val
       if (CheckedSelection.length > 0) {
         for (let i = 0; i < CheckedSelection.length; i++) {
           this.shangchuArry.push(CheckedSelection[i].id)
         }
       }
     },
     addFun(){
       let data = {
         cycleUnit: this.form.Cycle_unit, //周期单位
         cycle: this.form.Cycle, //周期单位
         overdueWarnDays: this.form.Daysofoverduealarm,//	超期报警天数
         lastPjDate: this.form.LastperiodicReviewDate, //上定日期
         requires: this.form.demand, //需求
         earlyWarnDays: this.form.Alarmdaysinadvance, //提前天数
         remark: this.form.Remarks, //备注
         lineIds:this.shangchuArry.toString()//线路集合
       }
       this.$refs.form.validate((valid) => {
         if (valid) {
           if(this.shangchuArry.length>0){
           add(qs.stringify(data)).then(response => {
             if (response.status == 200) {
               if (response.data.code == '0') {
                 this.$message({
                   message: response.data.msg,
                   type: 'success'
                 })
                 this.$emit("childFn", {
                   showDialog: false,
                 });
               } else {
                 this.$message({
                   message: response.data.msg,
                   type: 'error'
                 })
               }
             }
           })
           }else{
             this.$message({
               message: '至少选择一条线',
               type: 'error'
             })
           }


         }
       })
     },
     editFun(){
     let data = {
        cycleUnit: this.form.Cycle_unit, //周期单位
        cycle: this.form.Cycle, //周期单位
        overdueWarnDays: this.form.Daysofoverduealarm,//	超期报警天数
        lastPjDate: this.form.LastperiodicReviewDate, //上定日期
        requires: this.form.demand, //需求
        earlyWarnDays: this.form.Alarmdaysinadvance, //提前天数
        remark: this.form.Remarks, //备注
         id:this.dialogParameterpg.Details.id
       }
       this.$refs.form.validate((valid) => {
         if (valid) {
           edit(qs.stringify(data)).then(response => {
             if (response.status == 200) {
               if (response.data.code == '0') {
                 this.$message({
                   message: response.data.msg,
                   type: 'success'
                 })
                 this.$emit("childFn", {
                   showDialog: false,
                 });
               } else {
                 this.$message({
                   message: response.data.msg,
                   type: 'error'
                 })
               }
             }
           })
         }
       })
     },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.$emit('childFn', {
              showDialog: false
            })
            done()
          })
          .catch(_ => {})
      }
    }
  }
</script>
<style lang="scss">
  .jczqBOX{
    .el-form-item.is-required.is-lableNO:not(.is-no-asterisk)>.el-form-item__label:before{
      display: none;
    }
    .bottomstyle{
      margin-bottom: 20px!important;
    }
    .el-range-editor.is-disabled input {
      background-color: white;
    }

    .el-range-editor.is-disabled {
      background-color: white;
    }

    .Punch-card-box {
      margin-bottom: 50px;
      background: #f0f0f0;
      padding-right: 25px;
      padding-top: 20px;
      border-radius: 1%;
      box-shadow: 0 2px 12px 0 floralwhite;
    }

    .el-input.is-disabled .el-input__inner {
      color: black;
      background-color: white;
    }

    .el-input.is-disabled .el-input__inner {
      background-color: white;
    }

    .el-tag--info {
      color: black;
    }

    .el-range-editor.is-disabled input {
      color: black;
    }

    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }

    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    .el-input {
      width: 100%;
    }

    .el-select {
      width: 100%;
    }

    .el-input--suffix {
      width: 100%;
    }

    .el-row {
      margin-bottom: 30px;
    }

    .el-form-item__label {
      // font-weight: 700;
      font-size: 0.9375rem;
    }

    .el-upload-list {
      overflow-y: auto;
      min-height: 60px !important;
      max-height: 300px !important;
      // margin-bottom: 20px;
    }

    .titlestyle {
      font-size: 20px;
      margin-top: 50px;
      margin-bottom: 30px;
    }
  }
</style>
