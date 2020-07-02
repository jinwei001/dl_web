<template>
  <div>
    <div class="main-body">
      <div class="main-userSelect">
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <el-form-item label="计划年份:">
              <el-date-picker
                v-model="form.startTime"
                type="year"
                :picker-options="startDatePicker"
                value-format="yyyy"
                placeholder="选择开始年份"
              ></el-date-picker>
            </el-form-item>
            <span style="line-height: 45px;margin-right: 1rem;margin-left: -1.5em;">至</span>
            <el-form-item>
              <el-date-picker
                v-model="form.endTime"
                type="year"
                :picker-options="endDatePicker"
                value-format="yyyy"
                placeholder="选择结束年份"
              ></el-date-picker>
            </el-form-item>
            <el-form-item :label="`${$dydj}:`">
              <el-select v-model="form.dydj" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.dydj"
                  :key="item.objId"
                  :label="item.bzmc"
                  :value="item.bzmc"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="`${$xl}名称:`">
              <el-select v-model="form.xlid" clearable placeholder="请选择" @change="getsbmc">
                <el-option
                  v-for="item in selection.xlmc"
                  :key="item.id"
                  :label="item.lineName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备类型：">
              <el-select
                v-model="form.devicetypename"
                clearable
                placeholder="请选择"
                @change="getsbmc"
              >
                <el-option
                  v-for="item in selection.sblx"
                  :key="item.objId"
                  :label="item.bzmc"
                  :value="item.bzmc"
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
            <el-form-item label="是否停电:">
              <el-select v-model="form.ispowercut" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.sftd"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="计划状态:">
              <el-select v-model="form.planstatus" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.jhzt"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button class="onSearch" @click="onSearch">查询</el-button>
              <el-button class="onSearch" @click="onReset">重置</el-button>
            </el-form-item>
          </el-form>
          <el-form  inline>
            
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
                <el-button class="onSearch" @click="EditFn">
                  <i class="el-icon-edit-outline">编辑</i>
                </el-button>
                <el-button type="danger" plain @click="deleteFun">删除</el-button>
                <el-button type="primary" @click="returnPool">回池</el-button>
                <!-- <el-button type="primary" @click="back">导入</el-button> -->
                <el-button type="primary" @click="exportPlan">导出</el-button>
                <el-button type="primary" @click="generateNextPlan">生成月检修计划</el-button>
              </el-form-item>
            </el-col>
          </el-form>
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
              <el-table-column prop="compilingpersonnel" label="编制人" width="120" align="center"></el-table-column>
              <el-table-column prop="dydj" :label="`${$dydj}`" width="100" align="center"></el-table-column>
              <el-table-column prop="xlmc" :label="`检修${$xl}`" width="100" align="center"></el-table-column>
              <el-table-column prop="groupname" label="工作班组" width="100" align="center"></el-table-column>
              <el-table-column prop="devicetypename" label="设备类型" width="200" align="center"></el-table-column>
              <!-- <el-table-column prop="devicename" label="设备名称" width="200" align="center"></el-table-column> -->
              <el-table-column prop="ispowercut" label="是否停电" align="center"></el-table-column>
              <el-table-column prop="planstarttime" label="计划开始时间" width="150" align="center"></el-table-column>
              <el-table-column prop="planendtime" label="计划结束时间" width="150" align="center"></el-table-column>
              <el-table-column prop="ischarged" label="是否带电作业" align="center"></el-table-column>
              
              <el-table-column prop="taskstatus" label="状态" align="center"></el-table-column>
              
              <el-table-column prop="jobcontent" label="工作内容" align="center"></el-table-column>
              <el-table-column prop="powercutscope" label="停电范围" align="center"></el-table-column>
              
              <el-table-column prop="planstatus"  label="计划状态" align="center"></el-table-column>
              <el-table-column prop="spyj" label="审批意见" align="center"></el-table-column>
              <el-table-column prop="jobnaturename" label="工作性质" align="center"></el-table-column>
              <el-table-column prop="jobtypename" label="工作类型" align="center"></el-table-column>
              <el-table-column prop="dxjgxmbh" label="大修技改项目编号" align="center"></el-table-column>
              <el-table-column prop="fyyq" label="复役要求" align="center"></el-table-column>
              <el-table-column width="150" align="center" fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button class="onSearch" size="small" @click="view(scope.row.objId)">查看</el-button>
                  <el-button
                    class="onSearch"
                    v-if="(scope.row.planstatus == null || scope.row.planstatus == '退回') && scope.row.sfdqclr == '1'"
                    size="small"
                    @click="approval(scope.row)"
                  >提交审批</el-button>
                  <el-button
                    class="onSearch"
                    v-if="scope.row.planstatus == '提交' && scope.row.sfdqclr == '1'"
                    size="small"
                    @click="approval(scope.row)"
                  >审批</el-button>
                </template>
              </el-table-column>
            </el-table>
            <pagination
              v-show="form.total>0"
              :total="form.total"
              :page.sync="form.pageNum"
              :limit.sync="form.pageSize"
              @pagination="getList"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="addDialog">
      <addView
        ref="addView"
        @childFn="parentFn"
        :isadd="isadd"
        :openId="openId"
        :isedit="isedit"
        :isview="isview"
      />
    </div>
    <div v-if="approvalDialog">
      <approvalView ref="approvalView" @childFn="parentFn" :openId="openId" :status="status" />
    </div>
    <div v-if="poolDialog">
      <poolView ref="poolView" @childFn="parentFn" :id="form.ids" />
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import addView from "./add";
import approvalView from "./approval";
import poolView from "./returnPool";
import {
  getData,
  generateNextPlan,
  deleteData,
  getLineSelect,
  getLineGroup,
  getSelectMultiple,
  getselectByLx,
  exportPlan
} from "@/api/recondition/yearPlan";
export default {
  components: {
    Pagination,
    addView,
    approvalView,
    poolView
  },
  data() {
    return {
      openId: "",
      isedit: false,
      isview: false,
      poolDialog: false, // 回池弹窗
      approvalDialog: false, // 审批弹窗
      startDatePicker: this.beginDate(), // 时间选择器
      endDatePicker: this.processDate(),
      addDialog: false, //弹窗
      isadd: false, // 是否为新增弹窗
      status: "",
      form: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        jxxm: "",
        ids: "",
        ztpj: "",
        jxfl: "",
        xlmc: "",
        start: "",
        end: ""
      },
      selection: {
        jxxm: [],
        sbmc:[],
        ztpj: [],
        jxfl: [],
        xlmc: [],
        sftd: [
          { name: "是", value: 1 },
          { name: "否", value: 2 }
        ],
        jhzt: [
          { name: "提交", value: 1 },
          { name: "退回", value: 2 },
          { name: "通过", value: 3 }
        ]
      },
      CheckedSelection: [],
      tableData: []
    };
  },
  mounted() {
    this.getselectionList();
    this.getList();
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
          console.log(this.selection.sbmc,11111111111)
        });
      }
    },
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
    // 获取年计划数据列表
    getList() {
      getData(this.$qs.stringify(this.form)).then(res => {
        console.log(res.data.rows);
        this.tableData = res.data.rows;
        this.form.total = res.data.total;
        // this.form.pageNum = 1;
        this.tableData.forEach(item => {
          if (item.ischarged == 1) {
            item.ischarged = "是";
          } else {
            item.ischarged = "否";
          }
          if (item.ispowercut == 1) {
            item.ispowercut = "是";
          } else {
            item.ispowercut = "否";
          }
          item.planstarttime = item.planstarttime.substring(0, 16);
          item.planendtime = item.planendtime.substring(0, 16);
          if (item.taskstatus == 1) {
            item.taskstatus = "已执行";
          } else {
            item.taskstatus = "未执行";
          }
          if(item.planstatus == 1) {
            item.planstatus = "提交"
          } else if(item.planstatus == 2) {
            item.planstatus = "退回"
          } else if (item.planstatus == 3) {
            item.planstatus = "通过"
          }
        });
      });
    },
    // 时间选择器
    beginDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.form.end) {
            // 如果结束时间不为空，则小于结束时间
            return new Date(self.form.end).getTime() < time.getTime();
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      };
    },
    processDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.form.start) {
            // 如果开始时间不为空，则结束时间大于开始时间
            return new Date(self.form.start).getTime() > time.getTime();
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      };
    },
    exportPlan() {
      exportPlan(this.$qs.stringify(this.form))
        .then(result => {
          console.log(result);
          window.location.href =
            process.env.VUE_APP_BASE_API +
            "/common/download?fileName=" +
            result.data.msg;
        })
        .catch(err => {});
    },
    onSearch() {
      this.getList();
    },
    onReset() {
      this.form = { brand_right: 0 };
      this.form.pageNum = 1;
      this.form.pageSize = 10;
      this.selection.sbmc = [];
      this.getList();
    },
    // 新增按钮
    AddFn() {
      this.addDialog = true;
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
      this.addDialog = true;
      this.openId = this.CheckedSelection[0].objId;
      console.log(this.openId);
      this.isadd = false;
      this.isedit = true;
    },
    // 回池
    returnPool() {
      if (this.CheckedSelection.length <= 0) {
        this.$message("请选择一条要编辑的数据");
        return false;
      }
      this.poolDialog = true;
    },
    deleteFun() {
      deleteData(this.$qs.stringify({ ids: this.form.ids })).then(res => {
        if (res.data.code == 0) {
          this.$message({ message: "删除成功", type: "success" });
          this.getList();
        }
      });
    },
    back() {},
    // 选中数据
    CheckFun(val) {
      this.CheckedSelection = val;
      let ids = [];
      this.CheckedSelection.map(item => {
        ids.push(item.objId);
      });
      var chosenId = ids.join(); // 数组转字符串
      this.form.ids = chosenId; //选中数据中的所有id
    },
    // 生成检修计划
    generateNextPlan() {
      if (this.CheckedSelection.length > 0) {
        console.log(this.CheckedSelection);
        let ids = [];
        this.CheckedSelection.forEach((item, index) => {
          console.log(item);
          open = open + 1;
          if (item.planstatus == "通过") {
            if (item.taskstatus == "已执行") {
              this.$message({
                message: "选中的第" + (index + 1) + "条数据已执行"
              });
            } else {
              ids.push(item.objId);
            }
          } else {
            this.$message({
              message: "选中的第" + (index + 1) + "条数据没有完成审批"
            });
          }
        });
        if (ids.length == this.CheckedSelection.length) {
          this.form.ids = "";
          var chosenId = ids.join(); // 数组转字符串
          this.form.ids = chosenId;
          generateNextPlan(this.$qs.stringify({ ids: this.form.ids })).then(
            res => {
              console.log(res, 11111111)
              if ((res.data.code == 0)) {
                this.$message({
                  message: "生成下次检修计划成功",
                  type: "success"
                });
              } else {
                this.$message({ message: res.data.msg, type: "error" });
              }
            }
          );
        }
      } else {
        this.$message("请选择一条年度检修计划");
      }
    },
    // 查看数据
    view(val) {
      this.openId = val;
      this.addDialog = true;
      this.isadd = false;
      this.isview = true;
    },
    approval(val) {
      this.openId = val.objId;
      this.status = val.planstatus;
      console.log(val.planstatus)
      this.approvalDialog = true;
    },
    parentFn(val) {
      this.addDialog = val.showDialog;
      this.approvalDialog = val.showDialog;
      this.poolDialog = val.showDialog;
      this.openId = "";
      this.isadd = false;
      this.isview = false;
      this.isedit = false;
    }
  }
};
</script>

<style lang="scss">
/*输入框样式*/
.el-form--label-left .el-form-item__label {
  text-align: right;
}
</style>