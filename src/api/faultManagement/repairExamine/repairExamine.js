import request from '@/utils/request'
import qs from 'qs'

/**
 * 查询列表信息
 * POST
 * @param {*} data 查询列表的条件
 */
export function List(data) {
  return request({
    url: '/cable/failureRushRepairsExamine/list',
    method: 'POST',
    data
  })
}

/**
 * 新增
 * POST
 */
export function qxzyAdd(data) {
  return request({
    url: '/cable/failureRushRepairsExamine/add',
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
    url: '/cable/failureRushRepairsExamine/remove',
    method: 'POST',
    data: qs.stringify({
      ids: res
    })
  })
}

/** 班组列表 */
export let groups = () => request.get('/api/select/getGroups');

// 审批提交接口
export function editList(data) {
  return request({
    url: '/cable/failureRushRepairsExamine/edit',
    method: 'POST',
    data
  })
}
