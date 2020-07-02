<template>
  <!-- 该组件为定期新增和编辑弹出和编辑共用组件 定期新增和编辑弹出弹出 -->
  <div v-if="dialogParameterpg.showDialog===true" class="single-row-title">
    <el-dialog v-dialogDrag :visible.sync="dialogParameterpg.showDialog" :title="dialogParameterpg.title" :center="true"
      :before-close="handleClose" :width="dialogParameterpg.dialogWidth">
      <div v-if="dialogParameterpg.title==='新增'">
        <el-form class="jczqBOX" ref="form" :model="form" style="width:100% ;margin: 0 auto;" label-position="right"
          :inline="false" label-width="130px" :rules="formRules">
          <el-col :span="24">
            <el-form-item :label="$xl+'名称'" prop="lineId" class="bottomstyle">
              <el-select v-model="form.lineId" clearable placeholder="请选择" filterable>
                <el-option v-for="(item,index) in dialogParameterpg.selection.linearry" :key="item.id" :label="item.lineName"
                  :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="定期评价人" prop="regularEvaluatorId" class="bottomstyle is-lableNO">
              <el-select v-model="form.regularEvaluatorId" clearable placeholder="请选择" filterable>
                <el-option v-for="(item,index) in dialogParameterpg.selection.sbzrarry" :key="item.obj_id" :label="item.name"
                  :value="item.obj_id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="定期评价日期" prop="Daysofoverduealarm" class="bottomstyle">
          <!--    <el-date-picker v-model="form.Daysofoverduealarm" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker> -->
              <el-date-picker v-model="form.Daysofoverduealarm" type="datetime" format="yyyy-MM-dd hh:mm:ss"
            value-format="yyyy-MM-dd hh:mm:ss"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="评价任务描述" prop="pjrwms" class="bottomstyle">
              <el-input v-model="form.pjrwms" type="textarea" :rows="7"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <BG v-if="dialogParameterpg.title==='新增报告'||dialogParameterpg.title==='编辑报告'" :detailspg='this.Details' @childFnC='ClosePopupFun'></BG>
      <div slot="footer" class="dialog-footer">
        <el-button class="onSearch" @click="addFun" v-if="dialogParameterpg.title==='新增'">提交</el-button>
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
    edit
  } from '@/api/statusE/cycle'
  import {
   add
  } from '@/api/statusE/regular'
  import Pagination from '@/components/Pagination'
  import BG from '../../result/cmp/tabs/BG.vue'
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
      dialogParameterpg: {
        type: Object,
        default: function() {
          return {

          }
        }
      }


    },
    data() {
      const reg3 = /^[1-31]*$/
      const validateAcquaintance = (rule, value, callback) => {
        if (!reg3.test(value)) {
          callback(new Error('1～9（整数）'))
        } else {
          callback()
        }
      }
      return {
        Details:{},
        tableParam: {
          total: 0,
          pageNum: 1,
          pageSize: 5,
          limit: 5,
          lineNature: '主线'
        },
        tableData: [],
        form: {
          lineId: '', //线路
          regularEvaluatorId: '', //定期评价人
          Daysofoverduealarm: '', //定期评价日期
          pjrwms:''//处理意见
        },
        formRules: {
          lineId: [{
            required: true,
            message: '请选择线路',
            trigger: 'change'
          }],
          regularEvaluatorId: [{
           required: true,
           message: '请选择定期评价人',
           trigger: 'change'
          }],
          Daysofoverduealarm: [{
            required: true,
            message: '请选择定期评价日期',
            trigger: 'change'
          }]
        }
      }
    },
    watch: {

    },
    created: function() {},
    mounted() {
      if (this.dialogParameterpg.title === '编辑报告') {
          this.Details = this.dialogParameterpg.Details
          this.Details.starts=1
      }
      if(this.dialogParameterpg.title === '新增报告'){
        this.Details = this.dialogParameterpg.Details
        this.Details.starts=0
      }
      console.log('this.Details :>> ', this.Details);
    },
    methods: {

      //重置
      ClickResetFun() {
        this.$refs['form1'].resetFields()
        this.$message({
          message: '重置成功',
          type: 'success'
        })
      },
      ClosePopupFun(){
        this.$emit("childFn", {
          showDialog: false,
        });
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
      addFun() {
        let data = {
          lineId: this.form.lineId, //线路
          regularEvaluatorId:this.form.regularEvaluatorId, //定期评价人
          // regularDate:this.form.Daysofoverduealarm!==''?this.form.Daysofoverduealarm+' 00:00:00':'', //定期评价日期
          regularDate:this.form.Daysofoverduealarm, //定期评价日期
          pjrwms:this.form.pjrwms,//处理意见
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
              add(qs.stringify(data)).then(response => {
                if (response.status == 200) {
                  if (response.data.code == '0') {
                    this.$message({
                      message: response.data.msg,
                      type: 'success'
                    })
                    this.ClosePopupFun()
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
      editFun() {
        let data = {
          cycleUnit: this.form.Cycle_unit, //周期单位
          cycle: this.form.Cycle, //周期单位
          overdueWarnDays: this.form.Daysofoverduealarm, //	超期报警天数
          lastPjDate: this.form.LastperiodicReviewDate, //上定日期
          requires: this.form.demand, //需求
          earlyWarnDays: this.form.Alarmdaysinadvance, //提前天数
          remark: this.form.Remarks, //备注
          id: this.dialogParameterpg.Details.id
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
                this.ClosePopupFun()
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
  .jczqBOX {
    .el-form-item.is-required.is-lableNO:not(.is-no-asterisk)>.el-form-item__label:before {
      display: none;
    }

    .bottomstyle {
      margin-bottom: 20px !important;
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
