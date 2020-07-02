<template>
  <!-- <h2>dl避雷器新增</h2> -->
  <div class="single-row-title">
    <el-dialog
      :visible.sync="showDialog"
      :title="`${$dl}避雷器`"
      v-dialogDrag
      top="0vh"
      :center="true"
      :before-close="handleClose"
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
            <el-input v-model="form.sbmc" clearable />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">所属{{$xl}}：</label>
            <el-input v-model="form.sbmc" clearable />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">所属{{$gt}}：</label>
            <el-input v-model="form.sbmc" clearable />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">{{$xb}}：</label>
            <el-input v-model="form.sbmc" clearable />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">生产厂家：</label>
            <el-input v-model="form.sbmc" clearable />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">型号：</label>
            <el-input v-model="form.sbmc" clearable />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">额定电压（{{$qf}}）：</label>
            <el-input v-model="form.sbmc" clearable />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">标称放电电流（kA）：</label>
            <el-input v-model="form.sbmc" clearable />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">污秽条件：</label>
            <el-input v-model="form.sbmc" clearable />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-long-label">在持续运行下的阻性电流（μA）：</label>
            <el-input v-model="form.sbmc" clearable />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-long-label">1mA直流参考电压（{{$qf}}）：</label>
            <el-input v-model="form.sbmc" clearable />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-long-label">0.75倍1mA直流参考电压下泄露电流（μA）：</label>
            <el-input v-model="form.sbmc" clearable />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">残压（{{$qf}}）：</label>
            <el-input v-model="form.sbmc" clearable />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">护套材质：</label>
            <el-input v-model="form.sbmc" clearable />
          </div>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" size @click="SuerFun">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * 接收是否打开页面
     */
    isAddDialog: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      form: {
        sbmc: ""
      },
      showDialog: this.isAddDialog
    };
  },
  watch: {
    isAddDialog(val) {
      this.showDialog = val;
    }
  },
  methods: {
    /**
     * 取消
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.showDialog = false;
          this.$emit("addchildFn", this.showDialog);
          done();
        })
        .catch(_ => {});
    },
    /**
     * 确认
     */
    SuerFun() {
      this.showDialog = false;
      this.$emit("addchildFn", this.showDialog);
    }
  }
};
</script> -->

