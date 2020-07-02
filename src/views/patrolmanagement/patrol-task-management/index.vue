<template>
  <!-- <h2>巡视任务管理</h2> -->
  <div>
    <div class="main-body">
      <div class="main-userSelect">
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <!-- <el-form-item :label="`${$dydj}:`">
              <el-select v-model="form.kv" clearable placeholder="请选择">
                <el-option v-for="item in selection.voltagesArr" :key="item.id" :label="item.kv" :value="item.id"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item :label="`${$xl}名称:`">
              <el-select v-model="form.lineId" clearable filterable placeholder="请选择">
                <el-option v-for="item in selection.linesArr" :key="item.id" :label="item.lineName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="运维班组:">
              <el-select v-model="form.opsGroup" clearable placeholder="请选择">
                <el-option v-for="item in selection.groupsArr" :key="item.id" :label="item.groupName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="巡视人:">
              <el-select v-model="form.patrolUser" clearable filterable placeholder="请选择">
                <el-option v-for="item in selection.usersArr" :key="item.id" :label="item.username" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="巡视状态:">
              <el-select v-model="form.patrolStatus" clearable placeholder="请选择">
                <el-option v-for="item in selection.patrolStatusArr" :key="item.id" :label="item.patrolStatus" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="计划来源:">
              <el-select v-model="form.planFrom" clearable placeholder="请选择">
                <el-option v-for="item in selection.patrolFromArr" :key="item.id" :label="item.planFrom" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="投运日期：">
              <el-col>
                <el-date-picker v-model="form.date" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item style="float: right;margin-right: 0">
              <el-button class="onSearch" @click="onSearch">查询</el-button>
              <el-button class="onSearch" @click="reset" style="margin-right: 0">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="content">
        <div class="eacher">
          <el-row>
            <el-col>
              <el-card class="tz-box-card">
                <DPile v-if="hasChartData" ref="charts" :id='charts' :option_3d='option' />
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <el-table height="360" :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}" :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}" border fit highlight-current-row>
            <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
            <el-table-column prop="jhxsrq" label="计划巡视日期" align="center"></el-table-column>
            <el-table-column prop="lineName" :label="`${$xl}名称`" align="center"></el-table-column>
            <!-- <el-table-column prop="physicalName" :label="`${$dl}`" align="center" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="groupName" label="运维班组" align="center"></el-table-column>
            <el-table-column prop="patrolUserName" label="巡视人" align="center"></el-table-column>
            <el-table-column label="计划来源" align="center">
              <template slot-scope="scope" class="bottleGreenBtnCon">
                {{scope.row.jhly | patrolFrom(selection.patrolFromArr)}}
              </template>
            </el-table-column>
            <el-table-column label="巡视状态" align="center">
              <template slot-scope="scope" class="bottleGreenBtnCon">
                {{scope.row.xszt | patrolStatus(selection.patrolStatusArr)}}
              </template>
            </el-table-column>
            <el-table-column prop="zxsj" label="执行时间" align="center"></el-table-column>
            <el-table-column prop="address" label="是否超期" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.isTimeout==1?'否':'是'}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button v-if="scope.row.isTimeout!=1" class="onSearch" size="small" @click="AddResult({objId:scope.row.objId,reason:scope.row.reason})">{{scope.row.reason?'编辑超期原因':'添加超期原因'}}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="pageDetail.total>0" :total="pageDetail.total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize" @pagination="getData" />
        </div>
      </div>
    </div>
    <div v-if="isShowDialog">
      <Add @childFn="parentFn" :reasonMsg="reasonMsg" />
    </div>

  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import DPile from '@/views/statusEvaluationManagement/charts/DPile'
import {
  PatrolTaskMainDetail as list,
  PatrolTaskMainPie as pieDetail,
  voltages,
  lines,
  groups,
  users,
  cables, // dl
  patrolWorker, // 巡视人
  patrolStatus, // 巡视状态
  patrolTypes, // 巡视类型
  patrolFrom // 计划来源
} from '@/api/patrolmanagement'
import Add from './add'
export default {
  name: 'CableEquipmentLedger',
  components: {
    Pagination,
    Add,
    DPile
  },
  data() {
    return {
      reasonMsg: {},
      hasChartData: false,
      charts: 'charts', // 图表ID
      isShowDialog: false,
      openID: null,
      form: {
        date: [],
        kv: '',
        lineId: '',
        opsGroup: '',
        patrolStatus: '',
        planFrom: '',
        patrolUser: '',
        pageNum: 1,
        pageSize: 10
      },
      selection: {},
      pageDetail: {
        total: 0
      },
      searchForm: {
        pageNum: 1,
        pageSize: 10
      },
      //选中的数据
      selection: {
        voltagesArr: [], //dydj
        linesArr: [], // dl名称
        groupsArr: [], // 运维班组
        patrolWorker: [], // 巡视人
        patrolTypesArr: [], // 巡视类型
        patrolStatusArr: [], // 巡视状态
        patrolFromArr: [],
        usersArr: [],
        cablesArr: [] // dl
      },
      tableData: []
    }
  },
  created() {
    this.getData()
    voltages().then(res => {
      this.selection.voltagesArr = res.data.data
    })
    lines().then(res => {
      this.selection.linesArr = res.data.data
    })
    groups().then(res => {
      this.selection.groupsArr = res.data.data
    })
    users().then(res => {
      this.selection.usersArr = res.data.data
    })
    patrolStatus().then(res => {
      this.selection.patrolStatusArr = res.data.data
    })
    patrolFrom().then(res => {
      this.selection.patrolFromArr = res.data.data
    })
    patrolTypes().then(res => {
      this.selection.patrolTypesArr = res.data.data
    })
    cables().then(res => {
      this.selection.cablesArr = res.data.data
    })
    this.option = {
      data: [
        // ['Safari', 8.5],
        // ['Opera', 6.2],
        // ['其他', 0.7]
      ]
    }

    pieDetail().then(res => {
      this.$set(this.option, 'data', [
        ['执行中', res.data.data.ing],
        ['未执行', res.data.data.none],
        ['已执行', res.data.data.already]
      ])
      this.hasChartData = true
    })
  },
  mounted() {},
  methods: {
    async getData() {
      // 获取列表数据
      let res = await list(this.searchForm)
      this.tableData = res.data.rows
      this.pageDetail.total = res.data.total
    },
    reset() {
      this.form = {
        date: [],
        kv: '',
        lineId: '',
        opsGroup: '',
        patrolStatus: '',
        planFrom: '',
        patrolUser: '',
        pageNum: 1,
        pageSize: 10
      }
      this.onSearch()
    },
    onSearch() {
      //console.log(this.form)
      for (let key in this.form) {
        this.searchForm[key] = this.form[key] ? this.form[key] : ''
      }
      // if (!!this.form.date) {
      //   this.searchForm.beginTime = this.form.date[0]
      //   this.searchForm.endTime = this.form.date[1]
      //   delete this.searchForm.date
      // }
      if (this.form.date != null) {
        this.searchForm.beginTime = this.form.date[0];
        this.searchForm.endTime = this.form.date[1];
      } else {
        this.searchForm.beginTime = null;
        this.searchForm.endTime = null;
      }

      this.getData()
    },

    /**添加超长期原因 */
    AddResult(val) {
      this.reasonMsg = val
      this.isShowDialog = true
    },
    /**
     * 接收查看/编辑子组件的数据
     */
    parentFn(val) {
      this.isShowDialog = val.showDialog
      this.getData()
    }
  },
}
</script>
<style lang="scss" scoped>
.tz-box-card {
  width: 100%;
  height: 260px;
}
.eacher {
  margin-bottom: 1rem;
}
</style>