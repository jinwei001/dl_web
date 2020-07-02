import request from '@/utils/request'
import qs from 'qs'

/**
 * 台账统计
 */

/**
 * 查询列表信息
 * POST
 * @param {*} data 查询列表的条件
 */
export function List(data) {
  return request({
    url: '/cable/standingBook/list',
    method: 'POST',
    data
  })
}
/**
 * 查询XL信息（图表）
 * POST
 * @param
 */

export function cableSelectInfo() {
  return request({
    url: '/cable/standingBook/cableSelect',
    method: 'GET'
  })
}
