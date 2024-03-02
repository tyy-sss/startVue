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
        <task-rule @getTaskList="getTaskList" :positions="data.positions" />
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
import { getFixedRule } from "@/api/rule";
import { onMounted, reactive } from "vue";
const data = reactive({
  isGetData: false,
  positions: {},
  form: {},
  taskRuleLists: [],
});
const emit = defineEmits(["getSchedule"]);
// 获取职位
const getPostsData = () => {
  getPosts().then((res) => {
    if (res.data.code === store.state.global.success) {
      data.positions = res.data.data.map((item) => item.positionName);
      data.isGetData = true;
    }
  });
};
// 获得任务列表
const getTaskList = (list) => {
  data.taskRuleLists = list;
};
// 进行排班
const handleSchedule = () => {
  // 判断是否最少选择了一个任务
  if (data.taskRuleLists.length === 0) {
    ElMessage.error("最少选择一个自己制定的规则");
    return;
  } else {
    // 获得固定规则的id
    var ruleList = reactive([]);
    data.taskRuleLists.forEach((element) => {
      ruleList.push(element);
    });
    for (let i = 1; i <= 4; i++) {
      getFixedRule(i).then((res) => {
        if (ruleList.indexOf(res.data.data.ruleId) === -1) {
          ruleList.push(res.data.data.ruleId);
          if (ruleList.length === data.taskRuleLists.length + 4) {
            // 给父组件传值说明要进行排班了
            emit("getSchedule", ruleList);
          }
        }
      });
    }
  }
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