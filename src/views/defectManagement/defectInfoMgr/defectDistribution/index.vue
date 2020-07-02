<template>
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="ruleForm" inline>
          <el-form-item style="float: left;">
            <el-select v-model="ruleFrom.DYXL" clearable placeholder="请选择DY XL">
              <el-option
                v-for="item in DYXLArr"
                :key="item.dydj"
                :label="item.dydjmc"
                :value="item.dydj"
              />
            </el-select>
          </el-form-item>
          <el-form-item style="float: left;">
            <el-select v-model="ruleFrom.defectGrade" clearable placeholder="缺陷等级">
              <el-option
                v-for="item in defectGradeArr"
                :key="item.lineId"
                :label="item.lineName"
                :value="item.lineId"
              />
            </el-select>
          </el-form-item>
          <el-form-item style="float: left;">
            <el-select v-model="ruleFrom.team" clearable placeholder="班组">
              <el-option
                v-for="item in teamArr"
                :key="item.groupId"
                :label="item.groupName"
                :value="item.groupId"
              />
            </el-select>
          </el-form-item>
          <el-form-item style="float: left;">
            <el-select v-model="ruleFrom.dwTeam" clearable placeholder="代维班组">
              <el-option
                v-for="item in dwTeamArr"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId"
              />
            </el-select>
          </el-form-item>
          <el-form-item style="float: left;">
            <el-input v-model="ruleFrom.defectName" clearable placeholder="缺陷编号、填报人" />
          </el-form-item>
          <el-form-item>
            <el-button class="onSearch" @click="onReset">重置</el-button>
            <el-button class="onSearch" @click="onSearch">更多筛选</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content">
      <div class="leftWarp">
        <div class="leftWarp-title">
          缺陷列表（{{ ruleFrom.total }}）个
        </div>
        <div class="leftWarp-list">
          <div v-for="(item,index) in defectList" :key="index" class="leftWarp-item" :class="{active:index==itemIndex}" @click="itemClick(item,index)">
            <div class="item-s">
              <div v-if="item.qxdjCode == 0" class="yiban">一般</div>
              <div v-if="item.qxdjCode == 1" class="yanzhong">严重</div>
              <div v-if="item.qxdjCode == 2" class="weiji">危及</div>
              <span>{{ item.name }}</span>
            </div>
            <div class="item-x">
              {{ item.CreatTime }}&nbsp;|&nbsp;{{ item.Fxrmc }}
            </div>
          </div>

        </div>

        <div class="listPagination">
          <pagination
            v-show="ruleFrom.total>=0"
            class="pagination"
            :total="ruleFrom.total"
            style="position:left:0;top:0"
            :page.sync="ruleFrom.pageNum"
            :limit.sync="ruleFrom.pageSize"
            @current-change="handleCurrentChange"
            @pagination="getList"
          />
        </div>

      </div>
      <div class="allmapBox">
        <div id="allmap" ref="allmap" class="allmap" />
      </div>

    </div>
  </div>
</template>

<script>
import { getDefectList } from '@/api/defectManagement/defectDistribution/index.js'

import Pagination from '@/components/Pagination2'

export default {
  name: 'DefectDistribution',

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
      itemIndex: null,
      ruleFrom: {
        DYXL: '',
        defectGrade: '',
        team: '',
        dwTeam: '',
        defectName: '',
        queryDate: this.$formatDate.currentDate(),
        pageNum: 1,
        pageSize: 5,
        total: 0
      },
      DYXLArr: [],
      defectGradeArr: [],
      teamArr: [],
      dwTeamArr: [],
      // 列表
      defectList: [],
      img: require('../../../../icons/static/ry.png'),
      // 点
      marker: null,
      // 坐标点返回
      resultArr: []

    }
  },
  created() {},
  mounted() {
    this.createMap()
    this.getDefectPageList()
  },
  methods: {
    createMap() {
      var _this = this
      // 创建Map实例
      _this.map = new BMap.Map('allmap', { minZoom: 11, maxZoom: 16 }) // 创建Map实例
      _this.map.centerAndZoom(new BMap.Point(120.299, 31.568), 14) // 初始化地图,设置中心点坐标和地图级别
      _this.map.setCurrentCity('无锡') // 设置地图中心显示的城市 new！
      _this.map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
    },
    // 点击列表ietm
    async itemClick(item, index) {
      var that = this
      that.itemIndex = index
      that.marker = null
      that.resultArr = []
      var params = {
        pageSize: this.ruleFrom.pageSize,
        pageNum: this.ruleFrom.pageNum
      }
      const res = await getDefectList(params)
      //console.log(res)
      that.resultArr = res.data.data.list
      if (that.resultArr.length > 0) {
        for (var i = 0; i < that.resultArr.length; i++) {
          var item = that.resultArr[i]
          var point = new BMap.Point(item.longitiude, item.latitiude) // 生成点
          // //console.log(point)
          // tempArr.push(point) // 每遍历一次把点放在数组里  留画线或轨迹用

          var myIcon = new BMap.Icon(that.img, new BMap.Size(40, 40)) // 创建坐标图
          var marker = new BMap.Marker(point, { icon: myIcon }) //  创建标记点
          var piontName = item.Fxrmc // 截取时间
          var label = new BMap.Label(piontName + '-' + item.CreatTime, { offset: new BMap.Size(-30, -22) })
          label.setStyle({
            background: '#fff',
            border: '1px solid #0088a1',
            color: '#000',
            padding: '1px 5px',
            borderRadius: '5px'
          })
          marker.setLabel(label) // 生成 文字提示
          marker.item = item //  每一个坐标 等于marker的 一个点
          that.map.addOverlay(marker)
        }
      }
    },
    // 缺陷列表
    async getDefectPageList() {
      var that = this
      var params = {
        pageSize: this.ruleFrom.pageSize,
        pageNum: this.ruleFrom.pageNum
      }
      const res = await getDefectList(params)
      if (res.data.data.list.length > 0) {
        that.defectList = res.data.data.list
        that.ruleFrom.total = res.data.data.totle
      }
    },
    // 重置
    onReset() {
      this.voltageArr = []
      this.lineArr = []
      this.operationArr = []
      this.equipmentNameArr = []
      this.ruleFrom.channelTerritoryName = ''
    },
    onSearch() {
      this.ruleFrom.pageNum = 1
      this.getPage()
      //   获取地图全部人员点
      this.getPersonLocation()
    },
    // 分页
    handleCurrentChange(cpage) {
      this.ruleFrom.pageNum = cpage
      this.getDefectPageList()
    },
    // 分页
    getList() {}
  }
}
</script>

<style  scoped>
#allmap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    font-family: "微软雅黑";
  }
.content {
  background-color: #fff !important;
  color: #118477 !important;
  border-right: none;
}

.content .leftWarp {
  position: relative;
  top: 0;
  width: 320px;
  border-top:1px solid #ddd;
  float: left;
}
.leftWarp .leftWarp-title{
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #118477 ;
  color:#fff
}
.leftWarp-list{
  width:100%;
  height: 580px;
  overflow: auto;
}
.leftWarp-item:hover{
  background: #f5f5f5;
}
.active{
  background: #f5f5f5;
}
.leftWarp-list .leftWarp-item{
  width:100%;
  height: 65px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}
.item-s{
  width:70%;
  height: 33px;
}
.item-s span{
  display: inline-block;
  width: 100px;
  height: 33px;
  line-height: 33px;
  width: calc(100%-44px);
  font-size: 12px;
  color: #3385ff;
  margin-left: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-x {
  /* display: inline-block; */
  height: 33px;
  line-height: 33px;
  width: 100%;
  font-size: 12px;
  color: #a6b5d7;
  padding-left: 6px;
}
.item-s .yanzhong{
  float: left;
  width:44px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  margin-left: 5px;
  margin-top: 6px;
  border-radius: 5px;
  color: #ff9c01;
  background: #fff5e3;
  border: 1px solid #ff9c01;
  font-size: 12px;
}
.item-s .yiban{
  float: left;
  width:44px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  margin-left: 5px;
  margin-top: 6px;
  border-radius: 5px;
  color: #3385ff;
  background: #d5f0ff;
  border: 1px solid #3385ff;
  font-size: 12px;
}
.item-s .weiji{
  float: left;
  width:44px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  margin-left: 5px;
  margin-top: 6px;
  border-radius: 5px;
  color: #ff2020;
  background: #ffbfbf;
  border: 1px solid #ff2020;
  font-size: 12px;
}

.leftWarp .listPagination{
     width: 100%;
    position: absolute;
    bottom: 0;
    left : 0
}
.allmapBox{
    float: left;
    width: calc(100% - 320px);
    height: 630px;

}
.allmap{
    width: 100%;
    height: 630px;
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
