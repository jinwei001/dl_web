<template>
<div class='' style='margin-top:2rem'>
    <el-table
        :data="tableData_yhxx"
        style="border: 1px solid #c7c7c7"
        :cell-style="{borderColor: '#c7c7c7'}"
        :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}"
        border
        fit
        highlight-current-row
        >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <!-- <el-table-column prop="name" label="运维单位" align="center"></el-table-column> -->
        <el-table-column v-for="item in tableTitle" :key="item.index" :prop="item.prop" :label="item.label" align="center" min-width="200" />
        <el-table-column align="center" label="操作" class-name="small-padding fixed-width" min-width="150" fixed="right">
            <template slot-scope="scope">
            <el-col style="text-align: center;">
                <el-button class="onSearch" size="small" @click="ViewFun(scope.row)">查看</el-button>
            </el-col>
            </template>
        </el-table-column>
    </el-table>
    <!--查看隐患信息-->
    <Viewcmp v-if="ProcessingReviewData.show==true&&selection&&ProcessingReviewData.Detailsdata" :open-i-d="openID2"
             :submitparameter="ProcessingReviewData" :selection="selection" @childFn="parentFnYH" />
</div>
</template>

<script>
import Viewcmp from '@/views/six-prevention/information-audit/cmp/Viewcmp'
import {
  getList,
} from '@/api/Sixdefensemanagement/HiddenDangerReview' // 隐患信息
export default {
components: {
    Viewcmp
},
data() {
return {
    xlid: this.$route.query.bb,
    tableData_yhxx: [],
    openID2: 2, // 打开弹框的id值
    // 隐患信息表头
      tableTitle: [
        {
          label: '隐患编号',
          prop: 'hdidentifier',
          width:'200'
        },
        {
          label: this.$dydj,
          prop: 'dianYaName',
          width:'100'
        },
        {
          label: '隐患'+this.$xl,
          prop: 'linename',
          width:'200'
        },

        {
          label:this.$dl,
          prop: 'dianLanName',
          width:'280'
        },
        {
          label: '隐患地址',
          prop: 'findaddress',
          width:'300'
        },
        {
          label: '隐患设备类型',
          prop: 'sheBeiTypeName',
          width:'200'
        },
        {
          label: '隐患设备',
          prop: 'sheBeiName',
          width:'200'
        },
        {
          label: '处置状态',
          prop: 'chuzZhiZhuangTaiName',
          width:'100'
        },
        {
          label: '发现班组',
          prop: 'faXianBanZuName',
          width:'150'
        },
        {
          label: '发现人',
          prop: 'faXianRenName',
          width:'100'
        },
        {
          label: '发现方式',
          prop: 'faXianFangShiName',
          width:'100'
        },
        {
          label: '发现日期',
          prop: 'finddate',
          width:'200'
        },
        {
          label: '隐患源单位',
          prop: 'faXianYuanDanWeiName',
          width:'300'
        },
        {
          label: '隐患源联系人',
          prop: 'faXianYuanLanXiRenName',
          width:'100'
        },
        {
          label: '隐患联系电话',
          prop: 'telephone',
          width:'160'
        },
        {
          label: '隐患部位',
          prop: 'yinHuanBuWeiName',
          width:'200'
        },
        {
          label: '隐患类型',
          prop: 'liuFangName',
          width:'200'
        },
        {
          label: '隐患等级',
          prop: 'yinHuanDengJiName',
          width:'100'
        },
        {
          label: '隐患原因',
          prop: 'hdreason',
          width:'200'
        },
        {
          label: '当前节点',
          prop: 'dangQianJieDianName',
          width:'150'
        },
        {
          label: '当前处理人',
          prop: 'dangQianChuLiRenName',
          width:'100'
        }

      ],
    ProcessingReviewData: { // 隐患参数
    id: '3',
    show: false,
    Police: false,
    Detailsdata: {}
    },
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
    this.showYhxxDia()
},
mounted() {
    
},
methods: {
    // 查询隐患数据
    showYhxxDia() {
      let yhxxParam = {
        lineid:this.xlid,
        status:1,
        nowPage: 1
        } // 默认查流程结束的
      getList(this.$qs.stringify(yhxxParam)).then(response => {
        console.log(response);
        if (response.status == 200) {
          this.tableData_yhxx = response.data.rows[0].dataList //数据值
        }
      })
    },
    // 隐患查看
    ViewFun(row) {
      this.ProcessingReviewData.Detailsdata = row
      this.ProcessingReviewData.starts = 0
      this.ProcessingReviewData.Police = true
      this.ProcessingReviewData.show = true
    },
    // 隐患信息关闭
    parentFnYH() {
      this.ProcessingReviewData.show = false
    },
},
}
</script>
<style lang='scss' scoped>
</style>