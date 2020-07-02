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
  },
  /**
   * POST /cable/tYjglYjya/add
   * @param {*} data 
   */
  addList: function (data) {
    return request({
      url: "/cable/tYjglYjya/add",
      method: 'POST',
      data
    })
  },
  /**
   * POST /cable/tYjglYjya/edit
   * @param {*} data 
   */
  editList: function (data) {
    return request({
      url: "/cable/tYjglYjya/edit",
      method: 'POST',
      data
    })
  },
  /**
   * XL接口
   * @param {*} data 
   */
  Linelist: function (data) {
    return request({
      url: "/cable/line/list",
      method: 'POST',
      data
    })
  },
  /**
   * POST /cable/tYjglYyyalc/list
   * @param {*} data 
   */
  lclist(data) {
    return request({
      url: "/cable/tYjglYyyalc/list",
      method: 'POST',
      data: qs.stringify(data)
    })
  },
  /**
   * 删除
   * POST /cable/tYjglYjya/remove
   * @param {string} data 
   */
  DeleteList(data) {
    return request({
      url: "/cable/tYjglYjya/remove",
      method: 'POST',
      data: qs.stringify({
        ids: data
      })
    })
  },
  /**
   * 提交流程
   * POST /cable/tYjglYjya/submitLc
   * @param {string} data 
   */
  submitLc(data) {
    return request({
      url: "/cable/tYjglYjya/submitLc",
      method: 'POST',
      data
    })
  }

}
export default info
