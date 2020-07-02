<template>
  <div class="importMain">
    <div class="importCon">
      <!--<div class="choseFileDiv">-->
      <!--<div @click="$refs.inputFile.click()">-->
      <!--<img src="@/icons/images/choseFileIcon.png" alt="">-->
      <!--<p style="text-align: center">点击此处选择文件进行导入</p>-->
      <!--</div>-->
      <!--<input-->
      <!--type="file"-->
      <!--ref="inputFile"-->
      <!--style="display:none"-->
      <!--multiple-->
      <!--@change="changeFuc($event)">-->
      <!--</div>-->
      <div class="choseFileDiv">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          with-credentials
          :limit="3"
          :http-request="httpRequest"
          :file-list="fileList"
          :on-exceed="handleExceed"
        >
          <img src="@/icons/images/choseFileIcon.png" alt="">
          <!--<el-button size="small" type="primary">点击此处选择文件进行导入</el-button>-->
          <p style="text-align: center">点击此处选择文件进行导入</p>
        </el-upload>
      </div>
    </div>
    <div class="buttonCon">
      <a :href="assetsURL" target="_blank" download="" class="downLoad">下载模板</a>
      <el-button type="danger" @click="clearAllData">清空所有数据</el-button>
    </div>
  </div>
</template>

<script>
  import { upLoadFile, deleteAll, putFile } from '@/api/cableandchannel/KeyToImport/KeyToImport'

  export default {
    data() {
      return {
        assetsURL: '/assets/templateDownload/' + this.$dl + '台账信息(1).xlsx',
        uploadData: {
          file: {}
        },
        fileList: []
      }
    },
    methods: {
      handleExceed(files, fileList) {
        //   this.$message.warning()
      },
      httpRequest(param) {
        //console.log(param)
        let formData = new FormData()
        formData.append('file', param.file)
        putFile(formData).then(response => {
          //console.log(response)
          if (response.data.code == 0) {
            this.$message({
              message: '导入成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '导入失败',
              type: 'error'
            })
          }
        })
      },

      // 选择文件
      choseFuc() {
      },
      // changeFuc(e) {
      //   //console.log(e.target.files[0]);
      //   this.uploadData.file = e.target.files[0]
      //   //console.log(this.uploadData);
      //   upLoadFile(this.uploadData).then(response => {
      //     //console.log(response);
      //     if (response.code == 0) {
      //       this.$message({
      //         message: '导入成功',
      //         type: 'success'
      //       })
      //     } else {
      //       this.$message({
      //         message: '导入失败',
      //         type: 'error'
      //       })
      //     }
      //   })
      // },
      // 清空所有数据
      clearAllData() {
        this.$confirm('确认要删除所有数据吗？')
          .then(_ => {
            deleteAll().then(response => {
              //console.log(response)
              if (response.data.code == 0) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '删除失败',
                  type: 'error'
                })
              }
            })
            done()
          })
          .catch(_ => {
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .importMain {
    width: 100%;
    padding: 20px;

    .importCon {
      width: 100%;
      height: 180px;
      border: 1px dashed #dcdee2;

      .choseFileDiv div {
        font-size: 16px;
        color: #333333;
        margin-top: 35px;
      }

      .choseFileDiv div img {
        display: block;
        margin: 0 auto;
      }

      .choseFileDiv {
        position: relative;
        display: block;
        overflow: hidden;
        margin: 0 auto;
        width: 40%;
      }
    }

    .buttonCon {
      width: 40%;
      margin: 20px auto;
      display: flex;
      justify-content: center;
    }

    .downLoad {
      color: #2d8cf0;
      margin-right: 20px;
      margin-top: 12px;
    }
  }
</style>
<style lang="scss">
  .upload-demo .el-upload {
    display: block;
  }
</style>
