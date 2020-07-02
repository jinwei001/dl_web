<template>
  <div class="xs-hastitle">
    <el-dialog :visible.sync="showDialog" :title="title" v-dialogDrag :center="true" width="30%" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="required-ruleForm">
        <el-form-item label="大类别：" prop="dlb" style="width:100%">
          <el-input v-model="ruleForm.dlb" />
        </el-form-item>
        <el-form-item label="项目审查：" prop="xlb" style="width:100%">
          <el-input v-model="ruleForm.xlb" />
        </el-form-item>
        <el-form-item label="阶段：" prop="jdid" style="width:100%">
          <el-select v-model="ruleForm.jdid" clearable placeholder="请选择">
            <el-option v-for='item in selection.jdArr' :key="item.jdid" :label="item.jd" :value="item.jdid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审查内容：" prop="nr" style="width:100%">
          <el-input type="textarea" size="medium" v-model="ruleForm.nr" />
        </el-form-item>
        <el-form-item label="管控类型：" prop="cardtype" style="width:100%">
          <el-input size="medium" v-model="ruleForm.cardtype" />
        </el-form-item>
        <el-form-item label="施工验收：" prop="sgys" style="width:100%">
          <el-select v-model="ruleForm.sgys" clearable placeholder="请选择">
            <el-option label="施工" value="施工"></el-option>
            <el-option label="验收" value="验收"></el-option>
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
import { xmAdd as add, xmEdit as edit } from '@/api/systemManagement'

export default {
  props: {
    selection: {},
    title: {
      type: String,
      default: '新增国网工艺库'
    },
    thisDetail: {}
  },
  data() {
    return {
      ruleForm: {
        dlb: '',
        xlb: '',
        jdid: '',
        nr: '',
        cardtype: '',
        sgys: ''
      },
      rules: {
         dlb: [{ required: true, message: '请输入大类别', trigger: 'blue' }],
         xlb: [{ required: true, message: '请输入项目审查', trigger: 'blue' }],
         jdid: [{ required: true, message: '请选择阶段', trigger: 'change' }],
         nr: [{ required: true, message: '请输入审查内容', trigger: 'blue' }],
         cardtype: [{ required: true, message: '请输入管控类型', trigger: 'blue' }],
         sgys: [{ required: true, message: '请选择施工验收', trigger: 'change' }],
      },
      showDialog: true //打开弹框
    }
  },
  created() {
    if (Object.keys(this.thisDetail).length != 0){
        // 编辑当前
      let {dlb,xlb,jdid,nr,cardtype,sgys} = this.thisDetail
       this.ruleForm = {
        dlb: dlb, // xl
        xlb: xlb,
        jdid: jdid?jdid:'',
        nr: nr?nr:'',
        cardtype: cardtype?cardtype:'',
        sgys: sgys?sgys:'',

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
          this.setSelectId([
            {
              selectArr: this.selection.jdArr,
              ruleFormName: 'jd',
              ruleFormId: 'jdid',
              filterName: 'jd',
              filterId: 'jdid'
            }
          ])
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
    },
    setSelectId(setArr) {
      setArr.forEach(element => {
        let arr = element.selectArr.filter(res => {
          return res[element.filterId] == this.ruleForm[element.ruleFormId]
        })
        this.ruleForm[element.ruleFormName] = arr[0][element.filterName]
          ? arr[0][element.filterName]
          : ''
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
    }
  }
}
</script>
