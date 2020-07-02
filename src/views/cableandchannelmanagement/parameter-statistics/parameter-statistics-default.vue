<template>
  <!-- <h2>
      台账统计
  </h2>-->
  <div>
    <el-card class="tz-box-card">
      <div ref="chart" style="height: 300px" />
    </el-card>
    <div class="content" style="margin-top: 1rem">
      <div class="main-userSelect">
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <el-form-item :label="`${$dydj}:`">
              <!--<el-input v-model="form.voltageRank" clearable/>-->
              <el-select v-model="form.voltageRank" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.dydj"
                  :key="item.dydj"
                  :label="item.dydjmc"
                  :value="item.dydjmc"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="`${$xl}名称:`">
              <!--<el-input v-model="form.lineName" clearable/>-->
              <el-select v-model="form.lineId" clearable filterable placeholder="请选择">
                <el-option
                  v-for="item in selection.xlmc"
                  :key="item.lineId"
                  :label="item.lineName"
                  :value="item.lineId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="运维班组:">
              <!--<el-input v-model="form.groupId" clearable/>-->
              <el-select v-model="form.groupId" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.ywbz"
                  :key="item.groupId"
                  :label="item.groupname"
                  :value="item.groupId"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="设备主人:">
              <el-input v-model="form.facilityMaster" clearable/>
            </el-form-item> -->
            <el-form-item style="float: right;margin-right: 0">
              <el-button class="onSearch" @click="onSearch">查询</el-button>
              <el-button class="onSearch" style="margin-right: 0" @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="content">
      <el-table
        :data="tableData"
        style="border: 1px solid #c7c7c7"
        height="400px"
        :cell-style="{borderColor: '#c7c7c7'}"
        :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}"
        border
        fit
        highlight-current-row
        @selection-change="CheckFun"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column
          v-for="item in tableTitle"
          :key="item.index"
          :prop="item.prop"
          :label="item.label"
          align="center"
          :show-overflow-tooltip="tabisoverflow"
        />
        <el-table-column prop="lineRank" :label="`${$dl}等级`" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.lineRank == ''"></div>
            <div v-if="scope.row.lineRank == 1">一级高压{{$dl}}</div>
            <div v-if="scope.row.lineRank == 2">二级高压{{$dl}}</div>
            <div v-if="scope.row.lineRank == 3">三级高压{{$dl}}</div>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="form.total>0"
        :total="form.total"
        :page.sync="form.pageNum"
        :limit.sync="form.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import ParameterStatisticsDefault from '../../../charts/parameter-statistics/parameter-statistics-default.js'
import Pagination from '@/components/Pagination'
import {
  List,
  cableSelectInfo
} from "@/api/cableandchannel/parameter-statistics/parameterStatistics";
import {getLineSelect} from "@/api/cableandchannel/cable-equipment-ledger/Line/index";
export default {
  name: '',
  components: {
    Pagination
  },
  data() {
    return {
      form: {
        voltageRank: '',
        lineName: '',
        lineId: '',
        groupId: '',
        facilityMasterId: '',
        dydj: '',
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      // 选中的数据
      CheckedSelection: [],
      tabisoverflow: true,
      // 表头
      tableTitle: [{
        label: this.$xl + '名称',
        prop: 'lineName'
      },
      {
        label: this.$dydj,
        prop: 'voltageRank'
      },
      {
        label: '设备主人',
        prop: 'facilityMaster'
      },
      {
        label: '运维班组',
        prop: 'groupname'
      },
      // {
      //   label: 'XL定级',
      //   prop: 'lineRank'
      // }
      ],
      tableData: [],
      selection: {
        ywbz: [],
        dydj: [],
        xlmc: [],
      },
      xAxisData: [],
      yAxisData: [
        [],
        [],
        []
      ],
      legendData: ['220' + this.$qf, '110' + this.$qf, '35' + this.$qf]
    }
  },
  mounted() {
    this.getList()
    this.getSelect()
    this.getCableSelectInfo()
  },
  methods: {
    // 获取下拉数据
    getSelect() {
      getLineSelect().then(response => {
        //console.log(response);
        if(response.status == 200) {
          this.selection.ywbz = response.data.data.groupList
          this.selection.dydj = response.data.data.dydjList
          this.selection.xlmc = response.data.data.lineList
        }
      }),
      getLineSelect().then(response => {
        //console.log(response,'111111111111111');
        if(response.status == 200) {
          this.selection.ywbz = response.data.data.groupList
          this.selection.jgxs = response.data.data.jgxsList
          
        }
      })
    },
    // 图表数据
    getCableSelectInfo() {
      cableSelectInfo().then(response => {
        // //console.log(response)
        //console.log(response.data.data.X)
        let xdata = response.data.data.X
        xdata.forEach(ele => {
          // //console.log(ele);
          this.xAxisData.push(ele.totalLengths)
          this.xAxisData.push(ele.lineCount)
          this.xAxisData.push(ele.terminalCount)
          this.xAxisData.push(ele.spliceCount)
        })
        //console.log(this.xAxisData);
        //console.log(response.data.data.Y)
        let ydata = response.data.data.Y
        ydata.forEach(ele => {
          //console.log(ele.voltageRank);
          if (ele.voltageRank == '220' + this.$qf){
            this.yAxisData[0].push(ele.totalLengths)
            this.yAxisData[0].push(ele.lineCount)
            this.yAxisData[0].push(ele.terminalCount)
            this.yAxisData[0].push(ele.spliceCount)
          } else if (ele.voltageRank == '110' + this.$qf) {
            this.yAxisData[1].push(ele.totalLengths)
            this.yAxisData[1].push(ele.lineCount)
            this.yAxisData[1].push(ele.terminalCount)
            this.yAxisData[1].push(ele.spliceCount)
          } else if (ele.voltageRank == '35' + this.$qf) {
            this.yAxisData[2].push(ele.totalLengths)
            this.yAxisData[2].push(ele.lineCount)
            this.yAxisData[2].push(ele.terminalCount)
            this.yAxisData[2].push(ele.spliceCount)
          }
        })
        //console.log(this.yAxisData);

        this.renderChart()
      })
    },
    /**
       * 创建图表实例
       */
    renderChart() {
      const dom = this.$echarts.init(this.$refs.chart)
      dom.setOption(ParameterStatisticsDefault)
      // 渲染图表
      dom.setOption({
        legend: [{
          data: this.legendData
        }],
        xAxis: [{
          data: this.xAxisData
        }],
        series: [{
          name: this.legendData[0],
          data: this.yAxisData[0]
        },
        {
          name: this.legendData[0],
          data: this.yAxisData[0]
        },
        {
          name: this.legendData[0],
          data: this.yAxisData[0]
        },
        {
          name: this.legendData[1],
          data: this.yAxisData[1]
        },
        {
          name: this.legendData[1],
          data: this.yAxisData[1]
        },
        {
          name: this.legendData[1],
          data: this.yAxisData[1]
        },
        {
          name: this.legendData[2],
          data: this.yAxisData[2]
        },
        {
          name: this.legendData[2],
          data: this.yAxisData[2]
        },
        {
          name: this.legendData[2],
          data: this.yAxisData[2]
        }
        ]
      })
    },
    /**
       * 查询按钮
       */
    onSearch() {
      // //console.log('查询')
      // if(this.form.groupName){ // 运维班组
      //   let searcharr = this.selection.ywbz.filter(res=>{
      //     return this.form.groupName == res.groupId
      //   })
      //   this.form.groupName = searcharr[0]['groupname']
      // }
      // if(this.form.lineName){ // XL名称
      //   let searcharr = this.selection.xlmc.filter(res=>{
      //     return this.form.lineName == res.lineId
      //   })
      //   this.form.lineName = searcharr[0]['lineName']
      // }
      // if(this.form.voltageRank){ // dydj        
      // let searcharr = this.selection.dydj.filter(res=>{
      //     return this.form.voltageRank == res.dydj
      //   })
      //   this.form.voltageRank = searcharr[0]['dydjmc']
      // }

      this.form.pageNum = 1
      this.getList()
    },
    /**
       * 重置按钮
       */
    reset() {
      // //console.log('重置按钮')
      this.form = { brand_right: 0 }
      this.form.pageNum = 1
      this.form.pageSize = 10
      this.getList()
    },
    // 选中数据
    CheckFun(val) {
      this.CheckedSelection = val
      //console.log(this.CheckedSelection)
    },
    // 获取数据
    getList() {
      List(this.$qs.stringify(this.form)).then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.tableData = response.data.rows;
          this.form.total = response.data.total;
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
  .box-card {
    width: 100%;

    .el-card__body {
      padding: 0 !important;
    }
  }
</style>
<style lang="scss">
  .change_contant {
    .el-card__body {
      padding: 0 !important;
    }
  }
</style>
