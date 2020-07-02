<template>
  <div class="main-body">
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <div class="search-container">
          <!--查询表单-->
          <el-form ref="queryForm" class="search-form" inline>
            <el-form-item label="保电名称">
              <el-select v-model="duty.query.params.name" size="small">
                <el-option value="">不限</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="保电等级">
              <el-select v-model="duty.query.params.level" size="small">
                <el-option value="">不限</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="保电任务单">
              <el-select v-model="duty.query.params.task" size="small">
                <el-option value="">不限</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="保电时间">
              <el-date-picker v-model="duty.query.params.startTime" size="small" type="daterange" class="date-range" format="yyyy-MM-dd" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
            </el-form-item>
          </el-form>
          <!--查询按钮-->
          <div class="search-buttons">
            <el-button type="primary" size="small" class="onSearch" @click="dutyButtonQueryClick">查询</el-button>
            <el-button type="primary" size="small" class="UserSearchFun" @click="dutyButtonResetClick">重置</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <!--数据列表-->
      <el-table
        border
        stripe
        size="small"
        :data="duty.record.items"
        style="border: 1px solid #c7c7c7"
        :cell-style="{borderColor: '#c7c7c7'}"
        :header-cell-style="{'background':'#e4ebf1',borderColor: '#c7c7c7'}"
        border
        fit
        highlight-current-row
      >
        <!--表格列-->
        <el-table-column type="selection" width="40" align="center" />
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="nameName" label="保电名称" min-width="120" />
        <el-table-column prop="levelName" label="保电等级" min-width="120" />
        <el-table-column prop="taskName" label="保电任务单" min-width="150" />
        <el-table-column prop="plan" label="保电方案" min-width="120" />
        <el-table-column prop="startTime" label="保电开始时间" min-width="160" />
        <el-table-column prop="endTime" label="保电结束时间" min-width="160" />
        <!--操作模板-->
        <el-table-column fixed="right" label="值守信息查询" width="120" align="center">
          <template slot-scope="scope">
            <el-button class="onSearch" type="primary" size="mini">查看</el-button> &nbsp;
          </template>
        </el-table-column>
      </el-table>
      <!--数据列表底部操控-->
      <div class="bottom-control">
        <!--分页-->
        <div class="pagination-container">
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="1"
            :total="duty.record.total"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DutyManage',
  components: {},
  data() {
    return {
      // 保电值守
      duty: {
        // 查询
        query: {
          // 参数
          params: {
            // 保电名称
            name: '',
            // 保电等级
            level: '',
            // 保电任务单
            task: '',
            // 保电方案
            plan: '',
            // 保电开始时间
            startTime: '',
            // 保电结束时间
            endTime: '',
            // 当前页
            page: 1
          }
        },
        // 表单
        form: {
          // 模态框
          dialog: {
            // 是否显示
            show: false,
            // 标题
            title: ''
          },
          // 模型
          model: {
            // ID
            id: null,
            // 保电名称
            name: null,
            // 保电等级
            level: null,
            // 保电任务单
            task: null,
            // 保电方案
            plan: null,
            // 保电开始时间
            startTime: null,
            // 保电结束时间
            endTime: null
          }
        },
        // 记录
        record: {
          // 记录总数
          total: 3,
          // 记录集
          items: [
            {
              nameName: '1251',
              levelName: '4758',
              taskName: '3469',
              plan: '7167',
              startTime: '2793',
              endTime: '4357'
            },
            {
              nameName: '3444',
              levelName: '5152',
              taskName: '1255',
              plan: '3648',
              startTime: '8844',
              endTime: '4629'
            },
            {
              nameName: '4279',
              levelName: '9797',
              taskName: '6304',
              plan: '1175',
              startTime: '3648',
              endTime: '3678'
            }
          ]
        }
      }
    }
  },
  // props: {
  //   Taskidname:{
  //     type: String,
  //     // 对象或数组且一定会从一个工厂函数返回默认值
  //     default: function() {
  //       return ''
  //     }
  //   }
  // },
  mounted() {
    // //console.log(this.Taskidname,'巡视接受id ')
    this.initPage()
  },
  methods: {
    /**
             * 初始化页面
             */
    async initPage() {
      // 载入查询参数
      // this.loadQueryParams();
      // 初始化保电值守列表
      // this.loadDuties();
    },

    /**
             * 查询按钮点击
             */
    dutyButtonQueryClick() {
      // ...
    },

    /**
             * 重置表单点击
             */
    dutyButtonResetClick() {
      // ...
    },

    /**
             * 增加按钮点击
             */
    dutyButtonAddClick() {
      this.duty.form.dialog.show = true
      this.duty.form.dialog.title = '添加'
    },

    /**
             * 取消保存按钮点击
             */
    dutyButtonCancelSaveClick() {
      this.duty.form.dialog.show = false
    },

    /**
             * 保存按钮点击
             */
    dutyButtonSaveClick() {
      this.$message('保存成功')
    },

    /**
             * 编辑按钮点击
             * @param row 行数据
             */
    dutyButtonEditClick(row) {
      this.duty.form.dialog.show = true
      this.duty.form.dialog.title = '修改'
    },

    /**
             * 删除按钮点击
             * @param row 行数据
             */
    dutyButtonRemoveClick(row) {
      if (!confirm('确定删除吗？删除后无法恢复')) {
        return
      }
      this.$message('删除成功')
    }
  }
}
</script>
