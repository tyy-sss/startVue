<template>
  <div class="week">
    <week-schedule-card
      ref="weekRef"
      :nowDate="data.nowDate"
      @changeWeek="changeWeek"
    >
      <template v-slot:thing="{ row }">
        <div class="week-information" @click="checkScheduleNews(row)">
          <div>
            <span>{{ row.timePeriod }}</span>
          </div>
          <div>
            <span>{{ row.positionName }}</span>
          </div>
        </div>
      </template>
    </week-schedule-card>
    <change-schedule
      ref="changeScheduleRef"
      @changeSchedule="getWeekScheduleData"
    />
  </div>
</template>
  <script setup>
import weekScheduleCard from "@/components/schedule/week/week-schedule-card.vue";
import changeSchedule from "@/components/schedule/change-schedule/change-schedule.vue";
import { onMounted, reactive, watch, ref } from "vue";
// 接口
import { getWeekSchedule } from "@/api/schedule";
import store from "@/store";
import { handleWeekData } from "@/assets/js/schedule/change-schedule";
// 处理数据
import { handleOpenSchedule } from "@/assets/js/schedule/open-schedule";

// 数据
const props = defineProps({
  nowDate: String,
  choose: Object,
  schedule: Object,
});
const data = reactive({
  nowDate: props.nowDate,
  choose: reactive(props.choose),
});
const changeScheduleRef = ref(null);
// 修改时间
const changeWeek = (date) => {
  data.nowDate = date;
  getWeekScheduleData();
};
// 查看排班表信息
const checkScheduleNews = (row) => {
  console.log(row, "数据");
  changeScheduleRef.value.data.form = handleWeekData(row);
  changeScheduleRef.value.data.dialogVisible = true;
};
const weekRef = ref(null);
// 获得排班表
const getWeekScheduleData = () => {
  const scheduleData = {
    date: data.nowDate,
    positionName: data.choose.positionName,
    skill: data.choose.skill,
  };
  getWeekSchedule(scheduleData).then((res) => {
    console.log(res.data.data);
    if (res.data.code === store.state.global.success) {
      const weekData = handleOpenSchedule(res.data.data);
      weekRef.value.data.employeeList = weekData.list;
      weekRef.value.data.period = weekData.period;
    }
  });
};
// 监听选择器的修改
watch(
  () => props.choose,
  (newValue, oldValue) => {
    data.choose = newValue;
    getWeekScheduleData();
  }
);
watch(
  () => props.schedule,
  (newValue, oldValue) => {
    const weekData = handleOpenSchedule(newValue);
    weekRef.value.data.employeeList = weekData.list;
    weekRef.value.data.period = weekData.period;
  }
);
onMounted(() => {
  getWeekScheduleData();
});
</script>
<style scoped>
.week-information {
  background-color: RGB(244, 250, 255);
  border: 2px solid RGB(46, 158, 255);
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.16);
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0;
}
.week-information > div {
  display: flex;
  justify-content: center;
  align-items: center;
  color: RGB(46, 158, 255);
}
</style>