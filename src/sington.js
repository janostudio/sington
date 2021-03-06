// bmp转换器
import { bmpToPixelData } from './transferBmp';
// dcm转换器
import { dcmToPixelData } from './transferDcm';
import { generateDcm } from './generateDcm';
// jpg转换器
import { jpgToPixelData } from './transferJpg';
import version from './version';

export default {
  bmpToPixelData,
  dcmToPixelData,
  jpgToPixelData,
  generateDcm,
  version
};
