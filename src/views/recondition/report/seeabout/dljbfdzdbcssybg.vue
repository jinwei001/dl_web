<template>
  <!-- dl局部放电振荡波检测试验报告 -->
  <div>
    <el-dialog
      :visible.sync="showDialog"
      :title="`${$dl}局部放电振荡波检测试验报告`"
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
          <el-table-column prop="value1" show-overflow-tooltip align="center">
            <template slot-scope="scope">
                 <div v-html="scope.row.value1"  @mousemove="aaaa"></div>
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
  getjbfdReport ,
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
          value1: `天气：<input id="tq" class="jxgzsybg_11" readonly style="width: 70%" type="text" />`,
          value2: `温度：<input id="wd" class="jxgzsybg_11" readonly style="width: 70%" type="text" /> ℃`,
          value3: `湿度：<input id="sd" class="jxgzsybg_11" readonly  style="width: 70%" type="text" />%`,
          value4: `试验日期：<input id="syrq1" class="jxgzsybg_11" readonly style="width: 40px" type="text" />年<input id="syrq2" class="jxgzsybg_11" readonly style="width: 20px" type="text" />月<input id="syrq3" class="jxgzsybg_11" readonly style="width: 20px" type="text"/>日`
        },
        {
          value1: "检测单位",
          value2: `<input id="jcdw" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`,
          value3: "试验性质",
          value4: `<input id="syxz" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`
        },
        {
          value1: this.$xl + "名称",
          value2: `<input id="xlmc" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`,
          value3: "投运日期",
          value4: `<input id="tyrq1" class="jxgzsybg_11" readonly style="width: 40px" type="text" />年<input id="tyrq2" class="jxgzsybg_11" readonly style="width: 20px" type="text" />月<input id="tyrq3" class="jxgzsybg_11" readonly style="width: 20px" type="text" />日`
        },
        {
          value1: this.$dl + "厂家",
          value2: `<input id="dlcj" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`,
          value3: this.$dl + "型号",
          value4: `<input id="dlxh" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`
        },
        {
          value1: this.$dl + "起讫点",
          value2: `<input id="dlqyd" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`,
          value3: this.$dl + "接头数量",
          value4: `<input id="dljtsl" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`
        },
        {
          value1: "试验仪器",
          value2: `<input id="syyq" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`,
          value3: "气体检测仪器",
          value4: `<input id="qtjcyq" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`
        },
        {
          value1: "试验结果"
        },
        {
          value1: "相位",
          value2: "A相",
          value3: "B相",
          value4: "C相"
        },
        {
          value1: "背景噪声",
          value2: `<input id="zsa" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`,
          value3: `<input id="zsb" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`,
          value4: `<input id="zsc" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`
        },
        {
          value1: "1.0U0（峰值电压 kV）",
          value2: `<input id="fya" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`,
          value3: `<input id="fyb" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`,
          value4: `<input id="fyc" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`
        },
        {
          value1: "1.4U0（峰值电压 kV）",
          value2: `<input id="fysa" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`,
          value3: `<input id="fysb" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`,
          value4: `<input id="fysc" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`
        },
        {
          value1: "电缆接头放电情况",
          value2: `<input id="jtfda" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`,
          value3: `<input id="jtfdb" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`,
          value4: `<input id="jtfdc" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`
        },
        {
          value1: "本体放电情况",
          value2: `<input id="btfda" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`,
          value3: `<input id="btfdb" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`,
          value4: `<input id="btfdc" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`
        },
        {
          value1: "终端位置放电情况",
          value2: `<input id="zdfda" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`,
          value3: `<input id="zdfdb" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`,
          value4: `<input id="zdfdc" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`
        },
        {
          value1: `结论：<input id="jl" class="jxgzsybg_11" readonly style="width: 90%" type="text" />`
        },
        {
          value1: `主管：<input id="zg" class="jxgzsybg_11" readonly style="width: 70%" type="text" />`,
          value2: `审核：<input id="sh" class="jxgzsybg_11" readonly style="width: 70%" type="text" />`,
          value3: `实验人员：<input id="syry" class="jxgzsybg_11" readonly style="width: 80%" type="text" />`
        }
      ]
    };
  },
  mounted() {
      this.getData()
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 6) {
        if (columnIndex == 0) {
          return [1, 4];
        }
        if (columnIndex == 1 || columnIndex == 2 || columnIndex == 3) {
          return [0, 0];
        }
      }
      if (columnIndex == 2) {
        if (rowIndex == 15) {
          return [1, 2];
        }
      }
      if (rowIndex == 14) {
        if (columnIndex == 0) {
          return [1, 4];
        }
      }
    },
    // 设置table样式
    addClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 15) {
        if (columnIndex == 2) {
          return "textLeft";
        }
      }
      if (rowIndex == 6) {
        if (columnIndex == 0) {
          return "textCenter";
        }
      }
      if (rowIndex == 14) {
        if (columnIndex == 0) {
          return "textLeft";
        }
      }
    },
    // 回显报告数据
    getData() {
      getjbfdReport(this.$qs.stringify({ jobtaskid: this.jobtaskid })).then(
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
            var arr1 = data.tyrq.split('-')
            document.getElementById("tyrq1").value = arr1[0]
            document.getElementById("tyrq2").value = arr1[1]
            document.getElementById("tyrq3").value = arr1[2]
          
            document.getElementById("dlcj").value = data.dlcj
            document.getElementById("dlxh").value = data.dlxh
            document.getElementById("dlqyd").value = data.dlqyd
            document.getElementById("dljtsl").value = data.dljtsl
            document.getElementById("syyq").value = data.syyq
            document.getElementById("qtjcyq").value = data.qtjcyq
            document.getElementById("zsa").value = data.zsa
            document.getElementById("zsb").value = data.zsb
            document.getElementById("zsc").value = data.zsc
            document.getElementById("fya").value = data.fya
            document.getElementById("fyb").value = data.fyb
            document.getElementById("fyc").value = data.fyc
            document.getElementById("fysa").value = data.fysa
            document.getElementById("fysb").value = data.fysb
            document.getElementById("fysc").value = data.fysc
            document.getElementById("jtfda").value = data.jtfda
            document.getElementById("jtfdb").value = data.jtfdb
            document.getElementById("jtfdc").value = data.jtfdc
            document.getElementById("btfda").value = data.btfda
            document.getElementById("btfdb").value = data.btfdb
            document.getElementById("btfdc").value = data.btfdc
            document.getElementById("zdfda").value = data.zdfda
            document.getElementById("zdfdb").value = data.zdfdb
            document.getElementById("zdfdc").value = data.zdfdc
            document.getElementById("jl").value = data.jl
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
    aaaa(e) {
        var a = e.target.title
        a = e.target.value
        e.target.title = e.target.value
    }
  }
};
</script>

<style lang="scss" scope>
.textCenter .cell {
  text-align: center;
}
.textCenter .cell {
  text-align: left;
}
#bbb {
  width: 40px;
}
#ccc {
  width: 40px;
}
</style>