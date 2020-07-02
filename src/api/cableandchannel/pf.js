/**
 * 编辑评分
 */
import request from '@/utils/request'
import qs from "qs"
/**公共方法 */
export const postAllList = (url, data) => request.post(url, qs.stringify(data))
export const getAllList = (url, params) => request.get(url, qs.stringify(params))
/**获取表的数据 */
export const getList = data => request.post('/cable/riskDivisorTemplate/list', qs.stringify(data))
// export const getList = data => request.post('/cable/riskDivisorTemplate/list', qs.stringify(data))