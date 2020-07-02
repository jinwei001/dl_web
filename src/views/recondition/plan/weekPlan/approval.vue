<template>
  <div class="hastitle">
    <el-dialog
      :visible.sync="showDialog"
      title
      :center="true"
      top="10vh"
      v-dialogDrag
      :before-close="handleClose"
    >
      <el-form
        ref="dataForm"
        :model="form"
        :rules="formData"
        label-position="left"
        style="width:100% ;margin: 0 auto;"
      >
        <div class="Form-title">
          <div class="form-item">
            <label class="form-title"></label>
          </div>
        </div>
        <div class="Form-input">
          <el-form-item label="编制人：" label-width="150px" prop="gzxlid">
            <el-input v-model="form.compilingpersonnel" clearable :disabled="isdisabled" />
          </el-form-item>
          <el-form-item :label="`检修${$xl}：`" label-width="150px" prop="gzxlid" style="width: 50%;">
            <el-input v-model="form.xlmc" clearable :disabled="isdisabled" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="设备类型：" label-width="150px" prop="gzxlid">
            <el-input v-model="form.devicetypename" clearable :disabled="isdisabled" />
          </el-form-item>
          <el-form-item label="设备名称：" label-width="150px" prop="gzxlid" style="width: 50%;">
            <el-input v-model="form.devicename" clearable :disabled="isdisabled" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="任务来源：" label-width="150px" prop="gzxlid">
            <el-input v-model="form.tasksourcename" clearable :disabled="isdisabled" />
          </el-form-item>
          <el-form-item label="任务等级：" label-width="150px" prop="gzxlid" style="width: 50%;">
            <el-select v-model="form.tasklevel" clearable placeholder="请选择" :disabled="isdisabled">
              <el-option
                v-for="item in selection.rwdj"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="工作班组：" label-width="150px" prop="gzxlid">
            <el-input v-model="form.groupname" clearable :disabled="isdisabled" />
          </el-form-item>
          <el-form-item label="是否停电：" label-width="150px" prop="gzxlid" style="width: 50%;">
            <el-select v-model="form.ispowercut" clearable placeholder="请选择" :disabled="isdisabled">
              <el-option
                v-for="item in selection.sftd"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="工作内容：" label-width="150px" prop="gzxlid">
            <el-input v-model="form.jobcontent" clearable :disabled="isdisabled" />
          </el-form-item>
          <el-form-item label="计划开始时间：" label-width="150px" prop="gzxlid" style="width: 50%;">
            <el-input v-model="form.planstarttime" clearable :disabled="isdisabled" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="计划结束时间：" label-width="150px" prop="gzxlid">
            <el-input v-model="form.planendtime" clearable :disabled="isdisabled" />
          </el-form-item>
          <el-form-item label="是否带电作业：" label-width="150px" prop="gzxlid" style="width: 50%;">
            <el-select v-model="form.ischarged" clearable placeholder="请选择" :disabled="isdisabled">
              <el-option
                v-for="item in selection.sfdd"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="是否委外：" label-width="150px" prop="gzxlid">
            <el-select
              v-model="form.isoutsourcing"
              clearable
              placeholder="请选择"
              :disabled="isdisabled"
            >
              <el-option
                v-for="item in selection.sfww"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工作性质：" label-width="150px" prop="gzxlid" style="width: 50%;">
            <el-input v-model="form.jobnaturename" clearable :disabled="isdisabled" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="调度管辖：" label-width="150px" prop="gzxlid">
            <el-input v-model="form.schedulingjurisdictionname" clearable :disabled="isdisabled" />
          </el-form-item>
          <el-form-item label="工作分类：" label-width="150px" prop="gzxlid" style="width: 50%;">
            <el-input v-model="form.jobclassname" clearable :disabled="isdisabled" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="计划新增调整原因：" label-width="150px" prop="gzxlid">
            <el-input v-model="form.planaddwhyname" clearable :disabled="isdisabled" />
          </el-form-item>
          <el-form-item label="是否有送电方案：`" label-width="150px" prop="gzxlid" style="width: 50%;">
            <el-select
              v-model="form.ispowerplan"
              clearable
              placeholder="请选择"
              :disabled="isdisabled"
            >
              <el-option
                v-for="item in selection.sfsd"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="工作类型：" label-width="150px" prop="gzxlid">
            <el-input v-model="form.jobtypename" clearable :disabled="isdisabled" />
          </el-form-item>
          <el-form-item label="计划停电开始时间：" label-width="150px" prop="gzxlid" style="width: 50%;">
            <el-input v-model="form.powercutplanstrattime" clearable :disabled="isdisabled" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="计划停电结束时间：" label-width="150px" prop="gzxlid">
            <el-input v-model="form.powercutplanendtime" clearable :disabled="isdisabled" />
          </el-form-item>
          <el-form-item label="大修技改项目编号：" label-width="150px" prop="gzxlid" style="width: 50%;">
            <el-input v-model="form.dxjgxmbh" clearable :disabled="isdisabled" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="停电范围：" label-width="150px" prop="gzxlid">
            <el-input v-model="form.powercutscope" clearable :disabled="isdisabled" />
          </el-form-item>
          <el-form-item label="复役要求：" label-width="150px" prop="gzxlid" style="width: 50%;">
            <el-input v-model="form.fyyq" clearable :disabled="isdisabled" />
          </el-form-item>
        </div>
        <div class="Form-input" style="border-top:1px solid #dce1e1;padding-top:1rem">
          <el-form-item
            v-if="isstatus == '提交'"
            label="审批意见："
            label-width="150px"
            prop="gzxlid"
            style="width: 100%;"
          >
            <el-input type="textarea" v-model="form.spyj" />
          </el-form-item>
        </div>
        <div class="Form-input" v-if="isstatus == null || isstatus == '退回'">
          <el-form-item label="下一审批班组：" label-width="150px" prop="gzxlid">
            <el-select v-model="groupid" clearable placeholder="请选择" @change="getnextuser">
              <el-option
                v-for="item in selection.spbz"
                :key="item.objId"
                :label="item.groupname"
                :value="item.objId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下一审批人：" label-width="150px" prop="spr" style="width: 50%;">
            <el-select v-model="form.spr" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.spr"
                :key="item.objId"
                :label="item.name"
                :value="item.objId"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button v-if="isstatus == null || isstatus == '退回'" class="UserSearchFun" @click="sure">确认</el-button>
        <el-button v-if="isstatus == null || isstatus == '退回'" class="onSearch" @click="handleClose">取消</el-button>
        <el-button v-if="isstatus == '提交'" class="UserSearchFun" @click="agree">同意</el-button>
        <el-button v-if="isstatus == '提交'" class="onSearch" @click="noAgree">不同意</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getLineGroup,
  getnextuser,
} from "@/api/recondition/yearPlan";
import { getData, submitlc } from "@/api/recondition/weekPlan";
export default {
  props: {
    openId: "",
    status: ""
  },
  data() {
    return {
      isdisabled: true,
      showDialog: true,
      isstatus: this.status,
      groupid: "",
      currentdeal: "",
      formData: {
        spr: [
          {
            required: true,
            message: "请选择下一审批人",
            trigger: "change"
          }
        ]
      },
      selection: {
        spbz: [],
        spr: [],
        sftd: [
          { name: "是", value: "1" },
          { name: "否", value: "2" }
        ],
        sfdd: [
          { name: "是", value: "1" },
          { name: "否", value: "2" }
        ],
        sfww: [
          { name: "是", value: "1" },
          { name: "否", value: "2" }
        ],
        zt: [
          { name: "已执行", value: "1" },
          { name: "未执行", value: "2" }
        ],
        sfsd: [
          { name: "是", value: "1" },
          { name: "否", value: "2" }
        ],
        rwdj: [{name: "一般任务", value: "1"},{name: "重要任务", value: "2"},{name: "紧急任务", value: "3"}],
      },
      form: {
        whbz: "",
        objId: this.openId
      }
    };
  },
  mounted() {
    console.log(this.isstatus);
    this.getList();
    this.getselectionList();
  },
  methods: {
    getselectionList() {
      // 获取xl班组
      getLineGroup().then(res => {
        this.selection.spbz = res.data.rows;
      });
      getnextuser().then(res => {
        console.log(res);
        this.selection.spr = res.data.rows;
      });
    },
    getnextuser() {
      getnextuser(this.$qs.stringify({ groupid: this.groupid })).then(res => {
        this.selection.spr = res.data.rows;
      });
    },
    // 获取年计划数据列表
    getList() {
      getData(this.$qs.stringify(this.form)).then(res => {
        console.log(res.data.rows);
        this.form = res.data.rows[0];
        // this.form.tasklevel
        // this.form.pageNum = 1;
      });
    },
    //   确认
    sure() {
      this.$refs["dataForm"].validate(val => {
        this.form.currentdeal = this.form.spr;
        this.selection.spr.forEach(item => {
          if (this.form.spr == item.objId) {
            this.form.currentdealname = item.name;
          }
        });
        this.form.planstatus = "1";
        submitlc(this.$qs.stringify(this.form)).then(res => {
          if (res.data.code == 0) {
            this.$message({ message: "保存成功", type: "success" });
            this.$parent.getList();
            this.showDialog = false;
            this.$emit("childFn", {
              showDialog: false
            });
          }
        });
      });
    },
    // 同意
    agree() {
      this.form.planstatus = "3";
      submitlc(this.$qs.stringify(this.form)).then(res => {
        if (res.data.code == 0) {
          this.$message({ message: "保存成功", type: "success" });
          this.$parent.getList();
          this.showDialog = false;
          this.$emit("childFn", {
            showDialog: false
          });
        }
      });
    },
    // 不同意
    noAgree() {
      this.form.planstatus = "2";
      submitlc(this.$qs.stringify(this.form)).then(res => {
        if (res.data.code == 0) {
          this.$message({ message: "保存成功", type: "success" });
          this.$parent.getList();
          this.showDialog = false;
          this.$emit("childFn", {
            showDialog: false
          });
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
          this.form = { brand_right: 0 };
          this.$emit("childFn", {
            showDialog: this.showDialog
          });
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style>
</style>