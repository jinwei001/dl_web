<template>
  <div class="my-container">
    <div class="bgImg">
    <!-- <div class="banner">
      <div class="left">
        <div class="left-title">
          <input type="text">
          <button class="el-icon-search" />
        </div>
        <div class="left-list">
          <el-tree
            ref="tree2"
            :data="TreeList"
            node-key="id"
            :props="props"
            :render-after-expand="true"
            class="tree"
            @node-click="handleNodeClick"
          />
        </div>
      </div>
      <div id="allmap" class="zhong" />
      <div class="right">
        <div class="right-work">
          <div class="work-title">今日工作</div>
          <div class="work-content">
            <div v-for="(item,index) in 7" :key="index" class="workItem">
              <div class="workItem-i" />
              <div class="workItem-text" :title="132">生产项目验收: 233</div>
            </div>
          </div>
        </div>
        <div class="right-zhong">
          <div v-for="(item,index) in voltageArr" :key="index" class="zhong-cable cable1">
            <div
              v-if="item.voltageRank== ('220' + this.$qf) && item.voltageRank!= null"
              class="leftTop-text"
            >220{{ $qf }}</div>
            <div
              v-if="item.voltageRank== ('110' + this.$qf) && item.voltageRank!= null"
              class="leftTop-text"
            >110{{ $qf }}</div>
            <div
              v-if="item.voltageRank== ('35' + this.$qf) && item.voltageRank!= null"
              class="leftTop-text"
            >35{{ $qf }}</div>
            <img
              v-if="item.voltageRank== ('220' +this.$qf) && item.voltageRank!= null"
              class="left-top"
              src="../../icons/static/yellow.png"
              alt
            >
            <img
              v-if="item.voltageRank== ('110' + this.$qf) && item.voltageRank!= null"
              class="left-top"
              src="../../icons/static/green.png"
              alt
            >
            <img
              v-if="item.voltageRank== ('35' + this.$qf) && item.voltageRank!= null"
              class="left-top"
              src="../../icons/static/blue.png"
              alt
            >
            <div class="cable-left">
              <div class="cableImg">
                <img src="../../icons/static/line.png" alt>
              </div>
              <div class="cableNum">
                <div>{{ item.count }}</div>
                <div>{{ $dl }}{{ $xl }}条数</div>
              </div>
            </div>
            <div class="cable-left">
              <div class="cableImg">
                <img src="../../icons/static/changdu.png" alt>
              </div>
              <div class="cableNum">
                <div>{{ parseFloat(item.totalLength).toFixed(3) }}</div>
                <div>总长度</div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-xia">
          <div class="work-title">{{ $dl }}总长度(km)</div>
          <div class="tabsBox">
            <div class="line" :class="[menu ==1?'active':'']" @click="tabs(1)">{{ $xl }}</div>
            <div class="channel" :class="[menu ==2?'active':'']" @click="tabs(2)">通道</div>
          </div>
          <div v-if="flag" id="echart1" ref="echart1" class="echart1" />
          <div v-if="!flag" id="echart2" ref="echart2" class="echart2" />
          <div class="zanwu">
            <div v-if="lineEchartList.length==0" class="zanwuText">暂无数据</div>
            <div v-if="channelEchartList.length===0" class="zanwuText1">暂无数据</div>
          </div>
        </div>
      </div>
    </div>-->
    </div>
  </div></template>
<script>

export default {
  components: {},
  data() {
    return {
      // flag: true,
      // menu: 1,
      // TreeList: [],
      // props: {
      //   children: 'children',
      //   label: 'name'
      // },
      // // 右中
      // voltageArr: [],
      // lineEchartList: [],
      // channelEchartList: []
    }
  },
  created() {},
  mounted() {
    // var that = this
    // that.createMap()
    // // 左侧tree
    // that.getLeftTreeList()
    // // 右侧中间
    // that.getRightDetailList()
    // that.getLineList()
  }
}
</script>

<style  scoped>
.my-container {
  position: absolute;
  left: 0;
  top: 100px;
  width: 100%;
  height: 100%;
  padding: 12px;
  /* background: red; */
}
.bgImg {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-image: url("../../icons/static/bgImg.png");
  background-repeat: no-repeat; /*不平埔*/
  background-position: 100% 100%; /*居中*/
  background-size: 100% 100%; /*背景图片大小*/
}
.banner {
  width: 100%;
  height: 100%;
}
.banner .left {
  width: 20%;
  height: 88%;
  background: #cae9e3;
  float: left;
  padding: 10px;
}
.left-title {
  width: 100%;
  height: 70px;
}
.left-title >>> input {
  width: 75%;
  height: 50px;
  outline: none;
  padding: 4px;
  border: 1px solid #269a93;
  border-right: 0;
  vertical-align: middle;
  margin-top: 10px;
  float: left;
  font-size: 18px;
}
.left-title >>> button {
  width: 25%;
  height: 50px;
  margin-top: 10px;
  vertical-align: middle;
  font-size: 26px;
  border-left: none;
  color: #fff;
  background: #10a89f;
  outline: none;
  padding: 0;
  border: 1px solid transparent;
}
.left-list {
  width: 100%;
  height: calc(100% - 70px);
  background: #9cd2c8;
  padding-bottom: 10px;
  overflow: auto;
}

.tree {
  background: #9cd2c8;
  /* color:#000; */
}
.tree >>> .el-tree-node__content {
  height: 40px;
}
.tree >>> .el-tree-node__content .el-tree-node__label {
  width: 80%;
  text-align: center;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tree >>> .el-tree-node__content:hover {
  background: #9cd2c8;
  color: #005343;
}
.tree >>> .el-tree-node:focus > .el-tree-node__content {
  background: #74bcae;
}
.tree >>> .el-tree-node:hover {
  background: #9cd2c8;
}

.banner .zhong {
  float: left;
  width: 58%;
  height: 88%;
  margin-right: 1%;
}
.banner .right {
  width: 21%;
  height: 88%;
  float: left;
}
.right-work {
  width: 100%;
  height: 25%;
  background: #cae9e3;
  border-radius: 2px;
  border: 1px solid #05c5b9;
}
.right-work .work-title {
  width: 70%;
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-size: 14px;
  margin-left: 15%;
  border-bottom: 1px solid #09c6ba;
}
.right-work >>> .work-content {
  width: 100%;
  height: 80%;
  padding-top: 3%;
  overflow: auto;
}
.right-work .work-content .workItem {
  float: left;
  width: 50%;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  padding-left: 10px;
  color: #387066;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.workItem-text {
  width: 100%;
}
.right-work .workItem .workItem-i {
  float: left;
  width: 3px;
  height: 12px;
  line-height: 12px;
  background: #0baaa8;
  border-radius: 4px;
  margin-top: 14px;
  margin-right: 4px;
}
/*右边中间 */
.right-zhong {
  width: 100%;
  height: 46%;
  background: #cae9e3;
  border-radius: 2px;
  border: 1px solid #05c5b9;
  margin-top: 2.5%;
  padding: 10px 0 10px 0px;
  margin-bottom: 2.5%;
  overflow: auto;
}
.right-zhong .zhong-cable {
  position: relative;
  width: 100%;
  height: 31%;
  border: 1px solid #8fded6;
  border-radius: 4px;
  background-color: #daf0eb;
}
.left-top {
  position: absolute;
  left: 0;
  top: 0;
}
.leftTop-text {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 888;
  color: #fff;
  font-size: 12px;
}
.cable-left {
  float: left;
  width: 50%;
  height: 100%;
}
.cableImg {
  float: left;
  width: 36px;
  height: 36px;
  margin-top: 28%;
  margin-left: 6px;
}
.cableImg img {
  display: inline-block;
  width: 36px;
  height: 36px;
}
.cableNum {
  float: left;
  margin-top: 24%;
}
.cableNum div:nth-child(1) {
  height: 26px;
  line-height: 26px;
  font-size: 14px;
  font-weight: 500;
  margin: none;
  color: #09564a;
  padding-left: 4px;
}
.cableNum div:nth-child(2) {
  height: 22px;
  line-height: 22px;
  padding-left: 4px;
  font-size: 12px;
  margin: none;
  color: #09564a;
}
.cable1 {
  margin-bottom: 4%;
}
.cable2 {
  margin-bottom: 4%;
}

.right-xia {
  width: 100%;
  height: 26%;
  background: #cae9e3;
  border-radius: 2px;
  border: 1px solid #05c5b9;
}
.right-xia .work-title {
  width: 70%;
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-size: 14px;
  margin-left: 15%;
  border-bottom: 1px solid #09c6ba;
}
.tabsBox {
  width: 70%;
  height: 28px;
  line-height: 28px;
  margin-left: 15%;
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
}
.active {
  width: 100%;
  height: 100%;
  background: #13aea9;
}
.tabsBox .line {
  float: left;
  width: 40px;
  height: 28px;
  line-height: 28px;
  margin-left: 28%;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
}
.tabsBox .line:hover {
  background: #13aea9;
}
.tabsBox .channel:hover {
  background: #13aea9;
}
.tabsBox .channel {
  float: left;
  width: 40px;
  height: 28px;
  line-height: 28px;
  margin-left: calc(28%+28px);
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  border-top-right-radius: 14px;
  border-bottom-right-radius: 14px;
}
.echart1 {
  width: 100%;
  height: 60%;
  padding: 10px;
  margin-top: 2%;
  /* background: red; */
}
.echart2 {
  width: 100%;
  padding: 10px;
  margin-top: 2%;
  height: 60%;
}
.zanwu {
  width: 100%;
  padding: 10px;
  margin-top: 2%;
  height: 60%;
  position: relative;
}
.zanwuText {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  color: #fff;
}
.zanwuText1 {
  width: 80px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  color: #fff;
}
</style>
