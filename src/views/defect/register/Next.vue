<template>
  <!-- <h2>xl巡视计划管理</h2> -->
  <div class="xs-hastitle whitedisable_mm">
    <el-dialog :visible.sync="showDialog" title="开启流程" v-dialogDrag :center="true" width="50%" :before-close="handleClose">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="required-ruleForm">
        <el-form-item label="指定班组" prop="groupId">
          <el-select v-model="ruleForm.groupId" class="form-item-select" @change="bzChange">
            <el-option v-for="item in selection.bzSelectArr" :key="item.group_id" :label="item.group_name" :value="item.group_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下一审批人" prop="handlerId">
          <el-select v-model="ruleForm.handlerId" class="form-item-select">
            <el-option v-for="item in selection.fxrSelectArr" :key="item.user_id" :label="item.user_name" :value="item.user_id"></el-option>
          </el-select>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBz, // 发现班组
  getFxr, // 发现人
  kqlc,
} from '@/api/defect'
export default {
  props: {
    thisDetail: {}
  },
  data() {
    return {
      showDialog: true,
      ruleForm: {
        groupId: '', // 发现班组
        handlerId: '', // 发现人
        objId: '', //  缺陷ID
        approvalResult:1,
      },
      rules: {
        groupId: [
          { required: true, message: '指定班组不能为空', trigger: 'change' }
        ],

        handlerId: [
          { required: true, message: '下一审批人不能为空', trigger: 'blur' }
        ]
      },
      selection: {
        bzSelectArr: [], // 发现班组
        fxrSelectArr: [] // 发现人
      }
    }
  },
  created() {
    this.ruleForm.objId = this.thisDetail.objId
    getBz().then(res => {
      // 发现方式getBz
      this.selection.bzSelectArr = res.data.data
    })
  },
  methods: {
 

    bzChange(e) {
      this.ruleForm.handlerId = ''
      getFxr(e).then(res => {
        if (res.data.code == 0) {
          this.selection.fxrSelectArr = res.data.data
        }
      })
    },

    /**
     * 取消按钮
     */
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('childFn', {
            showDialog: this.showDialog
          })
          done()
        })
        .catch(_ => {})
    },
    /**
     * 确认按钮
     */
    SuerFun() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {

               this.setSelectId([
            {
              selectArr: this.selection.bzSelectArr,
              ruleFormName: 'groupName',
              ruleFormId: 'groupId',
              filterName: 'group_name',
              filterId: 'group_id'
            },
            {
              selectArr: this.selection.fxrSelectArr,
              ruleFormName: 'handlerName',
              ruleFormId: 'handlerId',
              filterName: 'user_name',
              filterId: 'user_id'
            }
          ])



          kqlc(this.ruleForm).then(res => {
            let val = res.data
            let type = val.code == 0 ? 'success' : 'error'
            this.$message({ type, message: val.msg })
            if (val.code == 0)
              this.$emit('childFn', {
                showDialog: false
              })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
        setSelectId(setArr) {
      /* [{
         selectArr:[],
         ruleFormName:'', 
         ruleFormId:'',
         filterName:'',
         filterId:'', 
       }]*/

      setArr.forEach(element => {
        let arr = element.selectArr.filter(res => {
          return res[element.filterId] == this.ruleForm[element.ruleFormId]
        })
        this.ruleForm[element.ruleFormName] = arr[0][element.filterName]
          ? arr[0][element.filterName]
          : ''
      })
    },
    /**
     * 选择通道按钮--取消按钮
     */
    selecthandleClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.selectshowDialog = false
        })
        .catch(_ => {})
    }
  }
}
</script>
<style lang="scss" scope>
.el-select {
  width: 100%;
}
.el-date-editor.el-input {
  width: 100%;
}
</style>
