/**
 * 柱状图表
 */
export default {
  title: {},
  tooltip: {
    trigger: "item"
  },
  legend: {
    orient: "vertical",
    x: "right",
    y: "center",
    data: []
  },
  grid: {
    left: "3%",
    right: "10%",
    bottom: "10%",
    containLabel: true
  },
  dataZoom: [
    //给x轴设置滚动条
    {
      type: "slider",
      show: true, //flase直接隐藏图形
      xAxisIndex: [0],
      left: "4%", //滚动条靠左侧的百分比
      bottom: -5,
      right: "10%",
      start: 0, //滚动条的起始位置
      end: '', //滚动条的截止位置（按比例分割你的柱状图x轴长度）
      zoomLock: false,
      startValue: 0, // 从头开始。
      endValue: 30 // 一次性展示10个。
    }
  ],
  calculable: true,
  xAxis: {
    type: "category",
    data: [],
  },
  yAxis: [{
    type: "value"
  }],
  series: []
};
