import Vue from '../../../../main.js'
export const QXtableTitle= [{
     label: '缺陷编号',
     prop: 'qxNumber',
     width: '200',
      type: 'text',
   },
   {
     label: '发现时间',
     prop: 'discoveryTime',
     width: '100',
      type: 'text',
   },
   {//dydj
     label: Vue.prototype.$dydj,
     prop: 'voltageRank',
     width: '100',
      type: 'text',
   },
   {
     label: '缺陷等级',
     prop: 'qxGrade',
     width: '150',
      type: 'text',
   },
   {//缺陷xl名称
     label: '缺陷'+Vue.prototype.$xl+'名称',
     prop: 'lineName',
     width: '300',
      type: 'text',
   },
   {
     label: '通道',
     prop: 'channelName',
     width: '200',
      type: 'text',
   },
   {
     label: '通道段/井',
     prop: 'channelJdName',
     width: '200',
      type: 'text',
   },
   {
     label: '发现班组',
     prop: 'groupName',
     width: '150',
      type: 'text',
   },
   {
     label: '发现人',
     prop: 'userName',
     width: '150',
      type: 'text',
   },
   {
     label: '发现方式',
     prop: 'discoveryMethod',
     width: '150',
      type: 'text',
   },
   {
     label: '缺陷部件',
     prop: 'bj',
     width: '200',
      type: 'text',
   },
   {
     label: '发现日期',
     prop: 'finddate',
     width: '200',
      type: 'text',
   },
   {
     label: '缺陷部位',
     prop: 'bw',
     width: '200',
      type: 'text',
   },
   {
     label: '经度',
     prop: 'longitude',
     width: '100',
      type: 'text',
   },
   {
     label: '纬度',
     prop: 'latitude',
     width: '100',
      type: 'text',
   },
   {
     label: '当前节点',
     prop: 'currentNodeName',
     width: '120',
      type: 'text',
   }]