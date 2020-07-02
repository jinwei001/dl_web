<template>
  <div class="main-body">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="工程信息" name="default"></el-tab-pane>
      <el-tab-pane label="可研审查" name="first">
        <feasibility-research v-if="isfirst" :faOpenId="openID" />
      </el-tab-pane>
      <el-tab-pane label="初设审查" name="second">
        <first-founded v-if="issecond" :faOpenId="openID" />
      </el-tab-pane>
      <el-tab-pane label="施工图审查" name="third">
        <production-drawing v-if="isthird" :faOpenId="openID" />
      </el-tab-pane>
      <el-tab-pane label="施工验收" name="fourth">
        <production-accept v-if="isfourth" :faOpenId="openID" />
      </el-tab-pane>
      <el-tab-pane label="竣工验收" name="fifth">
        <completion-accept v-if="isfifth" :faOpenId="openID" />
      </el-tab-pane>
    </el-tabs>
    <!-- <div>
      {{this.$route.params.id}}
    </div>-->
  </div>
</template>

<script>
import FeasibilityResearch from "./stagePage/feasibilityResearch"; // 可研审查
import FirstFounded from "./stagePage/firstFounded"; // 初设审查
import ProductionDrawing from "./stagePage/productionDrawing"; // 施工图审查
import ProductionAccept from "./stagePage/productionAccept"; // 施工验收
import CompletionAccept from "./stagePage/completionAccept"; // 竣工验收

export default {
  components: {
    FeasibilityResearch,
    FirstFounded,
    ProductionDrawing,
    ProductionAccept,
    CompletionAccept
  },
  props: {
    /**父页面传的id */
    openID: {
      default: null
    }
  },
  data() {
    return {
      activeName: "first",
      isfirst: true,
      issecond: false,
      isthird: false,
      isfourth: false,
      isfifth: false,
      faOpenId: this.openID // 父页面传过来的数据id
    };
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === "default") {
        // location.reload()
        this.$emit("childFn1", {
          back: true
        });
        // this.$router.replace({
        //   path: "/cableandchannelmanagement/kong"
        // });
      } else if (tab.name === "first") {
        //console.log(this.faOpenId);
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

