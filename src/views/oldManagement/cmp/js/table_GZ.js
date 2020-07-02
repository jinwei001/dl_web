import Vue from '../../../../main.js'
export const GZtableTitle = [
  {//故障XL名称
    label:'故障'+Vue.prototype.$xl+'名称',
    prop: 'gzxlmc',
    width: '200',
    type: 'text',
  },
  {//所属dl
    label: '所属'+Vue.prototype.$dl,
    prop: 'ssdlmc',
    width: '300',
    type: 'text',
  },
  {//dydj
    label: Vue.prototype.$dydj,
    prop: 'dydj',
    width: '100',
    type: 'text',
  },
  {//故障
    label: '故障'+Vue.prototype.$xb ,
    prop: 'gzxb',
    width: '100',
    type: 'text',
  },
  {
    label: '设备类型',
    prop: 'sblx',
    width: '180',
    type: 'text',
  },
  {
    label: '故障设备名称',
    prop: 'gzsbmc',
    width: '200',
    type: 'text',
  },
  {
    label: '故障设备运维班组',
    prop: 'yybzmc',
    width: '200',
    type: 'text',
  },
  {
    label: '故障定位信息描述',
    prop: 'gzdwms',
    width: '180',
    type: 'text',
  },
  {
    label: '故障级别',
    prop: 'gzjb',
    width: '150',
    type: 'text',
  },
  {
    label: '故障性质',
    prop: 'gzxz',
    width: '100',
    type: 'text',
  },
  {
    label: '故障类别',
    prop: 'gzlb',
    width: '100',
    type: 'text',
  },
  {
    label: '故障类型',
    prop: 'gzlx',
    width: '200',
     type: 'text',
  },
  {
    label: '故障发生时间',
    prop: 'gzfssj',
    width: '300',
    type: 'text',
  },
  {
    label: '原因类型',
    prop: 'yylx',
    width: '160',
    type: 'text',
  },
  {
    label: '故障原因',
    prop: 'gzyy',
    width: '280',
    type: 'text',
  },
  {
    label: '恢复送电时间',
    prop: 'hfsdsj',
    type: 'text',
    width: '200'
  },
  {
    label: '故障分析报告',
    prop: 'gzfxbg',
    type: 'Buttom',
    width: '100',
    Buttom_text:'下载',
    fun_starts:'download',
  },
]
