<template>
  <!-- <h2>
      xl巡视周期管理-新增
  </h2>-->
  <div class="hastitle">
    <el-dialog :visible.sync="showDialog" title="通道巡视周期管理" v-dialogDrag :center="true" :before-close="handleClose">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="required-ruleForm">
        <el-form-item label="周期:" prop="zq">
          <el-input v-model="ruleForm.zq" clearable @input.native='period' />
        </el-form-item>
        <el-form-item label="周期单位:" prop="dw">
          <el-select v-model="ruleForm.dw" clearable placeholder="请选择">
            <el-option v-for="(item,ind) in dwArr" :key="ind" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="检测班组:" prop="bzid">
          <el-select v-model="ruleForm.bzid" clearable placeholder="请选择" @change='getJcrList'>
            <el-option v-for="item in selection.groupsArr" :key="item.id" :label="item.groupName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检测人:" prop="xsrid">
          <el-select v-model="ruleForm.xsrid" clearable placeholder="请选择">
            <el-option v-for="item in jcrSelectArr" :key="item.objId" :label="item.name" :value="item.objId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上次巡视时间：" prop="scxssj">
          <el-date-picker v-model="ruleForm.scxssj" type="date" placeholder="选择日期时间" value-format='yyyy-MM-dd HH:mm:ss'>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="提前报警天数：" prop="tqyjts">
          <el-input v-model="ruleForm.tqyjts" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="要求：" prop="yq">
          <el-input v-model="ruleForm.yq" clearable />
        </el-form-item>
        <el-form-item label="备注：" prop="bz">
          <el-input v-model="ruleForm.bz" clearable />
        </el-form-item>
      </el-form>

      <el-form ref="dataForm" :model="form" label-position="left" style="width:100% ;margin: 0 auto;">
        <el-card class="tz-box-card">
          <div v-if="!isEdit">
            <div class="Form-title-xs">通道查询</div>
            <div class="Form-input">
              <div class="form-item">
                <label class="form-label">通道名称：</label>
                <el-select v-model="form.objId" filterable clearable placeholder="请选择" :filter-method="filterList">
                  <el-option v-for="item in tDList" :key="item.id" :label="item.tdName" :value="item.id"></el-option>
                </el-select>
              </div>
              <div class="form-item">
                <label class="form-label">设备主人：</label>
                <el-input v-model="form.sbzr"></el-input>
              </div>
            </div>
            <div class="btn-center">
              <el-form>
                <el-col>
                  <el-form-item>
                    <el-button class="onSearch" @click="onSearch">查询</el-button>
                    <el-button class="onSearch" @click="reset" style="margin-right: 0">重置</el-button>
                  </el-form-item>
                </el-col>
              </el-form>
            </div>
          </div>

          <div class="table">
            <div class="table">
              <el-table :data="tableData" style="border: 1px solid #c7c7c7" height="200" :cell-style="{borderColor: '#c7c7c7'}" :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}" border fit highlight-current-row @selection-change="CheckFun">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="50">
                  <template slot-scope="scope">
                    <span>{{scope.$index +1}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="sdmc" label="通道名称"></el-table-column>
                <el-table-column prop="groupId" label="运维班组"></el-table-column>

                <el-table-column prop="name" label="设备主人"></el-table-column>
                <el-table-column prop="yxzt" label="设备状态"></el-table-column>
              </el-table>
              <pagination v-show="pageDetail.total>0" :total="pageDetail.total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize" @pagination="getData" />
            </div>
          </div>
        </el-card>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  PatrolCycleChannerAdd as add,
  PatrolCycleChanelEdit as edit,
  PatrolCycleChannelseTable as detail, //
  PatrolCycleChannelseDetail as channelsDetail
} from '@/api/patrolmanagement'

import { jcrSelect } from '@/api/liveDetectionManage'
import Pagination from '@/components/Pagination'
import '@/styles/myStyle/index.scss'
export default {
  components: {
    Pagination
  },
  props: {
    /** 接收参数为是否是编辑*/
    isEdit: {
      type: Boolean,
      default: false
    },
    /**打开页面的id */
    openID: {
      default: null
    },
    selection: {}
  },
  data() {
    return {
      tDList: [],
      jcrSelectArr: [],
      showDialog: true,
      CheckedSelection: [],
      dwArr: ['年', '半年', '季', '月', '周', '天'],
      ruleForm: {
        zq: '',
        dw: '',
        bzid: '',
        xsrid: '',
        tqyjts: '',
        scxssj: '',
        yq: ''
      },
      rules: {
        zq: [{ required: true, message: '请输入周期', trigger: 'blur' }],
        bzid: [
          { required: true, message: '请选择运维班组', trigger: 'change' }
        ],
        // xsrid: [{ required: true, message: '请选择巡视人', trigger: 'change' }],
        dw: [{ required: true, message: '请选择周期单位', trigger: 'change' }],
        scxssj: [
          { required: true, message: '请选择上次巡视时间', trigger: 'change' }
        ]
      },

      form: {
        objId: '',
        sbzr: '',
        pageNum: 1,
        pageSize: 50
      },
      searchForm: {
        objId: '',
        sbzr: '',
        pageNum: 1,
        pageSize: 50
      },

      pageDetail: {
        total: 0
      },
      tabisoverflow: true,
      //表头

      tableData: []
    }
  },
  created() {
    this.filterList()
    if (!this.isEdit) {
      this.getData()
    } else {
      detail(this.openID).then(res => {
        let resFormData = res.data.data.patrolData
        this.ruleForm = {
          zq: Number(resFormData.zq),
          bz: resFormData.bz,
          dw: resFormData.dw,
          bzid: resFormData.bzid,
          xsrid: resFormData.xsrid,
          tqyjts: resFormData.tqyjts,
          scxssj: resFormData.scxssj,
          yq: resFormData.yq
        }
        this.tableData = res.data.data.patrolLines
          this.tableData = res.data.data.patrolLines
  let oneGroup = this.selection.groupsArr.filter(res => {
        return res.id == this.ruleForm.bzid
      })
      jcrSelect(oneGroup[0].groupName).then(res => {
        this.jcrSelectArr = res.data.data
      })
      })
    }
  },

  methods: {
    async getData() {
      let res = await channelsDetail(this.searchForm)
      this.tableData = res.data.rows
      this.pageDetail.total = res.data.total
    },

    filterList(query = '') {
      let arr = this.selection.channelsArr.filter(item => {
        return item.tdName.includes(query) || item.id.includes(query)
      })
      if (arr.length > 20) {
        this.tDList = arr.slice(0, 20)
      } else {
        this.tDList = arr
      }
    },
    /** 运维班组change 获取检测人 */
    getJcrList(groupname) {
      let oneGroup = this.selection.groupsArr.filter(res => {
        return res.id == groupname
      })
      this.ruleForm.xsrid = null
      jcrSelect(oneGroup[0].groupName).then(res => {
        this.jcrSelectArr = res.data.data
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
    /**查询按钮 */
    onSearch() {
      for (let key in this.form) {
        this.searchForm[key] = this.form[key]
      }
      this.getData()
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
          let formData = this.ruleForm
          if (!this.isEdit) {
            //新增
            let idsArr = []
            this.CheckedSelection.forEach(v => {
              idsArr.push(v.objId)
            })
            if (this.CheckedSelection.length == 0) {
              this.$message('请选择通道')
              return false
            }
            formData.ids = idsArr.join(',')
            add(formData).then(res => {
              let val = res.data
              let type = val.code == 0 ? 'success' : 'error'
              this.$message({ type, message: val.msg })
              if (val.code == 0)
                this.$emit('childFn', {
                  showDialog: false
                })
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
            })
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
<style scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>
