<template>
  <!-- <h2>
      状态检修策略管理
  </h2>-->
  <div class="single-row-title">
    <el-dialog
      v-dialogDrag
      :visible.sync="showDialog"
      :title="title"
      :center="true"
      :before-close="handleClose"
      top="10vh"
      width="50%"
    >
      <!-- :rules="rules" -->

      <el-form
        ref="formrules"
        :model="addlist"
        label-position="right"
        style="width:100% ;margin: 0 auto;"
        label-width="130px"
      >
        <div class="Form-input">
          <el-form-item :label="`${$xl}名称`" style="width:50%">
            <el-select
              v-model="addlist.xlmc"
              filterable
              clearable
              placeholder="请选择"
              style="width:100%"
              :disabled="true"
            >
              <el-option
                v-for="item in selectinfo_All.xlmc"
                :key="item.id"
                :label="item.lineName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="维护班组" label-width="130px" style="width:50%">
            <el-select
              v-model="addlist.ywbz"
              clearable
              placeholder="请选择"
              :disabled="true"
              style="width:100%"
            >
              <el-option
                v-for="item in selectinfo_All.ywbz"
                :key="item.objId"
                :label="item.groupname"
                :value="item.objId"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item :label="`${$dydj}`" label-width="130px" style="width:50%">
            <el-select
              v-model="addlist.dydj"
              clearable
              placeholder="请选择"
              :disabled="true"
              style="width:100%"
            >
              <el-option
                v-for="item in selectinfo_All.dydj"
                :key="item.objId"
                :label="item.bzmc"
                :value="item.bzmc"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="投运日期" label-width="130px" style="width:50%">
            <el-col>
              <el-date-picker
                v-model="addlist.tyrq"
                :disabled="true"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择日期"
                style="width:100%"
              />
            </el-col>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="定期评价结果" label-width="130px" style="width:50%">
            <el-select
              v-model="addlist.regularResult"
              clearable
              placeholder="请选择"
              :disabled="true"
              style="width:100%"
            >
              <el-option
                v-for="item in selectinfo_All.newestResult"
                :key="item.objId"
                :label="item.bzmc"
                :value="item.objId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width:50%"></el-form-item>
        </div>

        <div class="Form-input">
          <el-form-item label="最新评价结果" label-width="130px" style="width:50%">
            <el-select
              v-model="addlist.newestResult"
              clearable
              :disabled="true"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in selectinfo_All.newestResult"
                :key="item.objId"
                :label="item.bzmc"
                :value="item.objId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最新评价日期" label-width="130px" style="width:50%">
            <el-col>
              <el-date-picker
                v-model="addlist.newestDate"
                :disabled="true"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择日期"
                style="width:100%"
              />
            </el-col>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="上次检修分类" label-width="130px" style="width:50%">
            <el-select
              v-model="addlist.scjxfl"
              clearable
              :disabled="isxq"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in selectinfo_All.fl"
                :key="item.objId"
                :label="item.bzmc"
                :value="item.bzid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传检修日期" label-width="130px" style="width:50%">
            <el-col>
              <el-date-picker
                v-model="addlist.scjxrq"
                type="date"
                :disabled="isxq"
                value-format="yyyy-MM-dd"
                placeholder="请选择日期"
                style="width:100%"
              />
            </el-col>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="建议检修分类" label-width="130px" style="width:50%">
            <el-select
              v-model="addlist.jyjxfl"
              clearable
              :disabled="isxq"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in selectinfo_All.fl"
                :key="item.objId"
                :label="item.bzmc"
                :value="item.bzid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="建议检修时间" label-width="130px" style="width:50%">
            <el-col>
              <el-date-picker
                v-model="addlist.jyjxsj"
                type="date"
                :disabled="isxq"
                value-format="yyyy-MM-dd"
                placeholder="请选择日期"
                style="width:100%"
              />
            </el-col>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="评价设备简要描述" label-width="130px" style="width:100%;font-size:1rem">
            <el-input type="textarea" :disabled="isxq" v-model="addlist.jyms"></el-input>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="处理建议" label-width="130px" style="width:100%;font-size:1rem">
            <el-input type="textarea" :disabled="isxq" v-model="addlist.cljy"></el-input>
          </el-form-item>
        </div>

        <!-- {{openobj}} -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" v-if="!isxq" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" v-if="!isxq" @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { edit, getSelectMultiple } from "@/api/statusE/defend/plot";
import qs from "qs";
export default {
  props: {
    openobj: {
      default: null,
      type: Object
    }
  },
  data() {
    return {
      selectinfo_All: {
        dydj: [],
        xlmc: [],
        ywbz: [],
        newestResult: [],
        fl: []
      },
      addlist: {
        objId: null,
        xlmc: null,
        tyrq: null,
        dydj: null,
        newestDate: null,
        newestResult: null,
        jyms: null,
        scjxfl: null,
        scjxrq: null,
        jyjxfl: null,
        jyjxsj: null,
        cljy: null
      },
      title: null,
      isxq: false,
      showDialog: true
      //   rules: {
      //     workSource: [
      //       {
      //         required: true,
      //         message: "请输入工作来源",
      //         trigger: "blur"
      //       }
      //     ],
      //     dispatch: [
      //       {
      //         required: true,
      //         message: "请输入调度管辖",
      //         trigger: "blur"
      //       }
      //     ]
      //   }
    };
  },
  created() {
    if (this.openobj.isedit) {
      this.title = "编辑";
    } else {
      this.title = "查看详情";
      this.isxq = true;
    }
    this.addlist = {
      id: this.openobj.obj.id,
      xlmc: this.openobj.obj.xlmc,
      tyrq: this.openobj.obj.tyrq,
      dydj: this.openobj.obj.dydj,
      newestDate: this.openobj.obj.newestDate,
      newestResult: this.openobj.obj["newestResult"],
      jyms: this.openobj.obj.jyms,
      scjxfl: this.openobj.obj["scjxfl"],
      scjxrq: this.openobj.obj.scjxrq,
      jyjxfl: this.openobj.obj["jyjxfl"],
      jyjxsj: this.openobj.obj.jyjxsj,
      cljy: this.openobj.obj.cljy
    };
    this.getSelectMultiple();
  },
  mounted() {},
  methods: {
    /**dydj下拉 */
    getSelectMultiple() {
      getSelectMultiple({ fzids: "CABLE_ER_TYPE,ZTPJ_PJJG" })
        .then(res => {
          console.log(res);
          this.selectinfo_All.fl = res.data.data["CABLE_ER_TYPE"];
          this.selectinfo_All.newestResult = res.data.data["ZTPJ_PJJG"];
        })
        .catch(err => {});
    },
    /**下拉框 */
    SblxFn() {
      getlineList()
        .then(res => {
          console.log(res);
          this.selectinfo.tdjg = res.data.data;
        })
        .catch(err => {});
    },
    // 保存
    addfn() {
      edit(this.addlist)
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            this.$message({ message: res.data.msg, type: "success" });
            this.$parent.getList();
            this.showDialog = false;
            this.$emit("childFn", {
              showDialog: this.showDialog
            });
          }
        })
        .catch(err => {});
    },
    /**确定 */
    SuerFun() {
      this.$refs["formrules"].validate(val => {
        if (val) {
          this.addfn();
        } else {
          this.$message({
            message: "必填项未填！！！",
            type: "error"
          });
        }
      });
    },
    /**取消*/
    handleClose() {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.showDialog = false;
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