<template>
  <!-- <div>
    <h2>标准隐患库</h2>
  </div>-->
  <div class="main-body">
    <div class="searchForm_glf">
      <el-form ref="form" inline>
        <el-form-item label="检测单位名称:">
          <el-input v-model="Searchfrom.jcdw" type="text" clearable class="selectstyle" />
        </el-form-item>
        <!-- <el-form-item label="日期:">
          <el-form-item prop="time">
            <el-date-picker
              v-model="Searchfrom.time"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 100%;"
            />
          </el-form-item>
        </el-form-item> -->
        <el-form-item label="联系电话:">
          <el-input v-model="Searchfrom.lxr" type="text" clearable class="selectstyle" />
        </el-form-item>
        <el-form-item style="float: right;margin-right: 0">
          <el-button class="onSearch" @click="onSearch">查询</el-button>
          <el-button class="onSearch" style="margin-right: 0" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <div class="respont-content">
        <el-form>
          <el-col>
            <el-form-item style="float: left;">
              <el-button class="onSearch" @click="Addfun">
                <i class="el-icon-plus">新增</i>
              </el-button>
              <el-button type="danger" plain @click="deletefun">
                <i class="el-icon-close" /> 删除
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          style="border: 1px solid #c7c7c7"
          :cell-style="{borderColor: '#c7c7c7'}"
          :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}"
          border
          fit
          highlight-current-row
          @selection-change="CheckFun"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column type="index" label="序号" width="60" align="center" />
          <!-- <el-table-column prop="name" label="运维单位" align="center"></el-table-column> -->
          <el-table-column
            v-for="item in tableTitle"
            :key="item.index"
            :prop="item.prop"
            :label="item.label"
            align="center"
            :show-overflow-tooltip="tabisoverflow"
          />
          <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-col>
                <el-button class="onSearch" size="small" @click="editFun(scope.row)">编辑</el-button>
                <el-button class="onSearch" size="small" @click="PenaltiesFun(scope.row)">扣分</el-button>
                <el-button class="onSearch" size="small" @click="chakanFun(scope.row)">查看扣分</el-button>
              </el-col>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="tableData.length>0"
          :total="form.total"
          :page.sync="Searchfrom.pageNum"
          :limit.sync="form.limit"
          @pagination="getList"
        />

      </div>
    </div>
    <Add
      v-if="isShowDialog"
      :is-show-dialog="isShowDialog"
      :details-data="DetailsDataList"
      :is-edit="isEdit"
      :open-i-d="openID"
      :is-add="isAdd"
      :isPenalties="isPenalties"
      :ischakan='ischakan'
      @childFn="parentFn"
    />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import Add from './add'
import {
  List,
  remove
} from '@/api/liveDetectionManage/quality'
import qs from 'qs'
// import SectionShow from "./section";
export default {
  components: {
    Pagination,
    Add
    // SectionShow
  },
  data() {
    return {
      DetailsDataList: null, // 编辑详情数据集
      shangchuArry: [],
      CheckedSelection: [], // 列表复选选中数据
      Details: [],
      isShowDialog: false, // 查看弹框打开
      isEdit: false, // 是否是编辑弹框
      openID: null, // 打开弹框的id值
      isAdd: false, // 是否是新增弹框
      isPenalties:false,//扣分新增
      ischakan:false,
      tabisoverflow: true,
      // ----------------------------------搜索栏下拉数据--------------------------------------
      selection: {},
      isedit: true,
      // 表头
      tableTitle: [{
        label: '检测单位名称',
        prop: 'jcdw'
      },
      {
        label: '联系人',
        prop: 'lxr'
      },
      {
        label: '联系电话',
        prop: 'lxdh'
      },
      {
        label: '承接业务',
        prop: 'cdyw'
      },
      {
        label: '得分',
        prop: 'df'
      }
      ],
      form: {
        pageNum: 1,
        limit: 10,
        total: 0
      },
      Searchfrom: {
        pageNum: 1,
        pageSize: 10,
        time: [], // 时间数组
        jcdw: '', // 检测单位
        lxr: '', // 联系人
        jhkssj: '', // 开始时间
        jhjssj: '' // 结束时间
      },
      tableData: []
    }
  },
  watch: {
    'Searchfrom.time': {
      handler: function(val) {
        if (val.length > 0) {
          this.Searchfrom.jhkssj = val[0]
          this.Searchfrom.jhjssj = val[1]
        } else {
          this.Searchfrom.jhkssj = ''
          this.Searchfrom.jhjssj = ''
        }
      }
    }
  },
  created() {},
  mounted() {
    this.beifengSearch = JSON.parse(JSON.stringify(this.Searchfrom))
    this.getList()
  },
  methods: {
    /**
       * 重置按钮
       */
    reset() {
      this.Searchfrom.time = [], // 时间数组
      this.Searchfrom.jcdw = '', // 检测单位
      this.Searchfrom.lxr = '', // 联系人
      this.Searchfrom.jhkssj = '', // 开始时间
      this.Searchfrom.jhjssj = '', // 结束时间
      this.pageNum = 1,
      this.pageSize = 10,
      // this.Searchfrom=this.beifengSearch
      this.getList()
    },
    /**
       * 查询按钮
       */
    onSearch() {
      this.getList()
    },
    deletefun() {
      if (this.CheckedSelection.length > 0) {
        const data = {
          ids: this.shangchuArry.toString()
        }
        //console.log('删除')
        remove(qs.stringify(data)).then(response => {
          if (response.status === 200) {
            if (response.data.msg === '操作成功') {
              this.$message({
                message: response.data.msg,
                type: 'success'
              })
              this.getList()
            } else {
              this.$message({
                message: response.data.msg,
                type: 'error'
              })
            }
          }
        })
      } else {
        this.$message({
          message: '警告哦，清在列表中勾选你要删除的对象',
          type: 'warning'
        })
      }
    },
    getList() {
      // this.beifengSearch=JSON.parse(JSON.stringify(this.Searchfrom));
      List(qs.stringify(this.Searchfrom)).then(response => {
        if (response.status === 200) {
          this.tableData = response.data.rows
          this.form.total = response.data.total
        }
      })
    },
    // 选中数据
    CheckFun(val) {
      this.shangchuArry = []
      this.CheckedSelection = val
      //console.log(this.CheckedSelection, '删除数据')
      if (this.CheckedSelection.length > 0) {
        for (let i = 0; i < this.CheckedSelection.length; i++) {
          this.shangchuArry.push(this.CheckedSelection[i].id)
        }
      }
      //console.log(this.shangchuArry, '提交')
    },
    /**
       * 编辑按钮
       */
    editFun(val) {
      this.DetailsDataList = val
      this.isEdit = true
      this.isShowDialog = true
    },
    /** 新增按钮 */
    Addfun() {
      this.isAdd = true
      this.isShowDialog = true
    },
    PenaltiesFun(val){
      this.DetailsDataList = val
      this.isPenalties = true
      this.isShowDialog = true
    },
    chakanFun(val){
      this.DetailsDataList = val
      this.ischakan = true
      this.isShowDialog = true
    },
    /**
       * 接收子组件的数据
       */
    parentFn(val) {
      this.isShowDialog = val.showDialog
      this.isEdit = val.editbtn
      this.isAdd = val.addbtn
      this.isPenalties = val.Penaltiesbtn
      this.ischakan =val.chakanbtn
      if (val.Refresh) {
        this.getList()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
