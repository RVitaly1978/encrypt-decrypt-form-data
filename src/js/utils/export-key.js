import {
  exportPrivateKeyFormat as privateFormat,
  exportPublicKeyFormat as publicFormat,
} from '../constants';

const exportKey = async (key, isPrivate = true) => {
  const format = isPrivate ? privateFormat : publicFormat;

  let exported;

  try {
    exported = await window.crypto.subtle.exportKey(format, key);
  } catch (err) {
    const e = `Error during export key: ${err}`;
    // eslint-disable-next-line no-alert
    alert(e);
  }

  return exported;
};

export default exportKey;
