//执行任务模块
import request from '@/utils/request'

// 执行任务列表
export function keepElectricityDuty_list(data) {
  return request({
    url: '/cable/keepElectricityDuty/list',
    method: 'post',
    data
  })
}
// 执行任务列表
export function keepElectricityDuty_remove(data) {
  return request({
    url: '/cable/keepElectricityDuty/remove',
    method: 'post',
    data
  })
}
// 保电管理-保电值守任务DL井接口列表
export function keepElectricityDutyJing_list(data) {
  return request({
    url: '/cable/keepElectricityDutyJing/list',
    method: 'post',
    data
  })
}
//打卡详情
export function keepElectricityClock_list(data) {
  return request({
    url: '/cable/keepElectricityClock/list',
    method: 'post',
    data
  })
}
