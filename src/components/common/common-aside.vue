<template>
  <div class="common-aside">
    <div class="top">
      <img class="pic" src="@/assets/images/logo.png" />
    </div>
    <div class="middle">
      <el-menu
        class="el-menu-vertical-demo"
        :default-active="defaultActive"
      >
        <home-menu v-if="flag" :menuData="menuData"></home-menu>
      </el-menu>
    </div>
  </div>
</template>
<script setup>
import homeMenu from "@/components/home-menu/home-menu.vue";
import { onMounted, reactive, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import store from "@/store";
import { menuList } from "@/api/menu";

const route = useRoute();
var defaultActive = ref("0");
var menuData = reactive([]);
var flag = ref(flag)

// 得到菜单数据
const getMenu = () => {
  menuList().then((res) => {
    if (res.data.code === store.state.global.success) {
    //获得菜单导航数据
    menuData = res.data.data;
    flag.value = true;
    //获取菜单的数据，存入store中
    store.commit("setMenu", menuData);
    //动态生成路由
    store.commit("addMenu");
  }
  })  
};
// 切换路由
const handleSelect = (e) => {
  defaultActive = e;
};
// 在view挂载后
onMounted(() => {
  getMenu();
  handleSelect(route.path);
});
// 监听路由
watchEffect(() => {
  handleSelect(route.path);
});
</script>
<style src="@/assets/css/common/common-aside.css" scoped>
</style>