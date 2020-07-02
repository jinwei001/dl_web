<template>
  <!-- <h2>值守计划新增</h2> -->
  <div class="single-row-title" v-if="Detailsdata">
    <el-dialog :visible.sync="dialogParameter.showDialog" :title="dialogParameter.title" v-dialogDrag :center="true"
      :before-close="handleClose" :width="dialogParameter.dialogWidth">
      <el-form ref="form" :model="form" style="width:100% ;margin: 0 auto;" :rules="formRules" label-position="right"
        :inline='false' label-width='120px' id='zhishouBOX'>

        <el-col :span="24">
          <el-row>
            <el-col :span="12">
              <el-form-item prop="Hiddendangernumber" label="隐患编号">
                <el-input type="text" v-model="form.Hiddendangernumber" clearable :disabled="ViewStatus===true||PlaneditStatus===true" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="LineName" :label="$xl+'名称'">
                <el-input type="text" v-model="form.LineName" clearable :disabled="ViewStatus===true||PlaneditStatus===true" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item prop="VoltageLevel" :label="$dydj">
                <el-input type="text" v-model="form.VoltageLevel" clearable :disabled="ViewStatus===true||PlaneditStatus===true" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="cable" :label="$dl">
                <el-input type="text" v-model="form.cable" clearable :disabled="ViewStatus===true||PlaneditStatus===true" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item prop="Hiddenaddress" label="隐患地址">
                <el-input type="text" v-model="form.Hiddenaddress" clearable :disabled="ViewStatus===true||PlaneditStatus===true" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="EquipmentType" label="隐患类别">
                <el-input type="text" v-model="form.EquipmentType" clearable :disabled="ViewStatus===true||PlaneditStatus===true" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="Ondutyteam" label="指定班组">
                <el-input type="text" v-model="form.Ondutyteam" clearable :disabled="ViewStatus===true||PlaneditStatus===true" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="CurrentWatchman" label="指定值守人">
                <el-select v-model="form.CurrentWatchman" clearable placeholder="请选择" multiple :disabled="ViewStatus===true">
                  <el-option v-for="item in zhishourenList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="Hiddenstate" label="隐患当前状态">
                <el-input type="text" v-model="form.Hiddenstate" clearable :disabled="ViewStatus===true||PlaneditStatus===true" />
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="Module">
              <el-form-item prop="Ondutystate" label="值守状态">
                <el-input type="text" v-model="form.Ondutystate" clearable :disabled="ViewStatus===true" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="BaodianTime" label="值守时间">
                <el-date-picker v-model="form.BaodianTime" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="daterange"
                  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width: 100%;" :disabled="ViewStatus===true" />
              </el-form-item>
            </el-col>
    <!--        <el-col :span="12">
              <el-form-item prop="CurrentOndutyPeople" label="当前值守人数">
                <el-input type="text" v-model="form.CurrentOndutyPeople" clearable :disabled="ViewStatus===true" />
              </el-form-item>
            </el-col> -->
          </el-row>
          <div v-if="Module">
              <el-col :span="24" class="Punch-card-box">
            <el-row>
              <el-col :span="12">
                <el-form-item prop="PunchTime1" label="打卡时间1">
                  <el-date-picker v-model="form.PunchTime1" format="yyyy 年 MM 月 dd 日 HH 时 mm分 ss秒" value-format="yyyy-MM-dd hh:mm:ss" type="date"
                    style="width: 100%;" :disabled="ViewStatus===true"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="Watchdescription1" label="值守描述1">
                  <el-input type="text" v-model="form.Watchdescription1" clearable :disabled="ViewStatus===true"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item prop="Punchcoordinates1" label="打卡坐标1">
                  <el-input type="text" v-model="form.Punchcoordinates1" clearable :disabled="ViewStatus===true"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item prop="pictures1" label="图片1">
                  <el-upload :action="HdhUploadsrc" :show-file-list="true" :on-success="(response, file, fileList)=>handleAvatarSuccess(response, file, fileList,'one')"
                    :before-upload="beforeAvatarUpload" :on-preview="handlePreview" :on-remove="(file, fileList)=>handleRemove(file, fileList,'one')"
                    :file-list="form.pictures1" list-type="picture-card" accept="image/png,image/jpeg,image/jpg" :disabled="ViewStatus===true">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
 </el-col>
              <el-col :span="24" class="Punch-card-box">
            <el-row>
              <el-col :span="12">
                <el-form-item prop="PunchTime2" label="打卡时间2">
                  <el-date-picker v-model="form.PunchTime2" format="yyyy 年 MM 月 dd 日 HH 时 mm分 ss秒" value-format="yyyy-MM-dd hh:mm:ss" type="date"
                    style="width: 100%;" :disabled="ViewStatus===true"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="Watchdescription2" label="值守描述2">
                  <el-input type="text" v-model="form.Watchdescription2" clearable :disabled="ViewStatus===true"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item prop="Punchcoordinates2" label="打卡坐标2">
                  <el-input type="text" v-model="form.Punchcoordinates2" clearable :disabled="ViewStatus===true"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item prop="pictures2" label="图片2">
                  <el-upload :action="HdhUploadsrc" :show-file-list="true" :on-success="(response, file, fileList)=>handleAvatarSuccess(response, file, fileList,'two')"
                    :before-upload="beforeAvatarUpload" :on-preview="handlePreview" :on-remove="(file, fileList)=>handleRemove(file, fileList,'two')"
                    :file-list="form.pictures2" list-type="picture-card" accept="image/png,image/jpeg,image/jpg" :disabled="ViewStatus===true">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
           </el-col>

            <el-col :span="24" class="Punch-card-box">
            <el-row>
              <el-col :span="12">
                <el-form-item prop="PunchTime3" label="打卡时间3">
                  <el-date-picker v-model="form.PunchTime3" format="yyyy 年 MM 月 dd 日 HH 时 mm分 ss秒" value-format="yyyy-MM-dd hh:mm:ss" type="date"
                    style="width: 100%;" :disabled="ViewStatus===true"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="Watchdescription3" label="值守描述3">
                  <el-input type="text" v-model="form.Watchdescription3" clearable :disabled="ViewStatus===true" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item prop="Punchcoordinates3" label="打卡坐标3">
                  <el-input type="text" v-model="form.Punchcoordinates3" clearable :disabled="ViewStatus===true"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item prop="pictures3" label="图片3">
                  <el-upload :action="HdhUploadsrc" :show-file-list="true" :on-success="(response, file, fileList)=>handleAvatarSuccess(response, file, fileList,'three')"
                    :before-upload="beforeAvatarUpload" :on-preview="handlePreview" :on-remove="(file, fileList)=>handleRemove(file, fileList,'three')"
                    :file-list="form.pictures3" list-type="picture-card" accept="image/png,image/jpeg,image/jpg" :disabled="ViewStatus===true">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            </el-col>
          </div>
        </el-col>



      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun" v-if="PlaneditStatus===true||this.isstartsName === 'add'">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog v-dialogDrag :visible.sync="imgshow" title="图片预览" :center="true">
      <img :src="imageUrl" style="width: 100%;">
    </el-dialog>
  </div>
</template>

<script>
  import {
    tHiddendangerOndutyadd,
    tHiddendangerOndutyedit,
    tHiddendangergetEditeInfo,
    tHidJhTaskgetDKInfo
  } from '@/api/Sixdefensemanagement/Hiddeninformationlist'
  import {
    userList, //发现人
  } from '@/api/Sixdefensemanagement/HiddenDangerReview'
  import {
    verificationList
  } from './verification.js'
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
      /**
       * 接收是否打开页面
       */
      isstartsName: {
        type: String,
        default: ''
      },
      Detailsdata: {
        type: Object,
        default: function() {
          return {}
        }
      }
    },
    created: function() {
      // //console.log(this.Detailsdata, '接收成功')
      if (this.Detailsdata.list) {
        this.selection = this.Detailsdata.list //下拉数据
      }

    },
    mounted() {
      // //console.log(this.isstartsName, '检修接收成功222222')
      if (this.isstartsName === 'add') {
        this.dialogParameter.title = '计划新增'
        this.getadddatafun()
        this.PlaneditStatus = true
         this.ViewStatus = false
      } else if (this.isstartsName === 'edit') {
        this.getDetailsdata()
        this.dialogParameter.title = '计划编辑'
        this.PlaneditStatus = true
      } else if (this.isstartsName === 'View') {
        this.dialogParameter.title = '计划查看'
        this.getDetailsdata()
        this.ViewStatus = true
        this.PlaneditStatus = false
      } else if (this.isstartsName === 'Taskeditor') {
        this.dialogParameter.title = '任务编辑'
        this.Module = true
      } else if (this.isstartsName === 'Taskreview') {
        this.dialogParameter.title = '任务查看'
        this.Module = true
        this.getRWdata()
        this.ViewStatus = true

      }
    },
    data() {
      return {
        Module: false,
        ViewStatus: false,
        PlaneditStatus: false,
        //弹窗参数配置
        dialogParameter: {
          dialogWidth: '60%',
          title: '未知',
          showDialog: this.isShowDialog, //打开弹框
        },
        geteditdata: {},
        HdhUploadsrc: process.env.VUE_APP_BASE_API + '/cable/tHiddendangerMessage/upLoadImage',
        imgshow: false, //图片弹窗关闭
        imageUrl: '', //图片预览地址

        form: {
          Hiddendangernumber: '', //隐患编号

          LineName: '', //XLID
          VoltageLevel: '', //电压

          cable: '', //DL
          Hiddenaddress: '', //隐患地址
          EquipmentType: '', //隐患类型
          BaodianTime: '', //保电时间
          CurrentOndutyPeople: '', //当值守人数
          Ondutyteam: '', //值守班组
          CurrentWatchman: '', //当前值守人
          Hiddenstate: '', //;隐患状态
          Ondutystate:'',//值守状态
          // ————————————————————————————————————

          zhiShouRen: '', //值守人单设备主人
          pictures1: [], //图片
          pictures2: [], //图片
          pictures3: [], //图片
          PunchTime1: '', //打卡时间
          Watchdescription1: '', //值守备注
          Punchcoordinates1: '', //打卡坐标
          PunchTime2: '',
          Watchdescription2: '',
          Punchcoordinates2: '',
          PunchTime3: '',
          Watchdescription3: '',
          Punchcoordinates3: '',
        },
        zhishourenList: [],
        selection: {

        },
        editbtn: this.isEdit, //是否是编辑按钮
        addbtn: this.isAdd, //是否是新增按钮
        formRules: verificationList
      }
    },
    watch: {
      isShowDialog(val) {
        this.dialogParameter.showDialog = val;
      },
      // isEdit(val) {
      //   this.editbtn = val;
      // },
      // isAdd(val) {
      //   this.addbtn = val;
      // }
    },
    methods: {
      //发现班组改变时带出大学人员
      zhishourenListFun(val) {
        this.form.CurrentWatchman = ''
        const data = {
          groupname: val, //发现班组id
        }
        userList(qs.stringify(data)).then(response => {
          if (response.status == 200) {
            if (response.data.msg == '操作成功') {

              this.zhishourenList = response.data.data //DL下拉
            } else {
              this.$message({
                message: '隐患类型下拉列表获取失败',
                type: 'error'
              })
            }
          }
        })
      },
      getadddatafun() {
        this.form.Hiddendangernumber = this.Detailsdata.data.yinHuanBianHao //隐患编号

        this.form.LineName = this.Detailsdata.data.xianLuName //XL名称
        this.form.VoltageLevel = this.Detailsdata.data.dianYaDengJi //电压名称

        this.form.cable = this.Detailsdata.data.dianLan //DL
        this.form.Hiddenaddress = this.Detailsdata.data.yinHuanDiZhi //隐患地址
        this.form.EquipmentType = this.Detailsdata.data.yinHuanLeiBie //隐患设备
        this.form.Ondutyteam = this.Detailsdata.data.zhiShouBanZu //值守班组
        this.form.zhiShouRen = this.Detailsdata.data.zhiShouRen
        this.form.Hiddenstate = this.Detailsdata.data.dangQianZhuangTai
        this.zhishourenListFun(this.form.Ondutyteam)
      },
      getDetailsdata() {
        let data = {
          objId: this.Detailsdata.data.objId
        }
        tHiddendangergetEditeInfo(qs.stringify(data)).then(response => {
          if (response.status == 200) {
            if (response.data.msg === '操作成功') {
              this.geteditdata = response.data.dataInfo
              this.form.Hiddendangernumber = this.geteditdata.yinHuanBianHao //隐患编号

              this.form.LineName = this.geteditdata.xianLuName //XL
              this.form.VoltageLevel = this.geteditdata.dianYaDengJi //电压
              this.form.cable = this.geteditdata.dianLan //电栏
              this.form.Hiddenaddress = this.geteditdata.yinHuanDiZhi //地址
              this.form.EquipmentType = this.geteditdata.yinHuanLeiBie //隐患类型
              this.form.Ondutyteam = this.geteditdata.zhiShouBanZu //值守班组
              this.form.zhiShouRen = this.geteditdata.zhiShouRen //值守人
              this.form.Hiddenstate = this.geteditdata.dangQianZhuangTai //隐患状态
              this.form.CurrentOndutyPeople = this.geteditdata.zhiShouNumber //值守人数
              this.zhishourenListFun(this.form.Ondutyteam)
              if (this.geteditdata.ondutyuser.indexOf(",") != -1) {
                this.form.CurrentWatchman = this.geteditdata.ondutyuser.split(',')
              } else {
                this.form.CurrentWatchman = [this.geteditdata.ondutyuser] //多值守人
              }
              if (this.geteditdata.startTime && this.geteditdata.endTime) {

                this.form.BaodianTime = [this.geteditdata.startTime, this.geteditdata.endTime]
              }
            } else {
              this.$message({
                message: '值守计划编辑详情获取失败',
                type: 'error'
              })
              // //console.log('值守计划编辑详情获取失败')
            }
          }
        })
      },
      //任务详情
      getRWdata() {
        let data = {
          objId: this.Detailsdata.data.objId
        }
        tHidJhTaskgetDKInfo(qs.stringify(data)).then(response => {
          if (response.status == 200) {
            if (response.data.msg === '操作成功') {
              this.geteditdata = response.data.data
              this.form.Hiddendangernumber = this.geteditdata.yinHuanBianHao //隐患编号

              this.form.LineName = this.geteditdata.xianLuName //XL
              this.form.VoltageLevel = this.geteditdata.dianYaDengJi //电压
              this.form.cable = this.geteditdata.dianLan //电栏
              this.form.Hiddenaddress = this.geteditdata.yinHuanDiZhi //地址
              this.form.EquipmentType = this.geteditdata.yinHuanLeiBie //隐患类型
              this.form.Ondutyteam = this.geteditdata.zhiShouBanZu //值守班组
              this.form.zhiShouRen = this.geteditdata.zhiShouRen //值守人
              this.form.Hiddenstate = this.geteditdata.dangQianZhuangTai //隐患状态
              this.form.CurrentOndutyPeople = this.geteditdata.ondutynum //值守人数
              this.zhishourenListFun(this.form.Ondutyteam)
              this.form.Ondutystate=this.geteditdata.ondutystatus//值守状态
              this.form.PunchTime1=this.geteditdata.oneTime
              this.form.PunchTime2=this.geteditdata.twoTime
              this.form.PunchTime3=this.geteditdata.threeTime

              this.form.Watchdescription1=this.geteditdata.dakaremarksone
              this.form.Watchdescription2=this.geteditdata.dakaremarkstwo
              this.form.Watchdescription3=this.geteditdata.dakaremarksthree

              if(this.geteditdata.pictureOneList.length>0){
                 this.form.pictures1=this.geteditdata.pictureOneList
               }
               if(this.geteditdata.pictureTwoList.length>0){
                  this.form.pictures2=this.geteditdata.pictureTwoList
                }
                if(this.geteditdata.pictureThreeList.length>0){
                   this.form.pictures3=this.geteditdata.pictureThreeList
                 }
              this.form.Punchcoordinates1=this.geteditdata.longitude+','+this.geteditdata.latitude
              this.form.Punchcoordinates2=this.geteditdata.longitude+','+this.geteditdata.latitude
              this.form.Punchcoordinates3=this.geteditdata.longitude+','+this.geteditdata.latitude
              if (this.geteditdata.ondutyuser.indexOf(",") != -1) {
                this.form.CurrentWatchman = this.geteditdata.ondutyuser.split(',')
              } else {
                this.form.CurrentWatchman = [this.geteditdata.ondutyuser] //多值守人
              }
              if (this.geteditdata.starteTime && this.geteditdata.endTime) {

                this.form.BaodianTime = [this.geteditdata.starteTime, this.geteditdata.endTime]
              }
            } else {
              this.$message({
                message: '任务详情获取失败',
                type: 'error'
              })
              // //console.log('值守计划编辑详情获取失败')
            }
          }
        })
      },
      //图片删除
      handleRemove(file, fileList, num) {
        // alert(num)
        for (let i = 0; i < this.form.pictures.length; i++) {
          if (this.form.pictures[i].url == file.url) {
            this.form.pictures.splice(i, 1)
          }
        }
      },
      //预览弹窗开启赋值图片
      handlePreview(file) {

        this.imgshow = true
        this.imageUrl = file.url
      },
      //图片上传成功
      handleAvatarSuccess(res, file, fileList, num) {
        if (res.msg == '操作成功') {
          file.name = res.data.wjlj
          if (num === 'one') {
            this.form.pictures.push(file)
          } else if (num === 'two') {

          } else if (num === 'three') {

          }
          // this.form.pictures.push(file)
          // //console.log(this.form.pictures, '新增')
          this.$message({
            message: res.msg,
            type: 'success'
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      },
      beforeAvatarUpload(file) {
        // //console.log(file)
        const isJPG = file.type === 'image/png' || 'image/jpeg' || 'image/jpg';
        const isLt2M = file.size / 1024 / 1024 < 25;
        const isNumber = this.form.pictures.length !== 1;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 图片格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 25MB!');
        }
        if (!isNumber) {
          this.$message.error('只能上传一张图片哟!');
        }
        return isJPG && isLt2M && isNumber;
      },
      /**
       * 取消按钮
       */
      handleClose(done) {
        this.$confirm("确认关闭？")
          .then(_ => {
            this.$emit("childFn", {
              showDialog: false,
              editbtn: false,
              addbtn: false
            });
            done();
          })
          .catch(_ => {});
      },
      addfun() {
        var arry = []
        if (this.form.pictures1.length > 0) {
          for (let i = 0; i < this.form.pictures.length; i++) {
            arry.push(this.form.pictures[i].name)
          }
        }
        let data = {
          hdidentifier: this.form.Hiddendangernumber, //隐患编号

          cablename: this.form.cable, //DL名称
          managementbz: this.form.Ondutyteam, //运维班组
          findaddress: this.form.Hiddenaddress, //隐患地址

          linename: this.form.LineName, //XL名称
          hdtypename: this.form.EquipmentType, //隐患类别
          currentstatus: this.form.Hiddenstate, //隐患状态

          voltage: this.form.VoltageLevel, //DYDJ      对应参数名                //值守人（非多选的值守人）
          objId: this.Detailsdata.data.yinHuanId, //（隐患ID）
          managementpeople: this.form.zhiShouRen, //单值守人
          ondutyuser: this.form.CurrentWatchman.toString(), //多值守人
          startTime: this.form.BaodianTime[0].toString(),
          endTime: this.form.BaodianTime[1].toString(),
          ondutynum: this.form.CurrentOndutyPeople

        }

        this.$refs.form.validate((valid) => {
          if (valid) {
            tHiddendangerOndutyadd(qs.stringify(data)).then(response => {
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
          }
        })


      },
      editfun() {
        // var arry = []
        // if (this.form.pictures.length > 0) {
        //   for (let i = 0; i < this.form.pictures.length; i++) {
        //     arry.push(this.form.pictures[i].name)
        //   }
        // }
        let data = {
          hdidentifier: this.form.Hiddendangernumber, //隐患编号
          cablename: this.form.cable, //DL名称
          managementbz: this.form.Ondutyteam, //运维班组
          findaddress: this.form.Hiddenaddress, //隐患地址

          linename: this.form.LineName, //XL名称
          hdtypename: this.form.EquipmentType, //隐患类别
          currentstatus: this.form.Hiddenstate, //隐患状态

          voltage: this.form.VoltageLevel, //DYDJ      对应参数名                //值守人（非多选的值守人）
          objId: this.Detailsdata.data.yinHuanId, //（隐患ID）
          managementpeople: this.form.zhiShouRen, //单值守人
          ondutyuser: this.form.CurrentWatchman.toString(), //多值守人
          startTime: this.form.BaodianTime[0].toString(),
          endTime: this.form.BaodianTime[1].toString(),
          ondutynum: this.form.CurrentOndutyPeople,
          objId: this.Detailsdata.data.objId
        }


        this.$refs.form.validate((valid) => {
          if (valid) {
            tHiddendangerOndutyedit(qs.stringify(data)).then(response => {
              if (response.status == 200) {
                if (response.data.msg == '操作成功') {
                  this.$message({
                    message: response.data.msg,
                    type: 'success'
                  })
                  this.$emit("childFn", {
                    showDialog: false,
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
          } else {
            this.$message({
              message: '必填项目未填写',
              type: 'error'
            })
          }
        })



      },
      /**
       * 确认按钮
       */
      SuerFun() {

        if (this.isstartsName === 'edit') {
          this.editfun()
        } else if (this.isstartsName === 'add') {

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
<style lang="scss">
  #zhishouBOX {
    .el-range-editor.is-disabled input {
      background-color: white;
    }
    .el-range-editor.is-disabled{
       background-color: white;
    }
    .Punch-card-box{
      margin-bottom: 50px;
      background: #f0f0f0;
      padding-right: 25px;
      padding-top: 20px;
      border-radius: 1%;
      box-shadow: 0 2px 12px 0 floralwhite;
    }
    .el-input.is-disabled .el-input__inner {
      color: black;
      background-color: white;
    }
    .el-input.is-disabled .el-input__inner{
      background-color: white;
    }
    .el-tag--info {
      color: black;
    }

    .el-range-editor.is-disabled input {
      color: black;
    }

    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }

    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    .el-input {
      width: 100%;
    }

    .el-select {
      width: 100%;
    }

    .el-input--suffix {
      width: 100%;
    }

    .el-row {
      margin-bottom: 30px;
    }

    .el-form-item__label {
      // font-weight: 700;
      font-size: 0.9375rem;
    }

    .el-upload-list {
      overflow-y: auto;
      min-height: 60px !important;
      max-height: 300px !important;
      // margin-bottom: 20px;
    }

    .titlestyle {
      font-size: 20px;
      margin-top: 50px;
      margin-bottom: 30px;
    }
  }
</style>
