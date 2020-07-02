<template>
  <div class="xs-hastitle">
    <el-dialog :visible.sync="showDialog" title="添加菜单" v-dialogDrag :center="true" width="40%" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="required-ruleForm">
        <el-form-item label="菜单名称：" prop="menuname">
          <el-input v-model="ruleForm.menuname" />
        </el-form-item>
        <el-form-item label="菜单url：" prop="menuurl">
          <el-input v-model="ruleForm.menuurl" />
        </el-form-item>
        <el-form-item label="序号：" prop="orderNum">
          <el-input v-model="ruleForm.orderNum" />
        </el-form-item>
        <el-form-item label="菜单样式：" prop="menuclass">
          <el-input v-model="ruleForm.menuclass" />
        </el-form-item>
        <el-form-item label="菜单类型：" prop="menutype">
          <el-select v-model="ruleForm.menutype" clearable placeholder="请选择">
            <el-option label="菜单" value="1"></el-option>
            <el-option label="按钮" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限标识：" prop="perms">
          <el-input v-model="ruleForm.perms" />
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
import { resModelAdd as add } from '@/api/systemManagement'

export default {
  props: {
    title: {
      type: String,
      default: '添加代码'
    },
    fmid:null
  },
  data() {
    return {
      isShowDialog: false,
      ruleForm: {
        menuname: '', // 菜单名称
        menuurl: '', // 菜单url
        orderNum: '', // 序号
        menuclass: '', // 菜单样式
        menutype: '', // 菜单类型
        perms: '' // 菜单类型
      },
      rules: {
        menuname: [{ required: true, message: '请输入菜单名称' }]
      },
      showDialog: true //打开弹框
    }
  },

  methods: {
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
          if(this.fmid)
            this.ruleForm.pid = this.fmid
          
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

  }
}
</script>

