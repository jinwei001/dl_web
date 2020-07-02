<template>
  <div>
    <!--{{childclickID}}-->
    <el-button class="onSearch faultButton" @click="saveFaultSearch" v-if="add.id==null||add.id==undefined">保存</el-button>
    <el-button class="onSearch faultButton" @click="saveFaultSearch_edit" v-else>编辑保存</el-button>
    <!--表单-->
    <el-form
      ref="dataForm"
      :model="add"
      label-position="left"
      style="width:100% ;margin: 0 auto;"
    >
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">故障查找时间：</label>
          <!--<el-input v-model="add.gzczsj" clearable />-->
          <el-date-picker
            style="width: 100%;"
            v-model="add.gzczsj"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </div>
        <div class="form-item" style="height: auto">
          <label class="form-label">故障简题：</label>
          <el-input v-model="add.gzjt" type="textarea" clearable />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">重合动作情况：</label>
          <el-input v-model="add.chdzqk" clearable />
        </div>
        <div class="form-item">
          <label class="form-label">故障时段天气：</label>
          <el-input v-model="add.gzsdtq" clearable />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">故障定位X坐标：</label>
          <el-input v-model="add.gzdwx" clearable />
        </div>
        <div class="form-item">
          <label class="form-label">故障定位Y坐标：</label>
          <el-input v-model="add.gzdwy" clearable />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">故障性质：</label>
          <el-input v-model="add.gzxz" clearable />
        </div>
        <div class="form-item">
          <label class="form-label">故障定位描述：</label>
          <el-input v-model="add.gzdwms" clearable />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">故障点查找结果：</label>
          <el-input v-model="add.gzdczjg" clearable />
        </div>
        <div class="form-item">
          <label class="form-label">故障情况：</label>
          <el-input v-model="add.gzqk" clearable />
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import {faultSearchAdd,faultSearchEcho,faultSearchEdit} from '@/api/faultManagement/faultDesign/faultDesign'
export default {
  name: "faultSearch",
  props: {
    childclickID: {
      default: null
    }
  },
  data() {
    return {
      formParam: {
        gzdjid: this.childclickID,
      },
      add: {
        gzdjid: '',
        gzczsj: '',
        gzjt: '',
        chdzqk: '',
        gzsdtq: '',
        gzdwx: '',
        gzdwy: '',
        gzxz: '',
        gzdwms: '',
        gzdczjg: '',
        gzqk: '',
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
    this.EchoFunction()
  },
  methods: {
    // 故障查询回显
    EchoFunction() {
      faultSearchEcho(this.formParam).then(response => {
        //console.log(response);
        if(response.status == 200 && response.data.code == 0) {
          this.add = response.data.data
        }
      })
    },
    // 保存故障查找
    saveFaultSearch() {
      this.add.gzdjid = this.childclickID
      // //console.log(this.add);
      faultSearchAdd(this.$qs.stringify(this.add)).then(response => {
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
    // 编辑故障查找
    saveFaultSearch_edit() {
      faultSearchEdit(this.$qs.stringify(this.add)).then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
        }
      })
    }
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
