import request from '@/utils/request'

/**
 * 在建工程-施工-试验主表 
 */
/**
 * 查询在建工程--施工--试验列表
 * POST /zjgc/sy/list
 * @param {*} data  
 */

import qs from "qs"
const info = {
  delInfo: function (data) {
    return request({
      url: "/zjgc/sy/remove",
      method: 'POST',
      data: qs.stringify({
        ids: data
      })
    })
  },
  List: function (data) {
    return request({
      url: '/zjgc/sy/list',
      method: 'POST',
      data
    })
  },
  // POST /zjgc/sy/submitLc
  SubmitLc: function (data) {
    return request({
      url: '/zjgc/sy/submitLc',
      method: 'POST',
      data
    })
  },
  // POST /zjgc/sybcyj/list
  BcyjList: function (data) {
    return request({
      url: '/zjgc/sybcyj/list',
      method: 'POST',
      data
    })
  },
  //POST /zjgc/sy/add
  add: function (data) {
    return request({
      url: '/zjgc/sy/add',
      method: 'POST',
      data
    })
  },
  //POST /zjgc/sylc/list
  LClist: function (data) {
    return request({
      url: '/zjgc/sylc/list',
      method: 'POST',
      data
    })
  },
  // POST /zjgc/syyj/list
  YjList: function (data) {
    return request({
      url: '/zjgc/syyj/list',
      method: 'POST',
      data
    })
  },
}
export default info
