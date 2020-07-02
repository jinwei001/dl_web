<template>
  <!-- <h2>通道断面管理新增</h2> -->
  <div class="single-row-title">
    <el-dialog :visible.sync="showDialog" title="标准隐患库" v-dialogDrag :center="true" :before-close="handleClose">
      <el-form ref="form" :model="form" style="width:100% ;margin: 0 auto;" :rules="formRules">
        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />隐患部件：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="HiddenComponentSearchVal">
              <el-select v-model="form.HiddenComponentSearchVal" clearable placeholder="请选择" class="selectstyle">
                <el-option v-for="item in selection.HiddenComponentData" :key="item.id" :label="item.qb" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />隐患部件编号：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="HiddenDangerPartNumberSearchVal">
              <el-input type="text" v-model="form.HiddenDangerPartNumberSearchVal" clearable class="selectstyle" />
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />隐患类型：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="HiddenDangerTypeSearchVal">
              <el-select v-model="form.HiddenDangerTypeSearchVal" clearable placeholder="请选择" class="selectstyle">
                <el-option v-for="item in selection.HiddenComponentData" :key="item.id" :label="item.qb" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />隐患类型编号：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="HiddenDangerTypeNumberSearchVal">
              <el-input type="text" v-model="form.HiddenDangerTypeNumberSearchVal" clearable class="selectstyle" />
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />隐患原因：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="HiddenCauseSearchVal">
              <el-input type="text" v-model="form.HiddenCauseSearchVal" clearable class="selectstyle" />
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />隐患原因编号：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="HiddenCauseNumberSearchVal">
              <el-input type="text" v-model="form.HiddenCauseNumberSearchVal" clearable class="selectstyle" />
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />隐患等级：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="HiddenDangerLevelSearchVal">
              <el-select v-model="form.HiddenDangerLevelSearchVal" clearable placeholder="请选择" class="selectstyle">
                <el-option v-for="item in selection.HiddenComponentData" :key="item.id" :label="item.qb" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />停电要求：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="BlackoutRequirementsSearchVal">
              <el-input type="text" v-model="form.BlackoutRequirementsSearchVal" clearable class="selectstyle" />
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />隐患处理方案：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="HiddenDangerTreatmentPlanSearchVal">
              <el-input type="text" v-model="form.HiddenDangerTreatmentPlanSearchVal" clearable class="selectstyle" />
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
    tHiddendangerTpWarehouseadd,
    tHiddendangerTpWarehouseedit
  } from '@/api/Sixdefensemanagement/HiddenDanger'
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
          HiddenComponentSearchVal: '', //隐患部件搜索关键字
          HiddenDangerPartNumberSearchVal: '', //隐患部件编号搜索关键字
          HiddenDangerTypeSearchVal: '1', //隐患类型搜索关键字
          HiddenDangerTypeNumberSearchVal: '', //隐患类型编号搜索关键字
          HiddenCauseSearchVal: '', ////隐患原因搜索关键字
          HiddenCauseNumberSearchVal: '', ////隐患原因编号搜索关键字
          HiddenDangerLevelSearchVal: '', ////隐患等级
          BlackoutRequirementsSearchVal: '', ////停电要求搜索关键字
          HiddenDangerTreatmentPlanSearchVal: '' //隐患处理方案搜索关键字
        },
        selection: {
          HiddenComponentData: [{
            id: "1",
            qb: "部件1"
          }], //隐患部件搜索数据
        },

        showDialog: this.isShowDialog, //打开弹框
        editbtn: this.isEdit, //是否是编辑按钮
        addbtn: this.isAdd, //是否是新增按钮
        formRules: {
          HiddenComponentSearchVal: [{
            required: true,
            message: '请选择隐患部件',
            trigger: 'change',
          }],
          HiddenDangerPartNumberSearchVal: [{
            required: true,
            message: '请输入隐患部件编号',
            trigger: 'change',
          }],
          HiddenDangerTypeSearchVal: [{
            required: true,
            message: '请选择隐患类型',
            trigger: 'change',
          }],
          HiddenCauseSearchVal: [{
            required: true,
            message: '请输入隐患原因',
            trigger: 'change',
          }],
          HiddenCauseNumberSearchVal: [{
            required: true,
            message: '请输入隐患原因编号',
            trigger: 'change',
          }],
          HiddenDangerLevelSearchVal: [{
            required: true,
            message: '请输入隐患等级',
            trigger: 'change',
          }],
          BlackoutRequirementsSearchVal: [{
            required: true,
            message: '请输入停电要求',
            trigger: 'change',
          }],
          HiddenDangerTreatmentPlanSearchVal: [{
            required: true,
            message: '请输入隐患处理方案',
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

      getDetailsdata(){//console.log(this.Detailsdata)
        if(this.editbtn){
          this.form.HiddenComponentSearchVal=this.Detailsdata.hdparts //隐患部件搜索关键字
          this.form.HiddenDangerPartNumberSearchVal=this.Detailsdata.hdpartsnum //隐患部件搜索关键字
          this.form.HiddenDangerTypeSearchVal=this.Detailsdata.hdtype //隐患部件搜索关键字
          this.form.HiddenDangerTypeNumberSearchVal=this.Detailsdata.hdtypenum //隐患部件搜索关键字
          this.form.HiddenCauseSearchVal=this.Detailsdata.hdreason //隐患部件搜索关键字
          this.form.HiddenCauseNumberSearchVal=this.Detailsdata.hdreasonnum //隐患部件搜索关键字
          this.form.HiddenDangerLevelSearchVal=this.Detailsdata.hdclass //隐患部件搜索关键字
          this.form.BlackoutRequirementsSearchVal=this.Detailsdata.poweroutreq //隐患部件搜索关键字
          this.form.HiddenDangerTreatmentPlanSearchVal=this.Detailsdata.disposalplan //隐患部件搜索关键字
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
          hdparts: this.form.HiddenComponentSearchVal, //隐患部件搜索关键字
          hdpartsnum: this.form.HiddenDangerPartNumberSearchVal, //隐患部件编号搜索关键字
          hdtype: this.form.HiddenDangerTypeSearchVal, //隐患类型搜索关键字
          hdtypenum: this.form.HiddenDangerTypeNumberSearchVal, //隐患类型编号搜索关键字
          hdreason: this.form.HiddenCauseSearchVal, ////隐患原因搜索关键字
          hdreasonnum: this.form.HiddenCauseNumberSearchVal, ////隐患原因编号搜索关键字
          hdclass: this.form.HiddenDangerLevelSearchVal, ////隐患等级
          poweroutreq: this.form.BlackoutRequirementsSearchVal, ////停电要求搜索关键字
          disposalplan: this.form.HiddenDangerTreatmentPlanSearchVal //隐患处理方案搜索关键字
        }
        tHiddendangerTpWarehouseadd(qs.stringify(data)).then(response => {
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
          hdparts: this.form.HiddenComponentSearchVal, //隐患部件搜索关键字
          hdpartsnum: this.form.HiddenDangerPartNumberSearchVal, //隐患部件编号搜索关键字
          hdtype: this.form.HiddenDangerTypeSearchVal, //隐患类型搜索关键字
          hdtypenum: this.form.HiddenDangerTypeNumberSearchVal, //隐患类型编号搜索关键字
          hdreason: this.form.HiddenCauseSearchVal, ////隐患原因搜索关键字
          hdreasonnum: this.form.HiddenCauseNumberSearchVal, ////隐患原因编号搜索关键字
          hdclass: this.form.HiddenDangerLevelSearchVal, ////隐患等级
          poweroutreq: this.form.BlackoutRequirementsSearchVal, ////停电要求搜索关键字
          disposalplan: this.form.HiddenDangerTreatmentPlanSearchVal ,//隐患处理方案搜索关键字
          objId:this.Detailsdata.objId
        }
        tHiddendangerTpWarehouseedit(qs.stringify(data)).then(response => {
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
