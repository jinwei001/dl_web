<template>
  <div class="xs-hastitle">
    <el-dialog :visible.sync="showDialog" :title="title" v-dialogDrag :center="true" width="50%" :before-close="handleClose">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="required-ruleForm">
        <el-form-item label="头像：" prop="avatar" style="width:100%">
          <span class="fontCont">
            <input type="file" @change="facePicUpload">
            <img :src='facePic' alt="">
          </span>
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>

        <el-form-item label="联系电话:" prop="phone">
          <el-input v-model="ruleForm.phone" />
        </el-form-item>
        <el-form-item label="办公电话:" prop="officephone">
          <el-input v-model="ruleForm.officephone" />
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
          <el-select v-model="ruleForm.sex" clearable placeholder="请选择">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录ID:" prop="lgName">
          <el-input v-model="ruleForm.lgName" />
        </el-form-item>
        <el-form-item label="密码:" prop="lgPd">
          <el-input v-model="ruleForm.lgPd" type="password" />
        </el-form-item>
        <el-form-item label="岗位:" prop="roleId">
           <el-select v-model="ruleForm.roleId" clearable placeholder="请选择">
              <el-option v-for="item in selection.roleSelectArr" :key="item.objId" :label="item.rolename" :value="item.objId"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="班组:" prop="groupid">
          <el-select v-model="ruleForm.groupid" clearable placeholder="请选择">
            <el-option v-for="item in selection.bzSelectArr" :key="item.bzmc" :label="item.groupname" :value="item.objId"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="外协单位:" prop="companyId">
          <el-select v-model="ruleForm.companyId" clearable placeholder="请选择">
            <el-option v-for="item in selection.wxSelectArr" :key="item.objId" :label="item.bzmc" :value="item.objId"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import '@/styles/myStyle/index.scss'
import { uploadPicture } from '@/api/systemManagement'
import {
  userAdd as add,
  userEdit as edit,
} from '@/api/systemManagement'
export default {
  props: {
    selection: {},
    title: {
      type: String,
      default: '添加用户'
    },
    /**
     * 接收是否打开页面
     */
    thisDetail: {}
  },
  data() {
    return {
      defaultPic: require('@/icons/images/face.png'),
      facePic: '',
      ruleForm: {
        name: '', // 姓名
        phone: '', // 联系电话
        officephone: '', // 办公电话
        sex: '', // 性别
        lgName: '', // 登录ID
        lgPd: '', // 密码
        roleId: '', // 岗位
        groupid: '' // 班组
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'change' }],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'change' },
          { pattern: /^1\d{10}$/, message: '联系电话格式不正确', trigger: 'change' }
           
        ],
        lgName: [{ required: true, message: '请输入登录ID', trigger: 'change' }],
        lgPd: [{ required: true, message: '请输入密码', trigger: 'change' }],
        companyId: [
          { required: true, message: '请选择外协单位', trigger: 'change' }
        ]
      },

      showDialog: true //打开弹框
    }
  },
  created() {
    this.publicIp = process.env.VUE_APP_BASE_API
    this.facePic = require('@/icons/images/face.png')

    if (Object.keys(this.thisDetail).length != 0){
      let thisDetail = this.thisDetail;
       this.ruleForm = {
        name:thisDetail.name?thisDetail.name:'',
        phone:thisDetail.phone?thisDetail.phone:'',
        officephone:thisDetail.officephone?thisDetail.officephone:'',
        sex:thisDetail.sex?thisDetail.sex:'',
        lgName:thisDetail.lgName?thisDetail.lgName:'',
        lgPd:thisDetail.lgPd?thisDetail.lgPd:'',
        roleId:thisDetail.roleId?thisDetail.roleId:'',
        groupid:thisDetail.groupid?thisDetail.groupid:'',
        companyId:thisDetail.companyId?thisDetail.companyId:'',
        avatar:thisDetail.avatar?thisDetail.avatar:'',
      }
      this.facePic = this.thisDetail.avatar?this.publicIp+this.thisDetail.avatar:this.defaultPic
    }
  },
  methods: {
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
    facePicUpload(event) {
      let file = event.target.files[0]
      this.upLoadImages(file, val => {
        if (val.code == 0) {
          this.facePic = this.publicIp + val.msg
          this.ruleForm.avatar = val.msg
        }
      })
    },
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
          this.setSelectId([
            {
              selectArr: this.selection.bzSelectArr,
              ruleFormName: 'groupname',
              ruleFormId: 'groupid',
              filterName: 'groupname',
              filterId: 'objId'
            },
            {
              selectArr: this.selection.wxSelectArr,
              ruleFormName: 'companyName',
              ruleFormId: 'companyId',
              filterName: 'bzmc',
              filterId: 'objId'
            }
          ])
          if (Object.keys(this.thisDetail).length == 0) {
            add(this.ruleForm).then(res => {
              let val = res.data
              let type = val.code == 0 ? 'success' : 'error'
              this.$message({ type, message: val.msg })
              if (val.code == 0)
                this.$emit('childFn', {
                  showDialog: false
                })
            })
          } else {
            edit({ ...this.ruleForm,objId:this.thisDetail.objId}).then(res => {
              let val = res.data
              let type = val.code == 0 ? 'success' : 'error'
              this.$message({ type, message: val.msg })
              if (val.code == 0)
                this.$emit('childFn', {
                  showDialog: false
                })
            })
          }
        } else {
          //console.log('error submit!!')
          return false
        }
      })
    },
    period(e) {
      // 清除"数字"和"."以外的字符
      e.target.value = e.target.value.replace(/[^\d]/g, '')
      // 验证第一个字符是数字
      e.target.value = e.target.value.replace(/^\./g, '')
      // 只保留第一个, 清除多余的
      e.target.value = e.target.value.replace(/\.{2,}/g, '.')
      e.target.value = e.target.value
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
      // 只能输入两个小数
      e.target.value = e.target.value.replace(
        /^(\-)*(\d+)\.(\d\d).*$/,
        '$1$2.$3'
      )
    },
    setSelectId(setArr) {
      /* [{
         selectArr:[],
         ruleFormName:'',
         ruleFormId:'',
         filterName:'',
         filterId:'',
       }]*/

      setArr.forEach(element => {
        if(this.ruleForm[element.ruleFormId]){
        let arr = element.selectArr.filter(res => {
          return res[element.filterId] == this.ruleForm[element.ruleFormId]
        })
        this.ruleForm[element.ruleFormName] = arr[0][element.filterName]
          ? arr[0][element.filterName]
          : ''
          }
      })
      
    },
  

    /**
     * 选择通道按钮--取消按钮
     */
    selecthandleClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.selectshowDialog = false
        })
        .catch(_ => {})
    },

  }
}
</script>
<style lang="scss" scope>
.el-select {
  width: 100%;
}
.el-date-editor.el-input {
  width: 100%;
}
</style>
