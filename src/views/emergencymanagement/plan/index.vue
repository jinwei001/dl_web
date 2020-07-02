<template>
  <!-- <h2>
      应急预案管理
  </h2>-->
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="userselect" inline>
          <el-form-item label="预案名称:">
            <el-input v-model="userselect.planmae" clearable></el-input>
          </el-form-item>
          <el-form-item label="预案等级:">
            <el-select v-model="userselect.planlevel" clearable placeholder="请选择">
              <el-option label="一级" value="1"></el-option>
              <el-option label="二级" value="2"></el-option>
              <el-option label="三级" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预案类型:">
            <el-select v-model="userselect.plantype" clearable placeholder="请选择">
              <el-option label="抢修预案" value="1"></el-option>
              <el-option label="应急处置预案" value="2"></el-option>
              <el-option label="供电恢复预案" value="3"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="通道:">
            <el-select v-model="userselect.dldj" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.xlmc"
                :key="item.id"
                :label="item.qb"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item :label="`${$xl}：`">
            <!-- <el-select
              v-model="userselect.lineName"
              filterable
              clearable
              placeholder="请选择"
              style=" width: 100%;"
            >
              <el-option
                v-for="item in linetable"
                :key="item.id"
                :label="item.lineName"
                :value="item.id"
              ></el-option>
            </el-select>-->
            <el-select
              v-model="userselect.lineName"
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
          <el-form-item label="事件类型:">
            <el-select
              v-model="userselect.eventtype"
              clearable
              placeholder="请选择"
              style=" width: 100%;"
            >
              <el-option
                v-for="item in sj"
                :key="item.objId"
                :label="item.bzmc"
                :value="item.objId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预案状态:">
            <el-select v-model="userselect.placurrentstate" clearable placeholder="请选择">
              <el-option label="提交" value="1"></el-option>
              <el-option label="退回" value="2"></el-option>
              <el-option label="通过审核" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="float: right;margin-right: 0">
            <el-button class="onSearch" @click="onSearch">查询</el-button>
            <el-button class="onSearch" @click="reset" style="margin-right: 0">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content">
      <div class="respont-content">
        <el-form>
          <el-col>
            <el-form-item style="float: left;">
              <el-button class="onSearch" @click="Addfun">
                <i class="el-icon-plus">新增</i>
              </el-button>
              <el-button type="danger" plain @click="deleteFn">
                <i class="el-icon-close"></i> 删除
              </el-button>
            </el-form-item>
            <!-- <el-form-item style="float: right;">
              <el-upload action="/">
                <el-button class="onSearch" @click="importFn">
                  <i class="el-icon-plus"></i> 导入
                </el-button>
              </el-upload>
            </el-form-item>-->
          </el-col>
        </el-form>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          style="border: 1px solid #c4c8cf"
          :cell-style="{borderColor: '#c4c8cf'}"
          :header-cell-style="{'background':'#cddce6',borderColor: '#c4c8cf'}"
          border
          fit
          highlight-current-row
          @selection-change="CheckFun"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column prop="planno" label="预案编号" align="center" width="100"></el-table-column>
          <el-table-column
            prop="planmae"
            label="预案名称"
            align="center"
            width="130"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="planlevel" label="预案等级" align="center">
            <template
              slot-scope="scope"
            >{{scope.row.planlevel==1?"一级":scope.row.planlevel==2?"二级":scope.row.planlevel==3?"三级":''}}</template>
          </el-table-column>
          <el-table-column prop="plantype" label="预案类型" align="center" width="150">
            <template
              slot-scope="scope"
            >{{scope.row.plantype==1?"抢修预案":scope.row.plantype==2?"应急处置预案":scope.row.plantype==3?"供电恢复预案":''}}</template>
          </el-table-column>
          <el-table-column
            v-for="item in tableTitle"
            :key="item.index"
            :prop="item.prop"
            :label="item.label"
            align="center"
            :width="item.width"
          ></el-table-column>
         
          <el-table-column prop="makingdate" label="制定日期" align="center" width="100">
            <template slot-scope="scope">{{scope.row.makingdate | format('yyyy-MM-dd')}}</template>
          </el-table-column>
          <el-table-column prop="makingPeopleName" label="制定人" align="center" width="100" />
          <el-table-column prop="auditdate" label="审核日期" align="center" width="100">
            <template slot-scope="scope">{{scope.row.auditdate | format('yyyy-MM-dd')}}</template>
          </el-table-column>
          <el-table-column prop="auditpeopleName" label="审核人" align="center" />
          <el-table-column prop="productionunit" label="制定单位" align="center" />
           <el-table-column prop="lineRiskLevel" :label="`${$xl}风险等级`" align="center" width="130">
            <template
              slot-scope="scope"
            >{{scope.row.lineRiskLevel==1?"正常状态":scope.row.lineRiskLevel==2?"注意状态":scope.row.lineRiskLevel==3?"异常状态":scope.row.lineRiskLevel==4?"严重状态":""}}</template>
          </el-table-column>
          <el-table-column prop="placurrentstate" label="发布状态" align="center">
            <template
              slot-scope="scope"
            >{{scope.row.placurrentstate==1?"提交":scope.row.placurrentstate==2?"退回":scope.row.placurrentstate==3?"通过审核":""}}</template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            class-name="small-padding fixed-width"
            width="300"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-col>
                <!-- <el-button class="onSearch" size="small" @click="ZTPJFn(scope.row)">状态评价</el-button> -->
                <el-button
                  v-if="scope.row.placurrentstate!=3"
                  class="onSearch"
                  size="small"
                  @click="editFun(scope.row.objId)"
                >编辑</el-button>
                <el-button
                  class="onSearch"
                  size="small"
                  v-if="scope.row.operatingState==1"
                  @click="openLc(scope.row.objId)"
                >{{scope.row.placurrentstate!=2?"开启流程":"重新提交流程"}}</el-button>
                <el-button
                  class="onSearch"
                  size="small"
                  v-if="scope.row.operatingState!=1"
                  @click="showLc(scope.row)"
                >查看流程</el-button>
                <el-button type="primary" size="small" @click="downlc(scope.row)">下载预案</el-button>
              </el-col>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="form.total>0"
          :total="form.total"
          :page.sync="userselect.pageNum"
          :limit.sync="form.limit"
          @pagination="getList"
        />
      </div>
    </div>
    <div v-if="isviewDialog">
      <viewshow @childFn="parentFn" :openobj="openobj" />
    </div>
    <div v-if="isShowDialog">
      <add @chiladddFn="parentaddFn" :openID="openID" :isEdit="isEdit" />
    </div>
    <div v-if="openLC">
      <div class="hastitle">
        <el-dialog
          :visible.sync="tijiao"
          title="选择下一步"
          center
          v-dialogDrag
          top="25vh"
          width="25%"
          :before-close="handleClose"
        >
          <el-form
            ref="dataForm"
            :model="form"
            label-position="right"
            style="width:100% ;margin: 0 auto;"
          >
            <div class="Form-input">
              <el-form-item label="班组" :required="true">
                <el-select
                  v-model="tj.bzid"
                  value-key="objId"
                  @change="tjbz"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in group"
                    :key="item.objId"
                    :label="item.groupname"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="Form-input">
              <el-form-item label="审核人" :required="true">
                <el-select
                  v-model="tj.userid"
                  value-key="objId"
                  filterable
                  @change="tjczr"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in userinfo"
                    :key="item.objId"
                    :label="item.name"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>

            <div class="Form-input">
              <el-form-item label="审核意见：" :required="true">
                <el-input type="textarea" v-model="lcdata.auditopinion" clearable></el-input>
              </el-form-item>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button class="UserSearchFun" @click="submitFnQR">确认</el-button>
            <el-button class="onSearch" @click="submitFnQX">取消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <div v-if="isKF">
      <KFZ @childFn="parentKFFn" />
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import qs from "qs";
import viewshow from "./view";
import KFZ from "@/views/KF";
import add from "./add";
import info from "@/api/emergencymanagement/plan";
import request from "@/utils/request";
import { GropList, UserList, ExportFn } from "@/api/public";
import { Info } from "@/api/productionReadiness/projectInformation/projectInfo";
import { getUserId, getUserName } from "@/utils/auth";
export default {
  components: {
    Pagination,
    viewshow,
    add,
    KFZ
  },
  data() {
    return {
      isviewDialog: false, //查看弹框打开
      isShowDialog: false, //新增弹框打开
      isEdit: false, //是否是编辑弹框
      openID: null, //打开弹框的id值
      isAdd: false, //是否是新增弹框
      isKF: false, //是否是新增弹框
      form: {
        limit: 10,
        total: 0
      },
      userselect: {
        pageNum: 1,
        pageSize: 10,
        placurrentstate: null,
        lineName: null,
        plantype: null,
        planlevel: null,
        planmae: null,
        eventtype: null
      },
      selection: {
        xlmc: [{ id: "1", qb: "全部" }]
      },
      isedit: true,
      //表头
      tableTitle: [
        {
          label: this.$xl,
          prop: "lineName",
          width: "130"
        },
        {
          label: this.$xl+"班组",
          prop: "lineGroup",
          width: "130"
        },
        // {
        //   label: this.$xl+"风险等级",
        //   prop: "lineRiskLevel",
        //   width: "130"
        // },
        // {
        //   label: "通道名称",
        //   prop: "name"
        // },
        {
          label: "事件类型",
          prop: "eventTypeName"
          // prop: "plantypeName"
        },
        // {
        //   label: "制定单位",
        //   prop: "productionunit"
        // },
        {
          label: "物资点",
          prop: "materialpoint"
        },
        {
          label: "抢修队伍",
          prop: "rescueteamsName",
          width: "150"
        }
      ],
      tableData: [],
      fileList: [],
      openLC: false,
      tijiao: true,
      tj: {
        bzid: {
          objId: ""
        },
        userid: {
          objId: ""
        }
      },

      group: [],
      userinfo: [],
      lcdata: {
        objId: null,
        dealingpeopleid: null,
        dealingpeoplename: null,
        nextDealingpeopleId: null,
        nextDealingpeopleName: null,
        auditopinion: null,
        planid: null,
        objId: null,
        processState: 1,
        processnode: null
      },
      openobj: {
        objId: null,
        lczt: 1
      },
      //选中的数据
      CheckedSelection: [],
      selectedIDs: [],
      assetsURL: process.env.VUE_APP_BASE_API + "/common/downloadFile?url=",
      line: {
        lineNature: "主线"
      },
      linetable: [],
      sj: [],
      tijiaoId: null
    };
  },
  created() {
    this.LineName(this.line);
    Info(qs.stringify({ fzid: "YJYA_SJ_TYPE" })).then(res => {
      this.sj = res.data.data;
    });
  },
  mounted() {
    this.getList();
  },
  methods: {
    linexl(val) {
      //console.log(val);
      if (val != null) {
        this.userselect.lineName = val.lineName;
        this.userselect.lineid = val.id;
      } else {
        this.userselect.lineName = null;
        this.userselect.lineid = null;
      }
    },
    /**xl名称 */
    LineName(res) {
      info.Linelist(this.$qs.stringify(res)).then(res => {
        //console.log(res, "xianlu名称");
        this.linetable = res.data.rows;
      });
    },
    /**
     * 班组
     */
    tjbz(val) {
      //console.log(val);
      /**处理人 */
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
    /** 处理人*/
    tjczr(val) {
      if (val != null) {
        this.lcdata.nextDealingpeopleName = val.name;
        this.lcdata.nextDealingpeopleId = val.objId;
      } else {
        this.lcdata.nextDealingpeopleId = "";
        this.lcdata.nextDealingpeopleName = "";
      }
    },

    handleRemove(file, fileList) {
      //console.log(file, fileList);
    },
    /**
     * 重置按钮
     */
    reset() {
      //console.log("reset");
      this.userselect = {
        pageNum: 1,
        pageSize: 10,
        operatingState: null,
        lineName: null,
        plantype: null,
        planlevel: null,
        planmae: null,
        eventtype: null
      };
      this.userselect.pageNum = 1;
      this.userselect.pageSize = 10;
      this.getList();
    },
    /**
     * 查询按钮
     */
    onSearch() {
      //console.log("onSearch");
      this.getList();
    },
    getList() {
      info
        .getList(qs.stringify(this.userselect))
        .then(result => {
          this.tableData = result.data.rows;
          //console.log(result);
          this.form.total = result.data.total;
        })
        .catch(err => {
          //console.log(err);
        });
    },
    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val;
      //console.log(this.CheckedSelection);
      let ids = [];
      this.CheckedSelection.map(item => {
        ids.push(item.objId);
      });
      var chosenId = ids.join(); // 数组转字符串
      // var chosenId = ids.join(","); // 数组转字符串
      this.selectedIDs = chosenId; //选中数据中的所有id
    },
    /**删除按钮 */
    deleteFn() {
      if (this.CheckedSelection.length == 0) {
        this.$message("请选择要删除的数据");
        return false;
      }
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          info.DeleteList(this.selectedIDs).then(res => {
            // //console.log(res);
            this.getList();
            this.$message({
              message: "删除成功",
              type: "success"
            });
          });
          done();
        })
        .catch(_ => {});
    },
    /**状态评价按钮 */
    ZTPJFn(val) {
      this.isKF = true;
    },
    parentKFFn(val) {
      this.isKF = val.isKF;
    },
    /**
     * 编辑按钮
     */
    editFun(val) {
      //console.log("编辑按钮");
      //console.log(val);
      this.isAdd = false;
      this.isEdit = true;
      this.isShowDialog = true;
      this.openID = val;
    },
    /**新增按钮 */
    Addfun() {
      //console.log("新增");
      this.isAdd = true;
      this.isEdit = false;
      this.isShowDialog = true;
      this.openID = null;
    },
    /**开启流程 */
    openLc(val) {
      this.isAdd = false;
      this.isviewDialog = false;
      this.isEdit = false;
      this.openLC = true;
      this.tijiao = true;
      this.getgroup();
      this.getUser();
      this.tijiaoId = val;
    },
    /**关闭流程 */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.tijiao = false;
          this.openLC = false;
          done();
        })
        .catch(_ => {});
    },
    /**提交取消 */
    submitFnQX() {
      this.tijiao = false;
      this.openLC = false;
      this.tijiao = false;
      this.lcdata = {};
      this.tj = {
        bzid: {
          objId: ""
        },
        userid: {
          objId: ""
        }
      };
    },
    /**提交确认 */
    submitFnQR() {
      // if (this.lcdata.bzid == "") {
      //   this.$message("请选择班组！！！");
      //   return false;
      // }
      // //console.log(this.lcdata);
      this.lcdata.dealingpeopleid = getUserId();
      this.lcdata.dealingpeoplename = getUserName();
      this.lcdata.planid = this.tijiaoId;
      this.lcdata.processnode = 1;
      this.lcdata.processState = 1;
      if (
        this.lcdata.nextDealingpeopleId == "" ||
        this.lcdata.nextDealingpeopleId == null
      ) {
        this.$message("请选择审核人！！！");
        return false;
      }
      if (this.lcdata.auditopinion == "" || this.lcdata.auditopinion == null) {
        this.$message("请选择审核意见！！！");
        return false;
      }
      info
        .submitLc(qs.stringify(this.lcdata))
        .then(res => {
          //console.log(res, "流程data");
          if (res.data.code == 0) {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            this.tijiao = false;
            this.openLC = false;
            this.lcdata = {};
            this.tj = {
              bzid: {
                objId: ""
              },
              userid: {
                objId: ""
              }
            };
            this.getList();
          } else {
            this.tijiao = false;
            this.openLC = false;
            this.lcdata = {};
            this.tj = {
              bzid: {
                objId: ""
              },
              userid: {
                objId: ""
              }
            };
            this.getList();
          }
        })
        .catch(err => {});
    },
    /**查看流程 */
    showLc(val) {
      //console.log("查看流程");
      //console.log(val);
      this.isviewDialog = true;
      this.isEdit = false;
      this.isAdd = false;
      if (val.placurrentstate == null || val.placurrentstate == "") {
        this.openobj = {
          objId: val.objId,
          lczt: 1
        };
      } else if (val.placurrentstate == 1 || val.placurrentstate == 2) {
        this.openobj = {
          objId: val.objId,
          lczt: 2
        };
      } else {
        this.openobj = {
          objId: val.objId,
          lczt: 3
        };
      }
    },
    /**当前处理人 */
    getUser() {
      UserList().then(res => {
        this.userinfo = res.data.rows;
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
    importFn() {
      //console.log("导入");
    },
    downlc(val) {
      //console.log(val.fileUrl);
      if (val.fileUrl != null) {
        // ExportFn(
        //   "/cable/tYjglYjya/export",
        //   qs.stringify({ objId: val.objId })
        // ).then(response => {
        //   //console.log(response);
        //   window.location.href =
        //     process.env.VUE_APP_BASE_API +
        //     "/common/download?fileName=" +
        //     response.data.msg +
        //     "&delete=true";
        // });
        window.location.href =
          process.env.VUE_APP_BASE_API +
          "/common/downloadFile?url=" +
          val.fileUrl;
        this.$message({
          message: "请稍等正在下载...",
          type: "success"
        });
      } else {
        this.$message({
          message: "对不起，没有浏览预案",
          type: "warning"
        });
      }
    },
    /**DelFunOne 删除一条 */
    DelFunOne(val) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(result => {
          return request
            .post(
              "/cable/tYjglYjya/remove",
              qs.stringify({
                ids: val
              })
            )
            .then(res => {
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              this.getTableList();
            })
            .catch(err => {
              message.error("异常 " + err.msg);
            });
        })
        .catch(err => {
          //console.log(err);
        });
    },
    /**
     * 接收浏览流程子组件的数据
     */
    parentFn(val) {
      //console.log(val);
      this.isviewDialog = val.showDialog;
    },
    /**
     * 接收浏览流程子组件的数据
     */
    parentaddFn(val) {
      this.isShowDialog = false;
      this.isAdd = val.isAdd;
      this.isviewDialog = val.isviewDialog;
      this.isEdit = val.isEdit;
      this.openLC = val.openLC;
      this.tijiao = val.tijiao;
    }
  }
};
</script>
<style lang="scss" scoped>
.Form-input .el-form-item__content .el-textarea.el-input--suffix {
  width: 100%;
}
</style>