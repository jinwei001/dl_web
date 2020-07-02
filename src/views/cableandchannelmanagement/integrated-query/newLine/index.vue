<template>
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="ruleForm" inline>
          <el-form-item style="float: left;">
            <el-select v-model="ruleFrom.voltage" clearable :placeholder="`请选择${$dydj}`">
              <el-option
                v-for="item in voltageArr"
                :key="item.dydj"
                :label="item.dydjmc"
                :value="item.dydjmc"
              />
            </el-select>
          </el-form-item>
          <el-form-item style="float: left;">
            <el-select v-model="ruleFrom.lineName" clearable :placeholder="`请选择${$xl}名称`">
              <el-option
                v-for="item in lineNameArr"
                :key="item.lineId"
                :label="item.lineName"
                :value="item.lineName"
              />
            </el-select>
          </el-form-item>
          <el-form-item style="float: left;">
            <el-select v-model="ruleFrom.operationTeam" clearable placeholder="请选择运维班组">
              <el-option
                v-for="item in operationTeamArr"
                :key="item.groupId"
                :label="item.groupName"
                :value="item.groupName"
              />
            </el-select>
          </el-form-item>
          <el-form-item style="float: left;">
            <el-select v-model="ruleFrom.equipmentName" clearable placeholder="请选择设备主人">
              <el-option
                v-for="item in equipmentNameArr"
                :key="item.userId"
                :label="item.userName"
                :value="item.userName"
              />
            </el-select>
          </el-form-item>
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
          <el-table-column property="lineName" :label="`${$xl}名称`" :show-overflow-tooltip="true" width="100" />
          <el-table-column property="physicalCableStageName" :show-overflow-tooltip="true" :label="`${$dl}段`" width="100" />
          <el-table-column property="groupName" label="运维班组" :show-overflow-tooltip="true" />
          <el-table-column property="lineRank" :label="`${$xl}等级`" :show-overflow-tooltip="true" />

          <el-table-column label="操作" width="60" fixed="right">
            <template slot-scope="scope">
              <p style="color:#1e88e5" @click="showPerson(scope.row)">查看</p>
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

import {
  getLineSelect,
  getLineGisMap,
  getLinePageList
} from '@/api/cableandchannel/cable-synthesize'
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
        //   DYDJ        voltage: '',
        lineName: '',
        operationTeam: '',
        equipmentName: '',
        queryDate: this.$formatDate.currentDate(),
        online: '1',
        pageNum: 1,
        limit: 10,
        total: 0
      },
      tableData: [],
      voltageArr: [],
      lineNameArr: [],
      operationTeamArr: [],
      equipmentNameArr: [],

      // 测试接口
      resultArr: [],

      // 点
      marker: null,
      dataAll: [],
      // 查看返回数据
      dataId: []

    }
  },
  created() {},
  mounted() {
    // 综合查询 XL
    this.getLineSelectList()
    this.createMap()
    // DL段 XLgis
    this.getLineGisMapList()
    // 表格列表
    this.getLinePage()
  },
  methods: {
    // 地图实例
    createMap() {
      var _this = this
      // 创建Map实例
      _this.map = new BMap.Map('allmap', { minZoom: 11, maxZoom: 16 }) // 创建Map实例
      _this.$store.state.map = _this.map
      _this.map.centerAndZoom(new BMap.Point(120.28711494237095, 31.707727508021538), 14) // 初始化地图,设置中心点坐标和地图级别
      _this.map.setCurrentCity('无锡') // 设置地图中心显示的城市 new！
      _this.map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
    },
    // 重置
    onReset() {
      this.voltageArr = []
      this.lineNameArr = []
      this.operationTeamArr = []
      this.equipmentNameArr = []
    },
    // XL 下拉框
    async getLineSelectList() {
      var that = this
      const res = await getLineSelect()
      that.voltageArr = res.data.data.dydjmc
      that.lineNameArr = res.data.data.lineName
      that.operationTeamArr = res.data.data.groupName
      that.equipmentNameArr = res.data.data.userName
    },
    // 获取DL网架图
    async getLineGisMapList() {
      var that = this
      const res = await getLineGisMap()
      var dataAll = res.data.data.data
      var dataSet = new mapv.DataSet(dataAll)
      var options = {
        strokeStyle: 'rgba(255,87,34,1)',
        shadowColor: 'rgba(255,87,34,0.2)',
        shadowBlur: 3,
        lineWidth: 3,
        draw: 'simple'
      }
      var mapvLayer = new mapv.baiduMapLayer(that.map, dataSet, options)
    },
    // 查看
    async showPerson(item) {
      // //console.log(item)
      var that = this
      var params = {
        physicalCableStageId: item.physicalCableStageId
      }
      const res = await getLineGisMap(params)
      if (res.data.data.data == '') {
        return
      } else {
        // that.dataId = res.data.data.data
        // var dataSetId = new mapv.DataSet(that.dataId)
        var dataId = res.data.data.data
        var dataSetId = new mapv.DataSet(dataId)
        // //console.log(dataSetId)
        var options = {
          strokeStyle: 'rgba(255,87,34,1)',
          shadowColor: 'rgba(255,87,34,0.2)',
          shadowBlur: 3,
          lineWidth: 3,
          draw: 'simple'
        }
        var mapvLayer = new mapv.baiduMapLayer(that.map, dataSetId, options)
      }
    },

    // //   左侧列表
    async getLinePage() {
      var that = this
      var params = {
        pageNum: that.ruleFrom.pageNum,
        pageSize: that.ruleFrom.limit,
        voltageRank: that.ruleFrom.voltage,
        lineName: that.ruleFrom.lineName,
        groupName: that.ruleFrom.operationTeam,
        facilityMaster: that.ruleFrom.userName
      }
      const res = await getLinePageList(params)
      // //console.log(res)
      that.tableData = res.data.rows
      that.ruleFrom.total = res.data.total
    },
    // 查询
    onSearch() {
      this.ruleFrom.pageNum = 1
      this.getLinePage()
    },
    // 分页
    handleCurrentChange(cpage) {
      this.ruleFrom.pageNum = cpage
      this.getLinePage()
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
  height:100%;
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
  /* height:100%; */
  height: calc(100%-80px);
}
.allmapBox {
  position: relative;
  top: 0;
  width: calc(100% - 320px);
  height: 100%;
  float: left;
}
.allmap{
  width:100%;
  height:100%;
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
.leftWarp .leftWarp .el-table {
  position: unset;
}
.leftWarp .listPagination {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}

</style>
