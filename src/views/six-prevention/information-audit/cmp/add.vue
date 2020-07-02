<!-- 审核隐患新增 -->
<template>
  <!-- <h2>XL巡视计划管理</h2> -->
  <div class="xs-hastitle">
    <el-dialog v-dialogDrag :visible.sync="showDialog" title="审核隐患新增" :center="true" :before-close="handleClose">
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
        <!--      ----------------------------------步骤条-------------------------------------- -->
        <el-steps :active="0" align-center finish-status="success">
          <el-step v-for="(step,index) in steplist" :key="index" :title="step" />
        </el-steps>
        <!--      ----------------------------------当前处理人-------------------------------------- -->
        <div class="Form-input">
          <div class="form-item" />
          <div class="form-item">
            <label class="form-label">
              <span class="Icon_r" />当前处理人：
            </label>
            <el-input v-model="Role" disabled />
          </div>
          <div class="form-item" />
        </div>
        <!--      ----------------------------------隐患设备信息-------------------------------------- -->
        <div class="titlestyle"><label>隐患设备信息</label></div>
        <el-col :span="24">
          <el-row>
            <el-col :span="8">
              <el-form-item ref="HiddenDangerLine" prop="HiddenDangerLine" :label="'隐患'+$xl">
                <el-select v-model="form.HiddenDangerLine" placeholder="请选择" :disabled="daidianshow===true" @change="YHxianluchangeFun" :filter-method="filterlineList" filterable multiple>
                  <el-option v-for="item in selection.yingHuan" :key="item.id" :label="item.value" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item ref="VoltageLevel" prop="VoltageLevel" :label="$dydj">
                <el-input v-model="form.VoltageLevel" disabled placeholder="请选择" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item ref="cableObj" prop="cableObj[0]" :label="$dl">
                <el-select v-model="form.cableObj" placeholder="请选择"  value-key="dlid" multiple>
                  <el-option v-for="item in sevdata.dianlanList" :key="item.dlid" :label="item.dlmc" :value="item" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item ref="HiddenEquipmentType" label="隐患设备类型">
                <el-select v-model="form.HiddenEquipmentType" placeholder="请选择隐患设备类型" @change="YHSBLXchangeFun">
                  <el-option v-for="item in sevdata.YHshebeileixingList" :key="item.id" :label="item.value" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item ref="HiddenEquipment" label="隐患设备" >
                <el-select v-model="form.HiddenEquipment" placeholder="请选择隐患设备" filterable multiple>
                  <el-option v-for="item in sevdata.shebeimingchengList" :key="item.id" :label="item.name" :value="item.name" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item ref="HiddenPart" prop="HiddenPart" label="隐患部位">
                <el-select v-model="form.HiddenPart" placeholder="请选择隐患部位">
                  <el-option v-for="(item,index) in sevdata.yinghuangbuweiList" :key="index" :label="item.value" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!--      ----------------------------------隐患发现信息-------------------------------------- -->
          <div class="titlestyle"><label>隐患发现信息</label></div>
          <el-row>
            <el-col :span="8">
              <el-form-item label="发现方式">
                <el-select v-model="form.DiscoveryMethod" clearable placeholder="请选择发现方式" :disabled="daidianshow===true">
                  <el-option v-for="item in selection.faXianFangShi" :key="item.id" :label="item.value" :value="item.id" />
                </el-select>
              </el-form-item>

            </el-col>
            <el-col :span="8">
              <el-form-item ref="DiscoveryTeam" prop="DiscoveryTeam" label="发现班组">
                <el-select v-model="form.DiscoveryTeam" placeholder="请选择发现班组" @change="FXbzchangeFun">
                  <el-option v-for="item in selection.FXBZarry" :key="item.objId" :label="item.groupname" :value="item.groupname" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item ref="FindPeople" prop="FindPeople.id" label="发现人">
                <el-select v-model="form.FindPeople" clearable placeholder="请选择发现人" value-key="id" filterable>
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
                <el-input v-model="form.HiddenPrimitiveUnit" clearable placeholder="请输入隐患源单位" />
              </el-form-item>

            </el-col>
            <el-col :span="8">
              <el-form-item ref="Hiddencontact" prop="Hiddencontact" label="隐患源联系人">
                <el-input v-model="form.Hiddencontact" clearable placeholder="请输入隐患源联系人" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item ref="contactnumber" prop="contactnumber" label="联系电话">
                <el-input v-model="form.contactnumber" clearable placeholder="请输入联系电话" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item ref="HiddenDangerLocation" prop="HiddenDangerLocation" label="隐患地址">
                <el-input v-model="form.HiddenDangerLocation" clearable placeholder="请输入隐患地址" />
              </el-form-item>

            </el-col>
            <el-col :span="8">
              <el-form-item ref="Hiddendangerlocationlongitude" label="隐患位置经度" class="zuobiao">
                <el-input v-model="form.Hiddendangerlocationlongitude" clearable placeholder="请输入隐患位置经度" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item ref="Hiddendangerlocationdimension" label="隐患位置纬度" class="zuobiao">
                <el-input v-model="form.Hiddendangerlocationdimension" clearable placeholder="请输入隐患位置纬度" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item ref="Sixtypeshiddendangers" prop="Sixtypeshiddendangers" label="隐患类型">
                <el-select v-model="form.Sixtypeshiddendangers" clearable placeholder="请选择隐患类型">
                  <el-option v-for="item in selection.liuFangYinHuan" :key="item.id" :label="item.value" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item ref="Hiddendangerlevel" prop="Hiddendangerlevel" label="隐患等级">
                <el-select v-model="form.Hiddendangerlevel" clearable placeholder="请选择隐患等级" @change="gradeDatachange">
                  <el-option v-for="(item,index) in sevdata.yinghuangDJList" :key="index" :label="item.value" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item ref="ConstructionStatus" prop="ConstructionStatus" label="施工状态">
                <el-select v-model="form.ConstructionStatus" clearable placeholder="请选择施工状态" class="selectstyle">
                  <el-option v-for="item in selection.shiGongZhuangTai" :key="item.id" :label="item.value" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item ref="Hiddendangerdescription" prop="Hiddendangerdescription" label="隐患描述">
                <el-input
                  v-model="form.Hiddendangerdescription"
                  clearable
                  type="textarea"
                  :rows="7"
                  placeholder="请输入隐患描述"
                  maxlength="500"
                />
                <span class="xianzhi">{{ form.Hiddendangerdescription.length }}/500</span>
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
          <el-col :span="9">
            <el-input v-model="HDTPlaninputval" style="width: 95%;" disabled />
          </el-col>
          <el-col :span="9">
            <el-col :span="12">
              <el-col :span="12">
                <el-upload
                  :action="Uploadfliesrc"
                  :on-success="HiddenDangerTreatmentPlanSuccess"
                  accept=".doc,.docx,.xlsx,.xls,.pdf"
                  :show-file-list="false"
                  :before-upload="beforUploadflie"
                >
                  <el-button v-if="HDTPlaninputval==''" type="primary" class="onSearch">上传附件</el-button>
                  <span v-else>
                    <el-button type="primary" class="onSearch" size="small">更换附件</el-button>
                  </span>
                </el-upload>
              </el-col>
              <el-button v-if="HDTPlaninputval!==''" type="primary" class="onSearch" size="small" @click="ClearHDTPlaninputvalFun()">清空附件</el-button>
            </el-col>
            <el-col :span="12">
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
            :file-list="form.pictures"
            list-type="picture"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            accept="image/*"
          >
            <!-- accept="image/png,image/jpeg,image/jpg" -->
            <el-button type="primary" class="onSearch">点击上传图片</el-button>
            <label slot="tip" class="el-upload__tip" style="padding-left: 20px;">已上传{{ form.pictures.length }}张图片</label>
          </el-upload>
        </el-col>
        <el-col :span="24" style="margin-bottom: 20px;">
          <el-form-item label="上报备注">
            <el-input v-model="form.sbremarks" clearable type="textarea" :rows="7" placeholder="请输入上报备注" maxlength="500" />
            <span class="xianzhi">{{ form.sbremarks.length }}/500</span>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SaveFun">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
    <!--    ———————————————————————————————————————图片预览视图——————————————————————————————————————————————————— -->
    <el-dialog v-dialogDrag :visible.sync="imgshow" title="图片预览" :center="true">
      <img :src="imageUrl" style="width: 100%;">
    </el-dialog>
  </div>
</template>
<script>
import '@/styles/myStyle/index.scss'
import {
  save,
  selecDlByLine, // 电压和DL
  selectByLx, // 设备名称
  userList // 发现人
} from '@/api/Sixdefensemanagement/HiddenDangerReview'
import qs from 'qs'
export default {
  props: {
    selection: {
      type: Object,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function() {
        return {}
      }
    },
    isShowDialog: {
      type: Boolean,
      default: false
    },
    ddDetail: {// 带电检测来源
      type: Object,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function() {
        return {}
      }
    },
   yhdetaildatapn:{//线路巡视j结果管理来源
     type: Object,
     // 对象或数组且一定会从一个工厂函数返回默认值
     default: function() {
       return {}
     }
   },
    ddjcid: {
      type: String,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function() {
        return ''
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
      daidianshow: false,
      HDTPlaninputval: '',
      kXurl:process.env.VUE_APP_BASE_API,
      HdhUploadsrc: process.env.VUE_APP_BASE_API + '/cable/tHiddendangerMessage/upLoadImage',
      Uploadfliesrc: process.env.VUE_APP_BASE_API + '/cable/tHiddendangerMessage/upLoadFile',
      imgshow: false, // 图片弹窗关闭
      disabled: 'disabled',
      phonesetdata: [], // 联系人手机号地址
      Role: '设备主人上报',
      imageUrl: '', // 图片预览地址
      steplist: [], // 最终选择XL合集
      steplist1: ['设备主人上报', '班组长确认', '设备主人确认', '结束'], // 一般XL集合
      steplist2: ['设备主人上报', '班组长确认', '专职确认', '设备主人确认', '结束'], // 严重XL集合
      steplist3: ['设备主人上报', '专职确认', '工区分官领导确认', '设备主人确认', '结束'], // 危机XL集合
      form: {
        VoltageLevel: '', // 电压
        HiddenDangerLine: [], // 隐患XL
        cable: '', // DL名称
        cableId:'',//DLID
        cableObj:[],//DL选中对象（不做参数）
        HiddenEquipmentType: '', // 隐患设备类
        HiddenEquipment: [], // 隐患设备
        HiddenPart: '', // 隐藏部位
        // -----------------------------------------------------------
        DiscoveryMethod: '', // 发现方式
        FindPeople: '', // //发现人
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
      selectCheckTd: null,
      selectshowDialog: false, // 选择通道
      showDialog: this.isShowDialog, // 打开弹框
      editbtn: this.isEdit, // 是否是编辑按钮
      addbtn: this.isAdd, // 是否是新增按钮
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
        HiddenEquipmentType: [{
          required: true,
          message: '请选择隐患设备类型',
          trigger: 'change'
        }],
        HiddenEquipment: [{
          required: true,
          message: '请选指定隐患设备',
          trigger: 'change'
        }],
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
        }]
      },

      sevdata: {
        dianlanList: [], // DYDJ
        YHshebeileixingList: [{ // 隐患设备类型
          id: 0,
          value: this.$dl+'终端'
        }, {
          id: 1,
          value: this.$dl+'接头'
        }, {
          id: 2,
          value: this.$dl+'分支箱'
        }, {
          id: 3,
          value: '交叉互联箱'
        }, {
          id: 4,
          value: this.$dl+'接地箱'
        }],
        shebeimingchengList: [], // 设备名称
        yinghuangbuweiList: [
          {
          value: '附件'
        },
        {
          value: '附属设备'
        },
        {
          value: '附属设施'
        },
        {
          value: this.$dl+'通道'
        },
        {
          value: this.$dl+'保护区内情况'
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
        faxianrenList: []
      },
      Alllist:{
         yingHuan:[]
       }
    }
  },
  watch: {
    isShowDialog(val) {
      this.showDialog = val
    }
  },
  created() {

  },
  mounted() {
   //带电检测模块引入时发现方式是带电的情况下
    const _this = this
    setTimeout(function() {
      if (_this.ddDetail.xlid && _this.selection.yingHuan) {
        _this.form.HiddenDangerLine.push(_this.ddDetail.xlid)
        _this.YHxianluchangeFun(_this.form.HiddenDangerLine)//xl改变时候带出dl
        _this.form.cableObj.push({dlmc:_this.ddDetail.dlmc,dlid:_this.ddDetail.dlid})//dl名称//dl名称赋值
        _this.form.DiscoveryMethod = '1'//发现方式索引
        _this.daidianshow = true//禁止输入状态
      }
    }, 300)
    //巡视结果管理来源（通道和线路）
    setTimeout(function() {
      if (_this.yhdetaildatapn.lineId && _this.selection.yingHuan) {
        _this.form.HiddenDangerLine.push(_this.yhdetaildatapn.lineId)
        _this.YHxianluchangeFun(_this.form.HiddenDangerLine)//xl改变时候带出dl
        _this.form.cableObj.push({dlmc:_this.yhdetaildatapn.logicCableStageName,dlid:_this.yhdetaildatapn.logicCableStageId})//dl名称//dl名称赋值
        // _this.form.cableObj.dlid = _this.yhdetaildatapn.logicCableStageId
        _this.form.DiscoveryMethod = '0'//发现方式索引
        _this.daidianshow = true//禁止输入状态
      }
    }, 300)
    console.log(this.yhdetaildatapn)
    _this.Alllist.yingHuan=_this.selection.yingHuan//xl全数据存值方便模糊未输入值时显示全xl列表
  },
  methods: {
    //输入查看线路
    filterlineList(query = ''){
      let _this=this
      const arr = this.Alllist.yingHuan.filter(item => {
        return item.value.includes(query) || item.id.includes(query)
      })
      if(arr){
         _this.selection.yingHuan = arr
      }
    },
    // ————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
    // 通过隐患XL获取 DYDJ
    YHxianluchangeFun(val) {
      if (val !== null) {
        const data = {
          lineId: val.toString()
        }

        this.form.VoltageLevel = '' // 清空电压值
        this.form.cableObj=[] // 清空DL值
        this.sevdata.dianlanList = [] // 清空DL下拉
        selecDlByLine(qs.stringify(data)).then(response => {
          if (response.status === 200) {
            if (response.data.msg === '操作成功') {
              let data=response.data.data
              this.form.VoltageLevel = response.data.data[0].dydj // dydj
              for(let i=0;i<data.length;i++){
                 for(let w=0;w<data[i].value.length;w++){
                    this.sevdata.dianlanList.push(data[i].value[w])
                 }
              }
              // //console.log(response.data.data)
            } else {
              this.$message({
                message: this.$dydj+this.$dl +'下拉列表获取失败',
                type: 'error'
              })
            }
          }
        })
        this.getSBmingchengList()
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
        this.form.HiddenEquipment = [] // //清空设备名称的值
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
    // 发现班组改变时带出大学人员
    FXbzchangeFun(val) {
      this.form.FindPeople = ''
      const data = {
        groupname: val // 发现班组id
      }
      userList(qs.stringify(data)).then(response => {
        if (response.status === 200) {
          if (response.data.msg === '操作成功') {

            this.sevdata.faxianrenList = response.data.data // DL下拉
          } else {
            this.$message({
              message: '隐患类型下拉列表获取失败',
              type: 'error'
            })
          }
        }
      })
    },
    // ————————————————————————————————————————————————————————————————————————————————————————————————————————————

    // ----------------------------------------文件上传-操作--------------------------------------
    // 验证类型
    beforUploadflie(file) {
      const isLt2M = file.size / 1024 / 1024 < 25
      if (!isLt2M) {
        this.$message.error('文件不能超过 25MB!')
      }
      return isLt2M
    },
    // 文件
    HiddenDangerTreatmentPlanSuccess(res, file) {
      if (res.msg === '操作成功') {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        console.log(res)
        this.HDTPlaninputval = ''
        this.HDTPlaninputval = res.data.wjlj
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    },
    ClearHDTPlaninputvalFun() {
      this.HDTPlaninputval = ''
      this.$message({
        message: '文件清空成功',
        type: 'success'
      })
    },
    // ----------------------------------------图片上传-操作--------------------------------------
    // 图片删除
    handleRemove(file, fileList) {
      this.form.pictures = fileList
    },
    // 预览弹窗开启赋值图片
    handlePreview(file) {
      this.imgshow = true
      this.imageUrl = file.url
    },
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      if (res.msg === '操作成功') {
        this.$nextTick(() => {
          document.getElementsByClassName('el-upload-list')[0].scrollTop = 1300
        })
        // this.form.fileList.push(file)
        const objtupian = {
          name: res.data.wjlj,
          url: file.url
        }
        this.form.fileList.push(objtupian)
        this.form.pictures.push(objtupian)
        //console.log(this.form.fileList,'this.form.fileList')
        //console.log(this.form.pictures,'this.form.pictures')
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
    replaceAll(str,preVal,replaceVal){//全/局/空
      if(str.indexOf(preVal) != -1){
         return str.replace(new RegExp(preVal,'g'),replaceVal);
      }else{
       //console.log("indexofstr失败")
      }
    },
    // 图片上传验证
    beforeAvatarUpload(file) {
      var A=this.replaceAll('123','23','')

      const arr = file.type.split('/')
      const isJPG = arr[0] === 'image'
      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isJPG) {
        this.$message.error('只支持图片格式呦!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 25MB!')
      }
      return isJPG && isLt2M
    },
    // ----------------------------------------------回调取消弹窗----------------------------------------------
    // 取消回调父关闭弹窗
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.showDialog = false
          this.$emit('childFn', {
            showDialog: this.showDialog
          })
          done()
        })
        .catch(_ => {})
    },
    // 成功后回调父关闭弹窗
    addsuccessfun() {
      this.showDialog = false
      this.$emit('childFn', {
        showDialog: this.showDialog, // 成功后告诉父组件刷新
        refreshListshow: true // 成功后告诉父组件刷新列表
      })
    },
    // 确认保存按钮按钮
    SaveFun() {
      this.$refs.form.validate((valid, object) => {
        if (valid) {
          var arry = []
          if (this.form.pictures.length > 0) {
            for (let i = 0; i < this.form.pictures.length; i++) {
              arry.push(this.form.pictures[i].name)
            }
          }
          const data = {
            lineid: this.form.HiddenDangerLine.toString(), // 隐患XL

            voltage: this.form.VoltageLevel, // DYDJ

            // cable: this.form.cableObj.dlmc||'', // DL名称
            // cableId: this.form.cableObj.dlid||'', // DL名称
            cableJson:this.form.cableObj,//dl
            hdeqtype: this.form.HiddenEquipmentType, // 隐患设备类型
            hdeq: this.form.HiddenEquipment.toString(), // 隐患设备
            hdposition: this.form.HiddenPart, // 隐患部位
            // ---------------------------------------------
            findtype: this.form.DiscoveryMethod, // 发现方式
            findbz: this.form.DiscoveryTeam, // 发现班组
            finduser: this.form.FindPeople.name, // 发现人名称
            finduserid:this.form.FindPeople.id,//发现人ID
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
            pictures: arry.toString(), // 图片集合数据
            ddjcid: this.ddjcid, // 带电ID(带电管理模块调用时)
            // ---------------------------------------------

            isstart: 0 // 是否开启流程
          }
          // //console.log(data, '保存上传前form数据查看')
          save(qs.stringify(data)).then(response => {
            if (response.status === 200) {
              if (response.data.msg === '操作成功') {
                this.$message({
                  message: response.data.msg,
                  type: 'success'
                })
                this.addsuccessfun()
              } else {
                this.$message({
                  message: response.data.msg,
                  type: 'error'
                })
              }
            }
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
            // //console.log(dom)
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
<style lang="scss">
  #SHBOX {
    .zuobiao.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
      color: white;
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
