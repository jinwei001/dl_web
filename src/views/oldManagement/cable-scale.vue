<template>

  <!--  <h1>老旧{{ $dl }}规模</h1> -->
  <el-col :span="24">
    <el-col :span="24" class="card">
      <el-card class="box-card" shadow="hover">
        <el-form ref="Inquire" class="search-form" inline :model="Inquire">
          <!--    //XL -->
          <el-form-item :label="$xl+'名称'" prop="ljXl">
            <el-select v-model="Inquire.ljXl"  placeholder="请选择" >
              <el-option
                v-for="(item,index) in selectData.lineArry"
                :key="index"
                :label="item.lineName"
                :value="item.lineId"
              />
            </el-select>
          </el-form-item>
          <div class="search-buttons">
            <el-button type="primary" size="small" class="onSearch" @click="getList">查询</el-button>
            <el-button type="primary" size="small" class="UserSearchFun" @click="taskButtonResetClick">重置</el-button>
          </div>
        </el-form>
      </el-card>
    </el-col>
    <el-col :span="24" class="card" >
      <el-card class="box-card" shadow="hover">
        <el-tabs v-model="activeName">
        <el-tab-pane lazy label="列表" name="list">
         <el-table
           :data="tableData"
           style="border: 1px solid #c7c7c7"
           :cell-style="{borderColor: '#c7c7c7'}"
           :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}"
           border
           fit
           highlight-current-row
           v-if="activeName==='list'"
         >
           <el-table-column property="lineName" :label="$xl+'名称'" />
           <el-table-column property="voltageRank" :label="$dydj" />
           <el-table-column property="logicCableStageName" :label="$dl" />
           <el-table-column property="tyDate" label="投运日期" />
           <el-table-column property="groupName" label="投运班组" />
         </el-table>
         <pagination
           :total="tableParam.total"
           :page.sync="tableParam.pageNum"
           :limit.sync="tableParam.limit"
           @pagination="getList"
         />
        </el-tab-pane>
        <el-tab-pane lazy label="地图" name="map">
            <Mapcmp :lineidpn='tableParam.lineId'    v-if="activeName==='map'"/>
        </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
    <el-col :span="12" class="card"   v-if="activeName==='list'" >
      <el-card class="box-card" shadow="hover">
        <theredpiecmp :id="id" style="height: 400px;width: 100%;" :chartdata="chartdata1" :chart-height="chartHeight" v-if='chartsShow1'/>
        <p style="line-height: 400px;text-align: center;font-size: 30px;color: #606266;" v-else>{{chartsErrortext1}}</p>
      </el-card>
    </el-col>
    <el-col :span="12" class="card"   v-if="activeName==='list'">
      <el-card class="box-card" shadow="hover">
        <shadowGraph :id="id1" style="height: 400px;width: 100%;" :chartdata2pn="chartdata2" v-if='chartsShow2'/>
         <p style="line-height: 400px;text-align: center;font-size: 30px;color: #606266;" v-else>{{chartsErrortext2}}</p>
      </el-card>
    </el-col>
  </el-col>
</template>

<script>
import theredpiecmp from '../../charts/Hcharts/pie/3Dpie.vue'
import shadowGraph from '../../charts/charts/shadowGraph.vue'
import Pagination from '@/components/Pagination'
import Mapcmp from './cmp/map.vue'
import qs from 'qs'
import {
  oldcable_lineNames, // 老旧xl列表
  oldcable_scale,
  oldcable_percent,
  oldcable_trend
} from '@/api/oldDL/JX'
export default {
  name: 'CableMaintenance',
  components: {
    theredpiecmp,
    shadowGraph,
     Pagination,
     Mapcmp
  },
  data() {
    return {
      activeName:"list",
      chartsShow1:false,
      chartsShow2:false,
      chartsErrortext1:'加载中',
      chartsErrortext2:'加载中',
      selectData: { // 爆灯等级
        lineArry: []
      },
      Inquire: { // 值守任务列表查询绑定集合
        ljXl: ''
      },
      tableParam: { // 值守列表分页和查询参数集合
        total: 0,
        pageNum: 1,
        pageSize: 10,
        limit: 10,
        lineId: '',
      },
      tableData:[],
      id: 'one',
      id1: 'two',
      chartHeight: 400,
      chartdata1: {
        title: '25年以上' + this.$dl + '数占比图', // 标题（参数必传可以为空）
        unit: '条', // 单位(参数必传可以为空)
        colors: ['#00e6de', '#fedb0b', '#ff9c24'], // 图表项目颜色
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          itemMarginTop: 10,
          // borderWidth: 0,
          x: -20, // 距离x轴的距离
          y: 0 // 距离Y轴的距离
        },
        data: [{
          name: '符合',
          y: 10
        },
        {
          name: '嵌套',
          y: 10
        }, {
          name: 'GIs',
          y: 10
        }
        ]
      },
      chartdata2: {
        title: '25年以上' + this.$dl + '运行年限趋势图', // 标题（参数必传可以为空）
        unit: '条', // 单位(参数必传可以为空)
        legend: {
          name: [],
          data: []
        },
        data: [{
          color: ['rgba(124,183,236, 0.3)', 'rgba(124,183,236, 0)'],
          normal: ['rgba(124,183,236,0.5)', 'rgba(124,183,236,1)'],
          data: []
        },
        {
          color: ['rgba(68,68,71, 0.3)', 'rgba(68,68,71, 0)'],
          normal: ['rgba(68,68,71,0.5)', 'rgba(68,68,71,1)'],
          data: []
        },
        {
          color: ['rgba(143,240,124, 0.3)', 'rgba(143,240,124, 0)'],
          normal: ['rgba(143,240,124,0.5)', 'rgba(143,240,124,1)'],
          data: []
        }
        ]
      }
    }
  },
  mounted() {
    this.getLines_selectDataFun()
    this.getList()
    this.zhangbi()
    this.qushi()
  },
  methods: {
    zhangbi(){
          oldcable_percent().then(response => {
            if (response.status === 200) {
              if (response.data.code === 0) {
                if(response.data.data.length>0){
                const length=response.data.data.length
                const data=response.data.data
                 for(let i=0;i<length;i++){
                   this.chartdata1.data[i].name=data[i].vr
                   this.chartdata1.data[i].y=data[i].num
                 }
                 this.chartsShow1=true
                }else{
                  this.chartsShow1=false
                  this.chartsErrortext1=this.chartdata1.title+'无数据'
                  this.chartdata1.data=[]
                }
              } else {
                this.chartsShow1=false
                this.chartsErrortext1=this.chartdata1.title+'接口获取失败'
                this.chartdata1.data=[]
                this.$message({
                  message: '占比图获取失败',
                  type: 'error'
                })
              }
            }
          })
    },
    qushi(){
          oldcable_trend().then(response => {
            if (response.status === 200) {
              if (response.data.code === 0) {
                if(response.data.data.list.length>0){
                // const length=response.data.data.list.length
                const data=response.data.data
                this.chartdata2.legend.name=data.type
                this.chartdata2.legend.data=data.year
                 for(let i=0;i<this.chartdata2.data.length;i++){
                   this.chartdata2.data[i].data=[]
                   this.chartdata2.data[i].data=data.list[i]

                 }
                 this.chartsShow2=true
                }else{
                  this.chartsShow2=false
                  this.chartsErrortext2=this.chartdata2.title+'无数据'
                }
              } else {
                this.chartsShow2=false
                this.chartsErrortext2=this.chartdata2.title+'接口获取失败'
                this.$message({
                  message: '趋势图获取失败',
                  type: 'error'
                })
              }
            }
          })
    },
    taskButtonResetClick() {
      this.$refs['Inquire'].resetFields()
      this.$message({
        message: '重置成功',
        type: 'success'
      })
      this.getList()
      // ...
    },
    //列表
    getList() {
      // 查询名称赋值

      this.tableParam.lineId = this.Inquire.ljXl // 保电名称
      oldcable_scale(qs.stringify(this.tableParam)).then(response => {
        if (response.status === 200) {
          if (response.data.code === 0) {
            this.tableData = response.data.rows
            this.tableParam.total = response.data.total // 总页数
          } else {
            this.tableData = []
            this.tableParam.total = 0
            this.$message({
              message: '老旧列表获取失败',
              type: 'error'
            })
          }
        }
      })
    },
    // 老旧XL获取接口
    getLines_selectDataFun() {
      oldcable_lineNames().then(response => {
        if (response.status === 200) {
          if (response.data.code === 0) {
            this.selectData.lineArry = response.data.rows
          } else {
            this.selectData.lineArry = []
            this.$message({
              message: this.$xl + '列表获取失败',
              type: 'error'
            })
          }
        }
      })
    },
  }
}
</script>

<style scoped="scoped">
  .card {
    padding: 10px 20px;
  }
</style>
