<!-- 审核隐患新增 -->
<template>
  <!-- <h2>XL巡视计划管理</h2> -->
  <div class="xs-hastitle">
    <el-dialog v-dialogDrag :visible.sync="showDialog" title="隐患处理审核" :center="true" :before-close="handleClose"
      :fullscreen="true">
      <el-form :id="submitparameter.id" ref="form" :model="form" label-position="right" style="width:100% ;margin: 0 auto;"
        :rules="formRules" class="shenghebox" :inline="false" label-width="120px">
        <!--      ----------------------------------步骤条-------------------------------------- -->
        <el-steps :active="num" align-center finish-status="success" style="margin-bottom: 30px;">
          <el-step v-for="(step,index) in steplist" :key="index" :title="step" />
        </el-steps>
        <div class="table" style="margin-bottom: 30px;">
          <div class="table">
            <el-table :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}"
              :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}" border fit highlight-current-row>
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column type="index" label="序号" width="60" align="center" />
              <!-- <el-table-column prop="name" label="运维单位" align="center"></el-table-column> -->
              <el-table-column v-for="item in tableTitle" :key="item.index" :prop="item.prop" :label="item.label" align="center" />
            </el-table>
          </div>
        </div>
        <!--      ----------------------------------列表-------------------------------------- -->
        <editinputcmp :selection='selection' :submitReviewparameter='submitparameter' ref='child' @fatherMethod="fatherMethodOther"></editinputcmp>
        <div v-if="submitparameter.starts==111111">
          <div class="Form-input">
            <div class="form-item" />
            <div class="form-item">
              <label class="form-label">
                <span class="Icon_r" />当前处理人：
              </label>
              <el-select v-model="chuliren" clearable placeholder="请选择" style="width: 80%;" disabled>
                <el-option v-for="item in selection.yongHu" :key="item.id" :label="item.value" :value="item.id" />
              </el-select>
            </div>
            <div class="form-item" />
          </div>
          <!--      ----------------------------------隐患设备信息-------------------------------------- -->
          <el-col :span="24">
            <div class="titlestyle"><label>隐患设备信息</label></div>
            <el-row>
              <el-col :span="8">
                <el-form-item ref="HiddenDangerLine" prop="HiddenDangerLine" :label="'隐患'+$xl">
                  <el-select v-model="form.HiddenDangerLine" placeholder="请选择" :disabled="disabledshow" multiple>
                    <el-option v-for="item in selection.yingHuan" :key="item.id" :label="item.value" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item ref="VoltageLevel" prop="VoltageLevel" :label="$dydj">
                  <el-select v-model="form.VoltageLevel" clearable placeholder="请选择" :disabled="disabledshow">
                    <el-option v-for="item in selection.dianYaDengJi" :key="item.id" :label="item.value" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item ref="cable" prop="cable" :label="$dl">
                  <!--        <el-select v-model="form.cable" clearable placeholder="请选择" :disabled="disabledshow" multiple value-key="id">
                    <el-option v-for="(item,index) in selection.dianLan" :key="index" :label="item.value" :value="item" />
                  </el-select> -->
                  <div style="border: 1px solid #DCDFE6;height: 40px;border-radius: 4px">
                    <span v-for="(item,index) in form.cable">
                      <span style="font-size: 12px; color: #909399;background-color: #f4f4f5;margin: 2px 0 2px 6px;padding: 4px 8px;height: 24px;line-height: 22px;border-radius: 4px;">{{item.dlmc}}</span>
                    </span>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item ref="HiddenEquipmentType" prop="HiddenEquipmentType" label="隐患设备类型">
                  <el-select v-model="form.HiddenEquipmentType" placeholder="请选择隐患设备类型" :disabled="disabledshow">
                    <el-option v-for="item in selection.SheBeiLeiXing" :key="item.id" :label="item.value" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item ref="HiddenEquipment" prop="HiddenEquipment" label="隐患设备">
                  <el-select v-model="form.HiddenEquipment" placeholder="请选择隐患设备" :disabled="disabledshow" multiple>
                    <el-option v-for="item in selection.yinHuanSheBei" :key="item.id" :label="item.value" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item ref="HiddenPart" prop="HiddenPart" label="隐患部位">
                  <el-select v-model="form.HiddenPart" placeholder="请选择隐患部位" :disabled="disabledshow">
                    <el-option v-for="item in selection.yinHuanBuWei" :key="item.id" :label="item.value" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="24">
            <div class="titlestyle"><label>隐患发现信息</label></div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="发现方式">
                  <el-select v-model="form.DiscoveryMethod" clearable :disabled="disabledshow">
                    <el-option v-for="item in selection.faXianFangShi" :key="item.id" :label="item.value" :value="item.id" />
                  </el-select>
                </el-form-item>

              </el-col>
              <el-col :span="8">
                <el-form-item ref="DiscoveryTeam" prop="DiscoveryTeam" label="发现班组">
                  <el-select v-model="form.DiscoveryTeam" clearable :disabled="disabledshow">
                    <el-option v-for="item in selection.FXBZarry" :key="item.objId" :label="item.groupname" :value="item.groupname" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item ref="FindPeople" prop="FindPeople" label="发现人">
                  <el-select v-model="form.FindPeople" clearable :disabled="disabledshow">
                    <el-option v-for="item in selection.yongHu" :key="item.id" :label="item.value" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item ref="date_time" label="发现日期">
                  <el-date-picker v-model="form.date_time" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date"
                    style="width: 100%;" :disabled="disabledshow" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="24">
            <div class="titlestyle"><label>隐患描述信息</label></div>
            <el-row>
              <el-col :span="8">
                <el-form-item ref="HiddenPrimitiveUnit" prop="HiddenPrimitiveUnit" label="隐患源单位">
                  <el-input v-model="form.HiddenPrimitiveUnit" clearable placeholder="请输入隐患原单位" :disabled="disabledshow" />
                </el-form-item>

              </el-col>
              <el-col :span="8">
                <el-form-item ref="Hiddencontact" prop="Hiddencontact" label="隐患源联系人">
                  <el-input v-model="form.Hiddencontact" clearable placeholder="请输入隐患源联系人" :disabled="disabledshow" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item ref="contactnumber" prop="contactnumber" label="联系电话">
                  <el-input v-model="form.contactnumber" clearable placeholder="请输入联系电话" :disabled="disabledshow" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item ref="HiddenDangerLocation" prop="HiddenDangerLocation" label="隐患地址">
                  <el-input v-model="form.HiddenDangerLocation" clearable placeholder="请输入隐患地址" :disabled="disabledshow" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item ref="Hiddendangerlocationlongitude" prop="Hiddendangerlocationlongitude" label="隐患位置经度">
                  <el-input v-model="form.Hiddendangerlocationlongitude" clearable placeholder="请输入隐患位置经度" :disabled="disabledshow" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item ref="Hiddendangerlocationdimension" prop="Hiddendangerlocationdimension" label="隐患位置纬度">
                  <el-input v-model="form.Hiddendangerlocationdimension" clearable placeholder="请输入隐患位置纬度" :disabled="disabledshow" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item ref="Sixtypeshiddendangers" prop="Sixtypeshiddendangers" label="隐患类型">
                  <el-select v-model="form.Sixtypeshiddendangers" clearable placeholder="请选择" :disabled="disabledshow">
                    <el-option v-for="item in selection.liuFangYinHuan" :key="item.id" :label="item.value" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item ref="Hiddendangerlevel" prop="Hiddendangerlevel" label="隐患等级">
                  <el-select v-model="form.Hiddendangerlevel" clearable placeholder="请选择" :change="gradeDatachange()"
                    :disabled="disabledshow">
                    <el-option v-for="item in selection.yinHuanDengJi" :key="item.id" :label="item.value" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="ConstructionStatus" label="施工状态">
                  <el-select v-model="form.ConstructionStatus" clearable placeholder="请选择" :disabled="disabledshow">
                    <el-option v-for="item in selection.shiGongZhuangTai" :key="item.id" :label="item.value" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="隐患描述">
                  <el-input v-model="form.Hiddendangerdescription" class clearable :disabled="disabledshow" type="textarea"
                    :rows="7" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <!-- -----------------------------------------隐患施工方案图片上传---------------------------------------------- -->
          <el-col :span="24" style="margin-bottom: 20px;">
            <el-col :span="3">
              <p>
                <label class="form-label">
                  <span class="Icon_r" /><span style="font-size: 1.2em;line-height: 40px;">隐患处置方案：</span>
                </label>
              </p>
            </el-col>
            <el-col :span="8">
              <el-input v-model="HDTPlaninputval" style="width: 95%;" disabled />
            </el-col>
            <el-col :span="13" style="line-height: 40px;">
              <el-col :span="13">
                <el-col :span="8">

                  <el-upload :action="Uploadfliesrc" :on-success="HiddenFileUploadSuccessFun" accept=".doc,.docx,.xlsx,.xls,.pdf"
                    :show-file-list="false" :before-upload="beforHiddenFileUploadFun">
                    <el-button v-if="HDTPlaninputval==''&&Viewstats==false" type="primary" class="onSearch" size="small">上传附件</el-button>
                    <el-button v-if="HDTPlaninputval!==''&&Viewstats==false" type="primary" class="onSearch" size="small">更改附件</el-button>
                    <!--          	<label v-if="HDTPlaninputval==''">未上传文件</label> -->
                  </el-upload>
                </el-col>
                <el-col :span="8">
                  <el-button v-if="HDTPlaninputval!==''&&Viewstats==false" type="primary" class="onSearch" size="small"
                    @click="ClearHDTPlaninputvalFun()">清空附件</el-button>
                </el-col>
                <el-col :span="8">
                  <el-button v-if="HiddenFileUploadDownloadStatus" type="primary" class="onSearch" size="small">
                    <a class="download" :href="HiddenFileUploadDownloadSrc" download="" title="下载附件">下载附件</a>
                  </el-button>
                </el-col>
              </el-col>
              <el-col :span="11">
                <p style="width: 100%;"><label>支持.doc,.docx,.xlsx,.xls,.pdf/25MB内</label></p>
              </el-col>
            </el-col>
          </el-col>

          <el-col :span="24" style="margin-bottom: 20px;">
            <el-form-item label="图片">
              <P v-if="fileList.length>0"><label>已上传{{fileList.length}}张图片</label></P>
              <P v-else><label>设备主人未上传相关图片</label></P>
              <el-upload class="upload-demo" action="/" :on-preview="handlePreview" :file-list="fileList" list-type="picture"
                disabled />

            </el-form-item>
          </el-col>
          <el-col :span="24" style="margin-bottom: 20px;">
            <el-form-item label="上报备注">
              <el-input v-model="form.sbremarks" clearable type="textarea" :rows="7" :disabled="disabledshow" />
            </el-form-item>
          </el-col>

        </div>

        <!--     --------------------------------------------施工处置方案-------------------------------------------------- -->

        <el-col :span="24" style="margin-bottom: 20px;">
          <el-col :span="3">
            <p>
              <label class="form-label">
                <span class="Icon_r" /><span style="font-size: 1.2em;line-height: 40px;">施工·处置方案：</span>
              </label>
            </p>
          </el-col>
          <el-col :span="8">
            <el-input v-model="constructionval" style="width: 95%;" disabled />
          </el-col>
          <el-col :span="13" style="line-height: 40px;">
            <el-col :span="13">
              <el-col :span="8">
                <el-upload :action="Uploadfliesrc" :on-success="HiddenDangerTreatmentPlanSuccess" accept=".doc,.docx,.xlsx,.xls,.pdf"
                  :show-file-list="false" :before-upload="beforUploadflie">
                  <div>
                    <el-button v-if="constructionval==''&&Viewstats==false" type="primary" class="onSearch" size="small">上传附件</el-button>
                    <el-button v-if="constructionval!==''&&Viewstats==false" type="primary" class="onSearch" size="small">更改附件</el-button>
                  </div>
                </el-upload>
              </el-col>
              <el-col :span="8">
                <el-button v-if="constructionval!==''&&Viewstats==false" type="primary" class="onSearch" size="small"
                  @click="ClearconstructionvalFun()">清空附件</el-button>
              </el-col>
              <el-col :span="8">
                <el-button v-if="constructionvalStatus" type="primary" class="onSearch" size="small">
                  <a class="download" :href="constructionvalSrc" download="" title="下载附件">下载附件</a>
                </el-button>
              </el-col>
              <!--            <el-col :span="12">
                <el-button type="primary" class="onSearch" v-if="downloadBz!==''">

                  <a class='download' :href='downloadBz' download="" title="下载附件">下载附件</a>
                </el-button>
              </el-col> -->
            </el-col>
            <el-col :span="11">
              <p style="width: 100%;"><label>支持.doc,.docx,.xlsx,.xls,.pdf/25MB内</label></p>
            </el-col>
          </el-col>
        </el-col>
          {{Roles}}
        <div v-if="Roles=='班组长确认'||Roles=='班组长确认'||Roles=='专职确认'||Roles=='专职确认'||Roles=='工区分管领导确认'||Roles=='设备主人确认'||num==6">
          <el-col :span="24" style="margin-bottom: 20px;">
            <div class="titlestyle"><label>隐患处置计划</label></div>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item prop="ConstructionStatus" label="隐患处置计划">
                <el-select v-model="form.FulfillmentCondition" class="selectstyle" :disabled="Viewstats==true||shebeizhurenquerenStarts==true"
                  @change="FulfillmentConditionchange">
                  <el-option v-for="(item) in FulfillmentConditiondata" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>

          <div v-if="planshow">
            <el-col :span="24" style="margin: 15px 0;">

              <el-form-item prop="PlanNotes" label="备注">
                <el-input v-model="form.PlanNotes" clearable type="textarea" :rows="7" :disabled="Viewstats==true||shebeizhurenquerenStarts==true" />
              </el-form-item>

            </el-col>

            <el-col :span="24" style="margin-bottom: 20px;">
              <div class="titlestyle"><label>隐患处置任务</label></div>
            </el-col>
            <el-col :span="8">

              <el-form-item prop="DisposaldutyTeam" label="隐患值守班组">
                <el-select v-model="form.DisposaldutyTeam" clearable placeholder="请选择" class="selectstyle" :disabled="Viewstats==true||shebeizhurenquerenStarts==true"
                  @change="chuzhiZSbzchangeFun">
                  <el-option v-for="item in selection.banZu" :key="item.id" :label="item.value" :value="item.id" />
                </el-select>
              </el-form-item>

            </el-col>
            <el-col :span="8">

              <el-form-item prop="DisposeWatchman" label="处置值守人">
                <el-select v-model="form.DisposeWatchman" clearable placeholder="请选择" class="selectstyle" :disabled="Viewstats==true||shebeizhurenquerenStarts==true"
                  :filter-method="filterZSRList" filterable>
                  <el-option v-for="item in sevdata.zsrrenlist" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>

            </el-col>
            <el-col :span="8">

              <el-form-item prop="DisposalTime" label="处置时间">
                <el-date-picker v-model="form.DisposalTime" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date"
                  class="selectstyle" :disabled="Viewstats==true||shebeizhurenquerenStarts==true" />
              </el-form-item>
            </el-col>
            <el-col :span="24" style="margin: 15px 0;">
              <el-form-item prop="HiddendangerprocesscontrolMeasures" label="隐患过程管控措施">
                <el-input v-model="form.HiddendangerprocesscontrolMeasures" clearable type="textarea" :rows="7"
                  :disabled="Viewstats==true||shebeizhurenquerenStarts==true" />
              </el-form-item>

            </el-col>
          </div>
        </div>

        <div v-if="(Roles=='班组长确认'||Roles=='专职确认'||Roles=='专职确认'||Roles=='工区分管领导确认'||'设备主人确认')&&Viewstats==false&&submitparameter.type===1">
          <el-col :span="24" style="margin: 15px 0;">
            <el-col :span="3" style="font-size: 1rem;text-align: center;line-height: 40px;"><label>审批结果:</label></el-col>
            <el-col :span="3" style="text-align: left;line-height: 40px;">
              <el-radio v-model="form.radio" label="0">同意</el-radio>
            </el-col>
            <el-col :span="3" style="line-height: 40px;">
              <el-radio v-model="form.radio" label="1">不同意</el-radio>
            </el-col>
            <!--          <el-col v-if="Roles!=='设备主人确认'" :span="12">
              <el-form-item prop="Confirmor" label="下一审批人">
                <el-select v-model="form.Confirmor" clearable placeholder="请选择" style="width: 80%;" filteruseList filterable>
                  <el-option v-for="item in selection.yongHu" :key="item.id" :label="item.value" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-dialog title="审批人" :visible.sync="SPRdialog" width="50%" :before-close="PreviewClose" append-to-body>
              <el-col :span='24'>
                <el-col :span='12'>
                  <el-form-item label="审批班组">
                    <el-select v-model="form.spbz" clearable @change="FXbzchangeFun">
                      <el-option v-for="item in selection.banZu" :key="item.id" :label="item.value" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span='12'>
                  <el-form-item label="下一审批人">
                    <el-select v-model="form.Confirmor" clearable placeholder="请先选择审批班组" style="width: 80%;">
                      <el-option v-for="item in sprvalArrY" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-col>
              <div slot="footer" class="dialog-footer" style="margin-top: 20px;">
                <p style='text-align: center'>
                  <el-button class="UserSearchFun" @click="hidedialog">提交</el-button>
                </p>

              </div>
            </el-dialog>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="ApprovalComments" label="审批意见">
              <el-input v-model="form.ApprovalComments" clearable type="textarea" :rows="7" />
            </el-form-item>
          </el-col>

          <!--          <el-col :span="12">
            <el-col :span="4">
              <label class="form-label line-h">
                <span class="Icon_r">*</span>确认时间：
              </label>
            </el-col>
            <el-col :span="20">
              <el-form-item prop="verifyTime">
                <el-date-picker v-model="form.verifyTime" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date"
                  class="selectstyle" />
              </el-form-item>
            </el-col>
          </el-col> -->
        </div>
        <el-col v-if="Roles=='设备主人确认'||Viewstats==true" :span="24" style="margin-top:30px;">

          <el-upload class="upload-demo" :action="HdhUploadsrc" :on-preview="handlePreview" :file-list="form.Wfpictures"
            list-type="picture" :disabled="Viewstats==true" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
            :on-remove="handleRemove" accept="image/*">
            <label v-if="Roles=='设备主人确认'||num==6" style="font-size: 1rem;padding:20px;">物防图片</label>
            <el-button v-if="Roles=='设备主人确认'&&Viewstats==false" type="primary" class="onSearch">上传技物防图片</el-button>
            <label v-if="(Roles=='设备主人确认'||num==6)&&form.Wfpictures.length>0" slot="tip" class="el-upload__tip" style="padding-left: 20px;">已上传{{ form.Wfpictures.length }}张图片（只能上传图片文件，且不超过25M）</label>
            <label v-if="form.Wfpictures.length==0&&num==6" slot="tip" class="el-upload__tip" style="padding-left: 20px;">设备主人未上传图片</label>
          </el-upload>
        </el-col>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-col :span="24" style="margin-top: 50px;margin-bottom: 50px;">
          <el-button class="UserSearchFun" @click="submit" v-if="Viewstats==false&&submitparameter.type===1">提交</el-button>
          <el-button class="UserSearchFun" @click="yZadmin" v-if="submitparameter.type===2">admin提交</el-button>
          <el-button class="onSearch" @click="handleClose" v-if="Viewstats==false">取消</el-button>
        </el-col>
      </div>

    </el-dialog>
    <!--   ------------------------------------------------预览图片弹窗----------------------------------------------------- -->
    <el-dialog title="预判预览" :visible.sync="dialogVisible" width="30%" :before-close="PreviewClose">
      <img :src="imageUrl" style="width: 100%;">
    </el-dialog>
  </div>
</template>
<script>
  import '@/styles/myStyle/index.scss'
  import {
    edit,
    tHiddendangerMessagegetEditeInfo,
    userList // 发现人
  } from '@/api/Sixdefensemanagement/HiddenDangerReview'
  import editinputcmp from './editinput_cmp'
  import qs from 'qs'
  export default {
    components: {
      editinputcmp
    },
    props: {
      submitparameter: {
        type: Object,
        // 对象或数组且一定会从一个工厂函数返回默认值
        default: function() {
          return {

          }
        }
      },
      selection: {
        type: Object,
        // 对象或数组且一定会从一个工厂函数返回默认值
        default: function() {
          return {

          }
        }
      }
    },
    data() {
      return {
        inputdata:{},
        sprvalArrY: [],
        SPRdialog: false, //审批
        HiddenFileUploadDownloadStatus: false, // 文件按钮显示状态
        HiddenFileUploadDownloadSrc: '', // 文件按钮显示状态
        constructionvalStatus: false, // 施工下载状态
        constructionvalSrc: '', // 施工下载地址
        shebeizhurenquerenStarts: false, // 设备主人确认处理详情时计划模块可编辑状态
        imgshow: false, // 图片弹窗关闭
        imageUrl: '', // 图片预览地址
        Viewstats: false,
        downloadhttp: '',
        downloadBz: '',
        HdhUploadsrc: process.env.VUE_APP_BASE_API + '/cable/tHiddendangerMessage/upLoadImage',
        Uploadfliesrc: process.env.VUE_APP_BASE_API + '/cable/tHiddendangerMessage/upLoadFile',
        HDTPlaninputval: '',
        constructionval: '',
        chuliren: '',
        Roles: '',
        num: 0,
        dialogVisible: false,
        disabledshow: true,
        phonesetdata: [], // 是否具有实现计划下拉数据
        planshow: true, // 计划模块显示隐藏
        FulfillmentConditiondata: [{
            id: '0',
            name: '是'
          },
          {
            id: '1',
            name: '否'
          }
        ],
        fileList: [],
        Role: '外协', // 角色
        steplist: [],
        steplist1: ['设备主人上报', '班组长确认', '设备主人确认', '结束'],
        steplist2: ['设备主人上报', '班组长确认', '专职确认', '设备主人确认', '结束'],
        steplist3: ['设备主人上报', '班组长确认', '专职确认', '工区分管领导确认', '设备主人确认', '结束'],
        form: {
          banzhu: '',
          uselist: '',
          VoltageLevel: '', // 电压
          HiddenDangerLine: [], // 隐患XL
          cable: [], // DL
          HiddenEquipmentType: '', // 隐患设备类
          HiddenEquipment: [], // 隐患设备
          HiddenPart: '', // 隐藏部位
          // -----------------------------------------------------------
          DiscoveryMethod: '', // 发现方式
          FindPeople: '', // //发现人
          DiscoveryUnit: '', // 发现单位
          date_time: '', // 发现日期
          DiscoveryTeam: '', // 发现班组
          // -----------------------------------------------------------
          HiddenDangerLocation: '', // 隐患地理位置
          Hiddendangerlocationlongitude: '', // 隐患位置经度
          Hiddendangerlocationdimension: '', // 隐患位置维度
          Sixtypeshiddendangers: '', // 六防隐患类型
          Hiddendangertype: '', // 隐患类型
          Hiddendangerlevel: '', // 隐患等级

          HiddenPrimitiveUnit: '', // 隐患原单位
          Hiddencontact: '', // 隐患原联系人
          contactnumber: '', // 联系电话

          ConstructionStatus: '', // 施工状态
          Hiddendangerdescription: '', // 隐患描述
          sbremarks: '', // 上报备注
          FulfillmentCondition: 0, // 是否具有实现计划
          PlanNotes: '', // 计划备注
          DisposaldutyTeam: '', // 处置（值守）班组
          DisposeWatchman: '', // 处置（值守）人
          DisposalTime: '', // 处置时间
          HiddendangerprocesscontrolMeasures: '', // 隐患过程管控措施
          radio: '0', // 审核结果
          ApprovalComments: '', // 审核意见
          Confirmor: '', // 确认人
          verifyTime: '', // 确认时间
          Wfpictures: [], // 技能图片
          spbz: '' //审批班组（不传值）
        },
        sbremarkstext_lable: 0,
        Hiddendangerdescriptiontext_lable: 0,
        showDialog: this.submitparameter.show, // 打开弹框
        formRules: {
          PlanNotes: [{
            required: true,
            message: '请输入计划备注',
            trigger: 'change'
          }],
          DisposaldutyTeam: [{
            required: true,
            message: '请选择处置（值守）班组',
            trigger: 'change'
          }],
          DisposeWatchman: [{
            required: true,
            message: '请选择处置（值守）人',
            trigger: 'change'
          }],
          DisposalTime: [{
            required: true,
            message: '请选择处置时间',
            trigger: 'change'
          }],
          // HiddendangerprocesscontrolMeasures: [{
          //   required: true,
          //   message: '请输入隐患过程管控措施',
          //   trigger: 'change',
          // }],
          ApprovalComments: [{
            required: true,
            message: '请输入审核意见',
            trigger: 'change'
          }],
          Confirmor: [{
            required: true,
            message: '请选择确认人',
            trigger: 'change'
          }],
          verifyTime: [{
            required: true,
            message: '请选择确认时间',
            trigger: 'change'
          }]
        },
        // 表头
        tableTitle: [{
            label: '节点名称',
            prop: 'currentnodename'
          },
          {
            label: '处理人',
            prop: 'currentprocessor'
          },
          {
            label: '处理班组',
            prop: 'currentbz'
          },

          {
            label: '处理时间',
            prop: 'currentdate'
          },
          {
            label: '耗时',
            prop: 'usetime'
          },
          {
            label: '意见',
            prop: 'opinion'
          }
        ],
        tableData: [],
        sevdata: {
          zsrrenlist: [] // 值守人
        },
        Alllist: {
          yongHu: [],
          zsrrenlist: []
        }
      }
    },
    watch: {
      submitparameter(val) {
        this.showDialog = val.show
      },
      planshow(val) {//隐患处置计划改变时
        if (val === true) {
          this.form.HiddendangerprocesscontrolMeasures = this.submitparameter.Detailsdata.controlmeasures
          this.form.DisposalTime = this.submitparameter.Detailsdata.managementtime
          this.form.DisposaldutyTeam = this.submitparameter.Detailsdata.managementbz //值守班组
          this.chuzhiZSbzchangeFun(this.submitparameter.Detailsdata.managementbz)
          this.form.DisposeWatchman = this.submitparameter.Detailsdata.managementpeople //值守人
          this.form.PlanNotes = this.submitparameter.Detailsdata.remarks
        }
        if (val === false) {
          this.form.HiddendangerprocesscontrolMeasures = ''
          this.form.DisposalTime = ''
          this.form.DisposeWatchman = ''
          this.form.DisposaldutyTeam = ''
          this.form.PlanNotes = ''
        }
      }
    },
    mounted() {
      // 获取查看权限 如果是false就是处理审核状态
      if (this.submitparameter.Police === true) {
        this.Viewstats = true
      }
      // //console.log(this.submitReviewparameter,1123)
      this.chuliren = this.submitparameter.Detailsdata.currentprocessor
      this.form.VoltageLevel = this.submitparameter.Detailsdata.voltage // DYDJ
      this.form.HiddenDangerLine = this.submitparameter.Detailsdata.lineid.split(',') // 隐患XL
      this.form.cable = this.submitparameter.Detailsdata.cableJson // DL
      this.form.HiddenEquipmentType = this.submitparameter.Detailsdata.hdeqtype // 设备类型
      this.form.HiddenEquipment = this.submitparameter.Detailsdata.hdeq.split(',') // 隐患设备1
      this.form.HiddenPart = this.submitparameter.Detailsdata.hdposition // 隐患部位
      // ---------------------------------------------
      this.form.DiscoveryMethod = this.submitparameter.Detailsdata.findtype // 发现方式
      this.form.FindPeople = this.submitparameter.Detailsdata.finduser // 发现人
      this.form.DiscoveryUnit = this.submitparameter.Detailsdata.findunit // 发现单位
      this.form.date_time = this.submitparameter.Detailsdata.finddate // 发现日期
      this.form.DiscoveryTeam = this.submitparameter.Detailsdata.findbz // 发现班组
      // ---------------------------------------------
      this.form.HiddenDangerLocation = this.submitparameter.Detailsdata.findaddress // 隐患地址
      this.form.Hiddendangerlocationlongitude = this.submitparameter.Detailsdata.longitude // 隐患经度
      this.form.Hiddendangerlocationdimension = this.submitparameter.Detailsdata.latitude // 隐患维度
      this.form.Sixtypeshiddendangers = this.submitparameter.Detailsdata.sixhdtype // 六防隐患类型
      this.form.Hiddendangertype = this.submitparameter.Detailsdata.hdtype // 隐患类型
      this.form.Hiddendangerlevel = this.submitparameter.Detailsdata.hdclass // 隐患等级
      // ---------------------------------------------
      this.form.HiddenPrimitiveUnit = this.submitparameter.Detailsdata.hdcompany // 隐患地址
      this.form.Hiddencontact = this.submitparameter.Detailsdata.hdcontacts // 隐患经度
      this.form.contactnumber = this.submitparameter.Detailsdata.telephone // 隐患维度
      this.form.ConstructionStatus = this.submitparameter.Detailsdata.construction // 六防隐患类型
      this.form.Hiddendangerdescription = this.submitparameter.Detailsdata.hdreason // 隐患类型
      this.form.sbremarks = this.submitparameter.Detailsdata.sbremarks // 隐患等级
      this.FulfillmentConditionchange(this.submitparameter.Detailsdata.implcond)
      this.form.FulfillmentCondition = this.submitparameter.Detailsdata.implcond // 隐患地址

      this.form.DisposaldutyTeam = this.submitparameter.Detailsdata.managementbz // 值守班组
      this.chuzhiZSbzchangeFun(this.submitparameter.Detailsdata.managementbz)
      this.form.DisposeWatchman = this.submitparameter.Detailsdata.managementpeople // 值守人

      this.form.DisposalTime = this.submitparameter.Detailsdata.managementtime // 六防隐患类型
      this.form.treatmentplan = this.submitparameter.Detailsdata.treatmentplan // 隐患类型
      this.form.ApprovalComments = this.submitparameter.Detailsdata.auditOpinion // 隐患等级
      this.form.PlanNotes = this.submitparameter.Detailsdata.remarks // 隐患等级
      this.form.HiddendangerprocesscontrolMeasures = this.submitparameter.Detailsdata.controlmeasures // 隐患等级
      this.BasicInformationlistfun()
      this.Alllist.yongHu = this.selection.yongHu //模糊人员全数据
    },
    methods: {
      // ------------------------------------------------------------模糊查询---------------------------------------------------------------------
      //下一审批人
      filteruseList(query = '') {
        let _this = this
        const arr = this.Alllist.yongHu.filter(item => {
          return item.value.includes(query) || item.id.includes(query)
        })
        if (arr) {
          _this.selection.yongHu = arr
        }
      },
      //值守人
      filterZSRList(query = '') {
        let _this = this
        const arr = this.Alllist.zsrrenlist.filter(item => {
          //console.log(item)
          return item.name.includes(query) || item.id.includes(query)
        })
        if (arr) {
          //console.log(arr)
          _this.sevdata.zsrrenlist = arr
        }
      },
      // ---------------------------------------------------------------------------------------------------------------------------------
      chuzhiZSbzchangeFun(val) {
        this.form.DisposeWatchman = ''
        const data = {
          groupname: val // 发现班组id
        }
        userList(qs.stringify(data)).then(response => {
          if (response.status === 200) {
            if (response.data.msg === '操作成功') {
              this.sevdata.zsrrenlist = response.data.data // DL下拉
              this.Alllist.zsrrenlist = this.sevdata.zsrrenlist //模糊人员全数据
            } else {
              this.$message({
                message: '值守人下拉列表获取失败',
                type: 'error'
              })
            }
          }
        })
      },
      BasicInformationlistfun() {
        const data = {
          objId: this.submitparameter.Detailsdata.objId
        }
        tHiddendangerMessagegetEditeInfo(qs.stringify(data)).then(response => {
          if (response.status === 200) {
            if (response.data.rows[0].fileNameBzList.length > 0) { // 班组文件
              if (response.data.rows[0].fileNameBzList[0].url) {
                this.constructionvalStatus = true
                this.constructionvalSrc = process.env.VUE_APP_BASE_API + response.data.rows[0].fileNameBzList[0].url
              }
              this.constructionval = response.data.rows[0].fileNameBzList[0].name // 名称地址
            }
            if (response.data.rows[0].fileNameList.length > 0) { // 隐患处理方案
              if (response.data.rows[0].fileNameList[0].url !== '') {
                this.HiddenFileUploadDownloadStatus = true // 下载按钮状态打开
                this.HiddenFileUploadDownloadSrc = process.env.VUE_APP_BASE_API + response.data.rows[0].fileNameList[
                  0].url // 下载地址
              }
              this.HDTPlaninputval = response.data.rows[0].fileNameList[0].name // 文件显示名称地址
            }
            //普通图片
            let PicturesList = response.data.rows[0].picturesList
            this.fileList = response.data.rows[0].picturesList
            if (PicturesList.length > 0) {
              for (var p = 0; p < PicturesList.length; p++) {
                this.fileList[p].url = process.env.VUE_APP_BASE_API + PicturesList[p].url
              }
            } else {
              //console.log('编辑模式下没有图片')
            }
            //物防图片
            let WfPicturesList = response.data.rows[0].WfPicturesList
            this.form.Wfpictures = response.data.rows[0].WfPicturesList
            if (this.Roles !== '设备主人确认') {
              if (WfPicturesList.length > 0) {
                for (var w = 0; w < WfPicturesList.length; w++) {
                  this.form.Wfpictures[w].url = process.env.VUE_APP_BASE_API + WfPicturesList[w].url
                }
              } else {
                //console.log('编辑模式下没有图片')
              }
            }
            this.tableData = response.data.rows[0].liuChengXinXi
            this.num = Number(response.data.rows[0].DangQianJieDian)
            if (Number(response.data.rows[0].DangQianJieDian) === 5) {
              this.num = Number(response.data.rows[0].DangQianJieDian) + 1
            }
            this.gradeDatachange()//匹配当前节点
          }
        })
      },
      // 获取流程
      gradeDatachange() {
        if (this.form.Hiddendangerlevel === '一般') {
          this.steplist = this.steplist1
        }
        if (this.form.Hiddendangerlevel === '严重') {
          this.steplist = this.steplist2
        }
        if (this.form.Hiddendangerlevel === '危急') {
          this.steplist = this.steplist3
        }
        this.Roles = this.steplist[this.num]
        if (this.Roles === '设备主人确认') {
          this.shebeizhurenquerenStarts = true
          // alert('进入模块')
        }
      },
      // 是否具有实现条件改变函数
      FulfillmentConditionchange(val) {
        if (val === '1' || val === null) {
          this.planshow = false
        } else {
          this.planshow = true
        }
      },
      // ----------------------------------------文件上传-操作--------------------------------------
      // 施工文件
      HiddenDangerTreatmentPlanSuccess(res, file) {
        if (res.msg === '操作成功') {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.constructionval = ''
          this.constructionval = res.data.wjlj
          this.constructionvalStatus = false
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      },
      // 验证类型
      beforUploadflie(file) {
        const isLt2M = file.size / 1024 / 1024 < 25
        if (!isLt2M) {
          this.$message.error('文件不能超过 25MB!')
        }
        return isLt2M
      },
      ClearconstructionvalFun() {
        this.constructionval = ''
        this.constructionvalStatus = false
        this.constructionvalSrc = ''
        this.$message({
          message: '文件清空成功',
          type: 'success'
        })
      },
      // 隐患处置方案执行成功方法
      HiddenFileUploadSuccessFun(res, file) {
        if (res.msg === '操作成功') {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.HDTPlaninputval = ''
          this.HDTPlaninputval = res.data.wjlj
          this.HiddenFileUploadDownloadStatus = false
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      },
      // 患处置方案验证行数
      beforHiddenFileUploadFun(file) {
        const isLt2M = file.size / 1024 / 1024 < 25
        if (!isLt2M) {
          this.$message.error('文件不能超过 25MB!')
        }
        return isLt2M
      },
      ClearHDTPlaninputvalFun() {
        this.HDTPlaninputval = ''
        this.HiddenFileUploadDownloadStatus = false
        this.HiddenFileUploadDownloadSrc = ''
        this.$message({
          message: '文件清空成功',
          type: 'success'
        })
      },
      // ----------------------------------------图片上传-操作--------------------------------------

      // 图片预览弹窗关闭
      PreviewClose(done) {
        this.dialogVisible = false
        this.SPRdialog = false
      },

      // 图片删除
      handleRemove(file, fileList) {
        this.form.Wfpictures = fileList
      },
      // 预览弹窗开启赋值图片
      handlePreview(file) {
        this.imgshow = true
        this.imageUrl = file.url
        this.dialogVisible = true
      },
      // 图片上传成功
      handleAvatarSuccess(res, file) {
        if (res.msg === '操作成功') {
          file.name = res.data.wjlj
          this.form.Wfpictures.push(file)
          this.$message({
            message: res.msg,
            type: 'success'
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      },
      beforeAvatarUpload(file) {
        const arr = file.type.split('/')
        const isJPG = arr[0] === 'image'
        const isLt2M = file.size / 1024 / 1024 < 25
        if (!isJPG) {
          this.$message.error('只支持图片格式呦!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 25MB!')
        }
        return isJPG && isLt2M
      },
      // 取消按钮
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.showDialog = false
            this.$emit('childFn', {
              showView: this.showDialog
            })
            done()
          })
          .catch(_ => {})
      },

      /**
       * 确认按钮
       */
      SuerFun() {
        this.showDialog = false
        this.$emit('childFn', {
          showView: this.showDialog,
          refreshListshow: true
        })
      },
      // 发现班组改变时带出大学人员
      FXbzchangeFun(val) {
        this.form.Confirmor = ''
        const data = {
          groupname: val // 发现班组id
        }
        userList(qs.stringify(data)).then(response => {
          if (response.status === 200) {
            if (response.data.msg === '操作成功') {

              this.sprvalArrY = response.data.data // DL下拉
            } else {
              this.$message({
                message: '隐患类型下拉列表获取失败',
                type: 'error'
              })
            }
          }
        })
      },

      hidedialog() {
        if (this.form.Confirmor !== '') {
          this.postdataFun()
        } else {
          this.$message({
            message: '请选择下一审批人',
            type: 'error'
          })
        }
      },
      SPRdialogshowFun() {
        this.SPRdialog = true
      },
      postdataFun() {
        var arry = []
        if (this.form.Wfpictures.length > 0) {
          for (let i = 0; i < this.form.Wfpictures.length; i++) {
            arry.push(this.form.Wfpictures[i].name)
          }
        }
          this.inputdata.objId=this.submitparameter.Detailsdata.objId,
          this.inputdata.currentprocessor= this.form.Confirmor,
          this.inputdata.hdclass= this.submitparameter.Detailsdata.hdclass,
          this.inputdata.isAgren= this.form.radio,
          this.inputdata.construction= this.submitparameter.Detailsdata.construction,
          this.inputdata.implcond= this.form.FulfillmentCondition,
          this.inputdata.managementbz=this.form.DisposaldutyTeam,
          this.inputdata.managementpeople= this.form.DisposeWatchman,
          this.inputdata.managementtime= this.form.DisposalTime,
          // treatmentplan: this.form.HiddendangerprocesscontrolMeasures,
          this.inputdata.auditOpinion=this.form.ApprovalComments,
          this.inputdata.remarks=this.form.PlanNotes,
          this.inputdata.controlmeasures=this.form.HiddendangerprocesscontrolMeasures,
          this.inputdata.filename= this.HDTPlaninputval, // 隐患处置方案文件地址
          this.inputdata.filenameBz= this.constructionval, // 施工文件
          this.inputdata.isstart= 1
        if (this.Roles === '设备主人确认') {
          this.inputdata.Wfpictures = arry.toString()
        }

        edit(qs.stringify(this.inputdata)).then(response => {
          if (response.status === 200) {
            if (response.data.msg === '操作成功') {
              this.$message({
                message: response.data.msg,
                type: 'success'
              })
              this.SuerFun()
            } else {
              this.$message({
                message: response.data.msg,
                type: 'error'
              })
            }
          }
        })
      },
      /** 新增*/
      submit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.Roles === '设备主人确认') {
              this.postdataFun()
            } else {
              this.SPRdialogshowFun()
            }

          }
        })
      },
      /** 新增*/
      adminsubmit() {
        delete this.formRules.ApprovalComments
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.postdataFun()
          }
        })
      },
     /** 新增*/
     yZadmin() {
        this.$refs.child.submit();
      },
     fatherMethodOther(data){
       // this.inputdata.isstart=data.data.isstart,
       this.inputdata.lineid=data.data.lineid,
       this.inputdata.voltage=data.data.voltage, // DYDJ
       this.inputdata.cableJson=data.data.cableJson, // DYDJ
       this.inputdata.hdeqtype=data.data.hdeqtype, // 隐患设备类型
       this.inputdata.hdeq=data.data.hdeq, // 隐患设备
       this.inputdata.hdposition=data.data.hdposition, // 隐患部位
       //---------------------------------------------
       this.inputdata.findtype=data.data.findtype, // 发现方式
       this.inputdata.findbz=data.data.findbz, // 发现班组
       this.inputdata.finduser=data.datafinduser, // 发现人
       this.inputdata.finduserid=data.data.finduserid, // 发现人
       this.inputdata.finddate=data.data.finddate, // 发现日期
       //---------------------------------------------
       this.inputdata.hdcompany=data.data.hdcompany, // 隐患源单位
       this.inputdata.hdcontacts=data.data.hdcontacts, // 隐患源联系人
       this.inputdata.telephone=data.data.telephone, // 联系人电话
       this.inputdata.findaddress=data.data.findaddress, // 隐患地址
       this.inputdata.longitude=data.data.longitude, // 经度
       this.inputdata.latitude=data.data.latitude, // 维度
       this.inputdata.sixhdtype=data.data.sixhdtype, // 隐患类型

       this.inputdata.hdclass=data.data.hdclass, // 隐患等级
       this.inputdata.construction=data.data.construction, // 施工状态
       // ---------------------------------------------
       this.inputdata.hdreason=data.data.hdreason, // 隐患描述
       this.inputdata.sbremarks=data.data.sbremarks, // 上报备注
       this.inputdata.filename=data.data.filename, // 隐患处置方案文件地址
       this.inputdata.pictures=data.data.pictures, // 图片集合数据
       // this.inputdata.ddjcid=data.data.ddjcid,
       console.log(this.inputdata)
       this.adminsubmit()
     }
    }
  }
</script>
<style lang="scss">
  .shenghebox {
    .el-upload {
      // display: none;
    }

    .el-textarea.is-disabled .el-textarea__inner {
      background: none;
      // padding-left:20px;
      color: black;
    }

    .el-input.is-disabled .el-input__inner {
      background: none !important;
      color: black;
    }

    .el-input {
      width: 100%;
    }

    .el-select {
      width: 100%;
    }

    .el-input--suffix {
      width: 100%;
    }

    .el-row {
      margin-bottom: 30px;
    }

    .el-form-item__label {
      font-weight: 700;
      font-size: 0.9375rem;
    }

    .el-upload-list {
      overflow-y: auto;
      min-height: 60px !important;
      max-height: 300px !important;
      // margin-bottom: 20px;
    }

    .titlestyle {
      font-size: 20px;
      margin-top: 50px;
      margin-bottom: 30px;
    }

    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }

    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }

  .select-dy {
    .dy {
      float: left;
      width: 4.2rem;
      height: 2rem;
      line-height: 2rem;
      text-align: center;
      border-radius: 4px;
      cursor: pointer;
    }

    :nth-child(2) {
      margin: 0 2rem;
    }

    .yes {
      background-color: #35b8c0;
      color: #fff;
      border: 1px solid #35b8c0;
    }

    .no {
      border: 1px solid #35b8c0;
      color: #35b8c0;
      background-color: #fff;
    }
  }
</style>
