import echarts from 'echarts'
let myChart;
const install = function (Vue) {
    Object.defineProperties(Vue.prototype, {
        $chart: {
            get() {
                return {
                    stackBar: function (containaerId, callback) {
                        // isdispose 是否重绘
                        if (myChart != null && myChart != "" && myChart != undefined) {
                            myChart.dispose();
                        }
                        myChart = echarts.init(document.getElementById(containaerId));
                        var option = {
                            color:['#ffcd1a','#ff6606','#ff0300'].reverse(),
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            legend: {
                                data: ['直接访问', '邮件营销', '联盟广告']
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            yAxis: {
                                type: 'value'
                            },
                            xAxis: {
                                type: 'category',
                                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                            },
                            series: [
                                {
                                    barWidth: '35%',
                                    name: '直接访问',
                                    type: 'bar',
                                    stack: '总量',
                                    data: [320, 302, 301, 334, 390, 330, 320]
                                },
                                {
                                    barWidth: '35%',
                                    name: '邮件营销',
                                    type: 'bar',
                                    stack: '总量',

                                    data: [120, 132, 101, 134, 90, 230, 210]
                                },
                                {
                                    barWidth: '35%',
                                    name: '联盟广告',
                                    type: 'bar',
                                    stack: '总量',

                                    data: [220, 182, 191, 234, 290, 330, 310]
                                }
                            ]
                        };;

                        callback(myChart, option)
                    },
                    colorBar(containaerId, series, xdata, legenddata, callback) {
                        if (myChart != null && myChart != "" && myChart != undefined) {
                            myChart.dispose();
                        }
                        myChart = echarts.init(document.getElementById(containaerId));
                        var option = {
                            color: ['#ff9b2b', '#4afef7', '#fdfe1e'],
                            // title: {
                            //     text: '世界人口总量',
                            // },
                            tooltip: {
                                trigger: 'axis',
                                // axisPointer: {
                                //     type: 'shadow'
                                // }
                            },
                            legend: {
                                right: 10,
                                top: 20,
                                bottom: 20,
                                show: true,
                                data: legenddata
                                // ['已处理', '处理中', '未处理']
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            yAxis: {
                                minInterval:1,
                                type: 'value',
                                name: '个数',
                                boundaryGap: [0, 0.01],
                                "axisTick": {
                                    show: false,
                                },
                                "splitLine": {
                                    "lineStyle": {
                                        "color": "#dbdee5"
                                    }
                                },
                                "axisLine": {
                                    "show": false
                                }
                            },
                            xAxis: {
                                type: 'category',
                                "axisLine": {
                                    "lineStyle": {
                                        "color": "#dbdee5"
                                    }
                                },
                                "axisLabel": {
                                    "textStyle": {
                                        "color": "#666"
                                    },
                                    margin: 20
                                },
                                data: xdata
                            },
                            series
                        };

                        callback(myChart, option)
                    }

                }
            }
        }
    })
}

export default {
    install
}