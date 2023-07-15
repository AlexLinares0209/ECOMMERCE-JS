const loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit', function(event) {

    event.preventDefault()

    // Obtener los valores del formulario
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    // Obtener los datos del usuario registrado desde sessionStorage
    const user = JSON.parse(sessionStorage.getItem('user'))

        if (user && user.email === email && user.password === password) {
            
            // Inicio de sesión exitoso, guardar la información del usuario en sessionStorage
            sessionStorage.setItem('isLoggedIn', 'true')
            sessionStorage.setItem('usuarioActual', JSON.stringify(user))

            Swal.fire({
                icon: 'success',
                title: 'Inicio sesión con éxito!',
                confirmButtonText: 'Aceptar'
            })

            // Redirigir al usuario a la página principal
            window.location.href = 'index.html'

        } else {
            // Mostrar mensaje de error en caso de fallo en el inicio de sesión
            Swal.fire({
                icon: 'error',
                title: 'Error en el inicio de sesión',
                text: `Intente nuevamente`,
                confirmButtonText: 'Aceptar'
                }
            )
        }
    }
)


// Obtener los datos del usuario actual desde sessionStorage
//const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'))

// Verificar si el usuario ha iniciado sesión
if (usuarioActual && usuarioActual.username) {
    // Mostrar el nombre del usuario en el navbar
    const nombreUsuarioNavbar = `<span class="nav-link text-success">Hola! ${usuarioActual.username}</span>`

    document.getElementById('user').innerHTML = nombreUsuarioNavbar

}
