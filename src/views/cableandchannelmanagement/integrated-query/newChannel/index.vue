<template>
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="ruleForm" inline>
          <el-form-item style="float: left;" label="通道名称">
            <el-select
              v-model="ruleFrom.channelName"
              filterable
              clearable
              placeholder="请选择"
              :filter-method="filterList"
            >
              <el-option
                v-for="item in channelNameArr"
                :key="item.tdId"
                :label="item.tdmc"
                :value="item.tdmc"
              />
            </el-select>
          </el-form-item>
          <el-form-item style="float: left;" label="通道等级">
            <el-select v-model="ruleFrom.channelGrade" clearable placeholder="请选择">
              <el-option
                v-for="item in channelGradeArr"
                :key="item.tddjId"
                :label="item.tddjmc"
                :value="item.tddjmc"
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
          <el-table-column property="sdmc" :show-overflow-tooltip="true" label="通道名称" />
          <el-table-column property="bzmc" :show-overflow-tooltip="true" label="运维班组" />
          <el-table-column property="grade" :show-overflow-tooltip="true" label="通道等级" />
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
  getChannelSelect,
  getChannelPageList,
  getChannelGisMap
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
      img: require('../../../../icons/static/ry.png'),
      img2: require('../../../../icons/static/qidian2.png'),
      img3: require('../../../../icons/static/zhongdian1.png'),
      center: {
        'text-align': 'center',
        cursor: 'pointer'
      },
      ruleFrom: {
        //   通道等级
        channelGrade: '',
        channelName: '',
        queryDate: this.$formatDate.currentDate(),
        online: '1',
        channelTerritoryName: '',
        pageNum: 1,
        limit: 10,
        total: 0
      },
      tableData: [],
      channelNameAllArr: [],
      channelNameArr: [],
      channelGradeArr: []

    }
  },
  created() {},
  mounted() {
    // 综合查询 通道
    this.getChannelSelectList()
    // this.filterList()
    this.createMap()
    this.getChannelPage()
  },
  methods: {
    createMap() {
      var _this = this
      // 创建Map实例
      _this.map = new BMap.Map('allmap', { minZoom: 11, maxZoom: 16 }) // 创建Map实例
      _this.map.centerAndZoom(new BMap.Point(120.41177743261747, 31.599107502017336), 16) // 初始化地图,设置中心点坐标和地图级别
      _this.map.setCurrentCity('无锡') // 设置地图中心显示的城市 new！
      _this.map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
    },
    // 重置
    onReset() {
      this.ruleFrom.channelName = ''
      this.ruleFrom.channelGrade = ''
    },
    async showPerson(item) {
      //console.log(item)
      var that = this
      var params = {
        channelId: item.objId
      }
      const res = await getChannelGisMap(params)
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
    // 通道下拉框
    async getChannelSelectList() {
      var that = this
      const res = await getChannelSelect()
      that.channelGradeArr = res.data.data.tddj
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
    // //   左侧列表
    async getChannelPage() {
      var that = this
      var params = {
        pageNum: that.ruleFrom.pageNum,
        pageSize: that.ruleFrom.limit,
        sdmc: that.ruleFrom.channelName,
        grade: that.ruleFrom.channelGrade
      }
      const res = await getChannelPageList(params)
      //console.log(res)
      that.tableData = res.data.rows
      that.ruleFrom.total = res.data.total
    },
    // 查询
    onSearch() {
      this.ruleFrom.pageNum = 1
      this.getChannelPage()
    },
    handleCurrentChange(cpage) {
      this.ruleFrom.pageNum = cpage
      this.getChannelPage()
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
