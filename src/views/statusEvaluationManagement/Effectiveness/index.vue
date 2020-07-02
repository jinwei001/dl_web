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
              <el-select v-model="Inquire.lineobj" clearable placeholder="请选择" @change="line_changeFun" value-key="id"
                filterable>
                <el-option v-for="(item,index) in selection.linearry" :key="item.id" :label="item.lineName" :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$dydj" prop="voltageRank">
              <el-input v-model="Inquire.voltageRank" disabled />
            </el-form-item>
            <el-form-item label="架设方式" prop="lineType">
              <el-select v-model="Inquire.lineType" clearable placeholder="请选择" @change="line_changeFun" value-key="id"
                filterable>
                <el-option v-for="(item,index) in selection.getLineSelectArry" :key="item.fsfs" :label="item.fsfsmc" :value="item.fsfsmc" />
              </el-select>
            </el-form-item>
            <el-form-item label="投运日期" prop="transportTime">
              <el-date-picker v-model="Inquire.transportTime" type="datetimerange" format="yyyy-MM-dd HH:mm:ss"
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
    <!--    <el-button v-if="CheckedidArry.length>0" type="danger" size="small" plain @click="deleteFun">删除</el-button> -->
      </div>
      <!--数据列表-->
      <el-table :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}"
        :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}" border fit highlight-current-row
        @selection-change="CheckFun">
        <!--表格列-->
        <el-table-column type="selection" width="40" align="center" />
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="lineName" :label="$xl+'名称'" min-width="200" />
        <el-table-column prop="voltageRank" :label="$dydj" min-width="180" />
        <el-table-column prop="groupName" label="运维班组" min-width="150" />
        <el-table-column prop="totalLength" label="长度" min-width="150" />
        <el-table-column prop="lineType" label="架设方式" min-width="180" />
        <el-table-column prop="startPositonName" label="起始位置" min-width="180"/>
        <el-table-column prop="endPositonName" label="终止位置" min-width="180" />
        <el-table-column prop="regularResult" label="评价结果" min-width="150" >
        <template slot-scope="scope">
          <p v-for="(item,index) in selection.Jgarry" :key='index'>
            <span v-if="scope.row.regularResult===item.id">{{item.value}}</span>
          </p>
        </template>
        </el-table-column>
        <el-table-column prop="transportTime" label="投运日期" min-width="150" />
        <!--操作模板-->
        <el-table-column fixed="right" label="操作" min-width="420" align="center" class-name="small-padding fixed-width" v-if="tableParam.total>0">
          <template slot-scope="scope">
            <p style="text-align: center;">
            <el-button class="onSearch" type="primary" size="mini" @click="GZinfoFun(scope.row)">故障说明</el-button>
            <el-button class="onSearch" type="primary" size="mini" @click="Generate_periodic_reviewsFun(scope.row)">老旧{{$dl}}信息</el-button>
            <el-button class="onSearch" type="primary" size="mini" @click="Validity_statementFun(scope.row)">有效性说明</el-button>
            </p>

          </template>
        </el-table-column>
      </el-table>
      <pagination :total="tableParam.total" :page.sync="tableParam.pageNum" :limit.sync="tableParam.limit" @pagination="getList" />
    </div>
    <AddorEditPopups :dialogParameterpg='dialogParameter' @childFn='parentFn' v-if='dialogParameter.showDialog===true'></AddorEditPopups>
  </div>
</template>

<script>
  import {
    list,
    getLineSelect
  } from '@/api/statusE/Effectiveness'
  import {
    line_list,
    group_list,
    sbzrList,

  } from '@/api/statusE/cycle'
  import qs from 'qs'
  import Pagination from '@/components/Pagination'
  import AddorEditPopups from './cmp/AddorEdit-Pop-ups_cmp.vue' //新增编辑合用组件
  export default {
    name: 'CableMaintenance',
    components: {
      Pagination,
      AddorEditPopups
    },
    data() {
      return {
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
          voltageRank: '',
          lineType: '',
          transportTimeStart: '',
          transportTimeEnd: '',
        },
        Inquire: { //列表查询绑定集合
          lineobj: {},
          voltageRank: '',
          transportTime:[], //动态评价
          lineType: []
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
          getLineSelectArry:[],
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
      this.getList()
      this.lineList()
      this.getLineSelectFun()
    },
    methods: {
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
        this.Inquire.voltageRank = '' //线路改变清空dydj
        if (val !== null) { //如果存在才通过xl匹配dydj
          this.Inquire.voltageRank = val.voltageRank
        }
      },
      //获取select架构数据
      getLineSelectFun(){
        getLineSelect().then(response => {
          if (response.status === 200) {
            if (response.data.code === 0) {
              this.selection.getLineSelectArry = response.data.data.fsfsList
            } else {
              this.selection.getLineSelectArry = []
              this.$message({
                message: '架设列表获取失败',
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
        this.tableParam.lineId = this.Inquire.lineobj.id !== 'undefined' ? this.Inquire.lineobj.id : '' //xl
        this.tableParam.voltageRank = this.Inquire.voltageRank //dydj
        this.tableParam.lineType = this.Inquire.lineType //定期评价结果
        this.tableParam.transportTimeStart = this.Inquire.transportTime.length > 0 ? this.Inquire.transportTime[0] : '' //定期开始时间
        this.tableParam.transportTimeEnd = this.Inquire.transportTime.length > 0 ? this.Inquire.transportTime[1] : '' //定期结束时间
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
                message: '有效性列表获取失败',
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
      //老旧
      Generate_periodic_reviewsFun(val) {
        this.dialogParameter = {
          dialogWidth: '80%',
          title: '老旧'+this.$dl+'信息',
          showDialog: true, // 打开弹框
          Details: val,
          selection: this.selection,

        }
      },
      Validity_statementFun(val){
        this.dialogParameter = {
          dialogWidth: '50%',
          title: '有效性',
          showDialog: true, // 打开弹框
          Details: val,
          selection: this.selection,

        }
      },
      GZinfoFun(val){
        this.dialogParameter = {
          dialogWidth: '80%',
          title: '故障信息',
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
