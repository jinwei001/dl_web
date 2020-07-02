<template>
  <!-- <h2>xl巡视计划管理</h2> -->
  <div class="xs-hastitle">
    <el-dialog :visible.sync="showDialog" :title="title" v-dialogDrag :center="true" width="50%" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="required-ruleForm">
        <el-form-item :label="$xl+'名称'" prop="xlid">
          <el-select v-model="ruleForm.xlid" clearable filterable placeholder="请选择" @change='getDlList'>
            <el-option v-for="item in selection.linesSelectArr" :key="item.id" :label="item.lineName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$dl" prop="dlid">
          <el-select v-model="ruleForm.dlid" clearable placeholder="请选择">
            <el-option v-for="item in selection.dlSelectArr" :key="item.id" :label="item.logicCableStageName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$dydj" prop="dydj">
          <el-select v-model="ruleForm.dydj" disabled placeholder="请选择">
            <el-option v-for="item in selection.dySelectArr" :key="item.kv" :label="item.kv" :value="item.kv"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="带电检测类型：" prop="ddjclx">
          <el-select v-model="ruleForm.ddjclxIndex" clearable placeholder="请选择" @change='getSblxList'>
            <el-option v-for="(item,ind) in selection.ddjcArr" :key="ind" :label="item" :value="ind"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="设备类型：" prop="sblx">
          <el-select v-model="ruleForm.sblx" clearable placeholder="请选择" @change='getSbmcList'>
            <el-option v-for="(item,ind) in selection.jcsblxArr" :key="ind" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="提前预警天数：" prop="tqyjts">
          <el-input v-model="ruleForm.tqyjts" clearable @input.native='period' />
        </el-form-item>
        <el-form-item label="检测周期:" prop="jczq">
          <el-input v-model="ruleForm.jczq" clearable @input.native='period' />
        </el-form-item>
        <el-form-item label="周期单位:" prop="dw">
          <el-select v-model="ruleForm.dw" clearable placeholder="请选择">
            <el-option v-for="(item,ind) in dwArr" :key="ind" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检测班组:" prop="jcbz">
          <el-select v-model="ruleForm.jcbz" clearable placeholder="请选择" @change='getJcrList'>
            <el-option v-for="item in selection.jcbzSelectArr" :key="item.groupname" :label="item.groupname" :value="item.groupname"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检测人:" prop="jcr">
          <el-select v-model="ruleForm.jcr" clearable placeholder="请选择">
            <el-option v-for="item in jcrSelectArr" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检测单位:" prop="jcdw">
          <el-input v-model="ruleForm.jcdw" clearable />
        </el-form-item>
        <el-form-item v-if="isEdit" label="调整原因:" prop="tzyy" style='width:100%'>
          <el-input type="textarea" v-model="ruleForm.tzyy" clearable style="min-height: 150px;" />
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
import AddLine from './AddLine'
import {
  dlSelect,
  jcbzSelect,
  jcrSelect,
  cycleAdd as add,
  cycleEdit as edit,
  cycleList as detail,
  plangetSb // 获取 设备名称
} from '@/api/liveDetectionManage'

export default {
  components: {
    AddLine
  },

  props: {
    selection: {},
    title: '',
    /**
     * 接收是否打开页面
     */
    openID: '',
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var checkTzyy = (rule, value, callback) => {
      if (!value && this.isEdit) {
        return callback(new Error('调整原因不能为空'))
      }
      callback()
    }
    return {
      isShowDialog: false,
      ddjc_sb_arr: {
        sb: [
          [this.$dl+'终端', this.$dl+'接头', this.$dl+'分支箱', '接地箱'],
          [this.$dl+'终端', this.$dl+'接头', '交叉互联箱', '接地箱'],
          [this.$dl+'终端', this.$dl+'接头']
        ]
      },
      dwArr: ['年', '半年', '季', '月', '周', '天'],
      jcrSelectArr: [], // 检测人
      ruleForm: {
        xlid: '', // xl
        dlid: '', // dl
        dydj: '', // 电压
        ddjclxIndex: '', // 带电检测类型
        sblx: '', // 设备类型
        tqyjts: '', // 提前预警天数
        jczq: '', // 检测周期
        dw: '', // 单位
        jcbz: '', // 检测班组
        jcr: '', // 检测人
        jcdw: '', // 检测单位
        tzyy: ''
      },
      rules: {
        tzyy: [{ validator: checkTzyy, trigger: 'blur' }],
        xlid: [{ required: true, message: '请选择'+this.$xl, trigger: 'change' }],
        dlid: [{ required: true, message: '请选择'+this.$dl, trigger: 'change' }],
        dydj: [
          { required: true, message: '请选择'+this.$dydj, trigger: 'change' }
        ],
        ddjclxIndex: [
          { required: true, message: '请选择检测类型', trigger: 'change' }
        ],

        sblx: [
          { required: true, message: '请选择设备类型', trigger: 'change' }
        ],

        jczq: [
          { required: true, message: '请输入检测周期', trigger: 'change' }
        ],
        dw: [{ required: true, message: '请选择检测周期', trigger: 'change' }]
      },
      showDialog: true //打开弹框
    }
  },
  created() {
    if (this.isEdit)
      detail({ id: this.openID })
        .then(res => {
          let resFormData = res.data.rows[0].detectionCycle
          let indexNum = this.selection.ddjcArr.indexOf(resFormData.ddjclx)
          this.ruleForm = {
            xlid: resFormData.xlid,
            dlid: resFormData.dlid,
            dydj: resFormData.dydj,
            ddjclxIndex: indexNum,
            sblx: resFormData.sblx,
            tqyjts: resFormData.tqyjts,
            jczq: resFormData.jczq,
            dw: resFormData.dw,
            jcbz: resFormData.jcbz,
            jcr: resFormData.jcr,
            jcdw: resFormData.jcdw,
          }
          //console.log(this.ruleForm)
          return dlSelect({ lineId: resFormData.xlid })
        })
        .then(res => {
          // dl
          this.selection.dlSelectArr = res.data.rows
          // 获取设备类型
          this.selection.jcsblxArr = this.ddjc_sb_arr.sb[
            this.ruleForm.ddjclxIndex
          ]

          jcrSelect(this.ruleForm.jcbz).then(res => {
            // dl

            this.jcrSelectArr = res.data.data
          })

          plangetSb({
            xlid: this.ruleForm.xlid,
            sblx: this.ruleForm.sblx
          }).then(
            // 设备列表
            res => {
              // 设备名称 plangetSb
              this.selection.sbmcArr = res.data.data
            },
            () => {
              this.selection.sbmcArr = []
            }
          )
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
    /** xl change 获取dl */
    getDlList(lineId) {
      if (!!this.ruleForm.sblx && !!this.ruleForm.xlid) {
        plangetSb({ xlid: lineId, sblx: this.ruleForm.sblx }).then(
          res => {
            //console.log(res)
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
      dlSelect({ lineId }).then(res => {
        // dl
        let dydl = this.selection.linesSelectArr.filter(res => {
          if (res.id == this.ruleForm.xlid) {
            return res
          }
        })
        this.ruleForm.dydj = dydl[0]['voltageRank']
        this.selection.dlSelectArr = res.data.rows
        this.ruleForm.dlid = ''
      })

      // 获取设备名称
    },
    /** 带电检测类型change 获取设备类型 */
    getSblxList(ind) {
      this.selection.jcsblxArr = this.ddjc_sb_arr.sb[ind]
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
    getSbmcList(ind) {
      this.ruleForm.sbmc = ''

      if (!!this.ruleForm.sblx && !!this.ruleForm.xlid) {
        plangetSb({ xlid: this.ruleForm.xlid, sblx: ind }).then(res => {
          // 设备名称 plangetSb
          this.selection.sbmcArr = res.data.data
        })
      } else {
        this.selection.sbmcArr = []
        this.ruleForm.sbmc = ''
      }
    },
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
          let xlmc = null
          let lineNameArr = this.selection.linesSelectArr.filter(res => {
            return res.id == this.ruleForm.xlid
          })

          let [{ logicCableStageName }] = this.selection.dlSelectArr.filter(
            res => {
              return res.id == this.ruleForm.dlid
            }
          )
          // this.ruleForm.ddjclx = this.selection.ddjcArr[this.ruleForm.ddjclx]
          let ddjclx = this.selection.ddjcArr[this.ruleForm.ddjclxIndex]
          xlmc = lineNameArr[0]['lineName']
          if (!this.isEdit) {
            add({
              ...this.ruleForm,
              xlmc,
              ddjclx,
              dlmc: logicCableStageName
            }).then(res => {
              let val = res.data
              let type = val.code == 0 ? 'success' : 'error'
              this.$message({ type, message: val.msg })
              if (val.code == 0)
                this.$emit('childFn', {
                  showDialog: false
                })
            })
          } else {
            let formObj = {}
            for (let key in this.ruleForm) {
              if (key != 'ddjclxIndex' && key != 'tzyy') {
                formObj['detectionCycle.' + key] = this.ruleForm[key]
              }
            }
            formObj.tzyy = this.ruleForm.tzyy
            formObj['detectionCycle.id'] = this.openID
            formObj['detectionCycle.xlmc'] = xlmc
            formObj['detectionCycle.ddjclx'] = ddjclx
            formObj['detectionCycle.dlmc'] = logicCableStageName
            edit(formObj).then(res => {
              let val = res.data
              let type = val.code == 0 ? 'success' : 'error'
              this.$message({ type, message: val.msg })
              if (val.code == 0)
                this.$emit('childFn', {
                  showDialog: false
                })
            })
          }
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
