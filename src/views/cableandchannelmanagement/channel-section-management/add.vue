<template>
  <!-- <h2>通道断面管理新增</h2> -->
  <div class="single-row-title">
    <el-dialog
      :visible.sync="showDialog"
      title="通道断面管理"
      v-dialogDrag
      :center="true"
      :before-close="handleClose"
    >
      <el-form ref="dataForm" :model="form" style="width:100% ;margin: 0 auto;">
        <div class="Form-sort-input">
          <div class="form-long-item">
            <label class="form-label">通道断面名称：</label>
            <el-input v-model="form.sbmc" clearable />
          </div>
        </div>
        <div class="Form-sort-input">
          <div class="form-long-item">
            <label class="form-label">所属通道名称：</label>
            <el-input v-model="form.sbmc" clearable />
          </div>
        </div>
        <div class="Form-sort-input">
          <div class="form-long-item">
            <label class="form-label">所属通道段名称：</label>
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

        <div class="Form-sort-input">
          <div class="form-long-item">
            <label class="form-label">左侧支架层数：</label>
            <el-input v-model="form.sbmc" clearable />
          </div>
        </div>
        <div class="Form-sort-input">
          <div class="form-long-item">
            <label class="form-label">右侧支架层数：</label>
            <el-input v-model="form.sbmc" clearable />
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
      form: {
        sbmc: ""
      },
      selection: {
        xlmc: [{ id: "1", qb: "全部" }]
      },
      showDialog: this.isShowDialog, //打开弹框
      editbtn: this.isEdit, //是否是编辑按钮
      addbtn: this.isAdd //是否是新增按钮
    };
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
  methods: {
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
      if (this.editbtn) {
        //console.log("编辑成功");
        this.showDialog = false;
        this.editbtn = false;
        this.addbtn = false;

        this.$emit("childFn", {
          showDialog: this.showDialog,
          editbtn: this.editbtn,
          addbtn: this.addbtn
        });
      } else if(this.addbtn) {
        //console.log("新增成功");
        this.showDialog = false;
        this.editbtn = false;
        this.addbtn = false;

        this.$emit("childFn", {
          showDialog: this.showDialog,
          editbtn: this.editbtn,
          addbtn: this.addbtn
        });
      }else{
          //console.log("err");
      }
    }
  }
};
</script>
<style lang="scss" scoped>

</style>