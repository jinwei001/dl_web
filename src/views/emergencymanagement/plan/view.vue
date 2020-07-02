<template>
<!-- <h2>
      应急预案管理
  </h2>-->
  <div class="xs-hastitle">
    <el-dialog
      v-dialogDrag
      :visible.sync="showDialog"
      title="流程"
      :center="true"
      :before-close="handleClose"
    >
      <!-- {{openobj}} -->
      <el-form ref="form" :model="form" label-position="left" style="width:100% ;margin: 0 auto;">
        <el-steps :active="active" align-center finish-status="success">
          <el-step v-for="(step,index) in steplist" :key="index" :title="step" />
        </el-steps>
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
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column prop="processnode" label="流程节点" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.processnode==1?"预案制定":scope.row.processnode==2?"预案审核":scope.row.processnode==3?"预案归档":""}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="dealingpeoplename" label="处理人" align="center" />
          <el-table-column prop="dealingtime" label="处理时间" align="center"></el-table-column>
          <el-table-column prop="auditopinion" label="审核意见" align="center" />
        </el-table>
        <div slot="footer" class="dialog-footer"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import info from "@/api/emergencymanagement/plan";
export default {
  props: {
    openobj: {
      default: null
    }
  },
  components: {
    Pagination
  },
  data() {
    return {
      form: {
        limit: 10,
        total: 2
      },
      tableData: [],
      showDialog: true,
      steplist: [
        "预案制定（专职）",
        "预案审核（工区分管领导）",
        "预案归档（专职）"
      ],
      active: 2,
      select: {
        planid: this.openobj.objId
      }
    };
  },
  created() {
    if (this.openobj.lczt == 1) {
      this.active = 1;
    } else if (this.openobj.lczt == 2) {
      this.active = 2;
    } else {
      this.active = 3;
    }
    this.lctabel();
  },
  mounted() {},
  methods: {
    // 查询流程列表
    lctabel() {
      info
        .lclist(this.select)
        .then(res => {
          //console.log(res, "流程列表");
          this.tableData = res.data.rows;
        })
        .catch(err => {});
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.showDialog = false;
          this.$emit("childFn", {
            showDialog: this.showDialog
          });
          this.$parent.getList();
          done();
        })
        .catch(_ => {});
    },
    getList() {},
    CheckFun() {}
  }
};
</script>

<style>
</style>