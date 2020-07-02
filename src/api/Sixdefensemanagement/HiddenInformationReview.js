//隐患信息审核
import request from '@/utils/request'
//竣工管理

// 隐患趋势统计
export function getList(data) {
  return request({
    url: '/cable/tHiddendangerMessage/trendList',
    method: 'post',
    data
  })
}

// 隐患趋势统计//列表
export function  TableList(data) {
  return request({
    url: '/cable/tHiddendangerMessage/list',
    method: 'post',
    data
  })
}
//隐患高发XL数据
export function HRHTList(data) {
  return request({
    url: '/cable/tHiddendangerMessage/HRHTList',
    method: 'post',
    data
  })
}
//隐患高发XL列表
export function Higlist(data) {
  return request({
    url: '/cable/tHiddendangerMessage/Higlist',
    method: 'post',
    data
  })
}
