import { errorRouter, constantRouterMap } from "@/router";
import Layout from "@/views/layout/Layout";

const manifest = {
  "common-fontawesome": import("@/views/sys/common/fontawesome"), // icon
  // 'common-editor': import('@/views/sys/common/editor'), // editor
  "sys-user": import("@/views/sys/user/index"), // 用户
  "sys-role": import("@/views/sys/role/index"), // 角色
  "sys-power": import("@/views/sys/power/index"), // 权限
};

function getComponent(component) {
  const componentName = manifest[component];
  if (componentName) {
    return componentName;
  }
}

function getChild(children) {
  return children.map((i) => {
    if (i.link && i.link.indexOf("http") > -1) {
      const res = {
        path: i.id,
        name: i.name,
        icon: i.icon,
        meta: { url: i.link },
        component: () => import("@/views/sys/common/iframe"),
      };
      if (i.children && i.children.length > 0) {
        res["children"] = getChild(i.children);
      } else {
        res["children"] = [];
      }
      return res;
    } else {
      const res = {
        path: i.id,
        name: i.name,
        icon: i.icon,
        component: () => getComponent(i.permission),
      };

      if (i.children && i.children.length > 0) {
        res["children"] = getChild(i.children);
      } else {
        res["children"] = [];
      }
      return res;
    }
  });
}

const permission = {
  state: {
    routers: [],
    addRouters: [],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = routers;
    },
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise((resolve) => {
        const { powers } = data;
        const accessedRouters = powers.map((i) => {
          let children = [];
          const res = {
            path: `/${i.id}`,
            component: Layout,
            name: i.name,
            icon: i.icon,
          };
          if (i.children && i.children.length > 0) {
            children = getChild(i.children);
          }
          res["children"] = children;
          return res;
        });
        commit("SET_ROUTERS", accessedRouters);
        resolve();
      });
    },
  },
};

export default permission;
