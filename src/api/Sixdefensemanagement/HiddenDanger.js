import request from '@/utils/request'
//标准信息库

// 标准信息库列表
export function getList(data) {
  return request({
    url: '/cable/tHiddendangerTpWarehouse/list',
    method: 'post',
    data
  })
}

//标准信息库新增
export function tHiddendangerTpWarehouseadd(data) {
  return request({
    url: '/cable/tHiddendangerTpWarehouse/add',
    method: 'post',
    data
  })
}

//标准信息库编辑
export function tHiddendangerTpWarehouseedit(data) {
  return request({
    url: '/cable/tHiddendangerTpWarehouse/edit',
    method: 'post',
    data
  })
}

//标准信息库编辑
export function tHiddendangerTpWarehouseremove(data) {
  return request({
    url: '/cable/tHiddendangerTpWarehouse/remove',
    method: 'post',
    data
  })
}
