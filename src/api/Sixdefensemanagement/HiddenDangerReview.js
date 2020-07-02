// 隐患信息审核
import request from '@/utils/request'
import qs from 'qs'
// 竣工管理

// 总列表
export function getList(data) {
  return request({
    url: '/cable/tHiddendangerMessage/list',
    method: 'post',
    data
  })
}
// 下拉数据
export function setList(data) {
  return request({
    url: '/cable/tHiddendangerMessage/getEnumeration',
    method: 'post',
    data
  })
}
// 保存
export function save(data) {
  return request({
    url: '/cable/tHiddendangerMessage/add',
    method: 'post',
    data
  })
}
// 根据联系人获取电话
export function getUserPhone(data) {
  return request({
    url: '/cable/tHiddendangerMessage/getUserPhone',
    method: 'post',
    data
  })
}
// 提交审核
export function edit(data) {
  return request({
    url: '/cable/tHiddendangerMessage/edit',
    method: 'post',
    data
  })
}
// 删除
export function remove(data) {
  return request({
    url: '/cable/tHiddendangerMessage/remove',
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
// 获取隐患流程基本信息
export function tHiddendangerMessagegetdeleteFile(data) {
  return request({
    url: '/cable/tHiddendangerMessage/deleteFile',
    method: 'post',
    data
  })
}
// 新增案例
export function tHiddendangerMessagetoTypical(data) {
  return request({
    url: '/cable/tHiddendangerMessage/toTypical',
    method: 'post',
    data
  })
}
// 取消案例
export function tHiddendangerMessagoBakTypical(data) {
  return request({
    url: '/cable/tHiddendangerMessage/goBakTypical',
    method: 'post',
    data
  })
}
// ————————————————————————————————————————下拉数据————————————————————————————————————————————————
export function selecDlByLine(data) {
  return request({
    url: '/cable/tHiddendangerMessage/selecDlByLine',
    method: 'post',
    data
  })
}
// 获取设备名称
export function selectByLx(data) {
  return request({
    url: '/cable/tHiddendangerMessage/selectByLx',
    method: 'post',
    data
  })
}
// 获取隐患部位
export function getYhbj(data) {
  return request({
    url: '/cable/tZtglBzyhk/getYhbj',
    method: 'post',
    data
  })
}
// 通过部位获取隐患类型
export function getYhbjByYhlx(data) {
  return request({
    url: '/cable/tZtglBzyhk/getYhbjByYhlx',
    method: 'post',
    data
  })
}
// 通过部位和隐患类型获取隐患类型获取隐患等级
export function getYhdjByYhbjAndYhlx(data) {
  return request({
    url: '/cable/tZtglBzyhk/getYhdjByYhbjAndYhlx',
    method: 'post',
    data
  })
}
// 通过发现班组获取发现人
export function userList(data) {
  return request({
    url: '/cable/tZtglBzyhk/userList',
    method: 'post',
    data
  })
}

// 隐患列表
export function diTuDianlist(data) {
  return request({
    url: '/cable/tHiddendangerMessage/diTuDianlist',
    method: 'post'

  })
}

// 流程

export function getliuchengInfo(data) {
  return request({
    url: '/cable/tHiddendangerMessage/getliuchengInfo',
    method: 'post',
    data
  })
}

// 六防统计分析
export function statistic_sixType(data) {
  return request({
    url: '/cable/tQxglJcxxk/statistic_sixType',
    method: 'post',
    data
  })
}
// 发现班组（新增 编辑 详情 使用）
export function group_list(data) {
  return request({
    url: '/group/list',
    method: 'post',
    data
  })
}
