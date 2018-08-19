// 下载图片并返回blob格式
export function getImageBuffer (url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.responseType = "arraybuffer";
    // arraybuffer: 二进制数据；blob：二进制大对象，比如图片、视频document： xml数据类型；json：返回数据会用被解析为JSON；text （文本形式）
    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
        // console.log(this.response);
        // if(cb) cb(this.response);
      }else{
        reject(this.response);
      }
    };
    xhr.send();
  }).catch(e=> {
    console.log(e);
    return e;
	})
}