import utils from './utils';

function getTag(unit8s) {
  let cur = 131;
  let arr = [];
  // while(cur < unit8s.length) {
  //   const tag = utils.getTag(cur + 1, cur + 4);
  //   const vr = utils.getAsic2(utils.getXxd2(cur + 5, cur + 6));
  //   let lenByte = utils.getLenbyteLen(tag, vr);
  //   // let lenByte = 3;
  //   // || tag.includes('0010')
  //   // if( tag.includes('0080') || tag.includes('0008') && vr !== 'SQ' ) lenByte = 1;
  //   const len = utils.getD(utils.getBig(cur + utils.hasRemain(vr) + 7, cur + utils.hasRemain(vr) + 7 + lenByte));
  //   // 处理0002组信息
  //   if(arr.length === 1) utils.get0002(arr);
  //   arr.push({
  //     tag: tag,
  //     VR: vr, // + 2
  //     length: len,
  //     // value: ,
  //     // lenByte: lenByte,
  //     offset: parseInt(cur).toString(16) // 当前位置 + tag + VR + 预留 + 长度 + 内容长度
  //   });
  //   cur += 4 + 2 + utils.hasRemain(vr) + 1 + lenByte + len;
  // }
}

function getMeta(unit8s) {
  // 读取编码，看标识符是否为“DICM”
  const identifier = utils.decimalistToASICII(unit8s.slice(128, 132));
  if(identifier !== 'DICM') {
    throw('The picture is not DICM.');
  }else {
    // 获取所有tag与dataElementOffset
    getTag(unit8s);
  }
}

export function dcmToImageData(buffer) {
  const unit8s = new Uint8Array(buffer);
  const meta = getMeta(unit8s);
};