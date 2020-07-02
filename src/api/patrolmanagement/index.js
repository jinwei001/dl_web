import request from '@/utils/request'
import qs from 'qs'
/**Ⅰ   Ⅱ   Ⅲ    Ⅳ    Ⅴ    Ⅵ    Ⅶ    Ⅷ    Ⅸ    Ⅹ */

/**公共接口 */
/** 电压列表 */
export let voltages = () => request.get('/api/select/getKvs');
/** 班组列表 */
export let groups = () => request.get('/api/select/getGroups');
/** XL等级列表 */
export let lineLevels = () => request.get('/api/select/getLineLevels');
/** XL列表 */
export let lines = () => request.get('/api/select/getLines');
/** 运维单位列表 */
export let operationUnits = () => request.get('/api/select/getOperationUnits');
/** 巡视类型列表 */
export let patrolTypes = () => request.get('/api/select/getPatrolTypes');
/** 用户列表 */
export let users = () => request.get('/api/select/getUsers');
/** DL列表 */
export let cables = () => request.get('/api/select/getCables');
/** 通道列表（下拉） */
export let channels = () => request.get('/api/select/getChannels');



/** 巡视状态 */
export let patrolStatus = () => request.get('/api/select/getPatrolStatus');
/** 计划来源列表 */
export let patrolFrom = () => request.get('/api/select/getPlanFroms');

/** XL信息列表 */
export let lineDetail = params => request.post('/api/select/getLineList', qs.stringify(params, { allowDots: true }));

/**
 *ⅠXL巡视周期管理
 */
/** 获取列表 */
export let PatrolCycleManagementList = params => request.post('/cable/xszq/api/list', qs.stringify(params, { allowDots: true }));
/** 删除 */
export let PatrolCycleManagementDel = params => request.post('/cable/xszq/remove', qs.stringify(params, { allowDots: true }));
/** 新增 */
export let PatrolCycleManagementAdd = params => request.post('/cable/xszq/add', qs.stringify(params, { allowDots: true }));
/** 编辑 */
export let PatrolCycleManagementEdit = params => request.post('/cable/xszq/edit', qs.stringify(params, { allowDots: true }));
/** 批量编辑 */
export let PatrolCycleLineBactchEdit = params => request.post('/cable/xszq/batchEditSave', qs.stringify(params, { allowDots: true }));
/** XL详情 */
export let PatrolCycleManagementLineDetail = params => request.get('/cable/xszq/editPage/' + params);
/** 生成巡视周期 */
export let PatrolLineCreatPlan = params => request.post('/cable/xszq/generatePlan', qs.stringify(params, { allowDots: true }));

/**
 *ⅠXL巡视计划管理
 */
/**获取列表 */
export let PatrolPlanManagementList = params => request.post('/cable/xlxsjh/api/list', qs.stringify(params, { allowDots: true }));
/**删除 */
export let PatrolPlanManagementDel = params => request.post('/cable/xlxsjh/remove', qs.stringify(params, { allowDots: true }));

/**新增 */
export let PatrolPlanManagementAdd = params => request.post('/cable/xlxsjh/add', qs.stringify(params, { allowDots: true }));
/** 编辑 */
export let PatrolPlanManagementEdit = params => request.post('/cable/xlxsjh/edit', qs.stringify(params, { allowDots: true }));

/** 编辑回显 */
export let PatrolPlanManagementLineDate = params => request.get('/cable/xlxsjh/editPage/' + params);

/** 获取路线详情 */
export let PatrolPlanManagementLineDetail = params => request.post('/api/select/getLineListForPlan', qs.stringify(params, { allowDots: true }));
/** 导出 */
export let planLineUpload = params => request.post('/cable/xlxsjh/export',qs.stringify(params, { allowDots: true }))

/**
 *ⅠXL巡视任务管理 
 */
/**获取列表及信息 */
export let PatrolTaskMainDetail = params => request.post('/patrolApi/patrolTask/list', qs.stringify(params, { allowDots: true }));

/**获取饼图信息 */
export let PatrolTaskMainPie = params => request.post('/patrolApi/patrolTask/countPatrolStatus', qs.stringify(params, { allowDots: true }));

/** 新增/修改 超期原因 */
export let exceedTimeReasonEdit = params => request.post('/patrolApi/patrolTask/addReason', qs.stringify(params, { allowDots: true }));


/**
 *ⅠXL巡视结果管理 
 */
/**获取列表 */
export let PatrolResultManagementList = params => request.post('/api/xsjg/resultList', qs.stringify(params, { allowDots: true }));
/** 删除 */
export let PatrolResultManagementDel = params => request.post('/api/xsjg/remove', qs.stringify(params, { allowDots: true }));

/** 上传图片 */
export let upLoadImg = params => request.post('/api/xsjg/addPatrolPhoto', params);
/** 查询图片 */
export let downloadImg = params => request.get('/api/xsjg/patrolPhoto?patrolId=' + params);

/** 项目列表 */
export let proList = () => request.post('/cable/xsxm/list');

/** 新增 input */
export let xsjlAdd = params => request.post('/cable/xsjl/add', qs.stringify(params, { allowDots: true }));
/** 项目列表新增 list */
export let xsjlListAdd = params => request.post('/cable/xsjgXsxm/add', qs.stringify(params, { allowDots: true }));

/** 查看巡视记录 */
export let xsjlInputCheck = params => request.post('/api/xsjg/getXsjgById?id=' + params);

/** 巡视记录 form 表单修改 */
export let lineEditForm = params => request.post('/api/xsjg/edit', qs.stringify(params, { allowDots: true }));

/** 查看巡视记录 项目列表 XL*/
export let xsjlListCheck = params => request.get('/api/xsjg/patrolProjectListAll?id=' + params);
/** 查看巡视记录 项目列表 通道*/
export let tdxsjlListCheck = params => request.get('/cable/tdxsjg/patrolProjectListAll?id=' + params);


/** 通道 */

/** 巡视周期 */

/** 获取列表 */
export let PatrolCycleChannerList = params => request.post('/cable/tdxszq/api/list', qs.stringify(params, { allowDots: true }));
/** 删除 */
export let PatrolCycleChannerDel = params => request.post('/cable/tdxszq/remove', qs.stringify(params, { allowDots: true }));
/** 新增 */
export let PatrolCycleChannerAdd = params => request.post('/cable/tdxszq/add', qs.stringify(params, { allowDots: true }));
// /** 编辑 */
export let PatrolCycleChanelEdit = params => request.post('/cable/tdxszq/edit', qs.stringify(params, { allowDots: true }));
/** 批量编辑 */
export let PatrolCycleManagementBactchEdit = params => request.post('/cable/tdxszq/batchEditSave', qs.stringify(params, { allowDots: true }));
/** 生成巡视周期 */
export let PatrolChannelsCreatPlan = params => request.post('/cable/tdxszq/generatePlan', qs.stringify(params, { allowDots: true }));
/** 通道详情 (回显 通道列表) */
export let PatrolCycleChannelseTable = params => request.get('/cable/tdxszq/editPage/'+params);

/** 通道详情 (新增时 需要选取的 通道列表) */
export let PatrolCycleChannelseDetail = params => request.post('/cable/channel/list', qs.stringify(params, { allowDots: true }));


/** 通道巡视计划 */
/** 获取列表 */
export let PatrolPlanChannerList = params => request.post('/cable/tdxsjh/api/list', qs.stringify(params, { allowDots: true }));
/** 通道列表（新增通道接口） */
export let addNewchannels = params => request.get('/api/select/getChannelList?id=' + params);
/** 新增 */
export let PatrolPlanChannelAdd = params => request.post('/cable/tdxsjh/add', qs.stringify(params, { allowDots: true }));
/** 编辑回显 */ //
export let PatrolPlanChannelEditMsg = params => request.get('/cable/tdxsjh/editPage/' + params);
/** 编辑 */
export let PatrolPlanChannelEdit = params => request.post('/cable/tdxsjh/edit', qs.stringify(params, { allowDots: true }));
/** 删除 */
export let PatrolPlanDel = params => request.post('/cable/tdxsjh/remove', qs.stringify(params, { allowDots: true }));
/** 导出 */
export let planChannelsUpload = params => request.post('/cable/tdxsjh/export',qs.stringify(params, { allowDots: true }))
                                                    


/** 通道巡视结果 */

/**获取列表 */
export let channelResultList = params => request.post('/cable/tdxsjg/api/list', qs.stringify(params, { allowDots: true }));
/** 巡视记录 form 表单新增 */
export let channelsAddForm = params => request.post('/cable/tdxsjl/add', qs.stringify(params, { allowDots: true }));
/** 巡视记录 form 表单修改 */
export let channelsEditForm = params => request.post('/cable/tdxsjg/edit', qs.stringify(params, { allowDots: true }));

/** 查看巡视记录 */
export let xsjlInputChannelCheck = params => request.post('/cable/tdxsjg/getXsjgById?id=' + params);

/** 编辑项目列表 XL */
export let resultEditPro = params => request.post('/cable/xsjgXsxm/edit', qs.stringify(params, { allowDots: true }));
/** 编辑项目列表  td*/
export let tdresultEditPro = params => request.post('/cable/xsjgXsxm/editTd', qs.stringify(params, { allowDots: true }));

/** 预警管理 */
/**获取列表 */
export let warningList = params => request.post('/cable/qxAlarm/list', qs.stringify(params, { allowDots: true }));
/** 删除 */
export let warningDel = params => request.post('/cable/qxAlarm/delAlarm', qs.stringify(params));
/** 重置 */
export let warningReset = params => request.post('/cable/qxAlarm/resetAlarmCount', qs.stringify(params));
/** 设置 */
export let warningSetCount = params => request.post('/cable/qxAlarm/editAlarmCount', qs.stringify(params));
/** 历史 */
export let warningHistoryList = params => request.post('/cable/tQxglJcxxk/list', qs.stringify(params));