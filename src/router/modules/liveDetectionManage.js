/** 带电检测管理 */
import Layout from '@/layout'

const liveDetectionRouter = {
    path: '/wxdl/liveDetection',
    component: Layout,
    redirect: '/wxdl/detectionCycle',
    name: 'liveDetection',
    meta: {
        title: '带电检测管理',
        icon: 'XSGL'
    },
    children: [{
        path: 'detectionCycle',
        name: 'detectionCycle',
        component: () => import('@/views/liveDetectionManage/cycle'),
        meta: {
            title: '检测周期管理'
        },

    }, {
        path: 'detectionPlan',
        name: 'detectionPlan',
        component: () => import('@/views/liveDetectionManage/plan'),
        meta: {
            title: '检测计划管理'
        },

    }, {
        path: 'detectionTask',
        name: 'detectionTask',
        component: () => import('@/views/liveDetectionManage/task'),
        meta: {
            title: '检测任务管理'
        },

    },{
        path: 'detectionResult',
        name: 'detectionResult',
        component: () => import('@/views/liveDetectionManage/result'),
        meta: {
            title: '检测结果管理'
        },

    },{
        path: 'detectionQuality',
        name: 'detectionQuality',
        component: () => import('@/views/liveDetectionManage/quality'),
        meta: {
            title: '检测质量管理'
        },

    },{
        path: 'modelLibrary',
        name: 'modelLibrary',
        component: () => import('@/views/liveDetectionManage/modelLibrary'),
        meta: {
            title: '文件库'
        },

    },

    ]
}

export default liveDetectionRouter
