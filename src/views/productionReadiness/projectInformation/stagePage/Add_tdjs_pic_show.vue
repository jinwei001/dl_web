<template>
  <!-- <h2>
      检修试验计划
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
      <!-- <h2>试验</h2> -->
      <!-- {{openobj}} -->
      <div class="form_sy">
        <div class="left">
          <el-col></el-col>
        </div>
        <div class="right">
          <el-col>
            <label>整改前：</label>
          </el-col>
          <el-col>
            <label>整改后：</label>
          </el-col>
        </div>
      </div>
      <el-form
        ref="formrules"
        :model="addlist"
        label-position="right"
        style="width:100% ;margin: 0 auto;"
      >
      <div class="Form-input">
          <div class="dltz-dltz"></div>
          <el-form-item label="整改意见：" label-width="100px" style="width:100%;font-size:1rem">
            <el-input type="textarea" v-model="addlist.content"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun">整改</el-button>
        <el-button class="onSearch" @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
import { POSTTBList } from "@/api/public";
export default {
  props: {
    openobj: {
      default: null,
      type: Object
    }
  },
  data() {
    return {
      addlist: {
        id: null,
        content:null
      },
      title: null,
      showDialog: true
    };
  },
  created() {},
  mounted() {
    this.title = this.openobj.title;
    POSTTBList(
      "/zjgc/gc/getthreeLevel",
      qs.stringify({
        gcid: this.openobj.gcid,
        gkkid: this.openobj.gkkid
      })
    )
      .then(result => {
        console.log("result :>> ", result);
      })
      .catch(err => {});
  },
  methods: {
    SuerFun() {
      console.log('"整改" :>> ', "整改");

      POSTTBList("/zjgc/gc/dhtp",this.addlist).then((res) => {
        console.log('res :>> ', res);
         this.$message({
            message: "操作失败！！！",
            type: "error"
          });
      }).catch((err) => {
        
      });
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
<style lang="scss" scoped>
.form_sy {
  width: 100%;
  // background-color: red;
  height: 60vh;
  display: flex;
  justify-content: flex-start;
  .left {
    width: 40%;
    border-right: 1px solid #cccccc;
  }
  .right {
    width: 60%;
  }
}
</style>