/**
 * 电量分析 - 去年、上月、本期对比柱状图表
 */
export default {
    title: {
        text: '',
        x: 'center',
        y: 'top'
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
    grid: {
        x: 80,
        y: 80,
        x2: 50,
        y2: 40
    },
    legend: {
        x: 'center',
        padding: [40, 0, 0, 0],
        data: ['去年同期', '上月同期', '本期']
    },
    xAxis: [
        {
            type: 'category',
            data: [],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '单位:kWh',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
                formatter: '{value} '
            }
        }
    ],
    series: [
        {
            name: '去年同期',
            type: 'bar',
            itemStyle: {
                normal: {
                    color: '#c7ddff'
                }
            },
            data: []
        },
        {
            name: '上月同期',
            type: 'bar',
            itemStyle: {
                normal: {
                    color: '#89b7fd'
                }
            },
            data: []
        },
        {
            name: '本期',
            type: 'bar',
            itemStyle: {
                normal: {
                    color: '#4389fe'
                }
            },
            data: []
        }
    ]
};