import request from '@/utils/request'

/**
 * XL定级
 */

/**
 * 查询列表信息
 * POST
 * @param {*} data 查询列表的条件
 */
export function List(data) {
  return request({
    url: '/cable/lineRank/list',
    method: 'POST',
    data
  })
}
/**
 * 编辑回显
 * POST
 * @param
 */
export function Echo(lineId) {
  return request({
    url: '/cable/lineRank/editPage/' + lineId ,
    method: 'get'
  })
}
/**
 * 编辑保存
 * @param {*} data  表单传来的数据
 */
export function Edit(data) {
  return request({
    url: '/cable/lineRank/edit',
    method: 'POST',
    data
  })
}
