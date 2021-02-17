import {
  exportPrivateKeyFormat as privateFormat,
  exportPublicKeyFormat as publicFormat,
  rsaHashedImportParams as algorithm,
} from '../constants';

const importKey = async (key, isPrivate = true) => {
  const options = isPrivate
    ? [privateFormat, key, algorithm, true, ['decrypt']]
    : [publicFormat, key, algorithm, true, ['encrypt']];

  let imported;

  try {
    imported = await window.crypto.subtle.importKey(...options);
  } catch (err) {
    const e = `Error during import key: ${err}`;
    // eslint-disable-next-line no-alert
    alert(e);
  }

  return imported;
};

export default importKey;
