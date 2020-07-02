<template>
  <!-- <h2>
      应急预案审核
  </h2>-->
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="userselect" inline>
          <el-form-item label="设备类型:">
            <!-- <el-select v-model="userselect.devicetype" clearable placeholder="请选择"> -->
            <el-select
              v-model="userselect.devicetype"
              clearable
              placeholder="请选择"
              style=" width: 100%;"
            >
              <el-option
                v-for="item in sblx"
                :key="item.objId"
                :label="item.bzmc"
                :value="item.objId"
              ></el-option>
              <!-- </el-select> -->
            </el-select>
          </el-form-item>
          <el-form-item label="物资地点:">
            <el-input v-model="userselect.supplieslocation" clearable></el-input>
          </el-form-item>
          <el-form-item label="批次名称:">
            <el-input v-model="userselect.batchname" clearable></el-input>
          </el-form-item>
          <el-form-item label="生产厂家:">
            <el-input v-model="userselect.manufacturer" clearable></el-input>
          </el-form-item>
          <el-form-item label="出厂日期：">
            <el-col>
              <el-date-picker
                style="width: 100%;"
                v-model="userselect.manufacturedate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item style="width:180px;height:40px" />

          <el-form-item style="float: right;margin-right: 0">
            <el-button class="onSearch" @click="onSearch">查询</el-button>
            <el-button class="onSearch" @click="reset" style="margin-right: 0">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content">
      <div class="respont-content">
        <el-form>
          <el-col style="display: flex;justify-content: space-between;">
            <el-form-item>
              <el-button class="onSearch" @click="Addfun">
                <i class="el-icon-plus">新增</i>
              </el-button>
              <el-button type="danger" plain @click="deleteFn">
                <i class="el-icon-close"></i> 删除
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button class="onSearch" @click="exportFn">导出</el-button>
              <!-- <el-button type="primary" @click="exportFn">导出</el-button> -->
              <!-- <el-upload action="#">
                <el-button class="onSearch" @click="importFn">
                  <i class="el-icon-plus"></i> 导入
                </el-button>
              </el-upload>-->
              <!-- <el-button type="primary" @click="exportFn">
                <i class="el-icon-plus"></i> 导出
              </el-button>-->
            </el-form-item>
          </el-col>
        </el-form>
      </div>
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
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>

          <el-table-column
            v-for="item in tableTitle"
            :key="item.index"
            :prop="item.prop"
            :label="item.label"
            align="center"
            :show-overflow-tooltip="item.tabisoverflow"
            :min-width="item.width"
          />
          <el-table-column prop="manufacturedate" label="出厂日期" align="center" width="120">
            <template slot-scope="scope">
              <span>{{scope.row.manufacturedate | format('yyyy-MM-dd')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="putdate" label="投运日期" align="center" width="120">
            <template slot-scope="scope">
              <span>{{scope.row.putdate | format('yyyy-MM-dd')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-for="item in tableTitle2"
            :key="item.index"
            :prop="item.prop"
            :label="item.label"
            align="center"
            :show-overflow-tooltip="item.tabisoverflow"
            :min-width="item.width"
          />
          <el-table-column
            align="center"
            label="操作"
            class-name="small-padding fixed-width"
            width="150"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button class="onSearch" size="small" @click="editFun(scope.row.objId)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <Pagination
          v-show="form.total>0"
          :total="form.total"
          :page.sync="userselect.pageNum"
          :limit.sync="form.limit"
          @pagination="getList"
        />
      </div>
    </div>
    <div v-if="isShowDialog">
      <add @childFn="parentFn" :openobj="openobj" />
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import { postdata, Deldata } from "@/api/emergencymanagement/spare";
import { GropList, UserList, ExportFn } from "@/api/public";
import { Info } from "@/api/productionReadiness/projectInformation/projectInfo";
import { getUserId, getUserName } from "@/utils/auth";
import qs from "qs";
import add from "./add";
export default {
  components: {
    Pagination,
    add
  },
  data() {
    return {
      isShowDialog: false, //新增弹框打开
      isEdit: false, //是否是编辑弹框
      openID: null, //打开弹框的id值
      isAdd: false, //是否是新增弹框
      form: {
        limit: 10,
        total: 0
      },
      userselect: {
        pageNum: 1,
        pageSize: 10,
        devicetype: null,
        supplieslocation: null,
        batchname: null,
        manufacturer: null,
        manufacturedate: null
      },
      selection: {
        xlmc: [{ id: "1", qb: "全部" }]
      },
      isedit: true,
      tableData: [],
      openLC: false,
      sblx: [],
      group: [],
      userinfo: [],

      tableTitle: [
        {
          label: "设备类型",
          prop: "devicetypename",
          width: "200"
        },
        {
          label: "物资地点",
          prop: "supplieslocation",
          width: "200"
        },
        {
          label: "批次id",
          prop: "batchid",
          width: "200"
        },
        {
          label: "批次名称",
          prop: "batchname",
          width: "200"
        },
        {
          label: "批次说明",
          prop: "batchinstructions",
          width: "200"
        },
        {
          label: "数量",
          prop: "suppliesnumber",
          width: "200"
        },
        {
          label: "组号",
          prop: "groupnumber",
          width: "200"
        },
        {
          label: "型号",
          prop: "suppliestype",
          width: "200"
        },
        {
          label: "生产厂家",
          prop: "manufacturer",
          width: "200"
        },
        {
          label: "出厂编号",
          prop: "factorynumber",
          width: "200"
        }
        // {
        //   label: "出厂日期",
        //   prop: "manufacturedate",
        //   width: "200"
        // }
        // {
        //   label: "接头种类",
        //   prop: "jointtype",
        //   width: "200"
        // },
        // {
        //   label: "终端种类",
        //   prop: "terminaltype",
        //   width: "200"
        // }
      ],
      tableTitle2: [
        // {
        //   label: "投运日期",
        //   prop: "putdate",
        //   width: "200"
        // },
        {
          label: "资产编号",
          prop: "assetnumbers",
          width: "200"
        },
        {
          label: "设备主人",
          prop: "equipmentowners",
          width: "200"
        },
        {
          label: "材料",
          prop: "material",
          width: "200"
        }
      ],
      selectedIDs: [],
      CheckedSelection: [],
      openobj: {
        isEdit: false, //是否是编辑弹框
        openID: null, //打开弹框的id值
        isAdd: false //是否是新增弹框
      }
    };
  },
  created() {},
  mounted() {
    this.getList();
    Info(qs.stringify({ fzid: "YJYA_BPBJ_SBLX" })).then(res => {
      this.sblx = res.data.data;
    });
  },
  methods: {
    /**查询按钮 */
    onSearch() {
      this.getList();
    },
    /**重置按钮 */
    reset() {
      this.userselect = {
        pageNum: 1,
        pageSize: 10,
        devicetype: null,
        supplieslocation: null,
        batchname: null,
        manufacturer: null,
        manufacturedate: null
      };
      this.getList();
    },
    /**列表数据 */

    getList() {
      postdata("/cable/tYjglBpbj/list", qs.stringify(this.userselect))
        .then(res => {
          //console.log(res, "列表数据");
          this.tableData = res.data.rows;
          this.form.total = res.data.total;
        })
        .catch(err => {});
    },

    /**
     * 查询按钮
     */
    onSearch() {
      //console.log("onSearch");
      this.getList();
    },

    /**新增 */
    Addfun() {
      this.openobj.isAdd = true;
      this.isShowDialog = true;
      this.openobj.isEdit = false;
    },
    /**编辑按钮 */
    editFun(val) {
      //console.log(val);
      this.openobj.isAdd = false;
      this.isShowDialog = true;
      this.openobj.isEdit = true;
      this.openobj.openID = val;
    },
    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val;
      //console.log(this.CheckedSelection);
      let ids = [];
      this.CheckedSelection.map(item => {
        ids.push(item.objId);
      });
      var chosenId = ids.join(); // 数组转字符串
      // var chosenId = ids.join(","); // 数组转字符串
      this.selectedIDs = chosenId; //选中数据中的所有id
    },
    /**删除 */
    deleteFn() {
      if (this.CheckedSelection.length == 0) {
        this.$message("请选择要删除的数据");
        return false;
      }
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Deldata("/cable/tYjglBpbj/remove", this.selectedIDs)
            .then(res => {
              if (res.data.code == 0) {
                this.getList();
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "error"
                });
              }
            })
            .catch(err => {});
          done();
        })
        .catch(_ => {});
    },
    /**导出 */
    exportFn() {
      postdata("/cable/tYjglBpbj/export").then(res => {
        //console.log(res);
        if (res.data.code == 0) {
          window.location.href =
            process.env.VUE_APP_BASE_API +
            "/common/download?fileName=" +
            res.data.msg +
            "&delete=true";
          this.add_list = [];
          this.$message({
            message: "请稍等正在下载...",
            type: "success"
          });
        } else {
          this.$message({
            message: "下载失败，请联系管理员！！！",
            type: "error"
          });
        }
      });
    },
    /**
     * 接收浏览流程子组件的数据
     */
    parentaddFn(val) {
      this.isShowDialog = false;
      this.isAdd = val.isAdd;
      this.isShowDialog = val.isShowDialog;
      this.isEdit = val.isEdit;
      this.openLC = val.openLC;
      this.tijiao = val.tijiao;
    },
    /**
     * 接收子组件的数据
     */
    parentFn(val) {
      //console.log(val);
      this.isShowDialog = val.showDialog;
      this.isAdd = val.isAdd;
      this.isEdit = val.isEdit;
    }
  }
};
</script>
<style lang="scss" scoped>
.Form-input .el-form-item__content .el-textarea.el-input--suffix {
  width: 100%;
}
</style>