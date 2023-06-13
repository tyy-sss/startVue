<template>
  <div class="common-aside">
    <div class="top">
      <img class="pic" src="@/assets/images/logo.png"/>
    </div>
    <div class="middle">
      <el-menu
        class="el-menu-vertical-demo"
        :default-active="defaultActive"
        @open="handleOpen"
        @close="handleClose"
      >
        <home-menu :menuData="menuData"></home-menu>
      </el-menu>
    </div>
  </div>
</template>
<script setup>
import homeMenu from "@/components/home-menu/home-menu.vue";
import { onMounted, reactive, ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";

// 引入方法
import { getMenuData } from '@/assets/js/common/common-aside'


const route = useRoute();
var defaultActive = ref("0");
var menuData = reactive([]);

const getMenu = () =>{
  menuData = getMenuData();
}

const handleSelect = (e) => {
  defaultActive = e;
};

onMounted(() => {
  getMenu();
  handleSelect(route.path);
});

// 监听路由
onMounted(() => {
  getMenu();
  handleSelect(route.path);
});
</script>
<style src="@/assets/css/common/common-aside.css" scoped>
</style>