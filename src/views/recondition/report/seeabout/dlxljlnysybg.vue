<template>
  <!-- dlxl交流耐压试验报告 -->
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
          <el-table-column prop="value1" align="left"></el-table-column>
          <el-table-column prop="value2" align="left"></el-table-column>
          <el-table-column prop="value3" align="left"></el-table-column>
          <el-table-column prop="value4" align="left"></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="save">同意</el-button>
        <el-button class="onSearch" @click="handleClose">不同意</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: false,
      showDialog: true,
      tableData: [
        {
          value1: "天气：",
          value2: "温度： ℃",
          value3: "湿度： %",
          value4: "试验日期： 年 月 日"
        },
        {
          value1: "检测单位：",
          value3: "试验性质"
        },
        {
          value1: this.$xl + "名称：",
          value3: "试验地点"
        },
        {
          value1: this.$dl + "型号：",
          value3: this.$dl + "长度（km）："
        },
        {
          value1: this.$dl + "厂家：",
          value3: "电路起始点："
        },
        {
          value1: "耐压前后" + this.$dl + "主绝缘绝缘电阻测量（MΩ）"
        },
        {
          value1: "检测仪器："
        },
        {
          value1: "主绝缘绝缘电阻",
          value2: "A相",
          value3: "B相",
          value4: "C相"
        },
        {
          value1: "耐压前"
        },
        {
          value1: "耐压后"
        },
        {
          value1: "相对核对结果："
        },
        {
          value1: "交流耐压试验"
        },
        {
          value1: "试验仪器："
        },
        {
          value2: "A相",
          value3: "B相",
          value4: "C相"
        },
        {
          value1: "试验电压（kV）"
        },
        {
          value1: "低压侧励磁电流（A）"
        },
        {
          value1: "频率（Hz）"
        },
        {
          value1: "时间（min）"
        },
        {
          value1: "占空比",
          value2: "%",
          value3: "%",
          value4: "%"
        },
        {
          value1: "低压侧电流（A）"
        },
        {
          value1: "介质损耗因数"
        },
        {
          value1: "试验结果"
        },
        {
          value1: "主管：",
          value2: "审核：",
          value3: "试验人员："
        }
      ]
    };
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
          return "textCenter";
        }
      }
    },
    save() {},
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