import request from '@/utils/request'
import qs from 'qs'
/**Ⅰ   Ⅱ   Ⅲ    Ⅳ    Ⅴ    Ⅵ    Ⅶ    Ⅷ    Ⅸ    Ⅹ */

/**公共接口 */
/** 检测班组列表(下拉) */
export let bzSelect = () => request.post('/group/list');
/** 上传图片 */
export let uploadPicture = params => request.post('/cable/file/upload', params);
/** 六防类型 */
export let lfType = () => request.get('/cable/qxglBzb/sixTypelist');
/** 部件 */
export let bjList = () => request.get('/cable/qxglBzb/bjlist');
/** 部位 */
export let bwList = () => request.get('/cable/qxglBzb/bwlist');
/**
 * 
 * @param {外协单位} params 
 */
export let wxList = () => request.post('/bzsj/list', qs.stringify({ fzid: 'OUTSOURCING_COMPANY' }));
/**
 * 资源模块管理 user
 */
// list
export let userList = params => request.post('/system/user/list', qs.stringify(params));
// 删除
export let userDel = params => request.post('/system/user/remove', qs.stringify(params));
// 新增
export let userAdd = params => request.post('/system/user/add', qs.stringify(params));
// 编辑
export let userEdit = params => request.post('/system/user/edit', qs.stringify(params));
// 重置密码
export let userEditPass = params => request.post('/system/user/editPd', qs.stringify(params));
// 启用/禁用
export let userdisable = params => request.post('/system/user/editStatus', qs.stringify(params));
/**
 * 岗位 psot
 */
// list
export let psotList = params => request.post('/role/list', qs.stringify(params));
// 删除
export let psotDel = params => request.post('/role/batchRemove', qs.stringify(params));
// 新增
export let psotAdd = params => request.post('/role/add', qs.stringify(params));
// 编辑 
export let psotEdit = params => request.post('/role/edit', qs.stringify(params));
// 启用/禁用
export let psotdisable = params => request.post('/role/batchiDisable', qs.stringify(params));
// 权限
export let psotmenu = params => request.post('/role/addPermSave', qs.stringify(params));

/**
 *班组 group
 */
// list
export let groupList = params => request.post('/group/list', qs.stringify(params));
// 删除
export let groupDel = params => request.post('/group/remove', qs.stringify(params));
// 新增
export let groupAdd = params => request.post('/group/add', qs.stringify(params));
// 编辑 
export let groupEdit = params => request.post('/group/edit', qs.stringify(params));

/**
 *代码 code
 */
// list
export let codeList = params => request.post('/bzsj/list', qs.stringify(params));
// 删除
export let codeDel = params => request.post('/bzsj/remove', qs.stringify(params));
// 新增
export let codeAdd = params => request.post('/bzsj/add', qs.stringify(params));
// 编辑 
export let codeEdit = params => request.post('/bzsj/edit', qs.stringify(params));
/**
 * 资源模块管理 resModel
 */
// 新增
export let resModelAdd = params => request.post('/menu/add', qs.stringify(params));
// 编辑
export let resModelEdit = params => request.post('/menu/edit', qs.stringify(params));
// 删除
export let resModelDel = params => request.post('/menu/remove', qs.stringify(params));
// list
export let resModelList = params => request.get('/menu/menulist', qs.stringify(params));
/**
 *日志 logs
 */
// list
export let logsList = params => request.post('/log/list', qs.stringify(params));
// 导出 
export let logsExport = params => request.post('/log/export', qs.stringify(params));

/**
 *标准缺陷库 qx
 */
// list
export let qxList = params => request.post('/cable/qxglBzb/list', qs.stringify(params));
// 新增
export let qxAdd = params => request.post('/cable/qxglBzb/add', qs.stringify(params));
// 编辑 
export let qxEdit = params => request.post('/cable/qxglBzb/edit', qs.stringify(params));
// 删除
export let qxDel = params => request.post('/cable/qxglBzb/remove', qs.stringify(params));
/**
 *国网工艺库 gw  
 */
// list
export let gwList = params => request.get('/zjgc/gjdwgyk/gykList?' + qs.stringify(params));
// 新增
export let gwAdd = params => request.post('/zjgc/gjdwgyk/add', qs.stringify(params));
// 编辑 
export let gwEdit = params => request.post('/zjgc/gjdwgyk/edit', qs.stringify(params));
// 删除
export let gwDel = params => request.post('/zjgc/gjdwgyk/remove', qs.stringify(params));

/**
 *项目工艺库 xm
 */
// list
export let xmList = params => request.post('/zjgc/xmgyk/list', qs.stringify(params));
// 新增
export let xmAdd = params => request.post('/zjgc/xmgyk/add', qs.stringify(params));
// 编辑 
export let xmEdit = params => request.post('/zjgc/xmgyk/edit', qs.stringify(params));
// 删除
export let xmDel = params => request.post('/zjgc/xmgyk/remove', qs.stringify(params));