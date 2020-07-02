/** 巡视管理*/
import Layout from '@/layout'
import Istm from '../IsMyprototype'
const statusEvaluationManagement = {
  path: '/wxdl/statusEvaluationManagement',
  component: Layout,
  redirect: '/wxdl/statusEvaluationManagement/status',
  name: 'status-evlu',
  meta: {
    title: '状态评价管理',
    icon: 'ZTPJGL '
  },
  children: [

    {
      path: 'result',
      name: 'result',
      component: () => import('@/views/statusEvaluationManagement/result/index'),
      meta: {
        title: '状态评价结果管理',
        hideInSide: true
      }
    },
    {
      path: 'cycle',
      name: 'cycle',
      component: () => import('@/views/statusEvaluationManagement/cycle/index'),
      meta: {
        title: '状态评价周期管理',
        hideInSide: true
      }
    },
    {
      path: 'regular',
      name: 'regular',
      component: () => import('@/views/statusEvaluationManagement/regular/index'),
      meta: {
        title: '定期评价任务管理',
        hideInSide: true
      }
    },
    {
      path: 'rplot',
      name: 'rplot',
      component: () => import('@/views/statusEvaluationManagement/rplot/index'),
      meta: {
        title: '状态检修策略管理',
        hideInSide: true
      }
    },
    {
      path: 'Effectiveness',
      name: 'Effectiveness',
      component: () => import('@/views/statusEvaluationManagement/Effectiveness/index'),
      meta: {
        title: '有效性管理',
        hideInSide: true
      }
    },
    {
      path: 'status',
      name: 'status',
      redirect: '/wxdl/statusEvaluationManagement/status/statusLine',
      component: () => import('@/views/statusEvaluationManagement/statistics/Index'),
      meta: {
        title: '统计',
        hideInSide: true
      },
      children: [
        {
          path: 'statusLine',
          name: 'statusLine',
          component: () => import('@/views/statusEvaluationManagement/statistics/StatisticsLine'),
          meta: {
            title: Istm.$xl + '统计'
          }
        }, {
          path: 'statusAssembly',
          name: 'statusAssembly',
          component: () => import('@/views/statusEvaluationManagement/statistics/StatusAssembly'),
          meta: {
            title: '部件统计'
          }
        }, {
          path: 'assemblyDistribution',
          name: 'assemblyDistribution',
          component: () => import('@/views/statusEvaluationManagement/statistics/AssemblyDistribute'),
          meta: {
            title: '部件分布'
          }
        }]
    }, 
    // {
    //   path: 'stateEvaluation',
    //   name: 'stateEvaluation',
    //   component: () => import('@/views/statusEvaluationManagement/stateEvaluation/Index'),
    //   meta: {
    //     title: '状态评价',
    //     hideInSide: true
    //   }
    // },
    {
      path: 'defend',
      name: 'defend',
      component: () => import('@/views/statusEvaluationManagement/defend/index'),
      meta: {
        title: '状态评价模板维护',
        hideInSide: true
      }
    },
    
    
    

   
    
  ]
}

export default statusEvaluationManagement
