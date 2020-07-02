<template>
  <!-- 上次试验报告 -->
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
      <el-table-column :label="`检修${$xl}`" align="center" prop="xlmc"></el-table-column>
      <el-table-column label="检测单位" align="center" prop="jcdw"></el-table-column>
      <el-table-column label="试验日期" align="center" prop="syrq">
          <template slot-scope="scope">
           <span>{{scope.row.syrq | format('yyyy-MM-dd')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="试验类型" align="center" prop="testreporttype">
        <template slot-scope="scope">
          <span>{{scope.row.testreporttype?scope.row.testreporttype=='1'?`${$dl}${$xl}交流耐压试验报告`:scope.row.testreporttype=='3'?`${$dl}${$xl}直流电阻、电容试验报告`:scope.row.testreporttype=='2'?`${$dl}护层电流、感应电压检测试验报告`:scope.row.testreporttype=='4'?`${$dl}${$xl}直流耐压试验报告`:scope.row.testreporttype=='5'?`${$dl}油化学分析、电气试验试验报告`:scope.row.testreporttype=='6'?`${$dl}局部放电震荡波检测试验报告`:scope.row.testreporttype=='7'?`${$dl}外护套及内衬层试验报告`:scope.row.testreporttype=='8'?`金属氧化物避雷器实验报告`:scope.row.testreporttype=="9"?`${$dl}${$xl}接地系统试验报告`:'':""}}</span>
        </template>
      </el-table-column>
      <el-table-column label="主管" align="center" prop="zg"></el-table-column>
      <el-table-column label="试验人员" align="center" prop="syry"></el-table-column>
      <el-table-column label="审核人" align="center" prop="sh"></el-table-column>
      <el-table-column label="操作" align="center">
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
      <dljbfdzdbcssybg @childFn="parentFn" :jobtaskid1="jobtaskid1" :sfsyys1="sfsyys1" />
    </div>

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
import Pagination from "@/components/Pagination";
import Dialog from "../../report/seeabout/testReportDialog";
import dlxlzldzdrsybg from "../../report/seeabout/dlxlzldzdrsybg";
import dlxlzlnysybg from "../../report/seeabout/dlxlzlnysybg";
import dljbfdzdbcssybg from "../../report/seeabout/dljbfdzdbcssybg";
import gydyshow from "../../report/seeabout/gydyshow";
import dlwhtjnccsybg from "../../report/seeabout/dlwhtjnccsybg";
import dlxljdxtsybg from "../../report/seeabout/dlxljdxtsybg";
import jsyhwblqsybg from "../../report/seeabout/jsyhwblqsybg";
import dlyhxfxdqsybg from "../../report/seeabout/dlyhxfxdqsybg";
import whtjnc from "../../report/seeabout/whtjnc";
import jdxt from "../../report/seeabout/jdxt";
import { getSyBg } from "@/api/recondition/hc";
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
    jdxt
  },
  data() {
    return {
      form: {
        total: 2,
        pageNum: 1,
        pageSize: 10,
        xlid: this.$route.query.bb
      },
      tableData: [],
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
      jobtaskid1: null,
      sfsyys1: 2,
      testType: this.$route.query.cc
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getSyBg(this.form)
        .then(res => {
          console.log("res :>> ", res);
          this.tableData = res.data.rows;
          this.form.total = res.data.total;
        })
        .catch(err => {});
    },
    view(val) {
      let Type = this.testType;
      this.jobtaskid1 = val;
      if (Type == null) {
        this.$message("暂无可验收的报告");
      } else {
        if (Type == 1) {
          this.showDialog = true; //dlxl交流耐压试验报告
        } else if (Type == 3) {
          this.showDialog1 = true; //dlxl直流电阻、电容试验报告
        } else if (Type == 2) {
          this.gydyshow = true; //dl护层电流、感应电压检测试验报告
        } else if (Type == 4) {
          this.showDialog2 = true; //dlxl直流耐压试验报告
        } else if (Type == 5) {
          this.showDialog7 = true; // dl油化学分析、电气试验试验报告
        } else if (Type == 7) {
          this.showDialog8 = true; // 电缆外护套及内衬层试验报告
        } else if (Type == 6) {
          this.showDialog3 = true; // dl局部放电震荡波检测试验报告
        } else if (Type == 8) {
          this.showDialog6 = true; // 金属氧化物避雷器实验报告
        } else if (Type == 9) {
          this.showDialog9 = true; // 接地系统
        }
      }
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
<style lang='scss' scoped>
</style>