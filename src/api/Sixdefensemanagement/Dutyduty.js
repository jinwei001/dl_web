//任务模块
import request from '@/utils/request'

// 列表
export function tHidJhTasklist(data) {
  return request({
    url: '/cable/tHidJhTask/list',
    method: 'post',
    data
  })
}
