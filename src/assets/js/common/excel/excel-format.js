import {
  timeRegex,
  hourMinuteRegex,
  numRegex,
} from "@/assets/js/utils/regular-expression";

// 导出数据（给后端接口传的数据）
const auditLeadingIn = {};
const employeeLeadingIn = {};

// 对接口传过来的数据进行处理
// 过滤处理
const handleExcelFormat = (data, name) => {
  var excelData = null;
  switch (name) {
    case "audit":
      // 处理数据
      excelData = handleAuditDataExcelFormat(data);
      break;
    case "employee":
      excelData = handleEmployeeDataExcelFormat(data);
      break;
  }
  excelData = JSON.parse(JSON.stringify(excelData));
  console.log(excelData,"得到处理之后的表单数据")
  return excelData;
};
// excel表数据处理
const handleAuditDataExcelFormat = (data) => {
  let excelData = null;
  // 过滤数组
  excelData = data.filter((element) => {
    const timeResult = timeRegex.test(element.date);
    const startResult = hourMinuteRegex.test(element.startTime);
    const endResult = hourMinuteRegex.test(element.endTime);
    const auditResult = numRegex.test(element.audit);
    if (timeResult && startResult && endResult && auditResult) {
      return element;
    }
  });
  // 把小时边成数字
  excelData.forEach((item)=>{
    // 把时间改成数字
    item.startTime = item.startTime.slice(0,item.startTime.indexOf(":"));
    item.endTime=item.endTime.slice(0,item.endTime.indexOf(":"));
  })
  return excelData;
};
//对解析后得到的数据，进行处理，（sex int，preference变成数组，日期从数字转换成日期）
const handleEmployeeDataExcelFormat = (data) => {
  var handleData = [];
  data.forEach((item) => {
    //姓名不为空
    if (item.staffName === "") return;
    //对邮箱，电话号码，身份证进行正则表达式进行判断
    var e = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/;
    var email = e.test(item.staffEmail);
    var p = /^[1][0-9]{10}$/;
    var phone = p.test(item.phone);
    var i =
      /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    var idNumber = i.test(item.idNumber);
    if (!email || !phone || !idNumber) return; //跳出本次循环
    if (item.sex === "男") {
      item.sex = 1;
    } else if (item.sex === "女") {
      item.sex = 2;
    }
    //把偏好设置成数组
    const preferences = [];
    preferences.push(
      {
        preferenceId: "",
        preferenceType: "工作日偏好",
        preferenceValue: item.timePreference,
      },
      {
        preferenceId: "",
        preferenceType: "工作时间偏好",
        preferenceValue: item.datePreference,
      },
      {
        preferenceId: "",
        preferenceType: "班次时长偏好",
        preferenceValue: item.timeLongPreference,
      }
    );
    item.preferences = preferences;
    //把技能变成数组
    var skills = [];
    for (let i = 0; i < item.skills.length; i++) {
      if (
        item.skills[i] === " " ||
        item.skills[i] === "，" ||
        item.skills[i] === "；" ||
        item.skills[i] === "," ||
        item.skills[i] === ";"
      )
        continue;
      let s = "";
      while (
        item.skills[i] !== " " &&
        item.skills[i] !== "，" &&
        item.skills[i] !== "；" &&
        item.skills[i] !== "," &&
        item.skills[i] !== ";"
      ) {
        s = s.concat(item.skills[i]);
        i++;
        if (i >= item.skills.length) {
          break;
        }
      }
      skills.push({skillId: "", skill: s });
    }
    item.skills = skills;
    //删除对象中多余的属性
    delete item.datePreference;
    delete item.timePreference;
    delete item.timeLongPreference;
    //把处理好的数组加入指定数组中
    handleData.push(item);
  });
  return handleData;
};
// 后端数据返回前端处理
const handleAduitDataFormat = (data,shopName) => {
  data.forEach((element)=>{
    element.startTime = element.startTime +":00";
    element.endTime = element.endTime+":00";
    element.shopName = shopName;
  })
  return data;
};
const handleEmployeeDataFormat = (data) => {
  const handleData = [];
  data.forEach((item) => {
    //处理skills数组将其变成字符串
    const skills = [];
    for (let i = 0; i < item.skills.length; i++) {
      var reg = new RegExp(",", "g");
      skills.push(item.skills[i].skill.toString().replace(reg, ""));
    }
    item.skills = skills;
    item.changeCompany = false;
    switch(item.sex){
      case 1: item.sex = '女';break;
      case 2: item.sex = '男';break;
    }
    //处理偏好数组
    item.preferences.forEach((single) => {
      switch (single.preferenceType) {
        case "工作日偏好":
          single.preferenceType = "timePreference";
          switch (single.preferenceValue) {
            case '1':
              single.preferenceValue = "星期一";
              break;
            case '2':
              single.preferenceValue = "星期二";
              break;
            case '3':
              single.preferenceValue = "星期三";
              break;
            case '4':
              single.preferenceValue = "星期四";
              break;
            case '5':
              single.preferenceValue = "星期五";
              break;
            case '6':
              singe.preferenceValue = "星期六";
              break;
            case '7':
              single.preferenceValue = "星期天";
              break;
          }
          break;
        case "工作时间偏好":
          single.preferenceType = "datePreference";
          var reg = single.preferenceValue.toString().indexOf(',');
          var begin = single.preferenceValue.substring(0,reg)+":00";
          var end = single.preferenceValue.substring(reg+1)+":00";
          single.preferenceValue = begin +"~" + end;
          break;
        case "班次时长偏好":
          single.preferenceType = "timeLongPreference";
          single.preferenceValue += "小时";
          break;
      }
      item[single.preferenceType] = single.preferenceValue;
    });
    handleData.push(item);
  });
  return handleData;
};

export { handleExcelFormat,handleAduitDataFormat,handleEmployeeDataFormat };
