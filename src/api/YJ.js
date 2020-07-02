import request from '@/utils/request'
import qs from "qs"

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
const YJinfo = {
  YLJDMC: function (id, jd) {
    return request({
      url: '/zjgc/gc/qjdylyi_jd',
      method: 'POST',
      data: qs.stringify({
        gcid: id,
        jd: jd
      })
    })
  },
  /**阶段节点数据 */
  YJJD: function (val) {
    console.log(val);
    var jd;
    if (val == 0) {
      jd = "kxxyj";
    }
    if (val == 1) {
      jd = "cbsj"
    }
    if (val == 2) {
      jd = "sgtsc"
    }
    if (val == 3) {
      jd = "tdjs"
    }
    if (val == 4) {
      jd = "dqsg"
    }
    if (val == 5) {
      jd = "sy"
    }
    if (val == 6) {
      jd = "tdys"
    }
    if (val == 7) {
      jd = "dqys"
    }
    // if (val == 8) {
    //   jd = "dqys"
    // }
    // if (val == 9) {
    //   jd = "cbsj"
    // }
    return jd;
  },
  YJlist: [{
      id: 0,
      name: "一、可研审查阶段",
      describe: [{
        key: 1,
        item: "有无锈蚀",
        radio: "1",
        bz: ""
      }]
    },
    {
      id: 1,
      name: "二、设计审查阶段--均符合要求",
      describe: [{
        key: 1,
        item: "有无锈蚀",
        radio: "1",
        bz: ""
      }]
    },
    {
      id: 2,
      name: "三、施工图审查阶段--均符合要求",
      describe: [{
        key: 1,
        item: "有无锈蚀",
        radio: "1",
        bz: ""
      }]
    },

    {
      id: 3,
      name: "四、通道建设阶段--均符合要求",
      describe: [{
        key: 1,
        item: "有无锈蚀",
        radio: "1",
        bz: ""
      }]
    },
    {
      id: 4,
      name: "五、电气施工阶段--均符合要求",
      describe: [{
        key: 1,
        item: "有无锈蚀",
        radio: "1",
        bz: ""
      }]
    },
    {
      id: 5,
      name: "六、试验阶段--均符合要求",
      describe: [{
        key: 1,
        item: "有无锈蚀",
        radio: "1",
        bz: ""
      }]
    },
    {
      id: 6,
      name: "七、通道验收阶段--均符合要求",
      describe: [{
        key: 1,
        item: "有无锈蚀",
        radio: "1",
        bz: ""
      }]
    },
    {
      id: 7,
      name: "八、电气验收阶段--均符合要求",
      describe: [{
        key: 1,
        item: "有无锈蚀",
        radio: "1",
        bz: ""
      }]
    },
    // {
    //   id: 3,
    //   name: "四、施工交底阶段--均符合要求",
    //   describe: [{
    //     key: 1,
    //     item: "有无锈蚀",
    //     radio: "1",
    //     bz: ""
    //   }]
    // },

    // {
    //   id: 9,
    //   name: "十、竣工验收阶段--均符合要求",
    //   describe: [{
    //     key: 1,
    //     item: "有无锈蚀",
    //     radio: "1",
    //     bz: ""
    //   }]
    // }
  ]
}
export default YJinfo
