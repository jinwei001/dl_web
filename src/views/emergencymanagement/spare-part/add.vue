<template>
  <div class="hastitle">
    <el-dialog
      :visible.sync="showDialog"
      :title="title"
      v-dialogDrag
      :center="true"
      :before-close="handleClose"
      width="60%"
      top="20vh"
    >
        <!-- :rules="rules" -->
      <el-form
        ref="formrules"
        :model="addlist"
        label-position="right"
        style="width:100% ;margin: 0 auto;"
      >
        <div class="Form-input">
          <el-form-item label="设备类型：" prop="devicetypename" label-width="140px" style="width:33%">
            <el-select
              v-model="addlist.devicetypename"
              filterable
              @change="SblxFn"
              value-key="objId"
              clearable
              placeholder="请选择"
              style="width:100%"
            >
              <el-option v-for="item in sblx" :key="item.objId" :label="item.bzmc" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="批次名称：" prop="batchname" label-width="130px" style="width:33%">
            <el-input v-model="addlist.batchname" clearable />
          </el-form-item>
          <el-form-item label="组号：" prop="groupnumber" label-width="130px" style="width:33%">
            <el-input v-model="addlist.groupnumber" clearable />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="物资地点：" prop="supplieslocation" label-width="140px" style="width:33%">
            <!-- <el-select v-model="addlist.supplieslocation" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in dqsgdw"
                :key="item.objId"
                :label="item.bzmc"
                :value="item.objId"
              ></el-option>
            </el-select>-->
            <el-input v-model="addlist.supplieslocation" clearable />
          </el-form-item>
          <el-form-item
            label="批次说明："
            prop="batchinstructions"
            label-width="130px"
            style="width:33%"
          >
            <el-input v-model="addlist.batchinstructions" clearable />
          </el-form-item>
          <el-form-item label="型号：" prop="suppliestype" label-width="130px" style="width:33%">
            <el-input v-model="addlist.suppliestype" clearable />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="批次ID：" prop="batchid" label-width="140px" style="width:33%">
            <el-input v-model="addlist.batchid" clearable />
          </el-form-item>
          <el-form-item label="数量：" prop="suppliesnumber" label-width="130px" style="width:33%">
            <el-input v-model="addlist.suppliesnumber" @input.native="period" clearable />
          </el-form-item>
          <el-form-item label="生产厂家：" prop="manufacturer" label-width="130px" style="width:33%">
            <el-input v-model="addlist.manufacturer" clearable />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="出厂编号：" prop="factorynumber" label-width="140px" style="width:33%">
            <el-input v-model="addlist.factorynumber" clearable />
          </el-form-item>
          <el-form-item label="资产编号：" prop="assetnumbers" label-width="130px" style="width:33%">
            <el-input v-model="addlist.assetnumbers" clearable />
          </el-form-item>
          <el-form-item label="材料：" prop="material" label-width="130px" style="width:33%">
            <el-input v-model="addlist.material" clearable />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="设备主人：" prop="equipmentowners" label-width="140px" style="width:33%">
            <el-select
              v-model="addlist.equipmentowners"
              clearable
              placeholder="请选择"
              filterable
              @change="tjczr"
              style="width:100%"
              value-key="objId"
            >
              <el-option
                v-for="item in userinfo"
                :key="item.objId"
                :label="item.name"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出厂日期：" prop="manufacturedate" label-width="130px" style="width:33%">
            <el-date-picker
              v-model="addlist.manufacturedate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择日期"
              :picker-options="startDatePicker"
              style="width:100%"
            />
          </el-form-item>
          <el-form-item label="投运日期：" prop="putdate" label-width="130px" style="width:33%">
            <el-date-picker
              v-model="addlist.putdate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择日期"
              :picker-options="endDatePicker"
              style="width:100%"
            />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="厂家联系方式：" label-width="140px" style="width:33%" prop="contactway">
            <el-input v-model="addlist.contactway" @input.native="period" maxlength="11" />
          </el-form-item>
          <el-form-item style="width:66%"></el-form-item>
        </div>
      </el-form>
      <!-- {{openobj }} -->
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { UserList } from "@/api/public";
import { Info } from "@/api/productionReadiness/projectInformation/projectInfo";
import qs from "qs";
import { postdata } from "@/api/emergencymanagement/spare";
export default {
  props: {
    openobj: {
      default: null
    }
  },
  data() {
    var isMobileNumber = (rule, value, callback) => {
      if (!value) {
        return new Error("请输入电话号码");
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        const isPhone = reg.test(value);
        value = Number(value); //转换为数字
        if (typeof value === "number" && !isNaN(value)) {
          //判断是否为数字
          value = value.toString(); //转换成字符串
          if (value.length < 0 || value.length > 12 || !isPhone) {
            //判断是否为11位手机号
            callback(new Error("手机号码格式不正确"));
          } else {
            callback();
          }
        } else {
          callback(new Error("请输入电话号码"));
        }
      }
    };
    return {
      showDialog: true, //新增弹框打开
      addlist: {
        contactway: null,
        objId: null,
        batchname: null,
        devicetype: null,
        devicetypename: null,
        groupnumber: null,
        supplieslocation: null,
        batchid: null,
        suppliestype: null,
        suppliesnumber: null,
        manufacturer: null,
        factorynumber: null,
        assetnumbers: null,
        putdate: null,
        manufacturedate: null,
        equipmentowners: null,
        material: null
      },
      dqsgdw: [],
      startDatePicker: this.beginDate(), // 时间选择器
      endDatePicker: this.processDate(),
      sblx: [],
      userinfo: [],
      // rules: {
      //   // contactway: [
      //   //   { required: true, message: "请输入手机号码", trigger: "blur" },
      //   //   { validator: isMobileNumber, trigger: "blur" }
      //   // ],
      //   devicetypename: [
      //     {
      //       required: true,
      //       message: "请选择设备类型",
      //       trigger: "change"
      //     }
      //   ],
      //   batchname: [
      //     {
      //       required: true,
      //       message: "请输入批次名称",
      //       trigger: "blur"
      //     }
      //   ],
      //   groupnumber: [
      //     {
      //       required: true,
      //       message: "请输入组号",
      //       trigger: "blur"
      //     }
      //   ],
      //   batchinstructions: [
      //     {
      //       required: true,
      //       message: "请输入批次说明",
      //       trigger: "blur"
      //     }
      //   ],
      //   suppliestype: [
      //     {
      //       required: true,
      //       message: "请输入型号",
      //       trigger: "blur"
      //     }
      //   ],
      //   factorynumber: [
      //     {
      //       required: true,
      //       message: "请输入出厂编号",
      //       trigger: "blur"
      //     }
      //   ],
      //   assetnumbers: [
      //     {
      //       required: true,
      //       message: "请输入资产编号",
      //       trigger: "blur"
      //     }
      //   ],
      //   material: [
      //     {
      //       required: true,
      //       message: "请输入材料",
      //       trigger: "blur"
      //     }
      //   ],
      //   batchid: [
      //     {
      //       required: true,
      //       message: "请输入批次ID",
      //       trigger: "blur"
      //     }
      //   ],
      //   suppliesnumber: [
      //     {
      //       required: true,
      //       message: "请输入数量",
      //       trigger: "blur"
      //     }
      //   ],
      //   manufacturer: [
      //     {
      //       required: true,
      //       message: "请输入生产厂家",
      //       trigger: "blur"
      //     }
      //   ],
      //   supplieslocation: [
      //     {
      //       required: true,
      //       message: "请选择物资地点",
      //       trigger: "blur"
      //     }
      //   ],
      //   equipmentowners: [
      //     {
      //       required: true,
      //       message: "请选择设备主人",
      //       trigger: "change"
      //     }
      //   ],
      //   manufacturedate: [
      //     {
      //       required: true,
      //       message: "请选择出厂日期",
      //       trigger: "change"
      //     }
      //   ],
      //   putdate: [
      //     {
      //       required: true,
      //       message: "请选择投运日期",
      //       trigger: "change"
      //     }
      //   ]
      // },
      title: null,
      userselect: {
        objId: this.openobj.openID
      }
    };
  },
  created() {
    if (this.openobj.isEdit) {
      this.title = "编辑";
      postdata("/cable/tYjglBpbj/list", qs.stringify(this.userselect))
        .then(res => {
          this.addlist = res.data.rows[0];
          //console.log(this.addlist, "页面数据");
        })
        .catch(err => {});
    } else {
      this.title = "新增";
    }
  },
  mounted() {
    Info(qs.stringify({ fzid: "YJYA_BPBJ_SBLX" })).then(res => {
      this.sblx = res.data.data;
    });
    this.getUser();
  },
  methods: {
    // 时间选择器
    beginDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.addlist.manufacturedate) {
            // 如果结束时间不为空，则小于结束时间
            return (
              new Date(self.addlist.manufacturedate).getTime() < time.getTime()
            );
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      };
    },
    // 时间选择器
    processDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.addlist.putdate) {
            // 如果开始时间不为空，则结束时间大于开始时间
            return new Date(self.addlist.putdate).getTime() > time.getTime();
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      };
    },
    /**匹配数字类型 */
    period(e) {
      // 清除"数字"和"."以外的字符
      e.target.value = e.target.value.replace(/[^\d.]/g, "");
    },
    /**当前处理人 */
    getUser() {
      UserList().then(res => {
        this.userinfo = res.data.rows;
      });
    },
    // 设备人
    tjczr(val) {
      //console.log(val);
      this.addlist.equipmentowners = val.name;
    },
    //设备类型
    SblxFn(val) {
      this.addlist.devicetype = val.objId;
      this.addlist.devicetypename = val.bzmc;
    },
    /**确认按钮 */
    SuerFun() {
      this.$refs["formrules"].validate(val => {
        if (val) {
          /**编辑 */
          if (this.openobj.isEdit) {
            this.addlist.objId = this.openobj.openID;
            postdata("/cable/tYjglBpbj/edit", qs.stringify(this.addlist))
              .then(res => {
                //console.log(res);
                if (res.data.code == 0) {
                  this.$message({
                    message: "编辑成功",
                    type: "success"
                  });
                  this.showDialog = false;
                  this.$emit("childFn", {
                    showDialog: this.showDialog,
                    isAdd: false,
                    isviewDialog: false,
                    isEdit: false,
                    openLC: false,
                    tijiao: false
                  });
                  this.$parent.getList();
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: "error"
                  });
                }
              })
              .catch(err => {
                //console.log(err);
              });
          } else if (this.openobj.isAdd) {
            /**新增 */
            postdata("/cable/tYjglBpbj/add", qs.stringify(this.addlist))
              .then(res => {
                //console.log(res);
                if (res.data.code == 0) {
                  this.$message({
                    message: "新增成功",
                    type: "success"
                  });
                  this.showDialog = false;
                  this.$emit("childFn", {
                    showDialog: this.showDialog,
                    isAdd: false,
                    isviewDialog: false,
                    isEdit: false,
                    openLC: false,
                    tijiao: false
                  });
                  this.$parent.getList();
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: "error"
                  });
                }
              })
              .catch(err => {
                //console.log(err);
              });
          }
        } else {
          this.$message({
            message: "必填项未填！！！",
            type: "error"
          });
        }
      });
    },
    /**关闭页面 */
    handleClose() {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.showDialog = false;
          this.$emit("childFn", {
            showDialog: this.showDialog,
            isAdd: false,
            isviewDialog: false,
            isEdit: false,
            openLC: false,
            tijiao: false
          });
          this.$parent.getList();
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

