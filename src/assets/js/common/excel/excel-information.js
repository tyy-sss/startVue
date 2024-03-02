// excel 文件 表格信息表
import { reactive } from "vue";

// 导入模板表数据
const auditExport = reactive({
  name: "audit",
  show: "客流量表",
  excelName: "下载客流量模板表",
  listHander: {
    date: "日期",
    startTime: "开始时间",
    endTime: "结束时间",
    audit: "预测顾客流量",
  },
  jsonData: [{}],
  character: {
    date: { text: "日期", type: "int" },
    startTime: { text: "开始时间", type: "string" },
    endTime: { text: "结束时间", type: "string" },
    audit: { text: "预测顾客流量", type: "string" },
  },
});

const employeeExport = {
  name: "employee",
  show: "员工表",
  excelName: "下载员工模板表",
  listHander: {
    staffName: "姓名",
    position: "职位",
    sex: "性别",
    idNumber: "身份证号",
    staffEmail: "邮箱",
    phone: "电话号码",
    hourlyWage: "时薪",
    timePreference: "工作日偏好",
    dataPreference: "工作时间偏好",
    timeLongPreference: "班次时长偏好",
    skills: "技能",
  },
  jsonData: [{}],
  character: {
    staffName: { text: "姓名", type: "string" },
    sex: { text: "性别", type: "string" },
    idNumber: { text: "身份证号", type: "string" },
    staffEmail: { text: "邮箱", type: "string" },
    phone: { text: "电话号码", type: "string" },
    hourlyWage: { text: "时薪", type: "string" },
    position: { text: "职位", type: "string" },
    timePreference: { text: "工作日偏好", type: "string" },
    datePreference: { text: "工作时间偏好", type: "string" },
    timeLongPreference: { text: "班次时长偏好", type: "string" },
    skills: { text: "技能", type: "string" },
  },
};

export { auditExport, employeeExport };
