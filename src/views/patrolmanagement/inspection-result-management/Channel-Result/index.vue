<template>
  <!-- <h2>
      xl巡视结果管理
  </h2>-->
  <div class="main-body dis_mm">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="form" inline>
          <el-form-item label="通道名称:">
            <el-select
              v-model="form.tdId"
              filterable
              clearable
              placeholder="请选择"
              :filter-method="filterList"
            >
              <el-option
                v-for="item in tDList"
                :key="item.id"
                :label="item.tdName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运维班组:">
            <el-select v-model="form.xsbzId" clearable placeholder="请选择" @change="xsbz">
              <el-option
                v-for="item in selection.groupsArr"
                :key="item.id"
                :label="item.groupName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="巡视人:">
            <el-select v-model="form.xsrId" clearable filterable placeholder="请选择">
              <el-option
                v-for="item in selection.usersArr"
                :key="item.id"
                :label="item.username"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="巡视状态:">
            <el-select v-model="form.xszt" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.patrolStatusArr"
                :key="item.id"
                :label="item.patrolStatus"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="计划来源:">
            <el-select v-model="form.jhly" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.patrolFromArr"
                :key="item.id"
                :label="item.planFrom"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="巡视类型:">
            <el-select v-model="form.xslx" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.patrolTypesArr"
                :key="item.id"
                :label="item.typeName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计划巡视时间：">
            <el-col>
              <el-date-picker
                v-model="form.date"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item style="float: right;margin-right: 0">
            <el-button class="onSearch" @click="onSearch">查询</el-button>
            <el-button class="onSearch" @click="reset" style="margin-right: 0">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content">
      <div class="respont-content">
        <el-form>
          <el-col>
            <el-form-item style="float: left;">
              <el-button type="danger" plain @click="onSearch">
                <i class="el-icon-close"></i> 删除
              </el-button>
              <el-button type="primary" @click="qxAdd">登记缺陷</el-button>
        <!--      <el-button type="primary" @click="yhAdd">登记隐患</el-button> -->
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
          <el-table-column prop="jhxsrq" label="计划巡视日期" align="center" width="160"></el-table-column>
          <el-table-column prop="sdmc" label="通道名称" align="center" width="160"></el-table-column>
          <el-table-column prop="groupName" label="运维班组" align="center"></el-table-column>
          <el-table-column prop="name" label="巡视人" align="center"></el-table-column>
          <el-table-column label="计划来源" align="center">
            <template
              slot-scope="scope"
              class="bottleGreenBtnCon"
            >{{scope.row.jhly | patrolFrom(selection.patrolFromArr)}}</template>
          </el-table-column>
          <el-table-column label="巡视状态" align="center">
            <template
              slot-scope="scope"
              class="bottleGreenBtnCon"
            >{{scope.row.xszt | patrolStatus(selection.patrolStatusArr)}}</template>
          </el-table-column>
          <el-table-column prop="zxsj" label="执行时间" align="center" width="160"></el-table-column>
          <el-table-column label="巡视类型" align="center">
            <template
              slot-scope="scope"
              class="bottleGreenBtnCon"
            >{{scope.row.xslx | patrolType(selection.patrolTypesArr)}}</template>
          </el-table-column>
          <el-table-column prop="bz" label="备注" align="center"></el-table-column>
          <el-table-column align="center" label="操作" width="250">
            <template slot-scope="scope" class="bottleGreenBtnCon">
              <!-- <el-button v-if="scope.row.isRecord == 0" class="onSearch bottleGreenBtnCon" size="medium" @click="AddNewFun(scope.row.objId)">添加巡视记录</el-button> -->
              <el-button
                class="onSearch bottleGreenBtnCon"
                size="small"
                @click="editFun(scope.row.objId)"
              >编辑巡视记录</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="pageDetail.total>0"
          :total="pageDetail.total"
          :page.sync="searchForm.pageNum"
          :limit.sync="searchForm.pageSize"
          @pagination="getData"
        />
      </div>
    </div>
    <div v-if="isShowDialog">
      <Add @childFn="parentFn" :isEdit="isEdit" :openID="openID" :selection="selection" />
    </div>
    <div v-if="isShowDialogQx">
      <AddQx @childFn="parentFn"  :xlxsjgpg='xlxsjgobj'/>
    </div>
    <div v-if="isYHShowDialog">
      <AddYH v-if="isYHShowDialog&&YHselection" :is-show-dialog="isYHShowDialog"   :selection="YHselection" :yhdetaildatapn='YHDetaildata'
        @childFn="parentFn" />
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import Add from "./show";
import AddQx from "@/views/defect/register/Add";
import AddYH from "@/views/six-prevention/information-audit/cmp/add";
 import qs from 'qs'
import {
  channelResultList as list,
  PatrolPlanManagementDel as delData,
  channels,
  lines,
  groups,
  users,
  cables, // dl
  patrolWorker, // 巡视人
  patrolStatus, // 巡视状态
  patrolTypes, // 巡视类型
  patrolFrom // 计划来源
} from "@/api/patrolmanagement";
import { GETTBList } from "@/api/public";
 import {
    setList,
  } from '@/api/Sixdefensemanagement/HiddenDangerReview'
export default {
  name: "CableEquipmentLedger",
  components: {
    Pagination,
    Add,
    AddQx,
    AddYH
  },
  data() {
    return {
      xlxsjgobj:{},
      YHDetaildata:{},
      YHselection:{},//隐患
      tDList: [],
      isEdit: false,
      isShowDialogQx: false,
      isYHShowDialog: false,
      thisListId:null,
      openID: "",
      isShowDialog: false,
      form: {
        tdId: "",
        xsbzId: "",
        xsrId: "",
        xszt: "",
        jhly: "",
        xslx: "",
        date: [],
        pageNum: 1,
        pageSize: 10
      },
      openobject:{

      },
      pageDetail: {
        total: 0
      },
      searchForm: {
        pageNum: 1,
        pageSize: 10
      },
      selection: {
        channelsArr: [], //通道名称
        groupsArr: [], // 运维班组
        patrolWorker: [], // 巡视人
        patrolTypesArr: [], // 巡视类型
        patrolStatusArr: [], // 巡视状态
        patrolFromArr: [],
        usersArr: []
      },

      //选中的数据
      CheckedSelection: [],
      tableData: []
    };
  },
  created() {
    this.getData();
    channels().then(res => {
      this.selection.channelsArr = res.data.data;
      this.filterList();
    });
    groups().then(res => {
      this.selection.groupsArr = res.data.data;
    });
    users().then(res => {
      this.selection.usersArr = res.data.data;
    });
    patrolStatus().then(res => {
      this.selection.patrolStatusArr = res.data.data;
    });
    patrolFrom().then(res => {
      this.selection.patrolFromArr = res.data.data;
    });
    patrolTypes().then(res => {
      this.selection.patrolTypesArr = res.data.data;
    });
    cables().then(res => {
      this.selection.cablesArr = res.data.data;
    });
  },
  mounted() {
    this.setListfun()
  },
  methods: {
    //隐患弹出层需要获取默认下拉数据
    setListfun() {
      const list = {
        nowPage: 1
      }
      setList(qs.stringify(list)).then(response => {
        if (response.status == 200) {
          this.YHselection = response.data.rows[0]
        }
      })
    },
    xsbz(val){
      GETTBList("/api/select/getUsers", { groupId: val }).then(res => {
          //console.log(res);
          this.selection.usersArr = res.data.data;
        });
    },
    async getData() {
      // 获取列表数据
      let res = await list(this.searchForm);
      this.tableData = res.data.rows;
      this.pageDetail.total = res.data.total;
    },
    reset() {
      this.form = {
        tdId: "",
        xsbzId: "",
        xsrId: "",
        xszt: "",
        jhly: "",
        xslx: "",
        date: [],
        pageNum: 1,
        pageSize: 10
      };
      this.onSearch()
    },
    qxAdd() {
      if(this.CheckedSelection.length>0&&this.CheckedSelection.length<2){
        this.isShowDialogQx = true
        this.xlxsjgobj=this.CheckedSelection[0]//勾选获取对应row 传入隐患弹出层
        this.xlxsjgobj.starts='通道'//勾选获取对应row 传入隐患弹出层
      }else{
        if(this.CheckedSelection.length===0){
           this.$message('必须选择一条')
        }else{
           this.$message('只能选择一条')
        }
      }
    },
    yhAdd() {
      if(this.CheckedSelection.length>0&&this.CheckedSelection.length<2){
        this.isYHShowDialog=true
        this.YHDetaildata=this.CheckedSelection[0]//勾选获取对应row 传入隐患弹出层
      }else{
        if(this.CheckedSelection.length===0){
           this.$message('必须选择一条')
        }else{
           this.$message('只能选择一条')
        }

      }
    },
    /**
     * 查询按钮
     */
    onSearch() {
      for (let key in this.form) {
        this.searchForm[key] = this.form[key];
      }
     if (this.form.date != null) {
        this.searchForm.beginTime = this.form.date[0];
        this.searchForm.endTime = this.form.date[1];
      } else {
        this.searchForm.beginTime = null;
        this.searchForm.endTime = null;
      }
      delete this.searchForm.date;
      this.getData();
    },
    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val;
      //console.log(this.CheckedSelection);
    },
    /**
     * 查看按钮
     */
    viewFun(val) {
      //console.log("查看");
      //console.log(val);
      this.isShowDialog = true;
    },
    /**
     * 添加巡视记录
     */
    AddNewFun(val) {
      //console.log(val);
      this.isEdit = false;
      this.openID = val;
      this.isShowDialog = true;
    },
    /**
     * 编辑按钮
     * */
    editFun(val) {
      this.openID = val;
      this.isEdit = true;
      this.isShowDialog = true;
    },
    filterList(query = "") {
      let arr = this.selection.channelsArr.filter(item => {
        return item.tdName.includes(query) || item.id.includes(query);
      });
      if (arr.length > 20) {
        this.tDList = arr.slice(0, 20);
      } else {
        this.tDList = arr;
      }
    },
    /**
     * 接收子组件的数据
     */
    parentFn(val) {
      this.isShowDialog = false;
      this.isShowDialogQx = false;
      this.isyhshow = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.result {
  height: 300px;
}
</style>
