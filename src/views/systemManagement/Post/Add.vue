<template>
  <div class="xs-hastitle">
    <el-dialog :visible.sync="showDialog" :title="title" v-dialogDrag :center="true" width="25%" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="required-ruleForm">
        <el-form-item label="岗位名称：" prop="rolename" style="width:100%">
          <el-input v-model="ruleForm.rolename" />
        </el-form-item>
        <el-form-item label="岗位描述:" prop="roledescribe" style="width:100%">
          <el-input v-model="ruleForm.roledescribe" />
        </el-form-item>
        <el-form-item label="状态:" prop="isdisable" style="width:100%">
          <el-select v-model="ruleForm.isdisable" clearable placeholder="请选择">
            <el-option label="启用" value="0"></el-option>
            <el-option label="禁用" value="1"></el-option>
          </el-select>
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
import { psotAdd as add, psotEdit as edit } from '@/api/systemManagement'
export default {
  props: {
    title: {
      type: String,
      default: '添加岗位'
    },
    thisDetail: {}
  },
  data() {
    return {
      isShowDialog: false,

      ruleForm: {
        rolename: '',
        roledescribe: '',
        isdisable: ''
      },
      rules: {
        rolename: [
          { required: true, message: '请输入岗位名称', trigger: 'change' }
        ],
        roledescribe: [
          { required: true, message: '请输入岗位描述', trigger: 'change' }
        ],
        isdisable: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      },
      showDialog: true //打开弹框
    }
  },
  created() {
    if (Object.keys(this.thisDetail).length != 0){
      this.ruleForm = {
        rolename: this.thisDetail.rolename?this.thisDetail.rolename:'',
        roledescribe: this.thisDetail.roledescribe?this.thisDetail.roledescribe:'',
        isdisable: this.thisDetail.isdisable?this.thisDetail.isdisable:'',
      }
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

