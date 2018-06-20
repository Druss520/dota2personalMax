export default function(duration: number): string {
  const min = Math.floor(duration/60);
  const sec = duration%60;
  return (min + ':' + (sec<10 ? '0' + sec : sec))
}