/**
 * 折线图表
 */
export default {
  title: {
    text: '',
    textStyle: {
      fontWeight: 'normal',
      fontSize: 16,
    },
    left: '6%'
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    right: '2%',
    y:"center",
    orient: 'vertical',
    icon: 'circle',
    itemWidth: 16,  // 设置宽度
    itemHeight: 16, // 设置高度
    itemGap: 20, // 设置间距
    top:90,
    data: [],
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
      left: "3%", //滚动条靠左侧的百分比
      bottom: -5,
      right: "10%",
      start: 0, //滚动条的起始位置
      end: 100, //滚动条的截止位置（按比例分割你的柱状图x轴长度）
      startValue: 0, // 从头开始。
      endValue: 30 // 一次性展示10个。
    }
  ],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  grid: {
    left: '0%',
    right: '10%',
    bottom: '10%',
    containLabel: true
  },
  legend: {
    x: 'center',
    padding: [40, 0, 0, 0],
    data: ['负荷']
  },
  xAxis: [{
    type: 'category',
    data: [],
    axisPointer: {
      type: 'shadow'
    }
  }],
  yAxis: [{
    type: 'value',
    name: '单位:kW',
    axisLabel: {
      formatter: '{value} '
    }
  }],
  series: [{
      name: '最大负荷',
      type: 'line',
      itemStyle: {
        normal: {
          color: '#f8524e'
        }
      },
      data: []
    },
    {
      name: '最小负荷',
      type: 'line',
      itemStyle: {
        normal: {
          color: '#f863b4'
        }
      },
      data: []
    },
    {
      name: '平均负荷',
      type: 'line',
      itemStyle: {
        normal: {
          color: '#f8d864'
        }
      },
      data: []
    },{
      name: '平均负荷',
      type: 'line',
      itemStyle: {
        normal: {
        }
      },
      data: []
    },
    {
      name: '平均负荷',
      type: 'line',
      itemStyle: {
        normal: {
        }
      },
      data: []
    },{
      name: '平均负荷',
      type: 'line',
      itemStyle: {
        normal: {
        }
      },
      data: []
    }
    ,{
      name: '平均负荷',
      type: 'line',
      itemStyle: {
        normal: {
        }
      },
      data: []
    }
    ,{
      name: '平均负荷',
      type: 'line',
      itemStyle: {
        normal: {
        }
      },
      data: []
    }
    ,{
      name: '平均负荷',
      type: 'line',
      itemStyle: {
        normal: {
        }
      },
      data: []
    }
    ,{
      name: '平均负荷',
      type: 'line',
      itemStyle: {
        normal: {
        }
      },
      data: []
    },{
      name: '平均负荷',
      type: 'line',
      itemStyle: {
        normal: {
        }
      },
      data: []
    }
    ,{
      name: '平均负荷',
      type: 'line',
      itemStyle: {
        normal: {
        }
      },
      data: []
    }

    ,{
      name: '平均负荷',
      type: 'line',
      itemStyle: {
        normal: {
        }
      },
      data: []
    }
    ,{
      name: '平均负荷',
      type: 'line',
      itemStyle: {
        normal: {
        }
      },
      data: []
    }
  ]
};
