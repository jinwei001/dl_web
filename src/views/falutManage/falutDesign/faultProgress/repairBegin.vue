<template>
  <div>
    <!--{{childclickID}}-->
    <div style="height: 60px;" v-if="add.id==null||add.id==undefined">
      <el-button class="onSearch faultButton" @click="saveQxjdFuc">保存</el-button>
    </div>
    <div style="height: 60px;" v-else>
      <el-button class="onSearch faultButton" @click="saveQxjdFuc_edit">编辑保存</el-button>
    </div>
    <div class="repairBeginSubTit">
      <p class="subTitle">应急预案</p>
      <el-button class="onSearch" @click="getYjyaList">调取应急预案</el-button>
    </div>
    <div class="table">
      <el-table
        :data="tableData_yjya"
        style="border: 1px solid #c4c8cf"
        height="300px"
        :cell-style="{borderColor: '#c4c8cf'}"
        :header-cell-style="{'background':'#cddce6',borderColor: '#c4c8cf'}"
        border
        fit
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column prop="planmae" label="预案名称" width="260" align="center"></el-table-column>
        <el-table-column prop="planlevel" label="预案等级" align="center"></el-table-column>
        <el-table-column prop="plantype" label="预案类型" align="center"></el-table-column>
        <el-table-column prop="fileName" label="预案" align="center"></el-table-column>
        <el-table-column prop="lineName" :label="`${$xl}`" width="200" align="center"></el-table-column>
        <el-table-column prop="lineGroup" :label="`${$xl}班组`" width="120" align="center"></el-table-column>
        <el-table-column prop="lineRiskLevel" :label="`${$xl}风险等级`" width="150" align="center"></el-table-column>
        <el-table-column prop="channelName" label="通道列表" width="250" align="center"></el-table-column>
        <el-table-column prop="eventtype" label="事件类型" align="center"></el-table-column>
        <el-table-column prop="productionunit" label="制作单位" align="center"></el-table-column>
        <el-table-column prop="materialpoint" label="物资点" align="center"></el-table-column>
        <el-table-column prop="rescueteamsName" label="抢修队伍" align="center"></el-table-column>
        <el-table-column prop="placurrentstate" label="预案当前状态" width="150" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.placurrentstate==1">提交</span>
            <span v-if="scope.row.placurrentstate==2">退回</span>
            <span v-if="scope.row.placurrentstate==3">通过审核</span>
          </template>
        </el-table-column>
        <el-table-column prop="makingdate" label="制定日期" width="120" align="center"></el-table-column>
        <el-table-column prop="makingPeopleName" label="指定人" align="center"></el-table-column>
        <el-table-column prop="auditdate" label="审核日期" width="120" align="center"></el-table-column>
        <el-table-column prop="auditpeopleName" label="审核人" align="center"></el-table-column>
        <el-table-column prop="poststatus" label="发布状态" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="repairBeginSubTit">
      <p class="subTitle">处理过程</p>
      <el-button class="onSearch" @click="addClgc">新增</el-button>
      <el-button
        class="onSearch"
        v-if="(qxkzid != null&&shhzt ==null )|| shhzt == 2"
        @click="qxzyshowDialog = true"
      >抢修资源申请</el-button>
      <p class="spStatus" v-if="qxkzid != null">
        抢修资源申请状态：
        <span v-if="shhzt == 0">未审核</span>
        <span v-if="shhzt == 1">同意</span>
        <span v-if="shhzt == 2">拒绝</span>
        <span v-if="shhzt == 3">审核中</span>
      </p>
    </div>
    <!--抢修资源申请弹窗-->
    <el-dialog
      :visible.sync="qxzyshowDialog"
      title="抢修资源申请"
      v-dialogDrag
      :center="true"
      :modal="false"
      :before-close="handleClose"
    >
      <el-form
        ref="dataForm"
        :model="add_qxzy"
        label-position="left"
        style="width:100% ;margin: 0 auto;"
      >
        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">审批班组：</label>
            <!--<el-input v-model="add_qxzy.spbz" clearable />-->
            <el-select v-model="add_qxzy.zzbzid" clearable placeholder="请选择" @change="getJcrList">
              <el-option
                v-for="item in selection.groupsArr"
                :key="item.id"
                :label="item.groupName"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="form-item">
            <label class="form-label">审批人：</label>
            <!--<el-input v-model="add_qxzy.zzshhr" clearable />-->
            <el-select v-model="add_qxzy.zzshhrid" clearable placeholder="请选择">
              <el-option
                v-for="item in jcrSelectArr"
                :key="item.objId"
                :label="item.name"
                :value="item.objId"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" @click="SuerFun_qxzy">保存</el-button>
        <el-button class="onSearch" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
    <!--新增弹窗-->
    <div v-if="AddshowDialog">
      <el-dialog
        :visible.sync="AddshowDialog"
        title="抢修开展新增"
        v-dialogDrag
        :modal="false"
        :center="true"
        :before-close="handleClose"
      >
        <el-form
          ref="dataForm"
          :model="add_clgc"
          label-position="left"
          style="width:100% ;margin: 0 auto;"
        >
          <div class="Form-input">
            <div class="form-item">
              <label class="form-label">处理内容：</label>
              <el-input v-model="add_clgc.clnr" clearable />
            </div>
            <div class="form-item">
              <label class="form-label">处理人：</label>
              <!--<el-input v-model="add_clgc.clr" clearable />-->
              <el-select v-model="add_clgc.clrid" clearable placeholder="请选择" filterable>
                <el-option v-for="item in selection.clrArr" :key="item.objId" :label="item.name" :value="item.objId" />
              </el-select>
            </div>
          </div>
          <div class="Form-input">
            <div class="form-item">
              <label class="form-label">处理时间：</label>
              <!--<el-input v-model="add_clgc.clsj" clearable />-->
              <el-date-picker
                style="width: 100%;"
                v-model="add_clgc.clsj"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </div>
            <div class="form-item">
              <label class="form-label">处理情况：</label>
              <el-input v-model="add_clgc.clqk" clearable />
            </div>
          </div>
          <div class="Form-input">
            <div class="form-item">
              <label class="form-label">处理描述：</label>
              <el-input v-model="add_clgc.clzp" clearable />
            </div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="UserSearchFun" @click="SuerFun_clgc">保存</el-button>
          <el-button class="onSearch" @click="handleClose">取 消</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="table" style="margin-bottom: 20px">
      <el-table
        :data="tableData_clgc"
        style="border: 1px solid #c4c8cf"
        height="300px"
        :cell-style="{borderColor: '#c4c8cf'}"
        :header-cell-style="{'background':'#cddce6',borderColor: '#c4c8cf'}"
        border
        fit
        highlight-current-row
      >
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column prop="clnr" label="处理内容" width="260" align="center"></el-table-column>
        <el-table-column prop="clr" label="处理人" align="center"></el-table-column>
        <el-table-column prop="clsj" label="处理时间" align="center"></el-table-column>
        <el-table-column prop="clqk" label="处理情况" align="center"></el-table-column>
        <el-table-column prop="sblx" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" plain @click="DelAllFn(scope.row)">
              <i class="el-icon-close"></i> 删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--表单-->
    <el-form ref="dataForm" :model="add" label-position="left" style="width:100% ;margin: 0 auto;">
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">抢修人员数量：</label>
          <el-input v-model="add.qjrysl" clearable @input.native="period" />
        </div>
        <div class="form-item">
          <label class="form-label">抢修物资数量：</label>
          <el-input v-model="add.qxwzsl" clearable @input.native="period" />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label" style="width: 31%;">处理是否完成：</label>
          <!--<el-input v-model="add.iswc" clearable />-->
          <el-radio-group v-model="add.iswc" style="padding: 12px">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </div>
        <div class="form-item">
          <label class="form-label">恢复送电时间：</label>
          <!--<el-input v-model="add.hfsdsj" clearable />-->
          <el-date-picker
            style="width: 100%;"
            v-model="add.hfsdsj"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">{{$dl}}型号：</label>
          <el-input v-model="add.dlxh" clearable />
        </div>
        <div class="form-item">
          <label class="form-label">{{$dl}}长度：</label>
          <el-input v-model="add.dlcd" clearable />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">终端种类：</label>
          <el-input v-model="add.zdzl" clearable />
        </div>
        <div class="form-item">
          <label class="form-label">终端数量：</label>
          <el-input v-model="add.zdsl" clearable />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">其他设备类型：</label>
          <el-input v-model="add.qtsblx" clearable />
        </div>
        <div class="form-item">
          <label class="form-label">其他设备数量：</label>
          <el-input v-model="add.qtsbsl" clearable />
        </div>
      </div>
      <div class="Form-input">
        <div class="form-item">
          <label class="form-label">接头种类：</label>
          <el-input v-model="add.jtzl" clearable />
        </div>
        <div class="form-item">
          <label class="form-label">接头数量：</label>
          <el-input v-model="add.jtsl" clearable />
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import {
  yjyaList,
  saveQxjd,
  qxjdEcho,
  saveQxjd_edit,
  clgcList,
  clgcAdd,
  deleteClgc
} from "@/api/faultManagement/faultDesign/faultDesign";
import {
  groups,
  qxzyAdd
} from "@/api/faultManagement/repairExamine/repairExamine";
import { jcrSelect } from "@/api/liveDetectionManage";
import { UserList } from "@/api/public";
import request from '@/utils/request'

export default {
  name: "repairBegin",
  props: {
    childclickID: {
      default: null
    }
  },
  data() {
    return {
      formParam: {
        gzdjid: this.childclickID // 故障登记id
      },
      qxkzid: null, // 判断是否有抢修开展id
      shhzt: null, // 抢修资源当前审核状态
      AddshowDialog: false,
      qxzyshowDialog: false, // 抢修资源弹窗
      add: {
        yjyaid: "", // 应急预案id
        qjrysl: "",
        qxwzsl: "",
        iswc: "",
        hfsdsj: "",
        dlxh: "",
        dlcd: "",
        zdzl: "",
        zdsl: "",
        qtsblx: "",
        qtsbsl: "",
        jtzl: "",
        jtsl: "",
        gzdjid: this.childclickID, // 故障登记id
        ids: []
      },
      add_clgc: {
        clnr: "",
        clrid: '', // 处理人id
        clr: "",
        clsj: "",
        clqk: "",
        clzp: "",
        qxkzid: "",
        gzdjid: ""
      },
      add_qxzy: {
        // 抢修资源新增
        zzbzid: "", // 专职班组
        zzbzmc: "",
        zzshhrid: "", // 专职审核人
        zzshhr: "",
        qxkzid: "" // 抢修开展id
      },
      jcrSelectArr: [],
      selection: {
        groupsArr: [], // 运维班组
        clrArr: [], // 处理人
      },
      tableData_yjya: [], // 应急预案列表
      tableData_clgc: [], // 处理流程列表
      CheckedSelection: []
    };
  },
  watch: {
    childclickID(val) {
      //console.log(val);
      this.formParam.gzdjid = val;
      this.EchoFunction();
    }
  },
  created() {
    this.EchoFunction();
    // 获取班组信息
    groups().then(res => {
      this.selection.groupsArr = res.data.data;
    });
  },
  mounted() {
    this.getList_clgc();
  },
  methods: {
    period(e) {
      e.target.value = e.target.value.replace(/[^\d]/g, "");
    },
    /**获取应急预案数据 */
    getList_yjya() {
      yjyaList().then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.tableData_yjya = response.data.rows;
        }
      });
    },
    // 调取应急预案
    getYjyaList() {
      this.getList_yjya();
    },
    // 单选应急预案
    handleCurrentChange(val) {
      //console.log(val);
      this.add.yjyaid = val.objId;
    },
    // 新增处理过程弹窗
    addClgc() {
      this.AddshowDialog = true
      /**当前处理人 */
      UserList().then(res => {
        this.selection.clrArr = res.data.rows;
      });
    },
    /**获取处理过程数据 */
    getList_clgc() {
      this.formParam.gzdjid = this.childclickID;
      clgcList(this.$qs.stringify(this.formParam)).then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.tableData_clgc = response.data.rows;
        }
        let idsArr = [];
        this.tableData_clgc.forEach(ele => {
          // const { id } = ele
          idsArr.push(ele.id);
        });
        // idsArr.join();
        this.add.ids = idsArr.join();
      });
    },
    // 处理过程新增
    SuerFun_clgc() {
      this.add_clgc.gzdjid = this.childclickID;
      if (this.add_clgc.clrid) {
        // 故障xl
        let searcharr = this.selection.clrArr.filter(res => {
          return this.add_clgc.clrid == res.objId;
        });
        //console.log(searcharr);
        this.add_clgc.clr = searcharr[0]["name"];
      }
      clgcAdd(this.$qs.stringify(this.add_clgc)).then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.$message({
            message: "新增成功",
            type: "success"
          });
          this.AddshowDialog = false;
          this.add_clgc = {
            clnr: "",
            clrid: "",
            clr: "",
            clsj: "",
            clqk: "",
            clzp: "",
            qxkzid: "",
            gzdjid: ""
          };
          this.getList_clgc();
        }
      });
    },
    /** 运维班组change 获取检测人 */
    getJcrList(groupname) {
      let oneGroup = this.selection.groupsArr.filter(res => {
        return res.id == groupname;
      });
      this.add_qxzy.zzshhrid = null;
      jcrSelect(oneGroup[0].groupName).then(res => {
        this.jcrSelectArr = res.data.data;
      });
    },
    // 抢修资源申请新增
    SuerFun_qxzy() {
      if (this.add_qxzy.zzbzid) {
        let searcharr = this.selection.groupsArr.filter(res => {
          return this.add_qxzy.zzbzid == res.id;
        });
        this.add_qxzy.zzbzmc = searcharr[0]["groupName"];
      }
      if (this.add_qxzy.zzshhrid) {
        let searcharr = this.jcrSelectArr.filter(res => {
          return this.add_qxzy.zzshhrid == res.objId;
        });
        this.add_qxzy.zzshhr = searcharr[0]["name"];
      }
      this.add_qxzy.qxkzid = this.qxkzid;
      //console.log(this.add_qxzy);
      qxzyAdd(this.$qs.stringify(this.add_qxzy)).then(response => {
        //console.log(response);
        if (response.status == 200 && response.data.code == 0) {
          this.$message({
            message: "新增抢修审批成功",
            type: "success",
            onClose: ()=> {
              this.EchoFunction()
            }
          });
          this.qxzyshowDialog = false;
        } else {
          this.$message({
            message: response.data.msg,
            type: "warning"
          });
        }
      });
    },
    // 抢修进度回显
    EchoFunction() {
      qxjdEcho(this.formParam).then(response => {
        //console.log(response);
        if (response.status == 200 && response.data.code == 0) {
          this.add = response.data.data;
          this.qxkzid = response.data.data.id;
          this.shhzt = response.data.data.shhzt;
        }
      });
    },
    // 保存抢修进度
    saveQxjdFuc() {
      this.add.gzdjid = this.childclickID;
      saveQxjd(this.$qs.stringify(this.add)).then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.$message({
            message: "新增成功",
            type: "success",
            onClose: ()=>{
              this.EchoFunction()
            }
          });
        }
      });
    },
    // 编辑保存
    saveQxjdFuc_edit() {
      saveQxjd_edit(this.$qs.stringify(this.add)).then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.$message({
            message: "编辑成功",
            type: "success"
          });
        }
      });
    },
    /**
     * 取消按钮
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.AddshowDialog = false;
          this.add_clgc = {
            clnr: "",
            clr: "",
            clsj: "",
            clqk: "",
            clzp: "",
            qxkzid: "",
            gzdjid: ""
          };
          done();
        })
        .catch(_ => {});
    },
    DelAllFn(val) {
      console.log(val);
      let idsArr = [];
      idsArr.push(val.id);

      this.del(idsArr.join(","));
    },
    del(ids) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        var idParam = {ids: ids}
        deleteClgc(this.$qs.stringify(idParam)).then(res => {
          console.log(res);
          if(res.status == 200){
            this.$message({
              type: "success",
              message: "删除成功"
            });
            this.getList_clgc();
          }
        })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消"
        });
      });
    }
  }
};
</script>

<style scoped>
</style>
<style lang="scss">
.main-body {
  height: auto;
}
.faultButton {
  float: right;
  margin-bottom: 15px;
  width: 140px;
}
.form-item input {
  width: 100%;
}
/*二级副标题*/
.repairBeginSubTit {
  text-align: center;
  margin-bottom: 20px;
  .subTitle {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 10px 0;
  }
  .spStatus {
    display: inline-block;
    margin-left: 15px;
    font-size: 16px;
  }
}
</style>
