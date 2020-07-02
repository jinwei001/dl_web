<template>
  <!-- <h2>xl巡视计划管理</h2> -->
  <div class="xs-hastitle">
    <el-dialog :visible.sync="showDialog" title="通道巡视计划管理" v-dialogDrag :center="true" :before-close="handleClose">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="required-ruleForm thr">
        <!-- <el-form-item label="通道名称:" prop="tdId">
          <el-select v-model="ruleForm.tdId" clearable placeholder="请选择">
            <el-option v-for="item in selection.channelsArr" :key="item.id" :label="item.tdName" :value="item.id"></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="巡视类型:" prop="xslx">
          <el-select v-model="ruleForm.xslx" clearable placeholder="请选择">
            <el-option v-for="item in selection.patrolTypesArr" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="计划巡视日期：" prop="jhxsrq">
          <el-date-picker v-model="ruleForm.jhxsrq" type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" />
        </el-form-item>
        <el-form-item label="运维班组：" prop="xsbzId">
          <el-select v-model="ruleForm.xsbzId" clearable placeholder="请选择" @change="ywbz">
            <el-option v-for="item in selection.groupsArr" :key="item.id" :label="item.groupName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="巡视人：" prop="xsrId">
          <el-select v-model="ruleForm.xsrId" clearable placeholder="请选择">
            <el-option v-for="item in selection.usersArr" :key="item.id" :label="item.username" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划来源：" prop="jhly">
          <el-select v-model="ruleForm.jhly" clearable placeholder="请选择">
            <el-option v-for="item in selection.patrolFromArr" :key="item.id" :label="item.planFrom" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="执行时间：" prop="zxsj">
          <el-date-picker v-model="ruleForm.zxsj" type="date" value-format="yyyy-MM-dd" placeholder="请选择时间" />
        </el-form-item> -->
        <el-form-item label="备注:" prop="bz" style='width:100%'>
          <el-input v-model="ruleForm.bz" clearable />
        </el-form-item>
      </el-form>

      <el-form v-if="!isEdit" ref="dataForm" label-position="left" style="width:100% ;margin: 0 auto;">
        <div class="btn-center">
          <el-form>
            <el-col>
              <el-form-item>
                <el-button class="onSearch" @click="SearchChanelFn">选择通道</el-button>
                <el-button type="danger" plain @click="del" style="margin-right: 0">删除通道</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="Form-input">
          <!-- <div class="form-item">
            <label class="form-label">巡视周期：</label>
            <el-select v-model="setzq" placeholder="请选择">
              <el-option v-for="item in xslx" :key="item.id" :label="item.qb" :value="item.id"></el-option>
            </el-select>
            <el-button class="UserSearchFun UserSearchFun-mini" size="mini" @click="zqFun">设置周期</el-button>
          </div> -->
          <div class="form-item">
            <label class="form-label">巡视类型：</label>
            <el-select v-model="setlx" placeholder="请选择">
              <el-option v-for="item in selection.patrolTypesArr" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
            </el-select>
            <el-button class="UserSearchFun UserSearchFun-mini" size="mini" @click="lxFun">设置巡视类型</el-button>
          </div>
        </div>
        <div class="table">
          <div class="table">
            <el-table height="200" :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}" :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}" border fit highlight-current-row @selection-change="CheckFun">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
              <el-table-column prop="sdmc" label="通道名称"></el-table-column>
              <el-table-column prop="qjmc" label="前井名称"></el-table-column>
              <el-table-column prop="hjmc" label="后井名称"></el-table-column>
              <!-- <el-table-column prop="lineRank" label="巡视周期">
                <template slot-scope="scope">
                  <el-select v-model="tableSelect[scope.$index]['xszq']" clearable placeholder="请选择">
                    <el-option v-for="item in xslx" :key="item.id" :label="item.qb" :value="item.id"></el-option>
                  </el-select>
                </template>
              </el-table-column> -->
              <el-table-column prop="lineRank" label="巡视类型">
                <template slot-scope="scope">
                  <!-- <el-select v-model="tableSelect[scope.$index]['xslx']" clearable placeholder="请选择"> -->
                  <el-select v-model="tableSelect[scope.$index]['patrolType']" clearable placeholder="请选择">
                    <el-option v-for="item in selection.patrolTypesArr" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="上次计划时间">
                <template slot-scope="scope">
                  <el-date-picker value-format="yyyy-MM-dd" v-model="tableSelect[scope.$index]['lastPlanTime']" type="date" placeholder="选择日期"></el-date-picker>
                </template>
              </el-table-column>
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
      <AddLine :selection='selection' @childFn="parentFn" @setLine='getLine' :openID="openID" />
    </div>
  </div>
</template>

<script>
import '@/styles/myStyle/index.scss'
import AddLine from './AddChannel'
import {
  PatrolPlanChannelAdd as add,
  PatrolPlanChannelEdit as edit,
  PatrolPlanChannelEditMsg as detail
} from '@/api/patrolmanagement'
import { GETTBList } from "@/api/public";
export default {
  components: {
    AddLine
  },

  props: {
    selection: {},
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
    return {
      tableSelect: [], // 周期及巡视列表
      isShowDialog: false,
      flag: 0,
      yes: 'yes',
      no: 'no',
      CheckedSelection: '', // 获取选中table
      ruleForm: {
        jhxsrq: '',
        xsbzId: '',
        xsrId: '',
        jhly: '',
        bz: ''
      },
      rules: {
        jhxsrq: [
          { required: true, message: '请选择运维班组', trigger: 'change' }
        ],
        xsbzId: [{ required: true, message: '请选择路线', trigger: 'change' }],
        xsrId: [
          { required: true, message: '请选择巡视人', trigger: 'blur' }
        ],
        jhly: [{ required: true, message: '请选择计划来源', trigger: 'change' }]
      },
      form: {
        sbmc: '',
        date_time: null,
        zq: '',
        lx: '',
        pageNum: 1,
        pageSize: 10
      },
      xszq: '',
      selectCheckTd: null,
      selectshowDialog: false, //选择通道
      showDialog: true, //打开弹框
      setzq: '',
      setlx: '',
      tableData: [],

      xslx: [
        { id: '1', qb: '全部' },
        { id: '2', qb: '7天' },
        { id: '3', qb: '3天' }
      ]
    }
  },
  created() {
    if (this.isEdit)
      detail(this.openID).then(res => {
        let resFormData = res.data.data
        //console.log(resFormData)
        this.ruleForm = {
          xsbzId: resFormData.xsbzId,
          dlId: resFormData.dlId,
          jhxsrq: resFormData.jhxsrq,
          xsrId: resFormData.xsrId,
          jhly: Number(resFormData.jhly),
          bz: resFormData.bz
        }
        this.tableData = res.data.data.patrolLines
      })
  },
  mounted() {},
  methods: {
     ywbz(val) {
      if (val != null || val != "") {
        GETTBList("/api/select/getUsers", { groupId: val }).then(res => {
          //console.log(res);
          this.selection.usersArr = res.data.data;
        });
      }
    },
    getLine(e) {
      // 子页面 传递选择通道 事件
      this.tableData = e.lines
      this.tableSelect = []

      for (let n = 0; n < this.tableData.length; n++) {
        // this.tableSelect.push({ xslx: '', lastPlanTime: '' })
        this.tableSelect.push({ patrolType: '', lastPlanTime: '' })
      }
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
        })
        .catch(_ => {})
    },
    /**
     * 确认按钮
     */
    SuerFun() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          let formData = this.ruleForm
          if (!this.isEdit) {
            //新增

            if (this.tableData.length == 0) {
              this.$message('请选择'+this.$xl)
              return false
            }
            let idsArr = []
            this.tableData.forEach((v, i) => {
              idsArr.push({ ...v, ...this.tableSelect[i] })
            })

            add({
              ...this.ruleForm,
              patrolPlanCP: JSON.stringify(idsArr)
            }).then(res => {
              let val = res.data
              let type = val.code == 0 ? 'success' : 'error'
              this.$message({ type, message: val.msg })
              if (val.code == 0)
                this.$emit('childFn', {
                  showDialog: false
                })
                this.$parent.getData()
            })
          } else {
            edit({ ...this.ruleForm, objId: this.openID }).then(res => {
              let val = res.data
              let type = val.code == 0 ? 'success' : 'error'
              this.$message({ type, message: val.msg })
              if (val.code == 0)
                this.$emit('childFn', {
                  showDialog: false
                })
                this.$parent.getData()
            })
          }
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
     * 巡视周期
     */
    // zqFun() {
    //   let array = this.tableData
    //   if (array.length <= 0) {
    //     this.$message('请选择'+this.$xl)
    //     return false
    //   }

    //   //patrolCycle: '', patrolType: ''  setzq setlx
    //   this.tableSelect.forEach(v => {
    //     v.xszq = this.setzq
    //   })
    // },
    /** 巡视类型 */
    lxFun() {
      let array = this.tableData
      if (array.length <= 0) {
        this.$message('请选择'+this.$xl)
        return false
      }

      //patrolCycle: '', patrolType: ''  setzq setlx
      this.tableSelect.forEach(v => {
        // v.xslx = this.setlx
        v.patrolType = this.setlx
      })
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
    /** 新增*/
    AddNewTdFn() {
      let array = this.selectCheckTd
      this.selectshowDialog = false
      array.forEach(element => {
        this.tableData.unshift(element)
      })
    },
    /** 选中数据 子*/
    CheckTdFun(val) {
      this.selectCheckTd = val
    }
  }
}
</script>
<style lang="scss" scope>
.select-dy {
  .dy {
    float: left;
    width: 4.2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
  }
  :nth-child(2) {
    margin: 0 2rem;
  }

  .yes {
    background-color: #35b8c0;
    color: #fff;
    border: 1px solid #35b8c0;
  }
  .no {
    border: 1px solid #35b8c0;
    color: #35b8c0;
    background-color: #fff;
  }
}
</style>
