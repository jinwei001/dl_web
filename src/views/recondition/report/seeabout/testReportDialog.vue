<template>
  <div>
    <el-dialog
      :visible.sync="showDialog"
      :title="`${$dl}${$xl}交流耐压试验报告`"
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
          <el-table-column prop="value1" align="left">
            <template slot-scope="scope">
              <div v-html="scope.row.value1" @mousemove="aaaa"></div>
            </template>
          </el-table-column>
          <el-table-column prop="value2" align="left">
            <template slot-scope="scope">
              <div v-html="scope.row.value2" @mousemove="aaaa"></div>
            </template>
          </el-table-column>
          <el-table-column prop="value3" align="left">
            <template slot-scope="scope">
              <div v-html="scope.row.value3" @mousemove="aaaa"></div>
            </template>
          </el-table-column>
          <el-table-column prop="value4" align="left">
            <template slot-scope="scope">
              <div v-html="scope.row.value4" @mousemove="aaaa"></div>
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
import { getjlnyReport, edit } from "@/api/recondition/jobtask";
export default {
  props: {
    jobtaskid1: "",
    sfsyys1: ""
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
      sfsybg: "",
      status: false,
      showDialog: true,
      rowlist: [5, 7, 8, 9, 10, 11, 12, 13, 14],
      tableData: [
        {
          value1: `天气：<input id="tq" class="jxgzsybg_11" readonly style="width:70%" type="text"/>`,
          value2: `温度：<input id="wd" class="jxgzsybg_11" readonly style="width:70%" type="text"/>℃`,
          value3: `湿度：<input id="sd" class="jxgzsybg_11" readonly style="width:70%" type="text"/>%`,
          value4: `试验日期：<input id="syrq1" class="jxgzsybg_11" readonly style="width:40px" type="text"/>年<input class="jxgzsybg_11" readonly id="syrq2" style="width:20px" type="text"/>月<input class="jxgzsybg_11" readonly id="syrq3" style="width:20px" type="text"/>日`
        },
        {
          value1: `检测单位：<input id="jcdw" class="jxgzsybg_11" readonly style="width:80%" type="text"/>`,
          value3: `试验性质：<input id="syxz" class="jxgzsybg_11" readonly style="width:80%" type="text"/>`
        },
        {
          value1:
            this.$xl +
            `名称：<input id="xlmc" class="jxgzsybg_11" readonly style="width:85%" type="text"/>`,
          value3: `试验地点：<input id="sydd" class="jxgzsybg_11" readonly style="width:80%" type="text"/>`
        },
        {
          value1:
            this.$dl +
            `型号：<input id="dlxh" class="jxgzsybg_11" readonly style="width:85%" type="text"/>`,
          value3:
            this.$dl +
            `长度（km）：<input id="dlcd" class="jxgzsybg_11" readonly style="width:75%" type="text"/>`
        },
        {
          value1:
            this.$dl +
            `厂家：<input id="dlcj" class="jxgzsybg_11" readonly style="width:85%" type="text"/>`,
          value3: `电路起始点：<input id="dlqsd" readonly class="jxgzsybg_11" style="width:80%" type="text"/>`
        },
        {
          value1: "耐压前后" + this.$dl + "主绝缘绝缘电阻测量（MΩ）"
        },
        {
          value1: `检测仪器：<input id="jcyq" readonly class="jxgzsybg_11" style="width:80%" type="text"/>`
        },
        {
          value1: "主绝缘绝缘电阻",
          value2: "A相",
          value3: "B相",
          value4: "C相"
        },
        {
          value1: "耐压前",
          value2: `<input id="nyqa" class="jxgzsybg_11" readonly style="width:100%" type="text"/>`,
          value3: `<input id="nyqb" class="jxgzsybg_11" readonly style="width:100%" type="text"/>`,
          value4: `<input id="nyqc" class="jxgzsybg_11" readonly style="width:100%" type="text"/>`
        },
        {
          value1: "耐压后",
          value2: `<input id="nyha" class="jxgzsybg_11" readonly style="width:100%" type="text"/>`,
          value3: `<input id="nyhb" class="jxgzsybg_11" readonly style="width:100%" type="text"/>`,
          value4: `<input id="nyhc" class="jxgzsybg_11" readonly style="width:100%" type="text"/>`
        },
        {
          value1: `相对核对结果：<input id="xwhdjg" readonly class="jxgzsybg_11" style="width:80%" type="text"/>`
        },
        {
          value1: "交流耐压试验"
        },
        {
          value1: `试验仪器：<input id="syyq" readonly class="jxgzsybg_11" style="width:90%" type="text"/>`
        },
        {
          value2: "A相",
          value3: "B相",
          value4: "C相"
        },
        {
          value1: "试验电压（kV）",
          value2: `<input id="sydya" class="jxgzsybg_11" readonly style="width:90%" type="text"/>`,
          value3: `<input id="sydyb" class="jxgzsybg_11" readonly style="width:90%" type="text"/>`,
          value4: `<input id="sydyc" class="jxgzsybg_11" readonly style="width:90%" type="text"/>`
        },
        {
          value1: "低压侧励磁电流（A）",
          value2: `<input id="dyclcdla" class="jxgzsybg_11" readonly style="width:90%" type="text"/>`,
          value3: `<input id="dyclcdlb" class="jxgzsybg_11" readonly style="width:90%" type="text"/>`,
          value4: `<input id="dyclcdlc" class="jxgzsybg_11" readonly style="width:90%" type="text"/>`
        },
        {
          value1: "频率（Hz）",
          value2: `<input id="pla" class="jxgzsybg_11" readonly style="width:90%" type="text"/>`,
          value3: `<input id="plb" class="jxgzsybg_11" readonly style="width:90%" type="text"/>`,
          value4: `<input id="plc" class="jxgzsybg_11" readonly style="width:90%" type="text"/>`
        },
        {
          value1: "时间（min）",
          value2: `<input id="sja" class="jxgzsybg_11" readonly style="width:90%" type="text"/>`,
          value3: `<input id="sjb" class="jxgzsybg_11" readonly style="width:90%" type="text"/>`,
          value4: `<input id="sjc" class="jxgzsybg_11" readonly style="width:90%" type="text"/>`
        },
        {
          value1: "占空比",
          value2: `<input id="zkba" class="jxgzsybg_11" readonly style="width:90%" type="text"/>%`,
          value3: `<input id="zkbb" class="jxgzsybg_11" readonly style="width:90%" type="text"/>%`,
          value4: `<input id="zkbc" class="jxgzsybg_11" readonly style="width:90%" type="text"/>%`
        },
        {
          value1: "低压侧电流（A）",
          value2: `<input id="dycdla" class="jxgzsybg_11" readonly style="width:90%" type="text"/>`,
          value3: `<input id="dycdlb" class="jxgzsybg_11" readonly style="width:90%" type="text"/>`,
          value4: `<input id="dycdlc" class="jxgzsybg_11" readonly style="width:90%" type="text"/>`
        },
        {
          value1: "介质损耗因数",
          value2: `<input id="jzshysa" class="jxgzsybg_11" readonly style="width:90%" type="text"/>`,
          value3: `<input id="jzshysb" class="jxgzsybg_11" readonly style="width:90%" type="text"/>`,
          value4: `<input id="jzshysc" class="jxgzsybg_11" readonly style="width:90%" type="text"/>`
        },
        {
          value1: `试验结果：<input id="syjg" class="jxgzsybg_11" readonly style="width:85%" type="text"/>`
        },
        {
          value1: `主管：<input id="zg" class="jxgzsybg_11" readonly style="width:70%" type="text"/>`,
          value2: `审核：<input id="sh" class="jxgzsybg_11" readonly style="width:70%" type="text"/>`,
          value3: `试验人员：<input id="syry" class="jxgzsybg_11" readonly style="width:70%" type="text"/>`
        }
      ]
    };
  },
  mounted() {
    console.log(this.sfsyys);
    this.getData();
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 1 || rowIndex == 2 || rowIndex == 3 || rowIndex == 4) {
        if (columnIndex == 0 || columnIndex == 2) {
          return [1, 2];
        }
        if (columnIndex == 1 || columnIndex == 3) {
          return [0, 0];
        }
      }
      if (rowIndex == 5 || rowIndex == 6) {
        if (columnIndex == 0) {
          return [1, 4];
        }
      }
      if (
        rowIndex == 10 ||
        rowIndex == 11 ||
        rowIndex == 12 ||
        rowIndex == 21
      ) {
        if (columnIndex == 0) {
          return [1, 4];
        }
      }
      if (rowIndex == 22) {
        if (columnIndex == 2) {
          return [1, 2];
        }
      }
    },
    // 设置table样式
    addClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 5 || rowIndex == 11) {
        if (columnIndex == 0) {
          return "textCenter_11";
        }
      }
      if (
        rowIndex == 7 ||
        rowIndex == 8 ||
        rowIndex == 9 ||
        rowIndex == 13 ||
        rowIndex == 14 ||
        rowIndex == 15 ||
        rowIndex == 16 ||
        rowIndex == 17 ||
        rowIndex == 18 ||
        rowIndex == 19 ||
        rowIndex == 20
      ) {
        if (
          columnIndex == 0 ||
          columnIndex == 1 ||
          columnIndex == 2 ||
          columnIndex == 3
        ) {
          return "textCenter_11";
        }
      }
    },
    // 回显报告数据
    getData() {
      getjlnyReport(this.$qs.stringify({ jobtaskid: this.jobtaskid })).then(
        res => {
          if (res.data.rows !== []) {
            var data = {};
            data = res.data.rows[0];
            document.getElementById("tq").value = data.tq;
            document.getElementById("wd").value = data.wd;
            document.getElementById("sd").value = data.sd;
            if (data.syrq) {
              var arr = data.syrq.split("-");
              document.getElementById("syrq1").value = arr[0];
              document.getElementById("syrq2").value = arr[1];
              document.getElementById("syrq3").value = arr[2].substring(0, 2);
            }

            document.getElementById("jcdw").value = data.jcdw;
            document.getElementById("syxz").value = data.syxz;

            document.getElementById("xlmc").value = data.xlmc;
            document.getElementById("sydd").value = data.sydd;

            document.getElementById("dlxh").value = data.dlxh;
            document.getElementById("dlcd").value = data.dlcd;

            document.getElementById("dlcj").value = data.dlcj;
            document.getElementById("dlqsd").value = data.dlqsd;
            document.getElementById("syyq").value = data.syyq;
            document.getElementById("jcyq").value = data.jcyq;

            document.getElementById("nyqa").value = data.nyqa;
            document.getElementById("nyqb").value = data.nyqb;
            document.getElementById("nyqc").value = data.nyqc;

            document.getElementById("nyha").value = data.nyha;
            document.getElementById("nyhb").value = data.nyhb;
            document.getElementById("nyhc").value = data.nyhc;

            document.getElementById("xwhdjg").value = data.xwhdjg;

            // document.getElementById("syrq").value = data.syrq;

            document.getElementById("sydya").value = data.sydya;
            document.getElementById("sydyb").value = data.sydyb;
            document.getElementById("sydyc").value = data.sydyc;

            document.getElementById("dyclcdla").value = data.dyclcdla;
            document.getElementById("dyclcdlb").value = data.dyclcdlb;
            document.getElementById("dyclcdlc").value = data.dyclcdlc;

            document.getElementById("pla").value = data.pla;
            document.getElementById("plb").value = data.plb;
            document.getElementById("plc").value = data.plc;

            document.getElementById("sja").value = data.sja;
            document.getElementById("sjb").value = data.sjb;
            document.getElementById("sjc").value = data.sjc;

            document.getElementById("zkba").value = data.zkba;
            document.getElementById("zkbb").value = data.zkbb;
            document.getElementById("zkbc").value = data.zkbc;

            document.getElementById("dycdla").value = data.dycdla;
            document.getElementById("dycdlb").value = data.dycdlb;
            document.getElementById("dycdlc").value = data.dycdlc;

            document.getElementById("jzshysa").value = data.jzshysa;
            document.getElementById("jzshysb").value = data.jzshysb;
            document.getElementById("jzshysc").value = data.jzshysc;

            document.getElementById("syjg").value = data.syjg;

            document.getElementById("zg").value = data.zg;
            document.getElementById("sh").value = data.sh;
            document.getElementById("syry").value = data.syry;
            this.bgid = data.id; // 报告id
          }
        }
      );
    },
    // 保存提交按钮
    save() {
      this.form.testacceptance = 3;
      edit(this.$qs.stringify(this.form)).then(result => {
        if (result.data.code == 0) {
          this.$message({ message: "同意", type: "success" });
          this.$parent.getData();
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
          this.$parent.getData();
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
    // input框title
    aaaa(e) {
      var a = e.target.title;
      a = e.target.value;
      if (e.target.value) {
        e.target.title = e.target.value;
      }
    }
  }
};
</script>

<style>
.textCenter_11 .cell {
  text-align: center;
}
</style>