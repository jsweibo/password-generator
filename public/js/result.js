const passwordInput = document.querySelector('#password');
const passwordText = sessionStorage.getItem('password');

if (!passwordText) {
  location.href = 'index.html';
} else {
  sessionStorage.removeItem('password');

  passwordInput.value = passwordText;
  document.querySelector('#copy').dataset.clipboardText = passwordText;

  const copyButton = new ClipboardJS('#copy');
  copyButton.on('success', function () {
    notify({
      type: 'success',
      message: 'Copied',
    });
  });
  copyButton.on('error', function () {
    notify({
      type: 'error',
      message: 'Error',
    });
  });
}

document.querySelector('#toggle').addEventListener('click', function () {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
});
