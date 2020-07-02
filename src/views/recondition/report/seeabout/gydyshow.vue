<template>
  <!-- 电缆护层电流、感应电压检测试验报告 -->
  <div>
    <el-dialog
      :visible.sync="showDialog"
      :title="`${$dl}护层电流、感应电压检测试验报告`"
      :center="true"
      top="5vh"
      width="60%"
      v-dialogDrag
      :before-close="handleClose"
    >
      <div class="table">
        <el-table
          :data="tableData"
          :show-header="status"
          border
          style="width:100%"
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
          <el-table-column prop="value9" align="left">
            <template slot-scope="scope">
              <div v-html="scope.row.value9" @mousemove="aaaa"></div>
            </template>
          </el-table-column>
          <el-table-column prop="value10" align="left">
            <template slot-scope="scope">
              <div v-html="scope.row.value10" @mousemove="aaaa"></div>
            </template>
          </el-table-column>
          <el-table-column prop="value11" align="left">
            <template slot-scope="scope">
              <div v-html="scope.row.value11" @mousemove="aaaa"></div>
            </template>
          </el-table-column>
        </el-table>
        <!-- {{jobtaskid}}
      <br />
        {{testreporttype}}-->
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
  hcgyReportAdd,
  hcgyReportList,
  hcgyReportEdit
} from "@/api/recondition/hc";
import {getjlnyReport,edit} from '@/api/recondition/jobtask'
import {
  getzldzReport,
  editzldzReport,
  getLineGroup,
  getnextuser,
  getData,
  addzldzReport
} from "@/api/recondition/jobtask";
export default {
  props: {
    jobtaskid1: "",
    sfsyys1: ""
  },
  data() {
    return {
      sfsyys: this.sfsyys1,
      bgid: "",
      showDialog: true,
      form: {
        objId: this.jobtaskid1,
        testreporttype: this.testreporttype,
        syclr: ""
      },
      jobtaskid: this.jobtaskid1,
      status: false,
      selection: {
        ysbz: [],
        ysr: []
      },
      rowIndex1: [1, 2, 3],
      rowIndex2: [],
      rowIndex3: [4, 5],
      rowIndex4: [2, 3, 4, 5, 6, 7, 8, 9, 10],

      tableData: [
        {
          value1: `天气：<input id="tq" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `温度：<input id="wd" readonly class="jxgzsybg_11" style="width:70%" type="text"/>℃`,
          value3: `湿度：<input id="sd" readonly class="jxgzsybg_11" style="width:60%" type="text"/>%`,
          value4: `试验日期：<input id="syrq1" readonly class="jxgzsybg_11" style="width:40px" type="text"/>年<input class="jxgzsybg_11" id="syrq2" style="width:20px" type="text"/>月<input class="jxgzsybg_11" id="syrq3" style="width:20px" type="text"/>日`
        },
        {
          value1: `检测单位：<input id="jcdw" readonly class="jxgzsybg_11" style="width:80%" type="text"/>`,
          value2: `试验性质：<input id="syxz" readonly class="jxgzsybg_11" style="width:80%" type="text"/>`
        },
        {
          value1:
            this.$xl +
            `名称：<input id="xlmc" readonly class="jxgzsybg_11" style="width:80%" type="text"/>`,
          value2: `实时载流量：<input id="sszll" readonly class="jxgzsybg_11" style="width:75%" type="text"/>`
        },
        {
          value1: `接地电流检测仪器：<input id="jddljcyq" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `感应电压检测仪器：<input id="gydyjcyq" readonly class="jxgzsybg_11" style="width:65%" type="text"/>`
        },
        {
          value1: "接地箱/互联箱编号",
          value2: "接地极接地电流（A）",
          value3: "护层过电压限制器两侧感应电压（V）",
          value4: "金属护层接地电流（A）"
        },
        {
          value1: "",
          value2: "",
          value3: "A相",
          value4: "B相",
          value5: "C相",
          value6: "A相",
          value7: "B相",
          value8: "C相",
          value9: "AC",
          value10: "BA",
          value11: "CB"
        },
        {
          value1: `<input id="xbh0" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `<input id="dl0" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="dya0" readonly readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dyb0" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `<input id="dyc0" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value6: `<input id="dla0" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value7: `<input id="dlb0" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value8: `<input id="dlc0" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value9: `<input id="dlac0" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value10: `<input id="dlba0" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value11: `<input id="dlcb0" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `<input id="xbh1" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `<input id="dl1" readonlyclass="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="dya1"  readonlyclass="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dyb1" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `<input id="dyc1" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value6: `<input id="dla1" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value7: `<input id="dlb1" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value8: `<input id="dlc1" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value9: `<input id="dlac1" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value10: `<input id="dlba1" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value11: `<input id="dlcb1" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `<input id="xbh2" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `<input id="dl2" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="dya2" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dyb2" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `<input id="dyc2" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value6: `<input id="dla2" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value7: `<input id="dlb2" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value8: `<input id="dlc2" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value9: `<input id="dlac2" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value10: `<input id="dlba2" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value11: `<input id="dlcb2" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `<input id="xbh3" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `<input id="dl3" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="dya3" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dyb3" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `<input id="dyc3" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value6: `<input id="dla3" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value7: `<input id="dlb3" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value8: `<input id="dlc3" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value9: `<input id="dlac3" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value10: `<input id="dlba3" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value11: `<input id="dlcb3" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `<input id="xbh4" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `<input id="dl4" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="dya4" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dyb4" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `<input id="dyc4" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value6: `<input id="dla4" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value7: `<input id="dlb4" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value8: `<input id="dlc4" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value9: `<input id="dlac4" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value10: `<input id="dlba4" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value11: `<input id="dlcb4" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `<input id="xbh5" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `<input id="dl5" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="dya5" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dyb5" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `<input id="dyc5" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value6: `<input id="dla5" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value7: `<input id="dlb5" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value8: `<input id="dlc5" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value9: `<input id="dlac5" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value10: `<input id="dlba5" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value11: `<input id="dlcb5" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `<input id="xbh6" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `<input id="dl6" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="dya6" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dyb6" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `<input id="dyc6" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value6: `<input id="dla6" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value7: `<input id="dlb6" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value8: `<input id="dlc6" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value9: `<input id="dlac6" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value10: `<input id="dlba6" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value11: `<input id="dlcb6" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `<input id="xbh7" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `<input id="dl7" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="dya7" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dyb7" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `<input id="dyc7" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value6: `<input id="dla7" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value7: `<input id="dlb7" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value8: `<input id="dlc7" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value9: `<input id="dlac7" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value10: `<input id="dlba7" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value11: `<input id="dlcb7" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `<input id="xbh8" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `<input id="dl8" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="dya8" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dyb8" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `<input id="dyc8" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value6: `<input id="dla8" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value7: `<input id="dlb8" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value8: `<input id="dlc8" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value9: `<input id="dlac8" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value10: `<input id="dlba8" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value11: `<input id="dlcb8" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
          {
          value1: `<input id="xbh9" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `<input id="dl9" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="dya9" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dyb9" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `<input id="dyc9" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value6: `<input id="dla9" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value7: `<input id="dlb9" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value8: `<input id="dlc9" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value9: `<input id="dlac9" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value10: `<input id="dlba9" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value11: `<input id="dlcb9" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `试验结论：<input id="syjl" readonly class="jxgzsybg_11" style="width:90%" type="text"/>`
        },
        {
          value1: `主管：<input id="zg" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `审核：<input id="sh" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `实验人员：<input id="syry" readonly class="jxgzsybg_11" style="width:68%" type="text"/>`
        }
      ]
    };
  },
  mounted() {
    // this.getSelectionList();
    this.getData();
  },
  methods: {
    handleInput(val) {
      console.log(val);
    },
    getysr() {
      getnextuser(this.$qs.stringify({ groupid: this.form.syclbz })).then(
        res => {
          this.selection.ysr = res.data.rows;
        }
      );
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
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 3) {
          return [1, 3];
        }
        if (columnIndex === 2) {
          return [1, 2];
        }
      }
      if (this.rowIndex1.indexOf(rowIndex) != -1) {
        if (columnIndex === 0 || columnIndex === 1) {
          return [1, 6];
        }
      }
      if (rowIndex == 4) {
        if (columnIndex == 2) {
          return [1, 3];
        }
        if (columnIndex == 3) {
          return [1, 6];
        }
      }
      if (rowIndex == 16) {
        if (columnIndex == 0) {
          return [1, 11];
        }
      }
      if (rowIndex == 17) {
        if (columnIndex == 0||columnIndex == 1||columnIndex == 2) {
          return [1, 4];
        }
      
      }
      if (columnIndex == 0 || columnIndex == 1) {
        if (rowIndex == 4) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else if (rowIndex == 5) {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    // 回显报告数据
    getData() {
      hcgyReportList({ jobtaskid: this.jobtaskid })
        .then(result => {
          console.log("result :>> ", result.data.rows[0]);
          if (result.data.rows[0]) {
            let data = result.data.rows[0];
            let jl = JSON.parse(data.jl);
            console.log("jl :>> ", jl);
            console.log('data.syrq :>> ', data.syrq);
           document.getElementById("tq").value = data.tq; //天气：
            document.getElementById("wd").value = data.wd; //温度：
            document.getElementById("sd").value = data.sd; //湿度：
            if(data.sryq !== null && data.sryq !== '' && data.sryq !== undefined) {
              var arr = data.syrq.split("-");

            document.getElementById("syrq1").value = arr[0];

            document.getElementById("syrq2").value = arr[1];

            document.getElementById("syrq3").value = arr[2].substring(0, 2); //试验日期
            }
            
            document.getElementById("jcdw").value = data.jcdw; //检测单位
            document.getElementById("syxz").value = data.syxz; //试验性质
            document.getElementById("xlmc").value = data.xlmc; //this.$xl名称
            document.getElementById("sszll").value = data.sszll; //实时载流量
            document.getElementById("jddljcyq").value = data.jddljcyq; //接地电流检测仪器
            document.getElementById("gydyjcyq").value = data.gydyjcyq; //感应电压检测仪器
            
            document.getElementById("xbh0").value = jl[0].xbh; //接地箱/互联箱编号
            document.getElementById("dl0").value = jl[0].dl; //接地极接地电流（A）
            document.getElementById("dya0").value = jl[0].dya; //护层过电压限制器两侧感应电压
            document.getElementById("dyb0").value = jl[0].dyb; // b
            document.getElementById("dyc0").value = jl[0].dyc; //c
            document.getElementById("dlac0").value = jl[0].dlac; //dlac
            document.getElementById("dlba0").value = jl[0].dlba; //dlba
            document.getElementById("dlcb0").value = jl[0].dlcb; //dlcb
            document.getElementById("dla0").value = jl[0].dla; //dlcb
            document.getElementById("dlb0").value = jl[0].dlb; //dlcb
            document.getElementById("dlc0").value = jl[0].dlc; //dlcb

            document.getElementById("xbh1").value = jl[1].xbh; //接地箱/互联箱编号
            document.getElementById("dl1").value = jl[1].dl; //接地极接地电流（A）
            document.getElementById("dya1").value = jl[1].dya; //护层过电压限制器两侧感应电压
            document.getElementById("dyb1").value = jl[1].dyb; // b
            document.getElementById("dyc1").value = jl[1].dyc; //c
            document.getElementById("dlac1").value = jl[1].dlac; //dlac
            document.getElementById("dlba1").value = jl[1].dlba; //dlba
            document.getElementById("dlcb1").value = jl[1].dlcb; //dlcb
            document.getElementById("dla1").value = jl[1].dla; //dlcb
            document.getElementById("dlb1").value = jl[1].dlb; //dlcb
            document.getElementById("dlc1").value = jl[1].dlc; //dlcb

            document.getElementById("xbh2").value = jl[2].xbh; //接地箱/互联箱编号
            document.getElementById("dl2").value = jl[2].dl; //接地极接地电流（A）
            document.getElementById("dya2").value = jl[2].dya; //护层过电压限制器两侧感应电压
            document.getElementById("dyb2").value = jl[2].dyb; // b
            document.getElementById("dyc2").value = jl[2].dyc; //c
            document.getElementById("dlac2").value = jl[2].dlac; //dlac
            document.getElementById("dlba2").value = jl[2].dlba; //dlba
            document.getElementById("dlcb2").value = jl[2].dlcb; //dlcb
            document.getElementById("dla2").value = jl[2].dla; //dlcb
            document.getElementById("dlb2").value = jl[2].dlb; //dlcb
            document.getElementById("dlc2").value = jl[2].dlc; //dlcb

            document.getElementById("xbh3").value = jl[3].xbh; //接地箱/互联箱编号
            document.getElementById("dl3").value = jl[3].dl; //接地极接地电流（A）
            document.getElementById("dya3").value = jl[3].dya; //护层过电压限制器两侧感应电压
            document.getElementById("dyb3").value = jl[3].dyb; // b
            document.getElementById("dyc3").value = jl[3].dyc; //c
            document.getElementById("dlac3").value = jl[3].dlac; //dlac
            document.getElementById("dlba3").value = jl[3].dlba; //dlba
            document.getElementById("dlcb3").value = jl[3].dlcb; //dlcb
            document.getElementById("dla3").value = jl[3].dla; //dlcb
            document.getElementById("dlb3").value = jl[3].dlb; //dlcb
            document.getElementById("dlc3").value = jl[3].dlc; //dlcb

            document.getElementById("xbh4").value = jl[4].xbh; //接地箱/互联箱编号
            document.getElementById("dl4").value = jl[4].dl; //接地极接地电流（A）
            document.getElementById("dya4").value = jl[4].dya; //护层过电压限制器两侧感应电压
            document.getElementById("dyb4").value = jl[4].dyb; // b
            document.getElementById("dyc4").value = jl[4].dyc; //c
            document.getElementById("dlac4").value = jl[4].dlac; //dlac
            document.getElementById("dlba4").value = jl[4].dlba; //dlba
            document.getElementById("dlcb4").value = jl[4].dlcb; //dlcb
            document.getElementById("dla4").value = jl[4].dla; //dlcb
            document.getElementById("dlb4").value = jl[4].dlb; //dlcb
            document.getElementById("dlc4").value = jl[4].dlc; //dlcb

            document.getElementById("xbh5").value = jl[5].xbh; //接地箱/互联箱编号
            document.getElementById("dl5").value = jl[5].dl; //接地极接地电流（A）
            document.getElementById("dya5").value = jl[5].dya; //护层过电压限制器两侧感应电压
            document.getElementById("dyb5").value = jl[5].dyb; // b
            document.getElementById("dyc5").value = jl[5].dyc; //c
            document.getElementById("dlac5").value = jl[5].dlac; //dlac
            document.getElementById("dlba5").value = jl[5].dlba; //dlba
            document.getElementById("dlcb5").value = jl[5].dlcb; //dlcb
            document.getElementById("dla5").value = jl[5].dla; //dlcb
            document.getElementById("dlb5").value = jl[5].dlb; //dlcb
            document.getElementById("dlc5").value = jl[5].dlc; //dlcb

            document.getElementById("xbh6").value = jl[6].xbh; //接地箱/互联箱编号
            document.getElementById("dl6").value = jl[6].dl; //接地极接地电流（A）
            document.getElementById("dya6").value = jl[6].dya; //护层过电压限制器两侧感应电压
            document.getElementById("dyb6").value = jl[6].dyb; // b
            document.getElementById("dyc6").value = jl[6].dyc; //c
            document.getElementById("dlac6").value = jl[6].dlac; //dlac
            document.getElementById("dlba6").value = jl[6].dlba; //dlba
            document.getElementById("dlcb6").value = jl[6].dlcb; //dlcb
            document.getElementById("dla6").value = jl[6].dla; //dlcb
            document.getElementById("dlb6").value = jl[6].dlb; //dlcb
            document.getElementById("dlc6").value = jl[6].dlc; //dlcb

            document.getElementById("xbh7").value = jl[7].xbh; //接地箱/互联箱编号
            document.getElementById("dl7").value = jl[7].dl; //接地极接地电流（A）
            document.getElementById("dya7").value = jl[7].dya; //护层过电压限制器两侧感应电压
            document.getElementById("dyb7").value = jl[7].dyb; // b
            document.getElementById("dyc7").value = jl[7].dyc; //c
            document.getElementById("dlac7").value = jl[7].dlac; //dlac
            document.getElementById("dlba7").value = jl[7].dlba; //dlba
            document.getElementById("dlcb7").value = jl[7].dlcb; //dlcb
            document.getElementById("dla7").value = jl[7].dla; //dlcb
            document.getElementById("dlb7").value = jl[7].dlb; //dlcb
            document.getElementById("dlc7").value = jl[7].dlc; //dlcb

            document.getElementById("xbh8").value = jl[8].xbh; //接地箱/互联箱编号
            document.getElementById("dl8").value = jl[8].dl; //接地极接地电流（A）
            document.getElementById("dya8").value = jl[8].dya; //护层过电压限制器两侧感应电压
            document.getElementById("dyb8").value = jl[8].dyb; // b
            document.getElementById("dyc8").value = jl[8].dyc; //c
            document.getElementById("dlac8").value = jl[8].dlac; //dlac
            document.getElementById("dlba8").value = jl[8].dlba; //dlba
            document.getElementById("dlcb8").value = jl[8].dlcb; //dlcb
            document.getElementById("dla8").value = jl[8].dla; //dlcb
            document.getElementById("dlb8").value = jl[8].dlb; //dlcb
            document.getElementById("dlc8").value = jl[8].dlc; //dlcb

            document.getElementById("xbh9").value = jl[9].xbh; //接地箱/互联箱编号
            document.getElementById("dl9").value = jl[9].dl; //接地极接地电流（A）
            document.getElementById("dya9").value = jl[9].dya; //护层过电压限制器两侧感应电压
            document.getElementById("dyb9").value = jl[9].dyb; // b
            document.getElementById("dyc9").value = jl[9].dyc; //c
            document.getElementById("dlac9").value = jl[9].dlac; //dlac
            document.getElementById("dlba9").value = jl[9].dlba; //dlba
            document.getElementById("dlcb9").value = jl[9].dlcb; //dlcb
            document.getElementById("dla9").value = jl[9].dla; //dlcb
            document.getElementById("dlb9").value = jl[9].dlb; //dlcb
            document.getElementById("dlc9").value = jl[9].dlc; //dlcb

            document.getElementById("syjl").value = data.syjl;

            document.getElementById("zg").value = data.zg;
            document.getElementById("sh").value = data.sh;
            document.getElementById("syry").value = data.syry;
            this.bgid = data.id; // 报告id
            getData(this.$qs.stringify({ objId: this.jobtaskid })).then(res => {
              console.log("班组res :>> ", res);
              this.form.syclbz = res.data.rows[0].syclbz;
              this.form.syclr = res.data.rows[0].syclr;
              this.getysr();
            });
          }
        })
        .catch(err => {});
    },
    /**不同意 */
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
    // 设置table样式
    addClass({ row, column, rowIndex, columnIndex }) {
      // if (rowIndex==4&&columnIndex==2) {
      if (this.rowIndex3.indexOf(rowIndex) != -1) {
        if (this.rowIndex4.indexOf(columnIndex) != -1) {
          return "textCenter";
        }
      }
    },
    /**input框title */
    aaaa(e) {
      var a = e.target.title;
      a = e.target.value;
      if (e.target.value) {
        e.target.title = e.target.value;
      }
    },
    // 同意
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
    /**关闭按钮 */
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
    }
  }
};
</script>

<style>
.textCenter .cell {
  text-align: center;
}
</style>