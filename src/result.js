require('./css/root.css');
require('./css/result.css');
require('./js/rem.js');

const ClipboardJS = require('clipboard');
const passwordInput = document.querySelector('.form-field input');
const hintField = document.querySelector('.hint-field');
const passwordText = sessionStorage.getItem('password');

if (!passwordText) {
  location.href = 'index.html';
} else {
  sessionStorage.removeItem('password');

  passwordInput.value = passwordText;
  document.querySelector('#copy').dataset.clipboardText = passwordText;
  new ClipboardJS('#copy').on('success', function (event) {
    event.clearSelection();
    hintField.classList.add('hint-field_visible');
    setTimeout(function () {
      hintField.classList.remove('hint-field_visible');
    }, 1e3);
  });
}

document.querySelector('#toggle').addEventListener('click', function () {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
});
