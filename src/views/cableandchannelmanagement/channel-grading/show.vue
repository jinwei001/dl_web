<template>
<!-- <h2>通道定级</h2> -->
  <el-dialog
    :visible.sync="showDialog"
    title="编辑"
    v-dialogDrag
    :center="isedit"
    top="2vh"
    :before-close="handleClose"
  >
    <el-form ref="dataForm" :model="form" label-position="left" style="width:100% ;margin: 0 auto;">
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">通道名称：</label>
          <el-input v-model="form.sdmc" disabled />
        </div>
        <div class="form-item">
          <label class="form-label">断面尺寸(cm):</label>
          <el-input v-model="form.dmcc" disabled />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">投运日期：</label>
          <el-input v-model="form.tyrq" disabled />
        </div>
        <div class="form-item">
          <label class="form-label">通道长度：</label>
          <el-input v-model="form.tdcd" disabled />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">起始点：</label>
          <el-input v-model="form.qdwz" clearable />
        </div>
        <div class="form-item">
          <label class="form-label">终止点：</label>
          <el-input v-model="form.zdwz" clearable />
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
                    :value="items.key"
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
          <label class="form-text" v-if="form.grade == 1">一级高压{{$dl}}通道{{$dl}}</label>
          <label class="form-text" v-if="form.grade == 2">二级高压{{$dl}}通道{{$dl}}</label>
          <label class="form-text" v-if="form.grade == 3">三级高压{{$dl}}通道{{$dl}}</label>
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
} from "@/api/cableandchannel/channel-grading/channel-grading";
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
        channelId: "",
        sdmc: '',
        dmcc: '',
        tyrq: '',
        tdcd: '',
        qdwz: '',
        zdwz: '',
        bridge: '',
        tunnel: '',
        utilityTunnel: '',
        channel: '',
        other: '',
        calandria: '',
        reason: '',
        reasonId: '',
        grade: ''
      },
      showDialog: this.isShowDialog,
      selection: {
        xlmc: [{ id: "1", qb: "全部" }],
        dj: [
          {
            id: 1,
            lev: " 一级高压" + this.$dl + "通道" + this.$dl,
            describe: [
              { key: 1, item: "正常方式下，因通道原因可造成4级及以上电网事件的高压" + this.$dl + "通道" },
              {
                key: 2,
                item: "正常方式下，因通道原因可造成1座及以上220千伏及以上" + this.$bdz + "全停的高压" + this.$dl + "通道"
              },
              {
                key: 3,
                item: "造成3座及以上110千伏" + this.$bdz + "全停的高压" + this.$dl + "通道"
              },
              {
                key: 4,
                item: "一级高压" + this.$dl + this.$xl + "所在通道"
              }
            ]
          },
          {
            id: 2,
            lev: "二级高压" + this.$dl + "通道" + this.$dl,
            describe: [
              { key: 5, item: "正常方式下，因通道原因可造成5级电网事件的高压" + this.$dl + "通道" },
              { key: 6, item: "正常方式下，因通道原因可造成2座及以下110千伏" + this.$bdz + "全停的高压" + this.$dl + "通道" },
              { key: 7, item: "   二级高压" + this.$dl + this.$xl + "所在通道" },
            ]
          },
          {
            id: 3,
            lev: "三级高压" + this.$dl + "通道" + this.$dl,
            describe: [{ key: 8, item: "剩余高压" + this.$dl + "通道" }]
          }
        ]
      },
      isedit: true
    };
  },
  created() {
    
  },
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
        console.log(res);
        if(res.status == 200) {
          this.form = res.data.data
          this.form.reasonId = Number(res.data.data.reasonId)
          console.log(this.form.reasonId)
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
          });
          done();
        })
        .catch(_ => {});
    },
    /**
     * 确认
     */
    SuerFun() {
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
        this.form.reason = '正常方式下，因通道原因可造成4级及以上电网事件的高压' + this.$dl + '通道'
        this.form.reasonId = 1
        this.form.grade = 1
      }else if (val ==2) {
        this.form.reason = '正常方式下，因通道原因可造成1座及以上220千伏及以上' + this.$bdz + '全停的高压' + this.$dl + '通道'
        this.form.reasonId = 2
        this.form.grade = 1
      } else if(val == 3) {
        this.form.reason = '造成3座及以上110千伏' + this.$bdz + '全停的高压' + this.$dl + '通道'
        this.form.reasonId = 3
        this.form.grade = 1
      } else if (val ==4) {
        this.form.reason = '一级高压' + this.$dl + this.$xl +'所在通道'
        this.form.reasonId = 4
        this.form.grade = 1
      } else if(val == 5) {
        this.form.reason = '正常方式下，因通道原因可造成5级电网事件的高压' + this.$dl + '通道'
        this.form.reasonId = 5
        this.form.grade = 2
      } else if(val == 6) {
        this.form.reason = '正常方式下，因通道原因可造成2座及以下110千伏' + this.$bdz + '全停的高压' + this.$dl + '通道'
        this.form.reasonId = 6
        this.form.grade = 2
      } else if(val == 7) {
        this.form.reason = ' 二级高压' + this.$dl + this.$xl + '所在通道'
        this.form.reasonId = 7
        this.form.grade = 2
      } else if(val == 8) {
        this.form.reason = '剩余高压' + this.$dl + '通道'
        this.form.reasonId = 8
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
