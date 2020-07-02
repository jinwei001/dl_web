<template>
  <div>
    <!-- 老旧管理-dl维护 -->
    <div v-if="tabshow===false" v-loading="loading" class="main-body table_style_zj" element-loading-text="拼命加载中">
      <div class="main-userSelect">
        <div class="searchForm_glf" v-if="YxxHideButtomStatus">
          <div class="search-container">
            <!--查询表单-->
            <el-form ref="Inquire" class="search-form" inline :model="Inquire">
              <!--    //XL -->
              <el-form-item :label="$xl+'名称'" prop="ljXl">
                <el-select v-model="Inquire.ljXl" clearable placeholder="请选择" @change="YHxianluchangeFun">
                  <el-option
                    v-for="(item,index) in selectData.lineArry"
                    :key="index"
                    :label="item.lineName"
                    :value="item.lineId"
                    @change="line_changeFun"
                  />
                </el-select>
              </el-form-item>
              <el-form-item :label="$dydj" prop="ljDydj">
                <el-input v-model="Inquire.ljDydj" disabled />
              </el-form-item>
              <el-form-item :label="$dl" prop="ljDl">
                <el-select v-model="Inquire.ljDl" clearable placeholder="请选择">
                  <el-option v-for="(item,index) in selectData.dianlanList" :key="index" :label="item.dlmc" :value="item.dlid" />
                </el-select>
              </el-form-item>
              <el-form-item :label="$dl+'等级'" prop="ljDldj">
                <el-select v-model="Inquire.ljDldj" clearable placeholder="请选择">
                  <el-option v-for="(item) in selectData.xldjArry" :key="item.dldj" :label="item.dldjmc" :value="item.dldj" />
                </el-select>
              </el-form-item>
            </el-form>
            <!--查询按钮-->-
            <div class="search-buttons"  v-if="YxxHideButtomStatus">
              <el-button type="primary" size="small" class="onSearch" @click="getList">查询</el-button>
              <el-button type="primary" size="small" class="UserSearchFun" @click="taskButtonResetClick">重置</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="content" ref="contentref">
        <!--数据操作-->
        <div class="record-operation">
         <!-- <el-button v-if="shangchuArry.length>0" type="danger" size="small" plain @click="shangchufun">删除</el-button> -->
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
          <!-- //老旧XL名称 -->
          <el-table-column prop="lineName" :label="'老旧'+$xl+'名称'" min-width="260" />
          <!-- //老旧dl名称 -->
          <el-table-column prop="logicCableStageName" :label="$dl" min-width="260" />
          <el-table-column prop="logiccableId" :label="$dl+'段'" min-width="120">
            <template slot-scope="scope">
              <el-button class="onSearch" type="primary" size="mini" style="width: 100%;" @click="DLDfun(scope.row.logiccableId)">{{ $dl }}段列表</el-button>
            </template>
          </el-table-column>
          <!-- //dydj -->
          <el-table-column prop="voltageRank" :label="$dydj" min-width="180" />
          <!-- //老旧dl总公里数 -->
          <el-table-column prop="oldcablemileage" :label=" '老旧'+$dl+'公里数（km)'" min-width="200" />
          <!-- //老旧dl段数量 -->
          <el-table-column prop="cablenumber" :label="$dl+'段数量'" min-width="150" />
          <!-- //XL总公里数 -->
          <el-table-column prop="linetotalmileage" :label="$xl+'总公里数'" min-width="150" />
          <el-table-column prop="linestatus" :label="$xl+'状态'" min-width="150" />
          <el-table-column prop="runrisklevel" :label="$dl+'等级'" min-width="150" />
          <el-table-column prop="transportTime" label="投运日期" min-width="150" >
             <template slot-scope="scope">
               {{scope.row.transportTime.trim().split(" ")[0]}}
           </template>
           </el-table-column>
          <!--操作模板-->
          <el-table-column fixed="right" label="操作" min-width="320" align="center" class-name="small-padding fixed-width" v-if="tableParam.total">
            <template slot-scope="scope">
              <p style="text-align: center;">
              <el-button class="onSearch" type="primary" size="mini" @click="FXfun(scope.row)">老化分析</el-button>

              <el-button class="onSearch" type="primary" size="mini" @click="DDscfun(scope.row)"  v-if="YxxHideButtomStatus">生成带电检测</el-button>
              <el-button class="onSearch" type="primary" size="mini" @click="JXscfun(scope.row)"  v-if="YxxHideButtomStatus">生成检修及试验</el-button>

        <!--      <el-button class="onSearch" type="primary" size="mini" @click="chakang(scope.row.id)">生成检修及试验</el-button> -->

              <!-- <el-button class="onSearch" type="primary" size="mini" @click="chakang(scope.row.id)">编辑</el-button> -->

              <!--       <el-button class="onSearch" type="primary" size="mini" @click="chakang(scope.row.id)">查看</el-button> -->
            </p>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          :total="tableParam.total"
          :page.sync="tableParam.pageNum"
          :limit.sync="tableParam.limit"
          @pagination="getList"
        />
        <el-dialog :title="$dl+'段列表'" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" style="min-height: 500px;">
          <el-table
            :data="DLlist"
            style="border: 1px solid #c7c7c7"
            :cell-style="{borderColor: '#c7c7c7'}"
            :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}"
            border
            fit
            highlight-current-row
          >
            <el-table-column property="name" label="名称" />
            <el-table-column property="time" label="投运时间" />
          </el-table>
        </el-dialog>
        <div v-if="checkPlanAddshow">
            <checkPlanAdd :laojiudlpg='laojiuDL' :openobj='openobj' @childFn="parentFn1"/>
        </div>

        <Addplan
          v-if="AddplanShow"
          :selection="selection"
          :is-edit="false"
          :open-i-d="openID"
          :oldobjplanpn="oldobjddplan"
          @childFn="parentFn1"
        />
      </div>
    </div>
    <oldtab v-if="tabshow" :oldobjf-pn="oldobj" @childFn1="parentFn" />
  </div>
</template>

<script>
import {
  keepElectricityDuty_remove, // 删除任务
  keepElectricityDutyJing_list // 井列表
} from '@/api/protected-electricity/Performtasks'
import {
  oldcable_lineNames, // 任务列表
  oldcable_list, // 列表
  oldcable_wldl
} from '@/api/oldDL/JX'
import {
  xw, //
  linesSelect, // xl下拉
  dlSelect, // dl下拉
  jcbzSelect // 检测班组
} from '@/api/liveDetectionManage'
import {
  selecDlByLine, // 电压和DL
} from '@/api/Sixdefensemanagement/HiddenDangerReview'
import qs from 'qs'
import Pagination from '@/components/Pagination'
import oldtab from './cmp/tab.vue'
import Addplan from '../liveDetectionManage/plan/Add.vue'
import checkPlanAdd from '../recondition/plan/checkPlan/add.vue'
export default {
  name: 'CableMaintenance',
  components: {
    Pagination,
    oldtab,
    Addplan,
    checkPlanAdd
  },
  data() {
    return {
      openobj:{},
      laojiuDL:{},//老旧检修详情
      checkPlanAddshow:false,//检修新增弹出框
      YxxHideButtomStatus:true,//有效性管理隐藏按钮状态
      AddplanShow: false,
      openID: null,
      oldobjddplan: {},
      dialogVisible: false,
      tabshow: false,
      oldobj: {},
      loading: true, // 加载状态
      dakaiID: '', // 分页时需要(水井ID)
      isShowDialog: false, // 打卡详情状态
      SRC: process.env.VUE_APP_BASE_API, // 图片预览地址
      shangchuArry: [], // 勾选数组集合
      selectData: { // 爆灯等级
        lineArry: [],
        dianlanList: [],
        xldjArry: [{
          dldj: '1',
          dldjmc: '一级高压' + this.$dl
        }, {
          dldj: '2',
          dldjmc: '二级高压' + this.$dl
        }, {
          dldj: '3',
          dldjmc: '三级高压' + this.$dl
        }]
      },
      tableData: [], // 值守任务列列表数据
      tableData1: [], // 电井列表数据
      DLlist: [],
      tableParam: { // 值守列表分页和查询参数集合
        total: 0,
        pageNum: 1,
        pageSize: 10,
        limit: 10,
        lineId: '',
        logiccableId: '',
        runrisklevel: ''
      },
      tableParam1: { // 电井分页和查询参数集合
        total: 0,
        pageNum: 1,
        pageSize: 10,
        limit: 10,
        bdzsrwid: ''
      },
      Inquire: { // 值守任务列表查询绑定集合
        ljXl: '',
        ljDydj: '',
        ljDl: '',
        ljDldj: ''
      },
      // 弹窗参数配置
      dialogParameter: {
        dialogWidth: '60%',
        title: '未知',
        showDialogDetails: false // 打开弹框
      },
      selection: {
        linesSelectArr: [], // xl名称
        dlSelectArr: [], // dl
        ddjcArr: ['红外测温', '金属护层接地电流测量', '局部放电检测'], // 带电检测类型
        sblxArr: [
          this.$dl + '终端',
          this.$dl + '接头',
          this.$dl + '分支箱',
          '交叉互联箱',
          this.$dl + '接地箱'
        ], // 检测设备类型
        jcbzSelectArr: [], // 检测班组
        xwArr: [],
        sbmcArr: [],
        jhlyArr: []
      }
    }
  },
  props: {
    childclickID: {
      default: null
    },
     //状态评价来源 如果该参数不为空则表示该页被状态评价 有效性管理调用
       Yxxobjpgc: {
        type: Object,
        default: function() {
        return {

        }
      }}
  },
  mounted() {
    //状态评价来源 如果该参数不为空则表示该页被状态评价 有效性管理调用
    if(Object.keys(this.Yxxobjpgc).length > 0){
      this.YxxHideButtomStatus=this.Yxxobjpgc.show//如果被有效性管理调用隐藏不需要的按钮
      this.Inquire.ljXl=this.Yxxobjpgc.lineId//如果被有效性管理调用隐藏不需要的按钮
      this.$refs.contentref.style.borderColor = "white";//隐藏掉content的上边框线
    }
    linesSelect().then(res => {
      // xl
      this.selection.linesSelectArr = res.data.rows
    })
    jcbzSelect().then(res => {
      // 检测班组
      this.selection.jcbzSelectArr = res.data.rows
    })

    xw({
      fzmc: this.$dl + this.$xb
    }).then(res => {
      //
      this.selection.xwArr = res.data.rows
    })
    xw({
      fzmc: '带电检测计划来源'
    }).then(res => {
      // 计划来源
      this.selection.jhlyArr = res.data.rows
    })
    this.initPage()
    this.getList()
    this.getLines_selectDataFun()
  },
  methods: {
    DDscfun(val) {
      this.oldobjddplan = val
      this.AddplanShow = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    FXfun(val) {
      this.oldobj = val

      this.tabshow = true
    },
    JXscfun(val){
      this.checkPlanAddshow=true
      this.laojiuDL=val
      this.openobj.isadd = 1;
    },
    DLDfun(id) {
      const data = {
        logiccableId: id
      }
      oldcable_wldl(qs.stringify(data)).then(response => {
        if (response.status === 200) {
          if (response.data.code === 0) {
            this.dialogVisible = true
            this.DLlist = response.data.rows
          } else {
            this.DLlist = []
            this.$message({
              message: this.$dl + '列表获取失败',
              type: 'error'
            })
          }
        }
      })
    },
    // 老旧XL获取接口
    getLines_selectDataFun() {
      oldcable_lineNames(qs.stringify(this.tableParam1)).then(response => {
        if (response.status === 200) {
          if (response.data.code === 0) {
            this.selectData.lineArry = response.data.rows
          } else {
            this.selectData.lineArry = []
            this.$message({
              message: this.$xl + '列表获取失败',
              type: 'error'
            })
          }
        }
      })
    },
    YHxianluchangeFun(val) {
      if (val !== null) {
        const data = {
          lineId: val
        }
        this.Inquire.ljDydj = '' // 清空电压值
        this.selectData.dianlanList = [] // 清空dl下拉
        this.Inquire.ljDl = ''
        selecDlByLine(qs.stringify(data)).then(response => {
          if (response.status === 200) {
            if (response.data.msg === '操作成功') {
              this.Inquire.ljDydj = response.data.data[0].dydj // 电压值
              this.selectData.dianlanList = response.data.data[0].value // dl下拉
              //console.log(response.data.data)
            } else {
              this.Inquire.ljDydj = '' // 清空电压值
              this.selectData.dianlanList = [] // 清空dl下拉
              this.Inquire.ljDl = ''
              this.$message({
                message: 'dydj下拉列表获取失败',
                type: 'error'
              })
            }
          }
        })
      }
    },
    line_changeFun(val) {

    },
    MapOpenfun(val) {
      this.mapdialogConfiguration.showDialog = true
      this.mapdialogConfiguration.electricWellsdata = val
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
      this.tabshow = val.back
      this.getList() // 刷新方法
    },
    // 值守详情关闭弹窗时
    parentFn1(val) {
      this.AddplanShow = false
      this.checkPlanAddshow=false
      this.getList() // 刷新方法
    },
    // 任务值守列表
    getList() {
      // 查询名称赋值
      this.tableParam.lineId = this.Inquire.ljXl // 保电名称
      this.tableParam.logiccableId = this.Inquire.ljDl // 保电等级
      this.tableParam.runrisklevel = this.Inquire.ljDldj // 保电任务单号
      oldcable_list(qs.stringify(this.tableParam)).then(response => {
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
    taskButtonResetClick() {
      this.$refs['Inquire'].resetFields()
      this.$message({
        message: '重置成功',
        type: 'success'
      })
      this.getList()
      // ...
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
