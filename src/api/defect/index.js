import request from '@/utils/request'
import qs from 'qs'


/**公共接口 */
/** XL下拉列表(下拉) */
export let xlList = () => request.get('/cable/qxcommon/getLine');
/** 根据XL查询XL电压 */
export let getDy = params => request.get('/cable/qxcommon/getVrByLine?line_id=' + params);

/** 根据XL查询XLDL名称 */
export let getDl = params => request.get('/cable/qxcommon/getDlByLine?line_id=' + params);
/**  根据DL查询 */
export let getXw = params => request.get('/cable/qxcommon/getPhaseByDl?dl_id=' + params);
/** 查询设备类型  */
export let getSblx = () => request.get('/cable/qxcommon/getDeviceType');
/**  根据检测设备类型和XLID查询设备名称 */
export let getSbMc = (device_type, line_id) => request.get('/cable/qxcommon/getDeviceInfo?device_type=' + device_type + '&line_id=' + line_id);
/**  查询部件 */
export let getBj = () => request.get('/cable/qxcommon/getBj');
/** 通道列表 */
export let getTd = () => request.get('/cable/qxcommon/getChannel');
/** 根据通道查询通道段/井 */
export let getWorkOrWell = () => request.get('/cable/qxcommon/getWorkOrWell');
/**  根据部件查部位  */
export let getBw = params => request.get('/cable/qxcommon/getBw?bj=' + params);
/** 根据部位查缺陷描述  */
export let getMs = params => request.get('/cable/qxcommon/getQxDes?bw=' + params);
/** 根据描述查依据和等级 */
export let getyjAdj = params => request.get('/cable/qxcommon/getDecideBasis?qx_des=' + params);
/** 查询发现方式 */
export let getFxfs = () => request.get('/cable/qxcommon/getDiscoveryMethod');
/** 发现班组 */
export let getBz = () => request.get('/cable/qxcommon/getGroup');
/** 发现人 */
export let getFxr = params => request.get('/cable/qxcommon/getUserByGroupId?group_id=' + params);
/** 开启流程 / 审批 */
export let kqlc = params => request.post('/cable/tQxglJcxxk/approval', qs.stringify(params));



/** 缺陷登记 */
/** 展示列表 */
export let registerList = params => request.post('/cable/tQxglJcxxk/list', qs.stringify(params));

/** 新增 */
export let qxAdd = params => request.post('/cable/tQxglJcxxk/add', qs.stringify(params));
/** 删除 */
export let registerDel = params => request.post('/cable/tQxglJcxxk/remove', qs.stringify(params));
/** 查看table */
export let registerCheck = params => request.get('/cable/tQxglJcxxk/process?qxId=' + params);
/** 编辑  */
export let registerEdit = params => request.post('/cable/tQxglJcxxk/edit', qs.stringify(params));
/** 批量审批  */
export let registerBatch = params => request.post('/cable/tQxglJcxxk/approvalBatch', qs.stringify(params));

/** 缺陷处置计划 */
/** 展示列表 */
export let planList = params => request.post('/cable/tQxglJcxxk/planList', qs.stringify(params));
/** 新增 */
export let planAdd = params => request.post('/cable/tQxglJcxxk/edit', qs.stringify(params));
/** 编辑回显 */
export let planMsgDetail = params => request.get('/cable/tQxglJcxxk/editPage/'+params);
/** 批量下发 */
export let batchPlan = params => request.post('/cable/tQxglJcxxk/batchPlan', qs.stringify(params));
/** 缺陷审核 */
export let auditList = params => request.post('/cable/tQxglJcxxk/doList', qs.stringify(params));
/* 缺陷处置案例-批量下发 */
export let auditCase = params => request.post('/cable/tQxglJcxxk/batchCase', qs.stringify(params));
/** 删除计划 */
export let palnDel = params => request.get('/cable/tQxglJcxxk/planRemove/'+params);
/** 缺陷处置案例 */
/** 展示列表 */
export let caseList = params => request.post('/cable/tQxglJcxxk/caseList', qs.stringify(params));
/** cable/tQxglJcxxk/batchCancelCase
缺陷处置案例-批量取消 */
export let cancelCase = params => request.post('cable/tQxglJcxxk/batchCancelCase', qs.stringify(params));


/** 缺陷统计分析 */
export let analysisList = params => request.post('/cable/tQxglJcxxk/statistic_list', qs.stringify(params));
/** 新增 */
export let analysisBar = params => request.post('/cable/tQxglJcxxk/statistic_grade', qs.stringify(params));

/** 部位 bar */
export let bwBar = params => request.post('/cable/tQxglJcxxk/statistic_bw', qs.stringify(params));
/** 部件 bar */
export let bjBar = params => request.post('/cable/tQxglJcxxk/statistic_bj', qs.stringify(params));
/** 根据电压查线路 */
export let dyGetxl = params => request.get('/cable/qxcommon/getLineByVr?voltage_rank='+params);