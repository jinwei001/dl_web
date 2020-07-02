<template>
  <!-- <h2>
      XL巡视计划管理
  </h2>-->
  <div class="main-body">
    <!--    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="form" inline>
          <el-form-item label="DYDJ:">
            <el-select v-model="form.kv" clearable placeholder="请选择">
              <el-option v-for="item in selection.voltagesArr" :key="item.id" :label="item.kv" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="XL名称:">
            <el-select v-model="form.lineId" clearable placeholder="请选择">
              <el-option v-for="item in selection.linesArr" :key="item.id" :label="item.lineName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运维班组:">
            <el-select v-model="form.opsGroup" clearable placeholder="请选择">
              <el-option v-for="item in selection.groupsArr" :key="item.id" :label="item.groupName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="巡视人:">
            <el-select v-model="form.patrolUser" clearable placeholder="请选择">
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
          <el-form-item label="巡视类型:">
            <el-select v-model="form.patrolType" clearable placeholder="请选择">
              <el-option v-for="item in selection.patrolTypesArr" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计划巡视时间：">
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
    </div> -->
    <div class="content">
      <div class="respont-content">
        <el-form>
          <el-col>
            <el-form-item style="float: left;">
              <el-button class="onSearch" @click="Addfun">
                <i class="el-icon-plus">新增</i>
              </el-button>
              <el-button type="danger" plain @click="DelAllFn" v-if="shangchuArry.length>0">
                <i class="el-icon-close"></i> 删除
              </el-button>
<!--              <el-button class="onSearch" @click="shangchengfun" v-if="shangchuArry.length>0">
                <i class="el-icon-plus"> 生成巡视检测计划</i>
              </el-button> -->
              <el-button type="primary" @click="upload" v-if="shangchuArry.length>0">导出巡视记录</el-button>
             <el-button class="onSearch" @click="backfun" icon="el-icon-back" style="text-align: right;">
               后退
             </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="tableData" height="600" style="border: 1px solid #c7c7c7;width:100%" :cell-style="{borderColor: '#c7c7c7'}"
          :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}" border fit highlight-current-row
          @selection-change="CheckFun">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{(searchForm.pageNum - 1) * 10 + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$xl+'名称'" align="center" prop="lineName"></el-table-column>
          <!-- <el-table-column :label="`${$dl}`" align="center" prop="physicalName" width="200" show-overflow-tooltip></el-table-column> -->
          <el-table-column label="计划巡视日期" align="center" prop="jhxsrq" width="200"></el-table-column>
          <el-table-column label="运维班组" align="center" prop="groupName"></el-table-column>
          <el-table-column label="巡视人" align="center" prop="patrolUserName"></el-table-column>
          <!--          <el-table-column label="计划来源" align="center">
            <template slot-scope="scope" class="bottleGreenBtnCon">
              {{scope.row.jhly | patrolFrom(selection.patrolFromArr)}}
            </template>
          </el-table-column> -->
          <el-table-column :label="$dydj" align="center" prop="voltageRank"></el-table-column>
          <el-table-column label="巡视状态" align="center">
            <template slot-scope="scope" class="bottleGreenBtnCon">
              {{scope.row.xszt | patrolStatus(selection.patrolStatusArr)}}
            </template>
          </el-table-column>
          <!-- <el-table-column label="执行时间" align="center" prop="zxsj" width="180"></el-table-column> -->
          <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-col>
                <el-button class="onSearch" size="small" @click="editFun(scope.row.objId)">编辑</el-button>

              </el-col>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="pageDetail.total>0" :total="pageDetail.total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize"
          @pagination="getData" />
      </div>
    </div>

    <div v-if="isShowDialog">

      <add :selection='selection' @childFn="parentFn" :isEdit="isEdit" :openID="openID" :objId="objId" :lineid='lineid' />
    </div>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import {
    jcbzSelect // 检测班组
  } from '@/api/liveDetectionManage'
  import Add from './add'
  import qs from 'qs'
  import {
    Message
  } from 'element-ui'
  import {
    PatrolPlanManagementList as list,
    PatrolPlanManagementDel as delData,
    voltages,
    lines,
    groups,
    users,
    cables, // DL
    patrolWorker, // 巡视人
    patrolStatus, // 巡视状态
    patrolTypes, // 巡视类型
    patrolFrom, // 计划来源
    planLineUpload // 导出
  } from '@/api/patrolmanagement'
  import {
    tHiddendangerMessageCreatXunShiInfo
  } from '@/api/Sixdefensemanagement/Hiddeninformationlist.js'
  export default {
    components: {
      Pagination,
      Add
    },
    data() {
      return {
        isShowDialog: false, //查看弹框打开
        isEdit: false, //是否是编辑弹框
        openID: null, //打开弹框的id值
        isAdd: false, //是否是新增弹框
        isview: true,
        form: {
          kv: '',
          lineId: '',
          patrolType: '',
          opsGroup: '',
          patrolType: '',
          patrolStatus: '',
          planFrom: '',
          patrolUser: '',
          date: [],
          pageNum: 1,
          pageSize: 10
        },
        pageDetail: {
          total: 0
        },
        searchForm: {
          pageNum: 1,
          pageSize: 10,
          planFromId:this.objId,
        },
        selection: {
          voltagesArr: [], //DYDJ
          linesArr: [], // XL名称
          groupsArr: [], // 运维班组
          patrolWorker: [], // 巡视人
          patrolTypesArr: [], // 巡视类型
          patrolStatusArr: [], // 巡视状态
          patrolFromArr: [],
          usersArr: [],
          cablesArr: [], // DL
          jhly: 3
        },
        //选中的数据
        CheckedSelection: [],
        tableData: [],
        shangchuArry: [],
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
      jcbzSelect().then(res => {
        this.selection.groupsArr = res.data.rows
      })
      users().then(res => {
        // this.selection.usersArr = res.data.data
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
    },
    props: {
      objId: {
        type: String,
        // 对象或数组且一定会从一个工厂函数返回默认值
        default: function() {
          return ''
        }
      },
      lineid: {
        type: String,
        // 对象或数组且一定会从一个工厂函数返回默认值
        default: function() {
          return ''
        }
      }
    },
    mounted() {},
    methods: {
      backfun(){
        this.$emit('childFn2', {
          back: false, // 成功后告诉父组件刷新
        })
      },
      async getData() {
        // 获取列表数据
        let res = await list(this.searchForm)
        this.tableData = res.data.rows
        // //console.log(res.data.rows)
        this.pageDetail.total = res.data.total
      },
      /**删除所有 */
      DelAllFn() {
        if (this.CheckedSelection.length == 0) {
          this.$message('请选择要编辑的数据')
          return
        }
        let idsArr = []
        this.CheckedSelection.forEach(v => {
          idsArr.push(v.objId)
        })

        this.del(idsArr.join(','))
      },

      del(ids) {
        this.$confirm('是否删除?', '提示', {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            delData({
              ids
            }).then(val => {
              val = val.data
              let type = val.code == 0 ? 'success' : 'error'
              this.$message({
                type,
                message: val.msg
              })
              if (val.code == 0) this.getData()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      },
      /** 导出 */
      upload() {
        for (let key in this.form) {
          this.searchForm[key] = this.form[key]
        }
        this.searchForm.beginTime = this.form.date[0]
        this.searchForm.endTime = this.form.date[1]
        delete this.searchForm.date
        planLineUpload(this.searchForm).then(res => {
          window.location.href = process.env.VUE_APP_BASE_API + '/common/download?fileName=' + res.data.msg +
            '&delete=true'
        })
      },
      reset() {
        this.form = {
          kv: '',
          lineId: '',
          patrolType: '',
          opsGroup: '',
          patrolType: '',
          patrolStatus: '',
          planFrom: '',
          patrolUser: '',
          date: [],
          pageNum: 1,
          pageSize: 10
        }
      },
      onSearch() {
        for (let key in this.form) {
          this.searchForm[key] = this.form[key]
        }
        this.searchForm.beginTime = this.form.date[0]
        this.searchForm.endTime = this.form.date[1]
        delete this.searchForm.date
        this.getData()
      },
      //选中数据
      //选中数据
      CheckFun(val) {
        this.shangchuArry=[]
        this.CheckedSelection = val
        for (let i = 0; i < this.CheckedSelection.length; i++) {
          this.shangchuArry.push(this.CheckedSelection[i].objId)
        }
        // //console.log(this.shangchuArry)
      },
      shangchengfun() {
        if (this.shangchuArry.length > 0) {
          let data = {
            objId: this.shangchuArry.toString()
          }
          tHiddendangerMessageCreatXunShiInfo(qs.stringify(data)).then(response => {
            if (response.status == 200) {
              if (response.data.msg == '操作成功') {
                this.$message({
                  message: response.data.msg,
                  type: 'success'
                })
                this.getData()
              } else {
                this.$message({
                  message: response.data.msg,
                  type: 'error'
                })
              }
            }
          })
        } else {
          this.$message({
            message: '至少选择一条数据',
            type: 'error'
          })
        }

      },
      editFun(val) {
        this.isShowDialog = true
        this.isEdit = true
        this.openID = val
      },
      /**新增按钮 */
      Addfun() {
        this.isShowDialog = true
        this.isEdit = false
      },
      /**
       * 接收查看/编辑子组件的数据
       */
      parentFn(val) {
        this.isShowDialog = false
        this.getData()
      }
    },
    filters: {
      patrolStatus(e, patrolStatusArr) {
        let obj = []
        if (patrolStatusArr.length == 0) {
          return ''
        } else {
          obj = patrolStatusArr.filter(res => {
            return res.id == e
          })
          return obj[0].patrolStatus
        }

      },
      patrolType(e, patrolTypeArr) {
        // let obj = []
        // if (patrolTypeArr.length == 0) {
        //   return ''
        // } else {
        //   obj = patrolTypeArr.filter(res => {
        //     return res.code == e
        //   })
        //   return obj[0].typeName
        // }

      },
      patrolFrom(e, patrolFromArr) {
        // let obj = []
        // if (patrolFromArr.length == 0) {
        //   return ''
        // } else {
        //   obj = patrolFromArr.filter(res => {
        //     return res.id == e
        //   })
        //   return obj[0].planFrom
        // }

      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
