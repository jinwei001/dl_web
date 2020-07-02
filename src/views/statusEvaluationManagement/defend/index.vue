<template>
  <!-- <h2>维护</h2> -->
  <div class="ztpj_bzzt">
    <div class="main-body">
      <div class="single-row-title">
        <div style="margin: 1em 0 1em 0;">
          <label>表1 &nbsp;状态量的评价表</label>
        </div>
        <div class="table">
          <el-table
            :data="tableData1"
            style="border: 1px solid #c4c8cf"
            :cell-style="{borderColor: '#c4c8cf'}"
            :header-cell-style="{'background':'#cddce6',borderColor: '#c4c8cf'}"
            border
            fit
            highlight-current-row
          >
            <el-table-column label="权重系数" align="right" width="200" :resizable="false">
              <el-table-column
                label="基本扣分"
                width="200"
                :resizable="false"
                align="center"
                header-align="left"
              >
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.jbkf"
                    clearable
                    type="number"
                    @input.native="period"
                   οninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                  />
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="ztlzt" label="状态量状态" width="200" align="center" />
            <el-table-column label="1" align="center">
              <template slot-scope="scope">{{scope.row.jbkf * 1}}</template>
            </el-table-column>
            <el-table-column label="2" align="center">
              <template slot-scope="scope">{{scope.row.jbkf * 2}}</template>
            </el-table-column>
            <el-table-column label="3" align="center">
              <template slot-scope="scope">{{scope.row.jbkf * 3}}</template>
            </el-table-column>
            <el-table-column label="4" align="center">
              <template slot-scope="scope">{{scope.row.jbkf * 4}}</template>
            </el-table-column>

            <el-table-column label="操作" width="100" align="center">
              <template slot-scope="scope">
                <el-button class="UserSearchFun" size="mini" @click="SuerFun(scope.row)">保存</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="single-row-title">
        <div style="margin: 1em 0 1em 0;">
          <label>表2 &nbsp; 110（66）~500{{$qf}}{{$dydj}}{{$dl}}{{$xl}}评价标准</label>
        </div>
        <div class="table">
          <el-table
            :data="tableData2"
            style="border: 1px solid #c4c8cf"
            :cell-style="{borderColor: '#c4c8cf'}"
            :header-cell-style="{'background':'#cddce6',borderColor: '#c4c8cf'}"
            border
            fit
            highlight-current-row
          >
            <el-table-column label="评价标准" align="right" width="200" :resizable="false">
              <el-table-column
                prop="bj"
                label="部件"
                width="200"
                :resizable="false"
                align="center"
                header-align="left"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="正常状态" align="center">
              <el-table-column label="合计扣分" align="center">
                <template slot-scope="scope">
                  <span style="font-size: 1.5rem;">≤&nbsp;</span>
                  <el-input
                    v-model="scope.row.zczthj"
                    clearable
                    style="width:50%"
                    type="number"
                    @input.native="period"
                    οninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                  />
                </template>
              </el-table-column>
              <el-table-column label="单项扣分" align="center">
                <template slot-scope="scope">
                  <span style="font-size: 1.5rem;">< &nbsp;</span>
                  <el-input
                    v-model="scope.row.zcztdx"
                    clearable
                    style="width:50%"
                    type="number"
                    @input.native="period"
                    οninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                  />
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="注意状态" align="center">
              <el-table-column label="合计扣分" align="center">
                <template slot-scope="scope">
                  <span style="font-size: 1.5rem;">>&nbsp;</span>
                  <el-input
                    v-model="scope.row.zyzthj"
                    clearable
                    style="width:50%"
                    type="number"
                    @input.native="period"
                    οninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                  />
                </template>
              </el-table-column>
              <el-table-column label="单项扣分" align="center" width="280">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.zyztdx1"
                    clearable
                    style="width:40%"
                    type="number"
                    @input.native="period"
                    οninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                  />
                  <span style="font-size: 1.5rem;">&nbsp;~&nbsp;</span>
                  <el-input
                    v-model="scope.row.zyztdx2"
                    clearable
                    style="width:40%"
                    type="number"
                    @input.native="period"
                    οninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                  />
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="异常状态" align="center">
              <el-table-column label="单项扣分" align="center" width="250">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.yczt1"
                    clearable
                    style="width:40%"
                    @input.native="period"
                    type="number"
                    οninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                  />
                  <span style="font-size: 1.5rem;">&nbsp;~&nbsp;</span>
                  <el-input
                    v-model="scope.row.yczt2"
                    clearable
                    style="width:40%"
                    @input.native="period"
                    type="number"
                    οninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                  />
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="严重状态" align="center">
              <el-table-column label="单项扣分" align="center">
                <template slot-scope="scope">
                  <span style="font-size: 1.5rem;">≥&nbsp;</span>
                  <el-input
                    v-model="scope.row.yzzt"
                    clearable
                    style="width:50%"
                    type="number"
                    @input.native="period"
                    οninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                  />
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
              <template slot-scope="scope">
                <el-button class="UserSearchFun" size="mini" @click.native="SuerFunta(scope.row)">保存</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="single-row-title">
        <div style="margin: 1em 0 1em 0;">
          <label>表3 &nbsp; 10（6）~35{{$qf}}{{$dydj}}电力{{$dl}}{{$xl}}评价标准</label>
        </div>
        <div class="table">
          <el-table
            :data="tableData3"
            style="border: 1px solid #c4c8cf"
            :cell-style="{borderColor: '#c4c8cf'}"
            :header-cell-style="{'background':'#cddce6',borderColor: '#c4c8cf'}"
            border
            fit
            highlight-current-row
          >
            <el-table-column label="部件" align="right" width="200" :resizable="false">
              <el-table-column
                prop="bj"
                label="部件"
                width="200"
                :resizable="false"
                align="center"
                header-align="left"
              ></el-table-column>
            </el-table-column>
            <el-table-column label="正常状态" align="center">
              <el-table-column label="合计扣分" align="center">
                <template slot-scope="scope">
                  <span style="font-size: 1.5rem;">≤&nbsp;</span>
                  <el-input
                    v-model="scope.row.zczthj"
                    clearable
                    style="width:50%"
                    @input.native="period"
                    type="number"
                    οninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                  />
                </template>
              </el-table-column>
              <el-table-column label="单项扣分" align="center">
                <template slot-scope="scope">
                  <span style="font-size: 1.5rem;">< &nbsp;</span>
                  <el-input
                    v-model="scope.row.zcztdx"
                    clearable
                    style="width:50%"
                    @input.native="period"
                    type="number"
                    οninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                  />
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="注意状态" align="center">
              <el-table-column label="合计扣分" align="center">
                <template slot-scope="scope">
                  <span style="font-size: 1.5rem;">>&nbsp;</span>
                  <el-input
                    v-model="scope.row.zyzthj"
                    clearable
                    style="width:50%"
                    type="number"
                    @input.native="period"
                    οninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                  />
                </template>
              </el-table-column>
              <el-table-column label="单项扣分" align="center" width="280">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.zyztdx1"
                    clearable
                    style="width:40%"
                    type="number"
                    @input.native="period"
                    οninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                  />
                  <span style="font-size: 1.5rem;">&nbsp;~&nbsp;</span>
                  <el-input
                    v-model="scope.row.zyztdx2"
                    clearable
                    style="width:40%"
                    type="number"
                    @input.native="period"
                    οninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                  />
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="异常状态" align="center">
              <el-table-column label="单项扣分" align="center" width="250">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.yczt1"
                    clearable
                    style="width:40%"
                    type="number"
                    @input.native="period"
                    οninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                  />
                  <span style="font-size: 1.5rem;">&nbsp;~&nbsp;</span>
                  <el-input
                    v-model="scope.row.yczt2"
                    clearable
                    style="width:40%"
                    type="number"
                    @input.native="period"
                    οninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                  />
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="严重状态" align="center">
              <el-table-column label="单项扣分" align="center">
                <template slot-scope="scope">
                  <span style="font-size: 1.5rem;">≥&nbsp;</span>
                  <el-input
                    v-model="scope.row.yzzt"
                    clearable
                    style="width:50%"
                    type="number"
                    @input.native="period"
                    οninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
                  />
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
              <template slot-scope="scope">
                <el-button class="UserSearchFun" size="mini" @click="SuerFunta(scope.row)">保存</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div style="margin-bottom: 4rem;"></div>
    </div>
  </div>
</template>

<script>
import {
  getListtab1,
  edittable1,
  getListtab2,
  edittable2
} from "@/api/statusE/defend/index";
export default {
  data() {
    //   Ⅰ   Ⅱ   Ⅲ    Ⅳ    Ⅴ    Ⅵ    Ⅶ    Ⅷ    Ⅸ
    return {
      tableData1: [],
      tableData2: [],
      tableData3: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    period(e) {
      e.target.value = e.target.value.replace(/[^\d]/g, "");
      e.target.value = e.target.value.replace(/^\./g, "");
      e.target.value = e.target.value.replace(/\.{2,}/g, ".");
      e.target.value = e.target.value
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
    },
    /**获取数据 */
    getList() {
      getListtab1()
        .then(res => {
          this.tableData1 = res.data.rows;
        })
        .catch(err => {
          console.log(err);
        });
      getListtab2({ dydj: 110 })
        .then(res => {
          this.tableData2 = res.data.rows;
          this.tableData2.forEach((i, j) => {
            this.$set(i, "zyztdx1", i["zyztdx"].split(",")[0]);
            this.$set(i, "zyztdx2", i["zyztdx"].split(",")[1]);
            this.$set(i, "yczt1", i["yczt"].split(",")[0]);
            this.$set(i, "yczt2", i["yczt"].split(",")[1]);
          });
        })
        .catch(err => {
          console.log(err);
        });
      getListtab2({ dydj: 10 })
        .then(res => {
          this.tableData3 = res.data.rows;
          this.tableData3.forEach((i, j) => {
            this.$set(i, "zyztdx1", i["zyztdx"].split(",")[0]);
            this.$set(i, "zyztdx2", i["zyztdx"].split(",")[1]);
            this.$set(i, "yczt1", i["yczt"].split(",")[0]);
            this.$set(i, "yczt2", i["yczt"].split(",")[1]);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    SuerFun(val) {
      edittable1(val)
        .then(res => {
          if (res.data.code == 0) {
            let type = res.data.code == 0 ? "success" : "error";
            this.$message({ type, message: res.data.msg });
            this.getList();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    SuerFunta(val) {
      console.log(val);
      let zy1 = val["zyztdx1"] == "" ? "0" : val["zyztdx1"];
      let zy2 = val["zyztdx2"] == "" ? "0" : val["zyztdx2"];
      let yc1 = val["yczt1"] == "" ? "0" : val["yczt1"];
      let yc2 = val["yczt2"] == "" ? "0" : val["yczt2"];
      this.$set(val, "zyztdx", zy1 + "," + zy2);
      this.$set(val, "yczt", yc1 + "," + yc2);
      edittable2(val)
        .then(res => {
          if (res.data.code == 0) {
            let type = res.data.code == 0 ? "success" : "error";
            this.$message({ type, message: res.data.msg });
            this.getList();
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="scss">
.ztpj_bzzt {
  .el-table thead.is-group th {
    background: none;
  }
  .el-table thead.is-group tr:first-of-type th:first-of-type {
    border-bottom: none;
  }
  .el-table thead.is-group tr:first-of-type th:first-of-type:before {
    content: "";
    position: absolute;
    width: 1px;
    height: 120px; /*这里需要自己调整，根据td的宽度和高度*/
    top: 0;
    left: 0;
    background-color: grey;
    opacity: 0.3;
    display: block;
    transform: rotate(-64deg); /*这里需要自己调整，根据线的位置*/
    transform-origin: top;
  }
  .el-table thead.is-group tr:last-of-type th:first-of-type:before {
    content: "";
    position: absolute;
    width: 1px;
    height: 120px; /*这里需要自己调整，根据td的宽度和高度*/
    bottom: 0;
    right: 0;
    background-color: grey;
    opacity: 0.3;
    display: block;
    transform: rotate(-65deg); /*这里需要自己调整，根据线的位置*/
    transform-origin: bottom;
  }
}
</style>