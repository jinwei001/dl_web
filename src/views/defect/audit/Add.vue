<template>
  <!--缺陷登记表单弹框-->
  <div class="xs-hastitle whitedisable_mm">
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-dialog :title="title" :visible.sync="allshowDialog" :close-on-click-modal="false" width="1060px" center :before-close="handleClose">
      <!--表单-->
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-position="right" label-width="100px" style="display:block">
        <ul class="step-items">
          <li v-if="thisDetail.processType == 1">
            <div class="step-field">
              通道流程：
            </div>
            <div class="step-content">
              <el-steps align-center :active="nodeActive">
                <el-step title="上报"></el-step>
                <el-step title="设备主人确认"></el-step>
                <el-step title="班组长确认"></el-step>
                <!-- <el-step title="处理人"></el-step> -->
                <el-step title="班组确认"></el-step>
                <el-step title="结束"></el-step>
              </el-steps>
            </div>
          </li>
          <li v-if="thisDetail.processType == 2">
            <div class="step-field">
              35,110{{$qf}}流程：
            </div>
            <div class="step-content">
              <el-steps align-center :active="nodeActive">
                <el-step title="上报"></el-step>
                <el-step title="设备主人确认"></el-step>
                <el-step title="班组长确认"></el-step>
                <el-step title="专职"></el-step>
                <el-step title="班组确认"></el-step>
                <el-step title="结束"></el-step>
              </el-steps>
            </div>
          </li>
          <li v-if="thisDetail.processType == 3">
            <div class="step-field">
              220{{$qf}}流程：
            </div>
            <div class="step-content">
              <el-steps align-center :active="nodeActive">
                <el-step title="上报"></el-step>
                <el-step title="设备主人确认"></el-step>
                <el-step title="班组长确认"></el-step>
                <el-step title="专职"></el-step>
                <el-step title="主任"></el-step>
                <el-step title="班组确认"></el-step>
                <el-step title="结束"></el-step>
              </el-steps>
            </div>
          </li>
        </ul>
        <div>

          <el-table border stripe :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}" :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}" highlight-current-row>
            <!--表格列-->
            <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
            <el-table-column prop="currentNodeName" label="节点名称"></el-table-column>
            <el-table-column prop="handlerName" label="处理人"></el-table-column>
            <el-table-column prop="groupName" label="处理班组"></el-table-column>
            <el-table-column prop="operateTime" label="处理时间"></el-table-column>
            <el-table-column prop="consumeTime" label="耗时"></el-table-column>
            <el-table-column label="审核意见">
              <template slot-scope="scope">
                {{scope.row.approvalResult==0?'不同意':'同意'}}
              </template>
            </el-table-column>
          </el-table>
          <div class='mm_alart' style="margin-top:20px">
            <el-form-item label="当前处理人">
              <el-input v-model="thisDetail.currentHandlerName" clearable disabled />
            </el-form-item>
          </div>
        </div>

        <h3 class="modelTitle">缺陷定位信息</h3>
        <div class="inputCont_mm flexThird">
          <div class='mm_alart'>
            <el-form-item :label="`${$xl}/通道`" prop="qxType">
              <el-select v-model="ruleForm.qxType" class="form-item-select" disabled>
                <el-option v-for="item in lineOrChannel" :key="item.val" :label="item.name" :value="item.val"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class='mm_alart' v-if='ruleForm.qxType==0'>
            <el-form-item :label="`缺陷${$xl}`" prop="lineId">
              <!-- <el-select v-model="ruleForm.lineId" filterable class="form-item-select">
                <el-option v-for="item in selection.linesSelectArr" :key="item.line_id" :label="item.line_name" :value="item.line_id"></el-option>
              </el-select> -->
              <el-input v-model="ruleForm.lineName" clearable disabled />
            </el-form-item>
          </div>
          <div class='mm_alart' v-if='ruleForm.qxType==0'>
            <el-form-item :label="`${$dydj}`" prop="voltageRank">
              <el-input v-model="ruleForm.voltageRank" clearable disabled />
            </el-form-item>
          </div>

          <div class='mm_alart' v-if='ruleForm.qxType==0'>
            <el-form-item :label="`缺陷${$dl}`" prop="dlName">
              <el-input v-model="ruleForm.dlName" disabled />
            </el-form-item>
          </div>
          <div class='mm_alart' v-if='ruleForm.qxType==0'>
            <el-form-item label="相位" prop="phase">
              <el-input v-model="ruleForm.phase" disabled />
            </el-form-item>
          </div>
          <!-- <div class='mm_alart' v-if='ruleForm.qxType==0'>
            <el-form-item label="设备类型" prop="deviceType">
              <el-input v-model="ruleForm.deviceType" disabled />
            </el-form-item>
          </div>
          <div class='mm_alart' v-if='ruleForm.qxType==0'>
            <el-form-item label="缺陷设备" prop="deviceName">
              <el-select v-model="ruleForm.deviceName" class="form-item-select" disabled>
                <el-option v-for="item in selection.sbMcSelectArr" :key="item.device_id" :label="item.device_name" :value="item.device_name"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class='mm_alart' v-if='ruleForm.qxType==0'>
            <el-form-item label="生产厂家" prop="manufacturer">
              <el-input v-model="ruleForm.manufacturer" disabled />
            </el-form-item>
          </div>
          <div class='mm_alart' v-if='ruleForm.qxType==0'>
            <el-form-item label="投运日期" prop="transportTime">
              <el-input v-model="ruleForm.transportTime" disabled />
            </el-form-item>
          </div> -->
          <div class='mm_alart'>
            <el-form-item label="缺陷部件" prop="bj">
              <el-select v-model="ruleForm.bj" class="form-item-select" disabled>
                <el-option v-for="(item,i) in selection.bJSelectArr" :key="i" :label="item.bj" :value="item.bj"></el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class='mm_alart' v-if='ruleForm.qxType==1'>
            <el-form-item label="通道列表">
              <el-input v-model="ruleForm.channelName" disabled />
            </el-form-item>
          </div>
          <div class='mm_alart' v-if='ruleForm.qxType==1'>
            <el-form-item label="通道段/井" prop="channelJdId">
              <el-input v-model="ruleForm.channelJdName" disabled />
            </el-form-item>
          </div>
          <div class='mm_alart'>
            <el-form-item label="经度" prop="longitude">
              <el-input v-model="ruleForm.longitude" disabled />
            </el-form-item>
          </div>
          <div class='mm_alart'>
            <el-form-item label="纬度" prop="latitude">
              <el-input v-model="ruleForm.latitude" disabled />
            </el-form-item>
          </div>
        </div>
        <div class="inputCont_mm">
          <div class='mm_alart'>
            <el-form-item label="缺陷地址" prop="address">
              <el-input v-model="ruleForm.address" type="textarea" disabled></el-input>
            </el-form-item>
          </div>
        </div>
        <h3 class="modelTitle">调度发送信息</h3>
        <div class="inputCont_mm">
          <div class='mm_alart'>
            <el-form-item label="是否发送调度" prop="ifDispatch">
              <el-radio-group v-model="ruleForm.ifDispatch">
                <el-radio label="1" disabled="">是</el-radio>
                <el-radio label="0" disabled>否</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <h3 class="modelTitle">缺陷发现信息</h3>
        <div class="inputCont_mm flexThird">
          <div class='mm_alart'>
            <el-form-item label="发现方式" prop="discoveryMethod">
              <el-select v-model="ruleForm.discoveryMethod" class="form-item-select" disabled>
                <el-option v-for="(item,i) in selection.fxfsSelectArr" :key="i" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class='mm_alart'>
            <el-form-item label="发现班组" prop="groupId">

              <el-input v-model="ruleForm.groupName" disabled></el-input>
            </el-form-item>
          </div>
          <div class='mm_alart'>
            <el-form-item label="发现人" prop="userId">
              <el-input v-model="ruleForm.userName" disabled></el-input>
            </el-form-item>
          </div>
          <div class='mm_alart'>
            <el-form-item label="发现日期" prop="discoveryTime">
              <el-date-picker v-model="ruleForm.discoveryTime" value-format="yyyy-MM-dd" type="date" class="date-block" placeholder="选择日期" disabled></el-date-picker>
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
              <el-input v-model="ruleForm.bw" disabled></el-input>
            </el-form-item>
          </div>
          <div class='mm_alart'>
            <el-form-item label="缺陷描述" prop="qxDes">
              <el-input v-model="ruleForm.qxDes" disabled></el-input>
            </el-form-item>
          </div>
          <div class='mm_alart'>
            <el-form-item label="分类依据" prop="decideBasis">
              <el-input v-model="ruleForm.decideBasis" disabled></el-input>
            </el-form-item>
          </div>
          <div class='mm_alart'>
            <el-form-item label="缺陷等级" prop="qxGrade">
              <el-input v-model="ruleForm.qxGrade" disabled />
            </el-form-item>
          </div>
          <div class='mm_alart'>
            <el-form-item label="缺陷内容" prop="xqContent">
              <el-input v-model="ruleForm.xqContent" disabled></el-input>
            </el-form-item>
          </div>
        </div>
        <h3 class="modelTitle">消缺前照片</h3>
        <div class="imgCon picCon">

          <div v-for="(img,ind) in photoUrl" :key="ind" class="imgCont">
            <img :src='publicIp+img' alt="">
            <div class="doImgBtn">
              <i class="el-icon-zoom-in big" @click="showBig(img)"></i>
            </div>
          </div>
        </div>

      </el-form>
      <!-- ------------缺陷审核------------- -->
      <div v-if="stepCode>=2">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="140px">
          <h3 class="modelTitle">缺陷处理信息</h3>
          <div class="flexThird">
            <el-form-item label="消缺班组" prop="planXqGroupId">
              <el-select v-model="ruleForm.planXqGroupId" class="form-item-select" disabled>
                <el-option v-for="item in selection2.bzSelectArr" :key="item.group_id" :label="item.group_name" :value="item.group_id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="消缺人" prop="planXqUserId" class="mm_alart">
              <el-input v-model="ruleForm.planXqUser" disabled></el-input>
            </el-form-item>
            <el-form-item label="消缺时间" prop="xqTime" class="mm_alart">
              <el-date-picker v-model="ruleForm2.xqTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :disabled='isCheck||stepCode>=3'></el-date-picker>
            </el-form-item>
            <el-form-item label="工作负责人" prop="workDutyPerson" class="mm_alart">
              <el-input v-model="ruleForm2.workDutyPerson" :disabled='isCheck||stepCode>=3'></el-input>
            </el-form-item>
            <el-form-item label="是否集中处理" prop="ifFocusHandle" class="mm_alart">
              <el-select v-model="ruleForm2.ifFocusHandle" class="form-item-select" :disabled='isCheck||stepCode>=3'>
                <el-option label="是" :value="1"></el-option>
                <el-option label="否" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否延迟消缺" prop="ifDelay" class="mm_alart">
              <el-select v-model="ruleForm2.ifDelay" class="form-item-select" :disabled='isCheck||stepCode>=3'>
                <el-option label="是" :value="1"></el-option>
                <el-option label="否" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="延期原因" prop="delayReason" style="width:100%" class="mm_alart">
              <el-input v-model="ruleForm2.delayReason" type="textarea" :disabled='isCheck||stepCode>=3'></el-input>
            </el-form-item>
            <el-form-item label="缺陷处置方案" prop="approvalAdvise" style="width:100%" class="mm_alart" v-if='!isCheck&&stepCode==2'>
              <el-button type="primary" class="uploadBtn"> <input style="" type="file" @change="handleChnage"> 点击上传</el-button> <span> {{handleName}}</span>
            </el-form-item>
            <el-form-item label="缺陷处置方案" style="width:100%" class="mm_alart" v-else>
              <el-button type="primary" class="uploadBtn" :disabled="!thisDetail.handlePlan" @click="downs(publicIp + thisDetail.handlePlan,'缺陷处置方案')">点击下载</el-button>
            </el-form-item>
            <el-form-item label="缺陷处置结果" prop="handleResult" style="width:100%" class="mm_alart">
              <el-input v-model="ruleForm2.handleResult" type="textarea" :disabled='isCheck||stepCode>=3'></el-input>
            </el-form-item>

          </div>
          <h3 class="modelTitle" style="width:100%">消缺后照片</h3>
          <div class="imgCon picCon">
            <!-- <el-form-item class="showpic" v-for="(img,ind) in afterPhotoUrlArr" :key="ind">
              <img style="height:100%" :src='publicIp+img' alt="">
              <i class="el-icon-delete del" @click="delImg(ind)"></i>
              <i class="el-icon-zoom-in big" @click="showBig(img)"></i>
            </el-form-item> -->

            <div v-for="(img,ind) in afterPhotoUrlArr" :key="ind" class="imgCont">
              <img :src='publicIp+img' alt="">
              <div class="doImgBtn">
                <i v-if='!isCheck&&stepCode==2' class="el-icon-delete del" @click="delImg(ind)"></i>
                <i class="el-icon-zoom-in big" @click="showBig(img)"></i>
              </div>
            </div>
            <div class="" v-if='!isCheck&&stepCode==2'>
              <div class="imgcard">
                <i class="el-icon-plus avatar-uploader-icon"></i>
                <input type="file" @change="upLoadvisibleLight($event)" name="picture" accept="image/*" class="el-upload__input">
              </div>
            </div>
          </div>

          <el-form-item label="遗留问题" prop="remainProblem" style="width:100%" class="mm_alart">
            <el-input v-model="ruleForm2.remainProblem" type="textarea" :disabled='isCheck'></el-input>
          </el-form-item>
          <el-form-item label="处理附件资料" style="width:100%" class="mm_alart" v-if='!isCheck&&stepCode==2'>
            <el-button type="primary" class="uploadBtn"> <input style="" type="file" @change="annexChnage"> 点击上传</el-button> <span> {{annexName}}</span>
          </el-form-item>
          <el-form-item label="处理附件资料" style="width:100%" class="mm_alart" v-else>
            <el-button type="primary" class="uploadBtn" :disabled="!thisDetail.annex" @click="downs(publicIp + thisDetail.annex,'处理附件资料')"> 点击下载</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- -----------验收-------------- -->
      <div v-if='stepCode>=3'>
        <el-form :model="ruleForm3" :rules="rules3" ref="ruleForm3" label-width="140px">
          <h3 class="modelTitle">缺陷验收信息</h3>
          <div class="flexThird">

            <el-form-item label="验收班组" prop="planAcceptGroupId">
              <el-select v-model="ruleForm2.planXqGroupId" class="form-item-select" disabled>
                <el-option v-for="item in selection2.bzSelectArr" :key="item.group_id" :label="item.group_name" :value="item.group_id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="验收人" prop="planAcceptorId" class="mm_alart">
              <el-input v-model="ruleForm2.planXqUser" disabled></el-input>
            </el-form-item>
            <!-- <el-form-item label="是否已验收" prop="ifAccept" class="mm_alart">
              <el-select v-model="ruleForm3.ifAccept" class="form-item-select" :disabled='thisStatus>=3'>
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="验收是否合格" prop="ifQualified" class="mm_alart">
              <el-select v-model="ruleForm3.ifQualified" class="form-item-select" :disabled='isCheck'>
                <el-option label="是" :value="1"></el-option>
                <el-option label="否" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="验收时间" prop="acceptTime" class="mm_alart">
              <el-date-picker v-model="ruleForm3.acceptTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :disabled='isCheck'></el-date-picker>
            </el-form-item>
            <el-form-item label="汇报调度情况" prop="dispatchSituation" class="mm_alart">
              <el-input v-model="ruleForm3.dispatchSituation" :disabled='isCheck'></el-input>
            </el-form-item>
            <el-form-item label="汇报监控情况" prop="monitorSituation" class="mm_alart">
              <el-input v-model="ruleForm3.monitorSituation" :disabled='isCheck'></el-input>
            </el-form-item>

            <el-form-item label="验收意见" prop="acceptOpinion" style="width:100%" class="mm_alart">
              <el-input v-model="ruleForm3.acceptOpinion" type="textarea" :disabled='isCheck'></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="acceptRemark" style="width:100%" class="mm_alart">
              <el-input v-model="ruleForm3.acceptRemark" type="textarea" :disabled='isCheck'></el-input>
            </el-form-item>
          </div>
          <h3 class="modelTitle" style="width:100%">照片</h3>
          <div class="imgCon picCon" style="display:flex">
            <!-- <el-form-item class="showpic" v-for="(img,ind) in acceptPhotoUrlArr" :key="ind">
              <img style="height:100%" :src='publicIp+img' alt="">
              <i class="el-icon-delete del" @click="delImg3(ind)"></i>
              <i class="el-icon-zoom-in big" @click="showBig3(img)"></i>
            </el-form-item>
            <el-form-item class="addPic" v-if='!isCheck'>
              <div tabindex="0" class="imgcard">
                <i class="el-icon-plus avatar-uploader-icon"></i>
                <input type="file" @change="upLoadvisibleLight3($event)" name="picture" accept="image/*" class="el-upload__input">
              </div>
            </el-form-item> -->

            <div v-for="(img,ind) in acceptPhotoUrlArr" :key="ind" class="imgCont">
              <img :src='publicIp+img' alt="">
              <div class="doImgBtn">
                <i class="el-icon-delete del" @click="delImg3(ind)"></i>
                <i class="el-icon-zoom-in big" @click="showBig3(img)"></i>
              </div>
            </div>
            <div class="" v-if='!isCheck'>
              <div class="imgcard">
                <i class="el-icon-plus avatar-uploader-icon"></i>
                <input type="file" @change="upLoadvisibleLight3($event)" name="picture" accept="image/*" class="el-upload__input">
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer" v-if='!isCheck'>
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
  xlList, // xl列表
  getTd, // 通道
  getBz, // 发现班组
  getFxr, // 发现人
  registerCheck, // 获取头部表格数据
  registerEdit // 编辑
} from '@/api/defect'
export default {
  props: {
    title: '',
    thisDetail: {},
    isCheckBg: false,
    isCheck: false,
    thisStatus: {
      type: Number,
      default: 1
    }
  },
  components: {},
  data() {
    return {
      publicIp: '',
      tDList: [],
      tableData: [],
      nodeActive: 0,
      stepCode: 1, // 审核阶段： 2：缺陷未审核 3：缺陷已审核  待 验收  4：已验收
      isDisabled: false, // 是否禁用 true 禁用 false 不禁用
      allshowDialog: true,
      dialogVisible: false,
      dialogImageUrl: false,
      lineOrChannel: [
        { val: 0, name: this.$xl },
        { val: 1, name: '通道' }
      ], // 是通道 还是 xl
      ruleForm: {},
      photoUrl: [], // 显示图片
      rules: {},
      selection: {
        linesSelectArr: [], // xl
        channelsArr: [], // 通道
        bzSelectArr: [], // 发现班组
        fxrSelectArr: [] // 发现班组
      },
      ruleForm2: {
        xqTime: '', // 消缺时间
        workDutyPerson: '', // 工作负责人
        ifFocusHandle: '', // 是否集中处理
        ifDelay: '', //是否延迟消缺
        delayReason: '', //  延迟原因
        handleResult: '', // 缺陷处置结果
        remainProblem: '' // 遗留问题
      },
      handleName: ' 未选择文件', //
      handlePlan: '', // 缺陷处置方案文件url
      annexName: ' 未选择文件',
      annex: '', //处理附件资料url
      afterPhotoUrlArr: [],
      rules2: {
        xqTime: [
          { required: true, message: '消缺时间不能为空', trigger: 'blur' }
        ],
        workDutyPerson: [
          { required: true, message: '工作负责人不能为空', trigger: 'blur' }
        ],
        ifFocusHandle: [
          { required: true, message: '是否集中处理', trigger: 'blur' }
        ],
        ifDelay: [{ required: true, message: '是否延迟消缺', trigger: 'blur' }],

        handleResult: [
          { required: true, message: '缺陷处置结果不能为空', trigger: 'blur' }
        ],
        remainProblem: [
          { required: true, message: '遗留问题不能为空', trigger: 'blur' }
        ]
      },
      selection2: {
        bzSelectArr: [], // 发现班组
        fxrSelectArr: [] // 发现人
      },
      ruleForm3: {
        // ifAccept: '', // 是否验收
        ifQualified: '', // 是否合格
        acceptTime: '', // 验收时间
        dispatchSituation: '', // 汇报调度情况
        monitorSituation: '', // 汇报监控情况
        acceptOpinion: '', //验收意见
        acceptRemark: '', //  备注
        acceptPhotoUrl: '' // 验收照片url
      },
      rules3: {
        // ifAccept: [{ required: true, message: '是否验收', trigger: 'change' }],
        ifQualified: [
          { required: true, message: '是否合格', trigger: 'change' }
        ],
        acceptTime: [
          { required: true, message: '验收时间不能为空', trigger: 'blur' }
        ],
        // dispatchSituation: [
        //   { required: true, message: '汇报调度情况不能为空', trigger: 'blur' }
        // ],
        // monitorSituation: [
        //   { required: true, message: '汇报监控情况不能为空', trigger: 'blur' }
        // ],
        acceptOpinion: [
          { required: true, message: '验收意见不能为空', trigger: 'blur' }
        ],
        // acceptRemark: [
        //   { required: true, message: '备注不能为空', trigger: 'blur' }
        // ]
      },
      acceptPhotoUrlArr: []
    }
  },
  created() {
    this.publicIp = process.env.VUE_APP_BASE_API
    this.stepCode = this.thisDetail.qxStatus
    //  stepCode: 1, // 审核阶段： 2：缺陷未审核 3：缺陷已审核  待 验收  4：已验收
    registerCheck(this.thisDetail.objId).then(res => {
      // table
      this.tableData = res.data.rows
    })

    getBz().then(res => {
      this.selection2.bzSelectArr = res.data.data
    })

    // 获取处理信息
    if (this.stepCode >= 2) {
      // 取基本数据
      this.ruleForm = this.thisDetail
      this.ruleForm.ifDispatch = '' + this.thisDetail.ifDispatch
      this.ruleForm.ifCondition = '' + this.thisDetail.ifCondition

      this.nodeActive = this.thisDetail.currentNode - 1
      if(!!this.ruleForm.beforePhotoUrl)
      this.photoUrl = this.ruleForm.beforePhotoUrl.split(',')
    }
    if (this.stepCode >= 3) {
      // 取审核数据
      this.ruleForm2 = this.thisDetail
      if(!!this.ruleForm2.afterPhotoUrl)
      this.afterPhotoUrlArr = this.ruleForm2.afterPhotoUrl.split(',')
    }
    if (this.stepCode >= 4) {
      // 查看  取验收数据
      this.ruleForm3 = this.thisDetail
      if(!!this.ruleForm3.acceptPhotoUrl)
      this.acceptPhotoUrlArr = this.ruleForm3.acceptPhotoUrl.split(',')
    }

    if (this.stepCode != 4 && this.isCheck) {
      this.stepCode = this.thisDetail.qxStatus - 1
    }
  },
  methods: {
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
        if (val.code == 0) this.afterPhotoUrlArr.push(val.msg)
      })
    },
    handleChnage(event) {
      // if (this.stepCode >= 3) {
      //   window.location.href = this.publicIp + '/' + this.thisDetail.handlePlan
      //   return false
      // }
      let file = event.target.files[0]
      this.handleName = file.name
      this.upLoadImages(file, val => {
        if (val.code == 0) this.handlePlan = val.msg
      })
    },
    annexChnage(event) {
      if (this.stepCode >= 3) {
        window.location.href = this.publicIp + '/' + this.thisDetail.annex
        return false
      }
      let file = event.target.files[0]
      this.annexName = file.name
      this.upLoadImages(file, val => {
        if (val.code == 0) this.annex = val.msg
      })
    },
    showBig(url) {
      this.dialogVisible = true
      this.dialogImageUrl = process.env.VUE_APP_BASE_API + url
    },
    delImg(ind) {
      this.afterPhotoUrlArr.splice(ind, 1)
    },
    showBig3(url) {
      this.dialogVisible = true
      this.dialogImageUrl = process.env.VUE_APP_BASE_API + url
    },
    delImg3(ind) {
      this.acceptPhotoUrlArr.splice(ind, 1)
    },
    upLoadvisibleLight3(event) {
      //
      let file = event.target.files[0]
      this.upLoadImages(file, val => {
        if (val.code == 0) this.acceptPhotoUrlArr.push(val.msg)
      })
    },
    /**
     * 取消按钮
     */
    handleClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('childFn', {
            showDialog: false
          })
        })
        .catch(_ => {})
    },
    /**
     * 确认按钮
     */
    SuerFun() {
      this.$refs['ruleForm' + this.stepCode].validate(valid => {
        if (valid) {
          let commitData = {}
          if (this.stepCode == 2) {
            this.ruleForm2.afterPhotoUrl = this.afterPhotoUrlArr.join(',')
            commitData = {
              ...this.ruleForm2,
              objId: this.thisDetail.objId,
              annex: this.annex,
              handlePlan: this.handlePlan,
              qxStatus: 3
            }
          } else {
            this.ruleForm3.acceptPhotoUrl = this.acceptPhotoUrlArr.join(',')
            commitData = {
              ...this.ruleForm3,
              objId: this.thisDetail.objId,
              qxStatus: 4
            }
            if (this.ruleForm3.ifQualified == 0) delete commitData.qxStatus
          }
          registerEdit(commitData).then(res => {
            let val = res.data
            let type = val.code == 0 ? 'success' : 'error'
            this.$message({ type, message: val.msg })
            if (val.code == 0)
              this.$emit('childFn', {
                showDialog: false
              })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 下载三联
    downloadIamge(imgsrc, name) {
      //下载图片地址和图片名
      var image = new Image()
      // 解决跨域 Canvas 污染问题
      image.setAttribute('crossOrigin', 'anonymous')
      image.onload = function() {
        var canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        var context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        var url = canvas.toDataURL('image/png') //得到图片的base64编码数据

        var a = document.createElement('a') // 生成一个a元素
        var event = new MouseEvent('click') // 创建一个单击事件
        a.download = name || 'photo' // 设置图片名称
        a.href = url // 将生成的URL设置为a.href属性
        a.dispatchEvent(event) // 触发a的单击事件
      }
      image.src = imgsrc
    },
    downs(url, name) {
      console.log(url)
      //  this.downloadIamge(url, name)
      //  window.location.href = url
      var suffixIndex = url.lastIndexOf('.')

      var suffix = url.substring(suffixIndex + 1).toUpperCase()
      if (
        suffix == 'BMP' ||
        suffix == 'JPG' ||
        suffix == 'JPEG' ||
        suffix == 'PNG' ||
        suffix == 'GIF'
      ) {
        this.downloadIamge(url, name)
      } else {
        window.location.href = url
      }
      // <a :href="this.publicIp + this.thisDetail.handlePlan" @click="downs"></a>
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
.uploadBtn {
  position: relative;
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
  }
}
</style>
