import axios from 'axios'
import {
  getToken
} from '@/utils/auth'
export function download(url,req) {
  axios({
    method: 'post',
    url: process.env.VUE_APP_BASE_API+url,
    // headers里面设置token
    headers: {
      authorization: getToken()
    },
    data: req,
    // 二进制流文件，一定要设置成blob，默认是json
    responseType: 'blob'
  }).then(res => {
    const link = document.createElement('a')
    const blob = new Blob([res.data], {
      type: 'application/vnd.ms-excel'
    })
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', `${req.name}.xlsx`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  })
}
