import Vue from '../../../../../main.js'
export const verificationList = {
  Hiddendangernumber: [{
    required: true,
    message: '请选择隐患编号',
    trigger: 'change',
  }],
  LineName: [{
    required: true,
    message: '请选择'+Vue.prototype.$xl,
    trigger: 'change',
  }],
  VoltageLevel: [{
    required: true,
    message: '请输入'+Vue.prototype.$dydj,
    trigger: 'change',
  }],
  cable: [{
    required: true,
    message: '请选择'+Vue.prototype.$dl,
    trigger: 'change',
  }],
  Hiddenaddress: [{
    required: true,
    message: '请输入隐患地址',
    trigger: 'change',
  }],
  EquipmentType: [{
    required: true,
    message: '请输入隐患类型',
    trigger: 'change',
  }],
  BaodianTime: [{
    required: true,
    message: '请输入保电时间',
    trigger: 'blur',
  }],
  CurrentOndutyPeople: [{
    required: true,
    message: '请输入值守人数',
    trigger: 'change',
  }],
  CurrentWatchman: [{
    required: true,
    message: '请输入值守人',
    trigger: 'blur',
  }],
  Ondutyteam: [{
    required: true,
    message: '请输入值守班组',
    trigger: 'change',
  }],
  Ondutystate: [{
    required: true,
    message: '请输入值守状态',
    trigger: 'change',
  }],
  Hiddenstate: [{
    required: true,
    message: '请输入隐患状态',
    trigger: 'change',
  }],
  // pictures1: [{
  //   required: true,
  //   message: '请上传图片1',
  //   trigger: 'change',
  // }],
  // pictures2: [{
  //   required: true,
  //   message: '请上传图片2',
  //   trigger: 'change',
  // }],
  // pictures3: [{
  //   required: true,
  //   message: '请上传图片3',
  //   trigger: 'change',
  // }],
  // PunchTime1: [{
  //   required: true,
  //   message: '请选择打卡时间1',
  //   trigger: 'change',
  // }],
  // PunchTime2: [{
  //   required: true,
  //   message: '请选择打卡时间2',
  //   trigger: 'change',
  // }],
  // PunchTime3: [{
  //   required: true,
  //   message: '请选择打卡时间3',
  //   trigger: 'change',
  // }],
  // Watchdescription1: [{
  //   required: true,
  //   message: '请输入值守描述1',
  //   trigger: 'change',
  // }],
  // Watchdescription2: [{
  //   required: true,
  //   message: '请输入值守描述2',
  //   trigger: 'change',
  // }],
  // Watchdescription3: [{
  //   required: true,
  //   message: '请输入值守描述3',
  //   trigger: 'change',
  // }],
  // Punchcoordinates1: [{
  //   required: true,
  //   message: '请输入打卡坐标1',
  //   trigger: 'change',
  // }],
  // Punchcoordinates2: [{
  //   required: true,
  //   message: '请输入打卡坐标2',
  //   trigger: 'change',
  // }],
  // Punchcoordinates3: [{
  //   required: true,
  //   message: '请输入打卡坐标3',
  //   trigger: 'change',
  // }]
}
