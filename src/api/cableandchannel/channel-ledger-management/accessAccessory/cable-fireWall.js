import request from '@/utils/request'
import qs from 'qs'

// DL防火墙
// 查询列表信息
export function List(data) {
  return request({
    url: '/cable/cableFirewall/list',
    method: 'POST',
    data
  })
}
/**
 * 新增保存XL
 * POST
 * @param  data  表单传来的数据
 */

export function Add(data) {
  return request({
    url: '/cable/cableFirewall/add',
    method: 'POST',
    data
  })
}
/**
 * 编辑保存XL
 * @param {*} data  表单传来的数据
 */
export function Edit(data) {
  return request({
    url: '/cable/cableFirewall/edit',
    method: 'POST',
    data
  })
}
/**
 * 删除XL
 * POST
 * @param  res 删除的ids
 */

export function DeleteList(res) {
  return request({
    url: '/cable/cableFirewall/remove',
    method: 'POST',
    data: qs.stringify({
      ids: res
    })
  })
}

// 获取导出的文件名
export function downLoadFileName() {
  return request({
    url: '/cable/cableFirewall/export',
    method: 'POST'
  })
}
