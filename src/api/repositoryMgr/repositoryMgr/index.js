import request from '@/utils/request'
import qs from 'qs'

/** 公共接口 */
/** 知识库列表 */
export const repositoryMgrMulu = () => request.post('/cable/knowledgeCatalog/list')
// 新增
export const repositoryMgr = params => request.post('/cable/knowledgeBase/add', params)

/**
 *Ⅰ知识库 文档管理
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

/** 详情 */
export const getDetail = params => request.get('/cable/knowledgeBase/getDetail', { params: params })
