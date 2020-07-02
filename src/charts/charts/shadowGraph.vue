<template>
  <!-- 阴影背景曲线图通用组件 -->
<!--  老旧中使用 -->
  <div id="myChart" ref="echarts" />
</template>

<script>
export default {
  name: '',
  props: {
    chartdata2pn: {
      type: Object,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function() {
        return {

        }
      }
    }
  },
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
      const myChart = this.$echarts.init(this.$refs.echarts)
      // 绘制图表
      var option = ({
        // 绘制图表
        title: {
          text: this.chartdata2pn.title,
          textStyle: {
            fontWeight: '600',
            fontSize: 18,
            color: 'black',

          },
        x:'center',
        y:'top',
        textAlign:'left'
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
          right: '0%',
          orient: 'vertical',
          icon: 'circle',
          itemWidth: 12, // 设置宽度
          itemHeight: 12, // 设置高度
          itemGap: 15, // 设置间距
          top: 25,
          data: this.chartdata2pn.legend.name,
          textStyle: {
            fontSize: 12,
            color: 'black',
            fontWeight: '600',
          }
        },
        grid: {
          left: '3%',
          right: '15%',
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
          data: this.chartdata2pn.legend.data
        }],
        yAxis: [{
          name: '',
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
              color: '#ececec'
            }
          }
        }],
        series: []
      })
      option.series = []
      if (this.chartdata2pn.data.length > 0) {
        const data = this.chartdata2pn.data
        for (var i = 0; i < data.length; i++) {
          const moban = {
            name: this.chartdata2pn.legend.name[i],
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
                  color: data[i].color[0]
                }, {
                  offset: 0.8,
                  color: data[i].color[1]
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: data[i].normal[0],
                lineStyle: {
                  color: data[i].normal[1] // 改变折线颜色
                }
              }
            },
            data: data[i].data

          }
          option.series.push(moban)
        }
      }
      myChart.setOption(option)
    }

  }
}
</script>

<style>
</style>
