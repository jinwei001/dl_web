/**
 * 检修及试验管理
 */
import Layout from '@/layout'

const reconditionRouter = {
  path: '/wxdl/recondition',
  component: Layout,
  redirect: '/wxdl/recondition/Rcycle',
  name: 'recondition',
  meta: {
    title: '检修及试验管理',
    icon: 'JXJSYGL'
  },
  children: [{
    path: 'Rcycle',
    name: 'Rcycle',
    component: () => import('@/views/recondition/Rcycle/index'),
    meta: {
      title: '检修试验周期'
    }
  },
  {
    path: 'Rtage',
    name: 'Rtage',
    component: () => import('@/views/recondition/outage/index'),
    meta: {
      title: '停电申请'
    }
  },
  
  {
    path: 'Rplan',
    name: 'Rplan',
    component: () => import('@/views/recondition/plan/index'),
    meta: {
      title: '检修试验计划'
    },
    children: [{
      path: 'checkPlan',
      name: 'checkPlan',
      component: () => import('@/views/recondition/plan/checkPlan/index'),
      meta: {
        title: '检修任务池管理'
      }
    },
  {
    path: 'yearPlan',
      name: 'yearPlan',
      component: () => import('@/views/recondition/plan/yearPlan/index'),
      meta: {
        title: '年度检修计划编制'
      }
  },
  {
    path: 'monthPlan',
      name: 'monthPlan',
      component: () => import('@/views/recondition/plan/monthPlan/index'),
      meta: {
        title: '月度检修计划编制'
      }
  },
  {
    path: 'weekPlan',
      name: 'weekPlan',
      component: () => import('@/views/recondition/plan/weekPlan/index'),
      meta: {
        title: '周检修计划编制'
      }
  }]
  },
  // {
  //   path: 'Rtask',
  //   name: 'Rtask',
  //   component: () => import('@/views/recondition/task/index'),
  //   meta: {
  //     title: '检修工作任务管理'
  //   }
  // },
  {
    // --------------------------------------
    path: 'rtask',
    name: 'rtask',
    redirect: '/wxdl/recondition/rtask/mainpage',
    component: () => import('@/views/recondition/task/index'),
    meta: {
      title: '检修工作任务管理',
      hideInSide: true
    },
    children: [{
      path: 'mainpage',
      name: 'mainpage',
      component: () => import('@/views/recondition/task/MainPage'),
      meta: {
        title: '检修工作任务管理',
      },
    }, {
      path: 'report',
      name: 'report',
      component: () => import('@/views/recondition/task/Report'),
      meta: {
        title: '报告',
      },
      children: [{
        path: 'reportbase',
        name: 'reportbase',
        component: () => import('@/views/recondition/task/ReportBase'),
        meta: {
          title: '基本资料与信息查询',
        },
      },{
        path: 'reportplan',
        name: 'reportplan',
        component: () => import('@/views/recondition/task/ReportPlan'),
        meta: {
          title: '计划管理',
        },
      }]
    },
    ]
  },
  {
    path: 'Rreport',
    name: 'Rreport',
    component: () => import('@/views/recondition/report/index'),
    meta: {
      title: '报告验收'
    }
  },
  {
    path: 'Rinstruction',
    name: 'Rinstruction',
    component: () => import('@/views/recondition/instruction/index'),
    meta: {
      title: '标准化作业指导书'
    }
  },
  ]

}
export default reconditionRouter
