import { formatTimeOne } from "../utils/time-format";

// 得到周的消息
const getWeekNews = (date) => {
  let nowData = new Date(date); //传入时间参数,如 2021-11-09 获取给定日期所属的周 日期  ;不给定日期,获取当天所属的周日期
  let currentDay = nowData.getDay();
  // 星期天的处理
  if (currentDay == 0) {
    currentDay = 7;
  }
  let week = [];
  console.log(currentDay)
  for (let i = 1; i <= 7; i++) {
    let DayTime;
    if (currentDay - i >= 0) {
      DayTime = nowData.getTime() - (currentDay - i) * 24 * 60 * 60 * 1000;
    } else {
      DayTime = nowData.getTime() + ( i - currentDay ) * 24 * 60 * 60 * 1000;
    }
    week.push(formatTimeOne(new Date(DayTime)));
  }
  console.log(week);
  return week;
};

// 修改周的消息（切换上下周）
const changeWeekNews = (date, num) => {
  date = new Date(date);
  date.setDate(date.getDate() + num);
  return date;
};

export { getWeekNews, changeWeekNews };
