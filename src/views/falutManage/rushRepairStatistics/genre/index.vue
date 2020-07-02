<template>
  <!-- <h2>故障类型</h2> -->
  <div>
    <div class="main-body">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="抢修时长" name="first">
          <hoursH v-if="isfirst" />
        </el-tab-pane>
        <el-tab-pane label="抢修人数" name="second">
          <peopleP v-if="issecond" />
        </el-tab-pane>
        <el-tab-pane label="抢修资源数" name="third">
          <reasultR v-if="isthird" />
        </el-tab-pane>
      </el-tabs>
     </div>
  </div>
</template>

<script>
import hoursH from "./hours";
import peopleP from "./people";
import reasultR from "./reasult";
export default {
  components: {
    hoursH,
    peopleP,
    reasultR
  },
  data() {
    return {
      activeName: "first",
      isfirst: true,
      issecond: false,
      isthird: false,
      isfourth: false
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

<style scoped>
</style>
