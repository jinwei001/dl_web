import request from '@/utils/request'
import qs from 'qs'

/**
 * 台账统计-附件类型统计
 */

/**
 * 查询列表信息-接头
 * POST
 * @param {*} data 查询列表的条件
 */
export function ListSplice(data) {
  return request({
    url: '/cable/accessoryType/spliceList',
    method: 'POST',
    data
  })
}
/**
 * 查询列表信息-终端
 * POST
 * @param {*} data 查询列表的条件
 */
export function ListTerminal(data) {
  return request({
    url: '/cable/accessoryType/terminalList',
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
