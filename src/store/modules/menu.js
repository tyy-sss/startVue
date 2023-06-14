import router from "@/router";

export default {
  state: {
    // 动态菜单
    menuData: [],
  },
  getters: {},
  //修改字段
  mutations: {
    //设置菜单的数据
    setMenu(state, val) {
      state.menuData = val;
    },
    //动态注册路由
    addMenu(state) {
      // 处理动态路由的数据
      const menuData = JSON.parse(JSON.stringify(state.menuData));
      const menuArray = [];
      menuData.forEach((item) => {
        if (item.children && item.children.length >= 1) {
          menuArray.push(...item.children);
        } else {
          menuArray.push(item);
        }
      });

      // 路由的动态添加
      if (menuArray[0] !== "") {
        menuArray.forEach((item) => {
          var path = item.path;
          path = path.slice(1).replace(path[1], path[1].toLowerCase());
          router.addRoute("main", {
            path: `${path}`,
            component: () => import(`@/views/enter-login${item.path}.vue`),
          });
        });
      }
    },
  },
  actions: {},
  modules: {},
};
