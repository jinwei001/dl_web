<template>
  <div>
    <div class="main-body">
      <div class="main-userSelect">
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <el-form-item label="计划时间：">
                <el-date-picker
                v-model="form.endTime"
                type="date"               
                value-format="yyyy-MM-dd"
                placeholder="选择时间"
              ></el-date-picker>
              
            </el-form-item>
            <el-form-item label="计划状态：">
              <el-select v-model="form.taskstatus" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.jhzt"
                  :key="item.objId"
                  :label="item.bzmc"
                  :value="item.bzmc"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="`${$dydj}：`">
              <el-select v-model="form.jhnf" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.dydj"
                  :key="item.objId"
                  :label="item.bzmc"
                  :value="item.bzmc"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="`${$xl}名称：`">
              <el-select v-model="form.xlid" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.xlmc"
                  :key="item.id"
                  :label="item.lineName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作班组：">
              <el-select v-model="form.groupid" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.whbz"
                  :key="item.objId"
                  :label="item.groupname"
                  :value="item.objId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="float: right">
              <el-button class="onSearch" @click="onSearch">查询</el-button>
              <el-button class="onSearch" @click="onReset">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="content">
        <div class="respont-content">
          <div class="table">
            <el-table
              :data="tableData"
              style="border: 1px solid #c4c8cf"
              :cell-style="{borderColor: '#c4c8cf'}"
              :header-cell-style="{'background':'#cddce6',borderColor: '#c4c8cf'}"
              border
              fit
              highlight-current-row
            >
              <el-table-column fixed type="index" label="序号" width="60" align="center">
                <template slot-scope="scope">
                  <span>{{(form.pageNum - 1) * 10 + scope.$index + 1}}</span>
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
              <el-table-column label="设备类型" align="center" prop="devicetypename"></el-table-column>
              <el-table-column label="设备名称" align="center" prop="devicename" width="200"></el-table-column>
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
              <el-table-column
                label="计划停电开始时间"
                align="center"
                width="200px"
                prop="powercutplanstrattime"
              >
                <template slot-scope="scope">
                  <div>{{scope.row.powercutplanstrattime}}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="计划停电结束时间"
                align="center"
                width="200px"
                prop="powercutplanendtime"
              >
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
              <el-table-column align="center" label="操作" fixed="right">
                <template slot-scope="scope">
                  <el-button
                    class="onSearch"
                    size="small"
                    @click="check(scope.row.objId,scope.row.sfsyys,scope.row.testacceptance,scope.row.testreporttype)"
                  >{{(scope.row.sfsyys == 1 || scope.row.sfsyys == '')? '验收' : '查看'}}</el-button>
                </template>
              </el-table-column>
            </el-table>
            <pagination
              v-show="form.total>0"
              :total="form.total"
              :page.sync="form.pageNum"
              :limit.sync="form.pageSize"
              @pagination="getData"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="showDialog">
      <Dialog @childFn="parentFn" :jobtaskid1="jobtaskid1" :sfsyys1="sfsyys1"></Dialog>
    </div>
    <div v-if="showDialog1">
      <dlxlzldzdrsybg @childFn="parentFn" :jobtaskid1="jobtaskid1" :sfsyys1="sfsyys1" />
    </div>
    <div v-if="gydyshow">
      <gydyshow @childFn="parentFn" :jobtaskid1="jobtaskid1" :sfsyys1="sfsyys1" />
    </div>
    <div v-if="showDialog2">
      <dlxlzlnysybg @childFn="parentFn" :jobtaskid1="jobtaskid1" :sfsyys1="sfsyys1" />
    </div>
    <div v-if="showDialog3">
      <dljbfdzdbcssybg @childFn="parentFn" :jobtaskid1="jobtaskid1" :sfsyys1="sfsyys1"/>
    </div>
    <!-- <div v-if="showDialog4">
      <dlwhtjnccsybg @childFn="parentFn" />
    </div>
    <div v-if="showDialog5">
      <dlxljdxtsybg @childFn="parentFn" />
    </div> -->
    <div v-if="showDialog6">
      <jsyhwblqsybg @childFn="parentFn" :jobtaskid1="jobtaskid1" :sfsyys1="sfsyys1" />
    </div>
    <div v-if="showDialog7">
      <dlyhxfxdqsybg @childFn="parentFn" :jobtaskid1="jobtaskid1" :sfsyys1="sfsyys1" />
    </div>
    <div v-if="showDialog8">
      <whtjnc @childFn="parentFn" :jobtaskid1="jobtaskid1" :sfsyys1="sfsyys1" />
    </div>
    <div v-if="showDialog9">
      <jdxt @childFn="parentFn" :jobtaskid1="jobtaskid1" :sfsyys1="sfsyys1" />
    </div>
  </div>
</template>

<script>
import {
  getLineSelect,
  getLineGroup,
  getSelectMultiple,
  getselectByLx
} from "@/api/recondition/yearPlan";
import Pagination from "@/components/Pagination";
import Dialog from "./testReportDialog";
import dlxlzldzdrsybg from "./dlxlzldzdrsybg";
import dlxlzlnysybg from "./dlxlzlnysybg";
import dljbfdzdbcssybg from "./dljbfdzdbcssybg";
import gydyshow from "./gydyshow";
import dlwhtjnccsybg from "./dlwhtjnccsybg";
import dlxljdxtsybg from "./dlxljdxtsybg";
import jsyhwblqsybg from "./jsyhwblqsybg";
import dlyhxfxdqsybg from "./dlyhxfxdqsybg";
import whtjnc from "./whtjnc";
import jdxt from "./jdxt";
import { getData, remove, exportJobtask } from "@/api/recondition/jobtask";
export default {
  components: {
    Pagination,
    Dialog,
    dlxlzldzdrsybg,
    dlxlzlnysybg,
    gydyshow,
    dljbfdzdbcssybg,
    dlwhtjnccsybg,
    dlxljdxtsybg,
    jsyhwblqsybg,
    dlyhxfxdqsybg,
    jdxt,
    whtjnc
  },
  data() {
    return {
      sfsyys1: "", // 传给子组件的是否验收
      jobtaskid1: "", // 传给子组件的工作任务id
      showDialog: false,
      showDialog1: false,
      gydyshow: false,
      showDialog2: false,
      showDialog3: false,
      showDialog4: false,
      showDialog5: false,
      showDialog6: false,
      showDialog7: false,
      showDialog8: false,
      showDialog9: false,

      tableData: [{}],
      form: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      selection: {
        jhzt: [{bzmc: '已执行', bzid: 1},{bzmc: '未执行',bzid: 2}],
        dydj: [],
        xlmc: [],
        whbz: []
      },
      //传输给子页面的数据
      openobj: {}
    };
  },
  created() {
    this.getselectionList()
    this.getData();
  },
  methods: {
    getselectionList() {
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
      // 获取xl班组
      getLineGroup().then(res => {
        this.selection.whbz = res.data.rows;
      });
    },
    getData() {
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
        this.form.total = res.data.total;
        console.log(res.data)
      });
    },
    CheckFun(val) {},
    getList() {},
    onSearch() {
      this.getData()
    },
    onReset() {
    this. form= {
        total: 0,
        pageNum: 1,
        pageSize: 10
      }
      // this.form.pageNum = 1;
      // this.form.pageSize = 10;
      this.getData();
    },
    check(val, value, type, testType) {
      console.log(testType, 111111111111);
      if (value == ""||value == null) {
        this.$message("暂无可验收的报告");
      } else {
        this.jobtaskid1 = val;
        this.sfsyys1 = value;
        console.log(this.sfsyys1);
        if (testType == 1) {
          this.showDialog = true; //dlxl交流耐压试验报告
        } else if (testType == 3) {
          this.showDialog1 = true; //dlxl直流电阻、电容试验报告
        } else if (testType == 2) {
          this.gydyshow = true; //dl护层电流、感应电压检测试验报告
        } else if (testType == 4) {
          this.showDialog2 = true; //dlxl直流耐压试验报告
        } else if (testType == 5) {
          this.showDialog7 = true; // dl油化学分析、电气试验试验报告
        } else if (testType == 7) {
          this.showDialog8 = true; // 电缆外护套及内衬层试验报告
        } else if (testType == 6) {
          this.showDialog3 = true; // dl局部放电震荡波检测试验报告
        } else if (testType == 8) {
          this.showDialog6 = true // 金属氧化物避雷器实验报告
        }
         else if (testType == 9) {
          this.showDialog9 = true // 金属氧化物避雷器实验报告
        }
      }
      // this.gydyshow = true; //dl护层电流、感应电压检测试验报告
      //
      // this.showDialog4 = true //dl外护套及内衬层试验报告
      // this.showDialog5 = true // dlxl接地系统试验报告
      // 
      //
    },
    parentFn(val) {
      this.showDialog = val.showDialog;
      this.showDialog1 = val.showDialog;
      this.gydyshow = val.showDialog;
      this.showDialog2 = val.showDialog;
      this.showDialog3 = val.showDialog;
      this.showDialog4 = val.showDialog;
      this.showDialog5 = val.showDialog;
      this.showDialog6 = val.showDialog;
      this.showDialog7 = val.showDialog;
      this.showDialog8 = val.showDialog;
      this.showDialog9 = val.showDialog;
    }
  }
};
</script>

<style>
</style>