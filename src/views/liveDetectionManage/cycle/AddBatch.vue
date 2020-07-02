<template>
  <!-- <h2>xl 巡视计划管理</h2> -->
  <div class="xs-hastitle">
    <el-dialog :visible.sync="showDialog" title="批量新增" v-dialogDrag :center="true" :before-close="handleClose">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="required-ruleForm thr">
        <el-form-item label="带电检测类型：" prop="ddjclx">
          <el-select v-model="ruleForm.ddjclx" clearable placeholder="请选择" @change='getSblxList'>
            <el-option v-for="(item,ind) in selection.ddjcArr" :key="ind" :label="item" :value="ind"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="检测设备类型：" prop="sblx">
          <el-select v-model="ruleForm.sblx" clearable placeholder="请选择">
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
          <el-input v-model="ruleForm.jcdw" clearable/>
        </el-form-item>
        <div></div>
      </el-form>

      <el-form ref="dataForm" label-position="left" style="width:100% ;margin: 0 auto;">
        <div class="btn-center">
          <el-form>
            <el-col>
              <el-form-item>
                <el-button class="onSearch" @click="SearchChanelFn">选择{{$xl}}</el-button>
                <el-button type="danger" plain @click="del" style="margin-right: 0">删除{{$xl}}</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </div>

        <div class="table">
          <div class="table">
            <el-table height="200" :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}" :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}" border fit highlight-current-row @selection-change="CheckFun">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
              <el-table-column prop="lineName" :label="$xl+'名称'"></el-table-column>
              <el-table-column prop="dlmc" :label="$dl+'段'"></el-table-column>
              <el-table-column prop="qqd" label="起讫点"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
    <div v-if="isShowDialog">
      <AddLine :selection='selection' @childFn="parentFn" @setLine='getLine' />
    </div>
  </div>
</template>

<script>
import '@/styles/myStyle/index.scss'
import AddLine from './AddLine'
import {
  dlSelect,
  jcbzSelect,
  jcrSelect,
  batchAdd as add
} from '@/api/liveDetectionManage'
export default {
  components: {
    AddLine
  },

  props: {
    selection: {}
  },
  data() {
    return {
      tableSelect: [],
      tableData: [],
      showDialog: true,
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
        ddjclx: '', // 带电检测类型
        sblx: '', // 设备类型
        tqyjts: '', // 提前预警天数
        jczq: '', // 检测周期
        dw: '', // 单位
        jcbz: '', // 检测班组
        jcr: '', // 检测人
        jcdw: '' // 检测单位
      },
      rules: {
        ddjclx: [
          { required: true, message: '请选择检测类型', trigger: 'change' }
        ],

        sblx: [
          { required: true, message: '请选择设备类型', trigger: 'change' }
        ],

        jczq: [
          { required: true, message: '请输入检测周期', trigger: 'change' }
        ],
        dw: [{ required: true, message: '请选择检测周期', trigger: 'change' }]
      }
    }
  },

  methods: {
    getLine(e) {
      let commitData = []
      let chosedata = JSON.parse(JSON.stringify(e.lines))
      chosedata.forEach(getData => {

        if (getData.dls.length == 0) {
          commitData.push({...getData,xlmc:getData.lineName,xlid:getData.id,dydj:getData.voltageRank})
        } else {
          getData.dls.forEach(dl => {
            getData.options.forEach(opt => {
              let lineArr = getData

              if (dl == opt.dlid) {
                commitData.push({ ...lineArr, dlmc: opt.dlmc , dlid: opt.dlid,xlmc:getData.lineName,xlid:getData.id,dydj:getData.voltageRank})
              }
            })
          })
        }
      })
      this.tableData = commitData
    },

    /** 带电检测类型change 获取设备类型 */
    getSblxList(ind) {
      this.selection.jcsblxArr = this.ddjc_sb_arr.sb[ind]
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
            showDialog: this.showDialog,
            editbtn: this.editbtn,
            addbtn: this.addbtn
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

          // 获取带电检测的 name
          this.ruleForm.ddjclx = this.selection.ddjcArr[this.ruleForm.ddjclx]
          let selectData = JSON.parse(JSON.stringify(this.tableData))

          let list = []
          selectData.forEach(res => {
            delete res.dls;
            delete res.options;
            list.push({ ...res, ...this.ruleForm })

          })
//console.log(list)
          let formdataObj = {}
          list.forEach((response, ind) => {
            for (let key in response) {
              formdataObj['list[' + ind + '].' + key] = response[key]
            }
          })
          add(formdataObj).then(res => {
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
    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val
    },
    parentFn(val) {
      this.isShowDialog = false
    },
    /**选择通道按钮 */
    SearchChanelFn() {
      this.isShowDialog = true
    },
    /**删除通道按钮 */
    del(ids) {
      var selectIndArr = []
      this.tableData.forEach((v, i) => {
        this.CheckedSelection.forEach((val, ind) => {
          if (v.id == val.id) {
            selectIndArr.push(i)
          }
        })
      })
      for (let a = selectIndArr.length - 1; a >= 0; a--) {
        this.tableSelect.splice(selectIndArr[a], 1)
        this.tableData.splice(selectIndArr[a], 1)
      }
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
    /** 查询 */
    onSearchTdFn() {},

    /** 选中数据 子*/
    CheckTdFun(val) {
      this.selectCheckTd = val
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
