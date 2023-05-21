document.addEventListener('DOMContentLoaded', () => {
  const registrationForm = document.getElementById('registrationForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const privacyCheckbox = document.getElementById('privacyCheckbox');

  const passwordRequirements = document.querySelector('.password-requirements');
  const passwordRequirementItems = passwordRequirements.querySelectorAll('li');

  passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    console.log(passwordIsValid(password));

    if (!passwordIsValid(password)) {
      passwordRequirementItems.forEach((item) => {
        const requirement = item.dataset.requirement;

        switch (requirement) {
          case 'length':
            item.style.display = password.length >= 8 ? 'none' : 'block';
            break;
          case 'uppercase':
            item.style.display = /[A-Z]/.test(password) ? 'none' : 'block';
            break;
          case 'lowercase':
            item.style.display = /[a-z]/.test(password) ? 'none' : 'block';
            break;
          case 'number':
            item.style.display = /\d/.test(password) ? 'none' : 'block';
            break;
          case 'specialChar':
            item.style.display = /[@$!%*?&.]/.test(password) ? 'none' : 'block';
            break;
          default:
            item.style.display = 'block';
        }
      });
      showRequirements();
    } else {
      hideRequirements();
    }
  });

  passwordInput.addEventListener('blur', () => {
    hideRequirements();
  });

  passwordInput.addEventListener('focus', () => {
    if (!passwordIsValid(passwordInput.value)) showRequirements();
  });

  usernameInput.addEventListener('input', () => {
    if (emailIsValid(usernameInput.value)) {
      showValidIcon(usernameInput);
    } else {
      showInvalidIcon(usernameInput);
    }
  });

  registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (usernameInput.value === '') {
      showErrorMessage('Por favor, ingresa tu dirección de email.');
      return;
    }

    if (passwordInput.value === '') {
      showErrorMessage('Por favor, ingresa tu contraseña.');
      return;
    }

    if (confirmPasswordInput.value === '') {
      showErrorMessage('Por favor, confirma tu contraseña.');
      return;
    }

    if (!passwordIsValid(passwordInput.value)) {
      showErrorMessage('La contraseña no es válida');
      return;
    }

    if (!privacyCheckbox.checked) {
      showErrorMessage('Por favor, acepta la política de privacidad.');
      return;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
      showErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    const userData = {
      email: usernameInput.value,
      password: passwordInput.value,
    };

    console.log(JSON.stringify(userData));

    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: 'Tu formulario ha sido enviado correctamente.',
      showConfirmButton: false,
      timer: 2000,
    });

    registrationForm.reset();
  });

  function showValidIcon(inputElement) {
    const validIcon = inputElement.parentElement.querySelector('.valid-icon');
    const invalidIcon =
      inputElement.parentElement.querySelector('.invalid-icon');
    validIcon.style.display = 'inline-block';
    invalidIcon.style.display = 'none';
  }

  function showInvalidIcon(inputElement) {
    const validIcon = inputElement.parentElement.querySelector('.valid-icon');
    const invalidIcon =
      inputElement.parentElement.querySelector('.invalid-icon');
    validIcon.style.display = 'none';
    invalidIcon.style.display = 'inline-block';
  }

  function showErrorMessage(message) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  }

  function showRequirements() {
    const errorMessage = document.querySelector('.password-requirements');
    errorMessage.style.display = 'block';
  }

  function hideRequirements() {
    const errorMessage = document.querySelector('.password-requirements');
    errorMessage.style.display = 'none';
  }

  function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function passwordIsValid(password) {
    // Verificar cada requisito por separado
    const lengthRequirement = password.length >= 8;
    const uppercaseRequirement = /[A-Z]/.test(password);
    const lowercaseRequirement = /[a-z]/.test(password);
    const numberRequirement = /\d/.test(password);
    const specialCharRequirement = /[@$!%*?&.]/.test(password);

    return (
      lengthRequirement &&
      uppercaseRequirement &&
      lowercaseRequirement &&
      numberRequirement &&
      specialCharRequirement
    );
  }
});
