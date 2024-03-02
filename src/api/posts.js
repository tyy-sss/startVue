/**
 * 职位
 */
 import request from "./request";
 
 /**
  * 获得一个店铺的所有职位信息
  * @returns 
  */
 export const getPosts = () => {
   return request({
     url: "/information/get-position",
     method: "GET",
     showLoading: false,
   });
 };
