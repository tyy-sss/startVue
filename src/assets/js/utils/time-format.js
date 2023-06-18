// 时间格式化

import { formatDate } from "@vueuse/shared";

// 把标准时间变成yyyy-mm-dd HH:MM:SS
const formatTime = (date) => {
  return handleTime(date);
};
// 把标准时间变成yyyy-mm-dd
const formatTimeOne = (date) => {
  return handleTime(date).slice(0,10);
};
// 把标准时间变成yyyy-mm-dd HH:MM:SS
const handleTime = (date) => {
  var y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    h = date.getHours(),
    i = date.getMinutes(),
    s = date.getSeconds();
  if (m < 10) {
    m = "0" + m;
  }
  if (d < 10) {
    d = "0" + d;
  }
  if (h < 10) {
    h = "0" + h;
  }
  if (i < 10) {
    i = "0" + i;
  }
  if (s < 10) {
    s = "0" + s;
  }
  var t = y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
  return t;
};

export { formatTime,formatTimeOne }