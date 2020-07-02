<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">

      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        style="padding-bottom: 8rem;"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  name: 'Com',
  components: { SidebarItem, Logo },
  
  computed: {
    ...mapGetters(['sidebar']),
    routes() {
       let menuArr = this.$router.options.routes;
      this.$router.options.routes.forEach((element,ind) => {
          if(!!element.children){
            element.children.forEach((v,i) => {
                if(v.meta&&v.meta.hideInSide){
                  delete menuArr[ind]['children'][i]['children']
                }
            })
          }
      });
      return menuArr
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },

  methods: {
    jumpMyindex() {
      this.$router.replace('/myindex')
    }
  }
}
</script>
<style lang="scss" scoped>
.companyLogo {
  width: 240px;
  min-height: 188px;
  background-color: #0c1a2c;
  .companyLogoPic {
    width: 100%;
    height: 188px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .item {
      width: 100%;
      border-radius: 50%;
      text-align: center;
    }
    .comName {
      width: 100%;
      height: 50px;
      line-height: 50px;
      color: #488ae4;
      font-size: 1.4rem;
      text-align: center;
    }
  }
}
</style>
