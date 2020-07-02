<template>
<!-- dlxl直流耐压试验报告 -->
  <div>
    <el-dialog
      :visible.sync="showDialog"
      :title="`${$dl}${$xl}直流耐压试验报告`"
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
import {
  getzlnyReport,
  addzlnyReport,
  getLineGroup,
  getnextuser,
  edit,
  getData,
  editzlnyReport
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
          value1: `天气：<input id="tq" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `温度：<input id="wd" readonly class="jxgzsybg_11" style="width:70%" type="text"/>℃`,
          value3: `湿度：<input id="sd" readonly class="jxgzsybg_11" style="width:70%" type="text"/>%`,
          value4: `试验日期：<input id="syrq1" readonly class="jxgzsybg_11" style="width:40px" type="text"/>年<input id="syrq2" readonly class="jxgzsybg_11" style="width:20px" type="text"/>月<input id="syrq3" readonly class="jxgzsybg_11" style="width:20px" type="text"/>日`
        },
        {
          value1: `检测单位：<input id="jcdw" readonly class="jxgzsybg_11" style="width:80%" type="text"/>`,
          value3: `试验性质：<input id="syxz" readonly class="jxgzsybg_11" style="width:80%" type="text"/>`
        },
        {
          value1:
            this.$xl +
            `名称：<input id="xlmc" class="jxgzsybg_11" readonly style="width:80%" type="text"/>`,
          value3: `试验地点:<input id="sydd" readonly class="jxgzsybg_11" style="width:80%" type="text"/>`
        },
        {
          value1:
            this.$dl +
            `型号：<input id="dlxh" readonly class="jxgzsybg_11" style="width:80%" type="text"/>`,
          value3:
            this.$dl +
            `长度（km）：<input id="dlcd" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1:
            this.$dl +
            `厂家：<input id="dlcj" readonly class="jxgzsybg_11" style="width:80%" type="text"/>`,
          value3: `电路起始点：<input id="dlqsd" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "耐压前后" + this.$dl + "主绝缘绝缘电阻测量（MΩ）"
        },
        {
          value1:
            '检测仪器：<input id="jcyq" readonly class="jxgzsybg_11" style="width:90%" type="text"/>'
        },
        {
          value1: "主绝缘绝缘电阻",
          value2: "A相",
          value3: "B相",
          value4: "C相"
        },
        {
          value1: "耐压前",
          value2: `<input id="nyqa" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="nyqb" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="nyqc" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "耐压后",
          value2: `<input id="nyha" readonly  class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="nyhb" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="nyhc" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `相对核对结果：<input id="xwhdjg" readonly class="jxgzsybg_11" style="width:80%" type="text"/>`
        },
        {
          value1: "直流耐压试验"
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
          value2: `<input id="sydya" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="sydyb" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="sydyc" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "持续时间（min）",
          value2: `<input id="cxsja" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="cxsjb" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="cxsjc" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "1min泄漏电流（μA）",
          value2: `<input id="xldla" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="xldlb" readonly  class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="xldlc" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "15min泄露电流（μA）",
          value2: `<input id="swxldla" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="swxldlb" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="swxldlc" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `三相不平衡系数：<input id="xs" readonly class="jxgzsybg_11" style="width:80%" type="text"/>`
        },
        {
          value1: `试验结果：<input id="syjg" readonly class="jxgzsybg_11" style="width:90%" type="text"/>`
        },
        {
          value1: `主管：<input id="zg" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `审核：<input id="sh" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `试验人员：<input id="syry" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`
        }
      ]
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if(rowIndex == 1 || rowIndex == 2 || rowIndex == 3 || rowIndex == 4) {
        if(columnIndex == 0 || columnIndex == 2) {
          return [1,2]
        }
        if(columnIndex == 1 || columnIndex == 3) {
          return [0,0]
        }
      }
      if(rowIndex == 5 || rowIndex == 6) {
        if(columnIndex == 0) {
          return [1,4]
        }
      }
      if(rowIndex == 10 || rowIndex == 11 || rowIndex == 12 || rowIndex == 18 || rowIndex == 19) {
        if(columnIndex == 0) {
          return [1,4]
        }
      }
      if(rowIndex == 20) {
        if(columnIndex == 2){
          return[1,2]
        }
      }
    },
    // 设置table样式
    addClass({ row, column, rowIndex, columnIndex }) {
      if(rowIndex == 5 || rowIndex == 11) {
        if(columnIndex == 0) {
          return 'textCenter'
        }
      }
      if(rowIndex == 7 || rowIndex ==8 || rowIndex == 9 || rowIndex == 13 || rowIndex == 14 || rowIndex == 15 || rowIndex == 16 || rowIndex == 17) {
        if(columnIndex == 0 || columnIndex == 1|| columnIndex == 2 || columnIndex == 3) {
          return 'textCenter'
        }
      }
    },
    // 回显报告数据
    getData() {
      getzlnyReport(this.$qs.stringify({ jobtaskid: this.jobtaskid })).then(
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
            document.getElementById("sydd").value = data.sydd
            document.getElementById("dlcj").value = data.dlcj

            document.getElementById("dlxh").value = data.dlxh
            document.getElementById("dlcd").value = data.dlcd

            document.getElementById("dlqsd").value = data.dlqsd
            document.getElementById("nyqa").value = data.nyqa
            document.getElementById("nyqb").value = data.nyqb
            document.getElementById("nyqc").value = data.nyqc
            document.getElementById("nyha").value = data.nyha
            document.getElementById("nyhb").value = data.nyhb
            document.getElementById("nyhc").value = data.nyhc
            document.getElementById("xwhdjg").value = data.xwhdjg
            document.getElementById("syyq").value = data.syyq
            document.getElementById("sydya").value = data.sydya
            document.getElementById("sydyb").value = data.sydyb
            document.getElementById("sydyc").value = data.sydyc
            document.getElementById("cxsja").value = data.cxsja
            document.getElementById("cxsjb").value = data.cxsjb
            document.getElementById("cxsjc").value = data.cxsjc
            document.getElementById("xldla").value = data.xldla
            document.getElementById("xldlb").value = data.xldlb
            document.getElementById("xldlc").value = data.xldlc
            document.getElementById("swxldla").value = data.swxldla
            document.getElementById("swxldlb").value = data.swxldlb
            document.getElementById("swxldlc").value = data.swxldlc
            document.getElementById("xs").value = data.xs
            document.getElementById("syjg").value = data.syjg
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
.textCenter .cell {
  text-align: center;
}
</style>