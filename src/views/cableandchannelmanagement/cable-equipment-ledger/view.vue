<template>
  <!-- <div>
    <h2dl设备台账-查看</h2>
  </div>-->
  <div class="main-body">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="`${$dl}设备台账`" name="default"></el-tab-pane>
      <el-tab-pane :label="`${$xl}台账`" name="first">
        <Lineparameter v-if="isfirst" :childclickID="childclickID" :zhpjobjpgc='zhpjobjpgb'/>
      </el-tab-pane>
      <el-tab-pane :label="`${$dl}`" name="second">
        <Cable v-if="issecond" :childclickID="childclickID" :zhpjobjpgc='zhpjobjpgb'/>
      </el-tab-pane>
      <el-tab-pane :label="`${$dl}段`" name="third">
        <Cablesection v-if="isthird" :childclickID="childclickID" :zhpjobjpgc='zhpjobjpgb'/>
      </el-tab-pane>
      <el-tab-pane :label="`${$dl}接头`" name="fourth">
        <Cablejoint v-if="isfourth" :childclickID="childclickID" :zhpjobjpgc='zhpjobjpgb'/>
      </el-tab-pane>
      <el-tab-pane :label="`${$dl}终端`" name="fifth">
        <Cableterminal v-if="isfifth" :childclickID="childclickID" :zhpjobjpgc='zhpjobjpgb'/>
      </el-tab-pane>
      <el-tab-pane :label="`${$dl}避雷器`" name="sixth">
        <Cablearrester v-if="issixth" :childclickID="childclickID" :zhpjobjpgc='zhpjobjpgb'/>
      </el-tab-pane>
      <el-tab-pane :label="`${$dl}接地箱`" name="seventh">
        <cable-earthing-box v-if="isseventh" :childclickID="childclickID" :zhpjobjpgc='zhpjobjpgb'/>
      </el-tab-pane>
      <el-tab-pane :label="`${$dl}交叉互连箱`" name="eighth">
        <cable-cross-connection-box v-if="iseighth" :childclickID="childclickID" :zhpjobjpgc='zhpjobjpgb'/>
      </el-tab-pane>
      <el-tab-pane :label="`${$dl}分支箱`" name="ninth">
        <cable-branch-box v-if="isninth" :childclickID="childclickID" :zhpjobjpgc='zhpjobjpgb'/>
        <!-- {{userId}} -->
        <!-- {{$store.state.user.userId}} -->
        <!-- {{userId2}} -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getUserId } from "@/utils/auth";

import Lineparameter from "./Seeabout/Line-parameter";
import Cable from "./Seeabout/Cable";
import Cablesection from "./Seeabout/Cable-section";
import Cablejoint from "./Seeabout/Cable-joint";
import Cableterminal from "./Seeabout/cable-terminal";
import Cablearrester from "./Seeabout/cable-arrester";
import CableEarthingBox from "./Seeabout/cable-earthing-box";
import CableCrossConnectionBox from "./Seeabout/cable-cross-connection-box";
import CableBranchBox from "./Seeabout/cable-branch-box";
export default {
  props: {
    clickID: {
      default: null
    },
   zhpjobjpgb: {
     type: Object,
     default: function() {
     return {

     }
   }}
  },
  components: {
    Lineparameter,
    Cable,
    Cablesection,
    Cablejoint,
    Cableterminal,
    Cablearrester,
    CableEarthingBox,
    CableCrossConnectionBox,
    CableBranchBox
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
      childclickID: this.clickID,
      userId: null,
      userId2:null
    };
  },
  mounted() {
    this.userId = getUserId();
    this.userId2 = this.$store.state.user.userId
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === "default") {
        // //console.log("111");
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
      }
    }
  }
};
</script>
