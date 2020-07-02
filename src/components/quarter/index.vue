<template>
  <!-- 季度选择时间控件 -->
  <div class="jidudatepicker">
    <span>
      <mark
        style="position:fixed;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,0);z-index:999;"
        v-show="showSeason"
        @click.stop="showSeason=false"
      ></mark>
      <el-input
        placeholder="选择季度"
        v-model="showValue"
        style="width:11rem;height: 0.36rem;line-height: 0.36rem;"
        @focus="showSeason=true"
        clearable
      >
        <i slot="prefix" class="el-input__icon el-icon-date"></i>
      </el-input>
      <el-card
        class="box-card"
        style="width:322px;padding: 0 3px 20px;margin-top:10px;position:fixed;z-index:9999"
        v-show="showSeason"
      >
        <div slot="header" class="firstBtn">
          <button
            type="button"
            aria-label="前一年"
            class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"
            @click="prev"
          ></button>
          <span role="button" class="el-date-picker__header-label">{{year}}年</span>
          <button
            type="button"
            aria-label="后一年"
            @click="next"
            class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"
          ></button>
        </div>
        <div class="text container">
          <!-- 如下，绑定class,disabled为禁止选择的时间的设置 -->
          <el-button
            type="text"
            size="medium"
            :class="{'colorDis': this.year === this.beforeyear && this.season <= 1 || this.year > this.defaultyear}"
            style="width:47%;color: #606266;float:left;"
            @click="selectSeason(0)"
          >第一季度</el-button>
          <el-button
            type="text"
            size="medium"
            :class="{'colorDis': this.year === this.beforeyear && this.season <= 2 || this.year > this.defaultyear}"
            style="float:right;width:47%;color: #606266;"
            @click="selectSeason(1)"
          >第二季度</el-button>
        </div>
        <div class="item container" style="text-align:center;">
          <el-button
            type="text"
            size="medium"
            :class="{'colorDis': this.year === this.beforeyear && this.season <= 3 || this.year > this.defaultyear}"
            style="width:47%;color: #606266;float:left;"
            @click="selectSeason(2)"
          >第三季度</el-button>
          <el-button
            type="text"
            size="medium"
            :class="{'colorDis': this.year === this.beforeyear && this.season <= 4 || this.year > this.defaultyear}"
            style="float:right;width:47%;color: #606266;"
            @click="selectSeason(3)"
          >第四季度</el-button>
        </div>
      </el-card>
    </span>
  </div>
</template>
<script>
export default {
  name: "jududatepicker",
  props: {
    valueArr: {
      default: () => {
        return ["01-03", "04-06", "07-09", "10-12"];
      },
      type: Array
    },
    getValue: {
      default: val => {
        return val;
      },
      type: Function
    }
    // defaultValue: {
    //   // 默认值 201904-201906
    //   default: "",
    //   type: String
    // }
  },
  data() {
    return {
      showSeason: false,
      season: "",
      year: new Date().getFullYear(), // input显示时间，会随着用户操作改变
      defaultyear: new Date().getFullYear(), // 当前年份，不变
      month: new Date().getMonth() + 1, // 当前月份，不变
      showValue: "",
      beforeyear: null // 默认显示上一季度所用时间，可能是去年
    };
  },
  created() {
   
  },
  mounted() {
    this.getDefaultTime();
  },
  watch: {
    
  },
  methods: {
    one() {
      this.showSeason = false;
    },
    prev() {
      this.year = this.year * 1 - 1;
    },
    next() {
      this.year = this.year * 1 + 1;
    },
    selectSeason(i) {
      let that = this;
      that.season = i + 1;
      let arr = that.valueArr[i].split("-");
      let seasonValue = that.getValue(that.year + "-" + arr[0] + "-" + "01");
      that.showSeason = false;
      this.showValue = `${this.year} 年 ${this.season} 季度`;
      that.$emit("chooseSeason", seasonValue); // 每次选择时间都将当前选择时间发送到父组件
    },
    reset() {
      // 季度重置 上一季度
      this.getDefaultTime();
    },
    getDefaultTime() {
      // 获取默认的上一个季度
      var year = this.defaultyear;
      var month = this.month;
      var season = null;
      if (month <= 3) {
        this.season = 1;
        year -= 1;
        season = 4;
        this.beforeyear = year;
      } else if (month > 3 && month <= 6) {
        this.season = 2;
        season = 1;
        this.beforeyear = year;
      } else if (month > 6 && month <= 9) {
        this.season = 3;
        season = 2;
        this.beforeyear = year;
      } else if (month > 9 && month <= 12) {
        this.season = 4;
        season = 3;
        this.beforeyear = year;
      }
      this.showValue = `${year} 年 ${season} 季度`;
    }
  }
};
</script>

<style lang="scss" scoped>
.jidudatepicker {
  .firstBtn {
    height: 30px;
    line-height: 34px;
    width: 100%;
    text-align: center;
  }
  .text {
    text-align: center;
    margin: 15px 0 10px;
  }
  .item {
    text-align: center;
  }
}

</style>
<style lang="scss">
.jidudatepicker {
  .el-card__header {
    padding: 12px;
  }
  span.el-input__suffix-inner{
      position: relative;
      top:0.9em;
  }
}
</style>