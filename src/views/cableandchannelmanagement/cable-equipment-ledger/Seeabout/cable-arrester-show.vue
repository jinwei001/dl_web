<template>
  <!-- <h2>dl避雷器查看</h2> -->
  <div class="single-row-title">
    <el-dialog
      :visible.sync="showDialog"
      :title="`${$dl}避雷器`"
      v-dialogDrag
      top="0vh"
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
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">设备名称：</label>
            <el-input v-model="form.sbmc" clearable :readonly="isreadonly" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">所属{{$xl}}：</label>
            <el-input v-model="form.xlmc" clearable disabled />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">所属{{$gt}}：</label>
            <el-input v-model="form.gtmc" clearable :readonly="isreadonly" />
            <!-- <el-select v-model="form.gtid" clearable placeholder="请选择" :readonly="isreadonly">
              <el-option
                v-for="item in selection.ssgt"
                :key="item.groupId"
                :label="item.groupname"
                :value="item.groupId"
              ></el-option>
            </el-select> -->
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">{{$xb}}：</label>
            <el-input v-model="form.xb" clearable :readonly="isreadonly" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">生产厂家：</label>
            <el-input v-model="form.sccj" clearable :readonly="isreadonly" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">型号：</label>
            <el-input v-model="form.xh" clearable :readonly="isreadonly" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">额定电压（{{$qf}}）：</label>
            <el-input v-model="form.eddy" clearable :readonly="isreadonly" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">标称放电电流（kA）：</label>
            <el-input v-model="form.bcfddl" clearable :readonly="isreadonly" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">污秽条件：</label>
            <el-input v-model="form.whtj" clearable :readonly="isreadonly" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-long-label">在持续运行下的阻性电&ensp;流（μA）：</label>
            <el-input v-model="form.zxdl" clearable :readonly="isreadonly" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-long-label">1mA直流参考电压&ensp;{{$qf}}）：</label>
            <el-input v-model="form.zlckdl" clearable :readonly="isreadonly" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-long-label">0.75倍1mA直流参考电&ensp;压下泄露电流（μA）：</label>
            <el-input v-model="form.xldl" clearable :readonly="isreadonly" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">残压（{{$qf}}）：</label>
            <el-input v-model="form.cy" clearable :readonly="isreadonly" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">护套材质：</label>
            <el-input v-model="form.htcz" clearable :readonly="isreadonly" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">投运日期：</label>
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
  Edit,
  gtSelect
} from "@/api/cableandchannel/cable-equipment-ledger/Line/cablearrester";
import { fatherList } from '@/api/cableandchannel/cable-equipment-ledger/Line/index'
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
        objId: this.gruClickID, // DLid
        lineId: this.gruClickID
      },
      form: {
        xlid: this.gruClickID,
        xlmc: '',
        sbmc: '',
        gtid: '', // 打卡点id
        gtmc: '',
        xb: '',
        sccj: '',
        xh: '',
        eddy: '',
        bcfddl: '',
        whtj: '',
        zxdl: '',
        zlckdl: '',
        xldl: '',
        cy: '',
        htcz: '',
        tyrq: ''
      },
      selection: {
        ssgt: []
      },
      showDialog: true, //打开弹框
      editbtn: this.isEdit, //是否是编辑按钮
      addbtn:this.isAdd,//是否是新增按钮
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
    isAdd(val){
      this.addbtn = val
    }
  },
  inject: ['getList'], // 子页面调取父页面的方法
  created() {
    // 获取打卡点下拉
    gtSelect(this.formParam).then(response => {
      //console.log(response);
    })
    // //console.log(this.isAdd);
    if(this.isAdd == true){
      // 获取xl名称
      fatherList(this.$qs.stringify(this.formParam)).then(res => {
        // //console.log(res);
        this.form.xlmc = res.data.rows[0].lineName
      });
    } else {
      // 编辑回显
      this.getEcho(this.openID)
    }
  },
  methods: {
    // 编辑回显
    getEcho(val) {
      this.formParam.objId = val
      // //console.log(this.formParam);
      List(this.$qs.stringify(this.formParam)).then(res => {
        //console.log(res);
        if(res.status == 200) {
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
