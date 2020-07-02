/**
 * 缺陷管理
 */
import Layout from '@/layout'

export default {
  path: '/wxdl/defect',
  component: Layout,
  redirect: '/wxdl/defect/analysis',
  name: 'defect',
  meta: {
    title: '缺陷管理',
    icon: 'GZGL'
  },
  children: [
    {
      path: 'analysis',
      name: 'analysis',
      component: () => import('@/views/defect/analysis'),
      meta: {
        title: '缺陷统计分析'
      },
      children: [{
        path: 'level',
        name: 'level',
        component: () => import('@/views/defect/analysis/Level'),
        meta: {
          title: '缺陷程度'
        }
      }, {
        path: 'part',
        name: 'part',
        component: () => import('@/views/defect/analysis/Part'),
        meta: {
          title: '缺陷部位'
        }
      }, {
        path: 'bj',
        name: 'bj',
        component: () => import('@/views/defect/analysis/Bj'),
        meta: {
          title: '缺陷部件'
        }
      }]
    },
    {
      path: 'register',
      name: 'register',
      component: () => import('@/views/defect/register'),
      meta: {
        title: '缺陷登记与查询'
      }
    },
    {
      path: 'plan',
      name: 'plan',
      component: () => import('@/views/defect/plan'),
      meta: {
        title: '缺陷处置计划'
      }
    },
    {
      path: 'audit',
      name: 'audit',
      component: () => import('@/views/defect/audit'),
      meta: {
        title: '缺陷审核'
      }
    },
    {
      path: 'case',
      name: 'case',
      component: () => import('@/views/defect/case'),
      meta: {
        title: '缺陷处置案例'
      }
    },
    // {
    //   path: 'infomation',
    //   name: 'infomation',
    //   component: () => import('@/views/defect/analysis'),
    //   meta: {
    //     title: '缺陷信息管理'
    //   }
    // },
    {
      path: 'infomationList',
      name: 'infomationList',
      component: () => import('@/views/defect/analysisMap/DefectAnalysisListManage'),
      meta: {
        title: '缺陷信息管理'
      }
    },
    {
      path: 'infomationMap',
      name: 'infomationMap',
      component: () => import('@/views/defect/analysisMap/DefectAnalysisMapManage'),
      meta: {
        title: '缺陷信息地图'
      }
    }

    // {
    //   path: 'library',
    //   name: 'library',
    //   component: () => import('@/views/defect/analysis/DefectAnalysisManage'),
    //   meta: {
    //     title: '典型案例缺陷库'
    //   }
    // },
    // {
    //   path: 'case',
    //   name: 'case',
    //   component: () => import('@/views/defect/analysis/DefectAnalysisManage'),
    //   meta: {
    //     title: '缺陷处置案例'
    //   }
    // }
  ]
}
