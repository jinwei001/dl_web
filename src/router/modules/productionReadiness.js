/**生产准备验收 */
import Layout from '@/layout'
import Istm from "../IsMyprototype"
const productionReadinessRouter = {
  path: '/wxdl/productionReadiness',
  component: Layout,
  redirect: '/wxdl/productionReadiness',
  name: 'productionReadiness',
  meta: {
    title:'生产准备验收',
    icon: 'SCZBYS'
  },
  children: [{
      path: 'projectInformation',
      name: 'projectInformation',
      component: () => import('@/views/productionReadiness/projectInformation/index'),
      meta: {
        title: '工程信息'
      }
    }, {
      path: 'installRecord',
      name: 'installRecord',
      component: () => import('@/views/productionReadiness/installRecord/index'),
      meta: {
        title: '安装记录'
      }
    },
    {
      path: 'tree',
      name: 'tree',
      component: () => import('@/views/productionReadiness/gather/index'),
      meta: {
        title: '采集影像'
      }
    }
  ]
}

export default productionReadinessRouter
