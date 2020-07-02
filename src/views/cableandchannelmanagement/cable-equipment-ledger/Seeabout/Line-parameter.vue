<template>
  <!-- <div>
    <h2>xl台账</h2>
  </div>-->
  <div class="main-userSelect">
    <!--<div class="searchForm_glf">-->
      <!--<el-form ref="form" inline>-->
        <!--<el-form-item label="xl名称：">-->
          <!--<el-input v-model="form.lineName" clearable />-->
        <!--</el-form-item>-->
        <!--<el-form-item style="float: right;margin-right: 0 !important">-->
          <!--<el-button class="onSearch" @click="onSearch">查询</el-button>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
    <!--</div>-->
    <div class="content" style="border-top: none">
      <div class="respont-content" v-if="zhpjHideButtomStatus">
        <el-form>
          <el-col>
           <!--{{gruClickID}}-->
            <el-form-item style="float: left;">
              <!--<el-button class="onSearch" @click="onSearch">-->
                <!--<i class="el-icon-plus">新增</i>-->
              <!--</el-button>-->
              <el-button class="onSearch" @click="editFn">
                <i class="el-icon-edit-outline">编辑</i>
              </el-button>
              <!--<el-button type="danger" plain @click="onSearch">-->
                <!--<i class="el-icon-close"></i> 删除-->
              <!--</el-button>-->
            </el-form-item>
            <el-form-item style="float: right;">
              <el-button class="onSearch" @click="exportData">
                <i class="el-icon-document"></i> 导出
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          style="border: 1px solid #c4c8cf"
          :cell-style="{borderColor: '#c4c8cf'}"
          :header-cell-style="{'background':'#cddce6',borderColor: '#c4c8cf'}"
          border
          fit
          highlight-current-row
          @selection-change="CheckFun"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column prop="lineName" :label="`${$xl}名称`" align="center"></el-table-column>
          <!--<el-table-column prop="name" :label="`${$xl}名称编号`" align="center"></el-table-column>-->
          <el-table-column prop="voltageRank" :label="`${$dydj}`" align="center"></el-table-column>
          <el-table-column prop="startPowerStation" label="起点电站" align="center"></el-table-column>
          <el-table-column prop="transportTime" label="投运日期" align="center"></el-table-column>
          <el-table-column prop="lineType" label="架设方式" align="center"></el-table-column>
          <el-table-column prop="assetNature" label="资产性质" align="center"></el-table-column>
          <el-table-column prop="runStatus" label="设备状态" align="center"></el-table-column>
          <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button class="onSearch" size="small" @click="view(scope.row.id)">查看</el-button>
              </template>
            </el-table-column>
        </el-table>
        <pagination
          v-show="form.total>0"
          :total="form.total"
          :page.sync="form.pageNum"
          :limit.sync="form.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
    <line-parameter-show
      ref="LineParameterShow"
      :isShowDialog="isShowDialog"
      @childFn="parentFn"
      :isEdit="isEdit"
      :isLook="isLook"
      :openID="openID"
      :gruClickID="gruClickID"
    />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import LineParameterShow from "./Line-parameter-show";
import {
  List,
  DeleteList,
  Edit,
  downLoadFileName
} from "@/api/cableandchannel/cable-equipment-ledger/Line/line-parameter";
import qs from "qs";
import { formatTime } from '../../../../utils'

export default {
  name: "CableEquipmentLedger",
  components: {
    Pagination,
    LineParameterShow
  },
  props: {
    childclickID: {
      default: null
    },
    zhpjobjpgc: {
      type: Object,
      default: function() {
      return {

      }
    }}
  },
  data() {
    return {
      zhpjHideButtomStatus:true,//状态结果管理隐藏按钮状态
      isShowDialog: false,
      isEdit: false, //是否是编辑弹框
      openID: '', //打开弹框的id值
      isLook: false, // 是否是查看
      gruClickID: this.childclickID, //祖父传的Id
      form: {
        id: this.childclickID,
        lineName: "",
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      //选中的数据
      CheckedSelection: [],
      selectedIDs: [],
      tableData: []
    };
  },
  provide() { // 父页面方法
    return {
      getList: this.getList,
    }
  },
  created() {
    //状态评价来源 如果该参数不为空则表示该页被状态评价 评价结果管理调用
    if(Object.keys(this.zhpjobjpgc).length > 0){
      this.zhpjHideButtomStatus=this.zhpjobjpgc.show//如果被评价结果管理调用隐藏不需要的按钮
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    onSearch() {
      // //console.log("onSearch");
      this.getList()
    },
    /**获取数据 */
    getList() {
      // //console.log(this.form);
      List(qs.stringify(this.form)).then(res => {
        //console.log(res);
        this.tableData = res.data.rows;
        this.form.total = res.data.total;

      });
    },
    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val;
      //console.log(this.CheckedSelection);
      let ids = [];
      this.CheckedSelection.map(item => {
        ids.push(item.id);
      });
      var chosenId = ids.join(); // 数组转字符串
      // var chosenId = ids.join(","); // 数组转字符串
      this.selectedIDs = chosenId; //选中数据中的所有id
    },
    // 编辑
    editFn() {
      if (
        this.CheckedSelection.length > 1 ||
        this.CheckedSelection.length <= 0
      ) {
        this.$message("请选择一条要编辑的数据");
        return false;
      }
      this.isShowDialog = true;
      this.isEdit = true;
      this.openID = this.CheckedSelection[0].id;
      // //console.log(this.CheckedSelection);
      // //console.log(this.openID);
      this.$refs.LineParameterShow.getEcho() // 调用子页面方法
    },

    exportFun() {
      //console.log("exportFun");
    },
    view(id){
      // //console.log("查看");
      this.isShowDialog = true;
      this.isEdit = false;
      this.openID = id
      this.$refs.LineParameterShow.getEcho() // 调用子页面方法
    },
    /**
     * 接收查看/编辑子组件的数据
     */
    parentFn(val) {
      this.isShowDialog = val.showDialog;
      this.isEdit = val.editbtn;
    },
    // 导出功能
    exportData() {
      downLoadFileName(this.form).then(response => {
        // //console.log(response)
        window.location.href = process.env.VUE_APP_BASE_API+'/common/download?fileName='+response.data.msg+'&delete=true'
      })
    },
  }
};
</script>
