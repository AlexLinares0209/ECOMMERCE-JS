const buscarProducto = async (id) => {
    return fetch('./JS/productos.json')
        .then((respuesta) => respuesta.json())
        .then((productos) => {
            let producto = productos.find(item => item.id === id)
            return producto
        })
}

const renderProductosEncontrados = (productos) => {

    let contenidoProductosEncontrados = ''

    if (productos.length > 0) {

        productos.forEach(producto => {
            contenidoProductosEncontrados += `
            <div class="producto">
            <div class="tarjeta">
                <img id="imagen-original-1" src="${producto.imagen}" alt="${producto.nombre}">
                <span class="oferta">20% OFF</span>
                <span class="envio"><i class="fa-solid fa-truck"></i> ENVÍO 24 HRS</span>
                
            </div>
            <div class="info">
                <p class="titulo-producto">${producto.nombre}</p>
                <p class="descripcion-producto">${producto.descripcion}</p>
                <div class="info-flex">
                    <div>
                        <p class="precio-del-producto-oferta"><span>${producto.precioAntes}</span></p>
                        <p class="precio-del-producto">${producto.precio}</p>
                    </div>
                    <div>
                        <button class="boton-añadir-carrito" id="añadir-carrito-btn" onclick="verProducto(${producto.id})" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i class="fa-solid fa-cart-shopping"></i> Añadir al carrito
            </button>
                    </div>
                </div>
            </div>
            
        </div>
            `
        })

    }

    else {
        contenidoProductosEncontrados += `
        <div class="container">
            <div class="alert alert-success text-center" role="alert">
                No se encontraron resultados
            </div>
      
            <a href="index.html" class="btn btn-success">Volver</a>

            <div class="container d-flex justify-content-center">
                <img src="./images/noEncontrado.svg" class="no-encontrado">
            </div
        </div>
        `
    }

    document.getElementById('contenido').innerHTML = contenidoProductosEncontrados
}

const buscarProductos = () => {
    const textoBusqueda = document.getElementById('inputBusqueda').value.toLowerCase()

    fetch('./JS/productos.json')
        .then((respuesta) => respuesta.json())
        .then((productos) => {
            const productosEncontrados = productos.filter(producto =>
                producto.tipo.toLowerCase().includes(textoBusqueda)
            )

            // Renderiza los productos encontrados
            renderProductosEncontrados(productosEncontrados)
        })
}


btnBuscar.addEventListener('click', buscarProductos)