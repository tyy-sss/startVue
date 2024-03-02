<template>
  <div class="tag-group">
    <div class="tag-group__title">任务说明:</div>
    <el-checkbox-group @change="handleChangeTask" v-model="data.taskRuleLists">
      <div class="checkbox-item">
        <el-checkbox
          v-for="item in data.ruleData"
          :key="item.ruleId"
          :label="item.ruleId"
          size="large"
          border
        >
          <label @click="changeTask(item.ruleId)">{{ item.ruleName }}</label>
        </el-checkbox>
      </div>
    </el-checkbox-group>
    <div class="add-rule">
      <el-button @click="addTask" type="primary" :icon="Plus" circle />
    </div>
  </div>
  <div class="information">
    <!-- 自定义规则 -->
    <el-dialog
      v-model="data.dialogVisible"
      :before-close="handleCloseDia"
      title="任务说明"
    >
      <!-- 表单消息 -->
      <el-form
        class="show"
        ref="form"
        :rules="data.taskRule"
        :model="data.ruleShow"
        label-width="120px"
      >
        <el-form-item class="rule-item" label="规则名称：" prop="taskName">
          <el-input v-model="data.ruleShow.taskName"></el-input>
        </el-form-item>
        <el-form-item class="rule-item" label="计算公式：" prop="formula">
          <label>预测客流/</label>
          <el-input
            class="rule-item-input"
            v-model="data.ruleShow.formula"
            oninput="if(value.length>6)value=value.slice(0,5)"
          ></el-input>
          <label>= 店员需求数。</label>
        </el-form-item>
        <el-form-item label="可选职位：" prop="positionNames">
          <el-checkbox-group v-model="data.ruleShow.positionNames">
            <el-checkbox
              v-for="item in positions"
              :label="item"
              :key="item"
              border
              >{{ item }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item class="rule-item" label="最少人数：" prop="min">
              <el-input
                v-model="data.ruleShow.min"
                type="number"
                oninput="if(value<0)value=0"
                :max="data.ruleShow.max"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="rule-item" label="最多人数：" prop="max">
              <el-input
                v-model="data.ruleShow.max"
                type="number"
                oninput="if(value<0)value=0"
                :min="data.ruleShow.min"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开始时间：" prop="startTime">
              <el-time-select
                v-model="data.ruleShow.startTime"
                start="09:00"
                step="01:00"
                end="22:00"
                placeholder="开始时间"
                :max-time="data.ruleShow.endTime"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间：" prop="endTime">
              <el-time-select
                v-model="data.ruleShow.endTime"
                start="09:00"
                step="01:00"
                end="22:00"
                placeholder="结束时间"
                :min-time="data.ruleShow.startTime"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCloseDia">取 消</el-button>
          <el-button type="primary" @click="changeOrAddRule">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import { Plus } from "@element-plus/icons";
import { ElMessage } from "element-plus";
import store from "@/store";
// 接口
import { isRepeatTaskName, getAllRule, addOrChangeRule } from "@/api/rule";
// 数据
import { handleClose } from "@/assets/js/common/dialog";
import {
  handleBackRuleData,
  handleAddRuleData,
} from "@/assets/js/common/rule/rule";
// 验证判断
const validateTaskName = (rule, value, callback) => {
  // 判断是否名称是重复
  if (!value) {
    return callback(new Error("请输入规则名"));
  }
  if(data.isRepeat) {
    isRepeatTaskName(value).then((res) => {
    if (res.data.code !== store.state.global.success) {
      callback(new Error("规则名字已重复"));
    } else {
      return callback();
    }
  });
  }else{
    return callback();
  }
 
};
// 数据
const form = ref(null);
const emit = defineEmits(["getTaskList"]);
const positios = defineProps({ positions: Object });
const data = reactive({
  ruleData: [],
  isRepeat: false,
  dialogVisible: false,
  ruleShow: [],
  taskRule: {
    formula: [{ required: true, message: "请输入规则名称", trigger: "blur" }],
    startTime: [{ required: true, message: "请输入开始时间", trigger: "blur" }],
    endTime: [{ required: true, message: "请输入结束时间", trigger: "blur" }],
    taskName: [{ validator: validateTaskName, trigger: "blur" }],
    positionNames: [{ required: true, message: "请输入职位", trigger: "blur" }],
  },
  taskRuleLists: [],
});
// 添加规则
const addTask = () => {
  data.ruleShow = {};
  handleOpenDia();
  data.isRepeat = true;
};
// 确定添加规则
const changeOrAddRule = () => {
  form.value.validate((valid) => {
    console.log(valid);
    if (!valid) {
      ElMessage.warning("请调整数据后再请求");
      return false;
    } else {
      const ruleData = handleAddRuleData(data.ruleShow, 5);
      console.log(ruleData);
      addOrChangeRule(ruleData).then((res) => {
        if (res.data.code === store.state.global.success) {
          ElMessage.success("操作成功");
        } else {
          ElMessage.error("操作失败");
        }
        getAllTaskRule();
        handleCloseForm();
      });
    }
  });
};
// 打开对话框
const handleOpenDia = () => {
  data.dialogVisible = true;
};
// 关闭对话框
const handleCloseDia = () => {
  // handleClose();
  handleCloseForm();
};
const handleCloseForm = () => {
  form.value.resetFields();
  data.dialogVisible = false;
};
// 修改规则
const changeTask = (ruleId) => {
  handleOpenDia();
  data.isRepeat = false;
  data.ruleData.filter((element) => {
    if (element.ruleId === ruleId) {
      data.ruleShow = handleBackRuleData(element, element.ruleTypeId);
    }
  });
};
// 得到所有的任务列表
const getAllTaskRule = () => {
  getAllRule().then((res) => {
    if (res.data.code === store.state.global.success) {
      data.ruleData = res.data.data;
    }
  });
};
// 修改任务列表
const handleChangeTask = () => {
  emit("getTaskList", data.taskRuleLists);
};
onMounted(() => {
  getAllTaskRule();
});
</script>
<style src="@/assets/css/views/rule/rule.css" scoped>
</style>