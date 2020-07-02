/** 六防管理 */
import Layout from '@/layout'
const sixPreventionRouter = {
  path: '/wxdl/sixprevention',
  component: Layout,
  redirect: '/wxdl/sixprevention',
  name: 'sixprevention',
  meta: {
    title: '六防管理',
    icon: 'LFGL'
  },
  children: [
    {
      path: 'information-audit',
      name: 'information-audit',
      component: () => import('@/views/six-prevention/information-audit/index'),
      meta: {
        title: '隐患登记与审核'
      }
    },
    {
      path: 'information-list',
      name: 'information-list',
      component: () => import('@/views/six-prevention/information-list/index'),
      meta: {
        title: '隐患处置计划'
      }
    }, {
      path: 'On-duty-task',
      name: 'On-duty-task',
      component: () => import('@/views/six-prevention/On-duty-task/index'),
      meta: {
        title: '值守任务列表'
      }
    },
    {
      path: 'governance-case',
      name: 'governance-case',
      component: () => import('@/views/six-prevention/governance-case/index'),
      meta: {
        title: '隐患治理案例'
      }
    },
    {
      path: 'hiddenDangerInfo',
      name: 'hiddenDangerInfo',
      component: () => import('@/views/six-prevention/hiddenDangerInfo/index'),
      meta: {
        title: '隐患信息管理'
      }
    },
    // {
    //   path: 'hiddenDangerInfo1',
    //   name: 'hiddenDangerInfo1',
    //   component: () => import('@/views/six-prevention/hiddenDangerInfo1/index'),
    //   meta: {
    //     title: '隐患信息管理1'
    //   }
    // },
    {
      path: 'high-risk-line',
      name: 'high-risk-line',
      component: () => import('@/views/six-prevention/high-risk-line/index'),
      meta: {
        title: '隐患统计分析'
      }
    },
    // {
    //   path: 'hiddenMapManager',
    //   name: 'hiddenMapManager',
    //   component: () => import('@/views/six-prevention/high-risk-line/hiddenMapManager'),
    //   meta: {
    //     title: '隐患分布'
    //   }
    // },
    {
      path: 'SixdefenseStatistics',
      name: 'SixdefenseStatistics',
      component: () => import('@/views/six-prevention/SixdefenseStatistics/index'),
      meta: {
        title: '六防统计分析'
      }
    }
    // {
    //   path: 'Standard-hazard-inventory',
    //   name: 'Standard-hazard-inventory',
    //   component: () => import('@/views/six-prevention/Standard-hazard-inventory/index'),
    //   meta: {
    //     title: '标准隐患库'
    //   }
    // }

  ]
}
export default sixPreventionRouter
