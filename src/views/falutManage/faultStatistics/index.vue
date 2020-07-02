<template>
  <!-- <div>
    <h2>故障统计</h2>
  </div>-->
  <div class="main-body">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="`抢修${$xl}`" name="first">
        <repair-line v-if="isfirst" />
      </el-tab-pane>
      <el-tab-pane label="故障部件" name="second">
        <fault-parts v-if="issecond" />
      </el-tab-pane>
      <el-tab-pane label="故障类型" name="third">
        <fault-type v-if="isthird" />
      </el-tab-pane>
      <el-tab-pane label="故障原因" name="fourth">
        <reason-analysis v-if="isfourth" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getUserId } from "@/utils/auth";

import RepairLine from './repairLine'
import FaultParts from './faultParts'
import FaultType from './faultType'
import ReasonAnalysis from './reasonAnalysis'

export default {
  components: {
    RepairLine,
    FaultParts,
    FaultType,
    ReasonAnalysis
  },
  data() {
    return {
      activeName: 'first',
      isfirst: true,
      issecond: false,
      isthird: false,
      isfourth: false,
    };
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      if (tab.name === "first") {
        this.isfirst = true;
        this.issecond = false;
        this.isthird = false;
        this.isfourth = false;
      } else if (tab.name === "second") {
        this.isfirst = false;
        this.issecond = true;
        this.isthird = false;
        this.isfourth = false;
      } else if (tab.name === "third") {
        this.isfirst = false;
        this.issecond = false;
        this.isthird = true;
        this.isfourth = false;
      } else if (tab.name === "fourth") {
        this.isfirst = false;
        this.issecond = false;
        this.isthird = false;
        this.isfourth = true;
      }
    }
  }
};
</script>

