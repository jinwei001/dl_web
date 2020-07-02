<template>
  <!-- 多色立体柱状图 -->
  <div ref="echarts" :style="{width: '100%'}" />
</template>
<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      echarts: null
    }
  },
  mounted() {
    // let i = 1

    // setInterval(() => {
    //   this.$store.commit('updateCount', i++)
    // }, 1000)
    this.drawLine()
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(this.$refs.echarts)
      // 绘制图表
      myChart.setOption({
        // 绘制图表
        // backgroundColor: '#001120',
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '广告'],
          textStyle: {
            color: 'rgba(55,255,249,1)'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          offset: 20,
          data: [this.$xl+'总数', '回路总数', '终端总数'],
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'black'
            }
          },
          axisLabel: {
            color: 'black'
          }
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'black'
            }
          }
        }],
        series: [{
          name: '柱体1',
          type: 'bar',
          barWidth: 25, // 柱子宽度
          barGap: 0.5, // 柱子之间间距
          emphasis: {
            itemStyle: { // 填充部分鼠标移上去颜色
              // color: 'rgba(255, 0, 0, 0.4)'
            }
          },

          itemStyle: {
            normal: {
              color: '#69b9fd',
              borderWidth: '1',
              borderColor: 'rgba(255, 0, 0 , 0.3)'
            }
          },
          data: [101],
          legendHoverLink: false,
          z: 1
        }, {
          name: '柱体1',
          tooltip: {
            show: false
          },
          type: 'pictorialBar',
          itemStyle: {
            normal: { // 未填充部分鼠标移上去颜色
              color: '#69b9fd',
              borderWidth: 1,
              borderColor: '#69b9fd'
            }
          },
          symbolRotate: 0,
          symbolSize: [25, 11],
          symbolOffset: [-24, 2],
          symbolPosition: 'start',
          data: [],
          z: 3
        },
        {
          name: '柱体1',
          tooltip: {
            show: false
          },
          type: 'pictorialBar',
          itemStyle: {
            normal: {
              color: '#97cfff',
              borderWidth: 1,
              borderColor: '#97cfff'
            }
          },

          symbolRotate: 0,
          symbolSize: [16, 6],
          symbolOffset: [-24, '-2'],
          symbolPosition: 'end',
          data: [],
          z: 3
        }, {
          name: '柱体2',
          type: 'bar',
          // label: {
          //     show: true,
          //     position: 'top',
          //     textStyle: {
          //         color: 'red',
          //     }
          // },

          barWidth: 16, // 柱子宽度
          barGap: 0.5, // 柱子之间间距
          emphasis: {
            itemStyle: { // 左侧未填充部分鼠标移上去颜色
              color: 'rgba(143, 219, 255, 0.45)',
              barBorderColor: 'rgba(143, 219, 255 ,1)'
            }
          },
          itemStyle: {
            normal: {
              color: 'rgba(143, 219, 255, 0.45)',
              barBorderColor: 'rgba(143, 219, 255 ,1)'
            }
          },
          data: [],
          z: 1
        },
        {
          name: '柱体2',
          tooltip: {
            show: false
          },
          type: 'pictorialBar',
          itemStyle: {
            normal: {
              color: 'rgba(143, 219, 255, 0.45)',
              borderWidth: 1,
              borderColor: 'rgba(143, 219, 255, 1)'
            }
          },

          symbolRotate: 0,
          symbolSize: [16, 6],
          symbolOffset: [0, '-2'],
          symbolPosition: 'end',
          data: [],
          z: 3
        }, {
          name: '柱体2',
          tooltip: {
            show: false
          },
          type: 'pictorialBar',

          itemStyle: {
            normal: {
              color: 'rgba(143, 219, 255, 0.45)',
              borderWidth: 1,
              borderColor: 'rgba(143, 219, 255, 0.45)'
            }
          },
          symbolRotate: 0,
          symbolSize: [16, 6],
          symbolOffset: [0, 2],
          symbolPosition: 'start',
          data: [],
          z: 3
        },

        {
          type: 'bar',
          name: '柱体3',
          barWidth: 16, // 柱子宽度
          barGap: 0.5, // 柱子之间间距
          // label: {
          //     show: true,
          //     position: 'top',
          //     textStyle: {
          //         color: 'red',
          //     }
          // },
          emphasis: {
            itemStyle: { // 左侧未填充部分鼠标移上去颜色
              color: 'rgba(143, 219, 255, 0.45)',
              barBorderColor: 'rgba(143, 219, 255 ,1)'
            }
          },
          itemStyle: {
            normal: {
              color: 'rgba(143, 219, 255, 0.45)',
              barBorderColor: 'rgba(143, 219, 255 ,1)'
            }
          },
          data: [],
          z: 3
        },
        {
          name: '柱体3',
          tooltip: {
            show: false
          },
          type: 'pictorialBar',
          itemStyle: {
            normal: {
              color: 'rgba(143, 219, 255, 0.45)',
              borderWidth: 1,
              borderColor: 'rgba(143, 219, 255, 1)'
            }
          },

          symbolRotate: 0,
          symbolSize: [16, 6],
          symbolOffset: [24, -2],
          symbolPosition: 'end',
          data: [],
          z: 3
        },
        {
          name: '柱体3',
          tooltip: {
            show: false
          },
          type: 'pictorialBar',

          itemStyle: {
            normal: {
              color: 'rgba(143, 219, 255, 0.45)',
              borderWidth: 1,
              borderColor: 'rgba(143, 219, 255, 0.45)'
            }
          },
          symbolRotate: 0,
          symbolSize: [16, 6],
          symbolOffset: [24, 2],
          symbolPosition: 'start',
          data: [],
          z: 3
        }
        ]
      })
    }
  }
}
</script>
