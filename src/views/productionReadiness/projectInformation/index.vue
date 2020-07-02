<template>
  <!-- <div> -->
  <!-- <h2>工程信息</h2> -->
  <div>
    <div class="main-body" v-if="isShowStageInfo">
      <div class="main-userSelect">
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <el-form-item :label="`${$dydj}:`">
              <el-select v-model="form.dydj" clearable placeholder="请选择">
                <el-option
                  v-for="item in selectinfo_All.CABLE_VOLTAGE_RANK"
                  :key="item.objId"
                  :label="item.bzmc"
                  :value="item.bzmc"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工程性质:">
              <el-select v-model="form.gcxz" clearable placeholder="请选择">
                <el-option
                  v-for="item in selectinfo_All.PROJECT_TYPE"
                  :key="item.objId"
                  :label="item.bzmc"
                  :value="item.bzmc"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="工程属性：">
              <el-select v-model="form.gcsx" clearable placeholder="请选择">
                <el-option
                  v-for="item in selectinfo_All.PROJECT_ATTR"
                  :key="item.objId"
                  :label="item.bzmc"
                  :value="item.bzmc"
                ></el-option>
              </el-select>
            </el-form-item>-->
            <el-form-item label="阶段:">
              <el-select v-model="form.jd" clearable placeholder="请选择">
                <el-option
                  v-for="item in selectinfo_All.ZJGC_GC_JD"
                  :key="item.objId"
                  :label="item.bzmc"
                  :value="item.objId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否归档:">
              <el-select v-model="form.qrgd" clearable placeholder="请选择">
                <el-option v-for="item in is_all" :key="item.id" :label="item.qb" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工程名称:">
              <el-input v-model="form.gcmc" clearable />
            </el-form-item>
            <el-form-item label="是否走流程:">
              <el-select v-model="form.sflc" clearable placeholder="请选择">
                <el-option v-for="item in is_all" :key="item.id" :label="item.qb" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="当前处理人:">
              <el-select v-model="form.clr" clearable placeholder="请选择">
                <el-option
                  v-for="item in userinfo"
                  :key="item.objId"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="float: right;margin-right: 0 !important">
              <el-button class="onSearch" @click="onSearch">查询</el-button>
              <el-button class="onSearch" @click="reset" style="margin-right: 0 !important">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="content">
        <div class="respont-content">
          <el-form>
            <el-col>
              <el-form-item style="float: left;">
                <el-button class="onSearch" @click="AddFn">
                  <i class="el-icon-plus">新增</i>
                </el-button>
              </el-form-item>
              <el-form-item style="float: right;">
                <el-button class="onSearch" @click="exportFn">
                  <i class="el-icon-document"></i> 导出
                </el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="table">
          <el-table
            :data="tableData"
            style="border: 1px solid #c7c7c7"
            :cell-style="{borderColor: '#c7c7c7'}"
            :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}"
            border
            fit
            :row-style="rowStyle"
            highlight-current-row
            @selection-change="CheckFun"
          >
            <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
            <el-table-column prop="gcmc" label="工程名称" align="center"></el-table-column>
            <el-table-column prop="dydj" :label="`${$dydj}`" align="center"></el-table-column>
            <el-table-column prop="gcxz" label="工程性质" align="center"></el-table-column>
            <!-- <el-table-column prop="gcsx" label="工程属性" align="center"></el-table-column> -->
            <el-table-column prop="jd" label="阶段" align="center"></el-table-column>
            <el-table-column prop="clr" label="当前处理人" align="center" width="100"></el-table-column>
            <el-table-column prop="sflc" label="是否走流程" align="center" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.sflc==1?"否":scope.row.sflc==0?"是":""}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="tyrq" label="投运日期" align="center"></el-table-column>
            <el-table-column prop="sfgd" label="是否归档" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.sfgd == 1">归档</span>
                <span v-if="scope.row.sfgd == 2">未归档</span>
              </template>
            </el-table-column>
            <el-table-column prop="gdrq" label="归档日期" align="center"></el-table-column>
            <el-table-column prop="sfcq" label="是否超期" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.sfcq == 1">是</span>
                <span v-if="scope.row.sfcq == 2">否</span>
              </template>
            </el-table-column>
            <el-table-column prop="cqts" label="超期天数" align="center"></el-table-column>
            <el-table-column prop="dlwz" label="地理位置" align="center"></el-table-column>
            <el-table-column prop="qbdh" label="工程编号" align="center"></el-table-column>
            <el-table-column prop="qrgd" label="资料归档" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.qrgd==1?"已归档":"未归档"}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="czrq" label="操作日期" align="center" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.czrq | format('yyyy-MM-dd')}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="300">
              <template slot-scope="scope">
                <!-- <p class="intableBtn" @click="showInformation(scope.row.objId)">阶段信息</p> -->
                <el-button
                  class="onSearch"
                  size="small"
                  @click="showInformation(scope.row.objId)"
                >阶段信息</el-button>
                <el-button class="onSearch" size="small" @click="editFuc(scope.row.objId)">编辑</el-button>
                <el-button type="danger" size="small" plain @click="deleteFun(scope.row.objId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="pagination.total>0"
            :total="pagination.total"
            :page.sync="form.pageNum"
            :limit.sync="pagination.limit"
            @pagination="getTableList"
          />
        </div>
      </div>
    </div>
    <stage-info :openID="openID" v-if="!isShowStageInfo" @childFn1="parentFn"></stage-info>
    <div class="sc-sort-Dialog" v-if="AddshowDialog">
      <el-dialog
        :visible.sync="AddshowDialog"
        title="工程信息"
        v-dialogDrag
        :center="true"
        top="25vh"
        :before-close="handleClose"
      >
        <el-form
          ref="gcadd"
          :model="addlist"
          label-position="left"
          style="width:100% ;margin: 0 auto;"
        >
          <div class="Form-input">
            <div class="form-long-item">
              <label class="form-label">工程名称：</label>
              <el-input v-model="addlist.gcmc" clearable style="width:66%" />
            </div>
          </div>
          <div class="Form-input">
            <div class="form-long-item">
              <label class="form-label">工程编号：</label>
              <el-input v-model="addlist.qbdh" clearable style="width:66%" />
            </div>
          </div>
          <div class="Form-input">
            <div class="form-long-item">
              <label class="form-label">地理位置：</label>
              <el-input v-model="addlist.dlwz" clearable style="width:66%" />
            </div>
          </div>
          <div class="Form-input">
            <div class="form-long-item">
              <label class="form-label">工程性质：</label>
              <el-select v-model="addlist.gcxz" clearable placeholder="请选择">
                <el-option
                  v-for="item in selectinfo_All.PROJECT_TYPE"
                  :key="item.objId"
                  :label="item.bzmc"
                  :value="item.bzmc"
                ></el-option>
              </el-select>
            </div>
          </div>

          <!-- <div class="Form-input">
            <div class="form-long-item">
              <label class="form-label">工程属性：</label>
              <el-select v-model="addlist.gcsx" clearable placeholder="请选择">
                <el-option
                  v-for="item in selectinfo_All.PROJECT_ATTR"
                  :key="item.objId"
                  :label="item.bzmc"
                  :value="item.bzmc"
                ></el-option>
              </el-select>
            </div>
          </div>-->
          <div class="Form-input">
            <div class="form-long-item">
              <label class="form-label">{{$dydj}}:</label>
              <el-select v-model="addlist.dydj" clearable placeholder="请选择">
                <el-option
                  v-for="item in selectinfo_All.CABLE_VOLTAGE_RANK"
                  :key="item.objId"
                  :label="item.bzmc"
                  :value="item.bzmc"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="Form-input">
            <div class="form-long-item">
              <label class="form-label">是否走流程:</label>
              <el-select v-model="addlist.sflc" clearable placeholder="请选择">
                <el-option
                  v-for="item in selectinfo_All.YES_OR_NO"
                  :key="item.bzid"
                  :label="item.bzmc"
                  :value="item.bzid"
                ></el-option>
              </el-select>
            </div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="UserSearchFun" @click="SuerFun">保存</el-button>
          <el-button class="onSearch" @click="handleClose">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import StageInfo from "./stageInfo";
import request from "@/utils/request";
import {
  getList,
  Add,
  Info,
  UserList,
  Edit
} from "@/api/productionReadiness/projectInformation/projectInfo";
import "@/styles/myStyle/index.scss";
import qs from "qs";
import { ExportFn } from "@/api/public";
export default {
  name: "projectInformation",
  components: {
    Pagination,
    StageInfo
  },
  data() {
    return {
      isShowStageInfo: true,
      AddshowDialog: false,
      form: {
        gcmc: null,
        qrgd: null,
        jd: null,
        gcsx: null,
        gcxz: null,
        sflc: null,
        clr: null,
        ywdw: "",
        date: "",
        dydj: "",
        xlmc: "",
        ysfs: "",
        pageNum: 1,
        pageSize: 10
      },
      pagination: {
        pageNum: 1,
        limit: 10,
        total: 2
      },
      selection: {
        dw: [{ id: "1", qb: "全部" }],
        zcdw: [{ id: "1", qb: "全部" }],
        dydj: [{ id: "1", qb: "全部" }],
        xlmc: [{ id: "1", qb: "全部" }],
        ysfs: [{ id: "1", qb: "全部" }]
      },
      openID: null, // 选择某一条的id
      //选中的数据
      CheckedSelection: [],
      tableData: [],
      list: {},
      addlist: {
        gcmc: null,
        sflc: null,
        dydj: null,
        gcsx: null,
        qbdh: null,
        gcxz: null,
        dlwz: null,
        objId: null
      },
      selectinfo_All: [],
      selectinfo: [
        { fzid: "PROJECT_TYPE" }, //工程性质
        // { fzid: "PROJECT_ATTR" }, //工程属性
        { fzid: "CABLE_VOLTAGE_RANK" }, //dydj
        { fzid: "YES_OR_NO" }, //是否走流程
        { fzid: "ZJGC_GC_JD" } //阶段
      ],
      is_all: [
        { id: 0, qb: "是" },
        { id: 1, qb: "否" }
      ],
      userinfo: [], //用户列表
      isadd: false,
      isedit: false
    };
  },
  created() {},
  mounted() {
    this.getTableList();
    this.getSelect();
    this.getUser();
  },
  methods: {
    rowStyle({ row, rowIndex, col, columnIndex }) {
      let stylejson = {
        // background: "#1495f1",
        color: "#2d8cf0"
      };
      if (row.clr == this.$store.state.user.UserName) {
        return stylejson;
      } else {
        return "";
      }
    },
    parentFn(val) {
      this.isShowStageInfo = val.back;
      this.getTableList(); // 刷新方法
    },
    // 获取列表信息
    getTableList() {
      let list = qs.stringify(this.form);
      getList(list).then(response => {
        if (response.status == 200) {
          this.tableData = response.data.rows;
          this.pagination.total = response.data.total;
        }
      });
    },
    /**用户列表 */
    getUser() {
      UserList().then(res => {
        this.userinfo = res.data.rows;
      });
    },
    /**获取select数据 */
    getSelect() {
      let array = this.selectinfo;
      array.forEach(element => {
        Info(qs.stringify(element)).then(res => {
          let data = res.data.data;
          let title = element.fzid;
          this.$set(this.selectinfo_All, title, data);
        });
      });
    },
    /**新增 */
    AddFn() {
      this.AddshowDialog = true;
      this.isadd = true;
    },
    /**编辑 */
    editFuc(val) {
      //console.log("编辑");
      this.AddshowDialog = true;
      this.isedit = true;
      getList(qs.stringify({ objId: val })).then(res => {
        // //console.log(res.data);
        this.addlist = res.data.rows[0];
      });
    },
    /**删除数据 */
    deleteFun(val) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(result => {
          return request
            .post(
              "/zjgc/gc/remove",
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
     * 确认按钮
     */
    SuerFun() {
      if (this.addlist.gcmc == null || this.addlist.gcmc == "") {
        this.$message({
          message: "请填写工程名称",
          type: "error"
        });
        return false;
      }
      this.AddshowDialog = false;
      let list = qs.stringify(this.addlist);
      if (this.isadd) {
        Add(list).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "新增成功！！！",
              type: "success"
            });
            this.getTableList();
            this.addlist = {
              gcmc: null,
              sflc: null,
              dydj: null,
              gcsx: null,
              gcxz: null,
              objId: null
            };
            this.isadd = false;
          }
        });
      } else if (this.isedit) {
        Edit(list).then(res => {
          // //console.log(res.data);
          if (res.data.code == 0) {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            this.getTableList();
            this.addlist = {
              gcmc: null,
              sflc: null,
              dydj: null,
              gcsx: null,
              gcxz: null,
              gcmc: null,
              objId: null
            };
            this.isedit = false;
          }
        });
      } else {
        //console.log("程序出错！！！");
      }
    },
    /**
     * 取消按钮
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.AddshowDialog = false;
          this.addlist = {
            gcmc: null,
            sflc: null,
            dydj: null,
            gcsx: null,
            gcxz: null,
            gcmc: null,
            objId: null
          };
          done();
        })
        .catch(_ => {});
    },
    /**重置 */
    reset() {
      // //console.log("reset");
      this.form = { brand_right: 0 };
      this.form.pageSize = 10;
      this.form.pageNum = 1;
      this.getTableList();
    },
    onSearch() {
      // //console.log(this.form.date);
      this.getTableList();
      // //console.log("onSearch");
    },
    getList() {},
    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val;
      //console.log(this.CheckedSelection);
    },
    // 阶段信息
    showInformation(val) {
      this.isShowStageInfo = false;
      this.openID = val;
      //console.log(val);
    },
    view(val) {
      //console.log("查看");
      //console.log(val);
      this.isview = false;
    },
    /**导出 */
    exportFn() {
      //console.log("导出");
      ExportFn("/zjgc/gc/export").then(response => {
        //console.log(response);
        window.location.href =
          process.env.VUE_APP_BASE_API +
          "/common/download?fileName=" +
          response.data.msg +
          "&delete=true";
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.intableBtn {
  cursor: pointer;
  color: lightskyblue;
}
</style>
