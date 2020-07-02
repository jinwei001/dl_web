<template>
  <!-- <h2>断面管理</h2> -->
  <div class="single-row-title">
    <el-dialog
      :visible.sync="SectionShowDialog"
      title="断面管理"
      v-dialogDrag
      :center="true"
      :before-close="handleClose"
    >
      <el-form ref="dataForm" :model="form" style="width:100% ;margin: 0 auto;">
        <div class="Form-sort-input">
          <div class="form-long-item">
            <label class="form-label">通道断面：</label>
            <el-input v-model="form.sbmc" clearable />
          </div>
        </div>
        <div class="Form-sort-input">
          <div class="form-long-item">
            <label class="form-label">所属通道：</label>
            <el-input v-model="form.sbmc" clearable />
          </div>
        </div>
        <div class="Form-sort-input">
          <div class="form-long-item">
            <label class="form-label">通道段：</label>
            <el-input v-model="form.sbmc" clearable />
          </div>
        </div>
        <div class="Form-sort-input">
          <div class="form-sort-item-select">
            <label class="form-label">断面类型：</label>
            <el-select v-model="form.sbmc" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.xlmc"
                :key="item.id"
                :label="item.qb"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-hegit-item">
            <label class="form-sort-label">管孔位置 ：</label>
            <div class="gk-img">
              <div class="gk-img-item"></div>
              
            </div>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun">保存</el-button>
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
    isSectionShowDialog: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      form: {
        sbmc: ""
      },
      selection: {
        xlmc: [{ id: "1", qb: "全部" }]
      },
      SectionShowDialog: this.isSectionShowDialog
    };
  },
  watch: {
    isSectionShowDialog(val) {
      this.SectionShowDialog = val;
    }
  },
  methods: {
    /**
     * 取消
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.SectionShowDialog = false;
          this.$emit("sectionFun", this.SectionShowDialog);
          done();
        })
        .catch(_ => {});
    },
    /**
     * 确认
     */
    SuerFun() {
      this.SectionShowDialog = false;
      this.$emit("sectionFun", this.SectionShowDialog);
    }
  }
};
</script> 
<style lang="scss" scoped>
.form-hegit-item {
  .form-sort-label {
    width: 30%;
    line-height: 45px;
    height: 45px;
    font-size: 1rem;
    text-align: right;
    margin-right: 0.5em;
  }
  .gk-img {
    width: 60.5%;
    margin-left: 0.5%;
    .gk-img-item{
      width: 45%;
      height: 200px;
      border:2px solid black;
    }
  }
}
</style>
