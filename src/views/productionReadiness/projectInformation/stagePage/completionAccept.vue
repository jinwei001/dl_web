<template>
  <!-- 竣工验收 -->
  <div class="sub-body">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="土建验收" name="first">
        <ChannelAcceptance v-if="isfirst" :sonOpenId="faOpenId" />
      </el-tab-pane>
      <el-tab-pane label="电气验收" name="four">
        <ElectricalAcceptance v-if="isfour" :sonOpenId="faOpenId" />
      </el-tab-pane>
      <el-tab-pane label="竣工验收" name="three">
        <completion-jgyj v-if="isthree" :sonOpenId="faOpenId" />
      </el-tab-pane>
       <el-tab-pane label="安装记录" name="Fives">
        <InstallationRecord v-if="isFives" :sonOpenId="faOpenId" />
      </el-tab-pane>
      <!-- <el-tab-pane label="资料管理" name="second">
        <completion-zlgl v-if="issecond" :sonOpenId="faOpenId" />
      </el-tab-pane>      -->
    </el-tabs>
  </div>
</template>

<script>
import CompletionJgyj from './completion_jgyj'
import CompletionZlgl from './completion_zlgl'
import ChannelAcceptance from './ChannelAcceptance'
import ElectricalAcceptance from './ElectricalAcceptance'
import InstallationRecord from './InstallationRecord'
export default {
  name: 'CompletionAccept',
  components: {
    CompletionJgyj,
    CompletionZlgl,
    ChannelAcceptance,
    ElectricalAcceptance,
    InstallationRecord
  },
  props: {
     /**父页面传的id */
    faOpenId: {
      default: null
    },
  },
  data() {
    return {
      activeName: 'first',
      isfirst: true,
      issecond: false,
      isthree: false,
      isfour: false,
      isFives: false
    }
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === 'first') {
        this.isfirst = true
        this.issecond = false
        this.isthree = false
        this.isfour = false
        this.isFives = false
      } else if (tab.name === 'second') {
        this.isfirst = false
        this.issecond = true
        this.isthree = false
        this.isfour = false
        this.isFives = false
      } else if (tab.name === 'three') {
        this.isfirst = false
        this.issecond = false
        this.isthree = true
        this.isfour = false
        this.isFives = false
      } else if (tab.name === 'four') {
        this.isfirst = false
        this.issecond = false
        this.isthree = false
        this.isfour = true
        this.isFives = false
      } else if (tab.name === 'Fives') {
        this.isfirst = false
        this.issecond = false
        this.isthree = false
        this.isfour = false
        this.isFives = true
      }
    }
  }
}
</script>

<style scoped>

</style>
