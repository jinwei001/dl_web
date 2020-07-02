<template>
  <!-- dl油化学分析、电气试验试验报告 -->
  <div>
    <div class="respont-content" v-if="!isjhgl">
      <el-form>
        <el-col>
          <el-form-item style="float: left;">
            <el-button type="primary" @click="download">下载</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        :show-header="status"
        border
        :span-method="arraySpanMethod"
        :cell-class-name="addClass"
      >
        <el-table-column prop="value1" align="center">
          <template slot-scope="scope">
            <div v-html="scope.row.value1" @mousemove="aaaa"></div>
          </template>
        </el-table-column>
        <el-table-column prop="value2" align="center">
          <template slot-scope="scope">
            <div v-html="scope.row.value2" @mousemove="aaaa"></div>
          </template>
        </el-table-column>
        <el-table-column prop="value3" align="center">
          <template slot-scope="scope">
            <div v-html="scope.row.value3" @mousemove="aaaa"></div>
          </template>
        </el-table-column>
        <el-table-column prop="value4" align="center">
          <template slot-scope="scope">
            <div v-html="scope.row.value4" @mousemove="aaaa"></div>
          </template>
        </el-table-column>
        <el-table-column prop="value5" align="center">
          <template slot-scope="scope">
            <div v-html="scope.row.value5" @mousemove="aaaa"></div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-form
      v-if="isjhgl"
      ref="dataForm"
      :model="form"
      label-position="left"
      style="width:100% ;margin: 10px auto;"
    >
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">验收班组：</label>
          <el-select v-model="form.syclbz" clearable placeholder="请选择" @change="getysr()">
            <el-option
              v-for="item in selection.ysbz"
              :key="item.objId"
              :label="item.groupname"
              :value="item.objId"
            ></el-option>
          </el-select>
        </div>
        <div class="form-item">
          <label class="form-label">验收人：</label>
          <el-select v-model="form.syclr" clearable placeholder="请选择">
            <el-option
              v-for="item in selection.ysr"
              :key="item.objId"
              :label="item.name"
              :value="item.objId"
            ></el-option>
          </el-select>
        </div>
      </div>
    </el-form>
    <div slot="footer" style="margin: 1rem auto" class="dialog-footer" v-if="isjhgl">
      <p style="text-align: center">
        <el-button class="UserSearchFun" @click="save">确定</el-button>
        <el-button class="onSearch" @click="handleClose">取消</el-button>
      </p>
    </div>
  </div>
</template>

<script>
import {
  getyhdqReport,
  addyhdqReport,
  getLineGroup,
  getnextuser,
  edit,
  getData,
  edityhdqReport
} from "@/api/recondition/jobtask";
import { getLineSelect } from "@/api/recondition/yearPlan";
export default {
  props: {
    jobtaskid1: "",
    testreporttype: "",
    xlmcFn: "",
    xlidFn: "",
    isjhgl: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      bgid: "",
      xlid: this.xlidFn,
      xlmc: this.xlmcFn,
      form: {
        id: "",
        testreporttype: this.testreporttype,
        syclr: ""
      },
      jobtaskid: this.jobtaskid1,
      status: false,
      selection: {
        ysbz: [],
        ysr: []
      },
      tableData: [
        {
          value1: `天气：<input id="tq" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `温度：<input id="wd" class="jxgzsybg_11" style="width:60%" type="text"/>℃`,
          value3: `湿度：<input id="sd" class="jxgzsybg_11" style="width:60%" type="text"/>%`,
          value4: `试验日期：<input id="syrq1" class="jxgzsybg_11" style="width:31px" type="text"/>年<input id="syrq2" class="jxgzsybg_11" style="width:16px" type="text"/>月<input id="syrq3" class="jxgzsybg_11" style="width:16px" type="text"/>日`
        },
        {
          value1: "检测单位",
          value2: `<input id="jcdw" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: "试验性质",
          value4: `<input id="syxz" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: this.$xl + "名称",
          value2: `<input id="xlmc" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: "投运日期",
          value4: `<input id="tyrq1" class="jxgzsybg_11" style="width:40px" type="text"/>年<input id="tyrq2" class="jxgzsybg_11" style="width:20px" type="text"/>月<input id="tyrq3" class="jxgzsybg_11" style="width:20px" type="text"/>日`
        },
        {
          value1: this.$dl + "厂家",
          value2: `<input id="dlcj" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: "取样地点",
          value4: `<input id="qydd" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "试验仪器",
          value2: `<input id="syyq" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: "气体检测仪器",
          value4: `<input id="qtjcyq" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "相位",
          value2: "编号",
          value3: "油重",
          value4: "取样人员",
          value5: "取样日期"
        },
        {
          value1: "A",
          value2: `<input id="bha" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="yza" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="rya" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `<input id="qyrqa1" class="jxgzsybg_11" style="width:40px" type="text"/>年<input id="qyrqa2" class="jxgzsybg_11" style="width:20px" type="text"/>月<input id="qyrqa3" class="jxgzsybg_11" style="width:20px" type="text"/>日`
        },
        {
          value1: "B",
          value2: `<input id="bhb" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="yzb" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="ryb" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `<input id="qyrqb1" class="jxgzsybg_11" style="width:40px" type="text"/>年<input id="qyrqb2" class="jxgzsybg_11" style="width:20px" type="text"/>月<input id="qyrqb3" class="jxgzsybg_11" style="width:20px" type="text"/>日`
        },
        {
          value1: "C",
          value2: `<input id="bhc" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="yzc" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="ryc" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `<input id="qyrqc1" class="jxgzsybg_11" style="width:40px" type="text"/>年<input id="qyrqc2" class="jxgzsybg_11" style="width:20px" type="text"/>月<input id="qyrqc3" class="jxgzsybg_11" style="width:20px" type="text"/>日`
        },
        {
          value1: "试验项目",
          value2: "A",
          value3: "B",
          value4: "C"
        },
        {
          value1: "外观",
          value2: `<input id="wga" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="wgb" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="wgc" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "机械杂质",
          value2: `<input id="zza" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="zzb" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="zzc" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "击穿电压（kV）",
          value2: `<input id="dya" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="dyb" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dyc" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "介质损耗因数tgδ（100℃）",
          value2: `<input id="ysa" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="ysb" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="ysc" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "氢H2（μL/L）",
          value2: `<input id="qa" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="qb" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="qc" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "甲烷CH4（μL/L）",
          value2: `<input id="jwa" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="jwb" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="jwc" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "乙烷C2H6（μL/L）",
          value2: `<input id="ywa" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="ywb" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="ywc" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "乙烯C2H4（μL/L）",
          value2: `<input id="yxa" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="yxb" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="yxc" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "乙炔C2H2（μL/L）",
          value2: `<input id="yja" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="yjb" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="yjc" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "可燃气体总量（μL/L）",
          value2: `<input id="kra" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="krb" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="krc" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "一氧化碳CO（μL/L）",
          value2: `<input id="yya" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="yyb" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="yyc" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "二氧化碳CO2（μL/L）",
          value2: `<input id="eya" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="eyb" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="eyc" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `实验结果：<input id="syjg" class="jxgzsybg_11" style="width:90%" type="text"/>`
        },
        {
          value1: `主管：<input id="zg" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `审核：<input id="sh" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `实验人员：<input id="syry" class="jxgzsybg_11" style="width:70%" type="text"/>`
        }
      ],
      objId: null
    };
  },
  mounted() {
    console.log(this.jobtaskid);
    this.getSelectionList();
    this.getData();
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (
        rowIndex == 0 ||
        rowIndex == 1 ||
        rowIndex == 2 ||
        rowIndex == 3 ||
        rowIndex == 4 ||
        rowIndex == 9 ||
        rowIndex == 10 ||
        rowIndex == 11 ||
        rowIndex == 12 ||
        rowIndex == 13 ||
        rowIndex == 14 ||
        rowIndex == 15 ||
        rowIndex == 16 ||
        rowIndex == 17 ||
        rowIndex == 18 ||
        rowIndex == 19 ||
        rowIndex == 20 ||
        rowIndex == 21 ||
        rowIndex == 24
      ) {
        if (columnIndex == 0) {
          return [1, 2];
        }
      }
      if (rowIndex == 22) {
        if (columnIndex == 0) {
          return [1, 5];
        }
      }
      if (rowIndex == 23) {
        if (columnIndex == 2) {
          return [1, 3];
        }
      }
    },
    // 设置table样式
    addClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0 || rowIndex == 23 || rowIndex == 24) {
        return "textLeft";
      }
    },
    // 获取下拉框
    getSelectionList() {
      getLineGroup().then(res => {
        this.selection.ysbz = res.data.rows;
      });
      getnextuser().then(res => {
        this.selection.ysr = res.data.rows;
      });
    },
    getysr() {
      getnextuser(this.$qs.stringify({ groupid: this.form.syclbz })).then(
        res => {
          this.selection.ysr = res.data.rows;
        }
      );
    },
    // 回显报告数据
    getData() {
      getyhdqReport(this.$qs.stringify({ jobtaskid: this.jobtaskid })).then(
        res => {
          if (res.data.rows[0]) {
            var data = {};
            data = res.data.rows[0];
            document.getElementById("tq").value = data.tq;
            document.getElementById("wd").value = data.wd;
            document.getElementById("sd").value = data.sd;
            var arr = data.syrq.split("-");
            document.getElementById("syrq1").value = arr[0];
            document.getElementById("syrq2").value = arr[1];
            document.getElementById("syrq3").value = arr[2].substring(0, 2);
            document.getElementById("jcdw").value = data.jcdw;
            document.getElementById("xlmc").value = data.xlmc;
            document.getElementById("syxz").value = data.syxz;
            document.getElementById("qydd").value = data.qydd;
            var arr1 = data.tyrq.split("-");
            document.getElementById("tyrq1").value = arr1[0];
            document.getElementById("tyrq2").value = arr1[1];
            document.getElementById("tyrq3").value = arr1[2].substring(0, 2);
            document.getElementById("syyq").value = data.syyq;
            document.getElementById("dlcj").value = data.dlcj;
            document.getElementById("qtjcyq").value = data.qtjcyq;
            document.getElementById("bha").value = data.bha;
            document.getElementById("bhb").value = data.bhb;
            document.getElementById("bhc").value = data.bhc;
            document.getElementById("yza").value = data.yza;
            document.getElementById("yzb").value = data.yzb;
            document.getElementById("yzc").value = data.yzc;
            document.getElementById("rya").value = data.rya;
            document.getElementById("ryb").value = data.ryb;
            document.getElementById("ryc").value = data.ryc;
            var arr2 = data.qyrqa.split("-");
            document.getElementById("qyrqa1").value = arr2[0];
            document.getElementById("qyrqa2").value = arr2[1];
            document.getElementById("qyrqa3").value = arr2[2].substring(0, 2);
            var arr3 = data.qyrqb.split("-");
            document.getElementById("qyrqb1").value = arr3[0];
            document.getElementById("qyrqb2").value = arr3[1];
            document.getElementById("qyrqb3").value = arr3[2].substring(0, 2);
            var arr4 = data.qyrqc.split("-");
            document.getElementById("qyrqc1").value = arr4[0];
            document.getElementById("qyrqc2").value = arr4[1];
            document.getElementById("qyrqc3").value = arr4[2].substring(0, 2);
            document.getElementById("wga").value = data.wga;
            document.getElementById("wgb").value = data.wgb;
            document.getElementById("wgc").value = data.wgc;
            document.getElementById("zza").value = data.zza;
            document.getElementById("zzb").value = data.zzb;
            document.getElementById("zzc").value = data.zzc;
            document.getElementById("dya").value = data.dya;
            document.getElementById("dyb").value = data.dyb;
            document.getElementById("dyc").value = data.dyc;
            document.getElementById("ysa").value = data.ysa;
            document.getElementById("ysb").value = data.ysb;
            document.getElementById("ysc").value = data.ysc;
            document.getElementById("qa").value = data.qa;
            document.getElementById("qb").value = data.qb;
            document.getElementById("qc").value = data.qc;
            document.getElementById("jwa").value = data.jwa;
            document.getElementById("jwb").value = data.jwb;
            document.getElementById("jwc").value = data.jwc;
            document.getElementById("ywa").value = data.ywa;
            document.getElementById("ywb").value = data.ywb;
            document.getElementById("ywc").value = data.ywc;
            document.getElementById("yxa").value = data.yxa;
            document.getElementById("yxb").value = data.yxb;
            document.getElementById("yxc").value = data.yxc;
            document.getElementById("yja").value = data.yja;
            document.getElementById("yjb").value = data.yjb;
            document.getElementById("yjc").value = data.yjc;
            document.getElementById("kra").value = data.kra;
            document.getElementById("krb").value = data.krb;
            document.getElementById("krc").value = data.krc;
            document.getElementById("yya").value = data.yya;
            document.getElementById("yyb").value = data.yyb;
            document.getElementById("yyc").value = data.yyc;
            document.getElementById("eya").value = data.eya;
            document.getElementById("eyb").value = data.eyb;
            document.getElementById("eyc").value = data.eyc;
            document.getElementById("syjg").value = data.syjg;
            document.getElementById("zg").value = data.zg;
            document.getElementById("sh").value = data.sh;
            document.getElementById("syry").value = data.syry;
            this.bgid = data.id; // 报告id
            getData(this.$qs.stringify({ objId: this.jobtaskid })).then(res => {
              this.form.syclbz = res.data.rows[0].syclbz;
              this.form.syclr = res.data.rows[0].syclr;
              this.getysr();
            });
          }
          if (
            document.getElementById("xlmc").value == "" ||
            document.getElementById("xlmc").value == undefined
          ) {
            document.getElementById("xlmc").value = this.xlmc;
            // 获取线路名称下拉框
            getLineSelect(
              this.$qs.stringify({ lineNature: "主线", id: this.xlid })
            ).then(response => {
              if (response.status == 200) {
                var data = response.data.rows[0];
                var arr = data.transportTime.split("-");
                document.getElementById("tyrq1").value = arr[0];
                document.getElementById("tyrq2").value = arr[1];
                document.getElementById("tyrq3").value = arr[2].substring(0, 2);
              }
            });
          }
        }
      );
    },
    save() {
      console.log(111);
      var data = {};
      data.tq = document.getElementById("tq").value;
      data.wd = document.getElementById("wd").value;
      data.sd = document.getElementById("sd").value;
      data.syrq =
        document.getElementById("syrq1").value +
        "-" +
        document.getElementById("syrq2").value +
        "-" +
        document.getElementById("syrq3").value;

      data.jcdw = document.getElementById("jcdw").value;
      data.xlmc = document.getElementById("xlmc").value;
      data.xlid = this.xlid;
      data.tyrq =
        document.getElementById("tyrq1").value +
        "-" +
        document.getElementById("tyrq2").value +
        "-" +
        document.getElementById("tyrq3").value;
      data.syxz = document.getElementById("syxz").value;
      data.qydd = document.getElementById("qydd").value;

      data.syyq = document.getElementById("syyq").value;
      data.dlcj = document.getElementById("dlcj").value;
      data.qtjcyq = document.getElementById("qtjcyq").value;
      data.bha = document.getElementById("bha").value;
      data.bhb = document.getElementById("bhb").value;
      data.bhc = document.getElementById("bhc").value;
      data.yza = document.getElementById("yza").value;
      data.yzb = document.getElementById("yzb").value;
      data.yzc = document.getElementById("yzc").value;
      data.rya = document.getElementById("rya").value;
      data.ryb = document.getElementById("ryb").value;
      data.ryc = document.getElementById("ryc").value;
      data.qyrqa =
        document.getElementById("qyrqa1").value +
        "-" +
        document.getElementById("qyrqa2").value +
        "-" +
        document.getElementById("qyrqa3").value;
      data.qyrqb =
        document.getElementById("qyrqb1").value +
        "-" +
        document.getElementById("qyrqb2").value +
        "-" +
        document.getElementById("qyrqb3").value;
      data.qyrqc =
        document.getElementById("qyrqc1").value +
        "-" +
        document.getElementById("qyrqc2").value +
        "-" +
        document.getElementById("qyrqc3").value;
      data.wga = document.getElementById("wga").value;
      data.wgb = document.getElementById("wgb").value;
      data.wgc = document.getElementById("wgc").value;
      data.zza = document.getElementById("zza").value;
      data.zzb = document.getElementById("zzb").value;
      data.zzc = document.getElementById("zzc").value;
      data.dya = document.getElementById("dya").value;
      data.dyb = document.getElementById("dyb").value;
      data.dyc = document.getElementById("dyc").value;
      data.ysa = document.getElementById("ysa").value;
      data.ysb = document.getElementById("ysb").value;
      data.ysc = document.getElementById("ysc").value;
      data.qa = document.getElementById("qa").value;
      data.qb = document.getElementById("qb").value;
      data.qc = document.getElementById("qc").value;
      data.jwa = document.getElementById("jwa").value;
      data.jwb = document.getElementById("jwb").value;
      data.jwc = document.getElementById("jwc").value;
      data.ywa = document.getElementById("ywa").value;
      data.ywb = document.getElementById("ywb").value;
      data.ywc = document.getElementById("ywc").value;
      data.yxa = document.getElementById("yxa").value;
      data.yxb = document.getElementById("yxb").value;
      data.yxc = document.getElementById("yxc").value;
      data.yja = document.getElementById("yja").value;
      data.yjb = document.getElementById("yjb").value;
      data.yjc = document.getElementById("yjc").value;
      data.kra = document.getElementById("kra").value;
      data.krb = document.getElementById("krb").value;
      data.krc = document.getElementById("krc").value;
      data.yya = document.getElementById("yya").value;
      data.yyb = document.getElementById("yyb").value;
      data.yyc = document.getElementById("yyc").value;
      data.eya = document.getElementById("eya").value;
      data.eyb = document.getElementById("eyb").value;
      data.eyc = document.getElementById("eyc").value;
      data.syjg = document.getElementById("syjg").value;
      data.zg = document.getElementById("zg").value;
      data.sh = document.getElementById("sh").value;
      data.syry = document.getElementById("syry").value;
      data.jobtaskid = this.jobtaskid; // 工作任务id
      this.form.testacceptance = 1; // 实验结果
      this.selection.ysr.forEach(item => {
        if (this.form.syclr == item.objId) {
          this.form.syclrname = item.name;
        }
      });
      this.form.objId = this.jobtaskid; // 工作任务id
      console.log(this.bgid);
      if (this.bgid) {
        data.id = this.bgid; // 报告id
        edityhdqReport(data).then(res => {
          edit(this.$qs.stringify(this.form)).then(result => {
            if (result.data.code == 0 && res.data.code == 0) {
              this.$message({ message: "保存成功", type: "success" });
              this.showDialog = false;
              this.$parent.$parent.getData();
              this.$emit("childFn", {
                showDialog: false
              });
            }
          });
        });
      } else {
        addyhdqReport(data).then(res => {
          edit(this.$qs.stringify(this.form)).then(result => {
            if (result.data.code == 0 && res.data.code == 0) {
              this.$message({ message: "新增成功", type: "success" });
              this.showDialog = false;
              this.$parent.$parent.getData();
              this.$emit("childFn", {
                showDialog: false
              });
            }
          });
        });
      }
    },
    //   取消
    handleClose() {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.showDialog = false;
          this.$emit("childFn", {
            showDialog: false
          });
          done();
        })
        .catch(_ => {});
    },
    // input框title
    aaaa(e) {
      var a = e.target.title;
      a = e.target.value;
      if (e.target.value) {
        e.target.title = e.target.value;
      }
    },
    download() {
      this.$parent.download(this.form.testreporttype, this.bgid);
    }
  }
};
</script>

<style>
.textCenter .cell {
  text-align: center;
}
.textLeft .cell {
  text-align: left;
}
</style>