document.getElementById('pagoForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener los valores del formulario de pago
    const numeroCuenta = document.getElementById('numeroCuenta').value;
    const cuotas = document.getElementById('cuotas').value;
    const nombreTarjeta = document.getElementById('nombreTarjeta').value;
    const fechaVencimiento = document.getElementById('fechaVencimiento').value;
    const codigoSeguridad = document.getElementById('codigoSeguridad').value;

    const carrito = cargarCarritoLS()
    let listaProductos = ''
    carrito.forEach((producto) => {
        listaProductos += `${producto.nombre} - ${producto.descripcion} - ${producto.cantidad} ud. <br>`
    })

    // El usuario ha iniciado sesión, mostrar la alerta de compra exitosa con SweetAlert
    Swal.fire({
        icon: 'success',
        title: 'Compra realizada con éxito',
        html: `¡Gracias por tu compra! <br> ${listaProductos} <br> Recibirá un correo en breve.`,
        confirmButtonText: 'Aceptar'
    }).then(() => {
        //vaciarCarrito()
        // Redirigir al usuario a la página de index.html
        window.location.href = 'index.html';
    });
});