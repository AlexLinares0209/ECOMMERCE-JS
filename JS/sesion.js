document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Obtener los datos del usuario registrado desde sessionStorage
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (user && user.email === email && user.password === password) {
        // Inicio de sesión exitoso, guardar la información del usuario en sessionStorage
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('currentUser', JSON.stringify(user));

        Swal.fire({
            icon: 'success',
            title: 'Inicio sesión con éxito!',
            confirmButtonText: 'Aceptar'
        })

        // Redirigir al usuario a la página principal
        window.location.href = 'index.html';
    } else {
        // Mostrar mensaje de error en caso de fallo en el inicio de sesión
        Swal.fire({
            icon: 'error',
            title: 'Error en el inicio de sesión',
            text: `Intente nuevamente`,
            confirmButtonText: 'Aceptar'
        })
    }
});
