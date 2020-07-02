<template>
  <!-- //巡视 -->
  <div class="main-body">
    <div class="content">
 <div  class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="form" inline>
          <el-form-item :label="$xl+'名称'">
            <el-select v-model="tableParam.linename" clearable placeholder="请选择">
              <el-option v-for="(item,index) in Detailsdata.list.yingHuan" :label="item.value" :value="item.id" :key='index' />
            </el-select>
          </el-form-item>
          <el-form-item label="值守状态:">
            <el-select v-model="tableParam.ondutystatus" clearable placeholder="请选择" >
              <el-option v-for="(item,index) in zhishoulist" :label="item.name" :value="item.id" :key='index' />
            </el-select>
          </el-form-item>
          <el-form-item label="设备主人:">
            <el-input type="text" v-model="tableParam.managementpeople" clearable  />
          </el-form-item>
          <el-form-item label="值守时间:">
            <el-date-picker v-model="tableParam.createtime" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date"
               style="width: 100%;"  />
          </el-form-item>
          <el-form-item style="float: right;margin-right: 0">
            <el-button class="onSearch" @click="onSearch">查询</el-button>
            <el-button class="onSearch" style="margin-right: 0" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
      <div class="table">
        <el-table :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}"
          :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}" border fit highlight-current-row
           v-loading="loading">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column type="index" label="序号" width="60" align="center" />
          <!-- <el-table-column prop="name" label="运维单位" align="center"></el-table-column> -->
          <el-table-column v-for="item in tableTitle" :key="item.index" :prop="item.prop" :label="item.label" align="center"
            :show-overflow-tooltip="tabisoverflow" min-width="150" />
          <el-table-column align="center" label="操作" class-name="small-padding fixed-width" min-width="350" fixed="right">
            <template slot-scope="scope">
              <el-col>
                <el-button class="onSearch" size="small" @click="reviewFun(scope.row)">查看值守任务</el-button>
               <!-- <el-button class="onSearch" size="small" @click="editFun(scope.row)">编辑值守任务</el-button> -->
              </el-col>
            </template>
          </el-table-column>
        </el-table>
      <pagination v-show="tableData.length>0" :total="tableParam.total" :page.sync="tableParam.pageNum" :limit.sync="tableParam.limit"
          @pagination="getList" />
        <!--  total:总条目数 -->
         <add v-if="isShowDialog&&Detailsdata.list" :is-show-dialog="isShowDialog" :Detailsdata="Detailsdata" :isstartsName='isstarts' @childFn="parentFn"/>
      </div>
    </div>
    <add/>
    </div>
</template>

<script>
  import add from '../information-list/cmp/Viewonduty/add.vue'
   import Pagination from '@/components/Pagination'
  import {
      tHidJhTasklist,
  } from '@/api/Sixdefensemanagement/Dutyduty'
import {
  setList,
} from '@/api/Sixdefensemanagement/HiddenDangerReview'
  import qs from 'qs'
  // import SectionShow from "./section";
  export default {
    components: {
      add,
      Pagination
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
        zhishoulist:[{
          id:0,
          name:'值守中'
        },{
          id:1,
          name:'已值守'
        },{
          id:2,
          name:'值守异常'
        }],
        loading: false,
        jihuaShow:false,
        shangchuArry:[],
        Detailsdata:{
              list:'',
              data:'',
              id:this.objId,
              xunshidata:{}

        },
        isstarts:'',
        isShowDialog: false, // 查看弹框打开
        isEdit: false, // 是否是编辑弹框
        isAdd: false, // 是否是新增弹框
        tabisoverflow: true,//列表状态
        form: {
          VoltageLevelSearchVal: '', // DYDJ
          HiddendangerlineSearchVal: '', // 隐患XL
          HiddenDangerTypeSearchVal: '', // 隐患类型
          ReleaseMethodSearchVal: '', // 发型方式
          HiddenDangerLevelSearchVal: '', // 隐患等级
          StartTime: '', // 起始时间
          DisposalStatusSearchVal: '', // 处置状态
          HandlerSearchVal: '', // 处理人
        },
        tableParam: {
          nowPage: 1,
          pageNum: 1,
          limit: 10,
          total: 0,
          linename:'',
          ondutystatus:'',
          managementpeople:'',
          createtime:'',
          pageSize:10,


        },
        // ----------------------------------搜索栏下拉数据--------------------------------------
        selection: {},//下拉框所有数据
        // 选中的数据
        CheckedSelection: [],
        // 表头
        tableTitle: [{
            label: '隐患编号',
            prop: 'hdidentifier',
            width: '200'
          },
          {
            label: this.$dydj,
            prop: 'voltage',
            width: '100'
          },
          {
            label: this.$xl+'名称',
            prop: 'linename',
            width: '200'
          },

          {
            label: this.$dl,
            prop: 'cablename',
            width: '290'
          },
          {
            label: '隐患地址',
            prop: 'findaddress',
            width: '300'
          },
          {
            label: '值守班组',
            prop: 'managementbz',
            width: '150'
          },
          {
            label: '设备主人',
            prop: 'managementpeople',
            width: '100'
          },
          {
            label: '当前值守人数',
            prop: 'ondutynum',
            width: '180'
          },
          {
            label: '值守人',
            prop: 'ondutyuser',
            width: '100'
          },
          {
            label: '隐患类别',
            prop: 'hdtypename',
            width: '200'
          },
          {
            label: '隐患当前状态',
            prop: 'currentstatus',
            width: '200'
          },
          {
            label: '值守状态',
            prop: 'ondutystatus',
            width: '200'
          },
          {
            label: '值守开始时间',
            prop: 'starttime',
            width: '150'
          },
          {
            label: '值守结束时间',
            prop: 'endtime',
            width: '150'
          }

        ],
        tableData: []
      }
    },
    created() {},

    mounted() {
      this.setlistfun()
      this.getList()
    },
    methods: {
      onSearch(){
        this.getList()
      },
      reset(){

          this.tableParam.linename=''
          this.tableParam.ondutystatus=''
          this.tableParam.managementpeople=''
          this.tableParam.createtime=''
          this.getList()
      },
      //子组件接收参数
      parentFn(val) {
        this.isShowDialog =false
        this.isstarts = ''
        if (val.Refresh) {
          this.getList()
        }
      },
      getList() {

        tHidJhTasklist(qs.stringify(this.tableParam)).then(response => {
          if (response.status == 200) {
            // //console.log(response, '33333333')
            this.tableData = response.data.rows
            this.tableParam.total = response.data.total
          }
        })
      },
      setlistfun() {
        const list = {
           nowPage: 1
        }
        setList(qs.stringify(list)).then(response => {
          if (response.status == 200) {
            this.Detailsdata.list = response.data.rows[0]
          }
        })
      },
      reviewFun(val){
        this.isShowDialog = true
        this.isstarts = 'Taskreview'
        this.Detailsdata.data=val
      },
      editFun(val){
         this.isShowDialog = true
         this.isstarts = 'Taskeditor'
         this.Detailsdata.data=val
      },
    }
  }
</script>

<style>
</style>
