export default function(time: number): string {
  const now = (new Date()).valueOf()/1000;
  const difference = now - time;
  if(difference <= 3600) {
    return (Math.floor(difference/60) + '分钟前')
  } else if (difference <= 86400) {
    return (Math.floor(difference/3600) + '小时前')
  } else if (difference <= 604800) {
    return (Math.floor(difference/86400) + '天前')
  } else {
    return (Math.floor(difference/604800) + '周前')
  }
}