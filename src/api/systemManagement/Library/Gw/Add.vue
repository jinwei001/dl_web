<template>
  <div class="xs-hastitle">
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-dialog :visible.sync="showDialog" :title="title" v-dialogDrag :center="true" width="50%" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="required-ruleForm">
        <el-form-item label="工艺名称：" prop="gxmc">
          <el-input v-model="ruleForm.gxmc" />
        </el-form-item>
        <el-form-item label="上级工艺编号：" prop="fjdid" v-if='!isFir&&isAddChild'>
          <el-input v-model="ruleForm.fjdid" disabled @input.native='period' />
        </el-form-item>
        <el-form-item label="工艺编号：" prop="gybh">
          <el-input v-model="ruleForm.gybh" @input.native='period' />
        </el-form-item>
        <el-form-item label="启用：" prop="sfsy">
          <el-select v-model="ruleForm.sfsy" clearable placeholder="请选择">
            <el-option label="启用" value="是"></el-option>
            <el-option label="停用" value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序：" prop="px">
          <el-input v-model="ruleForm.px" @input.native='period' />
        </el-form-item>
        <el-form-item label="标准：" prop="gybz" style="width:100%">
          <el-input type="textarea" size="medium" v-model="ruleForm.gybz" />
        </el-form-item>
        <el-form-item label="图片：" style="width:100%">
          <div class="imgCon picCon">
            <div v-for="(img,ind) in photoUrl" :key="ind" class="imgCont">
              <img :src='publicIp+img' alt="">
              <div class="doImgBtn">
                <i class="el-icon-delete del" @click="delImg(ind)"></i>
                <i class="el-icon-zoom-in big" @click="showBig(img)"></i>
              </div>
            </div>
            <el-form-item class="addPic">
              <div tabindex="0" class="imgcard">
                <i class="el-icon-plus avatar-uploader-icon"></i>
                <input type="file" @change="upLoadvisibleLight($event)" name="picture" accept="image/*" class="el-upload__input">
              </div>
            </el-form-item>
          </div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { uploadPicture } from '@/api/liveDetectionManage'
import { gwAdd as add, gwEdit as edit } from '@/api/systemManagement'

export default {
  props: {
    selection: {},
    title: {
      type: String,
      default: '新增国网工艺库'
    },
    isAddChild: {
      type: Boolean,
      default: true
    },
    thisDetail: {}
  },
  data() {
    return {
      isFir: false,
      dialogVisible: false,
      dialogImageUrl: false,
      publicIp: '',
      photoUrl: [],
      ruleForm: {
        gxmc: '', // xl
        fjdid: '', // dl
        gybh: '',
        sfsy: '',
        px: '',
        gybz: '',
        picUrl: ''
      },
      rules: {
        gxmc: [{ required: true, message: '请输入工艺名称' }],
        gybh: [{ required: true, message: '请输入工艺编号' }],
        px: {
          min: 1,
          max: 2,
          message: '长度在 1 到 2 位之间',
          trigger: 'input'
        }
      },
      showDialog: true, //打开弹框
      oldPlanstarts: false
    }
  },
  created() {
    this.publicIp = process.env.VUE_APP_BASE_API
    console.log(this.thisDetail)
    this.isFir = Object.keys(this.thisDetail).length == 0
    if (this.isAddChild) {
      // 新增子节点
      this.ruleForm.fjdid = this.thisDetail.gybh
    } else if (!this.isAddChild && Object.keys(this.thisDetail).length != 0) {
      // 编辑当前
      let { gxmc, gybh, sfsy, px, gybz } = this.thisDetail
      this.ruleForm = {
        gxmc: gxmc, // xl
        gybh: gybh,
        sfsy: sfsy ? sfsy : '',
        px: px ? px : '',
        gybz: gybz ? gybz : ''
      }
      if (this.thisDetail.picUrl)
        this.photoUrl = this.thisDetail.picUrl.split(',')
    } else {
      // 新增一级节点
    }
  },
  methods: {
    /**
     * 取消按钮
     */
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
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          if (Object.keys(this.thisDetail).length == 0 || this.isAddChild)
            add({
              ...this.ruleForm,
              objId: this.thisDetail.objId,
              picUrl: this.photoUrl.join(',')
            }).then(res => {
              let val = res.data
              let type = val.code == 0 ? 'success' : 'error'
              this.$message({ type, message: val.msg })
              if (val.code == 0)
                this.$emit('childFn', {
                  showDialog: false
                })
            })
          else
            edit({
              ...this.ruleForm,
              objId: this.thisDetail.objId,
              picUrl: this.photoUrl.join(',')
            }).then(res => {
              let val = res.data
              let type = val.code == 0 ? 'success' : 'error'
              this.$message({ type, message: val.msg })
              if (val.code == 0)
                this.$emit('childFn', {
                  showDialog: false
                })
            })
        } else {
          //console.log('error submit!!')
          return false
        }
      })
    },
    upLoadImages(file, callback) {
      let form = new FormData()
      form.append('file', file) //openID
      form.append('type', 'mario') //
      //接口部分
      uploadPicture(form)
        .then(res => {
          let val = res.data
          let type = val.code == 0 ? 'success' : 'error'
          if (val.code != 0) this.$message({ type, message: val.msg })

          callback(val)
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    upLoadvisibleLight(event) {
      let file = event.target.files[0]
      this.upLoadImages(file, val => {
        console.log(val)
        if (val.code == 0) this.photoUrl.push(val.msg)
      })
    },
    showBig(url) {
      this.dialogVisible = true
      this.dialogImageUrl = process.env.VUE_APP_BASE_API + url
    },
    delImg(ind) {
      this.photoUrl.splice(ind, 1)
    },
    period(e) {
      // 清除"数字"和"."以外的字符
      e.target.value = e.target.value.replace(/[^\d]/g, '')
    },
    period2(e) {
      // 清除"数字"和"."以外的字符
      e.target.value = e.target.value.replace(/[^\d]/g, '')
    }
  }
}
</script>
