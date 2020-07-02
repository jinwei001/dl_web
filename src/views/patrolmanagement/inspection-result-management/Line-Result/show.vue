<template>
  <!-- xl巡视结果管理 -->
  <div class="xs-hastitle dis_mm">
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-dialog :visible.sync="showDialog" title="巡视记录" v-dialogDrag top='5vh' :center="true" :before-close="handleClose">
      <el-form ref="dataForm" label-position="left" style="width:100% ;margin: 0 auto;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="required-ruleForm thr">
          <el-form-item label="巡视日期：" prop="patrolPlanTime">
            <el-date-picker v-model="ruleForm.patrolPlanTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" disabled="" />
          </el-form-item>

          <el-form-item :label="`${$xl}名称:`" prop="lineId">
            <el-select v-model="ruleForm.lineId" clearable placeholder="请选择" disabled>
              <el-option v-for="item in selection.linesArr" :key="item.id" :label="item.lineName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <!-- <el-form-item :label="`${$dl}：`" prop="dlId">
            <el-select v-model="ruleForm.dlId" clearable placeholder="请选择">
              <el-option v-for="item in selection.cablesArr" :key="item.id" :label="item.cableName?item.cableName:'----'" :value="item.id"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="运维班组：" prop="opsGroupId">
            <el-select v-model="ruleForm.opsGroupId" clearable placeholder="请选择" disabled>
              <el-option v-for="item in selection.groupsArr" :key="item.id" :label="item.groupName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="巡视人：" prop="patrolUserId">
            <el-select v-model="ruleForm.patrolUserId" clearable placeholder="请选择" disabled>
              <el-option v-for="item in selection.usersArr" :key="item.id" :label="item.username" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="执行日期：" prop="zxsj">
            <el-date-picker v-model="ruleForm.zxsj" type="date" value-format="yyyy-MM-dd" placeholder="请选择日期" />
          </el-form-item>
          <div></div>
        </el-form>

        <div class="Form-input">
          <div class="xq">
            <div class="xq-wj" style="width:120px;">现场图片：</div>
            <div class="picCon">
              <div tabindex="0" class="el-upload--picture-card mypic" style="text-align:center">
                <i class="el-icon-plus"></i>
                <input type="file" name="file" class="upload__input" @change="uploadPic" accept='image/*' />
              </div>
              <div v-for="(item,i) in imgArr" :key='i' class="imgCont">
                <img :src='publicIp+"/"+item' alt="">
                <div class="doImgBtn">
                  <i class="el-icon-delete del" @click="delImg(i,item)"></i>
                  <i class="el-icon-zoom-in big" @click="showBig(item)"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-collapse v-model="activeNames">
          <el-collapse v-model="checkedJb" accordion>
            <el-collapse-item v-for=" (item,ind) in InspectionRecord" :key="ind" :title="item.projectName" :name="item.id">
              <div class="table">
                <el-table :data="item.list" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}" :header-cell-style="{'background':'#EEF1F6',borderColor: '#c7c7c7'}" border fit highlight-current-row @selection-change="CheckFun">
                  <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
                  <el-table-column prop="projectContent" label="内容" align="center"></el-table-column>
                  <el-table-column label="情况" align="center">
                    <template slot-scope="scope">
                      <el-radio v-model="scope.row.qk" :label='0'>正常</el-radio>
                      <el-radio v-model="scope.row.qk" :label='1'>不正常</el-radio>
                    </template>
                  </el-table-column>
                  <el-table-column label="备注" align="center">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.bz" clearable placeholder="请输入内容" />
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-collapse>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import '@/styles/myStyle/index.scss'
import {
  upLoadImg,
  downloadImg,
  proList,
  xsjlAdd,
  xsjlListAdd,
  xsjlInputCheck,
  xsjlListCheck,
  resultEditPro as editPro, //
  lineEditForm as editform
} from '@/api/patrolmanagement'
export default {
  props: {
    selection: {},
    isEdit: false, //是否是编辑弹框
    openID: null //打开弹框的id值
  },
  data() {
    return {
      dialogVisible: false,
      activeNames: [1], //默认打开第几个页板
      showDialog: true,
      selectArr: {},
      publicIp: '',
      imgArr: [],
      ruleForm: {
        patrolPlanTime: '',
        zxsj: '',
        lineId: '',
        opsGroupId: '',
        dlId: '',
        patrolUserId: ''
      },
      picData:[],
      rules: {
        // lineId: [{ required: true, message: '请选择'+this.$xl, trigger: 'blur' }],
        // opsGroupId: [
        //   { required: true, message: '请选择运维班组', trigger: 'change' }
        // ],
        // patrolPlanTime: [
        //   { required: true, message: '请选择计划巡视日期', trigger: 'blur' }
        // ],
        zxsj: [
          { required: true, message: '请选择执行日期', trigger: 'change' }
        ]
      },
      // dl巡查记录表
      InspectionRecord: [],
      diaLogForm: {
        goodsName: '', // 商品名称字段
        imgBroadcastList: [], // 储存选中的图片列表
        imgsStr: '' // 后端需要的多张图base64字符串 , 分割
      },
      activeNames: [1], //默认打开第几个页板
      checkedJb: [1], //选中的select
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
      // form: {
      //   dlmc: '',
      //   xlmc: '',
      //   dlmc: '',
      //   pageNum: 1,
      //   limit: 10,
      //   total: 2
      // }
    }
  },

  created() {
    this.publicIp = process.env.VUE_APP_BASE_API
    //xsjlInputCheck
    if (this.isEdit) {
      xsjlInputCheck(this.openID).then(res => {
        //console.log(res)
        let resFormData = res.data.data
        this.ruleForm = {
          patrolPlanTime: resFormData.jhxsrq ? resFormData.jhxsrq : '',
          lineId: resFormData.xlId,
          opsGroupId: resFormData.xsbzId,
          dlId: resFormData.dlId,
          patrolUserId: resFormData.xsrId,
          zxsj: resFormData.zxsj
        }
      })
      xsjlListCheck(this.openID).then(res => {
        this.InspectionRecord = res.data.data
      })
    } else {
      proList().then(res => {
        this.InspectionRecord = res.data.data
      })
    }

    downloadImg(this.openID).then(respic => {
      this.picData = respic.data.data
      this.imgArr = []
      respic.data.data.forEach(element => {
        this.imgArr.push(element.photoUrl)
      })
    })
  },
  mounted() {},
  methods: {
    uploadPic(event) {
      let reader = new FileReader()
      let img1 = event.target.files[0]
      var uri = ''
      let form = new FormData()
      form.append('file', img1) //openID
      form.append('patrolId', this.openID) //
      //接口部分
      upLoadImg(form)
        .then(res => {
          downloadImg(this.openID).then(respic => {
            this.imgArr.push(
              respic.data.data[0].photoUrl
            )
            this.picData = respic.data.data
            // respic.data.data.forEach(element => {
            //   this.imgArr.push(process.env.VUE_APP_BASE_API + element.photoUrl)
            // })
          })
        })
        .catch(function(err) {
          //console.log(err)
        })
    },
    showBig(url) {
      this.dialogVisible = true
      this.dialogImageUrl = url
    },
    
    /**
     * 取消按钮
     */
    handleClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.showDialog = false

          this.$emit('childFn', {
            showDialog: this.showDialog
          })
        })
        .catch(_ => {})
    },
    /**
     * 确认按钮
     */
    SuerFun() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          let commitArr = []

          if (!this.isEdit) {
            this.InspectionRecord.forEach(v => {
              v.list.forEach(val => {
                if (val.qk != 0) {
                  val.projectResultId = this.openID
                  commitArr.push(val)
                }
              })
            })
            //console.log(commitArr,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            Promise.all([
              xsjlListAdd({ projectArray: JSON.stringify(commitArr) }),
              xsjlAdd({ ...this.ruleForm, xsjgId: this.openID ,photoUrl: this.imgArr.join(','),picData:JSON.stringify(this.picData)})
            ]).then(res => {
              let val1 = res[0].data
              let val2 = res[1].data
              let type = val1.code == 0 && val1.code == 0 ? 'success' : 'error'
              let message =
                val1.code == 0 && val1.code == 0 ? '操作成功' : '操作失败'
              this.$message({ type, message })
              if (type == 'success')
                this.$emit('childFn', {
                  showDialog: false
                })
            })
          } else {
            this.InspectionRecord.forEach(v => {
              v.list.forEach(val => {
                val.projectResultId = this.openID
                commitArr.push(val)
              })
            })
             
            Promise.all([
              editPro({ projectArray: JSON.stringify(commitArr) }),
              editform({ ...this.ruleForm, xsjgId: this.openID,photoUrl: this.imgArr.join(','),picData:JSON.stringify(this.picData)})
            ]).then(res => {
              let val1 = res[0].data
              let val2 = res[1].data
              let type = val1.code == 0 && val1.code == 0 ? 'success' : 'error'
              let message =
                val1.code == 0 && val1.code == 0 ? '操作成功' : '操作失败'
              this.$message({ type, message })
              if (type == 'success')
                this.$emit('childFn', {
                  showDialog: false
                })
            })
          }
        } else {
          //console.log('error submit!!')
          this.$message({
            message: "必填项未填！！！",
            type: "error"
          });
          return false
        }
      }
      )
    },
    delImg(ind,item) {
      this.imgArr.splice(ind, 1)
      this.picData.splice(ind, 1);
    },
    handleCheckedJBChange(val) {
      //console.log(val)
    },
    /** 选中数据*/
    CheckFun() {}
  }
}
</script>
<style lang="scss" scoped>
.xq {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  .xq-wj {
    //width: 11%;
    line-height: 45px;
    height: 45px;
    font-size: 1rem;
    text-align: right;
    margin-right: 0.5em;
    font-weight: 700;
    width: 82px;
    flex-shrink: 0;
    font-size: 14px;
  }
  .update {
    width: 4rem;
    text-align: center;
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    transition: 0.1s;
    font-weight: 500;
    padding: 14px 14px;
    font-size: 14px;
    border-radius: 4px;
  }
  .mypic {
    position: relative;
  }
  .mypic input {
    border: 1px solid red;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    opacity: 0;
  }
}
.el-input.is-disabled .el-input__inner {
  color: #666;
}
</style>