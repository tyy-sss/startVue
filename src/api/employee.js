//统一接口管理
import request from "./request";

/**
 * 获得员工信息
 * @param {页数，每页行数} data
 * @returns
 */
export const getShopEmployees = (data) => {
  return request({
    url: "/information/get-shop-employee",
    method: "get",
    params: {
      pages: data.pages,
      limit: data.limit,
      isSearch: data.isSearch,
      searchType: data.searchType,
      searchKeywords: data.searchKeywords,
    },
  });
};
/**
 * 获得员工信息
 * @param {页数，每页行数} data
 * @returns
 */
export const getCompanyEmployees = (data) => {
  return request({
    url: "/information/get-company-employee",
    method: "get",
    params: {
      pages: data.pages,
      limit: data.limit,
      isSearch: data.isSearch,
      searchType: data.searchType,
      searchKeywords: data.searchKeywords,
    },
  });
};
