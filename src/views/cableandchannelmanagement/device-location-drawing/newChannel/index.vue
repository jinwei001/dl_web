<template>
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="ruleForm" inline>
          <el-form-item style="float: left;" label="通道名称">
            <el-select v-model="ruleFrom.channelName" clearable placeholder="请选择" :filter-method="filterList" filterable>
              <el-option
                v-for="item in channelNameArr"
                :key="item.channelId"
                :label="item.channelName"
                :value="item.channelId"
              />
            </el-select>
          </el-form-item>
          <!-- <el-form-item style="float: left;">
            <el-input v-model="ruleFrom.channelTerritoryName" clearable placeholder="通道地域名称" />
          </el-form-item>-->
          <el-form-item>
            <el-button class="onSearch" @click="onReset">重置</el-button>
            <el-button class="onSearch" @click="onSearch">查询</el-button>
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
          <!-- <el-table-column type="index" label="序号" width="40" /> -->
          <el-table-column property="GROUPNAME" label="通道名称" />
          <el-table-column property="NAME" label="运维班组" />
          <el-table-column property="NAME" label="通道等级" />

          <el-table-column label="操作" width="60" fixed="right">
            <template slot-scope="scope">
              <p class="chakan" style="color:#1e88e5" @click="showPerson(scope.row)">查看</p>
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
      </div>
      <div class="allmapBox">
        <div id="allmap" ref="allmap" class="allmap" />
      </div>
    </div>
  </div>
</template>

<script>
import { getChannelSelect } from '@/api/cableandchannel/cable-equipmentLocation'

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
      ruleFrom: {
        // 通道名称
        channelName: '',
        queryDate: this.$formatDate.currentDate(),
        online: '1',
        channelTerritoryName: '',
        pageNum: 1,
        limit: 10,
        total: 0
      },
      tableData: [],
      channelNameArr: [],
      channelNameAllArr: []
    }
  },
  created() {},
  mounted() {
    // 设备位置绘制-通道
    this.getChannelSelectList()
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
    // 重置
    onReset() {},
    // 通道
    async getChannelSelectList() {
      var that = this
      const res = await getChannelSelect()
      that.channelNameAllArr = res.data.data.channel
      that.channelNameArr = res.data.data.channel.slice(0, 20)
    },
    async filterList(query = '') {
      var that = this
      that.channelNameAllArr.filter(item => {
        return item.tdmc.includes(query) || item.id.includes(query)
      })
      if (that.channelNameAllArr.length > 20) {
        that.channelNameArr = that.channelNameAllArr.slice(0, 20)
      } else {
        that.channelNameArr = that.channelNameAllArr
      }
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
  position: relative;
  height: 100%;
}

.content .leftWarp {
  position: relative;
  top: 0;
  width: 320px;
  float: left;
}

.allmapBox {
  float: left;
  width: calc(100% - 320px);
  height: 100%;
}
.allmap {
  width: 100%;
  height: 100%;
}
.tableBox {
  width: 100%;
  /* height:100%; */
  height: calc(100% - 80px);
}
.tableBox >>> tr{
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
.leftWarp .listPagination {
  width: 100%;
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

.chakan{
  cursor: pointer;
}
</style>
