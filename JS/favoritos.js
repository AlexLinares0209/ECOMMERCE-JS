/* <========== Funciones para guardar y cargar productos seleccionados en favoritos ==========> */

const guardarProductosFavoritosLS = (favoritos) => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos))
}

const cargarProductosFavoritosLS = () => {
    return JSON.parse(localStorage.getItem('favoritos')) || []
}

const cantidadTotalFavoritos = () => {
    const favoritos = cargarProductosFavoritosLS()
    return favoritos.reduce((acumulador, item) => acumulador += item.cantidad, 0)
}

const vaciarFavoritos = () => {
    localStorage.removeItem('favoritos')
    renderBotonFavoritos()
    renderProductosFavoritos()

}

const estaEnFavoritos = (id) => {
    const favoritos = cargarProductosFavoritosLS()
    return favoritos.some(item => item.id === id)
}

const renderProductosFavoritos = () => {
    let productos = cargarProductosFavoritosLS()
    let contenido = ''

    if (cantidadTotalFavoritos() > 0) {
        contenido += `
        <table class="table">
          <thead>
            <tr>
                <th><button class="btn bg-light btn-sm" onclick="vaciarFavoritos()">Eliminar Favoritos</button></th>
            </tr>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
      `

        productos.forEach(producto => {
            contenido += `
          <tr>
            <td><img src="${producto.imagen}" width="60" alt="${producto.nombre}"></td>
            <td class="small">${producto.nombre}</td>
            <td class="small">${producto.descripcion}</td>
            <td class="small">${producto.precio}</td>
            <td><i class="bi bi-bag-plus-fill agregar" onclick="agregarProducto(${producto.id})"></i></td>

          </tr>
        `
        })

    } else {
        contenido += `
        <div class="alert alert-success text-center" role="alert">
          No tienes favoritos todavía🥲
        </div>
      `
    }

    document.getElementById('contenido-favoritos').innerHTML = contenido
}



const iconoFavoritos = document.querySelector('.favoritos')

iconoFavoritos.addEventListener('click', renderProductosFavoritos)


const agregarProductoFavoritos = (id) => {
    const favorito = cargarProductosFavoritosLS()

    if (estaEnFavoritos(id)) {
        let pos = favorito.findIndex(item => item.id === id)
        favorito[pos].cantidad += 1
    } else {

        fetch('./JS/productos.json')
            .then((respuesta) => respuesta.json())
            .then((productos) => {
                const producto = productos.find(item => item.id == id)
                producto.cantidad = 1
                favorito.push(producto)
                guardarProductosFavoritosLS(favorito)
                renderBotonFavoritos()

                // Mostrar la alerta de toast

                Toastify({
                    text: 'Producto agregado a favoritos',
                    duration: 3000, 
                    gravity: 'bottom',
                    position: 'left', 
                    backgroundColor: '#198754',
                    stopOnFocus: true
                }).showToast()

            })
    }

    guardarProductosFavoritosLS(favorito)
    renderBotonFavoritos()
}
