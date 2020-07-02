
// 任务模块
import request from '@/utils/request'
import qs from 'qs'

// 列表
export function keepElectricityTask_list(data) {
  return request({
    url: '/cable/keepElectricityTask/list',
    method: 'post',
    data
  })
}
// 新增
export function keepElectricityTask_add(data) {
  return request({
    url: '/cable/keepElectricityTask/add',
    method: 'post',
    data
  })
}
// 删除
export function keepElectricityTask_remove(data) {
  return request({
    url: '/cable/keepElectricityTask/remove',
    method: 'post',
    data
  })
}
// 值守 地图点
// export function getWatchMap(data) {
//   return request({
//     url: '/cable/keepElectricityClock/list',
//     method: 'post',
//     data
//   })
// }
export const getWatchMap = params => request.post('/cable/keepElectricityClock/list', qs.stringify(params))
