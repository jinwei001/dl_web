<template>
  <!-- <h2>
      xl巡视计划管理
  </h2>-->
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="form" inline>
          <el-form-item :label="`${$xl}名称:`">
            <el-select v-model="form.xlid" clearable filterable placeholder="请选择" @change='getDlList'>
              <el-option v-for="item in selection.linesSelectArr" :key="item.id" :label="item.lineName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="`${$dl}:`">
            <el-select v-model="form.dlid" clearable placeholder="请选择">
              <el-option v-for="item in selection.dlSelectArr" :key="item.id" :label="item.logicCableStageName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="`${$xb}:`">
            <el-select v-model="form.xw" clearable placeholder="请选择">
              <el-option v-for="item in selection.xwArr" :key="item.bzmc" :label="item.bzmc" :value="item.bzmc"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="计划来源:">
            <el-select v-model="form.jhly" clearable placeholder="请选择">
              <el-option v-for="item in selection.jhlyArr" :key="item.bzmc" :label="item.bzmc" :value="item.bzmc"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="检测班组:" prop="jcbz">
            <el-select v-model="form.jcbz" clearable placeholder="请选择">
              <el-option v-for="item in selection.jcbzSelectArr" :key="item.groupname" :label="item.groupname" :value="item.groupname"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始结束时间：">
            <el-col>
              <el-date-picker v-model="form.date" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item style="float: right;margin-right: 0">
            <el-button size="small" class="onSearch" @click="onSearch">查询</el-button>
            <el-button size="small" class="onSearch" @click="reset" style="margin-right: 0">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content">
      <div class="respont-content">
        <el-form>
          <el-col>
            <el-form-item style="float: left;">
              <el-button size="small" class="onSearch" @click="Addfun">
                <i class="el-icon-plus"> 新增</i>
              </el-button>
              <el-button size="small" type="danger" plain @click="DelAllFn">
                <i class="el-icon-close"></i> 删除
              </el-button>

            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="tableData" height="600" style="border: 1px solid #c7c7c7;width:100%" :cell-style="{borderColor: '#c7c7c7'}" :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}" border fit highlight-current-row @selection-change="CheckFun">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{(searchForm.pageNum - 1) * 10 + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="`${$dydj}`" align="center" prop="dydj"></el-table-column>
          <el-table-column :label="`${$xl}名称`" align="center" prop="xlmc" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column :label="`${$dl}`" align="center" prop="dlmc" width="200"></el-table-column>
          <el-table-column label="设备类型" align="center" prop="sblx" width="120"></el-table-column>
          <el-table-column label="检测类型" align="center" prop="jclx"></el-table-column>
          <el-table-column label="设备名称" align="center" prop="sbmc" width="160"></el-table-column>
          <el-table-column :label="`${$xb}`" align="center" prop="xw"></el-table-column>
          <el-table-column label="计划开始时间" align="center" prop="jhkssj" width="160"></el-table-column>
          <el-table-column label="计划结束时间" align="center" prop="jhjssj" width="160"></el-table-column>
          <el-table-column label="计划来源" align="center" prop="jhly" width="120"></el-table-column>
          <el-table-column label="检测班组" align="center" prop="jcbz"></el-table-column>
          <el-table-column label="检测人" align="center" prop="jcr"></el-table-column>
          <el-table-column label="检测单位" align="center" prop="jcdw"></el-table-column>
          <el-table-column align="center" label="操作" class-name="small-padding fixed-width" width="360">
            <div slot-scope="scope" class="">
              <el-button class="onSearch" size="mini" @click="editFun(scope.row.id)">编辑</el-button>
              <el-button plain size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
              <el-button v-if="scope.row.isLuru!=1" size="mini" type="primary" @click="inputResuleFun(scope.row)">录入结果</el-button>
              <!-- // multiple="multiple" -->
              <el-button type="primary" class="uploadBtn" size="mini"> <input type="file" @change="handleChnage($event,scope.row.id)"> 点击上传</el-button>
              <el-button type="primary" class="uploadBtn" size="mini" @click="downloadFj(scope.row.fj)" :disabled="scope.row.fj?false:true"> 点击下载</el-button>
            </div>
          </el-table-column>
        </el-table>
        <pagination v-show="pageDetail.total>0" :total="pageDetail.total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize" @pagination="getData" />
      </div>
    </div>
    <div v-if="isShowDialog">
      <Add :selection='selection' @childFn="parentFn" :isEdit="isEdit" :openID="openID" />
    </div>
    <div v-if="isShowHwcw">
      <InputResultHwcw :selection='selection' @childFn="parentFn" :thisDetail='thisDetail' />
    </div>
    <div v-if="isShowJbfd">
      <InputResultJbfd :selection='selection' @childFn="parentFn" :thisDetail='thisDetail' />
    </div>
    <div v-if="isShowJddl">
      <InputResultJddl :selection='selection' @childFn="parentFn" :thisDetail='thisDetail' />
    </div>
  </div>
</template>

<script>
import { uploadPicture } from '@/api/liveDetectionManage'

import Pagination from '@/components/Pagination'
import Add from './Add'
import InputResultHwcw from './InputResult_hwcw'
import InputResultJbfd from './InputResult_jbfd'
import InputResultJddl from './InputResult_jddl'
import { Message } from 'element-ui'
import {
  planList as list,
  planDel as delData,
  xw, // xb
  linesSelect, // xl下拉
  dlSelect, // dl下拉
  jcbzSelect, // 检测班组
  planEdit as edit
} from '@/api/liveDetectionManage'
export default {
  components: {
    Pagination,
    Add,
    InputResultHwcw,
    InputResultJbfd,
    InputResultJddl
  },
  data() {
    return {
      isShowDialog: false, //查看弹框打开
      isShowHwcw: false, // 红外测温
      isShowJbfd: false, // 局部放电
      isShowJddl: false, // 接地电流
      isEdit: false, //是否是编辑弹框
      openID: null, //打开弹框的id值
      thisDetail: {},
      ddjc_sb_arr: {
        sb: [
          [this.$dl + '终端', this.$dl + '接头', this.$dl + '分支箱', '接地箱'],
          [this.$dl + '终端', this.$dl + '接头', '交叉互联箱', '接地箱'],
          [this.$dl + '终端', this.$dl + '接头']
        ]
      },
      form: {
        xlid: '',
        dlid: '',
        xw: '',
        jhly: '',
        jcbz: '',
        date: [],
        pageNum: 1,
        pageSize: 10
      },
      pageDetail: {
        total: 0
      },
      searchForm: {
        pageNum: 1,
        pageSize: 10
      },
      selection: {
        linesSelectArr: [], // xl名称
        dlSelectArr: [], // dl
        ddjcArr: ['红外测温', '金属护层接地电流测量', '局部放电检测'], // 带电检测类型
        sblxArr: [
          this.$dl + '终端',
          this.$dl + '接头',
          this.$dl + '分支箱',
          '交叉互联箱',
          this.$dl + '接地箱'
        ], // 检测设备类型
        jcbzSelectArr: [], // 检测班组
        xwArr: [],
        sbmcArr: [],
        jhlyArr: []
      },
      //选中的数据
      CheckedSelection: [],
      tableData: []
    }
  },
  created() {
    this.getData()

    linesSelect().then(res => {
      // xl
      this.selection.linesSelectArr = res.data.rows
    })
    jcbzSelect().then(res => {
      // 检测班组
      this.selection.jcbzSelectArr = res.data.rows
    })

    xw({ fzid: 'DLXW' }).then(res => {
      // xb
      this.selection.xwArr = res.data.rows
    })
    xw({ fzmc: '带电检测计划来源' }).then(res => {
      // 计划来源
      this.selection.jhlyArr = res.data.rows
    })
  },
  mounted() {},
  methods: {
    async getData() {
      // 获取列表数据
      let res = await list(this.searchForm)
      this.tableData = res.data.rows
      if (!!res.data.total) this.pageDetail.total = res.data.total
    },
    /** dl change 获取dl */
    getDlList(lineId) {
      dlSelect({ lineId }).then(res => {
        // dl
        this.selection.dlSelectArr = res.data.rows
      })
    },
    /** 带电检测类型change 获取设备类型 */
    getSblxList(ind) {
      this.selection.jcsblxArr = this.ddjc_sb_arr.sb[ind]
    },
    /**删除所有 */
    DelAllFn() {
      if (this.CheckedSelection.length == 0) {
        this.$message('请选择要编辑的数据')
        return
      }
      let idsArr = []
      this.CheckedSelection.forEach(v => {
        idsArr.push(v.id)
      })

      this.del(idsArr.join(','))
    },

    del(ids) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delData({ ids }).then(val => {
            val = val.data
            let type = val.code == 0 ? 'success' : 'error'
            this.$message({ type, message: val.msg })
            if (val.code == 0) this.getData()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    upLoadImages(file, callback) {
      let form = new FormData()
      form.append('file', file) //openID
      form.append('type', 'mario') //
      //接口部分
      uploadPicture(form)
        .then(res => {
          let val = res.data
          if (val.code != 0) {
            let type = val.code == 0 ? 'success' : 'error'
            let message = val.code == 0 ? '上传成功' : '上传失败'
            this.$message({ type, message })
          }
          callback(val)
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    downloadFj(url) {
      url = process.env.VUE_APP_BASE_API + url
      try {
        var elemIF = document.createElement('iframe')
        elemIF.src = url
        elemIF.style.display = 'none'
        document.body.appendChild(elemIF)
      } catch (e) {
        this.$message({ type:'error', message:'下载失败' })
      }
    },
    handleChnage(event, id) {
      let file = event.target.files[0]
      console.log(file)
      this.handleName = file.name
      this.upLoadImages(file, val => {
        if (val.code == 0) {
          edit({ fj: val.msg, id }).then(res => {
            let val = res.data
            let type = val.code == 0 ? 'success' : 'error'
            this.$message({ type, message: val.msg })
            this.getData()
          })
        }
      })
    },
    /** 导出 */
    upload() {
      for (let key in this.form) {
        this.searchForm[key] = this.form[key]
      }
      this.searchForm.beginTime = this.form.date[0]
      this.searchForm.endTime = this.form.date[1]
      delete this.searchForm.date
      planLineUpload(this.searchForm).then(res => {
        window.location.href =
          process.env.VUE_APP_BASE_API +
          '/common/download?fileName=' +
          res.data.msg +
          '&delete=true'
      })
    },
    reset() {
      this.form = {
        xlid: '',
        dlid: '',
        ddjclx: '',
        sblx: '',
        date: [],
        pageNum: 1,
        pageSize: 10
      }
    },
    onSearch() {
      for (let key in this.form) {
        this.searchForm[key] = this.form[key]
      }
      this.searchForm.beginTime = this.form.date[0]
      this.searchForm.endTime = this.form.date[1]
      delete this.searchForm.date
      this.getData()
    },
    /** 录入结果 */
    inputResuleFun(val) {
      this.thisDetail = val
      val = val.jclx
      if (val == '红外测温') this.isShowHwcw = true
      else if (val == '局部放电检测') this.isShowJbfd = true
      else this.isShowJddl = true
    },
    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val
    },
    editFun(val) {
      this.isShowDialog = true
      this.isEdit = true
      this.openID = val
    },
    /**新增按钮 */
    Addfun() {
      this.isShowDialog = true
      this.isEdit = false
    },
    /** 批量新增 */
    batchBtn() {
      this.isShowAddBatch = true
      this.isEdit = false
    },
    lookOverBtn(val) {
      this.isEdit = false
      this.openID = val
    },
    /**
     * 接收查看/编辑子组件的数据
     */
    parentFn(val) {
      this.isShowDialog = false
      this.isShowAddBatch = false
      this.isShowHwcw = false
      this.isShowDialog = false
      this.isShowHwcw = false
      this.isShowJbfd = false
      this.isShowJddl = false
      this.getData()
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
.el-table td div {
  text-align: left;
}
.uploadBtn {
  position: relative;
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
  }
}
</style>
