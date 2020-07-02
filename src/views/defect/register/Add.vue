<template>
  <!--缺陷登记表单弹框-->
  <div>
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-dialog title="缺陷登记" :visible.sync="showDialog" :close-on-click-modal="false" width="1060px" center :before-close="handleClose">
      <!--表单-->
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-position="right" label-width="100px">

        <h3 class="modelTitle">缺陷定位信息</h3>
        <div class="inputCont_mm flexThird">
          <div class='mm_alart'>
            <el-form-item :label="`${$xl}/通道`" prop="qxType">
              <el-select v-model="ruleForm.qxType" class="form-item-select" @change="changeqxtype" :disabled='isFromQx'>
                <el-option v-for="item in lineOrChannel" :key="item.val" :label="item.name" :value="item.val"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class='mm_alart' v-if='ruleForm.qxType==0'>
            <el-form-item class="fred" :label="`缺陷${$xl}`" prop="lineId">
              <el-select v-model="ruleForm.lineId" filterable class="form-item-select" @change="xlChangeGetDy" :disabled='isFromQx||isdjqx'>
                <el-option v-for="item in selection.linesSelectArr" :key="item.line_id" :label="item.line_name" :value="item.line_id"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class='mm_alart' v-if='ruleForm.qxType==0'>
            <el-form-item :label="`${$dydj}`" prop="voltageRank">
              <el-input v-model="ruleForm.voltageRank" clearable disabled />
            </el-form-item>
          </div>

          <div class='mm_alart' v-if='ruleForm.qxType==0'>
            <el-form-item :label="`缺陷${$dl}`" prop="dlId">
              <el-select clearable v-model="ruleForm.dlId" class="form-item-select" @change="dlChangeGetXw" :disabled='isFromQx'>
                <el-option v-for="item in selection.dlSelectArr" :key="item.dl_id" :label="item.dl_name" :value="item.dl_id"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class='mm_alart' v-if='ruleForm.qxType==0'>
            <el-form-item label="相位" prop="phase">
              <el-input v-model="ruleForm.phase" clearable disabled />
            </el-form-item>
          </div>
          <div class='mm_alart' v-if='ruleForm.qxType==0'>
            <el-form-item label="设备类型" prop="deviceType">
              <el-select v-model="ruleForm.deviceType" class="form-item-select" @change="sbLxChangeGetMc" clearable>
                <el-option v-for="(item,i) in selection.sbLxSelectArr" :key="i" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class='mm_alart' v-if='ruleForm.qxType==0'>
            <el-form-item label="缺陷设备" prop="deviceName">
              <el-select v-model="ruleForm.deviceName" class="form-item-select" @change="sbMcChange" clearable>
                <el-option v-for="item in selection.sbMcSelectArr" :key="item.device_id" :label="item.device_name" :value="item.device_name"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- <div class='mm_alart' v-if='ruleForm.qxType==0'>
            <el-form-item label="生产厂家" prop="manufacturer">
              <el-input v-model="ruleForm.manufacturer" clearable disabled />
            </el-form-item>
          </div>
          <div class='mm_alart' v-if='ruleForm.qxType==0'>
            <el-form-item label="投运日期" prop="transportTime">
              <el-input v-model="ruleForm.transportTime" clearable disabled />
            </el-form-item>
          </div> -->
          <div class='mm_alart'>
            <el-form-item class="fred" label="缺陷部件" prop="bj">
              <el-select v-model="ruleForm.bj" class="form-item-select" @change="bjChnage">
                <el-option v-for="(item,i) in selection.bJSelectArr" :key="i" :label="item.bj" :value="item.bj"></el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class='mm_alart' v-if='ruleForm.qxType==1'>
            <el-form-item label="通道列表" prop="channelId">
              <el-select v-model="ruleForm.channelId" filterable clearable placeholder="请选择" :filter-method="filterList">
                <el-option v-for="item in tDList" :key="item.channel_id" :label="item.channel_name" :value="item.channel_id"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class='mm_alart' v-if='ruleForm.qxType==1'>
            <el-form-item label="通道段/井" prop="channelJdId">
              <el-select v-model="ruleForm.channelJdId" class="form-item-select" filterable clearable :filter-method="filterTD_JList">
                <el-option v-for="item in tD_JList" :key="item.channel_jd_id" :label="item.channel_jd_name" :value="item.channel_jd_id"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class='mm_alart'>
            <el-form-item label="经度" prop="longitude">
              <el-input v-model="ruleForm.longitude" clearable />
            </el-form-item>
          </div>
          <div class='mm_alart'>
            <el-form-item label="纬度" prop="latitude">
              <el-input v-model="ruleForm.latitude" clearable />
            </el-form-item>
          </div>
        </div>
        <div class="inputCont_mm">
          <div class='mm_alart'>
            <el-form-item label="缺陷地址" prop="address">
              <el-input v-model="ruleForm.address" type="textarea" :rows="3"></el-input>
            </el-form-item>
          </div>
        </div>
        <h3 class="modelTitle">调度发送信息</h3>
        <div class="inputCont_mm">
          <div class='mm_alart'>
            <el-form-item label="是否发送调度" prop="ifDispatch">
              <el-radio-group v-model="ruleForm.ifDispatch">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <h3 class="modelTitle">缺陷发现信息</h3>
        <div class="inputCont_mm flexThird">
          <div class='mm_alart'>
            <el-form-item label="发现方式" prop="discoveryMethod">
              <el-select v-model="ruleForm.discoveryMethod" class="form-item-select">
                <el-option v-for="(item,i) in selection.fxfsSelectArr" :key="i" :label="item" :value="item"></el-option>

              </el-select>
            </el-form-item>
          </div>
          <div class='mm_alart'>
            <el-form-item label="发现班组" prop="groupId">
              <el-select v-model="ruleForm.groupId" class="form-item-select" @change="bzChange">
                <el-option v-for="item in selection.bzSelectArr" :key="item.group_id" :label="item.group_name" :value="item.group_id"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class='mm_alart'>
            <el-form-item label="发现人" prop="userId">
              <el-select v-model="ruleForm.userId" class="form-item-select">

                <el-option v-for="item in selection.fxrSelectArr" :key="item.user_id" :label="item.user_name" :value="item.user_id"></el-option>

              </el-select>
            </el-form-item>
          </div>
          <div class='mm_alart'>
            <el-form-item label="发现日期" prop="discoveryTime">
              <el-date-picker v-model="ruleForm.discoveryTime" value-format="yyyy-MM-dd" type="date" class="date-block" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </div>
          <div class='mm_alart'>
            <el-form-item label="登记日期" prop="registerTime">
              <el-input v-model="ruleForm.registerTime" disabled></el-input>
            </el-form-item>
          </div>
          <div class='mm_alart'>
            <el-form-item label="登记人" prop="loginUserName">
              <el-input v-model="ruleForm.loginUserName" disabled></el-input>
            </el-form-item>
          </div>
        </div>

        <h3 class="modelTitle">缺陷描述信息</h3>
        <div class="inputCont_mm flexThird">
          <div class='mm_alart'>
            <el-form-item label="缺陷部位" prop="bw">
              <el-select v-model="ruleForm.bw" class="form-item-select" @change="bwChange">
                <el-option v-for="(item,i) in selection.bwSelectArr" :key="i" :label="item.bw" :value="item.bw"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class='mm_alart'>
            <el-form-item label="缺陷描述" prop="qxDes">
              <el-select v-model="ruleForm.qxDes" class="form-item-select" @change="msChange">
                <el-option v-for="(item,i) in selection.msSelectArr" :key="i" :label="item.qx_des" :value="item.qx_des"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class='mm_alart'>
            <el-form-item label="分类依据" prop="decideBasis">
              <el-select v-model="ruleForm.decideBasis" class="form-item-select" @change="flChange">
                <el-option v-for="(item,i) in selection.flSelectArr" :key="i" :label="item.decide_basis" :value="item.decide_basis"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class='mm_alart'>
            <el-form-item label="缺陷等级" prop="qxGrade">
              <!-- <el-input v-model="ruleForm.qxGrade" /> -->
              <el-select v-model="ruleForm.qxGrade">
                <el-option value="一般">一般</el-option>
                <el-option value="危急">危急</el-option>
                <el-option value="严重">严重</el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class='mm_alart'>
            <el-form-item label="缺陷内容" prop="xqContent">
              <el-input v-model="ruleForm.xqContent"></el-input>
            </el-form-item>
          </div>
        </div>
        <h3 class="modelTitle">
          <!-- <span style="color:red">*</span>  -->
          消缺前照片</h3>
        <div class="imgCon picCon">
          <!-- <el-form-item class="showpic" v-for="(img,ind) in photoUrl" :key="ind">
            <img style="height:100%" :src='publicIp+img' alt="">
            <i class="el-icon-delete del" @click="delImg(ind)"></i>
            <i class="el-icon-zoom-in big" @click="showBig(img)"></i>
          </el-form-item> -->

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
        <h3 class="modelTitle">
          <span style="color:red">*</span>

          是否具备处置条件
        </h3>
        <div class="inputCont_mm">
          <div class='mm_alart'>
            <el-form-item prop="ifCondition">
              <el-radio-group v-model="ruleForm.ifCondition">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="onSearch" @click="SuerFun">保存</el-button>
        <el-button type="default" class="UserSearchFun" @click="handleClose">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { uploadPicture } from '@/api/liveDetectionManage'
import {
  qxAdd, // 新增
  registerEdit, // 编辑
  xlList, // xl列表
  getDy, // 电压
  getDl, // $dl
  getXw, //相位
  getSblx, //设备类型
  getSbMc, // 设备名称
  getBj, // 缺陷部件
  getTd, // 通道
  getBw, // 部位
  getMs, // 描述
  getWorkOrWell, // 通道段/井
  getyjAdj, // 依据和等级
  getFxfs, // 发现方式
  getBz, // 发现班组
  getFxr // 发现人
} from '@/api/defect'
export default {
  props: {
    title: '',
    openID: '',
    isdjqx:false,
    thisDetail: {},
    isFromQx: false,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    var checkLineId = (rule, value, callback) => {
      if (this.ruleForm.qxType == 0 && !value) {
        return callback(new Error('缺陷' + this.$xl + '不能为空'))
      }
      callback()
    }
    var checkDlId = (rule, value, callback) => {
      if (this.ruleForm.dlId == 0 && !value) {
        return callback(new Error(' 缺陷' + this.$dl + '不能为空'))
      }
      callback()
    }
    // var checkdeviceType = (rule, value, callback) => {
    //   if (this.ruleForm.dlId == 0 && !value) {
    //     return callback(new Error(' 设备类型不能为空'))
    //   }
    //   callback()
    // }
    // var checkdeviceName = (rule, value, callback) => {
    //   if (this.ruleForm.dlId == 0 && !value) {
    //     return callback(new Error(' 缺陷设备不能为空'))
    //   }
    //   callback()
    // }
    var checbj = (rule, value, callback) => {
      if (this.ruleForm.dlId == 0 && !value) {
        return callback(new Error(' 缺陷部件不能为空'))
      }
      callback()
    }
    var checklongitude = (rule, value, callback) => {
      var longrg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/
      if (!longrg.test(this.ruleForm.longitude) && value) {
        return callback(new Error(' 经度格式不对'))
      }
      callback()
    }
    var checklatitude = (rule, value, callback) => {
      var latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/
      if (!latreg.test(this.ruleForm.latitude) && value) {
        return callback(new Error(' 纬度格式不对'))
      }
      callback()
    }
    return {
      tDList: [],
      tD_JList: [],
      publicIp: '',
      showDialog: true,
      dialogVisible: false,
      dialogImageUrl: false,
      lineOrChannel: [
        { val: 0, name: this.$xl },
        { val: 1, name: '通道' }
      ], // 是通道 还是 xl
      ruleForm: {
        qxType: 0, // 0xl 或者 1通道
        lineId: '', // 缺陷xl
        voltageRank: '', // dydj
        dlId: '', // $dl
        phase: '', // 相位
        deviceType: '', // 设备类型
        deviceName: '', // 缺陷设备
        // manufacturer: '', // 生产厂家
        // transportTime: '', // 投运日期
        bj: '', // 缺陷部件
        channelId: '', // 通道列表
        channelJdId: '', // 通道段/井
        longitude: '', // 精度
        latitude: '', // 纬度
        address: '', // 缺陷地址
        ifDispatch: '', // 是否发送调度
        discoveryMethod: '', // 发现方式
        groupId: '', // 发现班组
        userId: '', // 发现人
        discoveryTime: '', // 发现日期
        registerTime: '', // 登记日期
        loginUserName: '', // 登记人
        bw: '', // 缺陷部位
        qxDes: '', // 缺陷描述
        decideBasis: '', // 分类依据
        qxGrade: '', // 缺陷等级
        xqContent: '', // 缺陷内容
        beforePhotoUrl: '',
        ifCondition: ''
      },
      photoUrl: [], // 显示图片
      rules: {
        qxType: [
          {
            required: true,
            message: '请选择' + this.$xl + '或者通道',
            trigger: 'change'
          }
        ],
        lineId: [{ validator: checkDlId, trigger: 'change' }],
        // channelId: [{ required: true, trigger: 'change' }],
        // channelJdId: [{ required: true, trigger: 'change' }],
        // dlId: [{ validator: checkLineId, trigger: 'change' }],
        // deviceType: [{ validator: checkdeviceType, trigger: 'change' }],
        // deviceName: [{ validator: checkdeviceName, trigger: 'change' }],
        bj: [{ validator: checbj, trigger: 'change' }],

        address: [
          { required: true, message: '缺陷地址不能为空', trigger: 'blue' }
        ],
        discoveryMethod: [
          { required: true, message: '发现方式不能为空', trigger: 'blue' }
        ],
        groupId: [
          { required: true, message: '发现班组不能为空', trigger: 'change' }
        ],
        userId: [
          { required: true, message: '发现人不能为空', trigger: 'change' }
        ],
        discoveryTime: [
          { required: true, message: '发现日期不能为空', trigger: 'change' }
        ],
        bw: [
          { required: true, message: '缺陷部位不能为空', trigger: 'change' }
        ],
        qxDes: [
          { required: true, message: '缺陷描述不能为空', trigger: 'change' }
        ],
        // decideBasis: [
        //   { required: true, message: '分类依据不能为空', trigger: 'change' }
        // ],
        qxGrade: [
          { required: true, message: '缺陷等级不能为空', trigger: 'change' }
        ],
        xqContent: [
          { required: true, message: '缺陷内容不能为空', trigger: 'change' }
        ],
        ifCondition: [
          {
            required: true,
            message: '是否具备处置条件不能为空',
            trigger: 'change'
          }
        ],
        longitude: [{ validator: checklongitude, trigger: 'change' }],
        latitude: [{ validator: checklatitude, trigger: 'change' }]
      },
      selection: {
        linesSelectArr: [], // xl
        dlSelectArr: [], // $dl
        sbLxSelectArr: [], // 设备类型
        sbMcSelectArr: [], // 设备名称
        bJSelectArr: [], // 设备部件
        channelsArr: [], // 通道
        tddJSelectArr: [], // 通道段/井
        bwSelectArr: [], // 部位
        msSelectArr: [], // 描述
        flSelectArr: [], // 分类
        fxfsSelectArr: [], // 发现方式
        bzSelectArr: [], // 发现班组
        fxrSelectArr: [] // 发现班组
      }
    }
  },
  created() {
    if(this.isdjqx){
      console.log(this.thisDetail)
      this.ruleForm.lineId = this.thisDetail.lineId
         getDy(this.ruleForm.lineId).then(res => {
        // 电压值
        this.ruleForm.voltageRank = res.data.data.voltage_rank
      })
      getDl(this.ruleForm.lineId).then(res => {
        // $dl列表
        this.selection.dlSelectArr = res.data.data
      })
    }
    if (this.isFromQx) {
      this.ruleForm.lineId = this.thisDetail.xlid
      getDy(this.ruleForm.lineId).then(res => {
        // 电压值
        this.ruleForm.voltageRank = res.data.data.voltage_rank
      })
      getDl(this.ruleForm.lineId).then(res => {
        // $dl列表
        this.selection.dlSelectArr = res.data.data
        this.ruleForm.dlId = this.thisDetail.dlid
      })

      getXw(this.thisDetail.dlid).then(res => {
        if (res.data.data) this.ruleForm.phase = res.data.data.phase
      })
    }
    this.publicIp = process.env.VUE_APP_BASE_API
    /**
     *对Date的扩展，将 Date 转化为指定格式的String
     *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
     *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     *例子：
     *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
     *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
     */
    Date.prototype.Format = function(fmt) {
      var o = {
        'M+': this.getMonth() + 1, //月份
        'd+': this.getDate(), //日
        'h+': this.getHours(), //小时
        'm+': this.getMinutes(), //分
        's+': this.getSeconds(), //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
      }
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ('00' + o[k]).substr(('' + o[k]).length)
          )
      return fmt
    }
    this.channelChange()
    // this.ruleForm.registerTime = new Date().Format('yyyy-MM-dd hh:mm:ss')
    xlList().then(res => {
      // xl
      this.selection.linesSelectArr = res.data.data
    })
    getSblx().then(res => {
      // 设备类型
      this.selection.sbLxSelectArr = res.data.data
    })

    getBj().then(res => {
      // 部件
      this.selection.bJSelectArr = res.data.data
    })
    getTd().then(res => {
      // 通道
      this.selection.channelsArr = res.data.data
      this.filterList()
    })

    getFxfs().then(res => {
      // 发现方式
      this.selection.fxfsSelectArr = res.data.data
    })
    getBz().then(res => {
      // 发现方式getBz
      this.selection.bzSelectArr = res.data.data
    })
    if (!this.isEdit) {
      // 新增
      /** 获取cookie  */
      this.ruleForm.loginUserId = this.getCookie('userId')
      this.ruleForm.loginUserName = this.$store.state.user.UserName
      this.ruleForm.registerTime = new Date().Format('yyyy-MM-dd hh:mm:ss')
    } else {
      // 编辑

      this.ruleForm.ifCondition = '' + this.thisDetail.ifCondition
      getDl(this.thisDetail.lineId)
        .then(res => {
          // $dl列表
          this.selection.dlSelectArr = res.data.data

          return getSbMc(this.thisDetail.deviceType, this.thisDetail.lineId) // 缺陷设备
        })
        .then(res => {
          if (res.data.code == 0) {
            this.selection.sbMcSelectArr = res.data.data
          }
        })

      getBw(this.thisDetail.bj)
        .then(res => {
          // 缺陷设备
          this.selection.bwSelectArr = res.data.data
          return getMs(this.thisDetail.bw)
        })
        .then(res => {
          // 缺陷描述
          if (res.data.code == 0) {
            this.selection.msSelectArr = res.data.data
          }

          return getyjAdj(this.thisDetail.qxDes)
        })
        .then(res => {
          // 缺陷描述
          if (res.data.code == 0) {
            this.selection.flSelectArr = res.data.data
          }
          this.ruleForm = this.thisDetail
          this.ruleForm.ifDispatch = '' + this.thisDetail.ifDispatch
          this.ruleForm.ifCondition = '' + this.thisDetail.ifCondition
        })
      getFxr(this.thisDetail.groupId).then(res => {
        if (res.data.code == 0) {
          this.selection.fxrSelectArr = res.data.data
        }
      })
      // 取图
      if(this.thisDetail.beforePhotoUrl)
      this.photoUrl = this.thisDetail.beforePhotoUrl.split(',')
    }
  },

  methods: {
    changeqxtype() {
      this.$refs['ruleForm'].clearValidate()
    },
    xlChangeGetDy() {
      // xl change
      getDy(this.ruleForm.lineId).then(res => {
        // 电压值
        this.ruleForm.voltageRank = res.data.data.voltage_rank
      })
      this.ruleForm.dlId = ''
      this.ruleForm.phase = ''
      this.ruleForm.deviceName = ''
      this.ruleForm.manufacturer = ''
      this.ruleForm.transportTime = ''
      getDl(this.ruleForm.lineId).then(res => {
        // $dl列表
        this.selection.dlSelectArr = res.data.data
      })

      // 设备名称
      if (this.ruleForm.deviceType) {
        getSbMc(this.ruleForm.deviceType, this.ruleForm.lineId).then(res => {
          if (res.data.code == 0) {
            this.selection.sbMcSelectArr = res.data.data
          }
        })
      }
    },
    dlChangeGetXw() {
      // $dl change
      getXw(this.ruleForm.dlId).then(res => {
        if (res.data.data) this.ruleForm.phase = res.data.data.phase
      })
    },
    sbLxChangeGetMc() {
      // 设备类型change
      this.ruleForm.deviceName = ''
      this.ruleForm.manufacturer = ''
      this.ruleForm.transportTime = ''
      // 设备名称
      if (this.ruleForm.lineId) {
        getSbMc(this.ruleForm.deviceType, this.ruleForm.lineId).then(res => {
          if (res.data.code == 0) {
            this.selection.sbMcSelectArr = res.data.data
          }
        })
      }
    },
    sbMcChange(id) {
      // 设备名称 change
      let mcArr = this.selection.sbMcSelectArr.filter(res => {
        return res.device_name == id
      })

      this.ruleForm.manufacturer = mcArr[0].manufacturer
      this.ruleForm.transportTime = mcArr[0].transport_time
    },
    bjChnage(e) {
      // 缺陷部件
      getBw(e).then(res => {
        this.selection.bwSelectArr = []
        this.selection.msSelectArr = []
        this.selection.flSelectArr = []
        this.ruleForm.bw = ''
        this.ruleForm.qxDes = ''
        this.ruleForm.decideBasis = ''
        this.ruleForm.qxGrade = ''

        if (res.data.code == 0) {
          this.selection.bwSelectArr = res.data.data
        }
      })
    },
    bwChange(e) {
      // 缺陷部位
      this.selection.msSelectArr = []
      this.selection.flSelectArr = []
      this.ruleForm.qxDes = ''
      this.ruleForm.decideBasis = ''
      this.ruleForm.qxGrade = ''
      getMs(e).then(res => {
        if (res.data.code == 0) {
          this.selection.msSelectArr = res.data.data
        }
      })
    },
    msChange(e) {
      //  描述 change
      this.selection.flSelectArr = []
      this.ruleForm.decideBasis = ''
      this.ruleForm.qxGrade = ''
      getyjAdj(e).then(res => {
        if (res.data.code == 0) {
          this.selection.flSelectArr = res.data.data
        }
      })
    },
    flChange(e) {
      // 分类依据 change
      // this.ruleForm.qxGrade = ''
      // let flArr = this.selection.flSelectArr.filter(res => {
      //   return res.decide_basis == e
      // })
      // this.ruleForm.qxGrade = flArr[0].qx_grade
    },
    bzChange(e) {
      this.ruleForm.userId = ''
      getFxr(e).then(res => {
        if (res.data.code == 0) {
          this.selection.fxrSelectArr = res.data.data
        }
      })
    },
    channelChange() {
      getWorkOrWell().then(res => {
        if (res.data.data[0]) {
          this.selection.tddJSelectArr = res.data.data
          this.filterTD_JList()
        }
      })
    },
    filterList(query = '') {
      let arr = this.selection.channelsArr.filter(item => {
        return (
          item.channel_name.includes(query) || item.channel_id.includes(query)
        )
      })
      if (arr.length > 20) {
        this.tDList = arr.slice(0, 20)
      } else {
        this.tDList = arr
      }
    },
    filterTD_JList(query = '') {
      let arr = this.selection.tddJSelectArr.filter(item => {
        return (
          item.channel_jd_name.includes(query) || item.channel_jd_id.includes(query)
        )
      })
      
      if (arr.length > 20) {
        this.tD_JList = arr.slice(0, 20)
      } else {
        this.tD_JList = arr
      }
    },

    //:label="item.channel_jd_name" :value="item.channel_jd_id"
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
      //
      let file = event.target.files[0]
      this.upLoadImages(file, val => {
        if (val.code == 0) this.photoUrl.push(val.msg)
      })
    },
    /**
     * 取消按钮
     */
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('childFn', {
            showDialog: this.showDialog
          })
        })
        .catch(_ => {})
    },
    /**
     * 确认按钮
     */
    SuerFun() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          if (this.photoUrl.length != 0) {
            this.ruleForm.beforePhotoUrl = this.photoUrl.join(',')
            // this.$message({ type: 'error', message: '请上传消缺前照片' })
            // return
          }
          this.setSelectId([
            {
              selectArr: this.selection.linesSelectArr,
              ruleFormName: 'lineName',
              ruleFormId: 'lineId',
              filterName: 'line_name',
              filterId: 'line_id'
            },
            {
              selectArr: this.selection.dlSelectArr,
              ruleFormName: 'dlName',
              ruleFormId: 'dlId',
              filterName: 'dl_name',
              filterId: 'dl_id'
            },
            {
              selectArr: this.selection.bzSelectArr,
              ruleFormName: 'groupName',
              ruleFormId: 'groupId',
              filterName: 'group_name',
              filterId: 'group_id'
            },
            {
              selectArr: this.selection.fxrSelectArr,
              ruleFormName: 'userName',
              ruleFormId: 'userId',
              filterName: 'user_name',
              filterId: 'user_id'
            },
            {
              selectArr: this.selection.channelsArr,
              ruleFormName: 'channelName',
              ruleFormId: 'channelId',
              filterName: 'channel_name',
              filterId: 'channel_id'
            },
            {
              selectArr: this.selection.tddJSelectArr,
              ruleFormName: 'channelJdName',
              ruleFormId: 'channelJdId',
              filterName: 'channel_jd_name',
              filterId: 'channel_jd_id'
            }
          ])
          if (!this.isEdit) {
            qxAdd(this.ruleForm).then(res => {
              let val = res.data
              let type = val.code == 0 ? 'success' : 'error'
              this.$message({ type, message: val.msg })
              if (val.code == 0)
                this.$emit('childFn', {
                  showDialog: false
                })
            })
          } else {
            let newForm = JSON.parse(JSON.stringify(this.ruleForm))
            if (newForm.ifDispatch) delete newForm.ifDispatch
            registerEdit({ ...newForm }).then(res => {
              let val = res.data
              let type = val.code == 0 ? 'success' : 'error'
              this.$message({ type, message: val.msg })
              if (val.code == 0)
                this.$emit('childFn', {
                  showDialog: false
                })
            })
          }

          /* [{
         selectArr:[],
         ruleFormName:'',
         ruleFormId:'',
         filterName:'',
         filterId:'',
       }]*/
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getCookie(name) {
      var prefix = name + '='
      var start = document.cookie.indexOf(prefix)
      if (start == -1) {
        return null
      }

      var end = document.cookie.indexOf(';', start + prefix.length)
      if (end == -1) {
        end = document.cookie.length
      }

      var value = document.cookie.substring(start + prefix.length, end)
      return unescape(value)
    },
    setSelectId(setArr) {
      setArr.forEach(element => {
        if (this.ruleForm[element.ruleFormId]) {

          let arr = element.selectArr.filter(res => {
            return res[element.filterId] == this.ruleForm[element.ruleFormId]
          })
          this.ruleForm[element.ruleFormName] = arr[0][element.filterName]
            ? arr[0][element.filterName]
            : ''
        }
      })
    },
    showBig(url) {
      this.dialogVisible = true
      this.dialogImageUrl = process.env.VUE_APP_BASE_API + url
    },
    delImg(ind) {
      this.photoUrl.splice(ind, 1)
    }
  }
}
</script>
<style lang='scss' scoped>
.step-items li {
  display: flex;
  align-items: center;
  width: 100%;
  & > div:first-child {
    width: 100px;
    flex-shrink: 0;
    text-align: right;
  }
  .step-content {
    width: 100%;
    flex-shrink: 1;
  }
}
.el-select {
  width: 100%;
}
.el-date-editor.el-input {
  width: 100%;
}
.el-dialog--center .el-dialog__body {
  z-index: 10000;
}
.el-dialog__wrapper {
  z-index: 3000;
}
.addmsg {
  text-align: center;
  width: 100%;
}
.el-icon-circle-plus,
.el-icon-circle-close {
  font-size: 32px;
  cursor: pointer;
}
.el-icon-circle-close {
  color: #f99;
}
.el-icon-circle-close:hover {
  color: #f55;
}

.el-input.is-disabled .el-input__inner {
  background-color: #fff;
  border-color: #fff;
  color: #777;
  cursor: not-allowed;
}
.imgcard {
  position: relative;
}
</style>
