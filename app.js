// index.html
if (document.location.pathname.includes('index.html')) {
  fetch('https://raw.githubusercontent.com/SandraFz/preciosMayoristas/refs/heads/master/db.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('productList');
      const filter = document.getElementById('categoryFilter');

      function renderProducts(products) {
        container.innerHTML = '';
        products.forEach(product => {
          const card = document.createElement('div');
          card.className = 'product-card';
          card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio sugerido $${product.pricePublico}</p>
          `;
          card.onclick = () => {
            localStorage.setItem('selectedProduct', JSON.stringify(product));
            window.location.href = 'detail.html';
          };
          container.appendChild(card);
        });
      }

      filter.addEventListener('change', () => {
        const value = filter.value;
        if (value === 'todos') {
          renderProducts(data);
        } else {
          renderProducts(data.filter(p => p.categoria === value));
        }
      });

      renderProducts(data);
    });
}

// detail.html
if (document.location.pathname.includes('detail.html')) {
  const product = JSON.parse(localStorage.getItem('selectedProduct'));
  const container = document.getElementById('productDetail');
  container.innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.image}" alt="${product.name}">
    <p>${product.descripcion}</p>
    <p><strong>Precio Público:</strong> $${product.pricePublico}</p>
    <p><strong>Precio Consignación:</strong> $${product.priceConsignacion}</p>
    <p><strong>Precio Mayorista:</strong> $${product.priceMayorista}</p>
    <div class="detail-images">
      ${product.imagenesAdicionales.map(img => `<img src="${img}" alt="Foto adicional">`).join('')}
    </div>
  `;

  if (document.location.pathname.includes('detail.html')) {
  const product = JSON.parse(localStorage.getItem('selectedProduct'));
  const container = document.getElementById('productDetail');
  
  const allImages = [product.image, ...product.imagenesAdicionales];
  
  container.innerHTML = `
    <h2>${product.name}</h2>
    <div class="carousel">
      <button class="carousel-btn prev">❮</button>
      <div class="carousel-track">
        ${allImages.map(img => `<img src="${img}" alt="Vista del producto">`).join('')}
      </div>
      <button class="carousel-btn next">❯</button>
    </div>
    <p>${product.descripcion}</p>
    <p><strong>Precio Público:</strong> $${product.pricePublico}</p>
    <p><strong>Precio Consignación:</strong> $${product.priceConsignacion}</p>
    <p><strong>Precio Mayorista:</strong> $${product.priceMayorista}</p>
  `;

  // Carrusel
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let index = 0;

  function moveCarousel() {
    const width = track.children[0].clientWidth;
    track.style.transform = `translateX(-${index * width}px)`;
  }

  nextBtn.onclick = () => {
    if (index < allImages.length - 1) index++;
    moveCarousel();
  };

  prevBtn.onclick = () => {
    if (index > 0) index--;
    moveCarousel();
  };

  window.addEventListener('resize', moveCarousel);
}


  // Modal de imágenes
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const closeBtn = document.querySelector('.close');

  document.querySelectorAll('.detail-images img').forEach(img => {
    img.addEventListener('click', () => {
      modal.style.display = 'block';
      modalImg.src = img.src;
    });
  });

  closeBtn.onclick = () => {
    modal.style.display = 'none';
  };

  window.onclick = event => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
}


