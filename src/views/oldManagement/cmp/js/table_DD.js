import Vue from '../../../../main.js'
export const DDtableTitle = [
  {//故障XL名称
    label:Vue.prototype.$xl+'名称',
    prop: 'xlmc',
    width: '200',
    type: 'text',
  },
  {//所属dl
    label: Vue.prototype.$dl,
    prop: 'dlmc',
    width: '300',
    type: 'text',
  },
  {
    label: '设备名称',
    prop: 'sbmc',
    width: '180',
    type: 'text',
  },
  {
    label: '检测类型',
    prop: 'jclx',
    width: '200',
    type: 'text',
  },
  {
    label: Vue.prototype.$xb,
    prop: 'xw',
    width: '200',
    type: 'text',
  },
  {
    label: '检测时间',
    prop: 'fzr',
    width: '180',
    type: 'text',
  },
  {
    label: '执行结果',
    prop: 'zxjg',
    width: '150',
    type: 'text',
  },
  {
    label: '检测记录',
    prop: 'jcsj',
    width: '100',
    type: 'Buttom',
    Buttom_text:'查看记录',
    fun_starts:'open',
    
  },
  {
    label: '检测班组',
    prop: 'jcbz',
    width: '100',
    type: 'text',
  },
  {
    label: '检测人',
    prop: 'jcr',
    width: '200',
     type: 'text',
  },
  {
    label: '检测单位',
    prop: 'jcdw',
    width: '300',
    type: 'text',
  }
]
