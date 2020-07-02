<template>
  <!-- //巡视 -->
  <div>
    <div class="content">
      <div class="respont-content">
        <el-form>
          <el-col>
            <el-form-item style="float: left;">
              <el-button class="onSearch" @click="Addfun">
                <i class="el-icon-plus">新增</i>
              </el-button>
              <el-button type="danger" plain @click="shangchufun">
                <i class="el-icon-close" /> 删除
              </el-button>
              <el-button type="onSearch" plain @click="shangchufun">
                <i class="el-icon-plus" /> 生成检修计划
              </el-button>
              <el-button class="onSearch" @click="backfun" icon="el-icon-back" style="text-align: right;">
                后退
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}"
          :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}" border fit highlight-current-row
          @selection-change="CheckFun">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column type="index" label="序号" width="60" align="center" />
          <!-- <el-table-column prop="name" label="运维单位" align="center"></el-table-column> -->
          <el-table-column v-for="item in tableTitle" :key="item.index" :prop="item.prop" :label="item.label" align="center"
            :show-overflow-tooltip="tabisoverflow" min-width="130" />
          <el-table-column align="center" label="操作" class-name="small-padding fixed-width" min-width="350">
            <template slot-scope="scope">
              <el-col>{{scope.row.isstart}}
                <el-button class="onSearch" size="small" @click="editFun(scope.row)">编辑</el-button>
              </el-col>
            </template>
          </el-table-column>
        </el-table>
<!--        <pagination v-show="tableData.length>0" :total="form.total" :page.sync="tableParam.nowPage" :limit.sync="form.limit"
          @pagination="getList" /> -->
        <!--  total:总条目数 -->
        <add v-if="isShowDialog&&Detailsdata" :is-show-dialog="isShowDialog" :Detailsdata="Detailsdata" :is-edit="isEdit" :open-i-d="1"
        :isAdd="isAdd" @childFn="parentFn"/>
      </div>
    </div>
    <add/>
    </div>
</template>

<script>
  import add from './add.vue'
  import {
      tHiddendangerMessagegetElePlanList,//列表
      tHiddendangerMessagegetMaintenanceInfo,//记录
      tHiddendangerMessagedeleteMaintenanceInfo,//删除
      tHiddendangerMessageCreatMaintenanceInfo//生成
  } from '@/api/Sixdefensemanagement/Hiddeninformationlist'
import {
  setList,
} from '@/api/Sixdefensemanagement/HiddenDangerReview'
  import qs from 'qs'
  // import SectionShow from "./section";
  export default {
    components: {
      add
    },
    props: {
      objId: {
        type: String,
        // 对象或数组且一定会从一个工厂函数返回默认值
        default: function() {
          return ''
        }
      }
    },
    data() {
      return {
        selectionlist:null,
        selectiondata:null,
        jihuaShow:false,
        shangchuArry:[],
        Detailsdata:{
              list:[],
              data:[],
              id:this.objId,
              xunshidata:{}

        },
        show:false,
        isShowView: false, // 查看和确认框打开
        isAddView: false,
        isSectionShowDialog: false, // 断面弹框打开
        isShowDialog: false, // 查看弹框打开
        isEdit: false, // 是否是编辑弹框
        openID1: 1, // 打开弹框的id值
        openID2: 2, // 打开弹框的id值
        openID3: 3, // 打开弹框的id值
        isAdd: false, // 是否是新增弹框
        tabisoverflow: true,
        form: {
          VoltageLevelSearchVal: '', // DYDJ
          HiddendangerlineSearchVal: '', // 隐患XL
          HiddenDangerTypeSearchVal: '', // 隐患类型
          ReleaseMethodSearchVal: '', // 发型方式
          HiddenDangerLevelSearchVal: '', // 隐患等级
          StartTime: '', // 起始时间
          DisposalStatusSearchVal: '', // 处置状态
          HandlerSearchVal: '', // 处理人
          pageNum: 1,
          limit: 10,
          total: 0
        },
        tableParam: {
          // 列表查询的参数
          objId:this.objId,
          planType: 2,
          nowPage: 1
        },
        // ----------------------------------搜索栏下拉数据--------------------------------------
        selection: {},//下拉框所有数据
        isedit: true,
        // 选中的数据
        CheckedSelection: [],
        // 表头
        tableTitle: [{
            label: '计划来源',
            prop: 'xlId'
          },
          {
            label: this.$dydj,
            prop: 'jhly'
          },
          {
            label: '运维班组',
            prop: 'sixhdtype'
          },
          {
            label: '设备主人',
            prop: 'zxsj'
          },
          {
            label: '检修类型',
            prop: 'jhly'
          },
          {
            label: '实验项目',
            prop: 'bz'
          },
          {
            label: '计划开始时间',
            prop: 'bz'
          },
          {
            label: '计划结束时间',
            prop: 'bz'
          },
          {
            label: '开始停电时间',
            prop: 'bz'
          },
          {
            label: '结束停电时间',
            prop: 'bz'
          },
          {
            label: '负责班组',
            prop: 'bz'
          },
          {
            label: '负责人',
            prop: 'bz'
          },
          {
            label: '是否停电',
            prop: 'bz'
          },
          {
            label: '计划状态',
            prop: 'bz'
          }

        ],
        tableData: []
      }
    },
    created() {},

    mounted() {
      this.setlistfun()
      this.setdatafun()
      this.getList()
    },
    methods: {
      backfun(){
        this.$emit('childFn2', {
          back: false, // 成功后告诉父组件刷新
        })
      },
      /**
       * 接收子组件的数据
       */
      parentFn(val) {
        this.isShowDialog = val.showDialog
        this.isEdit = val.editbtn
        this.isAdd = val.addbtn
        if (val.Refresh) {
          this.getList()
        }
      },
      /**
       * 重置按钮
       */
      reset() {
        //console.log('reset')
      },
      /**
       * 查询按钮
       */
      onSearch() {

      },
      deletefun() {

      },
      submitReviewFun(row){

      },
      editReviewFun(row){

      },
      //删除
      shangchufun(){
       let data={
           objId:this.shangchuArry.toString()
       }
       //console.log("删除")
        tHiddendangerMessagedeleteMaintenanceInfo(qs.stringify(data)).then(response => {
          if (response.status == 200) {
                this.$message({
                  message: response.data.msg,
                  type: 'success'
                })
               this.getList()
          }
        })
      },
      shangchengfun(){
       let data={
           objId:this.shangchuArry.toString()
       }
       //console.log("删除")
        tHiddendangerMessageCreatMaintenanceInfo(qs.stringify(data)).then(response => {
          if (response.status == 200) {
                this.$message({
                  message: response.data.msg,
                  type: 'success'
                })
               this.getList()
          }
        })
      },
      getList() {
       //console.log('刷新')
        tHiddendangerMessagegetElePlanList(qs.stringify(this.tableParam)).then(response => {
          if (response.status == 200) {
            //console.log(response, '33333333')
            this.tableData = response.data.resultList
            // this.form.total = response.data.rows[0].totleNumber
          }
        })
      },
      setlistfun() {
        const list = {
           nowPage: 1
        }
        setList(qs.stringify(list)).then(response => {
          if (response.status == 200) {
            //console.log(response.data.rows[0],'检修媒举')
            this.selectionlist = response.data.rows[0]
            this.Detailsdata.list=this.selectionlist
          }
        })
      },
      setdatafun() {
        const list = {
          objId: this.objId
        }
        tHiddendangerMessagegetMaintenanceInfo(qs.stringify(list)).then(response => {
          if (response.status == 200) {
            //console.log(response)
            this.selectiondata = response.data
            this.Detailsdata.data=this.selectiondata
          }
        })
      },
      getdatefun() {

      },
      // 选中数据
      CheckFun(val) {
        this.shangchuArry=[]
        this.CheckedSelection = val
        //console.log(this.CheckedSelection,'删除数据')
        if(this.CheckedSelection.length>0){
          for(let i=0;i<this.CheckedSelection.length;i++){
            this.shangchuArry.push(this.CheckedSelection[i].objId)
          }
        }
        //console.log(this.shangchuArry)
      },
      /** 新增按钮 */
      Addfun() {
        this.isShowDialog = true
        this.isAdd = true
      },
      /**
       * 接收子组件的数据
       */
      parentFn(val) {
        //console.log(val)
        this.isShowDialog = val.showDialog
        this.isEdit = val.editbtn
        this.isAdd = val.addbtn
        if(val.Refresh==true){
          this.getList()
        }
      },
      editFun(val){
         this.isShowDialog = true
         this.isEdit = true
         this.Detailsdata.xunshidata=val
      },
      /**
       * 接收来自断面的数据
       * */
      sectionparentFn(val) {
        //console.log(val)
        this.isSectionShowDialog = val
      }
    }
  }
</script>

<style>
</style>
