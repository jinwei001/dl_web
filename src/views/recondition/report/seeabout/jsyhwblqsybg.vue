<template>
  <!--  金属氧化物避雷器试验报告 -->
  <div>
    <el-dialog
      :visible.sync="showDialog"
      title=" 金属氧化物避雷器试验报告"
      :center="true"
      top="5vh"
      v-dialogDrag
      :before-close="handleClose"
    >
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
        <el-table-column prop="value6" align="center">
          <template slot-scope="scope">
            <div v-html="scope.row.value6" @mousemove="aaaa"></div>
          </template>
        </el-table-column>
        <el-table-column prop="value7" align="center">
          <template slot-scope="scope">
            <div v-html="scope.row.value7" @mousemove="aaaa"></div>
          </template>
        </el-table-column>
        <el-table-column prop="value8" align="center">
          <template slot-scope="scope">
            <div v-html="scope.row.value8" @mousemove="aaaa"></div>
          </template>
        </el-table-column>
        <el-table-column prop="value9" align="center">
          <template slot-scope="scope">
            <div v-html="scope.row.value9" @mousemove="aaaa"></div>
          </template>
        </el-table-column>
        <el-table-column prop="value10" align="center">
          <template slot-scope="scope">
            <div v-html="scope.row.value10" @mousemove="aaaa"></div>
          </template>
        </el-table-column>
        <el-table-column prop="value11" align="center">
          <template slot-scope="scope">
            <div v-html="scope.row.value11" @mousemove="aaaa"></div>
          </template>
        </el-table-column>
        <el-table-column prop="value12" align="center">
          <template slot-scope="scope">
            <div v-html="scope.row.value12" @mousemove="aaaa"></div>
          </template>
        </el-table-column>
        <el-table-column prop="value13" align="center">
          <template slot-scope="scope">
            <div v-html="scope.row.value13" @mousemove="aaaa"></div>
          </template>
        </el-table-column>
        </el-table>
      </div>
      <el-form
        ref="dataForm"
        :model="form"
        label-position="left"
        style="width:100% ;margin: 10px auto;"
      >
        <div class="Form-input" v-if="sfsyys == 1" style="margin-top: 2rem">
          <label class="form-label">审批意见：</label>
          <el-input type="textarea" style="width:90%" v-model="form.maintenancespyj"></el-input>
        </div>
      </el-form>
      <div slot="footer" v-if="sfsyys == 1" class="dialog-footer">
        <el-button class="UserSearchFun" @click="save">同意</el-button>
        <el-button class="onSearch" @click="noAgree">不同意</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getyhblReport,
  getLineGroup,
  getnextuser,
  edit,
  getData,
} from "@/api/recondition/jobtask";
export default {
  props: {
    jobtaskid1: '',
    sfsyys1: ''
  },
  data() {
    return {
        sfsyys: this.sfsyys1,
      jobtaskid: this.jobtaskid1,
      form: {
        objId: this.jobtaskid1,
        testreporttype: this.testreporttype,
        syclr: ""
      },
      sfsybg: '',
      status: false,
      showDialog: true,
      tableData: [
        {
          value1: `试验日期：<input id="syrq1" class="jxgzsybg_11" style="width: 40px" type="text" />年<input id="syrq2" class="jxgzsybg_11" style="width: 20px" type="text" />月<input id="syrq3" class="jxgzsybg_11" style="width: 20px" type="text" />日`,
          value2: `天气：<input id="tq" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value3: `温度：<input id="sd" class="jxgzsybg_11" style="width: 55%" type="text" />℃`,
          value4: `湿度：<input id="wd" class="jxgzsybg_11" style="width: 70%" type="text" />%`
        },
        {
          value1: "检测单位",
          value2: `<input id="jcdw" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value3: "试验性质",
          value4: `<input id="syxz" class="jxgzsybg_11" style="width: 70%" type="text" />`
        },
        {
          value1: "检测仪器",
          value2: `<input id="jcyq" class="jxgzsybg_11" style="width: 80%" type="text" />`,
          value3: this.$xl + "名称",
          value4: `<input id="xlmc" class="jxgzsybg_11" style="width: 80%" type="text" />`
        },
        {
          value1: ``,
          value2: "安装地点",
          value3: `<input id="azdd" class="jxgzsybg_11" style="width: 80%" type="text" />`
        },
        {
          value1: "",
          value2: "试验地点",
          value3: `<input id="sydd" class="jxgzsybg_11" style="width: 80%" type="text" />`
        },
        {
          value1: "编号",
          value2: "制造厂家",
          value3: "型号",
          value4: "额定电压（kV）",
          value5: "绝缘电阻（MΩ）",
          value6: "1mA下直流参考电压（kV）",
          value7: "75%直流参考电压下泄漏电流值（μA）",
          value8: "试验结论"
        },
        {
          value1: "出厂值（kV）",
          value2: "实测值（kV）",
          value3: "误差（%）"
        },
        {
          value1: `<input id="bh1" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value2: `<input id="zzcj1" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value3: `<input id="xh1" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value4: `<input id="eddy1" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value5: `<input id="jydz1" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value6: `<input id="ccz1" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value7: `<input id="scz1" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value8: `<input id="wc1" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value9: `<input id="xldl1" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value10: `<input id="syjl1" class="jxgzsybg_11" style="width: 70%" type="text" />`
        },
        {
          value1: `<input id="bh2" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value2: `<input id="zzcj2" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value3: `<input id="xh2" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value4: `<input id="eddy2" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value5: `<input id="jydz2" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value6: `<input id="ccz2" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value7: `<input id="scz2" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value8: `<input id="wc2" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value9: `<input id="xldl2" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value10: `<input id="syjl2" class="jxgzsybg_11" style="width: 70%" type="text" />`
        },
        {
          value1: `<input id="bh3" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value2: `<input id="zzcj3" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value3: `<input id="xh3" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value4: `<input id="eddy3" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value5: `<input id="jydz3" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value6: `<input id="ccz3" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value7: `<input id="scz3" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value8: `<input id="wc3" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value9: `<input id="xldl3" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value10: `<input id="syjl3" class="jxgzsybg_11" style="width: 70%" type="text" />`
        },
        {
          value1: "避雷器用在线监测仪"
        },
        {
          value1: "编号",
          value2: "制造厂家",
          value3: "型号",
          value4: "放电记录仪动作情况",
          value5: "监视用全电流表校验"
        },
        {
          value1: `<input id="jcybh1" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value2: `<input id="jcyzzcj1" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value3: `<input id="jcyxh1" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value4: `<input id="fddz1" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value5: `<input id="dljy1" class="jxgzsybg_11" style="width: 70%" type="text" />`
        },
        {
          value1: `<input id="jcybh2" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value2: `<input id="jcyzzcj2" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value3: `<input id="jcyxh2" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value4: `<input id="fddz2" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value5: `<input id="dljy2" class="jxgzsybg_11" style="width: 70%" type="text" />`
        },
        {
          value1: `<input id="jcybh3" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value2: `<input id="jcyzzcj3" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value3: `<input id="jcyxh3" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value4: `<input id="fddz3" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value5: `<input id="dljy3" class="jxgzsybg_11" style="width: 70%" type="text" />`
        },
        {
          value1: "避雷器底座"
        },
        {
          value1: "编号",
          value2: "绝缘电阻（MΩ）",
          value3: "试验结论"
        },
        {
          value1: `<input id="dzbh1" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value2: `<input id="dzjjdz1" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value3: `<input id="dzsyjl1" class="jxgzsybg_11" style="width: 70%" type="text" />`
        },
        {
          value1: `<input id="dzbh2" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value2: `<input id="dzjjdz2" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value3: `<input id="dzsyjl2" class="jxgzsybg_11" style="width: 70%" type="text" />`
        },
        {
          value1: `<input id="dzbh3" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value2: `<input id="dzjjdz3" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value3: `<input id="dzsyjl3" class="jxgzsybg_11" style="width: 70%" type="text" />`
        },
        {
          value1: `备注：<input id="bz" class="jxgzsybg_11" style="width: 90%" type="text" />`
        },
        {
          value1: `主管：<input id="zg" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value2: `审核：<input id="sh" class="jxgzsybg_11" style="width: 50%" type="text" />`,
          value3: `试验人员：<input id="syry" class="jxgzsybg_11" style="width: 70%" type="text" />`
        }
      ]
    };
  },
  mounted(){
    this.getData()
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 7 || rowIndex == 8 || rowIndex == 9) {
        if (columnIndex == 1 || columnIndex == 6 || columnIndex == 8) {
          return [1, 2];
        }
      }
      if (columnIndex == 1) {
        if (rowIndex == 2) {
          return {
            rowspan: 3,
            colspan: 3
          };
        }
      }
      if (rowIndex == 5) {
        if (columnIndex == 6) {
          return {
            rowspan: 2,
            colspan: 2
          };
        }
        if (columnIndex == 7) {
          return {
            rowspan: 2,
            colspan: 1
          };
        }
      }
      if (rowIndex == 3 || rowIndex == 4) {
        if (columnIndex == 0) {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      if (rowIndex == 0) {
        if (columnIndex == 0) {
          return [1, 5];
        }
        if (columnIndex == 1 || columnIndex == 3) {
          return [1, 3];
        }
        if (columnIndex == 2) {
          return [1, 2];
        }
      }
      if (rowIndex == 1) {
        if (columnIndex == 0 || columnIndex == 1) {
          return [1, 3];
        }
        if (columnIndex == 2) {
          return [1, 2];
        }
        if (columnIndex == 3) {
          return [1, 5];
        }
      }
      if (columnIndex == 0) {
        if (rowIndex == 2) {
          return {
            rowspan: 3,
            colspan: 3
          };
        }
      }
      if (rowIndex == 2) {
        if (columnIndex == 1) {
          return [1, 3];
        }
        if (columnIndex == 2) {
          return [1, 2];
        }
        if (columnIndex == 3) {
          return [1, 5];
        }
      }
      if (rowIndex == 3 || rowIndex == 4) {
        if (columnIndex == 0) {
          return [1, 3];
        }
        if (columnIndex == 1) {
          return [1, 2];
        }
        if (columnIndex == 2) {
          return [1, 5];
        }
      }
      if (columnIndex == 0) {
        if (rowIndex == 5) {
          return {
            rowspan: 2,
            colspan: 1
          };
        }
      }
      if (columnIndex == 1) {
        if (rowIndex == 5) {
          return {
            rowspan: 2,
            colspan: 2
          };
        }
      }
      if (columnIndex == 2 || columnIndex == 3 || columnIndex == 4) {
        if (rowIndex == 5) {
          return {
            rowspan: 2,
            colspan: 1
          };
        }
      }
      if (columnIndex == 5) {
        if (rowIndex == 5) {
          return [1, 4];
        }
      }
      if (columnIndex == 6) {
        if (rowIndex == 5) {
          return [1, 2];
        }
      }
      if (rowIndex == 6) {
        if (columnIndex == 1) {
          return [1, 2];
        }
      }
      if (rowIndex == 10) {
        if (columnIndex == 0) {
          return [1, 13];
        }
      }
      if (
        rowIndex == 11 ||
        rowIndex == 12 ||
        rowIndex == 13 ||
        rowIndex == 14
      ) {
        if (columnIndex == 0) {
          return [1, 2];
        }
        if (columnIndex == 1) {
          return [1, 3];
        }
        if (columnIndex == 2) {
          return [1, 4];
        }
        if (columnIndex == 3 || columnIndex == 4) {
          return [1, 2];
        }
      }
      if (rowIndex == 15) {
        if (columnIndex == 0) {
          return [1, 13];
        }
      }
      if (
        rowIndex == 16 ||
        rowIndex == 17 ||
        rowIndex == 18 ||
        rowIndex == 19
      ) {
        if (columnIndex == 0) {
          return [1, 2];
        }
        if (columnIndex == 1) {
          return [1, 7];
        }
        if (columnIndex == 2) {
          return [1, 4];
        }
      }
      if (rowIndex == 20) {
        if (columnIndex == 0) {
          return [1, 13];
        }
      }
      if (rowIndex == 21) {
        if (columnIndex == 0) {
          return [1, 4];
        }
        if (columnIndex == 1) {
          return [1, 2];
        }
        if (columnIndex == 2) {
          return [1, 7];
        }
      }
    },
    // 设置table样式
    addClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0 || rowIndex == 20 || rowIndex == 21) {
        return "textLeft";
      }
    },
    // 回显报告数据
    getData() {
      getyhblReport(this.$qs.stringify({ jobtaskid: this.jobtaskid }))
        .then(result => {
          console.log("result :>> ", result.data.rows[0]);
          if (result.data.rows[0]) {
            let data = result.data.rows[0];

            document.getElementById("tq").value = data.tq; //天气：
            document.getElementById("wd").value = data.wd; //温度：
            document.getElementById("sd").value = data.sd; //湿度：
            var arr = data.syrq.split("-");
            document.getElementById("syrq1").value = arr[0];
            document.getElementById("syrq2").value = arr[1];
            document.getElementById("syrq3").value = arr[2].substring(0, 2); //试验日期
            document.getElementById('jcdw').value = data.jcdw
            document.getElementById('syxz').value = data.syxz
            document.getElementById('jcyq').value = data.jcyq
            document.getElementById('xlmc').value = data.xlmc
            document.getElementById('azdd').value = data.azdd
            document.getElementById('sydd').value = data.sydd

            let jl = JSON.parse(data.jl);
            document.getElementById('bh1').value = jl[0].bh
            document.getElementById('zzcj1').value = jl[0].zzcj
            document.getElementById('xh1').value = jl[0].xh
            document.getElementById('eddy1').value = jl[0].eddy
            document.getElementById('jydz1').value = jl[0].jydz
            document.getElementById('ccz1').value = jl[0].ccz
            document.getElementById('scz1').value = jl[0].scz
            document.getElementById('wc1').value = jl[0].wc
            document.getElementById('xldl1').value = jl[0].xldl
            document.getElementById('syjl1').value = jl[0].syjl

            document.getElementById('bh2').value = jl[1].bh
            document.getElementById('zzcj2').value = jl[1].zzcj
            document.getElementById('xh2').value = jl[1].xh
            document.getElementById('eddy2').value = jl[1].eddy
            document.getElementById('jydz2').value = jl[1].jydz
            document.getElementById('ccz2').value = jl[1].ccz
            document.getElementById('scz2').value = jl[1].scz
            document.getElementById('wc2').value = jl[1].wc
            document.getElementById('xldl2').value = jl[1].xldl
            document.getElementById('syjl2').value = jl[1].syjl

            document.getElementById('bh3').value = jl[2].bh
            document.getElementById('zzcj3').value = jl[2].zzcj
            document.getElementById('xh3').value = jl[2].xh
            document.getElementById('eddy3').value = jl[2].eddy
            document.getElementById('jydz3').value = jl[2].jydz
            document.getElementById('ccz3').value = jl[2].ccz
            document.getElementById('scz3').value = jl[2].scz
            document.getElementById('wc3').value = jl[2].wc
            document.getElementById('xldl3').value = jl[2].xldl
            document.getElementById('syjl3').value = jl[2].syjl

            let jcyjl = JSON.parse(data.jcyjl)
            document.getElementById('jcybh1').value = jcyjl[0].jcybh
            document.getElementById('jcyzzcj1').value = jcyjl[0].jcyzzcj
            document.getElementById('jcyxh1').value = jcyjl[0].jcyxh
            document.getElementById('fddz1').value = jcyjl[0].fddz
            document.getElementById('dljy1').value = jcyjl[0].dljy

            document.getElementById('jcybh2').value = jcyjl[1].jcybh
            document.getElementById('jcyzzcj2').value = jcyjl[1].jcyzzcj
            document.getElementById('jcyxh2').value = jcyjl[1].jcyxh
            document.getElementById('fddz2').value = jcyjl[1].fddz
            document.getElementById('dljy2').value = jcyjl[1].dljy

            document.getElementById('jcybh3').value = jcyjl[2].jcybh
            document.getElementById('jcyzzcj3').value = jcyjl[2].jcyzzcj
            document.getElementById('jcyxh3').value = jcyjl[2].jcyxh
            document.getElementById('fddz3').value = jcyjl[2].fddz
            document.getElementById('dljy3').value = jcyjl[2].dljy

            let dzjl = JSON.parse(data.dzjl)
            document.getElementById('dzbh1').value = dzjl[0].dzbh
            document.getElementById('dzjjdz1').value = dzjl[0].dzjjdz
            document.getElementById('dzsyjl1').value = dzjl[0].dzsyjl

            document.getElementById('dzbh2').value = dzjl[1].dzbh
            document.getElementById('dzjjdz2').value = dzjl[1].dzjjdz
            document.getElementById('dzsyjl2').value = dzjl[1].dzsyjl

            document.getElementById('dzbh3').value = dzjl[2].dzbh
            document.getElementById('dzjjdz3').value = dzjl[2].dzjjdz
            document.getElementById('dzsyjl3').value = dzjl[2].dzsyjl

            document.getElementById('bz').value = data.bz

            document.getElementById("zg").value = data.zg;
            document.getElementById("sh").value = data.sh;
            document.getElementById("syry").value = data.syry;

            this.bgid = data.id; // 报告id
          }
        })
        .catch(err => {});
    },
    // 保存提交按钮
    save() {
      this.form.testacceptance = 3;
      edit(this.$qs.stringify(this.form)).then(result => {
        if (result.data.code == 0) {
          this.$message({ message: "同意", type: "success" });
          this.$parent.getData()
          this.showDialog = false;
          this.$emit("childFn", {
            showDialog: false
          });
        }
      });
    },
    noAgree() {
      this.form.testacceptance = 2;
      edit(this.$qs.stringify(this.form)).then(result => {
        if (result.data.code == 0) {
          this.$message({ message: "不同意", type: "success" });
          this.$parent.getData()
          this.showDialog = false;
          this.$emit("childFn", {
            showDialog: false
          });
        }
      });
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
    aaaa(e) {
      var a = e.target.title;
      a = e.target.value;
      e.target.title = e.target.value;
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