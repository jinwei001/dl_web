//检修试验周期
import request from '@/utils/request'

// 获取工作班组下拉框
export function getLineGroup(data) {
    return request({
        url: '/group/list',
        method: 'post',
        data
    })
}

// 获取检修任务池列表
export function getList(data) {
    return request({
        url: '/cable/overhauTaskpool/list',
        method: 'post',
        data
    })
}
// 获取检修分类下拉框
export function getSelectMultiple(data) {
    return request({
        url: '/bzsj/getSelectMultiple',
        method: 'post',
        data
    })
}
// XL列表查询下拉数据
export function getLineSelect(data) {
    return request({

        url: '/cable/line/list',
        method: 'post',
        data
    })
}
// 查询设备名称下拉框
export function getselectByLx(data) {
    return request({

        headers: {
            'Content-Type': 'application/json'
        },
        url: '/cable/detectionPlan/selectByLx',
        method: 'post',
        data
    })
}
// 查询按钮查询线路
export function searchLineList(data) {
    return request({
        url: '/cable/line/lineList',
        method: 'post',
        data
    })
}
// 新增保存任务池
export function addOverTaskpool(data) {
    return request({
        url: '/cable/overhauTaskpool/add',
        method: 'post',
        data
    })
}
// 删除任务池数据
export function deleteOverHaulPool(data) {
    return request({
        url: '/cable/overhauTaskpool/remove',
        method: 'post',
        data
    })
}
// 修改保存任务池周期
export function editOverTaskpool(data) {
    return request({
        url: '/cable/overhauTaskpool/edit',
        method: 'post',
        data
    })
}
// 生成年计划
export function generateNextPlan(data) {
    return request({
        url: '/cable/overhauTaskpool/generateNextPlan',
        method: 'post',
        data
    })
}