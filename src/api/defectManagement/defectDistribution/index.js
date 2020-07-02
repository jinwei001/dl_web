import request from '@/utils/request'
import qs from 'qs'

/**
 * 缺陷管理  缺陷分布
 */
// 缺陷列表
export function getDefectList(data) {
  return request({
    url: '/cable/tQxglJbxxk/PCqxList',
    method: 'POST',
    data
  })
}
/**
 * 查询列表信息
 * @param {*} data 查询列表的条件
 */
export function List(data) {
  return request({
    url: '/cable/line/list',
    method: 'POST',
    data
  })
}


// XL列表查询下拉数据
export function getLineSelect() {
  return request({
    url: '/cable/line/getLineSelect',
    method: 'GET'
  })
}
// 缺陷地图坐标点展示
export function getDefectMap() {
  return request({
    url: '/cable/tQScreen/allInfo',
    method: 'POST'
  })
}

// 缺陷流程
export function getLc(data) {
  return request({
    url: '/cable/tQScreen/liucheng',
    method: 'POST',
    data: qs.stringify({
      objId: data
    })
  })
}
