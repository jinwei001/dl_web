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
            :limit="num"
            :file-list="fileList"
            :on-preview="handlePreview"
            :on-remove="hadndleRemove"
            :on-change="change"
            :on-exceed="onexceed"
            :disabled="disabled"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <!-- {{openobject}}
        {{fileList}}-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" v-if="openobject.isadd" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" v-if="openobject.isadd" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible" v-dialogDrag>
      <!-- <div style="overflow: auto;"> -->
        <!-- <img :src="dialogImageUrl" alt  @mousewheel="rollImg(dialogImageUrl)" ref="bigImage" /> -->
        <el-image
          style="width: 100%"
          :src="dialogImageUrl"
          :preview-src-list="dialogImageUrl2"
        ></el-image>
      <!-- </div> -->
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
    openobject: {}
  },
  data() {
    return {
      title: "",
      isshowPic: true,
      selectArr: {},
      dialogImageUrl: "",
      dialogImageUrl2: [],
      dialogVisible: false,
      disabled: false,
      form: {},
      add: false,
      view: false,
      sonID: "",
      num: 1,
      file: {},
      action: "#",
      wjlj: [],
      wjmc: "",
      objson: "",
      fileList: []
    };
  },

  created() {
    this.num = this.openobject.num;
    var url = process.env.VUE_APP_BASE_API;
    if (this.openobject.isadd) {
      this.title = "上传图片";
      if (this.openobject.picpho) {
        this.openobject.picpho.split("=").forEach(e => {
          let pic = {
            url: url + e
          };
          this.fileList.push(pic);
        });
        this.wjlj = this.openobject.picpho.split("=");
      }
    } else {
      this.title = "查看图片";
      this.disabled = true;
      this.openobject.picpho.split("=").forEach(e => {
        let pic = {
          url: url + e
        };
        this.fileList.push(pic);
      });
      this.wjlj = this.openobject.picpho.split("=");
    }
  },
  mounted() {},
  methods: {
    onexceed(file, fileList) {
      this.$message({
        message: "只能上传" + this.openobject.num + "个文件！！！",
        type: "warning"
      });
    },
    hadndleRemove(file, fileList) {
      // console.log(file);
      // console.log(fileList);
      let i = this.fileList.findIndex(item => {
        if (item["url"] == file["url"]) {
          return true;
        }
      });
      // console.log(this.wjlj);
      // console.log(i);
      this.fileList = fileList;
      this.wjlj.splice(i, 1);
    },

    handlePreview(file, fileList) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
      this.dialogImageUrl2.push(file.url);
    },
    change(file, fileList) {
      this.fileList = fileList;
      this.uppic(file);
    },

    /**
     * 取消按钮
     */
    handleClose() {
      var obj = this.objIdson;
      this.$confirm("确认关闭？")
        .then(_ => {
          this.isshowPic = false;
          this.$emit("childFn", {
            isshowpic: this.isshowPic,
            add: this.add
          });
        })
        .catch(_ => {});
    },

    uppic(k) {
      let filel = k["raw"];
      var formdata = new FormData();
      formdata.append("file", filel);
      formdata.append("type", "tdgl");
      downloadImg("/cable/file/upload", formdata).then(res => {
        if (res.data.code == 0) {
          this.wjlj.push(res.data.msg);
        }
      });
    },
    picsuer() {
      let lj = this.wjlj.join("=");
      downloadImg(
        this.openobject.edit,
        qs.stringify({ photoUrl: lj, objId: this.openobject.openID })
      )
        .then(res => {
          this.isshowPic = false;
          this.$emit("childFn", {
            isshowpic: this.isshowPic,
            add: this.add
          });
          this.$parent.onSearch();
          this.wjlj = [];
        })
        .catch(err => {});
    },
    /**
     * 确认按钮
     */
    SuerFun() {
      this.picsuer();
    },
    rollImg(v) {
      /* 获取当前页面的缩放比
            若未设置zoom缩放比，则为默认100%，即1，原图大小
        */
      var zoom = parseInt(this.$refs.bigImage.style.zoom) || 100;
      /* event.wheelDelta 获取滚轮滚动值并将滚动值叠加给缩放比zoom
            wheelDelta统一为±120，其中正数表示为向上滚动，负数表示向下滚动
        */
      zoom += event.wheelDelta / 12;
      /* 最小范围 和 最大范围 的图片缩放尺度 */
      if (zoom >= 10 && zoom < 250) {
        this.$refs.bigImage.style.zoom = zoom + "%";
      }
      return false;
    }
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