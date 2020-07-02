<template>
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <div class="search-container">
          <el-form class="search-form" ref="form" inline>
            <el-form-item :label="`${$dydj}`" label-width="90">
              <el-select clearable v-model="form.voltageRank">
                <el-option :value="`35${$qf}`">35{{$qf}}</el-option>
                <el-option :value="`110${$qf}`">110{{$qf}}</el-option>
                <el-option :value="`220${$qf}`">220{{$qf}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="`所属${$xl}`" label-width="100">
              <el-select clearable v-model="form.lineId" filterable class="form-item-select">
                <el-option v-for="item in selection.linesSelectArr" :key="item.line_id" :label="item.line_name" :value="item.line_id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年份" label-width="100">
              <el-date-picker style="width: 100%;" v-model="form.year" type="year" placeholder="选择年份" value-format="yyyy"></el-date-picker>
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
import RegisterOption from '@/charts/defetct/analysis/RegisterOption'
import Pagination from '@/components/Pagination'
import {
  analysisList as list,
  xlList, // xl列表
  analysisBar as taskBar,
  dyGetxl, // 电压获取线路

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
        lineId: '',
        voltageRank: '',
        year: '' + new Date().getFullYear(),
        pageNum: 1,
        pageSize: 10
      },
      pageDetail: {
        total: 0
      },
      searchForm: {
        year: '' + new Date().getFullYear(),
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
            barWidth: '10%',
            data: [],
            name: '严重'
          },
          {
            type: 'bar',
            barWidth: '10%',
            data: [],
            name: '一般'
          },
          {
            type: 'bar',
            barWidth: '10%',
            data: [],
            name: '危急'
          }
        ]
        let legenddata = ['严重', '一般', '危急']
        data.forEach(element => {
          series[0].data.push(element.yanzhong)
          series[1].data.push(element.yiban)
          series[2].data.push(element.weiji)
          xdata.push(element.qx_date)
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
      this.getData()
      this.setBar()
    },
    dyGetxlFun() {
      dyGetxl(this.form.voltageRank).then(res => {
        // xl
        this.form.lineId = ''
        this.selection.linesSelectArr = res.data.data
      })
    },
    reset() {
      this.form = {
        lineId: '',
        voltageRank: '',
        year: '' + new Date().getFullYear(),
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  mounted() {}
}
</script>
