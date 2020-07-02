<template>
  <div class="hastitle">
    <el-dialog
      :visible.sync="ChooseSSTDDialog"
      title="所属通道"
      :center="true"
      top="5vh"
      v-dialogDrag
      :before-close="handleClose"
    >
      <el-form
        ref="dataForm"
        :model="form"
        label-position="left"
        style="width:100% ;margin: 0 auto;"
      >
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">所属通道名称：</label>
            <el-input v-model="form.sbmc" clearable/>
          </div>
          <el-form-item style="float: right;margin-right: 0 !important">
            <el-button class="onSearch" @click="onSearch">查询</el-button>
<!--            <el-button class="onSearch" @click="reset" style="margin-right: 0 !important">重置</el-button>-->
          </el-form-item>
        </div>

        <div class="table">
          <el-table
            :data="tableData"
            style="border: 1px solid #c7c7c7"
            :cell-style="{borderColor: '#c7c7c7'}"
            :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}"
            border
            fit
            highlight-current-row
            @selection-change="CheckFun"
          >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
            <el-table-column align="center" prop="sdmc" label="所属通道" fixed="right"></el-table-column>
          </el-table>
          <pagination
            v-show="form.total>0"
            :total="form.total"
            :page.sync="form.pageNum"
            :limit.sync="form.pageSize"
            @pagination="getList"
          />
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="addChoose">新增</el-button>
        <el-button class="onSearch" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import { POSTTBList } from '@/api/public'
  import qs from 'qs'
  export default {
    name: 'chooseSSTDDialog',
    components: {
      Pagination
    },
    props: {},
    watch: {},
    data() {
      return {
        form: {
          sbmc: null,
          total: 0,
          pageNum: 1,
          pageSize: 10
        },
        ChooseSSTDDialog: true,
        tableData: [],
        CheckedSelection: [],
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        POSTTBList('/cable/channel/list', this.$qs.stringify(this.form))
        .then(res => {
          //console.log(res, '11111111111')
          this.tableData = res.data.rows
          this.form.total = res.data.total
        })
      },
      onSearch() {
        this.getList()
      },
      reset() {
        // this.form=
      },
      //选中数据
      CheckFun(val) {
        this.CheckedSelection = val;
        //console.log(this.CheckedSelection);
      },
      /**
       * 取消按钮
       */
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.ChooseSSTDDialog = false
            this.$emit('childFn', {
              ChooseSSTDDialog: false
            })
            done()
          })
          .catch(_ => {
          })
      },
      addChoose() {
        if (this.CheckedSelection.length == 1) {
          this.$emit('childFn', {
            ChooseSSTDDialog: false,
            ChooseValue: this.CheckedSelection
          })
        } else {
          this.$message("请选择一条所属通道");
        }
      }
    }
  }
</script>

<style scoped>

</style>
