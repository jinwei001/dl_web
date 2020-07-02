import request from '@/utils/request'

// 文件上传接口

export function upload(data) {
    return request({
      url: '/cable/file/upload',
      method: 'post',
      data
    })
  }
  // 查询列表数据
  
  export function getData(data) {
    return request({
      url: '/cable/changeFacility/list',
      method: 'post',
      data
    })
  }
  // 新增保存数据
  export function add(data) {
    return request({
      url: '/cable/changeFacility/add',
      method: 'post',
      data
    })
  }
  // 编辑保存
  export function edit(data) {
    return request({
      url: '/cable/changeFacility/edit',
      method: 'post',
      data
    })
  }
  // 删除数据
  
  export function remove(data) {
    return request({
      url: '/cable/changeFacility/remove',
      method: 'post',
      data
    })
  }