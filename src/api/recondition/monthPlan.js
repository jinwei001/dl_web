//月计划
import request from '@/utils/request'
// 获取下一次审批人列表
export function getData(data) {
    return request({
        url: '/cable/overhauPlanmonth/list',
        method: 'post',
        data
    })
}
// 月计划删除
export function deleteData(data) {
    return request({
        url: '/cable/overhauPlanmonth/remove',
        method: 'post',
        data
    })
}
// // 检修月计划生成下一阶段计划
export function generateNextPlan(data) {
    return request({
        url: '/cable/overhauPlanmonth/generateNextPlan',
        method: 'post',
        data
    })
}

// 检修月计划生成工作任务
export function generateTaskJob(data) {
    return request({
        url: '/cable/overhauPlanmonth/generateTaskJob',
        method: 'post',
        data
    })
}
// 导出
export function exportPlan(data) {
    return request({
        url: '/cable/overhauPlanmonth/export',
        method: 'post',
        data
    })
}
// 检修月计划新增
export function add(data) {
    return request({
        url: '/cable/overhauPlanmonth/add',
        method: 'post',
        data
    })
}
// 检修月计划修改保存
export function edit(data) {
    return request({
        url: '/cable/overhauPlanmonth/edit',
        method: 'post',
        data
    })
}

// 审批提交接口
export function submitlc(data) {
    return request({
        url: '/cable/overhauPlanmonth/submitlc',
        method: 'post',
        data
    })
}
