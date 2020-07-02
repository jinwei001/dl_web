<template>
    <div class="main-body">
        <div class="task-container">
            <div :class="taskBarClass">
                <div class="header">保电{{$xl}}段</div>
                <div class="body">
                    <div>
                        <el-button icon="el-icon-plus" type="primary" size="small" @click="tourPlanButtonLineClick" class="onSearch">新增</el-button>
                    </div>
                </div>
            </div>
            <div class="task-content">
                <!--数据操作-->
                <div class="record-operation">
                    <el-button icon="el-icon-plus" type="primary" size="small" @click="tourPlanButtonAddClick" class="onSearch">新增</el-button>
                    <el-button icon="el-icon-close" type="danger" size="small" @click="tourPlanButtonRemoveClick" plain>删除</el-button>
                    <el-button icon="el-icon-back" type="primary" size="small" @click="tourPlanButtonBackClick" class="onSearch">返回</el-button>
                    <el-button type="primary" size="small" @click="tourPlanButtonGenerateClick">生成巡视计划</el-button>
                </div>
                <!--数据列表-->
                <el-table border stripe size="small"
                          :data="tourPlan.record.items"
                          style="border: 1px solid #c7c7c7"
                          :cell-style="{borderColor: '#c7c7c7'}"
                          :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}"
                          fit
                          highlight-current-row>
                    <!--表格列-->
                    <el-table-column type="selection" width="40" align="center"></el-table-column>
                    <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                    <el-table-column prop="date" label="计划巡视日期" min-width="160"></el-table-column>
                    <el-table-column prop="lineName" :label="`${$xl}名称`" min-width="120"></el-table-column>
                    <el-table-column prop="cable" :label="`${$dl}`" min-width="80"></el-table-column>
                    <el-table-column prop="operationTeam" label="运维班组" min-width="120"></el-table-column>
                    <el-table-column prop="inspector" label="巡视人" min-width="90"></el-table-column>
                    <el-table-column prop="planSource" label="计划来源" min-width="120"></el-table-column>
                    <el-table-column prop="patrolStatus" label="巡视状态" min-width="120"></el-table-column>
                </el-table>
                <!--数据列表底部操控-->
                <div class="bottom-control">
                    <!--分页-->
                    <div class="pagination-container">
                        <el-pagination background
                                       layout="total, sizes, prev, pager, next, jumper"
                                       :current-page="1"
                                       :total="tourPlan.record.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <!--表单弹框-->
        <el-dialog :title="tourPlan.form.dialog.title" :visible.sync="tourPlan.form.dialog.show" :close-on-click-modal="false" width="460px" center>
            <!--表单-->
            <el-form ref="tourPlanForm" :model="tourPlan.form.model" :rules="tourPlan.form.rules" label-position="right" label-width="100px">
                <el-form-item label="计划巡视日期">
                    <el-date-picker size="small" v-model="tourPlan.form.model.date" type="date" class="date-block" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item :label="`${$xl}名称`">
                    <el-select size="small" v-model="tourPlan.form.model.lineName" class="form-item-select"></el-select>
                </el-form-item>
                <el-form-item :label="`${$dl}`">
                    <el-select size="small" v-model="tourPlan.form.model.cable" class="form-item-select"></el-select>
                </el-form-item>
                <el-form-item label="运维班组">
                    <el-select size="small" v-model="tourPlan.form.model.operationTeam" class="form-item-select"></el-select>
                </el-form-item>
                <el-form-item label="巡视人">
                    <el-select size="small" v-model="tourPlan.form.model.inspector" class="form-item-select"></el-select>
                </el-form-item>
                <el-form-item label="计划来源">
                    <el-select size="small" v-model="tourPlan.form.model.planSource" class="form-item-select"></el-select>
                </el-form-item>
                <el-form-item label="巡视状态">
                    <el-select size="small" v-model="tourPlan.form.model.patrolStatus" class="form-item-select"></el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" class="onSearch" @click="tourPlanButtonSaveClick">保存</el-button>
                <el-button type="default" size="small" class="UserSearchFun" @click="tourPlanButtonCancelSaveClick">取消</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: 'TourPlanManage',
        components: {},
        data() {
            return {
                //边栏开关
                barToggle: false,
                //巡视计划
                tourPlan: {
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
                            //计划巡视日期
                            date: null,
                            //XL名称
                            lineName: null,
                            //dl
                            cable: null,
                            //运维班组
                            operationTeam: null,
                            //巡视人
                            inspector: null,
                            //计划来源
                            planSource: null,
                            //巡视状态
                            patrolStatus: null,
                        },
                    },
                    //记录
                    record: {
                        //记录总数
                        total: 3,
                        //记录集
                        items: [
                            {
                                date: '9147',
                                lineName: '8724',
                                cable: '7738',
                                operationTeam: '7389',
                                inspector: '3777',
                                planSource: '5635',
                                patrolStatus: '5808',
                            },
                            {
                                date: '9814',
                                lineName: '5497',
                                cable: '8108',
                                operationTeam: '4777',
                                inspector: '9146',
                                planSource: '9812',
                                patrolStatus: '9060',
                            },
                            {
                                date: '5082',
                                lineName: '9289',
                                cable: '1861',
                                operationTeam: '2634',
                                inspector: '7440',
                                planSource: '7523',
                                patrolStatus: '2728',
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
                //初始化巡视计划列表
                //this.loadTourPlans();
            },

            /**
             * 查询按钮点击
             */
            tourPlanButtonQueryClick() {
                //...
            },

            /**
             * 重置表单点击
             */
            tourPlanButtonResetClick() {
                //...
            },

            /**
             * XL段增加按钮点击
             */
            tourPlanButtonLineClick() {
                this.tourPlan.form.dialog.show = true;
                this.tourPlan.form.dialog.title = '添加';
            },

            /**
             * 增加按钮点击
             */
            tourPlanButtonAddClick() {
                this.barToggle = !this.barToggle;
            },

            /**
             * 取消保存按钮点击
             */
            tourPlanButtonCancelSaveClick() {
                this.tourPlan.form.dialog.show = false;
            },

            /**
             * 保存按钮点击
             */
            tourPlanButtonSaveClick() {
                this.$message('保存成功');
            },

            /**
             * 编辑按钮点击
             * @param row 行数据
             */
            tourPlanButtonEditClick(row) {
                this.tourPlan.form.dialog.show = true;
                this.tourPlan.form.dialog.title = '修改';
            },

            /**
             * 删除按钮点击
             * @param row 行数据
             */
            tourPlanButtonRemoveClick(row) {
                if (!confirm('确定删除吗？删除后无法恢复')) {
                    return;
                }
                this.$message('删除成功');
            },

            /**
             * 返回按钮点击
             */
            tourPlanButtonBackClick() {
                //...
            },

            /**
             * 生成按钮点击
             */
            tourPlanButtonGenerateClick() {
                //...
            },
        }
    }
</script>