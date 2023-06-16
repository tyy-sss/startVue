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

const handleEmployeeDataExcelFormat = (data) => {};

// 后端数据返回前端处理
const handleAduitDataFormat = (data,shopName) => {
  data.forEach((element)=>{
    element.startTime = element.startTime +":00";
    element.endTime = element.endTime+":00";
    element.shopName = shopName;
  })
  return data;
};
const handleEmployeeDataFormat = () => {};

export { handleExcelFormat,handleAduitDataFormat };
