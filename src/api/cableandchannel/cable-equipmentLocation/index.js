import request from '@/utils/request'
import qs from 'qs'

/**
 * DL设备 设备位置绘制
 */
// XL - 下拉框数据
export function getLineSelect() {
  return request({
    url: 'cable/deviceLocation/lineSelect',
    method: 'GET'
  })
}
// 通道 - 下拉框数据
export function getChannelSelect() {
  return request({
    url: 'cable/deviceLocation/channelSelect',
    method: 'GET'
  })
}
/**
 * 查询列表信息
 * POST /cable/line/list
 * @param {*} data 查询列表的条件
 */
export function List(data) {
  return request({
    url: '/cable/line/list',
    method: 'POST',
    data
  })
}

