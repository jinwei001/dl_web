<template>
  <!-- <h2>隧道门-查看</h2> -->
  <div class="hastitle">
    <el-dialog
      :visible.sync="showDialog"
      title="隧道门"
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
            <label class="form-label">设备名称：</label>
            <el-input v-model="form.sbmc" clearable :disabled="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">实物ID：</label>
            <el-input v-model="form.swid" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">门ID：</label>
            <el-input v-model="form.objId" disabled />
          </div>
          <div class="form-item">
            <label class="form-label">设备编码：</label>
            <el-input v-model="form.sbbm" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">运行编号：</label>
            <el-input v-model="form.yxbh" clearable :disabled="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">所属地市：</label>
            <el-input v-model="form.ssds" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">运维单位：</label>
            <el-input v-model="form.ywdw" clearable :disabled="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">维护班组：</label>
            <!--<el-input v-model="form.whbz" clearable :disabled="isdisabled" />-->
            <el-select v-model="form.whbz" clearable placeholder="请选择" :disabled="isdisabled">
              <el-option
                v-for="item in selection.ywbz"
                :key="item.groupId"
                :label="item.groupname"
                :value="item.groupId"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">地区特征：</label>
            <el-input v-model="form.dqtz" clearable :disabled="isdisabled" />
          </div>
        <div class="form-item">
            <label class="form-label">所属通道类型：</label>
            <el-input v-model="form.sstdlx" clearable disabled />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">所属通道：</label>
            <el-input v-model="form.sdmc" clearable :disabled="isdisabled"  style="width: 95%;"/>
            <el-button size="mini" style="height: 90%" v-if="editbtn||addbtn" @click="chooseSSTD" >选择</el-button>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">所属隧道：</label>
            <el-input v-model="form.sssd" clearable :disabled="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">门位置：</label>
            <el-input v-model="form.jwz" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">门类型：</label>
            <el-input v-model="form.jlx" clearable :disabled="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">结构：</label>
            <el-input v-model="form.jg" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">门形状：</label>
            <el-input v-model="form.mxz" clearable :disabled="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">门尺寸：</label>
            <el-input v-model="form.mcc" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">门材质：</label>
            <el-input v-model="form.mcz" clearable :disabled="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">门生产厂家：</label>
            <el-input v-model="form.msccj" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">门出厂日期：</label>
            <!--<el-input v-model="form.mccrq" clearable :disabled="isdisabled" />-->
            <el-col>
              <el-date-picker
                style="width: 100%;"
                v-model="form.mccrq"
                type="date"
                :disabled="isdisabled"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </div>
          <div class="form-item">
            <label class="form-label">平台层数：</label>
            <el-input v-model="form.ptcs" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">施工日期：</label>
            <!--<el-input v-model="form.sgrq" clearable :disabled="isdisabled" />-->
            <el-col>
              <el-date-picker
                style="width: 100%;"
                v-model="form.sgrq"
                type="date"
                :disabled="isdisabled"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </div>
          <div class="form-item">
            <label class="form-label">竣工日期：</label>
            <!--<el-input v-model="form.jgrq" clearable :disabled="isdisabled" />-->
            <el-col>
              <el-date-picker
                style="width: 100%;"
                v-model="form.jgrq"
                type="date"
                :disabled="isdisabled"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">图纸编号：</label>
            <el-input v-model="form.tzbh" clearable :disabled="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">资产性质：</label>
            <el-input v-model="form.zcxz" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">资产单位：</label>
            <el-input v-model="form.zcdw" clearable :disabled="isdisabled" />
          </div>
          <div class="form-item">
            <label class="form-label">资产编号：</label>
            <el-input v-model="form.zcbh" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">登记时间：</label>
            <!--<el-input v-model="form.djsj" clearable :disabled="isdisabled" />-->
            <el-col>
              <el-date-picker
                style="width: 100%;"
                v-model="form.djsj"
                type="date"
                :disabled="isdisabled"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </div>
          <div class="form-item">
            <label class="form-label">设备主人：</label>
            <el-input v-model="form.sbzr" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">地理位置：</label>
            <el-input v-model="form.dlwz" clearable :disabled="isdisabled" />
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">备注：</label>
            <el-input v-model="form.bz" clearable :disabled="isdisabled" />
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" v-if="editbtn||addbtn" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" v-if="editbtn||addbtn" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>

    <div v-if="isChooseDialog">
      <ChooseSSTDDialog
        ref="ChooseSSTDDialog"
        @childFn="parentFn"
      />
    </div>
  </div>
</template>

<script>
import ChooseSSTDDialog from './chooseSSTDDialog'
import {
  List,
  Add,
  DeleteList,
  Edit
} from "@/api/cableandchannel/channel-ledger-management/accessAccessory/portal";
import { fatherList, getLineSelect, } from '@/api/cableandchannel/channel-ledger-management/channel-ledger-management/cl-management'
export default {
  components: { ChooseSSTDDialog },
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
      thisopenID: this.openID, // 把父页面传的值存起来
      ClickID: this.gruClickID, // 把祖父页面传的值存起来
      formParam: {
        objId: this.gruClickID, // dlid
      },
      form: {
        objId: '',
        sssdgd: '',
        sdmc: '', // 所属通道
        sbmc: '', // 设备名称
        sbbm: '',
        yxbh: '',
        ssds: '',
        ywdw: '',
        whbz: '',
        bzmc: '', // 班组名称
        dqtz: '',
        dlwz: '',
        sstdlx: '',
        jwz: '',
        jlx: '',
        jg: '',
        mxz: '',
        mcc: '',
        mcz: '',
        msccj: '',
        mccrq: '',
        ptcs: '',
        sgdw: '',
        sgrq: '',
        jgrq: '',
        tzbh: '',
        zcxz: '',
        zcdw: '',
        zcbh: '',
        bz: '',
        djsj: '',
        sbzr: '',
        swid: '',
      },
      selection: {
        ywbz: []
      },
      showDialog: true, //打开弹框
      editbtn: this.isEdit, //是否是编辑按钮
      addbtn: this.isAdd, //是否是新增按钮
      isChooseDialog: false, // 打开选择弹窗
    };
  },
  computed: {
    /**计算是否可读 */
    isdisabled() {
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
    isAdd(val) {
      this.addbtn = val;
    }
  },
  inject: ['getList'], // 子页面调取父页面的方法
  created() {
    if (this.isAdd == true){
      // 获取XL名称
      fatherList(this.$qs.stringify(this.formParam)).then(res => {
        //console.log(res);
        // this.form.sdmc = res.data.rows[0].sdmc
      });
    } else {
      // 编辑回显
      this.getEcho(this.openID)
    }
  },
  mounted() {
    this.getSelect()
  },
  methods: {
    // 点击选择
    chooseSSTD() {
      this.isChooseDialog = true
    },
    parentFn(val) {
      //console.log(val)
      this.isChooseDialog = val.isChooseDialog
      if (val.ChooseValue) {
        this.form.sdmc = val.ChooseValue[0].sdmc
        this.form.sssdgd = val.ChooseValue[0].objId
        this.form.sstdlx = val.ChooseValue[0].tdlx
      }
    },
    // 获取下拉数据
    getSelect() {
      getLineSelect().then(response => {
        //console.log(response);
        if(response.status == 200) {
          this.selection.ywbz = response.data.data.groupList
          // this.selection.jgxs = response.data.data.jgxsList
        }
      })
    },
    // 编辑回显
    getEcho(val) {
      this.formParam.objId = val
      // //console.log(this.formParam);
      List(this.$qs.stringify(this.formParam)).then(res => {
        //console.log(res);
        if(res.status == 200) {
          this.form = res.data.rows[0]
          this.form.sdmc = res.data.rows[0].tdmc
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
          this.form = { brand_right: 0 }
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
      // 新增
      if(this.addbtn == true) {
        if(this.form.bzmc){ // 运维班组
          let searcharr = this.selection.ywbz.filter(res=>{
            return this.form.bzmc == res.groupId
          })
          this.form.bzmc = searcharr[0]['groupname']
        }
        Add(this.$qs.stringify(this.form)).then(res => {
          //console.log(res)
          if (res.status == 200) {
            this.$message({
              message: '新增成功',
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
      }
      this.showDialog = false
      this.editbtn = false
      this.addbtn = false
    }
  }
};
</script>
