<template>
  <!-- <h2>值守计划新增</h2> -->
  <div v-if="dakaiID" class="single-row-title">
    <el-dialog
      v-dialogDrag
      :visible.sync="dialogParameter.showDialog"
      :title="dialogParameter.title"
      :center="true"
      :before-close="handleClose"
      :width="dialogParameter.dialogWidth"
    >
      <el-form
        id="zhishouBOX"
        ref="form"
        :model="form"
        style="width:100% ;margin: 0 auto;"
        label-position="right"
        :inline="false"
        label-width="120px"
      >

        <el-col :span="24">
          <el-row>
            <el-col :span="12">
              <el-form-item label="保电名称">
                {{ info.bdmc }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$xl+'名称'">
                {{ info.xlmc }}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="保电等级">
                {{ info.bddj }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="保电值守时间">
                {{ info.zsrq }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="指定值守人">
                {{ info.zsrmc }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="值守状态">
                <span v-if="info.zszt==='0'">未到位</span>
                <span v-else>已到位到位</span>
              </el-form-item>
            </el-col>
          </el-row>
          <div>
            <el-col v-for="(list,index) in dakaList" :key="index" :span="24" class="Punch-card-box">
              <el-row>
                <el-col :span="12">
                  <el-form-item :label="'打卡时间'+list.id+':'">
                    <label> {{ list.dksj }}</label>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item :label="'值守描述'+list.id+':'">
                    <label>{{ list.zsms }}</label>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item :label="'打卡坐标'+list.id+':'">
                    <label> {{ list.jd }},{{ list.wd }}</label>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="值守人">
                    <label>{{ list.zsrmc }}</label>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item :label="'图片'+list.id+':'">
                    <img
                      v-for="(item,index) in list.imgArry"
                      :key="index"
                      :src="item"
                      style="margin: 10px 20px;width: 100px;height: 100px;"
                      @click="handlePreview(item)"
                    >
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </div>
        </el-col>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="onSearch" @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog v-dialogDrag :visible.sync="imgshow" title="图片预览" :center="true">
      <img :src="imageUrl" style="width: 100%;margin: 20px 0;">
    </el-dialog>
  </div>
</template>

<script>
import {
  keepElectricityClock_list
} from '@/api/protected-electricity/Performtasks'
import qs from 'qs'
export default {
  props: {
    /**
       * 接收是否打开页面
       */
    isShowDialog: {
      type: Boolean,
      default: false
    },
    /**
       * 接收是否打开页面
       */
    isstartsName: {
      type: String,
      default: ''
    },
    dakaiID: {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  data() {
    return {
      info: {},
      dakaList: [],
      Module: false,
      ViewStatus: false,
      PlaneditStatus: false,
      // 弹窗参数配置
      dialogParameter: {
        dialogWidth: '60%',
        title: '任务详情',
        showDialog: this.isShowDialog // 打开弹框
      },
      geteditdata: {},
      HdhUploadsrc: process.env.VUE_APP_BASE_API,
      imgshow: false, // 图片弹窗关闭
      imageUrl: '', // 图片预览地址

      form: {
        Hiddendangernumber: '', // 隐患编号
        LineName: '', // XLID
        VoltageLevel: '', // 电压
        cable: '', // DL
        Hiddenaddress: '', // 隐患地址
        EquipmentType: '', // 隐患类型
        BaodianTime: '', // 保电时间
        CurrentOndutyPeople: '', // 当值守人数
        Ondutyteam: '', // 值守班组
        CurrentWatchman: '', // 当前值守人
        Hiddenstate: '', // ;隐患状态
        Ondutystate: '', // 值守状态
        // ————————————————————————————————————

        zhiShouRen: '', // 值守人单设备主人
        pictures1: [], // 图片
        pictures2: [], // 图片
        pictures3: [], // 图片
        PunchTime1: '', // 打卡时间
        Watchdescription1: '', // 值守备注
        Punchcoordinates1: '', // 打卡坐标
        PunchTime2: '',
        Watchdescription2: '',
        Punchcoordinates2: '',
        PunchTime3: '',
        Watchdescription3: '',
        Punchcoordinates3: ''
      },
      zhishourenList: [],
      selection: {

      },
      editbtn: this.isEdit, // 是否是编辑按钮
      addbtn: this.isAdd, // 是否是新增按钮
      formRules: []
    }
  },
  watch: {

  },
  created: function() {

  },
  mounted() {
    this.getRWdata()
  },
  methods: {
    handleClose(done) {
      this.imgshow = false
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('childFn', {
            showDialog: false
          })
          done()
        })
        .catch(_ => {})
    },
    handlePreview(src) {
      this.imageUrl = src
      this.imgshow = true
    },
    // 任务详情
    getRWdata() {
      const data = {
        bdzsrwdljid: this.dakaiID
      }
      keepElectricityClock_list(qs.stringify(data)).then(response => {
        if (response.status === 200) {
          if (response.data.code === 0) {
            this.info = response.data.data.info
            this.dakaList = []
            if (response.data.data.list.rows.length > 0) {
              const list = response.data.data.list.rows
              //console.log(response.data.data.list.rows)
              for (let i = 0; i < list.length; i++) {
                const obj = {
                  id: i + 1,
                  zp: [],
                  jd: list[i].jd,
                  wd: list[i].wd,
                  zsms: list[i].zsms,
                  dksj: list[i].dksj,
                  zsrmc: list[i].zsrmc,
                  imgArry: []
                }
                const zhaopianList = JSON.parse(list[i].zp)
                //console.log(zhaopianList.length,'json转数组图片')
                if (zhaopianList.length > 0) {
                  for (let X = 0; X < zhaopianList.length; X++) {
                    // obj.zp[X] = obj.zp[X].substr(3)
                    // obj.zp[X] = obj.zp[X].substr(0, obj.zp[X].length - 2)
                    obj.imgArry.push(this.HdhUploadsrc + zhaopianList[X].image)
                  }
                }

                this.dakaList.push(obj)
              }
              //console.log(this.dakaList)
            }
          } else {
            this.$message({
              message: '打卡详情获取失败',
              type: 'error'
            })
          }
        }
      })
    }
  }
}
</script>
<style lang="scss">
  #zhishouBOX {
    .el-range-editor.is-disabled input {
      background-color: white;
    }

    .el-range-editor.is-disabled {
      background-color: white;
    }

    .Punch-card-box {
      margin-bottom: 50px;
      background: #f0f0f0;
      padding-right: 25px;
      padding-top: 20px;
      border-radius: 1%;
      box-shadow: 0 2px 12px 0 floralwhite;
    }

    .el-input.is-disabled .el-input__inner {
      color: black;
      background-color: white;
    }

    .el-input.is-disabled .el-input__inner {
      background-color: white;
    }

    .el-tag--info {
      color: black;
    }

    .el-range-editor.is-disabled input {
      color: black;
    }

    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }

    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    .el-input {
      width: 100%;
    }

    .el-select {
      width: 100%;
    }

    .el-input--suffix {
      width: 100%;
    }

    .el-row {
      margin-bottom: 30px;
    }

    .el-form-item__label {
      // font-weight: 700;
      font-size: 0.9375rem;
    }

    .el-upload-list {
      overflow-y: auto;
      min-height: 60px !important;
      max-height: 300px !important;
      // margin-bottom: 20px;
    }

    .titlestyle {
      font-size: 20px;
      margin-top: 50px;
      margin-bottom: 30px;
    }
  }
</style>
