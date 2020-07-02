import request from '@/utils/request'
import qs from "qs"
//竣工管理
// 工程信息
export function getList(data) {
  return request({
    url: '/zjgc/jgyj/list',
    method: 'post',
    data
  })
}
// 工程信息
export function ResumeList(data) {
  return request({
    url: '/zjgc/tdjslc/list',
    method: 'post',
    data
  })
}
// 工程信息
export function Addcontrolcard(data) {
  return request({
    url: '/zjgc/xmgyk/list',
    method: 'post',
    data
  })
}
// 工程信息
export function getSelect(data) {
  return request({
    url: '/group/list',
    method: 'post',
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
  * POST /zjgc/jgyj/remove
  * 用户操作接口
  */
 export function DeleteList(data) {
   return request({
     url: '/zjgc/jgyj/remove',
     method: 'POST',
     data:qs.stringify({
       ids:data
     })
   })
 }

