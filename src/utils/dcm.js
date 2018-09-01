export default {
  // 获取tag
  getTag(arr) {
    arr = this.toArray(arr);
    arr = this.bigEndianQueue(arr);
    return arr.map(item => {
      const hex = item.toString(16);
      return hex.length < 2 ? '0' + hex : hex;
    }).join('');
  },
  // 数组按照打断排序，前者为数组，后者规定排序长度
  bigEndianQueue(arr, length) {
    length = length || 2;
    let newArr = [];
    for(let i = 0; i < arr.length; i += length) {
      newArr = newArr.concat(arr.slice(i, i + length).reverse());
    }
    return newArr;
  },
  // 获取值长度的长度（bytes）
  computeValueLength(vr) {
    if (vr === 'OB' || vr === 'OW' || vr === 'SQ' 
      || vr === 'OF' || vr === 'UT' || vr === 'UN') {
      return 4;
    } else {
      return 2;
    }
  },
  // 返回dataElement的结果
  getValue(VR, arr, tag) {
    const asic = ['CS', 'SH', 'LO', 'ST', 'LT', 'UT', 'AE', 'PN', 'UI', 'DA', 'TM', 'DT', 'AS', 'IS', 'DS'];// 15 
    const sign = ['SS', 'SL'];// 7
    const unsign = ['US', 'UL', 'AT'];// 7
    const float = ['FL', 'FD'];// 7 , 'OB', 'OW', 'OF', 'SQ', 'UN'
    if(asic.includes(VR)) {
      return tag === '7fe00010' ? arr :this.decimalistToASICII(arr);
    }else if(sign.includes(VR)) {
      // TODO
      return this.litteEndianCompute(arr);
    }else if(unsign.includes(VR)) {
      return this.litteEndianCompute(arr);
    }else {
      // TODO
      return arr
    }
  }
}