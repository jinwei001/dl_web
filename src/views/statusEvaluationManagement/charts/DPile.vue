<template>
  <div class="x-bar" style='height:100%'>
    <div :id="id" :option="options"></div>
  </div>
</template>
<script>
import HighCharts from 'highcharts'
import VueHighCharts from 'vue-highcharts'
import highcharts3d from 'highcharts/highcharts-3d'
highcharts3d(HighCharts)
export default {
  // 验证类型
  props: {
    id: '',
    option_3d: {}
  },
  data() {
    return {
      pieData: { data: [] },
      options: {
        chart: {
          margin: [10, 60, 0, 0],
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 60
          }
        },
        title: {
          text: this.option_3d.title?this.option_3d.title:'',
          align: 'left',
          style: {
            fontSize: 14,
            fontWeight: '600'
          }
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        colors: ['#0ee7e0', '#ffdf2d', '#ff9b2b', '#ff6b6b', '#19b8ff'],
        plotOptions: {
          pie: {
            allowPointSelect: true,
            showInLegend: true,
            cursor: 'pointer',
            depth: 30,
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}/{point.y}</b>/ {point.percentage:.1f} %'
            }
          }
        },
        credits: {
          enabled:false
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          itemMarginTop: 10,
          // borderWidth: 0,
          x: -100, //距离x轴的距离
          y: 50 //距离Y轴的距离
        },
        series: [
          {
            data: this.option_3d.data
          }
        ]
      }
    }
  },
  methods:{
    
  },
  updated() {
    //console.log(this.option_3d)
  },
  watch: {
    'option_3d.data': {
      handler(newValue, oldValue) {
        HighCharts.chart(this.id, this.options)
      },
      deep: true
    }
  },
  mounted() {
    this.pieData = this.option_3d
    HighCharts.chart(this.id, this.options)
  }
}
</script>