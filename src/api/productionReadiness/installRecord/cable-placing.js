import request from '@/utils/request'

/**
 * 查询DL敷设记录主列表
 * POST /zjgc/dlfs/list
 * @param {*} data
 */
// ===========================================//DL敷设记录列表=====================================
//DL敷设记录列表
export function getList(data) {
  return request({
    url: '/zjgc/dlfs/list',
    method: 'POST',
    data,
    responseType:"bool"
  })
}
//DL敷设记录列表项目名称
export function gclist(data) {
  return request({
    url: '/zjgc/gc/list',
    method: 'POST',
    data,
    responseType:"bool"
  })
}
//DL敷设记录列表新增
export function add(data) {
  return request({
    url: '/zjgc/dlfs/add',
    method: 'POST',
    data,
    responseType:"bool"

  })
}
//DL敷设记录列表删除
export function remove(data) {
  return request({
    url: '/zjgc/dlfs/remove',
    method: 'POST',
    data,
    responseType:"bool"

  })
}
//DL敷设记录列表编辑
export function edit(data) {
  return request({
    url: '/zjgc/dlfs/edit',
    method: 'POST',
    data,
    responseType:"bool"
  })
}
// ===========================================//DL接头安装记录=====================================
//DL敷设记录列表
export function dljtlist(data) {
  return request({
    url: '/zjgc/dljt/list',
    method: 'POST',
    data,
    responseType:"bool"
  })
}
//DL敷设记录列表新增
export function dljtadd(data) {
  return request({
    url: '/zjgc/dljt/add',
    method: 'POST',
    data,
    responseType:"bool"
  })
 }
//DL敷设记录删除
export function dljtremove(data) {
  return request({
    url: '/zjgc/dljt/remove',
    method: 'POST',
    data,
    responseType:"bool"
  })
 }
 //DL敷设记录编辑
 export function dljtedit(data) {
   return request({
     url: '/zjgc/dljt/edit',
     method: 'POST',
     data,
     responseType:"bool"
   })
  }
// ===========================================//DL终端安装记录=====================================

//DL敷设记录列表
export function dlzdlist(data) {
  return request({
    url: '/zjgc/dlzd/list',
    method: 'POST',
    data,
    responseType:"bool"
  })
}
//DL敷设记录列表新增
export function dlzdadd(data) {
  return request({
    url: '/zjgc/dlzd/add',
    method: 'POST',
    data,
    responseType:"bool"
  })
 }
//DL敷设记录删除
export function dlzdremove(data) {
  return request({
    url: '/zjgc/dlzd/remove',
    method: 'POST',
    data,
    responseType:"bool"
  })
 }
 //DL敷设记录编辑
 export function dlzdedit(data) {
   return request({
     url: '/zjgc/dlzd/edit',
     method: 'POST',
     data,
     responseType:"bool"
   })
  }
  // ===========================================//单芯DL箱安装记录=====================================

//单芯DL箱安装记录列表
export function dxdlxlist(data) {
  return request({
    url: '/zjgc/dxdlx/list',
    method: 'POST',
    data,
    responseType:"bool"
  })
}
//单芯DL箱安装记录新增
export function dxdlxadd(data) {
  return request({
    url: '/zjgc/dxdlx/add',
    method: 'POST',
    data,
    responseType:"bool"
  })
 }
//单芯DL箱安装记录删除
export function dxdlxremove(data) {
  return request({
    url: '/zjgc/dxdlx/remove',
    method: 'POST',
    data,
    responseType:"bool"
  })
 }
 //单芯DL箱安装记录编辑
 export function dxdlxedit(data) {
   return request({
     url: '/zjgc/dxdlx/edit',
     method: 'POST',
     data,
     responseType:"bool"
   })
  }




  // ===========================================//同轴DL箱安装记录安装记录=====================================

  //同轴DL箱安装记录安装记录列表
  export function tzdlxlist(data) {
    return request({
      url: '/zjgc/tzdlx/list',
      method: 'POST',
      data,
      responseType:"bool"
    })
  }
  //同轴DL箱安装记录安装记录新增
  export function tzdlxadd(data) {
    return request({
      url: '/zjgc/tzdlx/add',
      method: 'POST',
      data,
      responseType:"bool"
    })
   }
  //同轴DL箱安装记录安装记录删除
  export function tzdlxremove(data) {
    return request({
      url: '/zjgc/tzdlx/remove',
      method: 'POST',
      data,
      responseType:"bool"
    })
   }
   //同轴DL箱安装记录安装记录编辑
   export function tzdlxedit(data) {
     return request({
       url: '/zjgc/tzdlx/edit',
       method: 'POST',
       data,
       responseType:"bool"
     })
    }
