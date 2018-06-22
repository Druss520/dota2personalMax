export default function(k:number, d: number, a: number): string {
  
  return d===0 ? ((k + a)).toString() : ((k + a)/d).toFixed(1);
}