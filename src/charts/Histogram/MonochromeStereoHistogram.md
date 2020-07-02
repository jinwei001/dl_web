<!-- 单项立体柱状图组件使用文档 3/5-->
<!--组件在系统多处使用
    DL通道管理/台账统计/检测设备统计
    DL通道管理/台账统计/生产厂家统计 
    六防管理/隐患高发XL
    具体使用请看同目录同名md文件或参考已经引入的父文件-->
    
<!--   本组件有三个参数需要从父组件传入
<MonochromeStereoHistogram  :chartdata="data" :chartsconfiguration="Configuration" />

   chartdata：[] 图表数据集合数组 可以设置X轴个项目名称 值 顶部浅色区颜色 柱子主体颜色
   chartsconfiguration：[] 图表基础配置目前只支持配置图表标题 可以为空但是必须传-->
   
   下面我来看一下格式
   data：{
        xAxisName: '厂家1',//X轴个项目名称
        value: '102',//值
        edgecolor: '#991999',//顶部浅色区颜色
        columnColor: '#800080'//柱子主体颜色
      },
      {
        xAxisName: '厂家2',
        value: '68',
        edgecolor: '#97cfff',
        columnColor: '#69b9fd'
      },
      {
        xAxisName: '厂家3',
        value: '98',
        edgecolor: '#ffb33f',
        columnColor: '#ff9a26'
      }]
      
      Configuration: {
        title: 'DL造厂家'
      },