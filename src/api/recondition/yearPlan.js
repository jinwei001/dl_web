//年计划
import request from '@/utils/request'

// 获取年计划列表数据
export function getData(data) {
    return request({
        url: '/cable/overhauPlanyear/list',
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

// 获取设备类型下拉框
export function getSelectMultiple(data) {
    return request({
        url: '/bzsj/getSelectMultiple',
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

// 获取工作班组下拉框
export function getLineGroup(data) {
    return request({
        url: '/group/list',
        method: 'post',
        data
    })
}

// 检修年计划生成下一阶段计划
export function generateNextPlan(data) {
    return request({
        url: '/cable/overhauPlanyear/generateNextPlan',
        method: 'post',
        data
    })
}

// 检修年计划新增
export function add(data) {
    return request({
        url: '/cable/overhauPlanyear/add',
        method: 'post',
        data
    })
}
// 检修年计划修改保存
export function edit(data) {
    return request({
        url: '/cable/overhauPlanyear/edit',
        method: 'post',
        data
    })
}
// 检修年计划删除
export function deleteData(data) {
    return request({
        url: '/cable/overhauPlanyear/remove',
        method: 'post',
        data
    })
}
// 获取下一次审批人列表
export function getnextuser(data) {
    return request({
        url: '/system/user/list',
        method: 'post',
        data
    })
}
// 审批提交接口
export function submitlc(data) {
    return request({
        url: '/cable/overhauPlanyear/submitlc',
        method: 'post',
        data
    })
}
// 导出
export function exportPlan(data) {
    return request({
        url: '/cable/overhauPlanyear/export',
        method: 'post',
        data
    })
}
// 回池

export function returnPool(data) {
    return request({
        url: '/cable/overhauTaskpool/backPool',
        method: 'post',
        data
    })
}