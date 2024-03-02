<template>
  <div class="week-schedule">
    <div class="time-show-top">
      <div class="time-show-btn-wrap">
        <div class="change-time-show" @click="getLastWeek">&lt;</div>
        <div class="time-show-date">{{ data.weekDate }}</div>
        <div class="change-time-show" @click="getNextWeek">&gt;</div>
      </div>
    </div>
    <div class="week-table">
      <ul class="infinite-list" style="overflow: auto">
        <!-- 显示表格头部 -->
        <div class="table-header">
          <div class="table-week">
            <div
              class="week-item"
              v-for="(item, index) in data.weeks"
              :key="index"
            >
              <div :class="item.months == data.nowDay ? 'isNowDay' : ''">
                <div>{{ item.week }}</div>
                <div class="w-day-item" v-if="item.months">
                  {{ item.months.slice(5) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-time-period-list">
          <div>
            <!-- 循环员工，看一个有多少个 -->
            <template v-if="data.employeeList.length > 0">
              <div
                class="w-time-period-col"
                v-for="(item, index) in data.employeeList"
                :key="index"
              >
                <!-- 显示星期一到星期天的计划 -->
                <div class="w-row-day">
                  <!-- 显示员工 -->
                  <div class="w-time-period">{{ item.name }}</div>
                  <template
                    v-for="(wItem, w_index) in data.weeks"
                    :key="w_index"
                  >
                    <div v-if="wItem.months" class="w-things">
                      <!-- 显示每个员工的安排 -->
                      <div
                        v-for="(card, c_index) in data.period"
                        :key="c_index"
                      >
                        <!-- 是当前时间 -->
                        <div
                          v-if="
                            card.date === wItem.months &&
                            item.staffId === card.staffId
                          "
                        >
                          <div
                            v-for="(single, sIndex) in card.list"
                            :key="sIndex"
                          >
                            <!-- 显示具体的消息 -->
                            <slot name="thing" :row="single"></slot>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </template>
            <template v-else >
              <el-empty class="empty" description="没有数据" />
            </template>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, defineEmits } from "vue";
import { getWeekNews, changeWeekNews } from "@/assets/js/schedule/week";
// import { colorList } from '@/assets/js/schedule/color';
const props = defineProps({ nowDate: String });
const data = reactive({
  weekDate: "", // 显示本周的日期
  weeks: [
    { day: -1, week: "员工" },
    { day: 0, week: "星期一", months: "" },
    { day: 1, week: "星期二", months: "" },
    { day: 2, week: "星期三", months: "" },
    { day: 3, week: "星期四", months: "" },
    { day: 4, week: "星期五", months: "" },
    { day: 5, week: "星期六", months: "" },
    { day: 6, week: "星期天", months: "" },
  ],
  employeeList: [],
  period: [],
  nowDay: props.nowDate,
});
const emit = defineEmits(["changeWeek"]);

const getCurrentWeek = () => {
  //  设置当前的时间
  getWeek(data.nowDay);
};
// 上一周
const getLastWeek = () => {
  const date = changeWeekNews(data.weeks[7].months, -7);
  getWeek(date);
};
// 下一周
const getNextWeek = () => {
  const date = changeWeekNews(data.weeks[7].months, 7);
  getWeek(date);
};
// 得到周的消息
const getWeek = (date) => {
  // 得到一周的时间
  const weekList = getWeekNews(date);
  // 设置显示的时间
  data.weekDate = weekList[0] + " ~ " + weekList[6];
  // 把时间放到weeks对象数组中
  data.weeks.forEach((element) => {
    if (element.week !== "-1") {
      element.months = weekList[element.day];
    }
  });
  console.log(data.weeks)
  //   修改时间之后给父组件传值,返回星期一的值
  emit("changeWeek", data.weeks[1].months);
};
defineExpose({ data });
onMounted(() => {
  // 获得日期显示
  getCurrentWeek();
});
</script>
<style src="@/assets/css/utils/schedule/week.css" scoped>
</style>
<style src="@/assets/css/utils/schedule/time-show.css" scoped>
</style>