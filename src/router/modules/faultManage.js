/**故障管理 */
import Layout from '@/layout'
const faultManageRouter = {
  path: '/wxdl/falutManage',
  component: Layout,
  redirect: '/wxdl/falutManage',
  name: 'falutManage',
  meta: {
    title: '故障管理',
    icon: 'GZGL'
  },
  children: [{
      path: 'falutDesign',
      name: 'falutDesign',
      component: () => import('@/views/falutManage/falutDesign/index'),
      meta: {
        title: '故障登记'
      }
    },{
      path: 'repairExamine',
      name: 'repairExamine',
      component: () => import('@/views/falutManage/repairExamine/index'),
      meta: {
        title: '抢修资源审批'
      }
    },{
      path: 'faultStatistics',
      name: 'faultStatistics',
      component: () => import('@/views/falutManage/faultStatistics/index'),
      meta: {
        title: '故障统计'
      }
    },
    {
      path: 'rushRepairStatistics',
      name: 'rushRepairStatistics',
      component: () => import('@/views/falutManage/rushRepairStatistics/index'),
      meta: {
        title: '抢修统计'
      },children: [
        {
          path: 'genre',
          name: 'genre',
          component: () => import('@/views/falutManage/rushRepairStatistics/genre/index'),
          meta: {
            title: '故障部件'
          }
        },{
          path: 'unit',
          name: 'unit',
          component: () => import('@/views/falutManage/rushRepairStatistics/faultType/index'),
          meta: {
            title: '故障类型'
          }
        },{
          path: 'reasult',
          name: 'reasult',
          component: () => import('@/views/falutManage/rushRepairStatistics/faultResult/index'),
          meta: {
            title: '故障原因'
          }
        }]
    }
  ]
}
export default faultManageRouter
