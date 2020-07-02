<template>
  <div class="main-body">
    <!-- <div>状态评价结果管理</div> -->
    <div class="main-userSelect" v-if="ljyxpgButtomStatus">
      <div class="searchForm_glf">
        <div class="search-container">
          <!--查询表单-->
          <!--    //XL -->
          <el-form ref="Inquire" class="search-form" inline :model="Inquire">
            <el-form-item :label="$xl+'名称'" prop="lineobj">
              <el-select v-model="Inquire.lineobj" clearable placeholder="请选择" @change="line_changeFun" value-key="id"
                filterable>
                <el-option v-for="(item,index) in selection.linearry" :key="item.id" :label="item.lineName" :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$dydj" prop="voltageRank">
              <el-input v-model="Inquire.voltageRank" disabled />
            </el-form-item>
            <!--         <el-form-item label="最新评价结果" prop="newestResult">
                     <el-select v-model="Inquire.newestResult" clearable placeholder="请选择">
                       <el-option v-for="(item,index) in selection.Jgarry" :key="item.id" :label="item.value" :value="item.value" />
                     </el-select>
                   </el-form-item> -->
            <el-form-item label="定期评价结果" prop="regularResult">
              <el-select v-model="Inquire.regularResult" clearable placeholder="请选择" filterable>
                <el-option v-for="(item,index) in selection.Jgarry" :key="item.id" :label="item.value" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="定期评价日期" prop="regularDate">
              <!--    <el-date-picker v-model="Inquire.regularDate" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="daterange"
                       range-separator=" 至 " start-placeholder="开始日期" end-placeholder="结束日期" /> -->
              <el-date-picker v-model="Inquire.regularDate" type="datetimerange" format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss" range-separator="-" :picker-options="pickerOptions" :default-time="['00:00:00','23:59:59']"
                start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="动态评价结果" prop="dynamicResult">
              <el-select v-model="Inquire.dynamicResult" clearable placeholder="请选择" filterable>
                <el-option v-for="(item,index) in selection.Jgarry" :key="item.id" :label="item.value" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="动态评价日期" prop="dynamicDate">
              <el-date-picker v-model="Inquire.dynamicDate" type="datetimerange" format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss" range-separator="-" :picker-options="pickerOptions" :default-time="['00:00:00','23:59:59']"
                start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <!--查询按钮-->

          <div class="search-buttons">
            <el-button type="primary" size="small" class="onSearch" @click="getList">查询</el-button>
            <el-button type="primary" size="small" class="UserSearchFun" @click="ClickResetFun">重置</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="content" ref='contentref'>
      <!--数据操作-->
      <div class="record-operation">
        <el-button v-if="CheckedidArry.length>0" type="danger" size="small" plain @click="Generate_periodic_reviewsFun"
          class="onSearch">生成检修策略</el-button>
      </div>
      <!--数据列表-->
      <el-table :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}"
        :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}" border fit highlight-current-row
        @selection-change="CheckFun">
        <!--表格列-->
        <el-table-column type="selection" width="40" align="center" />
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
        <el-table-column fixed="right" label="操作" min-width="100" align="center" class-name="small-padding fixed-width"
          v-if="tableParam.total">
          <template slot-scope="scope">
            <p style="text-align: center;">
              <el-button class="onSearch" type="primary" size="mini" @click="DetailsFun(scope.row)">查看详情</el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="tableParam.total" :page.sync="tableParam.pageNum" :limit.sync="tableParam.limit" @pagination="getList" />
    </div>
    <AddorEditPopups :dialogParameterpg="dialogParameter" @childFn="parentFn" v-if="dialogParameter.showDialog===true"></AddorEditPopups>
  </div>
</template>

<script>
  import {
    line_list,//xl-selectData
    group_list,//bz-selectData
    sbzrList,//sbzr-selectData
  } from "@/api/statusE/cycle";//[request-address]
  import {
    list, // overall_list
    addcl
  } from "@/api/statusE/result";//[request-address]
  import qs from "qs";
  import Pagination from "@/components/Pagination";//page-cmp [cmp-address]
  import AddorEditPopups from "./cmp/AddorEdit-Pop-ups_cmp.vue"; //add+edit-Share-cmp [cmp-address]
  export default {
    name: "resultindex",
    components: {//注册
      Pagination,//page-cmp
      AddorEditPopups//add+edit-Share-cmp
    },
    data() {
      return {
        pickerOptions: {
          disabledDate: (time) => {
            // 如果函数里处理的数据比较麻烦,也可以单独放在一个函数里,避免data数据太臃肿
            return this.dealDisabledDate(time);
          }
        },
        ljyxpgButtomStatus:true,//老旧电缆规模老旧优化状态按钮隐藏false表示隐藏
        CheckedidArry: [],//勾选ID集合
        tableData: [], // 值守任务列列表数据
        tableParam: {
          // 值守列表分页和查询参数集合
          total: 0,
          pageNum: 1,
          pageSize: 10,
          limit: 10,
          lineId: "",//xl
          voltageRank: "",//dyaj
          dynamicResult: '', //动态评价结果
          regularResult: '', //定期评价结果
          regularDateStart: '',//定期开始时间
          regularDateEnd: '',//定期结束时间
          dynamicDateStart: '',//动态开始时间
          dynamicDateEnd: '',//动态结束时间
        },
        Inquire: {
          //列表查询绑定集合dynamicDateStart
          lineobj: '',//xl对象
          voltageRank: '',//dydj
          dynamicResult: '', //动态评价结果
          regularResult: '', //定期评价结果
          dynamicDate: [],//动态时间数组集合
          regularDate: []//定期评价时间
        },
        // 弹窗参数配置
        dialogParameter: {
          dialogWidth: "60%",
          title: "未知",
          showDialog: false, // 打开弹框
          Details: {}
        },
        selection: {
          //下拉数据集合
          linearry: [], //线路
          BZarry: [], //班组
          sbzrarry: [], //设备主人
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
        }
      };
    },
    mounted() {
      //老旧电缆规模老旧优化状态表来源
      //检修及试验管理/检修功能任务管理/基本资料与信息查询/上次状态评价报告
      if(Object.keys(this.ljyxpg).length > 0){
         this.ljyxpgButtomStatus=false//如果被老旧电缆规模老旧优化状态表调用隐藏不需要的按钮
         this.Inquire.lineobj={
           lineName:this.ljyxpg.lineName,
           id:this.ljyxpg.lineId
         }
         this.$refs.contentref.style.borderColor = "white";//隐藏掉content的上边框线
      }
      this.getList();//overall_list-F
      this.lineList();//xl_list-F
      this.BZList();//bz_list-F
      this.sbzrListFun();//sbzr_list-F
    },
    props: {
      ljyxpg: {
        type: Object,
        // 对象或数组且一定会从一个工厂函数返回默认值
        default: function() {
          return {}
        }
      }
    },
    methods: {
      // ————————————————————————————————————————列表——————————————————————————————————————————
      //列表
      getList() {
        this.tableParam.lineId = this.Inquire.lineobj.id !== "undefined" ? this.Inquire.lineobj.id : "";
        this.tableParam.voltageRank = this.Inquire.voltageRank;
        this.tableParam.regularResult = this.Inquire.regularResult //定期评价结果
        this.tableParam.dynamicResult = this.Inquire.dynamicResult //动态评价结果
        this.tableParam.regularDateStart = this.Inquire.regularDate.length > 0 ? this.Inquire.regularDate[0] : '' //定期开始时间
        this.tableParam.regularDateEnd = this.Inquire.regularDate.length > 0 ? this.Inquire.regularDate[1] : '' //定期结束时间
        this.tableParam.dynamicDateStart = this.Inquire.dynamicDate.length > 0 ? this.Inquire.dynamicDate[1] : '' //动态开始时间
        this.tableParam.dynamicDateEnd = this.Inquire.dynamicDate.length > 0 ? this.Inquire.dynamicDate[1] : '' //动态结束时间
        list(qs.stringify(this.tableParam)).then(response => {
          if (response.status === 200) {
            if (response.data.code === 0) {
              this.tableData = response.data.rows;
              this.tableParam.total = response.data.total;
            } else {
              this.tableData = [];
              this.tableParam.total = 0;
              this.$message({
                message: "周期列表获取失败",
                type: "error"
              });
            }
          }
        });
      },
      //重置
      ClickResetFun() {
        this.$refs["Inquire"].resetFields();
        this.$message({
          message: "重置成功",
          type: "success"
        });
        this.getList();
      },
      // 选中数据处理
      CheckFun(val) {
        this.CheckedidArry = [];
        const CheckedSelection = val;
        if (CheckedSelection.length > 0) {
          for (let i = 0; i < CheckedSelection.length; i++) {
            this.CheckedidArry.push(CheckedSelection[i].lineId);
          }
        }
      },
      // ————————————————————————————————————————下拉——————————————————————————————————————————
      //xl
      lineList() {
        line_list().then(response => {
          if (response.status === 200) {
            if (response.data.code === 0) {
              this.selection.linearry = response.data.rows;
            } else {
              this.selection.linearry = [];
              this.$message({
                message: "线路列表获取失败",
                type: "error"
              });
            }
          }
        });
      },
      //线路改变获取电压等级
      line_changeFun(val) {
        this.Inquire.voltageRank = "";
        if (val.voltageRank) {
          this.Inquire.voltageRank = val.voltageRank;
        }
      },
      //班组
      BZList() {
        group_list().then(response => {
          if (response.status === 200) {
            if (response.data.code === 0) {
              this.selection.BZarry = response.data.rows;
            } else {
              this.selection.BZarry = [];
              this.$message({
                message: "班组列表获取失败",
                type: "error"
              });
            }
          }
        });
      },
      //设备主人
      sbzrListFun() {
        sbzrList().then(response => {
          if (response.status === 200) {
            if (response.data.code === 0) {
              this.selection.sbzrarry = response.data.data;
            } else {
              this.selection.sbzrarry = [];
              this.$message({
                message: "设备主人列表获取失败",
                type: "error"
              });
            }
          }
        });
      },
      //检索时间段时间类型转化
      dealDisabledDate(time) {
        // time 是一个new Date数据
        if (new Date(time).getTime() > new Date().getTime()) {
          return time.getTime() >= (new Date().getTime()); //时间范围必须是时间戳
        }
      },
      // ————————————————————————————————————————删除——————————————————————————————————————————
      //删除
      deleteFun() {
        const data = {
          ids: this.CheckedidArry.toString()
        };
        remove(qs.stringify(data)).then(response => {
          if (response.status == 200) {
            if (response.data.msg == "操作成功") {
              this.$message({
                message: response.data.msg,
                type: "success"
              });
              this.CheckedidArry = [];
              this.getList();
            } else {
              this.$message({
                message: response.data.msg,
                type: "error"
              });
            }
          }
        });
      },
       // ————————————————————————————————————————生成定期评价——————————————————————————————————————————
      //生成定期评价
      Generate_periodic_reviewsFun() {
        if (this.CheckedidArry.length <= 0) {
          this.$message("请选择至少一条数据");
          return false;
        }
        this.$confirm("是否生成检修策略管理?", "提示", {
            confirmButtonText: "确定生成",
            cancelButtonText: "取消生成",
            type: "warning"
          })
          .then(result => {
            const data = {
              lineIds: this.CheckedidArry.toString()
            };
            addcl(data)
              .then(res => {
                console.log(res);
                this.$message({
                  message: res.data.msg,
                  type: "success"
                });
              })
              .catch(err => {});
          })
          .catch(err => {});
      },
      // ————————————————————————————————————————详情——————————————————————————————————————————
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
    }
  };
</script>
<style lang="scss">
  .table_style_zj {

    .el-table td,
    .el-table th {
      text-align: center;
    }
  }

  .el-form-itemstyle {
    margin-bottom: 20px;
  }

  .baodianrenwuxianqingbox {
    .el-form-item__label {
      font-size: 15px;
    }

    .el-form-item__content {
      font-size: 17px;
    }
  }
</style>
