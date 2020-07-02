<template>
  <!-- <h2>信号库新增</h2> -->
  <div class="single-row-title">
    <el-dialog :visible.sync="showDialog" :title="isEdit?'编辑':'新增'" v-dialogDrag :center="true" :before-close="handleClose">
      <el-form ref="form" :model="form" style="width:100% ;margin: 0 auto;" :rules="formRules">

        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />供应商：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="gys">
              <el-input type="text" v-model="form.gys" clearable class="selectstyle" />
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />服务商：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="fws">
              <el-input type="text" v-model="form.fws" clearable class="selectstyle" />
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />施工单位：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="sgdw">
              <el-input type="text" v-model="form.sgdw" clearable class="selectstyle" />
            </el-form-item>
          </el-col>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    add,
    edit
  } from '@/api/liveDetectionManage/modelLibrary'
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
      /**打开页面的id */
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
      Detailsdata:{
        type: Object ,
        default: {}
      }
    },
    mounted() {
      this.getDetailsdata()
    },
    data() {
      return {
        form: {
          gys:'',//供应商
          fws:'',//服务商
          sgdw:'',//施工单位
        },
        selection:{},//搜索数据
        showDialog: this.isShowDialog, //打开弹框
        editbtn: this.isEdit, //是否是编辑按钮
        addbtn: this.isAdd, //是否是新增按钮
        formRules: {
          gys: [{
            required: true,
            message: '请输入供应商',
            trigger: 'change',
          }],
          fws: [{
            required: true,
            message: '请输入服务商',
            trigger: 'change',
          }],
          sgdw: [{
            required: true,
            message: '请输入施工单位',
            trigger: 'change',
          }]
        }
      }
    },
    watch: {
      isShowDialog(val) {
        this.showDialog = val;
      },
      isEdit(val) {
        this.editbtn = val;
      },
      isAdd(val) {
        this.addbtn = val;
      }
    },
    methods: {

      getDetailsdata(){
        //console.log(this.Detailsdata)
        if(this.editbtn){
          this.form.gys=this.Detailsdata.gys //隐患部件搜索关键字
          this.form.fws=this.Detailsdata.fws //隐患部件搜索关键字
          this.form.sgdw=this.Detailsdata.sgdw //隐患部件搜索关键字
        }
      },
      /**
       * 取消按钮
       */
      handleClose(done) {
        this.$confirm("确认关闭？")
          .then(_ => {
            this.showDialog = false;
            this.editbtn = false;
            this.addbtn = false;
            this.$emit("childFn", {
              showDialog: this.showDialog,
              editbtn: this.editbtn,
              addbtn: this.addbtn
            });
            done();
          })
          .catch(_ => {});
      },
      addfun() {
        let data = {
          gys: this.form.gys, //隐患部件搜索关键字
          fws: this.form.fws, //隐患部件编号搜索关键字
          sgdw: this.form.sgdw, //隐患类型搜索关键字

        }
        add(qs.stringify(data)).then(response => {
          if (response.status == 200) {
            if (response.data.msg == '操作成功') {
              this.$message({
                message: response.data.msg,
                type: 'success'
              })
              this.showDialog = false;
              this.editbtn = false;
              this.addbtn = false;
              this.$emit("childFn", {
                showDialog: this.showDialog,
                editbtn: this.editbtn,
                addbtn: this.addbtn,
                Refresh: true
              });
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
        let data = {
          gys: this.form.gys, //供应商
          fws: this.form.fws, //服务商
          sgdw: this.form.sgdw, //施工单位
          id:this.Detailsdata.id
        }
        edit(qs.stringify(data)).then(response => {
          if (response.status == 200) {
            if (response.data.msg == '操作成功') {
              this.$message({
                message: response.data.msg,
                type: 'success'
              })
              this.showDialog = false;
              this.editbtn = false;
              this.addbtn = false;
              this.$emit("childFn", {
                showDialog: this.showDialog,
                editbtn: this.editbtn,
                addbtn: this.addbtn,
                Refresh: true
              });
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
        } else {
          //console.log("err");
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
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
