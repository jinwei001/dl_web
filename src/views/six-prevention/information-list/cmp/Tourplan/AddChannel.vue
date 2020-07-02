<template>
  <!-- <h2>XL巡视计划管理</h2> -->
  <div class="xs-hastitle">
    <el-dialog :visible.sync="showDialog" title="选择通道" v-dialogDrag :center="true" :before-close="selecthandleClose">
      <el-form ref="dataForm" :model="searchForm" label-position="left" style="width:100% ;margin: 0 auto;">
        <div class="Form-input">

        <div class="Form-input">
          <div class="form-item">
            <label class="form-label">通道名称：</label>
           <el-select v-model="searchForm.id" clearable placeholder="请选择">
            <el-option v-for="item in selection.channelsArr" :key="item.id" :label="item.tdName" :value="item.id"></el-option>
          </el-select>
          
          </div>
           <div class="respont-content">
            <el-form>
              <el-col>
                <el-button class="onSearch" @click="onSearch">查询</el-button>
                <el-button class="onSearch" @click="AddNewTdFn">新增</el-button>
              </el-col>
            </el-form>
          </div>
        </div>
        </div>

        <div class="table">
          <div class="table">
            <el-table height="500" :data="tableData" style="border: 1px solid #c7c7c7" :cell-style="{borderColor: '#c7c7c7'}" :header-cell-style="{'background':'#cddce6',borderColor: '#c7c7c7'}" border fit highlight-current-row @selection-change="CheckFun">
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
              <el-table-column prop="tdName" label="通道名称"></el-table-column>
              <el-table-column prop="qjName" label="前井名称"></el-table-column>
              <el-table-column prop="hjName" label="后井名称"></el-table-column>

            </el-table>
          </div>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import '@/styles/myStyle/index.scss'
import Pagination from '@/components/Pagination'
import { addNewchannels as channelsDetail } from '@/api/patrolmanagement'
export default {
  props: {
    selection: {}
  },
  data() {
    return {
      showDialog: true,
      CheckedSelection: [],
      flag: 0,
      yes: 'yes',
      no: 'no',
      form: {
        id: ''
      },
      xszq: '',
      selectCheckTd: null,
      tableData: [],

      searchForm: {
        id:'',
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      // 获取列表数据
      let res = await channelsDetail(this.searchForm.id)
      this.tableData = res.data.data
    },
    onSearch() {
      this.getData()
    },

    /**选择 110 或者 220 颜色选择*/
    chooseEmer(itype) {
      if (itype === 0) {
        this.flag = 0
        this.searchForm.kv =  this.flag;
      } else if (itype === 1) {
        this.flag = 1
      } else {
        this.flag = 2
      }
    },
    /**
     * 取消按钮
     */
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('childFn', {
            showDialog: false
          })
        })
        .catch(_ => {})
    },
    /**
     * 确认按钮
     */
    SuerFun() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          let formData = this.ruleForm
          if (!this.isEdit) {
            //新增
            let idsArr = []
            this.CheckedSelection.forEach(v => {
              idsArr.push(v.id)
            })
            if (this.CheckedSelection.length == 0) {
              this.$message('请选择'+this.$xl)
              return false
            }
            formData.ids = idsArr.join(',')
            add(this.ruleForm).then(res => {
              let val = res.data
              let type = val.code == 0 ? 'success' : 'error'
              this.$message({ type, message: val.msg })
              if (val.code == 0)
                this.$emit('childFn', {
                  showDialog: false
                })
            })
          } else {
            edit({ ...this.ruleForm, objId: this.openID }).then(res => {
              let val = res.data
              let type = val.code == 0 ? 'success' : 'error'
              this.$message({ type, message: val.msg })
              if (val.code == 0)
                this.$emit('childFn', {
                  showDialog: false
                })
            })
          }
        } else {
          //console.log('error submit!!')
          return false
        }
      })
    },
    //选中数据
    CheckFun(val) {
      this.CheckedSelection = val
    },
    getList() {},
    /**选择通道按钮 */
    SearchChanelFn() {
      this.selectshowDialog = true
    },



    /**
     * 选择通道按钮--取消按钮
     */
    selecthandleClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('childFn', {
            showDialog: false
          })
        })
        .catch(_ => {})
    },
 
    /** 新增*/
    AddNewTdFn() {
      if (this.CheckedSelection.length === 0) {
        this.$confirm('请选择'+this.$xl)
        return
      }

      this.$emit('setLine', {
        lines:this.CheckedSelection
      })

      this.$emit('childFn', {
        showDialog: false
      })
    }
  }
}
</script>
<style lang="scss" scope>
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
