<template>
  <!-- <div>
    <h2>通道附属设施-查看</h2>
  </div>-->
  <div class="main-body">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="通道附属设施" name="default"></el-tab-pane>
      <el-tab-pane :label="`${$dl}防火墙`" name="first">
        <cable-firewall v-if="isfirst" :childclickID="childclickID" />
      </el-tab-pane>
      <el-tab-pane label="检查井/工井" name="second">
        <check-well-or-work-well v-if="issecond" :childclickID="childclickID" />
      </el-tab-pane>
      <el-tab-pane label="隧道门" name="third">
        <portal v-if="isthird" :childclickID="childclickID" />
      </el-tab-pane>
      <el-tab-pane label="`${$dl}终端站`" name="fourth">
        <cable-terminal v-if="isfourth" :childclickID="childclickID" />
      </el-tab-pane>
      <el-tab-pane label="通风口" name="fifth">
        <ventilator-scoop v-if="isfifth" :childclickID="childclickID" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CableFirewall from "../access-accessory-two/access-accessory-view/cable-firewall";
import CheckWellOrWorkWell from "../access-accessory-two/access-accessory-view/check-well-or-work-well";
import Portal from "../access-accessory-two/access-accessory-view/portal";
import CableTerminal from "../access-accessory-two/access-accessory-view/cable-terminal";
import VentilatorScoop from "../access-accessory-two/access-accessory-view/ventilator-scoop";

export default {
  props: {
    clickID: {
      default: null
    }
  },
  components: {
    CableFirewall,
    CheckWellOrWorkWell,
    Portal,
    CableTerminal,
    VentilatorScoop
  },
  data() {
    return {
      activeName: "first",
      isfirst: true,
      issecond: false,
      isthird: false,
      isfourth: false,
      isfifth: false,

      childclickID: this.clickID
    };
  },

  methods: {
    handleClick(tab, event) {
      if (tab.name === "default") {
        // location.reload();
         this.$emit("childFn1", {
          back: true
        });
        // this.$router.replace({
        //   path: "/cableandchannelmanagement/kong"
        // });
      } else if (tab.name === "first") {
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

