import { arrayBufferToBase64 } from './encode-decode-data';

const splitOneLineToMultiLineStr = (oneLineString, count = 64) => {
  let str = oneLineString;
  let multiLineString = '';
  const splitter = '\n';

  while (str.length > 0) {
    multiLineString += `${str.substring(0, count)}${splitter}`;
    str = str.substring(count);
  }

  return multiLineString.substring(0, multiLineString.length - 1);
};

const addHeaderAndFooter = (body, isPrivate) => {
  const splitter = '\n';

  const type = isPrivate ? 'PRIVATE' : 'PUBLIC';
  const header = `-----BEGIN ${type} KEY-----`;
  const footer = `-----END ${type} KEY-----`;

  return `${header}${splitter}${body}${splitter}${footer}`;
};

const toPem = (key, isPrivate = true) => {
  const base64 = arrayBufferToBase64(key);
  const multiLineString = splitOneLineToMultiLineStr(base64);
  const pem = addHeaderAndFooter(multiLineString, isPrivate);

  return pem;
};

export default toPem;
