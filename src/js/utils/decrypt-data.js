import { rsaOaepParams as algorithm } from '../constants';

const decryptData = async (data, privateKey) => {
  let decrypted;

  try {
    decrypted = await window.crypto.subtle.decrypt(algorithm, privateKey, data);
  } catch (err) {
    const e = `Error during decryption: ${err}`;
    // eslint-disable-next-line no-alert
    alert(e);
  }

  return decrypted;
};

export default decryptData;
