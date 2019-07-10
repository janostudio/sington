import Sington from './sington';
import { getImageBuffer } from './utils/ajax';

(async () => {
  // 获取bmp图像，并取出原始数据
  // const res = await getImageBuffer('/static/example.bmp');
  // let data = Sington.bmpToPixelData(res);

  // 获取raw图像，以及json数据得到dcm
  // const res = await getImageBuffer('/static/example.raw');
  // const newDcm = Sington.generateDcm.init({
  //   "samplesPerPixel": "1",
  //   "modality": "CT",
  //   "rescaleIntercept": "-2047",
  //   "columns": "768",
  //   "pixelRepresentation": "0",
  //   "imagePositionPatient": "-144.606\\-0.3\\1121.99",
  //   "imageOrientationPatient": "1\\0\\0\\0\\1\\0",
  //   "pixelSpacing": "0.4075521\\0.4075521",
  //   "rows": "768",
  //   "bitsAllocated": "16",
  //   "rescaleSlope": "1",
  //   "instanceNumber": 2,
  //   "instanceUid": "1.3.46.670589.33.1.63671649703047362800001.5691203487493254222",
  //   "patientId": "",
  //   "seriesNumber": 202,
  //   "seriesUid": "1.3.46.670589.33.1.63671649645273058300003.5127695355859275202",
  //   "studyUid": "1.3.46.670589.33.1.63671649357340589500001.4712209662470465392",
  // }, res);
  // let data = Sington.dcmToPixelData(newDcm);

  // 获取dcm图像，并取出原始数据
  const res = await getImageBuffer('/static/tmpl.dcm');
  const data = Sington.dcmToPixelData(res);

  // 获取jpg，并去除原始数据

  // 获取画布的原始数据
  const draw = document.getElementById('draw');
  draw.width = data.width;
  draw.height = data.height;
  const context = draw.getContext('2d');
  const imageData = context.getImageData(0, 0, data.width, data.height);
  for (let i = 0; i < imageData.data.length; i++) {
    imageData.data[i] = data.pixelData[i];
  }
  context.putImageData(imageData, 0, 0);
})();
