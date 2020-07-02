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
          <el-table-column prop="value1" align="left"></el-table-column>
          <el-table-column prop="value2" align="left"></el-table-column>
          <el-table-column prop="value3" align="left"></el-table-column>
          <el-table-column prop="value4" align="left"></el-table-column>
          <el-table-column prop="value5" align="left"></el-table-column>
          <el-table-column prop="value6" align="left"></el-table-column>
          <el-table-column prop="value7" align="left"></el-table-column>
          <el-table-column prop="value8" align="left"></el-table-column>
          <el-table-column prop="value9" align="left"></el-table-column>
          <el-table-column prop="value10" align="left"></el-table-column>
          <el-table-column prop="value11" align="left"></el-table-column>
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
          value2: "试验性质："
        },
        {
          value1: this.$xl + "名称：",
          value2: "绝缘电阻检测仪器"
        },
        {
          value1: "直流耐压试验仪器："
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
          value1: "备注："
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
      if (columnIndex == 0) {
        if (rowIndex == 4) {
          return {
            rowspan: 2,
            colspan: 1
          };
        }
        if (rowIndex == 5) {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      if (rowIndex == 4) {
        if (columnIndex == 1 || columnIndex == 2 || columnIndex == 3) {
          return [1, 3];
        }
      }
      // 备注需要判断中间list长度来获取rowIndex
      if (rowIndex == 6) {
        if (columnIndex == 0) {
          return [1, 11];
        }
      }
      if (rowIndex == 7) {
        if (columnIndex == 0 || columnIndex == 1) {
          return [1, 3];
        }
        if (columnIndex == 2) {
          return [1, 5];
        }
      }
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