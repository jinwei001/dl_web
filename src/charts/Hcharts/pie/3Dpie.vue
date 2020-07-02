<template>
  <div class="x-bar">
    <div :id="id" :style="{height: chartHeight + 'px'}" />
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
      id: {
        type: String
      },
      chartdata: {
        type: Object
      },
      chartHeight: {
        type: null
      }
    },
    data() {
      return {
        pie: {
          chart: {
            type: 'pie',
            options3d: {
              enabled: true,
              alpha: 58,
              beta: 0
            }
          },
          title: {
            text: this.chartdata.title,
            style: {
              fontWeight: '600'
            }
          },
          tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
          },
          colors: ['#7cb5ec', '#434348'],
          plotOptions: {
            pie: {
              allowPointSelect: true,
              showInLegend: true,
              cursor: 'pointer',
              depth: 20,
              dataLabels: {
                enabled: true,
                format: '{point.name}/{point.y}' + this.chartdata.unit + '/{point.percentage:.1f}%'
              }
            }
          },
          credits: {
          enabled:false
        },
          legend: this.chartdata.legend,
          series: [{
            type: 'pie',
            // name: '浏览器占比',
            data: this.chartdata.data
          }]
        }
      }
    },
    mounted() {
      this.renderChart()
    },
    methods: {
      renderChart() {
        this.pie.colors = this.chartdata.colors
        HighCharts.chart(this.id, this.pie)
      }
    }
  }
</script>
