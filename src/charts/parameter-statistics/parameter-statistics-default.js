// **
//  * 台账统计图表参数
//  */
export default {
  grid: {
    x: 80,
    y: 20,
    x2: 100,
    y2: 40
  },

  tooltip: {
    show: "true",
    trigger: 'item',
    backgroundColor: 'rgba(0,0,0,0.7)', // 背景
    padding: [8, 10], //内边距
    extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
    formatter: function (params) {
      return params.name + '<br>' + params.seriesName + ' ：' + params.value + '';
    },
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  credits: {
    enabled:false
  },
  legend: {
    //  top:40,
    right: 10,
    orient: 'vertical',
    y: 'center', //延Y轴居中
    textStyle: {
      color: 'black',
    },
    data: []
  },
  xAxis: {
    data: [],
  },
  yAxis: {

  },
  series: [
    {
      name: '柱体1',
      type: 'bar',
      barWidth: 40, //柱子宽度
      barGap: 0.5, //柱子之间间距
      emphasis: {
        itemStyle: { //填充部分鼠标移上去颜色
          color: '#69b9fd'
        }
      },

      itemStyle: {
        normal: {
          color: '#69b9fd',
          borderWidth: '1',
          borderColor: '#69b9fd',
        }
      },
      data: [],
      legendHoverLink: false,
      z: 1
    },
    {
      name: '柱体1',
      tooltip: {
        show: false
      },
      type: 'pictorialBar',
      itemStyle: {
        normal: { //未填充部分鼠标移上去颜色
          color: '#69b9fd',
          borderWidth: 1,
          borderColor: '#69b9fd'
        }
      },
      symbolRotate: 0,
      symbolSize: [40, 20],
      symbolOffset: [-60, 8],
      symbolPosition: 'start',
      data: [],
      z: 1
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
      symbolSize: [40, 20],
      symbolOffset: [-60, -8],
      symbolPosition: 'end',
      data: [],
      z: 1
    },

    {
      name: "柱体2",
      type: 'bar',
      // label: {
      //     show: true,
      //     position: 'top',
      //     textStyle: {
      //         color: 'red',
      //     }
      // },

      barWidth: 40, //柱子宽度
      barGap: 0.5, //柱子之间间距
      emphasis: {
        itemStyle: { //左侧未填充部分鼠标移上去颜色
          color: '#ff9a26',
          barBorderColor: '#ff9a26'
        }
      },
      itemStyle: {
        normal: {
          color: '#ff9a26',
          barBorderColor: '#ff9a26',
        }
      },
      data: [],
      z: 3
    },
    {
      name: '柱体2',
      tooltip: {
        show: false
      },
      type: 'pictorialBar',
      itemStyle: {
        normal: {
          color: '#ffb33f',
          borderWidth: 1,
          borderColor: '#ffb33f'
        }
      },

      symbolRotate: 0,
      symbolSize: [40, 20],
      symbolOffset: [0, -13],
      symbolPosition: 'end',
      data: [],
      z: 3
    },
    {
      name: '柱体2',
      tooltip: {
        show: false
      },
      type: 'pictorialBar',

      itemStyle: {
        normal: {
          color: '#ff9a26',
          borderWidth: 1,
          borderColor: '#ff9a26'
        }
      },
      symbolRotate: 0,
      symbolSize: [40, 20],
      symbolOffset: [0, 6],
      symbolPosition: 'start',
      data: [],
      z: 2
    },


    {
      type: 'bar',
      name: '柱体3',
      barWidth: 40, //柱子宽度
      barGap: 0.5, //柱子之间间距
      // label: {
      //     show: true,
      //     position: 'top',
      //     textStyle: {
      //         color: 'red',
      //     }
      // },
      emphasis: {
        itemStyle: { //左侧未填充部分鼠标移上去颜色
          color: '#8085e9',
          barBorderColor: '#8085e9'
        }
      },
      itemStyle: {
        normal: {
          color: '#8085e9',
          barBorderColor: '#8085e9',
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
          color: '#979bf3',
          borderWidth: 1,
          borderColor: '#979bf3'
        }
      },

      symbolRotate: 0,
      symbolSize: [40, 20],
      symbolOffset: [60, -10],
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
          color: '#8085e9',
          borderWidth: 1,
          borderColor: '#8085e9'
        }
      },
      symbolRotate: 0,
      symbolSize: [40, 20],
      symbolOffset: [60, 6],
      symbolPosition: 'start',
      data: [],
      z: 3
    },
  ],
  }
