<template>
  <!-- <h2>安装记录</h2> -->

  <div class="main-body">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="`${$dl}敷设记录`" name="first">
        <cable-placing v-if="isfirst" />
      </el-tab-pane>
      <el-tab-pane :label="`${$dl}接头安装记录`" name="second">
        <cable-joint v-if="issecond" />
      </el-tab-pane>
      <el-tab-pane :label="`${$dl}终端安装记录`" name="third">
        <cable-terminal v-if="isthird" />
      </el-tab-pane>
      <el-tab-pane :label="`单芯${$dl}箱安装记录`" name="fourth">
        <single-cable-box v-if="isfourth" />
      </el-tab-pane>
      <el-tab-pane :label="`同轴${$dl}箱安装记录`" name="fifth">
        <coaxial-cable-box v-if="isfifth" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CablePlacing from "./Records/cable-placing";
import CableJoint from "./Records/cable-joint";
import CableTerminal from "./Records/cable-terminal";
import SingleCableBox from "./Records/single-cable-box";
import CoaxialCableBox from "./Records/coaxial-cable-box";
export default {
  name: "index",
  components: {
    CablePlacing,
    CableJoint,
    CableTerminal,
    SingleCableBox,
    CoaxialCableBox
  },
  data() {
    return {
      activeName: "first",
      isfirst: true,
      issecond: false,
      isthird: false,
      isfourth: false,
      isfifth: false
    };
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === "first") {
        this.isfirst = true;
        this.issecond = false;
        this.isthird = false;
        this.isfourth = false;
        this.isfifth = false;
      } else if (tab.name === "second") {
        this.isfirst = false;
        this.issecond = true;
        this.isthird = false;
        this.isfourth = false;
        this.isfifth = false;
      } else if (tab.name === "third") {
        this.isfirst = false;
        this.issecond = false;
        this.isthird = true;
        this.isfourth = false;
        this.isfifth = false;
      } else if (tab.name === "fourth") {
        this.isfirst = false;
        this.issecond = false;
        this.isthird = false;
        this.isfourth = true;
        this.isfifth = false;
      } else if (tab.name === "fifth") {
        this.isfirst = false;
        this.issecond = false;
        this.isthird = false;
        this.isfourth = false;
        this.isfifth = true;
      }
    }
  }
};
</script>

<style scoped>
</style>
