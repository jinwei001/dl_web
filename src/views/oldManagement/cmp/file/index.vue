<template>
  <div>

    <div class="record-operation">
      <el-button type="primary" size="small" class="onSearch" @click="taskButtonAddClick">新增</el-button>
      <el-button type="danger" size="small" plain @click='shangchufun' v-if="shangchuArry.length>0">删除</el-button>
    </div>
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
      @selection-change="CheckFun"
    >
     <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column type="index" label="序号" width="60" align="center" />
      <!--表格列-->
      <el-table-column prop="url" label="文件地址" align="center" :show-overflow-tooltip="true" />
      <el-table-column prop="buildDate" label="上传时间" align="center" :show-overflow-tooltip="true" />
      <!--操作模板${$jk-->
      <el-table-column fixed="right" label="操作" width="100" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
       <!--    <el-button  class="onSearch" type="primary" size="mini" style="width: 30%;">查看文件</el-button> -->
           <el-button class="onSearch" type="primary" size="mini" style="width: 100%;">
              <a class="download" :href="Src+scope.row.url" download="" title="下载附件" v-if="scope.row.url!==''">下载附件</a>
             </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="tableParam.total" :page.sync="tableParam.pageNum" :limit.sync="tableParam.limit" @pagination="getList" />
    <el-dialog
      v-if="dialogParameter.showDialogadd===true"
      title="新增"
      :visible.sync="dialogParameter.showDialogadd"
      :close-on-click-modal="false"
      min-width="500px"
      :width="dialogParameter.dialogWidth"
      center
      :before-close="(value)=> handleClose(value,'1')"
    >
      <!--表单-->
      <el-form ref="form" :model="form" :rules="formRules" label-position="right" label-width="150px">

        <el-form-item label="上传原因分析" class="el-form-itemstyle" prop="fileList.Powersavingtasklistname">
          <el-upload
           class="upload-demo"
            ref="upload"
            action="/"
            accept=".doc,.docx,.xlsx,.xls,.pdf"
            :on-change="(file, fileList)=>handleChange(file, fileList,'one')"
            :show-file-list="false"
            :on-success="onSuccess"
            :on-error="onError"
            :auto-upload="false"
            :before-upload="beforUploadflie"
            list-type="picture"
          >
            <span style="margin-right: 15px;">{{ form.fileList.Powersavingtasklistname }}</span>
             <el-button type="primary" class="onSearch" size="small" v-if="form.fileList.Powersavingtasklistname===''">上传附件</el-button>
             <el-button type="primary" class="onSearch" size="small" v-else>更换附件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" class="onSearch" @click="addfun">保存</el-button>
        <el-button type="default" size="small" class="UserSearchFun" @click="(value)=> handleClose(value,'1')">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  oldcable_detail, // 列表
  oldcable_upload,
  oldcable_add,
  oldcable_remove
} from '@/api/oldDL/JX'

import qs from 'qs'
import Pagination from '@/components/Pagination'

import {
  xlList, // lx列表
  getDy // 电压
} from '@/api/defect'
export default {
  name: 'CableMaintenance',
  components: {
    Pagination

  },
  props: {
    typepn: {
      type: String,
      default: function() {
        return ''
      }
    },
    oldobjPn: { // 老旧参数
      type: Object,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      form: {
       fileList: {
         Powersavingtasklistname: '',
         PowersavingtasklistSrc: ''
       }
      },
      formRules: {
        SingleNumber: [{
          required: true,
          message: '请输入保电任务单号',
          trigger: 'change'
        }]
      },
      dialogParameter: {
        dialogWidth: '30%',
        title: '未知',
        showDialogadd: false, // 打开弹框
        showDialogDetails: false // 打开弹框
      },
      Src: process.env.VUE_APP_BASE_API,
      loading: true, // 加载状态
      tableData: [], // 值守任务列列表数据
      tableParam: { // 值守列表分页和查询参数集合
        total: 0,
        pageNum: 1,
        pageSize: 10,
        limit: 10,
        logiccableId: '',
        type: this.typepn,
      },
      shangchuArry:[]
    }
  },
  mounted() {
    if (Object.keys(this.oldobjPn).length > 0) {
      this.oldHideshow = true
      this.tableParam.logiccableId = this.oldobjPn.logiccableId
    }
    this.getList()
  },
  methods: {
    handleChange(file, fileList, num) {
      const isLt2M = file.size / 1024 / 1024 < 25;
      if (!isLt2M) {
        this.$message.error('文件不能超过 25MB!');
      } else {
        if (fileList.length > 0) {
          let fd = new FormData()
          fd.append('file', file.raw)
          fd.append('type', 'oldCable')
          oldcable_upload(fd).then(response => {
            if (response.status === 200) {
              if (response.data.code === 0) {
                if (num === 'one') { //保电任务单
                  this.form.fileList.Powersavingtasklistname = file.name //名称
                  this.form.fileList.PowersavingtasklistSrc = response.data.msg //地址
                }
                this.$message({
                  message: '文件上传成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '文件上传失败',
                  type: 'error'
                })
              }
            }
          })
        }
      }
    },
    addfun() {
      let data = {
        logiccableId: this.oldobjPn.logiccableId, //保电名称
        url:this.form.fileList.PowersavingtasklistSrc,//保电任务单
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          oldcable_add(qs.stringify(data)).then(response => {
            if (response.status == 200) {
              if (response.data.msg == '操作成功') {
                this.$message({
                  message: response.data.msg,
                  type: 'success'
                })
                this.dialogParameter.showDialogadd = false;
                this.$refs['form'].resetFields();
                this.getList()
              } else {
                this.$message({
                  message: response.data.msg,
                  type: 'error'
                })
              }
            }
          })
        }
      })
    },
    onSuccess(res) {
      this.$alert(res.data, '提示', {
        confirmButtonText: '确定',
        callback: action => {
          // //console.log('上传成功')
        }
      })
    },
    onError(res) {
      this.$alert('创建失败', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          // //console.log('上传失败')
        }
      })
    },
    beforUploadflie(file) {
      const isLt2M = file.size / 1024 / 1024 < 25;
      if (!isLt2M) {
        this.$message.error('文件不能超过 25MB!');
      }
      return isLt2M
    },
    taskButtonAddClick() {
      this.dialogParameter.showDialogadd = true
     this.dialogParameter.title='上传新增'
    },
    taskButtonEditClick(val) {
      this.form.fileList.Powersavingtasklistname=val.url
      this.dialogParameter.title='编辑'
      this.dialogParameter.showDialogadd = true
    },
    handleClose(done, num) {
      this.$confirm('确认关闭？')
        .then(_ => {
          if (num === '1') {
            this.$refs['form'].resetFields()
          }
          this.dialogParameter.showDialogadd = false
          // this.dialogParameter.showDialogDetails = false

          done()
        })
        .catch(_ => {
          // //console.log('失败')
        })
    },
    // 任务值守列表
    getList() {
      oldcable_detail(qs.stringify(this.tableParam)).then(response => {
        if (response.status === 200) {
          if (response.data.code === 0) {
            const _this = this
            setTimeout(function() {
              _this.loading = false
            }, 1000)

            this.tableData = response.data.data.rows
            this.tableParam.total = response.data.data.total // 总页数
          } else {
            this.tableData = []
            this.tableParam.total = 0
            this.$message({
              message: '保电列表获取失败',
              type: 'error'
            })
          }
        }
      })
    },
    // 选中数据
    CheckFun(val) {
      this.shangchuArry = []
      let CheckedSelection = val
      if (CheckedSelection.length > 0) {
        for (let i = 0; i < CheckedSelection.length; i++) {
          this.shangchuArry.push(CheckedSelection[i].objId)
        }
      }
    },
    //删除
    shangchufun() {
     
      let data = {
        ids: this.shangchuArry.toString()
      }
      oldcable_remove(qs.stringify(data)).then(response => {
        if (response.status == 200) {
          if (response.data.msg === '操作成功') {
            this.$message({
              message: response.data.msg,
              type: 'success'
            })
            this.getList()
          } else {
            this.$message({
              message: response.data.msg,
              type: 'error'
            })
          }
        }
      })
    },
  }
}
</script>

<style>
</style>
