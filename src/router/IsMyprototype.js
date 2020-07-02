const isnw = 2;
const Istm = {
  $qf: isnw == 1 ? "qF" : "kV", //kV替换qF              使用$qF
  $jk: isnw == 1 ? "JK" : "架空", //架空替换JK            使用$jk
  $dl: isnw == 1 ? "DL" : "电缆", //电缆 替换DL           使用$dl
  $hh: isnw == 1 ? "HH" : "混合", //混合替换HH            使用$hh
  $sd: isnw == 1 ? "SD" : "输电", //输电替换SD            使用$sd
  $dydj: isnw == 1 ? "DYDJ" : "电压等级", //电压等级替换DYDJ      使用$dydj
  $bdz: isnw == 1 ? "BDZ" : "变电站", //变电站替换BDZ         使用$bdz
  $xl: isnw == 1 ? "XL" : "线路", //线路替换XL            使用$xl
  $gt: isnw == 1 ? "打卡点" : "杆塔", //杆塔替换打卡点        使用$gt
  $gh: isnw == 1 ? "编号" : "杆号", //杆号替换编号          使用$gh
  $ta: isnw == 1 ? "Ta" : "塔", //塔替换Ta              使用$ta
  $xb: isnw == 1 ? "xingX" : "相别", //相别替换xingX         使用$xb
}
export default Istm