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
        :model="addlist"
        :rules="rules"
        label-position="right"
        style="width:100% ;margin: 0 auto;"
      >
        <div class="Form-input">{{$dl}}本体</div>
        <div class="Form-input">
          <el-form-item label="扣分值" label-width="180px" style="width:33%">
            <el-input v-model="addlist.aKfz" readonly />
          </el-form-item>
          <el-form-item label="权重" label-width="180px" style="width:33%">
            <el-input v-model="addlist.aQz" readonly />
          </el-form-item>
          <el-form-item label="劣化程度" label-width="180px" style="width:33%">
            <el-input v-model="addlist.aLhcd" readonly />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="判断依据" label-width="180px" style="width:100%">
            <el-select
              v-model="addlist.aPdyj"
              filterable
              clearable
              placeholder="请选择"
              style="width:100%"
              @change="getCalculateStatus('bt',addlist.aPdyj)"
            >
              <el-option
                v-for="(item, index) in selection.dlbt"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="状态量" style="width:100%" label-width="180px">
            <el-input type="textarea" v-model="addlist.aZtl" readonly></el-input>
          </el-form-item>
        </div>
        <div class="Form-input">{{$dl}}终端</div>
        <div class="Form-input">
          <el-form-item label="扣分值" label-width="180px" style="width:33%">
            <el-input v-model="addlist.bKfz" readonly />
          </el-form-item>
          <el-form-item label="权重" label-width="180px" style="width:33%">
            <el-input v-model="addlist.bQz" readonly />
          </el-form-item>
          <el-form-item label="劣化程度" label-width="180px" style="width:33%">
            <el-input v-model="addlist.bLhcd" readonly />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="判断依据" label-width="180px" style="width:100%">
            <el-select
              v-model="addlist.bPdyj"
              filterable
              clearable
              placeholder="请选择"
              style="width:100%"
              @change="getCalculateStatus('zd',addlist.bPdyj)"
            >
              <el-option
                v-for="(item, index) in  selection.dlzd"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="状态量" style="width:100%" label-width="180px">
            <el-input type="textarea" v-model="addlist.bZtl" readonly></el-input>
          </el-form-item>
        </div>
        <div class="Form-input">辅助设施</div>
        <div class="Form-input">
          <el-form-item label="扣分值" label-width="180px" style="width:33%">
            <el-input v-model="addlist.cKfz" readonly />
          </el-form-item>
          <el-form-item label="权重" label-width="180px" style="width:33%">
            <el-input v-model="addlist.cQz" readonly />
          </el-form-item>
          <el-form-item label="劣化程度" label-width="180px" style="width:33%">
            <el-input v-model="addlist.cLhcd" readonly />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="判断依据" label-width="180px" style="width:100%">
            <el-select
              v-model="addlist.cPdyj"
              filterable
              clearable
              placeholder="请选择"
              style="width:100%"
              @change="getCalculateStatus('fz',addlist.cPdyj)"
            >
              <el-option
                v-for="(item, index) in  selection.fzss"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="状态量" style="width:100%" label-width="180px">
            <el-input type="textarea" v-model="addlist.cZtl" readonly></el-input>
          </el-form-item>
        </div>
        <div class="Form-input">中间接头</div>
        <div class="Form-input">
          <el-form-item label="扣分值" label-width="180px" style="width:33%">
            <el-input v-model="addlist.dKfz" readonly />
          </el-form-item>
          <el-form-item label="权重" label-width="180px" style="width:33%">
            <el-input v-model="addlist.dQz" readonly />
          </el-form-item>
          <el-form-item label="劣化程度" label-width="180px" style="width:33%">
            <el-input v-model="addlist.dLhcd" readonly />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="判断依据" label-width="180px" style="width:100%">
            <el-select
              v-model="addlist.dPdyj"
              filterable
              clearable
              placeholder="请选择"
              style="width:100%"
              @change="getCalculateStatus('jt',addlist.dPdyj)"
            >
              <el-option
                v-for="(item, index) in  selection.zjjt"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="状态量" style="width:100%" label-width="180px">
            <el-input type="textarea" v-model="addlist.dZtl" readonly></el-input>
          </el-form-item>
        </div>
        <div class="Form-input">{{$dl}}线路过电压保护器</div>
        <div class="Form-input">
          <el-form-item label="扣分值" label-width="180px" style="width:33%">
            <el-input v-model="addlist.eKfz" readonly />
          </el-form-item>
          <el-form-item label="权重" label-width="180px" style="width:33%">
            <el-input v-model="addlist.eQz" readonly />
          </el-form-item>
          <el-form-item label="劣化程度" label-width="180px" style="width:33%">
            <el-input v-model="addlist.eLhcd" readonly />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="判断依据" label-width="180px" style="width:100%">
            <el-select
              v-model="addlist.ePdyj"
              filterable
              clearable
              placeholder="请选择"
              style="width:100%"
              @change="getCalculateStatus('bhq',addlist.ePdyj)"
            >
              <el-option
                v-for="(item, index) in  selection.bhq"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="状态量" style="width:100%" label-width="180px">
            <el-input type="textarea" v-model="addlist.eZtl" readonly></el-input>
          </el-form-item>
        </div>
        <div class="Form-input">通道</div>
        <div class="Form-input">
          <el-form-item label="扣分值" label-width="180px" style="width:33%">
            <el-input v-model="addlist.fKfz" readonly />
          </el-form-item>
          <el-form-item label="权重" label-width="180px" style="width:33%">
            <el-input v-model="addlist.fQz" readonly />
          </el-form-item>
          <el-form-item label="劣化程度" label-width="180px" style="width:33%">
            <el-input v-model="addlist.fLhcd" readonly />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="判断依据" label-width="180px" style="width:100%">
            <el-select
              v-model="addlist.fPdyj"
              filterable
              clearable
              placeholder="请选择"
              style="width:100%"
              @change="getCalculateStatus('td',addlist.fPdyj)"
            >
              <el-option
                v-for="(item, index) in  selection.td"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="状态量" style="width:100%" label-width="180px">
            <el-input type="textarea" v-model="addlist.fZtl" readonly></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取消</el-button>
      </div>
      <!-- {{openobj}} -->
    </el-dialog>
  </div>
</template>

<script>
import { POSTTBList } from "@/api/public";
import {
  getpdyjList,
  getCalculateStatus,
  editztpj
} from "@/api/statusE/regular";
import qs from "qs";
export default {
  props: {
    openobj: {
      default: null
    }
  },
  data() {
    return {
      showDialog: true, //新增弹框打开
      addlist: {
        id: this.openobj.id,
        aKfz: this.openobj.aPdyj == "" ? "" : this.openobj.aKfz,
        aQz: this.openobj.aPdyj == "" ? "" : this.openobj.aQz,
        aLhcd: this.openobj.aPdyj == "" ? "" : this.openobj.aLhcd,
        aPdyj: this.openobj.aPdyj,
        aZtl: this.openobj.aPdyj == ""  ? "" : this.openobj.aZtl,
        aStatus: this.openobj.aPdyj == "" ? "" : this.openobj.aStatus,

        bKfz: this.openobj.bPdyj == "" ? "" : this.openobj.bKfz,
        bQz: this.openobj.bPdyj == "" ? "" : this.openobj.bQz,
        bLhcd: this.openobj.bPdyj == "" ? "" : this.openobj.bLhcd,
        bPdyj: this.openobj.bPdyj,
        bZtl: this.openobj.bPdyj == "" ? "" : this.openobj.bZtl,
        bStatus: this.openobj.bPdyj == "" ? "" : this.openobj.bStatus,

        cKfz: this.openobj.cPdyj == "" ? "" : this.openobj.cKfz,
        cQz: this.openobj.cPdyj == "" ? "" : this.openobj.cQz,
        cLhcd: this.openobj.cPdyj == "" ? "" : this.openobj.cLhcd,
        cPdyj: this.openobj.cPdyj,
        cZtl: this.openobj.cPdyj == "" ? "" : this.openobj.cZtl,
        cStatus: this.openobj.cPdyj == "" ? "" : this.openobj.cStatus,

        dKfz: this.openobj.dPdyj == "" ? "" : this.openobj.dKfz,
        dQz: this.openobj.dPdyj == "" ? "" : this.openobj.dQz,
        dLhcd: this.openobj.dPdyj == "" ? "" : this.openobj.dLhcd,
        dPdyj: this.openobj.dPdyj,
        dZtl: this.openobj.dPdyj == "" ? "" : this.openobj.dZtl,
        dStatus: this.openobj.dPdyj == "" ? "" : this.openobj.dStatus,

        eKfz: this.openobj.ePdyj == "" ? "" : this.openobj.eKfz,
        eQz: this.openobj.ePdyj == "" ? "" : this.openobj.eQz,
        eLhcd: this.openobj.ePdyj == "" ? "" : this.openobj.eLhcd,
        ePdyj: this.openobj.ePdyj,
        eZtl: this.openobj.ePdyj == "" ? "" : this.openobj.eZtl,
        eStatus: this.openobj.ePdyj == "" ? "" : this.openobj.eStatus,

        fKfz: this.openobj.fPdyj == "" ? "" : this.openobj.fKfz,
        fQz: this.openobj.fPdyj == "" ? "" : this.openobj.fQz,
        fLhcd: this.openobj.fPdyj == "" ? "" : this.openobj.fLhcd,
        fPdyj: this.openobj.fPdyj,
        fZtl: this.openobj.fPdyj == "" ? "" : this.openobj.fZtl,
        fStatus: this.openobj.fPdyj == "" ? "" : this.openobj.fStatus
      },
      title: "状态量评价",
      lineId: "",
      selection: {
        dlbt: [],
        dlzd: [],
        fzss: [],
        zjjt: [],
        bhq: [],
        td: []
      },
      rules: {
        decideBasis: [
          {
            required: true,
            message: "请选择判断依据",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {},

  mounted() {
    this.lineId = this.openobj.lineId;
    console.log("this.addlist :>> ", this.addlist);
    this.getSlectionList();
  },
  methods: {
    // 获取判断依据下拉列表
    getSlectionList() {
      getpdyjList(this.$qs.stringify({pjBj: '电缆本体'})).then(res => {
        this.selection.dlbt = res.data.data;
      });
      getpdyjList(this.$qs.stringify({pjBj: '电缆终端'})).then(res => {
        this.selection.dlzd = res.data.data;
      });
      getpdyjList(this.$qs.stringify({pjBj: '附属设施'})).then(res => {
        this.selection.fzss = res.data.data;
      });
      getpdyjList(this.$qs.stringify({pjBj: '中间接头'})).then(res => {
        this.selection.zjjt = res.data.data;
      });
      getpdyjList(this.$qs.stringify({pjBj: '过电压保护器'})).then(res => {
        this.selection.bhq = res.data.data;
      });
      getpdyjList(this.$qs.stringify({pjBj: '线路通道'})).then(res => {
        this.selection.td = res.data.data;
      });
    },
    // 根据选择的判断依据获取其他数据
    getCalculateStatus(val, value) {
      getCalculateStatus(
        this.$qs.stringify({ lineId: this.lineId, decideBasis: value })
      ).then(res => {
        let data = res.data.data;
        if (val == "bt") {
          this.addlist.aKfz = data.point;
          this.addlist.aQz = data.weight;
          this.addlist.aLhcd = data.degradateDegree;
          this.addlist.aZtl = data.statusName;
          this.addlist.aStatus = data.status;
        } else if (val == "zd") {
          this.addlist.bKfz = data.point;
          this.addlist.bQz = data.weight;
          this.addlist.bLhcd = data.degradateDegree;
          this.addlist.bZtl = data.statusName;
          this.addlist.bStatus = data.status;
        } else if (val == "fz") {
          this.addlist.cKfz = data.point;
          this.addlist.cQz = data.weight;
          this.addlist.cLhcd = data.degradateDegree;
          this.addlist.cZtl = data.statusName;
          this.addlist.cStatus = data.status;
        } else if (val == "jt") {
          this.addlist.dKfz = data.point;
          this.addlist.dQz = data.weight;
          this.addlist.dLhcd = data.degradateDegree;
          this.addlist.dZtl = data.statusName;
          this.addlist.dStatus = data.status;
        } else if (val == "bhq") {
          this.addlist.eKfz = data.point;
          this.addlist.eQz = data.weight;
          this.addlist.eLhcd = data.degradateDegree;
          this.addlist.eZtl = data.statusName;
          this.addlist.eStatus = data.status;
        } else if (val == "td") {
          this.addlist.fKfz = data.point;
          this.addlist.fQz = data.weight;
          this.addlist.fLhcd = data.degradateDegree;
          this.addlist.fZtl = data.statusName;
          this.addlist.fStatus = data.status;
        }
      });
    },
    SuerFun() {
      editztpj(this.$qs.stringify(this.addlist)).then(res => {
        if (res.data.code == 0) {
          this.$message.success("保存成功");
          this.$emit("childFn", {
            showDialog: false
          });
          this.$parent.getList();
        } else {
          this.$message.error(res.data.msg);
          this.$emit("childFn", {
            showDialog: false
          });
          this.$parent.getList();
        }
      });
    },
    /**关闭页面 */
    handleClose() {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.showDialog = false;
          this.$emit("childFn", {
            showDialog: this.showDialog
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