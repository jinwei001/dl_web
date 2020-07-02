<template>
  <!-- <div>
    <h2>通道台账管理-查看</h2>
  </div>-->
  <div class="main-body">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="通道台账" name="default"></el-tab-pane>
      <el-tab-pane label="通道" name="first">
        <aisle v-if="isfirst" :childclickID="childclickID" />
      </el-tab-pane>
      <el-tab-pane :label="`${$dl}沟`" name="second">
        <cable-chute v-if="issecond" :childclickID="childclickID" />
      </el-tab-pane>
      <el-tab-pane :label="`${$dl}桥架`" name="third">
        <cable-bridge v-if="isthird" :childclickID="childclickID" />
      </el-tab-pane>
      <el-tab-pane label="排管" name="fourth">
        <shock-macaroni v-if="isfourth" :childclickID="childclickID" />
      </el-tab-pane>
      <el-tab-pane label="牵引管" name="fifth">
        <traction-tube v-if="isfifth" :childclickID="childclickID"/>
      </el-tab-pane>
      <el-tab-pane label="隧道" name="sixth">
        <tunnel v-if="issixth" :childclickID="childclickID"/>
      </el-tab-pane>
      <el-tab-pane label="综合管廊" name="seventh">
        <utility-tunnel v-if="isseventh" :childclickID="childclickID"/>
      </el-tab-pane>
      <el-tab-pane label="直埋通道" name="eighth">
        <directly-buried-channel v-if="iseighth" :childclickID="childclickID"/>
      </el-tab-pane>
      <el-tab-pane label="水平顶管" name="ninth">
        <level-of-pipe-jacking v-if="isninth" :childclickID="childclickID"/>
      </el-tab-pane>
      <el-tab-pane :label="`${$dl}竖井`" name="tenth">
        <cable-shaft v-if="istenth" :childclickID="childclickID"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Aisle from "./Seeabout/aisle";
import CableChute from "./Seeabout/cable-chute";
import CableBridge from "./Seeabout/cable-bridge";
import ShockMacaroni from "./Seeabout/shock-macaroni";
import TractionTube from "./Seeabout/traction-tube";
import Tunnel from "./Seeabout/tunnel";
import UtilityTunnel from "./Seeabout/utility-tunnel";
import DirectlyBuriedChannel from "./Seeabout/directly-buried-channel";
import LevelOfPipeJacking from "./Seeabout/level-of-pipe-jacking";
import CableShaft from "./Seeabout/cable-shaft";
export default {
  props: {
    clickID: {
      default: null
    }
  },
  components: {
    Aisle,
    CableChute,
    CableBridge,
    ShockMacaroni,
    TractionTube,
    Tunnel,
    UtilityTunnel,
    DirectlyBuriedChannel,
    LevelOfPipeJacking,
    CableShaft
  },
  data() {
    return {
      activeName: "first",
      isfirst: true,
      issecond: false,
      isthird: false,
      isfourth: false,
      isfifth: false,
      issixth: false,
      isseventh: false,
      iseighth: false,
      isninth: false,
      istenth: false,
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
        this.issixth = false;
        this.isseventh = false;
        this.iseighth = false;
        this.isninth = false;
        this.istenth = false;
      } else if (tab.name === "second") {
        this.isfirst = false;
        this.issecond = true;
        this.isthird = false;
        this.isfourth = false;
        this.isfifth = false;
        this.issixth = false;
        this.isseventh = false;
        this.iseighth = false;
        this.isninth = false;
        this.istenth = false;
      } else if (tab.name === "third") {
        this.isfirst = false;
        this.issecond = false;
        this.isthird = true;
        this.isfourth = false;
        this.isfifth = false;
        this.issixth = false;
        this.isseventh = false;
        this.iseighth = false;
        this.isninth = false;
        this.istenth = false;
      } else if (tab.name === "fourth") {
        this.isfirst = false;
        this.issecond = false;
        this.isthird = false;
        this.isfourth = true;
        this.isfifth = false;
        this.issixth = false;
        this.isseventh = false;
        this.iseighth = false;
        this.isninth = false;
        this.istenth = false;
      } else if (tab.name === "fifth") {
        this.isfirst = false;
        this.issecond = false;
        this.isthird = false;
        this.isfourth = false;
        this.isfifth = true;
        this.issixth = false;
        this.isseventh = false;
        this.iseighth = false;
        this.isninth = false;
        this.istenth = false;
      } else if (tab.name === "sixth") {
        this.isfirst = false;
        this.issecond = false;
        this.isthird = false;
        this.isfourth = false;
        this.isfifth = false;
        this.issixth = true;
        this.isseventh = false;
        this.iseighth = false;
        this.isninth = false;
        this.istenth = false;
      } else if (tab.name === "seventh") {
        this.isfirst = false;
        this.issecond = false;
        this.isthird = false;
        this.isfourth = false;
        this.isfifth = false;
        this.issixth = false;
        this.isseventh = true;
        this.iseighth = false;
        this.isninth = false;
        this.istenth = false;
      } else if (tab.name === "eighth") {
        this.isfirst = false;
        this.issecond = false;
        this.isthird = false;
        this.isfourth = false;
        this.isfifth = false;
        this.issixth = false;
        this.isseventh = false;
        this.iseighth = true;
        this.isninth = false;
        this.istenth = false;
      } else if (tab.name === "ninth") {
        this.isfirst = false;
        this.issecond = false;
        this.isthird = false;
        this.isfourth = false;
        this.isfifth = false;
        this.issixth = false;
        this.isseventh = false;
        this.iseighth = false;
        this.isninth = true;
        this.istenth = false;
      } else if (tab.name === "tenth") {
        this.isfirst = false;
        this.issecond = false;
        this.isthird = false;
        this.isfourth = false;
        this.isfifth = false;
        this.issixth = false;
        this.isseventh = false;
        this.iseighth = false;
        this.isninth = false;
        this.istenth = true;
      }
    }
  }
};
</script>

