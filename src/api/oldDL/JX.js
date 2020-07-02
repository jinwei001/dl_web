// 任务模块
import request from '@/utils/request'

// XL列表
export function oldcable_lineNames(data) {
  return request({
    url: '/cable/oldcable/lineNames',
    method: 'post',
    data
  })
}
//老旧dl维护列表
export function oldcable_list(data) {
  return request({
    url: '/cable/oldcable/list',
    method: 'post',
    data
  })
}
//老旧分析列表
export function oldcable_detail(data) {
  return request({
    url: '/cable/oldcable/detail',
    method: 'post',
    data
  })
}
//老旧分析上传文件
export function oldcable_upload(data) {
  return request({
    url: '/cable/oldcable/upload',
    method: 'post',
    data
  })
}
//老旧分析上传文件
export function oldcable_add(data) {
  return request({
    url: '/cable/oldcable/add',
    method: 'post',
    data
  })
}
//老旧分析上传文件
export function oldcable_remove(data) {
  return request({
    url: '/cable/oldcable/remove',
    method: 'post',
    data
  })
}
//老旧维护列表dl段列表
export function oldcable_wldl(data) {
  return request({
    url: 'cable/oldcable/wldl',
    method: 'post',
    data
  })
}
//dl规模列表
export function oldcable_scale(data) {
  return request({
    url: '/cable/oldcable/scale',
    method: 'post',
    data
  })
}
//dl占比图数据
export function oldcable_percent(data) {
  return request({
    url: '/cable/oldcable/percent',
    method: 'post',
    data
  })
}
//dl运行趋势
export function oldcable_trend(data) {
  return request({
    url: '/cable/oldcable/trend',
    method: 'post',
    data
  })
}
