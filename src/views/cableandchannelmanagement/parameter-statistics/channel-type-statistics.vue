
<template>
  <!--  <h2>
   通道类型统计
  </h2> -->
  <div>
    <el-card class="tz-box-card">
      <!-- 图表待开发 -->
      <PieCharts :id="id1" :chartHeight="chartHeight" v-if="hasChartData" :chartdata="chartdata1" />
      <!--   <div ref="chart" style="height: 300px">111111113D饼图图表待开发</div> -->
    </el-card>
    <div class="content" style="margin-top: 1rem">
      <div class="main-userSelect">
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <!-- <el-form-item label="运维班组:">
          
              <el-select v-model="form.groupI" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.ywbz"
                  :key="item.groupId"
                  :label="item.groupname"
                  :value="item.groupId"
                ></el-option>
              </el-select>
            </el-form-item> -->
            <!-- <el-form-item label="设备主人:">
              <el-input v-model="form.sbzr" clearable/>
            </el-form-item> -->
            <el-form-item label="通道类型:">
              <!-- <el-input v-model="form.tdlx" clearable/> -->
              <!--<el-select v-model="form.Type" clearable placeholder="请选择">-->
                <!--<el-option v-for="item in selection.CheckType" :key="item.id" :label="item.qb" :value="item.id" />-->
              <!--</el-select>-->
              <el-select v-model="form.tdlx" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.tdlx"
                  :key="item.tdlx"
                  :label="item.tdlxmc"
                  :value="item.tdlxmc"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="float: right;margin-right: 0">
              <el-button class="onSearch" @click="onSearch">查询</el-button>
              <el-button class="onSearch" style="margin-right: 0" @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="content">
      <el-table
        :data="tableData"
        style="border: 1px solid #c7c7c7"
        height="400px"
        :cell-style="{borderColor: '#c7c7c7'}"
        :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}"
        border
        fit
        highlight-current-row
        @selection-change="CheckFun"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column
          v-for="item in tableTitle"
          :key="item.index"
          :prop="item.prop"
          :label="item.label"
          align="center"
          :show-overflow-tooltip="tabisoverflow"
        />
      </el-table>
      <pagination
        v-show="form.total>0"
        :total="form.total"
        :page.sync="form.pageNum"
        :limit.sync="form.pageSize"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import PieCharts from '@/charts/Hcharts/pie/3Dpie'
import { GETTBList, POSTTBList } from "@/api/public";
import {
  List,
  getLineLength
} from "@/api/cableandchannel/parameter-statistics/channelTypeStatistics";
import {getLineSelect} from '@/api/cableandchannel/channel-ledger-management/channel-ledger-management/cl-management'
export default {
  name: '',
  components: {
    Pagination,
    PieCharts
  },
  data() {
    return {
      chartHeight: 400,
      hasChartData: false,
      id1: 'charts1', // 图表ID
      id2: 'charts2', // 图表2ID
      chartdata1: {
        title: '', // 标题（参数必传可以为空）
        unit: 'km', // 单位(参数必传可以为空)
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          itemMarginTop:10,
          // borderWidth: 0,
          x: -100, //距离x轴的距离
          y: 50 //距离Y轴的距离
        },
        colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#7dedc4', '#5ceaf7', '#d280e9'], // 图表项目颜色
        data: [
          {
            name: '通道',
            y: 10
          },
          {
            name: this.$dl + '线',
            y: 20
          }, {
            name: this.$dl + '桥架',
            y: 10
          }, {
            name: this.$dl + '竖井',
            y: 10
          }, {
            name: '排管',
            y: 10
          }, {
            name: '隧道',
            y: 35
          },
          {
            name: '直埋通道',
            y: 10
          }, {
            name: '综合管廊',
            y: 10
          }, {
            name: '牵引管',
            y: 10
          }, {
            name: '水平顶管',
            y: 10
          }
        ]
      },
      form: {
        // ----------搜素绑定关键字-----------
        whbz: '', // 运行班组关键字
        sbzr: '', // 设备主人关键字
        tdlx: '', // 类型关键字
        // ----------分页关键字-----------
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      // 选中的数据
      CheckedSelection: [],
      tabisoverflow: true,
      // 表头
      tableTitle: [{
        label: '通道类型',
        prop: 'tdlx'
      },
      {
        label: '运维班组',
        prop: 'bzmc'
      },
      {
        label: '设备主人',
        prop: 'sbzr'
      },
      {
        label: '长度',
        prop: 'tdcd'
      }
      ],
      // 列表数据
      tableData: [],
      selection: {
        ywbz: [],
        tdlx: []
      },
    }
  },
  created() {
    this.posttb()
  },
  mounted() {
    this.getList()
    this.getSelect()
  },
  methods: {
    posttb() {
      POSTTBList("/cable/channelType/channelType")
        .then(res => {
          //console.log(res, "图表数据1111111111");
          if(res){
            this.chartdata1.data = []
            const data = res.data.data.channelList;
            data.forEach(e => {
              //console.log(e)
              if (e.tdlx !== null) {
                const y = {}
                y.name = e.tdlx
                y.y = Number(e.count)
                this.chartdata1.data.push(y)
              }
            })
            //console.log(this.chartdata1.data,'2222222222')
            this.hasChartData = true;
          }
        })
        .catch(err => {
          //console.log(err);
        });
    },
    // 获取下拉数据
    getSelect() {
      getLineSelect().then(response => {
        //console.log(response);
        if(response.status == 200) {
          this.selection.ywbz = response.data.data.groupList
          this.selection.tdlx = response.data.data.tdlxList
        }
      })
    },
    /**
       * 查询按钮
       */
    onSearch() {
      // if(this.form.groupName){ // 运维班组
      //   let searcharr = this.selection.ywbz.filter(res=>{
      //     return this.form.groupName == res.groupId
      //   })
      //   this.form.groupName = searcharr[0]['groupname']
      // }
      // //console.log('查询')
      this.form.pageNum = 1
      this.getList()
    },
    /**
       * 重置按钮
       */
    reset() {
      //console.log('重置按钮')
      this.form = { brand_right: 0 }
      this.form.pageNum = 1
      this.form.pageSize = 10
      this.getList()
    },
    // 选中数据
    CheckFun(val) {
      this.CheckedSelection = val
      //console.log(this.CheckedSelection)
    },
    // 获取数据
    getList() {
      List(this.$qs.stringify(this.form)).then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.tableData = response.data.rows;
          this.form.total = response.data.total;
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
  .box-card {
    width: 100%;

    .el-card__body {
      padding: 0 !important;
    }
  }
</style>
<style lang="scss">
  .change_contant {
    .el-card__body {
      padding: 0 !important;
    }
  }
</style>
