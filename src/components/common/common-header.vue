<template>
  <div class="common-header">
    <div class="right">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <img class="user" src="@/assets/images/personal.png" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item command="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";  
const router = useRouter();
const handleClick = (command) => {
  if (command === "exit") {
    router.push({ path: "/login" });
  }
};
</script>
<style src="@/assets/css/common/common-header.css">
</style>