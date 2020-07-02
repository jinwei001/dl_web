<template>
  <div class="xs-hastitle">
    <el-dialog
      :visible.sync="showDialog"
      v-dialogDrag
      :center="true"
      width="50%"
      :before-close="handleClose"
    >
      <div style="width:50%;margin: 0 auto">
        <el-select v-model="choose" clearable placeholder="请选择">
          <el-option
            v-for="item in selection.sybg"
            :key="item.bzid"
            :label="item.bzmc"
            :value="item.bzid"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </div>
      <div v-if="choose == 1" style="margin-top: 1rem">
        <jlny @childFn="parentFn" :jobtaskid1="jobtaskid" :testreporttype="1" :xlmcFn="xlmcFn" :xlidFn="xlidFn"/>
      </div>
      <div v-if="choose == 2" style="margin-top: 1rem">
        <gydyshow @childFn="parentFn" :jobtaskid1="jobtaskid" :testreporttype="2" :xlmcFn="xlmcFn" :xlidFn="xlidFn"/>
      </div>
      <div v-if="choose == 3" style="margin-top: 1rem">
        <zldzdr @childFn="parentFn" :jobtaskid1="jobtaskid" :testreporttype="3" :xlmcFn="xlmcFn" :xlidFn="xlidFn"/>
      </div>
      <div v-if="choose == 4" style="margin-top: 1rem">
        <zlny @childFn="parentFn" :jobtaskid1="jobtaskid" :testreporttype="4" :xlmcFn="xlmcFn" :xlidFn="xlidFn"/>
      </div>
      <div v-if="choose == 5" style="margin-top: 1rem">
        <dlyhx @childFn="parentFn" :jobtaskid1="jobtaskid" :testreporttype="5" :xlmcFn="xlmcFn" :xlidFn="xlidFn"/>
      </div>
      <div v-if="choose == 6" style="margin-top: 1rem">
        <jbfd @childFn="parentFn" :jobtaskid1="jobtaskid" :testreporttype="6" :xlmcFn="xlmcFn" :xlidFn="xlidFn"/>
      </div>
      <div v-if="choose == 7" style="margin-top: 1rem">
        <whtjnc @childFn="parentFn" :jobtaskid1="jobtaskid" :testreporttype="7" :xlmcFn="xlmcFn" :xlidFn="xlidFn"/>
      </div>
      <div v-if="choose == 8" style="margin-top: 1rem">
        <jsyhw @childFn="parentFn" :jobtaskid1="jobtaskid" :testreporttype="8" :xlmcFn="xlmcFn" :xlidFn="xlidFn"/>
      </div>
      <div v-if="choose == 9" style="margin-top: 1rem">
        <jdxt @childFn="parentFn" :jobtaskid1="jobtaskid" :testreporttype="9" :xlmcFn="xlmcFn" :xlidFn="xlidFn"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import jlny from "./dlxljlny";
import gydyshow from "./gydyshow";
import zldzdr from "./zldzdr";
import zlny from "./zlny";
import dlyhx from "./dlyhx";
import jbfd from "./jbfd";
import whtjnc from "./whtjnc";
import jsyhw from "./jsyhw"
import jdxt from "./jdxt"
export default {
  components: { jlny, gydyshow, zldzdr, zlny, dlyhx, jbfd, whtjnc,jsyhw ,jdxt},
  props: {
    jobtaskid: "",
    testreporttype: "",
    xlmc: '',
    xlid: ''
  },
  data() {
    return {
      jobtaskid1: this.jobtaskid,
      showDialog: true,
      type: this.testreporttype, // 试验类型
      xlidFn: this.xlid,
      xlmcFn: this.xlmc,
      choose: 1,
      selection: {
        sybg: [
          {
            bzmc: "电缆线路交流耐压试验报告",
            bzid: 1,
            disabled: false
          },
          {
            bzmc: "电缆护层电流、感应电压检测试验报告",
            bzid: 2,
            disabled: false
          },
          {
            bzmc: "电缆线路直流电阻、电容试验报告",
            bzid: 3,
            disabled: false
          },
          {
            bzmc: "电缆线路直流耐压试验报告",
            bzid: 4,
            disabled: false
          },
          {
            bzmc: "电缆油化学分析、电气试验试验报告",
            bzid: 5,
            disabled: false
          },
          {
            bzmc: "电缆局部放电振荡波检测试验报告",
            bzid: 6,
            disabled: false
          },
          {
            bzmc: "电缆外护套及内衬层试验报告",
            bzid: 7,
            disabled: false
          },
          {
            bzmc: "金属氧化物避雷器试验报告",
            bzid: 8,
            disabled: false
          },
          {
            bzmc: "电缆线路接地系统试验报告",
            bzid: 9,
            disabled: false
          }
        ]
      }
    };
  },
  mounted() {
    console.log(this.type, 1111)
    if (this.type) {
      this.choose = Number(this.type);
      this.selection.sybg.forEach(item => {
        item.disabled = true
      })
    } else {
      this.choose == 1;
    }
  },
  methods: {
    /**
     * 取消按钮
     */
    handleClose() {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.$emit("childFn", {
            showDialog: false
          });
        })
        .catch(_ => {});
    },
    parentFn(val) {
      this.showDialog = false;
      this.$emit("childFn", {
        showDialog: false
      });
    },
    getData() {
      this.$parent.getData()
    }
  }
};
</script>

<style>
</style>