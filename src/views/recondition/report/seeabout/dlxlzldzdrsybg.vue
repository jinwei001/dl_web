<template>
<!-- dlxl直流电阻、电容试验报告 -->
  <div>
    <el-dialog
      :visible.sync="showDialog"
      :title="`${$dl}${$xl}直流电阻、电容试验报告`"
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
        <el-table-column prop="value5" align="left">
          <template slot-scope="scope">
            <div v-html="scope.row.value5" @mousemove="aaaa"></div>
          </template>
        </el-table-column>
        <el-table-column prop="value6" align="left">
          <template slot-scope="scope">
            <div v-html="scope.row.value6" @mousemove="aaaa"></div>
          </template>
        </el-table-column>
        <el-table-column prop="value7" align="left">
          <template slot-scope="scope">
            <div v-html="scope.row.value7" @mousemove="aaaa"></div>
          </template>
        </el-table-column>
        <el-table-column prop="value8" align="left">
          <template slot-scope="scope">
            <div v-html="scope.row.value8" @mousemove="aaaa"></div>
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
  getzldzReport,
  editzldzReport,
  getLineGroup,
  getnextuser,
  edit,
  getData,
  addzldzReport
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
          value1: `天气：<input id="tq" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `温度：<input id="wd" class="jxgzsybg_11" style="width:70%" type="text"/>℃`,
          value5: `湿度：<input id="sd" class="jxgzsybg_11" style="width:70%" type="text"/>%`,
          value7: `试验周期：<input id="syrq1" class="jxgzsybg_11" style="width:40px" type="text"/>年<input id="syrq2" class="jxgzsybg_11" style="width:20px" type="text"/>月<input id="syrq3" class="jxgzsybg_11" style="width:20px" type="text"/>日`
        },
        {
          value1: `检测单位：<input id="jcdw" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `试验性质：<input id="syxz" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1:
            this.$xl +
            `名称：<input id="xlmc" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5:
            this.$dl +
            `厂家：<input id="dlcj" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1:
            this.$dl +
            `型号：<input id="dlxh" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5:
            this.$dl +
            `长度（km）：<input id="dlcd" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1:
            this.$xl +
            `起始点：<input id="xlqsd" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `电阻检测仪器：<input id="dzjcyq" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `电容检测仪器：<input id="drjcyq" class="jxgzsybg_11" style="width:80%" type="text"/>`
        },
        {
          value1: "电容",
          value2: "相位",
          value3: "实测值（μF）",
          value6: "点位长度电容量（μF/km）"
        },
        {
          value2: "A",
          value3: `<input id="sca" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dwa" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value2: "B",
          value3: `<input id="scb" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dwb" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value2: "C",
          value3: `<input id="scc" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dwc" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "铜屏蔽层直流电阻Rp",
          value3: "实测电阻值（Ω）",
          value6: "20℃单相电阻（Ω/km）"
        },
        {
          value3: "Rᴀʙ",
          value4: "Rʙᴄ",
          value5: "Rᴄᴀ",
          value6: "Rᴀ",
          value7: "Rʙ",
          value8: "Rᴄ"
        },
        {
          value3: `<input id="tab" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="tbc" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `<input id="tca" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value6: `<input id="ta" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value7: `<input id="tb" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value8: `<input id="tc" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "导体直流电阻Rx",
          value3: "实测电阻值（Ω）",
          value6: "20℃单相电阻（Ω/km）"
        },
        {
          value3: "Rᴀʙ",
          value4: "Rʙᴄ",
          value5: "Rᴄᴀ",
          value6: "Rᴀ",
          value7: "Rʙ",
          value8: "Rᴄ"
        },
        {
          value3: `<input id="dab" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dbc" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `<input id="dca" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value6: `<input id="da" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value7: `<input id="db" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value8: `<input id="dc" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "铜屏蔽层电阻和导体电阻比（Rᴘ/Rx）",
          value3: "A",
          value5: "B",
          value7: "C"
        },
        {
          value2: `<input id="dzba" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="dzbb" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dzbc" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `试验结论：<input id="syjl" class="jxgzsybg_11" style="width:90%" type="text"/>`
        },
        {
          value1: `主管：<input id="zg" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `审核：<input id="sh" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `实验人员：<input id="syry" class="jxgzsybg_11" style="width:70%" type="text"/>`
        }
      ]
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        if (
          columnIndex == 0 ||
          columnIndex == 2 ||
          columnIndex == 4 ||
          columnIndex == 6
        ) {
          return [1, 2];
        } else {
          return [0, 0];
        }
      }
      if (rowIndex == 1 || rowIndex == 2 || rowIndex == 3 || rowIndex == 4) {
        if (columnIndex == 0 || columnIndex == 4) {
          return [1, 4];
        } else {
          return [0, 0];
        }
      }
      if (rowIndex == 5) {
        if (columnIndex == 0) {
          return [1, 8];
        }
      }
      if (rowIndex == 6) {
        if (columnIndex == 2 || columnIndex == 5) {
          return [1, 3];
        }
        if (
          columnIndex == 3 ||
          columnIndex == 4 ||
          columnIndex == 6 ||
          columnIndex == 7
        ) {
          return [0, 0];
        }
      }
      if (rowIndex == 7 || rowIndex == 8 || rowIndex == 9) {
        if (columnIndex == 2 || columnIndex == 3) {
          return [1, 3];
        }
      }
      if (rowIndex == 17) {
        if (columnIndex == 1 || columnIndex == 2 || columnIndex == 3) {
          return [1, 2];
        }
      }
      if (columnIndex == 0) {
        if (rowIndex == 6) {
          return {
            rowspan: 4,
            colspan: 1
          };
        }
        if (rowIndex == 7 || rowIndex == 8 || rowIndex == 9) {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      if (columnIndex == 0) {
        if (rowIndex == 10 || rowIndex == 13) {
          return {
            rowspan: 3,
            colspan: 2
          };
        }
        if (
          rowIndex == 11 ||
          rowIndex == 12 ||
          rowIndex == 14 ||
          rowIndex == 15 ||
          rowIndex == 17
        ) {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      if (columnIndex == 0) {
        if (rowIndex == 16) {
          return {
            rowspan: 2,
            colspan: 2
          };
        }
      }
      if (columnIndex == 1) {
        if (
          rowIndex == 10 ||
          rowIndex == 11 ||
          rowIndex == 12 ||
          rowIndex == 13 ||
          rowIndex == 14 ||
          rowIndex == 15 ||
          rowIndex == 16 ||
          rowIndex == 17
        ) {
          return [0, 0];
        }
      }
      if (rowIndex == 10 || rowIndex == 13) {
        if (columnIndex == 2 || columnIndex == 5) {
          return [1, 3];
        }
        if (
          columnIndex == 3 ||
          columnIndex == 4 ||
          columnIndex == 6 ||
          columnIndex == 7
        ) {
          return [0, 0];
        }
      }
      if (rowIndex == 16) {
        if (columnIndex == 2 || columnIndex == 4 || columnIndex == 6) {
          return [1, 2];
        }
        if (columnIndex == 3 || columnIndex == 5 || columnIndex == 7) {
          return [0, 0];
        }
      }
      if (rowIndex == 18) {
        if (columnIndex == 0) {
          return [1, 8];
        }
      }
      if (rowIndex == 19) {
        if (columnIndex == 0 || columnIndex == 2) {
          return [1, 2];
        }
        if (columnIndex == 4) {
          return [1, 4];
        }
        if (
          columnIndex == 1 ||
          columnIndex == 3 ||
          columnIndex == 5 ||
          columnIndex == 6 ||
          columnIndex == 7
        ) {
          return [0, 0];
        }
      }
    },
    addClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 6) {
        if (
          columnIndex == 0 ||
          columnIndex == 1 ||
          columnIndex == 2 ||
          columnIndex == 5
        ) {
          return "textCenter";
        }
      }
      if (rowIndex == 7 || rowIndex == 8 || rowIndex == 9) {
        if (
          columnIndex == 1 ||
          columnIndex == 2 ||
          columnIndex == 3 ||
          columnIndex == 4 ||
          columnIndex == 5 ||
          columnIndex == 6 ||
          columnIndex == 7
        ) {
          return "textCenter";
        }
      }
      if (
        rowIndex == 10 ||
        rowIndex == 11 ||
        rowIndex == 12 ||
        rowIndex == 13 ||
        rowIndex == 14 ||
        rowIndex == 15
      ) {
        if (
          columnIndex == 2 ||
          columnIndex == 3 ||
          columnIndex == 4 ||
          columnIndex == 5 ||
          columnIndex == 6 ||
          columnIndex == 7
        ) {
          return "textCenter";
        }
      }
      if (rowIndex == 16 || rowIndex == 17) {
        if (
          columnIndex == 2 ||
          columnIndex == 3 ||
          columnIndex == 4 ||
          columnIndex == 5 ||
          columnIndex == 6 ||
          columnIndex == 7
        ) {
          return "textCenter";
        }
      }
    },
    // 回显报告数据
    getData() {
      getzldzReport(this.$qs.stringify({ jobtaskid: this.jobtaskid })).then(
        res => {
          if (res.data.rows.length !== 0) {
            var data = {};
            data = res.data.rows[0];
            document.getElementById("tq").value = data.tq
            document.getElementById("wd").value = data.wd
            document.getElementById("sd").value = data.sd
            var arr = data.syrq.split('-')
            document.getElementById("syrq1").value = arr[0]
            document.getElementById("syrq2").value = arr[1]
            document.getElementById("syrq3").value = arr[2].substring(0,2)
        
            document.getElementById("jcdw").value = data.jcdw
            document.getElementById("syxz").value = data.syxz

            document.getElementById("xlmc").value = data.xlmc
            document.getElementById("dlcj").value = data.dlcj

            document.getElementById("dlxh").value = data.dlxh
            document.getElementById("dlcd").value = data.dlcd

            document.getElementById("xlqsd").value = data.xlqsd
            document.getElementById("dzjcyq").value = data.dzjcyq

            document.getElementById("drjcyq").value = data.drjcyq

            document.getElementById("sca").value = data.sca
            document.getElementById("scb").value = data.scb
            document.getElementById("scc").value = data.scc

            document.getElementById("dwa").value = data.dwa
            document.getElementById("dwb").value = data.dwb
            document.getElementById("dwc").value = data.dwc

            document.getElementById("tab").value = data.tab

            document.getElementById("tbc").value = data.tbc

            document.getElementById("tca").value = data.tca
            document.getElementById("ta").value = data.ta
            document.getElementById("tb").value = data.tb

            document.getElementById("tc").value = data.tc
            document.getElementById("dab").value = data.dab
            document.getElementById("dbc").value = data.dbc

            document.getElementById("dca").value = data.dca
            document.getElementById("da").value = data.da
            document.getElementById("db").value = data.db

            document.getElementById("dc").value = data.dc
            document.getElementById("dzba").value = data.dzba
            document.getElementById("dzbb").value = data.dzbb

            document.getElementById("dzbc").value = data.dzbc

            document.getElementById("syjl").value = data.syjl

            document.getElementById("zg").value = data.zg
            document.getElementById("sh").value = data.sh
            document.getElementById("syry").value = data.syry
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
    // input框title
    aaaa(e) {
      var a = e.target.title;
      a = e.target.value;
      if (e.target.value) {
        e.target.title = e.target.value;
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
  }
};
</script>

<style>
.textCenter .cell {
  text-align: center;
}
</style>