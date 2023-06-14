<template>
  <div class="home-menu">
    <template v-for="item in menuData" :key="item">
      <el-menu-item @click="clickMenu(item)" :index="item.path">
        <template #title>
          <div class="title">
            <div class="item">
              <el-icon><component :is="item.icon" /></el-icon>
              <label>{{ item.menuName }}</label>
            </div>
          </div>
        </template>
      </el-menu-item>
    </template>
  </div>
</template>
<script setup>
import router from "@/router";

const props = defineProps({ menuData: Array });
const menuData = props.menuData;

const clickMenu = (item) => {
  //当前路由与跳转路由不一致时跳转
  if (
    router.path !== item.path &&
    !(router.path === "/home" && item.path === "/")
  ) {
    router.push(item.path);
  }
};
</script>
<style src="@/assets/css/common/home-menu/home-menu.css">
</style> 

