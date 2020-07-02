<template>
  <div>
    <el-dialog
      :visible.sync="isshowPic"
      :title="title"
      v-dialogDrag
      top="25vh"
      :center="true"
      :before-close="handleClose"
      width="30%"
    >
      <el-form
        ref="dataForm"
        :model="form"
        label-position="left"
        style="width:100% ;margin: 0 auto;"
      >
        <el-form-item>
          <el-upload
            ref="upload"
            :action="action"
            name="picture"
            list-type="picture-card"
            :auto-upload="false"
            accept="image/*"
            :limit="1"
            :file-list="fileList"
            :on-exceed="onExceed"
            :before-upload="beforeUpload"
            :on-preview="handlePreview"
            :on-success="handleSuccess"
            :on-remove="hadndleRemove"
            :with-credentials="true"
            :on-change="change"
            :disabled="disabled"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <div :title="fawjmc">{{fawjmc}}</div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="ispicadd" class="UserSearchFun" @click="SuerFun">保存</el-button>
        <el-button v-if="ispicadd" class="onSearch" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible" v-dialogDrag>
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import "@/styles/myStyle/index.scss";
import request from "@/utils/request";
import { downloadImg } from "@/api/public";
import qs from "qs";
export default {
  props: {
    openID: {
      default: null
    },
    sopenId: {
      default: null
    },
    ispicadd: {
      default: false
    },
    objIdson: {
      default: null
    },
    fawjlj: {
      default: null
    },
    fawjmc: {
      default: null
    }
  },
  data() {
    return {
      title: "",
      isshowPic: true,
      selectArr: {},
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      form: {},
      add: false,
      view: false,
      sonID: "",
      file: {},
      action: "#",
      wjlj: "",
      wjmc: "",
      objson: "",
      fileList: []
    };
  },
  watch: {
    ispicadd(val) {
      this.add = val;
    },
    sopenId(val) {
      this.sonID = val;
    }
  },

  created() {
    if (this.ispicadd) {
      this.title = "上传图片";
    } else {
      this.title = "查看图片";
      this.fileList = [{ name: this.fawjlj, url: this.fawjlj }];
      this.disabled = true;
    }
  },
  mounted() {},
  methods: {
    uploadPic(event) {
      let reader = new FileReader();
      let img1 = event.target.files[0];
      var uri = "";
      let form = new FormData();
      form.append("file", img1); //openID
      form.append("patrolId", this.openID); //
    },
    hadndleRemove(file, fileList) {
      //console.log(file, fileList);
    },
    handleSuccess(res, file) {
      //console.log(file);
      //console.log("object");
    },
    handlePreview(file, fileList) {
      //console.log("查看图片");
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    onExceed(file, fileList) {
      //console.log(fileList);
    },
    beforeUpload(file) {},
    change(file, fileList) {
      //console.log(fileList);
      this.fileList = fileList;
    },

    /**
     * 取消按钮
     */
    handleClose() {
      var obj = this.objIdson;
      if (this.ispicadd) {
        this.$confirm("确认关闭？")
          .then(_ => {
            this.isshowPic = false;
            this.add = false;
            if (this.ispicadd) {
              this.$emit("childFn", {
                isshowPic: this.isshowPic,
                add: this.add,
                wjlj: this.wjlj,
                wjmc: this.wjmc,
                obj: obj
              });
            } else {
              this.$emit("childFn", {
                isshowPic: this.isshowPic,
                add: this.add
              });
            }
          })
          .catch(_ => {});
      } else {
        this.isshowPic = false;
        this.add = false;
        if (this.ispicadd) {
          this.$emit("childFn", {
            isshowPic: this.isshowPic,
            add: this.add,
            wjlj: this.wjlj,
            wjmc: this.wjmc,
            obj: obj
          });
        } else {
          this.$emit("childFn", {
            isshowPic: this.isshowPic,
            add: this.add
          });
        }
      }
    },
    /**
     * 确认按钮
     */
    SuerFun() {
      var obj = this.objIdson;
      process.env.VUE_APP_BASE_API;
      // let url = process.env.VUE_APP_BASE_API + "/zjgc/jgyj/upload";
      let file = this.fileList[0]["raw"];
      var formdata = new FormData();
      formdata.append("file", file);
      // //console.log(formdata,"weijianleix");
      downloadImg("/zjgc/jgyj/upload", formdata).then(res => {
        //console.log(res.data.data);
        this.wjlj = res.data.data.wjlj;
        this.wjmc = res.data.data.wjmc;
        this.isshowPic = false;
        this.fawjmc = "";
        this.$emit("childFn", {
          isshowPic: this.isshowPic,
          add: this.add,
          wjlj: this.wjlj,
          wjmc: this.wjmc,
          obj: obj
        });
        this.$message({
          message: "上传成功！！！",
          type: "success"
        });
      });
    },
    /** 选中数据*/
    CheckFun() {}
  }
};
</script>
<style lang="scss" scoped>
.xq {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  .xq-wj {
    //width: 11%;
    line-height: 45px;
    height: 45px;
    font-size: 1rem;
    text-align: right;
    margin-right: 0.5em;
    font-weight: 700;
    width: 82px;
    flex-shrink: 0;
    font-size: 14px;
  }
  .update {
    width: 4rem;
    text-align: center;
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    transition: 0.1s;
    font-weight: 500;
    padding: 14px 14px;
    font-size: 14px;
    border-radius: 4px;
  }
  .mypic {
    position: relative;
  }
  .mypic input {
    border: 1px solid red;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    opacity: 0;
  }
}
</style>