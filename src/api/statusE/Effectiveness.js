// 评价结果
import request from '@/utils/request'
// 列表
export function list(data) {
  return request({
    url: '/cable/ztpjValid/list',
    method: 'post',
    data
  })
}
// 假设列表
export function getLineSelect(data) {
  return request({
    url: '/cable/line/getLineSelect',
    method: 'get',
    data
  })
}
