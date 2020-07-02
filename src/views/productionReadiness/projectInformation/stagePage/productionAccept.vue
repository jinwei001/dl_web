<template>
<!-- 施工验收 -->
  <div class="sub-body">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="施工交底" name="first">
        <production-sgjd v-if="isfirst" :sonOpenId="faOpenId"/>
      </el-tab-pane>
      <el-tab-pane label="土建施工" name="second">
        <production-tdjs v-if="issecond" :sonOpenId="faOpenId"/>
        
      </el-tab-pane>
      <el-tab-pane label="电气施工" name="third">
        <production-dqsg v-if="isthird" :sonOpenId="faOpenId"/>
      </el-tab-pane>
      <el-tab-pane label="试验" name="fourth">
        <production-sy v-if="isfourth" :sonOpenId="faOpenId"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ProductionSgjd from "./production-sgjd"
import ProductionTdjs from "./production-tdjs"
import ProductionDqsg from "./production-dqsg"
import ProductionSy from "./production-sy"

export default {
  name: "productionAccept",
  components: {
    ProductionSgjd,
    ProductionTdjs,
    ProductionDqsg,
    ProductionSy
  },
  data() {
    return {
      activeName: "first",
      isfirst: true,
      issecond: false,
      isthird: false,
      isfourth: false,
    };
  },
  props: {
    /**父页面传的id */
    faOpenId: {
      default: null
    },
  },
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
}
</script>

<style scoped>

</style>
