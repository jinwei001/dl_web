<template>
  <!-- <div> -->
  <!-- <h2>dl设备台账</h2> -->
  <div>
    <div class="main-body" v-if="isview">
      <div class="main-userSelect" v-if="zhpjHideButtomStatus">
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <el-form-item label="运维班组:">
              <el-select v-model="form.groupId" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.ywbz"
                  :key="item.groupId"
                  :label="item.groupname"
                  :value="item.groupId"
                ></el-option>
              </el-select>
              <!--<el-input v-model="form.operationUnit" clearable placeholder="请输入"/>-->
            </el-form-item>
            <el-form-item :label="`${$dydj}:`">
              <el-select v-model="form.voltageRank" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.dydj"
                  :key="item.dydj"
                  :label="item.dydjmc"
                  :value="item.dydjmc"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="投运日期:">
              <el-col>
                <el-date-picker
                  v-model="transportTime"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="~"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="设备主人:">
              <!--<el-select v-model="form.assetUnit" clearable placeholder="请选择">-->
              <!--<el-option-->
              <!--v-for="item in selection.zcdw"-->
              <!--:key="item.zcxz"-->
              <!--:label="item.zcxzmc"-->
              <!--:value="item.zcxz"-->
              <!--&gt;</el-option>-->
              <!--</el-select>-->
              <el-input v-model="form.facilityMaster" clearable placeholder="请输入" />
            </el-form-item>
          </el-form>
        </div>
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <el-form-item :label="`${$xl}名称:`">
              <!--<el-input v-model="form.lineName" clearable placeholder="请输入"/>-->
              <el-select v-model="form.lineName" clearable filterable placeholder="请选择">
                <el-option
                  v-for="item in selection.xlmc"
                  :key="item.lineId"
                  :label="item.lineName"
                  :value="item.lineId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="架设方式:">
              <el-select v-model="form.lineType" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.fsfs"
                  :key="item.fsfs"
                  :label="item.fsfsmc"
                  :value="item.fsfsmc"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="`${$xl}性质:`">
              <el-select v-model="form.lineNature" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.xlxz"
                  :key="item.xlxz"
                  :label="item.xlxzmc"
                  :value="item.xlxz"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="float: right;margin-right: 0 !important">
              <el-button class="onSearch" @click="onSearch">查询</el-button>
              <el-button class="onSearch" @click="reset" style="margin-right: 0 !important">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="content">
        <div class="respont-content" v-if="zhpjHideButtomStatus">
          <el-form>
            <el-col>
              <el-form-item style="float: left;">
                <el-button class="onSearch" @click="AddFn">
                  <i class="el-icon-plus">新增</i>
                </el-button>
                <el-button class="onSearch" @click="EditFn">
                  <i class="el-icon-edit-outline">编辑</i>
                </el-button>
                <el-button type="danger" plain @click="DelFn">
                  <i class="el-icon-close"></i> 删除
                </el-button>
              </el-form-item>
              <el-form-item style="float: right;">
                <!--                <el-button type="primary" @click="downLoadModels">模板下载</el-button>-->
                <!--                <el-button class="onSearch" @click="reset">-->
                <!--                  <i class="el-icon-plus"></i> 导入-->
                <!--                </el-button>-->
                <el-button class="onSearch" @click="downLoad">
                  <i class="el-icon-document"></i> 导出
                </el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="table">
          <el-table
            :data="tableData"
            style="border: 1px solid #c4c8cf"
            :cell-style="{borderColor: '#c4c8cf'}"
            :header-cell-style="{'background':'#cddce6',borderColor: '#c4c8cf'}"
            border
            fit
            highlight-current-row
            @selection-change="CheckFun"
          >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="60" align="center">
              <!-- <template slot-scope="scope">
                <span>{{(form.pageNum - 1) * 10 + scope.$index + 1}}</span>
              </template> -->
            </el-table-column>
            <el-table-column prop="lineName" :label="`${$xl}名称`" width="120" align="center"></el-table-column>
            <!--<el-table-column prop="channelName" label="通道名称" align="center"></el-table-column>-->
            <el-table-column prop="lineNature" :label="`${$xl}性质`" align="center"></el-table-column>
            <el-table-column prop="voltageRank" :label="`${$dydj}`" align="center"></el-table-column>
            <el-table-column prop="operationUnit" label="运维单位" width="260" align="center"></el-table-column>
            <el-table-column prop="groupName" label="运维班组" align="center"></el-table-column>
            <el-table-column prop="facilityMaster" label="设备主人" align="center"></el-table-column>
            <el-table-column prop="transportTime" label="投运日期" align="center"></el-table-column>
            <el-table-column prop="cableLineLength" label="长度（km）" align="center"></el-table-column>
            <el-table-column prop="assetUnit" label="资产单位" align="center"></el-table-column>
            <el-table-column prop="lineType" label="架设方式" align="center"></el-table-column>
            <el-table-column prop="startPositonName" label="起始位置" align="center"></el-table-column>
            <el-table-column prop="endPositonName" label="终止位置" align="center"></el-table-column>
            <el-table-column prop="lineRank" :label="`${$xl}等级`" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.lineRank == ''"></div>
                <div v-if="scope.row.lineRank == 1">一级高压{{$dl}}</div>
                <div v-if="scope.row.lineRank == 2">二级高压{{$dl}}</div>
                <div v-if="scope.row.lineRank == 3">三级高压{{$dl}}</div>
              </template>
            </el-table-column>
            <!--<el-table-column prop="appraiseStatus" label="评价状态" align="center"></el-table-column>-->
            <el-table-column align="center" label="操作" width="350" fixed="right">
              <template slot-scope="scope">
                <el-button class="onSearch" size="small" @click="view(scope.row.id)">查看</el-button>
                <el-button class="onSearch" size="small" @click="uploadpic(scope.row)" v-if="zhpjHideButtomStatus">上传单线图</el-button>
                <el-button class="onSearch" size="small" @click="viewpic(scope.row)" v-if="zhpjHideButtomStatus">查看单线图</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="form.pageNum"
            :limit.sync="form.pageSize"
            @pagination="getList"
          />
        </div>
      </div>
    </div>
  <!--  //zhpjobjpg告诉子组件其父组件被调用 -->
    <seeabout v-if="!isview" :clickID="clickID" @childFn1="seeaboutparentFn" :zhpjobjpgb='zhpjobjpg'></seeabout>
    <div class="xs-hastitle">
      <el-dialog
        :visible.sync="isAddshowDialog"
        :title="`${$dl}设备台账`"
        v-dialogDrag
        :center="true"
        :before-close="handleClose"
      >
        <el-form
          ref="dataForm"
          :model="form"
          label-position="left"
          style="width:100% ;margin: 0 auto;"
        >
          <div class="Form-input">
            <div class="form-item">
              <label class="form-label">运维单位：</label>
              <el-input v-model="add.operationUnit" clearable />
            </div>
            <div class="form-item">
              <label class="form-label">{{$xl}}名称：</label>
              <el-input v-model="add.lineName" clearable />
            </div>
          </div>
          <div class="Form-input">
            <div class="form-item">
              <label class="form-label">{{$dydj}}：</label>
              <!--<el-input v-model="add.voltageRank" clearable />-->
              <el-select v-model="add.voltageRank" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.dydj"
                  :key="item.dydj"
                  :label="item.dydjmc"
                  :value="item.dydjmc"
                ></el-option>
              </el-select>
            </div>
            <div class="form-item">
              <label class="form-label">投运日期：</label>
              <el-col>
                <el-date-picker
                  style="width: 100%;"
                  v-model="add.transportTime"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-col>
            </div>
          </div>
          <div class="Form-input">
            <div class="form-item">
              <label class="form-label">长度(km)：</label>
              <el-input v-model="add.cableLineLength" clearable />
            </div>
            <div class="form-item">
              <label class="form-label">资产单位：</label>
              <el-input v-model="add.assetUnit" clearable />
            </div>
          </div>
          <div class="Form-input">
            <div class="form-item">
              <label class="form-label">架设方式：</label>
              <!--<el-input v-model="add.lineType" clearable />-->
              <el-select v-model="add.lineType" clearable placeholder="请选择">
                <el-option
                  v-for="item in selection.fsfs"
                  :key="item.fsfs"
                  :label="item.fsfsmc"
                  :value="item.fsfsmc"
                ></el-option>
              </el-select>
            </div>
            <div class="form-item">
              <label class="form-label">起始位置：</label>
              <el-input v-model="add.startPositonName" clearable />
            </div>
          </div>
          <div class="Form-input">
            <div class="form-item">
              <label class="form-label">终止位置：</label>
              <el-input v-model="add.endPositonName" clearable />
            </div>
            <!-- <div class="form-item">
              <label class="form-label">评价状态：</label>
              <el-input v-model="add.appraiseStatus" clearable />
            </div> -->
          </div>
          <!--<div class="Form-input">-->
          <!--<div class="form-item">-->
          <!--<label class="form-label">{{$xl}}等级：</label>-->
          <!--<el-input v-model="add.lineRank" clearable />-->
          <!--&lt;!&ndash;<el-select v-model="add.appraiseStatus" clearable placeholder="请选择">&ndash;&gt;-->
          <!--&lt;!&ndash;<el-option&ndash;&gt;-->
          <!--&lt;!&ndash;v-for="item in statusEvaluate"&ndash;&gt;-->
          <!--&lt;!&ndash;:key="item.value"&ndash;&gt;-->
          <!--&lt;!&ndash;:label="item.label"&ndash;&gt;-->
          <!--&lt;!&ndash;:value="item.value"&ndash;&gt;-->
          <!--&lt;!&ndash;&gt;</el-option>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
          <!--</div>-->
          <!--</div>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="UserSearchFun" @click="SuerFun">保存</el-button>
          <el-button class="onSearch" @click="handleClose">取 消</el-button>
        </div>
      </el-dialog>
    </div>
    <div v-if="isshowpic">
      <showpic @childFn="parentFn" :openobject="openobject" />
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import showpic from "./show";
import {
  List,
  Add,
  DeleteList,
  Edit,
  getLineSelect,
  downLoadModel,
  downLoadFileName,
  downLoad
} from "@/api/cableandchannel/cable-equipment-ledger/Line/index";
import Seeabout from "./view";
export default {
  name: "CableEquipmentLedger",
  components: {
    Pagination,
    Seeabout,
    showpic
  },
  props: {
   //状态评价来源 如果该参数不为空则表示该页被状态评价 评价结果管理调用
    zhpjobjpg: {
      type: Object,
      default: function() {
      return {

      }
    }},
  },
  data() {
    return {
      zhpjHideButtomStatus:true,//状态结果管理隐藏按钮状态
      isshowpic: false, //图片弹框
      openobject: {}, //图片展示的数据
      isview: true,
      isAddshowDialog: false,
      isEdit: false,
      isAdd: false,
      transportTime: [],
      form: {
        groupName: "",
        lineName: "",
        lineType: "",
        lineNature: "", // xl性质
        facilityMaster: "", // 设备主人
        voltageRank: null, // dydj
        transportTime: [], // 投运时间
        startDate: "",
        endDate: "",
        pageNum: 1,
        pageSize: 10
      },
      add: {
        operationUnit: null,
        lineName: null,
        voltageRank: null,
        voltageRankCode: "",
        transportTime: null,
        cableLineLength: null,
        assetUnit: null,
        lineType: null,
        startPositonName: null,
        endPositonName: null,
        lineRank: null,
        appraiseStatus: null
      },
      statusEvaluate: [
        {
          value: "1",
          label: "选项1"
        }
      ],
      total: 0,
      selection: {
        ywbz: [],
        dydj: [],
        zcdw: [],
        xlmc: [],
        fsfs: [],
        xlxz: [
          {
            xlxz: "1",
            xlxzmc: "主线"
          },
          {
            xlxz: "2",
            xlxzmc: "支线"
          }
        ]
      },
      //选中的数据
      CheckedSelection: [],
      selectedIDs: [],
      tableData: [],
      clickID: null
    };
  },
  created() {
     //状态评价来源 如果该参数不为空则表示该页被状态评价 评价结果管理调用
    if(Object.keys(this.zhpjobjpg).length > 0){
      this.zhpjHideButtomStatus=this.zhpjobjpg.show//如果被评价结果管理调用隐藏不需要的按钮
      this.form.lineName=this.zhpjobjpg.lineName//根据价结果管理线路名称过滤列表
    }
  },
  mounted() {
    this.getList();
    this.getSelect();
  },
  methods: {
    /**接受图片的数据 */
    parentFn(val) {
      console.log(val);
      this.isshowpic = val.isshowpic;
    },
    /**上传图片按钮 */
    uploadpic(val) {
      this.isshowpic = true;
      if (val.photoUrl == "" || val.photoUrl == undefined) {
        this.openobject = {
          openID: val.id, //打开的id
          isadd: true, //是否为编辑
          num: 1, //上传图片的个数
          edit: "/cable/line/edit" //文件保存的地址
        };
      } else {
        this.openobject = {
          openID: val.id, //打开的id
          isadd: true, //是否为编辑
          num: 1, //上传图片的个数
          edit: "/cable/line/edit", //文件保存的地址
          picpho: val.photoUrl
        };
      }
    },
    /**图片产科按钮 */
    viewpic(val) {
      console.log(val);
      if (val.photoUrl == "" || val.photoUrl == undefined) {
        this.$message({
          message: "图片不存在！！！",
          type: "warning"
        });
        return false;
      } else {
        this.isshowpic = true;
        this.openobject = {
          openID: val.id,
          isadd: false,
          num: 1,
          picpho: val.photoUrl
        };
      }
    },

    seeaboutparentFn(val) {
      this.isview = val.back;
      this.getList(); // 刷新方法
    },
    reset() {
      this.form = { brand_right: 0 };
      this.transportTime = [];
      this.form.pageNum = 1;
      this.form.pageSize = 10;
      this.getList();
    },
    /**查询 */
    onSearch() {
      if (this.form.groupName) {
        if (searcharr.length > 0) {
          this.form.groupName = searcharr[0]["groupname"];
        }
        // //console.log(this.form);
        // this.form.groupName = searcharr[0]['groupname']
      }
      if (this.form.lineName) {
        // xl名称
        let searcharr = this.selection.xlmc.filter(res => {
          return this.form.lineName == res.lineId;
        });
        if (searcharr.length > 0) {
          this.form.lineName = searcharr[0]["lineName"];
        }
        // this.form.lineName = searcharr[0]['lineName']
      }
      if (this.form.lineNature) {
        // xl性质
        let searcharr = this.selection.xlxz.filter(res => {
          return this.form.lineNature == res.xlxz;
        });
        if (searcharr.length > 0) {
          this.form.lineNature = searcharr[0]["xlxzmc"];
        }
        this.form.lineNature = searcharr[0]["xlxzmc"];
      }
      // if (this.form.voltageRank) {
      //   // dydj
      //   let searcharr = this.selection.dydj.filter(res => {
      //     return this.form.voltageRank == res.dydj;
      //   });
      //   if (searcharr.length > 0) {
      //     this.form.voltageRank = searcharr[0]["dydjmc"];
      //   }
      //   // this.form.voltageRank = searcharr[0]['dydjmc']
      // }
      // if (this.form.lineType) {
      //   // 架设方式
      //   let searcharr = this.selection.fsfs.filter(res => {
      //     return this.form.lineType == res.fsfs;
      //   });
      //    if (searcharr.length > 0) {
      //     this.form.lineType = searcharr[0]["fsfsmc"];
      //   }
      //   // //console.log(this.form);
      // }
      // //console.log(this.form.transportTime);
      if (this.transportTime) {
        this.form.startDate = this.transportTime[0];
        this.form.endDate = this.transportTime[1];
      }
      //console.log(this.form);
      this.form.pageNum = 1;
      this.getList();
    },
    // 获取下拉数据
    getSelect() {
      getLineSelect().then(response => {
        if (response.status == 200) {
          this.selection.ywbz = response.data.data.groupList;
          this.selection.dydj = response.data.data.dydjList;
          this.selection.zcdw = response.data.data.zcxzList;
          this.selection.fsfs = response.data.data.fsfsList;
          this.selection.xlmc = response.data.data.lineList;
        }
      });
    },
    /**获取数据 */
    getList() {
      // //console.log(this.form);
      List(this.$qs.stringify(this.form)).then(res => {
        let listData = res.data;
        this.tableData = listData.rows;
        this.total = listData.total;
      });
    },
    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val;
      //console.log(this.CheckedSelection);
      let ids = [];
      this.CheckedSelection.map(item => {
        ids.push(item.id);
      });
      var chosenId = ids.join(); // 数组转字符串
      // var chosenId = ids.join(","); // 数组转字符串
      this.selectedIDs = chosenId; //选中数据中的所有id
    },
    /**查看 */
    view(val) {
      //console.log(val);
      this.isview = false;
      this.clickID = val;
    },
    /**新增 */
    AddFn() {
      //console.log("新增");
      this.add = {};
      this.isAddshowDialog = true;
      this.isAdd = true;
    },
    /**编辑 */
    EditFn() {
      if (
        this.CheckedSelection.length > 1 ||
        this.CheckedSelection.length <= 0
      ) {
        this.$message("请选择一条要编辑的数据");
        return false;
      }
      List(this.$qs.stringify({ id: this.selectedIDs })).then(res => {
        //console.log(res);
        this.add = res.data.rows[0];
      });
      this.isAddshowDialog = true;
      this.isEdit = true;
    },
    /**删除 */
    DelFn() {
      if (this.CheckedSelection.length <= 0) {
        this.$message("请选择要删除的数据");
        return false;
      }
      this.$confirm("确认要删除数据吗？")
        .then(_ => {
          DeleteList(this.selectedIDs).then(res => {
            // //console.log(res);
            this.getList();
            this.$message({
              message: "删除成功",
              type: "success"
            });
          });
          done();
        })
        .catch(_ => {});
    },
    /**
     * 取消按钮
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          if (this.isAdd) {
            this.isAdd = false;
          } else {
            this.isEdit = false;
          }
          this.isAddshowDialog = false;
          done();
        })
        .catch(_ => {});
    },
    /**
     * 确认按钮
     */
    SuerFun() {
      // if (this.add.voltageRankCode) {
      //   // dydj
      //   let searcharr = this.selection.dydj.filter(res => {
      //     return this.add.voltageRankCode == res.dydj;
      //   });
      //   this.add.voltageRank = searcharr[0]["dydjmc"];
      // }
      // if (this.add.lineType) {
      //   // 架设方式
      //   let searcharr = this.selection.fsfs.filter(res => {
      //     return this.add.lineType == res.fsfs;
      //   });
      //   this.add.lineType = searcharr[0]["fsfsmc"];
      // }

      let list = this.$qs.stringify(this.add);
      if (this.isAdd) {
        this.isAdd = false;
        Add(list).then(res => {
          this.$message({
            message: "新增成功",
            type: "success"
          });
          this.getSelect();
          this.getList();
        });
      } else {
        this.isEdit = false;
        // //console.log("编辑成功");
        Edit(list).then(res => {
          this.$message({
            message: "编辑成功",
            type: "success"
          });
          this.getList();
        });
      }
      this.isAddshowDialog = false;
    },
    // 下载
    downLoadModels() {
      // let a = document.createElement('a')
      // a.href = process.env.VUE_APP_BASE_API + '/cable/line/export'
      // a.click()
      downLoadModel().then(response => {
        //console.log(response);
        window.location.href =
          process.env.VUE_APP_BASE_API +
          "/common/download?fileName=" +
          response.data.msg +
          "&delete=true";
      });
    },
    // 导出
    downLoad() {
      downLoadFileName().then(response => {
        //console.log(response);
        window.location.href =
          process.env.VUE_APP_BASE_API +
          "/common/download?fileName=" +
          response.data.msg +
          "&delete=true";
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
