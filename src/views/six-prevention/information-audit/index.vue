<template>
  <!-- <div>
    <h2>隐患信息审核</h2>
  </div>-->
  <div class="main-body">
    <div  class="main-userSelect">
      <div class="searchForm_glf dataPA">
        <el-form ref="form" inline>
          <el-form-item label="发现方式:">
            <el-select v-model="form.ReleaseMethodSearchVal" clearable placeholder="请选择">
              <el-option v-for="(item,index) in selection.faXianFangShi" :label="item.value" :value="item.id" :key='index' />
            </el-select>
          </el-form-item>
          <el-form-item :label="'隐患'+$xl">
            <el-select v-model="form.HiddendangerlineSearchVal" clearable placeholder="请选择" @change="YHxianluchangeFun">
              <el-option v-for="(item,index) in selection.yingHuan" :label="item.value" :value="item.id" :key='index' />
            </el-select>
          </el-form-item>
          <el-form-item :label="$dydj">
            <el-select v-model="form.VoltageLevelSearchVal" clearable placeholder="请选择" disabled>
              <el-option v-for="(item,index) in selection.dianYaDengJi" :label="item.value" :value="item.id" :key='index' />
            </el-select>
          </el-form-item>
          <el-form-item label="隐患部位">
            <el-select v-model="form.YHBuweiSearchVal" clearable placeholder="请选择" @change="shebeibuweichangeFun">
              <el-option v-for="(item,index) in sevdata.yinghuangbuweiList" :key="index" :label="item.value" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="隐患类型:">
            <el-select v-model="form.HiddenDangerTypeSearchVal" clearable placeholder="请选择">
              <el-option v-for="(item,index) in selection.liuFangYinHuan" :key="index" :label="item.value" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="隐患等级:">
            <el-select v-model="form.HiddenDangerLevelSearchVal" clearable placeholder="请选择">
              <el-option v-for="(item,index) in selection.yinHuanDengJi" :label="item.value" :value="item.id" :key='index' />
            </el-select>
          </el-form-item>
          <el-form-item label="日期:" >
            <el-date-picker v-model="form.StartTime" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="daterange"
              range-separator=" 至 " start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-form-item>
          <el-form-item label="处置状态:">
            <el-select v-model="form.DisposalStatusSearchVal" clearable placeholder="请选择">
              <el-option v-for="(item,index) in selection.chuLiZhuangTai" :label="item.value" :value="item.id" :key='index' />
            </el-select>
          </el-form-item>
          <el-form-item label="当前处理人:">
            <el-select v-model="form.HandlerSearchVal" clearable placeholder="请选择" :filter-method="filteruseList" filterable>
              <el-option v-for="item in selection.yongHu" :key="item.id" :label="item.value" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item style="float: right;margin-right: 0">
            <el-button class="onSearch" @click="onSearch">查询</el-button>
            <el-button class="onSearch" style="margin-right: 0" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
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
              <el-button class="onSearch"  @click="openBulkconsentshowFun">
                批量同意
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
            :show-overflow-tooltip="tabisoverflow" min-width="200" />
          <el-table-column align="center" label="操作" class-name="small-padding fixed-width" min-width="350" fixed="right">
            <template slot-scope="scope">
              <el-col style="text-align: center;">
                <el-button class="onSearch" size="small" @click="ViewFun(scope.row)" v-if="scope.row.isstart==1">查看流程</el-button>
                <el-button class="onSearch" size="small" @click="ProcessingReviewFun(scope.row,2)" v-if="scope.row.currentnode=='5'&&scope.row.isAdmin==='1'">admin编辑</el-button>
                <el-button class="onSearch" size="small" @click="ProcessingReviewFun(scope.row,1)" v-if="scope.row.isstart==1&&scope.row.currentnode!=='5'&&scope.row.operation==true">处理流程</el-button>
                <el-button v-if="scope.row.isstart==0" class="onSearch" size="small" @click="editReviewFun(scope.row)">编辑</el-button>
                <el-button v-if="scope.row.isstart==0" class="onSearch" size="small" @click="submitReviewFun(scope.row)">上报流程</el-button>
              </el-col>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="tableData.length>0" :total="form.total" :page.sync="tableParam.nowPage" :limit.sync="form.limit"
          @pagination="getList" />
        <!--  total:总条目数 -->
      </div>
    </div>
    <Add v-if="isShowDialog&&selection" :is-show-dialog="isShowDialog" :is-edit="isEdit" :is-add="isAdd" :selection="selection"
      @childFn="parentFn" />
    <Viewcmp v-if="ProcessingReviewData.show==true&&selection&&ProcessingReviewData.Detailsdata" :open-i-d="openID2"
      :submitparameter="ProcessingReviewData" :selection="selection" @childFn="parentFn" />
    <post v-if="submitReviewPopupsData.show&&selection" :submit-reviewparameter="submitReviewPopupsData" :open-i-d="openID3"
      :selection="selection" @childFn="parentFn" />

      <el-dialog
        title="批量审批"
        :visible.sync="Bulkconsent.show"
        width="40%"
        >
        <el-form  :model="Bulkconsent.Form" label-position="right" style="width:100% ;margin: 0 auto;"
          :rules="Bulkconsent.formRules" class="shenghebox" :inline="false" label-width="120px">
       <el-col :span='24'>
         <el-col :span='12'>
          <el-form-item label="审批班组">
             <el-select v-model="Bulkconsent.Form.currentbz" clearable @change="FXbzchangeFun">
               <el-option v-for="item in selection.banZu" :key="item.id" :label="item.value" :value="item.value" />
             </el-select>
           </el-form-item>
         </el-col>
         <el-col :span='12'>
          <el-form-item label="下一审批人" >
             <el-select v-model="Bulkconsent.Form.currentprocessor" clearable placeholder="请先选择审批班组" style="width: 80%;">
               <el-option v-for="item in Bulkconsent.sprvalArrY" :key="item.id" :label="item.name" :value="item.id" />
             </el-select>
           </el-form-item>
         </el-col>
       </el-col>
        </el-form>
        <p style="text-align: center;margin-top: 100px;">
          <el-button @click="Bulkconsent.show = false" class="onSearch">取 消</el-button>
          <el-button type="primary" @click='Bulkconsentfun' v-if="Bulkconsent.Form.currentprocessor!==''&&Bulkconsent.Form.banZu!==''" class="onSearch">确定</el-button>
        </p>
      </el-dialog>
  </div>

</template>
<script>
  import Pagination from '@/components/Pagination'
  import Add from './cmp/add'
  import Viewcmp from './cmp/Viewcmp'
  import post from './cmp/post'
  import {
    getList,
    setList,
    remove,

    selecDlByLine, //电压和DL
    selectByLx, //设备名称
    getYhbj, //设备部件
    getYhbjByYhlx, //隐患类型
    getYhdjByYhbjAndYhlx, //隐患等级
    userList, //发现人
    group_list//发现班组
  } from '@/api/Sixdefensemanagement/HiddenDangerReview'
  import {
    edit,//批量同意
  } from '@/api/Sixdefensemanagement/HiddenDangerReview'
  import qs from 'qs'
  // import SectionShow from "./section";
  export default {
    components: {
      Pagination,
      Add,
      Viewcmp,
      post
      // SectionShow
    },
    data() {
      return {
        Bulkconsent:{
          show:false,
          sprvalArrY:[],
          formRules:{
            'Form.currentprocessor': [{
              required: true,
              message: '请选则审批人',
              trigger: 'change'
            }],
            'Form.currentbz': [{
              required: true,
              message: '请输入审批班组',
              trigger: 'change'
            }],
          },
          Form:{
            objId:[],
            isAgren:'0',
            isstart:'1',
            currentprocessor:'',
            currentbz:''
          }
        },
        Alllist:{
          yongHu:[]
        },
        shuaxinglist: false,
        shangchuArry: [],
        submitReviewPopupsData: {
          id: '2',
          show: false,
          Detailsdata: {}
        },
        ProcessingReviewData: {
          id: '3',
          show: false,
          Police: false,
          Detailsdata: {}
        },
        tableParam: {
          // 列表查询的参数
          hdclass: '', //隐患等级
          hdtype: '', //隐患类型
          status: '', //处置状态
          lineid: '', //XL
          findtype: '', //发现方式
          startTime: '', //开始时间
          endTime: '', //结束时间
          voltage: '', //DYDJ
          dangQianChuLiRenName:'',
          hdposition:'',
          nowPage: 1,
          // pageSize: 1,
        },
        show: false,
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
          YHBuweiSearchVal: '', //隐患部位
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
        // ----------------------------------搜索栏下拉数据--------------------------------------
        selection: {}, // 下拉框所有数据
        isedit: true,
        // 选中的数据
        CheckedSelection: [],
        // 表头
        tableTitle: [
          {
            label: '隐患编号',
            prop: 'hdidentifier',
            width:'200'
          },
          {
            label: this.$dydj,
            prop: 'dianYaName',
            width:'100'
          },
          {
            label: '隐患'+this.$xl,
            prop: 'linename',
            width:'200'
          },

          {
            label:this.$dl,
            prop: 'dianLanName',
            width:'280'
          },
          {
            label: '隐患地址',
            prop: 'findaddress',
            width:'300'
          },
          
          {
            label: '处置状态',
            prop: 'chuzZhiZhuangTaiName',
            width:'100'
          },
          {
            label: '发现班组',
            prop: 'faXianBanZuName',
            width:'150'
          },
          {
            label: '发现人',
            prop: 'faXianRenName',
            width:'100'
          },
         
          {
            label: '发现日期',
            prop: 'finddate',
            width:'200'
          },
          {
            label: '隐患源单位',
            prop: 'faXianYuanDanWeiName',
            width:'300'
          },
          {
            label: '隐患源联系人',
            prop: 'faXianYuanLanXiRenName',
            width:'100'
          },
          {
            label: '隐患联系电话',
            prop: 'telephone',
            width:'160'
          },
          {
            label: '隐患部位',
            prop: 'yinHuanBuWeiName',
            width:'200'
          },
          {
            label: '隐患类型',
            prop: 'liuFangName',
            width:'200'
          },
          {
            label: '隐患等级',
            prop: 'yinHuanDengJiName',
            width:'100'
          },
          {
            label: '隐患原因',
            prop: 'hdreason',
            width:'200'
          },
          {
            label: '当前节点',
            prop: 'dangQianJieDianName',
            width:'150'
          },
          {
            label: '当前处理人',
            prop: 'dangQianChuLiRenName',
            width:'100'
          },
           {
            label: '隐患设备类型',
            prop: 'sheBeiTypeName',
            width:'200'
          },
          {
            label: '隐患设备',
            prop: 'sheBeiName',
            width:'200'
          },
          {
            label: '发现方式',
            prop: 'faXianFangShiName',
            width:'100'
          },

        ],
        sevdata: {

          dianlanList: [], //DYDJ
          YHshebeileixingList: [{ //隐患设备类型
            id: 0,
            value: this.$dl+'终端'
          }, {
            id: 1,
            value: this.$dl+'接头'
          }, {
            id: 2,
            value: this.$dl+'分支箱'
          }, {
            id: 3,
            value: '交叉互联箱'
          }, {
            id: 4,
            value: this.$dl+'接地箱'
          }],
          shebeimingchengList: [], //设备名称
          yinghuangbuweiList: [
            {
                value: '附件附属设备'
              },
              {
                value: '附属设施'
              },
              {
                value: this.$dl+'通道'
              },
              {
                value: this.$dl+'保护区内情况'
              },
              {
                value: '其他'
              }
          ], //隐患部位
          yinghuangLxList: [], //隐患类型
          yinghuangDJList: [], //隐患等级
          faxianrenList: []
        },
        tableData: []
      }
    },
    watch: {

    },
    created() {},

    mounted() {
      this.getList()
      this.setListfun()
      // this.getyinghuangbuweiListFun()
    },
    methods: {
      group_listFun(){
        group_list().then(response => {
          if (response.status == 200) {
              this.selection.FXBZarry = response.data.rows //隐患部位
          }
        })
      },
      //下一审批人
      filteruseList(query = ''){
        let _this=this
        const arr = this.Alllist.yongHu.filter(item => {
          return item.value.includes(query) || item.id.includes(query)
        })
        if(arr){
           _this.selection.yongHu = arr
        }
      },
      //获取设备部件下拉数据（无条件默认）
      getyinghuangbuweiListFun() {
        const data = {}
        this.sevdata.shebeimingchengList = []
        getYhbj(qs.stringify(data)).then(response => {
          if (response.status == 200) {
            if (response.data.msg == '操作成功') {
              this.sevdata.yinghuangbuweiList = response.data.data //隐患部位
            } else {
              // this.$message({
              //   message: '设备名称下拉列表获取失败',
              //   type: 'error'
              // })
            }
          }
        })
      },
      //隐患部位改变获取隐患类型并执行隐患等级
      shebeibuweichangeFun(val) {
        // if (val !== null && val !== '') {
        //   const data = {
        //     yhbj: val
        //   }
        //   this.form.HiddenDangerTypeSearchVal = '' //隐患类型
        //   this.sevdata.yinghuangLxList = []
        //   getYhbjByYhlx(qs.stringify(data)).then(response => {
        //     if (response.status == 200) {
        //       if (response.data.msg == '操作成功') {
        //         //console.log(response.data)
        //         this.sevdata.yinghuangLxList = response.data.data //隐患类型
        //       } else {
        //         this.$message({
        //           message: '隐患类型下拉列表获取失败',
        //           type: 'error'
        //         })
        //       }
        //     }
        //   })
        // } else {
        //   this.form.HiddenDangerTypeSearchVal = '' //隐患类型
        //   this.sevdata.yinghuangLxList = []
        // }
        // this.getYHdengjiFun()
      },

      //通过隐患XL获取 DYDJ
      YHxianluchangeFun(val) {
        if (val !== null) {
          const data = {
            lineId: val
          }
          this.form.VoltageLevelSearchVal = '' //清空电压值
          selecDlByLine(qs.stringify(data)).then(response => {
            if (response.status == 200) {
              if (response.data.msg == '操作成功') {
                this.form.VoltageLevelSearchVal = response.data.data[0].dydj //电压值
              } else {
                this.$message({
                  message: this.$dydj+this.$dl +'下拉列表获取失败',
                  type: 'error'
                })
              }
            }
          })
        } else {
          this.form.VoltageLevelSearchVal = '' //清空电压值
        }
      },
      /**
       * 重置按钮
       */
      reset() {
        this.form.HiddenDangerLevelSearchVal = '' //隐患等级
        this.form.HiddenDangerTypeSearchVal = '' //隐患类型
        this.form.DisposalStatusSearchVal = '' //处置状态
        this.form.HiddendangerlineSearchVal = '' //XL
        this.form.ReleaseMethodSearchVal = '' //发现方式
        this.form.StartTime = '' //开始时间

        this.form.VoltageLevelSearchVal = '' //DYDJ
        this.form.YHBuweiSearchVal = '' //隐患部位
        this.form.HandlerSearchVal=''//处理人
        this.form.HiddenDangerTypeSearchVal = '' //隐患类型
        this.sevdata.yinghuangbuweiList = [] //隐患部位数据
        this.sevdata.yinghuangLxList = [] //类型数据
        this.getList()
      },
      /**
       * 查询按钮
       */
      onSearch() {
        this.getList()
      },
      deletefun() {

      },
      submitReviewFun(row) {
        this.submitReviewPopupsData.show = true
        this.submitReviewPopupsData.data = row
        this.submitReviewPopupsData.starts = 1
      },
      editReviewFun(row) {
        this.submitReviewPopupsData.show = true
        this.submitReviewPopupsData.data = row
        this.submitReviewPopupsData.starts = 0
      },
      ProcessingReviewFun(row,num) {
        this.ProcessingReviewData.Detailsdata = row
        this.ProcessingReviewData.starts = 0
        this.ProcessingReviewData.Police = false
        this.ProcessingReviewData.show = true
        this.ProcessingReviewData.type = num
      },
      ViewFun(row) {
        this.ProcessingReviewData.Detailsdata = row
        this.ProcessingReviewData.starts = 0
        this.ProcessingReviewData.Police = true
        this.ProcessingReviewData.show = true
      },
      openBulkconsentshowFun(){
       if (this.shangchuArry.length > 0) {
         this.Bulkconsent.Form.currentb=''
         this.Bulkconsent.Form.currentprocessor=''
        this.Bulkconsent.show=true
        } else {
          this.$message({
            message: '至少要选一条数据',
            type: 'error'
          })
        }
      },
      // 审批班组改变时带出大学人员
      FXbzchangeFun(val) {
        this.Bulkconsent.Form.currentprocessor = ''
        const data = {
          groupname: val // 发现班组id
        }
        userList(qs.stringify(data)).then(response => {
          if (response.status === 200) {
            if (response.data.msg === '操作成功') {

              this.Bulkconsent.sprvalArrY = response.data.data // DL下拉
            } else {
              this.$message({
                message: '隐患类型下拉列表获取失败',
                type: 'error'
              })
            }
          }
        })
      },
      //批量同意
      Bulkconsentfun(){
          this.Bulkconsent.Form.objId=this.shangchuArry.toString()
          edit(qs.stringify(this.Bulkconsent.Form)).then(response => {
            if (response.status == 200) {
              if (response.data.msg == '操作成功') {
                this.Bulkconsent.show=false
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
      // 删除
      shangchufun() {
        if (this.shangchuArry.length > 0) {
          const data = {
            ids: this.shangchuArry.toString()
          }
          remove(qs.stringify(data)).then(response => {
            if (response.status == 200) {
              if (response.data.msg == '操作成功') {
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
        } else {
          this.$message({
            message: '至少要选一条删除数据',
            type: 'error'
          })
        }
      },
      //获取列表
      getList() {
        this.tableParam.hdclass = this.form.HiddenDangerLevelSearchVal //隐患等级
        this.tableParam.sixhdtype = this.form.HiddenDangerTypeSearchVal //隐患类型
        this.tableParam.status = this.form.DisposalStatusSearchVal //处置状态
        this.tableParam.lineid = this.form.HiddendangerlineSearchVal //XL
        this.tableParam.findtype = this.form.ReleaseMethodSearchVal //发现方式
        this.tableParam.startTime = this.form.StartTime[0] //开始时间
        this.tableParam.endTime = this.form.StartTime[1] //结束时间

        this.tableParam.voltage = this.form.VoltageLevelSearchVal //DYDJ
        this.tableParam.hdposition = this.form.YHBuweiSearchVal //隐患部位
        this.tableParam.dangQianChuLiRenName=this.form.HandlerSearchVal//处理人

        getList(qs.stringify(this.tableParam)).then(response => {
          if (response.status == 200) {
            this.tableData = response.data.rows[0].dataList //数据值
            this.form.total = response.data.rows[0].totleNumber //总页数
          }
        })
      },
      //获取默认下拉数据
      setListfun() {
        const list = {
          nowPage: 1
        }
        setList(qs.stringify(list)).then(response => {
          if (response.status == 200) {
            this.show = true
            this.selection = response.data.rows[0]
            this.group_listFun()
            this.Alllist.yongHu=this.selection.yongHu//模糊人员全数据
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
      /** 新增按钮 */
      Addfun() {
        this.isShowDialog = true
        this.isAdd = true
      },
      /**
       * 接收子组件的数据
       */
      parentFn(val) {
        // //console.log(val, '副业')
        this.isShowDialog = val.showDialog
        this.isShowView = val.showDialog
        this.submitReviewPopupsData.show = val.showpost
        this.shuaxinglist = val.refreshListshow
        if (val.showView == false) {
          this.ProcessingReviewData.show = val.showView
        }
        if (val.refreshListshow) {
          if (val.refreshListshow == true) {
            this.getList()
          }
        }
      }
    }
  }
</script>
<style lang="scss">
  .dataPA{
  .el-date-editor .el-range-separator{
    padding: 0;
  }
  }

</style>
