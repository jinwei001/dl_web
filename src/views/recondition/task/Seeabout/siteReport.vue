<template>
  <div>
    <div class="main-body">
      <el-form>
        <el-col>
          <el-form-item style="float: left;">
            <el-button class="onSearch" @click="AddNewFn">
              <i class="el-icon-plus">新增</i>
            </el-button>
            <el-button type="danger" plain @click="deleteFn">
              <i class="el-icon-close"></i> 删除
            </el-button>
          </el-form-item>
        </el-col>
      </el-form>

      <div class="table" style="margin-top:3rem">
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
          <el-table-column prop="sbmc" label="勘察单位" align="center"></el-table-column>
          <el-table-column prop="xlmc" label="勘察工程" align="center"></el-table-column>
          <el-table-column prop="gtmc" label="勘察负责人" align="center"></el-table-column>
          <el-table-column prop="xh" label="勘察时间" align="center"></el-table-column>
          <el-table-column prop="sccj" label="勘察配合单位" align="center"></el-table-column>
          <el-table-column prop="tyrq" :label="`勘察${$xl}`" align="center"></el-table-column>
          <el-table-column prop="tyrq" label="勘察地点" align="center"></el-table-column>
          <el-table-column prop="tyrq" label="工作任务" align="center"></el-table-column>
          <el-table-column prop="tyrq" label="备注" align="center"></el-table-column>
          <el-table-column prop="name" label="操作" align="center">
            <template slot-scope="scope">
              <el-button class="onSearch" size="small" @click="view(scope.row.objId)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="form.total>0"
          :total="form.total"
          :page.sync="form.pageNum"
          :limit.sync="form.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      tableData: [
        {
          sbmc: "1"
        }
      ],
      form: {
        total: 3,
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    AddNewFn() {},
    deleteFn() {},
    view(val) {},
    getList() {},
    CheckFun() {}
  }
};
</script>

<style>
</style>