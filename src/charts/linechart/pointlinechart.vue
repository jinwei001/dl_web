<template>
  <!--  带点折现图组件 -->

  <div ref="echarts" :style="{width: '100%'}" />
</template>

<script>
  export default {
    name: '',
    props: {
      chartsdata: {
        default: []

      },
      Configuration: {
        default: {}

      },
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
        var option = {
          backgroundColor: '#FFF',
          grid: this.Configuration.grid,
          tooltip: {
            trigger: 'axis',
            label: {
              show: true
            }
          },
          dataZoom: [{
              type: 'slider',
              show: true,
              start: 0,
              end: 100,
              handleSize: 100,
            },
            {
              type: 'inside',
              start: 90,
              end: 100
            },
            {
              type: 'slider',
              show: true,
              yAxisIndex: 0,
              filterMode: 'empty',
              width: 12,
              height: '70%',
              handleSize: 8,
              showDataShadow: false,
              left: '93%'
            }
          ],
          legend: {
            data: [],
          },
          xAxis: {
            color:'black',
            axisLabel: {
              interval: 0,
              rotate: this.Configuration.angle
            },
            boundaryGap: true, // 默认，坐标轴留白策略
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            data: this.Configuration.Xname
          },
          yAxis: {
            name: this.Configuration.Yunit,
            axisLine: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: 'rgba(33,148,246,0.2)'
              }
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: 'rgb(245,250,254)'
              }
            }
          },
          series: []
        }
        for (let i = 0; i < this.chartsdata.length; i++) {
          var seriesmodel = {
            name: this.chartsdata[i].name,
            type: 'line',
            symbol: 'circle',
            symbolSize: 7,
            lineStyle: {
              color: '#ffff00',
              shadowBlur: 12,
              shadowColor: 'rgb(255,255,0,0.9)',
              shadowOffsetX: 1,
              shadowOffsetY: 1
            },
            itemStyle: {
              color: '#ffff00',
              borderWidth: 2,
              borderColor: '#FFF'
            },
            label: {
              show: false,
              distance: 1,
              emphasis: {
                show: true,
                offset: [25, -2],
                // borderWidth:1,
                // borderColor:'rgb(33,148,246)',
                // formatter:'{bg|{b}\n数据量:{c}}',
                // backgroundColor: {
                //   image: uploadedDataURL
                // },
                color: '#FFF',
                padding: [8, 20, 8, 6],
                // width:60,
                height: 36,
                formatter: function(params) {
                  var name = params.name
                  var value = params.data
                  var str = name + '\n数据量：' + value
                  return str
                },
                rich: {
                  bg: {
                    // backgroundColor: {
                    //   image: uploadedDataURL
                    // },
                    width: 78,
                    // height:42,
                    color: '#FFF',
                    padding: [20, 0, 20, 10]
                  },
                  br: {
                    width: '100%',
                    height: '100%'
                  }

                }
              }
            },
            data: []
          }
          seriesmodel.lineStyle.color = this.chartsdata[i].color
          seriesmodel.itemStyle.color = this.chartsdata[i].color
          seriesmodel.data = this.chartsdata[i].data
          // //console.log(seriesmodel.data, '数据')
          option.series.push(seriesmodel)
          option.legend.data.push(this.chartsdata[i].name)
          // //console.log(option.series[i].data, '行内数据')
        }
        myChart.setOption(option)
      }
    }
  }
</script>

<style>
</style>
