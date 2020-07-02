/**
 * 应急管理
 */
import Layout from '@/layout'

export default {
    path: '/wxdl/emergencymanagement',
    component: Layout,
    redirect: '/wxdl/emergencymanagement/plan',
    name: 'emergencymanagement',
    meta: {
        title: '应急管理',
        icon: 'YJGL'
    },
    children: [
        {
            path: 'plan',
            name: 'plan',
            component: () => import('@/views/emergencymanagement/plan'),
            meta: {
                title: '应急预案管理'
            }
        },
        {
            path: 'emergencymanagement/audit',
            name: 'audit',
            component: () => import('@/views/emergencymanagement/audit'),
            meta: {
                title: '审核预案'
            }
        },
        {
            path: 'spare-part',
            name: 'spare-part',
            component: () => import('@/views/emergencymanagement/spare-part'),
            meta: {
                title: '备品备件管理'
            }
        }
    ]
}
