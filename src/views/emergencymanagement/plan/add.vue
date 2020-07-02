<template>
  <!-- <h2>
      应急预案管理
  </h2>-->
  <div class="single-row-title">
    <el-dialog
      v-dialogDrag
      :visible.sync="showDialog"
      :title="title"
      :center="true"
      :before-close="handleClose"
      top="5vh"
      width="36%"
    >
      <el-form
        ref="formrules"
        :rules="formRules"
        :model="addlist"
        style="width:100% ;margin: 0 auto;"
      >
        <div class="Form-input">
          <el-form-item label="预案编号：" label-width="130px" prop="planno">
            <el-input v-model="addlist.planno" clearable />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="预案名称：" label-width="130px" prop="planmae">
            <el-input v-model="addlist.planmae" clearable />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="预案等级：" label-width="130px" prop="planlevel">
            <!-- <el-input v-model="addlist.planlevel" clearable /> -->
            <el-select
              v-model="addlist.planlevel"
              clearable
              placeholder="请选择"
              style=" width: 100%;"
            >
              <!-- <el-option label="一级" value="1"></el-option>
              <el-option label="二级" value="2"></el-option>
              <el-option label="三级" value="3"></el-option>-->
              <el-option v-for="item in Pleve" :key="item.id" :label="item.lineName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="预案类型：" label-width="130px">
            <div
              style="display:flex;justify-content: space-between;align-items: center;margin-top:1em;"
            >
              <el-radio-group v-model="addlist.plantype">
                <el-radio label="1">抢修预案</el-radio>
                <el-radio label="2">应急处置预案</el-radio>
                <el-radio label="3">供电恢复预案</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
        </div>
        <div class="Form-input" style="justify-content: center;">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="#"
            :on-preview="handlePreview"
            :file-list="fileList"
            :limit="1"
            :on-change="change"
            :on-exceed="onexceed"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary">点击上传</el-button>
          </el-upload>
        </div>
        <div class="Form-input">
          <el-form-item :label="`${$xl}：`" label-width="130px" prop="lineName">
            <el-select
              v-model="addlist.lineName"
              filterable
              clearable
              @change="linexl"
              value-key="lineName"
              placeholder="请选择"
              style=" width: 100%;"
            >
              <el-option
                v-for="item in linetable"
                :key="item.id"
                :label="item.lineName"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="事件类型：" label-width="130px" prop="eventTypeName">
            <el-select
              v-model="addlist.eventTypeName"
              clearable
              @change="SJLX"
              value-key="bzmc"
              placeholder="请选择"
              style=" width: 100%;"
            >
              <el-option v-for="item in sj" :key="item.objId" :label="item.bzmc" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="制定单位：" label-width="130px">
            <el-input v-model="addlist.productionunit" clearable />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="物资点：" label-width="130px">
            <el-input v-model="addlist.materialpoint" clearable />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="抢修队伍：" label-width="130px" prop="rescueteams">
            <el-select v-model="addlist.rescueteams" clearable placeholder="请选择">
              <el-option
                v-for="item in group"
                :key="item.objId"
                :label="item.groupname"
                :value="item.objId"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="应急预案描述：" prop="plansdescribed" style="width:100%">
            <el-input type="textarea" v-model="addlist.plansdescribed" clearable></el-input>
          </el-form-item>
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
import { GropList, UserList, downloadImg } from "@/api/public";
import info from "@/api/emergencymanagement/plan";
import { fatherList } from "@/api/cableandchannel/cable-equipment-ledger/Line/index";
import qs from "qs";
import { Info } from "@/api/productionReadiness/projectInformation/projectInfo";
import { getUserId, getUserName } from "@/utils/auth";
export default {
  props: {
    openID: {
      default: null
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        limit: 10,
        total: 0
      },
      tableData: [],
      addlist: {
        objId: this.openID,
        planmae: null,
        planno: null,
        planlevel: null,
        lineName: null,
        plantype: "1",
        lineid: null,
        eventTypeName: null,
        eventtype: null,
        productionunit: null,
        rescueteams: null,
        fileName: null,
        fileUrl: null,
        materialpoint: "广盈公司",
        currentProcessingPeople: null,
        currentProcessingPeopleName: null,
        makingPeopleName: null,
        makingpeople: null
      },
      showDialog: true,
      Pleve: [
        { lineName: "一级", id: "1" },
        { lineName: "二级", id: "2" },
        { lineName: "三级", id: "3" }
      ],
      fileList: [],
      formRules: {
        planno: [
          {
            required: true,
            message: "请输入预案编号",
            trigger: "blur"
          }
        ],
        planmae: [
          {
            required: true,
            message: "请输入预案名称",
            trigger: "blur"
          }
        ],
        plansdescribed: [
          {
            required: true,
            message: "请输入应急预案描述",
            trigger: "blur"
          }
        ],
        planlevel: [
          {
            required: true,
            message: "请输入预案等级",
            trigger: "blur"
          }
        ],
        lineName: [
          {
            required: true,
            message: "请选择"+this.$xl,
            trigger: "change"
          }
        ],
        eventTypeName: [
          {
            required: true,
            message: "请选择事件类型",
            trigger: "change"
          }
        ],
        rescueteams: [
          {
            required: true,
            message: "请选择抢修队伍",
            trigger: "change"
          }
        ]
      },
      title: "",
      group: [],
      lcdata: {
        objId: null,
        sxh: "1",
        clrid: "",
        clrmc: "",
        bzid: "",
        bzmc: ""
      },

      objid: {
        objId: this.openID
      },
      line: {
        lineNature: "主线"
      },
      linetable: [],
      sj: []
    };
  },
  mounted() {},
  watch: {},
  created() {
    this.getgroup();
    if (this.isEdit) {
      this.title = "编辑";
      this.getinfo(this.objid);
    } else {
      this.title = "新增";
    }
    Info(qs.stringify({ fzid: "YJYA_SJ_TYPE" })).then(res => {
      this.sj = res.data.data;
    });
    this.LineName(this.line);
  },
  methods: {
    linexl(val) {
      //console.log(val);
      if (val != null) {
        this.addlist.lineName = val.lineName;
        this.addlist.lineid = val.id;
      }
    },
    SJLX(val) {
      //console.log(val);
      if (val != null) {
        this.addlist.eventTypeName = val.bzmc;
        this.addlist.eventtype = val.objId;
      }
    },
    /**获取页面数据 */
    async getinfo(res) {
      await info
        .getList(qs.stringify(res))
        .then(result => {
          this.addlist = result.data.rows[0];
          //console.log(this.addlist, "页面数据");
          if (result.data.rows[0].fileName) {
            this.fileList = [
              {
                name: result.data.rows[0].fileName,
                percentage: 0,
                raw: null,
                size: null,
                status: null,
                uid: null
              }
            ];
          }
          //console.log(result);
        })
        .catch(err => {
          //console.log(err);
        });
    },
    /**xl名称 */
    LineName(res) {
      info.Linelist(this.$qs.stringify(res)).then(res => {
        //console.log(res, "xianlu名称");
        this.linetable = res.data.rows;
        this.linetable.forEach(res => {
          this.$set(res, "lineid", res.id);
        });
      });
    },

    /**获取班组列表 */
    getgroup() {
      GropList().then(res => {
        if (res.status == 200) {
          this.group = res.data.rows;
        }
      });
    },
    /**当前处理人 */
    getUser() {
      UserList().then(res => {
        this.userinfo = res.data.rows;
      });
    },
    onexceed(file, fileList) {
      //console.log(fileList, "ononexceed");
      // this.fileList = fileList;
      this.$message({
        message: "只能上传一个文件，请先删除文件！！！",
        type: "warning"
      });
    },
    /**上传按钮触发 */
    change(file, fileList) {
      //console.log(fileList, "fileList");
      this.fileList = fileList;
      let filel = fileList[0]["raw"];
      //console.log(filel);
      var formdata = new FormData();
      formdata.append("file", filel);
      downloadImg("/cable/tYjglYjya/upload", formdata).then(res => {
        // //console.log(res.data.data, "刹车鼓");
        this.addlist.fileName = res.data.data.wjmc;
        this.addlist.fileUrl = res.data.data.wjlj;
      });
    },

    handlePreview(file) {
      //console.log(file);
    },
    /**关闭窗口 */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.showDialog = false;
          this.$emit("chiladddFn", {
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
    },
    /**确认按钮 */
    SuerFun() {
      this.$refs["formrules"].validate(val => {
        if (val) {
          if (this.isEdit) {
            // this.addlist.makingpeople = null;
            // this.addlist.currentProcessingPeople = null;
            // this.addlist.currentProcessingPeopleName = null;
            // this.addlist.makingPeopleName = null;
             this.addlist.makingpeople = getUserId();
            this.addlist.currentProcessingPeople = getUserId();
            this.addlist.currentProcessingPeopleName = getUserName();
            this.addlist.makingPeopleName = getUserName();
            info
              .editList(qs.stringify(this.addlist))
              .then(res => {
                //console.log(res);
                if (res.data.code == 0) {
                  this.$message({
                    message: "编辑成功",
                    type: "success"
                  });
                  this.$parent.getList();
                  this.$emit("chiladddFn", {
                    isShowDialog: false,
                    isAdd: false,
                    isviewDialog: false,
                    isEdit: false,
                    openLC: false,
                    tijiao: false
                  });
                } else {
                  this.$message({
                    message: "编辑失败，请联系管理员！！！",
                    type: "error"
                  });
                }
              })
              .catch(err => {
                //console.log(err);
              });
          } else {
            this.addlist.makingpeople = getUserId();
            this.addlist.currentProcessingPeople = getUserId();
            this.addlist.currentProcessingPeopleName = getUserName();
            this.addlist.makingPeopleName = getUserName();
            info
              .addList(qs.stringify(this.addlist))
              .then(res => {
                //console.log(res);
                if (res.data.code == 0) {
                  this.$message({
                    message: "新增成功",
                    type: "success"
                  });
                  this.$parent.getList();
                  this.$emit("chiladddFn", {
                    isShowDialog: false,
                    isAdd: false,
                    isviewDialog: false,
                    isEdit: false,
                    openLC: false,
                    tijiao: false
                  });
                } else {
                  this.$message({
                    message: "新增失败，请联系管理员！！！",
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
    }
  }
};
</script>

<style lang="scss" scope>
.Form-input {
  .el-form-item {
    width: 100%;
    .el-form-item__label {
      text-align: right;
      font-size: 1rem;
    }
  }
  .setbox {
    height: 45px;
  }
  .el-form-item__content {
    .el-textarea.el-input--suffix {
      width: 77%;
      textarea.el-textarea__inner {
        min-height: 150px !important;
      }
    }
  }
  .el-upload {
    display: block;
  }
  .el-form-item__error {
    left: 40%;
  }
}
</style>