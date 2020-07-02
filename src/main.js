import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
// import 'babel-polyfill'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import './utils/directives.js' //窗口拖动
// import './utils/mapv.js'

import '@/styles/index.scss' // global css
import '@/styles/myStyle/main_mm.scss' // global css
import formatDate from '@/utils/date'

Vue.prototype.$formatDate = formatDate
// 引入qs
import qs from 'qs'
Vue.prototype.$qs = qs
/**
 *        替换名称             页面使用方式
 *    kV           替换qF        使用$qf    this.$qf <=> kV
 *    架空         替换JK        使用$jk
 *    电缆         替换DL        使用$dl
 *    混合         替换HH        使用$hh
 *    输电         替换SD        使用$sd
 *    电压等级     替换DYDJ      使用$dydj
 *    变电站       替换BDZ       使用$bdz
 *    线路         替换XL        使用$xl
 *    杆塔         替换打卡点    使用$gt
 *    杆号         替换编号      使用$gh
 *    塔           替换Ta        使用$ta
 *    相别         替换xingX     使用$x
 *
 *
 *    isnw ==1 外网
 *    isnw  !=1 内网
 */
const isnw = 2
Vue.prototype.$qf = isnw == 1 ? 'qF' : 'kV' // kV替换qF              使用$qF
Vue.prototype.$jk = isnw == 1 ? 'JK' : '架空' // 架空替换JK            使用$jk
Vue.prototype.$dl = isnw == 1 ? 'DL' : '电缆' // 电缆 替换DL           使用$dl
Vue.prototype.$hh = isnw == 1 ? 'HH' : '混合' // 混合替换HH            使用$hh
Vue.prototype.$sd = isnw == 1 ? 'SD' : '输电' // 输电替换SD            使用$sd
Vue.prototype.$dydj = isnw == 1 ? 'DYDJ' : '电压等级' // 电压等级替换DYDJ      使用$dydj
Vue.prototype.$bdz = isnw == 1 ? 'BDZ' : '变电站' // 变电站替换BDZ         使用$bdz
Vue.prototype.$xl = isnw == 1 ? 'XL' : '线路' // 线路替换XL            使用$xl
Vue.prototype.$gt = isnw == 1 ? '打卡点' : '杆塔' // 杆塔替换打卡点        使用$gt
Vue.prototype.$gh = isnw == 1 ? '编号' : '杆号' // 杆号替换编号          使用$gh
Vue.prototype.$ta = isnw == 1 ? 'Ta' : '塔' // 塔替换Ta              使用$ta
Vue.prototype.$xb = isnw == 1 ? 'xingX' : '相别' // 相别替换xingX         使用$xb
Vue.prototype.$png = isnw != 1 // 控制图片的隐藏

import App from './App'
import store from './store/index'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control
import $ from 'jquery'
Vue.prototype.$ = $
/** 全局过滤器 */
import filterList from '@/filters'
Object.keys(filterList).forEach(k => Vue.filter(k, filterList[k]))

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
// 定义全局过滤器--时间格式化
import moment from 'moment'
Vue.filter('format', function(val, arg) {
  if (!val) return
  return val.split(' ')[0]
})

Vue.filter('dateYMDHMSFormat',function(dateStr,pattern='YYYY-MM-DD HH:mm'){
  return moment(dateStr).format(pattern);
})
// set ElementUI lang to EN
Vue.use(ElementUI, {
  locale
})

Vue.config.productionTip = false
export default Vue
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
