<template>
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="ruleForm" inline>
          <el-form-item style="float: left;">
            <el-select v-model="ruleFrom.groupName" clearable placeholder="请选择班组">
              <el-option
                v-for="item in groupList"
                :key="item.objId"
                :label="item.groupname"
                :value="item.objId"
              />
            </el-select>
          </el-form-item>
          <el-form-item style="float: left;">
            <el-date-picker
              v-model="ruleFrom.queryDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              style="width: 100%;"
            />
          </el-form-item>
          <el-form-item style="float: left;">
            <el-input v-model="ruleFrom.userName" clearable placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item>
            <el-button class="onSearch" @click="onSearch">搜索</el-button>
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
          <el-table-column type="index" label="序号" width="40" />
          <el-table-column property="GROUPNAME" label="班组" width="80" />
          <el-table-column property="NAME" width="80" label="姓名" />
          <el-table-column property="ONLINE" width="60" label="状态">
            <template slot-scope="scope">
              <p v-if="scope.row.ONLINE==1">已巡</p>
              <p v-if="scope.row.ONLINE==0">未巡</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="60">
            <template slot-scope="scope">
              <p v-if="scope.row.ONLINE==1" style="color:#1e88e5" @click="showPerson(scope.row)">查看</p>
            </template>
          </el-table-column>
        </el-table>
        <div class="listPagination">
          <pagination
            v-show="ruleFrom.total>0"
            class="pagination"
            :total="ruleFrom.total"
            style="position:left:0;top:0"
            :page.sync="ruleFrom.pageNum"
            :limit.sync="ruleFrom.limit"
            @current-change="handleCurrentChange"
            @pagination="getList"
          />
        </div>

        <div class="tableCnt">
          <div>
            共
            <span class="zx">{{ yInplace+nInplace }}</span> 条数据，
            已巡：
            <span class="lx">{{ yInplace }}</span>
            未巡：
            <span class="wzs">{{ nInplace }}</span>
          </div>
        </div>
      </div>
      <div class="allmapBox">
        <div id="allmap" ref="allmap" class="allmap" />
      </div>
      <!-- <div v-if="todayWorkList.length>0" class="workWarp">
        <ul>
          <li v-for="(item,index) in todayWorkList" :key="item.type">
            <span />
            {{ item.name }} : <a :class="{'canClick':item.type!=4 && item.CNT > 0}" @click="showTowerPhoto(item)">{{ item.CNT }}</a>
            <em v-if="item.type==1"> ( 基 )</em>
            <em v-if="item.type==2"> ( 个 )</em>
            <em v-if="item.type==3"> ( 个 )</em>
            <em v-if="item.type==4"> ( km )</em>
          </li>
          <li class="workClose el-icon-close" @click="closeMyWork" />
        </ul>
      </div>-->
      <!-- <div v-if="todayWorkMapObj.gpslist && todayWorkMapObj.gpslist.length>0" class="playLine">
        <div v-if="playStatus==0 ||playStatus==3 " class="bofang" :class="playStatus==1?'active':''" @click="playback()">播放</div>
        <div v-if="playStatus==1||playStatus==2 ||playStatus==4||playStatus==8" class="bofang" :class="playStatus==3?'active':''" @click="suspend()">暂停</div>
        <div class="bofang" :class="playStatus==2?'active':''" @click="changeTime(2)">2倍</div>
        <div class="bofang" :class="playStatus==4?'active':''" @click="changeTime(4)">4倍</div>
        <div class="bofang" :class="playStatus==8?'active':''" @click="changeTime(8)">8倍</div>
      </div>
      <el-dialog
        v-if="showDetailFlag"
        title="打卡点巡视记录"
        center
        width="50%"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :visible.sync="showDetailFlag"
      >
        <his-position-tower-list
          :user-code="userCode"
          :xlinte-rid="xlinteRid"
          :query-date="ruleFrom.queryDate"
        />
      </el-dialog>-->
    </div>
  </div>
</template>

<script>
import {
  getPageList,
  getGrouplist,
  getPersonPoint,
  getPersonPointMap,
  getOnlineNum
} from '@/api/patrolmanagement/personnelControlMgr'
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
      img: require('../../../../icons/static/ry.png'),
      img2: require('../../../../icons/static/qidian2.png'),
      img3: require('../../../../icons/static/zhongdian1.png'),
      center: {
        'text-align': 'center',
        cursor: 'pointer'
      },
      ruleFrom: {
        //   班组
        groupName: '',
        queryDate: this.$formatDate.currentDate(),
        online: '1',
        userName: '',
        pageNum: 1,
        limit: 10,
        total: 0
      },
      tableData: [],
      groupList: [],
      onlineArr: [
        { name: '已巡', id: '1' },
        { name: '未巡', id: '0' }
      ],
      // 已巡
      yInplace: 0,
      // 未巡
      nInplace: 0,

      // 接口返回的轨迹坐标接收
      resultArr: [],
      // 点
      marker: null,
      // 线
      polyline: null,
      linePointArr: [], // 移动线数组
      playStatus: 0,
      interval: null,
      currentIndex: 0,
      personMarker: [],
      personPolyline: null,
      Magnification: 1, // 倍率
      timer: null
    }
  },
  created() {},
  mounted() {
    this.getOnline()
    this.getPage()
    this.getGroupSelect()
    this.getPersonLocation()
    this.createMap()
  },
  methods: {
    // 地图实例
    createMap() {
      var _this = this
      // 创建Map实例
      _this.map = new BMap.Map('allmap', { minZoom: 11, maxZoom: 16 }) // 创建Map实例
      _this.map.centerAndZoom(new BMap.Point(120.299, 31.568), 14) // 初始化地图,设置中心点坐标和地图级别
      _this.map.setCurrentCity('无锡') // 设置地图中心显示的城市 new！
      _this.map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
    },
    //   获取地图所有人员点
    async getPersonLocation() {
      var that = this
      var params = {
        queryDate: this.ruleFrom.queryDate
      }
      const res = await getPersonPointMap(params)
      var markerPointArr = res.data.data
      var tempArr = [] // 遍历坐标点画线用
      if (markerPointArr.length > 0) {
        for (var i = 0; i < markerPointArr.length; i++) {
          var item = markerPointArr[i]
          var point = new BMap.Point(item.X, item.Y) // 生成点
          tempArr.push(point) // 每遍历一次把点放在数组里  留画线或轨迹用

          var myIcon = new BMap.Icon(that.img, new BMap.Size(30, 30)) // 创建坐标图
          var marker = new BMap.Marker(point, { icon: myIcon }) //  创建标记点
          var timer = item.INSPECT_TIME.substring(11, 16) // 截取时间
          var label = new BMap.Label(item.NAME + '-' + timer, {
            offset: new BMap.Size(-25, -25)
          })
          label.setStyle({
            background: '#fff',
            border: '1px solid #0088a1',
            color: '#000',
            padding: '1px 5px',
            borderRadius: '5px'
          })
          marker.setLabel(label) // 生成 文字提示
          marker.item = item //  每一个坐标 等于marker的 一个点
          this.map.addOverlay(marker)
        }
      }
    },

    //   查看人员轨迹
    async showPerson(item) {
      var that = this
      that.marker = null
      that.Polyline = null
      // 清除覆盖物
      that.map.clearOverlays()
      // 先让移动XL为空
      that.linePointArr = []
      var params = {
        userCode: item.OBJ_ID,
        queryDate: that.ruleFrom.queryDate
      }
      const res = await getPersonPoint(params)
      that.resultArr = res.data.data
      if (that.resultArr.length > 0) {
        for (var i = 0; i < that.resultArr.length; i++) {
          var item1 = that.resultArr[i]
          var point = new BMap.Point(item1.X, item1.Y) // 116是经度 X 32是纬度Y
          if (i == 0) {
            //   // 设置点的新图标
            var myIcon = new BMap.Icon(that.img2, new BMap.Size(30, 38))
            that.marker = new BMap.Marker(point, { icon: myIcon }) // 创建点
            //   var label = new BMap.Label(
            //     item1.inspectManName +
            //           '-' +
            //           item1.inspectTime.substring(11, 16),
            //     { offset: new BMap.Size(-25, -25) }
            //   )
            //   label.setStyle({
            //     background: '#fff',
            //     border: '1px solid #0088a1',
            //     color: '#000',
            //     padding: '1px 5px',
            //     borderRadius: '5px'
            //     // display: "none"   // 对label样式隐藏
            //   })

            //   this.marker.setLabel(label) // 把label设置到maker上
          }
          if (i == that.resultArr.length - 1) {
            // 设置点的新图标
            var myIcon3 = new BMap.Icon(that.img3, new BMap.Size(30, 38))
            that.marker = new BMap.Marker(point, { icon: myIcon3 }) // 创建点
            //   var label = new BMap.Label(
            //     item1.inspectManName +
            //           '-' +
            //           item1.inspectTime.substring(11, 16),
            //     { offset: new BMap.Size(-25, -25) }
            //   )
            //   label.setStyle({
            //     background: '#fff',
            //     border: '1px solid #0088a1',
            //     color: '#000',
            //     padding: '1px 5px',
            //     borderRadius: '5px'
            //     // display: "none"   // 对label样式隐藏
            //   })

            //   this.marker.setLabel(label) // 把label设置到maker上
          }
          // 每遍历一次需要把 坐标点都添加在地图上    因为里面有判断 如果只有初始和结尾有 点,
          // 如果想其他坐标也要点  可以在判断外面 循环里面 this.marker = new BMap.Marker(point, { icon: myIcon }); // 创建点
          that.linePointArr.push(point) // 把坐标放在 移动XL里
          that.map.addOverlay(that.marker) // 将点添加到地图中
        }
        // 根据提供的地理区域或坐标获得最佳的地图视野
        that.map.setViewport(that.linePointArr)
        that.polyline = new BMap.Polyline(that.linePointArr, {
          strokeColor: '#ff0000',
          strokeStyle: 'dashed',
          strokeWeight: 4,
          strokeOpacity: 1
        }) // 创建折线
        that.map.addOverlay(that.polyline) // 将线添加在地图中
      }
      // this.getTodayWorkMap(item)
    },

    // 获取班组
    async getGroupSelect() {
      const res = await getGrouplist()
      this.groupList = res.data.rows
    },
    // 获取已巡未巡
    async getOnline() {
      var params = {
        queryDate: this.ruleFrom.queryDate
      }
      const res = await getOnlineNum(params)
      if (res.data.data) {
        this.yInplace = res.data.data.ONLINE
        this.nInplace = res.data.data.OFFLINE
      } else {
        this.yInplace = 0
        this.nInplace = 0
      }
      // //console.log(res)
    },
    //   左侧列表
    async getPage() {
      var params = {
        queryDate: this.ruleFrom.queryDate,
        groupName: this.ruleFrom.groupName,
        userName: this.ruleFrom.userName
      }
      const res = await getPageList(params)
      this.tableData = res.data.rows
      this.ruleFrom.total = res.data.total
    },
    onSearch() {
      this.ruleFrom.pageNum = 1
      this.getPage()
      //   获取地图全部人员点
      this.getPersonLocation()
    },
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
.result {
  height: 300px;
}
.content {
  background-color: #fff !important;
  color: #118477 !important;
  border-right: none;
  height: 100%;
  position: relative;
}

.content .leftWarp {
  float: left;
  position: relative;
  top: 0;
  width: 320px;
  height: 100%;
}

.tableBox {
  width: 100%;
  height: 100%;
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
  /* padding: 0 !important; */
  height: 36px;
  line-height: 36px;
  font-size: 12px;
}
.tableBox >>> td {
  padding: 0 !important;
  height: 36px;
  line-height: 36px;
  font-size: 12px;
}
.tableCnt {
  position: absolute;
  bottom: -20px;
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
.leftWarp .listPagination {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 10px;
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
