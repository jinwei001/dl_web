import request from '@/utils/request'
import qs from "qs"
const info = {
  /**
   * 获取列表数据
   * POST /cable/tYjglYjya/list
   * @param {Array} data 
   */
  getList: function (data) {
    return request({
      url: "/cable/tYjglYjya/list",
      method: 'POST',
      data
    })
  }
}
export default info
