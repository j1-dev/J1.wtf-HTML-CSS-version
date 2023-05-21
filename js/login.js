document.addEventListener('DOMContentLoaded', () => {
  var form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    var email = document.getElementById('user').value;
    var password = document.getElementById('pass').value;

    if (email.trim() === '') {
      showAlert('Error', 'Por favor introduce un email');
    } else if (!isValidEmail(email.trim())) {
      showAlert('Error', 'Por favor introduce un email válido');
    } else if (password.trim() === '') {
      showAlert('Error', 'Por favor introduce una contraseña');
    } else if (!isValidPassword(password.trim())) {
      showAlert('Error', 'Por favor introduce una contraseña válida');
    } else {
      showSuccess('Success', 'Usuario identificado correctamente!');
    }
  });
});

const isValidEmail = (email) => {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
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

// Function to show SweetAlert alert
const showAlert = (title, message) => {
  Swal.fire({
    title: title,
    text: message,
    icon: 'error',
    confirmButtonText: 'OK',
  });
};

const showSuccess = (title, message) => {
  Swal.fire({
    title: title,
    text: message,
    icon: 'success',
    confirmButtonText: 'OK',
  });
};
