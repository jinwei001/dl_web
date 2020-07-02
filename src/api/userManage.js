import request from '@/utils/request'

// 请求用户管理数据
export function getUserManageList(query) {
    return request({
        url: '/article/list',
        method: 'get',
        params: query
    })
}