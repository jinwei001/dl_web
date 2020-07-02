import request from '@/utils/request'
import qs from "qs"
const info = {
  delInfo: function (data) {
    return request({
      url: "/zjgc/tdjs/remove",
      method: 'POST',
      data: qs.stringify({
        ids: data
      })
    })
  },
  LClist: function (req) {
    return request.post("/zjgc/tdjslc/list", req);
  },
  // POST /zjgc/tdjs/submitLc
  SubmitLc:function(data){
    return request({
      url: "/zjgc/tdjs/submitLc",
      method: 'POST',
      data
    })
  },
   aad(req) {
    return request.post("/zjgc/tdjs/add", req);
  }
}
export default info
