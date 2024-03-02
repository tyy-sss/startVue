/**
 * 排班表
 */
import request from "./request";

//得到一天的排班表
export const getOneSchedule = (data) => {
  return request({
    url: "/content/shiftSchedule/get-schedule",
    method: "get",
    params: {
      date: data.date,
      skill: data.skill,
      positionName: data.positionName,
    },
  });
};
/**
 * 生成一周的排班表
 * @param {*} data
 * @returns
 */
export const addSchedule = (date, list) => {
  return request({
    url: "/content/shiftSchedule/add-schedule",
    method: "post",
    data: {
      date: date,
      ruleIds: list,
    },
  });
};
/**
 * 得到一周的排班表
 * @param {} data
 * @returns
 */
export const getWeekSchedule = (data) => {
  return request({
    url: "/content/shiftSchedule/get-one-week",
    method: "get",
    params: {
      date: data.date,
      positionName: data.positionName,
      skill: data.skill,
    },
  });
};
/**
 * 获得一个职位的所有人
 */
 export const getOnePositionAllPeople= (data) => {
  return request({
    url: "/content/shiftSchedule/get-shop-staff",
    method: "get",
    params: {
      positionName: data
    },
    showLoading: false,
  });
}
/**
 * 修改班次
 */
 export const changeSchedule = (date) =>{
  return request({
    url: "/content/shiftSchedule",
    method: "get",
    params: {
      date: date.date,
      startTime: date.startTime,
      endTime: date.endTime,
      scheduleId: date.scheduleId,
      staffId: date.staffId,
      staffName: date.staffName,
      positionName: date.positionName, 
    },
  });
}