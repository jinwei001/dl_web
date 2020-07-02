import request from '@/utils/request'
import qs from "qs"
// 施工图审查
export function getList(data) {
  return request({
    url: '/zjgc/sgtsc/list',
    method: 'POST',
    data
  })
}
/**
 * 新增保存在建工程-施工图审查
 * POST /zjgc/sgtsc/add
 * @param {*} params 
 */
export function Add(data) {
  return request({
    url: '/zjgc/sgtsc/add',
    method: 'POST',
    data
  })
}
/**
 * 删除在建工程--设计-施工图审查
 * POST /zjgc/sgtsc/remove
 * @param {*} params 
 */
export function DeleteList(data) {
  return request({
    url: '/zjgc/sgtsc/remove',
    method: 'POST',
    data: qs.stringify({
      ids: data
    })
  })
}
/**
 * 查询设计施工图审查补充意见列表
 * POST /zjgc/sgtscbcyj/list
 * @param {*} data 
 */
export function BcyjList(data) {
  return request({
    url: '/zjgc/sgtscbcyj/list',
    method: 'POST',
    data
  })
}
/**
 *  提交
 *POST /zjgc/sgtsc/submitLc
 * @param {*} data 
 */
export function SubmitLc(data) {
  return request({
    url: '/zjgc/sgtsc/submitLc',
    method: 'POST',
    data
  })
}
/**
 *  流程履历列表
 *POST /zjgc/sgtsclc/list
 * @param {*} data 
 */
export function LClist(data) {
  return request({
    url: '/zjgc/sgtsclc/list',
    method: 'POST',
    data
  })
}
/**
 *查询设计施工图审查意见列表
 *POST /zjgc/sgtscyj/list
 * @param {*} data 
 */
export function GKK(data) {
  return request({
    url: '/zjgc/sgtscyj/list',
    method: 'POST',
    data
  })
}