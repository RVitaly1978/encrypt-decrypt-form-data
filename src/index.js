import State from './js/state/state';
import {
  utf8ToUint8Array,
  bufferSourceToUtf8,
  encryptData,
  decryptData,
  arrayBufferToBase64,
  base64ToArrayBuffer,
  importKey,
  pemToArrayBuffer,
} from './js/utils/index';

import './styles/style.css';

const state = new State({
  publicKey: null,
  privateKey: null,
  data: null,
});

const getFormDataNode = () => document.getElementById('formData');
const getUploadPublicKeyNode = () => document.getElementById('uploadPublicKey');
const getEncryptSubmitNode = () => document.getElementById('encryptSubmit');
const getEncryptResultNode = () => document.getElementById('encryptResult');
const getFormResultNode = () => document.getElementById('formResult');
const getUploadPrivateKeyNode = () => document.getElementById('uploadPrivateKey');
const getDecryptSubmitNode = () => document.getElementById('decryptSubmit');
const getDecryptResultNode = () => document.getElementById('decryptResult');
const getResetDataNode = () => document.getElementById('resetData');

const getFormData = () => {
  const inputs = getFormDataNode().querySelectorAll('input[type=text]');

  if (!inputs.length) {
    return [];
  }

  return Array.from(inputs)
    .filter((item) => item.value)
    .map(({ id, value }) => ({ id, value }));
};

const makeRow = (values = []) => {
  if (!values.length) {
    return undefined;
  }

  const elNode = document.createElement('p');
  elNode.className = 'row_result';

  values.forEach((value) => {
    const node = document.createElement('span');
    node.className = 'item_result';
    node.innerText = value;
    elNode.appendChild(node);
  });

  return elNode;
};

const makeContent = (data = []) => {
  if (!data.length) {
    return [];
  }

  return data.map((item) => makeRow(Object.values(item)));
};

const appendContent = (data, getNode) => {
  const content = makeContent(data);

  if (!content.length) {
    return undefined;
  }

  const node = getNode();
  node.innerHTML = '';
  content.forEach((item) => node.appendChild(item));

  return undefined;
};

const encryptTextData = async (data, key) => {
  const uint8Array = utf8ToUint8Array(data);
  const encrypted = await encryptData(uint8Array, key);
  return arrayBufferToBase64(encrypted);
};

const decryptTextData = async (data, key) => {
  const arrayBuffer = base64ToArrayBuffer(data);
  const decrypted = await decryptData(arrayBuffer, key);
  return bufferSourceToUtf8(decrypted);
};

const readFile = async (file) => {
  const res = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsText(file, 'base64');
    reader.onerror = (e) => reject(e);
  });

  return res;
};

const convertKeyFromFile = async (keyFile, isPrivate = true) => {
  let pem;
  try {
    pem = await readFile(keyFile);
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert(e);
    return undefined;
  }

  const der = pemToArrayBuffer(pem, isPrivate);
  const key = await importKey(der, isPrivate);
  return key;
};

const handleDataSubmit = async (evt) => {
  evt.preventDefault();

  const data = getFormData();

  const { publicKey } = state.getState();
  const key = await convertKeyFromFile(publicKey, false);

  if (!data.length || !key) {
    return undefined;
  }

  const encryptedData = await Promise.all(data
    .map(async ({ id, value }) => ({ id, value: await encryptTextData(value, key) })));

  appendContent(encryptedData, getEncryptResultNode);

  state.update({ data: encryptedData });
  return undefined;
};

const handleResultSubmit = async (evt) => {
  evt.preventDefault();

  const { data } = state.getState();

  const { privateKey } = state.getState();
  const key = await convertKeyFromFile(privateKey);

  if (!data.length || !key) {
    return undefined;
  }

  const decryptedData = await Promise.all(data
    .map(async ({ id, value }) => ({ id, value: await decryptTextData(value, key) })));

  appendContent(decryptedData, getDecryptResultNode);

  return undefined;
};

const handleUploadKey = (evt, key) => {
  const { files } = evt.target;
  state.update({ [key]: files.length ? files[0] : null });
  state.notify();
};

const toggleDisabledSubmitButtons = () => {
  const { publicKey, privateKey } = state.getState();

  getEncryptSubmitNode().disabled = !publicKey;
  getDecryptSubmitNode().disabled = !privateKey;
};

const resetInputValues = () => {
  const inputs = getFormDataNode().querySelectorAll('input[type=text]');

  if (!inputs.length) {
    return undefined;
  }

  const arr = Array.from(inputs);
  for (let i = 0; i < arr.length; i += 1) {
    arr[i].value = '';
  }

  return undefined;
};

const resetAllData = () => {
  getEncryptResultNode().innerHTML = '';
  getDecryptResultNode().innerHTML = '';
  resetInputValues();
};

window.addEventListener('load', () => {
  state.subscribe(toggleDisabledSubmitButtons);

  getFormDataNode().addEventListener('submit', handleDataSubmit);
  getFormResultNode().addEventListener('submit', handleResultSubmit);

  getUploadPublicKeyNode().addEventListener('change', (evt) => {
    handleUploadKey(evt, 'publicKey');
  });
  getUploadPrivateKeyNode().addEventListener('change', (evt) => {
    handleUploadKey(evt, 'privateKey');
  });

  getResetDataNode().addEventListener('click', resetAllData);
});
