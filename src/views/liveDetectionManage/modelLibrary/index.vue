<template>
  <!-- <div>
    <h2>标准隐患库</h2>
  </div>-->
  <div class="main-body">
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
        <el-table :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}"
          :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}" border fit highlight-current-row
          @selection-change="CheckFun">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column type="index" label="序号" width="60" align="center" />
          <!-- <el-table-column prop="name" label="运维单位" align="center"></el-table-column> -->
          <el-table-column v-for="item in tableTitle" :key="item.index" :prop="item.prop" :label="item.label" align="center"
            :show-overflow-tooltip="tabisoverflow" />
          <el-table-column align="center" label="操作" class-name="small-padding fixed-width" width="150">
            <template slot-scope="scope">
              <el-col>
                <el-button class="onSearch" size="small" @click="editFun(scope.row)">编辑</el-button>
              </el-col>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="tableData.length>0" :total="form.total" :page.sync="tableParam.pageNum" :limit.sync="form.limit"
          @pagination="getList" />
        <!--  total:总条目数 -->
      </div>
    </div>
   <Add v-if="isShowDialog" :is-show-dialog="isShowDialog" :Detailsdata="Details" :is-edit="isEdit" :open-i-d="openID"
      :isAdd="isAdd" @childFn="parentFn" />
  </div>
</template>
<script>
  import Pagination from '@/components/Pagination'
  import Add from './add'
  import {
    List,
    remove
  } from '@/api/liveDetectionManage/modelLibrary'
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
        shangchuArry: [],
        CheckedSelection: [],
        Details: [],
        isShowDialog: false, // 查看弹框打开
        isEdit: false, // 是否是编辑弹框
        openID: null, // 打开弹框的id值
        isAdd: false, // 是否是新增弹框
        tabisoverflow: true,
        // ----------------------------------搜索栏下拉数据--------------------------------------
        selection: {},
        isedit: true,
        // 选中的数据
        CheckedSelection: [],
        // 表头
        tableTitle: [{
            label: '供应商',
            prop: 'gys'
          },
          {
            label: '服务商',
            prop: 'fws'
          },
          {
            label: '施工单位',
            prop: 'sgdw'
          }
        ],
        form: {
          pageNum: 1,
          limit: 10,
          total:0
        },
        tableParam: {
          pageNum: 1,
          pageSize: 10,
        },
        tableData: []
      }
    },
    created() {},
    mounted() {1
      this.getList()
    },
    methods: {
      /**
       * 重置按钮
       */
      reset() {
        //console.log('reset')
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
            if (response.status == 200) {
              if (response.data.msg == '操作成功') {
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
        List(qs.stringify(this.tableParam)).then(response => {
          if (response.status == 200) {
            //console.log(response.data.rows[0], '111111')
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
        this.Details = val
        this.isEdit = true
        this.isShowDialog = true
      },
      /** 新增按钮 */
      Addfun() {
        this.isAdd = true
        this.isShowDialog = true
      },
      /**
       * 接收子组件的数据
       */
      parentFn(val) {
        this.isShowDialog = val.showDialog
        this.isEdit = val.editbtn
        this.isAdd = val.addbtn
        if (val.Refresh) {
          this.getList()
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
