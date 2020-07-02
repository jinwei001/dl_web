<template>
  <!-- dlxl直流耐压试验报告 -->
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
    <div class="table">
      <div class="respont-content">
      </div>
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
      v-if="isjhgl"
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
          value2: `温度：<input id="wd" class="jxgzsybg_11" style="width:70%" type="text"/>℃`,
          value3: `湿度：<input id="sd" class="jxgzsybg_11" style="width:70%" type="text"/>%`,
          value4: `试验日期：<input id="syrq1" class="jxgzsybg_11" style="width:40px" type="text"/>年<input id="syrq2" class="jxgzsybg_11" style="width:20px" type="text"/>月<input id="syrq3" class="jxgzsybg_11" style="width:20px" type="text"/>日`
        },
        {
          value1: `检测单位：<input id="jcdw" class="jxgzsybg_11" style="width:80%" type="text"/>`,
          value3: `试验性质：<input id="syxz" class="jxgzsybg_11" style="width:80%" type="text"/>`
        },
        {
          value1:
            this.$xl +
            `名称：<input id="xlmc" class="jxgzsybg_11" style="width:80%" type="text"/>`,
          value3: `试验地点:<input id="sydd" class="jxgzsybg_11" style="width:80%" type="text"/>`
        },
        {
          value1:
            this.$dl +
            `型号：<input id="dlxh" class="jxgzsybg_11" style="width:80%" type="text"/>`,
          value3:
            this.$dl +
            `长度（km）：<input id="dlcd" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1:
            this.$dl +
            `厂家：<input id="dlcj" class="jxgzsybg_11" style="width:80%" type="text"/>`,
          value3: `电路起始点：<input id="dlqsd" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "耐压前后" + this.$dl + "主绝缘绝缘电阻测量（MΩ）"
        },
        {
          value1:
            '检测仪器：<input id="jcyq" class="jxgzsybg_11" style="width:90%" type="text"/>'
        },
        {
          value1: "主绝缘绝缘电阻",
          value2: "A相",
          value3: "B相",
          value4: "C相"
        },
        {
          value1: "耐压前",
          value2: `<input id="nyqa" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="nyqb" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="nyqc" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "耐压后",
          value2: `<input id="nyha" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="nyhb" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="nyhc" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `相对核对结果：<input id="xwhdjg" class="jxgzsybg_11" style="width:80%" type="text"/>`
        },
        {
          value1: "直流耐压试验"
        },
        {
          value1: `试验仪器：<input id="syyq" class="jxgzsybg_11" style="width:90%" type="text"/>`
        },
        {
          value2: "A相",
          value3: "B相",
          value4: "C相"
        },
        {
          value1: "试验电压（kV）",
          value2: `<input id="sydya" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="sydyb" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="sydyc" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "持续时间（min）",
          value2: `<input id="cxsja" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="cxsjb" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="cxsjc" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "1min泄漏电流（μA）",
          value2: `<input id="xldla" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="xldlb" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="xldlc" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: "15min泄露电流（μA）",
          value2: `<input id="swxldla" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `<input id="swxldlb" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value4: `<input id="swxldlc" class="jxgzsybg_11" style="width:70%" type="text"/>`
        },
        {
          value1: `三相不平衡系数：<input id="xs" class="jxgzsybg_11" style="width:80%" type="text"/>`
        },
        {
          value1: `试验结果：<input id="syjg" class="jxgzsybg_11" style="width:90%" type="text"/>`
        },
        {
          value1: `主管：<input id="zg" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value2: `审核：<input id="sh" class="jxgzsybg_11" style="width:70%" type="text"/>`,
          value3: `试验人员：<input id="syry" class="jxgzsybg_11" style="width:70%" type="text"/>`
        }
      ],
          objId:null
    };
  },
  mounted() {
    console.log(this.jobtaskid);
    this.getSelectionList();
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
        rowIndex == 18 ||
        rowIndex == 19
      ) {
        if (columnIndex == 0) {
          return [1, 4];
        }
      }
      if (rowIndex == 20) {
        if (columnIndex == 2) {
          return [1, 2];
        }
      }
    },
    // 设置table样式
    addClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 5 || rowIndex == 11) {
        if (columnIndex == 0) {
          return "textCenter";
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
        rowIndex == 17
      ) {
        if (
          columnIndex == 0 ||
          columnIndex == 1 ||
          columnIndex == 2 ||
          columnIndex == 3
        ) {
          return "textCenter";
        }
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
      getzlnyReport(this.$qs.stringify({ jobtaskid: this.jobtaskid })).then(
        res => {
          console.log(res)
          if (res.data.rows[0]) {
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
            getData(this.$qs.stringify({ objId: this.jobtaskid })).then(res => {
              this.form.syclbz = res.data.rows[0].syclbz;
              this.form.syclr = res.data.rows[0].syclr;
              this.getysr();
            });
          }
          if (document.getElementById("xlmc").value == '' || document.getElementById("xlmc").value == undefined) {
            document.getElementById("xlmc").value = this.xlmc;
          }
        }
      );
    },
    save() {
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
      data.syxz = document.getElementById("syxz").value;
      data.xlid = this.xlid
      data.xlmc = document.getElementById("xlmc").value;
      data.sydd = document.getElementById("sydd").value;
      data.dlcj = document.getElementById("dlcj").value;

      data.dlxh = document.getElementById("dlxh").value;
      data.dlcd = document.getElementById("dlcd").value;

      data.dlqsd = document.getElementById("dlqsd").value;
      data.nyqa = document.getElementById("nyqa").value;
      data.nyqb = document.getElementById("nyqb").value;
      data.nyqc = document.getElementById("nyqc").value;
      data.nyha = document.getElementById("nyha").value;
      data.nyhb = document.getElementById("nyhb").value;
      data.nyhc = document.getElementById("nyhc").value;
      data.xwhdjg = document.getElementById("xwhdjg").value;
      data.syyq = document.getElementById("syyq").value;
      data.sydya = document.getElementById("sydya").value;
      data.sydyb = document.getElementById("sydyb").value;
      data.sydyc = document.getElementById("sydyc").value;
      data.cxsja = document.getElementById("cxsja").value;
      data.cxsjb = document.getElementById("cxsjb").value;
      data.cxsjc = document.getElementById("cxsjc").value;
      data.xldla = document.getElementById("xldla").value;
      data.xldlb = document.getElementById("xldlb").value;
      data.xldlc = document.getElementById("xldlc").value;
      data.swxldla = document.getElementById("swxldla").value;
      data.swxldlb = document.getElementById("swxldlb").value;
      data.swxldlc = document.getElementById("swxldlc").value;
      data.xs = document.getElementById("xs").value;
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
        editzlnyReport(data).then(res => {
          edit(this.$qs.stringify(this.form)).then(result => {
            if (result.data.code == 0 && res.data.code == 0) {
              this.$message({ message: "保存成功", type: "success" });
              this.showDialog = false;
              this.$parent.$parent.getData()
              this.$emit("childFn", {
                showDialog: false
              });
            }
          });
        });
      } else {
        addzlnyReport(data).then(res => {
          edit(this.$qs.stringify(this.form)).then(result => {
            if (result.data.code == 0 && res.data.code == 0) {
              this.$message({ message: "新增成功", type: "success" });
              this.showDialog = false;
              this.$parent.$parent.getData()
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