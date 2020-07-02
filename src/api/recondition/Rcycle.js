//检修试验周期
import request from '@/utils/request'

// 获取xl名称下拉框
export function getLineGroup(data) {
    return request({
        url: '/group/list',
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
// 获取表格数据
export function getList(data) {
    return request({
        url: '/cable/overhaulCycle/list',
        method: 'post',
        data
    })
}
// 获取线路列表
export function getLineList(data) {
    return request({
        url: '/cable/line/lineList',
        method: 'post',
        data
    })
}
// XL列表查询下拉数据
export function getLineSelect() {
    return request({
        // timeout: 10000,
        url: '/cable/line/getLineSelect',
        method: 'GET'
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
// 新增保存检修试验周期
export function addOverHaulCycle(data) {
    return request({
        url: '/cable/overhaulCycle/add',
        method: 'post',
        data
    })
}
// 删除检修试验周期
export function deleteOverHaulCycle(data) {
    return request({
        url: '/cable/overhaulCycle/remove',
        method: 'post',
        data
    })
}
// 修改保存检修试验周期

export function editOverHaulCycle(data) {
    return request({
        url: '/cable/overhaulCycle/edit',
        method: 'post',
        data
    })
}
// 生成检修计划
export function generateOverhaulTask(data) {
    return request({
        url: '/cable/overhaulCycle/generateOverhaulTaskByIds',
        method: 'post',
        data
    })
}

// XL列表查询下拉数据
export function getLine(data) {
    return request({

        url: '/cable/line/list',
        method: 'post',
        data
    })
}