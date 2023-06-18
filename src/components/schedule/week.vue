<template>
  <week-schedule-card @changeWeek="changeWeek">
    <template v-slot:thing="{ row }">
      <div class="week-information" @click="checkScheduleNews(row)">
        <div>
          <span>时间{{ row.time }}</span>
        </div>
        <div>
          <span>员工{{ row.employee }}</span>
        </div>
      </div>
    </template>
  </week-schedule-card>
</template>
  <script setup>
import weekScheduleCard from "@/components/card/schedule/week-schedule-card.vue";

// 修改时间
const changeWeek = (date) => {
  console.log(date, "修改之后的开始时间");
};

const checkScheduleNews =(row)=>{
    console.log(row,"数据")
}
</script>
<style scoped>
.week-information{
    border: 1px solid;
    padding: 10px;
    border-radius: 10px;
    margin: 5px;
}
</style>