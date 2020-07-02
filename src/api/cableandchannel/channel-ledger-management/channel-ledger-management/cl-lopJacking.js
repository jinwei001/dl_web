import request from '@/utils/request'
import qs from 'qs'

// 通道-水平顶管
// 查询列表信息
export function List(data) {
  return request({
    url: '/cable/levelPipeJacking/list',
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
    url: '/cable/levelPipeJacking/add',
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
    url: '/cable/levelPipeJacking/edit',
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
    url: '/cable/levelPipeJacking/remove',
    method: 'POST',
    data: qs.stringify({
      ids: res
    })
  })
}

// 获取导出的文件名
export function downLoadFileName() {
  return request({
    url: '/cable/levelPipeJacking/export',
    method: 'POST'
  })
}
