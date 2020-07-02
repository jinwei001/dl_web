
import request from '@/utils/request'

export function getData(data) {
    return request({
        url: '/cable/overhauJobtask/list',
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
// 批量修改状态
export function changeStatus(data) {
    return request({

        url: '/cable/overhauJobtask/updateTaskstatus',
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
// 获取验收人列表
export function getnextuser(data) {
    return request({
        url: '/system/user/list',
        method: 'post',
        data
    })
}
export function add(data) {
    return request({
        url: '/cable/overhauJobtask/add',
        method: 'post',
        data
    })
}
export function edit(data) {
    return request({
        url: '/cable/overhauJobtask/edit',
        method: 'post',
        data
    })
}
export function remove(data) {
    return request({
        url: '/cable/overhauJobtask/remove',
        method: 'post',
        data
    })
}
// 导出
export function exportJobtask(data) {
    return request({
        url: '/cable/overhauJobtask/export',
        method: 'post',
        data
    })
}
// 新增现场勘察报告
export function addoverhauLiveinvestigationreport(data) {
    return request({
        url: '/cable/overhauLiveinvestigationreport/add',
        method: 'post',
        data
    })
}
// 获取现场勘察报告列表
export function getoverhauLiveinvestigationreport(data) {
    return request({
        url: '/cable/overhauLiveinvestigationreport/list',
        method: 'post',
        data
    })
}
// 修改保存现场勘察报告
export function editoverhauLiveinvestigationreport(data) {
    return request({
        url: '/cable/overhauLiveinvestigationreport/edit',
        method: 'post',
        data
    })
}
// 删除现场勘察报告
export function deleteoverhauLiveinvestigationreport(data) {
    return request({
        url: '/cable/overhauLiveinvestigationreport/remove',
        method: 'post',
        data
    })
}

// 新增检修辅助策略
export function addoverhauAuxiliarystrategy(data) {
    return request({
        url: '/cable/overhauAuxiliarystrategy/add',
        method: 'post',
        data
    })
}
// 编辑保存检修辅助策略
export function editoverhauAuxiliarystrategy(data) {
    return request({
        url: '/cable/overhauAuxiliarystrategy/edit',
        method: 'post',
        data
    })
}
// 删除检修辅助策略

export function deleteoverhauAuxiliarystrategy(data) {
    return request({
        url: '/cable/overhauAuxiliarystrategy/remove',
        method: 'post',
        data
    })
}
// 获取检修辅助策略
export function getoverhauAuxiliarystrategy(data) {
    return request({
        url: '/cable/overhauAuxiliarystrategy/list',
        method: 'post',
        data
    })
}
// 获取工作任务列表
export function getoverhauJob(data) {
    return request({
        url: '/cable/overhauJob/list',
        method: 'post',
        data
    })
}

// 删除工作任务
export function removeoverhauJob(data) {
    return request({
        url: '/cable/overhauJob/remove',
        method: 'post',
        data
    })
}
// 新增保存工作任务
export function addoverhauJob(data) {
    return request({
        url: '/cable/overhauJob/add',
        method: 'post',
        data
    })
}
// 编辑保存工作任务
export function editoverhauJob(data) {
    return request({
        url: '/cable/overhauJob/edit',
        method: 'post',
        data
    })
}
// 新增保存电缆线路检修报告
export function adddlxlReport(data) {
    return request({
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/cable/dlxlReport/add',
        method: 'post',
        data
    })
}
// 编辑保存电缆线路检修报告
export function editdlxlReport(data) {
    return request({
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/cable/dlxlReport/edit',
        method: 'post',
        data
    })
}
 // 回显电缆线路检修报告 
 export function getdlxlReport(data) {
    return request({
        url: '/cable/dlxlReport/list',
        method: 'post',
        data
    })
}
// 下载检修报告
export function downloadDlxlReport(data) {
    return request({
        url: '/cable/dlxlReport/downReport',
        method: 'post',
        data
    })
}
// 新增保存交流耐压实验报告
export function addjlnyReport(data) {
    return request({
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/cable/jlnyReport/add',
        method: 'post',
        data
    })
}
// 回显交流耐压实验报告

export function getjlnyReport(data) {
    return request({
        url: '/cable/jlnyReport/list',
        method: 'post',
        data
    })
}
// 编辑保存电缆线路检修报告
export function editjlnyReport(data) {
    return request({
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/cable/jlnyReport/edit',
        method: 'post',
        data
    })
}
// 回显电缆线路直流电阻、电容试验报告

export function getzldzReport(data) {
    return request({
        url: '/cable/zldzReport/list',
        method: 'post',
        data
    })
}
// 新增保存电缆线路直流电阻、电容试验报告
export function addzldzReport(data) {
    return request({
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/cable/zldzReport/add',
        method: 'post',
        data
    })
}
// 编辑保存电缆线路直流电阻、电容试验报告
export function editzldzReport(data) {
    return request({
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/cable/zldzReport/edit',
        method: 'post',
        data
    })
}

// 新增直流耐压实验报告
export function addzlnyReport(data) {
    return request({
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/cable/zlnyReport/add',
        method: 'post',
        data
    })
}

// 编辑保存直流耐压试验报告
export function editzlnyReport(data) {
    return request({
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/cable/zlnyReport/edit',
        method: 'post',
        data
    })
}
// 回显直流耐压试验报告
export function getzlnyReport(data) {
    return request({
        url: '/cable/zlnyReport/list',
        method: 'post',
        data
    })
}
// 回显油化学试验报告

export function getyhdqReport(data) {
    return request({
        url: '/cable/yhdqReport/list',
        method: 'post',
        data
    })
}
// 编辑保存油化学

export function edityhdqReport(data) {
    return request({
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/cable/yhdqReport/edit',
        method: 'post',
        data
    })
}
// 新增保存油化学
export function addyhdqReport(data) {
    return request({
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/cable/yhdqReport/add',
        method: 'post',
        data
    })
}
// 回显局部放电试验报告

export function getjbfdReport(data) {
    return request({
        url: '/cable/jbfdReport/list',
        method: 'post',
        data
    })
}
// 编辑保存局部放电

export function editjbfdReport(data) {
    return request({
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/cable/jbfdReport/edit',
        method: 'post',
        data
    })
}
// 新增保存局部放电
export function addjbfdReport(data) {
    return request({
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/cable/jbfdReport/add',
        method: 'post',
        data
    })
}
// 回显金属氧化物
export function getyhblReport(data) {
    return request({
        url: '/cable/yhblReport/list',
        method: 'post',
        data
    })
}
// 新增保存金属氧化物
export function addyhblReport(data) {
    return request({
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/cable/yhblReport/add',
        method: 'post',
        data
    })
}
// 编辑保存金属氧化物
export function edityhblReport(data) {
    return request({
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/cable/yhblReport/edit',
        method: 'post',
        data
    })
}
// 获取检修施工方案编制列表数据

export function getoverhauConstructionplan(data) {
    return request({
        url: '/cable/overhauConstructionplan/list',
        method: 'post',
        data
    })
}
// 新增检修施工方案编制

export function addoverhauConstructionplan(data) {
    return request({
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/cable/overhauConstructionplan/add',
        method: 'post',
        data
    })
}
// 删除检修施工方案编制

export function removeoverhauConstructionplan(data) {
    return request({
        
        url: '/cable/overhauConstructionplan/remove',
        method: 'post',
        data
    })
}
// 编辑检修施工方案编制

export function editoverhauConstructionplan(data) {
    return request({
        headers: {
            'Content-Type': 'application/json'
        },
        url: '/cable/overhauConstructionplan/edit',
        method: 'post',
        data
    })
}