<template>
  <!-- <h2>xl巡视计划管理</h2>-->
  <div class="xs-hastitle">

    <el-dialog :visible.sync="showDialog" title="接地电流检测报告" v-dialogDrag :center="true" width="70%" :before-close="handleClose">

      <el-form :model="ruleForm" ref="ruleForm" label-width="180px" class="required-ruleForm widthThird">
        <el-form-item label="试验单位:" prop="jcdw" style="width:100%">
          <el-input v-model="ruleForm.jcdw" disabled />
        </el-form-item>
        <el-form-item label="检测日期：" prop="jcrq">
          <el-date-picker type="date" placeholder="请选择" v-model="ruleForm.jcrq" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item :label="`${$xl}名称:`" prop="xlmc">
          <el-input v-model="ruleForm.xlmc" disabled />
        </el-form-item>
        <el-form-item :label="`${$dydj}：`" prop="dydj">
          <el-input v-model="ruleForm.dydj" disabled="" />
        </el-form-item>
        <el-form-item :label="`${$dl}${$xl}长度（Km）：`" prop="xlcd">
          <el-input v-model="ruleForm.xlcd" @input.native="period" :disabled='isCheckBg' />
        </el-form-item>
        <el-form-item :label="`${$dl}型号及制造厂家:`" prop="dlxh" style="width:100%">
          <el-input v-model="ruleForm.dlxh"  :disabled='isCheckBg'/>
        </el-form-item>
        <el-form-item label="中间接头型号及制作厂家:" prop="zjjtxh" style="width:100%">
          <el-input v-model="ruleForm.zjjtxh" :disabled='isCheckBg' />
        </el-form-item>
        <el-form-item :label="`${$dl}终端型号及制造厂家:`" prop="dlzdxh" style="width:100%">
          <el-input v-model="ruleForm.dlzdxh"  :disabled='isCheckBg'/>
        </el-form-item>
        <el-form-item label="投运日期：" prop="tyrq">
          <el-date-picker type="date" placeholder="请选择" v-model="ruleForm.tyrq" value-format="yyyy-MM-dd" disabled></el-date-picker>
        </el-form-item>
        <el-form-item label="测试仪器和型号：" prop="clyq">
          <el-input v-model="ruleForm.clyq"  :disabled='isCheckBg'/>
        </el-form-item>
        <div></div>
        <div style="width:100%">
          <el-table :data="ruleForm.jcxx" style="border: 1px solid #c7c7c7;width:100%" :cell-style="{borderColor: '#c7c7c7'}" :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}" border fit highlight-current-row>
            <el-table-column type="index" label="序号" width="60" align="center">
              <template slot-scope="scope">
                <span>{{scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column label="测试地点" align="center" width="100">
              <template slot-scope="scope">
                <el-input v-model="scope.row.cldd"  :disabled='isCheckBg'/>
              </template>
            </el-table-column>
            <el-table-column label="测试日期及具体时间" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.clrq"  :disabled='isCheckBg'/>
              </template>
            </el-table-column>
            <el-table-column label="当前负荷（A）" align="center" width="80">
              <template slot-scope="scope">
                <el-input v-model="scope.row.qdfh" :disabled='isCheckBg' />
              </template>
            </el-table-column>
            <el-table-column label="气温" align="center" width="80">
              <template slot-scope="scope">
                <el-input v-model="scope.row.qw"  :disabled='isCheckBg'/>
              </template>
            </el-table-column>
            <el-table-column label="负责人" align="center" width="80">
              <template slot-scope="scope">
                <el-input v-model="scope.row.fzr"  :disabled='isCheckBg'/>
              </template>
            </el-table-column>
            <el-table-column label="测试设备类型（换位箱/接头接地箱/终端接地箱）" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.cssblx" :disabled='isCheckBg' />
              </template>
            </el-table-column>
            <el-table-column label="接地环流（换位箱：A-C相；接地箱：A相（A）" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.a"  :disabled='isCheckBg'/>
              </template>
            </el-table-column>
            <el-table-column label="接地环流（换位箱：C-B相；接地箱：B相（A）" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.b" :disabled='isCheckBg' />
              </template>
            </el-table-column>
            <el-table-column label="接地环流（换位箱：B-A相；接地箱：C相（A）" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.c" :disabled='isCheckBg' />
              </template>
            </el-table-column>
            <el-table-column label="接地环流（地线）（A）" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.jdhl"  :disabled='isCheckBg'/>
              </template>
            </el-table-column>
            <el-table-column v-if='!isCheckBg' label="" align="center" width="70">
              <template slot-scope="scope">
                <i class="el-icon-circle-close" @click="delcol(scope.$index)"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if='!isCheckBg' class="addmsg" style="width:100%">
          <i class="el-icon-circle-plus" @click="addmsgBtn"></i>
        </div>
      </el-form>

      <el-form :model="ruleForm" ref="ruleForm" label-width="140px" class="required-ruleForm widthThird">

        <el-form-item label="测试结论:" prop="jcdw" style="width:100%">
          <el-input v-model="ruleForm.csjl" />
        </el-form-item>

      </el-form>

      <div v-if='!isCheckBg' slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import '@/styles/myStyle/index.scss'
import { inputResult } from '@/api/liveDetectionManage'

export default {
  props: {
    thisDetail: {},
    isCheckBg: false
  },
  data() {
    return {
      dialogVisible: false,

      isShowDialog: false,

      jcrSelectArr: [], // 检测人
      ruleForm: {
        jcxx: [
          {
            xh: '',
            cldd: '',
            clrq: '',
            qdfh: '',
            qw: '',
            fzr: '',
            cssblx: '',
            a: '',
            b: '',
            c: '',
            jdhl: ''
          }
        ],
        jcrq:'',
        jcdw: '',
        bgrq: '',
        syfzr: '',
        syry: '',
        syrq: '',
        hw: '',
        sd: '',
        xlmc: '',
        dydj: '',
        csyq: '',
        sbmc: '',
        jcwz: '',
        jcdd: '',
        dlcj: '',
        dlxh: '',
        fjcj: '',
        fjlx: '',
        ccrq: '',
        tyrq: '',
        ycxhwz: '',
        bjxh: '',
        pictureList: [],
        apictureList: [],
        bpictureList: [],
        cpictureList: [],
        dpictureList: [],
        epictureList: [],
        jcjgfx: '',
        jy: '',
        clyj: '',
        jcry: '',
        shh: ''
      },

      showDialog: true //打开弹框
    }
  },
  created() {
    if (this.isCheckBg) {
      this.ruleForm = JSON.parse(this.thisDetail.jcjl)
    } else {
      this.ruleForm.jcdw = this.thisDetail.jcdw
      this.ruleForm.syry = this.thisDetail.jcr
      this.ruleForm.xlmc = this.thisDetail.xlmc
      this.ruleForm.sbmc = this.thisDetail.sbmc
      this.ruleForm.dydj = this.thisDetail.dydj
    }
  },
  methods: {
    /**
     * 确认按钮
     */ 
    SuerFun() {
        this.ruleForm.jcxx.forEach((element,ind) => {
          element.xh = ind + 1
        });

      inputResult({ planId: this.thisDetail.id, jcjl: this.ruleForm }).then(
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
    },
    /**
     * 取消按钮
     */
    handleClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('childFn', {
            showDialog: this.showDialog
          })
          done()
        })
        .catch(_ => {})
    },
    /** 添加table行 */
    addmsgBtn() {
      this.ruleForm.jcxx.push({
        xh: '',
        cldd: '',
        clrq: '',
        qdfh: '',
        qw: '',
        fzr: '',
        cssblx: '',
        a: '',
        b: '',
        c: '',
        jdhl: ''
      })
    },
    /** 删除行 */
    delcol(ind) {
      this.ruleForm.jcxx.splice(ind, 1)
    },
    period(e) {
      // 清除"数字"和"."以外的字符
      e.target.value = e.target.value.replace(/[^\d.]/g, '')
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
<style lang="scss" scope>
.el-select {
  width: 100%;
}
.el-date-editor.el-input {
  width: 100%;
}
.el-dialog--center .el-dialog__body {
  z-index: 10000;
}
.el-dialog__wrapper {
  z-index: 3000;
}
.addmsg {
  text-align: center;
  width: 100%;
}
.el-icon-circle-plus,
.el-icon-circle-close {
  font-size: 32px;
  cursor: pointer;
}
.el-icon-circle-close {
  color: #f99;
}
.el-icon-circle-close:hover {
  color: #f55;
}
.el-input.is-disabled .el-input__inner {
  background-color: #fff;
  border-color: #fff;
  color: #777;
  cursor: not-allowed;
}
</style>
