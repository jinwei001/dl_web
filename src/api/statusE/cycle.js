// 任务模块
import request from '@/utils/request'

// 列表
export function list(data) {
  return request({
    url: '/cable/ztpjZq/list',
    method: 'post',
    data
  })
}
// 新增线路列表
export function line_list(data) {
  return request({
    url: '/cable/line/list',
    method: 'post',
    data
  })
}
// /新增线路列表
export function group_list(data) {
  return request({
    url: '/group/list',
    method: 'post',
    data
  })
}
// 设备主人列表
export function sbzrList(data) {
  return request({
    url: '/cable/ztglcommon/getFacilityMaster',
    method: 'post',
    data
  })
}
// 新增
export function add(data) {
  return request({
    url: '/cable/ztpjZq/add',
    method: 'post',
    data
  })
}
// 编辑
export function edit(data) {
  return request({
    url: '/cable/ztpjZq/edit',
    method: 'post',
    data
  })
}
// 删除
export function remove(data) {
  return request({
    url: '/cable/ztpjZq/remove',
    method: 'post',
    data
  })
}
// 生成定期
export function regular(data) {
  return request({
    url: '/cable/ztpjZq/regular',
    method: 'post',
    data
  })
}
