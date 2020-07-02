// 评价结果
import request from '@/utils/request'
import qs from 'qs'
// 列表
export function list(data) {
  return request({
    url: '/cable/ztpjResult/list',
    method: 'post',
    data
  })
}
// 报告扣分值
export function report(data) {
  return request({
    url: '/cable/ztpjResult/report',
    method: 'post',
    data
  })
}
// 详情-部件评价情况/状态量历史信
export function bjList(data) {
  return request({
    url: '/cable/ztpjResult/bjList',
    method: 'post',
    data
  })
}
// POST详情-设备告警情况

export function alarmList(data) {
  return request({
    url: '/cable/ztpjResult/alarmList',
    method: 'post',
    data
  })
}
// POST详情-设备告警情况

export function getPjBj(data) {
  return request({
    url: '/cable/ztglcommon/getPjBj',
    method: 'post',
    data
  })
}
// POST 详情-历史评价报告

export function historyList(data) {
  return request({
    url: '/cable/ztpjResult/historyList',
    method: 'post',
    data
  })
}
// POST 下载报告
export function downJG(data) {
  return request({
    url: '/cable/ztpj/downJG',
    method: 'post',
    data
  })
}
// POST /cable/ztpjResult/produce  /cable/ztpjStrategy/add
export const addcl = (data) => request.post('/cable/ztpjResult/produce', qs.stringify(data))
