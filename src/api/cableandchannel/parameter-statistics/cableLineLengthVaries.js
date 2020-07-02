import request from '@/utils/request'
import qs from 'qs'

/**
 * 台账统计-近十年DLXL长度
 */

/**
 * 查询列表信息
 * POST
 * @param {*} data 查询列表的条件
 */
export function List(data) {
  return request({
    url: '/cable/cableAccessoryLength/list',
    method: 'POST',
    data
  })
}
/**
 * 查询通道长度
 * POST
 * @param  data  表单传来的数据
 */

export function getLineLength(data) {
  return request({
    url: '/cable/channelOperationAgeLimit/channelLength',
    method: 'POST',
    data
  })
}
