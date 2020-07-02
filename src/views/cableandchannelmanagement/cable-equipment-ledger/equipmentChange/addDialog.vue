<template>
  <div class="hastitle">
    <el-dialog
      :visible.sync="showDialog"
      :title="title"
      :center="true"
      top="10vh"
      v-dialogDrag
      :before-close="handleClose"
    >
      <el-form
        ref="dataForm"
        :model="form"
        label-position="left"
        :rules="dataForm"
        style="width:100% ;margin: 0 auto;"
      >
        <div class="Form-input">
          <el-form-item :label="`${$xl}名称:`" label-width="150px" style="width: 50%;">
            <el-select v-model="form.lineId" clearable filterable placeholder="请选择">
              <el-option
                v-for="item in selection.jxxl"
                :key="item.id"
                :label="item.lineName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="变更时间:" label-width="150px" style="width: 50%;">
            <el-date-picker v-model="form.changeTime" type="date" value-format="yyyy-MM-dd" style="width:280px" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="变更设备:" label-width="150px" style="width: 50%;">
            <el-input v-model="form.changeFacility"></el-input>
          </el-form-item>
          <el-form-item label="变更内容:" label-width="150px" style="width: 50%;">
            <el-input v-model="form.changeContent"></el-input>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="变更原因:" label-width="150px" style="width: 50%;">
            <el-input v-model="form.changeReason"></el-input>
          </el-form-item>
          <el-form-item label="运维班组:" label-width="150px" style="width:50%">
            <el-select v-model="form.groupId" clearable placeholder="请选择">
              <el-option
                v-for="item in selection.whbz"
                :key="item.objId"
                :label="item.groupname"
                :value="item.objId"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="相关工程名称:" label-width="150px" style="width: 50%;">
            <el-input v-model="form.projectName"></el-input>
          </el-form-item>
          <el-form-item label="施工单位:" label-width="150px" style="width: 50%;">
            <el-input v-model="form.constructOrganization"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div class="Form-input" style="padding-left:18%">
        <el-upload
          class="upload-demo"
          ref="upload"
          action
          :on-success="uploadSuccess"
          :on-remove="handleRemove"
          :on-change="(file, fileList)=>handleChange(file, fileList,'one')"
          :before-remove="beforeRemove"
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :show-file-list="true"
          :auto-upload="false"
          accept=".PDF,.xls,.xlsx,.doc"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="save">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {upload,add,edit} from "@/api/cableandchannel/cable-equipment-ledger/equipmentChange"
import { getLineSelect, getLineGroup } from "@/api/recondition/yearPlan";
export default {
  props: {
    isadd: "",
    isedit: "",
    parentVal: ""
  },
  data() {
    return {
      showDialog: true,
      title: "",
      form: {
          faUrl: ''
      },
      fileList: [],
      selection: {
        jxxl: [],
        whbz: []
      },
      dataForm: {}
    };
  },
  created() {
    console.log(this.isadd, this.isedit, this.isview);
    if (this.isadd) {
      this.title = "新增";
    }
    if (this.isedit) {
      this.title = "编辑";
      this.form = JSON.parse(JSON.stringify(this.parentVal))
      let obj = {}
      obj.name = this.form.fileName
      obj.url = this.form.filePath
      this.fileList.push(obj)
    }
  },
  mounted() {
      this.getSelectionList()
  },
  methods: {
    // 获取下拉框数据
    getSelectionList() {
      // 获取线路名称下拉框
      getLineSelect(this.$qs.stringify({ lineNature: "主线" })).then(
        response => {
          if (response.status == 200) {
            this.selection.jxxl = response.data.rows;
          }
        }
      );
      // 获取xl班组
      getLineGroup().then(res => {
        this.selection.whbz = res.data.rows;
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.form.faUrl = ''
    },
    uploadSuccess(res, file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleChange(file, fileList) {
      console.log("file :>> ", file);
      let fd = new FormData();
      fd.append("file", file.raw);
      fd.append("type", "sbbg");
      upload(fd).then(res => {
        if (res.data.code == 0) {
          this.$message.success("上传成功");
          this.fileList = fileList;
          this.form.filePath = res.data.msg
          console.log(this.fileList);
        } else {
          this.$message.error("res.data.msg");
        }
      });
    },
    save() {
        let data = {}
        data.filePath = this.form.filePath // 文件地址
        if(this.fileList.length !== 0) {
            data.fileName = this.fileList[0].name // 文件名称
        }
        data.lineId = this.form.lineId
        this.selection.jxxl.forEach(item => {
            if(this.form.lineId == item.id) {
                data.lineName = item.lineName
            }
        })
        data.changeTime = this.form.changeTime
        data.changeFacility = this.form.changeFacility
        data.changeContent = this.form.changeContent
        data.changeReason = this.form.changeReason
        data.groupId = this.form.groupId
        this.selection.whbz.forEach(item => {
            if(this.form.groupId == item.objId) {
                data.groupName = item.groupname
            }
        })
        data.projectName = this.form.projectName
        data.constructOrganization = this.form.constructOrganization
        if(this.isedit) {
            data.id = this.form.id
            edit(this.$qs.stringify(data)).then(res => {
                if(res.data.code == 0) {
                    this.$message.success('保存成功')
                    this.$emit("childFn",{
                        showDialog: false
                    })
                } else {
                    this.$message.error(res.data.msg)
                    this.$emit("childFn",{
                        showDialog: false
                    })
                }
            })
        } else {
            add(this.$qs.stringify(data)).then(res => {
                if(res.data.code == 0) {
                    this.$message.success('保存成功')
                    this.$emit("childFn",{
                        showDialog: false
                    })
                } else {
                    this.$message.error(res.data.msg)
                    this.$emit("childFn",{
                        showDialog: false
                    })
                }
            })
        }
    },
    /**
     * 取消
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.showDialog = false;
          this.form = { brand_right: 0 };
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

<style lang="scss">
// .el-form--label-left .el-form-item__label {
//     line-height: 20px;
//   }
</style>