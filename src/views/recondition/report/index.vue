<template>
  <!-- <div>
    <h2报告验收</h2>
  </div>-->
  <div class="main-body">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="试验报告验收" name="first">
        <testReport v-if="isfirst"/>
      </el-tab-pane>
      <el-tab-pane label="检修报告验收" name="second">
        <maintenanceReport v-if="issecond" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import testReport from "./seeabout/testReport";
import maintenanceReport from "./seeabout/maintenanceReport";
export default {
  components: {
    testReport,
    maintenanceReport
  },
  data() {
    return {
      activeName: "first",
      isfirst: true,
      issecond: false
    };
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      if (tab.name === "default") {
        this.$emit("childFn1", {
          back: true
        });
      } else if (tab.name === "first") {
        this.isfirst = true;
        this.issecond = false;
      } else if (tab.name === "second") {
        this.isfirst = false;
        this.issecond = true;
      }
    }
  }
};
</script>

