/**
 * 菜单
 */
//统一接口管理
import request from "./request";

export const menuList = () => {
  return request({
    url: "/auth/get-menus",
    method: 'GET',
  });
};
