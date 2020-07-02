<template>
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
            <el-input v-model="addlist.planno" disabled />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="预案名称：" label-width="130px" prop="planmae">
            <el-input v-model="addlist.planmae" clearable disabled />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="预案等级：" label-width="130px" prop="planlevel">
            <!-- <el-input v-model="addlist.planlevel" clearable /> -->
            <el-select v-model="addlist.planlevel" disabled placeholder="请选择" style=" width: 100%;">
              <el-option label="一级" value="1"></el-option>
              <el-option label="二级" value="2"></el-option>
              <el-option label="三级" value="3"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="预案类型：" label-width="130px">
            <div
              style="display:flex;justify-content: space-between;align-items: center;margin-top:1em;"
            >
              <el-radio-group v-model="addlist.plantype" disabled>
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
            disabled
            :limit="1"
            :on-change="change"
            :on-exceed="onexceed"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" @click="downLoad" type="primary">点击下载</el-button>
          </el-upload>
        </div>
        <div class="Form-input">
          <el-form-item :label="`${$xl}：`" label-width="130px" prop="lineName">
            <el-select
              v-model="addlist.lineName"
              filterable
              disabled
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
              disabled
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
            <el-input v-model="addlist.productionunit" disabled />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="物资点：" label-width="130px">
            <el-input v-model="addlist.materialpoint" disabled />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="抢修队伍：" label-width="130px" prop="rescueteams">
            <el-select v-model="addlist.rescueteams" disabled placeholder="请选择">
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
          <el-form-item label="应急预案描述：" label-width="130px" prop="plansdescribed">
            <el-input type="textarea" v-model="addlist.plansdescribed" disabled></el-input>
          </el-form-item>
        </div>
      </el-form>
      <el-form ref="tjrules" :rules="formRules" :model="tj" style="width:100% ;margin: 0 auto;">
        <!-- <div class="Form-input">
          <el-form-item label="审核班组：" label-width="130px" prop="bzid">
            <el-select
              v-model="tj.bzid"
              clearable
              placeholder="请选择"
              filterable
              @change="tjbz"
              value-key="objId"
            >
              <el-option
                v-for="item in group"
                :key="item.objId"
                :label="item.groupname"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>-->
        <!-- <div class="Form-input">
          <el-form-item label="审核人：" label-width="130px" prop="clrid">
            <el-select
              v-model="tj.clrid"
              clearable
              placeholder="请选择"
              filterable
              @change="tjczr"
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
        </div>-->
        <div class="Form-input" v-if="isEdit">
          <el-form-item
            label="审核意见："
            label-width="130px"
            prop="auditopinion"
            style="min-hight:100px"
          >
            <el-input type="textarea" v-model="tj.auditopinion"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="isEdit" class="onSearch" @click="THFn">退回</el-button>
        <el-button v-if="isEdit" class="UserSearchFun" @click="TGFn">通过</el-button>
        <el-button v-if="isEdit" class="onSearch" @click="handleClose">取 消</el-button>
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
        makingpeople: null,
        bzid: null,
        bzmc: null,
        clrid: "",
        clrmc: "",
        auditopinion: null
      },
      showDialog: true,

      fileList: [],
      formRules: {
        bzid: [
          {
            required: true,
            message: "请选择审核班组",
            trigger: "change"
          }
        ],
        clrid: [
          {
            required: true,
            message: "请选择审核人",
            trigger: "change"
          }
        ],
        auditopinion: [
          {
            required: true,
            message: "请选择审核意见",
            trigger: "blur"
          }
        ]
      },
      title: "",
      group: [],
      lcdata: {
        auditopinion: null,
        processState: null,
        dealingpeopleid: getUserId(),
        dealingpeoplename: getUserName(),
        planid: null,
        objId: null,
        processnode:null
      },
      openLC: false,
      tijiao: true,
      tj: {
        bzid: null,
        clrid: null,
        auditopinion: null
      },
      objid: {
        objId: this.openID
      },
      line: {
        lineNature: "主线"
      },
      linetable: [],
      sj: [],
      group: [],
      userinfo: []
    };
  },
  mounted() {},
  watch: {},
  created() {
    /**获取班组列表 */
    GropList().then(res => {
      if (res.status == 200) {
        this.group = res.data.rows;
      }
    });
    UserList().then(res => {
      this.userinfo = res.data.rows;
    });

    if (this.isEdit) {
      this.title = "审核";
    } else {
      this.title = "查看";
    }
    this.getinfo(this.objid);
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

    /** 下一步班组*/
    tjbz(val) {
      //console.log(val);
      if (val) {
        this.userinfo = null;
        this.lcdata.bzmc = val.groupname;
        this.lcdata.bzid = val.objId;
        /**当前处理人 */
        UserList(this.lcdata.bzid).then(res => {
          this.userinfo = res.data.rows;
        });
      }
    },
    /**
     * 下一步操作人
     */
    tjczr(val) {
      //console.log(val);
      this.lcdata.clrmc = val.name;
      this.lcdata.clrid = val.objId;
    },

    onexceed(file, fileList) {
      //console.log(fileList, "ononexceed");
    },
    /**上传按钮触发 */
    change(file, fileList) {
      //console.log(fileList, "fileList");
    },
    /**下载查看 */
    downLoad() {
      if (this.addlist.fileUrl != null) {
        window.location.href =
          process.env.VUE_APP_BASE_API +
          "/common/downloadFile?url=" +
          this.addlist.fileUrl;
        this.$message({
          message: "请稍等正在下载...",
          type: "success"
        });
      } else {
        this.$message({
          message: "附件不存在！！！",
          type: "warning"
        });
      }
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
    /** 退回*/
    THFn() {
      //console.log(this.lcdata, "lcdata");
      this.$refs["tjrules"].validate(val => {
        if (val) {
          //console.log();
          this.lcdata.auditopinion = this.tj.auditopinion;
          this.lcdata.planid = this.openID;
          this.lcdata.processState = 2;
          this.lcdata.processnode = 2;
          info
            .submitLc(qs.stringify(this.lcdata))
            .then(res => {
              //console.log(res);
              if (res.data.code == 0) {
                this.$message({
                  message: "退回成功",
                  type: "success"
                });
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
        } else {
          this.$message({
            message: "必填项未填！！！",
            type: "error"
          });
        }
      });
    },
    /**通过 */
    TGFn() {
      this.$refs["tjrules"].validate(val => {
        if (val) {
          //console.log();
          this.lcdata.auditopinion = this.tj.auditopinion;
          this.lcdata.planid = this.openID;
          this.lcdata.processState = 3;
          this.lcdata.processnode = 3;
          info
            .submitLc(qs.stringify(this.lcdata))
            .then(res => {
              //console.log(res);
              if (res.data.code == 0) {
                this.$message({
                  message: "通过成功",
                  type: "success"
                });
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
  textarea.el-textarea__inner {
    min-height: 6rem !important;
  }
}
</style>