<template>
  <div class="xs-hastitle">
    <el-dialog :visible.sync="showDialog" :title="title" v-dialogDrag :center="true" width="40%" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="required-ruleForm">
        <el-form-item label="分组id：" prop="fzid">
          <el-input v-model="ruleForm.fzid" />
        </el-form-item>
        <el-form-item label="分组名称：" prop="fzmc">
          <el-input v-model="ruleForm.fzmc" />
        </el-form-item>
        <el-form-item label="编码id：" prop="bzid">
          <el-input v-model="ruleForm.bzid" />
        </el-form-item>
        <el-form-item label="编码名称：" prop="bzmc">
          <el-input v-model="ruleForm.bzmc" />
        </el-form-item>
        <el-form-item label="代码：" prop="dm">
          <el-input v-model="ruleForm.dm" />
        </el-form-item>
        <el-form-item label="备注：" prop="bz">
          <el-input v-model="ruleForm.bz" />
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
import { codeAdd as add, codeEdit as edit } from '@/api/systemManagement'

export default {
  props: {
    title: {
      type: String,
      default: '添加代码'
    },
    thisDetail: {}
  },
  data() {
    return {
      isShowDialog: false,
      ruleForm: {
        fzid:'',
        fzmc:'',
        bzid:'',
        bzmc:'',
        dm:'',
        bz:'',
        },
      rules: {
        fzid: [{ required: true, message: '请输入分组ID', trigger: 'change' }],
        fzmc: [
          { required: true, message: '请输入分组名称', trigger: 'change' }
        ],
        bzid: [{ required: true, message: '请输入编码ID', trigger: 'change' }],
        bzmc: [
          { required: true, message: '请输入编码名称', trigger: 'change' }
        ],
        dm: [{ required: true, message: '请输入代码', trigger: 'change' }]
      },
      showDialog: true //打开弹框
    }
  },
  created() {
      if (Object.keys(this.thisDetail).length != 0){
        let {fzid,fzmc,bzid,bzmc,dm,bz} = this.thisDetail
       this.ruleForm.fzid = fzid
       this.ruleForm.fzmc = fzmc
       this.ruleForm.bzid = bzid
       this.ruleForm.bzmc = bzmc
       this.ruleForm.dm = dm
       this.ruleForm.bz = bz?bz:''
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
