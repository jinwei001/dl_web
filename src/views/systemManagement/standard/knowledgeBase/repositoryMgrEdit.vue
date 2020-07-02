<template>
  <!-- <h2>
      知识库-编辑
  </h2>-->
  <div class="hastitle">
    <el-dialog
      v-dialogDrag
      :visible.sync="showDialogEdit"
      title="知识库资料编辑"
      :center="true"
      :before-close="resetForm"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="required-ruleForm"
      >
        <el-form-item label="目录:" prop="catalogCode">
          <el-select v-model="ruleForm.catalogCode" clearable placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in catalogArr"
              :key="item.catalogCode"
              :label="item.catalogName"
              :value="item.catalogCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="文件标题:" prop="fileTitle">
          <el-input v-model="ruleForm.fileTitle" clearable />
        </el-form-item>
        <el-form-item label="关键字:" prop="keywords" style="width:100%">
          <el-input v-model="ruleForm.keywords" clearable style="width:42%" />
        </el-form-item>
        <el-form-item label="选择文件:" prop="pdfFile" style="float:unset">
          <div class="upload" style="width:100%">
            <input id="uppic1" ref="avatarInput1" type="file" name="avatar" class="uppic" @change="changeImage1($event)">
          </div>
        </el-form-item>
        <el-form-item label="预览:">
          <el-button v-if="ruleForm.pdfCode && ruleForm.pdfCode!=''" title="预览" type="primary" circle icon="el-icon-view" @click="showFile" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun('ruleForm')">保存</el-button>
        <el-button class="onSearch" @click="resetForm">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      v-if="showDocFlag"
      title="文件预览"
      :visible.sync="showDocFlag"
      width="60%"
      top="50px"
    >
      <iframe style="width:99%;margin:0 auto;height:700px;overflow:auto;" border="0" :src="curFileUrl" />
    </el-dialog>
  </div>
</template>

<script>
import {
  repositoryMgr as add,
  repositoryMgrMulu as catalogArr,
  repositoryMgrList as pageList,
  getDetail,
  remove
  // remove1
} from '@/api/repositoryMgr/repositoryMgr'
import Pagination from '@/components/Pagination'
import '@/styles/myStyle/index.scss'
import qs from 'qs'
export default {
  components: {
    Pagination
  },
  props: ['isDetail', 'editId'],
  data() {
    return {
      showDialogEdit: true,
      showDocFlag: false,
      ruleForm: {
        catalogCode: '',
        fileTitle: '',
        keywords: '',
        pdfCode: ''
      },
      curFileUrl: '',
      imgUrl: '',
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
    this.getDetailForm()
    this.getCatalogArr()
  },
  methods: {
    showFile() {
      this.showDocFlag = true
    },
    // 获取详情
    getDetailForm() {
      var that = this
      var params = {
        'objId': this.isDetail
      }
      getDetail(params).then(res => {
        // that.ruleForm = { id: 1 }
        that.ruleForm.catalogCode = res.data.data.catalogCode
        that.ruleForm.fileTitle = res.data.data.fileTitle
        that.ruleForm.keywords = res.data.data.keywords
        that.ruleForm.pdfCode = res.data.data.pdfCode
        var str = ''
        if (process.env.NODE_ENV === 'development') {
          str = process.env.VUE_APP_BASE_API
        } else {
          str = process.env.VUE_APP_BASE_API
        }
        that.curFileUrl = str + that.ruleForm.pdfCode
      })
    },
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
      obj.showDialogEdit = this.showDialogEdit
      this.$emit('childFn', obj)
    },
    /**
     * 确认按钮
     */

    SuerFun(formName) {
      var that = this
      that.$refs[formName].validate(async valid => {
        if (valid) {
          for (const key in that.ruleForm) {
            that.param.append(key, that.ruleForm[key])
          }
          that.param.append('objId', that.isDetail)
          const res = await remove(that.param)
          //console.log(res)
          if (res.status == 200) {
            that.$message({
              type: 'success',
              message: '编辑成功'
            })
            that.resetForm()
            var obj = {}
            obj.states = 'success'
            that.$emit('childFn', obj)
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
