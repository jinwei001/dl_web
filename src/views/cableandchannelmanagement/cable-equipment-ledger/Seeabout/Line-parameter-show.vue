<template>
  <!-- <h2>dl查看</h2> -->
  <div class="hastitle">
    <el-dialog
      :visible.sync="showDialog"
      :title="`${$xl}台账`"
      v-dialogDrag
      :center="true"
      top="0"
      width="50%"
      :before-close="handleClose"
      append-to-body
    >
      <el-form
        ref="dataForm"
        :model="formData"
        label-position="left"
        style="width:100% ;margin: 0 auto;"
      >
        <div class="Form-title">
          <div class="form-item">
            <label class="form-title">资产参数</label>
          </div>
        </div>
        <div class="Form-input">
          <el-form-item label="资产性质" label-width="160px" style="width:50%">
            <el-input v-model="formData.assetNature" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item label="资产单位" label-width="160px" style="width:50%">
            <el-input v-model="formData.assetUnit" clearable :disabled="isreadonly" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="资产编号" label-width="160px" style="width:50%">
            <el-input v-model="formData.assetNumber" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item label="工程编号" label-width="160px" style="width:50%">
            <el-input v-model="formData.projectNumber" clearable :disabled="isreadonly" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="流水码" label-width="160px" style="width:50%">
            <el-input v-model="formData.waterCode" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item label="WBS编码" label-width="160px" style="width:50%">
            <el-input v-model="formData.wpsNumber" clearable :disabled="isreadonly" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="实物ID" label-width="160px" style="width:100%">
            <el-input v-model="formData.matterId" clearable :disabled="true" />
          </el-form-item>
        </div>
        <div class="Form-title">
          <div class="form-item">
            <label class="form-title">运行参数</label>
          </div>
        </div>
        <div class="Form-input">
          <el-form-item :label="`${$xl}名称`" label-width="160px" style="width:50%">
            <el-input v-model="formData.lineName" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item label="运行编号" label-width="160px" style="width:50%">
            <el-input v-model="formData.runNumber" clearable :disabled="isreadonly" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="维护班组" label-width="160px" style="width:50%">
            <el-select v-model="formData.groupId" clearable placeholder="请选择" :disabled="isreadonly" >
              <el-option
                v-for="item in selection.ywbz"
                :key="item.groupId"
                :label="item.groupname"
                :value="item.groupId"
              ></el-option>
            </el-select>
            <!--<el-input v-model="formData.groupName" clearable :disabled="isreadonly" />-->
          </el-form-item>
          <el-form-item label="所属调度" label-width="160px" style="width:50%">
            <el-input v-model="formData.dispatchNumber" clearable :disabled="isreadonly" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="调度单位" label-width="160px" style="width:50%">
            <el-input v-model="formData.dispatchUnit" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item label="跨区域类型" label-width="160px" style="width:50%">
            <el-input v-model="formData.crossReginalType" clearable :disabled="isreadonly" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="是否标准化" label-width="160px" style="width:50%">
            <el-input v-model="formData.projectNumber" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item label="是否代维" label-width="160px" style="width:50%">
            <el-input v-model="formData.isAgentMaintain" clearable :disabled="isreadonly" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="是否农网" label-width="160px" style="width:50%">
            <el-input v-model="formData.isRural" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item :label="`${$dydj}`" label-width="160px" style="width:50%">
            <!-- <el-input v-model="formData.voltageRank" clearable :disabled="isreadonly" /> -->
            <el-select
              v-model="formData.voltageRank"
              clearable
              placeholder="请选择"
              style=" width: 100%;"
              disabled
            >
              <el-option
                v-for="item in select.dydjList"
                :key="item.dydj"
                :label="item.dydjmc"
                :value="item.dydjmc"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item :label="`设计${$dydj}`" label-width="160px" style="width:50%">
            <el-input v-model="formData.designVoltageRank" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item label="设备状态" label-width="160px" style="width:50%">
            <el-input v-model="formData.runStatus" clearable :disabled="isreadonly" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="投运日期" label-width="160px" style="width:50%">
            <el-date-picker
              v-model="formData.transportTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择日期"
              style="width:100%"
              :disabled="isreadonly"
            />
          </el-form-item>
          <el-form-item label="是否接地极" label-width="160px" style="width:50%">
            <el-input v-model="formData.isEartingPole" clearable :disabled="isreadonly" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item :label="`${$xl}性质`" label-width="160px" style="width:50%">
            <el-input v-model="formData.lineNature" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item :label="`${$xl}色标`" label-width="160px" style="width:50%">
            <el-input v-model="formData.lineColourCode" clearable :disabled="isreadonly" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="所属主线" label-width="160px" style="width:50%">
            <el-input v-model="formData.principalLine" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item label="架设方式" label-width="160px" style="width:50%">
            <el-select
              v-model="formData.lineType"
              clearable
              placeholder="请选择"
              style=" width: 100%;"
              :disabled="isreadonly"
            >
              <el-option
                v-for="item in select.fsfsList"
                :key="item.fsfs"
                :label="item.fsfsmc"
                :value="item.fsfsmc"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item :label="`${$xl}总长度(km)`" label-width="160px" style="width:50%">
            <el-input v-model="formData.totalLength" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item :label="`${$jk}${$xl}长度(km)`" label-width="160px" style="width:50%">
            <el-input v-model="formData.overheadLength" clearable :disabled="isreadonly" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item :label="`${$dl}${$xl}长度(km)`" label-width="160px" style="width:50%">
            <el-input v-model="formData.cableLineLength" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item label="起点类型" label-width="160px" style="width:50%">
            <el-input v-model="formData.startType" clearable :disabled="isreadonly" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="起点电站" label-width="160px" style="width:50%">
            <el-input v-model="formData.startPowerStation" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item label="起点位置" label-width="160px" style="width:50%">
            <el-input v-model="formData.startPositonName" clearable :disabled="isreadonly" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="起点开关编号" label-width="160px" style="width:50%">
            <el-input v-model="formData.startSwitchNumber" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item label="终点类型" label-width="160px" style="width:50%">
            <el-input v-model="formData.endType" clearable :disabled="isreadonly" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="起点电站" label-width="160px" style="width:50%">
            <el-input v-model="formData.startPowerStation" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item label="终点电站" label-width="160px" style="width:50%">
            <el-input v-model="formData.endPowerStation" clearable :disabled="isreadonly" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="终点开关编号" label-width="160px" style="width:50%">
            <el-input v-model="formData.endSwitchNumber" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item label="最大允许电流(A) " label-width="160px" style="width:50%">
            <el-input v-model="formData.maxAllowElectric" clearable :disabled="isreadonly" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="运行负荷限额(kW)" label-width="160px" style="width:50%">
            <el-input v-model="formData.runLoadLimit" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item label="额定输送功率(MVA)" label-width="160px" style="width:50%">
            <el-input v-model="formData.ratedConveyPower" clearable :disabled="isreadonly" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="设计单位" label-width="160px" style="width:50%">
            <el-input v-model="formData.designUnit" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item label="建设单位" label-width="160px" style="width:50%">
            <el-input v-model="formData.constructionUnit" clearable :disabled="isreadonly" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="施工单位" label-width="160px" style="width:50%">
            <el-input v-model="formData.productUnit" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item label="监理单位" label-width="160px" style="width:50%">
            <el-input v-model="formData.supervisorUnit" clearable :disabled="isreadonly" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="功能位置编码" label-width="160px" style="width:50%">
            <el-input v-model="formData.functionPositionNumber" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item label="设备主人" label-width="160px" style="width:50%">
            <el-input v-model="formData.facilityMaster" clearable :disabled="isreadonly" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="专业分类" label-width="160px" style="width:50%">
            <el-input v-model="formData.specialClass" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item style="width:50%"></el-form-item>
        </div>
        <div class="Form-title">
          <div class="form-item">
            <label class="form-title">调控运行参数</label>
          </div>
        </div>
        <div class="Form-input">
          <el-form-item label="是否有光纤" label-width="160px" style="width:50%">
            <el-input v-model="formData.isHaveOptical" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item label="是否终端线 " label-width="160px" style="width:50%">
            <el-input v-model="formData.isTagWire" clearable :disabled="isreadonly" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item :label="`是否给电铁供电${$xl}`" label-width="160px" style="width:50%">
            <el-input v-model="formData.isPowerSupplyLine" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item :label="`是否是同杆并架${$xl}`" label-width="160px" style="width:50%">
            <el-input v-model="formData.isJointUseLine" clearable :disabled="isreadonly" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="零序电容" label-width="160px" style="width:50%">
            <el-input v-model="formData.zeroSequeceCapacitance" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item label="正序电容" label-width="160px" style="width:50%">
            <el-input
              v-model="formData.positiveSequeceCapacitance"
              clearable
              :disabled="isreadonly"
            />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="正序电阻" label-width="160px" style="width:50%">
            <el-input
              v-model="formData.positiveSequeceResistance"
              clearable
              :disabled="isreadonly"
            />
          </el-form-item>
          <el-form-item label="正序电抗" label-width="160px" style="width:50%">
            <el-input v-model="formData.positiveSequeceReactance" clearable :disabled="isreadonly" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="正序电纳" label-width="160px" style="width:50%">
            <el-input
              v-model="formData.positiveSequeceSusceptance"
              clearable
              :disabled="isreadonly"
            />
          </el-form-item>
          <el-form-item label="正序电导" label-width="160px" style="width:50%">
            <el-input
              v-model="formData.positiveSequeceConductance"
              clearable
              :disabled="isreadonly"
            />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="零序电阻" label-width="160px" style="width:50%">
            <el-input v-model="formData.zeroSequeceResistance" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item label="零序电抗" label-width="160px" style="width:50%">
            <el-input v-model="formData.zeroSequeceReactance" clearable :disabled="isreadonly" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="零序电纳" label-width="160px" style="width:50%">
            <el-input v-model="formData.zeroSequeceSusceptance" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item label="零序电导" label-width="160px" style="width:50%">
            <el-input v-model="formData.zeroSequeceConductance" clearable :disabled="isreadonly" />
          </el-form-item>
        </div>
        <div class="Form-title">
          <div class="form-item">
            <label class="form-title">其它参数</label>
          </div>
        </div>

        <div class="Form-input">
          <el-form-item :label="`${$xl}ID`" label-width="160px" style="width:100%">
            <el-input v-model="formData.id" clearable :disabled="true" />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="设备编码" label-width="160px" style="width:50%">
            <el-input v-model="formData.deviceNumber" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item label="登记时间" label-width="160px" style="width:50%">
            <!-- <el-input v-model="formData.registerTime" clearable :disabled="isreadonly" /> -->
            <el-date-picker
              v-model="formData.registerTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择日期"
              style="width:100%"
              :disabled="isreadonly"
            />
          </el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="发布状态" label-width="160px" style="width:50%">
            <el-input v-model="formData.publishStatus" clearable :disabled="isreadonly" />
          </el-form-item>
          <el-form-item style="width:50%"></el-form-item>
        </div>
        <div class="Form-input">
          <el-form-item label="备注" label-width="160px" style="width:100%">
            <el-input type="textarea" v-model="formData.remark" :disabled="isreadonly"></el-input>
          </el-form-item>
        </div>

        <!-- <div class="MainDivCon">
          <div class="EachDiv">
            <div class="each-formTag">
              <label class="each-label">资产性质：</label>
              <el-input v-model="formData.assetNature" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">工程编号：</label>
              <el-input v-model="formData.projectNumber" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label each-label-long">设备增加方式：</label>
              <el-input v-model="formData.facilityAddWay" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">{{$xl}}名称：</label>
              <el-input v-model="formData.lineName" disabled />
            </div>
            <div class="each-formTag">
              <label class="each-label">所属城市：</label>
              <el-input v-model="formData.area" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">调度单位：</label>
              <el-input v-model="formData.dispatchUnit" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label each-label-long">是否标准化：</label>
              <el-input v-model="formData.projectNumber" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label each-label-long">设计{{$dydj}}：</label>
              <el-input v-model="formData.designVoltageRank" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label each-label-long">是否接地极：</label>
              <el-input v-model="formData.isEartingPole" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">所属主线：</label>
              <el-input v-model="formData.principalLine" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label each-label-long">{{$jk}}{{$xl}}长度：</label>
              <el-input v-model="formData.overheadLength" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">起点电站：</label>
              <el-input v-model="formData.startPowerStation" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">终点类型：</label>
              <el-input v-model="formData.endType" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label each-label-long">最大允许电流：</label>
              <el-input v-model="formData.maxAllowElectric" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">建设单位：</label>
              <el-input v-model="formData.constructionUnit" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label each-label-long">功能位置编码：</label>
              <el-input v-model="formData.functionPosition" clearable :disabled="isreadonly" />
            </div>
          </div>
          <div class="EachDiv">
            <div class="each-formTag">
              <label class="each-label">资产单位：</label>
              <el-input v-model="formData.assetUnit" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">工程名称：</label>
              <el-input v-model="formData.projectName" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">WBS编码：</label>
              <el-input v-model="formData.wpsNumber" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">运行编号：</label>
              <el-input v-model="formData.runNumber" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">维护班组：</label>
              <el-input v-model="formData.groupName" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label each-label-long">跨区域类型：</label>
              <el-input v-model="formData.crossReginalType" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">是否农网：</label>
              <el-input v-model="formData.isRural" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">设备状态：</label>
              <el-input v-model="formData.runStatus" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">{{$xl}}性质：</label>
              <el-input v-model="formData.lineNature" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">敷设方式：</label>
              <el-input v-model="formData.lineType" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label each-label-long">{{$dl}}{{$xl}}总长度：</label>
              <el-input v-model="formData.cableLineLength" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">起点位置：</label>
              <el-input v-model="formData.startPositonName" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">终点电站：</label>
              <el-input v-model="formData.endPowerStation" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label each-label-long">运行负荷限额：</label>
              <el-input v-model="formData.runLoadLimit" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">施工单位：</label>
              <el-input v-model="formData.productUnit" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">设备主人：</label>
              <el-input v-model="formData.facilityMaster" clearable :disabled="isreadonly" />
            </div>
          </div>
          <div class="EachDiv">
            <div class="each-formTag">
              <label class="each-label">资产编码：</label>
              <el-input v-model="formData.assetNumber" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">流水码：</label>
              <el-input v-model="formData.projectNumber" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">实物ID：</label>
              <el-input v-model="formData.matterId" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">所属城市：</label>
              <el-input v-model="formData.area" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">所属调度：</label>
              <el-input v-model="formData.dispatchNumber" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">是否代理：</label>
              <el-input v-model="formData.isAgency" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">{{$dydj}}：</label>
              <el-input v-model="formData.voltageRank" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">投运日期：</label>
              <el-input v-model="formData.transportTime" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">{{$xl}}色标：</label>
              <el-input v-model="formData.lineColourCode" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label each-label-long">{{$xl}}总长度：</label>
              <el-input v-model="formData.totalLength" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">起点类型：</label>
              <el-input v-model="formData.startType" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label each-label-long">起点开关编号：</label>
              <el-input v-model="formData.projectNumber" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label each-label-long">终点开关编号：</label>
              <el-input v-model="formData.startSwitchNumber" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">设计单位：</label>
              <el-input v-model="formData.designUnit" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">监理单位：</label>
              <el-input v-model="formData.supervisorUnit" clearable :disabled="isreadonly" />
            </div>
          </div>
        </div>
        <div class="Form-title" style="margin-top: 20px">
          <div class="form-item">
            <label class="form-title">资产参数</label>
          </div>
        </div>
        <div class="MainDivCon">
          <div class="EachDiv">
            <div class="each-formTag">
              <label class="each-label">{{$xl}}ID：</label>
              <el-input v-model="formData.id" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">设备编码：</label>
              <el-input v-model="formData.deviceNumber" clearable :disabled="isreadonly" />
            </div>
            <div class="each-formTag">
              <label class="each-label">备注：</label>
              <el-input v-model="formData.remark" clearable :disabled="isreadonly" />
            </div>
          </div>
          <div class="EachDiv">
            <div class="each-formTag">
              <label class="each-label">登记时间：</label>
              <el-input v-model="formData.registerTime" clearable :disabled="isreadonly" />
            </div>
          </div>
          <div class="EachDiv">
            <div class="each-formTag">
              <label class="each-label">流水码：</label>
              <el-input v-model="formData.waterCode" clearable :disabled="isreadonly" />
            </div>
          </div>
        </div>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="UserSearchFun" v-if="editbtn" @click="SuerFun">保存</el-button>
        <el-button class="onSearch" v-if="editbtn" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  List,
  Edit
} from "@/api/cableandchannel/cable-equipment-ledger/Line/line-parameter";

import { getLineSelect, ExportFn } from "@/api/public";
import qs from "qs";
export default {
  props: {
    /**
     * 接收是否打开页面
     */
    isShowDialog: {
      type: Boolean,
      default: false
    },
    /** 接收参数为是否是编辑*/
    isEdit: {
      type: Boolean,
      default: false
    },
    // 是否是查看
    isLook: {
      type: Boolean,
      default: false
    },
    /**打开页面的id */
    openID: {
      default: null
    },
    gruClickID: {
      default: null
    }
  },
  data() {
    return {
      form: {
        id: this.gruClickID
      },
      formData: {
        id: "",
        assetNature: "",
        projectNumber: "",
        facilityAddWay: "",
        lineName: "",
        area: "",
        dispatchUnit: "",
        designVoltageRank: "",
        isEartingPole: "",
        principalLine: "",
        overheadLength: "",
        startPowerStation: "",
        endType: "",
        maxAllowElectric: "",
        constructionUnit: "",
        functionPosition: "",
        assetUnit: "",
        projectName: "",
        wpsNumber: "",
        runNumber: "",
        groupId: "",
        crossReginalType: "",
        isRural: "",
        runStatus: "",
        lineNature: "",
        lineType: "",
        cableLineLength: "",
        startPositonName: "",
        endPowerStation: "",
        runLoadLimit: "",
        productUnit: "",
        facilityMasterId: "",
        assetNumber: "",
        matterId: "",
        dispatchNumber: "",
        isAgency: "",
        voltageRank: "",
        transportTime: "",
        lineColourCode: "",
        totalLength: "",
        startType: "",
        startSwitchNumber: "",
        designUnit: "",
        supervisorUnit: "",
        deviceNumber: "",
        remark: "",
        registerTime: "",
        waterCode: ""
      },
      selection: {
        ywbz: [],
      },
      showDialog: this.isShowDialog, //打开弹框
      editbtn: this.isEdit, //是否是编辑按钮
      addbtn: this.isAdd, //是否是新增按钮
      select: []
    };
  },
  computed: {
    /**计算是否可读 */
    isreadonly() {
      return !(this.editbtn || this.addbtn);
    }
  },
  watch: {
    isShowDialog(val) {
      this.showDialog = val;
    },
    isEdit(val) {
      this.editbtn = val;
    }
  },
  inject: ["getList"], // 子页面调取父页面的方法
  mounted() {
    this.getSelect();
  },
  created() {
    getLineSelect()
      .then(res => {
        if (res.data.code == 0) {
          this.select = res.data.data;
        }
      })
      .catch(err => {
        //console.log(err);
      });
  },
  methods: {
    // 获取回显信息
    getEcho() {
      List(this.$qs.stringify(this.form)).then(res => {
        //console.log(res);
        if (res.status == 200) {
          this.formData = res.data.rows[0];
        }
      });
    },
    // 获取下拉数据
    getSelect() {
      getLineSelect().then(response => {
        if (response.status == 200) {
          this.selection.ywbz = response.data.data.groupList;
        }
      });
    },
    /**
     * 取消按钮
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.showDialog = false;
          this.editbtn = false;
          this.addbtn = false;
          this.$emit("childFn", {
            showDialog: this.showDialog,
            editbtn: this.editbtn,
            addbtn: this.addbtn
          });
          this.$parent.getList();
          done();
        })
        .catch(_ => {});
    },
    /**
     * 确认按钮
     */
    SuerFun() {
      //console.log("object");
      ExportFn("/cable/line/edit", qs.stringify(this.formData))
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "编辑成功",
              type: "success"
            });
            this.showDialog = false;
            this.$emit("childFn", {
              showDialog: this.showDialog,
              isAdd: false,
              isviewDialog: false,
              isEdit: false,
            });
            this.$parent.getList();
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.MainDivCon {
  display: flex;
  justify-content: space-around;

  .EachDiv {
    width: 30%;

    .each-formTag {
      width: 100%;
      height: 50px;
      display: flex;

      .each-label {
        width: 50%;
        line-height: 45px;
        height: 45px;
      }
      .each-label-long {
        line-height: 22px;
      }
    }
  }
}
</style>
<style lang="scss">
.Form-input {
  label.el-form-item__label {
    text-align: right !important;
  }
}
</style>
