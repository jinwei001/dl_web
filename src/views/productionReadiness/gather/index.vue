<template>
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="form" inline>
          <el-form-item label="工程名称：">
            <el-input v-model="form.gcmc" clearable />
          </el-form-item>
          <el-form-item label="创建日期：">
            <el-col>
              <el-date-picker
                v-model="time"
                type="daterange"
                value-format="yyyy-MM-dd HH:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-col>
          </el-form-item>

          <el-form-item style="float: right;margin-right: 0 !important">
            <el-button class="onSearch" @click="onSearch">查询</el-button>
            <el-button class="onSearch" style="margin-right: 0 !important" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content">
      <!-- <div class="respont-content">
        <el-form>
          <el-col>
            <el-form-item style="float: left;">
              <el-button class="onSearch" @click="Addfun">
                <i class="el-icon-plus"></i>
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>-->
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
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column
            v-for="item in tableTitle"
            :key="item.index"
            :prop="item.prop"
            :label="item.label"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            align="center"
            label="操作"
            class-name="small-padding fixed-width"
            width="250"
          >
            <template slot-scope="scope">
              <el-col>
                <el-button class="onSearch" size="small" @click="view(scope.row)">查看详情</el-button>
              </el-col>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :total="pagination.total"
          :page.sync="form.pageNum"
          :limit.sync="pagination.limit"
          @pagination="getList"
        />
      </div>
    </div>
    <div v-if="isview">
      <showview @childFn="parentFn" :openobj="openobj" />
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import info from "@/api/YSsystem/gather";
import showview from "./view";
import qs from "qs";
export default {
  name: "CableEquipmentLedger",
  components: {
    Pagination,
    showview
  },
  data() {
    return {
      form: {
        pageNum: 1,
        pageSize: 10,
        start_time: "",
        end_time: "",
        gcmc: ""
      },
      time: [],
      pagination: {
        limit: 10,
        total: 2
      },
      // 选中的数据
      CheckedSelection: [],
      selection: {
        xlmc: [
          {
            id: "1",
            qb: "全部"
          }
        ]
      },
      // 表头
      tableTitle: [
        {
          label: "工程名称",
          prop: "gcmc"
        },
        {
          label: "工程性质",
          prop: "gcxz"
        },
        {
          label: "工程属性",
          prop: "gcsx"
        },
        {
          label: this.$dydj,
          prop: "dydj"
        },
        {
          label: "创建时间",
          prop: "updateTime"
        },
        {
          label: "负责人",
          prop: "fzr"
        },
        {
          label: "负责单位",
          prop: "companyName"
        }
      ],
      tableData: [],
      fileList: [],
      isview: false,
      openobj: {}
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.getList();
  },
  methods: {
    reset() {
      //console.log("reset");
      this.form = {
        sbmc: "",
        objId: "",
        pageNum: 1,
        pageSize: 10,
        start_time: "",
        end_time: "",
        gcmc: ""
      };
      this.time = [];
      this.getList();
    },
    getList() {
      info
        .sgimage(this.form)
        .then(res => {
          this.tableData = res.data.rows;
          this.pagination.total = res.data.total;
        })
        .catch(err => {});
    },
    Addfun() {},
    view(val) {
      //console.log(val);
      //console.log("object");
      this.isview = true;
    },
    onSearch() {
      //console.log("onSearch");
      if (this.time) {
        this.form.start_time = this.time[0];
        this.form.end_time = this.time[1];
      }else{
        this.form.start_time = '';
        this.form.end_time = '';
      }
      this.getList();
    },
    CheckFun() {},

    /** 删除 */
    DelFunOne(val) {
      //console.log("删除");
      const list = {
        ids: val
      };
    },
    /**接收浏览流程子组件的数据 */
    parentFn(val) {
      this.isview = false;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
