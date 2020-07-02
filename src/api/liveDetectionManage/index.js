import request from '@/utils/request'
import qs from 'qs'
/** Ⅰ   Ⅱ   Ⅲ    Ⅳ    Ⅴ    Ⅵ    Ⅶ    Ⅷ    Ⅸ    Ⅹ */

/** 公共接口 */
/** 电压列表(下拉) */
export const dySelect = () => request.get('/api/select/getKvs')
/** XL列表(下拉) */
// export let linesSelect = params => request.post('/cable/line/list', qs.stringify(params));
export const linesSelect = (params = {}) => {
  params.lineNature = '主线'
  return request.post('/cable/line/list', qs.stringify(params))
}
/** DL列表(下拉) */
export const dlSelect = params => request.post('/cable/logiccablestage/list', qs.stringify(params))
/** 检测班组列表(下拉) */
export const jcbzSelect = () => request.post('/group/list')
/** 检测人列表(下拉) */
export const jcrSelect = params => request.get('/system/user/userList1?groupname=' + params)
// /** 六防计划巡视检测人列表(下拉) *//6-22
export const sixjcrSelect = params => request.post('/cable/tZtglBzyhk/userList?groupname=' + params)
// /** 六防计划计算时间(下拉) *//6-22
export const sixgetDays = params => request.post('/cable/tHiddendangerOnduty/getDays', qs.stringify(params))
/** 查询多条DL列表(下拉) */
export const dlSelects = params => request({
  headers: {
    'Content-Type': 'application/json'
  },
  url: '/cable/detectionCycle/selecDlByLine',
  method: 'post',
  data: params
})
/** 上传图片 */
export const uploadPicture = params => request.post('/cable/file/upload', params)

/**
 * 周期
 */

/** 展示列表 */
export const cycleList = params => request.post('/cable/detectionCycle/list', qs.stringify(params))
/** 展示列表 删除 */
export const cycleDel = params => request.post('/cable/detectionCycle/remove', qs.stringify(params))
/** 单条新增  */
export const cycleAdd = params => request.post('/cable/detectionCycle/add', qs.stringify(params))
/** 批量新增  */
export const batchAdd = params => request.post('/cable/detectionCycle/batchAdd', qs.stringify(params))
/** 编辑  */
export const cycleEdit = params => request.post('/cable/detectionCycle/edit', qs.stringify(params))

/** 查看周期调整 */
export const cheackCycleAdjustment = params => request.post('/cable/adjustingCycle/list', qs.stringify(params))
/** 生成计划  */
export const cycleCreatePlan = params => request({
  headers: {
    'Content-Type': 'application/json'
  },
  url: '/cable/detectionPlan/addPlanByCycle',
  method: 'post',
  data: params
})

/**
 * 计划
 */
// 故障xingX/故障原因/故障类型
export const xw = params => request.post('/bzsj/list', qs.stringify(params))
/** 展示列表 */
export const planList = params => request.post('/cable/detectionPlan/list', qs.stringify(params))
/** 展示列表 删除 */
export const planDel = params => request.post('/cable/detectionPlan/remove', qs.stringify(params))
/** 根据检测设备类型查询设备名称 */
export const plangetSb = params => request({
  headers: {
    'Content-Type': 'application/json'
  },
  url: '/cable/detectionPlan/selectByLx',
  method: 'post',
  data: params
})
/** 新增  */
export const planAdd = params => request.post('/cable/detectionPlan/add', qs.stringify(params))
/** 编辑  */
export const planEdit = params => request.post('/cable/detectionPlan/edit', qs.stringify(params))
/** 录入结果 */
export const inputResult = params => request({
  headers: {
    'Content-Type': 'application/json'
  },
  url: '/cable/detectionResult/add',
  method: 'post',
  data: params
})

/** 任务管理 */
/** 展示列表 */
export const taskList = params => request.post('/cable/detectionTask/list', qs.stringify(params))
/** 编辑 */
export const taskEdit = params => request.post('/cable/detectionTask/edit', qs.stringify(params))
/** 柱状图 */
export const taskBar = params => request.post('/cable/detectionTask/selectXLNum', qs.stringify(params))

/** 结果 */
/** 展示列表 */
export const resultList = params => request.post('/cable/detectionResult/list', qs.stringify(params))
/** 编辑 */
export const resultEdit = params => request.post('/cable/detectionResult/edit', qs.stringify(params))
/** 展示列表 删除 */
export const resultDel = params => request.post('/cable/detectionResult/remove', qs.stringify(params))
/** 生成报告 */
export const resultgetBg = params => request.post('/cable/detectionResult/downJCJG', qs.stringify(params))
