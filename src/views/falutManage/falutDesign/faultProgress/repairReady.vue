<template>
  <div>
    <!--{{childclickID}}-->
    <el-button class="onSearch faultButton" @click="saveRepairReady" v-if="add.id==null||add.id==undefined">保存</el-button>
    <el-button class="onSearch faultButton" @click="saveRepairReady_edit" v-else>编辑保存</el-button>
    <!--表单-->
    <el-form
      ref="dataForm"
      :model="add"
      label-position="left"
      style="width:100% ;margin: 0 auto;"
    >
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">故障类别：</label>
          <el-input v-model="add.gzlb" clearable />
        </div>
        <div class="form-item">
          <label class="form-label">故障类型：</label>
          <!--<el-input v-model="add.gzlx" clearable />-->
          <el-select v-model="add.gzlx" clearable placeholder="请选择">
            <el-option
              v-for="item in selection.gzlx"
              :key="item.bzid"
              :label="item.bzmc"
              :value="item.bzmc"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">故障级别：</label>
          <el-input v-model="add.gzjb" clearable />
        </div>
        <div class="form-item">
          <label class="form-label">成本损失级别：</label>
          <el-input v-model="add.cbssjb" clearable />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">环境损失级别：</label>
          <el-input v-model="add.hjssjb" clearable />
        </div>
        <div class="form-item">
          <label class="form-label">人身损失级别：</label>
          <el-input v-model="add.rsssjb" clearable />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">电网损失级别：</label>
          <el-input v-model="add.dwssjb" clearable />
        </div>
        <div class="form-item">
          <label class="form-label">应对措施：</label>
          <el-input v-model="add.ydcs" clearable />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">故障损失负荷：</label>
          <el-input v-model="add.gzssfh" clearable />
        </div>
        <div class="form-item">
          <label class="form-label" style="width: 31%;">故障是否越级：</label>
          <!--<el-input v-model="add.isyj" clearable />-->
          <el-radio-group v-model="add.isyj" style="padding: 12px">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label" style="line-height: 20px">故障停运范围名称：</label>
          <el-input v-model="add.gztyfw" clearable />
        </div>
        <div class="form-item">
          <label class="form-label">故障损失情况：</label>
          <el-input v-model="add.gzssqk" clearable />
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import {getSelectList,repairReadyAdd,repairReadyEcho,repairReadyEdit} from '@/api/faultManagement/faultDesign/faultDesign'
export default {
  name: "repairReady",
  props: {
    childclickID: {
      default: null
    }
  },
  data() {
    return {
      formParam: {
        gzdjid: this.childclickID, // 故障登记id
      },
      add: {
        gzdjid: this.childclickID,
        gzlb: '',
        gzlx: '',
        gzjb: '',
        cbssjb: '',
        hjssjb: '',
        rsssjb: '',
        dwssjb: '',
        ydcs: '',
        gzssfh: '',
        isyj: '',
        gztyfw: '',
        gzssqk: '',
      },
      selection: {
        gzlx: []
      },
    }
  },
  watch: {
    childclickID(val) {
      // //console.log(val);
      this.formParam.gzdjid = val
      this.EchoFunction()
    }
  },
  created() {
    getSelectList('故障类型').then(response => {
      // //console.log(response);
      this.selection.gzlx = response.data.rows
    })
  },
  mounted() {
    this.EchoFunction()
  },
  methods: {
    // 抢修准备回显
    EchoFunction() {
      repairReadyEcho(this.formParam).then(response => {
        console.log(response);
        if(response.status == 200 && response.data.code == 0) {
          this.add = response.data.data
        }
      })
    },
    // 保存抢修准备
    saveRepairReady() {
      this.add.gzdjid = this.childclickID
      // if (this.add.gzlx) { // 故障类型
      //   let searcharr = this.selection.gzlx.filter(res=>{
      //     return this.add.gzlx == res.bzid
      //   })
      //   this.add.gzlx = searcharr[0]['bzmc']
      // }
      repairReadyAdd(this.$qs.stringify(this.add)).then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.$message({
            message: '新增成功',
            type: 'success',
            onClose: ()=>{
              this.EchoFunction()
            }
          })
        }
      })
    },
    // 编辑抢修准备
    saveRepairReady_edit() {
      // if (this.add.gzlx) { // 故障类型
      //   let searcharr = this.selection.gzlx.filter(res=>{
      //     return this.add.gzlx == res.bzid
      //   })
      //   this.add.gzlx = searcharr[0]['bzmc']
      // }
      repairReadyEdit(this.$qs.stringify(this.add)).then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
        }
      })
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
  .faultButton{
    float: right;
    margin-bottom: 15px;
    width: 140px;
  }
  .form-item input{
    width: 100%;
  }
</style>
