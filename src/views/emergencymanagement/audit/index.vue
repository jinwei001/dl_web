<template>
  <!-- <h2>
      应急预案审核
  </h2>-->
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="userselect" inline>
          <el-form-item label="预案名称:">
            <el-input v-model="userselect.planmae" clearable></el-input>
          </el-form-item>
          <el-form-item label="预案等级:">
            <el-select v-model="userselect.planlevel" clearable placeholder="请选择">
              <el-option label="一级" value="1"></el-option>
              <el-option label="二级" value="2"></el-option>
              <el-option label="三级" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预案类型:">
            <el-select v-model="userselect.plantype" clearable placeholder="请选择">
              <el-option label="抢修预案" value="1"></el-option>
              <el-option label="应急处置预案" value="2"></el-option>
              <el-option label="供电恢复预案" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="`${$xl}:`">
            <!-- <el-select
              v-model="userselect.lineName"
              filterable
              clearable
              placeholder="请选择"
              style=" width: 100%;"
            >
              <el-option
                v-for="item in linetable"
                :key="item.id"
                :label="item.lineName"
                :value="item.id"
              ></el-option>
            </el-select>-->
            <el-select
              v-model="userselect.lineName"
              filterable
              clearable
              @change="linexl"
              value-key="lineName"
              placeholder="请选择"
              style=" width: 100%;"
            >
              <el-option
                v-for="item in linetable"
                :key="item.id"
                :label="item.lineName"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item> -->
          <!-- <el-select
              v-model="userselect.poststatus"
              clearable
              placeholder="请选择"
              style=" width: 100%;"
            >
              <el-option
                v-for="item in sj"
                :key="item.objId"
                :label="item.bzmc"
                :value="item.objId"
              ></el-option>
          </el-select>-->
          <!-- </el-form-item> -->

          <el-form-item label="预案状态：">
            <el-select v-model="userselect.placurrentstate" clearable placeholder="请选择">
              <el-option label="提交" value="1"></el-option>
              <el-option label="退回" value="2"></el-option>
              <el-option label="通过审核" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width:180px;height:40px" />
          <el-form-item style="float: right;margin-right: 0">
            <el-button class="onSearch" @click="onSearch">查询</el-button>
            <el-button class="onSearch" @click="reset" style="margin-right: 0">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content">
      <div class="respont-content">
        <div class="table">
          <el-table
            :data="tableData"
            style="border: 1px solid #c4c8cf"
            :cell-style="{borderColor: '#c4c8cf'}"
            :header-cell-style="{'background':'#cddce6',borderColor: '#c4c8cf'}"
            border
            fit
            highlight-current-row
          >
            <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
            <el-table-column prop="planno" label="预案编号" align="center" width="200"></el-table-column>
            <el-table-column prop="planmae" label="预案名称" align="center"></el-table-column>
            <el-table-column prop="planlevel" label="预案等级" align="center">
              <template
                slot-scope="scope"
              >{{scope.row.planlevel==1?"一级":scope.row.planlevel==2?"二级":scope.row.planlevel==3?"三级":''}}</template>
            </el-table-column>
            <el-table-column prop="plantype" label="预案类型" align="center" width="150">
              <template
                slot-scope="scope"
              >{{scope.row.plantype==1?"抢修预案":scope.row.plantype==2?"应急处置预案":scope.row.plantype==3?"供电恢复预案":''}}</template>
            </el-table-column>
            <el-table-column prop="lineName" :label="`${$xl}`" align="center"></el-table-column>
            <!-- <el-table-column prop="poststatus" label="发布状态" align="center"></el-table-column> -->
            <el-table-column prop="placurrentstate" label="预案当前状态" align="center">
              <template
                slot-scope="scope"
              >{{scope.row.placurrentstate==1?"提交":scope.row.placurrentstate==2?"退回":scope.row.placurrentstate==3?"通过审核":""}}</template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作"
              class-name="small-padding fixed-width"
              width="300"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button
                  class="onSearch"
                  size="small"
                  v-if="scope.row.operatingState==2"
                  @click="editFun(scope.row.objId)"
                >审批</el-button>
                <el-button class="onSearch" size="small" v-else @click="view(scope.row.objId)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <Pagination
            v-show="form.total>0"
            :total="form.total"
            :page.sync="userselect.pageNum"
            :limit.sync="form.limit"
            @pagination="getList"
          />
        </div>
      </div>
    </div>
    <div v-if="isShowDialog">
      <add @chiladddFn="parentaddFn" :openID="openID" :isEdit="isEdit" />
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import qs from "qs";
import add from "./add";
import info from "@/api/emergencymanagement/plan";
import request from "@/utils/request";
import { GropList, UserList, ExportFn } from "@/api/public";
import { Info } from "@/api/productionReadiness/projectInformation/projectInfo";
import { getUserId, getUserName } from "@/utils/auth";
export default {
  components: {
    Pagination,
    add
  },
  data() {
    return {
      isviewDialog: false, //查看弹框打开
      isShowDialog: false, //新增弹框打开
      isEdit: false, //是否是编辑弹框
      openID: null, //打开弹框的id值
      isAdd: false, //是否是新增弹框
      form: {
        limit: 10,
        total: 0
      },
      userselect: {
        pageNum: 1,
        pageSize: 10,
        placurrentstate: null,
        lineName: null,
        plantype: null,
        planlevel: null,
        planmae: null,
        poststatus: null
      },
      selection: {
        xlmc: [{ id: "1", qb: "全部" }]
      },
      isedit: true,
      tableData: [],
      openLC: false,
      tijiao: true,
      group: [],
      userinfo: [],
      lcdata: {
        objId: null,
        dealingpeopleid: null,
        dealingpeoplename: null,
        nextDealingpeopleId: null,
        nextDealingpeopleName: null,
        auditopinion: null,
        planid: null,
        objId: null,
        processState: 1
      },

      line: {
        lineNature: "主线"
      },
      linetable: [],
      sj: [],
      tijiaoId: null
    };
  },
  created() {
    this.LineName(this.line);
    Info(qs.stringify({ fzid: "YJYA_SJ_TYPE" })).then(res => {
      this.sj = res.data.data;
    });
  },
  mounted() {
    this.getList();
  },
  methods: {
    /**查询按钮 */
    onSearch() {
      this.getList();
    },
    /**重置按钮 */
    reset() {
      this.userselect = {
        pageNum: 1,
        pageSize: 10,
        operatingState: null,
        lineName: null,
        plantype: null,
        planlevel: null,
        planmae: null,
        eventtype: null
      };
      this.getList();
    },
    linexl(val) {
      //console.log(val);
      if (val != null) {
        this.userselect.lineName = val.lineName;
        this.userselect.lineid = val.id;
      } else {
        this.userselect.lineName = null;
        this.userselect.lineid = null;
      }
    },
    /**列表数据 */
    getList() {
      info
        .getList()
        .then(res => {
          this.tableData = res.data.rows;
          this.form.total = res.data.total;
        })
        .catch(err => {});
    },
    /**处理流程 */
    editFun(val) {
      //console.log(val);
      this.isEdit = true;
      this.isShowDialog = true;
      this.openID = val;
    },
    /**查看流程 */
    view(val) {
      this.isEdit = false;
      this.isShowDialog = true;
      this.openID = val;
    },
    /**xl名称 */
    LineName(res) {
      info.Linelist(this.$qs.stringify(res)).then(res => {
        //console.log(res, "xianlu名称");
        this.linetable = res.data.rows;
      });
    },
    /**
     * 重置按钮
     */
    reset() {
      //console.log("reset");
      this.userselect = {
        pageNum: 1,
        pageSize: 10,
        operatingState: null,
        lineName: null,
        plantype: null,
        planlevel: null,
        planmae: null,
        eventtype: null
      };
      this.userselect.pageNum = 1;
      this.userselect.pageSize = 10;
      this.getList();
    },
    /**
     * 查询按钮
     */
    onSearch() {
      //console.log("onSearch");
      this.getList();
    },
    getList() {
      info
        .getList(qs.stringify(this.userselect))
        .then(result => {
          this.tableData = result.data.rows;
          //console.log(result);
          this.form.total = result.data.total;
        })
        .catch(err => {
          //console.log(err);
        });
    },

    /**
     * 接收浏览流程子组件的数据
     */
    parentaddFn(val) {
      this.isShowDialog = false;
      this.isAdd = val.isAdd;
      this.isviewDialog = val.isviewDialog;
      this.isEdit = val.isEdit;
      this.openLC = val.openLC;
      this.tijiao = val.tijiao;
    }
  }
};
</script>
<style lang="scss" scoped>
.Form-input .el-form-item__content .el-textarea.el-input--suffix {
  width: 100%;
}
</style>