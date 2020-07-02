import request from '@/utils/request'

// 工程信息
export function getList(data) {
  return request({
    url: '/zjgc/gc/list',
    method: 'post',
    data
  })
}

/**
 * 新增保存在建工程--工程主
 *  /zjgc/gc/add
 * @param {*} data 
 */
export function Add(data) {
  return request({
    url: '/zjgc/gc/add',
    method: 'POST',
    data
  })
}
/**
 * /bzsj/getSelect   参数fzid
 */
export function Info(data) {
  return request({
    url: '/bzsj/getSelect',
    method: 'POST',
    data
  })
}
/**
 * POST /system/user/list
 * 用户操作接口
 */
export function UserList() {
  return request({
    url: '/system/user/list',
    method: 'POST',
  })
}
/**
 * POST /zjgc/gc/edit
 * 用户操作接口
 */
export function Edit(data) {
  return request({
    url: '/zjgc/gc/edit',
    method: 'POST',
    data
  })
}