const products = [
  {
    id: 1,
    name: "Men T-Shirt",
    category: "men",
    price: 500,
    image: "https://via.placeholder.com/200",
    rating: 4
  },
  {
    id: 2,
    name: "Women Dress",
    category: "women",
    price: 1200,
    image: "https://via.placeholder.com/200",
    rating: 5
  },
  {
    id: 3,
    name: "Kids Wear",
    category: "kids",
    price: 800,
    image: "https://via.placeholder.com/200",
    rating: 3
  }
];

function displayProducts(items) {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = items.map(p => `
    <div class="product">
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <p>⭐ ${p.rating}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
      <button onclick="addToWishlist(${p.id})">❤️</button>
    </div>
  `).join("");
}

displayProducts(products);

function filterCategory(cat) {
  if (cat === "all") return displayProducts(products);
  displayProducts(products.filter(p => p.category === cat));
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

function addToWishlist(id) {
  let wish = JSON.parse(localStorage.getItem("wishlist")) || [];
  wish.push(id);
  localStorage.setItem("wishlist", JSON.stringify(wish));
  alert("Added to wishlist");
}

// SEARCH FUNCTION
const searchInput = document.getElementById("search");
if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase();
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(value)
    );
    displayProducts(filtered);
  });
}

// CART DISPLAY
const cartDiv = document.getElementById("cartItems");
if (cartDiv) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let items = products.filter(p => cart.includes(p.id));

  cartDiv.innerHTML = items.map(p => `
    <p>${p.name} - ₹${p.price}</p>
  `).join("");
}
