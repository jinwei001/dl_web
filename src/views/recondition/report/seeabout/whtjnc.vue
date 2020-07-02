<template>
  <!-- dl外护套及内衬层试验报告 -->
  <div>
    <el-dialog
      :visible.sync="showDialog"
      :title="`${$dl}外护套及内衬层试验报告`"
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
    <!-- <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="save">同意</el-button>
        <el-button class="onSearch" @click="handleClose">不同意</el-button>
    </div>-->
    </el-dialog>
  </div>
</template>

<script>
import {
  whtncReportAdd,
  whtncReportList,
  whtncReportEdit
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

      tableData: [
        {
          value1: `天气：<input readonly id="tq" class="jxgzsybg_11" style="width:40%" type="text"/>`,
          value2: `温度：<input readonly id="wd" class="jxgzsybg_11" style="width:70%" type="text"/>℃`,
          value3: `湿度：<input readonly id="sd" class="jxgzsybg_11" style="width:60%" type="text"/>%`,
          value4: `试验日期：<input readonly id="syrq1" class="jxgzsybg_11" style="width:40px" type="text"/>年<input class="jxgzsybg_11" id="syrq2" style="width:20px" type="text"/>月<input class="jxgzsybg_11" id="syrq3" style="width:20px" type="text"/>日`
        },
        {
          value1: `检测单位：<input readonly id="jcdw" class="jxgzsybg_11" style="width:75%" type="text"/>`,
          value2: `试验性质：<input readonly id="syxz" class="jxgzsybg_11" style="width:80%" type="text"/>`
        },
        {
          value1:
            this.$xl +
            `名称：<input id="xlmc" readonly class="jxgzsybg_11" style="width:75%" type="text"/>`,
          value2: `绝缘电阻检测仪器：<input readonly id="jcyq" class="jxgzsybg_11" style="width:75%" type="text"/>`
        },
        {
          value1: `直流耐压试验仪器：<input readonly id="zlny" class="jxgzsybg_11" style="width:75%" type="text"/>`
        },
        {
          value1: `试验仪器：<input id="syyq" readonly class="jxgzsybg_11" style="width:75%" type="text"/>`
        },
        {
          value1: this.$dl + "段(km)",
          value2: "内衬层绝缘电阻（MΩ·km）",
          value3: "外护套绝缘电阻（MΩ·km）",
          value4: "外护套直流耐压（5kV/1min）",
          value5: "试验结论"
        },
        {
          value2: "A",
          value3: "B",
          value4: "C",
          value5: "A",
          value6: "B",
          value7: "C",
          value8: "A",
          value9: "B",
          value10: "C"
        },
        {
          value1: `<input id="xbh0" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `<input id="dl0" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="dya0" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
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
          value2: `<input id="dl1" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="dya1" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
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
          value4: `<input id="dyb3" class="jxgzsybg_11" style="width:70%" type="text"/>`,
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
          value5: `<input id="dyc6" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value6: `<input id="dla6" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value7: `<input id="dlb6" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value8: `<input id="dlc6" readonly class="jxgzsybg_11" style="width:70%" type="text"/>`,
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
          value1: `<input id="xbh9" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `<input id="dl9" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="dya9" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dyb9" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `<input id="dyc9" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value6: `<input id="dla9" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value7: `<input id="dlb9" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value8: `<input id="dlc9" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value9: `<input id="dlac9" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value10: `<input id="dlba9" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value11: `<input id="dlcb9" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `备注：<input id="bz" class="jxgzsybg_11" style="width:90%" type="text"/>`
        },
        {
          value1: `主管：<input id="zg" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `审核：<input id="sh" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `试验人员：<input id="syry" class="jxgzsybg_11" style="width:68%" type="text"/>`
        }
      ]
    };
  },
  mounted() {
    // this.getSelectionList();
    this.getData();
  },
  methods: {
    /**input框title */
    aaaa(e) {
      var a = e.target.title;
      a = e.target.value;
      if (e.target.value) {
        e.target.title = e.target.value;
      }
    },
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
    // // 获取下拉框
    // getSelectionList() {
    //   getLineGroup().then(res => {
    //     this.selection.ysbz = res.data.rows;
    //   });
    //   getnextuser().then(res => {
    //     this.selection.ysr = res.data.rows;
    //   });
    // },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        if (columnIndex == 1 || columnIndex == 2) {
          return [1, 3];
        }
        if (columnIndex == 3) {
          return [1, 4];
        }
      }
      if (rowIndex == 1 || rowIndex == 2) {
        if (columnIndex == 0) {
          return [1, 4];
        }
        if (columnIndex == 1) {
          return [1, 7];
        }
      }
      if (rowIndex == 3) {
        if (columnIndex == 0) {
          return [1, 11];
        }
      }
      if (rowIndex == 4) {
        if (columnIndex == 0) {
          return [1, 11];
        }
      }
      if (columnIndex == 0) {
        if (rowIndex == 5) {
          return {
            rowspan: 2,
            colspan: 1
          };
        }
        if (rowIndex == 6) {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      if (columnIndex == 4) {
        if (rowIndex == 5) {
          return {
            rowspan: 2,
            colspan: 1
          };
        }
      }
      if (rowIndex == 5) {
        if (columnIndex == 1 || columnIndex == 2 || columnIndex == 3) {
          return [1, 3];
        }
      }
      // 备注需要判断中间list长度来获取rowIndex
      if (rowIndex == 17) {
        if (columnIndex == 0) {
          return [1, 11];
        }
      }
      if (rowIndex == 18) {
        if (columnIndex == 0 || columnIndex == 1) {
          return [1, 3];
        }
        if (columnIndex == 2) {
          return [1, 5];
        }
      }
    },
    // 回显报告数据
    getData() {
      whtncReportList({ jobtaskid: this.jobtaskid })
        .then(result => {
          console.log("result :>> ", result.data.rows[0]);
          if (result.data.rows[0]) {
            let data = result.data.rows[0];
            let jl = JSON.parse(data.jl);
            console.log("jl :>> ", jl);

            document.getElementById("tq").value = data.tq; //天气：
            document.getElementById("wd").value = data.wd; //温度：
            document.getElementById("sd").value = data.sd; //湿度：
            var arr = data.syrq.split("-");

            document.getElementById("syrq1").value = arr[0];

            document.getElementById("syrq2").value = arr[1];

            document.getElementById("syrq3").value = arr[2].substring(0, 2); //试验日期
            document.getElementById("jcdw").value = data.jcdw; //检测单位
            document.getElementById("syxz").value = data.syxz; //试验性质
            document.getElementById("xlmc").value = data.xlmc; //this.$xl名称
            document.getElementById("jcyq").value = data.jcyq; //接地电流检测仪器
            document.getElementById("zlny").value = data.zlny; //直流耐压试验仪器：
            document.getElementById("syyq").value = data.syyq; //试验仪器：

            document.getElementById("xbh0").value = jl[0].dld; //1
            document.getElementById("dl0").value = jl[0].ndza; //2
            document.getElementById("dya0").value = jl[0].ndzb; //3
            document.getElementById("dyb0").value = jl[0].ndzc; //4
            document.getElementById("dyc0").value = jl[0].wdza; //5
            document.getElementById("dlac0").value = jl[0].znyb; //9
            document.getElementById("dlba0").value = jl[0].znyc; //10
            document.getElementById("dlcb0").value = jl[0].syjl; //11
            document.getElementById("dla0").value = jl[0].wdzb; // 6
            document.getElementById("dlb0").value = jl[0].wdzc; //7
            document.getElementById("dlc0").value = jl[0].znya; //8

            document.getElementById("xbh1").value = jl[1].dld; //接地箱/互联箱编号
            document.getElementById("dl1").value = jl[1].ndza; //接地极接地电流（A）
            document.getElementById("dya1").value = jl[1].ndzb; //护层过电压限制器两侧感应电压
            document.getElementById("dyb1").value = jl[1].ndzc; // b
            document.getElementById("dyc1").value = jl[1].wdza; //c
            document.getElementById("dlac1").value = jl[1].znyb; //dlac
            document.getElementById("dlba1").value = jl[1].znyc; //dlba
            document.getElementById("dlcb1").value = jl[1].syjl; //dlcb
            document.getElementById("dla1").value = jl[1].wdzb; //dlcb
            document.getElementById("dlb1").value = jl[1].wdzc; //dlcb
            document.getElementById("dlc1").value = jl[1].znya; //dlcb

            document.getElementById("xbh2").value = jl[2].dld; //接地箱/互联箱编号
            document.getElementById("dl2").value = jl[2].ndza; //接地极接地电流（A）
            document.getElementById("dya2").value = jl[2].ndzb; //护层过电压限制器两侧感应电压
            document.getElementById("dyb2").value = jl[2].ndzc; // b
            document.getElementById("dyc2").value = jl[2].wdza; //c
            document.getElementById("dlac2").value = jl[2].znyb; //dlac
            document.getElementById("dlba2").value = jl[2].znyc; //dlba
            document.getElementById("dlcb2").value = jl[2].syjl; //dlcb
            document.getElementById("dla2").value = jl[2].wdzb; //dlcb
            document.getElementById("dlb2").value = jl[2].wdzc; //dlcb
            document.getElementById("dlc2").value = jl[2].znya; //dlcb

            document.getElementById("xbh3").value = jl[3].dld; //接地箱/互联箱编号
            document.getElementById("dl3").value = jl[3].ndza; //接地极接地电流（A）
            document.getElementById("dya3").value = jl[3].ndzb; //护层过电压限制器两侧感应电压
            document.getElementById("dyb3").value = jl[3].ndzc; // b
            document.getElementById("dyc3").value = jl[3].wdza; //c
            document.getElementById("dlac3").value = jl[3].znyb; //dlac
            document.getElementById("dlba3").value = jl[3].znyc; //dlba
            document.getElementById("dlcb3").value = jl[3].syjl; //dlcb
            document.getElementById("dla3").value = jl[3].wdzb; //dlcb
            document.getElementById("dlb3").value = jl[3].wdzc; //dlcb
            document.getElementById("dlc3").value = jl[3].znya; //dlcb

            document.getElementById("xbh4").value = jl[4].dld; //接地箱/互联箱编号
            document.getElementById("dl4").value = jl[4].ndza; //接地极接地电流（A）
            document.getElementById("dya4").value = jl[4].ndzb; //护层过电压限制器两侧感应电压
            document.getElementById("dyb4").value = jl[4].ndzc; // b
            document.getElementById("dyc4").value = jl[4].wdza; //c
            document.getElementById("dlac4").value = jl[4].znyb; //dlac
            document.getElementById("dlba4").value = jl[4].znyc; //dlba
            document.getElementById("dlcb4").value = jl[4].syjl; //dlcb
            document.getElementById("dla4").value = jl[4].wdzb; //dlcb
            document.getElementById("dlb4").value = jl[4].wdzc; //dlcb
            document.getElementById("dlc4").value = jl[4].znya; //dlcb

            document.getElementById("xbh5").value = jl[5].dld; //接地箱/互联箱编号
            document.getElementById("dl5").value = jl[5].ndza; //接地极接地电流（A）
            document.getElementById("dya5").value = jl[5].ndzb; //护层过电压限制器两侧感应电压
            document.getElementById("dyb5").value = jl[5].ndzc; // b
            document.getElementById("dyc5").value = jl[5].wdza; //c
            document.getElementById("dlac5").value = jl[5].znyb; //dlac
            document.getElementById("dlba5").value = jl[5].znyc; //dlba
            document.getElementById("dlcb5").value = jl[5].syjl; //dlcb
            document.getElementById("dla5").value = jl[5].wdzb; //dlcb
            document.getElementById("dlb5").value = jl[5].wdzc; //dlcb
            document.getElementById("dlc5").value = jl[5].znya; //dlcb

            document.getElementById("xbh6").value = jl[6].dld; //接地箱/互联箱编号
            document.getElementById("dl6").value = jl[6].ndza; //接地极接地电流（A）
            document.getElementById("dya6").value = jl[6].ndzb; //护层过电压限制器两侧感应电压
            document.getElementById("dyb6").value = jl[6].ndzc; // b
            document.getElementById("dyc6").value = jl[6].wdza; //c
            document.getElementById("dlac6").value = jl[6].znyb; //dlac
            document.getElementById("dlba6").value = jl[6].znyc; //dlba
            document.getElementById("dlcb6").value = jl[6].syjl; //dlcb
            document.getElementById("dla6").value = jl[6].wdzb; //dlcb
            document.getElementById("dlb6").value = jl[6].wdzc; //dlcb
            document.getElementById("dlc6").value = jl[6].znya; //dlcb

            document.getElementById("xbh7").value = jl[7].dld; //接地箱/互联箱编号
            document.getElementById("dl7").value = jl[7].ndza; //接地极接地电流（A）
            document.getElementById("dya7").value = jl[7].ndzb; //护层过电压限制器两侧感应电压
            document.getElementById("dyb7").value = jl[7].ndzc; // b
            document.getElementById("dyc7").value = jl[7].wdza; //c
            document.getElementById("dlac7").value = jl[7].znyb; //dlac
            document.getElementById("dlba7").value = jl[7].znyc; //dlba
            document.getElementById("dlcb7").value = jl[7].syjl; //dlcb
            document.getElementById("dla7").value = jl[7].wdzb; //dlcb
            document.getElementById("dlb7").value = jl[7].wdzc; //dlcb
            document.getElementById("dlc7").value = jl[7].znya; //dlcb

            document.getElementById("xbh8").value = jl[8].dld; //接地箱/互联箱编号
            document.getElementById("dl8").value = jl[8].ndza; //接地极接地电流（A）
            document.getElementById("dya8").value = jl[8].ndzb; //护层过电压限制器两侧感应电压
            document.getElementById("dyb8").value = jl[8].ndzb; // b
            document.getElementById("dyc8").value = jl[8].wdza; //c
            document.getElementById("dlac8").value = jl[8].znyb; //dlac
            document.getElementById("dlba8").value = jl[8].znyc; //dlba
            document.getElementById("dlcb8").value = jl[8].syjl; //dlcb
            document.getElementById("dla8").value = jl[8].wdzb; //dlcb
            document.getElementById("dlb8").value = jl[8].wdzc; //dlcb
            document.getElementById("dlc8").value = jl[8].znya; //dlcb

            document.getElementById("xbh9").value = jl[9].dld; //接地箱/互联箱编号
            document.getElementById("dl9").value = jl[9].ndza; //接地极接地电流（A）
            document.getElementById("dya9").value = jl[9].ndzb; //护层过电压限制器两侧感应电压
            document.getElementById("dyb9").value = jl[9].wdza; // b
            document.getElementById("dyc9").value = jl[9].wdza; //c
            document.getElementById("dlac9").value = jl[9].znyb; //dlac
            document.getElementById("dlba9").value = jl[9].znyc; //dlba
            document.getElementById("dlcb9").value = jl[9].syjl; //dlcb
            document.getElementById("dla9").value = jl[9].wdzb; //dlcb
            document.getElementById("dlb9").value = jl[9].wdzc; //dlcb
            document.getElementById("dlc9").value = jl[9].znya; //dlcb

            document.getElementById("bz").value = data.bz;

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
    // 设置table样式
    addClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 4) {
        if (columnIndex == 1 || columnIndex == 2 || columnIndex == 3) {
          return "textCenter";
        }
      }
      if (rowIndex == 5) {
        if (
          columnIndex == 1 ||
          columnIndex == 2 ||
          columnIndex == 3 ||
          columnIndex == 4 ||
          columnIndex == 5 ||
          columnIndex == 6 ||
          columnIndex == 7 ||
          columnIndex == 8 ||
          columnIndex == 9 ||
          columnIndex == 10
        ) {
          return "textCenter";
        }
      }
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
    }
  }
};
</script>

<style>
.textCenter .cell {
  text-align: center;
}
</style>