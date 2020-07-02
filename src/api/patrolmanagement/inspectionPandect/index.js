import request from '@/utils/request'
import qs from 'qs'

//  巡视总览  XL
// 列表接口
export const getPageList = params => request.post('/cable/xlxsjh/api/list', qs.stringify(params))
// 查看 获取巡视轨迹 地图接口
//export const getLinePageMap = params => request.get('/appServices/getXsgj', qs.stringify(params))

export let getLinePageMap = params => request.get('/cable/patrolScreen/getPatrolRecordAndTrajectory?xsrId=' + params);
//电压等级
export const getVoltageGradeList = () => request.get('/api/select/getKvs')
// XL名称接口
export const getLineNameList = () => request.get('/api/select/getLines')
// 班组接口
export const getLineGroupList = () => request.get('/api/select/getGroups')
// 巡视人列表接口
export const getLineUsersList = () => request.get('/api/select/getUsers')

//巡视人员位置
export const getPepoleNameAndTrajectory = () => request.get('/cable/patrolScreen/getPepoleNameAndTrajectory')

//巡视记录

export let getPatrolDayAndHistoryAchievement = params => request.get('/cable/patrolScreen/getPatrolDayAndHistoryAchievement?xsrId=' + params);
export let getPatrolRecordAndTrajectory = params => request.get('/cable/patrolScreen/getPatrolRecordAndTrajectory?xsrId=' + params);

// export let getLinePageSearch = () => request.get('/api/select/getKvs');
