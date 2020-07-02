import request from '@/utils/request'
import qs from 'qs'

/**
 * 编辑通道风险管理
 */

// 获取通道类型
export function channelType(val) {
  return request({
    url: '/cable/riskDivisorTemplate/getChannelType',
    method: 'GET',
    data: {
      ids: val
    }
  })
}

/**
 * 风险信息 已评分情况
 * POST
 * @param
 */
export function riskInfo(data) {
  return request({
    url: '/cable/grade/list',
    method: 'POST',
    data
  })
}

/**
 * 风险评分主要信息 已评分情况
 * POST
 * @param
 */
export function riskMainInfo(data) {
  return request({
    url: '/cable/gradeMasterMeter/channelIdSelect',
    method: 'POST',
    data
  })
}

/**
 * 评分提交
 * POST
 * @param
 */
export function gradeAdd(data) {
  return request({
    url: '/cable/gradeMasterMeter/add',
    method: 'POST',
    data
  })
}

/**
 * 新增保存评分细则
 * POST
 * @param
 */
export function gradeFineRulesAdd(data) {
  return request({
    url: '/cable/gradeFineRules/add',
    method: 'POST',
    data
  })
}

// 根据通道ID查询通道名称和级别
export function channelSelect(data) {
  return request({
    url: '/cable/gradeMasterMeter/channelIdSelect',
    method: 'POST',
    data
  })
}
