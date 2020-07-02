<template>
    <div class="main-body">
        <div class="task-container">
            <div :class="taskBarClass">
                <div class="header">{{$dl}}段</div>
                <div class="body">
                    <div>
                        <el-button icon="el-icon-plus" type="primary" size="small" @click="inspectionPlanButtonLineClick" class="onSearch">新增</el-button>
                    </div>
                </div>
            </div>
            <div class="task-content">
                <!--数据操作-->
                <div class="record-operation">
                    <el-button icon="el-icon-plus" type="primary" size="small" @click="inspectionPlanButtonAddClick" class="onSearch">新增</el-button>
                    <el-button icon="el-icon-close" type="danger" size="small" @click="inspectionPlanButtonRemoveClick" plain>删除</el-button>
                    <el-button icon="el-icon-back" type="primary" size="small" @click="inspectionPlanButtonBackClick" class="onSearch">返回</el-button>
                    <el-button type="primary" size="small" @click="inspectionPlanButtonGenerateClick">生成带电检修计划</el-button>
                </div>
                <!--数据列表-->
                <el-table border stripe size="small"
                          :data="inspectionPlan.record.items"
                          style="border: 1px solid #c7c7c7"
                          :cell-style="{borderColor: '#c7c7c7'}"
                          :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}"
                          fit
                          highlight-current-row>
                    <!--表格列-->
                    <el-table-column type="selection" width="40" align="center"></el-table-column>
                    <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                    <el-table-column prop="lineName" :label="`${$xl}名称`" min-width="120"></el-table-column>
                    <el-table-column prop="cable" :label="`${$dl}`" min-width="80"></el-table-column>
                    <el-table-column prop="equipmentType" label="设备类型" min-width="120"></el-table-column>
                    <el-table-column prop="maintenanceType" label="检修类型" min-width="120"></el-table-column>
                    <el-table-column prop="deviceName" label="设备名称" min-width="120"></el-table-column>
                    <el-table-column prop="phase" :label="`${$xb}`" min-width="80"></el-table-column>
                    <el-table-column prop="startTime" label="计划开始时间" min-width="160"></el-table-column>
                    <el-table-column prop="endTime" label="计划结束时间" min-width="160"></el-table-column>
                    <el-table-column prop="inspectionTeam" label="检测班组" min-width="120"></el-table-column>
                    <el-table-column prop="inspector" label="检测人" min-width="90"></el-table-column>
                </el-table>
                <!--数据列表底部操控-->
                <div class="bottom-control">
                    <!--分页-->
                    <div class="pagination-container">
                        <el-pagination background
                                       layout="total, sizes, prev, pager, next, jumper"
                                       :current-page="1"
                                       :total="inspectionPlan.record.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <!--表单弹框-->
        <el-dialog :title="inspectionPlan.form.dialog.title" :visible.sync="inspectionPlan.form.dialog.show" :close-on-click-modal="false" width="460px" center>
            <!--表单-->
            <el-form ref="inspectionPlanForm" :model="inspectionPlan.form.model" :rules="inspectionPlan.form.rules" label-position="right" label-width="100px">
                <el-form-item :label="`${$xl}名称`">
                    <el-select size="small" v-model="inspectionPlan.form.model.lineName" class="form-item-select"></el-select>
                </el-form-item>
                <el-form-item :label="`${$dl}`">
                    <el-select size="small" v-model="inspectionPlan.form.model.cable" class="form-item-select"></el-select>
                </el-form-item>
                <el-form-item label="设备类型">
                    <el-select size="small" v-model="inspectionPlan.form.model.equipmentType" class="form-item-select"></el-select>
                </el-form-item>
                <el-form-item label="检修类型">
                    <el-select size="small" v-model="inspectionPlan.form.model.maintenanceType" class="form-item-select"></el-select>
                </el-form-item>
                <el-form-item label="设备名称">
                    <el-input size="small" v-model="inspectionPlan.form.model.deviceName"></el-input>
                </el-form-item>
                <el-form-item :label="`${$xb}`">
                    <el-select size="small" v-model="inspectionPlan.form.model.phase" class="form-item-select"></el-select>
                </el-form-item>
                <el-form-item label="计划开始时间">
                    <el-date-picker size="small" v-model="inspectionPlan.form.model.startTime" type="date" class="date-block" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="计划结束时间">
                    <el-date-picker size="small" v-model="inspectionPlan.form.model.endTime" type="date" class="date-block" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="检测班组">
                    <el-select size="small" v-model="inspectionPlan.form.model.inspectionTeam" class="form-item-select"></el-select>
                </el-form-item>
                <el-form-item label="检测人">
                    <el-select size="small" v-model="inspectionPlan.form.model.inspector" class="form-item-select"></el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" class="onSearch" @click="inspectionPlanButtonSaveClick">保存</el-button>
                <el-button type="default" size="small" class="UserSearchFun" @click="inspectionPlanButtonCancelSaveClick">取消</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: 'InspectionPlanManage',
        components: {},
        data() {
            return {
                //边栏开关
                barToggle: false,
                //带电检测计划
                inspectionPlan: {
                    //表单
                    form: {
                        //模态框
                        dialog: {
                            //是否显示
                            show: false,
                            //标题
                            title: '',
                        },
                        //模型
                        model: {
                            //ID
                            id: null,
                            //XL名称
                            lineName: null,
                            //dl
                            cable: null,
                            //设备类型
                            equipmentType: null,
                            //检修类型
                            maintenanceType: null,
                            //设备名称
                            deviceName: null,
                            //xb
                            phase: null,
                            //计划开始时间
                            startTime: null,
                            //计划结束时间
                            endTime: null,
                            //检测班组
                            inspectionTeam: null,
                            //检测人
                            inspector: null,
                        },
                    },
                    //记录
                    record: {
                        //记录总数
                        total: 3,
                        //记录集
                        items: [
                            {
                                lineName: '3363',
                                cable: '6772',
                                equipmentType: '4557',
                                maintenanceType: '5180',
                                deviceName: '1176',
                                phase: '3814',
                                startTime: '3281',
                                endTime: '4351',
                                inspectionTeam: '1211',
                                inspector: '1541',
                            },
                            {
                                lineName: '4908',
                                cable: '5473',
                                equipmentType: '6352',
                                maintenanceType: '4378',
                                deviceName: '3063',
                                phase: '3768',
                                startTime: '7021',
                                endTime: '2926',
                                inspectionTeam: '6963',
                                inspector: '8240',
                            },
                            {
                                lineName: '6794',
                                cable: '4222',
                                equipmentType: '2815',
                                maintenanceType: '3699',
                                deviceName: '5855',
                                phase: '6341',
                                startTime: '8896',
                                endTime: '8138',
                                inspectionTeam: '4041',
                                inspector: '3571',
                            },
                        ],
                    }
                }
            }
        },
        computed: {
            /**
             * 边栏类
             */
            taskBarClass() {
                let className = 'task-bar';
                let barClassName = '';
                if (this.barToggle) {
                    barClassName = ' task-bar-opened';
                }
                return `${className}${barClassName}`;
            }
        },
        mounted() {
            this.initPage();
        },
        methods: {
            /**
             * 初始化页面
             */
            async initPage() {
                //载入查询参数
                //this.loadQueryParams();
                //初始化带电检测计划列表
                //this.loadInspectionPlans();
            },

            /**
             * 查询按钮点击
             */
            inspectionPlanButtonQueryClick() {
                //...
            },

            /**
             * 重置表单点击
             */
            inspectionPlanButtonResetClick() {
                //...
            },

            /**
             * XL段增加按钮点击
             */
            inspectionPlanButtonLineClick() {
                this.inspectionPlan.form.dialog.show = true;
                this.inspectionPlan.form.dialog.title = '添加';
            },

            /**
             * 增加按钮点击
             */
            inspectionPlanButtonAddClick() {
                this.barToggle = !this.barToggle;
            },

            /**
             * 取消保存按钮点击
             */
            inspectionPlanButtonCancelSaveClick() {
                this.inspectionPlan.form.dialog.show = false;
            },

            /**
             * 保存按钮点击
             */
            inspectionPlanButtonSaveClick() {
                this.$message('保存成功');
            },

            /**
             * 编辑按钮点击
             * @param row 行数据
             */
            inspectionPlanButtonEditClick(row) {
                this.inspectionPlan.form.dialog.show = true;
                this.inspectionPlan.form.dialog.title = '修改';
            },

            /**
             * 删除按钮点击
             * @param row 行数据
             */
            inspectionPlanButtonRemoveClick(row) {
                if (!confirm('确定删除吗？删除后无法恢复')) {
                    return;
                }
                this.$message('删除成功');
            },

            /**
             * 返回按钮点击
             */
            inspectionPlanButtonBackClick() {
                //...
            },

            /**
             * 生成按钮点击
             */
            inspectionPlanButtonGenerateClick() {
                //...
            },
        }
    }
</script>