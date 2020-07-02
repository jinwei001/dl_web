import Vue from 'vue'
import Router from 'vue-router'
import Istm from './IsMyprototype'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import cableandchannelmanagementRouter from './modules/cableandchannelmanagement'
import patrolmanagementRouter from './modules/patrolmanagement'
import productionReadinessRouter from './modules/productionReadiness'
import sixPreventionRouter from './modules/sixprevention'
import defectManagementRouter from './modules/Defect'

import faultManagementRouter from './modules/faultManage'

import statusEvaluatManRouter from './modules/statusEvaluationManagement'
import protectedElectricity from '@/router/modules/ProtectedElectricity'
import liveDetectionRouter from './modules/liveDetectionManage'
import emergencymanagementRouter from './modules/emergencymanagement'
import systemManagement from './modules/systemManagement'
import oldManagementRouter from './modules/oldManagementRouter'
import reconditionRouter from './modules/recondition'
export const constantRouterMap = [{
    path: '/wxdl/login',
    // redirect: '/login',
    name: 'login',
    component: () =>
      import('@/views/login/index'),
    meta: {
      title: Istm.$dl+'精益化平台'
    },
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/wxdl/index',
    children: [{
      path: '/wxdl/index',
      name: 'index',
      component: () => import('@/views/index/index'),
      meta: {
        title: '首页',
        icon: 'Myindex',
        affix: true
      },
      hidden: true
    }]
  },
  /** 生产准备验收 */
  productionReadinessRouter,
  /** DL及通道管理 */
  cableandchannelmanagementRouter,
  /** 巡视管理 */
  patrolmanagementRouter,
  /** 六防管理 */
  sixPreventionRouter,
  /** 带电检测管理 */
  liveDetectionRouter,
  /** 状态评价管理 */
  statusEvaluatManRouter,
  // 缺陷管理
  defectManagementRouter,
  /** 保电管理 */
  protectedElectricity,
  /** 老旧管理 */
  oldManagementRouter,
  // 故障管理
  faultManagementRouter,
  /**检修管理 */
  reconditionRouter,
  // 应急管理
  emergencymanagementRouter,
  // 系统管理
  systemManagement,

  {
    path: '/404',
    component: () =>
      import('@/views/404'),
    hidden: true
  }
]

const createRouter = () => new Router({
  mode: 'history',
  // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
router.selfaddRoutes = function (params) {
  router.matcher = new Router().matcher;
  router.addRoutes(params)
}

export default router
