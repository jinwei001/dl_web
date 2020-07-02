<template>
  <el-dialog
    :visible.sync="showDialog"
    title="编辑"
    v-dialogDrag
    :center="isEdit"
    top="2vh"
    :before-close="handleClose"
  >
    <el-form ref="dataForm" :model="form" label-position="left" style="width:100% ;margin: 0 auto;">
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">{{$xl}}名称：</label>
          <el-input v-model="form.lineName" clearable disabled/>
        </div>
        <div class="form-item">
          <label class="form-label">{{$dydj}}：</label>
          <el-input v-model="form.voltageRank" clearable disabled/>
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">架设方式：</label>
          <el-input v-model="form.lineType" clearable disabled/>
        </div>
        <div class="form-item">
          <label class="form-label">{{$dl}}长度：</label>
          <el-input v-model="form.totalLength" clearable disabled/>
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">投运时间：</label>
          <el-input v-model="form.transportTime" clearable disabled/>
        </div>
        <div class="form-item">
          <label class="form-label">接头数：</label>
          <el-input v-model="form.spliceCount" clearable />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">终端数：</label>
          <el-input v-model="form.terminalCount" clearable />
        </div>
        <div class="form-item">
          <label class="form-label">直埋（米）：</label>
          <el-input v-model="form.directBurial" clearable />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">桥架桥梁（米）：</label>
          <el-input v-model="form.bridge" clearable />
        </div>
        <div class="form-item">
          <label class="form-label">隧道（米）：</label>
          <el-input v-model="form.tunnel" clearable />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">综合管廊（米）：</label>
          <el-input v-model="form.utilityTunnel" clearable />
        </div>
        <div class="form-item">
          <label class="form-label">沟道（米）：</label>
          <el-input v-model="form.channel" clearable />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">其他（米）：</label>
          <el-input v-model="form.other" clearable />
        </div>
        <div class="form-item">
          <label class="form-label">排管（米）：</label>
          <el-input v-model="form.calandria" clearable />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-hegit-item">
          <label class="form-label">原因：</label>
          <div class="result">
            <!-- <ul v-for="item in selection.dj" :key="item.id" class="lev">
              {{item.lev}}
              <li v-for="items in item.describe" :key="items.key" class="levLi">{{items.item}}</li>
            </ul>-->
            <el-collapse v-model="checkedJb">
              <el-collapse-item
                v-for="item in selection.dj"
                :key="item.id"
                :title="item.lev"
                :name="item.id"
              >
                <el-radio-group v-model="form.reasonId" @change="handleCheckedJBChange">
                  <el-radio
                    v-for="items in item.describe"
                    :key="items.key"
                    class="levLi"
                    :label="items.key"
                  >{{items.item}}</el-radio>
                </el-radio-group>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">级别 ：</label>
          <label class="form-text" v-if="form.grade == 1">一级高压{{$dl}}</label>
          <label class="form-text" v-if="form.grade == 2">二级高压{{$dl}}</label>
          <label class="form-text" v-if="form.grade == 3">三级高压{{$dl}}</label>
          <label class="form-text" v-if="form.grade == ''">暂无</label>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button class="UserSearchFun" @click="SuerFun">保存</el-button>
      <el-button class="onSearch" @click="handleClose">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  List,
  Echo,
  Edit
} from "@/api/cableandchannel/line-grading/line-grading";
export default {
  props: {
    /**
     * 接收是否打开页面
     */
    isShowDialog: {
      type: Boolean,
      default: true
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
  },
  data() {
    return {
      checkedJb: 0, //选中的select
      form: {
        lineId: this.openID,
        lineName: '',
        voltageRank: '',
        totalLength: '',
        lineType: '',
        transportTime: '',
        spliceCount: '',
        terminalCount: '',
        directBurial: '',
        bridge: '',
        tunnel: '',
        utilityTunnel: '',
        channel: '',
        other: '',
        calandria: '',
        reasonId: '',
        reason: '',
        grade: ''
      },
      editbtn: this.isEdit, // 是否是编辑按钮
      showDialog: this.isShowDialog,
      selection: {
        xlmc: [{ id: "1", qb: "全部" }],
        dj: [
          {
            id: 1,
            lev: "一级高压" + this.$dl,
            describe: [
              { key: 1, item: "330千伏及以上高压" + this.$dl + this.$xl },
              {
                key: 2,
                item: "特级和一级客户直供的110（66）千伏及以上高压" + this.$dl + this.$xl
              }
            ]
          },
          {
            id: 2,
            lev: "二级高压" + this.$dl,
            describe: [
              { key: 3, item: "特级和一级客户供电电源非上一级高压" + this.$dl + this.$xl },
              { key: 4, item: "二级客户值供的110（66）千伏及以上高压" + this.$dl + this.$xl }
            ]
          },
          {
            id: 3,
            lev: "三级高压" + this.$dl,
            describe: [{ key: 5, item: "剩余110（66）千伏及以上高压" + this.$dl + this.$xl }]
          }
        ]
      },
      // isEdit: true
    };
  },
  created() {},
  mounted() {},
  watch: {
    isShowDialog(val) {
      this.showDialog = val;
    }
  },
  inject: ['getList'], // 子页面调取父页面的方法
  methods: {
    // 编辑回显
    getEcho(val) {
      Echo(val).then(res => {
        //console.log(res);
        if(res.status == 200) {
          this.form = res.data.data
        }
      });
    },
    /**
     * 取消
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.showDialog = false;
          this.$emit("childFn", {
            showDialog: this.showDialog,
            editbtn: this.editbtn
          })
          done();
        })
        .catch(_ => {});
    },
    /**
     * 确认
     */
    SuerFun() {
      //console.log(this.form);
      if (this.form.reason == '' || this.form.reason == null) {
        this.$message('请选择定级原因')
        return false
      }
      Edit(this.$qs.stringify(this.form)).then(res => {
        //console.log(res)
        if (res.status == 200) {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          this.getList()
        } else {
          this.$message({
            message: '编辑失败',
            type: 'error'
          })
        }
      })
      this.$emit("childFn", {
        showDialog: false,
        editbtn: false
      })
    },
    handleCheckedJBChange(val) {
      //console.log(val);
      if(val == 1) {
        this.form.reason = '330千伏及以上高压' + this.$dl + this.$xl
        this.form.reasonId = 1
        this.form.grade = 1
      }else if (val ==2) {
        this.form.reason = '特级和一级客户直供的110（66）千伏及以上高压' + this.$dl + this.$xl
        this.form.reasonId = 2
        this.form.grade = 1
      } else if(val == 3) {
        this.form.reason = '特级和一级客户供电电源非上一级高压' + this.$dl + this.$xl
        this.form.reasonId = 3
        this.form.grade = 2
      } else if (val ==4) {
        this.form.reason = '二级客户值供的110（66）千伏及以上高压' + this.$dl + this.$xl
        this.form.reasonId = 4
        this.form.grade = 2
      } else if(val == 5) {
        this.form.reason = '剩余110（66）千伏及以上高压' + this.$dl + this.$xl
        this.form.reasonId = 5
        this.form.grade = 3
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.result {
  height: 300px;
  padding: 1rem;
  overflow-y: auto;
  .el-collapse {
    border-top: 0;
    border-bottom: 0;
  }
}
.Form-input {
  .lev {
    width: 100%;

    text-align: left;
  }
  .levLi {
    width: 100%;
  }
}
</style>
