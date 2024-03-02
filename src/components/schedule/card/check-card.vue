<template>
  <div class="check-card">
    <div :class="data.isWeek ? 'is-active' : ''" @click="handleCheckShow(true)">
      按周查看
    </div>
    <div>|</div>
    <div
      :class="!data.isWeek ? 'is-active' : ''"
      @click="handleCheckShow(false)"
    >
      按日查看
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, watch } from "vue";

const props = defineProps({ isWeek: Boolean });
const data = reactive({
  isWeek: props.isWeek,
});
const emit = defineEmits(["handleCheckShow"]);
// 修改展示界面
const handleCheckShow = (isWeek) => {
  data.isWeek = isWeek;
  emit("handleCheckShow", data.isWeek);
};
watch(
  () => props.isWeek,
  (newValue, oldValue) => {
    data.isWeek = newValue;
  }
);
</script>
<style scoped>
.check-card {
  display: flex;
  justify-content: space-around;
  border: 2px solid RGB(115, 125, 134);
  width: 200px;
}
.check-card div {
  padding: 10px;
}
.is-active {
  color: RGB(78, 110, 242);
}
</style>