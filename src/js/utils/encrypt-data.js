import { rsaOaepParams as algorithm } from '../constants';

const encryptData = async (data, publicKey) => {
  let encrypted;

  try {
    encrypted = await window.crypto.subtle.encrypt(algorithm, publicKey, data);
  } catch (err) {
    const e = `Error during encryption: ${err}`;
    // eslint-disable-next-line no-alert
    alert(e);
  }

  return encrypted;
};

export default encryptData;
