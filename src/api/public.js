import request from '@/utils/request'
import qs from "qs"
/**
 * POST  /group/list
 * 查询系统管理 班组列表
 * @param {*} data 
 */
export function GropList() {
  return request({
    url: '/group/list',
    method: 'POST',
  })
}
/**
 * POST /system/user/list
 * 用户操作接口
 */
export function UserList(data) {
  return request({
    url: '/system/user/list',
    method: 'POST',
    data:qs.stringify({
      groupid:data
    })
  })
}
/**
 * 工程信息
 * @param {*} data 
 */
export function GC(data) {
  return request({
    url: '/zjgc/gc/list',
    method: 'POST',
    data
  })
}
/**
 * 管控卡 新增
 * POST /zjgc/xmgyk/list
 * @param {*} data 
 */
export function GKK_view(data) {
  return request({
    url: '/zjgc/xmgyk/list',
    method: 'POST',
    data
  })
}
/**
 * 查询标准数据下拉接口
 * 单个
 * POST /bzsj/getSelect
 * @param {*} data 
 */
export function BzsjList(data) {
  return request({
    url: '/bzsj/getSelect',
    method: 'POST',
    data:qs.stringify({
      fzid:data
    })
  })
}
/**
 * 查询标准数据下拉接口
 * 多个
 * POST /bzsj/getSelectMultiple
 * @param {*} data 
 */
export function BzsjListmore(data) {
  return request({
    url: '/bzsj/getSelectMultiple',
    method: 'POST',
    data:qs.stringify({
      fzids:data
    })
  })
}
/**
 * 查询国家电网工艺库列表
 * GET /zjgc/gjdwgyk/list
 * @param {*} data 
 */
export function Gjdwgyk(data) {
  return request({
    url: '/zjgc/gjdwgyk/list',
    method: 'get',
    
  })
}
/**
 * 通道管控卡 多选
 * get /zjgc/xmgyk/gkk
 * @param {*} data 
 */
export function GKK_more(req) {
  return request({
    url: '/zjgc/xmgyk/gkk',
    method: 'get',
    params:req
  })
}
/**
 * 导出功能
 * @param {*} url  
 */
export function ExportFn(url,data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}
/**
 * POST /zjgc/syyj/export
 *导出功能 多个 
 * @param {*} req 
 * @param {*} data 
 */
export function ExportFnMore(req,data) {
  return request({
    url: req,
    method: 'post',
    data
  })
}
// 上传图片
export function downloadImg(req,data) {
  return request({
    url: req,
    method: 'post',
    data
  })
}
/**
 * 前阶段遗留意见
 * POST /zjgc/gc/qjdylyi_jd
 * @param {*} data gcid: 工程id
 *                  jd: 阶段名称 
 * kxxyj
 * cbsj
 * sgtsc
 * tdjs
 * dqsg
 * sy
 * tdys
 * dqys
 * 
 * 
 */
export function YLJDMC(data) {
  return request({
    url: '/zjgc/gc/qjdylyi_jd',
    method: 'POST',
    data
  })
}
/**
 * /cable/tZjgcFj/uploadFj
 * 生产准备验收附件
 * @param {file,gcmc,jd} 
 */
export function CuploadFj(data) {
  return request({
    url: '/cable/tZjgcFj/uploadFj',
    method: 'POST',
    data
  })
}
/**
 * POST /cable/tZjgcFj/list
 * 生产准备验收附件
 * @param {*} data 
 */
export function Listupload(data) {
  return request({
    url: '/cable/tZjgcFj/list',
    method: 'POST',
    data:qs.stringify(data)
  })
}
/**
 * GET /common/download
 * @param {*} data 
 */
export function downloadFJ(params) {
  return request({
    url: '/common/downloadFile',
    method: 'get',
    params
  })
}
/**
 * 获取XL列表查询所有下拉数据
 * GET /cable/line/getLineSelect
 * @param {*} params 
 */
export function getLineSelect(params) {
  return request({
    url: '/cable/line/getLineSelect',
    method: 'get',
    params
  })
}

/**
 * 获取图表get的数据
 * @param {*} url, 
 */
export function GETTBList(url,params) {
  return request({
    url: url,
    method: 'get',
    params
  })
}
/**
 * 获取图表post的数据
 * @param {*} url, 
 */
export function POSTTBList(url,data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}

