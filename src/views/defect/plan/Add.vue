<template>
  <!-- <h2>xl巡视计划管理</h2> -->
  <div class="xs-hastitle whitedisable_mm">
    <el-dialog :visible.sync="showDialog" title="开启流程" v-dialogDrag :center="true" width="50%" :before-close="handleClose">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="required-ruleForm">
        <el-form-item label="开始时间：" prop="planStartTime">
          <el-date-picker type="date" placeholder="开始时间" v-model="ruleForm.planStartTime" :picker-options="startDatePicker" value-format="yyyy-MM-dd" :disabled="isCheck"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：" prop="planEndTime">
          <el-date-picker type="date" placeholder="结束时间" v-model="ruleForm.planEndTime" :picker-options="endDatePicker" value-format="yyyy-MM-dd" :disabled="isCheck"></el-date-picker>
        </el-form-item>
        <el-form-item label="消缺班组" prop="planXqGroupId">
          <el-select v-model="ruleForm.planXqGroupId" class="form-item-select" @change="bzChange1" :disabled="isCheck">
            <el-option v-for="item in selection.bzSelectArr" :key="item.group_id" :label="item.group_name" :value="item.group_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消缺人" prop="planXqUserId">
          <el-select v-model="ruleForm.planXqUserId" class="form-item-select" :disabled="isCheck">
            <el-option v-for="item in selection.fxrSelectArr1" :key="item.user_id" :label="item.user_name" :value="item.user_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="验收班组" prop="planAcceptGroupId">
          <el-select v-model="ruleForm.planAcceptGroupId" class="form-item-select" @change="bzChange2" :disabled="isCheck">
            <el-option v-for="item in selection.bzSelectArr" :key="item.group_id" :label="item.group_name" :value="item.group_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="验收人" prop="planAcceptorId">
          <el-select v-model="ruleForm.planAcceptorId" class="form-item-select" :disabled="isCheck">
            <el-option v-for="item in selection.fxrSelectArr2" :key="item.user_id" :label="item.user_name" :value="item.user_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注说明" prop="planRemark" style="width:100%">
          <el-input v-model="ruleForm.planRemark" type="textarea" :rows="3" :disabled="isCheck"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun" v-if="!isCheck">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBz, // 发现班组
  getFxr, // 发现人
  planAdd, //新增
  planMsgDetail // 编辑回显
} from '@/api/defect'
export default {
  props: {
    thisDetail: {},
    isEdit: false,
    isCheck:false,
  },
  data() {
    return {
      showDialog: true,
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate(),
      ruleForm: {
        planXqGroup: '', // 消缺班组
        planXqGroupId: '',
        planXqUser: '', // 消缺人
        planXqUserId: '',
        planAcceptGroup: '', // 验收班组
        planAcceptGroupId: '',
        planAcceptor: '', // 验收人
        planAcceptorId: '',
        objId: '', //  缺陷ID
        planStartTime: '', // 开始时间
        planEndTime: '', // 结束时间
        planRemark: ''
      },
      rules: {
        planStartTime: [
          { required: true, message: '开始时间不能为空', trigger: 'change' }
        ],
        planEndTime: [
          { required: true, message: '结束时间不能为空', trigger: 'change' }
        ],
        planXqGroupId: [
          { required: true, message: '消缺班组不能为空', trigger: 'change' }
        ],
        planXqUserId: [
          { required: true, message: '消缺人不能为空', trigger: 'blur' }
        ],
        planAcceptGroupId: [
          { required: true, message: '验收班组不能为空', trigger: 'blur' }
        ],
        planAcceptorId: [
          { required: true, message: '验收人不能为空', trigger: 'blur' }
        ],
        // planRemark: [
        //   { required: true, message: '备注说明不能为空', trigger: 'blur' }
        // ]
      },
      selection: {
        bzSelectArr: [], // 发现班组
        fxrSelectArr1: [], // 消缺人
        fxrSelectArr2: [] // 验收人
      }
    }
  },
  created() {
    this.ruleForm.objId = this.thisDetail.objId
    if (this.isEdit) {
      planMsgDetail(this.thisDetail.objId).then(response => {
        if (response.data.code == 0) {
          let data = response.data.data

          getFxr(data.planXqGroupId)
            .then(res => {
              if (res.data.code == 0) {
                this.selection.fxrSelectArr1 = res.data.data
              }
              return getFxr(data.planAcceptGroupId)
            })
            .then(res => {
              if (res.data.code == 0) {
                this.selection.fxrSelectArr2 = res.data.data
                this.ruleForm.planXqGroupId = data.planXqGroupId
                this.ruleForm.planXqUserId = data.planXqUserId
                this.ruleForm.planAcceptGroupId = data.planAcceptGroupId
                this.ruleForm.planAcceptorId = data.planAcceptorId
                this.ruleForm.planStartTime = data.planStartTime
                this.ruleForm.planEndTime = data.planEndTime
                this.ruleForm.planRemark = data.planRemark
              }
            })
        }
      })
    }

    getBz().then(res => {
      // 发现方式getBz
      this.selection.bzSelectArr = res.data.data
    })
  },
  methods: {
    bzChange1(e) {
      this.ruleForm.handlerId1 = ''
      getFxr(e).then(res => {
        if (res.data.code == 0) {
          this.selection.fxrSelectArr1 = res.data.data
        }
      })
    },
    bzChange2(e) {
      this.ruleForm.handlerId2 = ''
      getFxr(e).then(res => {
        if (res.data.code == 0) {
          this.selection.fxrSelectArr2 = res.data.data
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
     * 确认按钮 qx_status
     */

    // handlerId1:'',
    //   groupId1:'',
    //   handlerId2:'',
    //   groupId2:'',
    //   planXqGroup: '', // 消缺班组
    //   planXqUser: '', // 消缺人
    //   planAcceptGroup:'', // 验收班组
    //   planAcceptor:'', // 验收人
    SuerFun() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.setSelectId([
            {
              selectArr: this.selection.bzSelectArr,
              ruleFormName: 'planXqGroup',
              ruleFormId: 'planXqGroupId',
              filterName: 'group_name',
              filterId: 'group_id'
            },
            {
              selectArr: this.selection.bzSelectArr,
              ruleFormName: 'planAcceptGroup',
              ruleFormId: 'planAcceptGroupId',
              filterName: 'group_name',
              filterId: 'group_id'
            },
            {
              selectArr: this.selection.fxrSelectArr1,
              ruleFormName: 'planXqUser',
              ruleFormId: 'planXqUserId',
              filterName: 'user_name',
              filterId: 'user_id'
            },
            {
              selectArr: this.selection.fxrSelectArr2,
              ruleFormName: 'planAcceptor',
              ruleFormId: 'planAcceptorId',
              filterName: 'user_name',
              filterId: 'user_id'
            }
          ])

          planAdd({
            ...this.ruleForm,
            objId: this.thisDetail.objId,
            // qxStatus: 2
          }).then(res => {
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

    beginDate() {
      const self = this
      return {
        disabledDate(time) {
          if (self.ruleForm.planEndTime) {
            //如果结束时间不为空，则小于结束时间
            return (
              new Date(self.ruleForm.planEndTime).getTime() < time.getTime()
            )
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      }
    },
    processDate() {
      const self = this
      return {
        disabledDate(time) {
          if (self.ruleForm.planStartTime) {
            //如果开始时间不为空，则结束时间大于开始时间
            return (
              new Date(self.ruleForm.planStartTime).getTime() > time.getTime()+24*60*60*1000
            )
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      }
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
