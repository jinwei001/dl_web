<template>
  <div>
  <div class="main-body" v-if="PlanmanagementStatus===false">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <div class="search-container">
          <!--查询表单-->
         <el-form class="search-form" ref="Inquire" inline :model="Inquire">
            <el-form-item label="保电名称" prop="name">
               <el-input type="text" v-model="Inquire.name" clearable />
            </el-form-item>
            <el-form-item label="保电等级" prop="grade">
              <el-select v-model="Inquire.grade" clearable placeholder="请选择">
                <el-option v-for="(item,index) in selectData.PowerRatingArry" :key="index" :label="item.value" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="保电任务单" prop="SingleNumber">
              <el-input type="text" v-model="Inquire.SingleNumber" clearable />
            </el-form-item>
            <el-form-item label="保电时间" prop="Timeperiod">
              <el-date-picker v-model="Inquire.Timeperiod" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="daterange"
                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 100%;" />
            </el-form-item>
          </el-form>
          <!--查询按钮-->
          <div class="search-buttons">
            <el-button type="primary" size="small" @click="getList" class="onSearch">查询</el-button>
            <el-button type="primary" size="small" @click="taskButtonResetClick" class="UserSearchFun">重置</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <!--数据操作-->
      <div class="record-operation">
        <el-button type="primary" size="small" @click="taskButtonAddClick" class="onSearch">新增</el-button>
        <el-button type="danger" size="small" @click="shangchufun" plain v-if="shangchuArry.length>0">删除</el-button>
      </div>
      <!--数据列表-->
      <el-table :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}"
          :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}" border fit highlight-current-row
          @selection-change="CheckFun">
        <!--表格列-->
        <el-table-column type="selection" width="40" align="center"></el-table-column>
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="bdmc" label="保电名称" min-width="120"></el-table-column>
        <el-table-column prop="bddj" label="保电等级" min-width="120"></el-table-column>
        <el-table-column prop="bdxlmc" :label="'保电'+$xl" min-width="200"></el-table-column>
        <el-table-column prop="bdfw" label="保电范围" min-width="120"></el-table-column>
        <el-table-column prop="bdrwdh" label="保电任务单" min-width="180" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="bdkssj" label="保电开始时间" min-width="160" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="bdjssj" label="保电结束时间" min-width="160" :show-overflow-tooltip="true"></el-table-column>
        <!--操作模板-->
        <el-table-column fixed="right" label="查看详情" width="120" align="center">
          <template slot-scope="scope">
            <el-button class="onSearch" type="primary" size="mini" @click="taskButtonOpenClick(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
        <!--操作模板-->
        <el-table-column fixed="right" label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button class="onSearch" type="primary" size="mini" @click="taskButtonManageClick(scope.row)">计划管理</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination :total="tableParam.total" :page.sync="tableParam.pageNum" :limit.sync="tableParam.limit" @pagination="getList" />
    </div>
    <!--表单弹框-->
    <el-dialog title="新增" :visible.sync="dialogParameter.showDialogadd" :close-on-click-modal="false"
      min-width="500px" :width='dialogParameter.dialogWidth' center :before-close="(value)=> handleClose(value,'1')" v-if="dialogParameter.showDialogadd===true">
      <!--表单-->
      <el-form ref="form" :model="form" :rules="formRules" label-position="right" label-width="150px">
        <el-form-item label="保电名称" class="el-form-itemstyle" prop="name">
          <el-input type="text" v-model="form.name" clearable />
        </el-form-item>
        <el-form-item label="保电等级" class="el-form-itemstyle" prop="grade">
          <el-select v-model="form.grade" clearable placeholder="请选择">
            <el-option v-for="(item,index) in selectData.PowerRatingArry" :key="index" :label="item.value" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'保电'+$xl" class="el-form-itemstyle" prop="Lineselection">
          <el-select v-model="form.Lineselection" clearable placeholder="请选择" multiple  filterable  value-key="id">
            <el-option v-for="(item,index) in selectData.yingHuanlist" :key="index" :label="item.value" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="保电范围" class="el-form-itemstyle" >
          <el-input v-model="form.PowerprotectionRange" clearable type="textarea" :rows="7" placeholder="请输入" maxlength="500" />
          <span class="xianzhi">{{ form.PowerprotectionRange.length }}/500</span>
        </el-form-item>
        <el-form-item label="保电任务单号" class="el-form-itemstyle" >
          <el-input v-model="form.SingleNumber" clearable></el-input>
        </el-form-item>
        <el-form-item label="保电任务单" class="el-form-itemstyle" >
          <el-upload ref="upload" action="/" accept='.doc,.docx,.xlsx,.xls,.pdf' :on-change="(file, fileList)=>handleChange(file, fileList,'one')"
            :show-file-list="false" :on-success="onSuccess" :on-error="onError" :auto-upload="false" :before-upload="beforUploadflie">
            <span style="margin-right: 15px;">{{form.fileList.Powersavingtasklistname}}</span>
            <el-button type="primary" class="onSearch" size="small" v-if="!form.fileList.Powersavingtasklistname">上传附件</el-button>
            <!--   <el-input v-model="fileList.Powersavingtasklistname" /> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="保电方案" class="el-form-itemstyle" >
          <el-upload ref="upload" action="/" accept='.doc,.docx,.xlsx,.xls,.pdf' :on-change="(file, fileList)=>handleChange(file, fileList,'two')"
            :show-file-list="false" :on-success="onSuccess" :on-error="onError" :auto-upload="false" :before-upload="beforUploadflie">
            <span style="margin-right: 15px;">{{form.fileList.Powerprotectionschemename}}</span>
            <el-button type="primary" class="onSearch" size="small" v-if="!form.fileList.Powerprotectionschemename">上传附件</el-button>
            <!--   <el-input v-model="fileList.Powersavingtasklistname" /> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="保电方案模板" class="el-form-itemstyle" >
          <el-upload ref="upload" action="/" accept='.doc,.docx,.xlsx,.xls,.pdf' :on-change="(file, fileList)=>handleChange(file, fileList,'three')"
            :show-file-list="false" :on-success="onSuccess" :on-error="onError" :auto-upload="false" :before-upload="beforUploadflie">
            <span style="margin-right: 15px;">{{form.fileList.PowerProtectionPlanTemplatename}}</span>
            <el-button type="primary" class="onSearch" size="small" v-if="!form.fileList.PowerProtectionPlanTemplatename">上传附件</el-button>
            <!--   <el-input v-model="fileList.Powersavingtasklistname" /> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="保电时间段" class="el-form-itemstyle" >
          <el-date-picker v-model="form.Timeperiod" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="daterange"
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 100%;" />

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" class="onSearch" @click="addfun">保存</el-button>
       <el-button type="default" size="small" class="UserSearchFun" @click="(value)=> handleClose(value,'1')">取消</el-button>
      </div>
    </el-dialog>

    <!--详情弹框-->
    <el-dialog title="详情" :visible.sync="dialogParameter.showDialogDetails" :close-on-click-modal="false"
      min-width="500px" :width='dialogParameter.dialogWidth' center :before-close="(value)=> handleClose(value,'2')" class="baodianrenwuxianqingbox">
      <!--表单-->
      <el-form ref="taskForm" label-position="right" label-width="180px">
        <el-form-item label="保电名称">
          {{Detailsdata.bdmc}}
        </el-form-item>
        <el-form-item label="保电等级">
           {{Detailsdata.bddj}}
        </el-form-item>
        <el-form-item :label="'保电'+$xl">
           {{Detailsdata.bdxlmc}}
        </el-form-item>
        <el-form-item label="保电范围">
           {{Detailsdata.bdfw}}
        </el-form-item>
        <el-form-item label="保电任务单" class="el-form-itemstyle">
          <span v-if="!Detailsdata.bdrwd">保电任务单未上传附件</span>
          <el-button  type="primary" class="onSearch" size="small" v-else><a class='download' :href='SRC+Detailsdata.bdrwd' download="" title="下载附件">下载附件</a></el-button>
        </el-form-item>
        <el-form-item label="保电方案" class="el-form-itemstyle">
          <span v-if="!Detailsdata.bdfa">保电方案未上传附件</span>
          <el-button  type="primary" class="onSearch" size="small" v-else><a class='download' :href='SRC+Detailsdata.bdfa' download="" title="下载附件">下载附件</a></el-button>
        </el-form-item>
        <el-form-item label="保电方案模板" class="el-form-itemstyle">
           <span v-if="!Detailsdata.bdfamb">保电方案模板未上传附件</span>
           <el-button  type="primary" class="onSearch" size="small" v-else><a class='download' :href='SRC+Detailsdata.bdfamb' download="" title="下载附件">下载附件</a></el-button>
        </el-form-item>
        <el-form-item label="保电开始时间">
           {{Detailsdata.bdkssj}}
        </el-form-item>
        <el-form-item label="保电结束时间">
           {{Detailsdata.bdjssj}}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
       <!-- <el-button type="primary" size="small" class="onSearch" @click="taskButtonCloseClick">关闭</el-button> -->
      </div>
    </el-dialog>

  </div>
  <TaskPlanHome v-if='PlanmanagementStatus===true&&Taskdetails' :TaskdetailsName='Taskdetails' @childFn1="parentFn"></TaskPlanHome>
  </div>
</template>

<script>
  import {
    keepElectricityTask_list,
    keepElectricityTask_add,
    keepElectricityTask_remove
  } from '@/api/protected-electricity/task'
  import {
    upload
  } from '@/api/liveDetectionManage/quality'
  import qs from 'qs'
  import Pagination from '@/components/Pagination'
  import TaskPlanHome from './TaskPlanHome'
  import {
    setList
  } from '@/api/Sixdefensemanagement/HiddenDangerReview'
  export default {
    name: 'TaskManage',
    components: {
      Pagination,
      TaskPlanHome
    },
    data() {
      const  validatorline=function (rule, value, callback) {
          if (value.length === 0) {
              callback(new Error('请选择线路'));
         } else {
           callback();
              }
       }
      return {
        SRC:process.env.VUE_APP_BASE_API,
        PlanmanagementStatus:false,
        Taskdetails:{},
        shangchuArry:[],
        Detailsdata:{},
        form: {
          name: '', //保电名称
          grade: '', //保电等级
          SingleNumber: '', //任务单号
          Timeperiod: [], //时间段
          PowerprotectionRange:'',
          Lineselection:[],
          fileList: {
            Powersavingtasklistname: '',
            PowersavingtasklistSrc: '',
            Powerprotectionschemename: '',
            PowerprotectionschemeSrc: '',
            PowerProtectionPlanTemplatename: '',
            PowerProtectionPlanTemplateSrc: ''
          },
        },
        selectData: {
          PowerRatingArry: [{
            value: '一级'
          }, {
            value: '二级'
          }, {
            value: '三级'
          }],
            yingHuanlist: []
        },
        tableData: [],
        tableParam: {
          total: 0,
          pageNum: 1,
          pageSize: 10,
          limit: 10,
          bdmc:'',
          bddj:'',
          bdrwdh:'',
          bdkssj:'',
          bdjssj:'',
          startTime:'',
          endTime:''
        },
        Inquire:{
          name:'',
          grade:'',
          SingleNumber:'',
          Timeperiod:[],
        },
        formRules:{
          Lineselection: [{
            required: true,
            trigger: 'change',
            validator: validatorline
          }],
          PowerprotectionRange: [{
            required: true,
            message: '请输入保电范围',
            trigger: 'change',
          }],
          name: [{
            required: true,
            message: '请输入保电时间',
            trigger: 'change',
          }],
          grade: [{
            required: true,
            message: '请输入保电时间',
            trigger: 'change',
          }],
          SingleNumber: [{
            required: true,
            message: '请输入保电任务单号',
            trigger: 'change',
          }],
          Timeperiod: [{
            required: true,
            message: '请选择保电时间段',
            trigger: 'change',
          }],
          'fileList.Powersavingtasklistname':[{
            required: true,
            message: '请上传文件',
            trigger: 'change',
          }],
          'fileList.Powerprotectionschemename':[{
            required: true,
            message: '请上传文件',
            trigger: 'change',
          }],
          'fileList.PowerProtectionPlanTemplatename':[{
            required: true,
            message: '请上传文件',
            trigger: 'change',
          }],
        },
        //弹窗参数配置
        dialogParameter: {
          dialogWidth: '30%',
          title: '未知',
          showDialogadd: false, //打开弹框
          showDialogDetails: false, //打开弹框
        },
        Alllist:{
           yingHuan:[]
         }
      }
    },
    mounted() {
      this.initPage();
      this.getList();
      this.setListfun()
    },
    methods: {
     //输入查看线路
     filterlineList(query = ''){
       let _this=this
       const arr = this.Alllist.yingHuan.filter(item => {
         return item.value.includes(query) || item.id.includes(query)
       })
       if(arr){
          _this.selectData.yingHuanlist = arr
       }
     },
    // 获取默认下拉数据
    setListfun() {
      const list = {
        nowPage: 1
      }
      setList(qs.stringify(list)).then(response => {
        if (response.status === 200) {
          this.selectData.yingHuanlist = response.data.rows[0].yingHuan
          // this.Alllist.yingHuan= response.data.rows[0].yingHuan
        }
      })
    },
      parentFn(val) {
         //关闭计划管理组件
        if(val.back==false){

          this.PlanmanagementStatus=val.back
          this.getList()
        }
      },
      //列表
      getList() {
        //查询名称赋值
        this.tableParam.bdmc=this.Inquire.name//保电名称
        this.tableParam.bddj=this.Inquire.grade//保电等级
        this.tableParam.bdrwdh=this.Inquire.SingleNumber//保电任务单号
        if(this.Inquire.Timeperiod!==null&&this.Inquire.Timeperiod.length>0){//保电时间段
          this.tableParam.startTime = this.Inquire.Timeperiod[0].toString()
          this.tableParam.endTime = this.Inquire.Timeperiod[1].toString()
        }else{
          this.tableParam.startTime=''
          this.tableParam.endTime=''
        }
        keepElectricityTask_list(qs.stringify(this.tableParam)).then(response => {
          if (response.status == 200) {
            if (response.data.code === 0) {
              // this.$message({
              //   message: '保电列表获取成功',
              //   type: 'success'
              // })
              this.tableData = response.data.rows
              this.tableParam.total = response.data.total
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
      handleChange(file, fileList, num) {
        const isLt2M = file.size / 1024 / 1024 < 25;
        if (!isLt2M) {
          this.$message.error('文件不能超过 25MB!');
        } else {
          if (fileList.length > 0) {
            let fd = new FormData()
            fd.append('file', file.raw)
            fd.append('type', 'baodianrenwu')
            upload(fd).then(response => {
              if (response.status === 200) {
                if (response.data.code === 0) {
                  if (num === 'one') { //保电任务单
                    this.form.fileList.Powersavingtasklistname = file.name //名称
                    this.form.fileList.PowersavingtasklistSrc = response.data.msg //地址
                  }
                  if (num === 'two') { //保电方案
                    this.form.fileList.Powerprotectionschemename = file.name //名称
                    this.form.fileList.PowerprotectionschemeSrc = response.data.msg //地址
                  }
                  if (num === 'three') { //保电方案模板
                    this.form.fileList.PowerProtectionPlanTemplatename = file.name //名称
                    this.form.fileList.PowerProtectionPlanTemplateSrc = response.data.msg //地址
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
      beforUploadflie(file) {
        const isLt2M = file.size / 1024 / 1024 < 25;
        if (!isLt2M) {
          this.$message.error('文件不能超过 25MB!');
        }
        return isLt2M
      },
      addfun() {
        let data = {
          bdmc: this.form.name, //保电名称
          bddj: this.form.grade, //DL等级
          bdkssj: '', //开始时间
          bdjssj:'',//结束时间
          bdrwdh: this.form.SingleNumber, //保电任务单号
          bdrwd:this.form.fileList.PowersavingtasklistSrc,//保电任务单
          bdfa:this.form.fileList.PowerprotectionschemeSrc,//保电方案
          bdfamb:this.form.fileList.PowerProtectionPlanTemplateSrc,//保电方案模板
          bdxl:[],//保电线路
          bdfw:this.form.PowerprotectionRange,
        }
        data.bdxl = JSON.stringify(this.form.Lineselection);// 转成JSON格式
        //console.log(this.form.Lineselection)
        if(this.form.Timeperiod!==null&&this.form.Timeperiod.length>0){
          data.bdkssj=this.form.Timeperiod[0].toString()
          data.bdjssj=this.form.Timeperiod[1].toString()
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            keepElectricityTask_add(qs.stringify(data)).then(response => {
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
      // 选中数据
      CheckFun(val) {
        this.shangchuArry = []
        let CheckedSelection = val
        if (CheckedSelection.length > 0) {
          for (let i = 0; i < CheckedSelection.length; i++) {
            this.shangchuArry.push(CheckedSelection[i].id)
          }
        }
      },
      //删除
      shangchufun() {
        let data = {
          ids: this.shangchuArry.toString()
        }
        keepElectricityTask_remove(qs.stringify(data)).then(response => {
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
      /**
       * 初始化页面
       */
      async initPage() {
        //载入查询参数
        //this.loadQueryParams();
        //初始化任务列表
        //this.loadTasks();
      },

      /**
       * 查询按钮点击
       */

      /**
       * 重置表单点击
       */
      taskButtonResetClick() {
        this.$refs['Inquire'].resetFields()
        this.$message({
          message: '重置成功',
          type: 'success'
        })
        this.getList()

      },
      handleClose(done,num) {
        this.$confirm("确认关闭？")
          .then(_ => {
            if(num==='1'){
              this.$refs['form'].resetFields();
            }
            this.dialogParameter.showDialogadd = false;
            this.dialogParameter.showDialogDetails = false;

            done();
          })
          .catch(_ => {
            //console.log("失败")
          });
      },
      /**
       * 增加按钮点击
       */
      taskButtonAddClick() {
        this.dialogParameter.showDialogadd = true;
      },

      /**
       * 取消保存按钮点击
       */
      taskButtonCancelSaveClick() {
        this.task.form.dialog.show = false;
      },

      /**
       * 保存按钮点击
       */
      taskButtonSaveClick() {
        this.$message('保存成功');
      },

      /**
       * 编辑按钮点击
       * @param row 行数据
       */
      taskButtonEditClick(row) {
        this.task.form.dialog.show = true;
        this.task.form.dialog.title = '修改';
      },

      /**
       * 计划管理按钮点击
       * @param row 行数据
       */
      taskButtonManageClick(row) {

        this.Taskdetails=row
        this.PlanmanagementStatus=true

      },

      /**
       * 删除按钮点击
       * @param row 行数据
       */
      taskButtonRemoveClick(row) {
        if (!confirm('确定删除吗？删除后无法恢复')) {
          return;
        }
        this.$message('删除成功');
      },

      /**
       * 详情关闭按钮点击
       */
      taskButtonCloseClick() {
        this.task.detail.dialog.show = false;
      },

      /**
       * 详情查看按钮点击
       */
      taskButtonOpenClick(val) {
        this.dialogParameter.showDialogDetails = true;
        this.Detailsdata=val
      }
    }
  }
</script>
<style lang="scss">
  .el-form-itemstyle {
    margin-bottom: 20px;
  }
  .baodianrenwuxianqingbox{
   .el-form-item__label{
    font-size: 15px;
  }
  .el-form-item__content{
    font-size: 17px;
  }
  }

</style>
