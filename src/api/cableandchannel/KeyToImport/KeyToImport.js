/*
 * @Author: your name
 * @Date: 2020-03-17 14:37:13
 * @LastEditTime: 2020-04-11 18:36:54
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \DL\src\api\cableandchannel\KeyToImport\KeyToImport.js
 */
import request from '@/utils/request'

// 一键导入
export function upLoadFile(data) {
  return request({
    url: '/cable/cableStandingBook/importCableDate',
    method: 'POST',
    data
  })
}

// 删除所有数据
export function deleteAll() {
  return request({
    url: '/cable/cableStandingBook/deleteAll',
    method: 'POST'
  })
}

export function putFile(params) {
  return request({
    timeout :null,
    url: '/cable/cableStandingBook/importCableDate',
    method: 'POST',
    headers:{"Content-Type":"multipart/form-data"},
    data: params
  })
}
