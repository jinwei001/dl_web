import request from '@/utils/request'
import qs from "qs"
// 初设审查
export function getList(data) {
  return request({
    url: '/zjgc/cbsj/list',
    method: 'POST',
    data
  })
}

/**
 * 删除设计初步设计意见
 * POST /zjgc/cbsjyj/remove
 * @param {*} params 
 */
export function DeleteList(data) {
  return request({
    url: '/zjgc/cbsj/remove',
    method: 'POST',
    data:qs.stringify({
      ids:data
    })
  })
}
/**
 * 新增保存在建工程--设计-初步设计
 * POST /zjgc/cbsj/add
 * @param {*} data 
 */
export function Add(data) {
  return request({
    url: '/zjgc/cbsj/add',
    method: 'POST',
    data
  })
}
/**
 * 查询设计初步设计补充意见列表
 * POST /zjgc/cbsjbcyj/list
 * @param {*} data 
 */
export function Cbsjbcyj(data) {
  return request({
    url: '/zjgc/cbsjbcyj/list',
    method: 'POST',
    data
  })
}
/**
 * 查询在建工程--工程主列表
 * POST /zjgc/gc/list
 * @param {*} data 
 */
export function gc(data) {
  return request({
    url: '/zjgc/gc/list',
    method: 'POST',
    data
  })
}
/**
 * 查询初步设计流程履历列表
 * POST /zjgc/cbsjlc/list
 * @param {*} data 
 */
export function LClist(data) {
  return request({
    url: '/zjgc/cbsjlc/list',
    method: 'POST',
    data
  })
}
/**
 * 提交设计审查流程
 * POST /zjgc/cbsj/submitLc
 * @param {*} data 
 */
export function SubmitLc(data) {
  return request({
    url: '/zjgc/cbsj/submitLc',
    method: 'POST',
    data
  })
}

/**
 * 查询设计初步设计意见列表
 * POST /zjgc/cbsjyj/list
 * @param {*} data 
 */
export function GKK(data) {
  return request({
    url: '/zjgc/cbsjyj/list',
    method: 'POST',
    data
  })
}

/**
 * 前阶段遗留意见
 * POST /zjgc/gc/qjdylyi_jd
 * @param {*} data gcid: 工程id
 *                  jd: 阶段名称 
 * kxxyj
 * cbsj
 * sgtsc
 * tdjs
 * dqsg
 * sy
 * tdys
 * dqys
 * 
 * 
 */
export function YLJDMC(data) {
  return request({
    url: '/zjgc/gc/qjdylyi_jd',
    method: 'POST',
    data
  })
}

