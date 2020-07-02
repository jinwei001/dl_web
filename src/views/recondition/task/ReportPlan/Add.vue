<template>
  <div class="xs-hastitle">
    <el-dialog :visible.sync="showDialog" title="新增" v-dialogDrag :center="true" width="50%" :before-close="handleClose">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="required-ruleForm">
        <el-form-item :label="`编制人：`" prop="xlid">
          <el-select v-model="ruleForm.xlid" clearable filterable placeholder="请选择" @change='getDlList' :disabled="oldPlanstarts">
            <el-option v-for="item in selection.linesSelectArr" :key="item.id" :label="item.lineName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="`检修线路：`" prop="dlid">
          <el-select v-model="ruleForm.dlid" clearable placeholder="请选择" @change='setXw' :disabled="oldPlanstarts">
            <el-option v-for="item in selection.dlSelectArr" :key="item.id" :label="item.logicCableStageName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="`工作班组：`" prop="dydj" :disabled="oldPlanstarts">
          <el-select v-model="ruleForm.dydj" placeholder="请选择">
            <el-option v-for="item in selection.dySelectArr" :key="item.kv" :label="item.kv" :value="item.kv"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="`是否停电:`" prop="xw">
          <el-select v-model="ruleForm.dydj" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划天数：" prop="sblx">
          <el-input v-model="ruleForm.jcdw" />
        </el-form-item>
        <el-form-item label="计划开始时间：" prop="sbmc">
          <el-date-picker type="date" placeholder="开始时间" v-model="ruleForm.jhkssj" :picker-options="startDatePicker" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="计划结束时间：" prop="jclx">
          <el-date-picker type="date" placeholder="开始时间" v-model="ruleForm.jhkssj" :picker-options="startDatePicker" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="是否带电作业:" prop="jhly">
          <el-select v-model="ruleForm.dydj" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否委外：" prop="jhkssj">
          <el-select v-model="ruleForm.dydj" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调度管辖：" prop="jhjssj">
          <el-date-picker type="date" placeholder="结束时间" v-model="ruleForm.jhjssj" :picker-options="endDatePicker" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="工作分类:" prop="jcbz">
          <el-select v-model="ruleForm.jcbz" clearable placeholder="请选择" @change='getJcrList'>
            <el-option v-for="item in selection.jcbzSelectArr" :key="item.groupname" :label="item.groupname" :value="item.groupname"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:" prop="jcr">
          <el-select v-model="ruleForm.jcr" clearable placeholder="请选择">
            <el-option v-for="item in jcrSelectArr" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否有送电方案:" prop="jcdw">
         <el-select v-model="ruleForm.dydj" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作类型:" prop="jcdw">
          <el-select v-model="ruleForm.dydj" placeholder="请选择">
          </el-select>
        </el-form-item>
        <el-form-item label="计划性质 :" prop="jcdw">
          <el-select v-model="ruleForm.dydj" placeholder="请选择">
          </el-select>
        </el-form-item>
        <el-form-item label="计划停电开始时间:" prop="jcdw">
          <el-date-picker type="date" placeholder="开始时间" v-model="ruleForm.jhkssj" :picker-options="startDatePicker" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="计划停电结束时间:" prop="jcdw">
          <el-date-picker type="date" placeholder="开始时间" v-model="ruleForm.jhkssj" :picker-options="startDatePicker" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="大修技改项目编号:" prop="jcdw">
          <el-input v-model="ruleForm.jcdw" />
        </el-form-item>
        <el-form-item label="工作内容:" prop="jcdw">
          <el-input v-model="ruleForm.jcdw" />
        </el-form-item>
        <el-form-item label="停电范围:" prop="jcdw">
          <el-input v-model="ruleForm.jcdw" />
        </el-form-item>
        <el-form-item label="复役要求:" prop="jcdw">
          <el-input v-model="ruleForm.jcdw" />
        </el-form-item>
        <el-form-item label="计划新增调整原因:" prop="jcdw">
          <el-input v-model="ruleForm.jcdw" />
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
  planAdd as add,
  planEdit as edit,
  planList as detail
} from '@/api/liveDetectionManage'

export default {
  props: {
    selection: {},
    title: '新增',
    /**
     * 接收是否打开页面
     */
    openID: '',
    isEdit: {
      type: Boolean,
      default: false
    },
    oldobjplanpn: {
      //老旧来源参数
      type: Object,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate(),
      isShowDialog: false,
      ddjc_sb_arr: {
        sb: [
          [this.$dl + '终端', this.$dl + '接头', this.$dl + '分支箱', '接地箱'],
          [this.$dl + '终端', this.$dl + '接头', '交叉互联箱', '接地箱'],
          [this.$dl + '终端', this.$dl + '接头']
        ]
      },
      dwArr: ['年', '半年', '季', '月', '周', '天'],
      jcrSelectArr: [], // 检测人
      ruleForm: {
        xlid: '', // xl
        dlid: '', // dl
        dydj: '', // 电压

        xw: '', // xb
        sblx: '', // 设备类型
        sbmc: '', // 设备名称
        jclx: '', // 检测类型
        jhly: '', // 计划来源
        jhkssj: '', // 开始时间
        jhjssj: '', // 结束时间
        jcbz: '', // 检测班组
        jcr: '', // 检测人
        jcdw: '' // 检测单位
      },
      rules: {
        xlid: [
          { required: true, message: '请选择' + this.$xl, trigger: 'change' }
        ],
        dlid: [
          { required: true, message: '请选择' + this.$dl, trigger: 'change' }
        ],
        ddjclxIndex: [
          { required: true, message: '请选择检测类型', trigger: 'change' }
        ],
        sblx: [
          { required: true, message: '请选择设备类型', trigger: 'change' }
        ],
        sbmc: [
          { required: true, message: '请选择设备名称', trigger: 'change' }
        ],
        jclx: [
          { required: true, message: '请选择检测类型', trigger: 'change' }
        ],
        jhly: [
          { required: true, message: '请选择计划来源', trigger: 'change' }
        ],
        jhkssj: [
          { required: true, message: '请选择开始时间', trigger: 'blur' }
        ],
        jhjssj: [
          { required: true, message: '请选择结束时间', trigger: 'blur' }
        ],
        jcbz: [
          { required: true, message: '请选择检测班组', trigger: 'change' }
        ],
        jcr: [{ required: true, message: '请选择检测人', trigger: 'change' }]
        // jcdw: [{ required: true, message: '请输入检测单位', trigger: 'change' }]
      },
      showDialog: true, //打开弹框
      oldPlanstarts: false
    }
  },
  created() {
    //console.log(this.oldobjplanpn)
    //判断是否老旧分析来源
    if (Object.keys(this.oldobjplanpn).length > 0) {
      this.oldPlanstarts = true
      this.ruleForm.xlid = this.oldobjplanpn.lineId
      this.getDlList(this.ruleForm.xlid)
      let self = this // 当前this指向的是一个组件
      setTimeout(function() {
        self.ruleForm.dlid = self.oldobjplanpn.logiccableId
        self.ruleForm.dydj = self.oldobjplanpn.voltageRank
        self.setXw()
      }, 1000) //   function 里面的this指向的是windows
      this.ruleForm.jhly = '老旧'
    }
    if (this.isEdit)
      detail({ id: this.openID })
        .then(res => {
          let resFormData = res.data.rows[0]
          // let indexNum = this.selection.ddjcArr.indexOf(resFormData.ddjclx)
          this.ruleForm = {
            xlid: resFormData.xlid, // xl
            dlid: resFormData.dlid, // dl
            dydj: resFormData.dydj, // 电压

            xw: resFormData.xw, // xb
            sblx: resFormData.sblx, // 设备类型
            sbmc: resFormData.sbmc, // 设备名称
            jclx: resFormData.jclx, // 检测类型
            jhly: resFormData.jhly, // 计划来源
            jhkssj: resFormData.jhkssj, // 开始时间
            jhjssj: resFormData.jhjssj, // 结束时间
            jcbz: resFormData.jcbz, // 检测班组
            jcr: resFormData.jcr, // 检测人
            jcdw: resFormData.jcdw // 检测单位
          }

          return dlSelect({ lineId: resFormData.xlid })
        })
        .then(res => {
          // dl
          this.selection.dlSelectArr = res.data.rows
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

          jcrSelect(this.ruleForm.jcbz).then(res => {
            // dl

            this.jcrSelectArr = res.data.data
          })
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
      let dydl = this.selection.linesSelectArr.filter(res => {
        if (res.id == this.ruleForm.xlid) {
          return res
        }
      })
      this.ruleForm.dydj = dydl[0] ? dydl[0]['voltageRank'] : ''
      if (!dydl[0]) {
        this.selection.dlSelectArr = []
        this.selection.sbmcArr = []
        this.ruleForm.dlid = ''
        this.ruleForm.sbmc = ''
        return
      }

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

    /** dl change 获xb */
    setXw() {
      let xwdl = this.selection.dlSelectArr.filter(res => {
        if (res.id == this.ruleForm.dlid) {
          return res
        }
      })
      this.ruleForm.xw = xwdl[0] ? xwdl[0]['phase'] : ''
    },
    /** 设备类型  change 获取设备名称 */
    getSblxList(ind) {
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
            edit({ ...this.ruleForm, id: this.openID }).then(res => {
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
