import request from '@/utils/request'

// 查询列表信息
// POST /cable/line/list
export function getList() {
  return request({
    url: '/cable/line/lineList',
    method: 'POST',
  })
}
