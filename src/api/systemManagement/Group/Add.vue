<template>
  <div class="xs-hastitle">
    <el-dialog :visible.sync="showDialog" :title="title" v-dialogDrag :center="true" width="25%" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="required-ruleForm">
        <el-form-item label="班组名称：" prop="groupname" style="width:100%">
          <el-input v-model="ruleForm.groupname" />
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
import { groupAdd as add, groupEdit as edit } from '@/api/systemManagement'
export default {
  props: {
    title: {
      type: String,
      default: '添加班组'
    },
    /**
     * 接收是否打开页面
     */
    thisDetail: {}
  },
  data() {
    return {
      ruleForm: {
        groupname: '' // xl
      },
      rules: {
        groupname: [
          { required: true, message: '请输入班组名称', trigger: 'change' }
        ]
      },
      showDialog: true //打开弹框
    }
  },
  created() {
     if (Object.keys(this.thisDetail).length != 0){
       this.ruleForm.groupname = this.thisDetail.groupname
     }
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
          if (Object.keys(this.thisDetail).length == 0) {
            add(this.ruleForm).then(res => {
              let val = res.data
              let type = val.code == 0 ? 'success' : 'error'
              this.$message({ type, message: val.msg })
              if (val.code == 0)
                this.$emit('childFn', {
                  showDialog: false
                })
            })
          } else {
            edit({ ...this.ruleForm, objId: this.thisDetail.objId }).then(
              res => {
                let val = res.data
                let type = val.code == 0 ? 'success' : 'error'
                this.$message({ type, message: val.msg })
                if (val.code == 0)
                  this.$emit('childFn', {
                    showDialog: false
                  })
              }
            )
          }
        } else {
          //console.log('error submit!!')
          return false
        }
      })
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
