<template>
  <div class="main-body">
    <!-- <div>定期评价首页</div> -->
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <div class="search-container">
          <!--查询表单-->
          <el-form ref="Inquire" class="search-form" inline :model="Inquire">
            <!--    //XL -->
            <el-form-item :label="$xl+'名称'" prop="lineobj">
              <el-select v-model="Inquire.lineobj" clearable placeholder="请选择" @change="line_changeFun" value-key="id" filterable>
                <el-option v-for="(item,index) in selection.linearry" :key="item.id" :label="item.lineName" :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$dydj" prop="voltageRank">
              <el-input v-model="Inquire.voltageRank" disabled />
            </el-form-item>
   <!--         <el-form-item label="最新评价结果" prop="newestResult">
              <el-select v-model="Inquire.newestResult" clearable placeholder="请选择">
                <el-option v-for="(item,index) in selection.Jgarry" :key="item.id" :label="item.value" :value="item.value" />
              </el-select>
            </el-form-item> -->
            <el-form-item label="定期评价结果" prop="regularResult">
              <el-select v-model="Inquire.regularResult" clearable placeholder="请选择" filterable>
                <el-option v-for="(item,index) in selection.Jgarry" :key="item.id" :label="item.value" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="定期评价日期" prop="regularDate">
              <!--    <el-date-picker v-model="Inquire.regularDate" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="daterange"
                range-separator=" 至 " start-placeholder="开始日期" end-placeholder="结束日期" /> -->
              <el-date-picker v-model="Inquire.regularDate" type="datetimerange" format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss" range-separator="-" :picker-options="pickerOptions" :default-time="['00:00:00','23:59:59']"
                start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="动态评价结果" prop="dynamicResult">
              <el-select v-model="Inquire.dynamicResult" clearable placeholder="请选择" filterable>
                <el-option v-for="(item,index) in selection.Jgarry" :key="item.id" :label="item.value" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="动态评价日期" prop="dynamicDate">
                <el-date-picker v-model="Inquire.dynamicDate" type="datetimerange" format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss" range-separator="-" :picker-options="pickerOptions" :default-time="['00:00:00','23:59:59']"
                  start-placeholder="开始日期" end-placeholder="结束日期">
                 </el-date-picker>
            </el-form-item>
          </el-form>
          <!--查询按钮-->-
          <div class="search-buttons">
            <el-button type="primary" size="small" class="onSearch" @click="getList">查询</el-button>
            <el-button type="primary" size="small" class="UserSearchFun" @click="ClickResetFun">重置</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <!--数据操作-->
      <div class="record-operation">
        <el-button type="primary" size="small" plain @click="addFun" class="onSearch">新增</el-button>
        <el-button v-if="CheckedidArry.length>0" type="danger" size="small" plain @click="deleteFun">删除</el-button>
      </div>
      <!--数据列表-->
      <el-table :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}"
        :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}" border fit highlight-current-row
        :row-style="tableRowStyle"
        @selection-change="CheckFun">
        <!--表格列-->
        <el-table-column type="selection" width="40" align="center" />
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="xlmc" :label="$xl+'名称'" min-width="200" />
        <el-table-column prop="dydj" :label="$dydj" min-width="180" />
        <el-table-column prop="ywbz" label="运维班组" min-width="250" />
        <el-table-column prop="regularEvaluator" label="定期评价人" min-width="150" />
        <el-table-column prop="regularResult" label="定期评价结果" min-width="150">
          <template slot-scope="scope">
            <p v-for="(item,index) in selection.Jgarry" :key='index'>
              <span v-if="scope.row.regularResult===item.id">{{item.value}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="regularDate" label="定期评价日期" min-width="180" />
        <el-table-column prop="dynamicResult" label="动态评价结果" min-width="150">
          <template slot-scope="scope">
            <p v-for="(item,index) in selection.Jgarry" :key='index'>
              <span v-if="scope.row.dynamicResult===item.id">{{item.value}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="dynamicDate" label="动态评价日期" min-width="180" />
        <el-table-column prop="tyrq" label="投运日期" min-width="180" />
        <!--操作模板-->
        <el-table-column fixed="right" label="操作" min-width="320" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
              <el-button class="onSearch" type="primary" size="mini" @click="editpd(scope.row)">修改判断依据</el-button>

            <el-button class="onSearch" type="primary" size="mini" @click="editFun(scope.row)" v-if="scope.row.ifRegular===1">编辑定期评价</el-button>
            <el-button class="onSearch" type="primary" size="mini" @click="Generate_periodic_reviewsFun(scope.row)"
              v-else>生成定期评价</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="tableParam.total" :page.sync="tableParam.pageNum" :limit.sync="tableParam.limit" @pagination="getList" />
    </div>
    <AddorEditPopups :dialogParameterpg='dialogParameter' @childFn='parentFn' v-if='dialogParameter.showDialog===true'></AddorEditPopups>
    <div v-if="addshow">
      <addshow  @childFn='parentFn' :openobj="openobj"/>
    </div>
  </div>
</template>

<script>
  import {
    list, // 删除任务
    remove
  } from '@/api/statusE/regular'
  import {
    line_list,
    group_list,
    sbzrList,

  } from '@/api/statusE/cycle'
  import qs from 'qs'
  import Pagination from '@/components/Pagination'
  import AddorEditPopups from './cmp/AddorEdit-Pop-ups_cmp.vue' //新增编辑合用组件
  import addshow from "./add"
  export default {
    name: 'CableMaintenance',
    components: {
      Pagination,
      AddorEditPopups,
      addshow
    },
    data() {
      return {
        addshow:false,
        openobj:{},
        pickerOptions: {

          disabledDate: (time) => {

            // 如果函数里处理的数据比较麻烦,也可以单独放在一个函数里,避免data数据太臃肿
            return this.dealDisabledDate(time);
          }
        },
        CheckedidArry: [],
        tableData: [], // 值守任务列列表数据
        tableData1: [], // 电井列表数据
        DLlist: [],
        tableParam: { // 值守列表分页和查询参数集合
          total: 0,
          pageNum: 1,
          pageSize: 10,
          limit: 10,
          lineId: '',
          dydj: '',
          dynamicResult: '', //动态评价结果
          regularResult: '', //定期评价结果
          regularDateB: '',
          regularDateE: '',
          dynamicDateB: '',
          dynamicDateE: '',
        },
        Inquire: { //列表查询绑定集合
          lineobj: '',
          voltageRank: '',
          dynamicResult: '', //动态评价
          dynamicDate: [],
          regularResult: '', //定期
          regularDate: []
        },
        // 弹窗参数配置
        dialogParameter: {
          dialogWidth: '60%',
          title: '未知',
          showDialog: false, // 打开弹框
          Details: {}
        },
        selection: { //下拉数据集合
          linearry: [], //线路
          BZarry: [], //班组
          sbzrarry: [], //设备主人
          Jgarry: [{
            id: 1,
            value: '正常状态'
          }, {
            id: 2,
            value: '注意状态'
          }, {
            id: 3,
            value: '异常状态'
          }, {
            id: 4,
            value: '严重状态'
          }],
        }
      }
    },
    mounted() {

      var yourtime='2009-12-10';

      yourtime = yourtime.replace(/-/g,"/");//替换字符，变成标准格式
      var d2=new Date();//取今天的日期
      var d1 = new Date(Date.parse(yourtime));
      //alert(d1);
      //alert(d2);
      if(d1<d2){
        console.log(yourtime-1)
        // alert("开始大于结束");
}
      this.getList()
      this.lineList()
      this.BZList()
      this.sbzrListFun()
    },
    methods: {
        editpd(val) {
          this.addshow = true;
          this.openobj = val
      console.log("val :>> ", val);
    },
      // 修改table tr行的背景色
      tableRowStyle({ row, rowIndex }) {
        if(row.ifOverDueWarn===1){
            return "background-color: #ffc3cb";
        }
        if(row.ifEarlyWarn===1){
          return "background-color: #edf0c5";
        }
      },
      //==============================================【搜索栏目相关函数】==============================================
      //获取线路select数据
      lineList() {
        let data = {
          lineNature: '主线'
        }

        line_list(qs.stringify(data)).then(response => {
          if (response.status === 200) {
            if (response.data.code === 0) {
              this.selection.linearry = response.data.rows
            } else {
              this.selection.linearry = []
              this.$message({
                message: '线路列表获取失败',
                type: 'error'
              })
            }
          }
        })
      },
      //线路改变获取电压等级
      line_changeFun(val) {
        this.Inquire.voltageRank = ''//线路改变清空dydj
        if (val!==null) {//如果存在才通过xl匹配dydj
          this.Inquire.voltageRank = val.voltageRank
        }
      },
      //获取班组select数据
      BZList() {
        group_list().then(response => {
          if (response.status === 200) {
            if (response.data.code === 0) {
              this.selection.BZarry = response.data.rows
            } else {
              this.selection.BZarry = []
              this.$message({
                message: '班组列表获取失败',
                type: 'error'
              })
            }
          }
        })
      },
      //获取设备主人select数据（人员）
      sbzrListFun() {
        sbzrList().then(response => {
          if (response.status === 200) {
            if (response.data.code === 0) {
              this.selection.sbzrarry = response.data.data
            } else {
              this.selection.sbzrarry = []
              this.$message({
                message: '设备主人列表获取失败',
                type: 'error'
              })
            }
          }
        })
      },
      //检索时间段时间类型转化
      dealDisabledDate(time) {
        // time 是一个new Date数据
        if (new Date(time).getTime() > new Date().getTime()) {
          return time.getTime() >= (new Date().getTime()); //时间范围必须是时间戳
        }
      },
      //重置
      ClickResetFun() {
        this.$refs['Inquire'].resetFields()
        this.$message({
          message: '重置成功',
          type: 'success'
        })
        this.getList()
      },
 //==============================================【列表栏目相关函数】==============================================
      //获取列表列表
      getList() {
        // 列表检索区
        // ----------------------------------------------------------------------------------------------------
        this.tableParam.lineId = this.Inquire.lineobj.id !== 'undefined' ? this.Inquire.lineobj.id : ''//xl
        this.tableParam.dydj = this.Inquire.voltageRank//dydj
        this.tableParam.regularResult= this.Inquire.regularResult//定期评价结果
        this.tableParam.dynamicResult= this.Inquire.dynamicResult//动态评价结果
        this.tableParam.regularDateB = this.Inquire.regularDate.length > 0 ? this.Inquire.regularDate[0]:''//定期开始时间
        this.tableParam.regularDateE = this.Inquire.regularDate.length > 0 ? this.Inquire.regularDate[1]:''//定期结束时间
        this.tableParam.dynamicDateB = this.Inquire.dynamicDate.length > 0 ? this.Inquire.dynamicDate[1]:''//动态开始时间
        this.tableParam.dynamicDateE = this.Inquire.dynamicDate.length > 0 ? this.Inquire.dynamicDate[1]:''//动态结束时间
       // ------------------------------------------------------------------------------------------------------
       // 列表数据获取区
        list(qs.stringify(this.tableParam)).then(response => {
          if (response.status === 200) {
            if (response.data.code === 0) {
              this.tableData = response.data.rows
              this.tableParam.total = response.data.total
            } else {
              this.tableData = []
              this.tableParam.total = 0
              this.$message({
                message: '定期列表获取失败',
                type: 'error'
              })
            }
          }
        })
      },
      // 选中数据处理
      CheckFun(val) {
        this.CheckedidArry = []
        const CheckedSelection = val
        if (CheckedSelection.length > 0) {
          for (let i = 0; i < CheckedSelection.length; i++) {
            this.CheckedidArry.push(CheckedSelection[i].id)
          }
        }
      },
      //删除
      deleteFun() {
        const data = {
          ids: this.CheckedidArry.toString()
        }
        remove(qs.stringify(data)).then(response => {
          if (response.status == 200) {
            if (response.data.msg == '操作成功') {
              this.$message({
                message: response.data.msg,
                type: 'success'
              })
              this.CheckedidArry = []
              this.getList()
            } else {
              this.$message({
                message: response.data.msg,
                type: 'error'
              })
            }
          }
        })

      },
      //生成定期评价
      Generate_periodic_reviewsFun(val) {
        this.dialogParameter = {
          dialogWidth: '80%',
          title: '新增报告',
          showDialog: true, // 打开弹框
          Details: val,
          selection: this.selection,

        }
      },
      //新增
      addFun() {
        this.dialogParameter = {
          dialogWidth: '50%',
          title: '新增',
          showDialog: true, // 打开弹框
          Details: {},
          selection: this.selection
        }
      },
      //编辑
      editFun(val) {
        this.dialogParameter = {
          dialogWidth: '80%',
          title: '编辑报告',
          showDialog: true, // 打开弹框
          Details: val,
          selection: this.selection
        }
        console.log(this.dialogParameter)
      },
      //弹出回调
      parentFn(val) {
        this.dialogParameter.showDialog = val.showDialog
        this.addshow = val.showDialog
        this.getList()
        this.dialogParameter = {
          dialogWidth: '60%',
          title: '未知',
          showDialog: false,
          Details: {}
        }
      }
    }
  }
</script>
<style lang="scss">
  .table_style_zj {

    .el-table td,
    .el-table th {
      text-align: center;
    }
  }

  .el-form-itemstyle {
    margin-bottom: 20px;
  }

  .baodianrenwuxianqingbox {
    .el-form-item__label {
      font-size: 15px;
    }

    .el-form-item__content {
      font-size: 17px;
    }
  }
</style>
