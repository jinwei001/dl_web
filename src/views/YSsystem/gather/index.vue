<template>
  <!-- <h1>采集模板库</h1> -->
  <div class="main-body">
    <div class="respont-content">
      <el-form>
        <el-col style="display: flex;justify-content: space-between;margin-bottom:1rem">
          <el-form-item>
            <el-button class="onSearch" @click="Addfun">
              <i class="el-icon-plus">新增</i>
            </el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <div class="table-tree">
      <el-table
        :data="tableData"
        row-key="objId"
        ref="tableTreeRef"
        default-expand-all
        highlight-current-row
        style="border: 1px solid #c4c8cf"
        :header-cell-style="{'background':'#cddce6',borderColor: 'transparent'}"
        :tree-props="{children: 'children'}"
      >
        <el-table-column
          prop="name"
          label="目录"
          width="400"
          header-align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="dec" label="采集描述" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="content" label="关联管控卡" align="left" header-align="center">
          <template slot-scope="scope">
            <div class="TkFn" @click="TkFn(scope.row.content)" v-html="scope.row.content"></div>
          </template>
        </el-table-column>
        <el-table-column prop="pid" label="操作" width="250" align="center">
          <template slot-scope="scope">
            <el-col>
              <el-button
                class="onSearch"
                size="small"
                v-if="scope.row.lv<3"
                @click="AddSon(scope.row)"
              >新增</el-button>
              <el-button class="onSearch" size="small" @click="editFun(scope.row)">编辑</el-button>
              <el-button type="danger" size="small" plain @click="DelFunOne(scope.row)">删除</el-button>
            </el-col>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :visible.sync="visible"
      title="关联管控卡"
      v-dialogDrag
      :center="true"
      top="25vh"
      width="30%"
    >
      <div class="scnr-content" v-html="content"></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="visible = false">确定</el-button>
      </div>
    </el-dialog>
    <div v-if="addfather">
      <addfather @childFn="parentFn" :openobj="openobj" />
    </div>
    <div v-if="addsonshow">
      <addson @childFn="parentsonFn" :openobj="openobj" :iseditson="iseditson" />
    </div>
    <div v-if="editfathershow">
      <editfather @childFn="parentBJFn" :openobj="openobj" />
    </div>
  </div>
</template>
<script>
import info from "@/api/YSsystem/gather";
import addfather from "./addfather";
import addson from "./addson";
import editfather from "./editfather";
import qs from "qs";
export default {
  components: {
    addfather,
    addson,
    editfather
  },
  data() {
    return {
      openobj: {
        objId: null
      },
      addfather: false,
      addsonshow: false,
      editfathershow: false,
      iseditson: false,
      tableData: [],
      CheckedSelection: [],
      selectedIDs: null,
      visible: false,
      content: null
    };
  },
  watch: {},
  created() {
    this.getList();
  },
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
    editFun(val) {
      //console.log(val);
      // this.editfathershow = true;
      // this.addfather = false;
      // this.addsonshow = false;
      if (val.children.length == 0 && val.lv >= 3) {
        this.editfathershow = false;
        this.openobj = val;
        this.addfather = false;
        this.addsonshow = true;
        this.iseditson = true;
      } else {
        this.editfathershow = true;
        this.addfather = false;
        this.addsonshow = false;
        this.openobj = val;
      }
    },
    /**审查内容弹框 */
    TkFn(val) {
      this.content = val;
      this.visible = true;
    },
    DelFunOne(val) {
      if (val.children.length > 0) {
        this.$message("请先删除的子菜单中的数据！！");
        return false;
      }
      this.CheckedSelection = val;
      //console.log(val);
      this.selectedIDs = this.CheckedSelection["objId"];
      //console.log(this.selectedIDs);
      if (this.CheckedSelection.length <= 0) {
        this.$message("请选择要删除的数据");
        return false;
      }
      this.$confirm("确认要删除数据吗？")
        .then(_ => {
          info.del(this.selectedIDs).then(res => {
            //console.log(res);
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getList();
          });
          done();
        })
        .catch(_ => {});
    },
    /**新增父节点 */
    Addfun() {
      this.addfather = true;
      this.editfathershow = false;
      this.addsonshow = false;
    },
    /**新增子节点 */
    AddSon(val) {
      if (val.lv < 3) {
        this.openobj = val;
        this.addsonshow = true;
        this.addfather = false;
        this.editfathershow = false;
        this.iseditson = false;
      }
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

    /** 接收浏览流程子组件的数据*/
    parentFn(val) {
      this.addfather = val.showDialog;
    },
    /** 接收浏览流程子组件的数据*/
    parentsonFn(val) {
      //console.log(val);
      this.addsonshow = val.showDialog;
    },
    parentBJFn(val) {
      this.editfathershow = val.showDialog;
    }
  }
};
</script>
<style lang="scss" scoped>
.el-table__expand-icon {
  width: 2rem !important;
}
.table-tree {
  tbody {
    tr.el-table__row {
      td {
        border-bottom: 0.5px solid #c4c8cf;
        border-right: transparent;
        border-left: transparent;
      }
    }
  }
}
.TkFn {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>