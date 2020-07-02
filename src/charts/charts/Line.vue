<template>
  <!-- 阴影背景曲线图 -->
  <div id="myChart"/>
</template>

<script>
export default {
  props: [
      'chartdata',
      'chartsConfiguration'
    ],
  data() {
    return {
      echarts: null
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        // 绘制图表
        title: {
          text: '',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          left: '6%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          right: '2%',
          orient: 'vertical',
          icon: 'circle',
          itemWidth: 16,  // 设置宽度
          itemHeight: 16, // 设置高度
          itemGap: 20, // 设置间距
          top:90,
          data: this.chartsConfiguration.legend,
          textStyle: {
            fontSize: 16,
            color: 'black'
          }
        },
      
        dataZoom: [
          //给x轴设置滚动条
          {
            type: "slider",
            show: true, //flase直接隐藏图形
            xAxisIndex: [0],
            left: "10%", //滚动条靠左侧的百分比
            bottom: -5,
            right: "10%",
            start: 0, //滚动条的起始位置
            end: 100, //滚动条的截止位置（按比例分割你的柱状图x轴长度）
            startValue: 0, // 从头开始。
            endValue: 30 // 一次性展示10个。
          }
        ],
        grid: {
          left: '3%',
          right: '10%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: 'black'
            }
          },
          data: this.chartsConfiguration.xAxis,
        }],
        yAxis: [{
          name:this.chartsConfiguration.name,
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'black'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        series: [{
          name: this.chartsConfiguration.legend[0],
          type: 'line',
          smooth: true,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(124,181,236, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(124,181,236, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(124,181,236, 0.5)',
              lineStyle: {
                color: 'rgba(124,181,236,1)' // 改变折线颜色
              }
            }
          },
          data: this.chartdata.series[0]
        }, {
          name: this.chartsConfiguration.legend[1],
          type: 'line',
          smooth: true,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(67,67,72, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(67,67,72, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgba(67,67,72, 0.5)',
              lineStyle: {
                color: 'rgba(67,67,72,1)' // 改变折线颜色
              }
            }
          },
          data: this.chartdata.series[1]
        }, {
          name: this.chartsConfiguration.legend[2],
          type: 'line',
          smooth: true,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(128,133,233, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(128,133,233, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgba(128,133,233, 0.5)',
              lineStyle: {
                color: 'rgba(128,133,233,1)' // 改变折线颜色
              }
            }
          },
          data: this.chartdata.series[2]
        }]
      })
    }
  }
}
</script>

<style>
</style>
