<template>
  <!-- <h2>通道附属设施-新增 -->
  <div class="hastitle">
    <el-dialog
      :visible.sync="ShowDialog"
      title="通道台账管理"
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
            <label class="form-label">通道名称：</label>
            <el-input v-model="form.sdmc" clearable  />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">前井名称：</label>
            <el-input v-model="form.qjmc" clearable  />
          </div>
          <div class="form-item">
            <label class="form-label">后井名称：</label>
            <el-input v-model="form.hjmc" clearable  />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">前井经度：</label>
            <el-input v-model="form.qjjd" clearable />
          </div>
          <div class="form-item">
            <label class="form-label">前井纬度：</label>
            <el-input v-model="form.qjwd" clearable  />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">后井经度：</label>
            <el-input v-model="form.hjjd" clearable />
          </div>
          <div class="form-item">
            <label class="form-label">后井纬度：</label>
            <el-input v-model="form.hjwd" clearable  />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">起点位置：</label>
            <el-input v-model="form.qdwz" clearable />
          </div>
          <div class="form-item">
            <label class="form-label">终点位置：</label>
            <el-input v-model="form.zdwz" clearable  />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">总段数：</label>
            <el-input v-model="form.zds" clearable />
          </div>
          <div class="form-item">
            <label class="form-label">通道长度：</label>
            <el-input v-model="form.tdcd" clearable  />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">结构形式：</label>
            <el-input v-model="form.jgxs" clearable />
          </div>
          <div class="form-item">
            <label class="form-label">运维班组：</label>
            <el-input v-model="form.whbz" clearable  />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">通道主人：</label>
            <el-input v-model="form.sbzr" clearable />
          </div>
          <div class="form-item">
            <label class="form-label">状态：</label>
            <el-input v-model="form.yxzt" clearable  />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">资产性质：</label>
            <el-input v-model="form.zcxz" clearable />
          </div>
          <div class="form-item">
            <label class="form-label">资产编号：</label>
            <el-input v-model="form.zcbh" clearable  />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">投运日期：</label>
            <!--<el-input v-model="form.tyrq" clearable />-->
            <el-col>
              <el-date-picker
                style="width: 100%;"
                v-model="form.tyrq"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </div>
          <div class="form-item">
            <label class="form-label">运维单位：</label>
            <el-input v-model="form.ywdw" clearable  />
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" v-if="editbtn||addbtn" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" v-if="editbtn||addbtn" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {List, Add, DeleteList, Edit} from '@/api/cableandchannel/channel-ledger-management/channel-ledger-management/cl-management'
export default {
  props: {
    /**
     * 接收是否打开页面
     */
    isShowDialog: {
      type: Boolean,
      default: false
    },
    /** 接收参数为是否是编辑*/
    isEdit: {
      type: Boolean,
      default: false
    },
    /**打开页面的id */
    openID: {
      default: null
    },
    /**
     * 接收是否打开页面
     */
    isAdd: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formParam: {
        objId: '', // DLid
      },
      form: {
        objId: this.openID,
        sdmc: '',
        qjmc: '',
        hjmc: '',
        qjjd: '',
        qjwd: '',
        hjjd: '',
        hjwd: '',
        qdwz: '',
        zdwz: '',
        zds: '',
        tdcd: '',
        jgxs: '',
        whbz: '',
        sbzr: '',
        yxzt: '',
        zcxz: '',
        zcbh: '',
        tyrq: '',
        ywdw: ''
      },
      ShowDialog: true, //打开弹框
      editbtn: this.isEdit, //是否是编辑按钮
      addbtn: this.isAdd //是否是新增按钮
    };
  },
  watch: {
    // isShowDialog(val) {
    //   this.ShowDialog = val;
    // },
    isEdit(val) {
      this.editbtn = val;
    },
    isAdd(val) {
      this.addbtn = val;
    }
  },
  inject: ['getList'], // 子页面调取父页面的方法
  methods: {
    // 编辑回显
    getEcho(val) {
      this.formParam.objId = val
      // //console.log(this.formParam);
      List(this.$qs.stringify(this.formParam)).then(res => {
        //console.log(res);
        if(res.status == 200) {
          this.form = res.data.rows[0]
        }
      });
    },
    /**
     * 取消按钮
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.ShowDialog = false;
          this.editbtn = false;
          this.addbtn = false;
          this.$emit("childFn", {
            ShowDialog: this.ShowDialog,
            editbtn: this.editbtn,
            addbtn: this.addbtn
          });
          this. form= {}
          done();
        })
        .catch(_ => {});
    },
    /**
     * 确认按钮
     */
    SuerFun() {
      // 新增
      if(this.addbtn == true) {
        Add(this.$qs.stringify(this.form)).then(res => {
          //console.log(res)
          if (res.status == 200) {
            this.$message({
              message: '新增成功',
              type: 'success'
            })
            this.ShowDialog =false
            this. form= {}
            this.$emit("childFn", {
              showDialog: this.ShowDialog,
              editbtn: this.editbtn,
              addbtn: this.addbtn
            });
            this.getList()
          } else {
            this.$message({
              message: '新增失败',
              type: 'error'
            })
          }
        })
      }
      // 编辑
      if(this.editbtn == true) {
        Edit(this.$qs.stringify(this.form)).then(res => {
          //console.log(res)
          if (res.status == 200) {
            this. form= {}

            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.$emit("childFn", {
              showDialog: this.showDialog,
              editbtn: this.editbtn,
              addbtn: this.addbtn
            });
            this.getList()
          } else {
            this. form= {}
            this.$message({
              message: '编辑失败',
              type: 'error'
            })
          }
        })
      }
      this.ShowDialog = false;
      this.editbtn = false;
      this.addbtn = false;
    }
  }
};
</script>
