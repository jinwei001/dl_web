/**
 * 近十年DL附件数量变化趋势
 */
export default {

  grid: {
    x: 80,
    y: 20,
    x2: 200,
    y2: 60
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }

  },
  legend: {
    //  top:40,
    right: 80,
    orient: 'vertical',
    icon: "circle",
    y: 'center', //延Y轴居中
    textStyle: {
      color: '#2194f6',
    },
    data: []
  },
  xAxis: {
    boundaryGap: false, //默认，坐标轴留白策略
    axisLine: {
      show: true
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: true,
      alignWithLabel: false
    },
    data: []
  },
  yAxis: {
    axisLine: {
      show: true
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: 'rgba(33,148,246,0.2)'
      }
    },
    axisTick: {
      show: true
    },

  },
  series: [{
      name: '柱体1',
      type: 'line',
      symbol: 'circle',
      symbolSize: 7,
      lineStyle: {
        color: 'rgb(33,148,246)',
        shadowBlur: 12,
        shadowColor: 'rgb(33,148,246,0.9)',
        shadowOffsetX: 1,
        shadowOffsetY: 1
      },
      itemStyle: {
        color: 'rgb(33,148,246)',
        borderWidth: 1,
        borderColor: '#FFF'
      },

      data: []
    },
    {
      name: '柱体2',
      type: 'line',
      symbol: 'circle',
      symbolSize: 7,
      lineStyle: {
        color: 'rgb(33,148,246)',
        shadowBlur: 12,
        shadowColor: 'rgb(33,148,246,0.9)',
        shadowOffsetX: 1,
        shadowOffsetY: 1
      },
      itemStyle: {
        color: 'rgb(33,148,246)',
        borderWidth: 1,
        borderColor: '#FFF'
      },

      data: []
    }, {
      name: '柱体3',
      type: 'line',
      symbol: 'circle',
      symbolSize: 7,
      lineStyle: {
        color: 'rgb(33,148,246)',
        shadowBlur: 12,
        shadowColor: 'rgb(33,148,246,0.9)',
        shadowOffsetX: 1,
        shadowOffsetY: 1
      },
      itemStyle: {
        color: 'rgb(33,148,246)',
        borderWidth: 1,
        borderColor: '#FFF'
      },

      data: []
    }, {
      name: '柱体4',
      type: 'line',
      symbol: 'circle',
      symbolSize: 7,
      lineStyle: {
        color: 'rgb(33,148,246)',
        shadowBlur: 12,
        shadowColor: 'rgb(33,148,246,0.9)',
        shadowOffsetX: 1,
        shadowOffsetY: 1
      },
      itemStyle: {
        color: 'rgb(33,148,246)',
        borderWidth: 1,
        borderColor: '#FFF'
      },

      data: []
    }, {
      name: '柱体5',
      type: 'line',
      symbol: 'circle',
      symbolSize: 7,
      lineStyle: {
        color: 'rgb(33,148,246)',
        shadowBlur: 12,
        shadowColor: 'rgb(33,148,246,0.9)',
        shadowOffsetX: 1,
        shadowOffsetY: 1
      },
      itemStyle: {
        color: 'rgb(33,148,246)',
        borderWidth: 1,
        borderColor: '#FFF'
      },

      data: []
    }, {
      name: '柱体6',
      type: 'line',
      symbol: 'circle',
      symbolSize: 7,
      lineStyle: {
        color: 'rgb(33,148,246)',
        shadowBlur: 12,
        shadowColor: 'rgb(33,148,246,0.9)',
        shadowOffsetX: 1,
        shadowOffsetY: 1
      },
      itemStyle: {
        color: 'rgb(33,148,246)',
        borderWidth: 1,
        borderColor: '#FFF'
      },

      data: []
    }
  ]

}
