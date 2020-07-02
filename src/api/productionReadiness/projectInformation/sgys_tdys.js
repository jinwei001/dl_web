import request from '@/utils/request'
import qs from "qs"
const jsys = {
  //POST /zjgc/tdjs/listysc
  getList: function (data) {
    return request({
      url: "/zjgc/tdjs/listys",
      method: 'POST',
      data
    })
  },
  BcyjList: function (data) {
    return request({
      url: "/zjgc/tdjsbcyj/list",
      method: 'POST',
      data
    })
  },
  // POST /zjgc/tdjs/addYs
  add:function(data){
    return request({
      url: "/zjgc/tdjs/addYs",
      method: 'POST',
      data
    })
  },
  // POST /zjgc/tdjs/submitYsLc
  SubmitLc:function(data){
    return request({
      url: "/zjgc/tdjs/submitYsLc",
      method: 'POST',
      data
    })
  },

}
export default jsys
