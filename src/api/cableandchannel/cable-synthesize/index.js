import request from '@/utils/request'
import qs from 'qs'

/**
 * DL设备 综合查询
 */
// XL - 下拉框数据
export function getLineSelect() {
  return request({
    url: 'cable/integratedQuery/select',
    method: 'GET'
  })
}

// XL - 地图测试接口
export function getLineGisMap() {
  return request({
    url: 'cable/integratedQuery/physicalSelect',
    method: 'post'
  })
}

/**
 * XL列表信息
 */
export const getLinePageList = params => request.post('/cable/integratedQuery/lineSelect', qs.stringify(params))

// 通道 - 下拉框数据
export function getChannelSelect() {
  return request({
    url: 'cable/integratedQuery/channelSelect',
    method: 'GET'
  })
}
// 通道查看GIS接口
export const getChannelGisMap = params => request.post('/cable/integratedQuery/channelByIdSelect', qs.stringify(params))

/**
 * 通道列表信息
 */
export const getChannelPageList = params => request.post('/cable/integratedQuery/channelSelectGis', qs.stringify(params))
