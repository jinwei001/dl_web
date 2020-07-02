<template>
  <!-- <h2>
      添加超期原因
  </h2>-->
  <div class="single-row-title">
    <el-dialog :visible.sync="showDialog" title="添加超期原因" v-dialogDrag :center="true" :before-close="handleClose">
      <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-position="left" style="width:100% ;margin: 0 auto; ">
        <el-form-item label="超期原因" prop="reason">
          <el-input type="textarea" v-model="ruleForm.reason"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun">提 交</el-button>
        <el-button class="onSearch" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { exceedTimeReasonEdit as edit } from '@/api/patrolmanagement'
export default {
  props: {
    reasonMsg: {}
  },
  data() {
    return {
      ruleForm: {
        reason: '',
        objId:''
      },
       rules: {
          reason: [
            { required: true, message: '请输入超期原因', trigger: 'blur' },
          ],
       },
      showDialog: true //打开弹框
    }
  },
  created() {
    this.ruleForm = this.reasonMsg
  },
  mounted() {},
  methods: {
    /**
     * 取消按钮
     */
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('childFn', {
            showDialog: false
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
          edit(this.ruleForm).then(res => {
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
    }
  }
}
</script>

<style lang="scss" scope>
/*文本域*/
.text-area {
  width: 100%;
  border-top: 1px solid gainsboro;
  border-bottom: 1px solid gainsboro;
}
.text-area textarea {
  min-width: 100%;
  max-width: 100%;
  margin: 0.75rem 0;
  border: none;
  outline: none;
  padding-left: 1.125rem;
  height: 6.5rem;
}
.text-area textarea::-webkit-input-placeholder {
  color: #9e9e9e;
}
</style>