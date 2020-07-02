<template>
  <!-- <h2>通道台账管理-新增 -->
  <div class="hastitle">
    <el-dialog
      :visible.sync="ShowDialogAdd"
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
            <el-input v-model="form.sdmc" clearable  :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">通道类型：</label>
            <el-select v-model="form.tdlx" clearable placeholder="请选择" :disabled="isdisabled">
              <el-option
                v-for="item in selectionTDLX.tdlx"
                :key="item.tdlx"
                :label="item.tdlxmc"
                :value="item.tdlxmc"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">前井名称：</label>
            <el-input v-model="form.qjmc" clearable  :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">后井名称：</label>
            <el-input v-model="form.hjmc" clearable  :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">前井经度：</label>
            <el-input v-model="form.qjjd" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">前井纬度：</label>
            <el-input v-model="form.qjwd" clearable  :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">后井经度：</label>
            <el-input v-model="form.hjjd" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">后井纬度：</label>
            <el-input v-model="form.hjwd" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">起点位置：</label>
            <el-input v-model="form.qdwz" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">终点位置：</label>
            <el-input v-model="form.zdwz" clearable  :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">总段数：</label>
            <el-input v-model="form.zds" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">通道长度：</label>
            <el-input v-model="form.tdcd" clearable  :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">结构形式：</label>
            <el-input v-model="form.jgxs" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">运维班组：</label>
            <el-select v-model="form.whbz" clearable placeholder="请选择" :disabled="isdisabled">
              <el-option
                v-for="item in selection.ywbz"
                :key="item.groupId"
                :label="item.groupname"
                :value="item.groupname"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">通道主人：</label>
            <el-input v-model="form.sbzr" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">运行状态：</label>
            <el-input v-model="form.yxzt" clearable  :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">资产性质：</label>
            <el-input v-model="form.zcxz" clearable :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">资产单位：</label>
            <el-input v-model="form.zcdw" clearable  :disabled="isdisabled"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">资产编号：</label>
            <el-input v-model="form.zcbh" clearable  :disabled="isdisabled"/>
          </div>
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
                :disabled="isdisabled"
              ></el-date-picker>
            </el-col>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">运维单位：</label>
            <el-input v-model="form.ywdw" clearable  :disabled="isdisabled"/>
          </div>
          <div class="form-item">
            <label class="form-label">设备编码：</label>
            <el-input v-model="form.sbbm" clearable  :disabled="isdisabled"/>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button class="UserSearchFun" v-if="editbtn" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" v-if="editbtn" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {List, Add, DeleteList, Edit} from '@/api/cableandchannel/channel-ledger-management/channel-ledger-management/cl-management';
import { fatherList, getLineSelect, } from '@/api/cableandchannel/cable-equipment-ledger/Line/index';
export default {
  props: {
    /**
     * 接收是否打开页面
     */
    isShowDialogAdd: {
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
    gruClickID: {
      default: null
    },
    selectionTDLX: {

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
      selection: {
        ywbz: []
      },
      ShowDialogAdd: this.isShowDialogAdd, //打开弹框
      editbtn: this.isEdit, //是否是编辑按钮
      addbtn: this.isAdd //是否是新增按钮
    };
  },
  computed: {
    /**计算是否可读 */
    isdisabled() {
      return !(this.editbtn || this.addbtn);
    }
  },
  watch: {
    isShowDialogAdd(val) {
      this.ShowDialogAdd = val;
    },
    isEdit(val) {
      this.editbtn = val;
    },
    isAdd(val) {
      this.addbtn = val;
      this.form = {}
    }
  },
  mounted() {
    this.getSelect()
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
      })
    },
    // 获取下拉数据
    getSelect() {
      getLineSelect().then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.selection.ywbz = response.data.data.groupList
        }
      })
    },
    /**
     * 取消按钮
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.ShowDialogAdd = false;
          this.editbtn = false;
          this.addbtn = false;
          this.$emit("childFn", {
            ShowDialogAdd: this.ShowDialogAdd,
            editbtn: this.editbtn,
            addbtn: this.addbtn
          });
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
            this.$emit("childFn", {
              ShowDialogAdd: this.ShowDialogAdd,
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
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.$emit("childFn", {
              ShowDialogAdd: this.ShowDialogAdd,
              editbtn: this.editbtn,
              addbtn: this.addbtn
            });
            this.getList()
          } else {
            this.$message({
              message: '编辑失败',
              type: 'error'
            })
          }
        })
      }
      this.ShowDialogAdd = false;
      this.editbtn = false;
      this.addbtn = false;
    }
  }
};
</script>
