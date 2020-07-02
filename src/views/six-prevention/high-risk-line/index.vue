<template>
  <!--   <h2>
    隐患高发和隐患趋势统计
  </h2> -->
  <div class="main-body"  v-loading="loading">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="`隐患高发${$xl}`" name="first" />
      <el-tab-pane label="隐患趋势统计" name="second" />
    </el-tabs>
    <div class="content" style="margin-top: 1rem">
      <div class="main-userSelect">
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <el-form-item label="日期:">
              <el-date-picker :change='getdatefun()' v-model="time" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
                type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :onPick="pickerOptions()" style="width: 100%;"/>
            </el-form-item>
            <el-form-item label="隐患类型:">
             <el-select v-model="Sixtypeshiddendangers" clearable placeholder="请选择隐患类型">
               <el-option v-for="item in selection.liuFangYinHuan" :key="item.id" :label="item.value" :value="item.id" />
             </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- ----------------------------------[图表区]---------------------------------------- -->
    <hiddendangerhighincidencelinescmp v-if="activeName=='first'&&show1" :barData='barData'  :time='time' :typename='Sixtypeshiddendangers'/>
    <hiddendangertrendstatisticscmp v-if="activeName=='second'&&show2==true" :listData='listData' :time='time' :typename='Sixtypeshiddendangers'/>
  </div>
</template>

<script>
  import hiddendangerhighincidencelinescmp from './cmp/HiddenDangerhighIncidenceLinesCmp'
  import hiddendangertrendstatisticscmp from './cmp/HiddenDangerTrendStatisticsCmp'
  import qs from 'qs'
  import {
    getList,
    HRHTList
  } from '@/api/Sixdefensemanagement/HiddenInformationReview'
  import {
    setList,
  } from '@/api/Sixdefensemanagement/HiddenDangerReview'
  export default {
    name: '',
    components: {
      hiddendangerhighincidencelinescmp,
      hiddendangertrendstatisticscmp
    },
    data() {
      return {
        Sixtypeshiddendangers:'',
        loading:true,
        time: [],
        show1: false,
        show2: false,
        listData: null,
        barData:null,
        chartsshow: false,
        value1: '',
        chartdata: [],
        activeName: 'first', // 标签也切换关键字
        form: {
          // ----------搜素绑定关键字-----------
          VoltageLevel: '', // 电压关键关键字
          LineName: '', // DL名称关键字
          OperationsTeam: '', // 运行班组关键字
          EquipmentOwner: '', // 设备主人关键字
          // ----------分页关键字-----------
          pageNum: 1,
          limit: 10,
          total: 2
        },
        selection: { // 查询条件集合
          CheckVoltageLevel: [{
            id: '1',
            qb: '全部'
          }], // 电压条件数据
          CheckLineName: [{
            id: '1',
            qb: '全部'
          }], //  DL名称条件数据
          CheckOperationsTeam: [{
            id: '1',
            qb: '全部'
          }], // 运行班组条件数据
          CheckEquipmentOwner: [{
            id: '1',
            qb: '全部'
          }] // 设备主人条件数据
        },
        // 选中的数据
        CheckedSelection: [],
        tabisoverflow: true,

      }
    },
    mounted() {
      // this.getTableList()
      this.HRHTListfun()
      this.setListfun()

    },
    watch:{
     time: {
        handler(newValue, oldValue){
          if (this.activeName == 'first') {
            this.show2 = false
            this.show1 = false
            this.loading=true
            this.HRHTListfun()
          }
          if (this.activeName == 'second') {
            this.getTableList()
            this.loading=true
            this.show2 = false
            this.show1 = false
          }
        },
        deep: true
      },
      Sixtypeshiddendangers: {
        handler(newValue, oldValue){
          if (this.activeName == 'first') {
            this.show2 = false
            this.show1 = false
            this.loading=true
            this.HRHTListfun()
          }
          if (this.activeName == 'second') {
            this.getTableList()
            this.loading=true
            this.show2 = false
            this.show1 = false
          }
        },
        deep: true
      }
    },
    methods: {
      //获取默认下拉数据
      setListfun() {
        const list = {
          nowPage: 1
        }
        setList(qs.stringify(list)).then(response => {
          if (response.status == 200) {
            this.show = true
            this.selection = response.data.rows[0]
          }
        })
      },
      pickerOptions(maxDate, minDate){
        // //console.log(maxDate, minDate)
      },
      getdatefun() {

      },
      getTableList() {

        let list = {
          nowPage: 1,
        }
        if(this.time!==null){
          list.startTime=this.time[0]
          list.endTime=this.time[1]
        }
        if(this.Sixtypeshiddendangers!==null){
          list.sixhdtype=this.Sixtypeshiddendangers
        }
        getList(qs.stringify(list)).then(response => {
          if (response.status == 200) {
            // //console.log(response.data.rows[0],'111111')
            this.listData = response.data.rows[0]
            this.show2 = true
            this.show1 = false
            this.loading=false
            // this.tableData = response.data.rows
            // this.form.total = response.data.total
          }
        })
      },
      HRHTListfun() {
        let list = {
          nowPage: 1,
        }
        if(this.time!==null){
          list.startTime=this.time[0]
          list.endTime=this.time[1]
        }
        if(this.Sixtypeshiddendangers!==null){
          list.sixhdtype=this.Sixtypeshiddendangers
        }
        HRHTList(qs.stringify(list)).then(response => {
          if (response.status == 200) {
            this.barData = response.data.rows[0]
            this.show2 = false
            this.loading=false
            this.show1 = true
            // this.tableData = response.data.rows
            // this.form.total = response.data.total
          }
        })
      },

      handleClick(val) {
        // //console.log(this.activeName)
        if (this.activeName == 'first') {
          this.time=[]
          this.Sixtypeshiddendangers=''
          this.HRHTListfun()
        }
        if (this.activeName == 'second') {
          this.time=[]
          this.Sixtypeshiddendangers=''
          this.getTableList()
        }
      },
      onSearch() {
        //console.log('查询')
      },
      /**
       * 重置按钮
       */
      reset() {
        //console.log('重置按钮')
      },
      // 选中数据
      CheckFun(val) {
        this.CheckedSelection = val
        // //console.log(this.CheckedSelection)
      },
      getList() {}
    }
  }
</script>
