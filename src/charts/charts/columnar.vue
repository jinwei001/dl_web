<template>
  <div ref="echarts" :style="{width: '100%'}" />
</template>

<script>
export default {
  props: ["chartdata", "chartsConfiguration"],
  data() {
    return {
      echarts: null
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(this.$refs.echarts);

      // 指定图表的配置项和数据
      myChart.setOption({
        title:this.chartsConfiguration.title,
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          x: "right",
          y: "center",
          data: this.chartsConfiguration.legend
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
            left: "10%", //滚动条靠左侧的百分比
            bottom: -5,
            right: "10%",
            start: 0, //滚动条的起始位置
            end: this.chartsConfiguration.endPercent, //滚动条的截止位置（按比例分割你的柱状图x轴长度）
            zoomLock: true,
            startValue: 0, // 从头开始。
            endValue: 30 // 一次性展示10个。
          }
        ],
        calculable: true,
        xAxis: {
          type: "category",
          data:this.chartsConfiguration.xAxis,
          axisLabel: {
            interval: 0,
            formatter: function(value) {
              var ret = ""; //拼接加\n返回的类目项
              var maxLength = 10; //每项显示文字个数
              var valLength = value.length; //X轴类目项的文字个数
              var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
              if (rowN > 1) {
                //如果类目项的文字大于3,
                for (var i = 0; i < rowN; i++) {
                  var temp = ""; //每次截取的字符串
                  var start = i * maxLength; //开始截取的位置
                  var end = start + maxLength; //结束截取的位置
                  //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                  temp = value.substring(start, end) + "\n";
                  ret += temp; //凭借最终的字符串
                }
                return ret;
              } else {
                return value;
              }
            }
          }
        },
        yAxis: [
          {
            type: "value"
          }
        ],
        series: this.chartdata.series
      });
    }
  }
};
</script>

<style>
</style>
