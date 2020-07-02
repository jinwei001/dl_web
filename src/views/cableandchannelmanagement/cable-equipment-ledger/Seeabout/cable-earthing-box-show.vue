<template>
  <!-- dl接地箱查看 -->
  <div class="hastitle">
    <el-dialog
      :visible.sync="showDialog"
      :title="`${$dl}接地箱`"
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
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">{{$dl}}接地箱ID：</label>
            <el-input v-model="form.objId" disabled />
          </div>
          <div class="form-item">
            <label class="form-label">实物ID：</label>
            <el-input v-model="form.swid" clearable :readonly="isreadonly" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">设备名称：</label>
            <el-input v-model="form.sbmc" clearable :readonly="isreadonly" />
          </div>
          <div class="form-item">
            <label class="form-long-label">电系铭牌运行库ID：</label>
            <el-input v-model="form.dxmpyxkid" clearable :readonly="isreadonly" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">设备编码：</label>
            <el-input v-model="form.sbbm" clearable :readonly="isreadonly" />
          </div>
          <div class="form-item">
            <label class="form-label">安装位置：</label>
            <el-input v-model="form.azwz" clearable :readonly="isreadonly" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">所属{{$xl}}：</label>
            <el-input v-model="form.xlmc" clearable disabled />
          </div>
          <div class="form-item">
            <label class="form-label">组号：</label>
            <el-input v-model="form.zh" clearable :readonly="isreadonly" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">型号：</label>
            <el-input v-model="form.xh" clearable :readonly="isreadonly" />
          </div>
          <div class="form-item">
            <label class="form-label">生产厂家：</label>
            <el-input v-model="form.sccj" clearable :readonly="isreadonly" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">出厂编号：</label>
            <el-input v-model="form.ccbh" clearable :readonly="isreadonly" />
          </div>
          <div class="form-item">
            <label class="form-label">出厂日期：</label>
            <!--<el-input v-model="form.ccrq" clearable :readonly="isreadonly"/>-->
            <el-col>
              <el-date-picker
                style="width: 100%;"
                v-model="form.ccrq"
                type="date"
                :readonly="isreadonly"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">投运日期：</label>
            <!--<el-input v-model="form.tyrq" clearable :readonly="isreadonly"/>-->
            <el-col>
              <el-date-picker
                style="width: 100%;"
                v-model="form.tyrq"
                type="date"
                :readonly="isreadonly"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </div>
          <div class="form-item">
            <label class="form-label">接线方式：</label>
            <el-input v-model="form.jxfs" clearable :readonly="isreadonly" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">资产编号：</label>
            <el-input v-model="form.zcbh" clearable :readonly="isreadonly" />
          </div>
          <div class="form-item">
            <label class="form-label">接地方式：</label>
            <el-input v-model="form.jdfs" clearable :readonly="isreadonly" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">限额电压：</label>
            <el-input v-model="form.xedy" clearable :readonly="isreadonly" />
          </div>
          <div class="form-item">
            <label class="form-label">限额电流：</label>
            <el-input v-model="form.xedl" clearable :readonly="isreadonly" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">登记时间：</label>
            <!--<el-input v-model="form.djsj" clearable :readonly="isreadonly"/>-->
            <el-col>
              <el-date-picker
                style="width: 100%;"
                v-model="form.djsj"
                type="date"
                :readonly="isreadonly"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </div>
          <div class="form-item">
            <label class="form-label">设备主人：</label>
            <el-input v-model="form.sbzr" clearable :readonly="isreadonly" />
          </div>
        </div>
        <div class="Form-input">
          <div class="dltz-dltz"></div>
          <el-form-item label="备注：" label-width="138px" style="width:100%;font-size:1rem">
            <el-input type="textarea" v-model="form.bz"></el-input>
          </el-form-item>
        </div>
        <div style="width:100%;height:1px"></div>
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
  Edit
} from "@/api/cableandchannel/cable-equipment-ledger/Line/cableearthingBox";
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
      thisopenID: this.openID, // 把父页面传的值存起来
      ClickID: this.gruClickID, // 把祖父页面传的值存起来
      formParam: {
        id: this.gruClickID,
        objId: this.gruClickID // dlid
      },
      form: {
        ssxl: this.gruClickID,
        xlmc: "",
        objId: "",
        swid: "",
        sbmc: "",
        dxmpyxkid: "",
        sbbm: "",
        azwz: "",
        zh: "",
        xh: "",
        sccj: "",
        ccbh: "",
        ccrq: "",
        tyrq: "",
        jxfs: "",
        zcbh: "",
        jdfs: "",
        xedy: "",
        xedl: "",
        djsj: "",
        sbzr: "",
        sbzrmc: "",
        bz: ""
      },
      showDialog: true, //打开弹框
      editbtn: this.isEdit, //是否是编辑按钮
      addbtn: this.isAdd //是否是新增按钮
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
     * 取消按钮
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.showDialog = false;
          this.editbtn = false;
          this.addbtn = false;
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
<style lang="scss" scope>
.el-textarea__inner {
  width: 98%;
}
.hastitle {
  .Form-input {
    .dltz-dltz {
      .el-form-item__label {
        font-size: 1rem;
        font-weight: 780;
      }
    }
  }
}
</style>

