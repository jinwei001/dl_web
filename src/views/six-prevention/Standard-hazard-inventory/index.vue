<template>
  <!-- <div>
    <h2>标准隐患库</h2>
  </div>-->
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="form" inline>
          <el-form-item label="隐患部件:">
            <el-select v-model="tableParam.hdparts" clearable placeholder="请选择">
              <el-option v-for="item in selection.HiddenComponentData" :key="item.id" :label="item.qb" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="隐患类型:">
            <el-select v-model="tableParam.hdtype" clearable placeholder="请选择">
              <el-option v-for="item in selection.HiddenDangerTypeData" :key="item.id" :label="item.qb" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="隐患等级:">
            <el-select v-model="tableParam.hdclass" clearable placeholder="请选择">
              <el-option v-for="item in selection.HiddenDangerLevelData" :key="item.id" :label="item.qb" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item style="float: right;margin-right: 0">
            <el-button class="onSearch" @click="onSearch">查询</el-button>
            <!--            <el-button class="onSearch" style="margin-right: 0" @click="reset">重置</el-button> -->
          </el-form-item>
        </el-form>
      </div>
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
        <pagination v-show="tableData.length>0" :total="tableData.length" :page.sync="tableParam.nowPage" :limit.sync="form.limit"
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
    getList,
    tHiddendangerTpWarehouseremove
  } from '@/api/Sixdefensemanagement/HiddenDanger'
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
        isSectionShowDialog: false, // 断面弹框打开
        isShowDialog: false, // 查看弹框打开
        isEdit: false, // 是否是编辑弹框
        openID: null, // 打开弹框的id值
        isAdd: false, // 是否是新增弹框
        tabisoverflow: true,
        form: {
          HiddenComponentSearchVal: '', // 隐患部件搜素关键字
          HiddenDangerTypeSearchVal: '', // 隐患类型搜素关键字
          HiddenDangerLevelSearchVal: '', // 隐患等级搜素关键字
          pageNum: 1,
          limit: 10
        },
        // ----------------------------------搜索栏下拉数据--------------------------------------
        selection: {
          HiddenComponentData: [{ // 隐患部件下拉数据
              id: '0',
              qb: '部件1'
            },
            { // 隐患部件下拉数据
              id: '1',
              qb: '部件2'
            },
            { // 隐患部件下拉数据
              id: '2',
              qb: '部件3'
            }
          ],
          HiddenDangerTypeData: [{ // 隐患部件下拉数据
              id: '0',
              qb: '类型1'
            },
            { // 隐患部件下拉数据
              id: '1',
              qb: '类型2'
            },
            { // 隐患部件下拉数据
              id: '2',
              qb: '类型3'
            }
          ],
          HiddenDangerLevelData: [{ // 隐患等级下拉数据
            id: '1',
            qb: '全部'
          }]
        },
        isedit: true,
        // 选中的数据
        CheckedSelection: [],
        // 表头
        tableTitle: [{
            label: '隐患部件',
            prop: 'hdparts'
          },
          {
            label: '隐患部件编号',
            prop: 'hdpartsnum'
          },
          {
            label: '隐患类型',
            prop: 'hdtype'
          },

          {
            label: '隐患类型编号',
            prop: 'hdtypenum'
          },
          {
            label: '隐患等级',
            prop: 'hdclass'
          },
          {
            label: '停电要求',
            prop: 'poweroutreq'
          },

          {
            label: '隐患原因',
            prop: 'hdreason'
          },
          {
            label: '隐患原因编号',
            prop: 'hdreasonnum'
          },
          {
            label: '隐患处置方案',
            prop: 'disposalplan'
          }
        ],
        tableParam: {
          // 列表查询的参数
          hdparts: '',
          hdtype: '',
          hdclass: '',

          nowPage: 1
        },
        tableData: []
      }
    },
    created() {},
    mounted() {
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
          tHiddendangerTpWarehouseremove(qs.stringify(data)).then(response => {
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
        getList(qs.stringify(this.tableParam)).then(response => {
          if (response.status == 200) {
            //console.log(response.data.rows[0], '111111')
            this.tableData = response.data.rows
            // this.form.total = response.data.rows[0].totleNumber
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
            this.shangchuArry.push(this.CheckedSelection[i].objId)
          }
        }
        //console.log(this.shangchuArry)
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
      /** 断面管理 */
      GlFun(val) {
        //console.log('断面管理22222222222')
        //console.log(val)
        this.isSectionShowDialog = true
        //console.log(this.isSectionShowDialog)
      },
      /** DelFunOne 删除一条 */
      DelFunOne(val) {
        //console.log('删除一条')
        //console.log(val)
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
      },
      /**
       * 接收来自断面的数据
       * */
      sectionparentFn(val) {
        //console.log(val)
        this.isSectionShowDialog = val
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
