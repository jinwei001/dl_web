<template>
  <div>
    <!--{{childclickID}}-->
    <el-button class="onSearch faultButton" @click="saveFaultDesign" v-if="add.id==null||add.id==undefined">保存</el-button>
    <el-button class="onSearch faultButton" @click="saveFaultDesign_edit" v-else>编辑保存</el-button>
    <!--表单-->
    <el-form
      ref="dataForm"
      :model="add"
      label-position="left"
      style="width:100% ;margin: 0 auto;"
    >
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">故障{{$xl}}名：</label>
          <!--<el-input v-model="add.gzxlmc" clearable />-->
          <el-select v-model="add.gzxlid" disabled >
            <el-option v-for="item in selection.linesSelectArr" :key="item.id" :label="item.lineName" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="form-item">
          <label class="form-label">所属{{$dl}}：</label>
          <!--<el-input v-model="add.ssdlmc" clearable />-->
          <el-select v-model="add.ssdlid" disabled>
            <el-option v-for="item in selection.dlSelectArr" :key="item.id" :label="item.logicCableStageName" :value="item.id"></el-option>
          </el-select>
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">{{$dydj}}：</label>
          <el-input v-model="add.dydj" disabled />
        </div>
        <div class="form-item">
          <label class="form-label">故障{{$xb}}：</label>
          <el-input v-model="add.gzxb" disabled />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">设备类型：</label>
          <el-input v-model="add.sblx" disabled />
        </div>
        <div class="form-item">
          <label class="form-label">故障设备名：</label>
          <el-input v-model="add.gzsbmc" disabled />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">故障运维班组：</label>
          <el-input v-model="add.yybzmc" clearable />
        </div>
        <div class="form-item">
          <label class="form-label">故障发生时间：</label>
          <!--<el-input v-model="add.gzfssj" clearable />-->
          <el-date-picker
            style="width: 100%;"
            v-model="add.gzfssj"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">{{$bdz}}名称：</label>
          <el-input v-model="add.bdzmc" clearable />
        </div>
        <div class="form-item">
          <label class="form-label">接到通知时间：</label>
          <!--<el-input v-model="add.jdtzsj" clearable />-->
          <el-date-picker
            style="width: 100%;"
            v-model="add.jdtzsj"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">当值值班长：</label>
          <el-input v-model="add.zbz" clearable />
        </div>
        <div class="form-item">
          <label class="form-label">登记部门名称：</label>
          <el-input v-model="add.djbmmc" clearable />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">故障跳闸时间：</label>
          <!--<el-input v-model="add.gztzsj" clearable />-->
          <el-date-picker
            style="width: 100%;"
            v-model="add.gztzsj"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </div>
        <div class="form-item">
          <label class="form-label" style="width: 31%;">是否跳闸：</label>
          <!--<el-input v-model="add.istz" clearable />-->
          <el-radio-group v-model="add.istz" style="padding: 12px">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">自动装置情况：</label>
          <el-input v-model="add.zdzzqk" clearable />
        </div>
        <div class="form-item">
          <label class="form-label">所属单位名称：</label>
          <el-input v-model="add.dwmc" clearable />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item" style="height: auto">
          <label class="form-label">巡视结果：</label>
          <el-input v-model="add.xsjg" type="textarea" :rows="2" clearable />
        </div>
        <div class="form-item" style="height: auto">
          <label class="form-label">处理结果：</label>
          <el-input v-model="add.cljg" type="textarea" :rows="2" clearable />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item" style="height: auto">
          <label class="form-label">结算情况：</label>
          <el-input v-model="add.jsqk" type="textarea" :rows="2" clearable />
        </div>
        <div class="form-item" style="height: auto">
          <label class="form-label">处理单位：</label>
          <el-input v-model="add.cldw" clearable />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-long-item" style="height: auto">
          <label class="form-label" style="width: 15%;font-size: 14px;">上传图片：</label>
          <el-upload
            v-if="!add.sctp"
            ref="imgBroadcastUpload"
            :auto-upload="true"
            :limit="1"
            :file-list="diaLogForm.imgBroadcastList"
            list-type="picture-card"
            :on-change="imgBroadcastChange"
            :on-success="upImgSuccess"
            :on-remove="imgBroadcastRemove"
            accept="image/jpg, image/png, image/jpeg"
            :action="xcPicUPloadUrl"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="add.sctp" alt />
          </el-dialog>
          <div class="imgCont" v-if="add.sctp">
            <img :src='add.sctp' alt="" style="width: 150px;height: 150px;">
            <div class="doImgBtn">
              <i class="el-icon-delete del" @click="delImg()"></i>
            </div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import {
  linesSelect, // xl下拉
  dlSelect, // dl下拉
  plangetSb, // 获取 设备名称
  jcbzSelect // 检测班组
} from '@/api/liveDetectionManage'
import {faultDesignEcho,faultDesignAdd,faultDesignEdit } from '@/api/faultManagement/faultDesign/faultDesign'
export default {
  name: "faultDesign",
  props: {
    childclickID: {
      default: null
    }
  },
  data() {
    return {
      formParam: {
        id: this.childclickID,
      },
      add: {
        gzxlid: '',
        gzxlmc: '',
        ssdlid: '',
        ssdlmc: '',
        dydj: '',
        gzxb: '',
        sblx: '',
        gzsbmc: '',
        yybzmc: '',
        gzfssj: '',
        bdzmc: '',
        jdtzsj: '',
        zbz: '',
        djbmmc: '',
        gztzsj: '',
        istz: '',
        zdzzqk: '',
        dwmc: '',
        xsjg: '', // 巡视结果
        cljg: '', // 处理结果
        jsqk: '', // 结算情况
        cldw: '', // 处理单位
        sctp: '', // 上传图片
      },
      xcPicUPloadUrl: process.env.VUE_APP_BASE_API + '/cable/file/upload?type=xctpImg',
      diaLogForm: {
        imgBroadcastList: [], // 储存选中的图片列表
        imgsStr: "" // 后端需要的多张图base64字符串 , 分割
      },
      dialogVisible: false,
      dialogImageUrl: "",
      selection: {
        linesSelectArr: [], // xl名称
        dlSelectArr: [], // dl
        sbmcArr: [], // 设备名称
        sblxArr: [
          this.$dl+'终端',
          this.$dl+'接头',
          this.$dl+'分支箱',
          '交叉互联箱',
          this.$dl+'接地箱'
        ], // 检测设备类型
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
    linesSelect().then(res => {
      // xl
      this.selection.linesSelectArr = res.data.rows
    })
    let lineId = this.add.gzxlid
    dlSelect({ lineId }).then(res => {
      // dl
      this.selection.dlSelectArr = res.data.rows
    })
  },
  methods: {
    // 故障登记回显
    EchoFunction() {
      faultDesignEcho(this.$qs.stringify(this.formParam)).then(response => {
        //console.log(response);
        if(response.status == 200) {
          this.add = response.data.rows[0]
          this.isAdd = false
        }
      })
    },

    // 保存故障登记
    saveFaultDesign() {
      faultDesignAdd(this.$qs.stringify(this.add)).then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
        }
      })
    },
    // 编辑保存故障登记
    saveFaultDesign_edit(){
      faultDesignEdit(this.$qs.stringify(this.add)).then(response => {
        // //console.log(response);
        if (response.status == 200) {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
        }
      })
    },
    // 上传图片
    onExceed(file, fileList) {
      //console.log(fileList);
    },
    imgBroadcastChange(file, fileList) {},
    upImgSuccess(res, file,) {
      //console.log(res);
      this.add.sctp = process.env.VUE_APP_BASE_API + res.msg
      //console.log(file);
    },
    // 有图片移除后 触发
    imgBroadcastRemove(file, fileList) {
      //console.log(file);
      //console.log(fileList);
      this.diaLogForm.imgBroadcastList = fileList;
    },
    delImg(ind) {
      this.add.sctp = ''
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
