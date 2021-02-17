import './styles/style.css';

const getFormDataNode = () => document.getElementById('formData');
const getEncryptResultNode = () => document.getElementById('encryptResult');

const getFormData = () => {
  const formData = getFormDataNode();
  const inputs = formData.querySelectorAll('input[type=text]');
  return Array.from(inputs)
    .filter((item) => item.value)
    .map(({ id, value }) => ({ id, value }));
};

const makeRow = (...values) => {
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

const makeContent = (data) => {
  const content = data.map((item) => makeRow(...Object.values(item)));
  return content;
};

const handleSubmit = (evt) => {
  evt.preventDefault();

  const data = getFormData();
  const content = makeContent(data);

  const container = getEncryptResultNode();
  container.innerHTML = '';

  content.forEach((item) => container.appendChild(item));
  container.classList.add('containerVisible');
};

window.addEventListener('load', () => {
  const formData = getFormDataNode();
  formData.addEventListener('submit', handleSubmit);
});
