/** 缺陷管理 */
import Layout from '@/layout'

const defectManagementRouter = {
  path: '/wxdl/defectManagement',
  component: Layout,
  redirect: '/wxdl/defectManagement',
  name: 'defectManagement',
  meta: {
    title: '缺陷管理',
    icon: 'QXGL'
  },
  children: [{
    path: 'defectAnalyze',
    name: 'defectAnalyze',
    component: () => import('@/views/defectManagement/defectAnalyze/index'),
    meta: {
      title: '缺陷统计分析'
    }
  }, {
    path: 'defectRegisterAndSearch',
    name: 'defectRegisterAndSearch',
    component: () => import('@/views/defectManagement/defectRegisterAndSearch/index'),
    meta: {
      title: '缺陷等级与查询'
    }
  }, {
    path: 'defectExamine',
    name: 'defectExamine',
    component: () => import('@/views/defectManagement/defectExamine/index'),
    meta: {
      title: '缺陷审核'
    }
  },
  {
    path: 'defectInfoMgr',
    name: 'defectInfoMgr',
    component: () => import('@/views/defectManagement/defectInfoMgr/index'),
    meta: {
      title: '缺陷信息管理'
    },
    children: [
      {
        path: 'defectInfoMgr',
        name: 'defectInfoMgr',
        component: () => import('@/views/defectManagement/defectInfoMgr/defectInfoMgr/index'),
        meta: {
          title: '缺陷信息管理'
        }
      },
      {
        path: 'defectDistribution',
        name: 'defectDistribution',
        component: () => import('@/views/defectManagement/defectInfoMgr/defectDistribution/index'),
        meta: {
          title: '缺陷分布'
        }
      }

    ]
  },
  {
    path: 'defectHandlePlan',
    name: 'defectHandlePlan',
    component: () => import('@/views/defectManagement/defectHandlePlan/index'),
    meta: {
      title: '缺陷处置计划'
    }
  }, {
    path: 'defectTypicalCase',
    name: 'defectTypicalCase',
    component: () => import('@/views/defectManagement/defectTypicalCase/index'),
    meta: {
      title: '典型案例缺陷库'
    }
  }, {
    path: 'defectHandleCase',
    name: 'defectHandleCase',
    component: () => import('@/views/defectManagement/defectHandleCase/index'),
    meta: {
      title: '缺陷处置案例'
    }
  }
  ]
}

export default defectManagementRouter
