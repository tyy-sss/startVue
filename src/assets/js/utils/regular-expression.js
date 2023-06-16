// 正则表达式

// 匹配格式 yyyy-mm-dd
var timeRegex = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
// 00:00
var hourMinuteRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
// 只能是数字
var numRegex =   /^(0|([1-9]\d*))(\.\d+)?$/;

export {timeRegex,hourMinuteRegex,numRegex }