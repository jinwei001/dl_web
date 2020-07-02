<template>
  <!-- <h2>
      ${$xl}巡视计划管理
  </h2>-->
  <div class="main-body">
    <div class="main-userSelect" v-if="oldHideshow===false">
      <div class="searchForm_glf">
        <el-form ref="form" inline>
          <el-form-item :label="`${$xl}名称:`">
            <el-select v-model="form.xlid" clearable filterable placeholder="请选择" @change="getDlList">
              <el-option v-for="item in selection.linesSelectArr" :key="item.id" :label="item.lineName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="`${$dl}:`">
            <el-select v-model="form.dlid" clearable placeholder="请选择">
              <el-option v-for="item in selection.dlSelectArr" :key="item.id" :label="item.logicCableStageName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="检测类型：" prop="jclx">
            <el-select v-model="form.jclx" clearable placeholder="请选择">
              <el-option v-for="(item,ind) in selection.ddjcArr" :key="ind" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="`${$xb}:`">
            <el-select v-model="form.xw" clearable placeholder="请选择">
              <el-option v-for="item in selection.xwArr" :key="item.bzmc" :label="item.bzmc" :value="item.bzmc"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="检测时间：">
            <el-col>
              <el-date-picker v-model="form.jcsj" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
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
      <div class="respont-content" v-if="oldHideshow===false">
        <el-form>
          <el-col>
            <el-form-item style="float: left;">
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
          <el-table-column :label="`${$xl}名称`" align="center" prop="xlmc" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column :label="`${$dl}`" align="center" prop="dlmc" width="200"></el-table-column>
          <el-table-column label="设备名称" align="center" prop="sbmc" width="120"></el-table-column>
          <el-table-column label="检测类型" align="center" prop="jclx"></el-table-column>
          <el-table-column :label="`${$xb}`" align="center" prop="xw"></el-table-column>
          <el-table-column label="检测时间" align="center" prop="jcsj"></el-table-column>
          <el-table-column label="负责人" align="center" prop="fzr"></el-table-column>
          <el-table-column label="执行结果" align="center" prop="zxjg"></el-table-column>
          <el-table-column label="检测记录" align="center" prop="jcsj">
            <div slot-scope="scope" class>
              <el-button v-if="scope.row.isLuru!=1" size="mini" type="primary" @click="checkResuleFun(scope.row)">查看记录</el-button>
            </div>
          </el-table-column>

          <el-table-column label="检测班组" align="center" prop="jcbz"></el-table-column>
          <el-table-column label="检测人" align="center" prop="jcr"></el-table-column>
          <el-table-column label="检测单位" align="center" prop="jcdw"></el-table-column>
          <el-table-column align="center" label="操作" class-name="small-padding fixed-width" width="400" v-if="oldHideshow===false">
            <div slot-scope="scope" class>
              <!-- <el-button class="onSearch" size="mini" @click="editFun(scope.row.id)">编辑</el-button> -->
              <el-button size="mini" type="primary" @click="inputLf(scope.row)">生成六防</el-button>
              <el-button size="mini" type="primary" @click="addQx(scope.row)">生成缺陷</el-button>
              <el-button size="mini" type="primary" @click="downLoadExport(scope.row.id)">生成报告</el-button>
     
            </div>
          </el-table-column>
        </el-table>
        <pagination v-show="pageDetail.total>0" :total="pageDetail.total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize" @pagination="getData" />
      </div>
    </div>
    <div v-if="isShowLf">
      <AddLf :is-show-dialog="true" :ddjcid="thisListId" :is-add="true" :isDd="true" :ddDetail="ddDetail" :selection="selectionLf" @childFn="parentFn" />
    </div>
    <div v-if="isShowDialog">
      <Add :selection="selection" @childFn="parentFn" :openID="openID" />
    </div>

    <div v-if="isShowHwcw">
      <InputResultHwcw :selection="selection" @childFn="parentFn" :isCheckBg="true" :thisDetail="thisDetail" :thisId="thisId" />
    </div>
    <div v-if="isShowJbfd">
      <InputResultJbfd :selection="selection" @childFn="parentFn" :isCheckBg="true" :thisDetail="thisDetail" />
    </div>
    <div v-if="isShowJddl">
      <InputResultJddl :selection="selection" @childFn="parentFn" :isCheckBg="true" :thisDetail="thisDetail" />
    </div>

    <div v-if="isShowDialogQx">
      <AddQx @childFn="parentFn" :thisDetail="thisDetail" :isFromQx="true" />
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import Pagination from '@/components/Pagination'
import Add from './Add'
import AddQx from '@/views/defect/register/Add'
import AddLf from '@/views/six-prevention/information-audit/cmp/add'
import InputResultHwcw from '@/views/liveDetectionManage/plan/InputResult_hwcw'
import InputResultJbfd from '@/views/liveDetectionManage/plan/InputResult_jbfd'
import InputResultJddl from '@/views/liveDetectionManage/plan/InputResult_jddl'
import { Message } from 'element-ui'
import {
  resultList as list,
  resultDel as delData,
  dySelect, // 电压下拉
  xw, // xb
  linesSelect, // ${$xl}下拉
  dlSelect, // dl下拉
  jcbzSelect, // 检测班组
  resultgetBg // 生成报告
} from '@/api/liveDetectionManage'

import { setList } from '@/api/Sixdefensemanagement/HiddenDangerReview'
export default {
  components: {
    Pagination,
    Add,
    AddLf,
    InputResultHwcw,
    InputResultJbfd,
    InputResultJddl,
    AddQx
  },
  data() {
    return {
      ddDetail: '', // 生成六防 详情
      isCheckBg: '', // 是不是查看报告
      thisId: '', // 列表ID 查询报告用
      isShowDialog: false, //查看弹框打开
      isShowHwcw: false, // 红外测温
      isShowJbfd: false, // 局部放电
      isShowJddl: false, // 接地电流
      isShowDialogQx: false, // 生成缺陷
      isShowLf: false,
      isEdit: false, //是否是编辑弹框
      openID: null, //打开弹框的id值
      thisListId: '', // 生成6防Id

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
        jclx: '',
        xw: '',
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
      selectionLf: {}, // 下拉框所有数据
      selection: {
        dySelectArr: [], //dydj
        linesSelectArr: [], // ${$xl}名称
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
      tableData: [],
      oldHideshow: false //如果为true表示从老旧老化分析跳过来 隐藏对应模块
    }
  },
  props: {
    oldobjPn: {
      //老旧参数
      type: Object,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function() {
        return {}
      }
    }
  },
  created() {
    //判断是否老旧分析来源
    if (Object.keys(this.oldobjPn).length > 0) {
      this.oldHideshow = true
      this.searchForm.dlid = this.oldobjPn.logiccableId
    }
    this.getData()

    dySelect().then(res => {
      // 电压
      this.selection.dySelectArr = res.data.data
    })

    linesSelect().then(res => {
      // ${$xl}
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

    const list = {
      nowPage: 1
    }
    setList(qs.stringify(list)).then(response => {
      if (response.status == 200) {
        this.show = true
        this.selectionLf = response.data.rows[0]
      }
    })
  },
  mounted() {},
  methods: {
    async getData() {
      // 获取列表数据
      let res = await list(this.searchForm)
      this.tableData = res.data.rows
      this.pageDetail.total = res.data.total
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
    /** 六房弹窗 */
    inputLf(detail) {
      this.thisListId = detail.id
      this.ddDetail = detail
      this.isShowLf = true
    },

    /** 查看记录 */
    checkResuleFun(val) {
      this.thisDetail = val
      val = val.jclx
      if (val == '红外测温') this.isShowHwcw = true
      else if (val == '局部放电检测') this.isShowJbfd = true
      else this.isShowJddl = true
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
    /** 生成报告 */
    downLoadExport(detectionResultId) {
      resultgetBg({ detectionResultId }).then(res => {
        // console.log(res);
        if (res.data.msg) {
          if (res.data.msg !== '' || res.data.msg !== null) {
            window.location.href = process.env.VUE_APP_BASE_API + res.data.msg
          } else {
            this.$message('暂无数据')
          }
        } else {
          this.$message('暂无数据')
        }
      })
    },
  
    reset() {
      this.form = {
        xlid: '',
        dlid: '',
        jclx: '',
        xw: '',
        pageNum: 1,
        pageSize: 10
      }
    },
    onSearch() {
      for (let key in this.form) {
        this.searchForm[key] = this.form[key]
      }
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
    /** 生成缺陷 */
    addQx(obj) {
      this.thisDetail = obj
      this.isShowDialogQx = true
    },
    /**
     * 接收查看/编辑子组件的数据
     */
    parentFn(val) {
      this.isShowDialog = false
      this.isShowDialogQx = false
      this.isShowAddBatch = false
      this.isShowHwcw = false
      this.isShowHwcw = false
      this.isShowJbfd = false
      this.isShowJddl = false
      this.isShowLf = false
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

</style>
