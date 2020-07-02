<template>
  <div class="main-body">
      <div class="allmapBox">
        <div id="allmap" ref="allmap" class="allmap" />
      </div>
  </div>
</template>

<script>

import {
  getLineGroupList, getLineNameList, getVoltageGradeList, getLineUsersList, getPageList, getLinePageMap,getPepoleNameAndTrajectory } from '@/api/patrolmanagement/inspectionPandect'

import Pagination from '@/components/Pagination2'

export default {
  name: 'PersonnelControlMgr',

  components: {
    Pagination
  },
  data() {
    return {
      headerStyle: {
        background: '#d7ecff',
        color: '#333232',
        'text-align': 'center',
        'margin-top': '25px'
      },

      center: {
        'text-align': 'center',
        cursor: 'pointer'
      },
      map: null,
      marker: null,
      // 线
      polyline: null,
      // 移动线数组
      linePointArr: [],
      ruleFrom: {
        //   通道等级
        voltageGrade: '',
        // XL名称
        lineName: '',
        // 班组
        GroupTeam: '',
        // 巡视人员
        inspector: '',
        date: [],
        queryDate: this.$formatDate.currentDate(),
        online: '1',
        channelTerritoryName: '',
        startTime: null,
        pageNum: 1,
        limit: 10,
        total: 0
      },
      // 列表
      tableData: [],
      allPoint: [],
      // XL名称
      lineNameArr: [],
      // 班组
      GroupTeamArr: [],
      // 巡视人
      inspectorArr: [],
      // DYDJ
      voltageGradeArr: []
    }
  },
  created() {},
  mounted() {
    // 综合查询 通道
    // this.getChannelSelectList()
    
    this.$nextTick(function() {
       this.createMap()
    });
   
  },
  methods: {
    createMap() {
      var _this = this;
      // 创建Map实例
      _this.map = new BMap.Map('allmap', { minZoom: 11, maxZoom: 16 }) // 创建Map实例
      _this.map.centerAndZoom(new BMap.Point(120.3727709532369, 31.580562985116053), 14) // 初始化地图,设置中心点坐标和地图级别
      _this.map.setCurrentCity('无锡') // 设置地图中心显示的城市 new！
      _this.map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
             
    },
  } 
}
</script>

<style  scoped>
.content {
  background-color: #fff !important;
  color: #118477 !important;
  border-right: none;
  position: relative;
  height: 100%;
}
/* .leftWarp-echart {
  width: 100%;
  height: 280px;
}
.leftWarp-echart1{
  width: 100%;
  height: 280px;
  text-align: center;
} */

.content .leftWarp {
  float: left;
  position: relative;
  top: 0;
  width: 320px;
  height: 100%;
}

.tableBox {
  width: 100%;
  height: calc(100% - 80px);
}
.allmapBox {
  position: relative;
  top: 0;
  width:100%;
  height: 100%;
  float: left;
}
.allmap {
  width: 100%;
  height: 100%;
}
.tableBox >>> tr {
  padding: 0 !important;
  height: 48px;
  line-height: 48px;
  font-size: 12px;
}

.tableBox >>> td {
  padding: 0 !important;
  height: 14px;
  line-height: 14px;
  font-size: 12px;
}
.tableCnt {
  position: absolute;
  bottom: 0;
  background: #f5f5f5;
  left: 0;
  right: 20px;
  height: 40px;
}

.tableCnt div {
  text-align: center;
  line-height: 40px;
}

.tableCnt div span {
  padding: 0 10px;
}

.tableCnt div span.lx {
  background: #15d307;
  color: #fff;
}

.tableCnt div span.wzs {
  background: #ff4242;
  color: #fff;
}
.leftWarp .leftWarp .el-table {
  position: unset;
}

.workWarp {
  position: absolute;
  top: 130px;
  left: 370px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
}

.workWarp ul {
  overflow: hidden;
}

.workWarp ul li {
  float: left;
  padding: 20px 0;
  float: left;
  color: #fff;
  margin: 0 40px 0 10px;
}

.workWarp ul li span {
  float: left;
  width: 6px;
  height: 15px;
  background: #ffae00;
  border-radius: 3px;
  margin: 0 10px;
}

.workWarp ul li.workClose {
  float: right;
  color: #fff;
  cursor: pointer;
}

.canClick {
  color: #ffae00;
  text-decoration: underline;
  cursor: pointer;
}

.phptpList {
  width: 92%;
  margin: 10px auto 0;
}

.phptpList li {
  position: relative;
  border-left: 1px solid #eee;
}

.phptpList li span {
  background: #ffae00;
  color: #fff;
  text-align: center;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  position: absolute;
  left: -8px;
  top: -1px;
}

.phptpList p.inspectTitle {
  text-indent: 20px;
  margin-bottom: 10px;
}

.phptpList .picList {
  overflow: hidden;
  width: 100%;
}

.phptpList .picList .span2Liff {
  float: left;
  width: 30%;
  margin: 10px 1.5%;
  height: 150px;
  overflow: hidden;
}

.phptpList .picList .span2Liff img {
  width: 100%;
  height: 100%;
}

.phptpListTitle {
  width: 100%;
}
.phptpListTitle span,
.phptpListTitle .inspectTitle {
  float: left;
}
.phptpListTitle .inspectTitleName {
  float: right;
  width: 39%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.playLine {
  position: absolute;
  top: 30%;
  right: 30px;
  cursor: pointer;
}
.playLine div {
  width: 86px;
  height: 34px;
  margin-bottom: 10px;
  line-height: 34px;
  text-align: center;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
}
.playLine div:hover {
  background: rgba(3, 105, 183, 0.6);
}
.playLine div.active {
  background: rgba(3, 105, 183, 0.6);
}
</style>
