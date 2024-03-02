/**
 * 技能
 */
import request from "./request";
/**
 * 得到一个店铺的技能消息
 */
export const getSkills = () => {
  return request({
    url: "/content/shiftSchedule/get-shop-skill",
    method: "GET",
    showLoading: false,
  });
};
