<template>
  <!--缺陷登记表单弹框-->
  <div class="xs-hastitle whitedisable_mm">
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-dialog :title="title" :visible.sync="allshowDialog" :close-on-click-modal="false" width="1060px" center :before-close="handleClose">
      <!--表单-->
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-position="right" label-width="100px">
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
            <el-table-column label="审批结果">
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
          <div class='mm_alart' v-if='ruleForm.qxType==0'>
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
         <!--  <div class='mm_alart' v-if='ruleForm.qxType==0'>
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
            <el-form-item label="通道列表" prop="channelName">
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
          <!-- <el-form-item class="showpic" v-for="(img,ind) in photoUrl" :key="ind">
            <img style="height:100%" :src='publicIp+img' alt="">
            <div class="doImgBtn">
              <i class="el-icon-zoom-in big" @click="showBig(img)"></i>
            </div>
          </el-form-item> -->
          <div v-for="(img,ind) in photoUrl" :key="ind" class="imgCont">
            <img :src='publicIp+img' alt="">
            <div class="doImgBtn">
              <i class="el-icon-zoom-in big" @click="showBig(img)"></i>
            </div>
          </div>
        </div>
        <h3 class="modelTitle">是否具备处置条件</h3>
        <div class="inputCont_mm">
          <div class='mm_alart'>
            <el-form-item prop="ifCondition">
              <el-radio-group v-model="ruleForm.ifCondition">
                <el-radio label="1" disabled>是</el-radio>
                <el-radio label="0" disabled>否</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div v-if="!isCheck">
        <h3 class="modelTitle">选择下一步</h3>
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="140px" class="required-ruleForm flexThird">
          <div class="inputCont_mm">
            <div class='mm_alart'>
              <el-form-item label="审批结果" prop="approvalResult	">
                <el-radio-group v-model="ruleForm2.approvalResult	" @change="isSureBtn">
                  <el-radio label="1">同意</el-radio>
                  <el-radio label="0">不同意</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
          <el-form-item label="指定班组" prop="groupId">
            <el-select v-model="ruleForm2.groupId" class="form-item-select" @change="bzChange" :disabled="ruleForm2.approvalResult == 0">
              <el-option v-for="item in selection2.bzSelectArr" :key="item.group_id" :label="item.group_name" :value="item.group_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下一审批人" prop="handlerId">
            <el-select v-model="ruleForm2.handlerId" class="form-item-select" :disabled="ruleForm2.approvalResult == 0">
              <el-option v-for="item in selection2.fxrSelectArr" :key="item.user_id" :label="item.user_name" :value="item.user_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审批意见" prop="approvalAdvise" style="width:100%">
            <el-input v-model="ruleForm2.approvalAdvise" type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer" v-if="!isCheck">
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
  kqlc // 审批
} from '@/api/defect'
export default {
  props: {
    title: '',
    thisDetail: {},
    isCheckBg: false,
    isCheck: true
  },
  components: {},
  data() {
    return {
      publicIp: '',
      tDList: [],
      tableData: [],
      nodeActive: 0,
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
        groupId: '', // 发现班组
        groupName: '',
        handlerId: '', // 发现人
        handlerName: '',
        objId: '', //  缺陷ID
        approvalResult: '1', // 审批结果 radio
        approvalAdvise: '' // 意见
      },
      rules2: {
        groupId: [
          { required: true, message: '指定班组不能为空', trigger: 'change' }
        ],

        handlerId: [
          { required: true, message: '下一审批人不能为空', trigger: 'blur' }
        ],
        approvalAdvise: [
          { required: true, message: '审批意见不能为空', trigger: 'blur' }
        ]
      },
      selection2: {
        bzSelectArr: [], // 发现班组
        fxrSelectArr: [] // 发现人
      }
    }
  },
  created() {
    this.publicIp = process.env.VUE_APP_BASE_API
    registerCheck(this.thisDetail.objId).then(res => {
      // table
      this.tableData = res.data.rows
    })
    getBz().then(res => {
      this.selection2.bzSelectArr = res.data.data
    })
    this.ruleForm = this.thisDetail
    console.log(JSON.stringify(this.thisDetail))
    this.ruleForm.ifDispatch = '' + this.thisDetail.ifDispatch
    this.ruleForm.ifCondition = '' + this.thisDetail.ifCondition

    this.nodeActive = this.thisDetail.currentNode - 1
    if(!!this.ruleForm.beforePhotoUrl)
    this.photoUrl = this.ruleForm.beforePhotoUrl.split(',')
  },
  methods: {
    bzChange(e) {
      this.ruleForm2.userId = ''
      getFxr(e).then(res => {
        if (res.data.code == 0) {
          this.selection2.fxrSelectArr = res.data.data
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
    isSureBtn(e) {
      // 审批结果 同意 / 不同意
      if (e == 0) {
        this.ruleForm2.groupId = this.thisDetail.beforeGroupId
        this.ruleForm2.userId = ''
        getFxr(this.ruleForm2.groupId).then(res => {
          if (res.data.code == 0) {
            this.selection2.fxrSelectArr = res.data.data
            this.ruleForm2.handlerId = this.thisDetail.beforeHandlerId
          }
        })
      }
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
      this.ruleForm.beforePhotoUrl = this.photoUrl.join(',')
      this.$refs['ruleForm2'].validate(valid => {
        if (valid) {
          this.setSelectId([
            {
              selectArr: this.selection2.bzSelectArr,
              ruleFormName: 'groupName',
              ruleFormId: 'groupId',
              filterName: 'group_name',
              filterId: 'group_id'
            },
            {
              selectArr: this.selection2.fxrSelectArr,
              ruleFormName: 'handlerName',
              ruleFormId: 'handlerId',
              filterName: 'user_name',
              filterId: 'user_id'
            }
          ])

          kqlc({ ...this.ruleForm2, objId: this.thisDetail.objId }).then(
            res => {
              let val = res.data
              let type = val.code == 0 ? 'success' : 'error'
              this.$message({ type, message: val.msg })
              if (val.code == 0)
                this.$emit('childFn', {
                  showDialog: false
                })
            }
          )
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    setSelectId(setArr) {
      /* [{
         selectArr:[],
         ruleFormName:'',
         ruleFormId:'',
         filterName:'',
         filterId:'',
       }]*/

      setArr.forEach(element => {
        let arr = element.selectArr.filter(res => {
          return res[element.filterId] == this.ruleForm2[element.ruleFormId]
        })

        this.ruleForm2[element.ruleFormName] = arr[0][element.filterName]
          ? arr[0][element.filterName]
          : ''
      })
    },
    showBig(url) {
      this.dialogVisible = true
      this.dialogImageUrl = process.env.VUE_APP_BASE_API + url
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
