<!-- 排班表规则界面 -->
<template>
  <div class="rules box">
    <!-- 规则查看显示 -->
    <div class="box-header">
      <h3>规则查看</h3>
    </div>
    <div class="content">
      <div class="check" v-if="data.isGetData">
        <fixed-rule :positions="data.positions" />
        <task-rule ref="taskRuleRef" :positions="data.positions" />
      </div>
      <div class="schedule">
        <el-button type="primary" size="large" @click="handleSchedule"
          >智能排班</el-button
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import fixedRule from "@/components/schedule/rule/fixed-rule.vue";
import taskRule from "@/components/schedule/rule/task-rule.vue";
import store from "@/store";
import { ElMessage } from "element-plus";
// 接口
import { getPosts } from "@/api/posts";
import { onMounted, reactive, ref } from "vue";
const data = reactive({
  isGetData: false,
  positions: {},
  form: {},
});
const taskRuleRef = ref(null);
// 获取职位
const getPostsData = () => {
  getPosts().then((res) => {
    if (res.data.code === store.state.global.success) {
      data.positions = res.data.data.map((item) => item.positionName);
      data.isGetData = true;
    }
  });
};
// 进行排班
const handleSchedule = () => {
  // 判断是否最少选择了一个任务
  setTimeout(() => {
    const taskRuleLists = taskRuleRef.value.taskRuleLists;
    console.log(taskRuleLists);
  }, 0);

  // if (taskRuleLists.length === 0) {
  //   ElMessage.error("最少选择一个自己制定的规则");
  //   return;
  // }
  // 给后端传规则id
};
onMounted(() => {
  getPostsData();
});
</script>
<style src="@/assets/css/common/box.css" scoped>
</style>
<style src="@/assets/css/common/content.css" scoped>
</style>
<style src="@/assets/css/views/rule/rule-content.css" scoped>
</style>