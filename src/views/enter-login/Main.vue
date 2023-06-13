<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="160px">
        <common-aside />
      </el-aside>
      <el-container>
        <el-header><common-header /></el-header>
        <el-main>
          <div class="middle"><router-view /></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import CommonAside from "@/components/common/common-aside.vue";
import CommonHeader from "@/components/common/common-header.vue";
</script>
  <style src="@/assets/css/views/main.css" scoped></style>
    