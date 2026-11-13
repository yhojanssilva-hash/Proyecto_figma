// Categorías con imágenes representativas
const categories = [
  { id: "tecnologia", name: "Tecnología", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300" },
  { id: "moda", name: "Moda y Zapatillas", image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=300" },
  { id: "hogar", name: "Hogar y Jardín", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300" },
  { id: "deportes", name: "Deportes", image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=300" },
  { id: "coleccionables", name: "Coleccionables", image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300" }
];

// Listado de productos de muestra
const products = [
  { id: 1, category: "tecnologia", title: "Audífonos Inalámbricos Bluetooth con Cancelación de Ruido", price: "$49.99", shipping: "Envío GRATIS", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
  { id: 2, category: "tecnologia", title: "Smartwatch Deportivo con Monitor de Ritmo Cardíaco", price: "$35.50", shipping: "Envío GRATIS", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
  { id: 3, category: "moda", title: "Zapatillas Deportivas Urbanas Edición Limitada", price: "$89.99", shipping: "+$5.00 de envío", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
  { id: 4, category: "tecnologia", title: "Teclado Mecánico Gamer RGB Retroiluminado", price: "$65.00", shipping: "Envío GRATIS", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400" },
  { id: 5, category: "hogar", title: "Lámpara de Escritorio LED Inteligente", price: "$24.99", shipping: "Envío GRATIS", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400" },
  { id: 6, category: "deportes", title: "Balón de Fútbol Profesional Tamaño 5", price: "$19.99", shipping: "+$3.00 de envío", image: "https://images.unsplash.com/photo-1614632537190-23e4146777db?w=400" }
];

let cartCount = 0;

// Renderizar las categorías en pantalla
function renderCategories() {
  const container = document.getElementById("categories-grid");
  container.innerHTML = "";

  categories.forEach(cat => {
    const card = document.createElement("div");
    card.classList.add("category-card");
    card.onclick = () => filterByCategory(cat.id, cat.name);

    card.innerHTML = `
      <img src="${cat.image}" alt="${cat.name}">
      <span>${cat.name}</span>
    `;

    container.appendChild(card);
  });
}

// Renderizar la lista de productos
function renderProducts(itemsToRender) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = "";

  if (itemsToRender.length === 0) {
    grid.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }

  itemsToRender.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div>
        <div class="product-title">${product.title}</div>
        <div class="product-price">${product.price}</div>
        <div class="product-shipping">${product.shipping}</div>
      </div>
      <button class="add-cart-btn" onclick="addToCart()">Añadir al carrito</button>
    `;

    grid.appendChild(card);
  });
}

// Filtrar por categoría desde las imágenes
function filterByCategory(categoryId, categoryName) {
  document.getElementById("section-title").innerText = `Categoría: ${categoryName}`;
  const filtered = products.filter(p => p.category === categoryId);
  renderProducts(filtered);
}

// Incrementar contador de carrito
function addToCart() {
  cartCount++;
  document.getElementById("cart-count").innerText = cartCount;
}

// Buscar por texto e interacción del botón
document.getElementById("search-btn").addEventListener("click", () => {
  const query = document.getElementById("search-input").value.toLowerCase();
  const selectedCategory = document.getElementById("category-select").value;

  const filtered = products.filter(product => {
    const matchesQuery = product.title.toLowerCase().includes(query);
    const matchesCategory = selectedCategory === "todos" || product.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  document.getElementById("section-title").innerText = query ? `Resultados para "${query}"` : "Artículos destacados";
  renderProducts(filtered);
});

// Inicializar la vista
renderCategories();
renderProducts(products);
function updateCartUI() {
  let count = localStorage.getItem('cartCount') || 0;
  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.innerText = count;
  }
}

function addToCart() {
  let count = parseInt(localStorage.getItem('cartCount') || 0);
  count++;
  localStorage.setItem('cartCount', count);
  updateCartUI();
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();

  const cartBox = document.getElementById('cart-box');
  if (cartBox) {
    cartBox.addEventListener('click', () => {
      let count = localStorage.getItem('cartCount') || 0;
      alert(`Tienes ${count} artículo(s) en el carrito.`);
    });
  }

  const btnSearch = document.getElementById('btn-search');
  if (btnSearch) {
    btnSearch.addEventListener('click', () => {
      const query = document.getElementById('search-input').value;
      if (query.trim() !== '') {
        alert(`Buscando: ${query}`);
      }
    });
  }
});