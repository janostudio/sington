import utils from './utils';

// 获取dcm中所有的key与value
function getDcmDetail(unit8s) {
  let cur = 132;
  let arr = [];
  while(cur < unit8s.length) {
    const tag = utils.getTag(unit8s.slice(cur, cur + 4));
    const VR =  utils.decimalistToASICII(unit8s.slice(cur + 4, cur + 6));
    let VL = utils.computeValueLength(VR);
    const revervedLen = VL - 2;
    const dataLength =  utils.litteEndianCompute(unit8s.slice(cur + 6 + revervedLen, cur + 6 + revervedLen + VL));
    arr.push({
      tag,
      VR,
      dataLength,
      offset: cur,
      value: utils.getValue(VR, unit8s.slice(cur + 6 + revervedLen + VL, cur + 6 + revervedLen + VL + dataLength), tag)
    });
    cur += 6 + revervedLen + VL + dataLength;
  }
  return arr;
}

// 获取meta
function getMeta(unit8s) {
  // 读取编码，看标识符是否为“DICM”
  const identifier = utils.decimalistToASICII(unit8s.slice(128, 132));
  if(identifier !== 'DICM') {
    throw('The picture is not DICM.');
  }else {
    // 获取所有tag与dataElementOffset
    return getDcmDetail(unit8s);
  }
}

// 将dcm的影像数据转成像素数据

// dcm转pixelData
export function dcmToPixelData(buffer) {
  const unit8s = new Uint8Array(buffer);
  let meta = {};
  getMeta(unit8s).forEach(item => {
    meta[item.tag] = item.value
  });
  let width = meta['00280010'];
  let height = meta['00280011'];
  return {
    ...meta,
    width,
    height,
    size: meta['7fe00010'].length,
    pixelData: meta['7fe00010']
  };
};