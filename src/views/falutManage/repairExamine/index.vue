<template>
  <!-- <div> -->
  <!-- <h2>抢修资源审批</h2> -->
  <div>
    <!--{{usid}}-->
    <div class="main-body">
      <div class="main-userSelect">
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <el-form-item :label="`故障${$xl}名:`">
              <el-select v-model="form.gzxlid" clearable filterable placeholder="请选择">
                <el-option
                  v-for="item in selection.linesSelectArr"
                  :key="item.id"
                  :label="item.lineName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <!--<el-form-item label="故障类别:">-->
              <!--<el-select v-model="form.gzlb" clearable placeholder="请选择">-->
                <!--<el-option-->
                  <!--v-for="item in selection.gzlb"-->
                  <!--:key="item.bzid"-->
                  <!--:label="item.bzmc"-->
                  <!--:value="item.bzid"-->
                <!--&gt;</el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item label="故障类型:">
              <el-select v-model="form.gzlx" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.gzlx"
                  :key="item.bzid"
                  :label="item.bzmc"
                  :value="item.bzid"
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
        <!--<div class="respont-content">-->
          <!--<el-form>-->
            <!--<el-col>-->
              <!--<el-form-item style="float: left;">-->
                <!--<el-button class="onSearch">-->
                  <!--<i class="el-icon-plus">新增</i>-->
                <!--</el-button>-->
                <!--<el-button type="danger" plain @click="DelFn">-->
                  <!--<i class="el-icon-close"></i> 删除-->
                <!--</el-button>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-form>-->
        <!--</div>-->
        <div class="table">
          <el-table
            :data="tableData"
            style="border: 1px solid #c4c8cf"
            height="500px"
            :cell-style="{borderColor: '#c4c8cf'}"
            :header-cell-style="{'background':'#cddce6',borderColor: '#c4c8cf'}"
            border
            fit
            highlight-current-row
          >
            <!--<el-table-column type="selection"  width="55" align="center"></el-table-column>-->
            <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
            <el-table-column prop="gzxlmc" :label="`故障${$xl}名称`" width="260" align="center"></el-table-column>
            <el-table-column prop="ssdlmc" :label="`所属${$dl}`" width="260" align="center"></el-table-column>
            <el-table-column prop="gzfssj" label="故障发生时间" width="160" align="center"></el-table-column>
            <el-table-column prop="gzlb" label="故障类别" width="160" align="center"></el-table-column>
            <el-table-column prop="gzlx" label="故障类型" width="160" align="center"></el-table-column>
            <el-table-column prop="zbz" label="当值值班长" width="120" align="center"></el-table-column>
            <el-table-column prop="qjrysl" label="抢修人员数量" width="120" align="center"></el-table-column>
            <el-table-column prop="qxwzsl" label="抢修物资数量" width="150" align="center"></el-table-column>
            <el-table-column prop="hfsdsj" label="恢复送电时间" width="200" align="center"></el-table-column>
            <el-table-column prop="dlxh" :label="`${$dl}型号`" width="150" align="center"></el-table-column>
            <el-table-column prop="zdzl" label="终端种类" width="250" align="center"></el-table-column>
            <el-table-column prop="qtsblx" label="其他设备类型" width="120" align="center"></el-table-column>
            <el-table-column prop="clr" label="待处理人" width="120" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.shzt==0">{{scope.row.zzshhr}}</span>
                <span v-if="scope.row.shzt==3">{{scope.row.zrshhr}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="shzt" label="处理状态" width="120" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.shzt==0">未审核</span>
                <span v-if="scope.row.shzt==1">同意</span>
                <span v-if="scope.row.shzt==2">拒绝</span>
                <span v-if="scope.row.shzt==3">审核中</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="120" fixed="right">
              <template slot-scope="scope">
                <el-button class="onSearch" v-if="scope.row.zrshhrid != usid && scope.row.zzshhrid == usid && scope.row.shzt ==0" size="small" @click="examine_zzsp(scope.row)">专职审批</el-button>
                <el-button class="onSearch" v-else-if="scope.row.zrshhrid == usid && scope.row.shzt ==3" size="small" @click="examine_zrsp(scope.row)">主任审批</el-button>
                <el-button class="onSearch" v-else size="small" @click="examine(scope.row)">查看</el-button>
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
          <!--专职弹窗-->
          <el-dialog
            :visible.sync="showZZDialog"
            title="抢修资源申请（专职）"
            v-dialogDrag
            :modal="false"
            :center="true"
            :before-close="handleClose_zz"
          >
            <el-form
              ref="dataForm"
              :model="form_zz"
              label-position="left"
              style="width:100% ;margin: 0 auto;"
            >
              <div class="Form-input">
                <div class="form-item">
                  <label class="form-label">抢修人员数量：</label>
                  <el-input v-model="form_zz.qjrysl" readonly/>
                </div>
                <div class="form-item">
                  <label class="form-label">抢修物资数量：</label>
                  <el-input v-model="form_zz.qxwzsl" readonly/>
                </div>
              </div>
              <div class="Form-input">
                <div class="form-item">
                  <label class="form-label" style="width: 27%;">处理是否完成：</label>
                  <!--<el-input v-model="add.iswc" clearable />-->
                  <el-radio-group v-model="form_zz.iswc" style="padding: 12px" disabled>
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </div>
                <div class="form-item">
                  <label class="form-label">恢复送电时间：</label>
                  <!--<el-input v-model="add.hfsdsj" clearable />-->
                  <el-date-picker
                    style="width: 100%;"
                    v-model="form_zz.hfsdsj"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    readonly
                  ></el-date-picker>
                </div>
              </div>
              <div class="Form-input">
                <div class="form-item">
                  <label class="form-label">{{$dl}}型号：</label>
                  <el-input v-model="form_zz.dlxh" readonly/>
                </div>
                <div class="form-item">
                  <label class="form-label">{{$dl}}长度：</label>
                  <el-input v-model="form_zz.dlcd" readonly/>
                </div>
              </div>
              <div class="Form-input">
                <div class="form-item">
                  <label class="form-label">终端种类：</label>
                  <el-input v-model="form_zz.zdzl" readonly/>
                </div>
                <div class="form-item">
                  <label class="form-label">终端数量：</label>
                  <el-input v-model="form_zz.zdsl" readonly/>
                </div>
              </div>
              <div class="Form-input">
                <div class="form-item">
                  <label class="form-label">其他设备类型：</label>
                  <el-input v-model="form_zz.qtsblx" readonly/>
                </div>
                <div class="form-item">
                  <label class="form-label">其他设备数量：</label>
                  <el-input v-model="form_zz.qtsbsl" readonly/>
                </div>
              </div>
              <div class="Form-input">
                <div class="form-item">
                  <label class="form-label">接头种类：</label>
                  <el-input v-model="form_zz.jtzl" readonly/>
                </div>
                <div class="form-item">
                  <label class="form-label">接头数量：</label>
                  <el-input v-model="form_zz.jtsl" readonly/>
                </div>
              </div>
              <div class="Form-title" style="font-size: 20px">
                <div class="form-item">
                  <label class="form-title">选择下一步</label>
                </div>
              </div>
              <div class="Form-input">
                <div class="form-item">
                  <label class="form-label" style="width: 27%;">审批意见：</label>
                  <!--<el-input v-model="add.iswc" clearable />-->
                  <el-radio-group v-model="form_zz.zzsh" style="padding: 12px">
                    <el-radio label="1">同意</el-radio>
                    <el-radio label="0">不同意</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <div class="Form-input" v-if="form_zz.zzsh == 1">
                <div class="form-item">
                  <label class="form-label">下一班组：</label>
                  <!--<el-input v-model="add_qxzy.spbz" clearable />-->
                  <el-select v-model="form_zz.zrbzid" clearable placeholder="请选择" @change='getJcrList'>
                    <el-option v-for="item in selection.groupsArr" :key="item.id" :label="item.groupName" :value="item.id"></el-option>
                  </el-select>
                </div>
                <div class="form-item">
                  <label class="form-label">下一审批人：</label>
                  <!--<el-input v-model="add_qxzy.zzshhr" clearable />-->
                  <el-select v-model="form_zz.xysprid" clearable placeholder="请选择">
                    <el-option v-for="item in jcrSelectArr" :key="item.objId" :label="item.name" :value="item.objId"></el-option>
                  </el-select>
                </div>
              </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button class="UserSearchFun" @click="SuerFun_zz">保存</el-button>
              <el-button class="onSearch" @click="handleClose_zz">取 消</el-button>
            </div>
          </el-dialog>
          <!--主任弹窗-->
          <el-dialog
            :visible.sync="showZRDialog"
            title="抢修资源申请（主任）"
            v-dialogDrag
            :modal="false"
            :center="true"
            :before-close="handleClose_zr"
          >
            <el-form
              ref="dataForm"
              :model="form_zr"
              label-position="left"
              style="width:100% ;margin: 0 auto;"
            >
              <div class="Form-input">
                <div class="form-item">
                  <label class="form-label">抢修人员数量：</label>
                  <el-input v-model="form_zr.qjrysl" readonly/>
                </div>
                <div class="form-item">
                  <label class="form-label">抢修物资数量：</label>
                  <el-input v-model="form_zr.qxwzsl" readonly/>
                </div>
              </div>
              <div class="Form-input">
                <div class="form-item">
                  <label class="form-label" style="width: 27%;">处理是否完成：</label>
                  <!--<el-input v-model="add.iswc" clearable />-->
                  <el-radio-group v-model="form_zr.iswc" style="padding: 12px" disabled>
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </div>
                <div class="form-item">
                  <label class="form-label">恢复送电时间：</label>
                  <!--<el-input v-model="add.hfsdsj" clearable />-->
                  <el-date-picker
                    style="width: 100%;"
                    v-model="form_zr.hfsdsj"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    readonly
                  ></el-date-picker>
                </div>
              </div>
              <div class="Form-input">
                <div class="form-item">
                  <label class="form-label">{{$dl}}型号：</label>
                  <el-input v-model="form_zr.dlxh" readonly/>
                </div>
                <div class="form-item">
                  <label class="form-label">{{$dl}}长度：</label>
                  <el-input v-model="form_zr.dlcd" readonly/>
                </div>
              </div>
              <div class="Form-input">
                <div class="form-item">
                  <label class="form-label">终端种类：</label>
                  <el-input v-model="form_zr.zdzl" readonly/>
                </div>
                <div class="form-item">
                  <label class="form-label">终端数量：</label>
                  <el-input v-model="form_zr.zdsl" readonly/>
                </div>
              </div>
              <div class="Form-input">
                <div class="form-item">
                  <label class="form-label">其他设备类型：</label>
                  <el-input v-model="form_zr.qtsblx" readonly/>
                </div>
                <div class="form-item">
                  <label class="form-label">其他设备数量：</label>
                  <el-input v-model="form_zr.qtsbsl" readonly/>
                </div>
              </div>
              <div class="Form-input">
                <div class="form-item">
                  <label class="form-label">接头种类：</label>
                  <el-input v-model="form_zr.jtzl" readonly/>
                </div>
                <div class="form-item">
                  <label class="form-label">接头数量：</label>
                  <el-input v-model="form_zr.jtsl" readonly/>
                </div>
              </div>
              <div class="Form-title" style="font-size: 20px">
                <div class="form-item">
                  <label class="form-title">选择下一步</label>
                </div>
              </div>
              <div class="Form-input">
                <div class="form-item">
                  <label class="form-label" style="width: 27%;">审批意见：</label>
                  <!--<el-input v-model="add.iswc" clearable />-->
                  <el-radio-group v-model="form_zr.zrsh" style="padding: 12px">
                    <el-radio label="1">同意</el-radio>
                    <el-radio label="0">不同意</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button class="UserSearchFun" @click="SuerFun_zr">保存</el-button>
              <el-button class="onSearch" @click="handleClose_zr">取 消</el-button>
            </div>
          </el-dialog>
          <!--查看弹窗-->
          <el-dialog
            :visible.sync="showLookDialog"
            title="抢修资源申请（查看）"
            v-dialogDrag
            :modal="false"
            :center="true"
          >
            <el-form
              ref="dataForm"
              :model="form_look"
              label-position="left"
              style="width:100% ;margin: 0 auto;"
            >
              <div class="Form-input">
                <div class="form-item">
                  <label class="form-label">抢修人员数量：</label>
                  <el-input v-model="form_look.qjrysl" readonly/>
                </div>
                <div class="form-item">
                  <label class="form-label">抢修物资数量：</label>
                  <el-input v-model="form_look.qxwzsl" readonly/>
                </div>
              </div>
              <div class="Form-input">
                <div class="form-item">
                  <label class="form-label" style="width: 27%;">处理是否完成：</label>
                  <!--<el-input v-model="add.iswc" clearable />-->
                  <el-radio-group v-model="form_look.iswc" style="padding: 12px" disabled>
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </div>
                <div class="form-item">
                  <label class="form-label">恢复送电时间：</label>
                  <!--<el-input v-model="add.hfsdsj" clearable />-->
                  <el-date-picker
                    style="width: 100%;"
                    v-model="form_look.hfsdsj"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    readonly
                  ></el-date-picker>
                </div>
              </div>
              <div class="Form-input">
                <div class="form-item">
                  <label class="form-label">{{$dl}}型号：</label>
                  <el-input v-model="form_look.dlxh" readonly/>
                </div>
                <div class="form-item">
                  <label class="form-label">{{$dl}}长度：</label>
                  <el-input v-model="form_look.dlcd" readonly/>
                </div>
              </div>
              <div class="Form-input">
                <div class="form-item">
                  <label class="form-label">终端种类：</label>
                  <el-input v-model="form_look.zdzl" readonly/>
                </div>
                <div class="form-item">
                  <label class="form-label">终端数量：</label>
                  <el-input v-model="form_look.zdsl" readonly/>
                </div>
              </div>
              <div class="Form-input">
                <div class="form-item">
                  <label class="form-label">其他设备类型：</label>
                  <el-input v-model="form_zr.qtsblx" readonly/>
                </div>
                <div class="form-item">
                  <label class="form-label">其他设备数量：</label>
                  <el-input v-model="form_look.qtsbsl" readonly/>
                </div>
              </div>
              <div class="Form-input">
                <div class="form-item">
                  <label class="form-label">接头种类：</label>
                  <el-input v-model="form_look.jtzl" readonly/>
                </div>
                <div class="form-item">
                  <label class="form-label">接头数量：</label>
                  <el-input v-model="form_look.jtsl" readonly/>
                </div>
              </div>
            </el-form>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { getUserId } from '@/utils/auth'
import { getSelectList } from '@/api/faultManagement/faultDesign/faultDesign'
import { List, groups, editList } from '@/api/faultManagement/repairExamine/repairExamine'
import { linesSelect, jcrSelect } from '@/api/liveDetectionManage'

export default {
  name: 'repairExamine',
  components: {
    Pagination
  },
  data() {
    return {
      selectParam: {
        fzmc: ''
      },
      formParam: {
        gzdjid: '',
      },
      isEnd: false,
      showZZDialog: false, // 专职审批弹窗
      showZRDialog: false, // 主任审批弹窗
      showLookDialog: false, // 查看
      form_zz: { // 专职form
        qjrysl: '',
        qxwzsl: '',
        iswc: '',
        hfsdsj: '',
        dlxh: '',
        dlcd: '',
        zdzl: '',
        zdsl: '',
        qtsblx: '',
        qtsbsl: '',
        jtzl: '',
        jtsl: '',
        zzsh: '', // 专职审核
        zrbzid: '', // 主任班组id
        zrbzmc: '',
        zrshhrid: '',
        xysprid: '', // 下一审核人id
        zrshhr: ''
      },
      form_zr: { // 主任form
        qjrysl: '',
        qxwzsl: '',
        iswc: '',
        hfsdsj: '',
        dlxh: '',
        dlcd: '',
        zdzl: '',
        zdsl: '',
        qtsblx: '',
        qtsbsl: '',
        jtzl: '',
        jtsl: '',
        zrsh: '', // 主任审核
      },
      form_look: { // 查看
        qjrysl: '',
        qxwzsl: '',
        iswc: '',
        hfsdsj: '',
        dlxh: '',
        dlcd: '',
        zdzl: '',
        zdsl: '',
        qtsblx: '',
        qtsbsl: '',
        jtzl: '',
        jtsl: ''
      },
      form: {
        gzxlid: '', // 故障xlid
        gzxlmc: '',
        gzlx: '', // 故障类型
        // gzlb: '', // 故障类别
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      // 选中的数据
      CheckedSelection: [],
      selectedIDs: [],
      tableData: [],
      jcrSelectArr: [],
      selection: {
        linesSelectArr: [], // xl名称
        gzlx: [], // 故障类型
        // gzlb: [], // 故障类别
        groupsArr: [], // 运维班组
      },
      usid:null
    };
  },
  created() {
    this.usid = getUserId();
    linesSelect().then(res => {
      // xl
      //console.log(res);
      this.selection.linesSelectArr = res.data.rows
    })
    getSelectList('故障类型').then(response => {
      // //console.log(response);
      this.selection.gzlx = response.data.rows
    })
    // 获取班组信息
    groups().then(res => {
      this.selection.groupsArr = res.data.data
    })
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 审批查看
    examine(val){
      this.showLookDialog = true
      this.form_look = val
    },
    // 专职审批
    examine_zzsp(val) {
      //console.log(val);
      this.showZZDialog = true
      this.form_zz = val
    },
    // 主任审批
    examine_zrsp(val) {
      this.showZRDialog = true
      this.form_zr = val
    },
    // 重置
    reset() {
      // //console.log("reset");
      this.form = { brand_right: 0 }
      this.form.pageNum = 1
      this.form.pageSize = 10
      this.getList()
    },
    /**查询 */
    onSearch() {
      if (this.form.gzxlid) { // 故障xl
        let searcharr = this.selection.linesSelectArr.filter(res=>{
          return this.form.gzxlid == res.id
        })
        this.form.gzxlmc = searcharr[0]['lineName']
      }
      if (this.form.gzlx) { // 故障类型
        let searcharr = this.selection.gzlx.filter(res=>{
          return this.form.gzlx == res.bzid
        })
        this.form.gzlx = searcharr[0]['bzmc']
      }
      this.form.pageNum = 1
      this.getList();
    },
    /**获取数据 */
    getList() {
      List(this.$qs.stringify(this.form)).then(response => {
        //console.log(response);
        if(response.status == 200) {
          this.tableData = response.data.rows
          this.form.total = response.data.total;
        }
      });
    },
    /** 运维班组change 获取检测人 */
    getJcrList(groupname) {
      let oneGroup = this.selection.groupsArr.filter(res => {
        return res.id == groupname
      })
      this.form_zz.zrshhrid = ''
      jcrSelect(oneGroup[0].groupName).then(res => {
        console.log(res);
        this.jcrSelectArr = res.data.data
      })
    },
    // 专职审批确认
    SuerFun_zz() {
      if (this.form_zz.zrbzid) {
        let searcharr = this.selection.groupsArr.filter(res=>{
          return this.form_zz.zrbzid == res.id
        })
        this.form_zz.zrbzmc = searcharr[0]['groupName']
      }
      if (this.form_zz.xysprid) {
        let searcharr = this.jcrSelectArr.filter(res=>{
          return this.form_zz.xysprid == res.objId
        })
        console.log(searcharr);
        this.form_zz.zrshhrid = this.form_zz.xysprid
        this.form_zz.zrshhr = searcharr[0]['name']
      }
      console.log(this.form_zz);
      editList(this.$qs.stringify(this.form_zz)).then(response => {
        //console.log(response);
        if(response.status == 200 && response.data.code == 0) {
          this.$message({
            message: '审批成功',
            type: 'success'
          })
          this.showZZDialog = false
          this.getList();
        }
      })
    },
    // 主任审批确认
    SuerFun_zr() {
      //console.log(this.form_zr);
      if(this.form_zr.zrsh == null) {
        this.$message({
          message: '请选择审批意见',
          type: 'warning'
        })
      }
      editList(this.$qs.stringify(this.form_zr)).then(response => {
        //console.log(response);
        if(response.status == 200 && response.data.code == 0) {
          this.$message({
            message: '审批成功',
            type: 'success'
          })
          this.showZRDialog = false
          this.getList();
        }
      })
    },
    /**
     * 取消按钮
     */
    handleClose_zz(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.showZZDialog = false
          done();
        })
        .catch(_ => {});
    },
    handleClose_zr(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.showZRDialog = false
          done();
        })
        .catch(_ => {});
    },
  }
};
</script>
<style lang="scss" scoped></style>
<style lang="scss">
  .form-item .form-label{
    width: 38%;
  }
</style>

