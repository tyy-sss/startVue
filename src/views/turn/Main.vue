<template>
  <div class="common-layout">
    <el-container>
      <el-header><common-header /></el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
  <script setup>
import CommonHeader from "@/components/common/common-header.vue";
</script>
<style scoped>
.el-main {
  background-color: RGB(238, 240, 245);
  height: 92vh;
}
</style>