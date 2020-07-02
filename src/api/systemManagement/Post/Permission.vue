<template>
  <div class="xs-hastitle">
    <el-dialog :visible.sync="showDialog" title="编辑权限" v-dialogDrag :center=" true" width="25%" :before-close="handleClose">
      <el-tree :data="data" show-checkbox node-key="id" :default-expanded-keys="checkId" :default-checked-keys="checkId" :props="defaultProps" ref="tree">
      </el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { resModelList as list, psotmenu as edit } from '@/api/systemManagement'

export default {
  props: {
    /**
     * 接收是否打开页面
     */
    thisDetail: {}
  },
  data() {
    return {
      data: [],
      checkId: [],
      defaultProps: {
        children: 'children',
        label: 'menuname'
      },
      showDialog: true
    }
  },
  created() {
    this.checkId = this.thisDetail.menuIds
    console.log(this.thisDetail)
    list({ objId: this.thisDetail.objId }).then(res => {
      this.data = res.data.data
    })
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('childFn', {
            showDialog: this.showDialog
          })
          done()
        })
        .catch(_ => {})
    },
    /**
     * 确认按钮
     */
    SuerFun() {
      edit({
        menuIds: this.$refs.tree.getCheckedKeys().join(','),
        objId: this.thisDetail.objId
      }).then(res => {
        let val = res.data
        let type = val.code == 0 ? 'success' : 'error'
        this.$message({ type, message: val.msg })
        if (val.code == 0)
          this.$emit('childFn', {
            showDialog: false
          })
      })
    }
  }
}
</script>
