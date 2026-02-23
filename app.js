const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 999,
    image: "https://m.media-amazon.com/images/I/61LtuGzXeaL._SL1500_.jpg"
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 2999,
    image: "https://m.media-amazon.com/images/I/71fRP7KY9cL._SL1500_.jpg"
  },
  {
    id: 3,
    name: "Bluetooth Headphones",
    price: 1499,
    image: "https://m.media-amazon.com/images/I/61kFL7ywsZS._SL1500_.jpg"
  },
  {
    id: 4,
    name: "USB-C Charger",
    price: 799,
    image: "https://m.media-amazon.com/images/I/61M3u9h2RQL._SL1500_.jpg"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productDiv = document.getElementById("products");
const cartDiv = document.getElementById("cart-items");
const totalEl = document.getElementById("total");
const countEl = document.getElementById("cart-count");
const search = document.getElementById("search");

function renderProducts(list) {
  productDiv.innerHTML = "";
  list.forEach(p => {
    productDiv.innerHTML += `
      <div class="product">
        <img src="${p.image}">
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(id) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  renderCart();
}

function renderCart() {
  cartDiv.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;
    cartDiv.innerHTML += `
      <div class="cart-item">
        <span>${item.name} (${item.qty})</span>
        <button onclick="removeItem(${item.id})">X</button>
      </div>
    `;
  });

  totalEl.textContent = total;
  countEl.textContent = count;
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

search.addEventListener("input", () => {
  const value = search.value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );
  renderProducts(filtered);
});

renderProducts(products);
renderCart();