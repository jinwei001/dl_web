<template>
  <!-- <div>
    <h2>dl终端-查看</h2>
  </div>-->
  <div class="hastitle">
    <el-dialog
      :visible.sync="showDialog"
      :title="`${$dl}终端`"
      top="5vh"
      v-dialogDrag
      :center="true"
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
            <label class="form-label">资产编号：</label>
            <el-input v-model="form.assectsNumber" clearable :disabled="isdisabled"/>
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
          <div class="form-item">
            <label class="form-label">实物ID：</label>
            <el-input v-model="form.realId" clearable :disabled="isdisabled"/>
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
            <el-input v-model="form.facilityName" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">所属{{$xl}}：</label>
            <el-input v-model="form.lineName" clearable disabled/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">所属{{$dl}}：</label>
            <el-select v-model="form.cableName" clearable placeholder="请选择" :disabled="isdisabled">
              <el-option
                v-for="item in selection.cableList"
                :key="item.id"
                :label="item.logicCableStageName"
                :value="item.logicCableStageName"
              ></el-option>
            </el-select>
          </div>
          <div class="form-item">
            <label class="form-label">所属地市：</label>
            <el-input v-model="form.city" clearable :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">运维单位：</label>
            <el-input v-model="form.unit" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">运维班组：</label>
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
            <label class="form-label">安装位置：</label>
            <el-input v-model="form.installationPosition" clearable :disabled="isdisabled"/>
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
            <label class="form-label">连接设备类型：</label>
            <el-input v-model="form.connectDeviceType" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">连接设备：</label>
            <el-input v-model="form.connectDevice" clearable :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-input">
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
          <div class="form-item">
            <label class="form-label">设备状态：</label>
            <el-input v-model="form.facilityStatus" clearable :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">图纸编号：</label>
            <el-input v-model="form.drawingNumber" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">监理单位：</label>
            <el-input v-model="form.supervisionUnit" clearable :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label" >{{$dydj}}：</label>
            <el-select
              v-model="form.voltageRankName"
              clearable
              placeholder="请选择"
              disabled
            >
              <el-option
                v-for="item in selection.dydj"
                :key="item.dydj"
                :label="item.dydjmc"
                :value="item.dydj"
              ></el-option>
            </el-select>
          </div>
          <div class="form-item">
            <label class="form-label">专业分类：</label>
            <el-input v-model="form.specialClass" clearable :disabled="isdisabled"/>
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
            <el-input v-model="form.model" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">生产厂家：</label>
            <el-input v-model="form.manufacturer" clearable :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">出厂编号：</label>
            <el-input v-model="form.factoryNumber" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">出厂日期：</label>
            <!--<el-input v-model="form.manufactureDate" clearable :disabled="isdisabled"/>-->
            <el-col>
              <el-date-picker
                style="width: 100%;"
                v-model="form.manufactureDate"
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
            <label class="form-label">终端类型：</label>
            <el-input v-model="form.terminalType" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">制作单位：</label>
            <el-input v-model="form.productionUnit" clearable :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">制作人：</label>
            <el-input v-model="form.producer" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">制作人证件号：</label>
            <el-input v-model="form.producerCertificateNumber" clearable :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-title">
          <div class="form-item">
            <label class="form-title">其他参数</label>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">{{$dl}}终端ID：</label>
            <el-input v-model="form.id" clearable disabled/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">设备编码：</label>
            <el-input v-model="form.deviceNumber" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">登记时间：</label>
            <!--<el-input v-model="form.manufactureDate" clearable :disabled="isdisabled"/>-->
            <el-col>
              <el-date-picker
                style="width: 100%;"
                v-model="form.registrationTime"
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
import {Add, List, Edit} from "@/api/cableandchannel/cable-equipment-ledger/Line/cableterminal";
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
    /**
     * 接收是否打开页面
     */
    isAdd: {
      type: Boolean,
      default: false
    },
    forForm: {
      default: null
    }
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
        assectsNumber: '',
        connectDevice: '',
        factoryNumber: '',
        supervisionUnit: '',
        city: '',
        groupName: '',
        groupId: '',
        connectDeviceName: '',
        registrationTime: '',
        equipmentAddWay: '',
        cableId: '',
        cableName: '',
        waterCode: '',
        projectNumber: '',
        producerCertificateNumber: '',
        projectName: '',
        wbsCode: '',
        realId: '',
        lineName: '',
        voltageRankName: '',
        installationPosition: '',
        connectDeviceType: '',
        sbzt: '', // 设备状态没有
        phase: '',
        operationGroup: '',
        sbzr: '', // 设备主人没有
        transportTime: '',
        model: '',
        terminalType: '',
        manufacturer: '',
        manufactureDate: '',
        productionUnit: '',
        producer: '',
        deviceNumber: ''
      },
      selection: {
        ywdw: [],
        dydj: [],
        zcdw: [],
        xlmc: [],
        fsfs: [],
        ywbz: [],
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
      this.addbtn = val
    }
  },
  inject: ['getList'], // 子页面调取父页面的方法
  created() {
    if(this.isAdd == true){
      // 获取xl名称
      fatherList(this.$qs.stringify(this.formParam)).then(res => {
        //console.log(res, '获取xl');
        this.form.lineName = res.data.rows[0].lineName
        this.form.voltageRankName = res.data.rows[0].voltageRank
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
        //console.log(res,'asdsadsadasd');
        if(res.status == 200) {
          this.form = res.data.rows[0]
        }
      });
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
     * 取消按钮
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.showDialog = false;
          this.editbtn = false;
          this.addbtn = false;
          this.form = { brand_right: 0 }
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
     */
    SuerFun() {
      if (this.form.groupName) { // xl名称
        let searcharr = this.selection.ywbz.filter(res=>{
          return this.form.groupName == res.groupId
        })
        if (searcharr.length > 0) {
          this.form.groupName = searcharr[0]["groupname"];
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
