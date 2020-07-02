<template>
  <!-- 资源管理模块 -->
  <div class="main-body">
    <div class="content">
      <div class="respont-content">
        <el-form>
          <el-col>
            <el-form-item style="float: left;">
              <el-button class="onSearch" @click="Addfun">
                <i class="el-icon-plus"> 添加菜单</i>
              </el-button>

            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="tableData" height="600" style="border: 1px solid #c7c7c7;width:100%" :cell-style="{borderColor: '#c7c7c7'}" :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'} " row-key="objId" border :default-expand-all='isExpand' :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column prop="menuname" label="菜单名称" width="180">
          </el-table-column>
          <el-table-column prop="objId" label="编号" width="280"> </el-table-column>
          <el-table-column prop="orderNum" label="序号"></el-table-column>
          <el-table-column prop="menuurl" label="请求地址"></el-table-column>
          <el-table-column label="类型">
            <template slot-scope="scope">
              <el-button v-if="scope.row.menutype == 1" size="small" type="primary" plain>菜单</el-button>
              <el-button v-else size="small" type="warning" plain>按钮/功能</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="perms" label="权限标识"></el-table-column>
          <el-table-column fixed="right" align="center" label="操作" class-name="small-padding fixed-width" width="250">
            <div slot-scope="scope">
              <el-button class="onSearch" size="small" @click="edit(scope.row)">编辑</el-button>
              <el-button type="primary" size="small" @click="Addfun(scope.row.id)">新增</el-button>
              <el-button size="small" type="danger" @click="del(scope.row.id)">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-if="isShowDialog">
      <AddFirst @childFn="parentFn" :fmid="fmid" />
    </div>
    <div v-if="isShowDialogChild">
      <Edit @childFn="parentFn" :detail="detail" :tableData='tableData' />
    </div>
  </div>
</template>
<script>
import AddFirst from './AddFirst'
import Edit from './Edit'
import {
  resModelList as list,
  resModelDel as delData
} from '@/api/systemManagement'
export default {
  components: {
    AddFirst,
    Edit
  },
  data() {
    return {
      isShowDialog: false,
      isExpand: true,
      detail: {},
      isShowDialogChild: false,
      fmid: '', // 父节点id
      tableData: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      // 获取列表数据
      let res = await list()
      this.tableData = res.data.data
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
    /**新增按钮 */
    Addfun(fmid) {
      this.fmid = fmid ? fmid : null
      this.isShowDialog = true
      this.isEdit = false
    },
    /**新增按钮子节点 */
    edit(detail) {
      this.detail = detail
      this.isShowDialogChild = true
    },
    parentFn(val) {
      this.isShowDialog = false
      this.isShowDialogChild = false
      this.getData()
    }
  }
}
</script>