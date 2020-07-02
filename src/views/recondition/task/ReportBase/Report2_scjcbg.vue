<template>
  <!-- 上次检修报告 -->
  <div class>
    <el-table
      :data="tableData"
      style="border: 1px solid #c7c7c7;width:100%;margin-top:2rem"
      :cell-style="{borderColor: '#c7c7c7'}"
      :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}"
      border
      fit
      highlight-current-row
    >
      <el-table-column fixed type="index" label="序号" width="60" align="center">
        <template slot-scope="scope">
          <span>{{(form.pageNum - 1) * 10 + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="`检修${$xl}`" align="center" prop="tq"></el-table-column>
      <el-table-column label="上次检修日期" align="center" prop="scjxrq">
        <template slot-scope="scope">
          <div>{{scope.row.scjxrq | format('yyyy-MM-dd')}}</div>
        </template>
      </el-table-column>
      <el-table-column label="检修日期" align="center" prop="jxrq"></el-table-column>
      <el-table-column label="工作负责人" align="center" prop="gzfzr"></el-table-column>
      <el-table-column label="审核人" align="center" prop="shry"></el-table-column>
      <el-table-column label="操作" align="center" prop="tasksourcename">
        <template slot-scope="scope">
          <el-button class="onSearch" size="small" @click="view(scope.row.jobtaskid)">查看</el-button>
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
    <div v-if="dialog">
      <jxbg @childFn="parentFn" :jobtaskid="jobtaskid" />
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import jxbg from "../../report/seeabout/maintenanceReportDialog";
import { getdlxlReport } from "@/api/recondition/jobtask";
export default {
  components: { Pagination, jxbg },
  data() {
    return {
      jobtaskid: "",
      dialog: false,
      tableData: [{}],
      form: {
        xlid: this.$route.query.bb,
        pageNum: 1,
        pageSize: 10,
        total: 1
      }
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getdlxlReport(this.$qs.stringify(this.form)).then(res => {
        this.tableData = res.data.rows;
        this.form.total = res.data.total;
      });
    },
    view(val) {
      this.jobtaskid = val;
      this.dialog = true;
    },
    parentFn() {
      this.dialog = false;
    }
  }
};
</script>
<style lang='scss' scoped>
</style>