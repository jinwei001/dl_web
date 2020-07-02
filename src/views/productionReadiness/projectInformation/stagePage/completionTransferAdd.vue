<template>
  <!-- <h2>
  竣工验收-竣工验收-新增流程</h2>-->
  <div class="hastitle">
    <el-dialog
      v-dialogDrag
      :visible.sync="showDialog"
      title="竣工验收"
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
        <!-- <div class="Form-title">
          <div class="form-item">
            <label class="form-title">设备建设管理-竣工验收</label>
          </div>
        </div>-->
        <div style="width:60%;margin: auto;">
          <el-steps :active="active">
            <el-step title="设备上报" icon="el-icon-edit" />
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
          <el-table-column prop="kssj" label="开始时间" align="center" />
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
        <!-- -------------------------------------------数据输入------------------------------------------------ -->
        <div class="Form-input">
          <el-form-item label="	是否跳过此阶段" prop="sftgcjd" label-width="140px" style="width:33%">
            <el-select v-model="addlist.sftgcjd" clearable placeholder="请选择" style="width:100%">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工程名称：" label-width="130px" style="width:66.6%">
            <el-input v-model="addlist.gcmc" readonly clearable />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="验收人员：" prop="ysry" label-width="130px" style="width:50%">
            <el-input v-model="addlist.ysry" clearable />
          </el-form-item>
          <el-form-item label="验收时间：" label-width="130px" style="width:50%">
            <!-- <el-input v-model="addlist.yssj	" clearable /> -->
            <el-date-picker
              style="width:100%"
              v-model="addlist.yssj"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择日期"
            />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="试验人员：" prop="syry" label-width="130px" style="width:50%">
            <el-input v-model="addlist.syry" clearable />
          </el-form-item>
          <el-form-item label="试验时间：" label-width="130px" style="width:50%">
            <!-- <el-input v-model="addlist.sysj	" clearable /> -->
            <el-date-picker
              style="width:100%"
              v-model="addlist.sysj"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择日期"
            />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item
            label="竣工验收合格后试验单位："
            label-width="200px"
            style="width:60.6%"
            prop="jgyshghsydw"
          >
            <el-input v-model="addlist.jgyshghsydw	" clearable />
          </el-form-item>
          <el-form-item label="旁站人员：" label-width="100px" style="width:39%">
            <el-input v-model="addlist.pzry" clearable />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="投运时间：" label-width="130px" style="width:33%">
            <el-date-picker
              v-model="addlist.tysj"
              clearable
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item :label="`${$xl}正式命名：`" prop="xlzsmm" label-width="130px" style="width:66.6%">
            <el-input v-model="addlist.xlzsmm" clearable />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item :label="`${$xl}起止范围：`" prop="xlqzfw" label-width="130px" style="width:50%">
            <el-input v-model="addlist.xlqzfw" clearable />
          </el-form-item>
          <el-form-item label="参与投运人员：" prop="cytyry" label-width="130px" style="width:50%">
            <el-input v-model="addlist.cytyry" clearable />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="备注：" label-width="130px" style="width:100%">
            <el-input v-model="addlist.bz" type="textarea" :rows="2" placeholder="请输入内容" />
          </el-form-item>
        </div>
        <!-- -------------------------------------------数据输入------------------------------------------------ -->

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
          <el-table-column prop="name" label="项目" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.xm" clearable placeholder="请输入内容" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="工艺名称" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.gymc" clearable placeholder="请输入内容" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="工艺标准" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.gybz" clearable placeholder="请输入内容" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="理由建议" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.lyjy" clearable placeholder="请输入内容" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="描述" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.ms" clearable placeholder="请输入内容" />
            </template>
          </el-table-column>
          <!-- <el-table-column prop="name" label="图片上传" align="center">
            <template slot-scope="scope">
              <a @click="scope">图片上传</a>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="查看图片" align="center">
            <template slot-scope="scope">
              <a @click="scope">查看图片</a>
            </template>
          </el-table-column>-->
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
            <el-table-column prop="spyj" label="审批意见" align="center">
              <template slot-scope="scope">
                <el-radio-group v-model="scope.row.spyj">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="2">否</el-radio>
                </el-radio-group>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="理由建议" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.lyjy" clearable placeholder="请输入内容" />
              </template>
            </el-table-column>

            <el-table-column prop="ms" label="描述" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.ms" clearable placeholder="请输入内容" />
              </template>
            </el-table-column>
            <el-table-column label="参考标准" align="center" width="280">
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
    <!-- 遗留意见 -->
    <div class="optionnew">
      <!-- <el-dialog :visible.sync="opinionnew" title="遗留意见" v-dialogDrag :center="true">
        <el-collapse v-model="activeNames"></el-collapse>
        <el-collapse v-model="checkedJb" accordion>
          <el-collapse-item
            v-for=" item in InspectionRecord"
            :key="item.id"
            :title="item.name"
            :name="item.id"
          >{{item.describe}}</el-collapse-item>
        </el-collapse>
      </el-dialog>-->
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
  GKK_more,
  GC,
  UserList,
  GropList,
  BzsjList,
  ExportFnMore
} from "@/api/public";
import showPic from "./show";
import info from "@/api/productionReadiness/projectInformation/jgys_jgys";
import { getList } from "@/api/productionReadiness/projectInformation/CompletionAcceptance.js";
import { ExportFn, CuploadFj, Listupload, downloadFJ } from "@/api/public";
import qs from "qs";
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
      //   yj: [{ required: true, message: "请输入意见", trigger: "blur" }],
      //   ysry: [{ required: true, message: "请输入验收人员", trigger: "blur" }],
      //   syry: [{ required: true, message: "请输入试验人员", trigger: "blur" }],
      //   tdjslxid: [
      //     { required: true, message: "请输入通道建设类型", trigger: "blur" }
      //   ],
      //   scry: [{ required: true, message: "请输入审查人员", trigger: "blur" }],
      //   xlzsmm: [
      //     { required: true, message: "请输入"+this.$xl+"正式命名", trigger: "blur" }
      //   ],
      //   xlqzfw: [
      //     { required: true, message: "请输入"+this.$xl+"起止范围", trigger: "blur" }
      //   ],
      //   cytyry: [
      //     { required: true, message: "请输入参与投运人员", trigger: "blur" }
      //   ],
      //   sftgcjd: [
      //     { required: true, message: "请输入是否跳过此阶段", trigger: "change" }
      //   ],
      //   jgyshghsydw: [
      //     {
      //       required: true,
      //       message: "请输入竣工验收合格后试验单位",
      //       trigger: "blur"
      //     }
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
      activeNames: [1], //默认打开第几个页板
      checkedJb: null,
      form: {
        sbmc: ""
      },
      visible: false,
      active: 1,
      content: null,
      // showDialog: this.isShowDialog, //打开弹框
      showDialog: true, //打开弹框
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

      ////需要数据
      is_all: [
        { id: 1, qb: "是" },
        { id: 0, qb: "否" }
      ],
      gkk_table_list: [],
      group: [],
      userinfo: [],
      visible: false,
      tijiao: false,
      lctable: [],
      gkktable: [],
      clearsopenId: this.sopenId,
      isSuerFun: false,
      addlist: {
        gcid: this.openID,
        yj: null,
        sftgcjd: null,
        gcmc: null,
        ysry: null,
        yssj: null,
        syry: null,
        sysj: null,
        jgyshghsydw: null,
        pzry: null,
        xlzsmm: null,
        xlqzfw: null,
        cytyry: null,
        bz: null,
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
      visible: false,
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
      gkkList: [],
      fjdata: [],
      sxh: 0,
      actionReport: "#",
      fileList: [],
      isupload: false,
      fileName: [],
      fjselect: {
        zbid: this.openID,
        jd: 10
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
  mounted() {},
  watch: {
    // isShowDialog(val) {
    //   this.showDialog = val;
    // },
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
    GropList().then(res => {
      if (res.status == 200) {
        this.group = res.data.rows;
      }
    });
    /**当前处理人 */
    UserList().then(res => {
      this.userinfo = res.data.rows;
    });
    /** 新增流程*/
    if (this.isAdd) {
      /**工程内容 */
      GC(qs.stringify({ objId: this.openID })).then(res => {
        //console.log(res);
        this.addlist = res.data.rows[0];
      });
      GKK_more({ jdid: 10 }).then(res => {
        this.gkk_table_list = res.data.data;
        this.gkk_table_list.forEach((e, i) => {
          e.list.forEach((o, j) => {
            this.$set(o, "sxh", j + 1);
            this.$set(o, "spyj", "1");
          });
        });
        //console.log(this.gkk_table_list);
      });
    } else {
      info.BcyjList(qs.stringify({ jgyjid: this.sopenId })).then(res => {
        // //console.log(res);
        this.bcyj = res.data.rows;
      });
      info.LClist(qs.stringify({ jgyjid: this.sopenId })).then(res => {
        this.lctable = res.data.rows;
      });
      getList(qs.stringify({ objId: this.sopenId })).then(res => {
        // //console.log(res);
        let data = res.data.rows[0];
        this.addlist = data;
        this.addlist.yj = null;
      });
      info.GKK(qs.stringify({ jgyjid: this.sopenId })).then(res => {
        //console.log(res);
        // this.gkk_table_list = res.data.data;
        let tab = res.data.data;
        tab.forEach(el => {
          let solist = el.list;
          let ta = [];
          solist.forEach(j => {
            let list = {
              xlb: j.gymc,
              nr: j.gybz,
              spyj: j.spyj,
              czwt: j.czwt,
              bz: j.bz,
              xmgykid: j.xmgykid,
              sxh: j.sxh,
              lyjy: j.lyjy,
              ms: j.ms,
              cardtype: j.cardtype,
              wjmc: j.wjmc,
              wjlj: j.wjlj,
              objId: j.objId
            };
            ta.push(list);
          });
          this.gkk_table_list.push({ cardType: el.cardType, list: ta });
        });
      });
      /**附件列表 */
      ExportFn(
        "/cable/tZjgcFj/list",
        qs.stringify({ zbid: this.sopenId, jd: 10 })
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
    /**
     * 下一步班组
     */
    tjbz(val) {
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
      this.activeNames = [7];
      this.YJ(7);
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
      //console.log("查看图片");
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
          this.isLc = false;
          this.addlist = {};
          this.SubmitLc = {};
          this.$parent.getTableList();
          this.$emit("childFn", {
            showDialog: this.showDialog,
            editbtn: this.editbtn,
            addbtn: this.addbtn
          });
          this.$refs.formrules.resetFields(); // 清空表单
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
          // this.gkk_table_list.forEach((e,i)=>{

          // })
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
              gybz: item.nr,
              gymc: item.xlb,
              sxh: item.sxh,
              objId: null,
              spyj: item.spyj,
              lyjy: item.lyjy,
              ms: item.ms,
              cardtype: item.cardtype
            };
            this.gkkList.push(list);
          });
          this.addlist.yjdata = JSON.stringify(this.gkkList); //管控卡数据
          this.addlist.gcid = this.openID; //工程id
          this.addlist.fjData = JSON.stringify(this.fjdata);
          info.add(qs.stringify(this.addlist)).then(res => {
            if (res.data.code == 0) {
              this.$message({
                message: "保存成功！！！",
                type: "success"
              });
              this.clearsopenId = res.data.msg.objId;
              this.isSuerFun = true;
              this.submitList.objId = res.data.msg.objId;
              this.lcdata.kxxyjid = res.data.msg.objId;
              this.submitList.gcid = this.openID;
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
            //console.log(res);
          });
        } else {
          this.$message({
            message: "必填项未填！！！",
            type: "error"
          });
        }
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

      info.SubmitLc(qs.stringify(this.submitList)).then(res => {
        this.tijiao = false;
        this.isSuerFun = false;
        this.showDialog = false;
        this.$parent.getTableList();
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
    exportFn() {
      //console.log(this.gkk_table_list);
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
        "/zjgc/tdjsyj/export",
        qs.stringify({ yj: JSON.stringify(add_list) })
      ).then(res => {
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
      formdata.append("jd", 10);
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
            jd: "10",
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
