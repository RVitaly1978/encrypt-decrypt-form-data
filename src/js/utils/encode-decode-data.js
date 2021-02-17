const asciiToBase64 = (str) => window.btoa(str);

const base64ToAscii = (str) => window.atob(str);

const bufferSourceToAscii = (bufferSource) => String
  .fromCharCode.apply(null, new Uint8Array(bufferSource));

const asciiToArrayBuffer = (str) => {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);

  for (let i = 0; i < str.length; i += 1) {
    bufView[i] = str.charCodeAt(i);
  }

  return buf;
};

const utf8ToUint8Array = (str) => new TextEncoder().encode(str);

const bufferSourceToUtf8 = (bufferSource) => new TextDecoder('utf-8').decode(bufferSource);

const base64ToArrayBuffer = (base64) => {
  const byteString = base64ToAscii(base64);
  return asciiToArrayBuffer(byteString);
};

const arrayBufferToBase64 = (arrayBuffer) => {
  const byteString = bufferSourceToAscii(arrayBuffer);
  return asciiToBase64(byteString);
};

export {
  asciiToBase64,
  base64ToAscii,
  bufferSourceToAscii,
  asciiToArrayBuffer,
  base64ToArrayBuffer,
  arrayBufferToBase64,
  utf8ToUint8Array,
  bufferSourceToUtf8,
};
