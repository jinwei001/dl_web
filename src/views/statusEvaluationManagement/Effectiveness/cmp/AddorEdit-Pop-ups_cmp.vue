<template>
  <!--有效性说明 -->

    <el-dialog v-dialogDrag :visible.sync="dialogParameterpg.showDialog" :title="dialogParameterpg.title" :center="true"
      :before-close="handleClose" :width="dialogParameterpg.dialogWidth">
       <div v-if="dialogParameterpg.title==='有效性'">
        <el-form class="jczqBOX" ref="form" :model="form" style="width:100% ;margin: 0 auto;" label-position="right"
          :inline="false" label-width="130px" :rules="formRules">
          <el-col :span="24">
            <el-form-item :label="$xl+'名称'" prop="lineId" class="bottomstyle">
              <el-select v-model="form.lineId" clearable placeholder="请选择" filterable disabled="disabled">
                <el-option v-for="(item,index) in dialogParameterpg.selection.linearry" :key="item.id" :label="item.lineName"
                  :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="是否严重不符"  class="bottomstyle is-lableNO">
                  <el-radio v-model="form.ifValid" label="0">否</el-radio>
                  <el-radio v-model="form.ifValid" label="1">是</el-radio>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="原因说明" prop="validReason" class="bottomstyle">
              <el-input v-model="form.validReason" type="textarea" :rows="7"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
         <div slot="footer" class="dialog-footer" style="text-align: center;">
           <el-button class="onSearch" @click="editFun" >提交</el-button>
           <el-button class="onSearch" @click="handleClose">取消</el-button>
         </div>
      </div>
      <div v-if="dialogParameterpg.title.indexOf('老旧')!==-1">
        <maintenance :Yxxobjpgc='Yxxobj'></maintenance>
      </div>
      <div v-if="dialogParameterpg.title==='故障信息'">
        <falutdesignindex :Yxxobjpgc='Yxxobj'></falutdesignindex>
      </div>
      </div>
    </el-dialog>

</template>

<script>
  import {
   edit
  } from '@/api/statusE/regular'
  import {
    All_table_H
  } from '../../../oldManagement/cmp/js/All_table_H.js'
  import falutdesignindex from '../../../falutManage/falutDesign/index.vue'
  import maintenance from '../../../oldManagement/cable-maintenance.vue'
  import qs from 'qs'
  export default {
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
      return {
        Details:{},
        Yxxobj:{},
        form: {
          lineId: '', //线路
          ifValid: '0', //是否严重不符（0否 1是）
          validReason:'',//原因说明
        },
        table_headerData:[],
        type:'',
        formRules: {
          lineId: [{
            required: true,
            message: '请选择线路',
            trigger: 'change'
          }],
          ifValid: [{
           required: true,
           message: '请选择是否严重不符',
           trigger: 'change'
          }],
          validReason: [{
            required: true,
            message: '请输入原因说明',
            trigger: 'change'
          }]
        }
      }
    },
    watch: {

    },
    created: function() {
      if (this.dialogParameterpg.title==='有效性'){
          this.Details = this.dialogParameterpg.Details
          this.form.lineId=this.Details.lineId
          this.form.ifValid=this.Details.ifValid!==null?this.Details.ifValid.toString():'0'
          this.form.validReason=this.Details.validReason
      }
      if (this.dialogParameterpg.title.indexOf("老旧")!==-1){
          this.Details = this.dialogParameterpg.Details
          this.Yxxobj.show=false
          this.Yxxobj.lineId=this.Details.lineId
      }
      if (this.dialogParameterpg.title==='故障信息'){
          this.Details = this.dialogParameterpg.Details
          this.Yxxobj.show=false
          this.Yxxobj.lineId=this.Details.lineId
      }

    },
    components: {
      maintenance,
      falutdesignindex
    },
    mounted() {


    },
    methods: {
      ClosePopupFun(){
        this.$emit("childFn", {
          showDialog: false,
        });
      },
      editFun() {
        let data = {
          id:this.Details.id, //周期单位
          lineId: this.form.lineId, //周期单位
          ifValid: this.form.ifValid, //	超期报警天数
          validReason: this.form.validReason, //上定日期
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
