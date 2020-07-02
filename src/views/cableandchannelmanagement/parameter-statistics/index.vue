<template>
  <div>
    <!-- <h2>台账统计</h2> -->
    <div class="main-body">
      <div class="main-userSelect">
        <div class="searchForm_glf">
          <el-form ref="form" inline>
            <div class="tztj-select">
              <el-form-item label="统计类型：">
                <el-select v-model="from.tjlx" @change="userSelectChange">
                  <el-option
                    :label="item.label"
                    :value="item.value"
                    v-for="(item,i) in tj"
                    :key="i"
                  />
                </el-select>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="change_contant">
          <parameter-statistics-default v-if="isdefault" />   <!--台账统计-->
          <percentage-of-cable-operating-life v-if="isfirst"/>   <!--dl运行年限占比-->
          <cable-channel-operating-life-ratio v-if="issecond"/>   <!--dl通道运行年限占比-->
          <cable-accessories-operating-life-ratio v-if="isthird"/> <!--dl附件运行年限占比-->
          <changing-trend-of-cable-accessories-quantity v-if="isfourth"/> <!--近十年dl附件数量变化-->
          <cable-line-length-varies v-if="isfifth"/> <!--近十年dlxl长度变化-->
          <channel-type-statistics v-if="issixth"/> <!--通道类型统计-->
          <attachment-type-statistics v-if="isseventh"/> <!--附件类型统计-->
          <monitoring-equipment-statistics v-if="iseighth"/> <!--监测设备统计-->
          <manufacturer-statistics v-if="isninth"/> <!--生产厂家统计-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "@/styles/myStyle/index.scss";
import ParameterStatisticsDefault from "./parameter-statistics-default";
import PercentageOfCableOperatingLife from "./percentage-of-cable-operating-life";
import CableChannelOperatingLifeRatio from "./cable-channel-operating-life-ratio";
import CableAccessoriesOperatingLifeRatio from "./cable-accessories-operating-life-ratio";
import ChangingTrendOfCableAccessoriesQuantity from "./changing-trend-of-cable-accessories-quantity";
import CableLineLengthVaries from "./cable-line-length-varies";
import ChannelTypeStatistics from "./channel-type-statistics";
import AttachmentTypeStatistics from "./attachment-type-statistics";
import MonitoringEquipmentStatistics from "./monitoring-equipment-statistics";
import ManufacturerStatistics from "./manufacturer-statistics";
export default {
  data() {
    return {
      from: {
        tjlx: "default"
      },
      isdefault:true,
      isfirst: false,
      issecond: false,
      isthird: false,
      isfourth: false,
      isfifth: false,
      issixth: false,
      isseventh: false,
      iseighth: false,
      isninth: false,
      tj: [
        { label: "台账统计", value: "default" },
        { label: this.$dl + this.$xl + "运行年限占比", value: "first" },
        // { label: this.$dl + "通道运行年限占比", value: "second" },
        { label: this.$dl + "附件运行年限占比", value: "third" },
        { label: "近十年" + this.$dl + "附件数量变化趋势", value: "fourth" },
        { label: "近十年" + this.$dl + this.$xl + "长度变化", value: "fifth" },
        { label: "通道类型统计", value: "sixth" },
        { label: "附件类型统计", value: "seventh" },
        { label: "监测设备统计", value: "eighth" },
        { label: "生产厂家统计", value: "ninth" }
      ]
    };
  },
  components: {
    ParameterStatisticsDefault,
    PercentageOfCableOperatingLife,
    CableChannelOperatingLifeRatio,
    CableAccessoriesOperatingLifeRatio,
    ChangingTrendOfCableAccessoriesQuantity,
    CableLineLengthVaries,
    ChannelTypeStatistics,
    AttachmentTypeStatistics,
    MonitoringEquipmentStatistics,
    ManufacturerStatistics
  },
  created() {},
  mounted() {},
  methods: {
    /**
     * 用户下拉框变更
     */
    userSelectChange(val) {
      //console.log(val);
      if (val === "default") {
        this.isdefault = true;
        this.isfirst = false;
        this.issecond = false;
        this.isthird = false;
        this.isfourth = false;
        this.isfifth = false;
        this.issixth = false;
        this.isseventh = false;
        this.iseighth = false;
        this.isninth = false;
      } if (val === "first") {
        this.isdefault = false;
        this.isfirst = true;
        this.issecond = false;
        this.isthird = false;
        this.isfourth = false;
        this.isfifth = false;
        this.issixth = false;
        this.isseventh = false;
        this.iseighth = false;
        this.isninth = false;
      } else if (val === "second") {
        this.isdefault = false;
        this.isfirst = false;
        this.issecond = true;
        this.isthird = false;
        this.isfourth = false;
        this.isfifth = false;
        this.issixth = false;
        this.isseventh = false;
        this.iseighth = false;
        this.isninth = false;
      } else if (val === "third") {
        this.isdefault = false;
        this.isfirst = false;
        this.issecond = false;
        this.isthird = true;
        this.isfourth = false;
        this.isfifth = false;
        this.issixth = false;
        this.isseventh = false;
        this.iseighth = false;
        this.isninth = false;
      } else if (val === "fourth") {
        this.isdefault = false;
        this.isfirst = false;
        this.issecond = false;
        this.isthird = false;
        this.isfourth = true;
        this.isfifth = false;
        this.issixth = false;
        this.isseventh = false;
        this.iseighth = false;
        this.isninth = false;
      } else if (val === "fifth") {
        this.isdefault = false;
        this.isfirst = false;
        this.issecond = false;
        this.isthird = false;
        this.isfourth = false;
        this.isfifth = true;
        this.issixth = false;
        this.isseventh = false;
        this.iseighth = false;
        this.isninth = false;
      } else if (val === "sixth") {
        this.isdefault = false;
        this.isfirst = false;
        this.issecond = false;
        this.isthird = false;
        this.isfourth = false;
        this.isfifth = false;
        this.issixth = true;
        this.isseventh = false;
        this.iseighth = false;
        this.isninth = false;
      } else if (val === "seventh") {
        this.isdefault = false;
        this.isfirst = false;
        this.issecond = false;
        this.isthird = false;
        this.isfourth = false;
        this.isfifth = false;
        this.issixth = false;
        this.isseventh = true;
        this.iseighth = false;
        this.isninth = false;
      } else if (val === "eighth") {
        this.isdefault = false;
        this.isfirst = false;
        this.issecond = false;
        this.isthird = false;
        this.isfourth = false;
        this.isfifth = false;
        this.issixth = false;
        this.isseventh = false;
        this.iseighth = true;
        this.isninth = false;
      } else if (val === "ninth") {
        this.isdefault = false;
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
<style lang="scss" scoped>
</style>
