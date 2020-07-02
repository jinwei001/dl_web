/** 系统管理 */
import Layout from '@/layout'

const systemManagement = {
  path: '/wxdl/systemManagement',
  component: Layout,
  redirect: '/wxdl/systemManagement/standard',
  name: 'standard',
  meta: {
    title: '系统管理',
    icon: 'SCZBYS'
  },
  children: [{
    path: 'user',
    name: 'user',
    component: () => import('@/views/systemManagement/User'),
    meta: {
      title: '用户管理'
    }
  }, {
    path: 'post',
    name: 'post',
    component: () => import('@/views/systemManagement/Post'),
    meta: {
      title: '岗位管理'
    }
  }, {
    path: 'group',
    name: 'group',
    component: () => import('@/views/systemManagement/Group'),
    meta: {
      title: '班组管理'
    }
  }, {
    path: 'code',
    name: 'code',
    component: () => import('@/views/systemManagement/Code'),
    meta: {
      title: '代码管理'
    }
  }, {
    path: 'ResourceModule',
    name: 'ResourceModule',
    component: () => import('@/views/systemManagement/ResourceModule'),
    meta: {
      title: '资源模块管理'
    }
  }, {
    path: 'standard',
    name: 'standard',
    component: () => import('@/views/systemManagement/Library'),
    redirect: 'standard/qxlibrary',
    meta: {
      title: '标准库',
      hideInSide: true

    },
    children: [{
      path: 'qxlibrary',
      name: 'qxlibrary',
      component: () => import('@/views/systemManagement/Library/Qx'),
      meta: {
        title: '标准缺陷库',
        outMenuThird: true
      }

    }, {
      path: 'gwlibrary',
      name: 'gwlibrary',
      component: () => import('@/views/systemManagement/Library/Gw'),
      meta: {
        title: '国网工艺库',
        outMenuThird: true
      }

    }, {
      path: 'xmlibrary',
      name: 'xmlibrary',
      component: () => import('@/views/systemManagement/Library/Xm'),
      meta: {
        title: '项目工艺库',
        outMenuThird: true
      }

    }, ]
  }, {
    path: 'logs',
    name: 'logs',
    component: () => import('@/views/systemManagement/Logs'),
    meta: {
      title: '日志管理'
    }
  }, {
    path: 'knowledgeBase',
    name: 'knowledgeBase',
    component: () => import('@/views/systemManagement/standard/knowledgeBase/index.vue'),
    meta: {
      title: '知识库'
    }
  }, {
    path: 'gather',
    name: 'gather',
    component: () => import('@/views/YSsystem/gather'),
    meta: {
      title: '采集模板库'
    }
  }]

}

export default systemManagement
