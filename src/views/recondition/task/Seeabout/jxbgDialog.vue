<template>
  <div class="jxsybg_1">
    <el-dialog
      :visible.sync="showDialog"
      :title="`${$dl}${$xl}检修报告`"
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
          <el-table-column prop="value1" width="50" align="left">
            <template slot-scope="scope">
              <div v-html="scope.row.value1" @mousemove="aaaa"></div>
            </template>
          </el-table-column>
          <el-table-column prop="value2" width="100" align="left">
            <template slot-scope="scope">
              <div v-html="scope.row.value2" @mousemove="aaaa"></div>
            </template>
          </el-table-column>
          <el-table-column prop="value3" width="100" align="left">
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
          <el-table-column prop="value6" width="100" align="left"></el-table-column>
          <el-table-column prop="value7" width="100" align="left"></el-table-column>
          <el-table-column prop="value8" width="100" align="left"></el-table-column>
        </el-table>
      </div>
      <el-form
        ref="dataForm"
        :model="form"
        label-position="left"
        style="width:100% ;margin: 10px auto;"
      >
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">验收班组：</label>
            <el-select v-model="form.jxclbz" clearable placeholder="请选择" @change="getysr()">
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
            <el-select v-model="form.jxclr" clearable placeholder="请选择">
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
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="save">确定</el-button>
        <el-button class="onSearch" @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  adddlxlReport,
  getLineGroup,
  getnextuser,
  edit,
  getdlxlReport,
  editdlxlReport,
  getData
} from "@/api/recondition/jobtask";
import { getLineSelect } from "@/api/recondition/yearPlan";
export default {
  props: {
    jobtaskid: "",
    xlmc: "",
    xlid: ""
  },
  data() {
    return {
      xlid1: this.xlid,
      xlmc1: this.xlmc,
      status: false,
      showDialog: true,
      id: this.jobtaskid, // 工作任务id
      objId: "", // 检修报告id
      form: {
        ysbz: "",
        jxclr: ""
      },
      selection: {
        ysbz: [],
        ysr: []
      },
      rowIndex1: [0, 1, 2, 3],
      rowIndex2: [
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23
      ],
      tableData: [
        {
          value1:
            this.$xl + `名称：<input id="tq" class="jxsybg_1" type="text" />`,
          value2: `起讫点：<input id="qyd" class="jxsybg_1" style="width: 70%" type="text" />`,
          value3: `投运日期：<input id="tyrq1" class="jxsybg_1" type="text" style="width:40px"/>年<input class="jxsybg_1" id="tyrq2" type="text" style="width:20px"/>月<input class="jxsybg_1" id="tyrq3" type="text" style="width:20px"/>日`
        },
        {
          value1:
            this.$dl + `厂家：<input id="dlcj" class="jxsybg_1" type="text" />`,
          value2:
            this.$dl + `型号：<input id="dlxh" class="jxsybg_1" type="text" />`,
          value3: `上次检修日期：<input id="scjxrq1" class="jxsybg_1" type="text" style="width:40px"/>年<input class="jxsybg_1" id="scjxrq2" type="text" style="width:20px"/>月<input class="jxsybg_1" id="scjxrq3" type="text" style="width:20px"/>日`
        },
        {
          value1: `终端厂家：<input id="zdcj" class="jxsybg_1" type="text" />`,
          value2:
            this.$dl +
            `接头厂家：<input id="jtcj" class="jxsybg_1" type="text" />`,
          value3: `避雷器厂家：<input id="blqcj" class="jxsybg_1" type="text" />`
        },
        {
          value1: `终端型号：<input id="zdxh" class="jxsybg_1" type="text" />`,
          value2:
            this.$dl +
            `接头型号：<input class="jxsybg_1" id="jtxh" type="text" />`,
          value3: `避雷器型号：<input id="blqxh" class="jxsybg_1" type="text" />`
        },
        {
          value1: `<span style="vertical-align: top">接地系统:</span> <textarea id="jdxt" type="textarea" style="width: 90%"/>`
        },
        {
          value1: "序号",
          value2: "检修项目",
          value3: "技术要求",
          value4: "检修结果",
          value5: "责任人"
        },
        {
          value1: "1",
          value2: this.$dl + "本体",
          value3: this.$dl + "主绝缘：绝缘电阻与上次检修无明显变化",
          value4: `<input id="btjg" class="jxsybg_1" type="text" style="width: 50px"/>`,
          value5: `<input id="btzrr" class="jxsybg_1" type="text" style="width: 50px"/>`
        },
        {
          value3: this.$dl + "外护套：绝缘电阻大于0.5MΩ/km"
        },
        {
          value1: "2",
          value2: this.$dl + "接头",
          value3: this.$dl + "夹具、托架为发生移位",
          value4: `<input id="jtjg" class="jxsybg_1" type="text" style="width: 50px"/>`,
          value5: `<input id="jtzrr" class="jxsybg_1" type="text" style="width: 50px"/>`
        },
        {
          value3: "接地引出端子处未裂开"
        },
        {
          value1: "3",
          value2: this.$dl + "终端",
          value3: "无漏油情况",
          value4: `<input id="zdjg" class="jxsybg_1" type="text" style="width: 50px"/>`,
          value5: `<input id="zdzrr" class="jxsybg_1" type="text" style="width: 50px"/>`
        },
        {
          value3: "支撑小瓷瓶无开裂情况"
        },
        {
          value3: "外表应无污垢沉淀，瓷瓶表面釉彩应清洁光亮"
        },
        {
          value3: "固定夹具无开裂情况"
        },
        {
          value1: "4",
          value2: "基础",
          value3: "基础无下沉及倾斜情况",
          value4: `<input id="jcjg" class="jxsybg_1" type="text" style="width: 50px"/>`,
          value5: `<input id="jczrr" class="jxsybg_1" type="text" style="width: 50px"/>`
        },
        {
          value1: "5",
          value2: "避雷器",
          value3:
            "避雷器绝缘电阻：5000V兆欧表测量要求大于2500MΩ底座绝缘：2500V兆欧表测量要求大于100MΩ",
          value4: `<input id="blqjg" class="jxsybg_1" type="text" style="width: 50px"/>`,
          value5: `<input id="blqzrr" class="jxsybg_1" type="text" style="width: 50px"/>`
        },
        {
          value3: "避雷器1mA下直流参考电压：和出厂值进行对比，不超过±5%"
        },
        {
          value3: "避雷器75%直流参考电压下泄露电流值：小于50μA"
        },
        {
          value3: "在线监测仪：不进水、指针有读数"
        },
        {
          value1: "6",
          value2: "接地系统",
          value3: "接地箱基础及箱体无破损",
          value4: `<input id="jdjg" class="jxsybg_1" type="text" style="width: 50px"/>`,
          value5: `<input id="jdzrr" class="jxsybg_1" type="text" style="width: 50px"/>`
        },
        {
          value3: "接地线无缺失"
        },
        {
          value3: "主接地电阻不大于10Ω"
        },
        {
          value3: "过电压护层保护器绝缘电阻：100V兆欧表测量要求大于10MΩ"
        },
        {
          value3: "接地" + this.$dl + "固定物不牢靠的情况"
        },
        {
          value1: `<span style="vertical-align: top">备注：</span><textarea id="bz" class="jxsybg_1" type="textarea" style="width: 90%"/>`
        },
        {
          value1: `工作负责人：<input id="gzfzr" class="jxsybg_1" type="text" style="width: 70%"/>`,
          value5: `工作班成员：<input id="gzbcy" class="jxsybg_1" type="text" style="width: 70%"/>`
        },
        {
          value1: `审核人：<input id="shry" class="jxsybg_1" type="text" style="width: 70%"/>`,
          value5: `检修日期：<input id="jxrq1" class="jxsybg_1" type="text" style="width:40px"/>年<input class="jxsybg_1" id="jxrq2" type="text" style="width:20px"/>月<input class="jxsybg_1" id="jxrq3" type="text" style="width:20px"/>日`
        }
      ]
    };
  },
  mounted() {
    console.log(this.id);
    this.getSelectionList();
    this.getData();
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (this.rowIndex1.indexOf(rowIndex) != -1) {
        if (columnIndex === 0 || columnIndex === 2) {
          return [1, 3];
        }
        if (columnIndex === 1) {
          return [1, 2];
        }
      }
      if (this.rowIndex2.indexOf(rowIndex) != -1) {
        if (columnIndex === 2) {
          return [1, 4];
        }
      }
      if (columnIndex == 0) {
        if (rowIndex == 4) {
          return [1, 8];
        }
      }
      if (
        columnIndex === 0 ||
        columnIndex == 1 ||
        columnIndex == 3 ||
        columnIndex == 4
      ) {
        if (rowIndex === 6 || rowIndex == 8) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else if (rowIndex === 7 || rowIndex == 9) {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }

      if (
        columnIndex === 0 ||
        columnIndex == 1 ||
        columnIndex == 3 ||
        columnIndex == 4
      ) {
        if (rowIndex === 10 || rowIndex == 15) {
          return {
            rowspan: 4,
            colspan: 1
          };
        } else if (
          rowIndex === 11 ||
          rowIndex == 12 ||
          rowIndex == 13 ||
          rowIndex === 16 ||
          rowIndex == 17 ||
          rowIndex == 18
        ) {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      if (
        columnIndex === 0 ||
        columnIndex == 1 ||
        columnIndex == 3 ||
        columnIndex == 4
      ) {
        if (rowIndex == 19) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (
          rowIndex === 20 ||
          rowIndex == 21 ||
          rowIndex == 22 ||
          rowIndex === 23
        ) {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      if (rowIndex == 24) {
        if (columnIndex == 0) {
          return [1, 7];
        }
      }
      if (rowIndex == 25 || rowIndex == 26) {
        if (columnIndex == 0 || columnIndex == 4) {
          return [1, 4];
        } else if (columnIndex == 1 || columnIndex == 2 || columnIndex == 3) {
          return [0, 0];
        }
      }
    },
    // 设置table样式
    addClass({ row, column, rowIndex, columnIndex }) {
      if (
        rowIndex == 5 ||
        rowIndex == 6 ||
        rowIndex == 7 ||
        rowIndex == 8 ||
        rowIndex == 9 ||
        rowIndex == 10 ||
        rowIndex == 11 ||
        rowIndex == 12 ||
        rowIndex == 13 ||
        rowIndex == 14 ||
        rowIndex == 15 ||
        rowIndex == 16 ||
        rowIndex == 17 ||
        rowIndex == 18 ||
        rowIndex == 19 ||
        rowIndex == 20 ||
        rowIndex == 21 ||
        rowIndex == 22 ||
        rowIndex == 23
      ) {
        if (columnIndex == 2) {
          return "textLeft";
        }
      }
      if (this.rowIndex2.indexOf(rowIndex) != -1) {
        return "textCenter";
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
      console.log(111);
      getnextuser(this.$qs.stringify({ groupid: this.form.jxclbz })).then(
        res => {
          this.selection.ysr = res.data.rows;
        }
      );
    },
    // 获取回显内容
    getData() {
      getdlxlReport(this.$qs.stringify({ jobtaskid: this.id })).then(res => {
        console.log(res.data.rows);
        if (res.data.rows[0]) {
          var data = {};
          data = res.data.rows[0];
          document.getElementById("tq").value = data.tq;
          document.getElementById("qyd").value = data.qyd;
          var arr = data.tyrq.split("-");
          document.getElementById("tyrq1").value = arr[0];
          document.getElementById("tyrq2").value = arr[1];
          document.getElementById("tyrq3").value = arr[2].substring(0, 2);
          document.getElementById("dlcj").value = data.dlcj;
          document.getElementById("dlxh").value = data.dlxh;
          var arr1 = data.scjxrq.split("-");
          document.getElementById("scjxrq1").value = arr1[0];
          document.getElementById("scjxrq2").value = arr1[1];
          document.getElementById("scjxrq3").value = arr1[2].substring(0, 2);
          document.getElementById("zdcj").value = data.zdcj;
          document.getElementById("jtcj").value = data.jtcj;
          document.getElementById("blqcj").value = data.blqcj;
          document.getElementById("zdxh").value = data.zdxh;
          document.getElementById("jtxh").value = data.jtxh;
          document.getElementById("blqxh").value = data.blqxh;
          document.getElementById("jdxt").value = data.jdxt;
          document.getElementById("btjg").value = data.btjg;
          document.getElementById("btzrr").value = data.btzrr;
          document.getElementById("jtjg").value = data.jtjg;
          document.getElementById("jtzrr").value = data.jtzrr;
          document.getElementById("zdjg").value = data.zdjg;
          document.getElementById("zdzrr").value = data.zdzrr;
          document.getElementById("jcjg").value = data.jcjg;
          document.getElementById("jczrr").value = data.jczrr;
          document.getElementById("blqjg").value = data.blqjg;
          document.getElementById("blqzrr").value = data.blqzrr;
          document.getElementById("jdjg").value = data.jdjg;
          document.getElementById("jdzrr").value = data.jdzrr;
          document.getElementById("bz").value = data.bz;
          document.getElementById("gzfzr").value = data.gzfzr;
          document.getElementById("gzbcy").value = data.gzbcy;
          document.getElementById("shry").value = data.shry;
          var arr2 = data.jxrq.split("-");
          document.getElementById("jxrq1").value = arr2[0];
          document.getElementById("jxrq2").value = arr2[1];
          document.getElementById("jxrq3").value = arr2[2].substring(0, 2);
          this.objId = data.id;
          getData(this.$qs.stringify({ objId: this.id })).then(res => {
            this.form.jxclbz = res.data.rows[0].jxclbz;
            this.form.jxclr = res.data.rows[0].jxclr;
            this.getysr();
          });
        }
        if (
          document.getElementById("tq").value == "" ||
          document.getElementById("tq").value == undefined
        ) {
          document.getElementById("tq").value = this.xlmc1;
        }
        console.log(document.getElementById("qyd").value)
        if (
          document.getElementById("qyd").value == "" ||
          document.getElementById("qyd").value == undefined
        ) {
          // 获取线路名称下拉框
          getLineSelect(this.$qs.stringify({ lineNature: "主线",id: this.xlid1})).then(
            response => {
              if (response.status == 200) {
                var data = response.data.rows[0]
                document.getElementById('qyd').value = data.startPositonName + '-' + data.endPositonName
                var arr = data.transportTime.split('-')
                document.getElementById('tyrq1').value = arr[0]
                document.getElementById('tyrq2').value = arr[1]
                document.getElementById('tyrq3').value = arr[2].substring(0,2)
              }
            }
          );
        }
      });
    },
    // 保存提交按钮
    save() {
      var data = {};
      data.xlid = this.xlid1;
      data.tq = document.getElementById("tq").value;
      data.qyd = document.getElementById("qyd").value;
      data.tyrq =
        document.getElementById("tyrq1").value +
        "-" +
        document.getElementById("tyrq2").value +
        "-" +
        document.getElementById("tyrq3").value;
      data.dlcj = document.getElementById("dlcj").value;
      data.dlxh = document.getElementById("dlxh").value;
      data.scjxrq =
        document.getElementById("scjxrq1").value +
        "-" +
        document.getElementById("scjxrq2").value +
        "-" +
        document.getElementById("scjxrq3").value;
      data.zdcj = document.getElementById("zdcj").value;
      data.jtcj = document.getElementById("jtcj").value;
      data.blqcj = document.getElementById("blqcj").value;
      data.zdxh = document.getElementById("zdxh").value;
      data.jtxh = document.getElementById("jtxh").value;
      data.blqxh = document.getElementById("blqxh").value;
      data.jdxt = document.getElementById("jdxt").value;
      data.btjg = document.getElementById("btjg").value;
      data.btzrr = document.getElementById("btzrr").value;
      data.jtjg = document.getElementById("jtjg").value;
      data.jtzrr = document.getElementById("jtzrr").value;
      data.zdjg = document.getElementById("zdjg").value;
      data.zdzrr = document.getElementById("zdzrr").value;
      data.jcjg = document.getElementById("jcjg").value;
      data.jczrr = document.getElementById("jczrr").value;
      data.blqjg = document.getElementById("blqjg").value;
      data.blqzrr = document.getElementById("blqzrr").value;
      data.jdjg = document.getElementById("jdjg").value;
      data.jdzrr = document.getElementById("jdzrr").value;
      data.bz = document.getElementById("bz").value;
      data.gzfzr = document.getElementById("gzfzr").value;
      data.gzbcy = document.getElementById("gzbcy").value;
      data.shry = document.getElementById("shry").value;
      data.jxrq =
        document.getElementById("jxrq1").value +
        "-" +
        document.getElementById("jxrq2").value +
        "-" +
        document.getElementById("jxrq3").value;
      // 工作任务id
      data.jobtaskid = this.id;
      this.selection.ysr.forEach(item => {
        if (this.form.jxclr == item.objId) {
          this.form.jxclrname = item.name;
        }
      });
      this.form.maintenanceacceptance = 1;
      // 工作任务id
      this.form.objId = this.id;

      if (this.objId !== "") {
        data.id = this.objId;
        editdlxlReport(data).then(res => {
          edit(this.$qs.stringify(this.form)).then(result => {
            if (result.data.code == 0 && res.data.code == 0) {
              this.$message({ message: "保存成功", type: "success" });
              this.showDialog = false;
              this.$parent.getData();
              this.$emit("childFn", {
                showDialog: false
              });
            }
          });
        });
      } else {
        adddlxlReport(data).then(res => {
          edit(this.$qs.stringify(this.form)).then(result => {
            if (result.data.code == 0 && res.data.code == 0) {
              this.$message({ message: "新增成功", type: "success" });
              this.showDialog = false;
              this.$parent.getData();
              this.$emit("childFn", {
                showDialog: false
              });
            }
          });
        });
      }
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
.jxsybg_1 {
  width: 150px;
  height: 30px;
  border: 0;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
}
.jxsybg_1 textarea {
  border: 0;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
}
</style>