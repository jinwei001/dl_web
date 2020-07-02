/**
 * 实时负荷仪表图表参数
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
    legend: {
        x: 'center',
        padding: [40, 0, 0, 0],
        data: ['实时负荷']
    },
    grid: {
        x: 50,
        y: 80,
        x2: 50,
        y2: 40
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
            name: '单位:kW',
            axisLabel: {
                formatter: '{value} '
            }
        }
    ],
    series: [
        {
            name: '实时负荷',
            type: 'line',
            itemStyle: {
                normal: {
                    color: '#f8524e'
                }
            },
            data: []
        }
    ]
};