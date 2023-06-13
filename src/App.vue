<template>
  <div id="app">
    <router-view v-if="loadingState" />
    <loading v-if="!loadingState" />
  </div>
</template>
<script setup>
import loading from "@/components/utils/loading.vue";
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const loadingState = computed(() => store.state.loading.loading);
console.log(loadingState)
</script>
<style>
* {
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
