<template>
  <!-- <h2>施工交底</h2> -->
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
        <!-- <div>{{isendtitle}}</div> -->
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
          <el-form-item label="是否跳过次阶段" label-width="130px" style="width:33%">
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
            <el-input v-model="addlist.gcmc" readonly clearable />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="工程性质：" label-width="130px" style="width:33%">
            <el-input v-model="addlist.gcxz" readonly clearable />
          </el-form-item>
          <!-- <el-form-item label="工程属性：" label-width="130px" style="width:33%">
            <el-input v-model="addlist.gcsx" readonly clearable />
          </el-form-item>-->
          <el-form-item :label="`${$dydj}：`" prop="dydj" label-width="130px" style="width:33%">
            <el-input v-model="addlist.dydj" readonly clearable />
          </el-form-item>
          <el-form-item style="width:33%" />
        </div>
        <div class="Form-input">
          <el-form-item label="监理单位：" prop="jldw" label-width="130px" style="width:33%">
            <el-input v-model="addlist.jldw" clearable />
          </el-form-item>
          <el-form-item label="监理人员:" prop="zj" label-width="130px" style="width:33%">
            <el-input v-model="addlist.zj" clearable />
          </el-form-item>
          <el-form-item label="交底时间：" prop="jdsj" label-width="130px" style="width:33%">
            <el-date-picker
              v-model="addlist.jdsj"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择日期"
            />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="通道施工方：" label-width="130px" style="width:33%">
            <el-input v-model="addlist.tdsgf" clearable />
          </el-form-item>
          <el-form-item label="通道施工负责人：" label-width="130px" style="width:33%">
            <el-input v-model="addlist.tdsgfzr" clearable />
          </el-form-item>
          <el-form-item label="电气项目负责人：" label-width="130px" style="width:33%">
            <el-input v-model="addlist.dqxmfzr" clearable />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item
            label="投运前是否要先期停电施工："
            prop="tyqsfyxqtdsg"
            label-width="210px"
            style="width:33%"
          >
            <el-radio-group v-model="addlist.tyqsfyxqtdsg">
              <el-radio label="1">是</el-radio>
              <el-radio label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            label="施工范围是否涉及带电设备："
            prop="sgfwsfsjddsb"
            label-width="210px"
            style="width:33%"
          >
            <el-radio-group v-model="addlist.sgfwsfsjddsb">
              <el-radio label="1">是</el-radio>
              <el-radio label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="电气施工单位：" prop="dqsgdwid" label-width="130px" style="width:33%">
            <el-select v-model="addlist.dqsgdwid" clearable placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in dqsgdw"
                :key="item.objId"
                :label="item.bzmc"
                :value="item.objId"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="交底人员：" prop="jdry" label-width="130px" style="width:33%">
            <el-input v-model="addlist.jdry" clearable />
          </el-form-item>
          <el-form-item label="预计竣工时间：" label-width="130px" style="width:33%">
            <el-date-picker
              v-model="addlist.yjjgsj"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择日期"
            />
          </el-form-item>
          <el-form-item label="负责班组：" prop="fzbzmc" label-width="130px" style="width:33%">
            <el-select
              v-model="addlist.fzbzmc"
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
        <div
          style="text-align: right;margin-bottom: 1.5rem ;display: flex;justify-content: flex-end;"
        >
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
            <label class="form-title">适用国网工艺库行</label>
          </div>
        </div>
        <div style="text-align: right;margin-bottom: 1.5rem">
          <el-button class="UserSearchFun" @click="AddnewGY">新增适用国网工艺库行</el-button>
          <el-button class="UserSearchFun" @click="DelGYFun">删除适用国网工艺库行</el-button>
        </div>
        <el-table
          :data="GYtable"
          style="border: 1px solid #c7c7c7;margin-bottom: 1.5rem"
          :cell-style="{borderColor: '#c7c7c7'}"
          :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}"
          border
          fit
          highlight-current-row
          @selection-change="CheckFun"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="sgxm" label="施工项目" align="center"></el-table-column>
          <el-table-column prop="wxytms" label="选用的条目数" align="center"></el-table-column>
          <el-table-column prop="name" label="备注" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.bz" clearable placeholder="请输入内容" />
            </template>
          </el-table-column>
        </el-table>
        <div class="Form-title">
          <div class="form-item">
            <label class="form-title">提出的施工要求</label>
          </div>
        </div>
        <div style="text-align: right;margin-bottom: 1.5rem">
          <el-button class="UserSearchFun" @click="AddnewSG">新增提出的施工要求</el-button>
          <el-button class="UserSearchFun" @click="DelSGFun">删除提出的施工要求</el-button>
        </div>

        <el-table
          :data="SGtable"
          style="border: 1px solid #c7c7c7;margin-bottom: 1.5rem"
          :cell-style="{borderColor: '#c7c7c7'}"
          :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}"
          border
          fit
          highlight-current-row
          @selection-change="CheckSGFun"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="name" label="施工项目" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.sgxm" clearable placeholder="请输入内容" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="未提出的条目数" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.wxytms" clearable placeholder="请输入内容" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="备注" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.bz" clearable placeholder="请输入内容" />
            </template>
          </el-table-column>
        </el-table>
         <div class="Form-title">
          <div class="form-item">
            <label class="form-title">交底时补充的要求</label>
          </div>
        </div>
        <div style="text-align: right;margin-bottom: 1.5rem">
          <el-button class="UserSearchFun" @click="AddnewBC">新增交底时补充的要求</el-button>
          <el-button class="UserSearchFun" @click="DelBCFun">删除交底时补充的要求</el-button>
        </div>
        <el-table
          :data="BCtable"
          style="border: 1px solid #c7c7c7;margin-bottom: 1.5rem"
          :cell-style="{borderColor: '#c7c7c7'}"
          :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}"
          border
          fit
          highlight-current-row
          @selection-change="CheckBCFun"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="name" label="内容" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.nr" clearable placeholder="请输入内容" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="备注" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.bz" clearable placeholder="请输入内容" />
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
    <div class="optionnew" v-if="selectshowDialog">
      <el-dialog
        :visible.sync="selectshowDialog"
        title="遗留意见"
        v-dialogDrag
        :center="true"
        top="5vh"
      >
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
    <!-- 新增适用国网工艺库行 -->
    <div class="GY" v-if="opinionnew">
      <el-dialog :visible.sync="opinionnew" title="新增适用国网工艺库行" v-dialogDrag :center="true">
        <el-popover placement="bottom" title="审查内容" width="200" trigger="manual" v-model="GYK">
          <div v-html="content"></div>
          <div style="text-align: right; margin: 0">
            <el-button type="primary" size="mini" @click="GYK = false">确定</el-button>
          </div>
        </el-popover>
        <div class="table-t">
          <el-table
            :data="tabelGYK"
            height="500px"
            style="border: 1px solid #c7c7c7;margin-bottom: 1.5rem"
            :cell-style="{borderColor: '#c7c7c7'}"
            :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}"
            border
            fit
            highlight-current-row
            @selection-change="GYselect"
          >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="sgxm" label="工艺名称" align="center"></el-table-column>
            <el-table-column prop="wxytms" label="工艺编号" align="center"></el-table-column>
            <el-table-column label="工艺标准" align="center">
              <template slot-scope="scope">
                <div class="GYK" @click="GYKFn(scope.row.gybz)">{{scope.row.gybz}}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="查看图片">
              <template slot-scope="scope">
                <el-button class="onSearch" size="small" @click="view(scope.row.id)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button class="UserSearchFun" @click="GYsure">新增</el-button>
          <el-button class="onSearch" @click="GYqx">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import {
  GC,
  GKK_view,
  UserList,
  GropList,
  BzsjList,
  Gjdwgyk,
  CuploadFj,
  Listupload,
  downloadFJ,
  ExportFn
} from "@/api/public";
import { YLJDMC } from "@/api/productionReadiness/projectInformation/firstFounded";
import {
  Add,
  getList,
  LClist,
  SGjdsgyq,
  BCList,
  SubmitLc
} from "@/api/productionReadiness/projectInformation/production-sgjd";
import YJinfo from "@/api/YJ";
export default {
  props: {
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
      //   jdry: [{ required: true, message: "请输入交底人员", trigger: "blur" }],
      //   yj: [{ required: true, message: "请输入意见", trigger: "blur" }],
      //   dydj: [{ required: true, message: "请输入DYDJ", trigger: "blur" }],
      //   jldw: [{ required: true, message: "请输入监理单位", trigger: "blur" }],
      //   zj: [{ required: true, message: "请输入监理人员", trigger: "blur" }],
      //   zj: [{ required: true, message: "请输入DL规模", trigger: "blur" }],
      //   tdgm: [{ required: true, message: "请输入通道规模", trigger: "blur" }],
      //   bzid: [
      //     { required: true, message: "请选择负责班组", trigger: "change" }
      //   ],
      //   jdsj: [
      //     { required: true, message: "请选择交底时间", trigger: "change" }
      //   ],
      //   tyqsfyxqtdsg: [
      //     {
      //       required: true,
      //       message: "请选择投运前是否要先期停电施工",
      //       trigger: "change"
      //     }
      //   ],
      //   sgfwsfsjddsb: [
      //     {
      //       required: true,
      //       message: "请选择施工范围是否涉及带电设备",
      //       trigger: "change"
      //     }
      //   ],
      //   sftgcjd: [
      //     { required: true, message: "请输入是否跳过此阶段", trigger: "change" }
      //   ],
      //   dqsgdwid: [
      //     { required: true, message: "请选择电气施工单位", trigger: "change" }
      //   ],
      //   fzbzmc: [
      //     { required: true, message: "请选择负责班组", trigger: "change" }
      //   ]
      // },
      activeNames: [1], //默认打开第几个页板
      checkedJb: null,
      active: 1,
      form: {
        sbmc: ""
      },
      showDialog: this.isShowDialog, //打开弹框
      editbtn: this.isEdit, //是否是编辑按钮
      addbtn: this.isAdd, //是否是新增按钮
      input3: "",
      selection: {
        xlmc: [{ id: "1", qb: "全部" }]
      },
      textarea: "",
      tableData: [],

      clckTime: 0,
      selectshowDialog: false,
      CheckedSelection: null, //新增适用国网工艺库行选中
      GYselectInfo: [], //工艺库选中
      SGSelection: null, //新增提出的施工要求选中
      BCSelection: null, //新增提出的施工要求选中
      GYK: false,
      content: "",
      tabelGYK: [], //国网工艺库行
      opinionnew: false,

      InspectionRecord: [],
      addlist: {
        yj: null,
        gcid: null,
        gcmc: null,
        gcxz: null,
        sftgcjd: null,
        lczt: 1,
        gcsx: null,
        dydj: null,
        jldw: null,
        zj: null,
        jdsj: null,
        tdsgf: null,
        tdsgfzr: null,
        dqxmfzr: null,
        tyqsfyxqtdsg: "1",
        sgfwsfsjddsb: "1",
        dqsgdwid: null,
        yjjgsj: null,
        jdry: null,
        fzbzid: null,
        fzbzmc: null,
        fzbzid: null,
        yjjgsj: null,
        sgyq: [], //新增提出的施工要求
        bcyq: [], //补充要求
        bcyq: [], //补充要求
        lcdata: [] //流程数据
      },
      submitList: {
        gcid: this.openID,
        objId: this.sopenId,
        sxh: "",
        jdmc: "1",
        clrid: "",
        clrmc: "",
        bzid: "",
        bzmc: "",
        kssj: "",
        lczt: 1,
        lcdata: {
          objId: null,
          sxh: "1",
          jdmc: "1",
          clrid: "",
          clrmc: "",
          bzid: "",
          bzmc: "",
          kssj: ""
        }
      },
      lctable: [],
      SGtable: [],
      BCtable: [],
      GYtable: [],
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
      fjdata: [],
      sxh: 0,
      actionReport: "#",
      fileList: [],
      isupload: false,
      fileName: [],
      fjselect: {
        zbid: this.openID,
        jd: 4
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
  mounted() {
    this.InspectionRecord = YJinfo.YJlist;
  },
  watch: {
    isShowDialog(val) {
      this.active = this.isendtitle;
      this.showDialog = val;
      this.addlist = {};
      this.submitList = [];
      this.GYtable = [];
      if (val) {
        // if()
        /**获取班组列表 */ 0;
        GropList().then(res => {
          if (res.status == 200) {
            this.group = res.data.rows;
          }
        });
        /**阶段 */
        YLJDMC(qs.stringify({ gcid: this.openID, jd: "sgtsc" })).then(res => {
          //console.log(res);
        });
        /**当前处理人 */
        UserList().then(res => {
          this.userinfo = res.data.rows;
        });
        /**电气施工单位 */
        BzsjList("ELECTRIC_BUILD_DEPT").then(res => {
          //console.log(res);
          this.dqsgdw = res.data.data;
        });
        if (this.isAdd) {
          this.title = "施工交底";
          /**工程内容 */
          GC(qs.stringify({ objId: this.openID })).then(res => {
            //console.log(res);
            this.addlist = res.data.rows[0];
            // this.addlist.tyqsfyxqtdsg = 1;
            // this.addlist.sgfwsfsjddsb = 1;
          });
        } else {
          if (this.isEdit) {
            this.title = "施工交底-处理流程";
          } else {
            this.title = "施工交底-查看流程";
          }
          getList(qs.stringify({ objId: this.sopenId })).then(res => {
            //console.log(res);
            this.addlist = res.data.rows[0];
            this.addlist.yj = null;
          });
          LClist(qs.stringify({ sgjdid: this.sopenId })).then(res => {
            //console.log(res);
            this.lctable = res.data.rows;
          });
          SGjdsgyq(qs.stringify({ sgjdid: this.sopenId })).then(res => {
            // //console.log(res);
            // this.SGtable = res.data.rows;
            let array = res.data.rows;
            for (const e of array) {
              //console.log(e);
              if (e.lx == 1) {
                this.GYtable.push(e);
              }
              if (e.lx == 2) {
                this.SGtable.push(e);
              }
            }
          });
          BCList(qs.stringify({ sgjdid: this.sopenId })).then(res => {
            this.BCtable = res.data.rows;
          });
          /**附件列表 */
          ExportFn(
            "/cable/tZjgcFj/list",
            qs.stringify({ zbid: this.sopenId, jd: 4 })
          )
            .then(res => {
              this.fjdata = res.data.rows;
            })
            .catch(err => {
              //console.log(err);
            });
        }
      } else {
        (this.addlist = {
          yj: null,
          gcid: null,
          gcmc: null,
          gcxz: null,
          sftgcjd: null,

          gcsx: null,
          dydj: null,
          jldw: null,
          zj: null,
          jdsj: null,
          tdsgf: null,
          tdsgfzr: null,
          dqxmfzr: null,
          tyqsfyxqtdsg: "",
          sgfwsfsjddsb: "",
          dqsgdwid: null,
          yjjgsj: null,
          jdry: null,
          fzbzid: null,
          yjjgsj: null,
          sgyq: [], //新增提出的施工要求
          bcyq: [], //补充要求
          bcyq: [], //补充要求
          lcdata: [] //流程数据
        }),
          (this.submitList = {
            gcid: this.openID,
            objId: this.sopenId,
            sxh: "",
            jdmc: "1",
            clrid: "",
            clrmc: "",
            bzid: "",
            bzmc: "",
            kssj: "",
            lczt: 1,
            lcdata: {
              objId: null,
              sxh: "1",
              jdmc: "1",
              clrid: "",
              clrmc: "",
              bzid: "",
              bzmc: "",
              kssj: ""
            }
          }),
          (this.lctable = []),
          (this.SGtable = []),
          (this.BCtable = []),
          (this.GYtable = []),
          (this.group = []),
          (this.userinfo = []),
          (this.dqsgdw = []);
      }
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
    this.addGJdwgyk();
  },
  methods: {
    choosefzbz(val) {
      this.addlist.fzbzid = val.objId;
      this.addlist.fzbzmc = val.groupname;
    },
    /** 新增适用国网工艺库行*/
    addGJdwgyk() {
      Gjdwgyk().then(res => {
        this.tabelGYK = [];
        // this.tabelGYK = res.data;
        var list = res.data;
        list.forEach(e => {
          let newgyk = {
            sgxm: e.gxmc,
            wxytms: e.gybh,
            bz: "",
            lx: "1",
            gybz: e.gybz
          };
          this.tabelGYK.push(newgyk);
        });
      });
    },

    /**
     * 新增适用国网工艺库行
     */
    AddnewGY() {
      //console.log("新增适用国网工艺库行");
      this.opinionnew = true;
      this.GYtable = [];
      this.addGJdwgyk();
    },
    getJcrList(groupname) {
      this.userinfo = null;
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
    /**工艺新增 */
    GYsure() {
      //console.log("新增");
      this.opinionnew = false;
      let array = this.GYselectInfo;
      this.GYtable = this.GYselectInfo;
      //console.log(this.GYtable);
    },
    GYKFn(val) {
      //console.log(val);
      this.content = val;
      this.GYK = true;
      this.visible = true;
    },
    //取消
    GYqx() {
      //console.log("取消");
      this.opinionnew = false;
      this.GYselectInfo = [];
    },
    /**选中工艺 */
    GYselect(val) {
      //console.log(val);
      this.GYselectInfo = val;
    },

    /**选中适用国网工艺库行 */
    CheckFun(val) {
      //console.log(val);
      this.CheckedSelection = val;
    },
    /**删除适用国网工艺库行 */
    DelGYFun() {
      let array = this.CheckedSelection;
      if (array.length > 0) {
        for (let index = 0; index < array.length; index++) {
          let element = array[index].id;
          let i = this.GYtable.findIndex(item => {
            if (item.id == element) {
              return true;
            }
          });
          this.GYtable.splice(i, 1);
        }
      }
    },
    /**查看图片 */
    view(val) {
      //console.log("查看图片");
      //console.log(val);
      this.$message({
        type: "info",
        message: "图片不存在"
      });
    },
    /**
     * 新增提出的施工要求
     */
    AddnewSG() {
      //console.log("新增提出的施工要求");
      let time = this.clckTime++;
      this.SGtable.push({ xsh: time, lx: "2" });
    },
    /**选中适用国网工艺库行 */
    CheckSGFun(val) {
      //console.log(val);
      this.SGSelection = val;
    },
    /**删除适用国网工艺库行 */
    DelSGFun() {
      let array = this.SGSelection;
      if (array.length > 0) {
        for (let index = 0; index < array.length; index++) {
          let element = array[index].id;
          let i = this.SGtable.findIndex(item => {
            if (item.id == element) {
              //console.log(item);
              return true;
            }
          });
          this.SGtable.splice(i, 1);
        }
      }
    },

    /**
     * 新增交底时补充的要求
     */
    AddnewBC() {
      //console.log("新增交底时补充的要求");
      let time = this.clckTime++;
      this.BCtable.push({ xsh: time });
    },
    /**选中适用国网工艺库行 */
    CheckBCFun(val) {
      //console.log(val);
      this.BCSelection = val;
    },
    /**删除适用国网工艺库行 */
    DelBCFun() {
      let array = this.BCSelection;
      if (array.length > 0) {
        for (let index = 0; index < array.length; index++) {
          let element = array[index].id;
          let i = this.BCtable.findIndex(item => {
            if (item.id == element) {
              //console.log(item);
              return true;
            }
          });
          this.BCtable.splice(i, 1);
        }
      }
    },

    /**遗留意见 */
    opinionFn() {
      //console.log("遗留意见");
      this.selectshowDialog = true;
      this.activeNames = [2];
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
          this.addbtn = false;
          this.fjdata = [];
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
          this.addlist.lczt = 1;
          this.addlist.lcdata = JSON.stringify(
            this.lctable.length > 0 ? this.lctable : this.lcdata
          ); //流程履历数据
          this.addlist.gwyq = JSON.stringify(this.GYtable); //新增适用国网工艺库行
          this.addlist.sgyq = JSON.stringify(this.SGtable); //新增提出的施工要求
          this.addlist.bcyq = JSON.stringify(this.BCtable); //新增交底时补充的要求
          this.addlist.gcid = this.openID; //工程id
          this.addlist.fjData = JSON.stringify(this.fjdata);
          Add(qs.stringify(this.addlist)).then(res => {
            //console.log(res);
            this.$message({
              message: "保存成功！！！",
              type: "success"
            });
            this.clearsopenId = res.data.msg.objId;
            this.isSuerFun = true;
            this.submitList.objId = res.data.msg.objId;
            // this.lcdata.kxxyjid = res.data.msg.objId;
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
    /**提交 */
    submitFn() {
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
      } else if (this.sopenId != null) {
        this.submitList.objId = this.sopenId;
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
      this.submitList.lczt = 1;
      //console.log(this.submitList);
      SubmitLc(qs.stringify(this.submitList)).then(res => {
        //console.log(res);
        this.$message({
          message: "提交成功！！！",
          type: "success"
        });
        this.fjdata = [];
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
        this.fjdata = [];
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
        this.fjdata = [];
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
      formdata.append("jd", 4);
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
            jd: "4",
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
    }
  }
};
</script>
<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
.GYK {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
