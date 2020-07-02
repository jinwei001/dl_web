/**
 * 老旧管理
 */
import Layout from '@/layout'
import Istm from '../IsMyprototype'
export default {
    path: '/wxdl/old',
    component: Layout,
    redirect: '/wxdl/old',
    name: 'old',
    meta: {
        title: '老旧管理',
        icon: 'BDGL'
    },
    children: [
        {
            path: 'oldManagement/cable-maintenance',
            name: 'cable-maintenance',
            component: () => import('@/views/oldManagement/cable-maintenance'),
            meta: {
                title: '老旧'+Istm.$dl+'维护'
            }
        },
        {
            path: 'oldManagement/cable-scale',
            name: 'cable-scale',
            component: () => import('@/views/oldManagement/cable-scale'),
            meta: {
                title: '老旧'+Istm.$dl+'规模'
            }
        },
       
    ]
}
