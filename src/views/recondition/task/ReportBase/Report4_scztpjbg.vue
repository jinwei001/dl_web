<template>
<div class=''>
    <!--数据列表-->
      <el-table :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}"
        :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}" border fit highlight-current-row>
        <!--表格列-->
        <!-- <el-table-column type="selection" width="40" align="center" /> -->
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="lineName" :label="$xl+'名称'" min-width="200" />
        <el-table-column prop="voltageRank" :label="$dydj" min-width="180" />
        <el-table-column prop="groupName" label="维护班组" min-width="150" />
        <el-table-column prop="newestEvaluatorName" label="最新评价人" min-width="150" />
        <el-table-column prop="newestResult" label="最新评价结果" min-width="150">
          <template slot-scope="scope">
            <p v-for="(item,index) in selection.Jgarry" :key='index'>
              <span v-if="scope.row.newestResult===item.id">{{item.value}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="newestDate" label="最新评价日期" min-width="150" />
        <el-table-column prop="regularEvaluatorName" label="定期评价人" min-width="150" />
        <el-table-column prop="regularResult" label="定期评价结果" min-width="150">
          <template slot-scope="scope">
            <p v-for="(item,index) in selection.Jgarry" :key='index'>
              <span v-if="scope.row.regularResult===item.id">{{item.value}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="regularDate" label="定期评价日期" min-width="150" />
        <el-table-column prop="dynamicResult" label="动态评价结果" min-width="150">
          <template slot-scope="scope">
            <p v-for="(item,index) in selection.Jgarry" :key='index'>
              <span v-if="scope.row.dynamicResult===item.id">{{item.value}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="dynamicDate" label="动态评价日期" min-width="150" />
        <el-table-column prop="transportTime" label="投运日期" min-width="150" />
        <!--操作模板 列表数据为空时不显示-->
        <el-table-column fixed="right" label="操作" min-width="100" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <p style="text-align: center;">
              <el-button class="onSearch" type="primary" size="mini" @click="DetailsFun(scope.row)">查看详情</el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
      <AddorEditPopups :dialogParameterpg="dialogParameter" @childFn="parentFn" v-if="dialogParameter.showDialog===true"></AddorEditPopups>
</div>
</template>

<script>
import {list} from "@/api/statusE/result";
import qs from "qs";
import AddorEditPopups from "@/views/statusEvaluationManagement/result/cmp/AddorEdit-Pop-ups_cmp.vue";
export default {
components: {
    AddorEditPopups
},
data() {
return {
    xlid: this.$route.query.bb,
    tableData: [], // 值守任务列列表数据
    tableParam: {},
    selection: {
        Jgarry: [{
        id: 1,
        value: '正常状态'
        }, {
        id: 2,
        value: '注意状态'
        }, {
        id: 3,
        value: '异常状态'
        }, {
        id: 4,
        value: '严重状态'
        }],
    },
    // 弹窗参数配置
    dialogParameter: {
        dialogWidth: "60%",
        title: "未知",
        showDialog: false, // 打开弹框
        Details: {}
    },
};
},
computed: {},
watch: {},
created() {
    this.getList()
},
mounted() {

},
methods: {
    //列表
      getList() {
        this.tableParam.lineId = this.xlid;
        list(qs.stringify(this.tableParam)).then(response => {
          if (response.status === 200) {
            if (response.data.code === 0) {
              this.tableData = response.data.rows;
            } else {
              this.tableData = [];
              this.$message({
                message: "周期列表获取失败",
                type: "error"
              });
            }
          }
        });
      },
      //详情
      DetailsFun(val) {
        this.dialogParameter = {
          dialogWidth: "80%",
          title: "报告详情",
          showDialog: true, // 打开弹框
          Details: val
        };
        console.log(this.dialogParameter);
      },
      //弹出回调
      parentFn(val) {
        this.dialogParameter.showDialog = val.showDialog;
        this.getList();
        this.dialogParameter = {
          dialogWidth: "60%",
          title: "未知",
          showDialog: false,
          Details: {}
        };
      }
},

}
</script>
<style lang='scss' scoped>
</style>