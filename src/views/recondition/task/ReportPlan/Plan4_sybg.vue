<template>
  <div>
    <div class="content">
      <div v-if="type == 1" style="margin-top: 1rem">
        <button></button>
        <jlny :jobtaskid1="jobtaskid" :testreporttype="1" :isjhgl="false" />
      </div>
      <div v-if="type == 2" style="margin-top: 1rem">
        <gydyshow :jobtaskid1="jobtaskid" :testreporttype="2" :isjhgl="false" />
      </div>
      <div v-if="type == 3" style="margin-top: 1rem">
        <zldzdr :jobtaskid1="jobtaskid" :testreporttype="3" :isjhgl="false" />
      </div>
      <div v-if="type == 4" style="margin-top: 1rem">
        <zlny :jobtaskid1="jobtaskid" :testreporttype="4" :isjhgl="false" />
      </div>
      <div v-if="type == 5" style="margin-top: 1rem">
        <dlyhx :jobtaskid1="jobtaskid" :testreporttype="5" :isjhgl="false" />
      </div>
      <div v-if="type == 6" style="margin-top: 1rem">
        <jbfd :jobtaskid1="jobtaskid" :testreporttype="6" :isjhgl="false" />
      </div>
      <div v-if="type == 7" style="margin-top: 1rem">
        <whtjnc :jobtaskid1="jobtaskid" :testreporttype="7" :isjhgl="false" />
      </div>
      <div v-if="type == 8" style="margin-top: 1rem">
        <jsyhw :jobtaskid1="jobtaskid" :testreporttype="8" :isjhgl="false" />
      </div>
      <div v-if="type == 9" style="margin-top: 1rem">
        <jdxt :jobtaskid1="jobtaskid" :testreporttype="9" :isjhgl="false" />
      </div>
    </div>
  </div>
</template>

<script>
import jlny from "../Seeabout/dlxljlny";
import gydyshow from "../Seeabout/gydyshow";
import zldzdr from "../Seeabout/zldzdr";
import zlny from "../Seeabout/zlny";
import dlyhx from "../Seeabout/dlyhx";
import jbfd from "../Seeabout/jbfd";
import whtjnc from "../Seeabout/whtjnc";
import jsyhw from "../Seeabout/jsyhw";
import jdxt from "../Seeabout/jdxt";
import { postAllList } from "@/api/recondition/hc";
export default {
  components: {
    jlny,
    gydyshow,
    zldzdr,
    zlny,
    dlyhx,
    jbfd,
    whtjnc,
    jsyhw,
    jdxt
  },
  data() {
    return {
      type: this.$route.query.cc,
      jobtaskid: this.$route.query.aa
    };
  },
  methods: {
    download(type, id) {
      // type == "1"
      //   ? `${$dl}${$xl}交流耐压试验报告`
      //   : type == "2"
      //   ? `${$dl}${$xl}直流电阻、电容试验报告`
      //   : type == "3"
      //   ? `${$dl}护层电流、感应电压检测试验报告`
      //   : type == "4"
      //   ? `${$dl}${$xl}直流耐压试验报告`
      //   : type == "5"
      //   ? `${$dl}油化学分析、电气试验试验报告`
      //   : type == "6"
      //   ? `${$dl}局部放电震荡波检测试验报告`
      //   : type == "7"
      //   ? `${$dl}外护套及内衬层试验报告`
      //   : type == "8"
      //   ? `金属氧化物避雷器实验报告`
      //   : type == "9"
      //   ? `${$dl}${$xl}接地系统试验报告`
      //   : "";
      console.log("type :>> ", type);
      console.log("id :>> ", id);
      let url =
        type == "1"
          ? "/cable/jlnyReport/downReport"
          : type == "2"
          ? "/cable/hcgyReport/downReport"
          : type == "3"
          ? "/cable/zldzReport/downReport"
          : type == "4"
          ? "/cable/zlnyReport/downReport"
          : type == "5"
          ? "/cable/yhdqReport/downReport"
          : type == "6"
          ? "/cable/jbfdReport/downReport"
          : type == "7"
          ? "/cable/whtReport/downReport"
          : type == "8"
          ? "/cable/yhblReport/downReport"
          : type == "9"
          ? "/cable/jdxtReport/downReport"
          : "error";
      if (url != "error") {
        postAllList(url, { id: id })
          .then(result => {
            console.log("result :>> ", result);
            window.location.href =
              process.env.VUE_APP_BASE_API +
              "/common/downloadFile?url=" +
              result.data.msg;
            this.$message({
              message: "请稍等正在下载...",
              type: "success"
            });
          })
          .catch(err => {});
      } else {
        this.$message({
          message: "对不起，没有下载内容！！！",
          type: "warning"
        });
      }
    }
  }
};
</script>

<style>
</style>