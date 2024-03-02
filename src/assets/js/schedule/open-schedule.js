const handleOpenSchedule = (data) => {
  const period = data.periodList;
  const list = data.employeeList;
  if (list.length !== 0 && period.length !== 0) {
    var sign = false;
    period.forEach((element) => {
      if (element.staffId === "0") {
        sign = true;
      }
    });
    if (sign) {
      list.push({ name: "开放班次", staffId: "0" });
    }
  }
  return {
    period: period,
    list: list,
  };
};

export { handleOpenSchedule };
