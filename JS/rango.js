

fetch('./JS/productos.json')
    .then(response => response.json())
    .then(productos => {
      const prices = productos.map(producto => parseFloat(producto.precio.replace('S/.', '')));
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      const priceRangeInput = document.getElementById('price-range');
      const priceRangeMin = document.getElementById('price-range-min');
      const priceRangeMax = document.getElementById('price-range-max');

      priceRangeInput.min = minPrice;
      priceRangeInput.max = maxPrice;

      priceRangeInput.addEventListener('input', () => {
        const selectedMinPrice = parseFloat(priceRangeInput.value);
        const selectedMaxPrice = maxPrice;

        priceRangeMin.innerText = selectedMinPrice;
        priceRangeMax.innerText = selectedMaxPrice;

        const filteredProducts = productos.filter(producto => {
          const productPrice = parseFloat(producto.precio.replace('S/.', ''));
          return productPrice >= selectedMinPrice && productPrice <= selectedMaxPrice;
        });

        renderProductos(filteredProducts);
      });

      function renderProductos(productos) {
        let contenidoProductosEncontrados = ''

        productos.forEach(producto => {
            contenidoProductosEncontrados += `
            <div class="col-md-3">
              <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                  <h5 class="card-title">${producto.nombre}</h5>
                  <p class="card-text">${producto.precio}</p>
                  <button type="button" class="btn btn-success" onclick="verProducto(${producto.id})" data-bs-toggle="modal" data-bs-target="#exampleModal">Ver Producto</button>
                </div>
              </div>
            </div>
            `
        })

        document.getElementById('contenido').innerHTML = contenidoProductosEncontrados
      }

      // Renderizar todos los productos inicialmente
      renderProductos(productos);
    });