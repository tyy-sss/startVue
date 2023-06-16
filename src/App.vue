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

const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}
const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
}
</script>
<style src="@/assets/css/views/global.css">
</style>
