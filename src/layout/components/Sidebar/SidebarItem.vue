<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <!--    //当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
            //只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
            -->
    <!--  显示最多只有一个可见(hidden:false)子路由,并且该子路由没有可见子子路由,并且他们都不显示根路径-->
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <app-link v-if="onlyOneChild.meta"
                :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :class="{'submenu-title-noDropdown' : !isNest}"
                      :index="resolvePath(onlyOneChild.path)">
          <item :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
                :title="onlyOneChild.meta.title"/>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu popper-append-to-body v-else
                ref="subMenu"
                :index="resolvePath(item.path)">
      <template slot="title">
        <item v-if="item.meta"
              :icon="item.meta && item.meta.icon"
              :title="item.meta.title"/>
      </template>
      <sidebar-item v-for="child in item.children"
                    class="nest-menu"
                    :base-path="resolvePath(child.path)"
                    :is-nest="true"
                    :item="child"
                    :key="child.path"/>
    </el-submenu>
  </div>
</template>

<script>
  import path from 'path';
  import { isExternal } from '@/utils/validate';
  import Item from './Item';
  import AppLink from './Link';
  import FixiOSBug from './FixiOSBug';

  export default {
    name: 'SidebarItem',
    components: { Item, AppLink },
    mixins: [FixiOSBug], //如果组件中定义的方法与混入对象中的方法/属性一样,组件中的优先级大于混入对象中的(方法会调用多次)
    props: {
      // route object
      item: {
        type: Object,
        required: true
      },
      isNest: {
        type: Boolean,
        default: false
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    data() {
      // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
      // TODO: refactor with render function
      this.onlyOneChild = null;
      return {};
    },
    methods: {
      hasOneShowingChild(children = [], parent) {
        const showingChildren = children.filter(item => {
          if (!item.hidden) {
            return true;
          } else {
            this.onlyOneChild = item;
            return false;
          }
        });
        // When there is only one child router, the child router is displayed by default
        if (showingChildren.length === 1) {
          return true;
        }

        // Show parent if there are no child router to display
        if (showingChildren.length === 0) {
          this.onlyOneChild = { ...parent, path: '', noShowingChildren: true };
          return true;
        }

        return false;
      },
      resolvePath(routePath) {
        if (isExternal(routePath)) {
          return routePath;
        }
        if (isExternal(this.basePath)) {
          return this.basePath;
        }
        return path.resolve(this.basePath, routePath); //更好路由成绝对路径
      }
    }
  };
</script>
