<template>
<!-- <h2>dl段</h2> -->
  <div class="hastitle">
    <el-dialog
      :visible.sync="showDialog"
      :title="`${$dl}段`"
      :center="true"
      top="5vh"
      v-dialogDrag
      :before-close="handleClose"
      append-to-body
    >
      <el-form
        ref="dataForm"
        :model="form"
        label-position="left"
        style="width:100% ;margin: 0 auto;"
      >
        <div class="Form-title">
          <div class="form-item">
            <label class="form-title">资产参数</label>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">资产性质：</label>
            <el-input v-model="form.assetNature" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">资产单位：</label>
            <el-input v-model="form.assetUnit" clearable :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">资产编号：</label>
            <el-input v-model="form.assetNumber" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">实物ID：</label>
            <el-input v-model="form.materialId" clearable :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">工程编号：</label>
            <el-input v-model="form.projectNumber" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">工程名称：</label>
            <el-input v-model="form.projectName" clearable :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">设备增加方式：</label>
            <el-input v-model="form.equipmentAddWay" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">流水码：</label>
            <el-input v-model="form.waterCode" clearable :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">WBS编码：</label>
            <el-input v-model="form.wbsCode" clearable :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-title">
          <div class="form-item">
            <label class="form-title">运行参数</label>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">设备名称：</label>
            <el-input v-model="form.physicalCableStageName" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">{{$xl}}名称：</label>
            <el-input v-model="form.lineName" clearable disabled/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">所属地市：</label>
            <el-input v-model="form.city" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">所属{{$dl}}：</label>
            <el-select v-model="form.logicCableId" clearable placeholder="请选择" :disabled="isdisabled">
              <el-option
                v-for="item in selection.cableList"
                :key="item.id"
                :label="item.logicCableStageName"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">运维单位：</label>
            <el-input v-model="form.unit" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">维护班组：</label>
            <!--<el-input v-model="form.groupId" clearable :disabled="isdisabled"/>-->
            <el-select v-model="form.groupId" clearable placeholder="请选择" :disabled="isdisabled">
              <el-option
                v-for="item in selection.ywbz"
                :key="item.groupId"
                :label="item.groupname"
                :value="item.groupId"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">{{$dydj}}：</label>
            <!--<el-input v-model="form.voltageRankCode" clearable :disabled="isdisabled"/>-->
            <el-select v-model="form.voltageRank" clearable placeholder="请选择" disabled>
              <el-option
                v-for="item in selection.dydj"
                :key="item.dydj"
                :label="item.dydjmc"
                :value="item.dydj"
              ></el-option>
            </el-select>
          </div>
          <div class="form-item">
            <label class="form-label">{{$xb}}：</label>
            <el-select
              v-model="form.phase"
              clearable
              placeholder="请选择"
              :disabled="isdisabled"
            >
              <el-option
                v-for="item in selection.xb"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">起点位置：</label>
            <el-input v-model="form.startPosition" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">终点位置：</label>
            <el-input v-model="form.endPosition" clearable :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">长度(m)：</label>
            <el-input v-model="form.length" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">敷设方式：</label>
            <el-input v-model="form.systemOfLaying" clearable :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">附加长度(m)：</label>
            <el-input v-model="form.accessoryLength" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">投运日期：</label>
            <!--<el-input v-model="form.transportTime" clearable :disabled="isdisabled"/>-->
            <el-col>
              <el-date-picker
                style="width: 100%;"
                v-model="form.transportTime"
                type="date"
                :disabled="isdisabled"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">设备状态：</label>
            <el-input v-model="form.facilityStatus" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">图纸编号：</label>
            <el-input v-model="form.drawingNumber" clearable :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">施工单位：</label>
            <el-input v-model="form.constructUnit" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">专业分类：</label>
            <el-input v-model="form.specialClass" clearable :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">设备主人：</label>
            <el-input v-model="form.facilityMaster" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">参考长度(m)：</label>
            <el-input v-model="form.consultLength	" clearable :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-title">
          <div class="form-item">
            <label class="form-title">物理参数</label>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">型号：</label>
            <el-input v-model="form.type" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">生产厂家：</label>
            <el-input v-model="form.makeFactory" clearable :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">出厂日期：</label>
            <!--<el-input v-model="form.lavelFactoryTime" clearable :disabled="isdisabled"/>-->
            <el-col>
              <el-date-picker
                style="width: 100%;"
                v-model="form.lavelFactoryTime"
                type="date"
                :disabled="isdisabled"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </div>
          <div class="form-item">
            <label class="form-label">额定电压({{$qf}})：</label>
            <el-input v-model="form.ratedVoltage" clearable :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">绝缘类型：</label>
            <el-input v-model="form.insulationType" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">芯数：</label>
            <el-input v-model="form.coreNumber" clearable :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">截面积(mm²)：</label>
            <el-input v-model="form.cutArea" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">载流量(A)：</label>
            <el-input v-model="form.loadFlow" clearable :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">最大允许电流：</label>
            <el-input v-model="form.maxAllowCurrent" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">线芯材料：</label>
            <el-input v-model="form.lineCoreMaterial" clearable :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-title">
          <div class="form-item">
            <label class="form-title">其他参数</label>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">{{$dl}}段ID：</label>
            <el-input v-model="form.id" clearable disabled/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">设备编码：</label>
            <el-input v-model="form.facilityNumber" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">登记时间：</label>
            <!--<el-input v-model="form.registerTime" clearable :disabled="isdisabled"/>-->
            <el-col>
              <el-date-picker
                style="width: 100%;"
                v-model="form.registerTime"
                type="date"
                :disabled="isdisabled"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">发布状态：</label>
            <el-select v-model="form.publishStatus" clearable placeholder="请选择" :disabled="isdisabled">
              <el-option
                v-for="item in selection.fbzt"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">备注：</label>
              <el-input type="textarea" v-model="form.remark" :disabled="isdisabled"></el-input>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" v-if="editbtn||addbtn" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" v-if="editbtn||addbtn" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  List,
  Add,
  DeleteList,
  Edit
} from "@/api/cableandchannel/cable-equipment-ledger/Line/cablesection";
import { fatherList,getLineSelect } from '@/api/cableandchannel/cable-equipment-ledger/Line/index';
import {
  ExportFn
} from '@/api/public';
export default {
  props: {
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
    gruClickID: {
      default: null
    },
    forForm: {
      default: null
    },
    /**
     * 接收是否打开页面
     */
    isAdd: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      thisopenID: this.openID, // 把父页面传的值存起来
      ClickID: this.gruClickID, // 把祖父页面传的值存起来
      forValue: this.forForm,
      formParam: {
        id: this.gruClickID, // dlid
      },
      form: {
        lineId: this.gruClickID,
        assetNature: '',
        assetUnit: '',
        assetNumber: '',
        materialId: '',
        physicalCableStageName: '',
        mainLineName: '',
        projectNumber: '',
        projectName: '',
        equipmentAddWay: '',
        logicCableStageId: '',
        logicCableStageName: '',
        waterCode: '',
        wbsCode: '',
        lineName: '',
        remake: '',
        city: '',
        logicCableId: '',
        logicCableName: '',
        unit: '',
        groupId: '',
        groupName: '',
        voltageRank: '',
        voltageRankCode: '',
        phase: '',
        startPosition: '',
        endPosition: '',
        length: '',
        systemOfLaying: '',
        accessoryLength: '', // 附加长度
        transportTime: '',
        facilityStatus: '',
        drawingNumber: '',
        constructUnit: '',
        specialClass: '',
        facilityMaster: '',
        consultLength: '',
        type: '',
        makeFactory: '',
        lavelFactoryTime: '',
        ratedVoltage: '',
        insulationType: '',
        coreNumber: '',
        cutArea: '',
        loadFlow: '',
        maxAllowCurrent: '',
        lineCoreMaterial: '',
        facilityNumber: '',
        registerTime: '',
        publishStatus: ''
      },
      selection: {
        ywdw: [],
        dydj: [],
        zcdw: [],
        xlmc: [],
        fsfs: [],
        ywbz: [],
        cableList: [],
        xb: [{
          name: 'A',
          value: 1,
        },{
          name: 'B',
          value: 2,
        },{
          name: 'C',
          value: 3,
        },{
          name: 'ABC',
          value: 4,
        }],
        fbzt: [{
          name: '发布',
          value: 1,
        },{
          name: '未发布',
          value: 2,
        }]
      },
      showDialog: true, //打开弹框
      editbtn: this.isEdit, //是否是编辑按钮
      addbtn:this.isAdd,//是否是新增按钮
    };
  },
  computed: {
    /**计算是否可读 */
    isdisabled() {
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
    isAdd(val){
      // this.selection.cableList = this.cableList
      this.addbtn = val
    }
  },
  inject: ['getList'], // 子页面调取父页面的方法
  created() {
    if(this.isAdd == true){
      // 获取xl名称
      fatherList(this.$qs.stringify(this.formParam)).then(res => {
        //console.log(res, 'dl段');
        this.form.lineName = res.data.rows[0].lineName
        this.form.voltageRank = res.data.rows[0].voltageRank
      });
      this.getCableList()
    } else {
      // 编辑回显
      this.getEcho(this.openID)
    }
  },
  mounted() {
    this.getSelect()
  },
  methods: {
    /**获取所属dl列表 */
    getCableList() {
      //console.log(1111)
      // this.forFormList = this.forForm
      ExportFn('/cable/logiccablestage/list', this.$qs.stringify(this.forValue)).then(res => {
        //console.log(res, 'res');
        this.selection.cableList = res.data.rows
      })
    },
    // 编辑回显
    getEcho(val) {
      this.getCableList()
      this.formParam.id = val
      // //console.log(this.formParam);
      List(this.$qs.stringify(this.formParam)).then(res => {
        //console.log(res, '');
        if (res.status == 200) {
          this.form = res.data.rows[0]
        }
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
          this.addbtn = false;
          this.form = { brand_right: 0 } // 清空数据
          this.$emit("childFn", {
            showDialog: this.showDialog,
            editbtn: this.editbtn,
            addbtn: this.addbtn
          });
          done();
        })
        .catch(_ => {});
    },
    // 获取下拉数据
    getSelect() {
      getLineSelect().then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.selection.ywdw = response.data.data.groupList
          this.selection.dydj = response.data.data.dydjList
          this.selection.zcdw = response.data.data.zcxzList
          this.selection.fsfs = response.data.data.fsfsList
          this.selection.xlmc = response.data.data.lineList
          this.selection.ywbz = response.data.data.groupList
        }
      })
    },
    /**
     * 确认按钮
     */
    SuerFun() {
      if (this.form.groupId) { // 运维班组
        let searcharr = this.selection.ywbz.filter(res=>{
          return this.form.groupId == res.groupId
        })
        if (searcharr.length > 0) {
          this.form.groupName = searcharr[0]["groupname"];
        }
      }
      if (this.form.logicCableId) { // 所属dl
        // console.log(this.form.logicCableStageId)
        // console.log(this.form.logicCableStageName, '111111111111')
        let searcharr = this.selection.cableList.filter(res =>{
          // console.log(res);
          return this.form.logicCableId == res.id
        })
        if (searcharr.length > 0) {
          this.form.logicCableName = searcharr[0]["logicCableStageName"];
        }
      }
      if (this.form.voltageRank) { // dydj
        let searcharr = this.selection.dydj.filter(res=>{
          return this.form.voltageRank == res.dydj
        })
        if (searcharr.length > 0) {
          this.form.voltageRank = searcharr[0]["dydjmc"];
        }
      }
      // 新增
      if(this.addbtn == true) {
        Add(this.$qs.stringify(this.form)).then(res => {
          //console.log(res)
          if (res.status == 200) {
            this.$message({
              message: '新增成功',
              type: 'success'
            })
            this.$emit("childFn", {
              showDialog: this.showDialog,
              editbtn: this.editbtn,
              addbtn: this.addbtn
            });
            this.getList()
          } else {
            this.$message({
              message: '新增失败',
              type: 'error'
            })
          }
        })
      }
      // 编辑
      if(this.editbtn == true) {
        Edit(this.$qs.stringify(this.form)).then(res => {
          //console.log(res)
          if (res.status == 200) {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.$emit("childFn", {
              showDialog: this.showDialog,
              editbtn: this.editbtn,
              addbtn: this.addbtn
            });
            this.getList()
          } else {
            this.$message({
              message: '编辑失败',
              type: 'error'
            })
          }
        })
      }
      this.showDialog = false
      this.editbtn = false
      this.addbtn = false
    }
  }
};
</script>
