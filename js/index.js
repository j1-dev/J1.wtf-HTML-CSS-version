const registrationForm = document.getElementById('registrationForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const privacyCheckbox = document.getElementById('privacyCheckbox');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

registrationForm.addEventListener('submit', function (event) {
  event.preventDefault();
  validateForm();
});

usernameInput.addEventListener('focus', function () {
  removeErrorMessage(usernameInput, usernameError);
});

passwordInput.addEventListener('focus', function () {
  removeErrorMessage(passwordInput, passwordError);
});

confirmPasswordInput.addEventListener('focus', function () {
  removeErrorMessage(confirmPasswordInput, confirmPasswordError);
});

function validateForm() {
  const usernameValue = usernameInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const confirmPasswordValue = confirmPasswordInput.value.trim();

  if (usernameValue === '') {
    showErrorMessage(usernameInput, usernameError, 'Este campo es obligatorio');
  }

  if (passwordValue === '') {
    showErrorMessage(passwordInput, passwordError, 'Este campo es obligatorio');
  }

  if (confirmPasswordValue === '') {
    showErrorMessage(
      confirmPasswordInput,
      confirmPasswordError,
      'Este campo es obligatorio'
    );
  }

  if (passwordValue !== confirmPasswordValue) {
    showErrorMessage(
      confirmPasswordInput,
      confirmPasswordError,
      'Las contraseñas no coinciden'
    );
  }

  if (!privacyCheckbox.checked) {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Debe aceptar la política de privacidad para registrarse.',
    });
  }

  if (
    usernameValue !== '' &&
    passwordValue !== '' &&
    confirmPasswordValue !== '' &&
    passwordValue === confirmPasswordValue &&
    privacyCheckbox.checked
  ) {
    const formData = {
      username: usernameValue,
      password: passwordValue,
    };

    console.log('Form data:', formData);
    registrationForm.reset();
  }
}

function showErrorMessage(inputElement, errorElement, message) {
  inputElement.classList.add('invalid');
  // Use SweetAlert for displaying the error message
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
  });
}

function removeErrorMessage(inputElement, errorElement) {
  inputElement.classList.remove('invalid');
  errorElement.textContent = '';
}
