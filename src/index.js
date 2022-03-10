require('./css/root.css');
require('./css/index.css');
require('./js/rem.js');

const PasswordGeneratorCore = require('@jsweibo/password-generator-core');

const passwordTypeInput = document.querySelector('#passwordType');
const passwordLengthInput = document.querySelector('#passwordLength');
const publicKeyInput = document.querySelector('#publicKey');
const privateKeyInput = document.querySelector('#privateKey');
const dateInput = document.querySelector('#date');

document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault();

  const passwordType = Number.parseInt(passwordTypeInput.value, 10);
  const passwordLength = Number.parseInt(passwordLengthInput.value, 10);
  const publicKey = publicKeyInput.value;
  const privateKey = privateKeyInput.value;
  const date = dateInput.value;

  const password = new PasswordGeneratorCore({
    passwordType,
    passwordLength,
    publicKey,
    privateKey,
    timestamp: Date.parse(date),
  });

  if (password.text) {
    sessionStorage.setItem('password', password.text);
    location.href = 'result.html';
  }
});

// parse url search string
if (location.search && URLSearchParams) {
  const sp = new URLSearchParams(location.search);

  const passwordType = sp.get('passwordType');
  const passwordLength = sp.get('passwordLength');
  const publicKey = sp.get('publicKey');
  const privateKey = sp.get('privateKey');
  const date = sp.get('date');

  if (passwordType) {
    passwordTypeInput.value = passwordType;
  }
  if (passwordLength) {
    passwordLengthInput.value = passwordLength;
  }
  if (publicKey) {
    publicKeyInput.value = publicKey;
  }
  if (privateKey) {
    privateKeyInput.value = privateKey;
  }
  if (date) {
    dateInput.value = date;
  }
}

document
  .querySelector('#passwordLength+button')
  .addEventListener('click', function () {
    passwordLengthInput.value = '';
  });

document
  .querySelector('#publicKey+button')
  .addEventListener('click', function () {
    publicKeyInput.value = '';
  });

document
  .querySelector('#privateKey+button')
  .addEventListener('click', function () {
    if (privateKeyInput.type === 'password') {
      privateKeyInput.type = 'text';
    } else {
      privateKeyInput.type = 'password';
    }
  });

if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function (error) {
        console.log(error);
      });
    });
  }
}
