<template>
  <div class="schedule">
    <div class="top">
      <rule @get-schedule="getShcedule" />
    </div>
    <div class="buttom">
      <div class="content box">
        <div class="choose">
          <div class="check">
            <check-card
              :is-week="data.isWeekShow"
              @handle-check-show="handleCheckShow"
            />
          </div>
          <div class="choose">
            <choose-card @get-choose-value="getChooseValue" />
          </div>
        </div>
        <div class="show" v-if="data.isShow">
          <week
            ref="weekRef"
            v-if="data.isWeekShow"
            :choose="data.choose"
            :nowDate="data.nowDate"
            :schedule="data.schedule"
          />
          <day
            v-if="!data.isWeekShow"
            :choose="data.choose"
            :nowDate="data.nowDate"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// 界面
import week from "@/components/schedule/week.vue";
import day from "@/components/schedule/day.vue";
import rule from "@/components/schedule/rule.vue";
import checkCard from "@/components/schedule/card/check-card.vue";
import chooseCard from "@/components/schedule/card/choose-card.vue";
import { onMounted, reactive, ref } from "vue";
// 数据处理
import { formatTimeOne } from "@/assets/js/utils/time-format";
// 接口
import { addSchedule } from "@/api/schedule";
const data = reactive({
  isShow: false,
  isWeekShow: true,
  schedule: "",
  nowDate: formatTimeOne(new Date()),
  choose: reactive({
    positionName: "",
    skill: "",
  }),
});
// 切换展示视图
const handleCheckShow = (isWeek) => {
  data.isWeekShow = isWeek;
};
// 获得选择框数据
const getChooseValue = (choose) => {
  data.choose = reactive({
    positionName: choose.positionName,
    skill: choose.skill,
  });
};
const weekRef = ref(null);
// 进行排班
const getShcedule = (ruleList) => {
  //  得到规则序列 进行排班
  console.log(ruleList);
  addSchedule(data.nowDate, ruleList).then((res) => {
    console.log(res, "排班");
    data.isWeekShow = true;
    data.schedule = res.data.data;
  });
};
onMounted(() => {
  data.isShow = true;
});
</script>
<style scoped>
.buttom {
  padding-top: 2em;
}
</style>
<style src="@/assets/css/common/box.css" scoped>
</style>
<style src="@/assets/css/common/content.css" scoped>
</style>