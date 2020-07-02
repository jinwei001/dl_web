<template>
  <!-- <h2xl巡视计划管理</h2> -->
  <div class="xs-hastitle">
    <el-dialog :visible.sync="showDialog" title="设置预警次数" v-dialogDrag :center="true" width="500px" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="required-ruleForm">
        <el-form-item label="预警次数：" prop="alarmCount" style="width:100%">
          <el-input v-model="ruleForm.alarmCount" @input.native='period' />
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
import { warningSetCount } from '@/api/patrolmanagement'

export default {
  props: {
    selection: {},
    /**
     * 接收是否打开页面
     */
    openID: ''
  },
  data() {
    return {
      ruleForm: {
        alarmCount: ''
      },
      rules: {
        alarmCount: [
          { required: true, message: '请输入预警次数', trigger: 'change' }
        ]
      },
      showDialog: true //打开弹框
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
          warningSetCount({
            // deviceNames:this.openID,
            alarmCount:this.ruleForm.alarmCount}).then(res => {
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
    }
  }
}
</script>

