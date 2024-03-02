// 处理数据
const handleWeekData = (data) => {
    const index =  data.timePeriod.indexOf('~');
    if(data.staffName === '开放班次'){
        data.staffName = null;
    }
  return {
    date:data.date,
    scheduleId:data.scheduleId,
    staffId:data.staffId,
    staffName: data.staffName,
    positionName: data.positionName,
    startTime: data.timePeriod.substring(0,index),
    endTime: data.timePeriod.substring(index+1),
  };
};
export { handleWeekData }