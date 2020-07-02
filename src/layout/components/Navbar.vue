<template>
  <div class="navbar">
    <div class="companyLogo" v-if="isnw" style="border-right:1px solid #c7cfcf"></div>
    <div class="companyLogo2" v-else style="border-right:1px solid #c7cfcf"></div>

    <el-row>
      <hamburger
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
      <el-col :span="5" style="line-height: 55px; width:25%" v-if="isnw">
        <img src="./NavBarimg/CompanyName.png" />
        <span
          style="color: #bfc2b6;font-size: 12px;line-height: 25px;text-align: center;"
        >地级市应用</span>
      </el-col>
      <el-col :span="6" v-else>
        <img src />
      </el-col>

      <el-col :span="14">
        <div style="float:right;">
          <div
            class="nam-countent"
            :title="$store.state.user.UserName"
          >{{$store.state.user.UserName?$store.state.user.UserName:'无锡供电公司高压' + this.$dl + '专业精益化管理综合平台'}}</div>
        </div>
        <div class="right-menu">
          <el-dropdown class="avatar-container" trigger="click">
            <div class="avatar-wrapper">
              <!-- <img src="~@/icons/gif/icon.gif" class="user-avatar" /> -->

              <img src="./NavBarimg/Avatar.png" />

              <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown" class="user-dropdown">
              <router-link to="/index">
                <el-dropdown-item>主页</el-dropdown-item>
              </router-link>
              <el-dropdown-item divided>
                <span style="display:block;width:100%" @click.prevent="logoutFn">退出</span>
              </el-dropdown-item>
              <!-- <el-dropdown-item divided>
                <span style="display:block;" @click="logout">设置</span>
              </el-dropdown-item>-->
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";
import { login, logout, getInfo } from "@/api/user";
import {
  getToken,
  getUserId,
  setToken,
  setUserId,
  removeToken,
  removeUserId
} from "@/utils/auth";
export default {
  components: {
    Hamburger
  },
  data() {
    return {
      timer: "", // 定义一个定时器的变量
      // currentTime: new Date() // 获取当前时间
      isnw: this.$png
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"])
  },
  created() {
    // this.currentTime = "正在加载";
    // var _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    // this.timer = setInterval(function() {
    //   _this.currentTime = // 修改数据date
    //     new Date().getFullYear() +
    //     "-" +
    //     (new Date().getMonth() + 1) +
    //     "-" +
    //     new Date().getDate() +
    //     " " +
    //     new Date().getHours() +
    //     ":" +
    //     new Date().getMinutes() +
    //     ": " +
    //     new Date().getSeconds();
    // }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    logoutFn() {
      this.$confirm("确认要退出吗？")
        .then(_ => {
          this.$store
            .dispatch("user/logout")
            .then(res => {
              this.$router.push(`/wxdl/login`);
              this.$router.push({
                path: this.redirect || "/wxdl/login"
              });
              window.location.reload()
            })
            .catch(err => {
              //console.log(err);
            });
        })
        .catch(_ => {});
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  display: inline-block;
  border: none;
  vertical-align: baseline !important;
}
.nam-countent {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 5rem;
  align-items: center;
  line-height: 50px;
  cursor: default;
}
.scnr-content {
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 45px;
}
.navbar {
  width: 100%;
  height: 50px;
  overflow: hidden;
  position: fixed;
  z-index: 22;
  background: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .companyLogo {
    float: left;
    width: 240px;
    height: 50px;
    background: url("./NavBarimg/logo.png") no-repeat;
    background-color: rgb(17, 120, 125);
    background-size: 100% 100%;
    .companyLogoPic {
      text-align: center;
      height: 100%;
    }
  }
  .companyLogo2 {
    float: left;
    width: 240px;
    height: 50px;
    // background: url("./NavBarimg/logo.png") no-repeat;
    background-color: rgb(17, 120, 125);
    background-size: 100% 100%;
    .companyLogoPic {
      text-align: center;
      height: 100%;
    }
  }

  .hamburger-container {
    color: #5a5e66;
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
    height: 50px;
    width: 900px;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    margin-left: 100px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
