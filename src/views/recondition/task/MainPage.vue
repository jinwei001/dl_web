<template>
  <!-- <h2>
      xl巡视计划管理
  </h2>-->
  <div class="main-body">
    <div class="main-userSelect" v-if="ljyxpgButtomStatus">
      <div class="searchForm_glf">
        <el-form ref="form" inline>
          <el-form-item :label="`计划时间:`">
            <el-date-picker v-model="v1" type="month" placeholder="选择月"></el-date-picker>
          </el-form-item>
          <el-form-item :label="`计划状态:`">
            <el-select v-model="form.taskstatus" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.jhzt"
                :key="item.bzid"
                :label="item.bzmc"
                :value="item.bzid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="`电压等级:`">
            <el-select v-model="form.dydj" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.dydj"
                :key="item.bzid"
                :label="item.bzmc"
                :value="item.bzid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="`${$xl}名称:`">
            <el-select v-model="form.xlid" clearable filterable placeholder="请选择" @change="getsbmc">
              <el-option
                v-for="item in selection.xlmc"
                :key="item.id"
                :label="item.lineName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备类型：">
            <el-select v-model="form.devicetypename" clearable placeholder="请选择" @change="getsbmc">
              <el-option
                v-for="item in selection.sblx"
                :key="item.objId"
                :label="item.bzmc"
                :value="item.bzmc"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="维护班组:">
            <el-select v-model="form.groupid" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.whbz"
                :key="item.objId"
                :label="item.groupname"
                :value="item.objId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备名称:">
            <el-select v-model="form.deviceid" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.sbmc"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="float: right;margin-right: 0">
            <el-button size="small" class="onSearch" @click="onSearch">查询</el-button>
            <el-button size="small" class="onSearch" @click="reset" style="margin-right: 0">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content" ref='contentref'>
      <div class="respont-content">
        <el-form>
          <el-col>
            <el-form-item style="float: left;" v-if="ljyxpgButtomStatus">
              <el-button size="mini" class="onSearch" @click="AddFn">
                <i class="el-icon-plus">新增</i>
              </el-button>
              <el-button size="mini" class="onSearch" @click="EditFn" v-if="ljyxpgButtomStatus">
                <i class="el-icon-edit">编辑</i>
              </el-button>
              <el-button size="mini" type="danger" plain @click="DelAllFn" v-if="ljyxpgButtomStatus">
                <i class="el-icon-close">删除</i>
              </el-button>
              <el-button size="mini" class="onSearch" @click="upload">导出</el-button>
              <el-button size="mini" type="primary" @click="showMap" v-if="ljyxpgButtomStatus">GIS查看当日停电线路</el-button>
              <el-button size="mini" type="primary" @click="changeStatus" v-if="ljyxpgButtomStatus">终结工作任务</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          style="border: 1px solid #c7c7c7;width:100%"
          :cell-style="{borderColor: '#c7c7c7'}"
          :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}"
          border
          fit
          highlight-current-row
          @selection-change="CheckFun"
        >
          <el-table-column fixed type="selection" width="55" align="center"></el-table-column>
          <el-table-column fixed type="index" label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{(searchForm.pageNum - 1) * 10 + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="编制人" align="center" prop="compilingpersonnel"></el-table-column>
          <el-table-column
            label="检修线路"
            align="center"
            prop="xlmc"
            width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="电压等级" align="center" prop="dydj"></el-table-column>
          <el-table-column label="工作班组" align="center" prop="groupname" width="120"></el-table-column>
          <el-table-column label="设备类型" align="center" prop="devicetypename" width="200"></el-table-column>
          <!-- <el-table-column label="设备名称" align="center" prop="devicename" width="200"></el-table-column> -->
          <el-table-column label="工作内容" align="center" prop="jobcontent" width="120"></el-table-column>
          <el-table-column label="停电范围" align="center" prop="powercutscope"></el-table-column>
          <el-table-column label="是否停电" align="center" prop="ispowercut">
            <template slot-scope="scope">
              <div>{{scope.row.ispowercut == 1? '是' : '否'}}</div>
            </template>
          </el-table-column>
          <el-table-column label="工作开始时间" align="center" prop="planstarttime" width="160">
            <template slot-scope="scope">
              <div>{{scope.row.planstarttime | dateYMDHMSFormat}}</div>
            </template>
          </el-table-column>
          <el-table-column label="工作结束时间" align="center" prop="planendtime" width="160">
            <template slot-scope="scope">
              <div>{{scope.row.planendtime | dateYMDHMSFormat}}</div>
            </template>
          </el-table-column>
          <el-table-column label="计划停电开始时间" align="center" prop="powercutplanstrattime">
            <template slot-scope="scope">
              <div>{{scope.row.powercutplanstrattime}}</div>
            </template>
          </el-table-column>
          <el-table-column label="计划停电结束时间" align="center" prop="powercutplanendtime">
            <template slot-scope="scope">
              <div>{{scope.row.powercutplanendtime}}</div>
            </template>
          </el-table-column>
          <el-table-column label="是否带电作业" align="center" prop="ischarged">
            <template slot-scope="scope">
              <div>{{scope.row.ischarged == 1? '是' : '否'}}</div>
            </template>
          </el-table-column>
          <el-table-column label="是否委外" align="center" prop="isoutsourcing">
            <template slot-scope="scope">
              <div>{{scope.row.isoutsourcing == 1? '是' : '否'}}</div>
            </template>
          </el-table-column>
          <el-table-column label="计划新增调整原因" align="center" prop="planaddwhyname"></el-table-column>
          <el-table-column label="工作性质" align="center" prop="jobnaturename"></el-table-column>
          <el-table-column label="调度管辖" align="center" prop="schedulingjurisdictionname"></el-table-column>
          <el-table-column label="工作分类" align="center" prop="jobclassname"></el-table-column>
          <el-table-column label="状态" align="center" prop="taskstatus">
            <template slot-scope="scope">
              <div>{{scope.row.taskstatus == 1 ? '已执行' : '未执行'}}</div>
            </template>
          </el-table-column>
          <el-table-column label="是否有送电方案" align="center" prop="ispowerplan">
            <template slot-scope="scope">
              <div>{{scope.row.isoutsourcing == 1? '是' : '否'}}</div>
            </template>
          </el-table-column>
          <el-table-column label="工作类型" align="center" prop="jobtypename"></el-table-column>
          <el-table-column label="任务来源" align="center" prop="tasksourcename"></el-table-column>
          <el-table-column label="大修技改项目编号" align="center" prop="dxjgxmbh"></el-table-column>
          <el-table-column label="复役要求" align="center" prop="fyyq"></el-table-column>
          <el-table-column
            fixed="right"
            align="center"
            label="操作"
            class-name="small-padding fixed-width"
            width="400"
            v-if="ljyxpgButtomStatus"
          >
            <template slot-scope="scope">
              <div class>
                <el-button
                  class="onSearch"
                  size="mini"
                  @click="routerFun('reportbase',scope.row.objId,scope.row.xlid,scope.row.testreporttype)"
                >基本资料与信息查询</el-button>
                <el-button
                  class="onSearch"
                  size="mini"
                  @click="routerFun('reportplan',scope.row.objId,scope.row.xlid,scope.row.testreporttype)"
                >工作内容管理</el-button>
                <el-button
                  plain
                  size="mini"
                  class="onSearch"
                  v-if="scope.row.maintenanceacceptance == null || scope.row.maintenanceacceptance == 2"
                  @click="openjxbg(scope.row.objId,scope.row.xlmc,scope.row.xlid)"
                >检修报告</el-button>
                <el-button v-if="scope.row.testacceptance == null || scope.row.testacceptance == 2" class="onSearch" size="mini" type="primary" @click="opensybg(scope.row.objId,scope.row.testreporttype,scope.row.xlmc,scope.row.xlid)">试验报告</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="pageDetail.total>0"
          :total="pageDetail.total"
          :page.sync="searchForm.pageNum"
          :limit.sync="searchForm.pageSize"
          @pagination="getData"
        />
      </div>
    </div>

    <div v-if="isShowDialog">
      <Add
        :selection="selection"
        @childFn="parentFn"
        :isedit="isedit"
        :isadd="isadd"
        :openId="openId"
      />
    </div>
    <div v-if="jxbgDialog">
      <jxbg @childFn="parentFn" :jobtaskid="jobtaskid" :xlid="xlid" :xlmc="xlmc"/>
    </div>
    <div v-if="sybgDialog">
      <ssyb @childFn="parentFn" :jobtaskid="jobtaskid" :testreporttype="testreporttype" :xlid="xlid" :xlmc="xlmc"/>
    </div>
    <div v-if="statusDialog">
      <change @childFn="parentFn" :ids="form.ids"/>
    </div>
     <div class="mapBox" v-if="isShowMap" @childFn="parentFn">

       <maps></maps>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import Add from "./Add";
import maps from "./map";
import jxbg from "./Seeabout/jxbgDialog";
import ssyb from "./Seeabout/view"
import change from "./changeStatus"
import { Message } from "element-ui";
import {
  planList as list,
  planDel as delData,
  xw, // xb
  linesSelect, // xl下拉
  dlSelect, // dl下拉
  jcbzSelect // 检测班组
} from "@/api/liveDetectionManage";
import { getData, remove, exportJobtask } from "@/api/recondition/jobtask";
import {
  getSelectMultiple,
  getLineSelect,
  getLineGroup,
  getselectByLx,
} from "@/api/recondition/yearPlan";
export default {
  components: {
    Pagination,
    Add,
    maps,
    jxbg,
    ssyb,
    change
  },
  data() {
    return {
      ljyxpgButtomStatus:true,//老旧电缆规模老旧优化状态按钮隐藏false表示隐藏
      jxbgDialog: false,
      sybgDialog: false,
      isadd: false,
      isedit: false,
      isShowDialog: false, //查看弹框打开
      v1: "",
      jobtaskid: '',
      testreporttype: '', //试验报告类型
      statusDialog: false, // 修改状态弹窗
      openId: "",
      thisDetail: {},
      xlmc:'',
      xlid: '',
      form: {
        date: [],
        pageNum: 1,
        pageSize: 10
      },
      pageDetail: {
        total: 0
      },
      searchForm: {
        pageNum: 1,
        pageSize: 10
      },
      isShowMap:false,
      selection: {
        jhlyArr: [],
        jhzt: [
          { bzmc: "已执行", bzid: 1 },
          { bzmc: "未执行", bzid: 0 }
        ],
        dydj: [],
        xlmc: [],
        whbz: [],
        sbmc: [],
        sblx: []
      },
      //选中的数据
      CheckedSelection: [],
      tableData: []
    };
  },
  props: {
    ljyxpg: {
      type: Object,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function() {
        return {}
      }
    }
  },
  created() {
    //老旧电缆规模老旧优化状态表来源
    if(Object.keys(this.ljyxpg).length > 0){
       this.ljyxpgButtomStatus=false//如果被老旧电缆规模老旧优化状态表调用隐藏不需要的按钮
       this.form.xlid=this.ljyxpg.lineId
       this.$refs.contentref.style.borderColor = "white";//隐藏掉content的上边框线
    }
    this.getData();
    this.getselectionList();
  },

  methods: {
    // 选择设备类型查询设备名称下拉框
    getsbmc() {
      if (this.form.devicetypename && this.form.xlid) {
        getselectByLx({
          sblx: this.form.devicetypename,
          xlid: this.form.xlid
        }).then(res => {
          this.selection.sbmc = res.data.data;
        });
      }
    },
    // 更改状态
    changeStatus() {
      if (this.CheckedSelection.length == 0) {
        this.$message('请选择一条数据')
      } else {
        this.statusDialog = true
      }
    },
    getselectionList() {
      // 获取xl班组
      getLineGroup().then(res => {
        this.selection.whbz = res.data.rows;
      });
      // 获取线路名称下拉框
      getLineSelect(this.$qs.stringify({ lineNature: "主线" })).then(
        response => {
          if (response.status == 200) {
            this.selection.xlmc = response.data.rows;
          }
        }
      );
      // 获取任务来源 设备名称
      getSelectMultiple(
        this.$qs.stringify({
          fzids:
            "LINE_DEVICE_TYPE,JXSY_JOB_NATRUE,JXSY_JOB_CLASS,JXSY_JOB_TYPE,JXSY_DDGX,JXSY_PLAN_ADJUSTWHY,CABLE_VOLTAGE_RANK"
        })
      ).then(res => {
        this.selection.sblx = res.data.data.LINE_DEVICE_TYPE;
        this.selection.gzxz = res.data.data.JXSY_JOB_NATRUE;
        this.selection.gzfl = res.data.data.JXSY_JOB_CLASS;
        this.selection.jhtzyy = res.data.data.JXSY_PLAN_ADJUSTWHY;
        this.selection.gzlx = res.data.data.JXSY_JOB_TYPE;
        this.selection.tdgx = res.data.data.JXSY_DDGX;
        this.selection.dydj = res.data.data.CABLE_VOLTAGE_RANK;
      });
    },
    getData() {
      console.log(111);
      // 获取列表数据
      getData(this.$qs.stringify(this.form)).then(res => {
        console.log(res);
        this.tableData = res.data.rows;
        this.tableData.forEach(item => {
          if (item.powercutplanstrattime !== null) {
            item.powercutplanstrattime = item.powercutplanstrattime.substring(
              0,
              16
            );
          }
          if (item.powercutplanendtime !== null) {
            item.powercutplanendtime = item.powercutplanendtime.substring(
              0,
              16
            );
          }
        });
        this.pageDetail.total = res.data.total;
      });
    },
    routerFun(roterPath, e,xlid,type) {
      this.$router.push({ path: `report/${roterPath}`, query: { aa: e ,bb:xlid,cc: type} });
    },
    // 打开检修线路弹窗
    openjxbg(val,value1,value2) {
      this.jxbgDialog = true;
      this.jobtaskid = val
      this.xlmc = value1
      this.xlid = value2
    },
    // 打开试验报告弹窗
    opensybg(val,value,value1,value2) {
      this.sybgDialog = true;
      this.jobtaskid = val
      this.testreporttype = value
      this.xlmc = value1
      this.xlid = value2
      console.log(this.testreporttype)
    },
    /**删除所有 */
    DelAllFn() {
      if (this.CheckedSelection.length <= 0) {
        this.$message("请选择要删除的数据");
        return false;
      } else {
        remove(this.$qs.stringify({ ids: this.form.ids })).then(res => {
          if (res.data.code == 0) {
            this.$message({ message: "删除成功", type: "success" });
            this.getData();
          }
        });
      }
    },

    del(ids) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delData({ ids }).then(val => {
            val = val.data;
            let type = val.code == 0 ? "success" : "error";
            this.$message({ type, message: val.msg });
            if (val.code == 0) this.getData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    /** 导出 */
    upload() {
      exportJobtask(this.$qs.stringify(this.form))
        .then(result => {
          window.location.href =
            process.env.VUE_APP_BASE_API +
            "/common/download?fileName=" +
            result.data.msg;
        })
        .catch(err => {});
    },
    reset() {
      this.form = { brand_right: 0 };
      this.form.pageNum = 1;
      this.form.pageSize = 10;
      this.selection.sbmc = [];
      this.getData();
    },
    onSearch() {
      this.getData();
    },

    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val;
      let ids = [];
      this.CheckedSelection.map(item => {
        ids.push(item.objId);
      });
      var chosenId = ids.join(); // 数组转字符串
      this.form.ids = chosenId; //选中数据中的所有id
    },
    // 新增按钮
    AddFn() {
      this.isShowDialog = true;
      this.isadd = true;
    },
    // 编辑按钮
    EditFn() {
      if (
        this.CheckedSelection.length > 1 ||
        this.CheckedSelection.length <= 0
      ) {
        this.$message("请选择一条要编辑的数据");
        return false;
      }
      this.isShowDialog = true;
      this.openId = this.CheckedSelection[0].objId;
      console.log(this.openId);
      this.isadd = false;
      this.isedit = true;
    },
    showMap(){
          if (
        this.CheckedSelection.length > 1 ||
        this.CheckedSelection.length <= 0
      ) {
        this.$message("请选择一条要编辑的数据");
        return false;
      }
      this.isShowMap = true;
      this.isadd = false;
      this.isedit = false;

    },

    /**
     * 接收查看/编辑子组件的数据
     */
    parentFn(val) {
      this.isShowDialog = false;
      this.openId = "";
      this.isShowMap=false;
      this.isadd = false;
      this.isedit = false;
      this.jxbgDialog = false
      this.sybgDialog = false
      this.statusDialog = false
    }
  }
};
</script>

<style lang="scss" scope>
// .el-select {
//   width: 100%;
// }
// .el-date-editor.el-input {
//   width: 100%;
// }
// .el-dialog--center .el-dialog__body {
//   z-index: 10000;
// }
// .el-dialog__wrapper {
//   z-index: 3000;
// }
// .addmsg {
//   text-align: center;
//   width: 100%;
// }
// .el-icon-circle-plus,
// .el-icon-circle-close {
//   font-size: 32px;
//   cursor: pointer;
// }
// .el-icon-circle-close {
//   color: #f99;
// }
// .el-icon-circle-close:hover {
//   color: #f55;
// }
// .el-table td div {

//     text-align: left;
// }
.mapBox{position: absolute;
left: 50%;
top: 40%;
width: 70%;
height: 60%;
transform: translate(-50%,-50%);
z-index: 33;
background: #fff;
}
</style>
