<template>
  <!-- 该组件为状态周期新增和编辑共用组件 周期新增和编辑弹出 -->
  <div v-if="dialogParameterpg.showDialog===true" class="single-row-title">
    <el-dialog v-dialogDrag :visible.sync="dialogParameterpg.showDialog" :title="dialogParameterpg.title" :center="true"
      :before-close="handleClose" :width="dialogParameterpg.dialogWidth">

      <div style="padding: 20px;">
        <el-tabs v-model="activeName">
    <!--  <el-tab-pane lazy label="设备评价列表" name="one">
            <equipment-evaluation-list />
          </el-tab-pane> -->
          <el-tab-pane lazy label="设备评价信息" name="two">
            <equipment-evaluation-info :dialogParameterpgb='dialogParameterpg'/>
          </el-tab-pane>
          <el-tab-pane lazy label="设备警告信息" name="three">
            <device-warning-info :dialogParameterpgb='dialogParameterpg'/>
          </el-tab-pane>
          <el-tab-pane lazy label="状态量历史信息" name="four">
          <state-history-info :dialogParameterpgb='dialogParameterpg'/>
          </el-tab-pane>
          <el-tab-pane lazy label="历史评价报告" name="fives">
            <historical-evaluation-report :dialogParameterpgb='dialogParameterpg'/>
          </el-tab-pane>
          <el-tab-pane lazy label="设备履历" name="six" >
            <equipment-resume :dialogParameterpgb='dialogParameterpg'/>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import DeviceWarningInfo from './tabs/Device-warning_info.vue' //设备警告信息
  import EquipmentEvaluationInfo from './tabs/Equipment-evaluation_info.vue' //设备评价信息
  import EquipmentEvaluationList from './tabs/Equipment-evaluation_list.vue' //设备评价列表
  import EquipmentResume from './tabs/Equipment-resume.vue' //设备履历
  import HistoricalEvaluationReport from './tabs/Historical-evaluation_report.vue' //历史评价报告
  import StateHistoryInfo from './tabs/State-history_info.vue' //状态量历史信息
  import qs from 'qs'
  export default {
    components: {
      Pagination,
      DeviceWarningInfo,
      EquipmentEvaluationInfo,
      EquipmentEvaluationList,
      EquipmentResume,
      HistoricalEvaluationReport,
      StateHistoryInfo,
    },
    props: {
      /**
       * 接收是否打开页面
       */
      dialogParameterpg: {
        type: Object,
        default: function() {
          return {

          }
        }
      }
    },
    data() {
      return {
        activeName: 'two',
      }
    },
    watch: {

    },
    created: function() {},
    mounted() {
       this.Details = this.dialogParameterpg.Details
       this.Details.starts=2
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.$emit('childFn', {
              showDialog: false
            })
            done()
          })
          .catch(_ => {})
      }
    }
  }
</script>
<style lang="scss">

</style>
