<template>
  <!-- 保电管理-值守任务 -->
  <div v-loading="loading" class="main-body table_style_zj" element-loading-text="拼命加载中">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <div class="search-container">
          <!--查询表单-->
          <el-form ref="Inquire" class="search-form" inline :model="Inquire">
            <el-form-item label="保电名称" prop="name">
              <el-input v-model="Inquire.name" type="text" clearable />
            </el-form-item>
            <el-form-item label="保电等级" prop="grade">
              <el-select v-model="Inquire.grade" clearable placeholder="请选择">
                <el-option v-for="(item,index) in selectData.PowerRatingArry" :key="index" :label="item.value" :value="item.value" />
              </el-select>
            </el-form-item>
            <!--            <el-form-item label="保电任务单" prop="SingleNumber">
              <el-input v-model="Inquire.SingleNumber" type="text" clearable />
            </el-form-item> -->
            <el-form-item label="保电时间" prop="Timeperiod">
              <el-date-picker
                v-model="Inquire.Timeperiod"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 100%;"
              />
            </el-form-item>
          </el-form>
          <!--查询按钮-->-
          <div class="search-buttons">
            <el-button type="primary" size="small" class="onSearch" @click="getList">查询</el-button>
            <el-button type="primary" size="small" class="UserSearchFun" @click="taskButtonResetClick">重置</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <!--数据操作-->
      <div class="record-operation">
        <el-button v-if="shangchuArry.length>0" type="danger" size="small" plain @click="shangchufun">删除</el-button>
      </div>
      <!--数据列表-->
      <el-table
        :data="tableData"
        style="border: 1px solid #c7c7c7"
        :cell-style="{borderColor: '#c7c7c7'}"
        :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}"
        border
        fit
        highlight-current-row
        @selection-change="CheckFun"
      >
        <!--表格列-->
        <el-table-column type="selection" width="40" align="center" />
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="bdmc" label="保电名称" min-width="160" />
        <el-table-column prop="bddj" label="保电等级" min-width="160" />
        <el-table-column prop="xlmc" :label="$xl+'名称'" min-width="180" />
        <el-table-column prop="tdmc" label="通道名称" min-width="450" />
        <el-table-column prop="zsrq" label="值守日期" min-width="180" />
        <el-table-column prop="dljmc" label="井名称" min-width="270" />
        <el-table-column prop="zsbzmc" label="值守班组" min-width="180" />
        <el-table-column prop="zsrmc" label="值守人" min-width="270" />
        <el-table-column prop="zsr" label="人数" min-width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.zsr">{{ (scope.row.zsr).split(",").length }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="zszt" label="值守状态" min-width="120">
          <template slot-scope="scope">

            <span v-if="scope.row.zszt==='0'">未到位</span>
            <span v-else>已到位</span>
          </template>
        </el-table-column>
        <!--操作模板-->
        <el-table-column fixed="right" label="查看值守记录" width="120" align="center">
          <template slot-scope="scope">
            <el-button class="onSearch" type="primary" size="mini" @click="chakang(scope.row.id)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination :total="tableParam.total" :page.sync="tableParam.pageNum" :limit.sync="tableParam.limit" @pagination="getList" />
    </div>

    <!--详情弹框-->
    <el-dialog
      title="井详情"
      :visible.sync="dialogParameter.showDialogDetails"
      :close-on-click-modal="false"
      :width="dialogParameter.dialogWidth"
      min-width="700px"
      center
      :before-close="(value)=> handleClose(value,'2')"
      class="baodianrenwuxianqingbox"
    >
      <!--表单-->
      <el-form ref="taskForm" label-position="right" label-width="180px">
        <el-table
          :data="tableData1"
          style="border: 1px solid #c7c7c7"
          :cell-style="{borderColor: '#c7c7c7'}"
          :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}"
          border
          fit
          highlight-current-row
          @selection-change="CheckFun"
        >
          <!--表格列-->
          <el-table-column type="selection" width="40" align="center" />
          <el-table-column type="index" label="序号" width="50" align="center" />
          <el-table-column prop="dljmc" label="井名称" min-width="120" />
          <el-table-column prop="jd" label="经度" min-width="180" />
          <el-table-column prop="wd" label="纬度" min-width="180" :show-overflow-tooltip="true" />
          <!--操作模板-->
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button class="onSearch" type="primary" size="mini" @click="zhishouxiangqingfun(scope.row.id)">查看</el-button>
              <el-button class="onSearch" type="primary" size="mini" @click="MapOpenfun(scope.row)">地图查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <pagination
        :total="tableParam1.total"
        :page.sync="tableParam1.pageNum"
        :limit.sync="tableParam1.limit"
        @pagination="getList1"
      />
      <div id="all-map" class="map" style="width: 20px;height: 20px;" />

    </el-dialog>
    <add v-if="isShowDialog" :is-show-dialog="isShowDialog" :dakai-i-d="dakaiID" @childFn="parentFn" />
    <Map
      v-if="mapdialogConfiguration.showDialog"
      :mapdialog-configuration-pn="mapdialogConfiguration"
      @childFn1="parentFn"
    />
  </div>
</template>

<script>
import add from './TaskResultManageCmp/add.vue'
import Map from './TaskResultManageCmp/Map.vue'
import {
  keepElectricityDuty_list, // 任务列表
  keepElectricityDuty_remove, // 删除任务
  keepElectricityDutyJing_list // 井列表
} from '@/api/protected-electricity/Performtasks'
import qs from 'qs'
import Pagination from '@/components/Pagination'

export default {
  name: 'TaskManage',
  components: {
    Pagination,
    add,
    Map
  },
  data() {
    return {
      // 地图弹窗参数配置合集
      mapdialogConfiguration: {
        dialogWidth: '60%',
        title: '地图',
        showDialog: false,
        electricWellsdata: {}
      },
      loading: true, // 加载状态
      dakaiID: '', // 分页时需要(水井ID)
      isShowDialog: false, // 打卡详情状态
      SRC: process.env.VUE_APP_BASE_API, // 图片预览地址
      shangchuArry: [], // 勾选数组集合
      selectData: { // 爆灯等级
        PowerRatingArry: [{
          value: '一级'
        }, {
          value: '二级'
        }, {
          value: '三级'
        }]
      },
      tableData: [], // 值守任务列列表数据
      tableData1: [], // 电井列表数据
      tableParam: { // 值守列表分页和查询参数集合
        total: 0,
        pageNum: 1,
        pageSize: 10,
        limit: 10,
        bdmc: '',
        bddj: '',
        bdrwdh: '',
        startTime: '',
        endTime: ''
      },
      tableParam1: { // 电井分页和查询参数集合
        total: 0,
        pageNum: 1,
        pageSize: 10,
        limit: 10,
        bdzsrwid: ''
      },
      Inquire: { // 值守任务列表查询绑定集合
        name: '',
        grade: '',
        SingleNumber: '',
        Timeperiod: []
      },
      // 弹窗参数配置
      dialogParameter: {
        dialogWidth: '60%',
        title: '未知',
        showDialogDetails: false // 打开弹框
      }
    }
  },
  mounted() {
    this.initPage()
    this.getList()
  },
  methods: {

    MapOpenfun(val) {
      this.mapdialogConfiguration.showDialog = true
      this.mapdialogConfiguration.electricWellsdata = val
      this.createMap()
    },
    // 分页时候电井列表获取
    getList1() {
      keepElectricityDutyJing_list(qs.stringify(this.tableParam1)).then(response => {
        if (response.status === 200) {
          if (response.data.code === 0) {
            this.tableData1 = response.data.rows
            this.dialogParameter.showDialogDetails = true
            this.tableParam1.total = response.data.total
          } else {
            this.tableData1 = []
            this.tableParam1.total = 0
            this.$message({
              message: '保电列表获取失败',
              type: 'error'
            })
          }
        }
      })
    },
    // 值守详情关闭弹窗时
    parentFn(val) {
      this.isShowDialog = val.showDialog
      this.mapdialogConfiguration.showDialog = val.showDialog
      this.getList() // 刷新方法
    },
    // 任务值守列表
    getList() {
      // 查询名称赋值
      this.tableParam.bdmc = this.Inquire.name // 保电名称
      this.tableParam.bddj = this.Inquire.grade // 保电等级
      this.tableParam.bdrwdh = this.Inquire.SingleNumber // 保电任务单号
      if (this.Inquire.Timeperiod !== null && this.Inquire.Timeperiod.length > 0) { // 保电时间段
        this.tableParam.startTime = this.Inquire.Timeperiod[0].toString()
        this.tableParam.endTime = this.Inquire.Timeperiod[1].toString()
      } else {
        this.tableParam.startTime = ''
        this.tableParam.endTime = ''
      }
      keepElectricityDuty_list(qs.stringify(this.tableParam)).then(response => {
        if (response.status === 200) {
          if (response.data.code === 0) {
            this.loading = false
            this.tableData = response.data.rows
            this.tableParam.total = response.data.total // 总页数
          } else {
            this.tableData = []
            this.tableParam.total = 0
            this.$message({
              message: '保电列表获取失败',
              type: 'error'
            })
          }
        }
      })
    },
    // 电水井
    chakang(id) {
      const data = {
        bdzsrwid: id
      }
      this.tableParam1.bdzsrwid = id
      keepElectricityDutyJing_list(qs.stringify(data)).then(response => {
        if (response.status === 200) {
          if (response.data.code === 0) {
            this.tableData1 = response.data.rows
            this.dialogParameter.showDialogDetails = true
            this.tableParam1.total = response.data.total
          } else {
            this.tableData1 = []
            // this.tableParam.total = 0
            this.$message({
              message: '保电列表获取失败',
              type: 'error'
            })
          }
        }
      })
    },
    // 打开值守详情
    zhishouxiangqingfun(val) {
      this.dakaiID = val
      this.isShowDialog = true
    },
    // 选中数据处理
    CheckFun(val) {
      this.shangchuArry = []
      const CheckedSelection = val
      if (CheckedSelection.length > 0) {
        for (let i = 0; i < CheckedSelection.length; i++) {
          this.shangchuArry.push(CheckedSelection[i].id)
        }
      }
    },
    // 删除
    shangchufun() {
      const data = {
        ids: this.shangchuArry.toString()
      }
      keepElectricityDuty_remove(qs.stringify(data)).then(response => {
        if (response.status === 200) {
          if (response.data.msg === '操作成功') {
            this.$message({
              message: response.data.msg,
              type: 'success'
            })
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
    /**
       * 初始化页面
       */
    async initPage() {
      // 载入查询参数
      // this.loadQueryParams();
      // 初始化任务列表
      // this.loadTasks();
    },

    /**
       * 查询按钮点击
       */

    /**
       * 重置表单点击
       */
    taskButtonResetClick() {
      this.$refs['Inquire'].resetFields()
      this.$message({
        message: '重置成功',
        type: 'success'
      })
      this.getList()
      // ...
    },
    handleClose(done, num) {
      this.$confirm('确认关闭？')
        .then(_ => {
          if (num === '1') {
            this.$refs['form'].resetFields()
          }
          this.dialogParameter.showDialogDetails = false

          done()
        })
        .catch(_ => {
          //console.log('失败')
        })
    },
    /**
       * 增加按钮点击
       */
    taskButtonAddClick() {
      this.dialogParameter.showDialogadd = true
    },
    /**
       * 详情关闭按钮点击
       */
    taskButtonCloseClick() {
      this.task.detail.dialog.show = false
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
