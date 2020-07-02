<template>
  <!-- <h2>
      标准化作业指导书
  </h2>-->
  <div class="hastitle">
    <el-dialog
      :visible.sync="showDialog"
      :title="title"
      v-dialogDrag
      :center="true"
      :before-close="handleClose"
      width="60%"
      top="20vh"
    >
      <el-form
        ref="formrules"
        :rules="formRules"
        :model="addlist"
        label-position="right"
        style="width:100% ;margin: 0 auto;"
      >
        <div class="Form-input">
          <el-form-item label="标准化作业指导书名称：" prop="bzhzyzdsmc" label-width="180px" style="width:50%">
            <el-input v-model="addlist.bzhzyzdsmc" clearable :disabled="isdisabled" />
          </el-form-item>
          <el-form-item label="编制时间：" prop="bssj" label-width="150px" style="width:50%">
            <el-date-picker
              v-model="addlist.bssj"
              type="date"
              :disabled="isdisabled"
              value-format="yyyy-MM-dd"
              placeholder="请选择日期"
              style="width:100%"
            />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="审核人：" prop="shhr" label-width="180px" style="width:33%">
            <el-select
              v-model="addlist.shhr"
              filterable
              clearable
              :disabled="isdisabled"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in userinfo"
                :key="item.objId"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="编制人：" prop="bzr" label-width="170px" style="width:33%">
            <el-select
              v-model="addlist.bzr"
              filterable
              clearable
              :disabled="isdisabled"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in userinfo"
                :key="item.objId"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="批准人：" prop="pzr" label-width="170px" style="width:33%">
            <el-select
              v-model="addlist.pzr"
              filterable
              :disabled="isdisabled"
              clearable
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in userinfo"
                :key="item.objId"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div
          class="Form-input"
          style="justify-content: center;"
          v-if="openobj.isAdd||openobj.isEdit"
        >
          <el-upload
            class="upload-demo"
            ref="upload"
            action="#"
            :limit="1"
            :on-preview="handlePreview"
            :file-list="fileList"
            :on-change="change"
            :on-exceed="onexceed"
            :auto-upload="false"
          >
            <el-button slot="trigger" type="primary">选择文件</el-button>
          </el-upload>
        </div>
        <div class="Form-input">
          <el-form-item label="备注：" style="width:100%" label-width="180px">
            <el-input type="textarea" :disabled="isdisabled" v-model="addlist.memo" clearable></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div
        style="display: flex;justify-content: center;margin-bottom: 1em;"
        v-if="openobj.isAdd||openobj.isEdit"
      >
        <el-button class="UserSearchFun" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取 消</el-button>
      </div>
      <div class="table" v-if="!openobj.isAdd" style="margin-bottom: 1em;">
        <i-table :list="tableData" :options="options" :columns="columns" :operates="operates"></i-table>
        <!-- <pagination
          v-show="form.total>0"
          :total="form.total"
          :page.sync="userselect.pageNum"
          :limit.sync="form.limit"
          @pagination="getListtab"
        />-->
      </div>
      <div slot="footer" class="dialog-footer"></div>
      <!-- {{openobj}} -->
    </el-dialog>
  </div>
</template>

<script>
import iTable from "@/components/TabList";
import Pagination from "@/components/Pagination";
import {
  getList,
  getuser,
  Add,
  getFiletab,
  edit,
  removeFile
} from "@/api/recondition/instruction";
import { UserList, downloadImg } from "@/api/public";
export default {
  props: {
    openobj: {
      default: null
    }
  },
  components: {
    Pagination,
    iTable
  },
  data() {
    return {
      formRules: {
        bzhzyzdsmc: [
          {
            required: true,
            message: "请输入标准化作业指导书名称",
            trigger: "blur"
          }
        ],
        shhr: [
          {
            required: true,
            message: "请选择审核人",
            trigger: "change"
          }
        ],
        bssj: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        bzr: [
          {
            required: true,
            message: "请选择编制人",
            trigger: "change"
          }
        ],
        pzr: [
          {
            required: true,
            message: "请选择批准人",
            trigger: "change"
          }
        ]
      },
      showDialog: true, //新增弹框打开
      addlist: {
        pzr: null,
        shhr: null,
        bzr: null,
        bssj: null,
        bzhzyzdsmc: null,
        id: this.openobj.openID,
        wjmc: null,
        url: null,
        memo: null
      },
      tableData: [],
      form: {
        limit: 10,
        total: 2
      },
      userselect: {
        pageNum: 1,
        pageSize: 10
      },
      title: "",
      sblx: [],
      fileList: [],
      options: {
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: false, // 是否支持列表项选中功能
        xh: true //是否支持列表中的序号功能
      },
      columns: [
        {
          prop: "wjmc",
          label: "文件名称",
          align: "center"
        },
        {
          prop: "scsj",
          label: "上传时间",
          align: "center",
          formatter: (row, column, cellValue) => {
            return `${row.scsj.substring(0, 10)}`;
          }
        },
        {
          prop: "scr",
          label: "上传人",
          align: "center",
          width: 120
        }
      ],
      operates: {
        width: 200,
        fixed: "right",
        label: "操作",
        show: this.openobj.isEdit,
        list: [
          {
            label: "下载",
            show: true,
            class: "onSearch",
            plain: true,
            disabled: false,
            method: (index, row) => {
              this.down(index, row);
            }
          },
          {
            label: "删除",
            show: false,
            plain: false,
            type: "danger",
            plain: true,
            // icon: "el-icon-delete",
            disabled: false,
            method: (index, row) => {
              this.handleDel(index, row);
            }
          }
        ]
      },
      userinfo: []
    };
  },
  computed: {
    /**计算是否可读 */
    isdisabled() {
      return !(this.openobj.isAdd || this.openobj.isEdit);
    }
  },
  created() {
    if (this.openobj.isAdd) {
      this.title = "新增";
    } else if (this.openobj.isEdit) {
      this.title = "编辑";
    } else {
      this.title = "查看";
    }
    this.getUser();
  },
  mounted() {
    if (!this.openobj.isAdd) {
      this.getinfo();
      this.getListtab();
    }
  },
  methods: {
    /**当前处理人 */
    getUser() {
      UserList().then(res => {
        this.userinfo = res.data.rows;
      });
    },
    /**删除标准化作业指导书文件列 */
    handleDel(i, val) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removeFile({ ids: val.id }).then(res => {
            this.getListtab();
            this.$message({
              message: "删除成功",
              type: "success"
            });
          });
          done();
        })
        .catch(_ => {});
    },
    /**获取回显数据 */
    getinfo() {
      getList({ id: this.openobj.openID })
        .then(res => {
          if (res.data.code == 0) {
            this.addlist = res.data.rows[0];
          }
        })
        .catch(err => {});
    },
    /**下载 */
    down(index, val) {
      if (val.url) {
        window.location.href =
          process.env.VUE_APP_BASE_API + "/common/downloadFile?url=" + val.url;
        this.$message({
          message: "请稍等正在下载...",
          type: "success"
        });
      } else {
        this.$message({
          message: "暂无内容！！",
          type: "warning"
        });
      }
    },
    /**获取表格数据 */
    getListtab() {
      getFiletab({ zdsid: this.openobj.openID })
        .then(res => {
          this.tableData = res.data.rows;
        })
        .catch(err => {});
    },
    onexceed(file, fileList) {
      this.$message({
        message: "只能上传一个文件，请先删除文件！！！",
        type: "warning"
      });
    },
    handlePreview(file) {
      //console.log(file);
    },
    /**上传按钮触发 */
    change(file, fileList) {
      this.fileList = fileList;
      let filel = fileList[0]["raw"];
      this.addlist.wjmc = filel.name;
      var formdata = new FormData();
      formdata.append("file", filel);
      formdata.append("type", "instruction");

      downloadImg("/cable/file/upload", formdata).then(res => {
        if (res.data.code == 0) {
          this.addlist.url = res.data.msg;
          this.$message({
            message: "上传成功",
            type: "success"
          });
        } else {
          this.$message({
            message: res.data.msg,
            type: "error"
          });
        }
      });
    },
    SuerFun() {
      this.$refs["formrules"].validate(val => {
        if (val) {
          if (this.openobj.isAdd) {
            Add(this.addlist)
              .then(res => {
                this.$message({
                  message: "新增成功",
                  type: "success"
                });
                this.showDialog = false;
                this.$emit("childFn", {
                  showDialog: this.showDialog,
                  isAdd: false,
                  isEdit: false
                });
                this.$parent.getList();
              })
              .catch(err => {});
          } else {
            edit(this.addlist)
              .then(res => {
                this.$message({
                  message: "新增成功",
                  type: "success"
                });
                this.showDialog = false;
                this.$emit("childFn", {
                  showDialog: this.showDialog,
                  isAdd: false,
                  isEdit: false
                });
                this.$parent.getList();
              })
              .catch(err => {});
          }
        } else {
          this.$message({
            message: "必填项未填！！！",
            type: "error"
          });
        }
      });
    },
    /**关闭页面 */
    handleClose() {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.showDialog = false;
          this.$emit("childFn", {
            showDialog: this.showDialog,
            isAdd: false,
            isEdit: false
          });
          this.$parent.getList();
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style lang='scss' scoped>
.el-upload-list {
  display: none;
}
</style>