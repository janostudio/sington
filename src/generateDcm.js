import utils from './utils';

export const generateDcm = {
  index: 0,
  tag: null,
  dcmArr: [],
  // json转DCM
  init(json, buffer) {
    // key找到tag，然后根据字典，查到type，并将数据按照小端法存储
    // 0002
    const mediaStorageInstance = this.datameta('00020003', 'UI', json.instanceUid);
    const transferSyntaxUID = this.datameta('00020010', 'UI', '1.2.840.10008.1.2.1');
    const metaLength = this.datameta('00020000', 'UL', mediaStorageInstance.length + transferSyntaxUID.length);
    // 0008
    const instanceUids = this.datameta('00080018', 'UI', json.instanceUid);
    const modality = this.datameta('00080060', 'CS', json.modality);
    // 0010
    const patientId = this.datameta('00100020', 'LO', json.patientId || '1');
    // 0018
    // 0020
    const studyUid = this.datameta('0020000D', 'UI', json.studyUid);
    const seriesUid = this.datameta('0020000E', 'UI', json.seriesUid);
    const seriesNumber = this.datameta('00200011', 'IS', json.seriesNumber);
    const instanceNumber = this.datameta('00200013', 'IS', json.instanceNumber);
    const imagePositionPatient = this.datameta('00200032', 'DS', json.imagePositionPatient);
    const imageOrientationPatient = this.datameta('00200037', 'DS', json.imageOrientationPatient);
    // 0028
    const samplesPerPixel = this.datameta('00280002', 'US', json.samplesPerPixel);
    const photometricInterpretation = this.datameta('00280004', 'CS', 'MONOCHROME2');
    const rows = this.datameta('00280010', 'US', Number(json.rows));
    const columns = this.datameta('00280011', 'US', Number(json.columns));
    const pixelSpacing = this.datameta('00280030', 'DS', json.pixelSpacing);
    const bitsAllocated = this.datameta('00280100', 'US', json.bitsAllocated);
    const bitsStored = this.datameta('00280101', 'US', json.bitsStored || 12);
    const highBit = this.datameta('00280102', 'US', json.highBit || 11);
    const pixelRepresentation = this.datameta('00280103', 'US', json.pixelRepresentation);
    const rescaleIntercept = this.datameta('00281052', 'DS', json.rescaleIntercept);
    const rescaleSlope = this.datameta('00281053', 'DS', json.rescaleSlope);
    // 生成序言与标识
    let preface = new Array(128);
    preface.fill(0);
    const identification = utils.charToDecimalist('DICM');
    // 生成图像字段
    const unit8Raw = new Uint8Array(buffer);
    const unit8Head = this.imageInfo(unit8Raw);
    // 拼接
    this.dcmArr = [...preface, ...identification, ...metaLength, ...mediaStorageInstance, ...transferSyntaxUID, 
      ...instanceUids, ...modality, ...patientId, ...studyUid, ...seriesUid,
      ...seriesNumber, ...instanceNumber, ...imagePositionPatient, ...imageOrientationPatient,
      ...samplesPerPixel, ...photometricInterpretation, ...rows, ...columns,
      ...pixelSpacing, ...bitsAllocated, ...bitsStored, ...highBit, ...pixelRepresentation,
      ...rescaleIntercept, ...rescaleSlope, ...unit8Head
    ];

    for(let i = 0; i < unit8Raw.length; i++) {
      this.dcmArr.push(unit8Raw[i]);
    }
    return new Uint8Array(this.dcmArr);
  },
  // 传入tag，VR，长度，内容生成一段数组
  datameta(tag, VR, content) {
    this.tag = tag;
    let arr = [];
    arr = arr.concat(this.bigEndianTag(tag));
    arr = arr.concat(utils.charToDecimalist(VR));
    arr = arr.concat(this.computeLength(VR, content));
    return arr;
  },
  imageInfo(unit8Raw) {
    let unit8Head = [];
    unit8Head = unit8Head.concat(this.bigEndianTag('7fe00010'));
    unit8Head = unit8Head.concat(utils.charToDecimalist('OW'));
    unit8Head = unit8Head.concat([0, 0]);
    let lenArr = utils.toLittleEndianArr(unit8Raw.length);
    while(lenArr.length < 4) {
      lenArr.push(0);
    }
    unit8Head = unit8Head.concat(lenArr);
    return unit8Head;
  },
  bigEndianTag(tag) {
    return [+('0x'+tag.substr(2, 2)), +('0x'+tag.substr(0, 2)), +('0x'+tag.substr(6, 2)), +('0x'+tag.substr(4, 2))];
  },
  hexToDecimalist(val) {
    return +('0x'+val);
  },
  computeLength(VR, content){
    // 计算内容长度
    let conArr = null;
    if(typeof content === 'string') {
      conArr = utils.charToDecimalist(content);
    }else if(typeof content === 'number') {
      conArr = utils.toLittleEndianArr(content);
    }
    if(conArr.length % 2) conArr.push(20);
    // 计算reverse/VL的长度
    const arr = utils.toLittleEndianArr(conArr.length);
    if (VR === 'OB' || VR === 'OW' || VR === 'SQ' 
      || VR === 'OF' || VR === 'UT' || VR === 'UN') {
      while(arr.length < 4) {
        arr.push(0);
      }
      arr.unshift([0, 0]);
    }else if(arr.length < 2) {
      arr.push(0);
    }
    // console.log(this.index++, this.tag, ' tag: 4', 'VR: 2', VR, 'reverse&length: ', arr.length, 'content: ', conArr.length);
    return arr.concat(conArr);
  },
};
