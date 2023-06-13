// 全局loading设置
import store from "@/store";
let loadingNum = 0;

// 开始显示Loading
const startLoading = () => {
  loadingNum++;
  store.commit("setLoading", true);
};
// 关闭Loading
const endLoading = () => {
  loadingNum--;
  if (loadingNum >= 0) {
    store.commit("setLoading", false);
  }
  loadingNum = loadingNum < 0 ? 0 : loadingNum;
};
// 重置函数
const resetLoading = () => {
  loadingNum = 0;
  store.commit("setLoading", false);
};
// 导出
export default {
  startLoading,
  endLoading,
  resetLoading,
  loadingNum,
};
