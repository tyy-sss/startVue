<template>
  <div class="tag-group">
    <div class="tag-group__title">班次说明:</div>
    <el-row>
      <el-tag
        v-for="item in data.fixedRuleData"
        :key="item.label"
        :type="item.type"
        class="tag-item"
        effect="dark"
        size="large"
        @click="checkRule(item.ruleTypeId)"
      >
        {{ item.label }}
      </el-tag>
    </el-row>
  </div>
  <!-- 固定规则 -->
  <el-dialog
    v-model="data.dialogVisible"
    :before-close="handleCloseDia"
    :title="data.ruleShow.taskName"
  >
    <!-- 表单消息 -->
    <el-form
      class="show"
      ref="form"
      :rules="data.rule"
      :model="data.ruleShow"
      label-width="120px"
    >
      <el-form-item class="rule-item" label="规则名称：" prop="taskName">
        <el-input class="rule-item" v-model="data.ruleShow.taskName" disabled />
      </el-form-item>
      <el-form-item
        v-if="data.ruleShow.hours !== undefined"
        class="rule-item"
        label="时间设置："
        prop="hours"
      >
        <label>{{ data.ruleShow.text.hoursBefore }}</label>
        <el-input class="rule-item-input" v-model="data.ruleShow.hours" />
        <label>{{ data.ruleShow.text.hoursEnd }}</label>
      </el-form-item>
      <el-form-item
        v-if="data.ruleShow.formula !== undefined"
        class="rule-item"
        prop="formula"
        label="规则设置："
      >
        <label>{{ data.ruleShow.text.formulaBefore }}</label>
        <el-input class="rule-item-input" v-model="data.ruleShow.formula" />
        <label>{{ data.ruleShow.text.formulaEnd }}</label>
      </el-form-item>
      <el-form-item
        v-if="data.ruleShow.min !== undefined"
        class="rule-item"
        label="人数设置："
        prop="min"
      >
        <label>{{ data.ruleShow.text.minBefore }}</label>
        <el-input class="rule-item-input" v-model="data.ruleShow.min" />
        <label>{{ data.ruleShow.text.minEnd }}</label>
      </el-form-item>
      <el-form-item
        v-if="data.ruleShow.choosePost"
        label="可选职位："
        class="rule-item"
        prop="positionNames"
      >
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
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCloseDia">取 消</el-button>
        <el-button type="primary" @click="submitRule">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import {  reactive, ref } from "vue";
import store from "@/store";
import { ElMessage } from "element-plus";
const form = ref(null);
// 数据
import {
  fixedRuleData,
  handleBackRuleData,
  handleAddRuleData,
} from "@/assets/js/common/rule/rule";
import { handleClose } from "@/assets/js/common/dialog";
// 接口
import { getFixedRule, addOrChangeRule } from "@/api/rule";
const positios = defineProps({ positions: Object });
const data = reactive({
  fixedRuleData: fixedRuleData,
  dialogVisible: false,
  ruleShow: [],
  rule: {
    hours: [{ required: true, message: "请输入", trigger: "blur" }],
    formula: [{ required: true, message: "请输入", trigger: "blur" }],
    min: [{ required: true, message: "请输入", trigger: "blur" }],
    positionNames: [{ required: true, message: "请输入职位", trigger: "blur" }],
  },
});
// 查看规则信息
const checkRule = (type) => {
  data.dialogVisible = true;
  getFixedRule(type).then((res) => {
    if (res.data.code === store.state.global.success) {
      //处理后端过来的数据
      const ruleData = handleBackRuleData(res.data.data);
      data.ruleShow = ruleData;
    }
  });
};
// 修改规则
const submitRule = () => {
  form.value.validate((valid) => {
    if (!valid) {
      ElMessage.warning("请调整数据后再请求");
      return false;
    } else {
      const ruleData = handleAddRuleData(
        data.ruleShow,
        data.ruleShow.ruleTypeId
      );
      addOrChangeRule(ruleData).then((res) => {
        if (res.data.code === store.state.global.success) {
          ElMessage.success("修改成功");
        } else {
          ElMessage.error("修改失败");
        }
        handleCloseForm();
      });
    }
  });
};
// 关闭对话框
const handleCloseDia = () => {
  handleClose(form);
  form.value.resetFields();
  handleCloseForm();
};
const handleCloseForm = () => {
  data.dialogVisible = false;
};
</script>
<style src="@/assets/css/views/rule/rule.css" scoped>
</style>