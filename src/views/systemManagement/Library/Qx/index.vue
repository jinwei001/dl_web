<template>
  <div class="main-body-thirdmenu">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="form" inline>
          <el-form-item label="部件：">
            <el-select v-model="form.bj" clearable placeholder="请选择">
              <el-option v-for="(item,ind) in selection.bjlistArr" :key="ind" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部位：">
            <el-select v-model="form.bw" clearable placeholder="请选择">
              <el-option v-for="(item,ind) in selection.bwlistArr" :key="ind" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="六防类型：">
            <el-select v-model="form.sixType" clearable placeholder="请选择">
              <el-option v-for="(item,ind) in selection.lfTypeArr" :key="ind" :label="item" :value="item"></el-option>
            </el-select>
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
              <el-button class="onSearch" @click="Addfun">
                <i class="el-icon-plus"> 新增</i>
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="tableData" height="550" style="border: 1px solid #c7c7c7;width:100%" :cell-style="{borderColor: '#c7c7c7'}" :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}" border fit highlight-current-row>
          <el-table-column fixed type="index" label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{(searchForm.pageNum - 1) * 10 + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="部件" align="center" prop="bj"></el-table-column>
          <el-table-column label="部位" align="center" prop="bw"></el-table-column>
          <el-table-column label="判断依据" align="center" prop="decideBasis" width="300" show-overflow-tooltip></el-table-column>
          <el-table-column label="缺陷等级" align="center" prop="qxGrade"></el-table-column>
          <el-table-column label="巡视内容" align="center" prop="xsContent" show-overflow-tooltip></el-table-column>
          <el-table-column label="六防类型" align="center" prop="sixType"></el-table-column>
          <el-table-column label="状态量名称" align="center" prop="statusName"></el-table-column>
          <el-table-column label="劣化程度" align="center" prop="degradateDegree"></el-table-column>
          <el-table-column label="基本扣分" align="center" prop="basicPoint"></el-table-column>
          <el-table-column label="权重系数" align="center" prop="weight"></el-table-column>
          <el-table-column fixed="right" align="center" label="操作" class-name="small-padding fixed-width"  width="200">
            <div slot-scope="scope">
              <el-button class="onSearch" size="small" @click="editFun(scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="del(scope.row.objId)">删除</el-button>

            </div>
          </el-table-column>
        </el-table>
        <pagination v-show="pageDetail.total>0" :total="pageDetail.total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize" @pagination="getData" />
      </div>
    </div>
    <div v-if="isShowDialog">
      <Add :selection='selection' @childFn="parentFn" :thisDetail='thisDetail' :title="winTitle" />
    </div>

  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import Add from './Add'
import { Message } from 'element-ui'
import {
  qxList as list,
  qxDel as delData,
  lfType,bjList,bwList
} from '@/api/systemManagement'

export default {
  components: {
    Pagination,
    Add
  },
  data() {
    return {
      isShowDialog: false, //查看弹框打开
      winTitle: '新增标准缺陷库',
      isEdit: '',
      thisDetail: {},
      form: {
        bj:'', 
        bw:'',
        sixType:'',
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
        lfTypeArr:[],
        bjlistArr:[],
        bwlistArr:[],
      },
      //选中的数据
      CheckedSelection: [],
      tableData: []
    }
  },
  created() {
    this.getData()
    lfType().then(res=>{
      this.selection.lfTypeArr = res.data.data
    })
     bjList().then(res=>{
      this.selection.bjlistArr = res.data.data
    })
     bwList().then(res=>{
      this.selection.bwlistArr = res.data.data
    })
  },
  methods: {
    async getData() {
      // 获取列表数据
      let res = await list(this.searchForm)
      this.tableData = res.data.rows
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

    reset() {
      this.form = {
           bj:'', 
        bw:'',
        sixType:'',
        pageNum: 1,
        pageSize: 10
      }
      this.onSearch()
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
    editFun(val) {
     this.winTitle = '编辑标准缺陷库'
      this.isShowDialog = true
      this.thisDetail = val
    },
    /**新增按钮 */
    Addfun() {
      this.thisDetail = {}
      this.isShowDialog = true
    },

    /**
     * 接收查看/编辑子组件的数据
     */
    parentFn(val) {
      this.isShowDialog = false
      this.isShowResetPass = false
      this.getData()
    }
  }
}
</script>