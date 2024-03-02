<template>
  <div class="change-schedule">
    <el-dialog
      title="提示"
      v-model="data.dialogVisible"
      :before-close="handleClose"
      width="50%"
    >
      <!-- 表单消息 -->
      <el-form
        class="show"
        ref="form"
        :inline="true"
        :model="data.form"
        label-width="auto"
      >
        <el-form-item label="姓名" prop="staffName">
          <el-select v-model="data.form.staffName" placeholder="请输入" @change="handleChangePerson">
            <el-option
              v-for="item in data.peopleList"
              :key="item"
              :value="item"
              :label="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位" prop="positionName">
          <div v-if="!data.choosePosition">
            <el-input v-model="data.form.positionName" disabled></el-input>
          </div>
          <div v-else>
            <el-select
              v-model="data.form.positionName"
              @change="changePosition"
              placeholder="请输入"
            >
              <el-option
                v-for="(item, index) in data.positionList"
                :key="index"
                :value="item"
                :label="item"
              />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-input v-model="data.form.startTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-input v-model="data.form.endTime" disabled></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="changeForSchedule">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { onMounted, reactive, watch } from "vue";
import { getOnePositionAllPeople, changeSchedule } from "@/api/schedule";
import { getPosts } from "@/api/posts";
import store from "@/store";
import { ElMessage } from "element-plus";
const emit = defineEmits(["changeSchedule"]);
const data = reactive({
  dialogVisible: false,
  peopleList: [],
  positionList: [],
  form: {
    date: "",
    scheduleId: "",
    staffId: "",
    staffName: "",
    positionName: "",
    startTime: "",
    endTime: "",
  },
  choosePosition: false,
});
const getPeopleList = () => {
  data.peopleList = [];
  getOnePositionAllPeople(data.form.positionName).then((res) => {
    if (res.data.code === store.state.global.success) {
      res.data.data.forEach((item) => {
        if (item.staffName !== null) {
          data.peopleList.push({ value: item.staffName, staffId: item.id });
        }
      });
    }
  });
};
// 修改职位
const changePosition = () => {
  getPeopleList();
};
const handleChangePerson =()=>{
  data.form.staffId = data.form.staffName.staffId;
  data.form.staffName = data.form.staffName.value;
}
// 修改班次计划
const changeForSchedule = () => {
  changeSchedule(data.form).then((res) => {
    if (res.data.code === store.state.global.success) {
      ElMessage.success("修改成功");
      emit("changeSchedule");
    } else {
      ElMessage.success("修改失败");
    }
    data.dialogVisible = false;
  });
};
const cancel = () => {
  data.dialogVisible = false;
};
const handleClose = () => {
  data.dialogVisible = false;
};
defineExpose({ data });
watch(
  () => data.form,
  (newValue, oldValue) => {
    data.peopleList = [];
    data.form = newValue;
    if (data.form.staffName !== null) {
      getPeopleList();
    } else {
      data.choosePosition = true;
      getPosts().then((res) => {
        res.data.data.forEach((item) => {
          data.positionList.push(item.positionName);
        });
      });
    }
  }
);
onMounted(() => {
  console.log(data.form);
});
</script>