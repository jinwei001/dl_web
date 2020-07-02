<template>
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="form" inline>
          <el-form-item style="float: left;">
            <el-input v-model="form.search" clearable placeholder="请输入关键词" />
          </el-form-item>
          <el-form-item>
            <el-button class="onSearch" @click="onSearch">搜索</el-button>
            <el-button class="onSearch" style="margin-right: 0" @click="AddDialog()">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content">
      <div class="repository-left">
        <ul>
          <li
            v-for="(item, index) in catalogArr"
            :key="index"
            :class="{actives:index==liIndex}"
            @click="liClick(item,index)"
          >
            <div class="leftIndex">
              <i class="el-icon-document" />
              <div>{{ item.catalogName }}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          height="530"
          style="border: 1px solid #c4c8cf"
          :cell-style="{borderColor: '#c4c8cf'}"
          :header-cell-style="{'background':'#cddce6',borderColor: '#c4c8cf'}"
          border
          fit
          highlight-current-row
          @selection-change="CheckFun"
        >
          <!-- <el-table-column type="selection" width="55" align="center" /> -->
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column prop="fileTitle" label="文件标题" align="center" />
          <el-table-column prop="keywords" label="关键字" align="center" />
          <el-table-column prop="publishDate" label="发布日期" align="center" />
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button class="onSearch" size="small" @click="editFun(scope.row)">编辑</el-button>
              <el-button class="onSearch" size="small" @click="doDelete(scope.row)">删除</el-button>
              <!-- <el-button class="onSearch" size="small" @click="doView(scope.row)">查看</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="form.total>=0"
          :total="form.total"
          :page.sync="form.pageNum"
          :limit.sync="form.limit"
          @current-change="handleCurrentChange"
          @pagination="getList"
        />
      </div>
    </div>
    <!-- 新增 -->
    <div v-if="isShowDialogAdd">
      <add @childFn="parentFn" />
    </div>
    <!-- 修改 -->
    <div v-if="isShowDialogEdit">
      <edit :is-detail="isDetail" :edit-id="editId" @childFn="parentFn" />
    </div>
    <!--  // 详情
    <div v-if="isShowDialogView">
      <View :is-view="isView" @childFn="parentFn" />
    </div> -->
  </div>
</template>
<script>
import { repositoryMgrMulu as catalogArr, repositoryMgrList as pageList, remove } from '@/api/repositoryMgr/repositoryMgr'
import Pagination from '@/components/Pagination'
import Add from './repositoryMgrAdd'
import Edit from './repositoryMgrEdit'
// import View from './repositoryMgrView'
import qs from 'qs'
export default {
  name: 'RepositoryMgr',
  components: {
    Pagination, Add, Edit
  },
  data() {
    return {
      form: {
        search: '',
        pageNum: 1,
        limit: 10,
        total: 0
      },
      // 左侧
      liIndex: '0',
      repositoryList: [],
      catalogArr: [],
      catalogCode: '',
      isedit: true,
      isDetail: '',
      isView: '',
      editId: '',
      isShowDialogAdd: false,
      isShowDialogEdit: false,
      isShowDialogView: false,
      tableData: []

    }
  },
  created() {

  },
  mounted() {
    this.getCatalogArr()
    this.getPageList()
  },
  methods: {

    // 目录下拉框
    async getCatalogArr() {
      var that = this
      const res = await catalogArr()
      if (res.data.rows) {
        that.catalogArr = res.data.rows
      }
    },
    // 点击左侧li 获取右边列表
    liClick: function(item, index) {
      var that = this
      that.liIndex = index
      this.catalogCode = item.catalogCode
      // //console.log(this.catalogCode)
      that.getPageList()
    },
    // 表格列表
    async getPageList() {
      var params = {
        'catalogCode': this.catalogCode,
        'keywords': this.form.search
      }
      const res = await pageList(params)
      if (res.data.rows) {
        this.tableData = res.data.rows
        this.form.total = res.data.total
      }
    },
    /**
     * 新增按钮
     */
    AddDialog() {
      this.isShowDialogAdd = true
    },
    /**
     * 编辑按钮
     */
    editFun(row) {
      this.isDetail = row.objId
      this.editId = row.objId
      this.isShowDialogEdit = true
    },
    // 查看
    doView(row) {
      this.isView = row.objId
      this.isShowDialogView = true
    },
    /**
     * 查询按钮
     */
    onSearch() {
      this.form.pageNum = 1
      this.getPageList()
    },
    // 选中数据
    CheckFun(val) {
      this.CheckedSelection = val
    },

    getList() {},
    /* 分页 */
    handleCurrentChange(cpage) {
      this.form.pageNum = cpage
      this.getPageList()
    },
    // 删除
    doDelete(row) {
      var that = this
      this.$confirm('是否删除该章节', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        var params = {
          sysProcessFlag: 0,
          objId: row.objId
        }
        remove(qs.stringify(params)).then(res => {
          if (res.status == 200) {
            that.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
          that.getPageList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    /**
     * 接收子组件的数据
     */
    parentFn(val) {
      var that = this
      // that.isShowDialogAdd = val.showDialog
      // that.isShowDialogEdit = val.showDialogEdit
      // that.isShowDialogView = val.showDialogView
      that.isShowDialogAdd = false
      that.isShowDialogEdit = false
      that.isShowDialogView = false

      if (val.states == 'success') {
        that.getPageList()
      }
    }
  }
}
</script>
<style lang="scss" scoped>

.content{
  background-color: #fff !important;
  color: #118477 !important;
  border-right: none;
  height: 100%;
  position: relative;
}
.repository-left {
   float: left;
  position: relative;
  top: 0;
  width: 320px;
  height: 100%;
  background: #f7f7f7;
  border: 1px solid #f3f2f2;
  border-right: none;
  border-top: none;
}
.table{
  position: relative;
  top: 0;
  width: calc(100% - 320px);
  height: 100%;
  float: left;
}
.repository-left ul {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.repository-left ul li {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #676767;
  cursor: pointer;
}
.leftIndex {
  width: 100%;
  padding: 0 50px;
  height: 60px;
  line-height: 60px;
}
.leftIndex i {
  font-size: 18px;
  width: 50px;
  height: 60px;
  line-height: 60px;
  float: left;
  vertical-align: middle;
}
.leftIndex div {
  float: left;
  font-size: 16px;
  height: 60px;
  line-height: 60px;
  overflow: hidden;
  padding-left: 30px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
.actives {
  background-color: #fff !important;
  color: #118477 !important;
  border-right: none;
}
</style>
