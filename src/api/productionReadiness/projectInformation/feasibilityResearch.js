import request from '@/utils/request'
import qs from 'qs'
// 可研审查
export function getList(data) {
  return request({
    url: '/zjgc/kxxyj/list',
    method: 'POST',
    data
  })
}
/**
 * 工程信息
 * @param {*} data 
 */
export function GC(data) {
  return request({
    url: '/zjgc/gc/list',
    method: 'POST',
    data
  })
}

/**
 * POST  /group/list
 * 查询系统管理 班组列表
 * @param {*} data 
 */
export function group() {
  return request({
    url: '/group/list',
    method: 'POST',
  })
}
/**
 * POST /system/user/list
 * 用户操作接口
 */
export function UserList(data) {
  return request({
    url: '/system/user/list',
    method: 'POST',
    data:qs.stringify({
      groupid:data
    })
  })
}
/**
 * 删除
 * @param {*} data 
 */
export function DeleteList(data) {
  return request({
    url: '/zjgc/kxxyj/remove',
    method: 'POST',
    data: qs.stringify({
      ids: data
    })
  })
}
/**
 * 查询立项中可行性研究补充意见列表
 * POST /zjgc/kxxyjbcyj/list
 * @param {*} data 
 */
export function BcyjList(data) {
  return request({
    url: '/zjgc/kxxyjbcyj/list',
    method: 'POST',
    data
  })
}
/**
 * 查询可行性研究流程履历列表
 *  POST /zjgc/kxxylc/list
 * @param {*} data 
 */
export function LClist(data) {
  return request({
    url: '/zjgc/kxxylc/list',
    method: 'POST',
    data
  })
}
/**
 * 新增保存立项中可行性研究主
 * POST /zjgc/kxxyj/add
 * @param {*} data 
 */
export function Add(data) {
  return request({
    url: '/zjgc/kxxyj/add',
    method: 'POST',
    data
  })
}
/**
 * 查询规章规程管理列表
 * POST /cable/gzgcgl/list
 * @param {*} data 
 */
export function Gz(data) {
  return request({
    url: '/cable/gzgcgl/list',
    method: 'POST',
    data
  })
}
/**
 * 管控卡 查看
 * POST /zjgc/kxxyjyj/list
 * @param {*} data 
 */
export function GKK(data) {
  return request({
    url: '/zjgc/kxxyjyj/list',
    method: 'POST',
    data
  })
}
/**
 * 管控卡 新增
 * POST /zjgc/xmgyk/list
 * @param {*} data 
 */
export function GKK_view(data) {
  return request({
    url: '/zjgc/xmgyk/list',
    method: 'POST',
    data
  })
}
/**
 *  提交
 *POST /zjgc/kxxyj/submitLc
 * @param {*} data 
 */
export function SubmitLc(data) {
  return request({
    url: '/zjgc/kxxyj/submitLc',
    method: 'POST',
    data
  })
}
