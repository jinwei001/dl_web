import request from '@/utils/request'
import qs from "qs"
// 施工交底
export function getList(data) {
  return request({
    url: '/zjgc/sgjd/list',
    method: 'POST',
    data
  })
}
/**
 * 删除在建工程
 * POST /zjgc/sgjd/remove
 * @param {*} params 
 */
export function DeleteList(data) {
  return request({
    url: '/zjgc/sgjd/remove',
    method: 'POST',
    data:qs.stringify({
      ids:data
    })
  })
}
/**
 * 新增保存在建工程--设计-施工交底
 * POST /zjgc/sgjd/add
 * @param {*} params 
 */
export function Add(data) {
  return request({
    url: '/zjgc/sgjd/add',
    method: 'POST',
    data
  })
}
/**
 * 查询施工交底流程履历列表
 * POST /zjgc/sgjdlc/list
 * @param {*} data 
 */
export function LClist(data) {
  return request({
    url: '/zjgc/sgjdlc/list',
    method: 'POST',
    data
  })
}
/**
 * POST /zjgc/sgjdsgyq/list
 * @param {*} data 
 */
export function SGjdsgyq(data) {
  return request({
    url: '/zjgc/sgjdsgyq/list',
    method: 'POST',
    data
  })
}
/**
 * POST /cable/sgjdbcyq/list
 * @param {*} data 
 */
export function BCList(data) {
  return request({
    url: '/cable/sgjdbcyq/list',
    method: 'POST',
    data
  })
}
/**
 * 提交施工交底流程
 * POST /zjgc/sgjd/submitLc
 * @param {*} data 
 */
export function SubmitLc(data) {
  return request({
    url: '/zjgc/sgjd/submitLc',
    method: 'POST',
    data
  })
}
