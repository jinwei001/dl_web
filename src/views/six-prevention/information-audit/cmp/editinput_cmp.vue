<!-- 审核隐患input组件 -->
<template>
  <!-- <h2>xl只用于详情和处理</h2> -->
  <div class="xs-hastitle">

      <el-form
        id="SHBOX"
        ref="form"
        :model="form"
        label-position="right"
        style="width:100% ;margin: 0 auto;"
        :rules="formRules"
        :inline="false"
        label-width="120px"
      >
        <!--      ----------------------------------列表-------------------------------------- -->
        <div>
          <div class="Form-input">
            <div class="form-item" />
            <div class="form-item">
              <label class="form-label">
                <span class="Icon_r" />当前处理人：
              </label>
              <el-input clearable disabled value="设备主人上报" />
            </div>
            <div class="form-item" />
          </div>
          <!--      ----------------------------------隐患设备信息-------------------------------------- -->
          <div class="titlestyle"><label>隐患设备信息</label></div>
          <el-col :span="24">
            <el-row>
              <el-col :span="8">
                <el-form-item ref="HiddenDangerLine" prop="HiddenDangerLine" :label="'隐患'+$xl">
                  <el-select
                    v-model="form.HiddenDangerLine"
                    placeholder="请选择"
                    :disabled="daidianshow===true||submitReviewparameter.type===1"
                    @change="YHxianluchangeFun"
                    filterable
                    multiple
                  >
                    <el-option v-for="item in selection.yingHuan" :key="item.id" :label="item.value" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item ref="VoltageLevel" prop="VoltageLevel"  :label="$dydj">
                  <el-input v-model="form.VoltageLevel" disabled placeholder="请选择" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
               <el-form-item ref="cableObj[0]" prop="cableObj[0]" :label="$dl">
                 <el-select v-model="form.cableObj" placeholder="请选择" :disabled="daidianshow===true||submitReviewparameter.type===1" value-key="dlid"  multiple>
                   <el-option v-for="item in sevdata.dianlanList" :key="item.dlid" :label="item.dlmc" :value="item" />
                 </el-select>
               </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item ref="HiddenEquipmentType" prop="HiddenEquipmentType" label="隐患设备类型">
                  <el-select v-model="form.HiddenEquipmentType" placeholder="请选择隐患设备类型" @change="YHSBLXchangeFun" :disabled="submitReviewparameter.type===1">
                    <el-option v-for="item in sevdata.YHshebeileixingList" :key="item.id" :label="item.value" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item ref="HiddenEquipment" prop="HiddenEquipment" label="隐患设备">
                  <el-select v-model="form.HiddenEquipment" placeholder="请选择隐患设备" filterable multiple :disabled="submitReviewparameter.type===1">
                    <el-option v-for="item in sevdata.shebeimingchengList" :key="item.id" :label="item.name" :value="item.name" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item ref="HiddenPart" prop="HiddenPart" label="隐患部位">
                  <el-select v-model="form.HiddenPart" placeholder="请选择隐患部位" :disabled="submitReviewparameter.type===1">
                    <el-option
                      v-for="(item,index) in sevdata.yinghuangbuweiList"
                      :key="index"
                      :label="item.value"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <!--      ----------------------------------隐患发现信息-------------------------------------- -->
            <div class="titlestyle"><label>隐患发现信息</label></div>

            <el-row>
              <el-col :span="8">
                <el-form-item label="发现方式">
                  <el-select v-model="form.DiscoveryMethod" clearable placeholder="请选择发现方式" :disabled="daidianshow===true||submitReviewparameter.type===1">
                    <el-option v-for="item in selection.faXianFangShi" :key="item.id" :label="item.value" :value="item.id" />
                  </el-select>
                </el-form-item>

              </el-col>
              <el-col :span="8">
                <el-form-item ref="DiscoveryTeam" prop="DiscoveryTeam" label="发现班组">
                  <el-select v-model="form.DiscoveryTeam" placeholder="请选择发现班组" @change="FXbzchangeFun" :disabled="submitReviewparameter.type===1">
                   <el-option v-for="item in selection.FXBZarry" :key="item.objId" :label="item.groupname" :value="item.groupname" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item ref="FindPeople" prop="FindPeople.id" label="发现人">
                  <el-select v-model="form.FindPeople" clearable placeholder="请选择发现人" value-key="id" filterable :disabled="submitReviewparameter.type===1">
                    <el-option v-for="item in sevdata.faxianrenList" :key="item.id" :label="item.name" :value="item" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item ref="date_time" prop="date_time" label="发现日期">
                  <el-date-picker
                    v-model="form.date_time"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="请选择发现日期"
                    :disabled="submitReviewparameter.type===1"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8" />
            </el-row>
          </el-col>
          <!--      ----------------------------------隐患描述信息-------------------------------------- -->
          <el-col :span="24">
            <div class="titlestyle"><label>隐患描述信息</label></div>

            <el-row>
              <el-col :span="8">
                <el-form-item ref="HiddenPrimitiveUnit" prop="HiddenPrimitiveUnit" label="隐患源单位">
                  <el-input v-model="form.HiddenPrimitiveUnit" clearable placeholder="请输入隐患源单位" :disabled="submitReviewparameter.type===1"/>
                </el-form-item>

              </el-col>
              <el-col :span="8">
                <el-form-item ref="Hiddencontact" prop="Hiddencontact" label="隐患源联系人">
                  <el-input v-model="form.Hiddencontact" clearable placeholder="请输入隐患源联系人" :disabled="submitReviewparameter.type===1"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item ref="contactnumber" prop="contactnumber" label="联系电话">
                  <el-input v-model="form.contactnumber" clearable placeholder="请输入联系电话" :disabled="submitReviewparameter.type===1"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item ref="HiddenDangerLocation" prop="HiddenDangerLocation" label="隐患地址">
                  <el-input v-model="form.HiddenDangerLocation" clearable placeholder="请输入隐患地址" :disabled="submitReviewparameter.type===1"/>
                </el-form-item>

              </el-col>
              <el-col :span="8">
                <el-form-item ref="Hiddendangerlocationlongitude" label="隐患位置经度">
                  <el-input v-model="form.Hiddendangerlocationlongitude" clearable placeholder="请输入隐患位置经度" :disabled="submitReviewparameter.type===1"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item ref="Hiddendangerlocationdimension" label="隐患位置纬度">
                  <el-input v-model="form.Hiddendangerlocationdimension" clearable placeholder="请输入隐患位置纬度" :disabled="submitReviewparameter.type===1"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item ref="Sixtypeshiddendangers" prop="Sixtypeshiddendangers" label="隐患类型">
                  <el-select v-model="form.Sixtypeshiddendangers" clearable placeholder="请选择隐患类型" :disabled="submitReviewparameter.type===1">
                    <el-option v-for="item in selection.liuFangYinHuan" :key="item.id" :label="item.value" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item ref="Hiddendangerlevel" prop="Hiddendangerlevel" label="隐患等级">
                  <el-select v-model="form.Hiddendangerlevel" clearable placeholder="请选择隐患等级" @change="gradeDatachange" disabled>
                    <el-option v-for="(item,index) in sevdata.yinghuangDJList" :key="index" :label="item.value" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item ref="ConstructionStatus" prop="ConstructionStatus" label="施工状态">
                  <el-select v-model="form.ConstructionStatus" clearable placeholder="请选择施工状态" class="selectstyle" :disabled="submitReviewparameter.type===1">
                    <el-option v-for="item in selection.shiGongZhuangTai" :key="item.id" :label="item.value" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item ref="Hiddendangerdescription" prop="Hiddendangerdescription" label="隐患描述">
                  <el-input v-model="form.Hiddendangerdescription" clearable type="textarea" :rows="7" placeholder="请输入隐患描述" :disabled="submitReviewparameter.type===1"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <!-- -----------------------------------------隐患处置方案-------------------------------------------------------- -->
          <el-col :span="24" style="margin-bottom: 20px;line-height: 40px;">
            <el-col :span="3">
              <p>
                <label class="form-label">
                  <span class="Icon_r" /><span style="font-size: 1.2em;">隐患处置方案：</span>
                </label>
              </p>
            </el-col>
            <el-col :span="8">
              <el-input v-model="HDTPlaninputval" style="width: 95%;" disabled />
            </el-col>
            <el-col :span="13">
              <el-col :span="13">
                <el-col :span="8">
                  <el-upload
                    :action="Uploadfliesrc"
                    :on-success="HiddenDangerTreatmentPlanSuccess"
                    accept=".doc,.docx,.xlsx,.xls,.pdf"
                    :show-file-list="false"
                    :before-upload="beforUploadflie"
                    :disabled="submitReviewparameter.type===1"
                  >
                  <span v-if="submitReviewparameter.type!==1">
                    <el-button v-if="HDTPlaninputval==''" type="primary" class="onSearch" size="small">上传附件</el-button>
                    <span v-else>
                      <el-button type="primary" class="onSearch" size="small">更换附件</el-button>
                    </span>
                  </span>
                  </el-upload>
                </el-col>
                <el-col :span="8">
                  <el-button v-if="HiddenFileUploadDownloadStatus" type="primary" class="onSearch" size="small">
                    <a class="download" :href="HiddenFileUploadDownloadSrc" download="" title="下载附件">下载附件</a>
                  </el-button>
                </el-col>
                <el-col :span="8" v-if="submitReviewparameter.type!==1">
                  <el-button v-if="HDTPlaninputval!==''" type="primary" class="onSearch" size="small" @click="ClearHDTPlaninputvalFun()">清空附件</el-button>
                </el-col>

              </el-col>
              <el-col :span="11">
                <p><label>支持.doc,.docx,.xlsx,.xls,.pdf</label></p>
              </el-col>
            </el-col>
          </el-col>
          <el-col :span="24" style="margin-bottom:20px;">
            <el-upload
              class="upload-demo"
              :action="HdhUploadsrc"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="form.fileList"
              list-type="picture"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              accept="image/*"
              :disabled="submitReviewparameter.type===1"
            >
              <!-- accept="image/png,image/jpeg,image/jpg" -->
              <el-button type="primary" class="onSearch" v-if="submitReviewparameter.type!==1">点击上传图片</el-button>
              <label slot="tip" class="el-upload__tip" style="padding-left: 20px;">已上传{{ form.pictures.length }}张图片</label>
            </el-upload>
          </el-col>
          <el-col :span="24" style="margin-bottom: 20px;">
            <el-form-item label="上报备注">
              <el-input v-model="form.sbremarks" clearable type="textarea" :rows="7" placeholder="请输入上报备注" />
              <!-- <span class="xianzhi">{{form.sbremarks.length}}</span> -->
            </el-form-item>
          </el-col>

        </div>
        <el-col :span="24" />
      </el-form>
    <el-dialog v-dialogDrag :visible.sync="imgshow" title="图片预览" :center="true">
      <img :src="imageUrl" style="width: 100%;">
    </el-dialog>
  </div>
</template>
<script>
  let dlnum=0
import '@/styles/myStyle/index.scss'
import {
  edit,
  tHiddendangerMessagegetEditeInfo,
  tHiddendangerMessagegetdeleteFile,
  selecDlByLine, // 电压和DL
  selectByLx, // 设备名称
  userList // 发现人
} from '@/api/Sixdefensemanagement/HiddenDangerReview'
import qs from 'qs'
export default {
  components: {},
  props: {
    submitReviewparameter: {
      type: Object,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function() {
        return {

        }
      }
    },
    selection: {
      type: Object,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function() {
        return {

        }
      }
    }
  },
  data() {
    // 经度
    const reg1 = /^[\-\+]?(0?\d{1,2}\.\d{1,8}|1[0-7]?\d{1}\.\d{1,8}|180\.0{1,8})$/
    const validateAcquaintance1 = (rule, value, callback) => {
      if (!reg1.test(value) && value) {
        callback(new Error('-180.0～+180.0（整数部分为0～180，必须输入1到8位小数）'))
      } else {
        callback()
      }
    }
    // 纬度
    const reg2 = /^[\-\+]?([0-8]?\d{1}\.\d{1,8}|90\.0{1,8})$/
    const validateAcquaintance2 = (rule, value, callback) => {
      if (!reg2.test(value) && value) {
        callback(new Error('-90.0～+90.0（整数部分为0～90，必须输入1到8位小数）'))
      } else {
        callback()
      }
    }
    // 纬度
    const reg3 = /^[0-9]*[1-9][0-9]*$/
    const validateAcquaintance3 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入联系电话'))
      } else if (!reg3.test(value)) {
        callback(new Error('0～9（整数）'))
      } else {
        callback()
      }
    }
    return {
      daidianshow: true,
      HiddenFileUploadDownloadStatus: false,
      HiddenFileUploadDownloadSrc: '',//文件上传时下载地址
      downloadhttp: '',
      HdhUploadsrc: process.env.VUE_APP_BASE_API + '/cable/tHiddendangerMessage/upLoadImage',
      Uploadfliesrc: process.env.VUE_APP_BASE_API + '/cable/tHiddendangerMessage/upLoadFile',
      imgshow: false,
      HDTPlaninputval: '',
      disabled: 'disabled',
      phonesetdata: [],
      fileList: [],
      Role: '外协', // 角色
      imageUrl: '',
      steplist: [],
      steplist1: ['设备主人上报', '班组长确认', '设备主人确认', '结束'],
      steplist2: ['设备主人上报', '班组长确认', '专职确认', '设备主人', '结束'],
      steplist3: ['设备主人上报', '班组长确认', '专职确认', '工区分管领导确认', '设备主人确认', '结束'],
      form: {
        uselist: '',
        banzhu: '',
        // ----------------------------------------------
        VoltageLevel: '', // 电压
        HiddenDangerLine: '', // 隐患XL
        cable: '', // DL名称
        cableId:'',//DLID
        cableObj:{},//DL选中对象（不做参数）
        HiddenEquipmentType: '', // 隐患设备类
        HiddenEquipment: '', // 隐患设备
        HiddenPart: '', // 隐藏部位
        // -----------------------------------------------------------
        DiscoveryMethod: '', // 发现方式
        FindPeople:{}, // //发现人
        date_time: '', // 发现日期
        DiscoveryTeam: '', // 发现班组
        // -----------------------------------------------------------
        HiddenDangerLocation: '', // 隐患地理位置
        Hiddendangerlocationlongitude: '', // 隐患位置经度
        Hiddendangerlocationdimension: '', // 隐患位置维度
        Sixtypeshiddendangers: '', // 隐患类型

        Hiddendangerlevel: '', // 隐患等级

        HiddenPrimitiveUnit: '', // 隐患原单位
        Hiddencontact: '', // 隐患原联系人
        contactnumber: '', // 联系电话

        ConstructionStatus: '', // 施工状态
        Hiddendangerdescription: '', // 隐患描述
        sbremarks: '', // 备注
        fileList: [], // 预览图片
        pictures: [] // 上传图片
      },
      showDialog: this.submitReviewparameter.show, // 打开弹框
      formRules: {
      HiddenDangerLine: [{
        required: true,
        message: '请选择指定隐患'+this.$xl,
        trigger: 'change'
      }],
      VoltageLevel: [{
        required: true,
        message: '请选择'+'隐患'+this.$xl+'带出对应'+this.$dydj,
        trigger: 'change'
      }],
      'cableObj[0]': [{
        required: true,
        message: '请选择指定'+this.$dl,
        trigger: 'change'
      }],
        // HiddenEquipmentType: [{
        //   required: true,
        //   message: '请选择隐患设备类型',
        //   trigger: 'change'
        // }],
        // HiddenEquipment: [{
        //   required: true,
        //   message: '请选指定隐患设备',
        //   trigger: 'change'
        // }],
        HiddenPart: [{
          required: true,
          message: '请选指隐藏部位',
          trigger: 'change'
        }],
        Hiddendangerdescription: [{
          required: true,
          message: '请输入隐患描述',
          trigger: 'change'
        }],
        DiscoveryTeam: [{
          required: true,
          message: '请选择班组',
          trigger: 'change'
        }],
        'FindPeople.id': [{
          required: true,
          message: '请选择发现人',
          trigger: 'change'
        }],
        date_time: [{
          required: true,
          message: '请选择发现日期',
          trigger: 'change'
        }],
        HiddenPrimitiveUnit: [{
          required: true,
          message: '请选择隐患源单位',
          trigger: 'change'
        }],
        Hiddencontact: [{
          required: true,
          trigger: 'change',
          message: '请输入联系人'
        }],
        contactnumber: [{
          required: true,
          // message: '请输入联系电话',
          trigger: 'change',
          validator: validateAcquaintance3
        }],
        HiddenDangerLocation: [{
          required: true,
          message: '请输入隐患地址',
          trigger: 'change'
        }],
        Hiddendangerlocationlongitude: [{ // 经度
          required: true,
          trigger: 'change',
          validator: validateAcquaintance1
        }],
        Hiddendangerlocationdimension: [{ // 维度
          required: true,
          trigger: 'change',
          validator: validateAcquaintance2
        }],
        Sixtypeshiddendangers: [{
          required: true,
          message: '请选择隐患类型',
          trigger: 'change'
        }],
        Hiddendangerlevel: [{
          required: true,
          message: '请选择隐患等级',
          trigger: 'change'
        }],
        ConstructionStatus: [{
          required: true,
          message: '请选择指定施工状态',
          trigger: 'change'
        }],
        uselist: [{
          required: true,
          message: '请选择指定人',
          trigger: 'change'
        }],
        banzhu: [{
          required: true,
          message: '请选择指定班组',
          trigger: 'change'
        }]
      },
      sevdata: {
        dianlanList: [], // DYDJ
        YHshebeileixingList: [{ // 隐患设备类型
          id: 0,
          value: this.$dl + '终端'
        }, {
          id: 1,
          value: this.$dl + '接头'
        }, {
          id: 2,
          value: this.$dl + '分支箱'
        }, {
          id: 3,
          value: '交叉互联箱'
        }, {
          id: 4,
          value: this.$dl + '接地箱'
        }],
        shebeimingchengList: [], // 设备名称
        yinghuangbuweiList: [{
          value: '附件'
        },
        {
          value: '附属设备'
        },
        {
          value: '附属设施'
        },
        {
          value: this.$dl + '通道'
        },
        {
          value: this.$dl + '保护区内情况'
        },
        {
          value: '其他'
        }
        ], // 隐患部位
        yinghuangLxList: [], // 隐患类型
        yinghuangDJList: [{
          value: '一般'
        }, {
          value: '严重'
        }, {
          value: '危急'
        }], // 隐患等级
        faxianrenList: [],
        ZDrenlist: []
      }
    }
  },
  watch: {
    submitReviewparameter(val) {
      this.showDialog = val.show
    }
  },
  mounted() {
    console.log(this.submitReviewparameter,'LLLLL')
    // this.form.VoltageLevel = this.submitReviewparameter.data.voltage // DYDJ
    this.YHxianluchangeFun(this.submitReviewparameter.Detailsdata.lineid)
    this.form.HiddenDangerLine = this.submitReviewparameter.Detailsdata.lineid.split(',') // 隐患XL
    // let _this=this
    // setTimeout(function() {
    // _this.form.cableObj.dlmc = _this.submitReviewparameter.data.cable||'' // DL
    // _this.form.cableObj.dlid = _this.submitReviewparameter.data.cableId||'' // 电
    // }, 1000)
    this.form.cableObj= this.submitReviewparameter.Detailsdata.cableJson // 电
    this.form.HiddenEquipmentType = this.submitReviewparameter.Detailsdata.hdeqtype // 设备类型
    this.getSBmingchengList()
    this.form.HiddenEquipment = this.submitReviewparameter.Detailsdata.hdeq.split(',') // 隐患设备名称
    this.form.HiddenPart = this.submitReviewparameter.Detailsdata.hdposition // 隐患部位
    // ---------------------------------------------
    this.form.DiscoveryMethod = this.submitReviewparameter.Detailsdata.findtype // 发现方式
    this.form.DiscoveryUnit = this.submitReviewparameter.Detailsdata.findunit // 发现单位
    this.form.date_time = this.submitReviewparameter.Detailsdata.finddate // 发现日期
    this.form.DiscoveryTeam = this.submitReviewparameter.Detailsdata.findbz // 发现班组
    this.FXbzchangeFun(this.form.DiscoveryTeam)
    this.form.FindPeople.name = this.submitReviewparameter.Detailsdata.finduser // 发现人
    this.form.FindPeople.id = this.submitReviewparameter.Detailsdata.finduserid // 发现人
    // ---------------------------------------------
    this.form.HiddenDangerLocation = this.submitReviewparameter.Detailsdata.findaddress // 隐患地址
    this.form.Hiddendangerlocationlongitude = this.submitReviewparameter.Detailsdata.longitude // 隐患经度
    this.form.Hiddendangerlocationdimension = this.submitReviewparameter.Detailsdata.latitude // 隐患维度
    this.form.Sixtypeshiddendangers = this.submitReviewparameter.Detailsdata.sixhdtype // 六防隐患类型
    this.form.Hiddendangertype = this.submitReviewparameter.Detailsdata.hdtype // 隐患类型
    this.gradeDatachange(this.submitReviewparameter.Detailsdata.hdclass)
    this.form.Hiddendangerlevel = this.submitReviewparameter.Detailsdata.hdclass // 隐患等级
    // ---------------------------------------------
    this.form.HiddenPrimitiveUnit = this.submitReviewparameter.Detailsdata.hdcompany // 隐患地址
    this.form.Hiddencontact = this.submitReviewparameter.Detailsdata.hdcontacts // 隐患经度
    this.form.contactnumber = this.submitReviewparameter.Detailsdata.telephone // 隐患维度
    this.form.ConstructionStatus = this.submitReviewparameter.Detailsdata.construction // 六防隐患类型
    this.form.Hiddendangerdescription = this.submitReviewparameter.Detailsdata.hdreason // 隐患类型
    this.form.sbremarks = this.submitReviewparameter.Detailsdata.sbremarks // 隐患等级
    this.BasicInformationlistfun() // 获取图片编辑需要的详情方法
    if (this.submitReviewparameter.Detailsdata.ddjcid) {
      this.daidianshow = true
    } else {
      this.daidianshow = false
    }
    if (this.submitReviewparameter.Detailsdata.ddjcid) {
      this.daidianshow = true
    } else {
      this.daidianshow = false
    }
  },
  methods: {
    // 通过隐患XL获取 DYDJ
    YHxianluchangeFun(val) {
      console.log(val)
      if (val.length>0) {
        const data = {
          lineId: val.toString()
        }
        this.form.cableObj = [] // 清空DL值
        this.sevdata.dianlanList = [] // 清空DL下拉
        this.form.VoltageLevel = '' // 清空电压值
        selecDlByLine(qs.stringify(data)).then(response => {
          if (response.status === 200) {
            if (response.data.msg === '操作成功') {
              let data=response.data.data
              this.form.VoltageLevel = data[0].dydj // dydj
              for(let i=0;i<data.length;i++){
                 for(let w=0;w<data[i].value.length;w++){
                    this.sevdata.dianlanList.push(data[i].value[w])
                 }
              }
            } else {
              this.$message({
                message: this.$dydj+this.$dl+'下拉列表获取失败',
                type: 'error'
              })
            }
          }
        })
        this.getSBmingchengList()
      }else{
       this.form.cableObj = [] // 清空DL值
        this.sevdata.dianlanList = [] // 清空DL下拉
        this.form.VoltageLevel = '' // 清空电压值
      }
    },
    // 隐患设备类型改变的时候
    YHSBLXchangeFun(val) {
      this.getSBmingchengList()
    },
    // 获取隐患设备名称（需要在XL和隐患设备类型都满足的条件下完成）
    getSBmingchengList() {
      if (this.form.HiddenEquipmentType !== '' && this.form.HiddenDangerLine !== '') {
        const data = {
          sblx: this.form.HiddenEquipmentType, // 隐患设备类型
          xlid: this.form.HiddenDangerLine.toString() // 隐患XL
        }
        this.sevdata.shebeimingchengList = [] // 清空设备名称下拉列表
        this.form.HiddenEquipment = '' // //清空设备名称的值
        selectByLx(qs.stringify(data)).then(response => {
          if (response.status === 200) {
            if (response.data.msg === '操作成功') {
              this.sevdata.shebeimingchengList = response.data.data // DL下拉
            } else {
              // this.$message({
              //   message: '设备名称下拉列表获取失败',
              //   type: 'error'
              // })
            }
          }
        })
      }
    },

    // 根据流程匹配审核XL
    gradeDatachange(val) {
      if (val === '一般') {
        this.steplist = this.steplist1
      } else if (val === '严重') {
        this.steplist = this.steplist2
      } else if (val === '危急') {
        this.steplist = this.steplist3
      }
    },
    FXbzchangeFun(val) {
      this.form.FindPeople = {}
      const data = {
        groupname: val // 发现班组id
      }
      userList(qs.stringify(data)).then(response => {
        if (response.status === 200) {
          if (response.data.msg === '操作成功') {

            this.sevdata.faxianrenList = response.data.data // DL下拉
          } else {
            this.$message({
              message: '发现人下拉列表获取失败',
              type: 'error'
            })
          }
        }
      })
    },
    // 指定班组
    zhidingFXbzchangeFun(val) {
      this.form.uselist = ''
      this.sevdata.ZDrenlist = []
      const data = {
        groupname: val // 发现班组id
      }
      userList(qs.stringify(data)).then(response => {
        if (response.status === 200) {
          if (response.data.msg === '操作成功') {
            // //console.log(response.data.data, '人员')

            this.sevdata.ZDrenlist = response.data.data // DL下拉
          } else {
            this.$message({
              message: '指定人下拉列表获取失败',
              type: 'error'
            })
          }
        }
      })
    },

    // ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
    // 获取编辑需要的详情方法
    BasicInformationlistfun() {
      const data = {
        objId: this.submitReviewparameter.Detailsdata.objId
      }
      tHiddendangerMessagegetEditeInfo(qs.stringify(data)).then(response => {
        if (response.status === 200) {
          // 获取隐患处置方案名称和下载地址
          if (response.data.rows[0].fileNameList.length > 0) {
            if (response.data.rows[0].fileNameList.length > 0) { // 隐患处理方案
              if (response.data.rows[0].fileNameList[0].url !== '') {
                this.HiddenFileUploadDownloadStatus = true // 下载按钮状态打开
                this.HiddenFileUploadDownloadSrc = process.env.VUE_APP_BASE_API+response.data.rows[0].fileNameList[0].url // 下载地址
              }
              this.HDTPlaninputval = response.data.rows[0].fileNameList[0].name // 文件显示名称地址
            }
          } else {
            //console.log('编辑模式下隐患处置方案没有文件')
          }
          // 获取图片详情
          let PicturesList=response.data.rows[0].picturesList
          this.form.fileList=response.data.rows[0].picturesList
          console.log(this.form.fileList,'显示数据')
          if (PicturesList.length > 0) {
            for (var i = 0; i < PicturesList.length; i++) {
              this.form.pictures.push(PicturesList[i].name)
              this.form.fileList[i].url=process.env.VUE_APP_BASE_API+PicturesList[i].url
            }
          } else {
            //console.log('编辑模式下没有图片')
          }
        }
      })
    },
    // ----------------------------------------隐患处置方案文件上传-操作--------------------------------------
    // 隐患处置方案文件上传成功钩子
    HiddenDangerTreatmentPlanSuccess(res, file) {
      if (res.msg === '操作成功') {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.HDTPlaninputval = ''
        this.HDTPlaninputval = res.data.wjlj
        this.HiddenFileUploadDownloadStatus = false
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    },
    // 隐患处置方案文件验证类型
    beforUploadflie(file) {
      const isLt2M = file.size / 1024 / 1024 < 25
      if (!isLt2M) {
        this.$message.error('文件不能超过 25MB!')
      }
      return isLt2M
    },
    ClearHDTPlaninputvalFun() {
      this.HDTPlaninputval = ''
      this.HiddenFileUploadDownloadStatus = false
      this.HiddenFileUploadDownloadSrc = ''
      this.$message({
        message: '文件清空成功',
        type: 'success'
      })
    },
    // ----------------------------------------图片上传-操作--------------------------------------
    // 图片
    handleRemove(file, fileList) {
      const list = {
        filePath: file.name
      }
      tHiddendangerMessagegetdeleteFile(qs.stringify(list)).then(response => {
        if (response.status === 200) {
          if (response.data.data.msg === '删除成功！') {
            this.$message({
              message: response.data.data.msg,
              type: 'success'
            })
            //先把显示地址存一个常量 因为this.form.fileList遍历时如果删除自身会报错
            const picturesarry = this.form.fileList
            if (this.form.fileList.length > 0) {
              for (let i = 0; i < this.form.fileList.length; i++) {
                if (this.form.pictures[i] === file.name) {
                  this.form.pictures.splice(i, 1)//删除留存地址被删项
                  picturesarry.splice(i, 1)//显示备份常量也是一样
                }
              }
              this.form.fileList = picturesarry//显示备份覆盖正式备份
            }
          } else {
            this.$message({
              message: response.data.data.msg,
              type: 'error'
            })
          }
        }
      })
    },
    handlePreview(file) {
      this.imgshow = true
      this.imageUrl = file.url
    },
    handleAvatarSuccess(res, file) {
      if (res.msg === '操作成功') {
        this.$nextTick(() => {
          document.getElementsByClassName('el-upload-list')[0].scrollTop = 300
        })
        // let objtupian = {
        //   name: res.data.wjlj,
        //   url: file.url,
        // }
        file.name = res.data.wjlj
        this.form.fileList.push(file)
        this.form.pictures.push(res.data.wjlj)
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
      const arr = file.type.split('/')
      const isJPG = arr[0] === 'image'
      const isLt2M = file.size / 1024 / 1024 < 25

      if (!isJPG) {
        this.$message.error('只支持图片格式呦!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 25MB!');
      }
      return isJPG && isLt2M
    },
    /**
       * 取消按钮
       */
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.showDialog = false
          // this.editbtn = false
          // this.addbtn = false
          this.$emit('childFn', {
            showpost: this.showDialog
            // editbtn: this.editbtn,
            // addbtn: this.addbtn
          })
          done()
        })
        .catch(_ => {})
    },

    /**
       * 确认按钮
       */
    SuerFun() {
      this.showDialog = false
      this.$emit('childFn', {
        showpost: this.showDialog,
        refreshListshow: true
      })
    },
    /** 新增*/
    submit() {
      this.$refs.form.validate((valid, object) => {
        if (valid) {
          var data = {}
            data = {
              objId: this.submitReviewparameter.Detailsdata.objId,
              isstart: 0,
              lineid: this.form.HiddenDangerLine.toString(), // 隐患XL
              voltage: this.form.VoltageLevel, // DYDJ
              cableJson:this.form.cableObj,//dl
              hdeqtype: this.form.HiddenEquipmentType, // 隐患设备类型
              hdeq: this.form.HiddenEquipment.toString(), // 隐患设备
              hdposition: this.form.HiddenPart, // 隐患部位
              // ---------------------------------------------
              findtype: this.form.DiscoveryMethod, // 发现方式
              findbz: this.form.DiscoveryTeam, // 发现班组
              finduser: this.form.FindPeople.name, // 发现人
              finduserid: this.form.FindPeople.id, // 发现人
              finddate: this.form.date_time, // 发现日期
              // ---------------------------------------------
              hdcompany: this.form.HiddenPrimitiveUnit, // 隐患源单位
              hdcontacts: this.form.Hiddencontact, // 隐患源联系人
              telephone: this.form.contactnumber, // 联系人电话
              findaddress: this.form.HiddenDangerLocation, // 隐患地址
              longitude: this.form.Hiddendangerlocationlongitude, // 经度
              latitude: this.form.Hiddendangerlocationdimension, // 维度
              sixhdtype: this.form.Sixtypeshiddendangers, // 隐患类型

              hdclass: this.form.Hiddendangerlevel, // 隐患等级
              construction: this.form.ConstructionStatus, // 施工状态
              // ---------------------------------------------
              hdreason: this.form.Hiddendangerdescription, // 隐患描述
              sbremarks: this.form.sbremarks, // 上报备注
              filename: this.HDTPlaninputval, // 隐患处置方案文件地址
              pictures: this.form.pictures.toString(), // 图片集合数据
              ddjcid: this.submitReviewparameter.Detailsdata.ddjcid,
            }
            this.$emit('fatherMethod', {
              data: data
            })
        } else {
          for (const i in object) {
            this.$message({
              message: object[i][0].message,
              type: 'warning'
            })
            let dom = this.$refs[i]
            if (Object.prototype.toString.call(dom) !== '[object Object]') { // 这里是针对遍历的情况（多个输入框），取值为数组
              dom = dom[0]
            }
            // 第一种方法（包含动画效果）
            dom.$el.scrollIntoView({ // 滚动到指定节点
              block: 'center', // 值有start,center,end，nearest，当前显示在视图区域中间
              behavior: 'smooth' // 值有auto、instant,smooth，缓动动画（当前是慢速的）
            })
            break
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped="scoped">
  #SHBOX {
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
      font-weight: 700;
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
  }

  .select-dy {
    .dy {
      float: left;
      width: 4.2rem;
      height: 2rem;
      line-height: 2rem;
      text-align: center;
      border-radius: 4px;
      cursor: pointer;
    }

    :nth-child(2) {
      margin: 0 2rem;
    }

    .yes {
      background-color: #35b8c0;
      color: #fff;
      border: 1px solid #35b8c0;
    }

    .no {
      border: 1px solid #35b8c0;
      color: #35b8c0;
      background-color: #fff;
    }
  }
</style>
