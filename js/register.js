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
      showErrorMessage('Por favor, escribe tu dirección de email.');
      return;
    }

    if (passwordInput.value === '') {
      showErrorMessage('Por favor, escribe tu contraseña.');
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

    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: `Tu formulario (${JSON.stringify(
        userData
      )}) ha sido enviado correctamente.`,
      showConfirmButton: false,
      timer: 2000,
    });
    console.log(JSON.stringify(userData));

    registrationForm.reset();
  });

  const showValidIcon = (inputElement) => {
    const validIcon = inputElement.parentElement.querySelector('.valid-icon');
    const invalidIcon =
      inputElement.parentElement.querySelector('.invalid-icon');
    validIcon.style.display = 'inline-block';
    invalidIcon.style.display = 'none';
  };

  const showInvalidIcon = (inputElement) => {
    const validIcon = inputElement.parentElement.querySelector('.valid-icon');
    const invalidIcon =
      inputElement.parentElement.querySelector('.invalid-icon');
    validIcon.style.display = 'none';
    invalidIcon.style.display = 'inline-block';
  };

  const showErrorMessage = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  };

  const showRequirements = () => {
    const errorMessage = document.querySelector('.password-requirements');
    errorMessage.style.display = 'block';
  };

  const hideRequirements = () => {
    const errorMessage = document.querySelector('.password-requirements');
    errorMessage.style.display = 'none';
  };

  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const passwordIsValid = (password) => {
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
  };
});
