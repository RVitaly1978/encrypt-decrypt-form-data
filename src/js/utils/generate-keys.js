import { rsaHashedKeyGenParams as algorithm } from '../constants';

const generateKeys = async () => {
  let keys;

  try {
    keys = await window.crypto.subtle.generateKey(algorithm, true, ['encrypt', 'decrypt']);
  } catch (err) {
    const e = `Error during generate keys: ${err}`;
    // eslint-disable-next-line no-alert
    alert(e);
  }

  return keys;
};

export default generateKeys;
