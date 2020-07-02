import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import loginInfo from '@/api/logininfo'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
router.beforeEach(async(to, from, next) => {
  // 开始进度条
  NProgress.start()
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)
  // 确定用户是否已登录
  const hasToken = getToken()
  if (hasToken) {
    next()
  } else {
    if (to.path == '/wxdl/login') {
      next()
    } else {
      next('/wxdl/login')
    }
  }
  // if (hasToken) {
  //     console.log(next());
  //     next()
  //     // if (to.path === '/login') {
  //     //     // 如果已登录，则重定向到主页
  //     //     next({ path: '/index' })
  //     //     NProgress.done()
  //     // }
  // } else {
  //     //白名单中的客户
  //     if (whiteList.indexOf(to.path) !== -1) {
  //         next()
  //     } else {
  //         // 没有访问权限的其他页面被重定向到登录页面。
  //         next(`/wxdl/login`)
  //         NProgress.done()
  //     }
  // }
})
router.afterEach(() => {
  // 完成进度条
  NProgress.done()
})
