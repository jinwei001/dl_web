/** 巡视管理*/
import Layout from '@/layout'
import Istm from '../IsMyprototype'
const patrolmanagementRouter = {
  path: '/wxdl/patrolmanagement',
  component: Layout,
  redirect: '/wxdl/PatrolCycleManagement',
  name: 'patrol-management',
  meta: {
    title: '巡视管理',
    icon: 'XSGL'
  },
  children: [ {
          path: 'warning',
          component: () => import('@/views/patrolmanagement/warning'),
          name: 'warning',
          meta: { title: '预警管理' }
        },
    {
      path: 'inspectionPandect',
      name: 'inspectionPandect',
      component: () => import('@/views/patrolmanagement/inspection-pandect/index'),
      meta: {
        title: '巡视总览'
      },
      children: [
        {
          path: 'inspectionQuery',
          component: () => import('@/views/patrolmanagement/inspection-pandect/inspectionQuery/index'),
          name: 'inspectionQuery',
          meta: { title: '巡视查询' }
        },
        {
          path: 'inspectionTrack',
          component: () => import('@/views/patrolmanagement/inspection-pandect/inspectionTrack/index'),
          name: 'inspectionTrack',
          meta: { title: '预警管理' }
        }
      ]
    },
    {
      path: 'PatrolCycleManagement',
      name: 'PatrolCycleManagement',
      component: () => import('@/views/patrolmanagement/patrol-cycle-management/index'),
      meta: {
        title: '巡视周期管理'
      },
      children: [
        {
          path: 'Line',
          component: () => import('@/views/patrolmanagement/patrol-cycle-management/Line/index'),
          name: 'Line',
          meta: { title: Istm.$xl + '巡视周期管理' }
        },
        {
          path: 'Channel',
          component: () => import('@/views/patrolmanagement/patrol-cycle-management/Channel/index'),
          name: 'Channel',
          meta: { title: '通道巡视周期管理' }
        }
      ]
    },
    {
      path: 'PatrolPlanManagement',
      name: 'PatrolPlanManagement',
      component: () => import('@/views/patrolmanagement/patrol-plan-management/index'),
      meta: {
        title: '巡视计划管理'
      },
      children: [
        {
          path: 'Line',
          component: () => import('@/views/patrolmanagement/patrol-plan-management/Line/index'),
          name: 'Line',
          meta: { title: Istm.$xl + '巡视计划管理' }
        },
        {
          path: 'Channel',
          component: () => import('@/views/patrolmanagement/patrol-plan-management/Channel/index'),
          name: 'Channel',
          meta: { title: '通道巡视计划管理' }
        }
      ]
    },
    {
      path: 'PatrolTaskManagement',
      name: 'PatrolTaskManagement',
      component: () => import('@/views/patrolmanagement/patrol-task-management/index'),
      meta: {
        title: '巡视任务管理'
      }
    },
    {
      path: 'InspectionResultManagement',
      name: 'InspectionResultManagement',
      component: () => import('@/views/patrolmanagement/inspection-result-management/index'),
      meta: {
        title: '巡视结果管理'
      },
      children: [
        {
          path: 'Line-Result',
          component: () => import('@/views/patrolmanagement/inspection-result-management/Line-Result/index'),
          name: 'Line-Result',
          meta: { title: Istm.$xl + '巡视结果管理' }
        },
        {
          path: 'Channel-Result',
          component: () => import('@/views/patrolmanagement/inspection-result-management/Channel-Result/index'),
          name: 'Channel-Result',
          meta: { title: '通道巡视结果管理' }
        }
      ]
    }
  ]
}

export default patrolmanagementRouter
