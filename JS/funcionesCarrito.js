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

const mostrarAlertaCompra = () => {

    //const carrito = cargarCarritoLS()

    // Verificar si el usuario ha iniciado sesión
    const isLoggedIn = sessionStorage.getItem('isLoggedIn')

    //let listaProductos = ''

    if (isLoggedIn === 'true') {
        // Usuario ha iniciado sesión, redirigir a envio.html
        window.location.href = 'envio.html'
        //vaciarCarrito()
    } else {
        // Usuario no ha iniciado sesión, mostrar alerta con opciones de registro o inicio de sesión
        Swal.fire({
            title: 'Registrarse o iniciar sesión',
            text: 'Para realizar una compra, debes registrarte o iniciar sesión.',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Registrarse',
            cancelButtonText: 'Iniciar sesión'
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirigir a registro.html
                window.location.href = 'registro.html'
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Redirigir a login.html
                window.location.href = 'login.html'
                }
            }
        )
    }
}


// Función para realizar la compra
const realizarCompra = () => {
    // Mostrar la alerta de compra
    mostrarAlertaCompra()

}


/*

// Obtener los datos del usuario actual desde sessionStorage
//const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'))

// Verificar si el usuario ha iniciado sesión
if (usuarioActual && usuarioActual.username) {
    // Mostrar el nombre del usuario en el navbar
    const nombreUsuarioNavbar = `<span class="nav-link text-success">Hola! ${usuarioActual.username}</span>`

    document.getElementById('user').innerHTML = nombreUsuarioNavbar

}

*/


