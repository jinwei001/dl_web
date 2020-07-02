import request from '@/utils/request'

// 通道建设
export function getList(data) {
  return request({
    url: '/zjgc/tdjs/list',
    method: 'POST',
    data
  })
}
/**
 * 查询施工通道建设补充意见列表
 * POST /zjgc/tdjsbcyj/list
 * @param {*} data 
 */
export function BcyjList(data) {
  return request({
    url: '/zjgc/tdjsbcyj/list',
    method: 'POST',
    data
  })
}
/**
 * 查询施工通道建设意见列表
 * POST /zjgc/tdjsyj/list
 * @param {*} data 
 */
export function YjList(data) {
  return request({
    url: '/zjgc/tdjsyj/list',
    method: 'POST',
    data
  })
}
