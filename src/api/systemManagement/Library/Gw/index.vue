<template>
  <div class="main-body-thirdmenu">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="form" inline>
          <el-form-item label="工艺名称：">
            <el-input v-model="form.gxmc" />
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
        <el-table :data="tableData" height="600" style="border: 1px solid #c7c7c7;width:100%" :cell-style="{borderColor: '#c7c7c7'}" :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}" border fit highlight-current-row :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="objId">
          <el-table-column label="工艺名称" align="center" prop="gxmc"></el-table-column>
          <el-table-column label="工艺编号" align="center" prop="gybh"></el-table-column>
          <el-table-column label="objId" align="center" prop="objId"></el-table-column>
          <el-table-column label="工艺标准" align="center" prop="gybz" show-overflow-tooltip></el-table-column>
          <el-table-column label="是否启用" align="center" prop="sfsy"></el-table-column>
          <el-table-column fixed="right" align="center" label="操作" class-name="small-padding fixed-width" width="330">
            <div slot-scope="scope">
              <el-button class="onSearch" size="small" @click="editFun(scope.row)">编辑</el-button>
              <el-button type="primary" size="small" @click="AddfunChild(scope.row)"> 新增</el-button>
              <el-button type="danger" size="small" @click="del(scope.row.objId)">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
        <pagination v-show="pageDetail.total>0" :total="pageDetail.total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize" @pagination="getData" />
      </div>
    </div>
    <div v-if="isShowDialog">
      <Add :selection='selection' @childFn="parentFn" :thisDetail="thisDetail" :title="winTitle" :isAddChild='isAddChild'/>
    </div>

  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import Add from './Add'
import { Message } from 'element-ui'
import {
  gwList as list,
  gwDel as delData,
} from '@/api/systemManagement'
export default {
  components: {
    Pagination,
    Add
  },
  data() {
    return {
      isShowDialog: false, //查看弹框打开
      isShowResetPass: false, // 充值密码框
      isAddChild:true,
      winTitle: '新增国网工艺库',
      thisDetail: {},
      form: {
        gxmc: '',
     
      },
      pageDetail: {
        total: 0
      },
      searchForm: {
      
      },
      selection: {
        jhlyArr: []
      },
      //选中的数据
      CheckedSelection: [],
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
     
      this.tableData = res.data.data
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
        gxmc: '',
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
      this.thisDetail = val;
      this.isAddChild = false;
      this.isShowDialog = true
    },
    /**新增按钮 */
    Addfun() {
      this.thisDetail = {};
      this.isShowDialog = true
    },
  /**新增按钮 */
    AddfunChild(val) {
      this.thisDetail = val;
      this.isAddChild = true;
      this.isShowDialog = true
    },
    /**
     * 接收查看/编辑子组件的数据
     */
    parentFn(val) {
      this.isShowDialog = false
      this.getData()
    }
  }
}
</script>