<template>
  <!-- <h2>
      xl巡视周期管理-新增
  </h2>-->
  <div class="hastitle">
    <el-dialog :visible.sync="showDialog" title="通道巡视周期管理" v-dialogDrag :center="true" :before-close="handleClose">

      <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="required-ruleForm">
        <el-form-item label="周期:" prop="zq">
          <el-input v-model="ruleForm.zq" clearable @input.native='period' />
        </el-form-item>
        <el-form-item label="周期单位:" prop="dw">
          <el-select v-model="ruleForm.dw" clearable placeholder="请选择">
            <el-option v-for="(item,ind) in dwArr" :key="ind" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上次巡视时间：" prop="scxssj">
          <el-date-picker v-model="ruleForm.scxssj" type="date" placeholder="选择日期时间" value-format='yyyy-MM-dd HH:mm:ss'>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注：" prop="bz">
          <el-input v-model="ruleForm.bz" clearable />
        </el-form-item>
        <el-form-item label="要求：" prop="yq">
          <el-input v-model="ruleForm.yq" clearable />
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
import { PatrolCycleManagementBactchEdit as batchedit } from '@/api/patrolmanagement'
import '@/styles/myStyle/index.scss'
export default {
  props: {
    /**打开页面的id */
    batchId: {
      default: null
    },
    selection: {}
  },
  data() {
    return {
      showDialog: true,
      CheckedSelection: [],
      dwArr: ['年', '半年', '季', '月', '周', '天'],
      ruleForm: {
        zq: '',
        dw: '',
        bz: '',
        scxssj: '',
        yq: ''
      },
      rules: {
        zq: [{ required: true, message: '请输入周期（天）', trigger: 'blur' }],
        dw: [{ required: true, message: '请选择周期单位', trigger: 'blur' }],
        scxssj: [
          { required: true, message: '请选择上次巡视时间', trigger: 'change' }
        ]
      },

      form: {
        masterId: '',
        id: ''
        // pageNum: 1,
        // pageSize: 10
      },
      searchForm: {
        masterId: '',
        id: ''
      },

      // pageDetail: {
      //   total: 0
      // },
      tabisoverflow: true,
      //表头

      tableData: []
    }
  },

  methods: {
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
    /**查询按钮 */
    onSearch() {
      for (let key in this.form) {
        this.searchForm[key] = this.form[key]
      }
    },
    /**重置按钮 */
    reset() {
      this.form = {
        masterId: '',
        id: ''
      }
    },
    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val
      //console.log(this.CheckedSelection)
    },
    getList() {},
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
          batchedit({ids:this.batchId,...this.ruleForm}).then(res => {
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
<style scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.el-select {
    width: 100%;
}
</style>
