/**
 * 标准化作业指导书
 */
import request from '@/utils/request'
import qs from "qs"
/**公共方法 */
export const postAllList = (url, data) => request.post(url, qs.stringify(data))
export const getAllList = (url, params) => request.get(url, qs.stringify(params))
/**获取表的数据 */
export const getList = data => request.post('/cable/overhaulStandardization/list', qs.stringify(data))
/**获取用户的数据 */
export const getuser = data => request.post('/system/user/list', qs.stringify(data))
/**获取File的数据 */
export const getFiletab = data => request.post('/cable/overhaulStandardizationFiles/list', qs.stringify(data))
/**新增 */
export const Add = data => request.post('/cable/overhaulStandardization/add', qs.stringify(data))
/**编辑 */
export const edit = data => request.post('/cable/overhaulStandardization/edit', qs.stringify(data))
/**删除 */
export const remove = data => request.post('/cable/overhaulStandardization/remove', qs.stringify(data))
/**删除标准化作业指导书文件列 */
export const removeFile = data => request.post('/cable/overhaulStandardizationFiles/remove', qs.stringify(data))
