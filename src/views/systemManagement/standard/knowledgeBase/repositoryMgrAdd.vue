<template>
  <!-- <h2>
      知识库-新增
  </h2>-->
  <div class="hastitle">
    <el-dialog v-dialogDrag :visible.sync="showDialog" title="知识库资料新增" :center="true" :before-close="resetForm">

      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="required-ruleForm">
        <el-form-item label="目录:" prop="catalogCode">
          <!-- <el-input v-model="ruleForm.zq" clearable @input.native="period" /> -->
          <!-- <el-input v-model="ruleForm.zq" clearable /> -->
          <el-select v-model="ruleForm.catalogCode" clearable placeholder="请选择" style="width:100%">
            <el-option v-for="item in catalogArr" :key="item.catalogCode" :label="item.catalogName" :value="item.catalogCode" />
          </el-select>
        </el-form-item>
        <el-form-item label="文件标题:" prop="fileTitle">
          <el-input v-model="ruleForm.fileTitle" clearable />
        </el-form-item>
        <el-form-item label="关键字:" prop="keywords" style="width:100%">
          <!-- <el-date-picker v-model="ruleForm.scxssj" type="datetime" placeholder="选择日期时间" style="width:42%" /> -->
          <el-input v-model="ruleForm.keywords" clearable style="width:42%" />

        </el-form-item>
        <el-form-item label="选择文件:" prop="pdfFile">
          <div class="upload">
             <input id="uppic1" ref="avatarInput1" type="file" name="avatar" class="uppic" @change="changeImage1($event)">
          </div>
          <!-- <el-input v-model="ruleForm.yq" clearable /> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun('ruleForm')">保存</el-button>
        <el-button class="onSearch" @click="resetForm">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  repositoryMgr as add,
  repositoryMgrMulu as catalogArr
//   lineDetail
} from '@/api/repositoryMgr/repositoryMgr'
import Pagination from '@/components/Pagination'
import '@/styles/myStyle/index.scss'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      showDialog: true,
      ruleForm: {},

      catalogArr: [],
      param: new FormData(),
      rules: {
        fileTitle: [
          { required: true, message: '请输入文件标题', trigger: 'blur' }
        ]
      }
    }
  },

  watch: {},
  created() {

  },
  mounted() {
    this.getCatalogArr()
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
    addImage1() {
      this.$refs.avatarInput1.click()
    },
    changeImage1(e) {
      var file = e.target.files[0]
      this.param.append('pdfFile', file, file.name)
    },

    /**
     * 取消按钮
     */
    resetForm() {
      var obj = {}
      obj.states = '返回'
      obj.dalogAdd = this.showDialog
      this.$emit('childFn', obj)
    },
    /**
     * 确认按钮
     */
    SuerFun(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          for (const key in this.ruleForm) {
            this.param.append(key, this.ruleForm[key])
          }
          const res = await add(this.param)
          if (res.status == 200) {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            var obj = {}
            obj.states = 'success'
            this.$emit('childFn', obj)
            this.resetForm()
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>
