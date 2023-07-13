// Obtener referencia al botón de aplicar filtro por precios
const aplicarFiltroPreciosBtn = document.getElementById('aplicar-filtro-precios');

// Agregar event listener al botón de aplicar filtro por precios
aplicarFiltroPreciosBtn.addEventListener('click', function() {
    const precioMin = document.getElementById('precio-min').value;
    const precioMax = document.getElementById('precio-max').value;
    filtrarProductosPorPrecio(precioMin, precioMax);
});

// Función para filtrar productos por precio
function filtrarProductosPorPrecio(precioMin, precioMax) {
    fetch('./JS/productos.json')
        .then((respuesta) => respuesta.json())
        .then((productos) => {
            // Filtrar los productos por precio
            const productosFiltrados = productos.filter(producto => {
                const precio = parseFloat(producto.precio.replace('S/.', ''));
                return precio >= precioMin && precio <= precioMax;
            });

            // Generar el contenido HTML de los productos filtrados por precio
            let contenidoProductos = '';
            productosFiltrados.forEach(producto => {
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
                `;
            });

            // Actualizar el contenido en el elemento con el ID 'contenido'
            document.getElementById('contenido').innerHTML = contenidoProductos;
        });
}
