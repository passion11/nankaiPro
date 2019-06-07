import { asyncRoutes, constantRoutes } from '@/router';

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
//是否拥有加载改路由的角色权限
//因为每一个异步路由(即左边siderBar侧边栏路由)都带有加载它的角色
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    //判断 允许加载当前路由的角色(route.meta.roles)是否包含当前用户的某一个角色
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
//递归过滤出来符合用户角色的所有路由(包含子路由)
export function filterAsyncRoutes(routes, roles) {
  const res = [];
  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;//routes
}

const state = {
  routes: [],
  addRoutes: []
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes; //个人权限路由
    state.routes = constantRoutes.concat(routes); //个人权限路由+所有非权限路由
  }
};

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes;
      if (roles.includes('admin')) {
        console.log('1');
        accessedRoutes = asyncRoutes || [];
      } else {
        console.log('2');
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      }
      commit('SET_ROUTES', accessedRoutes);
      resolve(accessedRoutes);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
