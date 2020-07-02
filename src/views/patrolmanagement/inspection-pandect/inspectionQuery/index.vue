<template>
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="ruleForm" inline>
          <el-form-item style="float: left;" :label="`${$dydj}`">
            <el-select v-model="ruleFrom.voltageGrade" clearable placeholder="请选择">
              <el-option
                v-for="item in voltageGradeArr"
                :key="item.id"
                :label="item.kv"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item style="float: left;" :label="`${$xl}名称`">
            <el-select v-model="ruleFrom.lineName" clearable placeholder="请选择">
              <el-option
                v-for="item in lineNameArr"
                :key="item.id"
                :label="item.lineName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item style="float: left;" label="班组">
            <el-select v-model="ruleFrom.GroupTeam" clearable placeholder="请选择">
              <el-option
                v-for="item in GroupTeamArr"
                :key="item.id"
                :label="item.groupName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item style="float: left;" label="巡视人员">
            <el-select v-model="ruleFrom.inspector" clearable placeholder="请选择">
              <el-option
                v-for="item in inspectorArr"
                :key="item.id"
                :label="item.username"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="计划巡视时间：">
            <el-col>
              <el-date-picker
                v-model="ruleFrom.date"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button class="onSearch" @click="onSearch">查询</el-button>
            <el-button class="onSearch">巡视报表</el-button>
            <el-button class="onSearch" @click="getInspectionMap">人员定位</el-button>
            <el-button class="onSearch" @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content">
      <div class="leftWarp">
        <el-table
          id="tableData"
          ref="singleTable"
          class="tableBox"
          :header-cell-style="{'background':'#cddce6',borderColor: '#c4c8cf'}"
          :cell-style="center"
          :data="tableData"
          highlight-current-row
        >
          <el-table-column type="index" :show-overflow-tooltip="true" label="序号" width="40" />
          <el-table-column property="lineName" :show-overflow-tooltip="true" :label="`${$xl}名称`" />
          <el-table-column property="voltageRank" :show-overflow-tooltip="true" :label="`${$dydj}`" />
          <el-table-column property="groupName" :show-overflow-tooltip="true" label="班组" />
          <el-table-column property="jhxsrq" :show-overflow-tooltip="true" label="计划时间" />
          <el-table-column property="patrolUserName" :show-overflow-tooltip="true" label="巡视人" />

          <el-table-column label="操作" width="120" fixed="right">
            <template slot-scope="scope">
              <p style="color:#207570;" @click="showLine(scope.row)">查看{{$xl}}</p>
              <p style="color:#207570;" @click="showTrack(scope.row)">查看轨迹</p>
              <!-- <p v-if="scope.row.ONLINE==1" style="color:#1e88e5" @click="showPerson1(scope.row)">查看</p> -->
            </template>
          </el-table-column>
        </el-table>
        <div class="listPagination">
          <pagination
            v-show="ruleFrom.total>=0"
            class="pagination"
            :total="ruleFrom.total"
            style="position:left:0;top:0"
            :page.sync="ruleFrom.pageNum"
            :limit.sync="ruleFrom.limit"
            @current-change="handleCurrentChange"
            @pagination="getList"
          />
        </div>

        <!-- <div class="tableCnt">
          <div>
            共
            <span class="zx">{{ yInplace+nInplace }}</span> 条数据，
            已巡：
            <span class="lx">{{ yInplace }}</span>
            未巡：
            <span class="wzs">{{ nInplace }}</span>
          </div>
        </div>-->
      </div>
      <div class="allmapBox">
        <div id="allmap" ref="allmap" class="allmap" />
         <div class="markerBox" v-if="dialogVisible">
                            <div class="detailTitle">
                              <div class="titleType">{{itemObj.personnelName}}&nbsp;&nbsp;巡视情况</div>
                              <div class="guanbi" @click="handleClose">X</div>
                            </div>
                            <div class="titleContent">
                              <div class="titleContent-l">
                                  <img src="../../../../icons/static/rz.jpg" class="rizhi_icon" alt>
                                <div class="left-title">今日工作</div>
                                <div class="left-content">
                                  <div class="left-contentItem">
                                    巡视设备&nbsp;
                                    <span class="yellow">{{todayInfo.xssbNum}}</span>&nbsp;处
                                  </div>
                                  <div class="left-contentItem">
                                    发现缺陷&nbsp;
                                    <span class="yellow">{{todayInfo.qxNum}}</span>&nbsp;处
                                  </div>
                                  <div class="left-contentItem">
                                    发现隐患&nbsp;
                                    <span class="yellow">{{todayInfo.xhNum}}</span>&nbsp;处
                                  </div>
                                  <div class="left-contentItem">
                                    我的足迹&nbsp;
                                    <span class="yellow" v-if="todayInfo.distance >=0">{{todayInfo.distance}}</span>km
                                  </div>
                                </div>
                              </div>
                              <div class="titleContent-r">
                                 <img src="../../../../icons/static/jb.jpg" class="rizhi_icon" alt>
                                <div class="right-title">历史成就</div>
                                <div class="right-content">
                                  <div class="right-contentItem">
                                    巡视设备&nbsp;
                                    <span class="yellow">{{historyInfo.xssbNum}}</span>&nbsp;处
                                  </div>
                                  <div class="right-contentItem">
                                    发现缺陷&nbsp;
                                    <span class="yellow">{{historyInfo.qxNum}}</span>&nbsp;处
                                  </div>
                                  <div class="right-contentItem">
                                    发现隐患&nbsp;
                                    <span class="yellow">{{historyInfo.xhNum}}</span>&nbsp;处
                                  </div>
                                  <div class="right-contentItem">
                                    我的足迹&nbsp;
                                    <span class="yellow" v-if="historyInfo.distance >=0">{{historyInfo.distance}}</span>km
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="textItem-title">巡视记录
                                 <img src="../../../../icons/static/rz.jpg" class="rizhi_icon2" alt>
                            </div>
                            <div class="inspectionRecord">
                              
                             <div class="item-text" v-for="item in trackArrList" :key="item.equipmentId">
                                      <div class="textItem firstItem">线路设备:&nbsp;{{item.equipmentName}}</div>
                                      <div class="textItem">巡视时间:&nbsp;{{item.xssj}}</div>
                                      <div class="textItem">巡视照片:&nbsp;</div>
                                      <div class="textItem-photo"  v-viewer >
                                                  <img  v-for="(src,index) in photoList" :key="index" :src="src"  />
                                      </div>
                                    </div>
                            </div>
                            <div class="detail-fotter">
                              <el-button type="primary" @click="showTrack2()">巡视轨迹</el-button>
                              <!-- <div class="showTrack">巡视轨迹</div> -->
                            </div>
                          </div>
      </div>
    </div>
  </div>
</template>

<script>

import {
  getLineGroupList, getLineNameList, getVoltageGradeList, getLineUsersList, getPageList, getLinePageMap,getPepoleNameAndTrajectory,getPatrolDayAndHistoryAchievement,getPatrolRecordAndTrajectory } from '@/api/patrolmanagement/inspectionPandect'

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
      dialogVisible:false,
       itemObj:{},
       todayInfo: {},
       historyInfo: {},
      imgry: require('../../../../icons/static/ry.png'),
       img1: require('../../../../icons/static/xiaoren_yellow.png'),
      img2: require('../../../../icons/static/qidian2.png'),
      img3: require('../../../../icons/static/zhongdian1.png'),
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
      voltageGradeArr: [],
      trackArrList:[]
    }
  },
  created() {},
  mounted() {
    // 综合查询 通道
    // this.getChannelSelectList()
    
    this.$nextTick(function() {
       this.createMap()
    });
    // 列表接口
    this.getPage()
    // DYDJ
    this.getVoltageGrade()
    // XL名称
    this.getLineName()
    // 班组
    this.getLineGroup()
    // 巡视人
    this.getLineUsers()
  },
  methods: {
    createMap() {
      var _this = this;
      // 创建Map实例
      _this.map = new BMap.Map('allmap', { minZoom: 11, maxZoom: 16 }) // 创建Map实例
      _this.map.centerAndZoom(new BMap.Point(120.3727709532369, 31.580562985116053), 14) // 初始化地图,设置中心点坐标和地图级别
      _this.map.setCurrentCity('无锡') // 设置地图中心显示的城市 new！
      _this.map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
      //    _this.map.addEventListener('click', function(e) {
      //   var marker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat))
      //    _this.map.addOverlay(marker)
      //  })
             
    },
    showLine(item){
        var that=this;
    },
    handleClose() {
      this.dialogVisible = false;
      this.getInspectionMap()
    },
    // 重置
    onReset() {
      var that=this;
      this.channelGradeArr = [];
      this.channelNameArr = [];
      that.dialogVisible=false;
      this.ruleFrom.channelTerritoryName = '';
      for(let i in that.linePointArr){
         that.map.removeOverlay(that.linePointArr[i]); 
      }
       for(let j in that.allPoint){
         that.map.removeOverlay(that.allPoint[j]); 
      }
       that.map.removeOverlay(that.polyline); 
    },

   async  getInspectionMap(){
            var that = this;
            const res = await getPepoleNameAndTrajectory()
            var resultArr = res.data.data;
               that.allPoint=[];
               var tempArr=[];
            if (resultArr.length > 0) {
              for (var i = 0; i < resultArr.length; i++) {
                var item1 = resultArr[i];
                var point = new BMap.Point(120.3727709532369, 31.580562985116053); 
                // var point = new BMap.Point(item1.x, item1.y); 
                var myIcon = new BMap.Icon(
                 that.imgry,
                  new BMap.Size(38, 38)
                );
                tempArr.push(point)
                var userName = item1.personnelName; // 巡视人
                var label = new BMap.Label(userName, {
                  offset: new BMap.Size(-5, -25)
                });
                label.setStyle({
                  background: "#fff",
                  border: "1px solid #0088a1",
                  color: "#000",
                  padding: "1px 5px",
                  borderRadius: "5px"
                });
                var marker = new BMap.Marker(point, { icon: myIcon }); // 创建点
                marker.item=item1;
                marker.setLabel(label); // 生成 文字提示
                that.map.addOverlay(marker);
                that.allPoint.push(marker);
                marker.addEventListener("click", function(e) {
                  that.trackId = e.currentTarget.item.xsrId;
                  that.dialogVisible = true;
                  that.getTodayAchievement(e);
                  that.getInspectionInfo(e);
                });
              }
            }
          

   },
    // 轨迹当日成就
   async   getTodayAchievement(e) {
      var that = this;
      if(that.trackId==undefined || that.trackId==null){
        return false;
      }
        const res = await getPatrolDayAndHistoryAchievement(that.trackId)
          that.historyInfo = res.data.data.histroy[0];
          that.todayInfo = res.data.data.day[0];
      
    },
     // 轨迹当日成就
   async   getInspectionInfo(e) {
      var that = this;
      if(that.trackId==undefined || that.trackId==null){
        return false;
      }
        const res = await getPatrolRecordAndTrajectory(that.trackId)
          that.trackArrList = res.data.data.equipmentData;
              console.log(that.trackArrList)
              that.trackArrList.forEach(item=>{
                var item1 = item.tpList
                item1.forEach(phtotItem=>{
                  var tpItem = that.$http.dcbaseUrl() + phtotItem;
                  that.photoList.push(tpItem)
                })
              })
      
    },
     async showTrack2() {
      var that = this
        // 清除覆盖物
       for(let i in that.linePointArr){
         that.map.removeOverlay(that.linePointArr[i]); 
      }
       for(let j in that.allPoint){
         that.map.removeOverlay(that.allPoint[j]); 
      }
       that.map.removeOverlay(that.polyline)
       that.linePointArr = [];
      that.polyline=null;
     
      const res = await getLinePageMap(that.trackId)
      var tempArr=[];
       var resultArr = res.data.data.gjData;

      if (resultArr.length > 0) {
        for (var i = 0; i < resultArr.length; i++) {
          var item1 = resultArr[i]
          var point = new BMap.Point(item1.longitude, item1.latitude);
          tempArr.push(point);
          if (i == 0) {
            //   // 设置点的新图标
            var myIcon = new BMap.Icon(that.img2, new BMap.Size(30, 38))
            that.marker = new BMap.Marker(point, { icon: myIcon }) // 创建点
          }
          if (i == resultArr.length - 1) {
            // 设置点的新图标
            var myIcon = new BMap.Icon(that.img3, new BMap.Size(30, 38))
            that.marker = new BMap.Marker(point, { icon: myIcon }) // 创建点
          }
           if (i != 0 && i != resultArr.length - 1) {
              // 设置点的新图标
              var myIcon1 = new BMap.Icon(that.img1, new BMap.Size(30, 38));
              that.marker = new BMap.Marker(point, { icon: myIcon1 }); // 创建点
            }
          that.linePointArr.push(that.marker) // 把坐标放在 移动XL里
          that.map.addOverlay(that.marker) // 将点添加到地图中
        }
        // 根据提供的地理区域或坐标获得最佳的地图视野
        that.map.setViewport(tempArr)
        that.polyline = new BMap.Polyline(tempArr, {
          strokeColor: '#ff0000',
          strokeStyle: 'dashed',
          strokeWeight: 3,
          strokeOpacity: 1
        }) // 创建折线
        that.map.addOverlay(that.polyline) // 将线添加在地图中
      }
    },
   async showTrack() {
    
      var that = this
        // 清除覆盖物
      for(let i in that.linePointArr){
         that.map.removeOverlay(that.linePointArr[i]); 
      }
       that.map.removeOverlay(that.polyline); 
       that.linePointArr = [];
      that.polyline=null;
      var params = {
        xsjhid: that.objId,
        xsrid: that.xsrId,
        startTime: that.ruleFrom.date[0],
        endTime: that.ruleFrom.date[1]
      }
      const res = await getLinePageMap(item.xsrId)
      var tempArr=[];
      var resultArr = res.data.data.gjData;
      if (resultArr.length > 0) {
        for (var i = 0; i < resultArr.length; i++) {
          var item1 = resultArr[i]
          var point = new BMap.Point(item1.longitude, item1.latitude);
          tempArr.push(point);
          if (i == 0) {
            //   // 设置点的新图标
            var myIcon = new BMap.Icon(that.img2, new BMap.Size(30, 38))
            that.marker = new BMap.Marker(point, { icon: myIcon }) // 创建点
          }
          if (i == resultArr.length - 1) {
            // 设置点的新图标
            var myIcon = new BMap.Icon(that.img3, new BMap.Size(30, 38))
            that.marker = new BMap.Marker(point, { icon: myIcon }) // 创建点
          }
           if (i != 0 && i != resultArr.length - 1) {
              // 设置点的新图标
              var myIcon1 = new BMap.Icon(that.img1, new BMap.Size(30, 38));
              that.marker = new BMap.Marker(point, { icon: myIcon1 }); // 创建点
            }
          that.linePointArr.push(that.marker) // 把坐标放在 移动XL里
          that.map.addOverlay(that.marker) // 将点添加到地图中
        }
        // 根据提供的地理区域或坐标获得最佳的地图视野
        that.map.setViewport(tempArr)
        that.polyline = new BMap.Polyline(that.linePointArr, {
          strokeColor: '#ff0000',
          strokeStyle: 'dashed',
          strokeWeight: 4,
          strokeOpacity: 1
        }) // 创建折线
        that.map.addOverlay(that.polyline) // 将线添加在地图中
      }
    },
    // 查看轨迹
    async showTrack(item) {
      var that = this
        // 清除覆盖物
      for(let i in that.linePointArr){
         that.map.removeOverlay(that.linePointArr[i]); 
      }
       that.map.removeOverlay(that.polyline); 
       that.linePointArr = [];
      that.polyline=null;
      var params = {
        xsjhid: item.objId,
        xsrid: item.xsrId,
        startTime: that.ruleFrom.date[0],
        endTime: that.ruleFrom.date[1]
      }
      const res = await getLinePageMap(item.xsrId)
      var tempArr=[];
      var resultArr = res.data.data.gjData;
      if (resultArr.length > 0) {
        for (var i = 0; i < resultArr.length; i++) {
          var item1 = resultArr[i]
          var point = new BMap.Point(item1.longitude, item1.latitude);
          tempArr.push(point);
          if (i == 0) {
            //   // 设置点的新图标
            var myIcon = new BMap.Icon(that.img2, new BMap.Size(30, 38))
            that.marker = new BMap.Marker(point, { icon: myIcon }) // 创建点
          }
          if (i == resultArr.length - 1) {
            // 设置点的新图标
            var myIcon = new BMap.Icon(that.img3, new BMap.Size(30, 38))
            that.marker = new BMap.Marker(point, { icon: myIcon }) // 创建点
          }
           if (i != 0 && i != resultArr.length - 1) {
              // 设置点的新图标
              var myIcon1 = new BMap.Icon(that.img1, new BMap.Size(30, 38));
              that.marker = new BMap.Marker(point, { icon: myIcon1 }); // 创建点
            }
          that.linePointArr.push(that.marker) // 把坐标放在 移动XL里
          that.map.addOverlay(that.marker) // 将点添加到地图中
        }
        // 根据提供的地理区域或坐标获得最佳的地图视野
        that.map.setViewport(tempArr)
        that.polyline = new BMap.Polyline(tempArr, {
          strokeColor: '#ff0000',
          strokeStyle: 'dashed',
          strokeWeight: 4,
          strokeOpacity: 1
        }) // 创建折线
        that.map.addOverlay(that.polyline) // 将线添加在地图中
      }
    },
    // 列表接口
    async getPage() {
      var that = this
      var params = {
        beginTime: that.ruleFrom.date[0],
        endTime: that.ruleFrom.date[1],
        pageNum: that.ruleFrom.pageNum,
        pageSize: that.ruleFrom.limit,
        kv: that.ruleFrom.voltageGrade,
        lineId: that.ruleFrom.lineName,
        patrolUser: that.ruleFrom.inspector,
        opsGroup: that.ruleFrom.GroupTeam
      }
      const res = await getPageList(params)
      that.tableData = res.data.rows
    },
    // DYDJ
    async getVoltageGrade() {
      var that = this
      const res = await getVoltageGradeList()
      that.voltageGradeArr = res.data.data
    },
    // XL名称
    async getLineName() {
      var that = this
      const res = await getLineNameList()
      that.lineNameArr = res.data.data
    },
    // 班组
    async getLineGroup() {
      var that = this
      const res = await getLineGroupList()
      that.GroupTeamArr = res.data.data
    },
    // 巡视人
    async getLineUsers() {
      var that = this
      const res = await getLineUsersList()
      that.inspectorArr = res.data.data
    },

    
    // 查询
    onSearch() {
      this.ruleFrom.pageNum = 1
      this.getPage()
    },
    // 分页
    handleCurrentChange(cpage) {
      this.ruleFrom.pageNum = cpage
      this.getPageList()
    },
    // 分页
    getList() {}
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
  width: calc(100% - 320px);
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
/* 弹出框 */

.markerBox {
  position: absolute;
  top: 12%;
  right: 4px;
   width: 340px;
  height: 490px;
  border:2px solid #05c5b9;
  color: #2a2a2a;
  background: #fff;
  z-index: 33;
  box-sizing: border-box;

}
.detailTitle {
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #fff;
  background: #10a89f;
}
.titleType {
  float: left;
  width: 60%;
  height: 40px;
  margin-left: 20%;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.guanbi {
  float: right;
  width: 16%;
  margin-right: 1%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
}

/* tabs样式 */
/* .markerBox .el-tabs {
  width: 340px;
}
.markerBox >>> .el-tabs__nav-scroll {
  padding-left: 10px;
}
.markerBox >>> .el-tabs__nav-wrap::after {
  content: "";
  position: absolute;
  left: 10px;
  right: 0;
  bottom: 0;
  width: 94%;
  height: 1px;
  background-color: #2a71b3;
  z-index: 1;
}
.markerBox >>> .el-tabs__item {
  padding: 0 0 0 12px;
  color: #fff;
}
.markerBox >>> .el-tabs__active-bar {
  background-color: #5df4fb;
}
.markerBox >>> .el-tabs__item.is-active {
  color: #5df4fb;
} */
.titleContent {
  width: 100%;
  height: 164px;
  color: #181818;
  position: relative;
  }
.titleContent::before{

  position: absolute;
  width: calc( 100% - 20px );
  height: 2px;
  bottom: 0px;
  left: 10px;
  content: '';
  background: #f5f5f5;
}
.titleContent .titleContent-l {
  float: left;
  width: 50%;
  height: 100%;
  padding-left: 30px;
 
  position: relative;
}
.rizhi_icon{
 position: absolute;
 left: 13px;
 top: 15px;
}
.titleContent .left-title {
  width: 100%;
  text-align: left;
  height: 44px;
  line-height: 44px;
  color: #ff8a00;
  font-weight: 600;
}
.titleContent .left-content {
  width: 100%;
  height: calc(100% - 44px);
}
.titleContent .left-content .left-contentItem {
  width: 100%;
  height: 28px;
  line-height: 28px;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
.titleContent .left-content .left-contentItem .yellow {
  color: #ff8a00;
}
.titleContent .titleContent-r {
  float: left;
  width: 50%;
  height: 100%;
  padding-left: 30px;
  position: relative;
}
.titleContent .right-title {
  width: 100%;
  text-align: left;
  height: 44px;
  line-height: 44px;
   color: #ff8a00;
   font-weight: 600;
}
.titleContent .right-content {
  width: 100%;
  height: calc(100% - 44px);
}
.titleContent .right-content .right-contentItem {
  width: 100%;
  height: 28px;
  line-height: 28px;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
.titleContent .right-content .right-contentItem .yellow {
  color: #ff8a00
}
.inspectionRecord {
  width: 100%;
  height: 226px;
  overflow: auto;
  
  
}
.textItem-title {
  width: 100%;
  height: 40px;
  line-height: 40px;
   color: #ff8a00;
  font-weight: 500;
  position: relative;
  padding: 0 30px;
  font-weight: 600;
}
.rizhi_icon2{
  position: absolute;
  left: 12px;
  top:14px ;
 
}
.inspectionRecord .item-text {
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
}
.item-text .textItem {
  width: 100%;
  height: 24px;
  line-height: 24px;
  color: #181818;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
.textItem-photo {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}
.textItem-photo img {
  width: calc(100% - 12px);
  height: calc(100% - 12px);
  margin-top: 6px;
  margin-left: 6px;
  margin-bottom: 10px;
  cursor: pointer;
}
.detail-fotter {
  position: absolute;
 left: 0;
 bottom: 0;
  width: 100%;
  height: 54px;
  background: #e3ffff;
}
.detail-fotter >>> .el-button {
  margin-top: 5px;
  height: 44px;
  margin-left: 45%;
  border-radius: 8px;
}
</style>
