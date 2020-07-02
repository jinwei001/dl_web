<template>
  <!--   <h2>
    隐患高发组件
  </h2> -->
  <!-- ----------------------------------[图表区]---------------------------------------- -->
  <el-row :gutter="20" style="margin-bottom: 1rem;">
    <el-col :span="24">
      <el-card class="tz-box-card" style="min-height: 300px;text-align: center;font-size: 30px;color: #606266;">
        <!-- 图表待开发 -->
        <p style="line-height: 300px;" v-if="barshow==false">当前图表数据为空</p>
        <monochromeStereoHistogram
          v-if="barshow"
          style="height: 300px;"
          :chartdata="timechatrts"
          :charts-configuration="charts1Configuration"
          :chartsname='chartsname'
        />
      </el-card>

    <div class="content">
      <el-table :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}"
        :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}" border fit highlight-current-row
       >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column v-for="item in tableTitle" :key="item.index" :prop="item.prop" :label="item.label" align="center"
          :show-overflow-tooltip="true" />
      </el-table>
      <pagination v-show="form.total>0" :total="form.total" :page.sync="tableParam.nowPage" :limit.sync="form.limit"
        @pagination="getList" />
    </div></el-col>
  </el-row>
</template>

<script>
import monochromeStereoHistogram from '@/charts/Histogram/MonochromeStereoHistogram'
 import Pagination from '@/components/Pagination'
  import qs from 'qs'
 import {
    Higlist
  } from '@/api/Sixdefensemanagement/HiddenInformationReview'

export default {
  name: '',
  components: {
    monochromeStereoHistogram,
    Pagination
  },
  props: {
    barData: {
     type: Object,
        // 对象或数组且一定会从一个工厂函数返回默认值
        default: function() {
          return {}
        }
      // chartData: Array,
      // chartsconfiguration: Object
    },
    time: {
      type: Array,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function() {
        return []
      }
    },
    typename:{
      type: String,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function() {
        return ''
      }
    }
  },
  data() {
    return {
      tableParam: {
        // 列表查询的参数
        startTime: '',
        endTime: '',
        nowPage: 1,
        sixhdtype:''
      },
      form: {
        pageNum: 1,
        limit: 10,
        total: 2
      },
      tableTitle: [
        {
         label: this.$xl+'名称',
          prop: 'linename'
        },
        {
          label: this.$dl,
          prop: 'dianLanName'
        },
        {
          label: this.$xb,
          prop: 'phase'
        },
        {
          label: '隐患设备类型',
          prop: 'sheBeiTypeName'
        },
        {
          label: '隐患设备',
          prop: 'sheBeiName'
        },
        {
          label: '六防隐患类型',
          prop: 'liuFangName'
        },
        {
          label: '隐患部位',
          prop: 'yinHuanBuWeiName'
        },
        {
          label: '隐患类型',
          prop: 'yinHuanLeiXingName'
        },
        {
          label: '隐患原因',
          prop: 'hdreason'
        }
      ],
      tableData: [],
      chartsname:'隐患高发',
      timechatrts:[],
      barshow: false,
      charts1Configuration: {
        title: ''
      },
      chart1data: [{
        xAxisName: '厂家1',
        value: '0',
        edgecolor: '#991999',
        columnColor: '#800080'
      },
      {
        xAxisName: '厂家2',
        value: '0',
        edgecolor: '#97cfff',
        columnColor: '#69b9fd'
      },
      {
        xAxisName: '厂家3',
        value: '0',
        edgecolor: '#ffb33f',
        columnColor: '#ff9a26'
      }, {
        xAxisName: '厂家4',
        value: '0',
        edgecolor: '#1919ff',
        columnColor: '#0000ff'
      },
      {
        xAxisName: '厂家5',
        value: '0',
        edgecolor: '#199919',
        columnColor: '#008000'
      },
      {
        xAxisName: '厂家6',
        value: '0',
        edgecolor: '#ff8484',
        columnColor: '#ff6b6b'
      },
      {
        xAxisName: '厂家3',
        value: '0',
        edgecolor: '#979bf3',
        columnColor: '#8085e9'
      }, {
        xAxisName: '厂家4',
        value: '0',
        edgecolor: '#ff4cff',
        columnColor: '#ff33ff'
      },
      {
        xAxisName: '厂家5',
        value: '0',
        edgecolor: '#199919',
        columnColor: '#008000'
      },
      {
        xAxisName: '厂家6',
        value: '0',
        edgecolor: '#ff8484',
        columnColor: '#ff6b6b'
      }
      ]
    }
  },
  mounted() {
    this.barchartsdata()
    this.getList()
    // //console.log(this.barData, '内部')
    // //console.log(this.chartsconfiguration)
  },
  watch: {
      barData(val, newval) {
          // //console.log(newval)
          this.barchartsdata()
          this.getList()
      },
      typename(val, newval){
        this.barchartsdata()
        this.getList()
      }
  },
  methods: {
    getList() {

      if (this.time!== null) {
        this.tableParam.startTime = this.time[0]
        this.tableParam.endTime = this.time[1]
      }
      if(this.typename!== null){
        this.tableParam.sixhdtype=this.typename
      }
      Higlist(qs.stringify(this.tableParam)).then(response => {
        if (response.status == 200) {
          this.tableData = response.data.rows[0].dataList
          this.form.total = response.data.rows[0].totleNumber
        }
      })
    },
    barchartsdata() {
     this.barshow = false
      let timedata=this.chart1data
      if(this.barData.nameList.length>0&&this.barData.countList.length>0){
          for (let s = 0; s < this.barData.nameList.length; s++) {
            timedata[s].xAxisName = this.barData.nameList[s]
          }
          for (let h = 0; h < this.barData.countList.length; h++) {
            timedata[h].value = this.barData.countList[h]
          }
        this.timechatrts=timedata.slice(0,this.barData.nameList.length)
        console.log(this.timechatrts)
        // //console.log(timedata,'生成后数据')
        this.barshow = true
      }else{
        timedata=[]
      }
    }
  }

}
</script>
