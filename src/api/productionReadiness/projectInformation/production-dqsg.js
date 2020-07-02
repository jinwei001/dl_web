import request from '@/utils/request'
// 电气施工
export function getList(data) {
  return request({
    url: '/zjgc/dqsg/list',
    method: 'POST',
    data
  })
}

