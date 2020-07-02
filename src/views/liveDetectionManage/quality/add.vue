<template>
  <!-- <h2>信号库新增</h2> -->
  <div class="single-row-title">
    <el-dialog v-dialogDrag :visible.sync="showDialog" :title="title" :center="true" :before-close="handleClose">
      <el-form ref="form" :model="form" style="width:100% ;margin: 0 auto;" :rules="formRules">
        <!-- //新增+编辑 -->
        <el-col v-if="addbtn||editbtn" :span="24">
          <el-col :span="24" class="setbox">
            <el-col :span="6">
              <p>
                <label class="form-label"><span class="xingstyle">*</span>
                  <span class="Icon_r" />检测单位名称：
                </label>
              </p>
            </el-col>
            <el-col :span="16">
              <el-form-item prop="DetectionUnitName">
                <el-input v-model="form.DetectionUnitName" type="text" clearable class="selectstyle" />
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24" class="setbox">
            <el-col :span="6">
              <p>
                <label class="form-label"><span class="xingstyle">*</span>
                  <span class="Icon_r" />联系人：
                </label>
              </p>
            </el-col>
            <el-col :span="16">
              <el-form-item prop="ContactPerson">
                <el-input v-model="form.ContactPerson" type="text" clearable class="selectstyle" />
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24" class="setbox">
            <el-col :span="6">
              <p>
                <label class="form-label"><span class="xingstyle">*</span>
                  <span class="Icon_r" />联系电话：
                </label>
              </p>
            </el-col>
            <el-col :span="16">
              <el-form-item prop="ContactNumber">
                <el-input v-model="form.ContactNumber" type="text" clearable class="selectstyle" />
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24" class="setbox">
            <el-col :span="6">
              <p>
                <label class="form-label"><span class="xingstyle">*</span>
                  <span class="Icon_r" />承担业务：
                </label>
              </p>
            </el-col>
            <el-col :span="16">
              <el-form-item prop="UndertakeBusiness">
                <el-input v-model="form.UndertakeBusiness" type="text" clearable class="selectstyle" />
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24" class="setbox">
            <el-col :span="6">
              <p>
                <label class="form-label"><span class="xingstyle">*</span>
                  <span class="Icon_r" />时间：
                </label>
              </p>
            </el-col>
            <el-col :span="16">
              <el-form-item prop="time1">
                <el-date-picker v-model="form.time1" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:SS" type="daterange"
                  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 100%;" @change="Datechang"/>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom: 20px;">
            <el-col :span="4">
              <p>
                <label class="form-label">
                  <span class="Icon_r" /><span style="font-size: 1.2em;">上传附件：</span>
                </label>
              </p>
            </el-col>
            <el-col :span="12">
              <el-input v-model="HDTPlaninputval" style="width: 95%;" disabled />
            </el-col>
            <el-col :span="8">
              <el-col :span="24">
                <el-col :span="12">
                  <el-upload ref="upload" :action="Uploadfliesrc" accept='.doc,.docx,.xlsx,.xls,.pdf' :on-change="handleChange"
                    :show-file-list="false" :on-success="onSuccess" :on-error="onError" :auto-upload="false" :file-list="fileList" :before-upload="beforUploadflie">
                    <el-button type="primary" class="onSearch" size="small">选择附件</el-button>
                  </el-upload>
                </el-col>
                <el-col v-if="submit_button_show" :span="12">
                  <el-button type="primary" class="onSearch" size="small" @click="submit">上传附件</el-button>
                </el-col>
              </el-col>
            </el-col>
          </el-col>
        </el-col>
      </el-form>







      <el-form ref="Penaltiesform" :model="Penaltiesform" style="width:100% ;margin: 0 auto;" :rules="PenaltiesRules">
        <el-col v-if="Penaltiesbtn" :span="24">
          <el-col :span="24" class="setbox">
            <el-col :span="6">
              <p>
                <label class="form-label"><span class="xingstyle">*</span>
                  <span class="Icon_r" />检测单位名称：
                </label>
              </p>
            </el-col>
            <el-col :span="16">
              <el-form-item prop="DetectionUnitName">
                <el-input v-model="Penaltiesform.DetectionUnitName" type="text" clearable class="selectstyle" disabled />
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24" class="setbox">
            <el-col :span="6">
              <p>
                <label class="form-label"><span class="xingstyle">*</span>
                  <span class="Icon_r" />扣分数量：
                </label>
              </p>
            </el-col>
            <el-col :span="16">
              <el-form-item prop="PenaltiesNum">
                <el-input v-model="Penaltiesform.PenaltiesNum" type="text" clearable class="selectstyle" />
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24" class="setbox">
            <el-col :span="6">
              <p>
                <label class="form-label"><span class="xingstyle">*</span>
                  <span class="Icon_r" />扣分原因：
                </label>
              </p>
            </el-col>
            <el-col :span="16">
              <el-form-item prop="PenaltiesReason">
                <el-input v-model="Penaltiesform.PenaltiesReason" clearable class="selectstyle" type="textarea" :rows="7" />
              </el-form-item>
            </el-col>
          </el-col>
        </el-col>
      </el-form>
      <div class="table" style="margin-bottom: 30px;" v-if='chakanbtn'>
        <el-col :span="24" class="setbox">
          <el-col :span="8">
            <p style="line-height: 40px;">
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />检测单位名称：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-input v-model="DetectionUnitName" type="text" clearable class="selectstyle" disabled />
          </el-col>
        </el-col>
        <div class="table" style="margin-bottom: 20px;">
          <el-table :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}"
            :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}" border fit highlight-current-row>
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column type="index" label="序号" width="60" align="center" />
            <!-- <el-table-column prop="name" label="运维单位" align="center"></el-table-column> -->
            <el-table-column v-for="item in tableTitle" :key="item.index" :prop="item.prop" :label="item.label" align="center" />
          </el-table>
          <pagination v-show="tableData.length>0" :total="Searchfrom.total" :page.sync="Searchfrom.pageNum" :limit.sync="Searchfrom.limit"
            @pagination="getList" />
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun"  v-if='chakanbtn==false'>保存</el-button>
        <el-button class="onSearch" @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // import {
  //   edit
  // } from '@/api/liveDetectionManage/modelLibrary'
  import {
    add,
    edit,
    upload,
    detectionServiceDeductionAdd,
    detectionServiceDeductionlist
  } from '@/api/liveDetectionManage/quality'
  import Pagination from '@/components/Pagination'
  import qs from 'qs'
  export default {
    props: {
      /**
       * 接收是否打开页面
       */
      isShowDialog: {
        type: Boolean,
        default: false
      },
      /** 接收参数为是否是编辑*/
      isEdit: {
        type: Boolean,
        default: false
      },
      ischakan: {
        type: Boolean,
        default: false
      },
      /** 打开页面的id */
      openID: {
        default: null
      },
      /**
       * 接收是否打开页面
       */
      isAdd: {
        type: Boolean,
        default: false
      },
      isPenalties: {
        type: Boolean,
        default: false
      },
      detailsData: {
        type: Object,
        default: {}
      }
    },
    components: {
      Pagination,
    },
    data() {
      //纬度
        const reg3 = /^[0-9]*[1-9][0-9]*$/
        const validateAcquaintance3 = (rule, value, callback) => {
          if(!value){
            callback(new Error('请输入数字'))
          }else  if (!reg3.test(value)) {
            callback(new Error('0～9（整数）'))
          } else  if (value>100&&value<0) {
            callback(new Error('大于0且小于100'))
          } else {
            callback()
          }
        }
      return {
        Searchfrom:{
          total:0,
          pageNum:1,
          limit:10,
          pageSize: 10,
        },
        DetectionUnitName: '',
        tableTitle: [{
            label: '扣分值',
            prop: 'kfz'
          },
          {
            label: '扣分原因',
            prop: 'kfyy'
          },
          {
            label: '扣分时间',
            prop: 'kfsj'
          },
          {
            label: '扣分人',
            prop: 'kfr'
          }
        ],
        tableData: [],
        submit_button_show: false,
        fd: null,
        fileList: [],
        filedata: {},
        HDTPlaninputval: '',
        Uploadfliesrc: process.env.VUE_APP_BASE_API + '/cable/file/uploadt',
        title: '未知',
        form: {
          DetectionUnitName: '', // 检测单位名称
          ContactPerson: '', // 联系人
          ContactNumber: '', // 联系电话
          UndertakeBusiness: '', // 承担业务
          jhkssj: '', // 开始时间
          jhjssj: '', // 结束时间
          time1: []
        },
        Penaltiesform: {
          DetectionUnitName: '', // 检测单位名称
          PenaltiesNum: 0,
          PenaltiesReason: ''
        },
        selection: {}, // 搜索数据
        showDialog: this.isShowDialog, // 打开弹框
        editbtn: this.isEdit, // 是否是编辑按钮
        addbtn: this.isAdd, // 是否是新增按钮
        Penaltiesbtn: this.isPenalties, // 扣分录入
        chakanbtn: this.ischakan, //扣分列表
        PenaltiesRules: {
          DetectionUnitName: [{
            required: true,
            message: '请输入检测单位名称',
            trigger: 'change'
          }],
          PenaltiesNum: [{
            required: true,
            trigger: 'change',
            validator:validateAcquaintance3,
          }],
          PenaltiesReason: [{
            required: true,
            message: '请输入扣分原因',
            trigger: 'change'
          }]
        },
        formRules: {
          DetectionUnitName: [{
            required: true,
            message: '请输入检测单位名称',
            trigger: 'change'
          }],
          ContactPerson: [{
            required: true,
            message: '请输入联系人',
            trigger: 'change'
          }],
          ContactNumber: [{
            required: true,
            trigger: 'change',
            validator:validateAcquaintance3,
          }],
          UndertakeBusiness: [{
            required: true,
            message: '请输入承担业务',
            trigger: 'change'
          }],
          time1: [{
            required: true,
            message: '请输入时间',
            trigger: 'change'
          }]
        }
      }
    },
    watch: {
      isShowDialog(val) {
        this.showDialog = val
      },
      isEdit(val) {
        this.editbtn = val
      },
      isAdd(val) {
        this.addbtn = val
      },
      isPenalties(val) {
        this.Penaltiesbtn = val
      },
      ischakan(val) {
        this.chakanbtn = val
      },
      'form.time1': {
        handler: function(val) {

        }
      }

    },
    mounted() {
      if (this.addbtn === true) {
        this.title = '新增'
      } else if (this.editbtn === true) {
        this.title = '编辑'
        this.getDetailsDataFun('A')
      } else if (this.Penaltiesbtn === true) {
        this.title = '扣分'
        this.getDetailsDataFun('B')
      } else if (this.chakanbtn === true) {
        this.title = '扣分列表'
        this.DetectionUnitName = this.detailsData.jcdw
        this.getList()
      }
    },

    methods: {
      beforUploadflie(file) {
       const isLt2M = file.size / 1024 / 1024 < 25;
       if (!isLt2M) {
         this.$message.error('文件不能超过 25MB!');
       }
       return isLt2M
      },
      Datechang(val){
         if (val!==null) {
           this.form.jhkssj = val[0]
           this.form.jhjssj = val[1]
         } else {
           this.form.jhkssj = ''
           this.form.jhjssj = ''
         }
      },
      handleChange(file, fileList) {
        const isLt2M = file.size / 1024 / 1024 < 25;
        if (!isLt2M) {
          this.$message.error('文件不能超过 25MB!');
        }else{
          if (fileList.length > 0) {
            // this.fileList = fileList[fileList.length - 1]// 这一步，是 展示最后一次选择的csv文件
            this.fd = new FormData()
            this.fd.append('file', file.raw)
            this.fd.append('type', 'servicequality')
            this.HDTPlaninputval = file.name
            this.submit_button_show = true
          }
        }
      },
      submit() {
        upload(this.fd).then(response => {
          if (response.status === 200) {
            if (response.data.code === 0) {
              this.HDTPlaninputval = response.data.msg
              this.submit_button_show = false
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
      },
      onSuccess(res) {
        this.$alert(res.data, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            //console.log('上传成功')
          }
        })
      },
      onError(res) {
        this.$alert('创建失败', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            //console.log('上传失败')
          }
        })
      },
      getDetailsDataFun(name) {
        if (name === 'A') {
          this.form = {
            DetectionUnitName: this.detailsData.jcdw, // 检测单位名称
            ContactPerson: this.detailsData.lxr, // 联系人
            ContactNumber: this.detailsData.lxdh, // 联系电话
            UndertakeBusiness: this.detailsData.cdyw // 承担业务
          }
          this.$set(this.form,'time1',[this.detailsData.jhkssj,this.detailsData.jhjssj])
          // this.form.time1=[this.detailsData.jhkssj,this.detailsData.jhjssj]
          this.HDTPlaninputval = this.detailsData.url
        } else if (name === 'B') {
          this.Penaltiesform.DetectionUnitName = this.detailsData.jcdw
        }
      },
      getList() {
        this.Searchfrom.fwzlid=this.detailsData.id
        detectionServiceDeductionlist(qs.stringify(this.Searchfrom)).then(response => {
          if (response.status === 200) {
            this.tableData = response.data.rows
            this.Searchfrom.total = response.data.total
          }
        })
      },
      /**
       * 取消按钮
       */
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.showDialog = false
            this.editbtn = false
            this.addbtn = false
            this.Penaltiesbtn = false
            this.chakanbtn=false
            this.$emit('childFn', {
              showDialog: this.showDialog,
              editbtn: this.editbtn,
              addbtn: this.addbtn,
              Penaltiesbtn: this.Penaltiesbtn,
              chakanbtn: this.chakanbtn
            })
            done()
          })
          .catch(_ => {})

      },
      addfun() {
        const data = {
          jcdw: this.form.DetectionUnitName, // 单位
          lxr: this.form.ContactPerson, // 联系人
          lxdh: this.form.ContactNumber, // 联系电话
          cdyw: this.form.UndertakeBusiness, // 承接业务
          jhkssj: this.form.jhkssj,
          jhjssj: this.form.jhjssj
        }
        if (this.submit_button_show === false) {
          data.url = this.HDTPlaninputval
        }
        add(qs.stringify(data)).then(response => {
          if (response.status === 200) {
            if (response.data.msg === '操作成功') {
              this.$message({
                message: response.data.msg,
                type: 'success'
              })
              this.showDialog = false
              this.editbtn = false
              this.addbtn = false
              this.$emit('childFn', {
                showDialog: this.showDialog,
                editbtn: this.editbtn,
                addbtn: this.addbtn,
                Refresh: true
              })
            } else {
              this.$message({
                message: response.data.msg,
                type: 'error'
              })
            }
          }
        })
      },
      editfun() {
        const data = {
          id: this.detailsData.id,
          jcdw: this.form.DetectionUnitName, // 单位
          lxr: this.form.ContactPerson, // 联系人
          lxdh: this.form.ContactNumber, // 联系电话
          cdyw: this.form.UndertakeBusiness, // 承接业务
          jhkssj: this.form.jhkssj,
          jhjssj: this.form.jhjssj
        }
        if (this.submit_button_show === false) {
          data.url = this.HDTPlaninputval
        }
        edit(qs.stringify(data)).then(response => {
          if (response.status === 200) {
            if (response.data.msg === '操作成功') {
              this.$message({
                message: response.data.msg,
                type: 'success'
              })
              this.showDialog = false
              this.editbtn = false
              this.addbtn = false
              this.Penaltiesbtn = false
              this.$emit('childFn', {
                showDialog: this.showDialog,
                editbtn: this.editbtn,
                addbtn: this.addbtn,
                Penaltiesbtn: this.Penaltiesbtn,
                Refresh: true
              })
            } else {
              this.$message({
                message: response.data.msg,
                type: 'error'
              })
            }
          }
        })
      },
      Penaltiesfun() {
        const data = {
          jcdw: this.Penaltiesform.DetectionUnitName,
          kfz: this.Penaltiesform.PenaltiesNum, // 单位
          kfyy: this.Penaltiesform.PenaltiesReason, // 联系人
          fwzlid: this.detailsData.id,
        }
        detectionServiceDeductionAdd(qs.stringify(data)).then(response => {
          if (response.status === 200) {
            if (response.data.msg === '操作成功') {
              this.$message({
                message: response.data.msg,
                type: 'success'
              })
              this.showDialog = false
              this.editbtn = false
              this.addbtn = false
              this.$emit('childFn', {
                showDialog: this.showDialog,
                editbtn: this.editbtn,
                addbtn: this.addbtn,
                Refresh: true
              })
            } else {
              this.$message({
                message: response.data.msg,
                type: 'error'
              })
            }
          }
        })
      },
      /**
       * 确认按钮
       */
      SuerFun() {
        if (this.editbtn) {
          this.editfun()
        } else if (this.addbtn) {
          this.$refs.form.validate((valid) => {
            if (valid) {
              this.addfun()
            }
          })
        } else if (this.Penaltiesbtn) {
          this.$refs.Penaltiesform.validate((valid) => {
            if (valid) {
              this.Penaltiesfun()
            }
          })
        } else {
          //console.log('err')
        }
      }
    }
  }
</script>
<style lang="scss" scoped="scoped">
  .setbox {
    padding: 0 10px;
    margin-bottom: 20px;
  }

  .setbox p {
    font-size: 1rem;
    text-align: right;
  }

  .selectstyle {
    width: 100%;
  }

  .xingstyle {
    color: red;
  }
</style>
