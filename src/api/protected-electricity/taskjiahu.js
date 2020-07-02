//计划模块
import request from '@/utils/request'

// 列表
export function keepElectricityPlan_list(data) {
  return request({
    url: '/cable/keepElectricityPlan/list',
    method: 'post',
    data
  })
}
//通道列表
export function channel_channelList(data) {
  return request({
    url: '/cable/channel/channelList',
    method: 'post',
    data
  })
}
//井列表
export function workWell_list(data) {
  return request({
    url: '/cable/workWell/list',
    method: 'post',
    data
  })
}
//值守新增
export function keepElectricityPlan_add(data) {
  return request({
    url: '/cable/keepElectricityPlan/add',
    method: 'post',
    data
  })
}
//编辑
export function keepElectricityPlan_edit(data) {
  return request({
    url: '/cable/keepElectricityPlan/edit',
    method: 'post',
    data
  })
}
//值守计划删除
export function keepElectricityPlan_remove(data) {
  return request({
    url: '/cable/keepElectricityPlan/remove',
    method: 'post',
    data
  })
}
///生成值守任务
export function keepElectricityDuty_add(data) {
  return request({
    url: '/cable/keepElectricityDuty/add',
    method: 'post',
    data
  })
}
