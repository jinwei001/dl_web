<template>
  <div class="main-userSelect" style="margin-top: 1rem">
    <div class="searchForm_glf">
      <el-form ref="form" inline style="display: flex;">
        <el-form-item label style="margin: 0 25px">
          <el-radio-group v-model="chooseWhichData">
            <el-radio :label="1">月数据</el-radio>
            <el-radio :label="2">年数据</el-radio>
            <!-- <el-radio :label="3">季度数据</el-radio> -->
          </el-radio-group>
        </el-form-item>
        <div v-if="chooseWhichData == 2">
          <el-form-item label="年份：">
            <!--<el-date-picker-->
            <!--v-if="chooseWhichData == 2"-->
            <!--v-model="searchList.begin"-->
            <!--type="year"-->
            <!--value-format="yyyy"-->
            <!--placeholder="选择开始年份"-->
            <!--&gt;</el-date-picker>-->
            <!--</el-form-item>-->
            <!--<span style="line-height: 45px;margin-right: 1rem;margin-left: -1.5em;">-</span>-->
            <!--<el-form-item>-->
            <!--<el-date-picker-->
            <!--v-if="chooseWhichData == 2"-->
            <!--v-model="searchList.end"-->
            <!--type="year"-->
            <!--value-format="yyyy"-->
            <!--placeholder="选择结束年份"-->
            <!--&gt;</el-date-picker>-->
            <el-date-picker
              v-model="searchList.begin"
              value-format="yyyy"
              type="year"
              clearable
              :picker-options="startDatePicker"
              placeholder="开始时间"
            ></el-date-picker>
            ~
            <el-date-picker
              v-model="searchList.end"
              value-format="yyyy"
              type="year"
              clearable
              :picker-options="endDatePicker"
              placeholder="结束时间"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div v-if="chooseWhichData == 1" style="margin-right: 2rem;">
          <label class="el-form-item__label">月份:</label>
          <el-date-picker
            v-model="mouthData.time"
            type="monthrange"
            range-separator="-"
            value-format="yyyy-MM"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
          ></el-date-picker>
        </div>
        <!-- <div v-if="chooseWhichData == 3" style="margin-right: 2rem;">
          <jidudatepicker
            ref="jidupicker"
            @chooseSeason="seasonChange"
            v-if="chooseWhichData == 3"
          />
        </div>-->
        <el-form-item style>
          <el-button class="onSearch" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-row :gutter="20" style="margin-bottom: 1rem;">
        <el-col :span="24">
          <el-card class="tz-box-card">
            <p style="line-height: 450px;" v-if="barshow==false">当前图表数据为空</p>

            <div ref="chartaa" style="height: 450px"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import columchart from "@/charts/charts/columnar_js";
import { Message as message } from "element-ui";
import info from "@/api/faultManagement/Line";
import { ExportFn } from "@/api/public";
import qs from "qs";
export default {
  data() {
    return {
      chooseWhichData: 1,
      startDatePicker: this.beginDate(), // 时间选择器
      endDatePicker: this.processDate(),
      barshow: true,
      listQuery: {},
      searchList: {},
      chart: {
        //图表实例
        dom: null,
        //X轴的数据
        xAxisData: [],
        //Y轴的数据
        legend: [],
        yAxisData_bt: [],
        yAxisData_jt: [],
        yAxisData_zd: [],
        yAxisData_blq: [],
        yAxisData_wp: [],
        yAxisData_qt: []
      },
      mouthData: {
        time: ""
      },
      searchList: {
        begin: "",
        end: ""
      },
      type: ""
    };
  },
  created() {
    ExportFn("/bzsj/list", qs.stringify({ fzmc: "故障类型" })).then(res => {
      this.chart.yAxisData = [];
      this.chart.legend = [];
      this.type = "";
      for (const k of res.data.rows) {
        this.chart.legend.push(k.bzmc);
        this.type = this.chart.legend.join();
      }
    });
  },
  mounted() {},
  methods: {
    // 时间选择器
    beginDate(){
      const self = this
      return {
        disabledDate(time){
          if (self.searchList.end) {  // 如果结束时间不为空，则小于结束时间
            return new Date(self.searchList.end).getTime() < time.getTime()
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      }
    },
    processDate() {
      const self = this
      return {
        disabledDate(time) {
          if (self.searchList.begin) {  // 如果开始时间不为空，则结束时间大于开始时间
            return new Date(self.searchList.begin).getTime() > time.getTime()
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      }
    },
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
        .getList("/cable/failureLogging/selectLXHourNum", {
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
      this.chart.servernamedata = [];
      res.forEach(element => {
        if (this.chooseWhichData == 1) {
          this.chart.xAxisData.push(element.months);
        } else {
          this.chart.xAxisData.push(element.years);
        }
        element.value.forEach((item, j) => {
          this.chart.servernamedata.push(item);
        });
      });
      var newData = this.chart.servernamedata.reduce((all, next) => {
        var a = all.filter(res => res.name == next.name);
        return a.length > 0
          ? (a[0].data.push(`${next.count}`), all)
          : [
              ...all,
              {
                name: next.name,
                data: [`${next.count}`],
                type: "bar",
                itemStyle: {
                  normal: {
                    barBorderRadius: 6
                  }
                }
              }
            ];
      }, []);
      // res.forEach(e => {
      //   //console.log(e);
      //   if (this.chooseWhichData == 1) {
      //     this.chart.xAxisData.push(e.months);
      //   } else {
      //     this.chart.xAxisData.push(e.years);
      //   }

      //   for (let k of e.value) {
      //     // //console.log(k);
      //     if (k.name === '本体故障') {
      //       this.chart.yAxisData_bt.push(k.count)
      //     } else if (k.name === '接头故障') {
      //       this.chart.yAxisData_jt.push(k.count)
      //     } else if (k.name === '终端故障') {
      //       this.chart.yAxisData_zd.push(k.count)
      //     } else if (k.name === '避雷器故障') {
      //       this.chart.yAxisData_blq.push(k.count)
      //     } else if (k.name === '外破故障') {
      //       this.chart.yAxisData_wp.push(k.count)
      //     } else if (k.name === '其他故障') {
      //       this.chart.yAxisData_qt.push(k.count)
      //     }
      //     // this.chart.legend.forEach((o, j) => {
      //     //   //console.log(o);
      //     //   //console.log(j);
      //     //   if (k.name === '本体') {
      //     //     //console.log(this.chart.yAxisData);
      //     //     this.chart.yAxisData.push(k.count)
      //     //   }
      //     // });
      //   }
      // });
      //console.log(newData);

      this.chart.dom = this.$echarts.init(this.$refs.chartaa);
      this.chart.dom.setOption(columchart);
      this.chart.dom.setOption({
        title: {
          text: "抢修时长",
          top: "5%",
          x: "center",
          textStyle: {
            align: "center",
            color: "#303133",
            fontSize: 20
          }
        },
        legend: {
          right: "2%",
          y: "center",
          orient: "vertical",
          icon: "circle",
          data: this.chart.legend
        },
        dataZoom: [{ end: (20 / 19) * 100 }],

        xAxis: {
          data: this.chart.xAxisData
        },
        series:newData
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
