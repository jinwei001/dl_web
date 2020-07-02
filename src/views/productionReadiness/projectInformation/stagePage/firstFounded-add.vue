<template>
  <!-- <h2>初设审查</h2> -->
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
            <el-step title="确认" icon="el-icon-picture"></el-step>
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
            <label class="form-title">基础信息</label>
          </div>
        </div>
        <div class="Form-input">
          <el-form-item prop="yj" style="width:100%">
            <div style="width: 100%;">
              <div>
                <el-col>
                  <!-- <span style="color: red">*</span> -->
                  意见：
                  <el-form-item style="float: right;">
                    <el-button type="primary" @click="opinionFn">前阶段遗留意见</el-button>
                  </el-form-item>
                </el-col>
              </div>
              <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="addlist.yj"></el-input>
            </div>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="是否跳过此阶段" label-width="130px" style="width:33%">
            <el-select
              v-model="addlist.sftgcjd"
              prop="sftgcjd"
              clearable
              placeholder="请选择"
              style="width:100%"
            >
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工程名称：" label-width="130px" style="width:66.6%">
            <el-input v-model="addlist.gcmc" readonly />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="工程性质：" label-width="130px" style="width:33%">
            <el-input v-model="addlist.gcxz" readonly />
          </el-form-item>
          <!-- <el-form-item label="工程属性：" label-width="130px" style="width:33%">
            <el-input v-model="addlist.gcsx" readonly />
          </el-form-item>-->
          <el-form-item :label="`${$dydj}：`" label-width="130px" style="width:33%">
            <el-input v-model="addlist.dydj" readonly />
          </el-form-item>
          <el-form-item style="width:33%" />
        </div>
        <div class="Form-input">
          <el-form-item :label="`${$xl}名称：`" prop="xlmc" label-width="130px" style="width:33%">
            <el-input v-model="addlist.xlmc" clearable />
          </el-form-item>
          <el-form-item label="工程造价预算（万元）:" label-width="180px" style="width:33%">
            <el-input v-model="addlist.gczjys" clearable />
          </el-form-item>
          <el-form-item label="设计人员：" label-width="130px" style="width:33%">
            <el-input v-model="addlist.sjry" clearable />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="设计图卷册号：" label-width="130px" style="width:33%">
            <el-input v-model="addlist.sjtjch" clearable />
          </el-form-item>
          <el-form-item label="初次审查时间：" prop="ccscsj" label-width="130px" style="width:33%">
            <el-date-picker
              v-model="addlist.ccscsj"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="请选择日期"
            />
          </el-form-item>

          <el-form-item label="审查班组：" prop="bzmc" label-width="130px" style="width:33%">
            <el-select
              v-model="addlist.bzmc"
              clearable
              placeholder="请选择"
              value-key="groupname"
              @change="choosefzbz"
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
          <el-form-item label="审查人员：" prop="scry" label-width="130px" style="width:33%">
            <el-input v-model="addlist.scry" clearable />
          </el-form-item>
          <el-form-item :label="`${$dl}规模(米)：`" prop="dlgm" label-width="130px" style="width:33%">
            <el-input v-model="addlist.dlgm" clearable />
          </el-form-item>
          <el-form-item label="通道规模(米)：" prop="tdgm" label-width="130px" style="width:33%">
            <el-input v-model="addlist.tdgm" clearable />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="工程概况：" label-width="130px" style="width:100%">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="addlist.gcgk"></el-input>
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
        </el-popover> -->
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
    <!-- 遗留意见 -->
    <div class="optionnew">
      <el-dialog :visible.sync="opinionnew" title="遗留意见" v-dialogDrag :center="true">
        <el-collapse v-model="activeNames" accordion @change="YJ">
          <el-collapse-item
            v-for="item in InspectionRecord"
            :key="item.id"
            :title="item.name"
            :name="item.id"
          >
            <div v-for="(j,i) in item.describe" :key="i">
              <p style="font-size: 1.1rem; font-family: cursive;">{{j}}</p>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-dialog>
    </div>
    <!-- 提交 -->
    <div class="hastitle">
      <el-dialog :visible.sync="tijiao" title="转下一步领导审核" v-dialogDrag top="25vh" width="25%">
        <el-form
          ref="dataForm"
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
    <div v-if="isshowGKK">
      <GKKshow @childFn="parentGKKFn" :openGKK="openGKK" />
    </div>
  </div>
</template>

<script>
import {
  Add,
  Cbsjbcyj,
  getList,
  gc,
  LClist,
  SubmitLc,
  GKK
} from "@/api/productionReadiness/projectInformation/firstFounded";
import {
  group,
  UserList,
  GKK_view,
  GC
} from "@/api/productionReadiness/projectInformation/feasibilityResearch";
import qs from "qs";
import { ExportFn,CuploadFj, Listupload, downloadFJ } from "@/api/public";
import YJinfo from "@/api/YJ";
import showPic from "./show";
import GKKshow from "./GKK_show";
export default {
  components: {
    showPic,
    GKKshow
  },
  props: {
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
    },
    /**
     * 是否结束流程状态
     */
    isendtitle: {
      default: 1
    }
  },
  data() {
    return {
      // rules: {
      //   // change
      //   yj: [{ required: true, message: "请输入意见", trigger: "blur" }],
      //   dlgm: [{ required: true, message: "请输入DL规模", trigger: "blur" }],
      //   tdgm: [{ required: true, message: "请输入通道规模", trigger: "blur" }],
      //   xlmc: [{ required: true, message: "请输入"+this.$xl+"名称", trigger: "blur" }],
      //   ccscsj: [
      //     { required: true, message: "请输入初次审查时间", trigger: "change" }
      //   ],
      //   bzmc: [
      //     { required: true, message: "请输入审查班组", trigger: "change" }
      //   ],
      //   sftgcjd: [
      //     { required: true, message: "请输入是否跳过此阶段", trigger: "change" }
      //   ],
      //   scry: [{ required: true, message: "请输入审查人员", trigger: "change" }]
      // },
      wjmc: null,
      wjlj: null,
      objIdson: null,
      isaddPic: false,
      ispicadd: false,
      isshowPic: false,
      groundopenid: null,
      groundsonopneid: null,
      activeNames: [1], //默认打开第几个页板
      checkedJb: null,
      form: {
        sbmc: ""
      },
      visible: false,
      active: 1,
      content: null,
      showDialog: this.isShowDialog, //打开弹框
      editbtn: this.isEdit, //是否是编辑按钮
      addbtn: this.isAdd, //是否是新增按钮
      input3: "",
      textarea: "",
      tableData: [],
      bcyj: [],
      clckTime: 1,
      tj: {
        bzid: {
          objId: ""
        },
        userid: {
          objId: ""
        }
      },
      title: null,

      bcyj: [],
      CheckedSelection: null,
      opinionnew: false,
      //前阶段遗留意见
      InspectionRecord: [],

      ////需要数据
      is_all: [
        { id: 1, qb: "是" },
        { id: 0, qb: "否" }
      ],
      group: [],
      userinfo: [],
      visible: false,
      tijiao: false,
      lctable: [],
      gkktable: [],
      clearsopenId: this.sopenId,
      isSuerFun: false,
      addlist: {
        gcid: null,
        yj: null,
        sftgcjd: null,
        gcmc: null,
        gcxz: null,
        gcsx: null,
        dydj: null,
        xlmc: null,
        bzmc: null,
        bzid: null,
        gczjys: null,
        sjry: null,
        scbzid: null,
        sjtjch: null,
        ccscsj: null,
        scbz: null,
        gcgk: null,
        scry: null,
        dlgm: null,
        tdgm: null,
        bcyjdata: [], //新增补充意见
        yjdata: [], //管控卡
        lcdata: [] //流程履历数据
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
        jdmc: "1",
        clrid: "",
        clrmc: "",
        bzid: "",
        bzmc: "",
        kssj: "",
        thlctable: "",
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
      title: null,
      lcdata: {
        objId: null,
        cbsjid: "",
        sxh: "1",
        jdmc: "1",
        clrid: "",
        clrmc: "",
        bzid: "",
        bzmc: "",
        kssj: ""
      },
      fjdata: [],
      sxh: 0,
      actionReport: "#",
      fileList: [],
      isupload: false,
      fileName: [],
      fjselect: {
        zbid: this.openID,
        jd: 2
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
  created() {
    this.active = this.isendtitle;
    /**获取班组列表 */
    group().then(res => {
      if (res.status == 200) {
        this.group = res.data.rows;
      }
    });
    /** 新增流程*/
    if (this.isAdd) {
      this.title = "初设审查-新增流程";
      /**工程内容 */
      gc(qs.stringify({ objId: this.openID })).then(res => {
        //console.log(res);
        this.addlist = res.data.rows[0];
      });
      /**新增的管控卡 */
      GKK_view(qs.stringify({ jdid: 2 })).then(res => {
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
      });
    } else {
      if (this.editbtn) {
        this.title = "初设审查-处理流程";
      } else {
        this.title = "初设审查-查看流程";
      }
      /**查询设计初步设计补充意见列表 */
      Cbsjbcyj(qs.stringify({ cbsjid: this.sopenId })).then(res => {
        //console.log(res);
        this.bcyj = res.data.rows;
      });
      LClist(qs.stringify({ cbsjid: this.sopenId })).then(res => {
        //console.log(res);
        this.lctable = res.data.rows;
      });
      GKK(qs.stringify({ cbsjid: this.sopenId })).then(res => {
        //console.log(res);
        this.gkktable = res.data.rows;
      });
      /**工程内容 */
      getList(qs.stringify({ objId: this.sopenId })).then(res => {
        //console.log(res);
        this.addlist = res.data.rows[0];
        this.addlist.yj = null;
      });
      /**附件列表 */
      ExportFn(
        "/cable/tZjgcFj/list",
        qs.stringify({ zbid: this.sopenId, jd: 2 })
      )
        .then(res => {
          this.fjdata = res.data.rows;
        })
        .catch(err => {
          //console.log(err);
        });
    }
  },
  mounted() {
    this.InspectionRecord = YJinfo.YJlist;
  },
  methods: {
    choosefzbz(val) {
      //console.log(val);
      this.userinfo = null;
      this.addlist.bzid = val.objId;
      this.addlist.bzmc = val.groupname;
      //console.log(val);
      /**当前处理人 */
      UserList(val).then(res => {
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
    TkFn(val) {
      //console.log(val);
      this.content = val;
      this.visible = true;
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
    /**遗留意见 */
    opinionFn() {
      //console.log("遗留意见");
      this.opinionnew = true;
      this.activeNames = [0];
      this.YJ(0);
    },

    /**阶段 */
    YJ(val) {
      //console.log(val);
      if (val == 0) {
        val = val + "";
      }
      if (val != "") {
        //console.log(YJinfo.YJJD(val + ""));
        YJinfo.YLJDMC(this.openID, YJinfo.YJJD(val + ""))
          .then(result => {
            this.$set(this.InspectionRecord[val], "describe", result.data.msg);
          })
          .catch(err => {
            //console.log("异常", err);
          });
      } else {
        //console.log("errr");
      }
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
      this.content = val;
      this.visible = true;
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
          this.$parent.getTableList();
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
     * 保存按钮
     */
    SuerFun() {
      this.$refs["formrules"].validate(val => {
        if (val) {
          if (this.isAdd) {
            this.addlist.objId = null; //
          } else {
            this.addlist.objId = this.sopenId; //
          }
          this.addlist.lcdata = JSON.stringify(this.lctable); //流程履历数据
          this.addlist.bcyjdata = JSON.stringify(this.bcyj); //补充意见数据
          this.addlist.yjdata = JSON.stringify(this.gkktable); //管控卡数据
          this.addlist.fjData = JSON.stringify(this.fjdata);
          //console.log(this.fjdata);
          this.addlist.gcid = this.openID; //工程id
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
        "/zjgc/cbsjyj/export",
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
    /** 退回*/
    THFn() {
      var thlist = {
        objId: this.sopenId,
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
          message: "通过成功！！！",
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

      SubmitLc(qs.stringify(this.submitList)).then(res => {
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
      formdata.append("jd", 2);
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
            jd: "2",
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
          //console.log(this.fjdata);
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
<style lang="scss">
.optionnew {
  .el-collapse-item {
    margin-bottom: 1.5em;
    .el-collapse-item__header {
      font-size: 1.1rem;
      font-weight: 600;
    }
  }
}
</style>