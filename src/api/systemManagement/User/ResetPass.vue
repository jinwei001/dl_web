<template>
  <div class="xs-hastitle">
    <el-dialog :visible.sync="showDialog" :title="title" v-dialogDrag :center="true" width="25%" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="required-ruleForm">
        <el-form-item label="姓名：" prop="name" style="width:100%">
          <el-input v-model="ruleForm.name" disabled />
        </el-form-item>
        <el-form-item label="修改密码:" prop="pd" style="width:100%">
          <el-input v-model="ruleForm.pd" />
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import '@/styles/myStyle/index.scss'
import {
  userEditPass as edit,
} from '@/api/systemManagement'

export default {
  props: {
    thisDetail: {},
    title: {
      type: String,
      default: '添加用户'
    }
    /**
     * 接收是否打开页面
     */
  },
  data() {
    return {
      ruleForm: {
        name:'',
        pd: '', // 姓名
      
      },
      rules: {
        pd: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
      
      },
      showDialog: true, //打开弹框
    }
  },
  created() { 
    console.log(this.thisDetail)
    this.ruleForm.name = this.thisDetail.name
  },
  methods: {
    /**
     * 取消按钮
     */
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('childFn', {
            showDialog: this.showDialog
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
          edit({ ...this.ruleForm, objId: this.thisDetail.objId }).then(res => {
              let val = res.data
              let type = val.code == 0 ? 'success' : 'error'
              this.$message({ type, message: val.msg })
              if (val.code == 0)
                this.$emit('childFn', {
                  showDialog: false
                })
            })
        } else {
          //console.log('error submit!!')
          return false
        }
      })
    },
    period(e) {
      // 清除"数字"和"."以外的字符
      e.target.value = e.target.value.replace(/[^\d]/g, '')
      // 验证第一个字符是数字
      e.target.value = e.target.value.replace(/^\./g, '')
      // 只保留第一个, 清除多余的
      e.target.value = e.target.value.replace(/\.{2,}/g, '.')
      e.target.value = e.target.value
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
      // 只能输入两个小数
      e.target.value = e.target.value.replace(
        /^(\-)*(\d+)\.(\d\d).*$/,
        '$1$2.$3'
      )
    },

    parentFn(val) {
      this.isShowDialog = false
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
    beginDate() {
      const self = this
      return {
        disabledDate(time) {
          if (self.ruleForm.jhjssj) {
            //如果结束时间不为空，则小于结束时间
            return new Date(self.ruleForm.jhjssj).getTime() < time.getTime()
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      }
    },
    processDate() {
      const self = this
      return {
        disabledDate(time) {
          if (self.ruleForm.jhkssj) {
            //如果开始时间不为空，则结束时间大于开始时间
            return new Date(self.ruleForm.jhkssj).getTime() > time.getTime()
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      }
    }
  }
}
</script>
<style lang="scss" scope>
.el-select {
  width: 100%;
}
.el-date-editor.el-input {
  width: 100%;
}
</style>
