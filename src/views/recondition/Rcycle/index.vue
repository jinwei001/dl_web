<template>
  <!-- <h2>
    检修试验周期
  </h2>-->
  <div>
    <div class="main-body">
      <div class="main-userSelect">
        <div class="searchForm_glf">
          <el-form ref="form" inline>
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
              <el-select v-model="form.xlid" filterable clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.xlmc"
                  :key="item.id"
                  :label="item.lineName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="检修分类:">
              <el-select v-model="form.jxfl" clearable placeholder="请选择" @change="getselectionjxxm">
                <el-option
                  v-for="item in selection.jxfl"
                  :key="item.objId"
                  :label="item.bzmc"
                  :value="item.bzid"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="检修项目:">
              <el-select v-model="form.jxxm" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.jxxm"
                  :key="item.objId"
                  :label="item.bzmc"
                  :value="item.bzid"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态评价结果:">
              <el-select v-model="form.ztpj" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.ztpj"
                  :key="item.objId"
                  :label="item.bzmc"
                  :value="item.bzid"
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
          <el-form>
            <el-col>
              <el-form-item style="float: left;">
                <el-button class="onSearch" @click="AddFn">
                  <i class="el-icon-plus">新增</i>
                </el-button>
                <el-button type="danger" plain @click="DelFn">
                  <i class="el-icon-close"></i> 删除
                </el-button>
                <el-button type="primary" @click="creatPatrolCycle">生成下次检修任务</el-button>
              </el-form-item>
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
            <el-table-column prop="dydj" :label="`${$dydj}`" width="120" align="center"></el-table-column>
            <el-table-column prop="xlmc" :label="`${$xl}名称`" align="center"></el-table-column>
            <el-table-column prop="jxfl" label="检修分类" align="center"></el-table-column>
            <el-table-column prop="jxxm" label="检修项目" width="260" align="center"></el-table-column>
            <el-table-column prop="scjxrq" label="上次检修日期" align="center"></el-table-column>
            <el-table-column prop="jxzq" label="检修周期（年）" align="center"></el-table-column>
            <el-table-column prop="tqbjts" label="提前报警天数" align="center"></el-table-column>
            <el-table-column prop="cableLineLength" label="状态评价日期" align="center"></el-table-column>
            <el-table-column prop="assetUnit" label="状态评价结果" align="center"></el-table-column>
            <el-table-column prop="xcjxrq" label="下次检修日期" align="center"></el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button class="onSearch" size="small" @click="edit(scope.row.id)">编辑</el-button>
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

    <div v-if="isAddDialog">
      <addRcycle @childFn="parentFn" :openId="openId"></addRcycle>
    </div>
    <div v-if="isEditDialog">
      <editDialog @childFn="parentFn" :openId="openId"></editDialog>
    </div>
  </div>
</template>

<script>
import editDialog from "./RcycleDialog/editDialog";
import addRcycle from "./RcycleDialog/addRcycle";
import Pagination from "@/components/Pagination";
import {
  getLineGroup,
  getSelectMultiple,
  getList,
  deleteOverHaulCycle,
  generateOverhaulTask,
  getLine
} from "@/api/recondition/Rcycle";
export default {
  name: "Rcycle",
  components: { Pagination, addRcycle, editDialog },
  data() {
    return {
      openId: "", // 传给子页面的id
      isAddDialog: false, // 新增弹窗
      isEditDialog: false, // 编辑弹窗
      search: {
        dydjmc: "",
        xlbz: "",
        jxfl: "",
        jxxm: "",
        ztpjjg: ""
      },
      form: {
        groupId: "",
        dydjmc: "",
        xlbz: "",
        jxxm: "",
        jxflmc: "",
        ztpj: "",
        jxxmmc: "",
        dydj: "",
        ids: "",
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      tableData: [{ voltageRank: "1" }],
      selection: {
        dydj: [],
        xlbz: [],
        jxfl: [],
        ztpj: [],
        jxxm: [],
        dydj: [],
        xlmc: []
      }
    };
  },
  mounted() {
    this.getSelectionList();
    this.getList();
  },
  methods: {
    // 获取下拉框数据
    getSelectionList() {
      // 获取线路名称下拉框
      getLine(this.$qs.stringify({ lineNature: "主线" })).then(
        response => {
          if (response.status == 200) {
            this.selection.xlmc = response.data.rows;
          }
        }
      );
      // 获取xl班组
      getLineGroup().then(res => {
        this.selection.xlbz = res.data.rows;
      });
      // 获取检修分类  状态评价  电压等级
      getSelectMultiple(
        this.$qs.stringify({
          fzids: "CABLE_ER_TYPE,ZTPJ_PJJG,CABLE_VOLTAGE_RANK"
        })
      ).then(res => {
        this.selection.jxfl = res.data.data.CABLE_ER_TYPE;
        this.selection.ztpj = res.data.data.ZTPJ_PJJG;
        this.selection.dydj = res.data.data.CABLE_VOLTAGE_RANK;
      });
    },
    // 获取表单数据
    getList() {
      getList(this.$qs.stringify(this.form)).then(res => {
        this.tableData = res.data.rows;
        this.tableData.forEach(item => {
          item.scjxrq = item.scjxrq.substring(0, 10)
          item.xcjxrq = item.xcjxrq.substring(0, 10)
        })
        this.form.total = res.data.total;
      });
    },
    // 点击获取检修项目下拉框
    getselectionjxxm() {
      this.form.jxxm = "";
      this.selection.jxxm = [];
      getSelectMultiple(
        this.$qs.stringify({
          fzids: "CABLE_ER_TYPE_" + this.form.jxfl
        })
      ).then(res => {
        console.log(res);
        this.selection.jxxm = res.data.data["CABLE_ER_TYPE_" + this.form.jxfl];
      });
    },
    // 查询
    onSearch() {
      this.getList();
    },
    // 重置
    onReset() {
      this.form = { brand_right: 0 };
      this.form.pageNum = 1;
      this.form.pageSize = 10;
      this.getList();
    },
    // 新增
    AddFn() {
      this.isAddDialog = true;
    },
    // 删除
    DelFn() {
      deleteOverHaulCycle(this.$qs.stringify(this.form)).then(res => {
        if (res.data.code == 0) {
          this.getList();
        }
      });
    },
    // 生成下次检修任务
    creatPatrolCycle() {
      generateOverhaulTask(this.$qs.stringify({ids: this.form.ids})).then(res => {
        if (res.data.code == 0) {
          this.$message({message: '生成下次检修任务成功', type: 'success'})
        }
      })
    },
    // 编辑
    edit(val) {
      this.openId = val;
      this.isEditDialog = true;
    },
    // 选中数据
    CheckFun(val) {
      this.CheckedSelection = val;
      let ids = [];
      this.CheckedSelection.map(item => {
        ids.push(item.id);
      });
      var chosenId = ids.join(); // 数组转字符串
      this.form.ids = chosenId; //选中数据中的所有id
    },
    parentFn(val) {
      this.isAddDialog = val.isshow;
      this.isEditDialog = val.showDialog;
    }
  }
};
</script>

<style scoped>
</style>
