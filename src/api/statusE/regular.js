// 状态定期模块
import request from '@/utils/request'

// 列表
export function list(data) {
  return request({
    url: '/cable/ztpj/list',
    method: 'post',
    data
  })
}

// 列表
export function add(data) {
  return request({
    url: '/cable/ztpj/add',
    method: 'post',
    data
  })
}
// 编辑报告
export function edit(data) {
  return request({
    url: '/cable/ztpj/reportSubmit',
    method: 'post',
    data
  })
}
// 删除列表数据
export function remove(data) {
  return request({
    url: '/cable/ztpj/remove',
    method: 'post',
    data
  })
}
// 报告中查询线路详情
export function xlmemo(data) {
  return request({
    url: '/cable/ztpj/xlmemo',
    method: 'post',
    data
  })
}

// 报告中查询线路详情
export function deduct(data) {
  return request({
    url: '/cable/ztpjdt/deduct',
    method: 'post',
    data
  })
}
// 获取修改判断依据的下拉列表
export function getpdyjList(data) {
  return request({
    url: '/cable/ztglcommon/getDecideBasis',
    method: 'post',
    data
  })
}
// 根据判断依据获取其他数据
export function getCalculateStatus(data) {
  return request({
    url: '/cable/ztpjdt/calculateStatus',
    method: 'post',
    data
  })
}
// 编辑保存状态评价数据
export function editztpj(data) {
  return request({
    url: '/cable/ztpj/edit1',
    method: 'post',
    data
  })
}