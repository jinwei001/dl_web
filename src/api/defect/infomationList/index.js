import request from '@/utils/request'
import qs from 'qs'

/** 缺陷信息管理 */

// 所属XL
export const getLine = () => request.get('/cable/qxcommon/getLine')
/** 折线图) */
export const getEcharts1 = params => request.post('cable/tQxglJcxxk/statistic_num', qs.stringify(params))
// 部件扇形统计
export const getEcharts2 = params => request.post('cable/tQxglJcxxk/statistic_bj_info', qs.stringify(params))
// 状态扇形统计
export const getEcharts3 = params => request.post('cable/tQxglJcxxk/statistic_status', qs.stringify(params))
// 列表
export const getDefectPage = params => request.post('cable/tQxglJcxxk/statistic_lnfo_list', qs.stringify(params))

// /** 根据部位查缺陷描述  */
// export const getFxfs = () => request.get('/cable/qxcommon/getDiscoveryMethod')
// /** 发现班组 */

// export const getFxr = params => request.get('/cable/qxcommon/getUserByGroupId?group_id=' + params)
