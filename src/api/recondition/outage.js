/**
 * 停电申请
 */
import request from '@/utils/request'
import qs from "qs"
/**公共方法 */
export const postAllList = (url, data) => request.post(url, qs.stringify(data))
export const getAllList = (url, params) => request.get(url, qs.stringify(params))
/**获取表的数据 */
export const getList = data => request.post('/cable/powerCut/list', qs.stringify(data))
/**获取remove */
export const remove = data => request.post('/cable/powerCut/remove', qs.stringify(data))
/**获取表的数据 */
export const getSelect = data => request.post('/bzsj/list', qs.stringify(data))
/**获取停电申请线路下拉的数据 */
export const getlineList = data => request.post('/cable/powerCut/lineList', qs.stringify(data))
/**获取导出的数据 */
export const exportFun = data => request.post('/cable/powerCut/export', qs.stringify(data))
/**获取新增数据 */
export const add = data => request.post('/cable/powerCut/add', qs.stringify(data))
/**获取编辑数据 */
export const edit = data => request.post('/cable/powerCut/edit', qs.stringify(data))
