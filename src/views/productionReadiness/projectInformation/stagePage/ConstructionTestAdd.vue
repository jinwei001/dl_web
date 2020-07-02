<template>
  <!--     施工试验新增模块 -->
  <div class="hastitle">
    <el-dialog
      v-dialogDrag
      :visible.sync="showDialog"
      title="施工试验"
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
            <el-step title="录入" icon="el-icon-edit" />
            <el-step title="领导审核" icon="el-icon-upload" />
            <el-step title="确认" icon="el-icon-picture" />
          </el-steps>
        </div>
        <!-- -------------------------------------------流程履历------------------------------------------------ -->
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
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column prop="jdmc" label="节点名称" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.jdmc==1?"录入":scope.row.jdmc==2?"审核":scope.row.jdmc==3?"结束":""}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="clrmc" label="处理人" align="center" />
          <el-table-column prop="bzmc" label="处理班组" align="center" />
          <el-table-column prop="kssj" label="开始时间" align="center"></el-table-column>
          <el-table-column prop="spyj" label="审批意见" align="center" />
        </el-table>
        <!-- -------------------------------------------基础意见------------------------------------------------ -->
        <div class="Form-title">
          <div class="form-item">
            <label class="form-title">基础意见</label>
          </div>
        </div>
        <div class="Form-input">
          <el-form-item prop="yj" style="width:100%">
            <div style="width: 100%;">
              <div>
                <!-- <span style="color: red">*</span> -->
                意见：
                <el-form-item style="float: right;">
                  <el-button type="primary" @click="opinionFn">前阶段遗留意见</el-button>
                </el-form-item>
              </div>
              <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="addlist.yj"></el-input>
            </div>
          </el-form-item>
        </div>
        <!-- -------------------------------------------数据输入------------------------------------------------ -->
        <div class="Form-input">
          <el-form-item label="是否跳过此阶段" prop="sftgcjd" label-width="130px" style="width:33%">
            <el-select v-model="addlist.sftgcjd" clearable placeholder="请选择" style="width:100%">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
          <!-- :required="true" -->
          <el-form-item label="工程名称：" label-width="130px" style="width:66.6%">
            <el-input v-model="addlist.gcmc" readonly clearable />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="试验单位：" prop="sydw" label-width="130px" style="width:50%">
            <el-input v-model="addlist.sydw" clearable />
          </el-form-item>
          <el-form-item label="试验类型：" label-width="130px" style="width:33%">
            <el-select
              v-model="addlist.sylx"
              placeholder="请输入试验类型"
              @change="chooseTDlx"
              filterable
              multiple
              style="width:100%"
            >
              <el-option
                v-for="item in options"
                :key="item.bzid"
                :label="item.bzmc"
                :value="item.bzid"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="工程性质：" label-width="130px" style="width:33%">
            <el-input v-model="addlist.gcxz" readonly clearable />
          </el-form-item>
          <!-- <el-form-item label="工程属性："  label-width="130px" style="width:33%">
            <el-input v-model="addlist.gcsx	" readonly clearable />
          </el-form-item>-->
          <el-form-item :label="`${$dydj}：`" label-width="130px" style="width:33%">
            <el-input v-model="addlist.dydj" readonly clearable />
          </el-form-item>
          <el-form-item style="width:33%" />
        </div>
        <div class="Form-input">
          <el-form-item label="试验项目：" prop="syxm" label-width="130px" style="width:33%">
            <el-select v-model="addlist.syxm" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in optionsSYX"
                :key="item.bzid"
                :label="item.bzmc"
                :value="item.bzid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="试验人员：" prop="syry" label-width="130px" style="width:33%">
            <el-input v-model="addlist.syry" clearable />
          </el-form-item>
          <el-form-item label="试验时间：" label-width="130px" style="width:33%">
            <el-date-picker
              v-model="addlist.sysj	"
              clearable
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="旁站人员：" label-width="130px" style="width:33%">
            <el-input v-model="addlist.pzry" clearable />
          </el-form-item>
          <el-form-item label="负责班组：" prop="fzbz" label-width="130px" style="width:66.6%">
            <!-- <el-select v-model="addlist.fzbz" placeholder="请选择" style="width:38%">
              <el-option
                v-for="item in group"
                :key="item.objId"
                :label="item.groupname"
                :value="item.objId"
              ></el-option>
            </el-select>-->
            <el-select
              v-model="addlist.fzbz"
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
        <!-- -------------------------------------------数据输入------------------------------------------------ -->
        <!-- <div class="Form-title">
          <div class="form-item">
            <label class="form-title">基础意见</label>
          </div>
        </div>-->
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
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column type="index" label="序号" width="60" align="center" />

          <el-table-column label="工艺名称" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.gymc" clearable placeholder="请输入内容" />
            </template>
          </el-table-column>
          <el-table-column label="内容" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.nr" clearable placeholder="请输入内容" />
            </template>
          </el-table-column>
          <el-table-column label="描述" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.ms" clearable placeholder="请输入内容" />
            </template>
          </el-table-column>
        </el-table>
        <!-- -------------------------------------------管控卡------------------------------------------------ -->
        <div class="Form-title">
          <div class="form-item">
            <label class="form-title">管控卡</label>
          </div>
        </div>
        <div v-for="(item,i) in gkk_table_list" :key="i">
          <p>{{item.cardType}}</p>
          <el-table
            :data="item.list"
            style="border: 1px solid #c7c7c7;margin-bottom: 1.5rem"
            :cell-style="{borderColor: '#c7c7c7'}"
            :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}"
            border
            fit
            highlight-current-row
          >
            <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
            <el-table-column prop="xlb" label="审查项目" align="center"></el-table-column>
            <el-table-column prop="nr" label="审查内容" align="center">
              <template slot-scope="scope">
                <div class="TkFn" @click="TkFn(scope.row.nr)">{{scope.row.nr}}</div>
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
            <el-table-column label="操作" align="center" width="280">
              <template slot-scope="scope">
                <el-button size="small" @click="ViewGKK(scope.row)">查看</el-button>
                <el-button size="small" plain @click="UpPiceGKK(scope.row)">上传图片</el-button>
                <el-button size="small" plain @click="viePiceGKK(scope.row)">查看图片</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
import qs from "qs";
import showPic from "./show";
import {
  GKK_more,
  GC,
  UserList,
  GropList,
  BzsjList,
  ExportFnMore,
  ExportFn,
  CuploadFj,
  Listupload,
  downloadFJ
} from "@/api/public";
import info from "@/api/productionReadiness/projectInformation/production-sy";
import YJinfo from "@/api/YJ";
import GKKshow from "./GKK_show";
export default {
  components: {
    showPic,
    GKKshow
  },
  props: {
    /**
     * 接收是否打开页面
     */
    // isShowDialog: {
    //   type: Boolean,
    //   default: false
    // },
    /** 接收参数为是否是编辑*/
    isEdit: {
      type: Boolean,
      default: false
    },
    /** 打开页面的id */
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
    /**
     * 接受流程状态
     */
    isLc: {
      type: Boolean,
      default: false
    },
    /**子表的id */
    sopenId: {
      default: null
    },
    isendtitle: {
      default: 1
    }
  },
  data() {
    return {
      // rules: {
      //   // change
      //   yj: [{ required: true, message: "请输入意见", trigger: "blur" }],
      //   fzbz: [
      //     { required: true, message: "请选择负责班组", trigger: "change" }
      //   ],
      //   syry: [{ required: true, message: "请输入试验人员", trigger: "blur" }],
      //   dydj: [{ required: true, message: "请输入DYDJ", trigger: "blur" }],
      //   sydw: [{ required: true, message: "请输入试验单位", trigger: "blur" }],
      //   sylx: [
      //     { required: true, message: "请选择试验类型", trigger: "change" }
      //   ],
      //   syxm: [{ required: true, message: "请选择试验项目", trigger: "change" }],
      // sftgcjd: [
      //     { required: true, message: "请输入是否跳过此阶段", trigger: "change" }
      //   ],
      // },
      wjmc: null,
      wjlj: null,
      objIdson: null,
      isaddPic: false,
      ispicadd: false,
      isshowPic: false,
      groundopenid: null,
      groundsonopneid: null,
      active: 1,
      activeNames: [1], //默认打开第几个页板
      checkedJb: null,
      form: {
        sbmc: "",
        ctd: ""
      },
      showDialog: true, //打开弹框
      editbtn: this.isEdit, //是否是编辑按钮
      addbtn: this.isAdd, //是否是新增按钮
      input3: "",
      textarea: "",
      selection: {
        xlmc: []
      },
      tableData: [],
      bcyj: [],
      lctable: [],
      clckTime: 1,
      CheckedSelection: null,
      opinionnew: false,
      InspectionRecord: [
        {
          id: 1,
          name: "项目:支架",
          describe: [
            {
              key: 1,
              item: "有无锈蚀",
              radio: "1",
              bz: ""
            }
          ]
        }
      ],
      sylx: ["1"],
      options: [],
      zoptions: [],
      dqsglxid: [],
      addlist: {
        yj: null,
        sftgcjd: null,
        gcid: this.openID,
        gcmc: null,
        sydw: null,
        sylx: ["1"],
        gcxz: null,
        gcsx: null,
        dydj: null,
        syxm: null,
        syry: null,
        sysj: null,
        fzbz: null,
        fzbzid: null,
        pzry: null,
        fzbz: null,
        lczt: null,
        objId: this.sopenId,
        sgyq: [], //新增提出的施工要求
        yjdata: [],
        bcyjdata: [] //流程数据
      },
      submitList: {
        gcid: this.openID,
        objId: this.sopenId,
        jgyjid: "",
        sxh: "",
        jdmc: "1",
        clrid: "",
        clrmc: "",
        bzid: "",
        bzmc: "",
        kssj: "",
        tdjslxid: ["1"],
        lczt: 1,
        lcdata: {
          objId: null,
          jgyjid: "",
          sxh: "1",
          jdmc: "1",
          clrid: "",
          clrmc: "",
          bzid: "",
          bzmc: "",
          kssj: ""
        }
      },
      group: [],
      userinfo: [],
      dqsgdw: [],
      tj: {
        bzid: {
          objId: ""
        },
        userid: {
          objId: ""
        }
      },
      lcdata: {
        objId: null,
        jgyjid: "",
        sxh: "1",
        jdmc: "1",
        clrid: "",
        clrmc: "",
        bzid: "",
        bzmc: "",
        kssj: ""
      },
      tijiao: null,
      clearsopenId: this.sopenId,
      title: null,
      getchangselect: {
        jdid: 7,
        dlbid: 1
      },
      gkk_table_list: [],
      gkktable: [],
      visible: false,
      content: "",
      gkkList: [],
      optionsSYX: [],
      fjdata: [],
      sxh: 0,
      actionReport: "#",
      fileList: [],
      isupload: false,
      fileName: [],
      fjselect: {
        zbid: this.openID,
        jd: 7
      },
      CheckedSelectionFJ: [],
      isshowGKK: false,
      openGKK: {}
    };
  },
  computed: {
    /** 计算是否可读 */
    isreadonly() {
      return !(this.editbtn || this.addbtn);
    }
  },
  watch: {
    isShowDialog(val) {},
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
    //试验类型
    BzsjList("ER_TEST_TYPE").then(res => {
      //console.log(res);
      this.options = res.data.data;
    });
    //试验项
    BzsjList("CABLE_ER_TYPE_ITEM").then(res => {
      //console.log(res);
      this.optionsSYX = res.data.data;
    });
    /**获取班组列表 */
    GropList().then(res => {
      if (res.status == 200) {
        this.group = res.data.rows;
      }
    });
    /**当前处理人 */
    UserList().then(res => {
      this.userinfo = res.data.rows;
    });
    if (this.isAdd) {
      this.lcdata = {
        objId: null,
        jgyjid: "",
        sxh: "1",
        jdmc: "1",
        clrid: "",
        clrmc: "",
        bzid: "",
        bzmc: "",
        kssj: ""
      };
      GKK_more(this.getchangselect).then(res => {
        // //console.log(res);
        this.gkktable = res.data.data;
        this.gkk_table_list = res.data.data;
        this.gkk_table_list.forEach((e, i) => {
          e.list.forEach((o, j) => {
            this.$set(o, "sxh", j + 1);
            this.$set(o, "scyj", "1");
          });
        });
      });
      /**获取页面数据 */
      GC(qs.stringify({ objId: this.openID })).then(res => {
        // this.addlist = res.data.rows[0];
        var list = res.data.rows[0];
        this.addlist.gcmc = list.gcmc;
        this.addlist.gcxz = list.gcxz;
        this.addlist.gcsx = list.gcsx;
        this.addlist.sylx = ["1"];
        this.addlist.dydj = list.dydj;
      });
    } else {
      /**
       * 通道建设补充意见列表
       */
      info.BcyjList(qs.stringify({ syid: this.sopenId })).then(res => {
        // //console.log(res);
        this.bcyj = res.data.rows;
      });
      info.YjList(qs.stringify({ syid: this.sopenId })).then(res => {
        // //console.log(res);
        // this.gkk_table_list = res.data.data;
        let tab = res.data.data;
        tab.forEach(el => {
          //console.log(el);
          let solist = el.list;
          let ta = [];
          solist.forEach(j => {
            let list = {
              xlb: j.scxm,
              nr: j.scnr,
              scyj: j.scyj,
              czwt: j.czwt,
              bz: j.bz,
              xmgykid: j.xmgykid,
              wjmc: j.wjmc,
              wjlj: j.wjlj,
              objId: j.objId
            };
            ta.push(list);
          });
          this.gkk_table_list.push({ cardType: el.cardType, list: ta });
        });
        //console.log(this.gkk_table_list);
      });
      info.LClist(qs.stringify({ syid: this.sopenId })).then(res => {
        this.lctable = res.data.rows;
      });
      /**内容 */
      info.List(qs.stringify({ objId: this.sopenId })).then(res => {
        let data = res.data.rows[0];

        (this.addlist.sftgcjd = data.sftgcjd),
          (this.addlist.gcmc = data.gcmc),
          (this.addlist.sydw = data.sydw),
          (this.addlist.gcxz = data.gcxz),
          (this.addlist.gcsx = data.gcsx),
          (this.addlist.dydj = data.dydj),
          (this.addlist.syxm = data.syxm),
          (this.addlist.syry = data.syry),
          (this.addlist.sysj = data.sysj),
          (this.addlist.pzry = data.pzry),
          (this.addlist.fzbz = data.fzbz),
          (this.addlist.lczt = data.lczt);
        this.addlist.yj = null;
        this.addlist.sylx = data.sylx.split(",");
      });
      /**附件列表 */
      ExportFn(
        "/cable/tZjgcFj/list",
        qs.stringify({ zbid: this.sopenId, jd: 7 })
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
      this.addlist.fzbzid = val.objId;
      this.addlist.fzbz = val.groupname;
    },
    chooseTDlx(val) {
      //console.log(val);
      if (val.length != 0) {
        this.getchangselect.dlbid = val.join(",");
        this.addlist.sylx = val;
        GKK_more(this.getchangselect).then(res => {
          //console.log(res);
          this.gkktable = res.data.data;
          this.gkk_table_list = res.data.data;
          this.gkk_table_list.forEach((e, i) => {
            e.list.forEach((o, j) => {
              this.$set(o, "sxh", j + 1);
              this.$set(o, "scyj", "1");
            });
          });
        });
      }
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
    /**审查内容弹框 */
    TkFn(val) {
      //console.log(val);
      this.content = val;
      this.visible = true;
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
     * 上传
     */
    Updata(val) {
      //console.log(val);
    },
    viePiceGKK(val) {
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
      //console.log("查看图片");
      this.groundopenid = this.openID;
      this.groundsonopneid = this.sopenId;
      this.isshowPic = true;
      this.wjmc = val.wjmc;
      this.wjlj = process.env.VUE_APP_BASE_API + val.wjlj;
    },
    UpPiceGKK(val) {
      this.isshowPic = true;
      this.ispicadd = true;
      this.groundopenid = this.openID;
      this.groundsonopneid = this.sopenId;
      this.objIdson = val.objId;
      this.wjmc = "";
    },
    /**
     * 新增补充意见
     */
    AddnewBc() {
      //console.log("新增补充意见");
      const time = this.clckTime++;
      this.bcyj.push({
        sxh: time
      });
    },
    /** 选中补充意见 */
    CheckFun(val) {
      //console.log(val);
      this.CheckedSelection = val;
    },
    /** 删除补充意见 */
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
      this.activeNames = [4];
      this.YJ(4);
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
    /**
     * 取消按钮
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.showDialog = false;
          this.editbtn = false;
          this.addbtn = false;
          this.isLc = false;
          this.addlist = {};
          this.SubmitLc = {};
          this.$parent.getTableList();
          this.$emit("childFn", {
            showDialog: this.showDialog,
            editbtn: this.editbtn,
            addbtn: this.addbtn
          });
          // this.$refs..resetFields(); // 清空表单
          done();
        })
        .catch(_ => {});
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
    /**
     * 确认按钮
     */
    SuerFun() {
      this.$refs["formrules"].validate(val => {
        if (val) {
          if (this.isAdd) {
            this.addlist.objId = null; //
          } else {
            this.addlist.objId = this.sopenId; //
          }
          let gkk_list = this.gkk_table_list;
          let gkk_table = [];
          gkk_list.forEach(e => {
            gkk_table.push(e.list);
          });

          /**二维数组变为一维数组 */
          function flatten(arr) {
            return [].concat(
              ...arr.map(x => (Array.isArray(x) ? flatten(x) : x))
            );
          }
          var gkk_add_list = flatten(gkk_table);
          gkk_add_list.forEach((item, i) => {
            let list = {
              scnr: item.nr,
              scxm: item.xlb,
              xsh: i + 1,
              objId: null,
              scyj: item.scyj,
              czwt: item.czwt,
              bz: item.bz,
              cardType: item.cardtype,
              xmgykid: item.xmgykid,
              sgys: item.sgys,
              wjlj: item.wjlj,
              wjmc: item.wjmc
            };
            this.gkkList.push(list);
          });
          this.addlist.sylx = this.addlist.sylx.toString();
          this.addlist.lcdata = JSON.stringify(this.lctable); //流程履历数据
          this.addlist.bcyjdata = JSON.stringify(this.bcyj); //补充意见数据
          this.addlist.yjdata = JSON.stringify(this.gkkList); //管控卡数据
          this.addlist.gcid = this.openID; //工程id
          this.addlist.fjData = JSON.stringify(this.fjdata);
          //console.log(this.addlist);
          info.add(qs.stringify(this.addlist)).then(res => {
            this.clearsopenId = res.data.msg.objId;
            this.isSuerFun = true;
            this.submitList.objId = res.data.msg.objId;
            this.submitList.gcid = this.openID;
            this.$message({
              message: "保存成功！！！",
              type: "success"
            });
            this.gkkList = [];
          });
        } else {
          this.$message({
            message: "必填项未填！！！",
            type: "error"
          });
        }
      });
    },
    /** 提交 */
    submitFn() {
      //console.log("提交");
      //console.log(this.clearsopenId);
      if (this.clearsopenId != null) {
        this.tijiao = true;
      } else {
        this.$message("请先保存！！！");
        return false;
      }
    },
    /**提交确认 */
    submitFnQR() {
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
        this.submitList.lcdata.jgyjid = this.submitList.objId;
      } else if (this.sopenId != null) {
        this.submitList.objId = this.sopenId;
        this.submitList.lcdata.jgyjid = this.submitList.objId;
      } else {
        //console.log("err");
      }
      this.addlist.sylx = this.addlist.sylx.toString();
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
      info.SubmitLc(qs.stringify(this.submitList)).then(res => {
        //console.log(res);
        this.tijiao = false;
        this.isSuerFun = false;
        this.showDialog = false;
        this.$parent.getTableList();
        this.$emit("childFn", {
          showDialog: this.showDialog,
          editbtn: this.editbtn,
          addbtn: this.addbtn
        });
        this.$message({
          message: "提交确认成功！！！",
          type: "success"
        });
      });
    },

    /**提交 取消*/
    submitFnQX() {
      this.tijiao = false;
      this.addlist.objId = null;
      this.$parent.getTableList();
    },
    exportFn() {
      let tab = this.gkk_table_list;
      var add_list = [];
      tab.forEach(el => {
        let solist = el.list;
        let ta = [];
        solist.forEach(j => {
          let list = {
            scxm: j.xlb,
            xsh: j.xsh,
            scnr: j.nr,
            bz: j.bz,
            scyj: j.scyj,
            czwt: j.czwt
          };
          ta.push(list);
        });
        add_list.push({ cardType: el.cardType, list: ta });
      });
      ExportFnMore(
        "/zjgc/syyj/export",
        qs.stringify({ yj: JSON.stringify(add_list) })
      ).then(res => {
        //console.log(res);
        if (res.data.code == 0) {
          window.location.href =
            process.env.VUE_APP_BASE_API +
            "/common/download?fileName=" +
            res.data.msg +
            "&delete=true";
          this.add_list = [];
          this.$message({
            message: "请稍等正在下载...",
            type: "success"
          });
        } else {
          this.$message({
            message: "下载失败，请联系管理员！！！",
            type: "error"
          });
        }
      });
    },
    /** 退回*/
    THFn() {
      //console.log(this.lctable);
      var thlist = {
        objId: this.sopenId,
        jgyjid: "",
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
      info.SubmitLc(qs.stringify(thlist)).then(res => {
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
        jgyjid: "",
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
      info.SubmitLc(qs.stringify(thlist)).then(res => {
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
      formdata.append("jd", 7);
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
            jd: "7",
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
      let array = this.gkk_table_list;
      //console.log(array);
      array.forEach((e, i) => {
        e.list.forEach((k, j) => {
          k.wjlj = val.wjlj;
          k.wjmc = val.wjmc;
        });
      });
    }
  }
};
</script>
<style lang="scss" scope>
.TkFn {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.scnr-content {
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 45px;
}
</style>
