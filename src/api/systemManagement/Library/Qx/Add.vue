<template>
  <div class="xs-hastitle">
    <el-dialog :visible.sync="showDialog" :title="title" v-dialogDrag :center="true" width="50%" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="required-ruleForm">
        <el-form-item label="部件：">
          <el-input v-model="ruleForm.bj" />
        </el-form-item>
        <el-form-item label="部位：">
          <el-input v-model="ruleForm.bw" />
        </el-form-item>
        <el-form-item label="判断依据：" prop="decideBasis">
          <el-input v-model="ruleForm.decideBasis" />
        </el-form-item>
        <el-form-item label="缺陷等级：" prop="qxGrade">
          <el-select v-model="ruleForm.qxGrade" clearable placeholder="请选择">
            <el-option label="一般" value="一般"></el-option>
            <el-option label="危急" value="危急"></el-option>
            <el-option label="严重" value="严重"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="巡视内容：" prop="xsContent">
          <el-input v-model="ruleForm.xsContent" />
        </el-form-item>
        <el-form-item label="六防类型：" prop="sixType">
          <el-select v-model="ruleForm.sixType" clearable placeholder="请选择">
            <el-option v-for="(item,ind) in selection.lfTypeArr" :key="ind" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态量名称：" prop="statusName">
          <el-input v-model="ruleForm.statusName" />
        </el-form-item>
        <el-form-item label="劣化程度：" prop="degradateDegree">
          <el-input v-model="ruleForm.degradateDegree" />
        </el-form-item>
        <el-form-item label="基本扣分：" prop="basicPoint">
          <el-input v-model="ruleForm.basicPoint" />
        </el-form-item>
        <el-form-item label="权重系数：" prop="weight">
          <el-input v-model="ruleForm.weight" />
        </el-form-item>
        <el-form-item label="缺陷描述：" prop="qxDes" style="width:100%">
          <el-input type="textarea" size="medium" v-model="ruleForm.qxDes" />
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
import { qxAdd as add, qxEdit as edit } from '@/api/systemManagement'

export default {
  props: {
    selection: {},
    title: {
      type: String,
      default: '新增标准缺陷库'
    },
    /**
     * 接收是否打开页面
     */
    thisDetail: {}
  },
  data() {
    return {
      ruleForm: {
        bj: '', //
        bw: '', //
        decideBasis: '', // 判断依据
        qxGrade: '', // 缺陷等级
        xsContent: '', // 巡视内容
        sixType: '', // 六防类型
        statusName: '', // 状态量名称
        degradateDegree: '', // 劣化程度
        basicPoint: '', // 基本扣分
        weight: '', // 权重系数
        qxDes: '' // 缺陷描述
      },
      rules: {},
      showDialog: true //打开弹框
    }
  },
  created() {
    if (Object.keys(this.thisDetail).length != 0) {
      let {
        bj,
        bw,
        decideBasis,
        qxGrade,
        xsContent,
        sixType,
        statusName,
        degradateDegree,
        basicPoint,
        weight,
        qxDes
      } = this.thisDetail
      this.ruleForm.bj = bj ? bj : ''
      this.ruleForm.bw = bw ? bw : ''
      this.ruleForm.decideBasis = decideBasis ? decideBasis : ''
      this.ruleForm.qxGrade = qxGrade ? qxGrade : ''
      this.ruleForm.xsContent = xsContent ? xsContent : ''
      this.ruleForm.sixType = sixType ? sixType : ''
      this.ruleForm.statusName = statusName ? statusName : ''
      this.ruleForm.degradateDegree = degradateDegree ? degradateDegree : ''
      this.ruleForm.basicPoint = basicPoint ? basicPoint : ''
      this.ruleForm.weight = weight ? weight : ''
      this.ruleForm.qxDes = qxDes ? qxDes : ''
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

