<template>
  <!-- <h2>xl巡视计划管理</h2>-->
  <div class="xs-hastitle">
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-dialog :visible.sync="showDialog" title="电气设备局部放电检测报告" v-dialogDrag :center="true" width="70%" :before-close="handleClose">

      <el-form :model="ruleForm" ref="ruleForm" label-width="180px" class="required-ruleForm widthThird">
        <h2 class="kindTitle">基本信息</h2>
        <el-form-item label="试验单位:" prop="jcdw" style="width:100%">
          <el-input v-model="ruleForm.jcdw" disabled />
        </el-form-item>

        <el-form-item label="试验负责人:" prop="syfzr">
          <el-input v-model="ruleForm.syfzr"  :disabled='isCheckBg'/>
        </el-form-item>
        <el-form-item label="试验人员:" prop="syry">
          <el-input v-model="ruleForm.syry" disabled/>
        </el-form-item>
        <el-form-item label="报告日期：" prop="bgrq">
          <el-date-picker type="date" placeholder="请选择" v-model="ruleForm.bgrq" value-format="yyyy-MM-dd" :disabled='isCheckBg'></el-date-picker>
        </el-form-item>
        <el-form-item label="试验日期:" prop="syrq">
          <el-date-picker type="date" placeholder="请选择" v-model="ruleForm.syrq" value-format="yyyy-MM-dd" :disabled='isCheckBg'></el-date-picker>
        </el-form-item>
        <el-form-item label="试验环境温度（℃）:" prop="hw">
          <el-input v-model="ruleForm.hw" @input.native="period"  :disabled='isCheckBg'/>
        </el-form-item>
        <el-form-item label="试验环境湿度（%）:" prop="sd">
          <el-input v-model="ruleForm.sd" @input.native="period" :disabled='isCheckBg' />
        </el-form-item>

        <h2 class="kindTitle">设备信息</h2>

        <el-form-item :label="`${$xl}名称：`" prop="xlmc" class="">
          <el-input v-model="ruleForm.xlmc" disabled="" />
        </el-form-item>
        <el-form-item :label="`${$dydj}：`" prop="dydj">
          <el-input v-model="ruleForm.dydj" disabled="" />
        </el-form-item>
        <el-form-item label="测试仪器：" prop="csyq">
          <el-input v-model="ruleForm.csyq"  :disabled='isCheckBg'/>
        </el-form-item>
        <el-form-item :label="`设备（${$gt}号）名称：`" prop="sbmc" style="width:100%">
          <el-input v-model="ruleForm.sbmc" disabled />
        </el-form-item>
        <el-form-item label="检测位置" prop="jcwz">
          <el-input v-model="ruleForm.jcwz"  :disabled='isCheckBg'/>
        </el-form-item>
        <el-form-item label="检测地点：" prop="jcdd">
          <el-input v-model="ruleForm.jcdd"  :disabled='isCheckBg'/>
        </el-form-item>
        <el-form-item :label="`${$dl}厂家：`" prop="dlcj">
          <el-input v-model="ruleForm.dlcj"  :disabled='isCheckBg'/>
        </el-form-item>
        <el-form-item :label="`${$dl}型号：`" prop="dlxh">
          <el-input v-model="ruleForm.dlxh"  :disabled='isCheckBg'/>
        </el-form-item>
        <el-form-item label="附件厂家：" prop="fjcj">
          <el-input v-model="ruleForm.fjcj"  :disabled='isCheckBg'/>
        </el-form-item>
        <el-form-item label="附件类型：" prop="fjlx">
          <el-input v-model="ruleForm.fjlx"  :disabled='isCheckBg'/>
        </el-form-item>
        <el-form-item label="出厂日期：" prop="ccrq">
          <el-date-picker type="date" placeholder="请选择" v-model="ruleForm.ccrq" value-format="yyyy-MM-dd" :disabled='isCheckBg'></el-date-picker>
        </el-form-item>
        <el-form-item label="投运日期：" prop="tyrq">
          <el-date-picker type="date" placeholder="请选择" v-model="ruleForm.tyrq" value-format="yyyy-MM-dd" disabled></el-date-picker>
        </el-form-item>
        <h2 class="kindTitle">检测信息</h2>
        <el-form-item label="异常信号位置:" prop="ycxhwz" style="width:100%">
          <el-input v-model="ruleForm.ycxhwz" :disabled='isCheckBg' />
        </el-form-item>
        <el-form-item label="背景信号:" prop="bjxh" style="width:100%">
          <el-input v-model="ruleForm.bjxh"  :disabled='isCheckBg'/>
        </el-form-item>
        <div style="width:100%">
          <el-table :data="ruleForm.jcxx" style="border: 1px solid #c7c7c7;width:100%" :cell-style="{borderColor: '#c7c7c7'}" :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}" border fit highlight-current-row>
            <el-table-column label="检测时间" align="center">
              <template slot-scope="scope">
                <el-time-select v-model="scope.row.jcsj" :picker-options="{
                   start: '00:00',
    end: '23:59',
    step: '00:01',
  }" placeholder="选择时间" :disabled='isCheckBg'>
                </el-time-select>
              </template>
            </el-table-column>
            <el-table-column label="高频局放信号（pC）" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.gpjfxh" :disabled='isCheckBg'/>
              </template>
            </el-table-column>

            <el-table-column v-if='!isCheckBg' label="" align="center" width="70">
              <template slot-scope="scope">
                <i class="el-icon-circle-close" @click="delcol(scope.$index)"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if='!isCheckBg' class="addmsg" style="width:100%">
          <i class="el-icon-circle-plus" @click="addmsgBtn"></i>
        </div>
      </el-form>

      <el-form class="multiplePic">
        <h2 class="kindTitle">图像分析</h2>
        <p class="">传感器安装位置可见光图片</p>
        <div>
          <el-form-item class="showpic" v-for="(img,ind) in ruleForm.pictureList" :key="ind">
            <img :src='img.picture' alt="">
            <i  v-if='!isCheckBg' class="el-icon-delete del" @click="delImg(ind,'pictureList')"></i>
            <i class="el-icon-zoom-in big" @click="showBig(img.picture)"></i>
          </el-form-item>
          <el-form-item class="addPic" v-if='!isCheckBg'>
            <div tabindex="0" class="imgcard">
              <i class="el-icon-plus avatar-uploader-icon"></i>
              <input type="file" @change="upLoadvisibleLight($event,'pictureList')" name="picture" accept="image/*" class="el-upload__input">
            </div>
          </el-form-item>
        </div>
        <p class="">图谱分析—A相</p>
        <div>
          <el-form-item class="showpic" v-for="(img,ind) in ruleForm.apictureList" :key="ind">
            <img :src='img.picture' alt="">
            <i v-if='!isCheckBg' class="el-icon-delete del" @click="delImg(ind,'apictureList')"></i>
            <i class="el-icon-zoom-in big" @click="showBig(img.picture)"></i>
          </el-form-item>
          <el-form-item v-if='!isCheckBg' class="addPic">
            <div tabindex="0" class="imgcard">
              <i class="el-icon-plus avatar-uploader-icon"></i>
              <input type="file" @change="upLoadvisibleLight($event,'apictureList')" name="picture" accept="image/*" class="el-upload__input">
            </div>
          </el-form-item>
        </div>
        <p class="">图谱分析—B相</p>
        <div>
          <el-form-item class="showpic" v-for="(img,ind) in ruleForm.bpictureList" :key="ind">
            <img :src='img.picture' alt="">
            <i v-if='!isCheckBg' class="el-icon-delete del" @click="delImg(ind,'bpictureList')"></i>
            <i class="el-icon-zoom-in big" @click="showBig(img.picture)"></i>
          </el-form-item>
          <el-form-item v-if='!isCheckBg' class="addPic">
            <div tabindex="0" class="imgcard">
              <i class="el-icon-plus avatar-uploader-icon"></i>
              <input type="file" @change="upLoadvisibleLight($event,'bpictureList')" name="picture" accept="image/*" class="el-upload__input">
            </div>
          </el-form-item>
        </div>
        <p class="">图谱分析—C相</p>
        <div>
          <el-form-item class="showpic" v-for="(img,ind) in ruleForm.cpictureList" :key="ind">
            <img :src='img.picture' alt="">
            <i v-if='!isCheckBg' class="el-icon-delete del" @click="delImg(ind,'cpictureList')"></i>
            <i class="el-icon-zoom-in big" @click="showBig(img.picture)"></i>
          </el-form-item>
          <el-form-item v-if='!isCheckBg' class="addPic">
            <div tabindex="0" class="imgcard">
              <i class="el-icon-plus avatar-uploader-icon"></i>
              <input type="file" @change="upLoadvisibleLight($event,'cpictureList')" name="picture" accept="image/*" class="el-upload__input">
            </div>
          </el-form-item>
        </div>
        <p class="">相分离分类谱图</p>
        <div>
          <el-form-item class="showpic" v-for="(img,ind) in ruleForm.dpictureList" :key="ind">
            <img :src='img.picture' alt="">
            <i v-if='!isCheckBg' class="el-icon-delete del" @click="delImg(ind,'dpictureList')"></i>
            <i class="el-icon-zoom-in big" @click="showBig(img.picture)"></i>
          </el-form-item>
          <el-form-item v-if='!isCheckBg' class="addPic">
            <div tabindex="0" class="imgcard">
              <i class="el-icon-plus avatar-uploader-icon"></i>
              <input type="file" @change="upLoadvisibleLight($event,'dpictureList')" name="picture" accept="image/*" class="el-upload__input">
            </div>
          </el-form-item>
        </div>
        <p class="">设备可见光图片</p>
        <div>
          <el-form-item class="showpic" v-for="(img,ind) in ruleForm.epictureList" :key="ind">
            <img :src='img.picture' alt="">
            <i v-if='!isCheckBg' class="el-icon-delete del" @click="delImg(ind,'epictureList')"></i>
            <i class="el-icon-zoom-in big" @click="showBig(img.picture)"></i>
          </el-form-item>
          <el-form-item v-if='!isCheckBg' class="addPic">
            <div tabindex="0" class="imgcard">
              <i class="el-icon-plus avatar-uploader-icon"></i>
              <input type="file" @change="upLoadvisibleLight($event,'epictureList')" name="picture" accept="image/*" class="el-upload__input">
            </div>
          </el-form-item>
        </div>
      </el-form>
      <el-form :model="ruleForm" ref="ruleForm" label-width="140px" class="required-ruleForm widthThird">
        <h2 class="kindTitle">诊断分析和缺陷性质</h2>
        <el-form-item label="检测结果分析:" prop="jcjgfx" style="width:100%">
          <el-input v-model="ruleForm.jcjgfx" :disabled='isCheckBg' />
        </el-form-item>
        <h2 class="kindTitle">处理意见</h2>
        <el-input v-model="ruleForm.clyj" style="width:100%" :disabled='isCheckBg' />
        <h2 class="kindTitle">审批意见</h2>
        <el-form-item label="检测人员:" prop="jcr">
          <el-input v-model="ruleForm.jcr" :disabled='isCheckBg' />
        </el-form-item>
        <el-form-item label="审核:" prop="shh">
          <el-input v-model="ruleForm.shh"  :disabled='isCheckBg'/>
        </el-form-item>
        <div></div>
      </el-form>

      <div v-if='!isCheckBg' slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import '@/styles/myStyle/index.scss'
import {
  linesSelect,
  uploadPicture,
  inputResult
} from '@/api/liveDetectionManage'

export default {
  props: {
    thisDetail: {},
    isCheckBg: false
  },
  data() {
    return {
      imageUrl: '',
      dialogVisible: false,
      dialogImageUrl: false,

      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate(),
      isShowDialog: false,
      jcrSelectArr: [], // 检测人
      ruleForm: {
        jcxx: [
          // {
          //   jcsj: '检测时间',
          //   gpjfxh: '高频局放信号'
          // },
        ],
        jcdw: '',
        bgrq: '',
        syfzr: '',
        syry: '',
        syrq: '',
        hw: '',
        sd: '',
        xlmc: '',
        dydj: '',
        csyq: '',
        sbmc: '',
        jcwz: '',
        jcdd: '',
        dlcj: '',
        dlxh: '',
        fjcj: '',
        fjlx: '',
        ccrq: '',
        tyrq: '',
        ycxhwz: '',
        bjxh: '',
        pictureList: [],
        apictureList: [],
        bpictureList: [],
        cpictureList: [],
        dpictureList: [],
        epictureList: [],
        jcjgfx: '',
        jy: '',
        clyj: '',
        jcry: '',
        shh: ''
      },

      showDialog: true //打开弹框
    }
  },
  created() {
    if (this.isCheckBg) {
      this.ruleForm = JSON.parse(this.thisDetail.jcjl)
    } else {
      this.ruleForm.jcdw = this.thisDetail.jcdw
      this.ruleForm.syry = this.thisDetail.jcr
      this.ruleForm.xlmc = this.thisDetail.xlmc
      this.ruleForm.sbmc = this.thisDetail.sbmc
      this.ruleForm.dydj = this.thisDetail.dydj
      linesSelect({ id: this.thisDetail.xlid }).then(res => {
        this.ruleForm.tyrq = res.data.rows[0].transportTime
      })
    }
  },
  methods: {
    upLoadImages(file, callback) {
      let form = new FormData()
      form.append('file', file) //openID
      form.append('type', 'mario') //
      //接口部分
      uploadPicture(form)
        .then(res => {
          let val = res.data
          let type = val.code == 0 ? 'success' : 'error'
          if (val.code != 0) this.$message({ type, message: val.msg })

          callback(val)
        })
        .catch(function(err) {
          //console.log(err)
        })
    },

    /** 上传及展示 */
    upLoadvisibleLight(event, cont) {
      let file = event.target.files[0]
      this.upLoadImages(file, val => {
        if (val.code == 0) this.ruleForm[cont].push({ picture: process.env.VUE_APP_BASE_API+ val.msg })
      })
    },
    showBig(url) {
      this.dialogVisible = true
      this.dialogImageUrl = url
    },
    delImg(ind, picList) {
      this.ruleForm[picList].splice(ind, 1)
    },

    /**
     * 确认按钮
     */
    SuerFun() {
      inputResult({ planId: this.thisDetail.id, jcjl: this.ruleForm }).then(
        res => {
          let val = res.data
          let type = val.code == 0 ? 'success' : 'error'
          this.$message({ type, message: val.msg })
          if (val.code == 0)
            this.$emit('childFn', {
              showDialog: false
            })
        }
      )
    },
    /**
     * 取消按钮
     */
    handleClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('childFn', {
            showDialog: this.showDialog
          })
          done()
        })
        .catch(_ => {})
    },
    /** 添加table行 */
    addmsgBtn() {
      this.ruleForm.jcxx.push({
        jcsj: '',
        gpjfxh: ''
      })
    },
    /** 删除行 */
    delcol(ind) {
      this.ruleForm.jcxx.splice(ind, 1)
    },
    period(e) {
      // 清除"数字"和"."以外的字符
      e.target.value = e.target.value.replace(/[^\d.]/g, '')
      // 验证第一个字符是数字
      e.target.value = e.target.value.replace(/^\./g, '')
      // 只保留第一个, 清除多余的
      e.target.value = e.target.value.replace(/\.{2,}/g, '.')
      e.target.value = e.target.value
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
      // 只能输入两个小数
      e.target.value = e.target.value.replace(
        /^(\-)*(\d+)\.(\d\d).*$/,
        '$1$2.$3'
      )
    },

    parentFn(val) {
      this.isShowDialog = false
    },

    beginDate() {
      const self = this
      return {
        disabledDate(time) {
          if (self.ruleForm.jhjssj) {
            //如果结束时间不为空，则小于结束时间
            return new Date(self.ruleForm.jhjssj).getTime() < time.getTime()
          } else {
            // return time.getTime() > Date.now()//请选择不选时，结束时间最大值小于等于当天
          }
        }
      }
    },
    processDate() {
      const self = this
      return {
        disabledDate(time) {
          if (self.ruleForm.jhkssj) {
            //如果请选择不为空，则结束时间大于请选择
            return new Date(self.ruleForm.jhkssj).getTime() > time.getTime()
          } else {
            // return time.getTime() > Date.now()//请选择不选时，结束时间最大值小于等于当天
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
.el-dialog--center .el-dialog__body {
  z-index: 10000;
}
.el-dialog__wrapper {
  z-index: 3000;
}
.addmsg {
  text-align: center;
  width: 100%;
}
.el-icon-circle-plus,
.el-icon-circle-close {
  font-size: 32px;
  cursor: pointer;
}
.el-icon-circle-close {
  color: #f99;
}
.el-icon-circle-close:hover {
  color: #f55;
}
.el-input.is-disabled .el-input__inner {
  background-color: #fff;
  border-color: #fff;
  color: #777;
  cursor: not-allowed;
}
</style>
