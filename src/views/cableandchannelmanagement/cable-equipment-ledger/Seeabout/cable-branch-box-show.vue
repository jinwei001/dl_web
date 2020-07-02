<template>
  <!-- dl分支箱查看 -->
  <div class="hastitle">
    <el-dialog
      :visible.sync="showDialog"
      :title="`${$dl}分支箱`"
      :center="true"
      top="10vh"
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
            <el-input v-model="form.zcxz" :disabled="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">资产单位：</label>
            <el-input v-model="form.zcdw" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">资产编号：</label>
            <el-input v-model="form.zcbh" :disabled="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">实物ID：</label>
            <el-input v-model="form.swid" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">工程编号：</label>
            <el-input v-model="form.gcbh" :disabled="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">工程名称：</label>
            <el-input v-model="form.gcmc" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">设备增加方式：</label>
            <el-input v-model="form.sbzjfs" :disabled="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">流水码：</label>
            <el-input v-model="form.lsm" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">WBS编码：</label>
            <el-input v-model="form.wpsbm" :disabled="isdisabled" />
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
            <el-input v-model="form.sbmc" clearable :disabled="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">运行编号：</label>
            <el-input v-model="form.yxbh" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">所属{{$xl}}：</label>
            <el-input v-model="form.xlmc" clearable disabled />
          </div>
          <div class="form-item">
            <label class="form-label">所属分段{{$xl}}：</label>
            <el-input v-model="form.ssfdxl" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">所属地市：</label>
            <el-input v-model="form.ssds" clearable :disabled="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">运维单位：</label>
            <el-input v-model="form.ywdw" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">维护班组：</label>
            <el-select v-model="form.whbz" clearable placeholder="请选择" :disabled="isdisabled">
              <el-option
                v-for="item in ywbz"
                :key="item.groupId"
                :label="item.groupname"
                :value="item.groupname"
              ></el-option>
            </el-select>
          </div>
          <div class="form-item">
            <label class="form-label">{{$dydj}}：</label>
            <el-input v-model="form.dydj" :disabled="true" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">设备状态：</label>
            <el-input v-model="form.sbzt" clearable :disabled="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">是否农网：</label>
            <el-select
              v-model="form.sfnw"
              class="form-item-select"
              clearable
              :disabled="isdisabled"
            >
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">是否代维：</label>
            <!-- <el-input v-model="form.sfdw" clearable :disabled="isdisabled"/> -->
            <el-select
              v-model="form.sfdw"
              class="form-item-select"
              clearable
              :disabled="isdisabled"
            >
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </div>
          <div class="form-item">
            <label class="form-label">投运日期：</label>
            <!--<el-input v-model="form.ccrq" clearable :disabled="isdisabled"/>-->
            <el-col>
              <el-date-picker
                style="width: 100%;"
                v-model="form.tyrq"
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
            <label class="form-label">设备主人：</label>
            <el-input v-model="form.sbzr" clearable :disabled="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">专业分类：</label>
            <el-input v-model="form.zyfl" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">所属大馈线：</label>
            <el-input v-model="form.ssdkx" clearable :disabled="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">所属大馈线支线：</label>
            <el-input v-model="form.ssdkxzx" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-title">
          <div class="form-item">
            <label class="form-title">物理参数</label>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">类型：</label>
            <el-input v-model="form.lx" clearable :disabled="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">型号：</label>
            <el-input v-model="form.xh" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">生产厂家：</label>
            <el-input v-model="form.sccj" clearable :disabled="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">出厂编号：</label>
            <el-input v-model="form.ccbh" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">出厂日期：</label>
            <!--<el-input v-model="form.ccrq" clearable :disabled="isdisabled"/>-->
            <el-col>
              <el-date-picker
                style="width: 100%;"
                v-model="form.ccrq"
                type="date"
                :disabled="isdisabled"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </div>
          <div class="form-item">
            <label class="form-label">接地电阻(Ω)：</label>
            <el-input v-model="form.jddz" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">重要程度：</label>
            <el-input v-model="form.zycd" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-title">
          <div class="form-item">
            <label class="form-title">其他参数</label>
          </div>
        </div>
        <div class="Form-input" v-if="isdisabled">
          <div class="form-long-item">
            <label class="form-label">{{$dl}}分支箱ID：</label>
            <el-input v-model="form.objId" clearable disabled />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">设备编码：</label>
            <el-input v-model="form.sbbm" clearable :disabled="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">发布状态：</label>
            <!-- <el-input v-model="form.fbzt" clearable :disabled="isdisabled" /> -->
            <el-select
              v-model="form.fbzt"
              class="form-item-select"
              clearable
              :disabled="isdisabled"
            >
              <el-option label="已发布" value="是"></el-option>
              <el-option label="未发布" value="否"></el-option>
            </el-select>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">备注：</label>
            <el-input v-model="form.bz" clearable :disabled="isdisabled" />
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
} from "@/api/cableandchannel/cable-equipment-ledger/Line/cableBranchBox";
import { getLineSelect } from "@/api/cableandchannel/cable-equipment-ledger/Line/index";
import { fatherList } from "@/api/cableandchannel/cable-equipment-ledger/Line/index";
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
    }
  },
  data() {
    return {
      showDialog: true,
      editbtn: this.isEdit, //是否是编辑按钮
      addbtn: this.isAdd, //是否是新增按钮
      thisopenID: this.openID, // 把父页面传的值存起来
      formParam: {
        id: this.gruClickID,
        objId: this.gruClickID // dlid
      },
      form: {
        zcxz: null,
        zcdw: null,
        gcmc: null,
        ssds: null,
        ywdw: null,
        whbz: null,
        sbzt: null,
        sfdw: null,
        lx: null,
        fbzt: null,
        ssxl: this.gruClickID,
        objId: "",
        swid: "",
        sbbm: "",
        zyfl: "",
        jddz: "",
        sfdw: "",
        ssdkx: "",
        ssdkxzx: "",
        sbmc: "",
        xlmc: "",
        zycd: "",
        gcbh: "",
        ssfdxl: "",
        wpsbm: "",
        tyrq: "",
        sbzjfs: "",
        lsm: "",
        eddy: "",
        eddl: "",
        sfnw: "",
        zcbh: "",
        azwz: "",
        zh: "",
        xh: "",
        sccj: "",
        ccrq: "",
        ccbh: "",
        bz: "",
        djsj: "",
        sbzr: ""
      },
      ywbz: []
    };
  },
  computed: {
    /**计算是否可读 */
    isdisabled() {
      return !(this.isEdit || this.addbtn);
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
    }
  },
  inject: ["getList"], // 子页面调取父页面的方法
  created() {
    //console.log(this.isAdd);
    if (this.isAdd == true) {
      // 获取xl名称
      fatherList(this.$qs.stringify(this.formParam)).then(res => {
        //console.log(res);
        this.form.xlmc = res.data.rows[0].lineName;
        this.form.dydj = res.data.rows[0].voltageRank;
      });
      // 获取下拉数据
      getLineSelect().then(response => {
        if (response.status == 200) {
          this.ywbz = response.data.data.groupList;
        }
      });
    } else {
      // 编辑回显
      this.getEcho(this.openID);
    }
  },
  methods: {
    // 编辑回显
    getEcho(val) {
      this.formParam.objId = val;
      // //console.log(this.formParam);
      List(this.$qs.stringify(this.formParam)).then(res => {
        //console.log(res);
        if (res.status == 200) {
          this.form = res.data.rows[0];
        }
      });
    },
    /**
     * 取消
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
     * 确认
     */
    SuerFun() {
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

<style>
</style>
