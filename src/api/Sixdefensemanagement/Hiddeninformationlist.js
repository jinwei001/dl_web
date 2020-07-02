//隐患信息审核
import request from '@/utils/request'
import qs from 'qs'
//竣工管理

// 总列表
export function tHiddendangerMessagegetXunShiInfo(data) {
  return request({
    url: '/cable/tHiddendangerMessage/getXunShiInfo',
    method: 'post',
    data
  })
}
// 总列表
export function tHiddendangerMessagegetElePlanList(data) {
  return request({
    url: '/cable/tHiddendangerMessage/getElePlanList',
    method: 'post',
    data
  })
}
//巡查新增需要的数据
export function getaddData(data) {
  return request({
    url: '/cable/tHiddendangerOnduty/getAddInfo',
    method: 'post',
    data
  })
}
//巡查新增
export function tHiddendangerMessageaddXunShiInfo(data) {
  return request({
    url: '/cable/tHiddendangerMessage/addXunShiInfo',
    method: 'post',
    data
  })
}
//巡查编辑
export function tHiddendangerMessageupdateXlxsjh(data) {
  return request({
    url: '/cable/tHiddendangerMessage/updateXlxsjh',
    method: 'post',
    data
  })
}
//巡查删除
export function remove(data) {
  return request({
    url: '/cable/tHiddendangerMessage/deleteXlxsjh',
    method: 'post',
    data
  })
}
//生成巡视计划
export function tHiddendangerMessageCreatXunShiInfo(data) {
  return request({
    url: '/cable/tHiddendangerMessage/CreatXunShiInfo',
    method: 'post',
    data
  })
}

//获取检修计划新增页面数据
export function tHiddendangerMessagegetMaintenanceInfo(data) {
  return request({
    url: '/cable/tHiddendangerMessage/getMaintenanceInfo',
    method: 'post',
    data
  })
}
//获取检修计划新增页面数据
export function tHiddendangerMessageaddMaintenanceInfo(data) {
  return request({
    url: '/cable/tHiddendangerMessage/addMaintenanceInfo',
    method: 'post',
    data
  })
}
//获取检修计划编辑页面数据
export function tHiddendangerMessageupdateMaintenanceInfo(data) {
  return request({
    url: '/cable/tHiddendangerMessage/updateMaintenanceInfo',
    method: 'post',
    data
  })
}
//检修删除
export function tHiddendangerMessagedeleteMaintenanceInfo(data) {
  return request({
    url: '/cable/tHiddendangerMessage/deleteMaintenanceInfo',
    method: 'post',
    data
  })
}
//检修生成计划
export function tHiddendangerMessageCreatMaintenanceInfo(data) {
  return request({
    url: '/cable/tHiddendangerMessage/CreatMaintenanceInfo',
    method: 'post',
    data
  })
}
// ---------------------------------------------------------------------------------------------------------------
//巡视新增
export let addPlan = params => request.post('/cable/xlxsjh/addPlan', qs.stringify(params, { allowDots: true }));
// 带电
export let planList = params => request.post('/cable/detectionPlan/list1', qs.stringify(params, { allowDots: true }));
export let planAdd = params => request.post('/cable/detectionPlan/add1', qs.stringify(params, { allowDots: true }));
/** 编辑  */
//获取带电检测新增页面数据
export function tHiddendangerMessagegetEleAddInfo(data) {
  return request({
    url: '/cable/tHiddendangerMessage/getEleAddInfo',
    method: 'post',
    data
  })
}
//新增带电检测计划
export function tHiddendangerMessageaddEleInfo(data) {
  return request({
    url: '/cable/tHiddendangerMessage/addEleInfo',
    method: 'post',
    data
  })
}
//编辑带电检测计划
export function tHiddendangerMessageupdateElePlans(data) {
  return request({
    url: '/cable/tHiddendangerMessage/updateElePlans',
    method: 'post',
    data
  })
}
//删除带电检测计划
export function tHiddendangerMessageremoveElePlans(data) {
  return request({
    url: '/cable/tHiddendangerMessage/removeElePlans',
    method: 'post',
    data
  })
}
//生成带电检测计划
export function tHiddendangerMessageCreatRealyElePlanInfo(data) {
  return request({
    url: '/cable/tHiddendangerMessage/CreatRealyElePlanInfo',
    method: 'post',
    data
  })
}
// //生成带电检测计划
// export function tHiddendangerMessageaddEleInfo(data) {
//   return request({
//     url: '/cable/tHiddendangerMessage/CreatRealyElePlanInfo',
//     method: 'post',
//     data
//   })
// }
// ---------------------------------------------------------------------------------------------------------------
//获取值守新增记录
export function tHiddendangerMessagegetAddInfo(data) {
  return request({
    url: '/cable/tHiddendangerOnduty/getAddInfo',
    method: 'post',
    data
  })
}
//值守新增
export function tHiddendangerOndutyadd(data) {
  return request({
    url: '/cable/tHiddendangerOnduty/add',
    method: 'post',
    data
  })
}
//值守编辑详情
export function tHiddendangergetEditeInfo(data) {
  return request({
    url: '/cable/tHiddendangerOnduty/getEditeInfo',
    method: 'post',
    data
  })
}
//值守编辑
export function tHiddendangerOndutyedit(data) {
  return request({
    url: '/cable/tHiddendangerOnduty/edit',
    method: 'post',
    data
  })
}
//值守删除
export function tHiddendangerOndutyremove(data) {
  return request({
    url: '/cable/tHiddendangerOnduty/remove',
    method: 'post',
    data
  })
}
//值守下发
export function tHidJhTaskaddHidJhTaskInfo(data) {
  return request({
    url: '/cable/tHidJhTask/addHidJhTaskInfo',
    method: 'post',
    data
  })
}
//值守任务打卡
export function tHidJhTaskgetDKInfo(data) {
  return request({
    url: '/cable/tHidJhTask/getDKInfo',
    method: 'post',
    data
  })
}
//保电带电新增
export let detectionPlan_addByBD = params => request.post('/cable/detectionPlan/addByBD', qs.stringify(params, { allowDots: true }));