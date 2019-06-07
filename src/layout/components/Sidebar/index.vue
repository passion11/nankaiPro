<template>
  <div :class="{'has-logo' : showLogo}">
    <logo v-if="showLogo"
          :collapse="isCollapse"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu mode="vertical"
               :active-text-color="variables.menuActiveText"
               :background-color="variables.menuBg"
               :collapse="isCollapse"
               :collapse-transition="false"
               :default-active="activeMenu"
               :text-color="variables.menuText"
               :unique-opened="false">
        <sidebar-item v-for="route in permission_routes"
                      :base-path="route.path"
                      :item="route"
                      :key="route.path"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Logo from './Logo';
  import SidebarItem from './SidebarItem';
  import variables from '@/styles/variables.scss';

  export default {
    components: { SidebarItem, Logo },
    computed: {
      ...mapGetters([
        'permission_routes',
        'sidebar',
        'roles'
      ]),
      activeMenu() {
        const route = this.$route;
        const { meta, path } = route;
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu;
        }
        return path;
      },
      showLogo() {
        return this.$store.state.settings.sidebarLogo;
      },
      variables() {
        return variables;
      },
      isCollapse() {
        return !this.sidebar.opened;
      },
      userInfo() {
        return this.user.userInfo;
      }
    },
    mounted() {
      const roles = this.roles;
      this.$store.dispatch('permission/generateRoutes', roles);
    },
    components: { SidebarItem }
  };
</script>
