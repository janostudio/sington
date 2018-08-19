class Sington {
  constructor(option){
    // 默认转化成jpg
    this.defaultFormat = option ? option.defaultFormat || 'origin' : 'origin';
    // imageData可以直接使用到canvas中
  }

  // 导入buffer文件数据，原始图片格式，未来图片格式
  loadImage(buffer, format) {
    const _format = format || this.defaultFormat;

  }

  // bmp转imageData
  bmpToImageData(buffer, emptyData) {
    const unit8s = new Uint8Array(buffer);
    const length = unit8s.byteLength;
    const width = unit8s[18] + unit8s[19] * 256 + unit8s[20] * 256 * 256 + unit8s[21] * 256 * 256 * 256;
    const height = unit8s[22] + unit8s[23] * 256 + unit8s[24] * 256 * 256 + unit8s[25] * 256 * 256 * 256;
    // 1个像素在bmp中由3个字节组成，原始imageData还有一个透明度
    let imageData = emptyData || new Uint8Array(width * height * 4);
    let a = 0;
    for (let i = 0; i < height; i++){
      for (let j = 0; j < width * 3; j++) {
        imageData[a] = unit8s[length - (width * 3 * i) - (width * 3 - j)];
        if(!((j + 1) % 3)){
          imageData[++a] = 255;// 透明度0-255
        }
        a++ ;
      }
    }
    return imageData;
  }


}

export default Sington;
