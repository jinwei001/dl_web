import request from '@/utils/request'
import qs from 'qs'

/**
 * 通道风险管理
 */

/**
 * 查询列表信息
 * POST
 * @param {*} data 查询列表的条件
 */
export function List(data) {
  return request({
    timeout: null,
    url: '/cable/gradeMasterMeter/gradelist',
    method: 'POST',
    data
  })
}
// 查询是否已评分
export function isGrade(data) {
  return request({
    url: '/cable/grade/isGrade',
    method: 'POST',
    data
  })
}
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
 * 风险因子模板 未评分情况
 * POST
 * @param
 */
export function riskDivisor(data) {
  return request({
    url: '/cable/grade/list',
    method: 'POST',
    data
  })
}

/**
 * 评分列表 已评分情况
 * POST
 * @param
 */
export function gradeList(data) {
  return request({
    timeout: null,
    url: '/cable/grade/list',
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
// 编辑保存评分细则
export function gradeFineRulesEdit(data) {
  return request({
    url: '/cable/gradeFineRules/edit',
    method: 'POST',
    data
  })
}
// 评分回显
export function gradeFineRulesEcho(id) {
  return request({
    url: '/cable/gradeFineRules/editPage/'+id,
    method: 'get'
  })
}
// 上传评分图片 
export function gradeFineRulesPic(data) {
  return request({
    url: '/cable/gradeFineRules/uploadPitures',
    method: 'POST',
    data
  })
}

// 根据通道ID查询通道及评估结果信息
export function channelSelect(data) {
  return request({
    url: '/cable/gradeMasterMeter/channelIdSelect',
    method: 'POST',
    data
  })
}

// 回显扣分细则
export function getRulesData (id) {
  return request({
    url: '/cable/gradeFineRules/editPage/' + id,
    method: 'GET'
  })
}
