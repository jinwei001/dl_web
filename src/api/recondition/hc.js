/**
 * dl护层电流、感应电压检测试验报告
 */
import request from '@/utils/request'
import qs from "qs"
/**公共方法 */
export const postAllList = (url, data) => request.post(url, qs.stringify(data))
export const getAllList = (url, params) => request.get(url, qs.stringify(params))
/**
 * 新增
 * @param {*} data 
 */
export function hcgyReportAdd(data) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url: '/cable/hcgyReport/add',
    method: 'post',
    data
  })
}

/**
 * 查询
 * @param {} jobtaskid 
 */
export function hcgyReportList(data) {
  return request({
    url: '/cable/hcgyReport/list',
    method: 'post',
    data:qs.stringify(data)
  })
}
/**
 * 修改保存电缆护层电流、感应电压检测试验报告
 * @param {*} data 
 */
export function hcgyReportEdit(data) {
  return request({
    headers: {
        'Content-Type': 'application/json'
      },
    url: '/cable/hcgyReport/edit',
    method: 'post',
    data
  })
}
/**
 * 新增保存电缆外护套及内衬层试验报告
 * @param {*} data 
 */
export function whtncReportAdd(data) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url: '/cable/whtReport/add',
    method: 'post',
    data
  })
}

/**
 * 查询电缆外护套及内衬层试验报告列表
 * @param {} jobtaskid 
 */
export function whtncReportList(data) {
  return request({
    url: '/cable/whtReport/list',
    method: 'post',
    data:qs.stringify(data)
  })
}
/**
 * 修改保存电缆外护套及内衬层试验报告
 * @param {*} data 
 */
export function whtncReportEdit(data) {
  return request({
    headers: {
        'Content-Type': 'application/json'
      },
    url: '/cable/whtReport/edit',
    method: 'post',
    data
  })
}
/**
 * 新增保存电缆外护套及内衬层试验报告
 * @param {*} data 
 */
export function jdxtReportAdd(data) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url: '/cable/jdxtReport/add',
    method: 'post',
    data
  })
}

/**
 * 查询电缆外护套及内衬层试验报告列表
 * @param {} jobtaskid 
 */
export function jdxtReportList(data) {
  return request({
    url: '/cable/jdxtReport/list',
    method: 'post',
    data:qs.stringify(data)
  })
}
/**
 * 修改保存电缆外护套及内衬层试验报告
 * @param {*} data 
 */
export function jdxtReportEdit(data) {
  return request({
    headers: {
        'Content-Type': 'application/json'
      },
    url: '/cable/jdxtReport/edit',
    method: 'post',
    data
  })
}

/**
 * 查询上次试验报告
 * @param {*} data 
 */
export function getSyBg(data) {
  return request({
    url: '/cable/overhauJobtask/getSyBg',
    method: 'post',
    data:qs.stringify(data)
  })
}