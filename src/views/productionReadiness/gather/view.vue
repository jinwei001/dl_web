<template>
  <div class="single-row-title">
    <el-dialog
      v-dialogDrag
      :visible.sync="showDialog"
      title="查看工艺库-查看"
      :center="true"
      :before-close="handleClose"
      top="0vh"
      width="40%"
    >
      <div class="table-tree">
        <el-table
          :data="tableData"
          row-key="objId"
          ref="tableTreeRef"
          :default-expand-all="true"
          highlight-current-row
          style="border: 1px solid #c4c8cf"
          :header-cell-style="{'background':'#cddce6',borderColor: 'transparent'}"
          :tree-props="{children: 'children'}"
        >
          <el-table-column prop="name" label="目录" header-align="center"></el-table-column>

          <el-table-column prop="pid" label="操作" align="center">
            <template slot-scope="scope">
              <el-col>
                <el-button
                  size="small"
                  type="danger"
                  v-if="scope.row.lv==2"
                  @click="viePiceGKK(scope.row)"
                >查看图片</el-button>
                <el-button
                  type="warning"
                  size="small"
                  v-if="scope.row.lv>2"
                  @click="viePiceGKK(scope.row)"
                >整改前</el-button>
                <el-button
                  class="onSearch"
                  size="small"
                  v-if="scope.row.lv>2"
                  @click="viePiceGKK(scope.row)"
                >整改后</el-button>
              </el-col>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer"></div>
    </el-dialog>
    <div v-if="isshowPic">
      <showPic @childFn="parentFn" :fawjmc="wjmc" :fawjlj="wjlj" />
    </div>
  </div>
</template>

<script>
import showPic from "./show";
import info from "@/api/YSsystem/gather";
import qs from "qs";
export default {
  components: {
    showPic
  },
  data() {
    return {
      showDialog: true,
      tableData: [],
      isshowPic: false
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  watch: {
    tableData: function(nv, ov) {
      this.$nextTick(() => {
        this.expandAll();
      });
    }
  },
  methods: {
    expandAll() {
      const els = document.getElementsByClassName("el-table__expand-icon");
      for (let i = 0; i < els.length; i++) {
        els[i].click();
      }
    },
    
    /**取消*/
    handleClose() {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.showDialog = false;
          this.$emit("childFn", {
            showDialog: this.showDialog
          });
          done();
        })
        .catch(_ => {});
    },
    /**列表查询 */
    getList() {
      this.tableData = [];
      info
        .List()
        .then(res => {
          this.tableData = res.data;
          this.$forceUpdate();
        })
        .catch(err => {});
    },
    AddSon(val) {
      //console.log(val);
    },
    viePiceGKK(val) {
      //console.log(val);
        if (
          (val.picture_url1 == null && val.picture_url2 == null) ||
          (val.picture_url1 == "" && val.picture_url2 == "")
        ) {
          this.$message({
            message: "图片不存在！！！",
            type: "warning"
          });
          return false;
        }
      //console.log("查看图片");
      this.isshowPic = true;
      this.wjmc = val.wjmc;
      this.wjlj = process.env.VUE_APP_BASE_API + val.wjlj;
    },
    /**
     * 接收查看/编辑子组件的数据
     */
    parentFn(val) {
      //console.log(val);
      this.isshowPic = val.isshowPic;
    }
  }
};
</script>

<style>
</style>