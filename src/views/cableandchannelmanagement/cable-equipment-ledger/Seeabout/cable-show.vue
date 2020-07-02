<template>
  <!-- <h2>dl查看</h2> -->
  <div class="hastitle">
    <el-dialog
      :visible.sync="showDialog"
      :title="`${$dl}`"
      v-dialogDrag
      :center="true"
      top="0"
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
            <el-input v-model="form.assetNature" clearable :readonly="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">资产编号：</label>
            <el-input v-model="form.assetNumber" clearable :readonly="isdisabled" />
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
            <el-input v-model="form.logicCableStageName" clearable :readonly="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">所属{{$xl}}：</label>
            <el-input v-model="form.lineName" clearable readonly />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">所属地市：</label>
            <el-input v-model="form.city" clearable :readonly="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">运维单位：</label>
            <el-input v-model="form.unit" clearable :readonly="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">维护班组：</label>
            <!--<el-input v-model="form.groupName" clearable :disabled="isdisabled"/>-->
            <el-select v-model="form.groupId" clearable placeholder="请选择" :readonly="isdisabled">
              <el-option
                v-for="item in selection.ywbz"
                :key="item.groupId"
                :label="item.groupname"
                :value="item.groupId"
              ></el-option>
            </el-select>
          </div>
          <div class="form-item">
            <label class="form-label">{{$dydj}}：</label>
            <!--<el-input v-model="form.voltageRank" clearable :disabled="isdisabled"/>-->
            <el-select
              v-model="form.voltageRank"
              clearable
              placeholder="请选择"
              readonly
            >
              <el-option
                v-for="item in selection.dydj"
                :key="item.dydj"
                :label="item.dydjmc"
                :value="item.dydj"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">设备状态：</label>
            <el-input v-model="form.logicCableStageType" clearable :readonly="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">{{$xb}}：</label>
            <el-select
              v-model="form.phase"
              clearable
              placeholder="请选择"
              :readonly="isdisabled"
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
            <label class="form-label">起点类型：</label>
            <el-input v-model="form.startType" clearable :readonly="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">起点位置：</label>
            <el-input v-model="form.startPosition" clearable :readonly="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">终点类型：</label>
            <el-input v-model="form.endType" clearable :readonly="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">终点位置：</label>
            <el-input v-model="form.endPosition" clearable :readonly="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">设备主人：</label>
            <el-input v-model="form.facilityMaster" clearable :readonly="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">专业分类：</label>
            <el-input v-model="form.specialClass" clearable :readonly="isdisabled" />
          </div>
        </div>
        <div class="Form-title">
          <div class="form-item">
            <label class="form-title">物理参数</label>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">{{$dl}}类型：</label>
            <el-input v-model="form.cableType" clearable :readonly="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">{{$dl}}总长(m)：</label>
            <el-input v-model="form.cableCount" clearable :readonly="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">起止说明：</label>
            <el-input v-model="form.startEndRemark" clearable :readonly="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">投运日期：</label>
            <!--<el-input v-model="form.transportTime" clearable :readonly="isdisabled"/>-->
            <el-col>
              <el-date-picker
                style="width: 100%;"
                v-model="form.transportTime"
                type="date"
                :readonly="isdisabled"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </div>
        </div>
        <div class="Form-title">
          <div class="form-item">
            <label class="form-title">其他参数</label>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label" style="width:16.5%">{{$dl}}ID：</label>
            <el-input v-model="form.id" clearable readonly />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">设备编码：</label>
            <el-input v-model="form.facilityNumber" clearable :readonly="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">登记时间：</label>
            <!--<el-input v-model="form.registerTime" clearable :readonly="isdisabled"/>-->
            <el-col>
              <el-date-picker
                style="width: 100%;"
                v-model="form.registerTime"
                type="date"
                :readonly="isdisabled"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">发布状态：</label>
            <el-select v-model="form.postStatus" clearable placeholder="请选择" :readonly="isdisabled">
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
            <label class="form-label"  style="width:16.5%">备注：</label>
            <el-input v-model="form.remark" clearable :readonly="isdisabled" />
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
  Add,
  List,
  Edit
} from "@/api/cableandchannel/cable-equipment-ledger/Line/cable";
import {
  fatherList,
  getLineSelect
} from "@/api/cableandchannel/cable-equipment-ledger/Line/index";
export default {
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
    }
  },
  data() {
    return {
      thisopenID: this.openID, // 把父页面传的值存起来
      ClickID: this.gruClickID, // 把祖父页面传的值存起来
      formParam: {
        id: this.gruClickID //dlid
      },
      form: {
        lineId: this.gruClickID,
        assetNature: "",
        assetNumber: "",
        logicCableStageName: "",
        lineName: "",
        city: "",
        unit: "",
        groupId: "",
        postStatus: '',
        groupName: "",
        voltageRank: "", // dydj
        logicCableStageType: "",
        phase: "",
        startType: "",
        startPosition: "",
        endType: "",
        endPosition: "",
        facilityMaster: "",
        specialClass: "",
        cableType: "",
        cableCount: "",
        startEndRemark: "",
        transportTime: "",
        cableId: "", // dlid
        facilityNumber: "",
        registerTime: "",
        fbzt: "", // 发布状态没有字段
        remark: ""
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
      addbtn: this.isAdd //是否是新增按钮
    };
  },

  computed: {
    /**计算是否可读 */
    isdisabled() {
      return !(this.editbtn || this.addbtn);
    }
  },
  watch: {
    // isShowDialog(val) {
    //   this.showDialog = val;
    // },
    isEdit(val) {
      this.editbtn = val;
    },
    isAdd(val) {
      this.addbtn = val;
    }
  },
  inject: ["getList"], // 子页面调取父页面的方法
  created() {
    if (this.isAdd == true) {
      // 获取xl名称
      fatherList(this.$qs.stringify(this.formParam)).then(res => {
        //console.log(5555555555555555555555555)
        //console.log(res, '新增数据');
        this.form.lineName = res.data.rows[0].lineName;
        this.form.voltageRank = res.data.rows[0].voltageRank
        //console.log(this.form.voltageRank, 'dydj')
      });
    } else {
      // 编辑回显
      this.getEcho(this.openID);
    }
  },
  mounted() {
    this.getSelect();
  },
  methods: {
    // 编辑回显
    getEcho(val) {
      this.formParam.id = val;
      // //console.log(this.formParam);
      List(this.$qs.stringify(this.formParam)).then(res => {
        //console.log(res);
        if (res.status == 200) {
          this.form = res.data.rows[0];
          //console.log(this.form,"sqwwqe")
        }
      });
    },
    // 获取下拉数据
    getSelect() {
      getLineSelect().then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.selection.ywdw = response.data.data.groupList;
          this.selection.dydj = response.data.data.dydjList;
          //console.log('11111111111111')
          //console.log(this.selection.dydj)
          this.selection.zcdw = response.data.data.zcxzList;
          this.selection.fsfs = response.data.data.fsfsList;
          this.selection.xlmc = response.data.data.lineList;
          this.selection.ywbz = response.data.data.groupList;
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
          this.form = { brand_right: 0 };
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
      if (this.form.voltageRankCode) {
        // dydj
        let searcharr = this.selection.dydj.filter(res => {
          return this.form.voltageRankCode == res.dydj;
        });
        this.form.voltageRank = searcharr[0]["dydjmc"];
      }
      if (this.form.groupId) {
        // 运维班组
        //console.log(this.selection);
        let searcharr = this.selection.ywbz.filter(res => {
          return this.form.groupId == res.groupId;
        });
        if (searcharr.length > 0) {
          this.form.groupName = searcharr[0]["groupname"];
        }
      }
      // 新增
      if (this.addbtn == true) {
        Add(this.$qs.stringify(this.form)).then(res => {
          //console.log(res);
          if (res.status == 200) {
            this.$message({
              message: "新增成功",
              type: "success"
            });
            this.$emit("childFn", {
              showDialog: this.showDialog,
              editbtn: this.editbtn,
              addbtn: this.addbtn
            });
            this.form = { brand_right: 0 };
            this.getList();
          } else {
            this.$message({
              message: "新增失败",
              type: "error"
            });
          }
        });
      }
      // 编辑
      if (this.editbtn == true) {
        Edit(this.$qs.stringify(this.form)).then(res => {
          //console.log(res);
          if (res.status == 200) {
            this.$message({
              message: "编辑成功",
              type: "success"
            });
            this.$emit("childFn", {
              showDialog: this.showDialog,
              editbtn: this.editbtn,
              addbtn: this.addbtn
            });
            this.getList();
          } else {
            this.$message({
              message: "编辑失败",
              type: "error"
            });
          }
        });
      }
      this.showDialog = false;
      this.editbtn = false;
      this.addbtn = false;
    }
  }
};
</script>

