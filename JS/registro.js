document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const username = document.getElementById('username').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Guardar los datos en sessionStorage
    const user = { username, lastname, email, password};
    sessionStorage.setItem('user', JSON.stringify(user));

    // Redirigir al usuario a la página de inicio de sesión
    window.location.href = 'login.html';
});
