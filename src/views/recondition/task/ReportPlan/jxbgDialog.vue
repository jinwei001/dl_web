<template>
  <el-dialog
    :visible.sync="showDialog"
    title="检修施工方案"
    v-dialogDrag
    :center="true"
    width="50%"
    :before-close="handleClose"
  >
    <table border="2px" style="width:100%">
      <tr>
        <td class="itd" colspan="2">
          编制人：
          <input type="text" style="width: 80%" :readonly="disabled"   v-model="form.compilingpersonnel" />
        </td>
        <td class="itd" colspan="2">
          编制日期：
          <input type="text" style="width: 80%" :readonly="disabled"   v-model="form.compilingdate" />
        </td>
      </tr>
      <tr>
        <td class="itd" colspan="2">
          编号：
          <input type="text" style="width: 80%" :readonly="disabled"   v-model="form.serialnumber" />
        </td>
        <td class="itd" colspan="2">
          勘察单编号：
          <input type="text" style="width: 75%" :readonly="disabled"   v-model="form.investigationnum" />
        </td>
      </tr>
      <tr>
        <td class="itd" colspan="2">
          检修班组：
          <el-select :readonly="disabled"   v-model="form.groupid" :disabled="disabled" clearable placeholder="请选择" style="width:80%">
            <el-option
              v-for="item in selection.gzbz"
              :key="item.objId"
              :label="item.groupname"
              :value="item.objId"
            ></el-option>
          </el-select>
        </td>
        <td class="itd" colspan="2">
          施工单位：
          <input type="text" style="width: 80%" :readonly="disabled"   v-model="form.constructionunit" />
        </td>
      </tr>
      <tr>
        <td class="itd" colspan="2">
          检修{{$xl}}：
          <el-select :readonly="disabled"   v-model="form.xlid" :disabled="disabled" filterable style="width:80%" placeholder="请选择">
            <el-option
              v-for="item in selection.xlmc"
              :key="item.id"
              :label="item.lineName"
              :value="item.id"
            ></el-option>
          </el-select>
        </td>
        <td class="itd" colspan="2">
          检修地点：
          <input type="text" style="width: 80%" :readonly="disabled"   v-model="form.repairsite" />
        </td>
      </tr>
      <tr>
        <td class="itd" colspan="4" style="text-align:center">检修内容</td>
      </tr>
      <tr>
        <td colspan="4" style="width:100%;padding:1rem">
          <textarea
            style="width:100%;height:150px;overflow:visible"
            :readonly="disabled"   v-model="form.maintenancecontent"
          />
        </td>
      </tr>
      <tr>
        <td class="itd" colspan="4" style="text-align:center">组织措施</td>
      </tr>
      <tr>
        <td class="itd" colspan="4" style="border-bottom-style:none">
          项目负责人：
          <input type="text" style="width: 80%" :readonly="disabled"   v-model="form.projecthead" />
        </td>
      </tr>
      <tr>
        <td class="itd" colspan="4" style="border-bottom-style:none;border-top-style:none">
          技术员：
          <input type="text" style="width: 80%" :readonly="disabled"   v-model="form.technician" />
        </td>
      </tr>
      <tr>
        <td class="itd" colspan="4" style="border-bottom-style:none;border-top-style:none">
          工作负责人：
          <input type="text" style="width: 80%" :readonly="disabled"   v-model="form.workhead" />
        </td>
      </tr>
      <tr>
        <td class="itd" colspan="4" style="border-bottom-style:none;border-top-style:none">
          试验负责人：
          <input type="text" style="width: 80%" :readonly="disabled"   v-model="form.testhead" />
        </td>
      </tr>
      <tr>
        <td class="itd" colspan="4" style="border-top-style:none">
          施工外协单位：
          <input type="text" style="width: 80%" :readonly="disabled"   v-model="form.constructionoutsourcingunit" />
        </td>
      </tr>
      <tr>
        <td class="itd" colspan="4" style="text-align:center">安全措施</td>
      </tr>
      <tr>
        <td colspan="4" style="width:100%;padding:1rem">
          <textarea
            cols="20"
            style="width:100%;height:150px;overflow:visible"
            :readonly="disabled"   v-model="form.securitymeasures"
          />
        </td>
      </tr>
      <tr>
        <td class="itd" colspan="4" style="text-align:center">技术措施</td>
      </tr>
      <tr>
        <td colspan="4" style="width:100%;padding:1rem">
          <textarea
            cols="20"
            style="width:100%;height:150px;overflow:visible"
            :readonly="disabled"   v-model="form.technicalmeasures"
          />
        </td>
      </tr>
      <tr>
        <td class="itd">日期</td>
        <td class="itd">负责单位</td>
        <td class="itd">工作内容</td>
        <td class="itd">备注</td>
      </tr>
      <tr v-for="(item,index) in form.jl" :key="index">
        <td class="itd">
          <input type="text" style="width: 80%" :readonly="disabled"   v-model="item.rq" />
        </td>
        <td class="itd">
          <input type="text" style="width: 80%" :readonly="disabled"   v-model="item.fzdw" />
        </td>
        <td class="itd">
          <input type="text" style="width: 80%" :readonly="disabled"   v-model="item.gznr" />
        </td>
        <td class="itd">
          <input type="text" style="width: 80%" :readonly="disabled"   v-model="item.bz" />
        </td>
      </tr>
    </table>
    <el-button class="onSearch" size="small" v-if="!isshow" @click="add">新增</el-button>
    <div slot="footer" class="dialog-footer">
      <el-button class="UserSearchFun" v-if="!isshow" @click="SuerFun">保存</el-button>
      <el-button class="onSearch" v-if="!isshow" @click="handleClose">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  getLineSelect,
  getSelectMultiple,
  getLineGroup
} from "@/api/recondition/yearPlan";
import {editoverhauConstructionplan} from "@/api/recondition/jobtask"
export default {
  props: {
    parentVal: "",
    isView: ''
  },
  data() {
    return {
      isshow: this.isView,
      showDialog: true,
      disabled: false,
      selection: {
        gzbz: [],
        xlmc: []
      },
      form: {
        xlid: '',
        xlmc: '',
        groupname: '',
        groupid: '',
        compilingpersonnel: "",
        jl: [
          {
            rq: "",
            fzdw: "",
            gznr: "",
            bz: ""
          },
          {
            rq: "",
            fzdw: "",
            gznr: "",
            bz: ""
          }
        ]
      }
    };
  },
  mounted() {
    console.log('this.parentVal :>> ', this.parentVal);
    let data = JSON.parse(JSON.stringify(this.parentVal));
    this.form.objId = data.objId
    this.form = data
    this.form.compilingpersonnel = data.compilingpersonnel;
    this.form.compilingdate = data.compilingdate.substring(0, 10);
    this.form.investigationnum = data.investigationnum;
    this.form.groupname = data.groupname;
    this.form.groupid = data.groupid;
    this.form.constructionunit = data.constructionunit;
    this.form.xlmc = data.xlmc;
    this.form.xlid = data.xlid;
    this.form.repairsite = data.repairsite;
    this.form.jl = JSON.parse(data.jl)
    if(this.isView) {
      this.disabled = true
    }
    this.getSelectionList();
  },
  methods: {
    getSelectionList() {
      // 获取xl班组
      getLineGroup().then(res => {
        this.selection.gzbz = res.data.rows;
      });
      // 获取线路名称下拉框
      getLineSelect(this.$qs.stringify({ lineNature: "主线" })).then(
        response => {
          if (response.status == 200) {
            this.selection.xlmc = response.data.rows;
          }
        }
      );
    },
    add() {
      let obj = {
        rq: "",
        fzdw: "",
        gznr: "",
        bz: ""
      };
      this.form.jl.push(obj);
    },
    SuerFun() {
      this.selection.gzbz.forEach(item => {
        if (this.form.groupid == item.objId) {
          this.form.groupname = item.groupname;
        }
      });
      this.selection.xlmc.forEach(item => {
        if (this.form.xlid == item.id) {
          this.form.xlmc = item.lineName;
        }
      });
      // this.form.jl = JSON.stringify(this.form.jl)
      console.log("this.form :>> ", this.form);
      editoverhauConstructionplan(this.form).then(res => {
        if(res.data.code == 0) {
          this.$message.success('编辑保存成功')
          this.$emit("childFn", {
            showDialog: this.showDialog
          });
        } else {
          this.$message.error(res.data.msg)
          this.$emit("childFn", {
            showDialog: this.showDialog
          });
        }
      })
    },
    /**
     * 取消按钮
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.$emit("childFn", {
            showDialog: this.showDialog
          });
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style>
td {
  vertical-align: middle;
}
th {
  vertical-align: middle;
}
.itd {
  width: 25%;
  height: 50px;
  padding-left: 1rem;
  /* background: pink; */
}
</style>