<template>
  <div class="hastitle">
    <el-dialog
      :visible.sync="showDialog"
      title
      :center="true"
      top="5vh"
      v-dialogDrag
      :before-close="handleClose"
    >
      <el-form
        ref="dataForm"
        :model="form"
        label-position="left"
        style="width:100% ;margin: 0 auto;"
      >
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">{{$dydj}}:</label>
            <el-input v-model="form.dydj" clearable disabled />
          </div>
          <div class="form-item">
            <label class="form-label">{{$xl}}名称:</label>
            <el-input v-model="form.xlmc" clearable disabled />
          </div>
        </div>

        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">检修分类:</label>
            <el-select v-model="form.jxfl" clearable placeholder="请选择" @change="getselectionjxxm">
              <el-option
                v-for="item in selection.jxfl"
                :key="item.objId"
                :label="item.bzmc"
                :value="item.bzid"
              ></el-option>
            </el-select>
          </div>
          <div class="form-item">
            <label class="form-label">检修项目:</label>
            <el-select v-model="form.jxxm" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.jxxm"
                :key="item.objId"
                :label="item.bzmc"
                :value="item.bzid"
              ></el-option>
            </el-select>
          </div>
        </div>

        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">上次检修日期:</label>
            <el-input v-model="form.scjxrq" clearable :disabled="isreadonly" />
          </div>
          <div class="form-item">
            <label class="form-label">检修周期（年）:</label>
            <el-input v-model="form.jxzq" clearable :disabled="isreadonly" />
          </div>
        </div>

        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">提前报警天数:</label>
            <el-input v-model="form.tqbjts" clearable :disabled="isreadonly" />
          </div>
          <!-- <div class="form-item">
            <label class="form-label">状态评价日期:</label>
            <el-input v-model="form.ztpjrq" clearable :disabled="isreadonly" />
          </div>
        </div>

        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">状态评价结果:</label>
            <el-input v-model="form.ztpjjg" clearable :disabled="isreadonly" />
          </div> -->

        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
      <el-button class="UserSearchFun" @click="save">保 存</el-button>
      <el-button class="onSearch" @click="handleClose">取 消</el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getLineGroup,
  getSelectMultiple,
  getList,
  editOverHaulCycle
} from "@/api/recondition/Rcycle";
export default {
  props: {
    openId: ""
  },
  data() {
    return {
      isreadonly: false,
      showDialog: true,
      id: this.openId,
      form: {
        dydj: "",
        xlmc: "",
        jxfl: "",
        jxxm: "",
        scjxrq: "",
        jxzq: "",
        tqbjts: "",
        ztpjrq: "",
        ztpjjg: "",
        scjxrq: ""
      },
      selection: {
        jxfl: [],
        xlbz: [],
        ztpj: [],
        dydj: [],
        jxxm: []
      }
    };
  },
  created() {
    this.getSelectionList();
    this.getList();
  },
  methods: {
    // 获取下拉框数据
    getSelectionList() {
      // 获取xl班组
      getLineGroup().then(res => {
        this.selection.xlbz = res.data.rows;
      });
      // 获取检修分类  状态评价  电压等级
      getSelectMultiple(
        this.$qs.stringify({
          fzids: "CABLE_ER_TYPE,ZTPJ_PJJG,CABLE_VOLTAGE_RANK,"
        })
      ).then(res => {
        this.selection.jxfl = res.data.data.CABLE_ER_TYPE;
        this.selection.ztpj = res.data.data.ZTPJ_PJJG;
        this.selection.dydj = res.data.data.CABLE_VOLTAGE_RANK;
      });
    },
    // 点击获取检修项目下拉框
    getselectionjxxm() {
      if (this.form.jxfl) {
          this.form.jxxm = ''
          this.selection.jxxm = []
        getSelectMultiple(
          this.$qs.stringify({
            fzids: "CABLE_ER_TYPE_" + this.form.jxfl
          })
        ).then(res => {
          console.log(res);
          this.selection.jxxm = res.data.data["CABLE_ER_TYPE_" + this.form.jxfl];
        });
      } else {
        this.$message("请选择一个检修分类");
      }
    },
    // 根据表单检修分类获取检修项目下拉框
    getselectionjxxmStart() {
      if (this.form.jxfl) {
        getSelectMultiple(
          this.$qs.stringify({
            fzids: "CABLE_ER_TYPE_" + this.form.jxfl
          })
        ).then(res => {
          console.log(res);
          this.selection.jxxm = res.data.data["CABLE_ER_TYPE_" + this.form.jxfl];
        });
      } else {
        this.$message("请选择一个检修分类");
      }
    },
    // 获取表单数据
    getList() {
      getList(this.$qs.stringify({ id: this.id })).then(res => {
        this.form = res.data.rows[0];
        this.form.scjxrq = this.form.scjxrq.substring(0, 10)
        this.getselectionjxxmStart();
      });
    },
    //   取消
    handleClose() {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.showDialog = false;
          this.$emit("childFn", {
            showDialog: false
          });
          done();
        })
        .catch(_ => {});
    },
    //   保存
    save() {
      if (this.form.jxfl) {
        this.selection.jxfl.forEach(item => {
          if (this.form.jxfl == item.bzid) {
            this.form.jxflmc = item.bzmc;
          }
        });
      }
      if (this.form.jxxm) {
        this.selection.jxxm.forEach(item => {
          if (this.form.jxfl == item.bzid) {
            this.form.jxflmc = item.bzmc;
          }
        });
      }
      this.form.xcjxrq =
        (
          Number(this.form.scjxrq.substring(0, 4)) + Number(this.form.jxzq)
        ).toString() + this.form.scjxrq.slice(4);
      editOverHaulCycle(this.$qs.stringify(this.form)).then(res => {
        if (res.data.code == 0) {
          this.$message({ message: "保存成功", type: "success" });
          this.$parent.getList();
          this.$emit("childFn", {
            isshow: false
          });
        }
      });
    }
  }
};
</script>

<style>
</style>