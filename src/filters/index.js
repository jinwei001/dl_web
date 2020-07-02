let patrolStatus = (e, patrolStatusArr) => { // 巡视状态过滤
    let obj = []
    if (patrolStatusArr.length == 0 || (typeof e != 'number' && typeof e != 'string')) {
        return ''
    } else {
        obj = patrolStatusArr.filter(res => {
            return res.id == e
        })
        return obj[0].patrolStatus
    }
}

let patrolType = (e, patrolTypeArr) => { // 巡视类型
    let obj = []
    if (patrolTypeArr.length == 0 || (typeof e != 'number' && typeof e != 'string')) {
        return ''
    } else {
        obj = patrolTypeArr.filter(res => {
            return res.id == e
        })
        return obj[0].typeName
    }
}

let patrolFrom = (e, patrolFromArr) => {
    let obj = []
    if (patrolFromArr.length == 0 || (typeof e != 'number' && typeof e != 'string')) {
        return ''
    } else {
        obj = patrolFromArr.filter(res => {
            return res.id == e
        })
        return obj[0].planFrom
    }
}
let defectStatue = statusCode => {
    if (statusCode == 4) {
        return '已消缺'
    } else if (statusCode == 3) {
        return '处理中'
    } else if (statusCode == 2) {
        return '计划中'
    } else if (statusCode == 1) {
        return '已确认'
    } else {
        return '待确认'
    }
}
export default { patrolStatus, patrolType, patrolFrom,defectStatue } 