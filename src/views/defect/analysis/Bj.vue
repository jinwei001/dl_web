<template>
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <div class="search-container">
          <el-form class="search-form" ref="form" inline>
            <el-form-item label="请选择时间" label-width="100">
              <el-date-picker v-model="form.date" type="daterange" value-format="yyyy-MM-dd" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <div class="search-buttons">
              <el-button type="primary" size="small" @click="onSearch" class="onSearch">查询</el-button>
              <el-button type="primary" size="small" @click="reset" class="UserSearchFun">重置</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div class="content">
      <!--图表-->
      <div class="mainFlex thrPileCon">
        <div id="p1" class="pie_s" style="height:300px;width:100%"></div>
      </div>
      <!--数据列表-->
      <el-table border stripe :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}" :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}" highlight-current-row @selection-change="CheckFun">
        <!--表格列-->
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column prop="voltageRank" :label="`${$dydj}`" min-width="120"></el-table-column>
        <el-table-column prop="lineName" :label="`${$xl}`" min-width="80"></el-table-column>
        <el-table-column prop="dlName" :label="`${$dl}`" min-width="80"></el-table-column>
        <el-table-column prop="bw" label="部位" min-width="80"></el-table-column>
        <el-table-column prop="qxGrade" label="缺陷等级" min-width="120"></el-table-column>
        <el-table-column label="状态" min-width="80">
          <template slot-scope="scope">
            <div>
              {{scope.row.qxStatus | defectStatue}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="discoveryTime" label="发现时间" min-width="160"></el-table-column>
        <el-table-column prop="bj" label="部件" min-width="80"></el-table-column>
      </el-table>
      <Pagination v-show="pageDetail.total>0" :total="pageDetail.total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize" @pagination="getData" />
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import Pagination from '@/components/Pagination'
import {
  analysisList as list,
  xlList, // xl列表
  bjBar as taskBar
} from '@/api/defect'
import Vue from 'vue'
import myCharts from '@/views/statusEvaluationManagement/charts/chartsOption'
Vue.use(myCharts)

export default {
  name: 'analysis',
  components: {
    Pagination
  },
  created() {
    xlList().then(res => {
      // xl
      this.selection.linesSelectArr = res.data.data
    })
    this.getData()
    this.setBar()
  },
  data() {
    return {
      tableData: [],
      form: {
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
        linesSelectArr: []
      }
    }
  },

  methods: {
    async getData() {
      // 获取列表数据
      let res = await list(this.searchForm)
      this.tableData = res.data.rows
      this.pageDetail.total = res.data.total
    },
    setBar() {
      taskBar(this.searchForm).then(res => {
        let data = res.data.data
        let xdata = []
        let series = [
          {
            type: 'bar',
            barWidth: '2%',
            data: []
          }
        ]
        let legenddata = []
        data.forEach(element => {
          xdata.push(element.bj)
          series[0].data.push(element.num)
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
    CheckFun() {},
    onSearch() {
      for (let key in this.form) {
        this.searchForm[key] = this.form[key]
      }
      if (this.form.date.length == 0) {
        this.searchForm.beginTime = ''
        this.searchForm.endTime = ''
      } else {
        this.searchForm.beginTime = this.form.date[0]
        this.searchForm.endTime = this.form.date[1]
      }
      delete this.searchForm.date
      this.getData()
      this.setBar()
    },
    reset() {
      this.form = {
        date: [],
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  mounted() {}
}
</script>
