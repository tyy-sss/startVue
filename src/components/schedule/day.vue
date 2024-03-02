<template>
  <div class="day">
    <div class="time-show-top">
      <div class="time-show-btn-wrap">
        <div class="change-time-show" @click="changeDayDate(-1)">&lt;</div>
        <div class="time-show-date">{{ data.nowDate }}</div>
        <div class="change-time-show" @click="changeDayDate(1)">&gt;</div>
      </div>
    </div>
    <div class="date">
      <FullCalendar
        ref="calendar"
        class="demo-app-calendar"
        :options="data.calendarOptions"
      >
      </FullCalendar>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import store from "@/store";
import { ElMessage } from "element-plus";
import FullCalendar from "@fullcalendar/vue3";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
// 数据处理
import { formatTimeOne } from "@/assets/js/utils/time-format";
// 接口
import { getOneSchedule } from "@/api/schedule";

const props = defineProps({ nowDate: String, choose: Object });
var calendarEvents = reactive([]);
// 修改值班信息
const handleEditEvent = () => {
  alert("1111");
};
const data = reactive({
  nowDate: props.nowDate,
  choose: reactive(props.choose),
  calendarOptions: reactive({
    plugins: [resourceTimelinePlugin],
    //设置初始时间
    initialDate: props.nowDate,
    //设置开始时间
    slotMinTime: "10:00:00",
    //设置结束时间
    slotMaxTime: "23:00:00",
    headerToolbar: false,
    weekends: true,
    height: "550px",
    events: calendarEvents,
    eventClick: handleEditEvent,
    handleWindowResize: true,
    eventOrderStrict: true,
  }),
});
const calendar = ref(null);
// 通过消息获得排班表
const getData = () => {
  const scheduleData = {
    date: data.nowDate,
    positionName: data.choose.positionName,
    skill: data.choose.skill,
  };
  getOneSchedule(scheduleData).then((res) => {
    if (res.data.code === store.state.global.success) {
      const data = res.data.data;
      let events = [];
      data.forEach((element) => {
        events.push({
          id: element.scheduleId,
          title:
            element.staffName === null
              ? "开放班次"
              : element.staffName + "：" + element.positionName,
          start: element.date + " " + element.startTime + ":00:00",
          end: element.date + " " + element.endTime + ":00:00",
          textColor: "black",
          color: element.color,
          backgroundColor: element.color,
        });
      });
      calendarEvents.splice(0, calendarEvents.length, ...events);
      // 更新数据
      calendar.value.getApi().refetchEvents();
    } else {
      ElMessage.error(res.data.msg);
    }
  });
};
// 切换日期
const changeDayDate = (day) => {
  var oldDay = new Date(data.nowDate);
  oldDay.setDate(oldDay.getDate() + day);
  data.nowDate = formatTimeOne(oldDay);
  getData();
  switch (day) {
    case -1:
      calendar.value.getApi().prev();
      break;
    case 1:
      calendar.value.getApi().next();
      break;
  }
};
// 监听选择器的修改
watch(()=> props.choose,(newValue, oldValue) => {
  data.choose = newValue;
  getData();
});
onMounted(() => {
  data.calendarOptions;
  getData();
});
</script>
<style src="@/assets/css/utils/schedule/time-show.css" scoped>
</style>