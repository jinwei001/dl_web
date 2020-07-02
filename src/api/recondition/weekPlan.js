//周计划
import request from '@/utils/request'

// 获取周计划列表数据
export function getData(data) {
    return request({
        url: '/cable/overhauPlanweek/list',
        method: 'post',
        data
    })
}

// 检修周计划删除
export function deleteData(data) {
    return request({
        url: '/cable/overhauPlanweek/remove',
        method: 'post',
        data
    })
}
// 导出
export function exportPlan(data) {
    return request({
        url: '/cable/overhauPlanweek/export',
        method: 'post',
        data
    })
}
// 检修月计划新增
export function add(data) {
    return request({
        url: '/cable/overhauPlanweek/add',
        method: 'post',
        data
    })
}
// 检修月计划修改保存
export function edit(data) {
    return request({
        url: '/cable/overhauPlanweek/edit',
        method: 'post',
        data
    })
}
// 审批提交接口
export function submitlc(data) {
    return request({
        url: '/cable/overhauPlanweek/submitlc',
        method: 'post',
        data
    })
}
// 生成工作任务

export function generateNextPlan(data) {
    return request({
        url: '/cable/overhauPlanweek/generateNextPlan',
        method: 'post',
        data
    })
}