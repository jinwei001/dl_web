<template>
  <!-- <h2>XL巡视计划管理</h2> -->
  <div class="xs-hastitle">
    <el-dialog :visible.sync="showDialog" :title="`${$xl}巡视计划管理`" v-dialogDrag :center="true" :before-close="handleClose">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="170px" class="required-ruleForm thr">

        <el-form-item label="运维班组：" prop="bazuobj.objId">
          <el-select v-model="ruleForm.bazuobj" clearable placeholder="请选择" @change='getJcrList' value-key="objId"
            disabled>
            <el-option v-for="item in selection.groupsArr" :key="item.objId" :label="item.groupname" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="巡视人：" prop="ryobj.objId">
          <el-select v-model="ruleForm.ryobj" clearable filterable placeholder="请选择" value-key="objId" @change='getRYList'
            disabled>
            <el-option v-for="item in selection.usersArr" :key="item.objId" :label="item.name" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划巡视到期日期：" prop="jhxsrq">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.jhxsrq" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>

        <el-form-item label="计划来源：" prop="jhly">
          <el-select v-model="ruleForm.jhly" clearable placeholder="请选择" disabled>
            <el-option v-for="item in selection.patrolFromArr" :key="item.id" :label="item.planFrom" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上次计划时间：" prop="lastPlanTime">
          <el-date-picker v-model="ruleForm.lastPlanTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择时间" />
        </el-form-item>
        <el-form-item label="巡视类型:" prop="xslx">
          <el-select v-model="ruleForm.xslx" clearable placeholder="请选择"
            >
            <el-option v-for="item in selection.patrolTypesArr" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!--   <el-form-item label="巡视周期：" prop="xszq">
                  <el-select v-model="ruleForm.xszq" clearable placeholder="请选择">
                    <el-option v-for="item in xslx" :key="item.id" :label="item.qb" :value="item.id"></el-option>
                  </el-select>
                </el-form-item> -->
        <!--        <el-form-item label="上次执行时间：" prop="lastPlanTime">
                  <el-date-picker v-model="ruleForm.lastPlanTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择时间" />
        </el-form-item> -->
        <el-form-item label="备注:" prop="bz" style='width:100%'>
          <el-input v-model="ruleForm.bz" clearable />
        </el-form-item>
      </el-form>

      <el-form v-if="!isEdit" ref="dataForm" label-position="left" style="width:100% ;margin: 0 auto;">
        <!--       <div class="btn-center">
          <el-form>
            <el-col>
              <el-form-item>
                <el-button class="onSearch" @click="SearchChanelFn">选择xl</el-button>
                <el-button type="danger" plain @click="del" style="margin-right: 0">删除xl</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </div> -->
        <!--        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">巡视周期：</label>
            <el-select v-model="setzq" placeholder="请选择">
              <el-option v-for="item in xslx" :key="item.id" :label="item.qb" :value="item.id"></el-option>
            </el-select>
            <el-button class="UserSearchFun UserSearchFun-mini" size="mini" @click="zqFun">设置周期</el-button>
          </div>
          <div class="form-item">
            <label class="form-label">巡视类型：</label>
            <el-select v-model="setlx" placeholder="请选择">
              <el-option v-for="item in selection.patrolTypesArr" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
            </el-select>
            <el-button class="UserSearchFun UserSearchFun-mini" size="mini" @click="lxFun">设置巡视类型</el-button>
          </div>
        </div> -->
        <!--        <div class="table">
          <div class="table">
            <el-table height="200" :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}" :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}" border fit highlight-current-row @selection-change="CheckFun">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
              <el-table-column prop="lineName" label="xl名称"></el-table-column>
              <el-table-column prop="qqd" label="起讫点"></el-table-column>
              <el-table-column prop="totalLength" label="长度"></el-table-column>
              <el-table-column prop="totalStageCount" label="段数"></el-table-column>
              <el-table-column prop="lineRank" label="巡视周期">
                <template slot-scope="scope">
                  <el-select v-model="tableSelect[scope.$index]['patrolCycle']" clearable placeholder="请选择">
                    <el-option v-for="item in xslx" :key="item.id" :label="item.qb" :value="item.id"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="lineRank" label="巡视类型">
                <template slot-scope="scope">
                  <el-select v-model="tableSelect[scope.$index]['patrolType']" clearable placeholder="请选择">
                    <el-option v-for="item in selection.patrolTypesArr" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="上次计划时间">
                <template slot-scope="scope">
                  <el-date-picker value-format="yyyy-MM-dd"  v-model="tableSelect[scope.$index]['lastPlanTime']" type="date" placeholder="选择日期"></el-date-picker>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
    <!--    <div v-if="isShowDialog">
      <AddLine :selection='selection' @childFn="parentFn" @setLine='getLine' :openID="openID" />
    </div> -->
  </div>
</template>

<script>
  import '@/styles/myStyle/index.scss'
  // import AddLine from './AddLine'
  import {
    PatrolPlanManagementEdit as edit,
    PatrolPlanManagementLineDate as detail
  } from '@/api/patrolmanagement'
  import {
    sixjcrSelect,
    sixgetDays
  } from '@/api/liveDetectionManage'
  import {
    linesSelect
  } from '@/api/liveDetectionManage'
  import {
    addPlan as add,
    getaddData
  } from '@/api/Sixdefensemanagement/Hiddeninformationlist.js'
  import {
    patrolTypes, // 巡视类型
  } from "@/api/patrolmanagement";
  import qs from 'qs'
  export default {
    components: {
      // AddLine
    },

    props: {
      selection: {},
      /**
       * 接收是否打开页面
       */
      openID: '',
      isEdit: {
        type: Boolean,
        default: false
      },
      objId: {
        type: String,
        // 对象或数组且一定会从一个工厂函数返回默认值
        default: function() {
          return ''
        }
      },
      lineid: {
        type: String,
        // 对象或数组且一定会从一个工厂函数返回默认值
        default: function() {
          return ''
        }
      }
    },
    data() {
      return {
        date:null,
        patrolTypesArr: [], //巡视类型
        tableSelect: [], // 周期及巡视列表
        isShowDialog: false,
        flag: 0,
        yes: 'yes',
        no: 'no',
        CheckedSelection: '', // 获取选中table
        ruleForm: {
          // xlId: '',
          // xsbzId: '',
          jhxsrq: '',
          xsrId: '',
          jhly: 3,
          bz: '',
          xszq: '',
          lastPlanTime: '',
          xlId: this.lineid,
          planFromId: this.objId,
          bazuobj: {},
          ryobj: {},
          groupName: "",
          patrolUserName: "",
          xslx:""
        },
        rules: {
          'bazuobj.objId': [{
            required: true,
            message: '请选择运维班组',
            trigger: 'change'
          }],
          'ryobj.objId': [{
            required: true,
            message: '请选择计划巡视日期',
            trigger: 'blur'
          }],
          jhly: [{
            required: true,
            message: '请选择计划来源',
            trigger: 'change'
          }],
          // xszq: [{ required: true, message: '请选择周期', trigger: 'change' }],
          lastPlanTime: [{
            required: true,
            message: '请选择上次计划时间',
            trigger: 'change'
          }],
          xslx: [{
            required: true,
            message: '请选择巡视类型',
            trigger: 'change'
          }],
          jhxsrq: [{
            required: true,
            message: '请选择计划巡视到期日期',
            trigger: 'change'
          }],
        },
        form: {
          sbmc: '',
          date_time: null,
          zq: '',
          lx: '',
          pageNum: 1,
          pageSize: 10
        },
        xszq: '',
        selectCheckTd: null,
        selectshowDialog: false, //选择通道
        showDialog: true, //打开弹框
        setzq: '',
        setlx: '',
        tableData: [],

        xslx: [{
            id: '1',
            qb: '全部'
          },
          {
            id: '2',
            qb: '7天'
          },
          {
            id: '3',
            qb: '3天'
          }
        ]
      }
    },
    created() {
      if (this.isEdit)
        detail(this.openID).then(res => {
          // //console.log(res)
          let resFormData = res.data.data
          //console.log(resFormData,'编辑')
          this.ruleForm.jhxsrq = resFormData.jhxsrq
          this.ruleForm.lastPlanTime = resFormData.lastPlanTime
          this.ruleForm.xslx=resFormData.xslx
          this.ruleForm.bz = resFormData.bz
          // this.ruleForm = {
          //   xsbzId: resFormData.xsbzId,
          //   dlId: resFormData.dlId,
          //   jhxsrq: resFormData.jhxsrq,
          //   xsrId: resFormData.xsrId,
          //   jhly: Number(resFormData.jhly),
          //   zxsj: resFormData.zxsj,
          //   bz: resFormData.bz,
          //   xszq: resFormData.xszq,
          //   lastPlanTime: resFormData.lastPlanTime
          // }
          this.tableData = res.data.data.patrolLines
        })
    },
    mounted() {
      //巡视类型
      patrolTypes().then(res => {
        this.patrolTypesArr = res.data.data;
      });
      this.ruleForm.xlId = this.lineid,
        this.ruleForm.planFromId = this.objId
      this.getaddDataFun()
    },
     watch: {
        'ruleForm.lastPlanTime'(newName, oldName) {
           if(newName!==null&&this.ruleForm.jhxsrq!==null&&this.ruleForm.jhxsrq!==''){
             this.sixgetDaysfun()
           }
          // ...
        },
        'ruleForm.jhxsrq'(newName, oldName) {
           if(newName!==null&&this.ruleForm.lastPlanTime!==null&&this.ruleForm.lastPlanTime!==''){
             this.sixgetDaysfun()
           }
          // ...
        }
      },
    methods: {
      //新增时需要获取的数据
      getaddDataFun() {
        let data = {
          objId: this.objId //父组件传过来的objId
        }
        getaddData(qs.stringify(data)).then(response => {
          if (response.status == 200) {
            if (response.data.msg == '操作成功') {
				       console.log(response.data.data,'111')
              // this.$message({
              //   message:'新增需求数据获取成功',
              //   type: 'success'
              // })
              //获取运维班组
              this.ruleForm.bazuobj = {
                objId: response.data.data.zhiShouBanZuId,
                groupname: response.data.data.zhiShouBanZu
              }
              //根据运维班组选择项执行获取巡视人列表
              this.getJcrList(this.ruleForm.bazuobj)
              //获取人员列表选中项
              this.ruleForm.ryobj = {
                objId: response.data.data.zhiShouRenId,
                name: response.data.data.zhiShouRen
              }
              this.ruleForm.xsrId = response.data.data.zhiShouRenId
            } else {
              this.$message({
                message: response.data.msg,
                type: 'error'
              })
            }
          }
        })
      },
      getRYList(obj) {
        if (obj) {
          this.ruleForm.xsrId = obj.objId,
            this.ruleForm.patrolUserName = obj.name
        } else {
          this.ruleForm.xsrId = '',
            this.ruleForm.patrolUserName = ''
        }
      },
      ///计算时间
      sixgetDaysfun(){
        let data={
          startDay:this.ruleForm.lastPlanTime,    //上次计划时间
          endDay:this.ruleForm.jhxsrq    //计划巡视到期日期
        }
        sixgetDays(data).then(res => {
          // console.log(res.data.data)
        this.date=res.data.data
          // this.selection.usersArr = res.data.data
        let val = res.data
        let type = val.code == 0 ? 'success' : 'error'
        this.$message({
          type,
          message: val.msg
        })
        })
      },
      /** 检测班组 获取 检测人 */
      getJcrList(groupobj) {
        // this.ruleForm.ryobj = ''
        if (groupobj) {
          this.ruleForm.xsbzId = groupobj.objId
          sixjcrSelect(groupobj.groupname).then(res => {
            // DL
           this.selection.usersArr=[]
            for(var i=0;i<res.data.data.length;i++){
              let obj={
                objId:res.data.data[i].id,
                name:res.data.data[i].name
              }
              this.selection.usersArr.push(
              obj
              )
            }
            // this.selection.usersArr = res.data.data

          })
        } else {
          this.selection.usersArr = []
          this.ruleForm.xsbzId = ''
          this.ruleForm.groupName = ''
        }
      },
      getLine(e) {
        this.tableData = e.lines
        this.tableSelect = []

        for (let n = 0; n < this.tableData.length; n++) {
          this.tableSelect.push({
            patrolCycle: '',
            patrolType: '',
            lastPlanTime: ''
          })
        }
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
       * 确认按钮
       */
      SuerFun() {
        this.$refs['ruleForm'].validate(valid => {
          if (valid) {
            let formData = this.ruleForm
            if (!this.isEdit) {
              //新增

              // //console.log(this.ruleForm)

             console.log(this.date)
             let datef1=this.date.length-1
             for(let i=0;i<this.date.length;i++){
               this.ruleForm.lastPlanTime=this.date[i]
               this.ruleForm.jhxsrq=this.date[i]
               add({
                 ...this.ruleForm
               }).then(res => {
                 console.log(i,datef1)
                 if(i===datef1){
                  let val = res.data
                  let type = val.code == 0 ? 'success' : 'error'
                  this.$message({
                    type,
                    message: val.msg
                  })
                  if (val.code == 0)
                    this.$emit('childFn', {
                      showDialog: false
                  })
                 }

               })
             }
            } else {
              edit({ ...this.ruleForm,
                objId: this.openID
              }).then(res => {
                let val = res.data
                let type = val.code == 0 ? 'success' : 'error'
                this.$message({
                  type,
                  message: val.msg
                })
                if (val.code == 0)
                  this.$emit('childFn', {
                    showDialog: false
                  })
              })
            }
          } else {
            //console.log('error submit!!')
            return false
          }
        })
      },
      //选中数据
      CheckFun(val) {
        this.CheckedSelection = val
      },
      parentFn(val) {
        this.isShowDialog = false
      },
      /**选择通道按钮 */
      SearchChanelFn() {
        this.isShowDialog = true
      },
      /**删除通道按钮 */
      del(ids) {
        var selectIndArr = []
        this.tableData.forEach((v, i) => {
          this.CheckedSelection.forEach((val, ind) => {
            if (v.id == val.id) {
              selectIndArr.push(i)
            }
          })
        })
        //console.log(selectIndArr)
        for (let a = selectIndArr.length - 1; a >= 0; a--) {
          this.tableSelect.splice(selectIndArr[a], 1)
          this.tableData.splice(selectIndArr[a], 1)
        }

        // this.$confirm('是否删除?', '提示', {
        //   confirmButtonText: '删除',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // })
        //   .then(() => {
        //     delData({ ids }).then(val => {
        //       val = val.data
        //       let type = val.code == 0 ? 'success' : 'error'
        //       this.$message({ type: 'success', message: val.msg })
        //       if (val.code == 0) this.getData()
        //     })
        //   })
        //   .catch(() => {
        //     this.$message({
        //       type: 'info',
        //       message: '已取消'
        //     })
        //   })
      },
      /**
       * 巡视周期
       */
      zqFun() {
        let array = this.tableData
        if (array.length <= 0) {
          this.$message('请选择' + this.$xl)
          return false
        }

        //patrolCycle: '', patrolType: ''  setzq setlx
        this.tableSelect.forEach(v => {
          v.patrolCycle = this.setzq
        })
      },
      /** 巡视类型 */
      lxFun() {
        let array = this.tableData
        if (array.length <= 0) {
          this.$message('请选择' + this.$xl)
          return false
        }

        //patrolCycle: '', patrolType: ''  setzq setlx
        this.tableSelect.forEach(v => {
          v.patrolType = this.setlx
        })
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
      },
      /** 查询 */
      onSearchTdFn() {},
      /** 新增*/
      AddNewTdFn() {
        let array = this.selectCheckTd
        this.selectshowDialog = false
        array.forEach(element => {
          this.tableData.unshift(element)
        })
      },
      /** 选中数据 子*/
      CheckTdFun(val) {
        this.selectCheckTd = val
      }
    }
  }
</script>
<style lang="scss" scope>
  .select-dy {
    .dy {
      float: left;
      width: 4.2rem;
      height: 2rem;
      line-height: 2rem;
      text-align: center;
      border-radius: 4px;
      cursor: pointer;
    }

    :nth-child(2) {
      margin: 0 2rem;
    }

    .yes {
      background-color: #35b8c0;
      color: #fff;
      border: 1px solid #35b8c0;
    }

    .no {
      border: 1px solid #35b8c0;
      color: #35b8c0;
      background-color: #fff;
    }
  }
</style>
