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
              <el-button type="danger" plain @click="shangchufun" v-if="shangchuArry.length>0">
                <i class="el-icon-close" /> 删除
              </el-button>
              <el-button class="onSearch" plain @click="xiafafun" v-if="shangchuArry.length>0" icon="el-icon-document">
                下发计划
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
            :show-overflow-tooltip="tabisoverflow" :min-width="item.width" />
          <el-table-column align="center" label="操作" class-name="small-padding fixed-width" min-width="350" fixed="right">
            <template slot-scope="scope">
              <el-col>
                <el-button class="onSearch" size="small" @click="editFun(scope.row)">编辑</el-button>
                <el-button class="onSearch" size="small" @click="ViewFun(scope.row)">查看</el-button>
              </el-col>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="tableParam.total.length>0" :total="tableParam.total" :page.sync="tableParam.nowPage" :limit.sync="tableParam.limit"
          @pagination="getList" />
        <!--  total:总条目数 -->
        <add v-if="isShowDialog&&Detailsdata.list" :is-show-dialog="isShowDialog" :Detailsdata="Detailsdata"
          :isstartsName='isstarts' @childFn="parentFn" />
      </div>
    </div>
    <add />
  </div>
</template>

<script>
  import add from './add.vue'
  import {
    tHiddendangerMessagegetAddInfo,
    tHiddendangerMessagegetElePlanList,
    tHiddendangerOndutyremove,
    tHidJhTaskaddHidJhTaskInfo
  } from '@/api/Sixdefensemanagement/Hiddeninformationlist'
  import {
    setList,
  } from '@/api/Sixdefensemanagement/HiddenDangerReview'
  import Pagination from '@/components/Pagination'
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
        selectionlist: null,
        selectiondata: null,
        jihuaShow: false,
        shangchuArry: [],
        Detailsdata: {
          list: '',
          data: '',
          id: this.objId,
          xunshidata: {}

        },
        isShowDialog: false, // 查看弹框打开
        isstarts: '', //弹窗参数值
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
        },
        tableParam: {
          // 列表查询的参数
          objId: this.objId,
          planType: 4,
          nowPage: 1,
          pageNum: 1,
          limit: 10,
          total: 0
        },
        // ----------------------------------搜索栏下拉数据--------------------------------------
        selection: {}, //下拉框所有数据
        isedit: true,
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
            label:this.$xl,
            prop: 'linename',
            width: '200'
          },

          {
            label: this.$dl,
            prop: 'cablename',
            width: '200'
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
            label: '值守时间',
            prop: 'startTime',
            width: '150'
          },
          {
            label: '值守时间',
            prop: 'endTime',
            width: '150'
          }

        ],
        tableData: []
      }
    },
    created() {},
    mounted() {
      this.setlistfun() //下拉数据
      this.setdatafun() //XL详情
      this.getList() //列表
    },
    methods: {
      //返回
      backfun() {
        this.$emit('childFn2', {
          back: false, // 成功后告诉父组件刷新
        })
      },
      //删除
      shangchufun() {
        let data = {
          objId: this.shangchuArry.toString()
        }
        tHiddendangerOndutyremove(qs.stringify(data)).then(response => {
          if (response.status == 200) {
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
      //下发
      xiafafun() {
        let data = {
          objId: this.shangchuArry.toString()
        }
        tHidJhTaskaddHidJhTaskInfo(qs.stringify(data)).then(response => {
          if (response.status == 200) {
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
      //列表
      getList() {
        tHiddendangerMessagegetElePlanList(qs.stringify(this.tableParam)).then(response => {
          if (response.status == 200) {
			  //console.log(response.data)
            this.tableData = response.data.resultList
            // this.tableParam.total = response.data.rows[0].totleNumber
          }
        })
      },
      //公共下拉数据
      setlistfun() {
        const list = {
          nowPage: 1
        }
        setList(qs.stringify(list)).then(response => {
          if (response.status == 200) {
            this.selectionlist = response.data.rows[0]
            this.Detailsdata.list = this.selectionlist
          }
        })
      },
      //XL详情数据
      setdatafun() {
        const list = {
          objId: this.objId
        }
        tHiddendangerMessagegetAddInfo(qs.stringify(list)).then(response => {
          if (response.status == 200) {
            if (response.data.msg === '操作成功') {
              this.selectiondata = response.data.data
            } else {
              // this.$message({
              //   message: response.data.msg,
              //   type: 'success'
              // })
            }
          }
        })
      },
      // 选中数据
      CheckFun(val) {
        this.shangchuArry = []
        this.CheckedSelection = val
        if (this.CheckedSelection.length > 0) {
          for (let i = 0; i < this.CheckedSelection.length; i++) {
            this.shangchuArry.push(this.CheckedSelection[i].objId)
          }
        }
      },
      //打开新增弹框
      Addfun() {
        this.isShowDialog = true
        this.Detailsdata.data = this.selectiondata
        this.isstarts = 'add'
      },
      //打开编辑弹框
      editFun(val) {
        this.isShowDialog = true
        this.isstarts = 'edit'
        this.Detailsdata.data = val
      },
      ViewFun(val) {
        this.isShowDialog = true
        this.isstarts = 'View'
        this.Detailsdata.data = val
      },
      /**
       * 接收子组件的数据
       */
      parentFn(val) {
        this.isShowDialog = false
        this.isstarts = ''
        this.isEdit = val.editbtn
        this.isAdd = val.addbtn
        if (val.Refresh == true) {
          this.getList()
        }
      }
    }
  }
</script>

<style>
</style>
