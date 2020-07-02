import request from '@/utils/request'

// 竣工移交
export function getList(data) {
  return request({
    url: '/zjgc/dqsg/list',
    method: 'POST',
    data
  })
}
//竣工-安装记录列表
// 竣工移交
export function gcjc_azjl_list(data) {
  return request({
    url: '/zjgc/gc/jc_azjl_list',
    method: 'POST',
    data
  })
}
