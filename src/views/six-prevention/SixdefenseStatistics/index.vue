<template>
  <!--   <h2>
   六防统计
  </h2> -->
  <div class="main-body" v-loading="loading">

    <div class="content" style="margin-top: 1rem">
      <div class="main-userSelect">
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <el-form-item label="日期:">
              <el-date-picker :change='getdatefun()' v-model="time" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :onPick="pickerOptions()"
                style="width: 100%;" />
            </el-form-item>
            <el-form-item :label="$dydj">
              <el-select v-model="dianYaDengJi" clearable placeholder="请选择隐患类型">
                <el-option v-for="item in selection.dianYaDengJi" :key="item.id" :label="item.value" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-card class="box-card">
              <monochromeStereoHistogram style="height: 300px;" :chartdata="chart1data" :charts-configuration="charts1Configuration"
                :chartsname='chartsname' v-if='barshow'></monochromeStereoHistogram>
            </el-card>
          </el-form>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import qs from 'qs'

  import {
    setList,
    statistic_sixType
  } from '@/api/Sixdefensemanagement/HiddenDangerReview'
  import monochromeStereoHistogram from '@/charts/Histogram/MonochromeStereoHistogram'
  export default {
    name: '',
    components: {
      monochromeStereoHistogram
    },
    data() {
      return {
        chartsname: '六防统计分析',
        timechatrts: [],
        barshow: false,
        charts1Configuration: {
          title: ''
        },
        chart1data:[],
        chart2data: [{
            xAxisName: '防过热',
            value: '10',
            edgecolor: '#991999',
            columnColor: '#800080'
          },
          {
            xAxisName: '防火',
            value: '20',
            edgecolor: '#97cfff',
            columnColor: '#69b9fd'
          },
          {
            xAxisName: '防水',
            value: '10',
            edgecolor: '#ffb33f',
            columnColor: '#ff9a26'
          }, {
            xAxisName: '防外破',
            value: '20',
            edgecolor: '#1919ff',
            columnColor: '#0000ff'
          },
          {
            xAxisName: '附属设施要求',
            value: '10',
            edgecolor: '#199919',
            columnColor: '#008000'
          },
          {
            xAxisName: '通道类要求',
            value: '10',
            edgecolor: '#ff8484',
            columnColor: '#ff6b6b'
          },
          {
            xAxisName: '附属设备异常',
            value: '20',
            edgecolor: '#979bf3',
            columnColor: '#8085e9'
          }

        ],
        dianYaDengJi: '',
        loading: false,
        time: [],
        selection: {
          dianYaDengJi: []
        }
      }
    },
    mounted() {
      this.setListfun()
      this.statistic_sixType_fun()
    },
    watch: {
      time: {
        handler(newValue, oldValue) {

          this.statistic_sixType_fun()
        },
        deep: true
      },
      dianYaDengJi: {
        handler(newValue, oldValue) {
         this.statistic_sixType_fun()
        },
        deep: true
      }
    },
    methods: {
      //获取默认下拉数据
      setListfun() {
        const list = {
          nowPage: 1
        }
        setList(qs.stringify(list)).then(response => {
          if (response.status == 200) {
            this.show = true
            this.selection = response.data.rows[0]
          }
        })
      },
      statistic_sixType_fun() {
        this.barshow = false
        console.log(this.time)
        this.chart1data=this.chart2data
        const list = {
          voltageRank: this.dianYaDengJi,
          startTime: this.time === null ? '' : this.time[0],
          endTime: this.time === null ? '' : this.time[1]
        }
        statistic_sixType(qs.stringify(list)).then(response => {
          if (response.status == 200) {
            console.log(response.data.data)
            if(response.data.data.length>0){
              for (let s = 0; s < response.data.data.length; s++) {
              this.chart1data[s].xAxisName = response.data.data[s].six_type
              this.chart1data[s].value = response.data.data[s].count
            }
            this.chart1data = this.chart1data.slice(0, response.data.data.length)
            this.barshow = true
            }else{
               this.barshow = false
            }
          }
        })
      },
      pickerOptions(maxDate, minDate) {
        // //console.log(maxDate, minDate)
      },
      getdatefun() {

      },
      getTableList() {

      }
    }
  }
</script>
