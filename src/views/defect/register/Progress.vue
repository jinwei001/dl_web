<template>
<div>
<!--开启流程表单弹框-->
        <el-dialog :title="startProcess.form.dialog.title" :visible.sync="true" :close-on-click-modal="false" width="660px" center>
            <!--表单-->
            <el-form ref="startProcessForm" :model="startProcess.form.model" :rules="startProcess.form.rules" label-position="right" label-width="100px">
                <el-row :gutter="10">
                    <el-col :span="24">
                        <el-form-item label="审批结果">
                            <el-radio-group v-model="startProcess.form.model.result">
                                <el-radio label="1">同意</el-radio>
                                <el-radio label="0">不同意</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="指定班组">
                            <el-select size="small" v-model="startProcess.form.model.group" class="form-item-select"></el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="指定人">
                            <el-select size="small" v-model="startProcess.form.model.user" class="form-item-select"></el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :span="24">
                        <el-form-item label="审批意见">
                            <el-input size="small" v-model="startProcess.form.model.comment" type="textarea" :rows="3"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" class="onSearch" @click="startProcessButtonSaveClick">保存</el-button>
                <el-button type="default" size="small" class="UserSearchFun" @click="startProcessButtonCancelSaveClick">取消</el-button>
            </div>
        </el-dialog>
        </div>
</template>

<script>
export default {
components: {},
data() {
return {

};
},
computed: {},
watch: {},
methods: {

},
created() {

},
mounted() {

},
}
</script>
<style lang='scss' scoped>
</style>