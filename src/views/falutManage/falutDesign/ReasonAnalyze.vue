<template>
  <div  class="hastitle">
    <el-dialog
      :visible.sync="showDialog"
      title="原因分析"
      v-dialogDrag
      :center="true"
      top="2vh"
      :before-close="handleClose"
    >
      <!--{{clickID}}-->
      <!--表单-->
      <el-form
        ref="dataForm"
        :model="form"
        label-position="left"
        style="width:100% ;margin: 0 auto;"
      >
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">故障{{$xl}}名称：</label>
            <el-input v-model="form.gzxlmc" disabled />
          </div>`
          <div class="form-item">
            <label class="form-label">所属{{$dl}}：</label>
            <el-input v-model="form.ssdlmc" disabled />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">{{$dydj}}：</label>
            <el-input v-model="form.dydj" disabled />
          </div>
          <div class="form-item">
            <label class="form-label">故障{{$xb}}：</label>
            <el-input v-model="form.gzxb" disabled />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">设备类型：</label>
            <el-input v-model="form.sblx" disabled />
          </div>
          <div class="form-item">
            <label class="form-label">故障损失情况：</label>
            <el-input v-model="form.gzssqk" disabled />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">故障设备名称：</label>
            <el-input v-model="form.gzsbmc" disabled />
          </div>
          <div class="form-item">
            <label class="form-label">故障设备运维班组：</label>
            <el-input v-model="form.yybz" disabled />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">故障发生时间：</label>
            <el-input v-model="form.gzfssj" disabled />
          </div>
          <div class="form-item">
            <label class="form-label">接到通知时间：</label>
            <el-input v-model="form.jdtzsj" disabled />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">故障点查找时间：</label>
            <el-input v-model="form.gzczsj" disabled />
          </div>
          <div class="form-item">
            <label class="form-label">故障时段天气：</label>
            <el-input v-model="form.gzsdtq" disabled />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">重合闸动作情况：</label>
            <el-input v-model="form.chdzqk" disabled />
          </div>
          <div class="form-item">
            <label class="form-label">故障定位信息描述：</label>
            <el-input v-model="form.gzdwms" disabled />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label" style="line-height: 22px">故障定位信息X坐标：</label>
            <el-input v-model="form.gzdwx" disabled />
          </div>
          <div class="form-item">
            <label class="form-label" style="line-height: 22px">故障定位信息Y坐标：</label>
            <el-input v-model="form.gzdwy" disabled />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">故障性质：</label>
            <el-input v-model="form.gzxz" disabled />
          </div>
          <div class="form-item">
            <label class="form-label">故障情况：</label>
            <el-input v-model="form.gzqk" disabled />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">故障类别：</label>
            <el-input v-model="form.gzlb" disabled />
          </div>
          <div class="form-item">
            <label class="form-label">故障级别：</label>
            <el-input v-model="form.gzjb" disabled />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">成本损失级别：</label>
            <el-input v-model="form.cbssjb" disabled />
          </div>
          <div class="form-item">
            <label class="form-label">人身损失级别：</label>
            <el-input v-model="form.rsssjb" disabled />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">环境损失级别：</label>
            <el-input v-model="form.hjssjb" disabled />
          </div>
          <div class="form-item">
            <label class="form-label">电网损失级别：</label>
            <el-input v-model="form.dwssjb" disabled />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">应对措施：</label>
            <el-input v-model="form.ydcs" disabled />
          </div>
          <div class="form-item">
            <label class="form-label">登记部门名称：</label>
            <el-input v-model="form.djbmmc" disabled />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">当值值班长：</label>
            <el-input v-model="form.zbz" disabled />
          </div>
          <div class="form-item">
            <label class="form-label">故障点查找结果：</label>
            <el-input v-model="form.gzdczjg" disabled />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">故障简题：</label>
            <el-input v-model="form.gzjt" disabled />
          </div>
          <div class="form-item">
            <label class="form-label">是否跳闸：</label>
            <el-input v-model="form.sftz" disabled />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">故障跳闸时间：</label>
            <el-input v-model="form.gztzsj" disabled />
          </div>
          <div class="form-item">
            <label class="form-label">自动装置动作情况：</label>
            <el-input v-model="form.zdzzqk" disabled />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">故障损失负荷：</label>
            <el-input v-model="form.gzssfh" disabled />
          </div>
          <div class="form-item">
            <label class="form-label">故障是否越级：</label>
            <el-input v-model="form.gzsfyj" disabled />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">故障停运范围：</label>
            <el-input v-model="form.gztyfw" disabled />
          </div>
          <div class="form-item">
            <label class="form-label">所属单位名称：</label>
            <el-input v-model="form.ssdwmc" disabled />
          </div>
        </div>
        <!--<div class="Form-input">-->
          <!--<div class="form-item">-->
            <!--<label class="form-label">故障类型：</label>-->
            <!--<el-input v-model="form.gzlx" disabled />-->
          <!--</div>-->
        <!--</div>-->
      </el-form>
      <div class="RAmidButton">
        <!--隐患-->
        <el-button class="onSearch" @click="showYhxxDia">查看隐患信息</el-button>
        <el-dialog
          :visible.sync="showDialog_yhxx"
          title="隐患信息"
          v-dialogDrag
          :center="true"
          :modal="false"
        >
          <el-table
            :data="tableData_yhxx"
            style="border: 1px solid #c7c7c7"
            :cell-style="{borderColor: '#c7c7c7'}"
            :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}"
            border
            fit
            highlight-current-row
          >
            <el-table-column type="index" label="序号" width="60" align="center" />
            <!-- <el-table-column prop="name" label="运维单位" align="center"></el-table-column> -->
            <el-table-column v-for="item in tableTitle" :key="item.index" :prop="item.prop" :label="item.label" align="center" min-width="200" />
            <el-table-column align="center" label="操作" class-name="small-padding fixed-width" min-width="150" fixed="right">
              <template slot-scope="scope">
                <el-col style="text-align: center;">
                  <el-button class="onSearch" size="small" @click="ViewFun(scope.row)">查看</el-button>
                </el-col>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
        <!--缺陷-->
        <el-button class="onSearch" style="margin-left: 80px" @click="showQxxxDia">查看缺陷信息</el-button>
        <el-dialog
          :visible.sync="showDialog_qxxx"
          title="缺陷信息"
          v-dialogDrag
          :center="true"
          :modal="false"
          class="qxxxDialog"
        >
          <!--数据列表-->
          <el-table
            border
            stripe
            :data="tableData_qxxx"
            style="border: 1px solid #c7c7c7"
            :cell-style="{borderColor: '#c7c7c7'}"
            :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}"
            highlight-current-row
          >
            <!--表格列-->
            <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
            <el-table-column prop="qxNumber" label="缺陷编号" min-width="160"></el-table-column>
            <el-table-column prop="discoveryTime" label="发现时间" min-width="160"></el-table-column>
            <el-table-column prop="voltageRank" :label="`${$dydj}`" min-width="120"></el-table-column>
            <el-table-column prop="qxGrade" label="缺陷等级" min-width="120"></el-table-column>
            <el-table-column prop="lineName" :label="`${$xl}`" min-width="150"></el-table-column>
            <el-table-column prop="dlName" :label="`缺陷${$dl}`" min-width="180"></el-table-column>
            <el-table-column prop="channelName" label="通道" min-width="80"></el-table-column>
            <el-table-column prop="channelJdName" label="通道段/井" min-width="150"></el-table-column>
            <el-table-column prop="groupName" label="发现班组" min-width="120"></el-table-column>
            <el-table-column prop="userName" label="发现人" min-width="90"></el-table-column>
            <el-table-column prop="discoveryMethod" label="发现方式" min-width="120"></el-table-column>
            <el-table-column prop="bj" label="缺陷部件" min-width="120"></el-table-column>
            <el-table-column prop="bw" label="缺陷部位" min-width="120"></el-table-column>
            <el-table-column prop="longitude" label="经度" min-width="120"></el-table-column>
            <el-table-column prop="latitude" label="纬度" min-width="120"></el-table-column>
            <el-table-column prop="currentNodeName" label="当前节点" min-width="120"></el-table-column>
            <!-- <el-table-column prop="processingStatus" label="处理状态" min-width="120"></el-table-column> -->
            <el-table-column prop="currentHandlerName" label="当前处理人" min-width="150"></el-table-column>
            <el-table-column prop="xqContent" label="缺陷内容" min-width="120"></el-table-column>
            <el-table-column fixed="right" label="操作" width="120" align="center">
              <template slot-scope="scope">
                <el-button class="onSearch" type="primary" size="mini" @click="CheckBtn(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>

      </div>
      <el-form
        ref="dataForm"
        :model="add"
        label-position="left"
        style="width:100% ;margin: 0 auto;"
      >
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">故障类型：</label>
            <el-input v-model="add.gzlx" disabled />
            <!--<el-select v-model="add.gzlx" clearable placeholder="请选择" disabled>-->
              <!--<el-option-->
                <!--v-for="item in selection.gzlx"-->
                <!--:key="item.bzid"-->
                <!--:label="item.bzmc"-->
                <!--:value="item.bzmc"-->
              <!--&gt;</el-option>-->
            <!--</el-select>-->
          </div>
          <div class="form-item">
            <label class="form-label">原因类型：</label>
            <!--<el-input v-model="add.yylx" clearable />-->
            <el-select v-model="add.yylx" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.yylx"
                :key="item.bzid"
                :label="item.bzmc"
                :value="item.bzmc"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">故障原因：</label>
            <!--<el-input v-model="add.gzyy" clearable />-->
            <el-select v-model="add.gzyy" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.gzyy"
                :key="item.bzid"
                :label="item.bzmc"
                :value="item.bzmc"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label" style="width: 31%;">故障分析报告：</label>
            <!--<el-button>点击上传</el-button>-->
            <el-upload
              :action="actionReport"
              with-credentials
              :http-request="httpRequestReport"
              :file-list="fileListReport"
              :on-exceed="onExceed"
            >
              <el-button class="onSearch" size="small">点击上传</el-button>
            </el-upload>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item" style="height: auto">
            <label class="form-label" style="width: 15%;font-size: 14px;">现场图片：</label>
            <el-upload
              v-if="!add.xczp"
              ref="imgBroadcastUpload"
              :auto-upload="true"
              :limit="1"
              :file-list="diaLogForm.imgBroadcastList"
              list-type="picture-card"
              :on-change="imgBroadcastChange"
              :on-success="upImgSuccess"
              :on-remove="imgBroadcastRemove"
              accept="image/jpg, image/png, image/jpeg"
              :action="xcPicUPloadUrl"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="add.xczp" alt />
            </el-dialog>
            <div class="imgCont" v-if="add.xczp">
              <img :src='add.xczp' alt="" style="width: 150px;height: 150px;">
              <div class="doImgBtn">
                <i class="el-icon-delete del" @click="delImg()"></i>
              </div>
            </div>
            <!--<img-->
              <!--style="width: 150px;height: 150px;"-->
              <!--v-if="add.xczp"-->
              <!--:src="add.xczp"-->
              <!--alt="现场图片"-->
            <!--&gt;-->
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="saveAnalyze">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
    <!--查看缺陷信息-->
    <div v-if="isShowCheckAndSure">
      <CheckAndSure :selection='selection' :isCheck='true' @childFn="parentFn" :thisDetail='thisDetail' :title="thisTitle" />
    </div>
    <!--查看隐患信息-->
    <Viewcmp v-if="ProcessingReviewData.show==true&&selection&&ProcessingReviewData.Detailsdata" :open-i-d="openID2"
             :submitparameter="ProcessingReviewData" :selection="selection" @childFn="parentFnYH" />
  </div>
</template>

<script>
import CheckAndSure from '@/views/defect/register/CheckAndSure'
import Viewcmp from '@/views/six-prevention/information-audit/cmp/Viewcmp'
import { getSelectList,reasonInfo,analyzeInfo,uploadQxbg,reasonInfoAdd,reasonInfoEdit } from '@/api/faultManagement/faultDesign/faultDesign'
import {
  registerList as list,
} from '@/api/defect' // 缺陷信息
import {
  getList,
} from '@/api/Sixdefensemanagement/HiddenDangerReview' // 隐患信息

export default {
  name: "ReasonAnalyze",
  components: {
    CheckAndSure,
    Viewcmp
  },
  props: {
    /**
     * 接收是否打开页面
     */
    isShowDialog: {
      type: Boolean,
      default: false
    },
    clickID: {
      default: null
    }
  },
  data() {
    return {
      showDialog_yhxx: false, // 隐患信息弹窗
      tableData_yhxx: [{}], // 隐患信息列表
      openID2: 2, // 打开弹框的id值
      // 隐患信息表头
      tableTitle: [
        {
          label: '隐患编号',
          prop: 'hdidentifier',
          width:'200'
        },
        {
          label: this.$dydj,
          prop: 'dianYaName',
          width:'100'
        },
        {
          label: '隐患'+this.$xl,
          prop: 'linename',
          width:'200'
        },

        {
          label:this.$dl,
          prop: 'dianLanName',
          width:'280'
        },
        {
          label: '隐患地址',
          prop: 'findaddress',
          width:'300'
        },
        {
          label: '隐患设备类型',
          prop: 'sheBeiTypeName',
          width:'200'
        },
        {
          label: '隐患设备',
          prop: 'sheBeiName',
          width:'200'
        },
        {
          label: '处置状态',
          prop: 'chuzZhiZhuangTaiName',
          width:'100'
        },
        {
          label: '发现班组',
          prop: 'faXianBanZuName',
          width:'150'
        },
        {
          label: '发现人',
          prop: 'faXianRenName',
          width:'100'
        },
        {
          label: '发现方式',
          prop: 'faXianFangShiName',
          width:'100'
        },
        {
          label: '发现日期',
          prop: 'finddate',
          width:'200'
        },
        {
          label: '隐患源单位',
          prop: 'faXianYuanDanWeiName',
          width:'300'
        },
        {
          label: '隐患源联系人',
          prop: 'faXianYuanLanXiRenName',
          width:'100'
        },
        {
          label: '隐患联系电话',
          prop: 'telephone',
          width:'160'
        },
        {
          label: '隐患部位',
          prop: 'yinHuanBuWeiName',
          width:'200'
        },
        {
          label: '隐患类型',
          prop: 'liuFangName',
          width:'200'
        },
        {
          label: '隐患等级',
          prop: 'yinHuanDengJiName',
          width:'100'
        },
        {
          label: '隐患原因',
          prop: 'hdreason',
          width:'200'
        },
        {
          label: '当前节点',
          prop: 'dangQianJieDianName',
          width:'150'
        },
        {
          label: '当前处理人',
          prop: 'dangQianChuLiRenName',
          width:'100'
        }

      ],
      ProcessingReviewData: { // 隐患参数
        id: '3',
        show: false,
        Police: false,
        Detailsdata: {}
      },
      showDialog_qxxx: false, // 缺陷信息弹窗
      tableData_qxxx: [{}], // 缺陷信息列表
      isShowCheckAndSure: false,
      thisDetail: {},
      reasonParam: {
        gzdjid: ''
      },
      selection: {
        gzlx: [],
        yylx: [],
        gzyy: [],
      },
      idEdit: false, // 判断当前是编辑还是新增
      form: {},
      add: {
        id: '',
        gzlx: '',
        yylx: '',
        gzyy: '',
        gzfxbg: '',
        xczp:  '',
        gzdjid: ''
      },
      xcPicUPloadUrl: process.env.VUE_APP_BASE_API + '/cable/file/upload?type=xctpImg',
      diaLogForm: {
        imgBroadcastList: [], // 储存选中的图片列表
        imgsStr: "" // 后端需要的多张图base64字符串 , 分割
      },
      dialogVisible: false,
      dialogImageUrl: "",
      showDialog: this.isShowDialog, //打开弹框
      actionReport: "#", // 上传分析报告
      fileListReport: [],
      qxbgLj: '', // 抢修报告路径
    }
  },
  watch: {
    isShowDialog(val) {
      this.showDialog = val;
    }
  },
  created() {
    getSelectList('故障类型').then(response => {
      // //console.log(response);
      this.selection.gzlx = response.data.rows
    })
    getSelectList('故障原因类型').then(response => {
      // //console.log(response);
      this.selection.yylx = response.data.rows
    })
    getSelectList('故障原因').then(response => {
      // //console.log(response);
      this.selection.gzyy = response.data.rows
    })
  },
  mounted() {
    // this.getReasonInfo()
  },
  methods: {
    // 隐患信息弹出框
    showYhxxDia() {
      this.showDialog_yhxx = true
      let yhxxParam = {lineid:this.form.gzxlid,status:1} // 默认查流程结束的
      getList(this.$qs.stringify(yhxxParam)).then(response => {
        console.log(response);
        if (response.status == 200) {
          this.tableData_yhxx = response.data.rows[0].dataList //数据值
        }
      })
    },
    // 隐患查看
    ViewFun(row) {
      this.ProcessingReviewData.Detailsdata = row
      this.ProcessingReviewData.starts = 0
      this.ProcessingReviewData.Police = true
      this.ProcessingReviewData.show = true
    },
    // 缺陷信息弹出框
    showQxxxDia() {
      this.showDialog_qxxx = true
      console.log(this.form.gzxlid)
      // 获取列表数据
      let qxxxParam = {lineId:this.form.gzxlid}
      list(qxxxParam).then(res => {
        console.log(res);
        this.tableData_qxxx = res.data.rows
      })
    },
    // 缺陷查看
    CheckBtn(val) {
      // 查看
      this.isShowCheckAndSure = true
      this.thisTitle = '查看'
      this.thisDetail = val
      // this.isCheck = true
    },
    // 查询原因分析内容
    getReasonInfo(id) {
      this.reasonParam.gzdjid = id
      this.add.gzdjid = id
      //console.log(this.reasonParam);
      reasonInfo(this.reasonParam).then(response => {
        //console.log(response);
        if(response.status == 200) {
          this.form = response.data.data
        } else if(response.status == 500) {
          this.form = {}
        }
      })
    },
    // 根据id查询原因分析（回显）
    getAnalyzeInfo(id) {
      this.reasonParam.gzdjid = id
      //console.log(this.reasonParam);
      analyzeInfo(this.reasonParam).then(response => {
        //console.log(response);
        if(response.status == 200 && response.data.code == 0) {
          this.add = response.data.data
          this.add.gzlx = this.form.gzlx
          if (this.add.id != null) {
            this.isEdit = true
          } else {
            this.isEdit = false
          }
        }
      })
    },
    // 上传检修报告
    httpRequestReport(param) {
      let formData = new FormData();
      formData.append("file",param.file);
      formData.append("type","repairReportList");
      uploadQxbg(formData).then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.$message({
            message: '上传成功',
            type: 'success'
          })
          // this.qxbgLj = response.data.msg
          this.add.gzfxbg =  response.data.msg
          // let qxdUrl = {
          //   gzfxbg: response.data.msg,
          //   id: this.clickID
          // }
          // //console.log(qxdUrl);
          // uploadAndSaveQxbg(this.$qs.stringify(qxdUrl)).then(res => {
          //   //console.log(res);
          // })
        } else {
          this.$message({
            message: '上传失败',
            type: 'error'
          })
        }
      })
    },
    onExceed(file, fileList) {
      //console.log(fileList);
    },
    // 图片选择后 保存在 diaLogForm.imgBroadcastList 对象中
    imgBroadcastChange(file, fileList) {
      //console.log(file);
      //console.log(fileList);
      // this.diaLogForm.imgBroadcastList.push(file);
      // const isLt2M = file.size / 1024 / 1024 < 5; // 上传图片大小不能超过 5MB
      // if (!isLt2M) {
      //   this.diaLogForm.imgBroadcastList = fileList.filter(
      //     v => v.uid !== file.uid
      //   );
      //   this.$message.error(
      //     "图片选择失败，每张图片大小不能超过 5MB,请重新选择!"
      //   );
      // } else {
      //
      // }
    },
    upImgSuccess(res, file,) {
      //console.log(res);
      this.add.xczp = process.env.VUE_APP_BASE_API + res.msg
      //console.log(file);
    },
    // 有图片移除后 触发
    imgBroadcastRemove(file, fileList) {
      //console.log(file);
      //console.log(fileList);
      this.diaLogForm.imgBroadcastList = fileList;
    },
    delImg(ind) {
      this.add.xczp = ''
    },
    // 保存原因分析
    saveAnalyze() {
      this.add.gzdjid = this.clickID
      //console.log(this.isEdit);
      if (this.isEdit == false) {
        reasonInfoAdd(this.$qs.stringify(this.add)).then(response => {
          //console.log(response);
          if(response.status == 200 && response.data.code == 0) {
            this.$message({
              message: '新增成功',
              type: 'success'
            })
            this.showDialog = false
            this.form = { brand_right: 0 }
            this.$emit("childFn", {
              showDialog: this.showDialog,
            })
            this.$parent.getList()
          } else {
            this.$message({
              message: response.data.msg,
              type: 'warning'
            })
          }
        })
      } else if (this.isEdit == true) {
        reasonInfoEdit(this.$qs.stringify(this.add)).then(response => {
          //console.log(response);
          if(response.status == 200 && response.data.code == 0) {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.showDialog = false
            this.form = { brand_right: 0 }
            this.$emit("childFn", {
              showDialog: this.showDialog,
            })
            this.$parent.getList()
          } else {
            this.$message({
              message: response.data.msg,
              type: 'warning'
            })
          }
        })
      }

    },
    // 缺陷信息的关闭
    parentFn(val) {
      this.isShowCheckAndSure = false
    },
    // 隐患信息关闭
    parentFnYH() {
      this.ProcessingReviewData.show = false
    },
    /**
     * 取消按钮
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.showDialog = false;
          this.form = { brand_right: 0 }
          this.$emit("childFn", {
            showDialog: this.showDialog,
          });
          done();
        })
        .catch(_ => {});
    },
  }
}
</script>

<style lang="scss" scoped>
  .qxxxDialog /deep/{
    .hastitle .el-dialog__body{
      padding-bottom: 20px;
    }
  }

</style>
<style lang="scss">
  .main-body{
    height: auto;
  }
  .form-item input{
    width: 100%;
  }
  .hastitle .Form-input .form-item .form-label{
    font-size: 14px;
  }
  .RAmidButton{
    display: flex;
    justify-content: center;
    margin: 30px 0 40px 0;
  }
</style>
