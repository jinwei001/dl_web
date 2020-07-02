<!--抢修xl-->
<template>
  <div class="main-userSelect">
    <div class="searchForm_glf">
      <el-form ref="form" inline style="display: flex;">
        <el-form-item label style="margin: 0 25px">
          <el-radio-group v-model="chooseWhichData">
            <el-radio :label="1">月数据</el-radio>
            <el-radio :label="2">年数据</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="chooseWhichData == 2">
          <el-form-item label="年份：">
            <el-date-picker
              v-if="chooseWhichData == 2"
              v-model="searchList.begin"
              type="year"
              :picker-options="startDatePicker"
              value-format="yyyy"
              placeholder="选择开始年份"
            ></el-date-picker>
          </el-form-item>
          <span style="line-height: 45px;margin-right: 1rem;margin-left: -1.5em;">至</span>
          <el-form-item>
            <el-date-picker
              v-if="chooseWhichData == 2"
              v-model="searchList.end"
              :picker-options="endDatePicker"
              type="year"
              value-format="yyyy"
              placeholder="选择结束年份"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div v-if="chooseWhichData == 1" style="margin-right: 2rem;">
          <label class="el-form-item__label">月份:</label>
          <el-date-picker
            v-if="chooseWhichData == 1"
            v-model="mouthData.time"
            type="monthrange"
            range-separator="至"
            value-format="yyyy-MM"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
          ></el-date-picker>
        </div>
        <el-form-item style>
          <el-button class="onSearch" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-row :gutter="20" style="margin-bottom: 1rem;">
        <el-col :span="24">
          <el-card class="tz-box-card">
            <div ref="chartaa" style="height: 450px"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Lineecharts from "@/charts/charts/Line";
import { Message as message } from "element-ui";
import info from "@/api/faultManagement/Line";
export default {
  data() {
    return {
      chooseWhichData: 1,
      startDatePicker: this.beginDate(), // 时间选择器
      endDatePicker: this.processDate(),
      barshow: false,
      chart: {
        //图表实例
        dom: null,
        //X轴的数据
        xAxisData: [],
        //Y轴的数据
        legend: [
          this.$dl+"室",
          "外力破坏",
          "火灾",
          this.$dl+"本体",
          this.$dl+"附件",
          "用户原因",
          this.$jk + this.$xl+"设备",
          "变电设备原因",
          "原因不明",
          "偷盗",
          "其他"
        ],
        yAxisData: [
          {
            data: []
          },
          {
            data: []
          },
          {
            data: []
          },
          {
            data: []
          }
        ]
      },
      mouthData: {
        time: ""
      },
      searchList: {
        begin: "",
        end: ""
      },
      type:this.$dl+"室,外力破坏,火灾,"+this.$dl+"本体,"+this.$dl+"附件,用户原因,"+this.$jk+this.$xl+"设备,变电设备原因,原因不明,偷盗,其他"
    };
  },
  mounted() {},
  methods: {
    // 时间选择器
    beginDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.searchList.end) {
            // 如果结束时间不为空，则小于结束时间
            return new Date(self.searchList.end).getTime() < time.getTime();
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      };
    },
    processDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.searchList.begin) {
            // 如果开始时间不为空，则结束时间大于开始时间
            return new Date(self.searchList.begin).getTime() > time.getTime();
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      };
    },
    /**
     * 初始化页面内容
     */
    initContent() {},
    onSearch() {
      this.renderContent();
    },
    /**
     * 渲染页面内容
     */
    renderContent() {
      var begintime = "";
      var endtime = "";
      if (this.chooseWhichData == 1) {
        begintime = this.mouthData.time[0];
        endtime = this.mouthData.time[1];
      } else if (this.chooseWhichData == 2) {
        begintime = this.searchList.begin;
        endtime = this.searchList.end;
      }
      if (
        (begintime == null && endtime == null) ||
        (begintime == "" && endtime == "")
      ) {
        message.error("请选择日期");
        return;
      }
      info
        .getList("/cable/failureLogging/selectYYnum", {
          begin: begintime,
          end: endtime,
          types: this.type
        })
        .then(res => {
          //console.log(res);
          let data = res.data;
          if (data.code == 0) {
            this.renderChart(data.data);
          } else {
            message.error("数据异常 " + data.msg);
          }
        })
        .catch(err => {
          //console.log(err);
          message.error("异常 " + err);
        });
    },

    /**
     * 创建图表实例
     */
    renderChart(res) {
      //把之前的数据清空
      this.chart.xAxisData = [];
      this.chart.yAxisData = [];
      this.chart.legend.forEach((el, index) => {
        let yadate = {
          name: el,
          data: []
        };
        this.chart.yAxisData.push(yadate);
      });
      res.forEach(e => {
        if (this.chooseWhichData == 1) {
          this.chart.xAxisData.push(e.months);
        } else {
          this.chart.xAxisData.push(e.years);
        }
        for (let k of e.value) {
          this.chart.legend.forEach((o, j) => {
            if (k.name === o) {
              this.chart.yAxisData[j].data.push(k.count);
            }
          });
        }
      });

      this.chart.dom = this.$echarts.init(this.$refs.chartaa);
      this.chart.dom.setOption(Lineecharts);
      //渲染图表
      this.chart.dom.setOption({
        title: {
          text: ""
        },
        legend: {
          right: "2%",
          y: "center",
          orient: "vertical",
          icon: "circle",
          data: this.chart.legend
        },
        xAxis: [
          {
            data: this.chart.xAxisData
          }
        ],
        yAxis: [
          {
            name: ""
          }
        ],
        series: this.chart.yAxisData
      });
    },
    /**
     * 获取相关信息
     * @param data 查询参数
     */
    getList(data) {
      List("/cable/failureLogging/selectBJHourNum", data)
        .then(res => {
          //console.log(res);
        })
        .catch(err => {
          //console.log(err);
          message.error("异常 " + err);
        });
    }
  }
};
</script>
<style lang="scss" scope>
.searchForm_glf {
  width: 100%;
  margin-bottom: 12px;
  background: white;
}
.charts_ind {
  width: 100%;
  min-height: 730px;
  margin-bottom: 12px;
  background: white;
  position: absolute;
  padding: 1px 15px;

  .table_top {
    height: 50px;

    span {
      font-size: 16px;
      font-weight: 600;
      line-height: 50px;
      margin-right: 20px;
    }
  }
}
</style>
