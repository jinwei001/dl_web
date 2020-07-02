<template>
  <!-- <div>
    <h2>故障管理-故障等级-抢修进度</h2>
  </div>-->
  <div class="main-body">
    <!--{{qsStatus}}-->
    <el-tabs v-model="activeName">
      <el-tab-pane label="故障登记" name="1">
        <fault-design
          :childclickID="clickID"
        />
      </el-tab-pane>
      <el-tab-pane label="故障查找" name="2">
        <fault-search
          :childclickID="clickID"
        />
      </el-tab-pane>
      <el-tab-pane label="抢修准备" name="3">
        <repair-ready
          :childclickID="clickID"
        />
      </el-tab-pane>
      <el-tab-pane label="抢修开展" name="4">
        <repair-begin
          :childclickID="clickID"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getUserId } from "@/utils/auth";
import FaultDesign from "./faultProgress/faultDesign";
import FaultSearch from "./faultProgress/faultSearch";
import RepairReady from "./faultProgress/repairReady";
import RepairBegin from "./faultProgress/repairBegin";

export default {
  props: {
    clickID: {
      default: null
    },
    qsStatus: {
      default: null,
      type: String
    }
  },
  components: {
    FaultDesign,
    FaultSearch,
    RepairReady,
    RepairBegin
  },
  data() {
    return {
      activeName: this.qsStatus,
      isfirst: true,
      issecond: false,
      isthird: false,
      isfourth: false,
    };
  },
  watch: {
    qsStatus(val) {
      this.activeName = val;
    }
  },
  mounted() {
  },
  created() {

  },
  methods: {
    // handleClick(tab, event) {
    //   if (tab.name === "1") {
    //     this.isfirst = true;
    //     this.issecond = false;
    //     this.isthird = false;
    //     this.isfourth = false;
    //   } else if (tab.name === "2") {
    //     this.isfirst = false;
    //     this.issecond = true;
    //     this.isthird = false;
    //     this.isfourth = false;
    //   } else if (tab.name === "3") {
    //     this.isfirst = false;
    //     this.issecond = false;
    //     this.isthird = true;
    //     this.isfourth = false;
    //   } else if (tab.name === "4") {
    //     this.isfirst = false;
    //     this.issecond = false;
    //     this.isthird = false;
    //     this.isfourth = true;
    //   }
    // }
  }
};
</script>

