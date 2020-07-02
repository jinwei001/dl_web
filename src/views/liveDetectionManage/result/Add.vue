<template>
  <!-- <h2>xl巡视计划管理</h2> -->
  <div class="xs-hastitle">
    <el-dialog :visible.sync="showDialog" :title="title" v-dialogDrag :center="true" width="50%" :before-close="handleClose">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="required-ruleForm">
        <el-form-item :label="`${$xl}名称：`" prop="xlmc">
          <el-input v-model="ruleForm.xlmc" disabled="" />
        </el-form-item>
        <el-form-item :label="`${$dl}：`" prop="dlmc">
          <el-input v-model="ruleForm.dlmc" disabled="" />
        </el-form-item>
        <el-form-item label="设备名称：" prop="sbmc">
          <el-input v-model="ruleForm.sbmc" disabled="" />
        </el-form-item>
        <el-form-item label="检测类型：" prop="jclx">
          <el-input v-model="ruleForm.jclx" disabled="" />
        </el-form-item>
        <el-form-item :label="`${$xb}:`" prop="xw">
          <el-input v-model="ruleForm.xw" disabled="" />
        </el-form-item>
        <el-form-item label="检测时间：" prop="jcsj">
          <el-date-picker type="date" placeholder="请选择" v-model="ruleForm.jcsj" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="负责人:" prop="fzr">
          <el-input v-model="ruleForm.fzr" />
        </el-form-item>

        <el-form-item label="执行结果:" prop="zxjg">
          <el-select v-model="ruleForm.zxjg" placeholder="请选择">
            <el-option label="请选择" value=""></el-option>
            <el-option label="未执行" value="未执行"></el-option>
            <el-option label="执行中" value="执行中"></el-option>
            <el-option label="已执行" value="已执行"></el-option>
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
import '@/styles/myStyle/index.scss'

import {
  dlSelect,
  jcbzSelect,
  jcrSelect,
  plangetSb, // 获取 设备名称
  resultEdit as edit,
  resultList as detail
} from '@/api/liveDetectionManage'

export default {
  props: {
    selection: {},
    title: '',
    /**
     * 接收是否打开页面
     */
    openID: ''
  },
  data() {
    return {
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate(),
      isShowDialog: false,
      ddjc_sb_arr: {
        sb: [
          [this.$dl+'终端', this.$dl+'接头', this.$dl+'分支箱', '接地箱'],
          [this.$dl+'终端', this.$dl+'接头', '交叉互联箱', '接地箱'],
          [this.$dl+'终端', this.$dl+'接头']
        ]
      },
      jcrSelectArr: [], // 检测人
      ruleForm: {
        xlmc: '', // xl
        dlmc: '', // dl
        sbmc: '', // 设备名称
        xw: '', // xb
        jclx: '', // 检测类型
        jcsj: '', // 检测时间
        fzr: '', // 负责人
        zxjg: '' // 执行结果
      },
      rules: {
        jcsj: [
          { required: true, message: '请选择检测时间', trigger: 'change' }
        ],

        fzr: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
        zxjg: [{ required: true, message: '请选择执行结果', trigger: 'change' }]
      },
      showDialog: true //打开弹框
    }
  },
  created() {
    detail({ id: this.openID }).then(res => {
      let resFormData = res.data.rows[0]
      this.ruleForm = {
        xlmc: resFormData.xlmc, // xl
        dlmc: resFormData.dlmc, // dl
        xw: resFormData.xw, // xb
        sbmc: resFormData.sbmc, // 设备名称
        jclx: resFormData.jclx, // 检测类型
        fzr: resFormData.fzr, // 负责人
        zxjg: resFormData.zxjg, // 检测单位
        jcsj: resFormData.jcsj // 检测单位
      }
    })
  },
  methods: {
    getLine(e) {
      this.tableData = e.lines
      this.tableSelect = []

      for (let n = 0; n < this.tableData.length; n++) {
        this.tableSelect.push({
          patrolCycle: '',
          patrolType: '',
          lastPlanTime: ''
        })
      }
    },
    /** ${$xl} change 获取dl */
    getDlList(lineId) {
      let dydl = this.selection.linesSelectArr.filter(res => {
        if (res.id == this.ruleForm.xlid) {
          return res
        }
      })

      this.ruleForm.dydj = dydl[0]['designVoltageRank']
      dlSelect({ lineId }).then(res => {
        // dl
        this.selection.dlSelectArr = res.data.rows
        this.ruleForm.dlid = ''
      })
      this.ruleForm.sbmc = ''
      if (!!this.ruleForm.sblx && !!this.ruleForm.xlid) {
        plangetSb({ xlid: lineId, sblx: this.ruleForm.sblx }).then(
          res => {
            // 设备名称 plangetSb
            this.selection.sbmcArr = res.data.data
          },
          () => {
            this.selection.sbmcArr = []
          }
        )
      } else {
        this.selection.sbmcArr = []
      }
    },
    /** dl change 获取xb */
    setXw() {
      let xwdl = this.selection.dlSelectArr.filter(res => {
        if (res.id == this.ruleForm.dlid) {
          return res
        }
      })
      this.ruleForm.xw = xwdl[0]['phase']
    },
    /** 带电检测类型change 获取设备类型 */
    getSblxList(ind) {
      this.ruleForm.sbmc = ''

      if (!!this.ruleForm.sblx && !!this.ruleForm.xlid) {
        plangetSb({ xlid: this.ruleForm.xlid, sblx: ind }).then(res => {
          // 设备名称 plangetSb
          this.selection.sbmcArr = res.data.data
        })
      } else {
        this.selection.sbmcArr = []
      }
    },

    /** 检测班组 获取 检测人 */
    getJcrList(groupname) {
      this.ruleForm.jcr = null
      jcrSelect(groupname).then(res => {
        // dl

        this.jcrSelectArr = res.data.data
      })
    },
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
          edit({ ...this.ruleForm, id: this.openID }).then(res => {
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
    periodperiod(e) {
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
