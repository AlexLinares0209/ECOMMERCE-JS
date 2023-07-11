const estaEnElCarrito = (id) => {
    const carrito = cargarCarritoLS()
    return carrito.some(item => item.id === id)
}


const agregarProducto = (id) => {
    const carrito = cargarCarritoLS()

    if (estaEnElCarrito(id)) {
        let pos = carrito.findIndex(item => item.id === id)
        carrito[pos].cantidad += 1
    } else {

        fetch('./JS/productos.json')
            .then((respuesta) => respuesta.json())
            .then((productos) => {
                const producto = productos.find(item => item.id == id)
                producto.cantidad = 1
                carrito.push(producto)
                guardarCarritoLS(carrito)
                renderBotonCarrito()

                // Mostrar la alerta de toast

                Toastify({
                    text: 'Producto agregado al carrito',
                    duration: 3000, 
                    gravity: 'bottom',
                    position: 'left', 
                    backgroundColor: '#198754',
                    stopOnFocus: true
                }).showToast()

            })
    }

    guardarCarritoLS(carrito)
    renderBotonCarrito()
}


const limpiarAlertaStock = () => {
    const alertaStock = document.getElementById('alerta-stock')
    if (alertaStock) {
        alertaStock.innerHTML = ''
    }
}

const eliminarProducto = (id) => {
    const carrito = cargarCarritoLS()
    const nuevoCarrito = carrito.filter(item => item.id != id)
    guardarCarritoLS(nuevoCarrito)
    renderBotonCarrito()
    renderProductosCarrito()

    // Elimina el alert de stock si no hay productos
    limpiarAlertaStock()

}

const vaciarCarrito = () => {
    localStorage.removeItem('carrito')
    renderBotonCarrito()
    renderProductosCarrito()

    // Elimina el alert de stock al vaciar el carrito
    limpiarAlertaStock()

}

const cantidadTotalProductos = () => {
    const carrito = cargarCarritoLS()
    return carrito.reduce((acumulador, item) => acumulador += item.cantidad, 0)
}

const sumaTotalProductos = () => {
    const carrito = cargarCarritoLS()
    return carrito.reduce((acumulador, item) => acumulador + item.cantidad * parseFloat(item.precio.replace('S/.', '')), 0)
}


const aumentarCantidad = async (id) => {
    const carrito = cargarCarritoLS()
    const producto = await buscarProducto(id)
    let contenido = ''

    const pos = carrito.findIndex(item => item.id === id)

    if (pos !== -1) {
        const cantidadDisponible = producto.stock
        const cantidadDeseada = 1
        const cantidadTotal = carrito[pos].cantidad + cantidadDeseada

        if (cantidadTotal <= cantidadDisponible) {
            carrito[pos].cantidad = cantidadTotal
            producto.stock -= cantidadDeseada
            guardarCarritoLS(carrito)
            renderProductosCarrito()
        } else {
            contenido += `
            <div class="alert alert-danger text-center my-2" role="alert">
                No hay suficiente stock disponible para agregar más productos
            </div>
            `
            document.getElementById('alerta-stock').innerHTML = contenido
        }
    }
}


const disminuirCantidad = (id) => {
    const carrito = cargarCarritoLS()
    const pos = carrito.findIndex(item => item.id === id)

    if (pos !== -1) {
        if (carrito[pos].cantidad > 1) {
            carrito[pos].cantidad--
        } else {
            carrito.splice(pos, 1)
        }

        guardarCarritoLS(carrito)
        renderProductosCarrito()

        // Elimina el alert de stock si disminuye la cantidad según el stock
        limpiarAlertaStock()


    }
}


function mostrarAlertaCompra() {

    const carrito = cargarCarritoLS()
    // Verificar si el usuario ha iniciado sesión
    const isLoggedIn = sessionStorage.getItem('isLoggedIn')

    let listaProductos = ''

    if (isLoggedIn === 'true') {

        carrito.forEach((producto) => {
            listaProductos += `${producto.nombre} - ${producto.descripcion} - ${producto.cantidad} ud. <br>`
        })

        // El usuario ha iniciado sesión, mostrar la alerta de compra exitosa con SweetAlert
        Swal.fire({
            icon: 'success',
            title: 'Compra realizada con éxito',
            html: `¡Gracias por tu compra! <br> ${listaProductos} <br> Recibirá un correo en breve.`,
            confirmButtonText: 'Aceptar'
        })

        vaciarCarrito()

    } else {
        // El usuario no ha iniciado sesión, mostrar la alerta de registrarse o iniciar sesión con SweetAlert
        Swal.fire({
            icon: 'info',
            title: '¡Alerta!',
            text: 'Para realizar una compra, primero debes registrarte o iniciar sesión.',
            showCancelButton: true,
            confirmButtonText: 'Registrarme',
            cancelButtonText: 'Iniciar Sesión'
        }).then((result) => {
            if (result.isConfirmed) {
                // El usuario seleccionó "Registrarme", redirigir al formulario de registro
                window.location.href = 'registro.html' // Reemplaza con la URL de tu formulario de registro
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // El usuario seleccionó "Iniciar Sesión", redirigir al formulario de inicio de sesión
                window.location.href = 'login.html' // Reemplaza con la URL de tu formulario de inicio de sesión
            }
        })
    }

    

}


// Función para realizar la compra
function realizarCompra() {
    // Mostrar la alerta de compra
    mostrarAlertaCompra()
    
}


// Obtener los datos del usuario actual desde sessionStorage
const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

// Verificar si el usuario ha iniciado sesión
if (currentUser && currentUser.username) {
  // Mostrar el nombre del usuario en el navbar
  const nombreUsuarioNavbar = `<span class="nav-link text-success">Hola! ${currentUser.username}</span>`;

    document.getElementById('user').innerHTML = nombreUsuarioNavbar

}


