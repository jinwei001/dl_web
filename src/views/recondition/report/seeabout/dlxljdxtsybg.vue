<template>
  <!-- dlxl接地系统试验报告 -->
  <div>
    <el-dialog
      :visible.sync="showDialog"
      :title="`${$dl}${$xl}接地系统试验报告`"
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
            value1: "检测单位",
            value2: "试验性质"
        },
        {
            value1: this.$xl + "名称",
            value2: "接触电阻检测仪器"
        },
        {
            value1: '接地电阻检测仪器',
            value2: '护层过电压限制器绝缘电阻检测仪器'
        },
        {
            value1: '接地箱/互联箱编号',
            value2: '接地极接地电阻（Ω）',
            value3: '护层过电压限制器绝缘电阻（MΩ）',
            value4: '互联箱连接片接触电阻（μΩ）',
            value5: '互联箱连接片连接位置检查'
        },
        {
            value1: 'A相',
            value2: 'B相',
            value3: 'C相',
            value4: 'AC',
            value5: 'BA',
            value6: 'CB'
        },
        {},
    {
        value1: '试验结论',
    },
    {
        value1: '主管：',
        value2: '审核：',
        value3: '试验人员：'
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
      if(rowIndex == 1 || rowIndex == 2 || rowIndex == 3) {
          if(columnIndex == 0) {
              return [1,4]
          }
          if(columnIndex == 1) {
              return [1,5]
          }
      }
      if( columnIndex == 0 || columnIndex == 1) {
          if(rowIndex == 4) {
              return {
                  rowspan: 2,
                  colspan: 1
              }
          }
      }
      if (rowIndex == 4) {
          if(columnIndex == 2 || columnIndex == 3) {
              return [1,3]
          }
      }
      if(rowIndex == 7) {
          if(columnIndex == 0) {
              return [1,9]
          }
      }
      if(rowIndex == 8) {
          if(columnIndex == 0) {
              return [1,2]
          }
          if(columnIndex == 1) {
              return [1,3]
          }
          if(columnIndex == 2) {
              return [1,4]
          }
      }
    },
    // 设置table样式
    addClass({ row, column, rowIndex, columnIndex }) {
      if(rowIndex == 4 || rowIndex == 5) {
          return 'textCenter'
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