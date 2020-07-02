<template>
  <!-- <h2>
      xl巡视计划管理
  </h2>-->
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="form" inline>
          <el-form-item label="操作人：">
           <el-input v-model="form.uname" />
          </el-form-item>
          <el-form-item label="事件：">
            <el-input v-model="form.method" />
          </el-form-item>
          <el-form-item style="float: right;margin-right: 0">
            <el-button size="small" class="onSearch" @click="onSearch">查询</el-button>
            <el-button size="small" class="onSearch" @click="reset" style="margin-right: 0">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content">
      <div class="respont-content">
        <el-form>
          <el-col>
            <el-form-item style="float: left;">
              <el-button type="success" plain @click="upload">
               <i class="el-icon-document"> 导出 EXCEL</i> 
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="tableData" height="600" style="border: 1px solid #c7c7c7;width:100%" :cell-style="{borderColor: '#c7c7c7'}" :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}" border fit highlight-current-row @selection-change="CheckFun">
          <el-table-column fixed type="selection" width="55" align="center"></el-table-column>
          <el-table-column fixed type="index" label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{(searchForm.pageNum - 1) * 10 + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作人" align="center" prop="uname" width="180"></el-table-column>
          <el-table-column label="事件" align="center" prop="method" show-overflow-tooltip ></el-table-column>
          <el-table-column label="ip" align="center" prop="ip"  width="250"></el-table-column>
          <el-table-column label="发生时间" align="center" prop="happenDate" width="220"></el-table-column>
        </el-table>
        <pagination v-show="pageDetail.total>0" :total="pageDetail.total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize" @pagination="getData" />
      </div>
    </div>

    <div v-if="isShowDialog">
      <Add :selection='selection' @childFn="parentFn" :isEdit="isEdit" :openID="openID" :title="winTitle"/>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import Add from './Add'
import { Message } from 'element-ui'
import {
  logsList as list,logsExport

} from '@/api/systemManagement'
export default {
  components: {
    Pagination,
    Add
  },
  data() {
    return {
      isShowDialog: false, //查看弹框打开
      winTitle:'添加用户',
      isEdit:'',
      openID: '',
      thisDetail: {},

      form: {
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
     
      //选中的数据
      tableData: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      // 获取列表数据
      let res = await list(this.searchForm)
      this.tableData = res.data.rows
      this.pageDetail.total = res.data.total
    },


    /** 导出 */
    upload() {
      for (let key in this.form) {
        this.searchForm[key] = this.form[key]
      }
      logsExport(this.searchForm).then(res => {
        window.location.href =
          process.env.VUE_APP_BASE_API +
          '/common/download?fileName=' +
          res.data.msg +
          '&delete=true'
      })
    },
    reset() {
      this.form = {
        pageNum: 1,
        pageSize: 10
      }
    },
    onSearch() {
      for (let key in this.form) {
        this.searchForm[key] = this.form[key]
      }
      this.getData()
    },

    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val
    },

  }
}
</script>
