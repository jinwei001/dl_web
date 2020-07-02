<template>
  <div v-if="tableheaderpn.length>0">
    <el-table
      v-loading="loading"
      :data="tableData"
      style="border: 1px solid #c7c7c7;text-align: center;"
      :cell-style="{borderColor: '#c7c7c7'}"
      :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}"
      border
      fit
      highlight-current-row
      element-loading-text="数据正在加载中"
    >
      <el-table-column type="index" label="序号" width="60" align="center" />
      <!--表格列-->
      <el-table-column
        v-for="(item,index) in tableheaderpn"
        :key="item.index"
        :prop="item.prop"
        :label="item.label"
        align="center"
        :show-overflow-tooltip="true"
        :width="item.width"
      >
        <template slot-scope="scope">
          <p v-if="item.type==='text'">{{ scope.row[item.prop] }}</p>
          <span v-if="item.type==='Buttom'">
            <el-button v-if="scope.row[item.prop]!==null" class="onSearch" type="primary" size="mini">
              <span v-if="item.fun_starts==='download'">
                <a class="download" :href="Src+scope.row[item.prop]" download="" :title="item.Buttom_text">{{ item.Buttom_text }}</a>
              </span>
               <a v-if="item.fun_starts==='open'" @click="open(scope.row,typepn)">{{item.Buttom_text}}</a>
            </el-button>
            <span>无</span>
          </span>
        </template>
      </el-table-column>
      <!--操作模板${$jk-->
      <el-table-column
        v-if="typepn!=='gz'&&typepn!=='dd'"
        fixed="right"
        label="操作"
        min-width="120"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          
          <el-button v-if="typepn==='qx'" class="onSearch" type="primary" size="mini" @click="QXchakang(scope.row,'QX')">查看</el-button>
          <el-button v-if="typepn==='yh'" class="onSearch" type="primary" size="mini" @click="YHchakang(scope.row,'YH')">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="tableParam.total" :page.sync="tableParam.pageNum" :limit.sync="tableParam.limit" @pagination="getList" />
    <div v-if="typepn==='qx'">
      <CheckAndSure
        v-if="QXdialog.isCheck===true"
        :selection="QXdialog.selection"
        :is-check="QXdialog.isCheck"
        :this-detail="QXdialog.thisDetail"
        :title="QXdialog.thisTitle"
        @childFn="parentFn"
      />
    </div>
    <div v-if="typepn==='yh'">
      <Viewcmp
        v-if="YHdialog.ProcessingReviewData.show===true"
        :submitparameter="YHdialog.ProcessingReviewData"
        :selection="YHdialog.selection"
        @childFn="parentFn"
      />
    </div>
  </div>
</template>

<script>
import {

  oldcable_list, // 列表
  oldcable_detail // 列表
} from '@/api/oldDL/JX'

import qs from 'qs'
import Pagination from '@/components/Pagination'
import CheckAndSure from '../../defect/register/CheckAndSure'
import Viewcmp from '../../six-prevention/information-audit/cmp/Viewcmp.vue'
import {
  xlList, // XL列表
  getDy // 电压

} from '@/api/defect'
export default {
  name: 'CableMaintenance',
  components: {
    Pagination,
    CheckAndSure,
    Viewcmp

  },
  props: {

    tableheaderpn: {
      type: Array,
      default: function() {
        return []
      }
    },
    typepn: {
      type: String,
      default: function() {
        return ''
      }
    },
    oldobjPn:{//老旧参数
         type: Object,
         // 对象或数组且一定会从一个工厂函数返回默认值
         default: function() {
           return {}
         }
    }
  },
  data() {
    return {
      Src: process.env.VUE_APP_BASE_API,
      loading: true, // 加载状态
      tableData: [], // 值守任务列列表数据
      tableParam: { // 值守列表分页和查询参数集合
        total: 0,
        pageNum: 1,
        pageSize: 10,
        limit: 10,
        type: this.typepn,
        logiccableId:''
      },

      // 弹窗参数配置
      QXdialog: {
        isCheck: false,
        thisDetail: {},
        title: '',
        selection: {}
      },
      // 弹窗参数配置
      YHdialog: {
        ProcessingReviewData: {
          id: '3',
          show: false,
          Police: false,
          Detailsdata: {}
        },
        selection: {}
      }
    }
  },
  mounted() {
    if(Object.keys(this.oldobjPn).length>0){
       this.oldHideshow=true
       this.tableParam.logiccableId=this.oldobjPn.logiccableId
    }
    // //console.log(this.tableheaderpn, '列')
    this.getList()
  },
  methods: {
    open(val,type){
      // //console.log(val,type)
    },
    QXchakang(val) {
      // 查看
      this.QXdialog.thisTitle = '查看'
      this.QXdialog.thisDetail = val
      this.QXdialog.isCheck = true

      xlList().then(res => {
        // XL
        this.QXdialog.selection.linesSelectArr = res.data.data
      })
      getBz().then(res => {
        // 发现方式getBz
        this.QXdialog.selection.bzSelectArr = res.data.data
      })
    },
    YHchakang(val) {
      // 查看
      this.YHdialog.ProcessingReviewData.Detailsdata = val
      this.YHdialog.ProcessingReviewData.starts = 0
      this.YHdialog.ProcessingReviewData.Police = true
      this.YHdialog.ProcessingReviewData.show = true
    },
    // 值守详情关闭弹窗时
    parentFn(val) {
      this.QXdialog.isCheck = false
      this.YHdialog.ProcessingReviewData.show = false
    },
    // 任务值守列表
    getList() {
      oldcable_detail(qs.stringify(this.tableParam)).then(response => {
        if (response.status === 200) {
          if (response.data.code === 0) {
            const _this = this
            setTimeout(function() {
              _this.loading = false
            }, 600)

            this.tableData = response.data.data.rows
            this.tableParam.total = response.data.data.total // 总页数
          } else {
            this.tableData = []
            this.tableParam.total = 0
            this.$message({
              message: '列表获取失败',
              type: 'error'
            })
          }
        }
      })
    }
  }
}
</script>

<style>
</style>
