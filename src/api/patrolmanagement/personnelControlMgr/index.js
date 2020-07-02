import request from '@/utils/request'
import qs from 'qs'

/** 公共接口 */

/**
 *Ⅰ人员管控
 */
/** 班组下拉框 */
export const getGrouplist = () => request.post('/group/list')

/** 获取列表 */
export const getPageList = params => request.get('/cable/tCpCommuteGps/getPatrolInformation', { params: params })

/** XL详情 */
// export const PatrolCycleManagementLineDetail = params => request.get('/cable/xszq/editPage/' + params)
// 列表数据 已巡未巡
export const getOnlineNum = params => request.get('/cable/tCpCommuteGps/getOnlineNum', { params: params })

// 查询某个人当天具体坐标
export const getPersonPoint = params => request.get('/cable/tCpCommuteGps/getLocationByPerson', { params: params })
// 地图XL
export const getPersonPointMap = params => request.get('/cable/tCpCommuteGps/getPersonLocation', { params: params })

