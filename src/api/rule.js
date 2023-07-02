/**
 *规则
 */
//统一接口管理
import request from "./request";
/**
 * 添加或者修改规则
 * @param {规则} data
 * @returns
 */
 export const addOrChangeRule = (data) => {
  return request({
    url: "/content/schedulingRules",
    method: "post",
    data: {
      positionNames: data.positionNames,
      ruleName: data.ruleName,
      ruleTypeId: data.ruleTypeId,
      ruleValue: data.ruleValue,
      ruleId: data.ruleId,
      shopId: data.shopId,
    },
    showLoading: false,
  });
}

/**
 * 规则名查重
 * @param {规则名} data
 * @returns
 */
export const isRepeatTaskName = (data) => {
  return request({
    url: "/content/schedulingRules/check-rule-name?name=" + data,
    method: "get",
    showLoading: false,
  });
};
/**
 * 得到店铺固定自定义规则的信息
 * @param {} data
 * @returns
 */
export const getFixedRule = (data) => {
  return request({
    url: "/content/schedulingRules/get-one?ruleTypeId=" + data,
    method: "get",
    showLoading: false,
  });
};
/**
 * 获得所有任务列表
 * @returns 
 */
 export const getAllRule = () => {
  return request({
    url: "/content/schedulingRules/get-all-task",
    method: "get",
    showLoading: false,
  });
};
