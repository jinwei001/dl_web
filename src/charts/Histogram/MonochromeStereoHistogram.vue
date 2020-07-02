<template>
  <!--  单项立体柱状图组件 -->
  <!--组件在系统多处使用
    DL通道管理/台账统计/检测设备统计
    DL通道管理/台账统计/生产厂家统计
    六防管理/隐患高发XL
    具体使用请看同目录同名md文件
    -->
  <div ref="echarts" :style="{width: '100%'}" />
</template>

<script>
  export default {
    name: 'HelloWorld',
    props: {
      chartdata:{},
      chartsConfiguration: {
        type: Object,
        // 对象或数组且一定会从一个工厂函数返回默认值
        default: function() {
          return {}
        }
      },
      chartsname: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
          echarts:null
      }
    },
    mounted() {
      this.drawLine()
    },
    methods: {
      drawLine() {
        let chartsname=this.chartsname
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(this.$refs.echarts)
        // 绘制图表
        var option = {
          // 绘制图表
          // backgroundColor: '#001120',
          title: this.chartsConfiguration.title,
          tooltip: {
            trigger: 'axis',
            formatter(params) {
              // let _this=this
              if(chartsname=='隐患高发'){//提示框自己根据名称匹配
                 return params[0].name +'发生了'+params[0].value+"次隐患"
              }else{
                 return params[0].name+params[0].value
              }

            },
          },
          legend: {
            data: ['邮件营销'],
            textStyle: {
              color: 'rgba(55,255,249,1)'
            },
            show: false
          },
          scrollbar: {
            enabled: this.enabled // 是否显示滚动条
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            offset: 20,
            data: [],
            axisLine: {
              lineStyle: {
                color: 'black'
              }
            },
            max: this.max,
            axisLabel: {
              color: 'black',
            
            },
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
              'name': '',
              'type': 'pictorialBar',
              'symbolSize': [50, 22.5],
              'symbolOffset': [0, -10],
              'z': 12,
              'data': []
            }, {
              'name': '',
              'type': 'pictorialBar',
              'symbolSize': [50, 22.5],
              'symbolOffset': [0, 10],
              'z': 12,
              'data': []
            },
            {
              name: '邮件营销',
              type: 'bar',
              barWidth: 50,
              barGap: '100%',
              itemStyle: {
                color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#69b9fd'
                  },
                  {
                    offset: 1,
                    color: '#69b9fd'
                  }
                ])
              },
              'label': {
                'normal': {
                  'show': false,
                  'position': 'top',
                  'distance': -70,
                  'textStyle': {
                    'color': '#fff',
                    'fontSize': 40
                  }
                }
              },
              data: []
            }

          ]
        }
        option.series[0].data = []
        option.series[1].data = []
        option.series[2].data = []
        option.xAxis[0].data = []
        const self = this
        for (let i = 0; i < self.chartdata.length; i++) {
          const Columnarlayer = { // 柱行层
            'name': self.chartdata[i].xAxisName,
            'value': self.chartdata[i].value,
            'itemStyle': {
              'normal': {
                'color': self.chartdata[i].columnColor
              }
            }
          }
          const topGraphic = { // 上原层
            'name': self.chartdata[i].xAxisName,
            'value': self.chartdata[i].value,
            'symbolPosition': 'end',
            'itemStyle': {
              'normal': {
                'color': self.chartdata[i].edgecolor
              }
            }
          }
          const bottomGraphics = { // 下原层
            'name': self.chartdata[i].xAxisName,
            'value': self.chartdata[i].value,
            'itemStyle': {
              'normal': {
                'color': self.chartdata[i].columnColor
              }
            }
          }
          option.xAxis[0].data.push(self.chartdata[i].xAxisName)
          option.series[0].data.push(
            topGraphic
          )
          option.series[1].data.push(
            bottomGraphics
          )
          option.series[2].data.push(
            Columnarlayer
          )
        }
        myChart.setOption(option)
      }
    }
  }
</script>

<style>
</style>
