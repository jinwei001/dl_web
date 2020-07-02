/**
 * 生产避峰管理策略 - 构成分析图表参数
 */

export default {
    title: {
        text: '构成分析',
        x: 'left',
        y: 'top',
        padding: [20, 0, 0, 20]
    },
    grid: {
        left: '20%',
        top: '10%'
    },
    color: ['#00bda4', '#0babfe', '#abca4e', '#60bb5e'],
    legend: {
        x: 'center',
        y: 'bottom',
        padding: [0, 0, 20, 0],
        data: ['平电量', '峰电量', '尖电量', '谷电量']
    },
    series: [
        {
            color: ['#00bda4', '#0babfe', '#abca4e', '#60bb5e'],
            type: 'pie',
            radius: ['62', '100'],
            labelLine: {
                normal: {
                    length: 10,
                    length2: 80,
                    lineStyle: {
                        type: 'solid'
                    }
                }

            },
            label: {
                normal: {
                    formatter: (params) => {
                        return '{b| ' + params.name + '}  ' + '{c|' + params.percent.toFixed(0) + '%}'
                    },
                    borderWidth: 0,
                    borderRadius: 4,
                    padding: [0, -86],
                    height: 50,
                    fontSize: 13,
                    align: 'center',
                    color: '#3494BD',
                    rich: {
                        b: {
                            fontSize: 14,
                            // lineHeight: 10,
                            color: 'black'
                        },
                        c: {
                            fontSize: 14,
                            // lineHeight: 10,
                            color: 'black'
                        }
                    }
                }
            },
            data: [
                {
                    name: '平电量',
                    value: 0
                },
                {
                    name: '峰电量',
                    value: 0
                },
                {
                    name: '尖电量',
                    value: 0
                },
                {
                    name: '谷电量',
                    value: 0
                }
            ],
            itemStyle: {
                borderWidth: 5,
                borderColor: '#fff'
            }
        }
    ]
}