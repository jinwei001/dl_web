<template>
  <!-- <h2>
      评分
  </h2>-->
  <div class="long-hastitle">
    <el-dialog
      :visible.sync="showDialog"
      title="风险评估明细表"
      :center="true"
      top="5vh"
      v-dialogDrag
      :before-close="handleClose"
    >
      <div class="table" v-show="!loading">
        <el-table v-loading="!loading" element-loading-text="数据正在加载中">
          <el-table-column></el-table-column>
        </el-table>
      </div>
      <div v-show="loading">
        <div class="channelTypeTop">
          <el-button
            v-for="(item,index) in channelTypeBtn"
            :key="index"
            class="onSearch"
            @click="clickChannelType(item.bzid)"
          >{{item.bzmc}}</el-button>
        </div>
        <!--模板数据-->
        <div v-for="(items,index) in riskDivisorData" :key="index" style="width: 100%;overflow: auto">
          <div v-for="(item,i) in items.list" :key="i">
            <p v-if="i==0?true:false">{{items.name}}(权重系数{{item.weight}})</p>
          </div>
          <table class="modelTableStyle" border="0" cellpadding="0">
            <thead>
              <tr>
                <th v-for="head in items.list" :key="head.id">
                  <div>{{head.gradeRule}}</div>
                </th>
                <th>本项扣分合计（自动计算）</th>
                <th>该风险因子加权扣分值（自动计算）</th>
              </tr>
            </thead>
            <tbody>
              <tr class="firstLine">
                <td v-for="content in items.list" :key="content.id">
                  <div>{{content.scoreParagraph}}</div>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr class="secondLine">
                <td v-for="(input,indexInput) in items.list" :key="input.id">
                  <el-input
                    class="detailInput"
                    v-model="input.score"
                    oninput="value=value.replace(/[^0-9.]/g,'')"
                  />
                  <el-button
                    class="detailBtn"
                    @click="openGradeRule(input.fineRulesId,index,indexInput)"
                  >扣分细则</el-button>
                </td>
                <td>{{items.total}}</td>
                <td
                  v-for="(r,q) in items.list"
                  :key="q"
                  ref="jjj"
                  v-if="q==1"
                  id="abc"
                  :value="val"
                >{{jisuan(items.total,items.list[q].weight)}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--副标题-->
        <p class="cableResult">通道信息及评估结果</p>
        <div style="width: 100%;overflow: auto">
<table class="modelTableStyle" border="0" cellpadding="0" style="width: 100%;">
          <thead>
            <tr>
              <th>通道名称</th>
              <th>级别</th>
              <th>风险评估主要扣分原因简述</th>
              <th>后续治理措施和计划</th>
              <th>风险状态</th>
              <th>单项扣分最大值</th>
              <th>应扣分合计</th>
              <th>年度</th>
              <!-- <th>风险评分</th> -->
            </tr>
          </thead>
          <tbody>
            <tr class="firstLine">
              <td>{{riskResult.sdmc}}</td>
              <td>{{riskResult.grade}}</td>
              <td>
                <el-input class="channelResultInput" v-model="riskResult.pointsReason" />
              </td>
              <td>
                <el-input class="channelResultInput" v-model="riskResult.treatmentMeasure" />
              </td>
              <td ref="fxzt">{{max11(maxjs,riskResult.shouldDeductTotal)}}</td>
              <td>{{riskResult.singleMax}}</td>
              <td>{{riskResult.shouldDeductTotal}}</td>
              <td>
                {{myyear}}
                <!-- <el-input class="channelResultInput" v-model="riskResult.year" /> -->
              </td>
              <!-- <td>
                <el-input class="channelResultInput" v-model="riskResult.riskAssessment" />
              </td> -->
            </tr>
          </tbody>
        </table>
        </div> 
        <div slot="footer" class="dialog-footer" style="display: flex;justify-content: center;margin-top: 1rem;">
          <el-button class="UserSearchFun" @click="SuerFun">保存</el-button>
          <el-button class="onSearch" @click="handleClose">取 消</el-button>
        </div>
      </div>
      <!--通道类型按钮-->
    </el-dialog>
    <!--扣分细则弹窗-->
    <el-dialog
      ref="formRef_add"
      :visible.sync="showRuleDialog"
      title="扣分细则"
      width="600px"
      :center="true"
      top="15vh"
      v-dialogDrag
      :before-close="handleClose_Pf"
    >
      <div class="Form-input">
        <div class="form-long-item">
          <label class="form-label" style="width: 30%;">扣分原因：</label>
          <el-input v-model="diaLogForm.pointsReason" clearable />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-long-item">
          <label class="form-label" style="width: 30%;">现场排查情况：</label>
          <el-input v-model="diaLogForm.sceneCheckCondition" clearable />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-long-item" style="height: auto">
          <label class="form-label" style="width: 23%;">上传图片：</label>
          <el-upload
            ref="imgBroadcastUpload"
            :auto-upload="false"
            :limit="1"
            :file-list="diaLogForm.imgBroadcastList"
            list-type="picture-card"
            :on-change="imgBroadcastChange"
            :on-remove="imgBroadcastRemove"
            accept="image/jpg, image/png, image/jpeg"
            action
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="saveGradeFineRule">保存</el-button>
        <el-button class="onSearch" @click="handleClose_Pf">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  List,
  riskDivisor,
  gradeList,
  channelType,
  gradeAdd,
  gradeFineRulesAdd,
  gradeFineRulesEcho,
  gradeFineRulesPic,
  channelSelect
} from "@/api/cableandchannel/channelRiskManagement/channelRiskManagement";
export default {
  props: {
    /**
     * 接收是否打开页面
     */
    isShowDialog: {
      type: Boolean,
      default: false
    },
    /**打开页面的id */
    openID: {
      default: null
    },
    objId: {
      default: null
    },
    year: {
      default: null
    }
  },
  data() {
    return {
      loa: {
        loadingshow: false,
        loadingshow2: false
      },
      id: this.objId,
      myyear: this.year,
      channelIdOnce: "",
      gradeRuleIndex: 0,
      gradeRuleInputIndex: 0,
      diaLogForm: {
        pointsReason: "",
        sceneCheckCondition: "",
        imgBroadcastList: [], // 储存选中的图片列表
        imgsStr: "" // 后端需要的多张图base64字符串 , 分割
      },
      dialogVisible: false,
      dialogImageUrl: "",
      channelTypeBtn: [], //通道类型按钮
      // 风险因子要传的参数
      riskDivisorParams: {
        channelType: 0
      },
      // 风险因子模板数据
      riskDivisorData: [],
      // 风险评分提交数据
      riskUploadData: [],
      // 本项扣分合计
      totalPointThis: 0,
      // 加权扣分
      totalPointWeight: "",
      // 评分结果
      riskResult: {
        sdmc: "",
        grade: "",
        pointsReason: "",
        treatmentMeasure: "",
        riskStatus: "", // 风险状态
        singleMax: "", // 单项最大扣分
        shouldDeductTotal: 0, // 扣分合计
        year: "",
        // riskAssessment: "" // 风险评分
      },
      tableData1: [{}],
      tableTitle: [],
      showDialog: this.isShowDialog, //打开弹框
      showRuleDialog: false, // 扣分细则弹窗
      form: {
        channelType: ""
      },
       maxjs: null,
      val: null,
      lx: null
    };
  },
  watch: {
    objId: function(newVal,oldVal){
      // console.log(newVal)
        this.id = newVal;  //newVal即是chartData
    },
    year: function(newVal,oldVal){
      // console.log(newVal)
        this.myyear = newVal;
    },
    isShowDialog(val) {
      this.showDialog = val;
    },
    // 监听输入框值变化
    riskDivisorData: {
      handler(newVal, oldVal) {
        this.riskResult.shouldDeductTotal = 0;
        // //console.log(newVal);
        // //console.log('数字改变');
        this.riskDivisorData.forEach(element => {
          let plus = 0;
          element.list.forEach((listData, index) => {
            plus += listData.score ? Number(listData.score) : 0;
          });
          element.total = plus;
          this.riskResult.singleMax =
            this.riskResult.singleMax < element.total
              ? element.total
              : this.riskResult.singleMax;

          this.riskResult.shouldDeductTotal += element.total;
        });
      },
      // immediate: true,
      deep: true
    }
  },
  computed: {
    // 计算属性的 getter
    loading: function() {
      // `this` 指向 vm 实例
      return this.loa.loadingshow && this.loa.loadingshow2;
    }
  },
  mounted() {
    // this.getRisk()
  },
  inject: ["getList"], // 子页面调取父页面的方法
  methods: {
     max11(val, all) {
      var max;
      var fxzt;
      if (this.lx == undefined || this.lx == null) {
        this.lx = 1;
      }
      if (val) {
        max = val[0];
        for (var i = 1; i < val.length; i++) {
          var cur = val[i];
          cur > max ? (max = cur) : null;
        }
      } else {
        max = 0;
      }
      if (this.lx == 1) {
        if (all <= 40 || max <= 20) {
          fxzt = "正常状态";
        }
        if ((all > 40 && all <= 80) || (max > 20 && max <= 30)) {
          fxzt = "低风险状态";
        }
        if ((all > 80 && all <= 140) || (max > 30 && max < 40)) {
          fxzt = "中风险状态";
        }
        if (all > 140 || max == 40) {
          fxzt = "高风险状态";
        }
      }
      if (this.lx == 2) {
        if (all <= 50 || max <= 20) {
          fxzt = "正常状态";
        }
        if ((all > 50 && all <= 90) || (max > 20 && max <= 30)) {
          fxzt = "低风险状态";
        }
        if ((all > 90 && all <= 150) || (max > 30 && max < 40)) {
          fxzt = "中风险状态";
        }
        if (all > 150 || max == 40) {
          fxzt = "高风险状态";
        }
      }
      if (this.lx == 3) {
        if (all <= 60 || max <= 20) {
          fxzt = "正常状态";
        }
        if ((all > 60 && all <= 100) || (max > 20 && max <= 30)) {
          fxzt = "低风险状态";
        }
        if ((all > 100 && all <= 160) || (max > 30 && max < 40)) {
          fxzt = "中风险状态";
        }
        if (all > 160 || max == 40) {
          fxzt = "高风险状态";
        }
      }
      if (this.lx == 4) {
        if (all <= 30 || max <= 20) {
          fxzt = "正常状态";
        }
        if ((all > 30 && all <= 70) || (max > 20 && max <= 30)) {
          fxzt = "低风险状态";
        }
        if ((all > 70 && all <= 100) || (max > 30 && max < 40)) {
          fxzt = "中风险状态";
        }
        if (all > 100 || max == 40) {
          fxzt = "高风险状态";
        }
      }

      // console.log("类型:>> ", this.lx);
      // console.log("总扣分 :>> ", all);
      // console.log("单项扣分 :>> ", max);
      // console.log('fxzt :>> ', fxzt);
      return fxzt;
    },
    /**判断类型 */
    Status(val) {
      // console.log(val);
      // console.log("jjjjjjjjjj", this.$refs["jjj"]);
      // this.maxjs = da.reduce(function(a, b) {
      //   return b > a ? b : a;
      // });
    },
    /**
     * val：判断值
     * k: 权限系数
     */
    jisuan(val, k) {
      return (
        (val
          ? val >= 0 && val <= 20
            ? 0
            : val >= 21 && val <= 41
            ? 2
            : val >= 41 && val <= 61
            ? 4
            : val >= 61 && val <= 81
            ? 10
            : 0
          : 0) * k
      );
    },
    // 获取通道类型
    getChannelType(val) {
      this.channelIdOnce = val; // 选择的通道id
      channelType(val).then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.channelTypeBtn = response.data.data;
          this.riskDivisorParams.channelType = Number(
            response.data.data[0].bzid
          );
              this.loa.loadingshow2 = true;
          // //console.log(this.riskDivisorParams);
          // 获取风险因子模板
          riskDivisor(this.$qs.stringify(this.riskDivisorParams)).then(
            response => {
              //console.log(response);
              this.riskDivisorData = response.data.msg;
              this.loa.loadingshow = true;
            }
          );
        }
      });
    },
    // 获取通道名称
    getChannelSelect(val) {
      let selectParam = {
        channelId: val
      };
      channelSelect(this.$qs.stringify(selectParam)).then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.riskResult.sdmc = response.data.data.sdmc;
          this.riskResult.grade = response.data.data.grade;
        }
      });
    },
    // 点击不同的通道类型
    clickChannelType(type) {
      //console.log(type);
       console.log(type);
      this.lx = type;
      if (type == undefined || type == null) {
        type = 1;
      }
      this.riskDivisorParams.channelType = Number(type);
      riskDivisor(this.$qs.stringify(this.riskDivisorParams)).then(response => {
        // //console.log("获取风险因子模板"+response);
        this.riskDivisorData = response.data.msg;
      });
    },
    // 获取风险因子模板
    // getRisk(val) {
    //   this.form.channelType = val
    //   riskDivisor(this.form).then(response => {
    //     //console.log(response);
    //   })
    // },
    // 输入框数值改变
    changeInputValue() {},
    // 保存
    SuerFun() {
      let saveData = [];
      // console.log(this.$refs['aaa'].innerHTML)
      //console.log(this.riskDivisorData);
      this.riskDivisorData.forEach(element => {
        //console.log(element.list);
        element.list.forEach(listData => {
          console.log(listData);
          let obj = {};
          obj["gradeRule"] = listData.gradeRule;
          obj["scoreParagraph"] = listData.scoreParagraph;
          obj["score"] = listData.score;
          obj["riskDivisor"] = listData.riskDivisor;
          obj["weight"] = listData.weight;
          obj["id"] = listData.id;
          obj["gradeRuleId"] = listData.gradeRuleId;
          obj["templateId"] = listData.templateId;
          obj["fineRulesId"] = listData.fineRulesId;
          saveData.push(obj);
          // saveData.append('gradeRule',listData.gradeRule)
        });
      });
      //console.log(saveData);
      var upData = {
        markData: JSON.stringify(saveData),
        pointsReason: this.riskResult.pointsReason,
        riskStatus: this.riskResult.riskStatus,
        singleMax: this.riskResult.singleMax,
        shouldDeductTotal: this.riskResult.shouldDeductTotal,
        year: this.riskResult.year,
        riskStatus: this.$refs['fxzt'].innerHTML, // 风险状态
        treatmentMeasure: this.riskResult.treatmentMeasure,
        riskAssessment: this.riskResult.riskAssessment,
        channelId: this.channelIdOnce, // 通道id 必传
        channelType: this.riskDivisorParams.channelType,
        id: this.id // 主键id
      };
      // if (upData.riskAssessment == "" || upData.riskAssessment == null) {
      //   this.$message("请输入风险评分");
      //   return false;
      // }
      gradeAdd(this.$qs.stringify(upData)).then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.showDialog = false;
          this.getList();
        }
        this.$emit("childFn", {
          showDialog: false
        });
      });
      // var asd = this.$qs.stringify(JSON.stringify(saveData))
      // gradeAdd(this.$qs.stringify(saveData)).then(response => {
      //   //console.log(response);
      // })
    },
    // 点击弹出扣分细则
    openGradeRule(val, index, indexInput) {
       console.log(val)
      this.gradeRuleIndex = index;
      this.gradeRuleInputIndex = indexInput;
      //console.log(val);
      if (val == null || val == "") {
        this.showRuleDialog = true;
      } else {
        this.showRuleDialog = true;
        gradeFineRulesEcho(val).then(res => {
          console.log(res)
          this.diaLogForm = res.data.data
          if(res.data.data.picturePath == null) {
            this.diaLogForm.imgBroadcastList  = []
          } else {
             var lll = process.env.VUE_APP_BASE_API+'/profile'+res.data.data.picturePath;
            this.diaLogForm.imgBroadcastList  = [{name:'',url:lll}]
          }
        })
      }
    },
    // 图片选择后 保存在 diaLogForm.imgBroadcastList 对象中
    imgBroadcastChange(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 < 5; // 上传头像图片大小不能超过 2MB
      if (!isLt2M) {
        this.diaLogForm.imgBroadcastList = fileList.filter(
          v => v.uid !== file.uid
        );
        this.$message.error(
          "图片选择失败，每张图片大小不能超过 5MB,请重新选择!"
        );
      } else {
        // console.log(file)
        let formData = new FormData();
        formData.append("file",file.raw);
        let picUrl = []
        gradeFineRulesPic(formData).then(res=>{
          console.log(res)
          picUrl.push(res.data.filePath)
          this.diaLogForm.picturePath = String(picUrl)
        })
        // this.diaLogForm.imgBroadcastList.push(file);
      }
    },
    // 有图片移除后 触发
    imgBroadcastRemove(file, fileList) {
      //console.log(file);
      console.log(fileList);
      this.diaLogForm.imgBroadcastList = fileList;
    },
    // 保存扣分细则
    saveGradeFineRule() {
      console.log(this.diaLogForm)
      gradeFineRulesAdd(this.$qs.stringify(this.diaLogForm)).then(response => {
        // //console.log(response);
        if (response.status == 200) {
          // //console.log(response.data.data.id)
          this.riskDivisorData[this.gradeRuleIndex]["list"][
            this.gradeRuleInputIndex
          ].fineRulesId = response.data.data.id;
          // //console.log(this.riskDivisorData);
          this.diaLogForm = { brand_right: 0 };
          this.showRuleDialog = false;
        }
      });
    },
    /**
     * 取消按钮
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.showDialog = false;
          // 清空一些数据
          this.riskResult.pointsReason= "",
          this.riskResult.treatmentMeasure= "",
          this.riskResult.singleMax= "",
          this.$emit("childFn", {
            showDialog: this.showDialog
            
          });
          done();
        })
        .catch(_ => {});
    },
    // 关闭评分弹窗
    handleClose_Pf(done){
      this.showRuleDialog = false
      this.diaLogForm.pointsReason = ""
      this.diaLogForm.sceneCheckCondition = ""
      this.diaLogForm.imgBroadcastList  = []
    }
  }
};
</script>
<style lang="scss" scoped>
th {
  white-space: nowrap;
  padding: 0 20px;
}
.channelTypeTop {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
<style lang="scss">
/*模板表格样式*/
.modelTableStyle {
  border-collapse: collapse;
  border-spacing: 0;
}
.modelTableStyle thead {
  background: rgb(205, 220, 230);
  border-color: rgb(196, 200, 207);
  font-weight: 500;
}
.modelTableStyle thead tr {
  height: 60px;
}
.modelTableStyle tbody .firstLine,
.secondLine {
  height: 40px;
  text-align: center;
}
.detailInput {
  width: 45%;
}
.detailBtn {
  width: 50%;
  font-size: 12px;
  text-align: center;
  padding: 12px 4px;
}
.cableResult {
  font-weight: 600;
  font-size: 1.2rem;
  color: #303133;
  line-height: 45px;
}
/*评分结果的输入框*/
.channelResultInput {
  width: 70%;
}
.channelResultInput .el-input__inner {
  height: 30px;
  line-height: 30px;
}
</style>
