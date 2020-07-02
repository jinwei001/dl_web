<template>
  <!-- <h2>
      XL巡视计划管理
  </h2>-->
  <div class="main-body">
    <div class="content">
      <div class="respont-content">
        <el-form>
          <el-col>
            <el-form-item style="float: left;">
              <el-button class="onSearch" @click="Addfun">
                <i class="el-icon-plus"> 新增</i>
              </el-button>
              <el-button type="danger" plain @click="DelAllFn">
                <i class="el-icon-close"></i> 删除
              </el-button>
              <el-button class="onSearch" @click="shangchengfun">
                <i class="el-icon-plus"> 生成带电检测计划</i>
              </el-button>
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
          <el-table-column :label="`${$dydj}`" align="center" prop="dydj"></el-table-column>
          <el-table-column :label="`${$xl}名称`" align="center" prop="xlmc" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column :label="`${$dl}`" align="center" prop="dlmc" width="200"></el-table-column>
          <el-table-column label="设备类型" align="center" prop="sblx" width="120"></el-table-column>
          <el-table-column label="检测类型" align="center" prop="jclx"></el-table-column>
          <el-table-column label="设备名称" align="center" prop="sbmc" width="160"></el-table-column>
          <el-table-column :label="`${$xb}`" align="center" prop="xw"></el-table-column>
          <el-table-column label="计划开始时间" align="center" prop="jhkssj" width="160"></el-table-column>
          <el-table-column label="计划结束时间" align="center" prop="jhjssj" width="160"></el-table-column>
          <el-table-column label="计划来源" align="center" prop="jhly" width="120"></el-table-column>
          <el-table-column label="检测班组" align="center" prop="jcbz"></el-table-column>
          <el-table-column label="检测人" align="center" prop="jcr"></el-table-column>
          <el-table-column label="检测单位" align="center" prop="jcdw"></el-table-column>
          <el-table-column align="center" label="操作" class-name="small-padding fixed-width" width="230">
            <div slot-scope="scope" class="">
              <el-button class="onSearch"  @click="editFun(scope.row.id)">编辑</el-button>
              <el-button plain  type="danger" @click="del(scope.row.id)">删除</el-button>
             <!-- <el-button size="mini" type="primary" @click="del(scope.row.jclx)">录入结果</el-button> -->
            </div>
          </el-table-column>
        </el-table>
        <pagination v-show="pageDetail.total>0" :total="pageDetail.total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize"
          @pagination="getData" />
      </div>
    </div>

    <div v-if="isShowDialog">
      <Add :selection='selection' @childFn="parentFn" :isEdit="isEdit" :openID="openID" :objId='objId' :lineid='lineid'/>
    </div>
    <!-- <div v-if="isShowAddBatch">
      <AddBatch :selection='selection' @childFn="parentFn" />
    </div>
    <div v-if="isShowLookOver">
      <LookOver :selection='selection' @childFn="parentFn" :openID="openID" />
    </div> -->
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import Add from './add'
  import qs from 'qs'
  // import AddBatch from './AddBatch'
  // import LookOver from './LookOver'
  import {
    Message
  } from 'element-ui'
  import {
    planDel as delData,
    xw, // xb
    linesSelect, // XL下拉
    dlSelect, // DL下拉
    jcbzSelect // 检测班组
  } from '@/api/liveDetectionManage'
  import {
    planList as list,
    tHiddendangerMessageCreatRealyElePlanInfo
  } from '@/api/Sixdefensemanagement/Hiddeninformationlist.js'
  export default {
    components: {
      Pagination,
      Add,
      // AddBatch,
      // LookOver
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
    data() {
      return {
        isShowDialog: false, //查看弹框打开
        isShowAddBatch: false,
        isShowLookOver: false,
        isEdit: false, //是否是编辑弹框
        openID: null, //打开弹框的id值
        ddjc_sb_arr: {
          sb: [
            [this.$dl+'终端', this.$dl+'接头', this.$dl+'分支处', '接地线'],
            [this.$dl+'终端', this.$dl+'接头', '交叉互联线', '接地线'],
            [this.$dl+'终端', this.$dl+'接头']
          ]
        },
        form: {
          xlid:'',
          dlid: '',
          xw: '',
          jhly: '',
          jcbz: '',
          date: [],
          pageNum: 1,
          pageSize: 10,
        },
        pageDetail: {
          total: 0
        },
        searchForm: {
          pageNum: 1,
          pageSize: 10,
          lfid: this.objId
        },
        selection: {
          linesSelectArr: [], // XL名称
          dlSelectArr: [], // DL
          ddjcArr: ['红外测温', '金属护层接地电流测量', '局部放电检测'], // 带电检测类型
          sblxArr: [this.$dl+'终端', this.$dl+'接头', this.$dl+'分支箱', '交叉互联箱', this.$dl+'接地箱'], // 检测设备类型
          jcbzSelectArr: [], // 检测班组
          xwArr: [],
          sbmcArr: [],
          jhlyArr: []
        },
        //选中的数据
        CheckedSelection: [],
        tableData: [],
        shangchuArry: [] //生成数据
      }
    },
    created() {
      this.getData()

      linesSelect().then(res => {
        // XL
        this.selection.linesSelectArr = res.data.rows
      })
      jcbzSelect().then(res => {
        // 检测班组
        this.selection.jcbzSelectArr = res.data.rows
      })

      xw({
        fzmc: 'DLxingX'
      }).then(res => {
        // xb
        this.selection.xwArr = res.data.rows
      })
      xw({
        fzmc: '带电检测计划来源'
      }).then(res => {
        // 计划来源
        this.selection.jhlyArr = res.data.rows
      })
    },
    mounted() {
      //console.log(this.objId)
    },
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
        this.pageDetail.total = res.data.total
      },
      /** DLchange 获取DL */
      getDlList(lineId) {
        dlSelect({
          lineId
        }).then(res => {
          // DL
          this.selection.dlSelectArr = res.data.rows
        })
      },
      /** 带电检测类型change 获取设备类型 */
      getSblxList(ind) {
        this.selection.jcsblxArr = this.ddjc_sb_arr.sb[ind]
      },
      /**删除所有 */
      DelAllFn() {
        if (this.CheckedSelection.length == 0) {
          this.$message('请选择要编辑的数据')
          return
        }
        let idsArr = []
        this.CheckedSelection.forEach(v => {
          idsArr.push(v.id)
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
          window.location.href =
            process.env.VUE_APP_BASE_API +
            '/common/download?fileName=' +
            res.data.msg +
            '&delete=true'
        })
      },
      reset() {
        this.form = {
          xlid: '',
          dlid: '',
          ddjclx: '',
          sblx: '',
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
      CheckFun(val) {
        this.CheckedSelection = val
        for (let i = 0; i < this.CheckedSelection.length; i++) {
          this.shangchuArry.push(this.CheckedSelection[i].id)
        }
        //console.log(this.shangchuArry)
      },
      shangchengfun() {
        if (this.shangchuArry.length > 0) {
          let data = {
            objId: this.shangchuArry.toString()
          }
          tHiddendangerMessageCreatRealyElePlanInfo(qs.stringify(data)).then(response => {
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
      /** 批量新增 */
      batchBtn() {
        this.isShowAddBatch = true
        this.isEdit = false
      },
      lookOverBtn(val) {
        this.isShowLookOver = true
        this.isEdit = false
        this.openID = val
      },
      /**
       * 接收查看/编辑子组件的数据
       */
      parentFn(val) {
        this.isShowDialog = false
        this.isShowAddBatch = false
        this.isShowLookOver = false
        this.getData()
      }
    }
  }
</script>
