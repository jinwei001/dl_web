/**
 * 状态检修策略管理
 */
import request from '@/utils/request'
import qs from "qs"
/**公共方法 */
export const postAllList = (url, data) => request.post(url, qs.stringify(data))
export const getAllList = (url, params) => request.get(url, qs.stringify(params))

/*** 策略plot*/
/**策略plot表的数据 */
export const plotgetList = (data) => request.post('/cable/ztpjStrategy/list', qs.stringify(data))

/**dydj */
export const getSelect = data => request.post('/bzsj/list', qs.stringify(data))

/**remove */
export const remove = data => request.post('/cable/ztpjStrategy/remove', qs.stringify(data))
/**exportFun */
export const exportFun = data => request.post('/cable/ztpjStrategy/export', qs.stringify(data))
/**exportFun */
export const edit = data => request.post('/cable/ztpjStrategy/edit', qs.stringify(data))
/**exportFun */
export const getSelectMultiple = data => request.post('/bzsj/getSelectMultiple', qs.stringify(data))
