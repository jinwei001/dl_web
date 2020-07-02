import request from '@/utils/request'
import qs from 'qs'

/**
 * 故障管理 故障登记
 */

// 获取下拉框内容
export function getSelectList(value) {
  return request({
    url: '/bzsj/list',
    method: 'POST',
    data: qs.stringify({
      fzmc: value
    })
  })
}

/**
 * 查询列表信息
 * POST
 * @param {*} data 查询列表的条件
 */
export function List(data) {
  return request({
    url: '/cable/failureLogging/alllist',
    method: 'POST',
    data
  })
}
/**
 * 新增
 * POST
 * @param  data  表单传来的数据
 */

export function Add(data) {
  return request({
    url: '/cable/failureLogging/add',
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
    url: '/cable/failureLogging/remove',
    method: 'POST',
    data: qs.stringify({
      ids: res
    })
  })
}

// 故障登记新增
export function faultDesignAdd(data) {
  return request({
    url: '/cable/failureLogging/add',
    method: 'POST',
    data
  })
}
// 故障登记编辑
export function faultDesignEdit(data) {
  return request({
    url: '/cable/failureLogging/edit',
    method: 'POST',
    data
  })
}
// 故障登记回显
export function faultDesignEcho(data) {
  return request({
    url: '/cable/failureLogging/list',
    method: 'POST',
    data
  })
}

// 故障查询新增
export function faultSearchAdd(data) {
  return request({
    url: '/cable/failureFinding/add',
    method: 'POST',
    data
  })
}
// 故障查询编辑
export function faultSearchEdit(data) {
  return request({
    url: '/cable/failureFinding/edit',
    method: 'POST',
    data
  })
}
// 故障查询回显
export function faultSearchEcho(data) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url: '/cable/failureFinding/findByGzdjId',
    method: 'POST',
    data
  })
}

// 抢修准备新增
export function repairReadyAdd(data) {
  return request({
    url: '/cable/failureRepairPreparation/add',
    method: 'POST',
    data
  })
}
// 抢修准备编辑
export function repairReadyEdit(data) {
  return request({
    url: '/cable/failureRepairPreparation/edit',
    method: 'POST',
    data
  })
}
// 抢修准备回显
export function repairReadyEcho(data) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url: '/cable/failureRepairPreparation/findByGzdjId',
    method: 'POST',
    data
  })
}

// 抢修开展回显
export function qxjdEcho(data) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url: '/cable/failureRushRepairs/findByGzdjId',
    method: 'POST',
    data
  })
}
// 保存抢修开展
export function saveQxjd(data) {
  return request({
    url: '/cable/failureRushRepairs/add',
    method: 'POST',
    data
  })
}
// 编辑抢修开展
export function saveQxjd_edit(data) {
  return request({
    url: '/cable/failureRushRepairs/edit',
    method: 'POST',
    data
  })
}
// 处理过程列表
export function clgcList(data) {
  return request({
    url: '/cable/failureProcesses/list',
    method: 'POST',
    data
  })
}
// 处理过程新增
export function clgcAdd(data) {
  return request({
    url: '/cable/failureProcesses/add',
    method: 'POST',
    data
  })
}

// 原因分析新增编辑内容回显
export function analyzeInfo(data) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url: '/cable/failureAnalysis/findByGzdjId',
    method: 'POST',
    data
  })
}
// 原因分析
export function reasonInfo(data) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url: '/cable/failureAnalysis/findMemoByGzdjId',
    method: 'POST',
    data
  })
}
// 原因分析新增
export function reasonInfoAdd(data) {
  return request({
    url: '/cable/failureAnalysis/add',
    method: 'POST',
    data
  })
}
// 原因分析编辑
export function reasonInfoEdit(data) {
  return request({
    url: '/cable/failureAnalysis/edit',
    method: 'POST',
    data
  })
}

// 上传抢修报告
export function uploadQxbg(data) {
  return request({
    headers:{"Content-Type":"multipart/form-data"},
    url: '/cable/file/upload',
    method: 'POST',
    data
  })
}

// 上传抢修单
export function uploadQxd(data) {
  return request({
    headers:{"Content-Type":"multipart/form-data"},
    url: '/cable/file/upload',
    method: 'POST',
    data
  })
}
// 保存抢修单
export function uploadAndSaveQxd(data) {
  return request({
    url: '/cable/failureLogging/edit',
    method: 'POST',
    data
  })
}

// 应急预案列表(调预案管理接口)
export function yjyaList(data) {
  return request({
    url: '/cable/tYjglYjya/list',
    method: 'POST',
    data
  })
}

// 抢修开展删除处理过程
export function deleteClgc(data) {
  return request({
    url: '/cable/failureProcesses/remove',
    method: 'POST',
    data
  })
}
