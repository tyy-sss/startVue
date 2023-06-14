<template>
  <div id="app">
    <router-view v-show="!store.state.loading.loading" />
    <loading v-show="store.state.loading.loading" />
  </div>
</template>
<script setup>
import loading from "@/components/utils/loading.vue";
import { useStore } from "vuex";
const store = useStore();
</script>
<style src="@/assets/css/views/global.css">
</style>
