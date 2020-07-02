<template>
  <!-- <h2>xl 巡视计划管理</h2> -->
  <div class="xs-hastitle">
    <el-dialog :visible.sync="showDialog" :title="`选择${$xl}`" v-dialogDrag :center="true" :before-close="selecthandleClose">
      <el-form ref="dataForm" :model="form" label-position="left" style="width:100% ;margin: 0 auto;">
        <div class="Form-input">
          <div class="Form-input">
            <div class="form-item">
              <label class="form-label">{{$xl}}：</label>
              <el-select v-model="form.id" filterable clearable placeholder="请选择">
                <el-option v-for="item in selection.linesSelectArr" :key="item.id" :label="item.lineName" :value="item.id"></el-option>
              </el-select>
              <label class="form-label">{{$dydj}}：</label>
              <el-select v-model="form.voltageRank" clearable placeholder="请选择">
                <el-option v-for="item in selection.dySelectArr" :key="item.id" :label="item.kv" :value="item.kv"></el-option>
              </el-select>
            </div>
            <div class="respont-content">
              <el-form>
                <el-col>
                  <el-button class="onSearch" @click="onSearch">查询</el-button>
                  <el-button class="onSearch" @click="AddNewTdFn">新增</el-button>
                </el-col>
              </el-form>
            </div>
          </div>
        </div>

        <div class="table">
          <div class="table">
            <el-table height="500" ref='multipleTable' :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}" :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}" border fit highlight-current-row @selection-change="CheckFun">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column type="index" label="序号" width="60" align="center">
                <template slot-scope="scope">
                  <span>{{(searchForm.pageNum - 1) * 10 + scope.$index + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="lineName" :label="$xl+'名称' " width="160"></el-table-column>
              <el-table-column prop="totalLength" :label="$dl+'段'">
                <template slot-scope="scope" style="">
                  <div class="bottleGreenBtnCon" v-if="scope.row.options.length!=0">
                    <el-select v-model="scope.row.dls" multiple placeholder="请选择" @change="restselect">
                      <el-option v-for="item in scope.row.options" :key="item.dlid" :label="item.dlmc" :value="item.dlid">
                      </el-option>
                    </el-select>
                    <el-button type="primary" size="small" @click="chooseAllFun(scope.row.doAll,scope.$index)">{{scope.row.doAll?'全选':'清空'}}</el-button>
                  </div>

                </template>
              </el-table-column>
              <el-table-column prop="qqd" label="起讫点" width="260"></el-table-column>
            </el-table>
            <pagination v-show="pageDetail.total>0" :total="pageDetail.total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize" @pagination="getData" />
          </div>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import '@/styles/myStyle/index.scss'
import Pagination from '@/components/Pagination'
// import { linesSelect as lineDetail } from '@/api/patrolmanagement'
import { dlSelects, linesSelect as lineDetail } from '@/api/liveDetectionManage'
export default {
  props: {
    selection: {}
  },
  components: {
    Pagination
  },
  data() {
    return {
      showDialog: true,
      CheckedSelection: [],
      form: {
        id: '',
        voltageRank: '',
        pageNum: 1,
        pageSize: 10
      },
      pageDetail: {
        total: 0
      },
      xszq: '',
      selectCheckTd: null,
      selectshowDialog: false, //选择通道
      tableData: [],

      searchForm: {
        id: '',
        voltageRank: '',
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      this.tableData = []
      // 获取列表数据
      let res = await lineDetail(this.searchForm)
      this.pageDetail.total = res.data.total

      let lineIds = []
      let setDlmsg = []

      let setDlArr = res.data.rows.forEach(res => {
        // 列表
        lineIds.push(res.id)
      })
      /**dlSelects */
      let dlres = await dlSelects({ ids: lineIds.join(',') }) // dl

      dlres.data.data.forEach(dlrow => {
        res.data.rows.forEach(linerow => {
          if (linerow.id == dlrow.lineId) {
            setDlmsg.push({
              ...linerow,
              dls: '',
              options: dlrow.value,
              doAll: true
            })
          }
        })
      })

      this.tableData = setDlmsg
    },
    chooseAllFun(doAll, ind) {
      if (doAll) {
        this.tableData[ind].options.forEach(res => {
          this.tableData[ind].dls.push(res.dlid)
          this.tableData[ind].doAll = false
        })
      } else {
        this.tableData[ind].doAll = true
        this.tableData[ind].dls = []
      }
    },
    /** 设置所选tableData 的dl信息  */

    onSearch() {
      for (let key in this.form) {
        this.searchForm[key] = this.form[key]
      }
      this.getData()
    },

    /**
     * 取消按钮
     */
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('childFn', {
            showDialog: false
          })
        })
        .catch(_ => {})
    },

    restselect() {
      // 如果 先选中列表  选中的 数据被 固定，如果再改变多选的话 就无法更新选中数据
      // 就需要 先取消选中  然后在选中之前的数据
      this.$refs.multipleTable.toggleRowSelection(this.tableData[0])
      this.$refs.multipleTable.toggleRowSelection(this.tableData[0])
    },
    //选中数据 [tableData3[1]
    CheckFun(val) {
      this.CheckedSelection = val
    },
    /**
     * 选择通道按钮--取消按钮
     */
    selecthandleClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('childFn', {
            showDialog: false
          })
        })
        .catch(_ => {})
    },

    /** 新增*/
    AddNewTdFn() {
      if (this.CheckedSelection.length === 0) {
        this.$confirm('请选择'+this.$xl)
        return
      }
      this.$emit('setLine', {
        lines: this.CheckedSelection
      })

      this.$emit('childFn', {
        showDialog: false
      })
    }
  }
}
</script>
<style lang="scss" scope>
.select-dy {
  .dy {
    float: left;
    width: 4.2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
  }
  :nth-child(2) {
    margin: 0 2rem;
  }

  .yes {
    background-color: #35b8c0;
    color: #fff;
    border: 1px solid #35b8c0;
  }
  .no {
    border: 1px solid #35b8c0;
    color: #35b8c0;
    background-color: #fff;
  }
}
</style>
