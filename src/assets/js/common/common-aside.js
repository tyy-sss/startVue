import  store  from '@/store'
import { menuList } from "@/api/menu.js";

const getMenuData = async () => {
  const res = await menuList();
  if (res.data.code === this.$store.state.globel.success) {
    //获得菜单导航数据
    const menuData = res.data.data;
    //获取菜单的数据，存入store中
    store.commit("setMenu", this.menuData);
    //动态生成路由
    store.commit("addMenu", this.$router);
    return menuData;
  } else {
    //没有获得菜单数据
  }
};

export { getMenuData }
