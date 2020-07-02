<template>
  <!-- <h2>新增流程</h2> -->
  <div class="hastitle">
    <el-dialog
      :visible.sync="showDialog"
      :title="title"
      v-dialogDrag
      :center="true"
      top="5vh"
      width="60%"
      :before-close="handleClose"
    >
      <!-- :rules="rules" -->
      <el-form
        ref="formrules"
        :model="addlist"
        label-position="right"
        style="width:100% ;margin: 0 auto;"
      >
        <div style="width:60%;margin: auto;">
          <el-steps :active="active">
            <el-step title="录入" icon="el-icon-edit"></el-step>
            <el-step title="领导审核" icon="el-icon-upload"></el-step>
            <el-step title="结束" icon="el-icon-picture"></el-step>
          </el-steps>
        </div>
        <div class="Form-title">
          <div class="form-item">
            <label class="form-title">流程履历</label>
          </div>
        </div>
        <el-table
          :data="lctable"
          style="border: 1px solid #c7c7c7;margin-bottom: 1.5rem"
          :cell-style="{borderColor: '#c7c7c7'}"
          :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}"
          border
          fit
          highlight-current-row
        >
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column prop="jdmc" label="节点名称" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.jdmc==1?"录入":scope.row.jdmc==2?"审核":scope.row.jdmc==3?"结束":""}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="clrmc" label="处理人" align="center"></el-table-column>
          <el-table-column prop="bzmc" label="处理班组" align="center"></el-table-column>
          <el-table-column prop="kssj" label="开始时间" align="center"></el-table-column>
          <el-table-column prop="spyj" label="审批意见" align="center"></el-table-column>
        </el-table>
        <div class="Form-title">
          <div class="form-item">
            <label class="form-title">基础意见</label>
          </div>
        </div>
        <div class="Form-input">
          <el-form-item prop="yj" style="width:100%">
            <div style="width: 100%;">
              <p>
                <!-- <span style="color: red">*</span> -->
                意见：
              </p>
              <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="addlist.yj"></el-input>
            </div>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="是否跳过次阶段" prop="sftgcjd" label-width="130px" style="width:33%">
            <el-select v-model="addlist.sftgcjd" clearable placeholder="请选择" style="width:100%">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工程名称：" label-width="130px" style="width:66.6%" prop="gcmc">
            <el-input v-model="addlist.gcmc" clearable readonly />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="工程性质：" label-width="130px" style="width:33%" prop="gcxz">
            <el-input v-model="addlist.gcxz" clearable readonly />
          </el-form-item>
          <!-- <el-form-item label="工程属性：" label-width="130px" style="width:33%" prop="gcsx">
            <el-input v-model="addlist.gcsx" clearable readonly />
          </el-form-item>-->
          <el-form-item :label="`${$dydj}：`" label-width="130px" style="width:33%" prop="dydj">
            <el-input v-model="addlist.dydj" clearable readonly />
          </el-form-item>
          <el-form-item style="width:33%" />
        </div>
        <div class="Form-input">
          <el-form-item label="设计单位：" label-width="130px" style="width:33%" prop="sjdw">
            <el-input v-model="addlist.sjdw" clearable />
          </el-form-item>
          <el-form-item label="参与人员：" label-width="130px" style="width:33%" prop="cyry">
            <el-input v-model="addlist.cyry" clearable />
          </el-form-item>
          <el-form-item label="参与时间：" label-width="130px" style="width:33%">
            <el-date-picker
              style="width:100%"
              v-model="addlist.cysj"
              format="yyyy-MM-dd"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择日期"
            />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="负责班组：" label-width="130px" style="width:33%" prop="bzid">
            <el-select
              v-model="addlist.bzmc"
              clearable
              placeholder="请选择"
              style="width:100%"
              value-key="groupname"
              @change="getJcrList"
            >
              <el-option
                v-for="item in group"
                :key="item.objId"
                :label="item.groupname"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="`${$dl}规模(米)：`" label-width="130px" style="width:33%" prop="dlgm">
            <el-input v-model="addlist.dlgm" clearable />
          </el-form-item>
          <el-form-item label="通道规模(米)：" label-width="130px" style="width:33%" prop="tdgm">
            <el-input v-model="addlist.tdgm" clearable />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="备注：" label-width="130px" style="width:100%">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="addlist.bz"></el-input>
          </el-form-item>
        </div>
        <div
          style="text-align: right;margin-bottom: 1.5rem;display: flex;justify-content: flex-end;"
        >
          <el-button class="UserSearchFun" @click="exportFn">管控卡导出</el-button>
          <el-button class="UserSearchFun" @click="AddnewBc">新增补充意见</el-button>
          <el-button class="UserSearchFun" @click="DelFun">删除选择意见</el-button>

          <el-upload
            class="upload-demo"
            :action="actionReport"
            :auto-upload="false"
            :on-exceed="onExceed"
            :before-upload="beforeUpload"
            :on-preview="handlePreview"
            :on-success="handleSuccess"
            :on-remove="hadndleRemove"
            :with-credentials="false"
            :on-change="change"
            v-if="!isupload"
            style="margin-right: 0.6em;margin-left: 0.6em;"
          >
            <el-button type="primary">选择附件</el-button>
          </el-upload>

          <el-button type="danger" v-if="!isupload" @click="DelFj">删除附件</el-button>
          <el-button type="primary" v-if="isupload" @click="uploadSure">上传附件</el-button>
          <el-button type="danger" v-if="isupload" @click="uploadQX">取消附件上传</el-button>
        </div>
        <div class="Form-input" style="justify-content: flex-end;">
          <el-form-item label="附件名称：" label-width="130px" style="width:40%">
            <div>{{fileName.length>0?fileName[0]["name"]:''}}</div>
          </el-form-item>
        </div>
        <div class="Form-title">
          <div class="form-item">
            <label class="form-title">附件</label>
          </div>
        </div>
        <div class="table" style="margin-bottom: 1.5rem;">
          <el-table
            :data="fjdata"
            style="border: 1px solid #c7c7c7;margin-bottom: 1.5rem"
            :cell-style="{borderColor: '#c7c7c7'}"
            :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}"
            border
            fit
            highlight-current-row
            @selection-change="CheckFunFJ"
          >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" prop label="序号" width="60" align="center" />
            <el-table-column prop="wjmc" label="文件名称" align="center" />
            <!-- <el-table-column prop="wjlj" label="文件类型" align="center" /> -->
            <el-table-column prop label="操作" align="center" width="100">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="downFJ(scope.row)">下载</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="Form-title">
          <div class="form-item">
            <label class="form-title">规章规程</label>
          </div>
        </div>
        <div class="Form-input">
          <el-form-item label="查看规章规程：" label-width="130px" style="width:40%">
            <el-input v-model="wjmc">
              <i
                slot="suffix"
                @click="Gzview"
                class="el-input__icon el-icon-search"
                style="color: #2E8388;cursor: pointer;"
              ></i>
            </el-input>
          </el-form-item>
        </div>
        <el-table
          :data="gztable"
          style="border: 1px solid #c7c7c7;margin-bottom: 1.5rem"
          :cell-style="{borderColor: '#c7c7c7'}"
          :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}"
          border
          fit
          highlight-current-row
        >
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column prop="wjmc" label="文件名称" align="center"></el-table-column>
          <el-table-column prop="wjxh" label="文件序号" align="center"></el-table-column>
          <el-table-column prop="wjlxmc" label="资料类型" align="center"></el-table-column>
          <el-table-column prop="syxm" label="实验项目" align="center"></el-table-column>
          <el-table-column prop="gjz" label="关键字" align="center"></el-table-column>
          <el-table-column prop="wjdx" label="文件大小(KB)" align="center"></el-table-column>
          <el-table-column prop="scry" label="上传人员" align="center"></el-table-column>
          <el-table-column prop="scsj" label="上传时间" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.scsj | format('yyyy-MM-dd')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="备注" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button class="onSearch" size="small" @click="down(scope.row)">下载文件</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="Form-title">
          <div class="form-item">
            <label class="form-title">补充意见</label>
          </div>
        </div>
        <el-table
          :data="bcyj"
          style="border: 1px solid #c7c7c7;margin-bottom: 1.5rem"
          :cell-style="{borderColor: '#c7c7c7'}"
          :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}"
          border
          fit
          highlight-current-row
          @selection-change="CheckFun"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column prop="nr" label="内容" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.nr" clearable placeholder="请输入内容" />
            </template>
          </el-table-column>
          <el-table-column prop="jyly" label="理由建议" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.jyly" clearable placeholder="请输入内容" />
            </template>
          </el-table-column>
          <el-table-column prop="cnqk" label="采纳情况" align="center">
            <template slot-scope="scope">
              <el-radio-group v-model="scope.row.cnqk">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column prop="ms" label="描述" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.ms" clearable placeholder="请输入内容" />
            </template>
          </el-table-column>
        </el-table>
        <div class="Form-title">
          <div class="form-item">
            <label class="form-title">管控卡</label>
          </div>
        </div>
        <!-- <el-popover placement="bottom" title="审查内容" width="200" trigger="manual" v-model="visible">
          <div v-html="content"></div>
          <div style="text-align: right; margin: 0">
            <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
          </div>
        </el-popover>-->
        <el-table
          :data="gkktable"
          style="border: 1px solid #c7c7c7;margin-bottom: 1.5rem"
          :cell-style="{borderColor: '#c7c7c7'}"
          :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}"
          border
          fit
          highlight-current-row
        >
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column prop="scxm" label="审查项目" align="center"></el-table-column>
          <el-table-column prop="scnr" label="审查内容" align="center">
            <template slot-scope="scope">
              <div class="TkFn" @click="TkFn(scope.row.scnr)">{{scope.row.scnr}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="scyj" label="审批意见" align="center">
            <template slot-scope="scope">
              <el-radio-group v-model="scope.row.scyj">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column prop="czwt" label="存在问题" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.czwt" clearable placeholder="请输入内容" />
            </template>
          </el-table-column>
          <el-table-column prop="bz" label="备注" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.bz" clearable placeholder="请输入内容" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="操作" align="center" width="280">
            <template slot-scope="scope">
              <el-button size="small" @click="ViewGKK(scope.row)">查看</el-button>
              <el-button size="small" plain @click="UpPiceGKK(scope.row)">上传图片</el-button>
              <el-button size="small" plain @click="viePiceGKK(scope.row)">查看图片</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" v-if="addbtn||editbtn" @click="SuerFun">保存</el-button>
        <el-button
          class="onSearch"
          v-if="isreadonly?false:addbtn||!editbtn||!isLc"
          @click="submitFn"
        >提交</el-button>
        <el-button class="UserSearchFun" v-if="editbtn&&isLc?true:false" @click="THFn">退回</el-button>
        <el-button class="onSearch" v-if="editbtn&&isLc?true:false" @click="TGFn">通过</el-button>
      </div>
    </el-dialog>
    <div class="hastitle">
      <el-dialog :visible.sync="tijiao" title="转下一步领导审核" v-dialogDrag top="25vh" width="25%">
        <el-form
          ref="formsubmit"
          :model="form"
          label-position="right"
          style="width:100% ;margin: 0 auto;"
        >
          <div class="Form-input">
            <el-form-item label="下一步班组" style="width:100%" label-width="130px">
              <el-select
                v-model="tj.bzid"
                value-key="objId"
                @change="tjbz"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in group"
                  :key="item.objId"
                  :label="item.groupname"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="Form-input">
            <el-form-item label="下一步操作人" style="width:100%" label-width="130px">
              <el-select
                v-model="tj.userid"
                value-key="objId"
                @change="tjczr"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in userinfo"
                  :key="item.objId"
                  :label="item.name"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <p>请选择节点 领导审核 的操作人</p>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="UserSearchFun" @click="submitFnQR">确认</el-button>
          <el-button class="onSearch" @click="submitFnQX">取消</el-button>
        </div>
      </el-dialog>
    </div>
    <el-dialog
      :visible.sync="visible"
      title="审查内容"
      v-dialogDrag
      :center="true"
      top="25vh"
      width="30%"
    >
      <div class="scnr-content" v-html="content"></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="visible = false">确定</el-button>
      </div>
    </el-dialog>
    <div v-if="isshowPic">
      <showPic
        @childFn="parentFn"
        :ispicadd="ispicadd"
        :openID="groundopenid"
        :sopenId="groundsonopneid"
        :objIdson="objIdson"
        :fawjmc="wjmc"
        :fawjlj="wjlj"
      />
    </div>
    <div v-if="isshowGKK">
      <GKKshow @childFn="parentGKKFn" :openGKK="openGKK" />
    </div>
  </div>
</template>

<script>
import {
  getList,
  group,
  BcyjList,
  LClist,
  Add,
  Gz,
  GKK,
  GKK_view,
  UserList,
  SubmitLc,
  GC
} from "@/api/productionReadiness/projectInformation/feasibilityResearch";
import qs from "qs";
import request from "@/utils/request";
import { ExportFn, CuploadFj, Listupload, downloadFJ } from "@/api/public";
import showPic from "./show";
import GKKshow from "./GKK_show";
export default {
  components: {
    showPic,
    GKKshow
  },
  props: {
    /**
     * 是否结束流程状态
     */
    isendtitle: {
      default: 1
    },
    /**
     * 接受流程状态
     */
    isLc: {
      type: Boolean,
      default: false
    },
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
    /**子表的id */
    sopenId: {
      default: null
    }
  },
  data() {
    return {
      // rules: {
      //   // change
      //   yj: [{ required: true, message: "请输入意见", trigger: "blur" }],
      //   gcmc: [{ required: true, message: "请输入工程名称", trigger: "blur" }],
      //   gcxz: [{ required: true, message: "请输入工程性质", trigger: "blur" }],
      //   gcsx: [{ required: true, message: "请输入工程属性", trigger: "blur" }],
      //   dydj: [{ required: true, message: "请输入DYDJ", trigger: "blur" }],
      //   sjdw: [{ required: true, message: "请输入设计单位", trigger: "blur" }],
      //   cyry: [{ required: true, message: "请输入参与人员", trigger: "blur" }],
      //   dlgm: [{ required: true, message: "请输入DL规模", trigger: "blur" }],
      //   tdgm: [{ required: true, message: "请输入通道规模", trigger: "blur" }],
      //   bzid: [
      //     { required: true, message: "请选择负责班组", trigger: "change" }
      //   ],
      //   sftgcjd: [
      //     { required: true, message: "请输入是否跳过此阶段", trigger: "change" }
      //   ]
      // },
      wjmc: null,
      wjlj: null,
      objIdson: null,
      isaddPic: false,
      ispicadd: false,
      isshowPic: false,
      groundopenid: null,
      groundsonopneid: null,
      visible: false,
      content: "",
      form: {
        sbmc: ""
      },
      tijiao: false,
      title: "",
      group: [],
      showDialog: this.isShowDialog, //打开弹框
      editbtn: this.isEdit, //是否是编辑按钮
      addbtn: this.isAdd, //是否是新增按钮
      wjmc: "",
      textarea: "",
      bcyj: [],
      tj: {
        bzid: {
          objId: ""
        },
        userid: {
          objId: ""
        }
      },
      userinfo: [],
      clckTime: 0,
      CheckedSelection: null,
      addlist: {
        gcmc: null,
        gcxz: null,
        gcsx: null,
        dydj: null,
        sjdw: null,
        cyry: null,
        cysj: null,
        bzid: null,
        bzmc: null,
        dlgm: null,
        jdmc: null,
        tdgm: null,
        objId: null,
        bz: null,
        yj: null,
        gcid: null,
        bcyjdata: [], //补充意见数据
        yjdata: [], //管控卡数据
        lcdata: [], //流程数据
        fjdata: []
      },
      lcdata: {
        objId: null,
        kxxyjid: "",
        sxh: "1",
        jdmc: "1",
        clrid: "",
        clrmc: "",
        bzid: "",
        bzmc: "",
        kssj: ""
      },
      //提交数据
      submitList: {
        objId: this.sopenId,
        kxxyjid: "",
        sxh: "",
        jdmc: null,
        clrid: "",
        clrmc: "",
        bzid: "",
        bzmc: "",
        kssj: "",
        lczt: 1,
        lcdata: {
          objId: null,
          kxxyjid: "",
          sxh: "1",
          jdmc: "1",
          clrid: "",
          clrmc: "",
          bzid: "",
          bzmc: "",
          kssj: ""
        }
      },

      isSuerFun: false,
      is_all: [
        { id: 1, qb: "是" },
        { id: 0, qb: "否" }
      ],

      group: [],
      lctable: [],
      gztable: [],
      gkktable: [],
      clearsopenId: this.sopenId,
      active: null,
      yj: [],
      fjdata: [],
      sxh: 0,
      actionReport: "#",
      fileList: [],
      isupload: false,
      fileName: [],
      fjselect: {
        zbid: this.openID,
        jd: 1
      },
      CheckedSelectionFJ: [],
      isshowGKK: false,
      openGKK: {}
    };
  },
  computed: {
    /**计算是否可读 */
    isreadonly() {
      return !(this.editbtn || this.addbtn);
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
    },
    sopenId(val) {
      this.clearsopenId = val;
    }
  },
  mounted() {},
  created() {
    this.uploadList();
    this.active = this.isendtitle;
    this.gkktable = [];
    /**获取班组列表 */
    group().then(res => {
      if (res.status == 200) {
        this.group = res.data.rows;
      }
    });
    if (this.isAdd) {
      this.title = "可研审查-新增流程";
      /**获取页面数据 */
      GC(qs.stringify({ objId: this.openID })).then(res => {
        this.addlist = res.data.rows[0];
      });
      /**新增的管控卡 */
      GKK_view(qs.stringify({ jdid: 1 })).then(res => {
        this.yj = res.data.rows;
        // this.gkktable = res.data.rows;
        let array = res.data.rows;
        //let newArr = [];
        array.forEach((element, i) => {
          let title = "scyj";
          let newobj = {
            sxh: i + 1,
            objId: null,
            scxm: element.xlb,
            scnr: element.nr,
            scyj: "1",
            czwt: "",
            bz: "",
            wjlj: "",
            wjmc: ""
          };
          this.gkktable.push(newobj);
        });

        //console.log(this.gkktable);
      });

      /**获取页面数据清空 */
      this.addlist = {
        gcmc: null,
        gcxz: null,
        gcsx: null,
        dydj: null,
        sjdw: null,
        cyry: null,
        cysj: null,
        bzid: null,
        dlgm: null,
        tdgm: null,
        bz: null,
        yj: null,
        sftgcjd: null,
        bcyjdata: [], //补充意见数据
        yjdata: [], //意见数据
        lcdata: [] //流程数据
      };
    } else if (this.isEdit) {
      this.title = "可研审查-处理流程";

      /**获取页面数据 */
      getList(qs.stringify({ objId: this.sopenId })).then(res => {
        this.addlist = res.data.rows[0];
        this.addlist.yj = null;
      });
      /**查询可行性研究流程履历列表 */
      LClist(qs.stringify({ kxxyjid: this.sopenId })).then(res => {
        //console.log(res.data.rows);
        this.lctable = res.data.rows;
      });
      /**查询立项中可行性研究补充意见列表 */
      BcyjList(qs.stringify({ kxxyjid: this.sopenId })).then(res => {
        this.bcyj = res.data.rows;
      });
      GKK(qs.stringify({ kxxyjid: this.sopenId })).then(res => {
        //console.log(res);
        this.gkktable = res.data.rows;
      });
      /**附件列表 */
      ExportFn(
        "/cable/tZjgcFj/list",
        qs.stringify({ zbid: this.sopenId, jd: 1 })
      )
        .then(res => {
          this.fjdata = res.data.rows;
        })
        .catch(err => {
          //console.log(err);
        });
    } else {
      this.title = "可研审查-查看流程";

      /**获取页面数据 */
      getList(qs.stringify({ objId: this.sopenId })).then(res => {
        this.addlist = res.data.rows[0];
        this.addlist.yj = null;
      });
      /**查询可行性研究流程履历列表 */
      LClist(qs.stringify({ kxxyjid: this.sopenId })).then(res => {
        //console.log(res.data.rows);
        this.lctable = res.data.rows;
      });
      /**查询立项中可行性研究补充意见列表 */
      BcyjList(qs.stringify({ kxxyjid: this.sopenId })).then(res => {
        this.bcyj = res.data.rows;
      });
      GKK(qs.stringify({ kxxyjid: this.sopenId })).then(res => {
        //console.log(res);
        this.gkktable = res.data.rows;
      });
      /**附件列表 */
      ExportFn(
        "/cable/tZjgcFj/list",
        qs.stringify({ zbid: this.sopenId, jd: 1 })
      )
        .then(res => {
          this.fjdata = res.data.rows;
        })
        .catch(err => {
          //console.log(err);
        });
    }
  },
  methods: {
    getJcrList(groupname) {
      this.userinfo = null;
      this.addlist.bzid = groupname.objId;
      this.addlist.bzmc = groupname.groupname;
      //console.log(groupname);
      /**当前处理人 */
      UserList(groupname).then(res => {
        this.userinfo = res.data.rows;
      });
    },
    /**
     * 下一步班组
     */
    tjbz(val) {
      //console.log(val);
      this.userinfo = null;
      this.lcdata.bzmc = val.groupname;
      this.lcdata.bzid = val.objId;
      /**当前处理人 */
      UserList(this.lcdata.bzid).then(res => {
        this.userinfo = res.data.rows;
      });
    },
    /**
     * 下一步操作人
     */
    tjczr(val) {
      //console.log(val);
      this.lcdata.clrmc = val.name;
      this.lcdata.clrid = val.objId;
      //console.log(this.lcdata);
    },
    /**
     * 新增补充意见
     */
    AddnewBc() {
      //console.log("新增补充意见");
      let time = this.clckTime++;
      this.bcyj.push({ sxh: time });
    },
    /**选中补充意见 */
    CheckFun(val) {
      //console.log(val);
      this.CheckedSelection = val;
    },

    /** 查看*/
    ViewGKK(val) {
      //console.log(val);
      this.isshowGKK = true;
      this.openGKK = val;
    },
    parentGKKFn(val) {
      this.isshowGKK = val.isshowGKK;
      this.ispicadd = val.add;
    },
    // 上传图片
    UpPiceGKK(val) {
      //console.log(val);
      //console.log("上传图片");
      this.isshowPic = true;
      this.ispicadd = true;
      this.groundopenid = this.openID;
      this.groundsonopneid = this.sopenId;
      this.objIdson = val.objId;
      this.wjmc = "";
    },
    /**查看图片 */
    viePiceGKK(val) {
      //console.log(val);
      //console.log("查看图片");
      if (
        (val.wjlj == null && val.wjmc == null) ||
        (val.wjlj == "" && val.wjmc == "")
      ) {
        this.$message({
          message: "图片不存在！！！",
          type: "warning"
        });
        return false;
      }
      this.groundopenid = this.openID;
      this.groundsonopneid = this.sopenId;
      this.isshowPic = true;
      this.wjmc = val.wjmc;
      this.wjlj = process.env.VUE_APP_BASE_API + val.wjlj;
    },
    /**审查内容弹框 */
    TkFn(val) {
      //console.log(val);
      this.content = val;
      this.visible = true;
    },
    /**删除补充意见 */
    DelFun() {
      let array = this.CheckedSelection;
      if (array.length > 0) {
        for (let index = 0; index < array.length; index++) {
          let element = array[index].sxh;
          let i = this.bcyj.findIndex(item => {
            if (item.sxh == element) {
              //console.log(item);
              return true;
            }
          });
          this.bcyj.splice(i, 1);
        }
      }
    },
    /**查看规章规程 */
    Gzview() {
      //console.log("查看规章规程");
      let wj = qs.stringify({ wjmc: this.wjmc });
      Gz(wj).then(res => {
        //console.log(res);
        this.gztable = res.data.rows;
      });
    },

    /**
     * 取消按钮
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.showDialog = false;
          this.editbtn = false;
          this.$parent.getTableList();
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
    /**
     * 确认按钮
     *
     */
    SuerFun() {
      this.$refs["formrules"].validate(val => {
        if (val) {
          if (this.isAdd) {
            this.addlist.objId = null; //
          } else {
            this.addlist.objId = this.sopenId; //
          }
          this.addlist.bcyjdata = JSON.stringify(this.bcyj); //补充意见数据
          this.addlist.yjdata = JSON.stringify(this.gkktable); //管控卡数据
          this.addlist.lcdata = JSON.stringify(this.lctable); //流程履历数据
          this.addlist.gcid = this.openID; //工程id
          this.addlist.fjData = JSON.stringify(this.fjdata);
          //console.log(this.addlist);

          Add(qs.stringify(this.addlist)).then(res => {
            //console.log(res);
            this.$message({
              message: "保存成功！！！",
              type: "success"
            });
            this.clearsopenId = res.data.msg.objId;
            this.isSuerFun = true;
            this.submitList.objId = res.data.msg.objId;
            this.lcdata.kxxyjid = res.data.msg.objId;
            this.submitList.gcid = this.openID;
          });
        } else {
          this.$message({
            message: "必填项未填！！！",
            type: "error"
          });
        }
      });
    },
    exportFn() {
      //console.log(this.gkktable);
      ExportFn(
        "/zjgc/kxxyjyj/export",
        qs.stringify({ yj: JSON.stringify(this.gkktable) })
      ).then(res => {
        //console.log(res);
        window.location.href =
          process.env.VUE_APP_BASE_API +
          "/common/download?fileName=" +
          res.data.msg +
          "&delete=true";
      });
    },
    down(val) {
      //console.log(val);
      var list = {
        objId: val.objId,
        wjdx: val.wjdx,
        wjlx: val.wjlx,
        wjlxmc: val.wjlxmc,
        wjmc: val.wjmc,
        wjxh: val.wjxh
      };
      ExportFn("/cable/gzgcgl/export", qs.stringify(list)).then(res => {
        //console.log(res);
        window.location.href =
          process.env.VUE_APP_BASE_API +
          "/common/download?fileName=" +
          res.data.msg +
          "&delete=true";
      });
    },
    /** 退回*/
    THFn() {
      //console.log(this.lctable[this.lctable.length - 1].jdmc);
      var thlist = {
        objId: this.sopenId,
        kxxyjid: "",
        sxh: "",
        jdmc:
          this.lctable == null
            ? "1"
            : this.lctable[this.lctable.length - 1].jdmc,
        clrid: "",
        clrmc: "",
        bzid: "",
        bzmc: "",
        kssj: "",
        lcdata: JSON.stringify(this.lctable[this.lctable.length - 1]),
        lczt: 2
      };

      //console.log("退回");

      SubmitLc(qs.stringify(thlist)).then(res => {
        this.showDialog = false;
        this.editbtn = false;
        this.$parent.getTableList();
        this.addbtn = false;
        this.$emit("childFn", {
          showDialog: this.showDialog,
          editbtn: this.editbtn,
          addbtn: this.addbtn
        });
        this.$message({
          message: "退回成功！！！",
          type: "success"
        });
      });
    },
    /**通过 */
    TGFn() {
      //console.log("通过");
      var thlist = {
        objId: this.sopenId,
        kxxyjid: "",
        sxh: "",
        jdmc:
          this.lctable == null
            ? "1"
            : this.lctable[this.lctable.length - 1].jdmc,
        clrid: "",
        clrmc: "",
        bzid: "",
        bzmc: "",
        kssj: "",
        lcdata: JSON.stringify(this.lctable[this.lctable.length - 1]),
        lczt: 3
      };
      SubmitLc(qs.stringify(thlist)).then(res => {
        this.showDialog = false;
        this.editbtn = false;
        this.$parent.getTableList();
        this.addbtn = false;
        this.$emit("childFn", {
          showDialog: this.showDialog,
          editbtn: this.editbtn,
          addbtn: this.addbtn
        });
        this.$message({
          message: "退回成功！！！",
          type: "success"
        });
      });
    },
    /**提交 */
    submitFn() {
      if (this.clearsopenId != null) {
        this.tijiao = true;
      } else {
        this.$message("请先保存！！！");
        return false;
      }
    },
    /**提交确认 */ submitFnQR() {
      if (this.lcdata.bzid == "") {
        this.$message("请选择下一步班组！！！");
        return false;
      }
      if (this.lcdata.clrid == "") {
        this.$message("请选择下一步处理人！！！");
        return false;
      }

      if (this.clearsopenId != null) {
        this.submitList.objId = this.clearsopenId;
        this.submitList.lcdata.kxxyjid = this.submitList.objId;
      } else if (this.sopenId != null) {
        this.submitList.objId = this.sopenId;
        this.submitList.lcdata.kxxyjid = this.submitList.objId;
      } else {
        //console.log("err");
      }
      //console.log(this.lctable);
      this.submitList.jdmc =
        this.lctable.length > 0
          ? this.lctable[this.lctable.length - 1] == null
            ? "1"
            : this.lctable[this.lctable.length - 1]["jdmc"]
          : "1";
      this.submitList.lcdata = JSON.stringify(
        this.lctable.length > 0
          ? this.lctable[this.lctable.length - 1]
          : this.lcdata
      );
      this.submitList.yj = this.addlist.yj;
      //console.log(this.submitList);
      SubmitLc(qs.stringify(this.submitList)).then(res => {
        //console.log(res);

        this.tijiao = false;
        this.isSuerFun = false;
        this.showDialog = false;
        this.$parent.getTableList();
        this.$message({
          message: "提交成功！！！",
          type: "success"
        });
        this.$emit("childFn", {
          showDialog: this.showDialog,
          editbtn: this.editbtn,
          addbtn: this.addbtn
        });
      });
    },
    /**提交 取消*/
    submitFnQX() {
      this.tijiao = false;
      this.addlist.objId = null;
    },
    /**
     * 新增附件
     */
    AddFn() {
      //console.log("AddFn新增附件");
    },
    hadndleRemove(file, fileList) {},
    handleSuccess(res, file) {},
    handlePreview(file, fileList) {},
    onExceed(file, fileList) {},
    beforeUpload(file) {},
    /**上传附件 */
    change(file, fileList) {
      //console.log(fileList);
      if (fileList.length > 0) {
        this.fileName = fileList;
        this.fileList = fileList;
        this.isupload = true;
        this.sxh += 1;
      }
    },
    /**确认上传 */
    uploadSure() {
      let fileSumb = this.fileList[0]["raw"];
      var formdata = new FormData();
      formdata.append("file", fileSumb);
      formdata.append("gcmc", this.addlist.gcmc);
      formdata.append("jd", 1);
      CuploadFj(formdata)
        .then(result => {
          //console.log(result, "附件上传");
          let list = result.data.data;
          this.fileList = [];
          this.isupload = false;
          this.fileName = [];
          this.fjdata.push({
            wjmc: list.wjmc,
            wjlj: list.wjlj,
            jd: "1",
            zbid: null,
            sxh: this.sxh
          });
        })
        .catch(err => {});
    },
    /**取消上传 */
    uploadQX() {
      this.fileName = [];
      this.isupload = false;
    },
    /**附件列表 */
    uploadList() {
      Listupload(this.fjselect)
        .then(res => {
          //console.log(res, "附件列表");
        })
        .catch(err => {
          //console.log("程序出错");
        });
    },
    /**下载附件数据*/
    downFJ(val) {
      //console.log(val.wjlj);
      window.location.href =
        process.env.VUE_APP_BASE_API +
        "/common/downloadFile?url=" +
        val.wjlj +
        "&delete=true";
      this.$message({
        message: "请稍等正在下载...",
        type: "success"
      });
    },
    /*选中附件的数据*/
    CheckFunFJ(val) {
      this.CheckedSelectionFJ = val;
    },
    /*删除附件*/
    DelFj() {
      let array = this.CheckedSelectionFJ;
      if (array.length > 0) {
        for (let index = 0; index < array.length; index++) {
          let element = array[index].sxh;
          let i = this.fjdata.findIndex(item => {
            if (item.sxh == element) {
              //console.log(item);
              return true;
            }
          });
          this.fjdata.splice(i, 1);
        }
      } else {
        this.$message({
          message: "请选择一条数据！！！",
          type: "error"
        });
        return false;
      }
    },
    /**
     * 接收查看/编辑子组件的数据
     */
    parentFn(val) {
      //console.log(val);
      this.isshowPic = val.isshowPic;
      this.ispicadd = val.add;
      this.obj = val.obj;
      let array = this.gkktable;
      array.forEach((e, i) => {
        if (this.obj == e.objId) {
          e.wjlj = val.wjlj;
          e.wjmc = val.wjmc;
        }
      });
    }
  }
};
</script>
<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
.TkFn {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.upload-demo {
  ul {
    display: none;
  }
  .el-upload--picture-card:hover,
  .el-upload:focus {
    border-color: #409eff;
    color: #ffffff;
  }
}
</style>