import request from '@/utils/request'
import qs from "qs"
export function postdata(url, data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}
export function Deldata(url, data) {
  return request({
    url: url,
    method: 'post',
    data: qs.stringify({
      ids: data
    })
  })
}
