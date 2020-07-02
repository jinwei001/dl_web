<template>
  <!-- dlxl接地系统试验报告 -->
  <div>
    <div class="respont-content" v-if="!isjhgl">
        <el-form>
          <el-col>
            <el-form-item style="float: left;">
                <el-button type="primary" @click="download" >
               下载
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    <!-- <el-dialog
      :visible.sync="showDialog"
      :title="`${$dl}${$xl}接地系统试验报告`"
      :center="true"
      top="5vh"
      v-dialogDrag
      :before-close="handleClose"
    >-->
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
      </el-table>
    </div>
    <el-form
      ref="dataForm"
      :model="form"
      label-position="left"
      style="width:100% ;margin: 10px auto;"
      v-if="isjhgl"
    >
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">验收班组：</label>
          <el-select
            v-model="form.syclbz"
            filterable
            clearable
            placeholder="请选择"
            @change="getysr()"
          >
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
          <el-select v-model="form.syclr" filterable clearable placeholder="请选择">
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
    <div slot="footer" class="dialog-footer" v-if="isjhgl">
      <p style="text-align: center">
        <el-button class="UserSearchFun" @click="save">确定</el-button>
        <el-button class="onSearch" @click="handleClose">取消</el-button>
      </p>
    </div>
    <!-- <div slot="footer" class="dialog-footer">
      <el-button class="UserSearchFun" @click="save">同意</el-button>
      <el-button class="onSearch" @click="handleClose">不同意</el-button>
    </div>-->
    <!-- </el-dialog> -->
  </div>
</template>

<script>
import {
  jdxtReportAdd,
  jdxtReportList,
  jdxtReportEdit
} from "@/api/recondition/hc";
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
    jobtaskid1: "",
    testreporttype: "",
    xlmcFn: "",
    xlidFn: "",
    isjhgl:{
      default:true,
      type:Boolean
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
      status: false,
      showDialog: true,
      tableData: [
        {
          value1: `天气：<input id="tq" class="jxgzsybg_11" style="width:45%" type="text"/>`,
          value2: `温度：<input id="wd" class="jxgzsybg_11" style="width:70%" type="text"/>℃`,
          value3: `湿度：<input id="sd" class="jxgzsybg_11" style="width:60%" type="text"/>%`,
          value4: `试验日期：<input id="syrq1" class="jxgzsybg_11" style="width:40px" type="text"/>年<input class="jxgzsybg_11" id="syrq2" style="width:20px" type="text"/>月<input class="jxgzsybg_11" id="syrq3" style="width:20px" type="text"/>日`
        },
        {
          value1: `检测单位：<input id="jcdw" class="jxgzsybg_11" style="width:80%" type="text"/>`,
          value2: `试验性质：<input id="syxz" class="jxgzsybg_11" style="width:80%" type="text"/>`
        },
        {
          value1:
            this.$xl +
            `名称：<input id="xlmc" class="jxgzsybg_11" style="width:80%" type="text"/>`,
          value2: `接触电阻检测仪器：<input id="jcdzjcyq" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `接地电阻检测仪器：<input id="jddzjcyq" class="jxgzsybg_11" style="width:65%" type="text"/>`,
          value2: `护层过电压限制器绝缘电阻检测仪器：<input id="hcjcyq" class="jxgzsybg_11" style="width:50%" type="text"/>`
        },

        {
          value1: "接地箱/互联箱编号",
          value2: "接地极接地电阻（Ω）",
          value3: "护层过电压限制器绝缘电阻（MΩ）",
          value4: "互联箱连接片接触电阻（μΩ）",
          value5: "互联箱连接片连接位置检查"
        },
        {
          value1: "A相",
          value2: "B相",
          value3: "C相",
          value4: "AC",
          value5: "BA",
          value6: "CB"
        },
        {
          value1: `<input id="xbh0" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `<input id="dl0" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="dya0" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dyb0" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `<input id="dyc0" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value6: `<input id="dla0" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value7: `<input id="dlb0" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value8: `<input id="dlc0" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value9: `<input id="dlac0" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `<input id="xbh1" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `<input id="dl1" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="dya1" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dyb1" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `<input id="dyc1" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value6: `<input id="dla1" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value7: `<input id="dlb1" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value8: `<input id="dlc1" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value9: `<input id="dlac1" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `<input id="xbh2" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `<input id="dl2" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="dya2" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dyb2" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `<input id="dyc2" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value6: `<input id="dla2" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value7: `<input id="dlb2" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value8: `<input id="dlc2" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value9: `<input id="dlac2" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `<input id="xbh3" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `<input id="dl3" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="dya3" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dyb3" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `<input id="dyc3" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value6: `<input id="dla3" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value7: `<input id="dlb3" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value8: `<input id="dlc3" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value9: `<input id="dlac3" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `<input id="xbh4" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `<input id="dl4" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="dya4" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dyb4" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `<input id="dyc4" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value6: `<input id="dla4" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value7: `<input id="dlb4" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value8: `<input id="dlc4" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value9: `<input id="dlac4" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `<input id="xbh5" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `<input id="dl5" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="dya5" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dyb5" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `<input id="dyc5" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value6: `<input id="dla5" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value7: `<input id="dlb5" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value8: `<input id="dlc5" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value9: `<input id="dlac5" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `<input id="xbh6" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `<input id="dl6" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="dya6" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dyb6" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `<input id="dyc6" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value6: `<input id="dla6" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value7: `<input id="dlb6" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value8: `<input id="dlc6" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value9: `<input id="dlac6" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `<input id="xbh7" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `<input id="dl7" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="dya7" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dyb7" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `<input id="dyc7" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value6: `<input id="dla7" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value7: `<input id="dlb7" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value8: `<input id="dlc7" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value9: `<input id="dlac7" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `<input id="xbh8" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `<input id="dl8" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="dya8" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="dyb8" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value5: `<input id="dyc8" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value6: `<input id="dla8" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value7: `<input id="dlb8" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value8: `<input id="dlc8" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value9: `<input id="dlac8" class="jxgzsybg_11" style="width:70%" type="text"/>`
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
          value9: `<input id="dlac9" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },

        {
          value1: `试验结论：<input id="syjl" class="jxgzsybg_11" style="width:90%" type="text"/>`
        },
        {
          value1: `主管：<input id="zg" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `审核：<input id="sh" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `实验人员：<input id="syry" class="jxgzsybg_11" style="width:68%" type="text"/>`
        }
      ],
          objId:null
    };
  },
  mounted() {
    this.getSelectionList();
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
        if (columnIndex == 1 || columnIndex == 2) {
          return [1, 3];
        }
        if (columnIndex == 3) {
          return [1, 4];
        }
      }
      if (rowIndex == 1 || rowIndex == 2 || rowIndex == 3) {
        if (columnIndex == 0) {
          return [1, 4];
        }
        if (columnIndex == 1) {
          return [1, 5];
        }
      }
      if (columnIndex == 0 || columnIndex == 1 || columnIndex == 4) {
        if (rowIndex == 4) {
          return {
            rowspan: 2,
            colspan: 1
          };
        }
      }
      if (rowIndex == 4) {
        if (columnIndex == 2 || columnIndex == 3) {
          return [1, 3];
        }
      }
      if (rowIndex == 16) {
        if (columnIndex == 0) {
          return [1, 9];
        }
      }
      if (rowIndex == 17) {
        if (columnIndex == 0) {
          return [1, 2];
        }
        if (columnIndex == 1) {
          return [1, 3];
        }
        if (columnIndex == 2) {
          return [1, 4];
        }
      }
    },
    // 回显报告数据
    getData() {
      jdxtReportList({ jobtaskid: this.jobtaskid })
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

            document.getElementById("jcdw").value = data.jcdw; //
            document.getElementById("syxz").value = data.syxz; //
            document.getElementById("xlmc").value = data.xlmc; //
            document.getElementById("jcdzjcyq").value = data.jcdzjcyq; //
            document.getElementById("jddzjcyq").value = data.jddzjcyq; //
            document.getElementById("hcjcyq").value = data.hcjcyq; //

            document.getElementById("xbh0").value = jl[0].dld; //1
            document.getElementById("dl0").value = jl[0].ndza; //2
            document.getElementById("dya0").value = jl[0].ndzb; //3
            document.getElementById("dyb0").value = jl[0].ndzc; //4
            document.getElementById("dyc0").value = jl[0].wdza; //5
            document.getElementById("dla0").value = jl[0].wdzb; // 6
            document.getElementById("dlb0").value = jl[0].wdzc; //7
            document.getElementById("dlc0").value = jl[0].znya; //8
            document.getElementById("dlac0").value = jl[0].znyb; //9

            document.getElementById("xbh1").value = jl[1].dld; //1
            document.getElementById("dl1").value = jl[1].ndza; //2
            document.getElementById("dya1").value = jl[1].ndzb; //3
            document.getElementById("dyb1").value = jl[1].ndzc; //4
            document.getElementById("dyc1").value = jl[1].wdza; //5
            document.getElementById("dla1").value = jl[1].wdzb; // 6
            document.getElementById("dlb1").value = jl[1].wdzc; //7
            document.getElementById("dlc1").value = jl[1].znya; //8
            document.getElementById("dlac1").value = jl[1].znyb; //9

            document.getElementById("xbh2").value = jl[2].dld; //1
            document.getElementById("dl2").value = jl[2].ndza; //2
            document.getElementById("dya2").value = jl[2].ndzb; //3
            document.getElementById("dyb2").value = jl[2].ndzc; //4
            document.getElementById("dyc2").value = jl[2].wdza; //5
            document.getElementById("dla2").value = jl[2].wdzb; // 6
            document.getElementById("dlb2").value = jl[2].wdzc; //7
            document.getElementById("dlc2").value = jl[2].znya; //8
            document.getElementById("dlac2").value = jl[2].znyb; //9

            document.getElementById("xbh3").value = jl[3].dld; //1
            document.getElementById("dl3").value = jl[3].ndza; //2
            document.getElementById("dya3").value = jl[3].ndzb; //3
            document.getElementById("dyb3").value = jl[3].ndzc; //4
            document.getElementById("dyc3").value = jl[3].wdza; //5
            document.getElementById("dla3").value = jl[3].wdzb; // 6
            document.getElementById("dlb3").value = jl[3].wdzc; //7
            document.getElementById("dlc3").value = jl[3].znya; //8
            document.getElementById("dlac3").value = jl[3].znyb; //9

            document.getElementById("xbh4").value = jl[4].dld; //1
            document.getElementById("dl4").value = jl[4].ndza; //2
            document.getElementById("dya4").value = jl[4].ndzb; //3
            document.getElementById("dyb4").value = jl[4].ndzc; //4
            document.getElementById("dyc4").value = jl[4].wdza; //5
            document.getElementById("dla4").value = jl[4].wdzb; // 6
            document.getElementById("dlb4").value = jl[4].wdzc; //7
            document.getElementById("dlc4").value = jl[4].znya; //8
            document.getElementById("dlac4").value = jl[4].znyb; //9

            document.getElementById("xbh5").value = jl[5].dld; //1
            document.getElementById("dl5").value = jl[5].ndza; //2
            document.getElementById("dya5").value = jl[5].ndzb; //3
            document.getElementById("dyb5").value = jl[5].ndzc; //4
            document.getElementById("dyc5").value = jl[5].wdza; //5
            document.getElementById("dla5").value = jl[5].wdzb; // 6
            document.getElementById("dlb5").value = jl[5].wdzc; //7
            document.getElementById("dlc5").value = jl[5].znya; //8
            document.getElementById("dlac5").value = jl[5].znyb; //9

            document.getElementById("xbh6").value = jl[6].dld; //1
            document.getElementById("dl6").value = jl[6].ndza; //2
            document.getElementById("dya6").value = jl[6].ndzb; //3
            document.getElementById("dyb6").value = jl[6].ndzc; //4
            document.getElementById("dyc6").value = jl[6].wdza; //5
            document.getElementById("dla6").value = jl[6].wdzb; // 6
            document.getElementById("dlb6").value = jl[6].wdzc; //7
            document.getElementById("dlc6").value = jl[6].znya; //8
            document.getElementById("dlac6").value = jl[6].znyb; //9

            document.getElementById("xbh7").value = jl[7].dld; //1
            document.getElementById("dl7").value = jl[7].ndza; //2
            document.getElementById("dya7").value = jl[7].ndzb; //3
            document.getElementById("dyb7").value = jl[7].ndzc; //4
            document.getElementById("dyc7").value = jl[7].wdza; //5
            document.getElementById("dla7").value = jl[7].wdzb; // 6
            document.getElementById("dlb7").value = jl[7].wdzc; //7
            document.getElementById("dlc7").value = jl[7].znya; //8
            document.getElementById("dlac7").value = jl[7].znyb; //9

            document.getElementById("xbh8").value = jl[8].dld; //1
            document.getElementById("dl8").value = jl[8].ndza; //2
            document.getElementById("dya8").value = jl[8].ndzb; //3
            document.getElementById("dyb8").value = jl[8].ndzc; //4
            document.getElementById("dyc8").value = jl[8].wdza; //5
            document.getElementById("dla8").value = jl[8].wdzb; // 6
            document.getElementById("dlb8").value = jl[8].wdzc; //7
            document.getElementById("dlc8").value = jl[8].znya; //8
            document.getElementById("dlac8").value = jl[8].znyb; //9

            document.getElementById("xbh9").value = jl[9].dld; //1
            document.getElementById("dl9").value = jl[9].ndza; //2
            document.getElementById("dya9").value = jl[9].ndzb; //3
            document.getElementById("dyb9").value = jl[9].ndzc; //4
            document.getElementById("dyc9").value = jl[9].wdza; //5
            document.getElementById("dla9").value = jl[9].wdzb; // 6
            document.getElementById("dlb9").value = jl[9].wdzc; //7
            document.getElementById("dlc9").value = jl[9].znya; //8
            document.getElementById("dlac9").value = jl[9].znyb; //9

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
          if (document.getElementById("xlmc").value == '' || document.getElementById("xlmc").value == undefined) {
            document.getElementById("xlmc").value = this.xlmc;
          }
        })
        .catch(err => {});
    },
    /**input框title */
    aaaa(e) {
      var a = e.target.title;
      a = e.target.value;
      if (e.target.value) {
        e.target.title = e.target.value;
      }
    },
    // 设置table样式
    addClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 4 || rowIndex == 5) {
        return "textCenter";
      }
    },
    save() {
      var data = {};
      data.tq = document.getElementById("tq").value; //天气：
      data.wd = document.getElementById("wd").value; //温度：
      data.sd = document.getElementById("sd").value; //湿度：
      data.syrq =
        document.getElementById("syrq1").value +
        "-" +
        document.getElementById("syrq2").value +
        "-" +
        document.getElementById("syrq3").value; //试验日期

      data.jcdw = document.getElementById("jcdw").value; //检测单位
      data.syxz = document.getElementById("syxz").value; //试验性质
      data.xlmc = document.getElementById("xlmc").value; //this.$xl名称
      data.jcdzjcyq = document.getElementById("jcdzjcyq").value; //
      data.jddzjcyq = document.getElementById("jddzjcyq").value; //
      data.hcjcyq = document.getElementById("hcjcyq").value;
      data.syjl = document.getElementById("syjl").value;

      data.zg = document.getElementById("zg").value;
      data.sh = document.getElementById("sh").value;
      data.syry = document.getElementById("syry").value;

      data.jl = JSON.stringify([
        {
          dld: document.getElementById("xbh0").value, //1
          ndza: document.getElementById("dl0").value, //2
          ndzb: document.getElementById("dya0").value, //3
          ndzc: document.getElementById("dyb0").value, // 4
          wdza: document.getElementById("dyc0").value, //5
          wdzb: document.getElementById("dla0").value, //6
          wdzc: document.getElementById("dlb0").value, //7
          znya: document.getElementById("dlc0").value, //8
          znyb: document.getElementById("dlac0").value //8
        },
        {
          dld: document.getElementById("xbh1").value, //1
          ndza: document.getElementById("dl1").value, //2
          ndzb: document.getElementById("dya1").value, //3
          ndzc: document.getElementById("dyb1").value, // 4
          wdza: document.getElementById("dyc1").value, //5
          wdzb: document.getElementById("dla1").value, //6
          wdzc: document.getElementById("dlb1").value, //7
          znya: document.getElementById("dlc1").value, //8
          znyb: document.getElementById("dlac1").value //8
        },
        {
          dld: document.getElementById("xbh2").value, //1
          ndza: document.getElementById("dl2").value, //2
          ndzb: document.getElementById("dya2").value, //3
          ndzc: document.getElementById("dyb2").value, // 4
          wdza: document.getElementById("dyc2").value, //5
          wdzb: document.getElementById("dla2").value, //6
          wdzc: document.getElementById("dlb2").value, //7
          znya: document.getElementById("dlc2").value, //8
          znyb: document.getElementById("dlac2").value //8
        },
        {
          dld: document.getElementById("xbh3").value, //1
          ndza: document.getElementById("dl3").value, //2
          ndzb: document.getElementById("dya3").value, //3
          ndzc: document.getElementById("dyb3").value, // 4
          wdza: document.getElementById("dyc3").value, //5
          wdzb: document.getElementById("dla3").value, //6
          wdzc: document.getElementById("dlb3").value, //7
          znya: document.getElementById("dlc3").value, //8
          znyb: document.getElementById("dlac3").value //8
        },
        {
          dld: document.getElementById("xbh4").value, //1
          ndza: document.getElementById("dl4").value, //2
          ndzb: document.getElementById("dya4").value, //3
          ndzc: document.getElementById("dyb4").value, // 4
          wdza: document.getElementById("dyc4").value, //5
          wdzb: document.getElementById("dla4").value, //6
          wdzc: document.getElementById("dlb4").value, //7
          znya: document.getElementById("dlc4").value, //8
          znyb: document.getElementById("dlac4").value //8
        },
        {
          dld: document.getElementById("xbh5").value, //1
          ndza: document.getElementById("dl5").value, //2
          ndzb: document.getElementById("dya5").value, //3
          ndzc: document.getElementById("dyb5").value, // 4
          wdza: document.getElementById("dyc5").value, //5
          wdzb: document.getElementById("dla5").value, //6
          wdzc: document.getElementById("dlb5").value, //7
          znya: document.getElementById("dlc5").value, //8
          znyb: document.getElementById("dlac5").value //8
        },
        {
          dld: document.getElementById("xbh6").value, //1
          ndza: document.getElementById("dl6").value, //2
          ndzb: document.getElementById("dya6").value, //3
          ndzc: document.getElementById("dyb6").value, // 4
          wdza: document.getElementById("dyc6").value, //5
          wdzb: document.getElementById("dla6").value, //6
          wdzc: document.getElementById("dlb6").value, //7
          znya: document.getElementById("dlc6").value, //8
          znyb: document.getElementById("dlac6").value //8
        },
        {
          dld: document.getElementById("xbh7").value, //1
          ndza: document.getElementById("dl7").value, //2
          ndzb: document.getElementById("dya7").value, //3
          ndzc: document.getElementById("dyb7").value, // 4
          wdza: document.getElementById("dyc7").value, //5
          wdzb: document.getElementById("dla7").value, //6
          wdzc: document.getElementById("dlb7").value, //7
          znya: document.getElementById("dlc7").value, //8
          znyb: document.getElementById("dlac7").value //8
        },
        {
          dld: document.getElementById("xbh8").value, //1
          ndza: document.getElementById("dl8").value, //2
          ndzb: document.getElementById("dya8").value, //3
          ndzc: document.getElementById("dyb8").value, // 4
          wdza: document.getElementById("dyc8").value, //5
          wdzb: document.getElementById("dla8").value, //6
          wdzc: document.getElementById("dlb8").value, //7
          znya: document.getElementById("dlc8").value, //8
          znyb: document.getElementById("dlac8").value //8
        },
        {
          dld: document.getElementById("xbh9").value, //1
          ndza: document.getElementById("dl9").value, //2
          ndzb: document.getElementById("dya9").value, //3
          ndzc: document.getElementById("dyb9").value, // 4
          wdza: document.getElementById("dyc9").value, //5
          wdzb: document.getElementById("dla9").value, //6
          wdzc: document.getElementById("dlb9").value, //7
          znya: document.getElementById("dlc9").value, //8
          znyb: document.getElementById("dlac9").value //8
        }
      ]);
      data.jobtaskid = this.jobtaskid; // 工作任务id
      this.form.testacceptance = 9; // 实验结果
      this.selection.ysr.forEach(item => {
        if (this.form.syclr == item.objId) {
          this.form.syclrname = item.name;
        }
      });
      this.form.objId = this.jobtaskid; // 工作任务id
      console.log("this.bgid :>> ", this.bgid);
      if (data.syrq == "--") {
        data.syrq = "";
      }
      if (this.bgid) {
        let _this = this;
        data.id = this.bgid; // 报告id
        jdxtReportEdit(data)
          .then(res => {
            edit(this.$qs.stringify(this.form)).then(result => {
              console.log("result :>> ", result);
              if (result.data.code == 0 && res.data.code == 0) {
                this.$message({ message: "编辑成功", type: "success" });
                this.showDialog = false;
                _this.$parent.$parent.getData();
                this.$emit("childFn", {
                  showDialog: false
                });
              }
            });
          })
          .catch(err => {});
      } else {
        let _this = this;
        jdxtReportAdd(data)
          .then(res => {
            edit(this.$qs.stringify(this.form)).then(result => {
              console.log("result :>> ", result);
              if (result.data.code == 0 && res.data.code == 0) {
                this.$message({ message: "新增成功", type: "success" });
                this.showDialog = false;
                _this.$parent.$parent.getData();
                this.$emit("childFn", {
                  showDialog: false
                });
              }
            });
          })
          .catch(err => {});
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
    download(){
      this.$parent.download(this.form.testreporttype,this.bgid)
    },
  }
};
</script>

<style>
.textCenter .cell {
  text-align: center;
}
</style>