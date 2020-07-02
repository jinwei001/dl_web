import request from '@/utils/request'
import qs from 'qs'

/**
 *Ⅰ 首页
 */
/** 获取右边列表 */
export const repositoryMgrList = params => request.post('/cable/knowledgeBase/list', qs.stringify(params, { allowDots: true }))
/** 删除 */
export function remove(data) {
  return request({
    url: '/cable/knowledgeBase/edit',
    method: 'POST',
    data
  })
}
// export const remove1 = params => request.get('/cable/knowledgeBase/edit', { params: params })
// 左侧树形控件
export const getLeftTreeDetail = () => request.get('/cable/gis/voltageRankByLineSelect')

/** 2.查询基础概况 */
export const getRightDetail = () => request.get('/cable/gis/selectLineLengthAndCount')
// 右下 XL图表
export const getLineDetail = () => request.get('/cable/gis/selectLineLength')
// 右下 通道图表
export const getChannelDetail = () => request.get('/cable/gis/selectChannelLength')

