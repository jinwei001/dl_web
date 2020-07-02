<template>
  <!-- <h2>
      xl巡视结果管理
  </h2>-->
  <div class="main-body">
    <div class="main-userSelect" v-if='jbxxccobjpggHideButtomStatus'>
      <div class="searchForm_glf">
        <el-form ref="form" inline>
          <el-form-item :label="`${$dydj}:`">
            <el-select v-model="form.kv" clearable placeholder="请选择">
              <el-option v-for="item in selection.voltagesArr" :key="item.id" :label="item.kv" :value="item.kv"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="`${$xl}名称:`">
            <el-select v-model="form.lineId" clearable filterable placeholder="请选择">
              <el-option v-for="item in selection.linesArr" :key="item.id" :label="item.lineName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运维班组:">
            <el-select v-model="form.opsGroup" clearable placeholder="请选择" @change="xsbz">
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
    </div>
    <div class="content" ref='contentref'>
      <div class="respont-content">
        <el-form v-if="jbxxccobjpggHideButtomStatus">
          <el-col>
            <el-form-item style="float: left;">
              <el-button type="danger" plain @click="DelAllFn">
                <i class="el-icon-close"></i> 删除
              </el-button>
              <el-button type="primary" @click="qxAdd">登记缺陷</el-button>
              <el-button  class="onSearch"  @click="yhAdd">登记隐患</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="tableData" style="border: 1px solid #c4c8cf" :cell-style="{borderColor: '#c4c8cf'}" :header-cell-style="{'background':'#cddce6',borderColor: '#c4c8cf'}" border fit highlight-current-row @selection-change="CheckFun">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column prop="jhxsrq" label="计划巡视日期" align="center" width="160"></el-table-column>
          <el-table-column prop="lineName" :label="`${$xl}名称`" align="center" width="160"></el-table-column>
          <!-- <el-table-column prop="logicCableStageName" :label="`${$dl}`" align="center"></el-table-column> -->
          <el-table-column prop="groupName" label="运维班组" align="center"></el-table-column>
          <el-table-column prop="patrolUserName" label="巡视人" align="center"></el-table-column>
          <el-table-column label="计划来源" align="center">
            <template slot-scope="scope" class="bottleGreenBtnCon">
              {{scope.row.jhly | patrolFrom(selection.patrolFromArr)}}
            </template>
          </el-table-column>
          <el-table-column prop="voltageRank" :label="`${$dydj}`" align="center"></el-table-column>
           <el-table-column label="巡视状态" align="center">
            <template slot-scope="scope" class="bottleGreenBtnCon">
              {{scope.row.xszt | patrolStatus(selection.patrolStatusArr)}}
            </template>
          </el-table-column>
          <el-table-column prop="zxsj" label="执行时间" align="center" width="160"></el-table-column>
           <el-table-column label="巡视类型" align="center">
            <template slot-scope="scope" class="bottleGreenBtnCon">
              {{scope.row.xslx | patrolType(selection.patrolTypesArr)}}
            </template>
          </el-table-column>
          <el-table-column prop="bz" label="备注" align="center"></el-table-column>
          <el-table-column align="center" label="操作" width="250" v-if="jbxxccobjpggHideButtomStatus">
            <template slot-scope="scope" class="bottleGreenBtnCon">
              <el-button  v-if="scope.row.isRecord == 0" class="onSearch bottleGreenBtnCon" size="medium" @click="AddNewFun(scope.row.objId)">添加巡视记录</el-button>
              <!-- <el-button class="onSearch bottleGreenBtnCon" size="small" @click="viewFun(scope.row.objId)">查看巡视记录</el-button> -->
              <el-button v-else class="onSearch bottleGreenBtnCon" size="small" @click="editFun(scope.row.objId)">编辑巡视记录</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="pageDetail.total>0" :total="pageDetail.total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize" @pagination="getData" />
      </div>
    </div>
   <div v-if="isShowDialog">
      <Add @childFn="parentFn" :isEdit="isEdit" :openID="openID" :selection='selection'/>
    </div>
    <YHAdd v-if="isYHShowDialog&&YHselection" :is-show-dialog="isYHShowDialog"   :selection="YHselection" :yhdetaildatapn='YHDetaildata'
      @childFn="parentFn" />
   <div v-if="isShowDialogQx">
      <AddQx @childFn="parentFn" :thisDetail='thisDetail' :isdjqx='true'/>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import Add from './show'
import YHAdd from '../../../six-prevention/information-audit/cmp/add.vue'
import AddQx from '@/views/defect/register/Add'
 import {
    setList,
  } from '@/api/Sixdefensemanagement/HiddenDangerReview'
import {
  PatrolResultManagementList as list,
  PatrolResultManagementDel as delData,
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
  import qs from 'qs'
  import { GETTBList } from "@/api/public";
export default {

  name: 'CableEquipmentLedger',
  components: {
    Pagination,
    YHAdd,AddQx,Add
  },

  data() {
    return {
      thisDetail:'',// 详情
      jbxxccobjpggHideButtomStatus:true, //检修工具任务管理-基本资料与信息查询来源需要隐藏按钮（巡视
      isEdit:false,
      openID:'',
      isYHShowDialog:false,//隐患弹出层状态
      isShowDialog:false,//隐患弹出框状态
      YHDetaildata:{},
      isShowDialogQx:false,
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
        pageSize: 10
      },
      selection: {
        voltagesArr: [], //dydj
        linesArr: [], // xl名称
        groupsArr: [], // 运维班组
        patrolWorker: [], // 巡视人
        patrolTypesArr: [], // 巡视类型
        patrolStatusArr: [], // 巡视状态
        patrolFromArr: [],
        usersArr: [],
        cablesArr: [] // dl
      },
      YHselection:{},//隐患

      //选中的数据
      CheckedSelection: [],
      tableData: []
    }
  },
  created() {
    //检修工具任务管理-基本资料与信息查询来源（巡视）
    if(Object.keys(this.jbxxccobjpgg).length > 0){
      this.jbxxccobjpggHideButtomStatus=this.jbxxccobjpgg.show//如果检修工具任务管理-基本资料与信息查询来源调用隐藏不需要的按钮
      this.searchForm={
        pageNum: 1,
        pageSize: 10,
        lineId:this.$route.query.bb//关联线路
      }
      // this.form.lineId=this.$route.query.bb
      // this.$refs.contentref.style.borderColor = "white";//隐藏掉content的上边框线
    }
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
  },
  props: {
        /**
         * 接收是否打开页面（检修工作管理-基础-巡视
         *///src/views/recondition/task/ReportBase/Report5_yxxsxx.vue]
        jbxxccobjpgg: {
          type: Object,
          default: function() {
             return {

            }
           }
         }
  },
  mounted() {
    this.setListfun()
  },
  methods: {
    xsbz(val){
      GETTBList("/api/select/getUsers", { groupId: val }).then(res => {
          //console.log(res);
          this.selection.usersArr = res.data.data;
        });
    },
    //隐患弹出层需要获取默认下拉数据
    setListfun() {
      const list = {
        nowPage: 1
      }
      setList(qs.stringify(list)).then(response => {
        if (response.status == 200) {
          this.YHselection = response.data.rows[0]
        }
      })
    },
    async getData() {
      // 获取列表数据
      let res = await list(this.searchForm)
      this.tableData = res.data.rows
      this.pageDetail.total = res.data.total
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
       this.onSearch()
    },
   qxAdd(){
     if(this.CheckedSelection.length==1){
       this.isShowDialogQx = true
       this.thisDetail=this.CheckedSelection[0]//勾选获取对应row 传入隐患弹出层
      //  this.thisDetail.starts='线路'//勾选获取对应row 传入隐患弹出层
     }else{
       if(this.CheckedSelection.length===0){
          this.$message('必须选择一条')
       }else{
          this.$message('只能选择一条')
       }
     }
    },
    //隐患弹出开
    yhAdd(){

        if(this.CheckedSelection.length>0&&this.CheckedSelection.length<2){
          this.isYHShowDialog=true
          this.YHDetaildata=this.CheckedSelection[0]//勾选获取对应row 传入隐患弹出层
        }else{
          if(this.CheckedSelection.length===0){
             this.$message('必须选择一条')
          }else{
             this.$message('只能选择一条')
          }

        }



    },
    /**
     * 查询按钮
     */
    onSearch() {
      for (let key in this.form) {
        this.searchForm[key] = this.form[key]
      }
     if (this.form.date != null) {
        this.searchForm.beginTime = this.form.date[0];
        this.searchForm.endTime = this.form.date[1];
      } else {
        this.searchForm.beginTime = null;
        this.searchForm.endTime = null;
      }
      delete this.searchForm.date
      this.getData()
    },
    getList() {},
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
          delData({ ids }).then(val => {
            val = val.data
            let type = val.code == 0 ? 'success' : 'error'
            this.$message({ type, message: val.msg })
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
    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val
      //console.log(this.CheckedSelection)
    },
    /**
     * 查看按钮
     */
    viewFun(val) {
      //console.log('查看')
      //console.log(val)
      this.isShowDialog = true
    },
    /**
     * 添加巡视记录
     */
    AddNewFun(val) {
      //console.log(val)

      this.isEdit = false;
      this.openID = val;
      this.isShowDialog = true;
    },
    /**
     * 编辑按钮
     * */
    editFun(val) {
      this.openID = val;
      this.isEdit = true
      this.isShowDialog = true

    },
    /**
     * 接收子组件的数据
     */
     parentFn(val) {
      this.isShowDialog = false
      this.isShowDialogQx = false
      this.isYHShowDialog=false
      this.getData()
    }
  }

}
</script>
<style lang="scss" scoped>
.result {
  height: 300px;
}
</style>
