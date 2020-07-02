import request from '@/utils/request'

// 型号库列表
export function List(data) {
  return request({
    url: '/cable/detectionModelLibrary/list',
    method: 'post',
    data
  })
}
// 型号库新增
export function add(data) {
  return request({
    url: '/cable/detectionModelLibrary/add',
    method: 'post',
    data
  })
}
// 型号库编辑
export function edit(data) {
  return request({
    url: '/cable/detectionModelLibrary/edit',
    method: 'post',
    data
  })
}
// 型号库删除
export function remove(data) {
  return request({
    url: '/cable/detectionModelLibrary/remove',
    method: 'post',
    data
  })
}
