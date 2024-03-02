<template>
  <div class="search">
    <!-- form搜索区 -->
    <el-form :inline="true">
      <el-form-item>
        <el-input placeholder="请输入搜索内容" v-model="data.msg"></el-input>
      </el-form-item>
      <el-select id="select" class="select-search" v-model="data.value">
        <el-option
          v-for="item in data.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-form-item>
        <el-button type="primary" @click="submit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  <script setup>
import { onMounted, reactive } from "vue";
const props = defineProps({ options:Array });
const emit = defineEmits(["getSearchNews"]);
const data = reactive({
  searchNews: [],
  msg: "",
  value: "",
  options: props.options,
});
//把选择项设置为options的第一个的value
const choose = () => {
  if (data.options[0] !== null && data.options[0] !== undefined) {
    data.value = data.options[0].value;
  }
};
const submit = () => {
  data.searchNews.msg = data.msg;
  data.searchNews.data = data.value;
  emit("getSearchNews", data.searchNews);
};
onMounted(() => {
  choose();
});
</script>
  <style scoped>
.select-search {
  max-width: 100px;
  margin-bottom: 20px;
  margin-right: 20px;
}
</style>