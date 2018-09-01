/**
 * 目前只做了对 显式VR小端（1.2.840.10008.1.2.1）的匹配
 * 隐式VR小端（1.2.840.10008.1.2）暂未匹配
 * 显式VR大端（1.2.840.10008.1.2.2）暂未匹配
 */
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

// 将dcm的影像数据转成像素数据，目前仅支持MONOCHROME2，即灰度CT
function parsePixelData(meta){
  if(meta['00280004'].includes('MONOCHROME2')){
    const dcmData = meta['7fe00010'];
    const width = meta['00280010'];
    const height = meta['00280011'];
    const bitsAllocated = meta['00280100'];
    const bitsStored = meta['00280101'];
    const highBit = meta['00280102'];
    const windowCenter = '-400 ' || meta['00281050']; // -600\50 
    const windowWidth = '1500' || meta['00281051']; // 1200\350
    const rescaleIntercept = meta['00281052'];
    const rescaleSlope = meta['00281053'];
    const pixelData = new Uint8Array(width*height*4);
    const windowTop = windowCenter * 1 + windowWidth / 2;
    const windowFloor = windowCenter * 1 - windowWidth / 2;
    for(let i = 0; i < dcmData.length; i+=2) {
      let hu = parseInt(rescaleSlope) * utils.litteEndianCompute(dcmData.slice(i, i + 2)) + parseInt(rescaleIntercept);
      if (hu >= windowTop) hu = windowTop;
      if (hu <= windowFloor) hu = windowFloor;
      const greyData = (hu + 1024) / windowWidth * 255;
      const base = Math.floor(i / 2) * 4;
      pixelData[base] = pixelData[base + 1] = pixelData[base + 2] = greyData;
      pixelData[base + 3] = 255;
    }
    return {
      width,
      height,
      size: width*height*4,
      pixelData
    };
  }
  throw('Currently only supports Dcm with MONOCHROME2.');
}

// dcm转pixelData
export function dcmToPixelData(buffer) {
  const unit8s = new Uint8Array(buffer);
  let meta = {};
  getMeta(unit8s).forEach(item => {
    meta[item.tag] = item.value
  });
  return parsePixelData(meta);
};