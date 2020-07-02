/**
 * 实时负荷仪表图表参数
 */

export default {
    series: [
        {
            name: '实时负荷',
            type: 'gauge',
            radius:'100%',
            startAngle:180,
            endAngle:0,
            min:0,
            max:200,
            detail: {
                show:false,
                formatter: '{value}%'
            },
            data: [{value: 20}],
            splitLine: {
                length: 15,
            },
            axisLine: {
                lineStyle: {
                    width: 16,
                    color: [[0.5, '#33cc7b'], [1, '#fc464a']],
                }
            },
        }
    ]
};