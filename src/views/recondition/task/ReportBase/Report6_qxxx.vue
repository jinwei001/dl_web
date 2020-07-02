<template>
<div class='' style='margin-top:2rem'>
    <!--数据列表-->
    <el-table
        border
        stripe
        :data="tableData_qxxx"
        style="border: 1px solid #c7c7c7"
        :cell-style="{borderColor: '#c7c7c7'}"
        :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}"
        highlight-current-row
        >
        <!--表格列-->
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column prop="qxNumber" label="缺陷编号" min-width="160"></el-table-column>
        <el-table-column prop="discoveryTime" label="发现时间" min-width="160"></el-table-column>
        <el-table-column prop="voltageRank" :label="`${$dydj}`" min-width="120"></el-table-column>
        <el-table-column prop="qxGrade" label="缺陷等级" min-width="120"></el-table-column>
        <el-table-column prop="lineName" :label="`${$xl}`" min-width="150"></el-table-column>
        <el-table-column prop="dlName" :label="`缺陷${$dl}`" min-width="180"></el-table-column>
        <el-table-column prop="channelName" label="通道" min-width="80"></el-table-column>
        <el-table-column prop="channelJdName" label="通道段/井" min-width="150"></el-table-column>
        <el-table-column prop="groupName" label="发现班组" min-width="120"></el-table-column>
        <el-table-column prop="userName" label="发现人" min-width="90"></el-table-column>
        <el-table-column prop="discoveryMethod" label="发现方式" min-width="120"></el-table-column>
        <el-table-column prop="bj" label="缺陷部件" min-width="120"></el-table-column>
        <el-table-column prop="bw" label="缺陷部位" min-width="120"></el-table-column>
        <el-table-column prop="longitude" label="经度" min-width="120"></el-table-column>
        <el-table-column prop="latitude" label="纬度" min-width="120"></el-table-column>
        <el-table-column prop="currentNodeName" label="当前节点" min-width="120"></el-table-column>
        <!-- <el-table-column prop="processingStatus" label="处理状态" min-width="120"></el-table-column> -->
        <el-table-column prop="currentHandlerName" label="当前处理人" min-width="150"></el-table-column>
        <el-table-column prop="xqContent" label="缺陷内容" min-width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120" align="center">
            <template slot-scope="scope">
            <el-button class="onSearch" type="primary" size="mini" @click="CheckBtn(scope.row)">查看</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!--查看缺陷信息-->
    <div v-if="isShowCheckAndSure">
      <CheckAndSure :selection='selection' :isCheck='true' @childFn="parentFn" :thisDetail='thisDetail' :title="thisTitle" />
    </div>
</div>
</template>

<script>
import CheckAndSure from '@/views/defect/register/CheckAndSure' // 缺陷
import {
  registerList as list,
} from '@/api/defect' // 缺陷信息
export default {
components: {
    CheckAndSure
},
data() {
return {
    xlid: this.$route.query.bb,
    tableData_qxxx: [{}], // 缺陷信息列表
    isShowCheckAndSure: false,
    thisDetail: {},
    selection: {
        gzlx: [],
        yylx: [],
        gzyy: [],
    },
};
},
computed: {},
watch: {},
created() {
    this.showQxxxDia()
},
mounted() {

},
methods: {
    // 缺陷信息
    showQxxxDia() {
      // 获取列表数据
      let qxxxParam = {lineId:this.xlid}
      list(qxxxParam).then(res => {
        console.log(res);
        this.tableData_qxxx = res.data.rows
      })
    },
    // 缺陷查看
    CheckBtn(val) {
      // 查看
      this.isShowCheckAndSure = true
      this.thisTitle = '查看'
      this.thisDetail = val
      // this.isCheck = true
    },
    // 缺陷信息的关闭
    parentFn(val) {
      this.isShowCheckAndSure = false
    },
},
}
</script>
<style lang='scss' scoped>
</style>