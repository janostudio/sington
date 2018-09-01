import Sington from './sington';
import { getImageBuffer } from './utils/ajax';

(async function(){
  // 获取bmp图像，并取出原始数据
  // const res = await getImageBuffer('/static/example.bmp');
  // let data = Sington.bmpToImageData(res);

  // 获取dcm图像，并取出原始数据
  const res = await getImageBuffer('/static/tmpl.bmp');
  let data = Sington.dcmToImageData(res);

  return false;
  // 获取画布的原始数据
  const draw = document.getElementById('draw');
  draw.width = data.width;
  draw.height = data.height;
  const context = draw.getContext('2d');
  let imageData = context.getImageData(0, 0, data.width, data.height);
  for(let i =0; i < imageData.data.length; i++){
    imageData.data[i] = data.pixelData[i];
  }
  context.putImageData(imageData, 0, 0);

})();

