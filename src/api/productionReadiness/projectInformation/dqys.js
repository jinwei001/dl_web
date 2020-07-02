import request from '@/utils/request'
import qs from "qs"
const dqys = {
  // POST /zjgc/dqsg/listys
  getList: function (req) {
    return request.post("/zjgc/dqsg/listys", req);
  },
  
  // POST /zjgc/dqsg/submitYsLc
  SubmitLc: function (data) {
    return request({
      url: "/zjgc/dqsg/submitYsLc",
      method: 'POST',
      data
    })
  },
//   POST /zjgc/dqsg/addYs
  add: function (data) {
    return request({
      url: "/zjgc/dqsg/addYs",
      method: 'POST',
      data
    })
  },
}
export default dqys
