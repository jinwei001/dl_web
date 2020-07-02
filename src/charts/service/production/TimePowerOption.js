/**
 * 生产避峰管理策略 - 分时电量图表参数
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
        data: ['平电量', '峰电量', '尖电量', '谷电量']
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
            axisLabel: {
                formatter: '{value} '
            }
        }
    ],
    series: [
        {
            name: '平电量',
            type: 'bar',
            itemStyle: {
                normal: {
                    color: '#00bda4'
                }
            },
            data: []
        },
        {
            name: '峰电量',
            type: 'bar',
            itemStyle: {
                normal: {
                    color: '#0babfe'
                }
            },
            data: []
        },
        {
            name: '尖电量',
            type: 'bar',
            itemStyle: {
                normal: {
                    color: '#abca4e'
                }
            },
            data: []
        },
        {
            name: '谷电量',
            type: 'bar',
            itemStyle: {
                normal: {
                    color: '#60bb5e'
                }
            },
            data: []
        },
    ]
}
