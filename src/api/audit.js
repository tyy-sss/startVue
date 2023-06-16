/**
 * 客流量
 */
import request from "./request";

/**
 * 得到最近一天上传的客流量
 * @param {*} date
 * @returns 
 */
 export const getAudit = (date) => {
  //发请求：axios发请求返回结果Promise对象
  return request({
    url: "/content/footfallForecast/get-footfall?date="+date,
    method: "GET",
  });
};

/**
 * 添加客流量
 */
export const addAudit = (data) => {
  return request({
    url: "/content/footfallForecast/add-footfall",
    method: "POST",
    data: data,
  });
};
