<template>
  <div  class="hastitle">
    <el-dialog
      :visible.sync="showDialog"
      title="查看"
      v-dialogDrag
      :center="true"
      top="2vh"
      width="600px"
      :before-close="handleClose"
    >
      {{clickID}}
      <!--表单-->
      <el-form
        ref="dataForm"
        :model="form"
        label-position="left"
        style="width:100% ;margin: 0 auto;"
      >
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">预案名称：</label>
            <el-input v-model="form.sbmc"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">预案等级：</label>
            <el-input v-model="form.sbmc"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">预案类型：</label>
            <el-input v-model="form.sbmc"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">{{$xl}}：</label>
            <el-input v-model="form.sbmc"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">班组：</label>
            <el-input v-model="form.sbmc"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">{{$xl}}风险等级：</label>
            <el-input v-model="form.sbmc"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">事件类型：</label>
            <el-input v-model="form.sbmc"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">制作单位：</label>
            <el-input v-model="form.sbmc"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">物资点名称：</label>
            <el-input v-model="form.sbmc"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">抢修队伍：</label>
            <el-input v-model="form.sbmc"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">预案当前状态：</label>
            <el-input v-model="form.sbmc"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">制定日期：</label>
            <el-input v-model="form.sbmc"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">制定人：</label>
            <el-input v-model="form.sbmc"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">审核日期：</label>
            <el-input v-model="form.sbmc"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">审核人：</label>
            <el-input v-model="form.sbmc"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">发布状态：</label>
            <el-input v-model="form.sbmc"/>
          </div>
        </div>
        <div class="Form-input">
          <div class="form-long-item">
            <label class="form-label">预案描述：</label>
            <el-input v-model="form.sbmc"/>
          </div>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { reasonInfo } from '@/api/faultManagement/faultDesign/faultDesign'
export default {
  name: "ReasonAnalyze",
  props: {
    /**
     * 接收是否打开页面
     */
    isShowDialog: {
      type: Boolean,
      default: false
    },
    clickID: {
      default: null
    }
  },
  data() {
    return {
      reasonParam: {
        gzdjid: ''
      },
      form: {},
      showDialog: this.isShowDialog, //打开弹框
    }
  },
  watch: {
    isShowDialog(val) {
      this.showDialog = val;
    }
  },
  mounted() {
    // this.getReasonInfo()
  },
  methods: {
    getReasonInfo(id) {
      this.reasonParam.gzdjid = id
      //console.log(this.reasonParam);
      reasonInfo(this.reasonParam).then(response => {
        //console.log(response);
        if(response.status == 200) {
          this.form = response.data.data
        } else if(response.status == 500) {
          this.form = {}
        }
      })
    },
    /**
     * 取消按钮
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.showDialog = false;
          this.form = { brand_right: 0 }
          this.$emit("childFn", {
            showDialog: this.showDialog,
          });
          done();
        })
        .catch(_ => {});
    },
  }
}
</script>

<style scoped>

</style>
<style lang="scss">
  .main-body{
    height: auto;
  }
  .form-item input{
    width: 100%;
  }
  .form-long-item .form-label{
    width: 30%;
  }
</style>
