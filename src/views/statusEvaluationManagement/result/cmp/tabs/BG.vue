<template>
  <!--  <div>设备评价信息</div> -->
  <div>
    <a id="dlink"></a>
    <!--    {{detailspg}} -->
    <table border="2" width="100%" id="tablebox">
      <tr>
        <th colspan="8">
          <p style="font-size: 20px;font-weight: 600;">国家电网公司</p>
          <p style="font-size: 16px;font-weight: 600;">{{'10{6)'+$qf+'～500'+$qf+ $dydj+'电缆线路状态评价报告'}}</p>
        </th>
      </tr>
      <tr>
        <th colspan="8" style="line-height: 50px;font-size: 16px;font-weight: 600;">国家电网无锡供电公司{{xlmemodata.xlmc}}</th>
      </tr>
      <tr>
        <td colspan="2" align="center" rowspan='6'>设备资料</td>
      </tr>
      <tr>
        <td>安装地点</td>
        <td>
        </td>
        <td>运行编号</td>
        <td>
          {{xlmemodata.yxbh}}
        </td>
        <td>型号</td>
        <td>

        </td>
      </tr>
      <tr>
        <td>电缆本体生产厂家</td>
        <td colspan="2">
          <span v-for="list in xlmemodata.dlbt">{{list.sccj}}</br></span>
        </td>
        <td>生产日期</td>
        <td colspan="2">
          <span v-for="list in xlmemodata.dlbt">{{list.scrq}}</br></span>
        </td>
      </tr>
      <tr>
        <td>中间接头生产厂家</td>
        <td colspan="2"><span v-for="list in xlmemodata.zjjt">{{list.sccj}}</br></span></td>
        <td>生产日期</td>
        <td colspan="2"><span v-for="list in xlmemodata.zjjt">{{list.scrq}}</br></span></td>

      </tr>
      <tr>
        <td>电缆终端生产厂家</td>
        <td colspan="2"><span v-for="list in xlmemodata.dlzd">{{list.sccj}}</br></span></td>
        <td>生产日期</td>
        <td colspan="2"><span v-for="list in xlmemodata.dlzd">{{list.scrq}}</br></span></td>

      </tr>
      <tr>
        <td>额定电压/电流</td>
        <td colspan="2"></td>
        <td>投运时间</td>
        <td colspan="2">
          {{xlmemodata.tyrq}}
        </td>
      </tr>
      <tr>
        <td>上次评价结果/时间</td>
        <td colspan="7">{{xlmemodata.scpjrq}}</td>
      </tr>
      <tr>
        <td colspan="8" style="font-size: 17px;font-weight: 600;">本次评价</td>
      </tr>
      <tr>
        <td colspan="2">评价指标</td>
        <td>电缆本体</td>
        <td>电缆终端</td>
        <td>辅助设施</td>
        <td>中间接头</td>
        <td>电缆线路过电压保护器</td>
        <td>通道</td>
      </tr>
      <tr>
        <td colspan="2">状态定级</td>
        <td>
         <el-select v-model="deductdata.aStatus"  placeholder="请选择" filterable >
           <el-option v-for="(item,index) in selection.Jgarry" :key="item.id" :label="item.value" :value="item.id" />
         </el-select>
        </td>
        <td>
          <el-select v-model="deductdata.bStatus"  placeholder="请选择" filterable >
            <el-option v-for="(item,index) in selection.Jgarry" :key="item.id" :label="item.value" :value="item.id" />
          </el-select>
        </td>
        <td>
          <el-select v-model="deductdata.cStatus"  placeholder="请选择" filterable >
            <el-option v-for="(item,index) in selection.Jgarry" :key="item.id" :label="item.value" :value="item.id" />
          </el-select>
        </td>
        <td>
          <el-select v-model="deductdata.dStatus"  placeholder="请选择" filterable >
            <el-option v-for="(item,index) in selection.Jgarry" :key="item.id" :label="item.value" :value="item.id" />
          </el-select>
        </td>
        <td>
          <el-select v-model="deductdata.eStatus"  placeholder="请选择" filterable >
            <el-option v-for="(item,index) in selection.Jgarry" :key="item.id" :label="item.value" :value="item.id" />
          </el-select>
        </td>
        <td>
          <el-select v-model="deductdata.fStatus"  placeholder="请选择" filterable >
            <el-option v-for="(item,index) in selection.Jgarry" :key="item.id" :label="item.value" :value="item.id" />
          </el-select>
        </td>
      </tr>
      <tr>
        <td colspan="2">扣分值</td>
        <td><el-input placeholder="请输入" :disabled="disabled" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
        maxlength="5" v-model="deductdata.aKfz"></el-input></td>
        <td><el-input placeholder="请输入" :disabled="disabled" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
        maxlength="5" v-model="deductdata.bKfz"></el-input></td>
        <td><el-input placeholder="请输入" :disabled="disabled" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
        maxlength="5" v-model="deductdata.cKfz"></el-input></td>
        <td><el-input placeholder="请输入" :disabled="disabled" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
        maxlength="5" v-model="deductdata.dKfz"></el-input></td>
        <td><el-input placeholder="请输入" :disabled="disabled" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
        maxlength="5" v-model="deductdata.eKfz"></el-input></td>
        <td><el-input placeholder="请输入" :disabled="disabled" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
        maxlength="5" v-model="deductdata.fKfz"></el-input></td>

      </tr>
      <tr>
        <td colspan="2">整体评价结果(诊断后)</td>
        <td colspan="6">
          <el-radio v-model="form.newestResult" label="1" :disabled="disabled">正常状态</el-radio>
          <el-radio v-model="form.newestResult" label="2" :disabled="disabled">注意状态</el-radio>
          <el-radio v-model="form.newestResult" label="3" :disabled="disabled">异常状态</el-radio>
          <el-radio v-model="form.newestResult" label="4" :disabled="disabled">严重状态</el-radio>
        </td>
      </tr>
      <tr>
        <td colspan="2">扣分状态量状态描述</td>
        <td colspan="6">
          <el-input v-model="form.jsons" type="textarea" :rows="7" :disabled="disabled"></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="2">处理建议</td>
        <td colspan="6">
          <el-input v-model="form.cljy" type="textarea" :rows="7" :disabled="disabled"></el-input>
        </td>
      </tr>
      <tr>
        <td colspan="1">评价人</td>
        <td colspan="1">
          {{form.regularEvaluatorName}}
        </td>
        <td colspan="2">评价时间</td>
        <td colspan="2">
          <el-date-picker v-model="form.newestDate" type="datetime" format="yyyy-MM-dd hh:mm:ss"
            value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="选择日期" style="width: 100%;" :disabled="disabled" />
        </td>
        <td colspan="1">审核</td>
        <td colspan="1">
          <el-select v-model="form.shhr" clearable placeholder="请选择" filterable :disabled="disabled">
            <el-option v-for="(item,index) in selection.sbzrarry" :key="item.obj_id" :label="item.name" :value="item.obj_id" />
          </el-select>
        </td>
      </tr>
      <tr>
        <td colspan="8">
          <a href='' id='a1'></a>
          <el-button class="onSearch" @click='daochu' v-if="this.detailspg.starts===2||this.detailspg.starts===3">下载</el-button>
          <el-button class="onSearch" @click='getadd' v-else>提交</el-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import {
    sbzrList,
  } from '@/api/statusE/cycle'
  import {
    edit,
    xlmemo,
    deduct
  } from '@/api/statusE/regular'
  import {
    report,
    downJG
  } from '@/api/statusE/result'
  import qs from 'qs'

  export default {

    data() {
      return {
        selection: {
         Jgarry: [{
           id: 1,
           value: '正常状态'
         }, {
           id: 2,
           value: '注意状态'
         }, {
           id: 3,
           value: '异常状态'
         }, {
           id: 4,
           value: '严重状态'
         }]
        },
        deductdata: {
          aStatus: this.detailspg.aStatus == ('' || null) ? 1 : this.detailspg.aStatus,
          bStatus: this.detailspg.bStatus == ('' || null) ? 1 : this.detailspg.bStatus,
          cStatus: this.detailspg.cStatus == ('' || null) ? 1 : this.detailspg.cStatus,
          dStatus: this.detailspg.dStatus == ('' || null) ? 1 : this.detailspg.dStatus,
          eStatus: this.detailspg.eStatus == ('' || null) ? 1 : this.detailspg.eStatus,
          fStatus: this.detailspg.fStatus == ('' || null) ? 1 : this.detailspg.fStatus,
          aKfz: this.detailspg.aKfz == ('' || null) ? 0 : this.detailspg.aKfz,
          bKfz: this.detailspg.bKfz == ('' || null) ? 0 : this.detailspg.bKfz,
          cKfz: this.detailspg.cKfz == ('' || null) ? 0 : this.detailspg.cKfz,
          dKfz: this.detailspg.dKfz == ('' || null) ? 0 : this.detailspg.dKfz,
          eKfz: this.detailspg.eKfz == ('' || null) ? 0 : this.detailspg.eKfz,
          fKfz: this.detailspg.fKfz == ('' || null) ? 0 : this.detailspg.fKfz
        },
        xlmemodata: {},
        disabled: false,
        dtid:'',
        statusName:'',
        form: {
          andd: '',
          yxbh: '',
          regularEvaluatorId: '', //评价人
          cljy: '', //处理意见
          newestResult: '0', //最新评价结果
          newestDate: '', //评价时间
          shhr: '', //审核人
          dynamicDate: '', //动态日期
          jsons: '', //评价任务描述
          regularEvaluatorName:''
        }
      }
    },
    props: {
      /**
       * 接收是否打开页面
       */
      detailspg: {
        type: Object,
        default: function() {
          return {

          }
        }
      }


    },
    mounted() {
      // 1 新   2编   3详
      this.form.regularEvaluatorId=this.$store.state.user.userId//获取登录人ID
      this.form.regularEvaluatorName=this.$store.state.user.UserName//获取登录人名字
      if (this.detailspg.starts === 2 || this.detailspg.starts === 3) {
        this.reportFun(this.detailspg.lineId)
        this.disabled = true
      } else {
        // this.deductFun()
        this.disabled = false
      }
      this.sbzrListFun()//设备主任
      this.xlmemoFun(this.detailspg.lineId)
      if (this.detailspg.starts === 1) {
        this.form.cljy = this.detailspg.cljy //处理意见
        this.form.newestDate = this.detailspg.regularDate //最新评价时间
        this.form.regularEvaluatorId=this.detailspg.regularEvaluatorId//评价人
        this.form.shhr = this.detailspg.shhr //审核人
        this.form.newestResult = this.detailspg.regularResult.toString() //最新处理结果

        this.form.jsons = this.detailspg.jsons //评价任务描述
      }
      if(this.detailspg.starts === 0){
         this.form.jsons = this.statusName //评价任务描述
      }

    },
    methods: {
      //设备主人
      sbzrListFun() {
        sbzrList().then(response => {
          if (response.status === 200) {
            if (response.data.code === 0) {
              this.selection.sbzrarry = response.data.data
            } else {
              this.selection.sbzrarry = []
              this.$message({
                message: '设备主人列表获取失败',
                type: 'error'
              })
            }
          }
        })
      },
      //下载
      daochu() {
        let data = {
          jsons: {
            xlmemodata: this.xlmemodata,
            deductdata: this.deductdata,
            editdata: {
              ztpjjg: this.form.newestResult !== undefined ? this.form.newestResult : '',
              cljy: this.form.cljy !== undefined ? this.form.cljy : '',
              pjr: this.form.regularEvaluatorId !== undefined ? this.form.regularEvaluatorId : '',
              pjdate: this.form.newestDate !== undefined ? this.form.newestDate : '',
              shr: this.form.shhr !== undefined ? this.form.shhr : '',
              jsons: this.form.jsons !== undefined ? this.form.jsons : ''
            },
            ztArry: ['正常状态', '注意状态', '异常状态', '严重状态']
          }
        }
        if (this.form.regularEvaluatorId !== '') {
          for (let i = 0; i < this.selection.sbzrarry.length; i++) {
            if (this.selection.sbzrarry[i].obj_id === this.form.regularEvaluatorId) {
              data.jsons.editdata.pjr = this.selection.sbzrarry[i].name
            }
          }
        }
        if (this.form.shhr !== '') {
          for (let i = 0; i < this.selection.sbzrarry.length; i++) {
            if (this.selection.sbzrarry[i].obj_id === this.form.shhr) {
              data.jsons.editdata.shr = this.selection.sbzrarry[i].name
            }
          }
        }
        data.jsons = JSON.stringify(data.jsons)
        downJG(qs.stringify(data)).then(response => {
          if (response.status === 200) {
            if (response.data.code === 0) {
              let el = document.getElementById('a1');
              el.href = process.env.VUE_APP_BASE_API + response.data.msg
              el.click()
            } else {
              this.$message({
                message: '失败',
                type: 'error'
              })
            }
          }
        })
      },
      xlmemoFun(id) {
        let data = {
          ztpjid: id,
        }
        xlmemo(qs.stringify(data)).then(response => {
          if (response.status === 200) {
            if (response.data.code === 0) {
              console.log(response.data.data)
              this.xlmemodata = response.data.data
            } else {
              this.$message({
                message: '线路详情列表获取失败',
                type: 'error'
              })
            }
          }
        })
      },
      deductFun() {
        let data = {
          lineId: this.detailspg.lineId,
          endTime: this.detailspg.regularDate,
          json: this.detailspg.lastNumber,
        }
        deduct(qs.stringify(data)).then(response => {
          if (response.status === 200) {
            if (response.data.code === 0) {
              this.deductdata = response.data.data.ztpjBj
              this.dtid = response.data.data.dtid
              this.statusName = response.data.data.statusName
            } else {
              this.$message({
                message: '评价动态列表获取失败',
                type: 'error'
              })
            }
          }
        })
      },
      reportFun(id) {//xlid
        let data = {
          lineId: id,
        }
        report(qs.stringify(data)).then(response => {
          if (response.status === 200) {
            if (response.data.code === 0) {
              this.deductdata = response.data.data.ztpjBj
              let xqdata = response.data.data
              this.form.cljy = xqdata.cljy //处理意见
              this.form.newestDate = xqdata.regularDate //最新评价时间
              this.form.shhr = xqdata.shhr //审核人
              this.form.newestResult = xqdata.regularResult.toString() //最新处理结果
              this.form.jsons = xqdata.jsons //扣分任务描述
            } else {
              this.$message({
                message: '评价动态列表获取失败',
                type: 'error'
              })
            }
          }
        })
      },
      getadd() {
        let data = {
          id: this.detailspg.id,
          ifRegular: '1',
          regularEvaluatorId: this.form.regularEvaluatorId, //定期评价人（当前登录人ID）
          newestEvaluatorId:this.form.regularEvaluatorId,//最新评价人（当前登录人ID）
          regularResult: this.form.newestResult, //定期结果
          regularDate:this.form.newestDate,//定期时间
          cljy: this.form.cljy,//处理建议
          shhr: this.form.shhr, //建议人
          jsons: this.form.jsons,
          dtid: this.dtid,
          lineId: this.detailspg.lineId,
          endTime: this.detailspg.regularDate,
          aStatus: this.deductdata.aStatus,
          bStatus: this.deductdata.bStatus,
          cStatus: this.deductdata.cStatus,
          dStatus: this.deductdata.dStatus,
          eStatus: this.deductdata.eStatus,
          fStatus: this.deductdata.fStatus,
          aKfz: this.deductdata.aKfz,
          bKfz: this.deductdata.bKfz,
          cKfz: this.deductdata.cKfz,
          dKfz: this.deductdata.dKfz,
          eKfz: this.deductdata.eKfz,
          fKfz: this.deductdata.fKfz,
        }
        // if (this.form.dynamicDate === '') {
        //   data.dynamicDate = this.form.newestDate
        // }
        // if (this.form.dynamicResult === '') {
        //   data.dynamicResult = this.form.newestResult
        // }
        if (this.form.newestDate !== '') {
          edit(qs.stringify(data)).then(response => {
            if (response.status === 200) {
              if (response.data.code === 0) {

                this.$emit("childFnC", {
                  showDialog: false,
                });
              } else {

                this.$message({
                  message: '提交失败',
                  type: 'error'
                })
              }
            }
          })
        } else {
          this.$message({
            message: '评价日期不能为空',
            type: 'error'
          })
        }


      }
    }

  }
</script>

<style scoped="scoped">
  #tablebox {
    width: 100%;
  }

  #tablebox tr th {
    line-height: 70px;
    text-align: center;
    font-weight: 600;
    border: solid #000000 2px;
  }

  #tablebox tr td {
    line-height: 50px;
    text-align: center;
    font-weight: 530;
    border: solid #000000 2px;
    width: 300px;
  }

  #tablebox el-input {
    &:focus {
      border: #000000 1px solid;
    }
  }
</style>
