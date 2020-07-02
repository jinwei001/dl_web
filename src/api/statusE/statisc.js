/**
 * 状态评价 - 统计
 */
import request from '@/utils/request'
import qs from "qs"
/**公共方法 */
export const postAllList = (url, data) => request.post(url, qs.stringify(data))
export const getAllList = (url, params) => request.get(url, qs.stringify(params))
/**获取第一个表的数据 */
export const getList = (data) => request.post('/cable/ztpjStatistics/tableStatistics', qs.stringify(data))
/**获取的数据 */
export const getxl = (data) => request.post('/cable/ztpjStatistics/lineStatistics', qs.stringify(data))
/**部件 */
export const getbj = (data) => request.post('/cable/ztpjStatistics/bjFbStatistics', qs.stringify(data))
/**部件 */
export const getbjlist = (data) => request.post('/cable/ztpjStatistics/tableBjFbStatistics', qs.stringify(data))

/**部件 */
export const getbjtj = (data) => request.post('/cable/ztpjStatistics/bjStatistics', qs.stringify(data))



