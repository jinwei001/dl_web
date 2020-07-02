/**
 * 生产避峰管理策略 - 对比分析图表参数
 */

export default {
    title: {
        text: '对比分析',
        x: 'left',
        y: 'top',
        padding: [20, 0, 0, 20]
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
        x: 60,
        y: 80,
        x2: 50,
        y2: 40
    },
    legend: {
        x: 'center',
        padding: [40, 0, 0, 0],
        data: ['上月', '本期']
    },
    xAxis: [
        {
            type: 'category',
            data: ['平占比', '峰占比', '尖占比', '谷占比'],
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '单位:%',
            axisLabel: {
                formatter: '{value} '
            }
        }
    ],
    series: [
        {
            name: '上月',
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
}
