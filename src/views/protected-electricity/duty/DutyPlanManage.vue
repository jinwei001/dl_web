<template>
  <!-- 保电-计划管理-值守计划 -->
  <div class="main-body">
    <div class="task-container">
      <div :class="taskBarClass">
        <div class="header">保电{{$xl}}段</div>
        <div class="body">
          <div>
            <el-button icon="el-icon-plus" type="primary" size="small" class="onSearch" @click="dutyPlanButtonLineClick">新增</el-button>
          </div>
        </div>
      </div>
      <div class="task-content">
        <!--数据操作-->
        <div class="record-operation">
          <el-button icon="el-icon-plus" type="primary" size="small" class="onSearch" @click="dutyPlanButtonLineClick">新增</el-button>
          <el-button v-if="shangchuArry.length>0" icon="el-icon-close" type="danger" size="small" plain @click="shangchufun">删除</el-button>
          <el-button icon="el-icon-back" type="primary" size="small" class="onSearch" @click="backfun()">返回</el-button>
          <el-button v-if="shangchuArry.length>0" type="primary" size="small" @click="dutyPlanButtonGenerateClick">生成值守任务</el-button>
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
          <el-table-column prop="jhxsksrq" label="值守开始时间日期" min-width="180" />
          <el-table-column prop="jhxsjsrq" label="值守结束时间巡视日期" min-width="180" />
          <!-- //XL -->
          <el-table-column prop="xlmc" :label="$xl+'名称'" min-width="160" />
          <el-table-column prop="tdmc" label="通道名称" min-width="420" />
          <el-table-column prop="dljmc" label="井名称" min-width="180" />
          <el-table-column prop="zsbzmc" label="值守班组" min-width="120" />
          <el-table-column prop="zsrmc" label="值守人" min-width="190" />
          <el-table-column prop="zsr" label="值守人数" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.zsr">{{ (scope.row.zsr).split(",").length }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="sfsc" label="是否生成任务" min-width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.sfsc==='0'">未生成</span>
              <span v-else>已生成</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120" align="center">
            <template slot-scope="scope">
              <el-button v-if="scope.row.sfsc==='0'" class="onSearch" type="primary" size="mini" @click="dutyPlanButtonEditClick(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          :total="tableParam.total"
          :page.sync="tableParam.pageNum"
          :limit.sync="tableParam.limit"
          @pagination="getList"
        />
      </div>
    </div>
    <!--表单弹框-->
    <el-dialog
      v-if="dialogParameter.showDialog===true"
      :title="dialogParameter.title"
      :visible.sync="dialogParameter.showDialog"
      :close-on-click-modal="false"
      min-width="500px"
      :width="dialogParameter.dialogWidth"
      center
      :before-close="(value)=> handleClose(value,'1')"
    >
      <!--表单-->
      <el-form ref="form" :model="form" :rules="formRules" label-position="right" label-width="150px">
        <el-form-item label="计划巡视日期" class="el-form-itemstyle" prop="Timeperiod">
          <el-date-picker
            v-model="form.Timeperiod"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item :label="$xl+'名称'" class="el-form-itemstyle" prop="xlobj">
          <el-select v-model="form.xlobj" clearable placeholder="请选择" value-key="id" @change="xianlufun">
            <el-option v-for="item in JSON.parse(selectData.yingHuanlist)" :key="item.id" :label="item.value" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="通道名称" class="el-form-itemstyle" prop="tdobj.objId">
          <el-select
            v-model="form.tdobj"
            clearable
            placeholder="请选择"
            :filter-method="filterList"
            filterable
            value-key="objId"
            @change="jinFun"
          >
            <el-option v-for="(item) in selectData.tDlist" :key="item.objId" :label="item.sdmc" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="井名称" class="el-form-itemstyle" prop="dlj">
          <el-select v-model="form.dlj" clearable placeholder="请选择" multiple>
            <el-option v-for="(item) in selectData.dljlist" :key="item.objId" :label="item.sbbm" :value="item.objId" />
          </el-select>
        </el-form-item>
        <el-form-item label="值守班组" class="el-form-itemstyle" prop="zsbzobj">
          <el-select v-model="form.zsbzobj" clearable placeholder="请选择" value-key="id" @change="FXbzchangeFun">
            <el-option v-for="(item) in selectData.banzulist" :key="item.id" :label="item.value" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="值守人" class="el-form-itemstyle" prop="zsr">
          <el-select v-model="form.zsr" clearable placeholder="请选择" multiple>
            <el-option v-for="(item) in selectData.uselist" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="dialogParameter.title==='新增'" type="primary" size="small" class="onSearch" @click="addfun">保存</el-button>
        <el-button v-else type="primary" size="small" class="onSearch" @click="editfun">保存</el-button>
        <el-button type="default" size="small" class="UserSearchFun" @click="(value)=> handleClose(value,'1')">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  keepElectricityPlan_list,
  channel_channelList,
  workWell_list,
  keepElectricityPlan_add,
  keepElectricityPlan_edit,
  keepElectricityPlan_remove,
  keepElectricityDuty_add
} from '@/api/protected-electricity/taskjiahu'
import {
  setList,
  userList
} from '@/api/Sixdefensemanagement/HiddenDangerReview'
import Pagination from '@/components/Pagination'
import qs from 'qs'
export default {
  name: 'DutyPlanManage',
  components: {
    Pagination
  },
  props: {
    taskidname: {
      type: Object,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      shangchuArry: [],
      selectData: {
        tDlist: [],
        alltDlist: [],
        dljlist: [],
        banzulist: [],
        uselist: [],
        yingHuanlist: []
      },
      form: {
        Timeperiod: '',
        xlid: '',
        xlmc: '',
        xlobj: '',
        tdobj: '',
        tdmc: '',
        tdid: '',
        dlj: [],
        zsbzobj: '',
        zsbzmc: '',
        zsbzid: '',
        zsr: [],
        jhxsksrq: '',
        jhxsjsrq: ''

      },
      formRules: {
        Timeperiod: [{
          required: true,
          message: '计划值守日期',
          trigger: 'change'
        }],
        xlobj: [{
          required: true,
          message: '请输入'+this.$xl,
          trigger: 'change'
        }],
        'tdobj.objId': [{
          required: true,
          message: '请输入通道名称',
          trigger: 'change'
        }],
        dlj: [{
          required: true,
          message: '请选择井名称',
          trigger: 'change'
        }],
        zsbzobj: [{
          required: true,
          message: '请选择班组',
          trigger: 'change'
        }],
        zsr: [{
          required: true,
          message: '请选择值守人',
          trigger: 'change'
        }]
      },
      tableData: [],
      tableParam: {
        bdrwid: this.taskidname.id,
        total: 0,
        pageNum: 1,
        pageSize: 10,
        limit: 10
      },
      Inquire: {},
      // 弹窗参数配置
      dialogParameter: {
        dialogWidth: '30%',
        title: '未知',
        showDialog: false // 打开弹框
      },
      // 边栏开关
      barToggle: false,
      // 保电值守计划
      dutyPlan: {
        // 查询
        query: {
          // 参数
          params: {
            // 计划巡视日期
            date: '',
            // XL名称
            lineName: '',
            // dl
            cable: '',
            // 运维班组
            operationTeam: '',
            // 巡视人
            inspector: '',
            // 计划来源
            planSource: '',
            // 巡视状态
            patrolStatus: '',
            // 当前页
            page: 1
          }
        },
        // 表单
        form: {
          // 模态框
          dialog: {
            // 是否显示
            show: false,
            // 标题
            title: ''
          },
          // 模型
          model: {
            // ID
            id: null,
            // 计划巡视日期
            date: null,
            // XL名称
            lineName: null,
            // dl
            cable: null,
            // 运维班组
            operationTeam: null,
            // 巡视人
            inspector: null,
            // 计划来源
            planSource: null,
            // 巡视状态
            patrolStatus: null
          }
        },
        // 记录
        record: {
          // 记录总数
          total: 3,
          // 记录集
          items: [{
            date: '5770',
            lineName: '1221',
            cable: '7129',
            operationTeam: '1249',
            inspector: '3021',
            planSource: '5005',
            patrolStatus: '1142'
          },
          {
            date: '8577',
            lineName: '1116',
            cable: '8258',
            operationTeam: '5325',
            inspector: '3271',
            planSource: '4440',
            patrolStatus: '2718'
          },
          {
            date: '7835',
            lineName: '2750',
            cable: '6979',
            operationTeam: '9724',
            inspector: '2147',
            planSource: '2936',
            patrolStatus: '4471'
          }
          ]
        }
      }
    }
  },
  computed: {
    /**
       * 边栏类
       */
    taskBarClass() {
      const className = 'task-bar'
      let barClassName = ''
      if (this.barToggle) {
        barClassName = ' task-bar-opened'
      }
      return `${className}${barClassName}`
    }
  },
  mounted() {
    this.initPage()
    this.getList()
    this.tongdaoList()
    this.setListfun()
  },
  methods: {
    /**
       * 初始化页面
       */
    async initPage() {
      // 载入查询参数
      // this.loadQueryParams();
      // 初始化保电值守计划列表
      // this.loadDutyPlans();
    },
    getList() {
      keepElectricityPlan_list(qs.stringify(this.tableParam)).then(response => {
        if (response.status === 200) {
          if (response.data.code === 0) {
            // this.$message({
            //   message: '保电列表获取成功',
            //   type: 'success'
            // })
            this.tableData = response.data.rows
            this.tableParam.total = response.data.total
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
    tongdaoList() {
      const data = {
        lineId: ''
      }
      if (this.form.xlid !== '') {
        data.lineId = this.form.xlid

        channel_channelList(qs.stringify(data)).then(response => {
          if (response.status === 200) {
            if (response.data.code === 0) {
              this.$message({
                message: '通道列表获取成功',
                type: 'success'
              })
              if (response.data.rows.length > 0) {
                this.selectData.alltDlist = response.data.rows
                if (this.selectData.alltDlist.length > 20) {
                  this.selectData.tDlist = this.selectData.alltDlist.slice(0, 20)
                } else {
                  this.selectData.tDlist = this.selectData.alltDlist
                }
              } else {
                this.selectData.alltDlist = []
                this.selectData.tDlist = []
                this.form.tdobj = {}
              }
            } else {
              this.$message({
                message: '井列表获取失败',
                type: 'error'
              })
            }
          }
        })
      } else {
        this.selectData.alltDlist = []
        this.selectData.tDlist = []
        this.form.tdobj = {}
      }
    },
    filterList(query = '') {
      const arr = this.selectData.alltDlist.filter(item => {
        return item.sdmc.includes(query) || item.objId.includes(query)
      })
      if (arr.length > 20) {
        this.selectData.tDlist = arr.slice(0, 20)
      } else {
        this.selectData.tDlist = arr
      }
    },
    // 获取默认下拉数据
    setListfun() {
      this.selectData.yingHuanlist =this.taskidname.bdxl
      const list = {
        nowPage: 1
      }
      setList(qs.stringify(list)).then(response => {
        if (response.status === 200) {
          this.selectData.banzulist = response.data.rows[0].banZu
          // this.selectData.yingHuanlist = response.data.rows[0].yingHuan
        }
      })
    },
    // 发现班组改变时带出大学人员
    FXbzchangeFun(item) {
      if (item) {
        this.form.zsr = []
        this.selectData.uselist = []
        const data = {
          groupname: item.value // 发现班组id
        }
        this.form.zsbzid = item.id
        this.form.zsbzmc = item.value
        userList(qs.stringify(data)).then(response => {
          if (response.status === 200) {
            if (response.data.msg === '操作成功') {
              this.selectData.uselist = response.data.data // dl下拉
            } else {
              this.$message({
                message: '人员列表获取失败',
                type: 'error'
              })
            }
          }
        })
      } else {
        this.form.zsr = []
        this.form.zsbzid = ''
        this.form.zsbzmc = ''
        this.selectData.uselist = []
      }
    },
    xianlufun(val) {
      if (val) {
        this.form.xlid = val.id
        this.form.xlmc = val.value
      } else {
        this.form.xlid = ''
        this.form.xlmc = ''
      }
      this.tongdaoList()
    },
    // 发现通道改变时带出井
    jinFun(item) {
      if (item) {
        this.form.tdmc = item.sdmc
        this.form.tdid = item.objId
      } else {
        this.form.tdmc = ''
        this.form.tdid = ''
      }

      this.form.dlj = []
      this.selectData.dljlist = []
      const data = {
        sssdgd: this.form.tdid // 发现班组id
      }
      workWell_list(qs.stringify(data)).then(response => {
        if (response.status === 200) {
          //console.log(response.data.code)
          if (response.data.code === 0) {
            this.selectData.dljlist = response.data.rows // DL下拉
          } else {
            this.$message({
              message: '井下拉列表获取失败',
              type: 'error'
            })
          }
        }
      })
    },
    addfun() {
      if (this.form.Timeperiod !== null && this.form.Timeperiod.length > 0) {
        this.form.jhxsksrq = this.form.Timeperiod[0].toString()
        this.form.jhxsjsrq = this.form.Timeperiod[1].toString()
      }
      if (this.form.dlj.length > 0) {
        this.form.dlj = this.form.dlj.toString()
      }
      if (this.form.zsr.length > 0) {
        this.form.zsr = this.form.zsr.toString()
      }

      this.form.bdrwid = this.taskidname.id
      this.$refs.form.validate((valid) => {
        if (valid) {
          keepElectricityPlan_add(qs.stringify(this.form)).then(response => {
            if (response.status === 200) {
              if (response.data.msg === '操作成功') {
                this.$message({
                  message: response.data.msg,
                  type: 'success'
                })
                this.$refs['form'].resetFields()
                this.dialogParameter.showDialog = false

                this.getList()
              } else {
                this.$message({
                  message: response.data.msg,
                  type: 'error'
                })
              }
            }
          })
        }
      })
    },
    editfun() {
      if (this.form.Timeperiod !== null && this.form.Timeperiod.length > 0) {
        this.form.jhxsksrq = this.form.Timeperiod[0].toString()
        this.form.jhxsjsrq = this.form.Timeperiod[1].toString()
      }
      this.form.dlj = this.form.dlj.toString()
      this.form.zsr = this.form.zsr.toString()
      this.$refs.form.validate((valid) => {
        if (valid) {
          keepElectricityPlan_edit(qs.stringify(this.form)).then(response => {
            if (response.status === 200) {
              if (response.data.msg === '操作成功') {
                this.$message({
                  message: response.data.msg,
                  type: 'success'
                })
                this.$refs['form'].resetFields()
                this.dialogParameter.showDialog = false

                this.getList()
              } else {
                this.$message({
                  message: response.data.msg,
                  type: 'error'
                })
              }
            }
          })
        }
      })
    },
    handleClose(done, num) {
      this.$confirm('确认关闭？')
        .then(_ => {
          if (num === '1') {
            this.$refs['form'].resetFields()
          }
          this.dialogParameter.showDialog = false

          done()
        })
        .catch(_ => {
          //console.log('失败')
        })
    },
    backfun() {
      this.$emit('childFn2', {
        back: false // 成功后告诉父组件刷新
      })
    },
    /**
       * 查询按钮点击
       */
    dutyPlanButtonQueryClick() {
      // ...
    },

    /**
       * 重置表单点击
       */
    dutyPlanButtonResetClick() {
      // ...
    },

    /**
       * XL段增加按钮点击
       */
    dutyPlanButtonLineClick() {
      this.dialogParameter.showDialog = true
      this.dialogParameter.title = '新增'
    },

    /**
       * 增加按钮点击
       */
    dutyPlanButtonAddClick() {
      this.barToggle = !this.barToggle
    },

    /**
       * 返回按钮点击
       */
    dutyPlanButtonBackClick() {
      // ...
    },

    /**
       * 生成按钮点击
       */
    dutyPlanButtonGenerateClick() {
      const data = {
        ids: this.shangchuArry.toString() // 发现班组id
      }
      keepElectricityDuty_add(qs.stringify(data)).then(response => {
        if (response.status === 200) {
          if (response.data.msg === '操作成功') {
            this.selectData.uselist = response.data.data // DL下拉
            this.$message({
              message: response.data.msg,
              type: 'success'
            })
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
       * 取消保存按钮点击
       */
    dutyPlanButtonCancelSaveClick() {
      this.dialogParameter.showDialog = false
    },

    /**
       * 保存按钮点击
       */
    dutyPlanButtonSaveClick() {
      this.$message('保存成功')
    },

    /**
       * 编辑按钮点击
       * @param row 行数据
       */
    dutyPlanButtonEditClick(row) {
      this.form = {
        Timeperiod: [row.jhxsksrq, row.jhxsjsrq],
        xlid: row.xlid,
        xlmc: row.xlmc,
        xlobj: {
          id: row.xlid,
          value: row.xlmc
        },
        tdobj: {
          objId: row.tdid,
          sdmc: row.tdmc
        },
        tdmc: row.tdmc,
        tdid: row.tdid,
        dlj: [

        ],
        zsbzobj: {
          id: row.zsbzid,
          value: row.zsbzmc
        },
        zsbzid: row.zsbzid,
        zsbzmc: row.zsbzmc,
        zsr: [],
        jhxsksrq: row.jhxsksrq,
        jhxsjsrq: row.jhxsjsrq,
        id: row.id

      }
      this.tongdaoList()
      this.jinFun(this.form.tdobj)
      this.FXbzchangeFun(this.form.zsbzobj)
      this.form.dlj = row.dlj.split(',')
      this.form.zsr = row.zsr.split(',')
      this.dialogParameter.showDialog = true
      this.dialogParameter.title = '编辑'
    },
    // 选中数据
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
      keepElectricityPlan_remove(qs.stringify(data)).then(response => {
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
       * 删除按钮点击
       * @param row 行数据
       */
    dutyPlanButtonRemoveClick(row) {
      if (!confirm('确定删除吗？删除后无法恢复')) {
        return
      }
      this.$message('删除成功')
    }
  }
}
</script>

<style lang="scss">
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
