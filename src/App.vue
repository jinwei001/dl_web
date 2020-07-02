<template>
  <div id="app" @click="isDo()">
    <!-- <div id="app" @mouseover="OperatingWebsite()"> -->
    <!-- <div id="app"> -->
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true,

      lastTime: null, //最后一次点击的时间
      currentTime: null, //当前点击的时间
      timeOut: 30 * 60 * 1000, //设置超时时间： 10分钟
      // timeOut: 1 * 60 * 1000, //设置超时时间： 10分钟

      currentTime: new Date().getTime()
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    isDo() {
      this.currentTime = new Date().getTime(); //记录这次点击的时间
      if (this.currentTime - this.lastTime > this.timeOut) {
        //判断上次最后一次点击的时间和这次点击的时间间隔是否大于10分钟
        // 这里写状态已过期后执行的操作
        if (this.$route.path != "/wxdl/login") {
          this.$confirm(
            "检测到最近无任何操作，账户自动登出。请重新登录！",
            "提示",
            {
              confirmButtonText: "确定",
              showCancelButton: false,
              type: "warning"
            }
          )
            .then(() => {
              this.$store
                .dispatch("user/logout")
                .then(res => {
                  this.$router.push(`/wxdl/login`);
                  this.$router.push({
                    path: this.redirect || "/wxdl/login"
                  });
                  window.location.reload();
                })
                .catch(err => {
                });
            })
            .catch(() => {});
        }
      } else {
        this.lastTime = new Date().getTime(); //如果在10分钟内点击，则把这次点击的时间记录覆盖掉之前存的最后一次点击的时间
      }
    },
    OperatingWebsite() {
      let currentTime = this.currentTime;
      console.log(currentTime, "currentTime");
      let lastTime = new Date().getTime();
      console.log(lastTime, "lastTime");
      let timeOut = 10 * 60 * 1000; //设置时间 10分钟
      if (lastTime - currentTime > timeOut) {
        // 未操作页面，跳转登录页面
        this.currentTime = new Date().getTime();
      } else {
        this.currentTime = new Date().getTime();
      }
    }
  },

  created() {
    this.lastTime = new Date().getTime(); //网页第一次打开时，记录当前时间
  }
};
</script>
