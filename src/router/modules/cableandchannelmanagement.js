/** dl及通道管理 */
import Layout from '@/layout'
import Istm from '../IsMyprototype'

const cableandchannelmanagementRouter = {
  path: '/wxdl/cableandchannelmanagement',
  component: Layout,
  redirect: '/wxdl/cableandchannelmanagement/IntegratedQuery',
  name: 'cable-and-channel-management',
  meta: {
    title: Istm.$dl + '及通道管理',
    icon: 'DLJTD'
  },
  children: [{
    path: 'IntegratedQuery',
    name: 'IntegratedQuery',
    component: () => import('@/views/cableandchannelmanagement/integrated-query/index'),
    meta: {
      title: '综合查询'
    },
    children: [{
      path: 'newLine',
      component: () => import('@/views/cableandchannelmanagement/integrated-query/newLine/index'),
      name: 'newLine',
      meta: {
        title: Istm.$xl + '查询'
      }
    },
    {
      path: 'newChannel',
      component: () => import('@/views/cableandchannelmanagement/integrated-query/newChannel/index'),
      name: 'newChannel',
      meta: {
        title: '通道查询'
      }
    }
    ]
  },
  {
    path: 'CableEquipmentLedger',
    name: 'CableEquipmentLedger',
    component: () => import('@/views/cableandchannelmanagement/cable-equipment-ledger/router-view'),
    meta: {
      title: Istm.$dl + '设备台账'
    },
    children: [
      {
        path: 'CableEquipmentLedger',
        name: 'CableEquipmentLedger',
        component: () => import('@/views/cableandchannelmanagement/cable-equipment-ledger/index'),
        meta: {
          title: Istm.$dl + '设备台账'
        }
      },
      {
        path: 'equipmentChange',
        name: 'equipmentChange',
        component: () => import('@/views/cableandchannelmanagement/cable-equipment-ledger/equipmentChange/index'),
        meta: {
          title: '设备变更登记查询'
        }
      },
    ]
  },
  
  // {
  //   path: 'Seeabout/id=:id',
  //   name: 'Seeabout',
  //   component: () => import('@/views/cableandchannelmanagement/cable-equipment-ledger/view'),
  //   meta: {
  //     title: 'dl设备台账-查看',
  //     noCache: true,//如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
  //     activeMenu: '/CableEquipmentLedger'
  //   },
  //   hidden: true,
  // },
  {
    path: 'kong',
    name: 'kong',
    component: () => import('@/views/cableandchannelmanagement/cable-equipment-ledger/default'),
    hidden: true
  },
  // {
  //   path: 'DeviceLocationDrawing',
  //   name: 'DeviceLocationDrawing',
  //   component: () => import('@/views/cableandchannelmanagement/device-location-drawing/index'),
  //   meta: {
  //     title: '设备位置绘制'
  //   },
  //   children: [{
  //     path: 'newLine',
  //     component: () => import('@/views/cableandchannelmanagement/device-location-drawing/newLine/index'),
  //     name: 'newLine',
  //     meta: {
  //       title: Istm.$xl + '查询'
  //     }
  //   },
  //   {
  //     path: 'newChannel',
  //     component: () => import('@/views/cableandchannelmanagement/device-location-drawing/newChannel/index'),
  //     name: 'newChannel',
  //     meta: {
  //       title: '通道查询'
  //     }
  //   }
  //   ]
  // },
  {
    path: 'LineGrading',
    name: 'LineGrading',
    component: () => import('@/views/cableandchannelmanagement/line-grading/index'),
    meta: {
      title: Istm.$xl + '定级'
    }

  },
  {
    path: 'ChannelLedgerManagement',
    name: 'ChannelLedgerManagement',
    component: () => import('@/views/cableandchannelmanagement/channel-ledger-management/index'),
    meta: {
      title: '通道台账管理'
    },
    children: [{
      path: 'ChannelLedgerManagement',
      component: () => import('@/views/cableandchannelmanagement/channel-ledger-management/channel-ledger-management/index'),
      name: 'ChannelLedgerManagement',
      meta: {
        title: '通道台账管理'
      }
    },
    {
      path: 'AccessAccessoryTwo',
      component: () => import('@/views/cableandchannelmanagement/channel-ledger-management/access-accessory-two/index'),
      name: 'AccessAccessoryTwo',
      meta: {
        title: '通道附属设施'
      },
      children: [{
        path: 'cableFirewall',
        component: () => import('@/views/cableandchannelmanagement/channel-ledger-management/access-accessory-two/access-accessory-view/cable-firewall'),
        name: 'cableFirewall',
        meta: {
          title: Istm.$dl + '防火墙'
        }
      },
      {
        path: 'checkWellOrWorkWell',
        component: () => import('@/views/cableandchannelmanagement/channel-ledger-management/access-accessory-two/access-accessory-view/check-well-or-work-well'),
        name: 'checkWellOrWorkWell',
        meta: {
          title: '检查井/工井'
        }
      },
      {
        path: 'portal',
        component: () => import('@/views/cableandchannelmanagement/channel-ledger-management/access-accessory-two/access-accessory-view/portal'),
        name: 'portal',
        meta: {
          title: '隧道门'
        }
      },
      {
        path: 'cableTerminal',
        component: () => import('@/views/cableandchannelmanagement/channel-ledger-management/access-accessory-two/access-accessory-view/cable-terminal'),
        name: 'cableTerminal',
        meta: {
          title: Istm.$dl + '终端站'
        }
      },
      {
        path: 'ventilator-scoop',
        component: () => import('@/views/cableandchannelmanagement/channel-ledger-management/access-accessory-two/access-accessory-view/ventilator-scoop'),
        name: 'ventilator-scoop',
        meta: {
          title: '通风口'
        }
      }]
    }
    ]
  },
  {
    path: 'ChannelGrading',
    name: 'ChannelGrading',
    component: () => import('@/views/cableandchannelmanagement/channel-grading/index'),
    meta: {
      title: '通道定级'
    }
  },
  {
    path: 'ChannelVisualization',
    name: 'ChannelVisualization',
    component: () => import('@/views/cableandchannelmanagement/channel-grading/ChannelVisualization'),
    meta: {
      title: '通道可视化'
    }
  },
  // {
  //   path: 'ChannelSectionManagement',
  //   name: 'ChannelSectionManagement',
  //   component: () => import('@/views/cableandchannelmanagement/channel-section-management/index'),
  //   meta: {
  //     title: '通道断面管理'
  //   }
  // },
  {
    path: 'ChannelRiskMmanagement',
    name: 'ChannelRiskMmanagement',
    component: () => import('@/views/cableandchannelmanagement/channel-risk-management/index'),
    meta: {
      title: '通道风险管理'
    }
  },
  {
    path: 'ParameterStatistics',
    name: 'ParameterStatistics',
    component: () => import('@/views/cableandchannelmanagement/parameter-statistics/index'),
    meta: {
      title: '台账统计'
    }
  },
  {
    path: 'KeyToImport',
    name: 'KeyToImport',
    component: () => import('@/views/cableandchannelmanagement/KeyToImport/index'),
    meta: {
      title: '一键导入'
    }
  }
  ]
}

export default cableandchannelmanagementRouter
