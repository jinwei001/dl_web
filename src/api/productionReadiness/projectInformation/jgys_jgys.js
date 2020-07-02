import request from '@/utils/request'
import qs from "qs"
const info = {
  //POST /zjgc/jgyjlc/list
  LClist: function (req) {
    return request.post("/zjgc/jgyjlc/list", req);
  },
  // POST /zjgc/jgyj/submitLc
  SubmitLc: function (data) {
    return request({
      url: "/zjgc/jgyj/submitLc",
      method: 'POST',
      data
    })
  },
  add: function (data) {
    return request({
      url: "/zjgc/jgyj/add",
      method: 'POST',
      data
    })
  },
  //POST /zjgc/jgyjbcyj/list
  BcyjList: function (data) {
    return request({
      url: "/zjgc/jgyjbcyj/list",
      method: 'POST',
      data
    })
  },
  //POST /zjgc/jgyjyj/list
  GKK: function (data) {
    return request({
      url: "/zjgc/jgyjyj/list",
      method: 'POST',
      data
    })
  },
}
export default info
