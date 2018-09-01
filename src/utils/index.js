import dcmUtils from './dcm';

/*
toArray typedArray、数字、字符串转化成正常数组
decimalistToASICII 十进制转ASICII
ASICIIToDecimalist ASICII转十进制
bigEndianCompute 大端法计算值
toBigendianArr 值根据大端法转化成数组
*/
export default {
  ...dcmUtils,
  // typedArray、数字、字符串转化成正常数组
  toArray(param) {
    const type = Object.prototype.toString.call(param)
    if(type.includes('Uint')) {
      return Array.from(param);
    }else if(type === '[object String]'){
      return param.split('');
    }else if(type === '[object Number]') {
      return [param];
    }else if(type === '[object Array]'){
      return param;
    }
    throw('The params is not String、Number or Array');
  },
  // 十进制转ASICII
  decimalistToASICII(arr){
    arr = this.toArray(arr);
    return arr.map(item => {
      return String.fromCharCode(item);
    }).join('');
  },
  // ASICII转十进制
  ASICIIToDecimalist(arr){
    arr = this.toArray(arr);
    return arr.map(item => {
      return String(item).charCodeAt();
    })
  },
  // 大端法计算值
  bigEndianCompute(arr, radix) {
    arr = this.toArray(arr);
    radix = radix || 256;
    return arr.reverse().reduce((pre, cur, index) => {
      return pre + cur * Math.pow(radix, index);
    }, 0);
  },
  // 值根据大端法转化成数组
  toBigendianArr(value, radix) {
    radix = radix || 256;
    let arr = [];
    while(value > 1){
      const mod = value % radix;
      arr.push(mod);
      value = (value - mod) / radix;
    };
    return arr;
  },
  // 小端计算值
  litteEndianCompute(arr, radix) {
    arr = this.toArray(arr);
    radix = radix || 256;
    return arr.reduce((pre, cur, index) => {
      return pre + cur * Math.pow(radix, index);
    }, 0);
  }
}