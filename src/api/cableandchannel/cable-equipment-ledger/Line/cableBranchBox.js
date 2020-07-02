import request from '@/utils/request'
import qs from 'qs'

/**
 * DL设备台账 - DL分支箱
 */

/**
 * 查询列表信息
 * POST
 * @param {*} data 查询列表的条件
 */
export function List(data) {
  return request({
    url: '/cable/branchBox/list',
    method: 'POST',
    data
  })
}
/**
 * 新增保存
 * POST
 * @param  data  表单传来的数据
 */

export function Add(data) {
  return request({
    url: '/cable/branchBox/add',
    method: 'POST',
    data
  })
}
/**
 * 编辑保存
 * @param {*} data  表单传来的数据
 */
export function Edit(data) {
  return request({
    url: '/cable/branchBox/edit',
    method: 'POST',
    data
  })
}
/**
 * 删除
 * POST
 * @param  res 删除的ids
 */

export function DeleteList(res) {
  return request({
    url: '/cable/branchBox/remove',
    method: 'POST',
    data: qs.stringify({
      ids: res
    })
  })
}

// 获取导出的文件名
export function downLoadFileName(data) {
  return request({
    url: '/cable/branchBox/export',
    method: 'POST',
    data
  })
}
