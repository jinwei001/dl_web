import request from '@/utils/request'
import qs from "qs"
const info = {
  // POST /zjgc/dqsg/remove
  delInfo: function (data) {
    return request({
      url: "/zjgc/dqsg/remove",
      method: 'POST',
      data: qs.stringify({
        ids: data
      })
    })
  },
  // POST /zjgc/dqsg/add
  add: function (data) {
    return request({
      url: "/zjgc/dqsg/add",
      method: 'POST',
      data
    })
  },
  //POST /zjgc/dqsg/submitLc
  SubmitLc: function (data) {
    return request({
      url: "/zjgc/dqsg/submitLc",
      method: 'POST',
      data
    })
  },
  // POST /zjgc/dqsgbcyj/list
  BcyjList: function (data) {
    return request({
      url: "/zjgc/dqsgbcyj/list",
      method: 'POST',
      data
    })
  },
  // POST /zjgc/dqsglc/list
  LClist:function(data){
    return request({
      url: "/zjgc/dqsglc/list",
      method: 'POST',
      data
    })
  },
  // POST /zjgc/dqsgyj/list
  YjList:function(data){
    return request({
      url: "/zjgc/dqsgyj/list",
      method: 'POST',
      data
    })
  },
}
export default info
