<template>
  <!-- dl局部放电振荡波检测试验报告 -->
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
    <div slot="footer" style="margin: 1rem auto" class="dialog-footer"  v-if="isjhgl">
      <p style="text-align: center">
        <el-button class="UserSearchFun" @click="save">确定</el-button>
        <el-button class="onSearch" @click="handleClose">取消</el-button>
      </p>
    </div>
  </div>
</template>

<script>
import {
  getjbfdReport,
  addjbfdReport,
  getLineGroup,
  getnextuser,
  edit,
  getData,
  editjbfdReport
} from "@/api/recondition/jobtask";
import { getLineSelect } from "@/api/recondition/yearPlan";
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
      tableData: [
        {
          value1: `天气：<input id="tq" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value2: `温度：<input id="wd" class="jxgzsybg_11" style="width: 70%" type="text" /> ℃`,
          value3: `湿度：<input id="sd" class="jxgzsybg_11"  style="width: 70%" type="text" />%`,
          value4: `试验日期：<input id="syrq1" class="jxgzsybg_11" style="width: 40px" type="text" />年<input id="syrq2" class="jxgzsybg_11" style="width: 20px" type="text" />月<input id="syrq3" class="jxgzsybg_11" style="width: 20px" type="text"/>日`
        },
        {
          value1: "检测单位",
          value2: `<input id="jcdw" class="jxgzsybg_11" style="width: 80%" type="text" />`,
          value3: "试验性质",
          value4: `<input id="syxz" class="jxgzsybg_11" style="width: 80%" type="text" />`
        },
        {
          value1: this.$xl + "名称",
          value2: `<input id="xlmc" class="jxgzsybg_11" style="width: 80%" type="text" />`,
          value3: "投运日期",
          value4: `<input id="tyrq1" class="jxgzsybg_11" style="width: 40px" type="text" />年<input id="tyrq2" class="jxgzsybg_11" style="width: 20px" type="text" />月<input id="tyrq3" class="jxgzsybg_11" style="width: 20px" type="text" />日`
        },
        {
          value1: this.$dl + "厂家",
          value2: `<input id="dlcj" class="jxgzsybg_11" style="width: 80%" type="text" />`,
          value3: this.$dl + "型号",
          value4: `<input id="dlxh" class="jxgzsybg_11" style="width: 80%" type="text" />`
        },
        {
          value1: this.$dl + "起讫点",
          value2: `<input id="dlqyd" class="jxgzsybg_11" style="width: 80%" type="text" />`,
          value3: this.$dl + "接头数量",
          value4: `<input id="dljtsl" class="jxgzsybg_11" style="width: 80%" type="text" />`
        },
        {
          value1: "试验仪器",
          value2: `<input id="syyq" class="jxgzsybg_11" style="width: 80%" type="text" />`,
          value3: "气体检测仪器",
          value4: `<input id="qtjcyq" class="jxgzsybg_11" style="width: 80%" type="text" />`
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
          value2: `<input id="zsa" class="jxgzsybg_11" style="width: 80%" type="text" />`,
          value3: `<input id="zsb" class="jxgzsybg_11" style="width: 80%" type="text" />`,
          value4: `<input id="zsc" class="jxgzsybg_11" style="width: 80%" type="text" />`
        },
        {
          value1: "1.0U0（峰值电压 kV）",
          value2: `<input id="fya" class="jxgzsybg_11" style="width: 80%" type="text" />`,
          value3: `<input id="fyb" class="jxgzsybg_11" style="width: 80%" type="text" />`,
          value4: `<input id="fyc" class="jxgzsybg_11" style="width: 80%" type="text" />`
        },
        {
          value1: "1.4U0（峰值电压 kV）",
          value2: `<input id="fysa" class="jxgzsybg_11" style="width: 80%" type="text" />`,
          value3: `<input id="fysb" class="jxgzsybg_11" style="width: 80%" type="text" />`,
          value4: `<input id="fysc" class="jxgzsybg_11" style="width: 80%" type="text" />`
        },
        {
          value1: "电缆接头放电情况",
          value2: `<input id="jtfda" class="jxgzsybg_11" style="width: 80%" type="text" />`,
          value3: `<input id="jtfdb" class="jxgzsybg_11" style="width: 80%" type="text" />`,
          value4: `<input id="jtfdc" class="jxgzsybg_11" style="width: 80%" type="text" />`
        },
        {
          value1: "本体放电情况",
          value2: `<input id="btfda" class="jxgzsybg_11" style="width: 80%" type="text" />`,
          value3: `<input id="btfdb" class="jxgzsybg_11" style="width: 80%" type="text" />`,
          value4: `<input id="btfdc" class="jxgzsybg_11" style="width: 80%" type="text" />`
        },
        {
          value1: "终端位置放电情况",
          value2: `<input id="zdfda" class="jxgzsybg_11" style="width: 80%" type="text" />`,
          value3: `<input id="zdfdb" class="jxgzsybg_11" style="width: 80%" type="text" />`,
          value4: `<input id="zdfdc" class="jxgzsybg_11" style="width: 80%" type="text" />`
        },
        {
          value1: `结论：<input id="jl" class="jxgzsybg_11" style="width: 90%" type="text" />`
        },
        {
          value1: `主管：<input id="zg" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value2: `审核：<input id="sh" class="jxgzsybg_11" style="width: 70%" type="text" />`,
          value3: `实验人员：<input id="syry" class="jxgzsybg_11" style="width: 80%" type="text" />`
        }
      ],
          objId:null
    };
  },
  mounted() {
    this.getSelectionList();
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
      getjbfdReport(this.$qs.stringify({ jobtaskid: this.jobtaskid })).then(
        res => {
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
            getData(this.$qs.stringify({ objId: this.jobtaskid })).then(res => {
              this.form.syclbz = res.data.rows[0].syclbz;
              this.form.syclr = res.data.rows[0].syclr;
              this.getysr();
            });
          }
          if (document.getElementById("xlmc").value == '' || document.getElementById("xlmc").value == undefined) {
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
      data.tyrq =
        document.getElementById("tyrq1").value +
        "-" +
        document.getElementById("tyrq2").value +
        "-" +
        document.getElementById("tyrq3").value;

      data.dlcj = document.getElementById("dlcj").value;
      data.dlxh = document.getElementById("dlxh").value;
      data.dlqyd = document.getElementById("dlqyd").value;
      data.dljtsl = document.getElementById("dljtsl").value;
      data.syyq = document.getElementById("syyq").value;
      data.qtjcyq = document.getElementById("qtjcyq").value;
      data.zsa = document.getElementById("zsa").value;
      data.zsb = document.getElementById("zsb").value;
      data.zsc = document.getElementById("zsc").value;
      data.fya = document.getElementById("fya").value;
      data.fyb = document.getElementById("fyb").value;
      data.fyc = document.getElementById("fyc").value;
      data.fysa = document.getElementById("fysa").value;
      data.fysb = document.getElementById("fysb").value;
      data.fysc = document.getElementById("fysc").value;
      data.jtfda = document.getElementById("jtfda").value;
      data.jtfdb = document.getElementById("jtfdb").value;
      data.jtfdc = document.getElementById("jtfdc").value;
      data.btfda = document.getElementById("btfda").value;
      data.btfdb = document.getElementById("btfdb").value;
      data.btfdc = document.getElementById("btfdc").value;
      data.zdfda = document.getElementById("zdfda").value;
      data.zdfdb = document.getElementById("zdfdb").value;
      data.zdfdc = document.getElementById("zdfdc").value;
      data.jl = document.getElementById("jl").value;
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
        editjbfdReport(data).then(res => {
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
        addjbfdReport(data).then(res => {
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
    aaaa(e) {
      var a = e.target.title;
      a = e.target.value;
      e.target.title = e.target.value;
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
.textLeft .cell {
  text-align: left;
}
</style>