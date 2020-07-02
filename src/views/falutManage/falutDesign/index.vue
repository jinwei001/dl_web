<template>
  <!-- <div> -->
  <!--故障登记首页-->
  <div>
    <div class="main-body" v-if="isview">
      <div class="main-userSelect" v-if="YxxHideButtomStatus">
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <el-form-item label="故障类型:">
              <el-select v-model="form.gzlx" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.gzlx"
                  :key="item.bzid"
                  :label="item.bzmc"
                  :value="item.bzmc"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="原因类型:">
              <el-select v-model="form.yylx" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.yylx"
                  :key="item.bzid"
                  :label="item.bzmc"
                  :value="item.bzmc"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="故障原因:">
              <el-select v-model="form.gzyy" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.gzyy"
                  :key="item.bzid"
                  :label="item.bzmc"
                  :value="item.bzmc"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="故障时间：">
              <el-col>
                <el-date-picker
                  v-model="transportTime"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="~"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-col>
            </el-form-item>
          </el-form>
        </div>
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <el-form-item label="处理状态:">
              <el-select v-model="form.iswc" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="float: right;margin-right: 0 !important">
              <el-button class="onSearch" @click="onSearch">查询</el-button>
              <el-button class="onSearch" @click="reset" style="margin-right: 0 !important">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="content">
        <div class="respont-content" v-if="YxxHideButtomStatus">
          <el-form>
            <el-col>
              <el-form-item style="float: left;">
                <el-button class="onSearch" @click="AddFn">
                  <i class="el-icon-plus">新增</i>
                </el-button>
                <el-button type="danger" plain @click="DelFn">
                  <i class="el-icon-close"></i> 删除
                </el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="table" ref='contentref'>
          <el-table
            :data="tableData"
            style="border: 1px solid #c4c8cf"
            height="500px"
            :cell-style="{borderColor: '#c4c8cf'}"
            :header-cell-style="{'background':'#cddce6',borderColor: '#c4c8cf'}"
            border
            fit
            highlight-current-row
            @selection-change="CheckFun"
          >
            <!--:show-overflow-tooltip="true"-->
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
            <el-table-column prop="gzfssj" label="故障发生时间" width="160" align="center"></el-table-column>
            <el-table-column prop="dydj" :label="`${$dydj}`" width="120" align="center"></el-table-column>
            <el-table-column prop="gzxlmc" :label="`故障${$xl}名称`" width="260" align="center"></el-table-column>
            <el-table-column prop="gzjt" label="故障简述" width="260" :show-overflow-tooltip="true" align="center"></el-table-column>
            <el-table-column prop="gzxz" label="故障性质" width="160" align="center"></el-table-column>
            <el-table-column prop="xsjg" label="巡视结果" width="160" :show-overflow-tooltip="true" align="center"></el-table-column>
            <el-table-column prop="cljg" label="处理结果" width="160" :show-overflow-tooltip="true" align="center"></el-table-column>
            <el-table-column prop="cldw" label="配合单位" width="160" align="center"></el-table-column>
            <el-table-column prop="jsqk" label="结算情况" width="160" :show-overflow-tooltip="true" align="center"></el-table-column>
            <el-table-column prop="ssdlmc" :label="`所属${$dl}`" width="260" align="center"></el-table-column>
            <el-table-column prop="gzxb" :label="`故障${$xb}`" width="120" align="center"></el-table-column>
            <el-table-column prop="sblx" label="设备类型" width="150" align="center"></el-table-column>
            <el-table-column prop="gzsbmc" label="故障设备名称" width="200" align="center"></el-table-column>
            <el-table-column prop="yybzmc" label="故障设备运维班组" width="150" align="center"></el-table-column>
            <el-table-column prop="gzdwms" label="故障定位信息描述" width="250" align="center"></el-table-column>
            <el-table-column prop="gzjb" label="故障级别" width="120" align="center"></el-table-column>
            <el-table-column prop="gzlb" label="故障类别" width="120" align="center"></el-table-column>
            <el-table-column prop="gzlx" label="故障类型" width="120" align="center"></el-table-column>
            <el-table-column prop="appraiseStatus" label="处理状态" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.status==1">故障新增</span>
                <span v-if="scope.row.status==2">故障查找</span>
                <span v-if="scope.row.status==3">抢修准备</span>
                <span v-if="scope.row.status==4">抢修开展</span>
              </template>
            </el-table-column>
            <el-table-column prop="yylx" label="原因类型" align="center"></el-table-column>
            <el-table-column prop="gzyy" label="故障原因" align="center"></el-table-column>
            <el-table-column prop="hfsdsj" label="恢复送电时间" width="160" align="center"></el-table-column>
            <el-table-column prop="gzfxbg" label="故障分析报告" width="120" align="center">
              <template slot-scope="scope">
                <p style="text-align: center;">
                <el-button class="onSearch" size="small" @click="downLoadQxbg(scope.row)">下载</el-button>
                <!--<el-upload-->
                <!--class="upload-demo"-->
                <!--:action="actionReport"-->
                <!--:limit="1"-->
                <!--with-credentials-->
                <!--:http-request="httpRequestReport"-->
                <!--:file-list="fileListReport"-->
                <!--:on-exceed="onExceed"-->
                <!--&gt;-->
                <!--<el-button class="onSearch" size="small">上传</el-button>-->
                <!--</el-upload>--></p>
              </template>
            </el-table-column>
            <el-table-column prop="sgyjqxd" label="事故应急抢修单" width="120" align="center" v-if="YxxHideButtomStatus">
              <template slot-scope="scope">
                <!--<el-button class="onSearch" size="small">上传</el-button>-->
                <el-upload
                  class="upload-demo"
                  :action="action"
                  :limit="1"
                  :http-request="httpRequest"
                  :file-list="fileList"
                  :on-exceed="onExceed"
                >
                  <el-button class="onSearch" size="small" @click="upLoadQxdBtn(scope.row)">上传</el-button>
                </el-upload>
              </template>
            </el-table-column>
            <el-table-column align="center" :label="OperationBar_name" width="300" fixed="right">
              <template slot-scope="scope">
                <p style="text-align: center;">
                <el-button class="onSearch" size="small" @click="faultProgress(scope.row)" v-if="YxxHideButtomStatus">抢修进度</el-button>
                <el-button class="onSearch" size="small" @click="reasonFuc(scope.row)" v-if="YxxHideButtomStatus">原因分析</el-button>
                <el-button class="onSearch" size="small" @click="downLoadQxd(scope.row)">下载</el-button></p>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="form.total>0"
            :total="form.total"
            :page.sync="form.pageNum"
            :limit.sync="form.pageSize"
            @pagination="getList"
          />
        </div>
      </div>
    </div>
    <!--新增弹窗-->
    <div class="xs-hastitle">
      <el-dialog
        :visible.sync="isAddshowDialog"
        title="新增"
        v-dialogDrag
        :center="true"
        :before-close="handleClose_add"
      >
        <el-form
          ref="formRules"
          :model="add"
          :rules="formRules"
          label-position="left"
          style="width:100% ;margin: 0 auto;"
        >
          <div class="Form-input">
            <el-form-item
              :label="`故障${$xl}名称：`"
              label-width="130px"
              prop="gzxlid"
              style="width: 50%;"
            >
              <el-select
                v-model="add.gzxlid"
                clearable
                filterable
                placeholder="请选择"
                @change="getDlList"
              >
                <el-option
                  v-for="item in selection.linesSelectArr"
                  :key="item.id"
                  :label="item.lineName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              :label="`所属${$dl}：`"
              label-width="130px"
              style="width: 50%;"
            >
              <el-select v-model="add.ssdlid" clearable placeholder="请选择" @change="setXw">
                <el-option
                  v-for="item in selection.dlSelectArr"
                  :key="item.id"
                  :label="item.logicCableStageName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="Form-input">
            <el-form-item :label="`${$dydj}：`" label-width="130px"  style="width: 50%;">
              <el-select v-model="add.dydj" placeholder="请选择" disabled>
                <el-option
                  v-for="item in selection.dySelectArr"
                  :key="item.kv"
                  :label="item.kv"
                  :value="item.kv"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="`故障${$xb}：`" label-width="130px"  style="width: 50%;">
              <el-input v-model="add.gzxb" disabled />
            </el-form-item>
            <!--<div class="form-item">-->
            <!--<label class="form-label">{{$dydj}}：</label>-->
            <!--&lt;!&ndash;<el-input v-model="add.dydj" clearable />&ndash;&gt;-->
            <!--<el-select v-model="add.dydj" placeholder="请选择" disabled>-->
            <!--<el-option v-for="item in selection.dySelectArr" :key="item.kv" :label="item.kv" :value="item.kv"></el-option>-->
            <!--</el-select>-->
            <!--</div>-->
            <!--<div class="form-item">-->
            <!--<label class="form-label">故障{{$xb}}：</label>-->
            <!--&lt;!&ndash;<el-input v-model="add.gzxb" clearable />&ndash;&gt;-->
            <!--<el-input v-model="add.gzxb" disabled="" />-->
            <!--</div>-->
          </div>
          <div class="Form-input">
            <el-form-item label="设备类型：" label-width="130px"  style="width: 50%;">
              <el-select v-model="add.sblx" clearable placeholder="请选择" @change="getSblxList">
                <el-option
                  v-for="(item,ind) in selection.sblxArr"
                  :key="ind"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="故障设备名称：" label-width="130px"  style="width: 50%;">
              <el-select v-model="add.gzsbmc" clearable placeholder="请选择">
                <el-option
                  v-for="(item) in selection.sbmcArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <!--<div class="form-item">-->
            <!--<label class="form-label">设备类型：</label>-->
            <!--&lt;!&ndash;<el-input v-model="add.sblx" clearable />&ndash;&gt;-->
            <!--<el-select v-model="add.sblx" clearable placeholder="请选择" @change='getSblxList'>-->
            <!--<el-option v-for="(item,ind) in selection.sblxArr" :key="ind" :label="item" :value="item"></el-option>-->
            <!--</el-select>-->
            <!--</div>-->
            <!--<div class="form-item">-->
            <!--<label class="form-label">故障设备名：</label>-->
            <!--&lt;!&ndash;<el-input v-model="add.gzsbmc" clearable />&ndash;&gt;-->
            <!--<el-select v-model="add.gzsbmc" clearable placeholder="请选择">-->
            <!--<el-option v-for="(item) in selection.sbmcArr" :key="item.id" :label="item.name" :value="item.name"></el-option>-->
            <!--</el-select>-->
            <!--</div>-->
          </div>
          <div class="Form-input">
            <el-form-item label="故障运维班组：" label-width="130px"  style="width: 50%;">
              <el-select v-model="add.yybzid" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.jcbzSelectArr"
                  :key="item.objId"
                  :label="item.groupname"
                  :value="item.objId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="故障发生时间：" label-width="130px" prop="gzfssj" style="width: 50%;">
              <el-date-picker
                style="width: 100%;"
                v-model="add.gzfssj"
                type="datetime"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
            <!--<div class="form-item">-->
            <!--<label class="form-label">故障运维班组：</label>-->
            <!--&lt;!&ndash;<el-input v-model="add.yybzmc" clearable />&ndash;&gt;-->
            <!--<el-select v-model="add.yybzid" clearable placeholder="请选择">-->
            <!--<el-option v-for="item in selection.jcbzSelectArr" :key="item.objId" :label="item.groupname" :value="item.objId"></el-option>-->
            <!--</el-select>-->
            <!--</div>-->
            <!--<div class="form-item">-->
            <!--<label class="form-label">故障发生时间：</label>-->
            <!--&lt;!&ndash;<el-input v-model="add.gzfssj" clearable />&ndash;&gt;-->
            <!--<el-date-picker-->
            <!--style="width: 100%;"-->
            <!--v-model="add.gzfssj"-->
            <!--type="datetime"-->
            <!--placeholder="选择日期"-->
            <!--value-format="yyyy-MM-dd HH:mm:ss"-->
            <!--&gt;</el-date-picker>-->
            <!--</div>-->
          </div>
          <div class="Form-input">
            <el-form-item
              :label="`${$bdz}名称：`"
              label-width="130px"
              style="width: 50%;"
            >
              <el-input v-model="add.bdzmc" clearable />
            </el-form-item>
            <el-form-item label="接到通知时间：" label-width="130px"  style="width: 50%;">
              <el-date-picker
                style="width: 100%;"
                v-model="add.jdtzsj"
                type="datetime"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
            <!--<div class="form-item">-->
            <!--<label class="form-label">{{$bdz}}名称：</label>-->
            <!--<el-input v-model="add.bdzmc" clearable />-->
            <!--</div>-->
            <!--<div class="form-item">-->
            <!--<label class="form-label">接到通知时间：</label>-->
            <!--&lt;!&ndash;<el-input v-model="add.jdtzsj" clearable />&ndash;&gt;-->
            <!--<el-date-picker-->
            <!--style="width: 100%;"-->
            <!--v-model="add.jdtzsj"-->
            <!--type="datetime"-->
            <!--placeholder="选择日期"-->
            <!--value-format="yyyy-MM-dd HH:mm:ss"-->
            <!--&gt;</el-date-picker>-->
            <!--</div>-->
          </div>
          <div class="Form-input">
            <el-form-item label="当值值班长：" label-width="130px"  style="width: 50%;">
              <el-input v-model="add.zbz" clearable />
            </el-form-item>
            <el-form-item label="登记部门名称：" label-width="130px"  style="width: 50%;">
              <el-input v-model="add.djbmmc" clearable />
            </el-form-item>
            <!--<div class="form-item">-->
            <!--<label class="form-label">当值值班长：</label>-->
            <!--<el-input v-model="add.zbz" clearable />-->
            <!--</div>-->
            <!--<div class="form-item">-->
            <!--<label class="form-label">登记部门名称：</label>-->
            <!--<el-input v-model="add.djbmmc" clearable />-->
            <!--</div>-->
          </div>
          <div class="Form-input">
            <el-form-item label="故障跳闸时间：" label-width="130px"  style="width: 50%;">
              <el-date-picker
                style="width: 100%;"
                v-model="add.gztzsj"
                type="datetime"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="是否跳闸：" label-width="130px"  style="width: 50%;">
              <el-radio-group v-model="add.istz" style="padding: 12px">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <!--<div class="form-item">-->
            <!--<label class="form-label">故障跳闸时间：</label>-->
            <!--&lt;!&ndash;<el-input v-model="add.gztzsj" clearable />&ndash;&gt;-->
            <!--<el-date-picker-->
            <!--style="width: 100%;"-->
            <!--v-model="add.gztzsj"-->
            <!--type="datetime"-->
            <!--placeholder="选择日期"-->
            <!--value-format="yyyy-MM-dd HH:mm:ss"-->
            <!--&gt;</el-date-picker>-->
            <!--</div>-->
            <!--<div class="form-item">-->
            <!--<label class="form-label" style="width: 31%;">是否跳闸：</label>-->
            <!--&lt;!&ndash;<el-input v-model="add.istz" clearable />&ndash;&gt;-->
            <!--<el-radio-group v-model="add.istz" style="padding: 12px">-->
            <!--<el-radio label="1">是</el-radio>-->
            <!--<el-radio label="0">否</el-radio>-->
            <!--</el-radio-group>-->
            <!--</div>-->
          </div>
          <div class="Form-input">
            <el-form-item label="自动装置情况：" label-width="130px"  style="width: 50%;">
              <el-input v-model="add.zdzzqk" clearable />
            </el-form-item>
            <el-form-item label="所属单位名称：" label-width="130px"  style="width: 50%;">
              <el-input v-model="add.dwmc" clearable />
            </el-form-item>
          </div>
          <div class="Form-input">
            <el-form-item label="巡视结果：" label-width="130px"  style="width: 50%;">
              <el-input v-model="add.xsjg" type="textarea" :rows="2" clearable />
            </el-form-item>
            <el-form-item label="处理结果：" label-width="130px"  style="width: 50%;">
              <el-input v-model="add.cljg" type="textarea" :rows="2" clearable />
            </el-form-item>
          </div>
          <div class="Form-input">
            <el-form-item label="结算情况：" label-width="130px"  style="width: 50%;">
              <el-input v-model="add.jsqk" type="textarea" :rows="2" clearable />
            </el-form-item>
            <el-form-item label="处理单位：" label-width="130px"  style="width: 50%;">
              <el-input v-model="add.cldw" clearable />
            </el-form-item>
          </div>
          <div class="Form-input">
            <div class="form-long-item" style="height: auto">
              <label class="form-label" style="width: 11%;font-size: 14px;">上传图片：</label>
              <el-upload
                v-if="!add.sctp"
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
                <img width="100%" :src="add.sctp" alt />
              </el-dialog>
              <div class="imgCont" v-if="add.sctp">
                <img :src='add.sctp' alt="" style="width: 150px;height: 150px;">
                <div class="doImgBtn">
                  <i class="el-icon-delete del" @click="delImg()"></i>
                </div>
              </div>
            </div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="UserSearchFun" @click="SuerFun">保存</el-button>
          <el-button class="onSearch" @click="handleClose_add">取 消</el-button>
        </div>
      </el-dialog>
    </div>
    <!--抢修进度弹窗-->
    <el-dialog
      :visible.sync="isProgressShowDialog"
      title="抢修进度"
      v-dialogDrag
      :center="true"
      top="2vh"
      :before-close="handleClose"
    >
      <fault-progress ref="faultProgressMod" :qsStatus="qsStatus" :clickID="clickID"></fault-progress>
    </el-dialog>
    <!--原因分析-->
    <reason-analyze
      ref="reasonAnalyze"
      @childFn="parentFn"
      :isShowDialog="isShowDialog"
      :clickID="clickID"
    ></reason-analyze>
    <!--查看弹窗-->
    <look-detail
      ref="LookDetail"
      @childFn="parentFnLook"
      :isShowDialog="isShowDialogLook"
      :clickID="clickID"
    ></look-detail>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import {
  getSelectList,
  List,
  Add,
  DeleteList,
  uploadQxbg,
  uploadQxd,
  uploadAndSaveQxd
} from "@/api/faultManagement/faultDesign/faultDesign";
import FaultProgress from "@/views/falutManage/falutDesign/view";
import ReasonAnalyze from "@/views/falutManage/falutDesign/ReasonAnalyze";
import LookDetail from "@/views/falutManage/falutDesign/LookDetail";
import {
  linesSelect, // xl下拉
  dlSelect, // dl下拉
  plangetSb, // 获取 设备名称
  jcbzSelect // 检测班组
} from "@/api/liveDetectionManage";
export default {
  name: "faultDesign",
  components: {
    Pagination,
    FaultProgress,
    ReasonAnalyze,
    LookDetail
  },
  data() {
    return {
      OperationBar_name:'操作',
      OperationBar_width:300,//列表操作栏宽度
      YxxHideButtomStatus:true,//有效性来源控制按钮
      isview: true,
      isAddshowDialog: false, // 新增弹窗
      isProgressShowDialog: false, // 抢修进度弹窗
      isShowDialog: false, // 原因分析弹窗
      isShowDialogLook: false, // 查看详情
      isEdit: false,
      isAdd: false,
      selectParam: {
        fzmc: ""
      },
      transportTime: [], // 查询条件故障时间
      form: {
        gzlx: null,
        yylx: null,
        gzyy: null,
        gzfssj: null,
        status: null,
        startTime: "",
        endTime: "",
        iswc: "", // 处理状态
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      add: {
        gzxlid: "", // 故障xlid
        gzxlmc: "",
        ssdlid: "", // 所属dlid
        ssdlmc: "",
        dydj: "",
        gzxb: "",
        sblx: "",
        gzsbmc: "",
        yybzid: "", // 运维班组id
        yybzmc: "",
        gzfssj: "",
        bdzmc: "",
        jdtzsj: "",
        zbz: "",
        djbmmc: "",
        gztzsj: "",
        istz: "",
        zdzzqk: "",
        dwmc: "",
        xsjg: '', // 巡视结果
        cljg: '', // 处理结果
        jsqk: '', // 结算情况
        cldw: '', // 处理单位
        sctp: '', // 上传图片
      },
      xcPicUPloadUrl: process.env.VUE_APP_BASE_API + '/cable/file/upload?type=xctpImg',
      diaLogForm: {
        imgBroadcastList: [], // 储存选中的图片列表
        imgsStr: "" // 后端需要的多张图base64字符串 , 分割
      },
      dialogVisible: false,
      dialogImageUrl: "",
      formRules: {
        gzxlid: [
          {
            required: true,
            message: "请选择故障" + this.$xl,
            trigger: "change"
          }
        ],
        ssdlid: [
          {
            required: true,
            message: "请选择所属" + this.$dl,
            trigger: "change"
          }
        ],
        sblx: [
          { required: true, message: "请选择设备类型", trigger: "change" }
        ],
        gzsbmc: [
          { required: true, message: "请选择设备类型", trigger: "change" }
        ],
        yybzid: [
          { required: true, message: "请选择故障运维班组", trigger: "change" }
        ],
        gzfssj: [
          { required: true, message: "请选择故障发生时间", trigger: "change" }
        ],
        istz: [
          { required: true, message: "请选择是否跳闸", trigger: "change" }
        ],
        zdzzqk: [
          { required: true, message: "请输入自动装置情况", trigger: "blur" }
        ],
        dwmc: [
          { required: true, message: "请输入所属单位名称", trigger: "blur" }
        ]
      },
      statusEvaluate: [
        {
          value: "1",
          label: "选项1"
        }
      ],
      selection: {
        gzlx: [],
        yylx: [],
        gzyy: [],
        status: [
          {
            value: 1,
            label: "已处理"
          },
          {
            value: 0,
            label: "未处理"
          }
        ],
        linesSelectArr: [], // xl名称
        dlSelectArr: [], // dl
        sbmcArr: [], // 设备名称
        sblxArr: [
          this.$dl + "终端",
          this.$dl + "本体",
          this.$dl + "接头",
          this.$dl + "分支箱",
          "交叉互联箱",
          this.$dl + "接地箱"
        ], // 检测设备类型
        jcbzSelectArr: [] // 运维班组
      },
      onceChosenId: "", // 当前选中的id
      //选中的数据
      CheckedSelection: [],
      selectedIDs: [],
      tableData: [],
      clickID: null,
      qsStatus: "", // 当前状态
      actionReport: "#", // 上传分析报告
      fileListReport: [],
      qxbgLj: "", // 抢修报告路径
      action: "#", // 上传抢修单
      fileList: [],
      qxdLj: "" // 抢修单路径
    };
  },
  props: {
    //如果该参数不为空值证明被状态管理有效性调用
    Yxxobjpgc: {
      type: Object,
      default: function() {
        return {

        }
      }
    }
  },
  created() {
    linesSelect().then(res => {
      // xl
      this.selection.linesSelectArr = res.data.rows;
    });
    jcbzSelect().then(res => {
      // 检测班组
      this.selection.jcbzSelectArr = res.data.rows;
    });
  },
  mounted() {
    //状态管理有效性来源 如果该参数不为空则表示该页被状态管理有效性调用
    if(Object.keys(this.Yxxobjpgc).length > 0){
      this.YxxHideButtomStatus=this.Yxxobjpgc.show//如果被状态管理有效性调用隐藏不需要的按钮
      this.$refs.contentref.style.borderColor = "white";//隐藏掉content的上边框线
      this.OperationBar_width=180
      this.OperationBar_name='抢修报告单'
    }
    this.getList();
    this.getSelect();
  },
  methods: {
    // 获取下拉内容
    getSelect() {
      getSelectList("故障类型").then(response => {
        // //console.log(response);
        this.selection.gzlx = response.data.rows;
      });
      getSelectList("故障原因类型").then(response => {
        // //console.log(response);
        this.selection.yylx = response.data.rows;
      });
      getSelectList("故障原因").then(response => {
        // //console.log(response);
        this.selection.gzyy = response.data.rows;
      });
    },
    /** xl change 获取dl */
    getDlList(lineId) {
      dlSelect({ lineId }).then(res => {
        // dl
        this.selection.dlSelectArr = res.data.rows;
      });
      //console.log(lineId);
      let dydl = this.selection.linesSelectArr.filter(res => {
        if (res.id == this.add.gzxlid) {
          return res;
        }
      });
      //console.log(dydl);
      this.add.dydj = dydl[0] ? dydl[0]["voltageRank"] : "";
      if (!dydl[0]) {
        this.selection.dlSelectArr = [];
        this.selection.sbmcArr = [];
        this.add.ssdlid = "";
        this.add.gzsbmc = "";
        return;
      }

      dlSelect({ lineId }).then(res => {
        // dl
        this.selection.dlSelectArr = res.data.rows;
        this.add.dlid = "";
      });
      this.add.gzsbmc = "";
      //console.log(this.add);
      if (!!this.add.sblx && !!this.add.gzxlid) {
        plangetSb({ xlid: lineId, sblx: this.add.sblx }).then(
          res => {
            // 设备名称 plangetSb
            //console.log(res);
            this.selection.sbmcArr = res.data.data;
          },
          () => {
            this.selection.sbmcArr = [];
          }
        );
      } else {
        this.selection.sbmcArr = [];
      }
    },
    /** dl change 获取故障xb */
    setXw() {
      let xwdl = this.selection.dlSelectArr.filter(res => {
        if (res.id == this.add.ssdlid) {
          return res;
        }
      });
      this.add.gzxb = xwdl[0] ? xwdl[0]["phase"] : "";
    },
    /** 设备类型  change 获取设备名称 */
    getSblxList(ind) {
      this.add.gzsbmc = "";

      if (!!this.add.sblx && !!this.add.gzxlid) {
        plangetSb({ xlid: this.add.gzxlid, sblx: ind }).then(res => {
          //console.log(res);
          // 设备名称 plangetSb
          this.selection.sbmcArr = res.data.data;
        });
      } else {
        this.selection.sbmcArr = [];
        this.add.sbmc = "";
      }
    },
    // 重置
    reset() {
      // //console.log("reset");
      this.form = { brand_right: 0 };
      this.form.pageNum = 1;
      this.form.pageSize = 10;
      this.getList();
    },
    /**查询 */
    onSearch() {
      // if (this.form.gzlx) { // 故障类型
      //   let searcharr = this.selection.gzlx.filter(res=>{
      //     return this.form.gzlx == res.bzid
      //   })
      //   this.form.gzlx = searcharr[0]['bzmc']
      // }
      // if (this.form.yylx) { // 原因类型
      //   let searcharr = this.selection.yylx.filter(res=>{
      //     return this.form.yylx == res.bzid
      //   })
      //   this.form.yylx = searcharr[0]['bzmc']
      // }
      // if (this.form.gzyy) { // 故障原因
      //   let searcharr = this.selection.gzyy.filter(res=>{
      //     return this.form.gzyy == res.bzid
      //   })
      //   this.form.gzyy = searcharr[0]['bzmc']
      // }
      if (this.transportTime) {
        this.form.startTime = this.transportTime[0];
        this.form.endTime = this.transportTime[1];
      }
      this.form.pageNum = 1;
      this.getList();
    },
    /**获取数据 */
    getList() {
      List(this.$qs.stringify(this.form)).then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.tableData = response.data.rows;
          this.form.total = response.data.total;
        }
      });
    },
    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val;
      //console.log(this.CheckedSelection);
      let ids = [];
      this.CheckedSelection.map(item => {
        ids.push(item.id);
      });
      var chosenId = ids.join(); // 数组转字符串
      // var chosenId = ids.join(","); // 数组转字符串
      this.selectedIDs = chosenId; //选中数据中的所有id
    },
    /**查看 */
    view(val) {
      this.isShowDialogLook = true;
      this.clickID = val.id;
    },
    // 上传图片
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
      this.add.sctp = process.env.VUE_APP_BASE_API + res.msg
      //console.log(file);
    },
    // 有图片移除后 触发
    imgBroadcastRemove(file, fileList) {
      //console.log(file);
      //console.log(fileList);
      this.diaLogForm.imgBroadcastList = fileList;
    },
    delImg(ind) {
      this.add.sctp = ''
    },

    /**新增 */
    AddFn() {
      // //console.log("新增");
      this.isAddshowDialog = true;
    },
    /**
     * 新增确认按钮
     */
    SuerFun() {
      if (this.add.gzxlid) {
        // 故障xl
        let searcharr = this.selection.linesSelectArr.filter(res => {
          return this.add.gzxlid == res.id;
        });
        //console.log(searcharr);
        this.add.gzxlmc = searcharr[0]["lineName"];
      }
      if (this.add.ssdlid) {
        // 故障dl
        let searcharr = this.selection.dlSelectArr.filter(res => {
          return this.add.ssdlid == res.id;
        });
        this.add.ssdlmc = searcharr[0]["logicCableStageName"];
      }
      if (this.add.yybzid) {
        // 运维班组
        let searcharr = this.selection.jcbzSelectArr.filter(res => {
          //console.log(this.add.yybzid);
          //console.log(res);
          return this.add.yybzid == res.objId;
        });
        this.add.yybzmc = searcharr[0]["groupname"];
      }
      this.$refs["formRules"].validate(val => {
        if (val) {
          let list = this.$qs.stringify(this.add);
          Add(list).then(response => {
            //console.log(response);
            if (response.status == 200) {
              this.$message({
                message: "新增成功",
                type: "success"
              });
            }
            this.isAddshowDialog = false;
            this.add = { brand_right: 0 };
            this.getList();
          });
        } else {
          this.$message({
            message: "必填项未填！！！",
            type: "error"
          });
        }
      });
    },
    /**删除 */
    DelFn() {
      if (this.CheckedSelection.length <= 0) {
        this.$message("请选择一条要删除的数据");
        return false;
      }
      this.$confirm("确认要删除数据吗？")
        .then(_ => {
          DeleteList(this.selectedIDs).then(res => {
            // //console.log(res);
            this.getList();
            this.$message({
              message: "删除成功",
              type: "success"
            });
          });
          done();
        })
        .catch(_ => {});
    },
    // 上传检修报告
    httpRequestReport(param) {
      let formData = new FormData();
      formData.append("file", param.file);
      formData.append("type", "repairReportList");
      uploadQxbg(formData).then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.$message({
            message: "上传成功",
            type: "success"
          });
          this.getList();
        } else {
          this.$message({
            message: "上传失败",
            type: "error"
          });
        }
      });
    },
    // 上传抢修单
    upLoadQxdBtn(val) {
      // //console.log(val);
      this.onceChosenId = val.id;
    },
    httpRequest(param) {
      //console.log(param, "上传抢修单");
      let formData = new FormData();
      formData.append("file", param.file);
      formData.append("type", "repairList");
      uploadQxd(formData).then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.$message({
            message: "上传成功",
            type: "success"
          });
          let qxdUrl = {
            sgyjqxd: response.data.msg,
            id: this.onceChosenId
          };
          uploadAndSaveQxd(this.$qs.stringify(qxdUrl)).then(res => {
            //console.log(res);
          });
          this.getList();
          this.qxdLj = response.data.msg;
        } else {
          this.$message({
            message: "上传失败",
            type: "error"
          });
        }
      });
    },
    onExceed(file, fileList) {
      //console.log(fileList);
    },
    // 抢修进度
    faultProgress(val) {
      //console.log(val);
      this.isProgressShowDialog = true;
      this.clickID = val.id;
      this.qsStatus = val.status;
    },
    // 原因分析
    reasonFuc(val) {
      this.isShowDialog = true;
      this.clickID = val.id;
      this.$refs.reasonAnalyze.getReasonInfo(val.id); // 调用子页面方法
      this.$refs.reasonAnalyze.getAnalyzeInfo(val.id); // 调用子页面方法
    },
    // 下载
    downLoadQxbg(val) {
      if (val.gzfxbg) {
        window.location.href =
        process.env.VUE_APP_BASE_API +
        "/common/downloadFile?url=" +
        val.gzfxbg;
        this.$message({
          message: "请稍等正在下载...",
          type: "success"
        });
      } else {
        this.$message({
          message: "暂无故障分析报告",
          type: "warning"
        });
      }
    },
    downLoadQxd(val) {
      //console.log(val);
      if (val.sgyjqxd) {
        // //console.log(process.env.VUE_APP_BASE_API + val.sgyjqxd);
        let a = document.createElement("a");
        a.href = process.env.VUE_APP_BASE_API + val.sgyjqxd;
        a.click();
        this.$message({
          message: "请稍等正在下载...",
          type: "success"
        });
      } else {
        this.$message({
          message: "暂无抢修报告单",
          type: "warning"
        });
      }
    },
    /**
     * 取消按钮
     */
    handleClose_add(done) {
      this.$confirm("确认关闭吗？")
        .then(_ => {
          this.isAddshowDialog = false;
          // 清空表单及验证
          this.$refs.formRules.clearValidate();
          this.$refs.formRules.resetFields();
          this.getList();
          done();
        })
        .catch(_ => {});
    },
    handleClose(done) {
      this.$confirm("确认关闭吗？")
        .then(_ => {
          this.isAddshowDialog = false;
          this.isProgressShowDialog = false;
          this.getList();
          done();
        })
        .catch(_ => {});
    },
    /**
     * 接收查看/编辑子组件的数据
     */
    parentFn(val) {
      this.isShowDialog = val.showDialog;
    },
    parentFnLook(val) {
      this.isShowDialogLook = val.showDialog;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
.form-item .form-label {
  width: 45%;
}
.el-upload-list {
  display: none;
}
/*输入框样式*/
.el-form--label-left .el-form-item__label {
  text-align: right;
}
.Form-input {
  margin-bottom: 1.5rem;
}
</style>
