// 隐患信息管理
import request from '@/utils/request'
import qs from 'qs'

// 隐患tabs  类型 1-5
export function getHiddenType(data) {
  return request({
    url: '/cable/tHiddendangerMessage/selectSixTypeCountAndList',
    method: 'post',
    data
  })
}
// 隐患tabs  类型 6
export function getHiddenType6(data) {
  return request({
    url: '/cable/tHiddendangerMessage/selectHDChangeData',
    method: 'post',
    data
  })
}
// 隐患tabs  类型 6 表格
export function getHiddenPage(data) {
  return request({
    url: '/cable/tHiddendangerMessage/selectHDChangeDataXBBF',
    method: 'post',
    data
  })
}
// 获取隐患流程基本信息
export function tHiddendangerMessagegetEditeInfo(data) {
  return request({
    url: '/cable/tHiddendangerMessage/getEditeInfo',
    method: 'post',
    data
  })
}
// 地图接口
export const getHiddenMapPoint = params => request.post('/cable/tHiddendangerMessage/diTuDianlist', qs.stringify(params))

// 获取左侧表格数据
export const getHiddenPageSize = params => request.post('/cable/tHiddendangerMessage/pcLeftInfolist', qs.stringify(params))
// 下拉数据
export function getHiddenTypeSelect(data) {
  return request({
    url: '/cable/tHiddendangerMessage/getEnumerationForPc',
    method: 'post',
    data
  })
}

