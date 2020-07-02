<template>
  <!-- <h2>dl敷设记录</h2> -->
  <div>
    <div class="main-userSelect">
      <div class="searchForm_glf">
        <el-form ref="form" inline @submit.native.prevent>
          <el-form-item label="工程名称：">
            <el-input v-model="form.gcmc" clearable />
          </el-form-item>
          <!-- <el-form-item label="投运日期：">
            <el-col>
              <el-date-picker
                v-model="form.date"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-col>
          </el-form-item> -->

          <el-form-item style="float: right;margin-right: 0 !important">
            <el-button class="onSearch" @click="onSearch">查询</el-button>
            <el-button class="onSearch" style="margin-right: 0 !important" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content">
      <div class="respont-content">
        <el-form>
          <el-col>
            <el-form-item style="float: left;">
              <el-button type="primary" @click="AddFn">上传安装记录</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          style="border: 1px solid #c4c8cf"
          :cell-style="{borderColor: '#c4c8cf'}"
          :header-cell-style="{'background':'#cddce6',borderColor: '#c4c8cf'}"
          border
          fit
          highlight-current-row
        >
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column
            v-for="item in tableTitle"
            :key="item.index"
            :prop="item.prop"
            :label="item.label"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column align="center" label="操作" class-name="small-padding fixed-width" width="250">
            <template slot-scope="scope">
              <el-col>
                <el-button class="onSearch" size="small" @click="editFun(scope.row)">编辑</el-button>
                <el-button type="danger" size="small" plain @click="DelFunOne(scope.row.objId)">删除</el-button>
                <el-button type="primary" size="small">
                  <a class='download' :href='assetsURL+scope.row.wjlj' download=""  title="下载">下载</a>
                </el-button>
              </el-col>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="pagination.total>0"
          :total="pagination.total"
          :page.sync="form.pageNum"
          :limit.sync="pagination.limit"
          @pagination="getList"
        />
      </div>
    </div>
    <div v-if="isShowDialog" class="sc-sort-Dialog">
      <el-dialog v-dialogDrag :visible.sync="isShowDialog" :title="`同轴${$dl}箱安装记录`" top="20vh" :center="true" :before-close="handleClose">
        <el-form ref="dataForm" :model="form" label-position="left" style="width:100% ;margin: 0 auto;">
          <div class="Form-input">
            <div class="form-long-item">
              <label class="form-label">项目名称：</label>
              <el-select v-if="gclistdata" v-model="form.sbmc" clearable placeholder="请选择" @change="setchange">
                <el-option v-for="item in gclistdata" :key="item.objId" :label="item.gcmc" :value="item.objId" />
              </el-select>
            </div>
          </div>
          <div class="Form-input">
            <div class="form-long-item">
            <label class="form-label">文件：</label>
           <!--   <div > -->
              <!--
                <a href="javascript:;" class="file">选择文件
                </a>
                  <input input type="file" id="upload"name="FileUpload"  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" @change="changeImage($event)">
              </div> -->

              <a href="javascript:;" class="a-upload">
                  <input type="file" id="upload" name="FileUpload"  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" @change="changeImage($event)"/>{{this.fileName}}
              </a>
            </div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="UserSearchFun" @click="SuerFun" v-if="starts=='add'">保存</el-button>
          <el-button class="UserSearchFun" @click="editSuerFun"  v-if="starts=='edit'">保存</el-button>
          <el-button class="onSearch" @click="handleClose">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import '@/styles/myStyle/index.scss'
import {
  download
} from '@/api/productionReadiness/export'
import {
  tzdlxlist,
  gclist,
  tzdlxadd,
  tzdlxremove,
  tzdlxedit
} from '@/api/productionReadiness/installRecord/cable-placing'
import qs from 'qs'
export default {
  name: 'CableEquipmentLedger',
  components: {
    Pagination
  },
  data() {
    return {
      fileName:'点击这里上传文件',
      assetsURL: process.env.VUE_APP_BASE_API + '/common/downloadFile?url=',
      starts:'add',
      gcmc: null,
      fd: null,
      gclistdata: [],
      isShowDialog: false, // 查看弹框打开
      openID: null, // 打开弹框的id值
      form: {
        sbmc: '',
        objId:'',
        pageNum: 1,
        pageSize:10,
        date:'',
        gcmc:'',

      },
      pagination: {
        limit: 10,
        total: 2
      },
      // 选中的数据
      CheckedSelection: [],
      selection: {
        xlmc: [{
          id: '1',
          qb: '全部'
        }]
      },
      // 表头
      tableTitle: [{
        label: '工程名称',
        prop: 'gcmc'
      },
      {
        label: '安装记录名称',
        prop: 'wjmc'
      }
      ],
      tableData: [],
      fileList: []
    }
  },
  computed: {
    myHeader() {
      return {}
    },
    myData() {
      return {
        // "businessId":this.form.fileId,
        // "businessType":"sys_file"
      }
    }
  },
  created() {},
  mounted() {
    this.getList()
    this.gclist()
  },
  methods: {
    reset() {
      //console.log('reset')
       this.form = { brand_right: 0 }
      this.getList()
    },
    onSearch() {
      //console.log('onSearch')
      this.getList()
    },
    changeImage(e) {
      var file = e.target.files[0]
      this.fd = new FormData()
      this.fileName=file.name
      this.fd.append('file', file)
      //console.log(file.name, 't')
    },
    setchange(e) {
      //console.log(e)
      if (e !== null) {
        for (var i = 0; i < this.gclistdata.length; i++) {
          if (this.gclistdata[i].objId == e) {
            this.gcmc = this.gclistdata[i].gcmc
            //console.log(e, this.gcmc)
            break
          } else {
            this.gcmc = null
          }
        }
      }
    },
    getList() {
      const list = qs.stringify(this.form)
      tzdlxlist(list).then(res => {
        // //console.log(res.data);
        if (res.data.code == 0) {
          this.tableData = res.data.rows
          this.pagination.total = res.data.total
        }
      })
    },
    gclist() {
      const list = {}
      gclist(qs.stringify(list)).then(res => {
        // //console.log(res.data);
        if (res.data.code == 0) {
          //console.log(res.data.rows)
          this.gclistdata = res.data.rows
        }
      })
    },
    /** 删除 */
    DelFunOne(val) {
      //console.log('删除')
      const list = {
        ids: val
      }
      tzdlxremove(qs.stringify(list)).then(res => {
        // //console.log(res.data);
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.getList()
        }
      })
    },
    /** 上传 */
    AddFn() {
      //console.log('上传')
      this.open('add')
    },
    /** 编辑 */
    editFun(val) {
      //console.log('编辑')
      this.open('edit', val)
    },
    open(starts, val) {
       this.form.sbmc=null
       this.fd=new FormData()
       this.fileName='点击这里上传文件'
      if (starts == 'add') {
        this.starts='add'
        this.isShowDialog = true
      }
      if (starts == 'edit') {
        this.starts='edit'
        //console.log(val)
        this.fileName=val.wjmc+'点击更换文件'
        this.objId=val.objId
        this.form.sbmc=val.gcid
        this.gcmc=val.gcid
        this.isShowDialog = true
      }
    },
    /** 下载 */
    Download(val) {
      //console.log('下载')
      const list = qs.stringify({
        objId: val,
        name: '1hao'
      })
      // exportExcel('/zjgc/dlfs/export',list)
      download('/zjgc/dlfs/export', list)
    },

    /**
       * 取消按钮
       */
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.isShowDialog = false
          done()
        })
        .catch(_ => {})
    },
    /**
       * 确认按钮
       */
    SuerFun() {
      if (this.gcmc !== null && this.fd !== null) {
        this.fd.append('gcmc', this.gcmc) // 项目名称
        this.fd.append('gcid', this.form.sbmc) // 项目ID
        tzdlxadd(this.fd).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.getList()
          }
        })
        this.isShowDialog = false
      } else {
        //console.log(this.fd)
        if (this.gcmc == null) {
          this.$message({
            message: '请选择工程项目',
            type: 'warning'
          })
        } else {
          this.$message({
            message: '请选择上传文件',
            type: 'warning'
          })
        }
      }
    },
    //编辑保存
    editSuerFun() {
      if (this.gcmc !== null && this.fd !== null) {
        this.fd.append('gcmc', this.gcmc) // 项目名称
        this.fd.append('gcid', this.form.sbmc) // 项目ID
        this.fd.append('objId', this.objId) // 项目ID
        tzdlxedit(this.fd).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.getList()
          }
        })
        this.isShowDialog = false
      } else {
        if (this.gcmc == null) {
          this.$message({
            message: '请选择工程项目',
            type: 'warning'
          })
        }
      }
    },
    upload() {},
    /** 上传地址 */
    uploadUrl() {},
    /** 上传地址限制 */
    addFile(file, fileList) {
      //console.log(file)
      //console.log(fileList)
      this.fileList = fileList
      // 限制上传文件为5M
      var sizeIsSatisfy = file.size < 5 * 1024 * 1024
      if (sizeIsSatisfy) {
        return true
      } else {
        this.fileSizeIsSatisfy = false
        return false
      }
    },
    /** 确认上传的函数 */

    insert(formName) {}
  }
}
</script>
<style lang="scss" scope>
.a-upload {
    padding: 4px 10px;
    height: 40px;
    width: 65%;
    line-height: 35px;
    position: relative;
    cursor: pointer;
    color: #888;
    background: #fafafa;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    text-align: center;
}

.a-upload  input {
    position: absolute;
    font-size: 150px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
}

.a-upload:hover {
    color: #444;
    background: #eee;
    border-color: #ccc;
    text-decoration: none
}
</style>
