<template>
  <!-- <h2>
      ${$xl}巡视计划管理
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
          <el-form-item label="计划执行状态:" prop="jhzxzt">
            <el-select v-model="form.jhzxzt" clearable placeholder="请选择">
              <el-option label="请选择" value=""></el-option>
              <el-option label="未处理" value="未处理"></el-option>
              <!-- <el-option label="处理中" value="处理中"></el-option> -->
              <el-option label="已处理" value="已处理"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否超期:" prop="sfcq">
            <el-select v-model="form.sfcq" clearable placeholder="请选择">
              <el-option label="请选择" value=""></el-option>
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
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
      <div class="mainFlex thrPileCon">
        <div id="p1" class="pie_s" style="height:300px;width:100%"></div>
      </div>
      <div class="table">
        <el-table :data="tableData" :row-style="tableRowStyle" style="border: 1px solid #c7c7c7;width:100%" :cell-style="{borderColor: '#c7c7c7'}" :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}" border fit highlight-current-row>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{(searchForm.pageNum - 1) * 10 + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="`${$dydj}`" align="center" prop="dydj"></el-table-column>
          <el-table-column :label="`${$xl}名称`" align="center" prop="xlmc" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column :label="`${$dl}`" align="center" prop="dlmc" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column label="设备类型" align="center" prop="sblx" width="120"></el-table-column>
          <el-table-column label="设备名称" align="center" prop="sbmc" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column label="检测类型" align="center" prop="jclx"></el-table-column>
          <el-table-column :label="`${$xb}`" align="center" prop="xw"></el-table-column>
          <el-table-column label="计划开始时间" align="center" prop="jhkssj" width="160"></el-table-column>
          <el-table-column label="计划结束时间" align="center" prop="jhjssj" width="160"></el-table-column>
          <el-table-column label="计划来源" align="center" prop="jhly" width="120"></el-table-column>
          <el-table-column label="计划执行状态" align="center" prop="jhzxzt" width="120"></el-table-column>
          <el-table-column label="是否超期" align="center" prop="sfcq" width="120"></el-table-column>
          <el-table-column label="超期原因" align="center" prop="cqyy" width="120"></el-table-column>
          <el-table-column label="检测时间" align="center" prop="jcsj"></el-table-column>
          <el-table-column label="检测结果" align="center" prop="jcjg"></el-table-column>
          <el-table-column label="检测班组" align="center" prop="jcbz"></el-table-column>
          <el-table-column label="检测人" align="center" prop="jcr"></el-table-column>
          <el-table-column label="检测单位" align="center" prop="jcdw"></el-table-column>
          <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
            <div slot-scope="scope" class="">
              <el-button class="onSearch" size="mini" @click="editFun(scope.row.id)">编辑</el-button>
            </div>
          </el-table-column>
        </el-table>
        <pagination v-show="pageDetail.total>0" :total="pageDetail.total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize" @pagination="getData" />
      </div>
    </div>

    <div v-if="isShowDialog">
      <Add :selection='selection' @childFn="parentFn" :isEdit="isEdit" :openID="openID" />
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import myCharts from '@/views/statusEvaluationManagement/charts/chartsOption'
Vue.use(myCharts)
import Pagination from '@/components/Pagination'
import Add from './Add'
import { Message } from 'element-ui'
import {
  taskList as list,
  xw, // xb
  linesSelect, // ${$xl}下拉
  dlSelect, // dl下拉
  jcbzSelect, // 检测班组
  taskBar
} from '@/api/liveDetectionManage'
export default {
  components: {
    Pagination,
    Add
  },
  data() {
    return {
      isShowDialog: false, //查看弹框打开
      isEdit: false, //是否是编辑弹框
      openID: null, //打开弹框的id值
      thisDetail: {},
      ddjc_sb_arr: {
        sb: [
          [this.$dl+'终端',this.$dl+'接头', this.$dl+'分支箱', '接地箱'],
          [this.$dl+'终端',this.$dl+'接头', '交叉互联箱', '接地箱'],
          [this.$dl+'终端',this.$dl+'接头']
        ]
      },
      form: {
        xlid: '',
        dlid: '',
        jhzxzt: '',
        sfcq: '',
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
        linesSelectArr: [], // ${$xl}名称
        dlSelectArr: [], // dl
        ddjcArr: ['红外测温', '金属护层接地电流测量', '局部放电检测'], // 带电检测类型
        sblxArr: [
         this.$dl+ '终端',
          this.$dl+'接头',
          this.$dl+'分支箱',
          '交叉互联箱',
          this.$dl+'接地箱'
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
      // ${$xl}
      this.selection.linesSelectArr = res.data.rows
    })
    jcbzSelect().then(res => {
      // 检测班组
      this.selection.jcbzSelectArr = res.data.rows
    })

    xw({ fzmc: this.$dl+this.$xb }).then(res => {
      // xb
      this.selection.xwArr = res.data.rows
    })
    xw({ fzmc: '带电检测计划来源' }).then(res => {
      // 计划来源
      this.selection.jhlyArr = res.data.rows
    })
  },
  mounted() {
    taskBar().then(res => {
      let data = res.data.data
      //  colorBar(containaerId, series, xdata, legenddata, callback)
      let xdata = []
      let series = []
      let legenddata = []
      console.log(data)
      data.forEach(element => {
        xdata.push(element.jclx)
        element.values.forEach(res => {
          if ([...new Set(legenddata)].indexOf(res.value) === -1) {
            legenddata.push(res.value)
            series.push({
              type: 'bar',
              barWidth: '10%',
              data: [res.count],
              name: res.value
            })
          } else {
            series[[...new Set(legenddata)].indexOf(res.value)]['data'].push(
              res.count
            )
          }
        })
      })
      this.$chart.colorBar(
        'p1',
        series,
        xdata,
        legenddata,
        (myChart, option) => {
          myChart.setOption(option)
        }
      )
    })
  },
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

    reset() {
      this.form = {
        xlid: '',
        dlid: '',
        jhzxzt: '',
        sfcq: '',
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

    lookOverBtn(val) {
      this.isEdit = false
      this.openID = val
    },
        // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      if (row.sfcq == '是') {
        return 'background-color: #ffc3cb'
      }
    },
    /**
     * 接收查看/编辑子组件的数据
     */

    parentFn(val) {
      this.isShowDialog = false
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
