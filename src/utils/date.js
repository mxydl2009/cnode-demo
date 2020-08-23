// 将inputTime字符串转换为本地时间字符串
export default function myTimeToLocal(inputTime) {
  if(!inputTime && typeof inpoutTime !== 'number') {
    return '';
  }
  let localTime = '';
  inputTime = new Date(inputTime).getTime(); // 获取inputTime的UTC时间（即毫秒数）
  const offset = (new Date()).getTimezoneOffset(); // 获取目前时间的本地时间与UTC(格林威治)时间相差的分钟数
  localTime = (new Date(inputTime - offset * 60 * 1000)).toISOString(); // toISOString()返回ISO格式的字符串: YYYY-MM-DDTHH:mm:ss.sssZ
  localTime = localTime.substr(0, localTime.lastIndexOf('.')); // 截取了.前面的字符串
  localTime = localTime.replace('T', ' ');
  return localTime;
}