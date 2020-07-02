/**
 * 缺陷登记数据图表选项
 */

export default {
    color: ['#ff001d', '#ff6625', '#ffcc37'],
    title: {
        text: '缺陷登记数据图'
    },
    legend: {
        data: ['本体一般', '本体严重', '本体危急', '终端一般', '终端严重', '终端危急', '接头一般', '接头严重', '接头危急'],
        top: 30,
    },
    tooltip: {},
    grid: {
        top: 80,
        right: 50,
        bottom: 50,
        left: 50,
    },
    xAxis: {
        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        axisLine: {onZero: true},
        splitLine: {show: false},
        splitArea: {show: false}
    },
    yAxis: {
        splitArea: {show: false}
    },
    series: [
        {
            name: '本体一般',
            type: 'bar',
            stack: 'one',
            data: []
        },
        {
            name: '本体严重',
            type: 'bar',
            stack: 'one',
            data: []
        },
        {
            name: '本体危急',
            type: 'bar',
            stack: 'one',
            data: []
        },
        {
            name: '终端一般',
            type: 'bar',
            stack: 'two',
            data: []
        },
        {
            name: '终端严重',
            type: 'bar',
            stack: 'two',
            data: []
        },
        {
            name: '终端危急',
            type: 'bar',
            stack: 'two',
            data: []
        },
        {
            name: '接头一般',
            type: 'bar',
            stack: 'three',
            data: []
        },
        {
            name: '接头严重',
            type: 'bar',
            stack: 'three',
            data: []
        },
        {
            name: '接头危急',
            type: 'bar',
            stack: 'three',
            data: []
        },
    ]
}