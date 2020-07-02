import request from '@/utils/request'
import qs from 'qs'

/**
 * DL设备台账 - XL台账
 */

/**
 * 查询列表信息
 * POST /cable/line/list
 * @param {*} data 查询列表的条件
 */
export function List(data) {
  return request({
    url: '/cable/line/list',
    method: 'POST',
    data
  })
}
/**
 * 新增保存XL
 * POST /cable/line/add
 * @param  data  表单传来的数据
 */

export function Add(data) {
  return request({
    url: '/cable/line/add',
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
    url: '/cable/line/edit',
    method: 'POST',
    data
  })
}
/**
 * 删除XL
 * POST /cable/line/remove
 * @param  res 删除的ids
 */

export function DeleteList(res) {
  return request({
    url: '/cable/line/remove',
    method: 'POST',
    data: qs.stringify({
      ids: res
    })
  })
}

// 获取导出的文件名
export function downLoadFileName(params) {
  return request({
    url: '/cable/line/export',
    method: 'GET',
    params
  })
}
