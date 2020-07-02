/**
 * 保电管理
 */
import Layout from '@/layout'

export default {
    path: '/wxdl/pe',
    component: Layout,
    redirect: '/wxdl/pe',
    name: 'pe',
    meta: {
        title: '保电管理',
        icon: 'BDGL'
    },
    children: [
        {
            path: 'task/home',
            name: 'task-home',
            component: () => import('@/views/protected-electricity/task/TaskManage'),
            meta: {
                title: '保电任务管理'
            }
        },
        {
            path: 'task/plan',
            name: 'task-plan',
            hidden: true,
            component: () => import('@/views/protected-electricity/task/TaskPlanHome'),
            meta: {
                title: '保电任务计划管理'
            }
        },
        {
            path: 'task/result',
            name: 'task-result',
            component: () => import('@/views/protected-electricity/task/TaskResultManage'),
            meta: {
                title: '任务执行情况'
            }
        },
    ]
}
