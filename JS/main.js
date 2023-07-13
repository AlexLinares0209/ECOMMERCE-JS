fetch('./JS/productos.json').then((respuesta) => respuesta.json())
    .then((productos) => {
        let contenidoProductos = ''
        productos.forEach(producto => {
            contenidoProductos += `
            <div class="producto">
            <div class="tarjeta">
                <img class="imagen-producto" src="${producto.imagen}" alt="${producto.nombre}">
                <span class="oferta">20% OFF</span>
                <span class="envio"><i class="fa-solid fa-truck"></i> ENVÍO 24 HRS</span>
                <span class="heart"><i class="fa-solid fa-heart" onclick="agregarProductoFavoritos(${producto.id})"></i></span>
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

        document.getElementById('contenido').innerHTML = contenidoProductos
    })



const renderBotonCarrito = () => {
    let botonCarrito = document.getElementById('botonCarrito')
    let contenido = `
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    ${cantidadTotalProductos()}
    </span>
    `

    botonCarrito.innerHTML = contenido
}

const renderBotonFavoritos = () => {
    let botonFavoritos = document.getElementById('botonFavoritos')
    let contenido = `
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    ${cantidadTotalFavoritos()}
    </span>
    `

    botonFavoritos.innerHTML = contenido
}

renderBotonCarrito()

renderBotonFavoritos()

renderProductosCarrito()



// referencia al icono de carrito
const iconoCarrito = document.querySelector('.carrito')

iconoCarrito.addEventListener('click', renderProductosCarrito)


const iconoFavoritos = document.querySelector('.favoritos')

iconoFavoritos.addEventListener('click', renderProductosFavoritos)
















