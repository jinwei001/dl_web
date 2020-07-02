import request from '@/utils/request'
import qs from 'qs'

/**
 *DL设备台账 - DL避雷器
 */

/**
 * 查询列表信息
 * POST
 * @param {*} data 查询列表的条件
 */
export function List(data) {
  return request({
    url: '/cable/arrester/list',
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
    url: '/cable/arrester/add',
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
    url: '/cable/arrester/edit',
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
    url: '/cable/arrester/remove',
    method: 'POST',
    data: qs.stringify({
      ids: res
    })
  })
}

// 获取导出的文件名
export function downLoadFileName(data) {
  return request({
    url: '/cable/arrester/export',
    method: 'POST',
    data
  })
}

// 获取打卡点下拉
export function gtSelect(data) {
  return request({
    url: '/cable/tower/list',
    method: 'POST',
    data
  })
}
