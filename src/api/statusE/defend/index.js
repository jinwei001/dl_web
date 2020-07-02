/**
 * 状态评价
 */
import request from '@/utils/request'
import qs from "qs"
/**公共方法 */
export const postAllList = (url, data) => request.post(url, qs.stringify(data))
export const getAllList = (url, params) => request.get(url, qs.stringify(params))
/**获取第一个表的数据 */
export const getListtab1 = (data) => request.post('/cable/statusEvaluationTemplate1/list', qs.stringify(data))
/**保存第一个表的数据 */
export const edittable1 = (data) => request.post('/cable/statusEvaluationTemplate1/edit', qs.stringify(data))
/**获取第二个表的数据 */
export const getListtab2 = (data) => request.post('/cable/statusEvaluationTemplate2/list', qs.stringify(data))
/**保存第二个表的数据 */
export const edittable2 = (data) => request.post('/cable/statusEvaluationTemplate2/edit', qs.stringify(data))


