<template>
  <!-- <h2>
      采集模板库
  </h2>-->
  <div class="single-row-title">
    <el-dialog
      v-dialogDrag
      :visible.sync="showDialog"
      :title="title"
      :center="true"
      :before-close="handleClose"
      top="10vh"
      width="36%"
    >
      <!-- :rules="formRules" -->
      <el-form ref="formrules" :model="addlist" style="width:100% ;margin: 0 auto;">
        <div class="Form-input" v-if="!iseditson">
          <el-form-item label="父菜单：" label-width="100px" style="width:50%;">
            <el-input v-model="addlist.productionunit" disabled clearable />
          </el-form-item>
          <el-form-item label="子菜单：" label-width="100px" style="width:50%;">
            <el-input v-model="addlist.name" clearable />
          </el-form-item>
        </div>
        <div class="Form-input" v-if="iseditson">
          <el-form-item label="菜单名称：" label-width="100px" style="width:100%;">
            <el-input v-model="addlist.name" clearable />
          </el-form-item>
        </div>
        <div class="Form-input" v-if="!iseditson">
          <el-form-item label="采集内容：" label-width="100px" style="width:100%;">
            <el-input v-model="addlist.cname" clearable />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="采集描述：" label-width="100px" style="width:100%;">
            <el-input type="textarea" v-model="addlist.dec"></el-input>
          </el-form-item>
        </div>
        <div class="Form-input" v-if="!iseditson">
          <el-form-item label="阶段：" label-width="100px" style="width:50%;">
            <el-select v-model="addlist.rescueteams" @change="getJD" clearable placeholder="请选择">
              <el-option
                v-for="item in select.selectJD"
                :key="item.bzid"
                :label="item.bzmc"
                :value="item.bzid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型：" label-width="100px" style="width:50%;">
            <el-select v-model="addlist.lx" @change="getlxchange" clearable placeholder="请选择">
              <el-option
                v-for="item in select.lx"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="审查项目：" label-width="100px" style="width:100%;">
            <el-select v-model="addlist.nr" @change="getnrchange" clearable placeholder="请选择">
              <el-option
                v-for="item in select.nr"
                :key="item.key"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="审查内容：" label-width="100px" style="width:100%;">
            <el-input type="textarea" v-model="addlist.nrnr"></el-input>
          </el-form-item>
        </div>
        <!-- {{openobj}} -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
import info from "@/api/YSsystem/gather";
import { GETTBList, POSTTBList } from "@/api/public";
export default {
  props: {
    openobj: {
      default: null,
      type: Object
    },
    iseditson: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      addlist: {
        pid: null,
        name: null,
        cname: null,
        dec: null,
        contentId: null,
        productionunit: null,
        objId: null,
        lx: null,
        nr: null,
        nrnr: null,
        lv: null
      },
      group: [],
      title: null,
      showDialog: true,
      select: {
        selectJD: [],
        lx: [],
        nr: [],
        nrnr: null
      }
    };
  },
  created() {
    this.getSlect();
    this.addlist.productionunit = this.openobj.name;
    if (this.iseditson) {
      this.title = "编辑子菜单";
      //console.log(this.openobj, "asdasdassa");
      this.addlist.name = this.openobj.name;
      this.addlist.dec = this.openobj.dec;
      this.addlist.lv = this.openobj.lv;
    } else {
      this.title = "添加菜单";
    }
  },
  mounted() {},
  watch: {},
  methods: {
    /**下拉数据 */
    getSlect() {
      info
        .getJdList()
        .then(res => {
          //console.log(res);
          this.select.nr = [];
          this.select.lx = [];
          this.addlist.nrnr = null;
          this.select.selectJD = res.data.data;
          this.addlist.rescueteams = res.data.data[0]["bzid"];
          this.getLX(this.addlist.rescueteams);
        })
        .catch(err => {});
    },

    /**选择阶段事件 */
    getJD(val) {
      //console.log(val);
      this.addlist.rescueteams = val;
      this.$forceUpdate();
      if (val != null) {
        this.select.lx = [];
        this.getLX(val);
      }
    },
    /**类型 */
    getlxchange(val) {
      //console.log(val);
      if (val != null) {
        this.select.nr = [];
        this.getNr(this.addlist.rescueteams, val);
      }
    },
    /**类型默认值 */
    getLX(val) {
      GETTBList("/zjgc/xmgyk/getDlbByJd", { jd: val })
        .then(res => {
          this.select.nr = [];

          let co = res.data.data;
          co.forEach((e, i) => {
            let count = {
              name: e,
              id: i
            };
            this.select.lx.push(count);
            this.addlist.lx = this.select.lx[0]["name"];
          });
          this.$forceUpdate();
          // //console.log(this.addlist);
          this.getNr(this.addlist.rescueteams, this.addlist.lx);
        })
        .catch(err => {
          //console.log(err);
        });
    },

    /**获取审查项目 */
    getNr(jd, lx) {
      GETTBList("/zjgc/xmgyk/getXlbyJdAndDlb", { jd: jd, dlb: lx })
        .then(res => {
          // //console.log(res);
          this.addlist.nr = [];
          let nr = res.data.data;
          nr.forEach((e, j) => {
            let count = {
              name: e,
              key: j + 10
            };
            this.select.nr.push(count);
          });
          // //console.log(this.select);
          this.addlist.nr = this.select.nr[0]["name"];
          this.$forceUpdate();
          this.getNrNr(
            this.addlist.rescueteams,
            this.addlist.lx,
            this.addlist.nr
          );
        })
        .catch(err => {
          //console.log(err);
        });
    },
    /** 项目change*/
    getnrchange(val) {
      // //console.log(val);
      if (val != null) {
        this.select.nrnr = null;
        this.addlist.nrnr = null;
        this.getNrNr(this.addlist.rescueteams, this.addlist.lx, val);
      }
    },
    /**获取审查内容 */
    getNrNr(jd, lx, dlb) {
      POSTTBList(
        "/zjgc/xmgyk/list",
        qs.stringify({
          jdid: jd,
          dlb: lx,
          xlb: dlb,
          sgys: 1
        })
      )
        .then(res => {
          // //console.log(res);
          this.addlist.nrnr = null;
          // if (res) {
          this.addlist.nrnr = res.data.rows[0]["nr"];
          // //console.log(this.addlist.nrnr, "nrnr");
          this.$forceUpdate();
          // }
        })
        .catch(err => {});
    },
    /**保存 */
    SuerFun() {
      this.showDialog = false;
      this.addlist.pid = this.openobj.objId;
      if (!this.iseditson) {
        this.addlist.lv = 2;
        info
          .addSon(this.addlist)
          .then(res => {
            // //console.log(res);
            this.$message({
              message: response.data.msg,
              type: "success"
            });
          })
          .catch(err => {});
      } else {
        this.addlist.pid = this.openobj.pid;
        this.addlist.objId = this.openobj.objId;
        info
          .editSon(this.addlist)
          .then(res => {
            //console.log(res);
             this.$message({
              message: res.data.msg,
              type: "success"
            });
          })
          .catch(err => {});
      }
      setTimeout(() => {
        this.$parent.getList();
        this.$emit("childFn", {
          showDialog: false
        });
      }, 100);
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
    }
  }
};
</script>

<style lang="scss" scope="this api replaced by slot-scope in 2.5.0+">
.single-row-title {
  textarea.el-textarea__inner {
    min-height: 150px !important;
  }
}
</style>