<template>
  <div>
    <el-dialog
      :visible.sync="isshow"
      title="线路查询"
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
            <label class="form-label">{{$dydj}}：</label>
            <el-select
              v-model="form.voltageRank"
              clearable
              placeholder="请选择"
              :disabled="isreadonly"
            >
              <el-option
                v-for="item in selection.dydj"
                :key="item.objId"
                :label="item.bzmc"
                :value="item.bzmc"
              ></el-option>
            </el-select>
          </div>
          <div class="form-item">
            <label class="form-label">运维班组：</label>
            <el-select v-model="form.groupId" clearable placeholder="请选择" :disabled="isreadonly">
              <el-option
                v-for="item in selection.xlbz"
                :key="item.objId"
                :label="item.groupname"
                :value="item.objId"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">{{$xl}}名称：</label>
            <el-select v-model="form.lineName" clearable filterable placeholder="请选择">
              <el-option
                v-for="item in selection.xlmc"
                :key="item.lineId"
                :label="item.lineName"
                :value="item.lineId"
              ></el-option>
            </el-select>
          </div>
          <div class="form-item">
            <label class="form-label">设备主人：</label>
            <el-input v-model="form.facilityMaster"></el-input>
          </div>
        </div>
        <div style="margin-left: 13%">
          <el-button class="onSearch" size="mini" @click="onSearch">查 询</el-button>
          <el-button class="UserSearchFun" size="mini" @click="reset">重 置</el-button>
        </div>

        <div class="table">
          <el-table
            :data="tableData"
            style="border: 1px solid #c7c7c7;margin-top:1rem"
            :cell-style="{borderColor: '#c7c7c7'}"
            :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}"
            border
            fit
            highlight-current-row
            @selection-change="CheckFun"
          >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
            <el-table-column align="center" prop="voltageRank" :label="`${$dydj}`"></el-table-column>
            <el-table-column align="center" prop="groupName" label="运维班组"></el-table-column>
            <el-table-column align="center" prop="facilityMaster" label="设备主人"></el-table-column>
            <el-table-column align="center" prop="lineName" :label="`${$xl}名称`"></el-table-column>
            <el-table-column align="center" prop="lineRank" :label="`${$xl}等级`"></el-table-column>
          </el-table>
          <pagination
            v-show="form.total>0"
            :total="form.total"
            :page.sync="form.pageNum"
            :limit.sync="form.pageSize"
            @pagination="getList"
          />
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-long-label">检修分类：</label>
            <el-select v-model="form.jxfl" clearable placeholder="请选择" @change="getselectionjxxm">
              <el-option
                v-for="item in selection.jxfl"
                :key="item.objId"
                :label="item.bzmc"
                :value="item.bzid"
              ></el-option>
            </el-select>
          </div>
          <div class="form-item">
            <label class="form-long-label">检修项目：</label>
            <el-select v-model="form.jxxm" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.jxxm"
                :key="item.objId"
                :label="item.bzmc"
                :value="item.bzid"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-long-label">上次检修日期：</label>
            <el-col>
              <el-date-picker
                style="width: 100%;"
                v-model="form.scjxrq"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </div>
          <div class="form-item">
            <label class="form-long-label">试验周期（年）：</label>
            <el-input v-model="form.jxzq" clearable></el-input>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-long-label">提前预警天数：</label>
            <el-input v-model="form.tqbjts" clearable></el-input>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="save">保 存</el-button>
        <el-button class="onSearch" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import {
  getLineGroup,
  getSelectMultiple,
  getList,
  getLineList,
  getLineSelect,
  searchLineList,
  addOverHaulCycle
} from "@/api/recondition/Rcycle";
export default {
  components: { Pagination },
  props: {
    openId: ""
  },
  data() {
    return {
      id: this.openId,
      isreadonly: false,
      isshow: true,
      tableData: [],
      CheckedSelection: [],
      // selectedIDs: [],
      form: {
        voltageRank: "",
        total: 0,
        pageNum: 1,
        pageSize: 10,
        transportTime: "",
        syxm: "",
        syfl: "",
        date: "",
        xlmc: "",
        xlid: "",
        jxfl: "",
        jxflmc: "",
        jxxm: "",
        jxxmmc: "",
        scjxrq: "",
        facilityMaster: "",
        jxzq: "",
        tqbjts: "",
        xcjxrq: ""
      },
      selection: {
        dydj: [],
        syfl: [],
        syxm: [],
        jxfl: [],
        ztpj: [],
        xlbz: [],
        xlmc: [],
        jxxm: []
      }
    };
  },
  mounted() {
    this.getSelectionList();
    this.getList();
  },
  methods: {
    // 获取下拉框数据
    getSelectionList() {
      getLineSelect().then(response => {
        if (response.status == 200) {
          this.selection.xlmc = response.data.data.lineList;
        }
      });
      // 获取xl班组
      getLineGroup().then(res => {
        this.selection.xlbz = res.data.rows;
      });
      // 获取检修分类  状态评价  电压等级
      getSelectMultiple(
        this.$qs.stringify({
          fzids: "CABLE_ER_TYPE,ZTPJ_PJJG,CABLE_VOLTAGE_RANK"
        })
      ).then(res => {
        this.selection.jxfl = res.data.data.CABLE_ER_TYPE;
        this.selection.ztpj = res.data.data.ZTPJ_PJJG;
        this.selection.dydj = res.data.data.CABLE_VOLTAGE_RANK;
      });
    },
    // 点击获取检修项目下拉框
    getselectionjxxm() {
      if (this.form.jxfl) {
        this.form.jxxm = "";
        this.selection.jxxm = [];
        getSelectMultiple(
          this.$qs.stringify({
            fzids: "CABLE_ER_TYPE_" + this.form.jxfl
          })
        ).then(res => {
          this.selection.jxxm =
            res.data.data["CABLE_ER_TYPE_" + this.form.jxfl];
        });
      } else {
        this.$message("请选择一个检修分类");
      }
    },
    //   获取列表数据
    getList() {
      getLineList(this.$qs.stringify(this.form)).then(res => {
        this.tableData = res.data.rows;
        this.tableData.forEach(item => {
          if (item.lineRank == "1") {
            item.lineRank = "一级高压" + this.$dl
          } else if (item.lineRank == "2") {
            item.lineRank = "二级高压" + this.$dl
          } else if (item.lineRank == "3") {
            item.lineRank = "三级高压" + this.$dl
          }
        })
        this.form.total = res.data.total;
      });
    },
    // 选择线路
    CheckFun(val) {
      this.CheckedSelection = val;
      let ids = [];
      this.CheckedSelection.map(item => {
        ids.push(item.id);
      });
      var chosenId = ids.join(); // 数组转字符串
      this.form.xlid = chosenId; //选中数据中的所有id
    },
    //   取消
    handleClose() {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.isshow = false;
          this.$emit("childFn", {
            isshow: false
          });
          done();
        })
        .catch(_ => {});
    },
    //   保存
    save() {
      if (this.form.xlid == '') {
        this.$message('请选择一条线路')
        return false
      }
      if (this.form.jxfl) {
        this.selection.jxfl.forEach(item => {
          if (this.form.jxfl == item.bzid) {
            this.form.jxflmc = item.bzmc;
          }
        });
      }
      if (this.form.jxxm) {
        this.selection.jxxm.forEach(item => {
          if (this.form.jxfl == item.bzid) {
            this.form.jxxmmc = item.bzmc;
          }
        });
      }
      this.form.xcjxrq =
        (
          Number(this.form.scjxrq.substring(0, 4)) + Number(this.form.jxzq)
        ).toString() + this.form.scjxrq.slice(4);
      addOverHaulCycle(this.$qs.stringify(this.form)).then(res => {
        if (res.data.code == 0) {
          this.$message({ message: "保存成功", type: "success" });
          this.$parent.getList();
          this.$emit("childFn", {
            isshow: false
          });
        }
      });
    },
    // 查询
    onSearch() {
      searchLineList(this.$qs.stringify(this.form)).then(res => {
        this.tableData = res.data.rows;
        this.form.total = res.data.total;
        this.form.pageNum = 1;
      });
    },
    // 重置
    reset() {
      this.form = { brand_right: 0 };
      this.form.pageNum = 1;
      this.form.pageSize = 10;
      this.getList()
    }
  }
};
</script>

<style>
</style>>