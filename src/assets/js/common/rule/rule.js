import { reactive } from "vue";

// 固定规则
const fixedRuleData = reactive([
  { type: "", label: "开店规则", ruleTypeId: 1 },
  { type: "success", label: "关店规则", ruleTypeId: 3 },
  { type: "danger", label: "最少人员配备规则", ruleTypeId: 4 },
  { type: "warning", label: "客流规则", ruleTypeId: 2 },
]);
//将后端传过来的数据转改成数组
const handleBackRuleData = (data) => {
  let ruleData = {
    ruleId: data.ruleId,
    taskName: data.ruleName,
    ruleTypeId: data.ruleTypeId,
    shopId: data.shopId,
    choosePost: true,
  };
  //将职位转成数组
  if (data.positionNames !== null) {
    ruleData.positionNames = data.positionNames.split(",");
  }
  const ruleValue = JSON.parse(data.ruleValue);
  switch (data.ruleTypeId) {
    //开店规则
    case 1:
      ruleData.min = ruleValue.min;
      ruleData.hours = ruleValue.hours;
      ruleData.formula = ruleValue.formula;
      ruleData.text = {
        hoursBefore: "每天开店之前需要",
        hoursEnd: "小时做准备工作。",
        formulaBefore: "公式：门店面积/",
        formulaEnd: "=人数。",
        minBefore: "请设置最少人数",
        minEnd: "（人数不能小于1）",
      };
      break;
    //客流规则
    case 2:
      ruleData.formula = ruleValue.formula;
      ruleData.text = {
        formulaBefore:
          "这个规则的范围是一整个上班时间。如果没有客流量的时候，至少需要",
        formulaEnd: "个店员值班。",
      };
      break;
    //关店规则
    case 3:
      ruleData.min = ruleValue.min;
      ruleData.hours = ruleValue.hours;
      ruleData.formula = ruleValue.formula;
      ruleData.text = {
        hoursBefore: "每天关店之前需要",
        hoursEnd: "小时做准备工作。",
        formulaBefore: "公式：门店面积/",
        formulaEnd: "=人数。",
        minBefore: "请设置最少人数",
        minEnd: "（人数不能小于1）",
      };
      break;
    //最低人员配备规则
    case 4:
      ruleData.min = ruleValue.min;
      ruleData.choosePost = false;
      ruleData.text = {
        minBefore: "公式：预测客流/",
        minEnd: "=店员需求数。",
      };
      break;
    //任务规则
    case 5:
      ruleData.min = ruleValue.min;
      ruleData.max = ruleValue.max;
      ruleData.startTime = ruleValue.start + ":00";
      ruleData.endTime = ruleValue.end + ":00";
      ruleData.formula = ruleValue.formula;
      break;
  }
  return ruleData;
};
// 将前端的数据格式化之后传给后端
const handleAddRuleData = (data, type) => {
  //将所有需要的内容 拼接成一个字符串
  let ruleValue = "";
  let positionNames = [];
  switch (type) {
    //开店规则
    case 1:
      ruleValue = {
        min: data.min,
        hours: data.hours,
        formula: data.formula,
      };
      positionNames = data.positionNames;
      break;
    //客流规则
    case 2:
      ruleValue = {
        formula: data.formula,
      };
      positionNames = data.positionNames;
      break;
    //关店规则
    case 3:
      ruleValue = {
        min: data.min,
        hours: data.hours,
        formula: data.formula,
      };
      positionNames = data.positionNames;
      break;
    //最低人员配备规则
    case 4:
      ruleValue = {
        min: data.min,
      };
      positionNames = data.positionNames;
      break;
    //任务规则
    case 5:
      ruleValue = {
        min: data.min,
        max: data.max,
        start: data.startTime.substring(0, data.startTime.indexOf(":")),
        end: data.endTime.substring(0, data.endTime.indexOf(":")),
        formula: data.formula,
      };
      positionNames = data.positionNames;
      break;
  }
  var ruleId;
  if (data.ruleId !== null || data.ruleId !== "" || data.ruleId !== undefined) {
    ruleId = data.ruleId;
  }
  const addRuleData = {
    positionNames: positionNames.join(","),
    ruleId: ruleId,
    ruleName: data.taskName,
    ruleTypeId: type,
    ruleValue: JSON.stringify(ruleValue),
  };
  // console.log(addRuleData, "处理后的规则数据");
  return addRuleData;
};
export { fixedRuleData, handleBackRuleData, handleAddRuleData };
