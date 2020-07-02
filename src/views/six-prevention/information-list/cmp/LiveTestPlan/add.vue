<template>
  <!-- <h2>XL巡视计划管理</h2> -->
  <div class="xs-hastitle">
    <el-dialog :visible.sync="showDialog" :title="title" v-dialogDrag :center="true" width="50%" :before-close="handleClose">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="required-ruleForm">
        <el-form-item :label="`${$xl}名称：`" prop="xlid">
          <el-select v-model="ruleForm.xlid" clearable filterable placeholder="请选择" @change='getDlList' disabled>
            <el-option v-for="item in selection.linesSelectArr" :key="item.id" :label="item.lineName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
       
        <el-form-item :label="`${$dl}：`" prop="dlid">
          <el-select v-model="ruleForm.dlid" clearable placeholder="请选择" @change='setXw'>
            <el-option v-for="item in selection.dlSelectArr" :key="item.id" :label="item.logicCableStageName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item :label="`${$dydj}：`" prop="dydj">
          <el-select v-model="ruleForm.dydj" placeholder="请选择" disabled>
            <el-option v-for="item in selection.dySelectArr" :key="item.kv" :label="item.kv" :value="item.kv"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="`${$xb}:`" prop="xw">
          <el-input v-model="ruleForm.xw" disabled="" />
        </el-form-item>
        <el-form-item label="设备类型：" prop="sblx">
          <el-select v-model="ruleForm.sblx" clearable placeholder="请选择" @change='getSblxList'>
            <el-option v-for="(item,ind) in selection.sblxArr" :key="ind" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称：" prop="sbmc">
          <el-select v-model="ruleForm.sbmc" clearable placeholder="请选择">
            <el-option v-for="(item) in selection.sbmcArr" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检测类型：" prop="jclx">
          <el-select v-model="ruleForm.jclx" clearable placeholder="请选择">
            <el-option v-for="(item,ind) in selection.ddjcArr" :key="ind" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划来源:" prop="jhly">
          <el-select v-model="ruleForm.jhly" clearable placeholder="请选择" disabled>
            <el-option v-for="item in selection.jhlyArr" :key="item.bzmc" :label="item.bzmc" :value="item.bzmc"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间：" prop="jhkssj">
          <el-date-picker type="date" placeholder="开始时间" v-model="ruleForm.jhkssj" :picker-options="startDatePicker" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：" prop="jhjssj">
          <el-date-picker type="date" placeholder="结束时间" v-model="ruleForm.jhjssj" :picker-options="endDatePicker" value-format="yyyy-MM-dd"></el-date-picker>
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
  planEdit as edit,
  planList as detail
} from '@/api/liveDetectionManage'
 import {
    planAdd as add,
  } from '@/api/Sixdefensemanagement/Hiddeninformationlist.js'
export default {
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
    },
    objId: {
      type: String,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function() {
        return ''
      }
    },
    lineid: {
      type: String,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function() {
        return ''
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
          [this.$dl+'终端', this.$dl+'接头', this.$dl+'分支处', '接地线'],
          [this.$dl+'终端', this.$dl+'接头', '交叉互联线', '接地线'],
          [this.$dl+'终端', this.$dl+'接头']
        ]
      },
      dwArr: ['年', '半年', '季', '月', '周', '天'],
      jcrSelectArr: [], // 检测人
      ruleForm: {
        
        xlid: this.lineid, // XL
       
        dlid: '', // DL
        dydj: '', // 电压
        xw: '', // xb
        sblx: '', // 设备类型
        sbmc: '', // 设备名称
        jclx: '', // 检测类型
        jhly: '六防', // 计划来源
        jhkssj: '', // 开始时间
        jhjssj: '', // 结束时间
        jcbz: '', // 检测班组
        jcr: '', // 检测人
        jcdw: '' // 检测单位
      },
      rules: {
        xlid: [{ required: true, message: '请选择'+this.$xl, trigger: 'change' }],
    
        dlid: [{ required: true, message: '请选择'+this.$dl, trigger: 'change' }],
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
        jcr: [{ required: true, message: '请选择检测人', trigger: 'change' }],
        jcdw: [{ required: true, message: '请输入检测单位', trigger: 'change' }]
      },
      showDialog: true //打开弹框
    }
  },
  created() {
    //console.log(this.objId)
    this.getDlList(this.lineid)
    if (this.isEdit)
      detail({ id: this.openID })
        .then(res => {
          let resFormData = res.data.rows[0]
          // let indexNum = this.selection.ddjcArr.indexOf(resFormData.ddjclx)
          this.ruleForm = {
           
            xlid: resFormData.xlid, // XL
         
            dlid: resFormData.dlid, // DL
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
   
          // DL
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
            
            // DL

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
      getDlList(lineId) {
      let dydl = this.selection.linesSelectArr.filter(res => {
        if (res.id == this.ruleForm.xlid) {
          return res
        }
      })

      this.ruleForm.dydj = dydl[0]['designVoltageRank']
      dlSelect({ lineId }).then(res => {
        
        // DL
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
    
    /** DLchange 获取xb */
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
       
        // DL

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
              status:0,
              lfid:this.objId,
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


            edit({...this.ruleForm,id:this.openID
              }).then(res => {
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
