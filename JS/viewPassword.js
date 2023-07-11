// Obtener referencia al elemento del ícono
const togglePassword = document.querySelector('.password-toggle');

// Agregar el evento de clic al ícono
togglePassword.addEventListener('click', function() {
    const passwordInput = document.getElementById('password');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePassword.classList.remove('fa-eye-slash');
        togglePassword.classList.add('fa-eye');
    } else {
        passwordInput.type = 'password';
        togglePassword.classList.remove('fa-eye');
        togglePassword.classList.add('fa-eye-slash');
    }
});