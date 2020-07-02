<template>
  <div>
    <div class="main-body">
      <div class="main-userSelect">
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <el-form-item :label="`${$xl}名称:`">
              <el-select v-model="form.lineId" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.xlmc"
                  :key="item.id"
                  :label="item.lineName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="变更时间:">
              <el-date-picker
                v-model="time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="运维班组:">
              <el-select v-model="form.groupId" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.whbz"
                  :key="item.objId"
                  :label="item.groupname"
                  :value="item.objId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button class="onSearch" @click="onSearch">查询</el-button>
              <el-button class="onSearch" @click="onReset">重置</el-button>
            </el-form-item>
          </el-form>
          <el-form inline></el-form>
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
              <el-table-column prop="lineName" :label="`${$xl}名称`" width="120" align="center"></el-table-column>
              <el-table-column prop="changeTime" label="变更时间" width="100" align="center"></el-table-column>
              <el-table-column prop="changeFacility" label="变更设备" width="100" align="center"></el-table-column>
              <el-table-column prop="changeContent" label="变更内容" width="100" align="center"></el-table-column>
              <el-table-column prop="changeReason" label="变更原因" width="200" align="center"></el-table-column>
              <el-table-column prop="groupName" label="运维班组" align="center"></el-table-column>
              <el-table-column prop="projectName" label="相关工程名称" width="150" align="center"></el-table-column>
              <el-table-column prop="constructOrganization" label="施工单位" width="150" align="center"></el-table-column>
              <el-table-column prop="ischarged" label="附件" align="center">
                <template slot-scope="scope">
                  <div>
                    <el-button class="onSearch">
                      <a :href="`${urlbase}${scope.row.filePath}`">下载</a>
                    </el-button>
                  </div>
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
    <div v-if="addDialog">
      <addDialog
        ref="addView"
        @childFn="parentFn"
        :isadd="isadd"
        :openId="openId"
        :isedit="isedit"
        :parentVal="parentVal"
      />
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import addDialog from "./addDialog";
import { getLineSelect, getLineGroup } from "@/api/recondition/yearPlan";
import {
  getData,
  remove
} from "@/api/cableandchannel/cable-equipment-ledger/equipmentChange";
export default {
  components: {
    Pagination,
    addDialog
  },
  data() {
    return {
      urlbase: process.env.VUE_APP_BASE_API,
      openId: "",
      isedit: false,
      addDialog: false, //弹窗
      isadd: false, // 是否为新增弹窗
      form: {
        ids: "",
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      startTime: "",
      endTime: "",
      parentVal: "",
      selection: {
        whbz: [],
        xlmc: []
      },
      time: [],
      CheckedSelection: [],
      tableData: []
    };
  },
  mounted() {
    this.getselectionList();
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
      // 获取xl班组
      getLineGroup().then(res => {
        this.selection.whbz = res.data.rows;
      });
    },
    //  获取列表数据
    getData() {
      console.log("this.time :>> ", this.time);
      if (this.time.length !== 0) {
        this.form.startTime = this.time[0];
        this.form.endTime = this.time[1];
      }

      getData(this.$qs.stringify(this.form)).then(res => {
        this.tableData = res.data.rows;
        this.form.total = res.data.total;
      });
    },
    // 下载附件
    download(url) {},
    onSearch() {
      this.getData();
    },
    onReset() {
      this.time = [];
      this.form = {
        pageNum: 1,
        pageSize: 10,
        total: 0
      };
      this.getData();
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
      this.parentVal = this.CheckedSelection[0];
      this.isadd = false;
      this.isedit = true;
    },
    deleteFun() {
      remove(this.$qs.stringify({ ids: this.form.ids })).then(res => {
        if (res.data.code == 0) {
          this.$message({ message: "删除成功", type: "success" });
          this.time = [];
          this.form = {
            pageNum: 1,
            pageSize: 10,
            total: 0
          };
          this.getData();
        }
      });
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
      this.addDialog = val.showDialog;
      this.openId = "";
      this.isadd = false;
      this.isedit = false;
      this.time = [];
      this.form = {
        pageNum: 1,
        pageSize: 10,
        total: 0
      };
      this.getData();
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