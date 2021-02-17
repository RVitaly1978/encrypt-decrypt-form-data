const keyTypes = {
  public: 'public',
  private: 'private',
};

export default keyTypes;

export const algorithmName = 'RSA-OAEP';

export const rsaHashedKeyGenParams = {
  name: algorithmName,
  modulusLength: 2048,
  publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
  hash: 'SHA-256',
};

export const rsaHashedImportParams = {
  name: algorithmName,
  hash: 'SHA-256',
};

export const exportPrivateKeyFormat = 'pkcs8';
export const exportPublicKeyFormat = 'spki';

export const rsaOaepParams = { name: algorithmName };
