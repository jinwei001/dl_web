/**
 * 负荷分析 - 负荷数据折线图表
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
        data: ['负荷']
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
        }
    ]
};