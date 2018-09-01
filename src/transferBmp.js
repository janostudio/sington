import utils from './utils';

// 判断是否是bmp，是的话，返回bmp的配置信息，否则返回false
function isBmp(unit8s) {
  // 读取编码，看标识符是否为“BM”
  const identifier = utils.decimalistToASICII(unit8s.slice(0, 2));
  if(identifier !== 'BM') {
    throw('The picture is not BMP.');
  }else {
    return {
      identifier,
      size: utils.bigEndianCompute(unit8s.slice(2, 6)),
      metaLength: utils.bigEndianCompute(unit8s.slice(10, 14)),
      width: utils.bigEndianCompute(unit8s.slice(18, 22)),
      height: utils.bigEndianCompute(unit8s.slice(22, 26)),
      bitCount: utils.bigEndianCompute(unit8s.slice(28, 30)),
      compression: utils.bigEndianCompute(unit8s.slice(30, 34)),
      sizeImage: utils.bigEndianCompute(unit8s.slice(34, 38)),
    }
  }
}

// bmp转pixelData
export function bmpTopixelData(buffer, emptyData) {
  const unit8s = new Uint8Array(buffer);
  const meta = isBmp(unit8s);
  // 1个像素在bmp中由3个字节组成，原始pixelData还有一个透明度
  let pixelData = emptyData || new Uint8Array(meta.width * meta.height * 4);
  let a = 0;
  for (let i = 0; i < meta.height; i++){
    for (let j = 0; j < meta.width * 3; j++) {
      pixelData[a] = unit8s[meta.size - (meta.width * 3 * i) - (meta.width * 3 - j)];
      if(!((j + 1) % 3)){
        pixelData[++a] = 255;// 透明度0-255
      }
      a++ ;
    }
  }
  return  emptyData ? pixelData : Object.assign(meta, {pixelData});
}

// TODO pixelDataToBmp