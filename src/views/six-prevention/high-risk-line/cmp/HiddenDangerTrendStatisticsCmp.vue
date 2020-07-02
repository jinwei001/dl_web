<template>
  <div>
    <el-row :gutter="20" style="margin-bottom: 1rem;">
      <el-col :span="24" style="margin-bottom: 20px;">
        <el-card class="tz-box-card">
          <!-- 图表待开发 -->
          <pointlinechart v-if="show1" style="height: 360px;" :chartsdata="chartsdata1" :configuration="Configurationline" />
        </el-card>
      </el-col>
      <el-col :span="24" style="margin-bottom: 20px;">
        <el-card class="tz-box-card">
          <!-- 图表待开发 -->
          <pointlinechart v-if="show2" style="height: 360px;" :chartsdata="chartsdata2" :configuration="Configurationline" />
        </el-card>
      </el-col>
      <el-col :span="24" style="margin-bottom: 20px;">
        <el-card class="tz-box-card">
          <!-- 图表待开发 -->
          <pointlinechart v-if="show3" style="height: 360px;" :chartsdata="chartsdata3" :configuration="Configurationline" />
        </el-card>
      </el-col>
    </el-row>
    <div class="content">
      <el-table :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}"
        :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}" border fit highlight-current-row
        @selection-change="CheckFun">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column v-for="item in tableTitle" :key="item.index" :prop="item.prop" :label="item.label" align="center"
          :show-overflow-tooltip="true" />
      </el-table>
      <pagination v-show="form.total>0" :total="form.total" :page.sync="tableParam.nowPage" :limit.sync="form.limit"
        @pagination="getList" />
    </div>
  </div>
</template>

<script>
  import pointlinechart from '@/charts/linechart/pointlinechart'
  import Pagination from '@/components/Pagination'
  import qs from 'qs'
  import {
    TableList
  } from '@/api/Sixdefensemanagement/HiddenInformationReview'
  export default {
    name: 'HiddenDangerTrendStatisticsCmp',
    components: {
      pointlinechart,
      Pagination
    },
    props: {

      listData: {
        type: Object,
        // 对象或数组且一定会从一个工厂函数返回默认值
        default: function() {
          return {}
        }
      },
      time: {
        type: Array,
        // 对象或数组且一定会从一个工厂函数返回默认值
        default: function() {
          return []
        }
      },
      typename:{
        type: String,
        // 对象或数组且一定会从一个工厂函数返回默认值
        default: function() {
          return ''
        }
      }
    },
    data() {
      return {
        tableParam: {
          // 列表查询的参数
          startTime: '',
          endTime: '',
          nowPage: 1,
        },
        show1: false,
        show2: false,
        show3: false,
        form: {
          pageNum: 1,
          limit: 10,
          total: 2
        },
        // 表头
        tableTitle: [
       {
        label: this.$xl+'名称',
         prop: 'linename'
       },
       {
         label: this.$dl,
         prop: 'dianLanName'
       },
          {
            label: this.$xb,
            prop: 'phase'
          },
          {
            label: '隐患设备类型',
            prop: 'sheBeiTypeName'
          },
          {
            label: '隐患设备',
            prop: 'sheBeiName'
          },
          {
            label: '六防隐患类型',
            prop: 'liuFangName'
          },
          {
            label: '隐患部位',
            prop: 'yinHuanBuWeiName'
          },
          {
            label: '隐患类型',
            prop: 'yinHuanLeiXingName'
          },
          {
            label: '隐患原因',
            prop: 'hdreason'
          }
        ],
        tableData: [],
        chartsdata1: [{
            name: '盗窃及蓄意破坏', // 名称
            color: '#800080', // 颜色
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '施工（机械）破坏', // 名称
            color: '#ffff00', // 颜色
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '塌方破坏', // 名称
            color: '#008000', // 颜色
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '船舶锚损', // 名称
            color: '#00ffff', // 颜色
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '异物短路', // 名称
            color: '#0000ff', // 颜色
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '非法取（堆）土', // 名称
            color: '#ff0000', // 颜色
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ],
        chartsdata2: [{
            name: '巡视', // 名称
            color: '#800080', // 颜色
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '带点检测', // 名称
            color: '#ffff00', // 颜色
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '检修', // 名称
            color: '#008000', // 颜色
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '在线检测', // 名称
            color: '#00ffff', // 颜色
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ],
        chartsdata3: [{
            name: '一般', // 名称
            color: '#800080', // 颜色
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '危险', // 名称
            color: '#ffff00', // 颜色
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '严重', // 名称
            color: '#008000', // 颜色
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ],
        // 图表配置
        Configurationline: {
          Xname:[],
          angle: 45,
          grid: {
            top: '15%',
            bottom: '12%',
            left: '8%',
            right: '4%'
          },
          Yunit: '条'

        }
      }
    },
    mounted() {
      this.charts1()
      this.getList()
    },
    watch:{
     time: {
        handler(newValue, oldValue){
        },
        deep: true
      },
      listData: {
        handler(newValue, oldValue){
          this.show1=false,
          this.show2=false,
          this.show3=false,
          this.getList()
          this.charts1()
          // //console.log(newValue)
        },
        deep: true
      }

    },
    methods: {

      CheckFun() {

      },
      getList() {
        if (this.time!== null) {
          this.tableParam.startTime = this.time[0]
          this.tableParam.endTime = this.time[1]
        }
        if(this.typename!== null){
          this.tableParam.sixhdtype=this.typename
        }
        TableList(qs.stringify(this.tableParam)).then(response => {
          if (response.status == 200) {
            this.tableData = response.data.rows[0].dataList
            this.form.total = response.data.rows[0].totleNumber
          }
        })
      },
      charts1() {
        this.Configurationline.Xname=this.listData.dateList
        var sixHdListkey = Object.keys(this.listData.sixHdList)

        if (sixHdListkey.length > 0) {
          for (let i = 0; i < sixHdListkey.length; i++) {
            // //console.log(this.listData.findTypeList[findTypeListkey[i]])
            for (let s = 0; s < this.listData.sixHdList[sixHdListkey[i]].length; s++) {
              if (this.listData.sixHdList[sixHdListkey[i]][s] == null) {
                this.listData.sixHdList[sixHdListkey[i]][s] = 0
              }
            }
          }
          for (let B = 0; B < sixHdListkey.length; B++) {
            if (sixHdListkey[B] == 'fireList') { // 火灾
              this.chartsdata1[0].data = this.listData.sixHdList[sixHdListkey[B]]
            }
            if (sixHdListkey[B] == 'gasList') { // 有图气体
              this.chartsdata1[1].data = this.listData.sixHdList[sixHdListkey[B]]
            }
            if (sixHdListkey[B] == 'badEqList') { // 附属设备异常
              this.chartsdata1[2].data = this.listData.sixHdList[sixHdListkey[B]]
            }
            if (sixHdListkey[B] == 'damageList') { // 外婆
              this.chartsdata1[3].data = this.listData.sixHdList[sixHdListkey[B]]
            }
            if (sixHdListkey[B] == 'hotList') { // 过热
              this.chartsdata1[4].data = this.listData.sixHdList[sixHdListkey[B]]
            }
            if (sixHdListkey[B] == 'floodList') { // 水灾
              this.chartsdata1[5].data = this.listData.sixHdList[sixHdListkey[B]]
            }
          }
        }
        this.show1 = true
        this.charts2()
      },
      charts2() {
        // Object.keys(this.listData.findTypeList)
        var findTypeListkey = Object.keys(this.listData.findTypeList)

        if (findTypeListkey.length > 0) {
          for (let i = 0; i < findTypeListkey.length; i++) {
            // //console.log(this.listData.findTypeList[findTypeListkey[i]])
            for (let s = 0; s < this.listData.findTypeList[findTypeListkey[i]].length; s++) {
              if (this.listData.findTypeList[findTypeListkey[i]][s] == null) {
                this.listData.findTypeList[findTypeListkey[i]][s] = 0
              }
            }
          }
          for (let B = 0; B < findTypeListkey.length; B++) {
            if (findTypeListkey[B] == 'xunShiList') {
              this.chartsdata2[0].data = this.listData.findTypeList[findTypeListkey[B]]
            }
            if (findTypeListkey[B] == 'daiDianJianCeList') {
              this.chartsdata2[1].data = this.listData.findTypeList[findTypeListkey[B]]
            }
            if (findTypeListkey[B] == 'jianXiuList') {
              this.chartsdata2[2].data = this.listData.findTypeList[findTypeListkey[B]]
            }
            if (findTypeListkey[B] == 'zaiXianJianCeList') {
              this.chartsdata2[3].data = this.listData.findTypeList[findTypeListkey[B]]
            }
          }
        }
        this.show2 = true
        this.charts3()
      },
      charts3() {
        var hdClassListkey = Object.keys(this.listData.hdClassList)

        if (hdClassListkey.length > 0) {
          for (let i = 0; i < hdClassListkey.length; i++) {
            // //console.log(this.listData.findTypeList[findTypeListkey[i]])
            for (let s = 0; s < this.listData.hdClassList[hdClassListkey[i]].length; s++) {
              if (this.listData.hdClassList[hdClassListkey[i]][s] == null) {
                this.listData.hdClassList[hdClassListkey[i]][s] = 0
              }
            }
          }
          for (let B = 0; B < hdClassListkey.length; B++) {
            // //console.log(this.listData.hdClassList[hdClassListkey[B]])
            if (hdClassListkey[B] == 'yiBan') { // 火灾
              this.chartsdata3[0].data = this.listData.hdClassList[hdClassListkey[B]]
            }
            if (hdClassListkey[B] == 'weiJi') { // 有图气体
              this.chartsdata3[1].data = this.listData.hdClassList[hdClassListkey[B]]
            }
            if (hdClassListkey[B] == 'yanZhong') { // 附属设备异常
              this.chartsdata3[2].data = this.listData.hdClassList[hdClassListkey[B]]
            }
          }
        }
        this.show3 = true
      }
    }
  }
</script>

<style>
</style>
