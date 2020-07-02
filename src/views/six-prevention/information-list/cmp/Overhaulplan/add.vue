<!-- 巡查新增and 编辑 -->
<template>
  <!-- <h2>通道断面管理新增</h2> -->
  <div class="single-row-title" v-if="Detailsdata">
    <el-dialog :visible.sync="showDialog" title="检修计划" v-dialogDrag :center="true" :before-close="handleClose">
      <el-form ref="form" :model="form" style="width:100% ;margin: 0 auto;" :rules="formRules">
        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />计划来源：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="PlanSource">
               <el-input type="text" v-model="form.PlanSource" clearable class="selectstyle" />
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />{{$dydj}}：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="VoltageLevel">
            <el-select v-model="form.VoltageLevel" clearable placeholder="请选择" class="selectstyle">
              <el-option v-for="item in dianyadengji" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
        </el-col>
        </el-col>
        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />{{$xl}}名称：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="LineName">
              <el-select v-model="form.LineName" clearable placeholder="请选择" class="selectstyle" disabled v-if="selection.yingHuan">
                <el-option v-for="item in selection.yingHuan" :key="item.id" :label="item.value" :value="item.id"></el-option>
              </el-select>
            </el-form-item>

          </el-col>
        </el-col>
        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />运维班组：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="OperationsTeam">
              <el-select v-model="form.OperationsTeam" clearable placeholder="请选择" class="selectstyle">
                <el-option v-for="item in selection.banZu" :key="item.id" :label="item.value" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />设备主人：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="Equipmentowner">
            <el-select v-model="form.Equipmentowner" clearable placeholder="请选择" class="selectstyle">
              <el-option v-for="item in selection.yongHu" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>
             </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />检修类型：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="MaintenanceType">
              <el-select v-model="form.MaintenanceType" clearable placeholder="请选择" class="selectstyle">
                <el-option v-for="item in xunshitype" :key="item.id" :label="item.value" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />实验项目：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="experimentalProject">
              <el-select v-model="form.experimentalProject" clearable placeholder="请选择" class="selectstyle">
                <el-option v-for="item in shiyan" :key="item.id" :label="item.value" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />计划开始时间：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="Planstarttime">
              <el-date-picker v-model="form.Planstarttime" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date"
                class="selectstyle" />
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />计划结束时间：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="PlanendTime">
              <el-date-picker v-model="form.PlanendTime" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date"
                class="selectstyle" />
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />停电开始时间：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="Blackoutstarttime">
              <el-date-picker v-model="form.Blackoutstarttime" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date"
                class="selectstyle" />
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />停电结束时间：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="Blackoutendtime">
              <el-date-picker v-model="form.Blackoutendtime" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date"
                class="selectstyle" />
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />是否停电：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="Whetherpowerfailure">
           <el-select v-model="form.Whetherpowerfailure" clearable placeholder="请选择" class="selectstyle">
             <el-option v-for="item in xunshistarts" :key="item.id" :label="item.value" :value="item.id"></el-option>
           </el-select>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />负责班组:
              </label>
            </p>
          </el-col>
          <el-col :span="16">
          <el-form-item prop="ResponsibleTeam">
           <el-select v-model="form.ResponsibleTeam" clearable placeholder="请选择" class="selectstyle">
             <el-option v-for="item in selection.banZu" :key="item.id" :label="item.value" :value="item.id"></el-option>
           </el-select>
           </el-form-item>
          </el-col>
        </el-col>

        <el-col :span="24" class="setbox">
          <el-col :span="6">
            <p>
              <label class="form-label"><span class="xingstyle">*</span>
                <span class="Icon_r" />负责人：
              </label>
            </p>
          </el-col>
          <el-col :span="16">
            <el-form-item prop="principal">
              <el-select v-model="form.principal" clearable placeholder="请选择" class="selectstyle">
                <el-option v-for="item in selection.yongHu" :key="item.id" :label="item.value" :value="item.id"></el-option>
              </el-select>
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
    tHiddendangerMessageaddMaintenanceInfo,
    tHiddendangerMessageupdateMaintenanceInfo
  } from '@/api/Sixdefensemanagement/Hiddeninformationlist'
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
        type: Object,
        default: function() {
          return {}
        }
      }
    },
    created: function(){
          //console.log(this.Detailsdata,'检修接收成功')
          if(this.Detailsdata.list){
           this.selection.yingHuan=this.Detailsdata.list.yingHuan
           this.selection.yongHu=this.Detailsdata.list.yongHu
           this.selection.banZu=this.Detailsdata.list.banZu
          }
          if(this.Detailsdata.data){
         this.form.PlanSource=this.Detailsdata.data.JiHuaLaiYuan
         this.form.Equipmentowner=this.Detailsdata.data.SheBeiZhuRen
         this.form.LineName=this.Detailsdata.data.XianMinChen
         this.form.lineid=this.Detailsdata.data.XianLuId
         this.form.principal=this.Detailsdata.data.FuZeRen
         this.form.OperationsTeam=this.Detailsdata.data.YunWeiBanZu
         this.form.VoltageLevel=Number(this.Detailsdata.data.DianYaDengJi)
         if(this.Detailsdata.data.FuZeBanZu==null){
           this.form.ResponsibleTeam=this.Detailsdata.data.FuZeRen
         }
          }
    },
    mounted() {
      this.getDetailsdata()
    },
    data() {
      return {
        xunshistarts:[{
          id:0,
          value:'否'
        },
        {
          id:1,
          value:'是'
        }],
        dianyadengji:[{
          id:0,
          value:this.$dydj+'一'
        },
        {
          id:1,
          value:this.$dydj+'二'
        }],
        xunshitype:[{
          id:0,
          value:'类型一'
        },
        {
          id:1,
          value:'类型二'
        }],
        shiyan:[{
          id:0,
          value:'实验一'
        },
        {
          id:1,
          value:'实验二'
        }],
        form: {
          PlanSource:'',//计划来源
          VoltageLevel:'',//DYDJ
          lineid:'',//XLID
          LineName:'',//XL名称


          OperationsTeam:'',//运维班组
          Equipmentowner:'',//设备主人

          MaintenanceType:'',//检修计划
          experimentalProject:'',//试验项目
          Planstarttime:'',//计划开始时间
          PlanendTime:'',//计划结束时间
          Blackoutstarttime:'',//停电开始时间
          Blackoutendtime:'',//停电结束时间
          Whetherpowerfailure:'',//是否停电
          ResponsibleTeam:'',//负责班组
          principal:'',//负责人


        },
        selection: {
              yingHuan:[],
              yongHu:[],
              banZu:[]
        },

        showDialog: this.isShowDialog, //打开弹框
        editbtn: this.isEdit, //是否是编辑按钮
        addbtn: this.isAdd, //是否是新增按钮
        formRules: {
          PlanSource: [{
            required: true,
            message: '请选择计划来源',
            trigger: 'change',
          }],
          VoltageLevel: [{
            required: true,
            message: '请选择'+this.$dydj,
            trigger: 'change',
          }],
          lineid: [{
            required: true,
            message: '请选择'+this.$xl,
            trigger: 'change',
          }],
          OperationsTeam: [{
            required: true,
            message: '请输入运维班组',
            trigger: 'change',
          }],
          Equipmentowner: [{
            required: true,
            message: '请输入设备主人',
            trigger: 'change',
          }],
          MaintenanceType: [{
            required: true,
            message: '请输入检修类型',
            trigger: 'change',
          }],
          experimentalProject: [{
            required: true,
            message: '请输入实验项目',
            trigger: 'change',
          }],
          Planstarttime: [{
            required: true,
            message: '请输入计划开始',
            trigger: 'change',
          }],
          PlanendTime: [{
            required: true,
            message: '请输入计划结束',
            trigger: 'change',
          }],
          Blackoutstarttime: [{
            required: true,
            message: '请输入停电开始',
            trigger: 'change',
          }],
          Blackoutendtime: [{
            required: true,
            message: '请输入停电结束',
            trigger: 'change',
          }],
          Whetherpowerfailure: [{
            required: true,
            message: '请输入是否停电',
            trigger: 'change',
          }],
          ResponsibleTeam: [{
            required: true,
            message: '请输入/负责班组',
            trigger: 'change',
          }],
          principal: [{
            required: true,
            message: '责任人',
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
        if(this.editbtn){
          this.form.PlanSource=this.Detailsdata.xunshidata.planlaiyuan  //计划来源
          this.form.VoltageLevel=Number(this.Detailsdata.xunshidata.voltage) //DYDJ
          this.form.LineName=this.Detailsdata.xunshidata.lineid //XLId
          this.form.Equipmentowner=this.Detailsdata.xunshidata.eqoner //设备主人
          this.form.MaintenanceType=Number(this.Detailsdata.xunshidata.maintenancetype)//检修类型
          this.form.experimentalProject=Number(this.Detailsdata.xunshidata.experimentitem) ////实验项目

          this.form.Planstarttime=this.Detailsdata.xunshidata.planstarttime///计划开始时间
          this.form.PlanendTime=this.Detailsdata.xunshidata.planendtime////计划结束时间
          this.form.Blackoutstarttime=this.Detailsdata.xunshidata.powerfailurestrtime ////停电开始
          this.form.Blackoutendtime=this.Detailsdata.xunshidata.powerfailureendtime//停电结束

          this.form.ResponsibleTeam=this.Detailsdata.xunshidata.managementbz//负责班组
          this.form.principal=this.Detailsdata.xunshidata.managementpeople//负责人
          this.form.Whetherpowerfailure=Number(this.Detailsdata.xunshidata.ispowerfailure)//是否停电

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
          planlaiyuan: this.form.PlanSource, //计划来源
          voltage: this.form.VoltageLevel, //DYDJ
          lineid: this.form.LineName, //XLId
          eqoner: this.form.Equipmentowner, //设备主人
          maintenancetype:this.form.MaintenanceType,//检修类型
          experimentitem: this.form.experimentalProject, ////实验项目
          planstarttime: this.form.Planstarttime, ///计划开始时间
          planendtime: this.form.PlanendTime, ////计划结束时间
          powerfailurestrtime: this.form.Blackoutstarttime, ////停电开始
          powerfailureendtime: this.form.Blackoutendtime , //停电结束
          managementbz:this.form.ResponsibleTeam,  //负责班组
          managementpeople: this.form.principal , //负责人
          ispowerfailure:this.form.Whetherpowerfailure,  //是否停电
          objId:this.Detailsdata.id,
        }
        tHiddendangerMessageaddMaintenanceInfo(qs.stringify(data)).then(response => {
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

          objId:this.Detailsdata.xunshidata.objId,
          planlaiyuan: this.form.PlanSource, //计划来源
          voltage: this.form.VoltageLevel, //DYDJ
          lineid: this.form.LineName, //XLId
          eqoner: this.form.Equipmentowner, //设备主人
          maintenancetype:this.form.MaintenanceType,//检修类型
          experimentitem: this.form.experimentalProject, ////实验项目
          planstarttime: this.form.Planstarttime, ///计划开始时间
          planendtime: this.form.PlanendTime, ////计划结束时间
          powerfailurestrtime: this.form.Blackoutstarttime, ////停电开始
          powerfailureendtime: this.form.Blackoutendtime , //停电结束
          managementbz:this.form.ResponsibleTeam,  //负责班组
          managementpeople: this.form.principal , //负责人
          ispowerfailure:this.form.Whetherpowerfailure,  //是否停电
        }
        tHiddendangerMessageupdateMaintenanceInfo(qs.stringify(data)).then(response => {
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
          this.$refs.form.validate((valid) => {
            if (valid) {
          this.editfun()
          }
          })
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
