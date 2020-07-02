import request from '@/utils/request'
import qs from 'qs'

/**
 * DL设备台账
 */

/**
 * 查询列表信息
 * POST /cable/line/list
 * @param {*} data 查询列表的条件
 */
export function List(data) {
  return request({
    timeout:null,
    url: '/cable/line/lineList',
    method: 'POST',
    data
  })
}
export function fatherList(data) {
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

// XL列表查询下拉数据
export function getLineSelect() {
  return request({
    // timeout: 10000,
    url: '/cable/line/getLineSelect',
    method: 'GET'
  })
}

// 获取下载模板
export function downLoadModel() {
  return request({
    url: '/cable/line/importTemplate',
    method: 'GET'
  })
}
// 获取导出的文件名
export function downLoadFileName() {
  return request({
    url: '/cable/line/export',
    method: 'GET'
  })
}
