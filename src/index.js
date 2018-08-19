import Sington from './sington';
import { getImageBuffer } from './utils';

const sington = new Sington();

// 下载/或上传图片，并得到图片数据
// var bmp = new Image();  
// let bmp = document.createElement('img');
// bmp.onload = function(e) {
//   console.log(e, bmp);
// };
// bmp.src = '/static/example.bmp';

(async function(){
  const res = await getImageBuffer('/static/example.bmp');
  // 获取画布的原始数据
  const draw = document.getElementById('draw');
  const context = draw.getContext('2d');
  let aData = context.getImageData(0,0,1280,720);
  // 直接将空数据传入
  sington.bmpToImageData(res, aData.data);
  // 函数传出数据，再遍历处理
  // let imageData = sington.bmpToImageData(res, aData.data);
  // console.log(aData.data.length, imageData.length);
  // for(let i =0; i < aData.data.length; i++){
  //   aData.data[i] = imageData[i];
  // }
  context.putImageData(aData, 0, 0);
})();

