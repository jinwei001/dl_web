<template>
  <div class="main-body-thirdmenu">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="form" inline>
          <el-form-item label="阶段：">
            <el-select v-model="form.jdid" clearable placeholder="请选择">
              <el-option v-for='item in selection.jdArr' :key="item.jdid" :label="item.jd" :value="item.jdid"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item style="float: right;margin-right: 0">
            <el-button size="small" class="onSearch" @click="onSearch">查询</el-button>
            <el-button size="small" class="onSearch" @click="reset" style="margin-right: 0">重置</el-button>
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
                <i class="el-icon-plus"> 新增</i>
              </el-button>
              <el-button type="danger" @click="DelAllFn">
                <i class="el-icon-close"> 批量删除</i>
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="tableData" height="550" style="border: 1px solid #c7c7c7;width:100%" :cell-style="{borderColor: '#c7c7c7'}" :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}" border fit highlight-current-row @selection-change="CheckFun">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column fixed type="index" label="序号" width="60" align="center">
            <template slot-scope="scope">
              <span>{{(searchForm.pageNum - 1) * 10 + scope.$index + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="阶段" align="center" prop="jd" width="150"></el-table-column>
          <el-table-column label="大类别" align="center" prop="dlb"></el-table-column>
          <el-table-column label="小类别" align="center" prop="xlb"></el-table-column>
          <el-table-column label="内容" align="center" width="300">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p v-html="scope.row.nr"></p>
                <div slot="reference" class="name-wrapper">
                  <span class="nrnowap">{{scope.row.nr}}</span>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="参考标准" align="center" prop="bz"></el-table-column>
          <el-table-column fixed="right" align="center" label="操作" class-name="small-padding fixed-width" width="230">
            <div slot-scope="scope">
              <el-button class="onSearch" size="small" @click="editFun(scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="del(scope.row.objId)">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
        <pagination v-show="pageDetail.total>0" :total="pageDetail.total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize" @pagination="getData" />
      </div>
    </div>
    <div v-if="isShowDialog">
      <Add :selection='selection' @childFn="parentFn" :thisDetail='thisDetail' :title="winTitle" />
    </div>

  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import Add from './Add'
import { Message } from 'element-ui'
import { xmList as list, xmDel as delData } from '@/api/systemManagement'
export default {
  components: {
    Pagination,
    Add
  },
  data() {
    return {
      isShowDialog: false, //查看弹框打开
      isShowResetPass: false, // 充值密码框
      winTitle: '新增项目工艺库',
      isEdit: '',
      v1: '',
      openID: '',
      thisDetail: {},

      form: {
        date: [],
        pageNum: 1,
        pageSize: 10
      },
      pageDetail: {
        total: 0
      },
      searchForm: {
        pageNum: 1,
        pageSize: 10
      },
      selection: {
        jdArr: [
          { jdid: 1, jd: '可研审查' },
          { jdid: 2, jd: '初设审查' },
          { jdid: 3, jd: '施工图审查' },
          { jdid: 4, jd: '施工交底' },
          { jdid: 5, jd: '通道建设' },
          { jdid: 6, jd: '电气施工' },
          { jdid: 7, jd: '试验' },
          { jdid: 8, jd: '通道验收' },
          { jdid: 9, jd: '电气施工' },
          { jdid: 10, jd: '竣工验收' }
        ]
      },
      //选中的数据
      CheckedSelection: [],
      tableData: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      // 获取列表数据
      let res = await list(this.searchForm)
      this.tableData = res.data.rows
      this.pageDetail.total = res.data.total

    },
    /**删除所有 */
    DelAllFn() {
      if (this.CheckedSelection.length == 0) {
        this.$message('请选择要编辑的数据')
        return
      }
      let idsArr = []
      this.CheckedSelection.forEach(v => {
        idsArr.push(v.objId)
      })

      this.del(idsArr.join(','))
    },

    del(ids) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delData({ ids }).then(val => {
            val = val.data
            let type = val.code == 0 ? 'success' : 'error'
            this.$message({ type, message: val.msg })
            if (val.code == 0) this.getData()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },

    reset() {
      this.form = {
        date: [],
        pageNum: 1,
        pageSize: 10
      }
    },
    onSearch() {
      for (let key in this.form) {
        this.searchForm[key] = this.form[key]
      }
      this.getData()
    },

    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val
    },
    editFun(val) {
      this.winTitle = '编辑项目工艺库'
      this.thisDetail = val
      this.isShowDialog = true
    },
    /**新增按钮 */
    Addfun() {
      this.winTitle = '新增项目工艺库'

      this.thisDetail = {}
      this.isShowDialog = true
    },

    /**
     * 接收查看/编辑子组件的数据
     */
    parentFn(val) {
      this.isShowDialog = false
      this.isShowResetPass = false
      this.getData()
    }
  }
  // filters: {
  //   shotnr(nr) {
  //     if (nr) console.log('----------', nr)
  //     // let snr = nr.replace(/<br\/>|\s/g,'')
  //     // console.log(snr)
  //     //  return nr.replace(/\s|\<br\/\>/g,'')
  //   }
  // }
}
</script>
