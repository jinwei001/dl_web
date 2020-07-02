import request from '@/utils/request'

// 服务质量列表
export function List(data) {
  return request({
    url: '/cable/detectionServiceQuality/list',
    method: 'post',
    data
  })
}
// 文件上传
export function upload(data) {
  return request({
    url: '/cable/file/upload',
    method: 'post',
    data
  })
}
// 服务质量新增
export function add(data) {
  return request({
    url: '/cable/detectionServiceQuality/add',
    method: 'post',
    data
  })
}
// 服务质量编辑
export function edit(data) {
  return request({
    url: '/cable/detectionServiceQuality/edit',
    method: 'post',
    data
  })
}
// 服务质量删除
export function remove(data) {
  return request({
    url: '/cable/detectionServiceQuality/remove',
    method: 'post',
    data
  })
}
// 服务扣分操作
export function detectionServiceDeductionAdd(data) {
  return request({
    url: '/cable/detectionServiceDeduction/add',
    method: 'post',
    data
  })
}
//扣分表格
export function detectionServiceDeductionlist(data) {
  return request({
    url: '/cable/detectionServiceDeduction/list',
    method: 'post',
    data
  })
}
