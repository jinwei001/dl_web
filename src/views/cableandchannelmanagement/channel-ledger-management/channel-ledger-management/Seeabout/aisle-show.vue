<template>
  <!-- <h2>通道-查看</h2> -->
  <div class="hastitle">
    <el-dialog
      :visible.sync="showDialog"
      title="通道"
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
            <label class="form-label">通道ID：</label>
            <el-input v-model="form.objId" disabled/>
          </div>
          <div class="form-item">
            <label class="form-label">实物ID：</label>
            <el-input v-model="form.swid" clearable disabled/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">设备编码：</label>
            <el-input v-model="form.sbbm" clearable disabled/>
          </div>
          <div class="form-item">
            <label class="form-label">通道名称：</label>
            <el-input v-model="form.sdmc" clearable disabled/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">通道编号：</label>
            <el-input v-model="form.sdbh" clearable disabled/>
          </div>
          <div class="form-item">
            <label class="form-label">所属地市：</label>
            <el-input v-model="form.ssds" clearable disabled/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">通道类型：</label>
            <el-input v-model="form.tdlx" clearable disabled/>
          </div>
          <div class="form-item">
            <label class="form-label">运维单位：</label>
            <el-input v-model="form.ywdw" clearable disabled/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">维护班组：</label>
            <el-input v-model="form.whbz" clearable disabled/>
          </div>
          <div class="form-item">
            <label class="form-label">运行状态：</label>
            <el-input v-model="form.yxzt" clearable disabled/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">资产性质：</label>
            <el-input v-model="form.zcxz" clearable disabled/>
          </div>
          <div class="form-item">
            <label class="form-label">资产单位：</label>
            <el-input v-model="form.zcdw" clearable disabled/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">地区特征：</label>
            <el-input v-model="form.dqtz" clearable disabled/>
          </div>
          <div class="form-item">
            <label class="form-label">资产编号：</label>
            <el-input v-model="form.zcbh" clearable disabled/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">起点位置：</label>
            <el-input v-model="form.qdwz" clearable disabled/>
          </div>
          <div class="form-item">
            <label class="form-label">终点位置：</label>
            <el-input v-model="form.zdwz" clearable disabled/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">档案名称：</label>
            <el-input v-model="form.damc" clearable disabled/>
          </div>
          <div class="form-item">
            <label class="form-label">结构形式：</label>
            <el-input v-model="form.jgxs" clearable disabled/>
          </div>
        </div>

        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">悬挂方式：</label>
            <el-input v-model="form.xgfs" clearable disabled/>
          </div>
          <div class="form-item">
            <label class="form-label">截面类型：</label>
            <el-input v-model="form.jmlx" clearable disabled/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">断面尺寸：</label>
            <el-input v-model="form.dmcc" clearable disabled/>
          </div>
          <div class="form-item">
            <label class="form-label">通道长度：</label>
            <el-input v-model="form.tdcd" clearable disabled/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">井数量：</label>
            <el-input v-model="form.jsl" clearable disabled/>
          </div>
          <div class="form-item">
            <label class="form-label">施工单位：</label>
            <el-input v-model="form.sgdw" clearable disabled/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">竣工日期：</label>
            <el-input v-model="form.jgrq" clearable disabled/>
          </div>
          <div class="form-item">
            <label class="form-label">图纸编号：</label>
            <el-input v-model="form.tzbh" clearable disabled/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">登记时间：</label>
            <el-input v-model="form.djsj" clearable disabled/>
          </div>
          <div class="form-item">
            <label class="form-label">设备主人：</label>
            <el-input v-model="form.sbzr" clearable disabled/>
          </div>
        </div>

        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">备注：</label>
            <el-input v-model="form.bz" clearable disabled/>
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
import {List, Add, DeleteList, Edit,} from '@/api/cableandchannel/channel-ledger-management/channel-ledger-management/cl-management'
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
    // 是否是查看
    isLook: {
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
        objId: '',
      },
      form: {
        objId: '',
        swid: '',
        sbbm: '',
        sdmc: '',
        sdbh: '',
        ssds: '',
        tdlx: '',
        ywdw: '',
        whbz: '',
        yxzt: '',
        zcxz: '',
        zcdw: '',
        dqtz: '',
        zcbh: '',
        qdwz: '',
        zdwz: '',
        damc: '',
        jgxs: '',
        xgfs: '',
        jmlx: '',
        dmcc: '',
        tdcd: '',
        jsl: '',
        sgdw: '',
        jgrq: '',
        tzbh: '',
        djsj: '',
        sbzr: '',
        bz: ''
      },
      showDialog: true, //打开弹框
      editbtn: this.isEdit, //是否是编辑按钮
      addbtn:this.isAdd,//是否是新增按钮
    };
  },
  computed: {
    /**计算是否可读 */
    isreadonly() {
      return !(this.editbtn || this.addbtn);
    }
  },
  watch: {
    isShowDialog(val) {
      this.showDialog = val;
    },
    isEdit(val) {
      this.editbtn = val;
    },
    isAdd(val){
      this.addbtn = val
    }
  },
  created() {
    this.getEcho();
  },
  inject: ['getList'], // 子页面调取父页面的方法
  methods: {
    // 获取回显信息
    getEcho() {
      this.form ={};
      this.formParam.objId = this.gruClickID
      // //console.log('objId')
      //console.log(this.formParam)
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
          this.showDialog = false;
          this.editbtn = false;
          this.addbtn = false;
          this.$emit("childFn", {
            showDialog: this.showDialog,
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
      Edit(this.$qs.stringify(this.form)).then(res => {
        //console.log(res)
        if (res.status == 200) {
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
          this.$message({
            message: '编辑失败',
            type: 'error'
          })
        }
      })
      this.showDialog = false;
      this.editbtn = false;
      this.addbtn = false;
    }
  }
};
</script>
