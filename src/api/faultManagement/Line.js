import request from '@/utils/request'
/**
 * 获取数据
 * @param {string} url 
 * @param {Array} data 
 */
const info = { 
  getList: function (url,data) {
    return request({
      headers: {
        'Content-Type': 'application/json'
      },
      url:url,
      method: 'POST',
      data
    })
  },
}
export default info
