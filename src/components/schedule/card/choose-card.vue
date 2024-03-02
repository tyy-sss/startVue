<template>
  <div class="choose-card">
    <div>
      <el-select
        @change="checkChooseForDeatil"
        placeholder="请选择"
        v-model="data.chooseItemValue"
      >
        <el-option
          v-for="(item, index) in data.chooseValue"
          :key="index"
          :value="item.value"
          >{{ item.value }}</el-option
        >
      </el-select>
    </div>
    <div ref="showChooseDetail" style="visibility: hidden">
      <el-select
        v-model="data.chooseItemDetail"
        placeholder="请选择"
        @change="chooseDetailForSchedule"
        :no-data-text="data.noData"
      >
        <el-option
          v-for="(item, index) in data.detailList"
          :value="item"
          :key="index"
        />
      </el-select>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import store from "@/store";
// 接口
import { getPosts } from "@/api/posts";
import { getSkills } from "@/api/skills";
const data = reactive({
  chooseValue: [{ value: "按职位查找" }, { value: "按技能查找" }, { value: "按分组查找" }],
  detailList: [],
  chooseItemValue: "",
  chooseItemDetail: "",
  noData: "没有数据",
  choose: {
    positionName: "",
    skill: "",
  },
});
const emit = defineEmits(["getChooseValue"]);
const showChooseDetail = ref(null);
// 查看具体的选择
const checkChooseForDeatil = () => {
  showChooseDetail.value.style.visibility = "visible";
  data.detailList = reactive([]);
  data.chooseItemDetail = "";
  switch (data.chooseItemValue) {
    case "按职位查找":
      getPosts().then((res) => {
        if (res.data.code === store.state.global.success) {
          let list = res.data.data;
          list.forEach((element) => {
            data.detailList.push(element.positionName);
          });
        }
      });
      break;
    case "按技能查找":
      getSkills().then((res) => {
        if (res.data.code === store.state.global.success) {
          let list = res.data.data;
          list.forEach((element) => {
            data.detailList.push(element);
          });
        }
      });
      break;
  }
  data.choose = {
    positionName: "",
    skill: "",
  };
  // emit("getChooseValue", data.choose);
};
// 确定选择
const chooseDetailForSchedule = () => {
  // 给父组件传递选择器的值
  switch (data.chooseItemValue) {
    case "按职位查找":
      data.choose.positionName = data.chooseItemDetail;
      data.choose.skill = "";
      break;
    case "按技能查找":
      data.choose.skill = data.chooseItemDetail;
      data.choose.positionName = "";
      break;
  }
  emit("getChooseValue", data.choose);
};
</script>
<style scoped>
.choose-card {
  display: flex;
}
.choose-card div {
  padding-top: 0.5em;
}
.el-select {
  width: 150px;
  margin-right: 20px;
  border: 2px solid RGB(115, 125, 134);
  border-radius: 5px;
  padding: 0px !important;
}
/* 取消边框 */
::v-deep .el-input__wrapper {
  border: none;
  box-shadow: none;
}
/* 取消点击时出现的蓝色边框 */
::v-deep .el-input .el-input__wrapper.is-focus {
  box-shadow: none !important;
}
::v-deep .el-select .el-input.is-focus .el-input__wrapper {
  border-color: #dcdfe6 !important;
  box-shadow: none !important;
}
</style>