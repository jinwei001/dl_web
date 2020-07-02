import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken,
  removeToken,
  removeUserId,
  removeUserName
} from '@/utils/auth'
import qs from 'qs'
let devUrl = ''
let proUrl = ''
// if (process.env.NODE_ENV == 'development') {
//   devUrl = 'http://192.168.1.16:8081/map/map_load.js'
// }
// if (process.env.NODE_ENV == 'production') {
//   // proUrl = 'https://cloud.glens.com.cn:9102/dlapi/'
//    proUrl = 'https://api.map.baidu.com/api?v=2.0&ak=PL4wfqVofjrMVz7FMaPs8Dts'

// }
// 创建axios的实例
const service = axios.create({
  /**
   * baseURL {      
   *  '/dlapi' 内网发布模式
   *  process.env.VUE_APP_BASE_API 开发模式 
   *  process.env.VUE_APP_BASE_API 外网模式
   * }
   */
  // baseURL:'/dlapi',//内网发布模式
  baseURL: process.env.VUE_APP_BASE_API, //开发模式 
  // baseURL: process.env.VUE_APP_BASE_API, //外网模式 
  // timeout: 5000, // 请求时长
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded' // 请求头部
  }
})
// 请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.Authorization = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response
    // console.log("响应拦截");
    // console.log(res);
    if (res.status == 200) {
      // console.log('res :>> ', res);
      // console.log('==200 :>> ', 200);
      if (res.data.code == 0) {
        return Promise.resolve(res)

      } else if (res.data.code == 99 || res.data.code == 401) {
        Message.error({
          message: '身份过期，请重新登录'
        })
        removeToken()
        removeUserName()
        removeUserId()
        setTimeout(() => {
          router.replace({
            path: '/wxdl/login',
          })
        }, 1200)
      }

    } else {
      console.log('！==200 :>> ', res);
      return Promise.resolve(res)
    }
    return Promise.resolve(res)

  }, error => {
    // console.log(error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
