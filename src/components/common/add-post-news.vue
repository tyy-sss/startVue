<template>
  <div class="add-post-title">
    <div class="left">
      <span>{{ data.num }}</span>
    </div>
    <div class="right">
      <div class="item">
        <div class="name">{{ data.name }}</div>
        <div class="description" v-if="data.description">
          {{ data.description }}
        </div>
      </div>
    </div>
  </div>
</template>
  <script setup>
import { defineProps } from "vue";
const props = defineProps({ data: Object });
const data = props.data;
</script>
  <style scoped>
.add-post-title {
  display: flex;
}
.left {
  color: #6772e5;
  line-height: 90px;
  font-size: 30px;
  margin-right: 24px;
  margin-left: 6px;
}
.right{
  display: flex;
  align-items: center;
}
.item > div {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
.name {
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  color: #414a60;
  margin: 1px 0 0 0;
}
.description {
  font-size: 12px;
  line-height: 20px;
  margin: 5px 0;
  color: #9fa3b0;
  font-weight: 300;
}
</style>