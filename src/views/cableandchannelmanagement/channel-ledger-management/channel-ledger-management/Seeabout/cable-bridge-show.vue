<template>
  <!-- <h2>dl桥架</h2> -->
  <div class="hastitle">
    <el-dialog
      :visible.sync="showDialog"
      :title="`${$dl}桥架`"
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
            <label class="form-label">{{$dl}}桥架ID：</label>
            <el-input v-model="form.objId" disabled/>
          </div>
          <div class="form-item">
            <label class="form-label">实物ID：</label>
            <el-input v-model="form.swid" clearable :readonly="isreadonly"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">设备编码：</label>
            <el-input v-model="form.sbbm" clearable :readonly="isreadonly"/>
          </div>
          <div class="form-item">
            <label class="form-long-label">运行编号：</label>
            <el-input v-model="form.yxbh" clearable :readonly="isreadonly"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">所属地市：</label>
            <el-input v-model="form.ssds" clearable :readonly="isreadonly"/>
          </div>
          <div class="form-item">
            <label class="form-label">运维单位：</label>
            <el-input v-model="form.ywdw" clearable :readonly="isreadonly"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">维护班组：</label>
            <!--<el-input v-model="form.whbz" clearable :readonly="isreadonly"/>-->
            <el-select v-model="form.whbz" clearable placeholder="请选择" :readonly="isreadonly">
              <el-option
                v-for="item in selection.ywbz"
                :key="item.groupId"
                :label="item.groupname"
                :value="item.groupId"
              ></el-option>
            </el-select>
          </div>
          <div class="form-item">
            <label class="form-label">地区特征：</label>
            <el-input v-model="form.dqtz" clearable :readonly="isreadonly"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-long-label">所属{{$dl}}沟（隧&ensp;道）：</label>
            <el-input v-model="form.ssdlgsd" disabled/>
          </div>
          <div class="form-item">
            <label class="form-label">材质：</label>
            <el-input v-model="form.cz" clearable :readonly="isreadonly"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">防火材料：</label>
            <el-input v-model="form.fhcl" clearable :readonly="isreadonly"/>
          </div>
          <div class="form-item">
            <label class="form-label">施工单位：</label>
            <el-input v-model="form.sgdw" clearable :readonly="isreadonly"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">施工日期：</label>
            <!--<el-input v-model="form.sgrq" clearable :readonly="isreadonly"/>-->
            <el-col>
              <el-date-picker
                style="width: 100%;"
                v-model="form.sgrq"
                type="date"
                :readonly="isreadonly"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </div>
          <div class="form-item">
            <label class="form-label">竣工日期：</label>
            <!--<el-input v-model="form.jgrq" clearable :readonly="isreadonly"/>-->
            <el-col>
              <el-date-picker
                style="width: 100%;"
                v-model="form.jgrq"
                type="date"
                :readonly="isreadonly"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">资产性质：</label>
            <el-input v-model="form.zcxz" clearable :readonly="isreadonly"/>
          </div>
          <div class="form-item">
            <label class="form-label">资产单位：</label>
            <el-input v-model="form.zcdw" clearable :readonly="isreadonly"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">资产编号：</label>
            <el-input v-model="form.zcbh" clearable :readonly="isreadonly"/>
          </div>
          <div class="form-item">
            <label class="form-label">登记时间：</label>
            <!--<el-input v-model="form.djsj" clearable :readonly="isreadonly"/>-->
            <el-col>
              <el-date-picker
                style="width: 100%;"
                v-model="form.djsj"
                type="date"
                :readonly="isreadonly"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">设备主人：</label>
            <el-input v-model="form.sbzr" clearable :readonly="isreadonly"/>
          </div>
          <div class="form-item">
            <label class="form-label">备注：</label>
            <el-input v-model="form.bz" clearable :readonly="isreadonly"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">长度：</label>
            <el-input v-model="form.cd" clearable :readonly="isreadonly"/>
          </div>
          <div class="form-item">
            <label class="form-label">井数量：</label>
            <el-input v-model="form.jsl" clearable :readonly="isreadonly"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">起点位置：</label>
            <el-input v-model="form.qdwz" clearable :readonly="isreadonly"/>
          </div>
          <div class="form-item">
            <label class="form-label">终点位置：</label>
            <el-input v-model="form.zdwz" clearable :readonly="isreadonly"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">类型：</label>
            <el-input v-model="form.lx" clearable :readonly="isreadonly"/>
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
import {
  List,
  Add,
  DeleteList,
  Edit
} from "@/api/cableandchannel/channel-ledger-management/channel-ledger-management/cl-cableBridge";
import { fatherList, getLineSelect, } from '@/api/cableandchannel/channel-ledger-management/channel-ledger-management/cl-management'
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
        sstd: this.gruClickID,
        ssdlgsd: '', // 所属dl及隧道
        swid: '',
        sbbm: '',
        yxbh: '',
        ssds: '',
        ywdw: '',
        whbz: '',
        bzmc: '', // 运维班组的名称
        dqtz: '',
        tdmc: '',
        cz: '',
        fhcl: '',
        sgdw: '',
        sgrq: '',
        jgrq: '',
        zcxz: '',
        zcdw: '',
        zcbh: '',
        bz: '',
        djsj: '',
        sbzr: '',
        cd: '',
        jsl: '',
        qdwz: '',
        zdwz: '',
        lx: ''
      },
      selection: {
        ywbz: []
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
  inject: ['getList'], // 子页面调取父页面的方法
  created() {
    if (this.isAdd == true){
      // 获取XL名称
      fatherList(this.$qs.stringify(this.formParam)).then(res => {
        //console.log(res);
        this.form.ssdlgsd = res.data.rows[0].sdmc
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
    // 获取下拉数据
    getSelect() {
      getLineSelect().then(response => {
        // //console.log(response);
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
