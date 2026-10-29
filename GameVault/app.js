const games = {
"shadow-quest": { name: "Shadow Quest", price: 39.99, stock: 5 },
"street-rivals": { name: "Street Rivals", price: 49.99, stock: 5 },
"neon-strike": { name: "Neon Strike", price: 59.99, stock: 5 },
"galaxy-drift": { name: "Galaxy Drift", price: 29.99, stock: 0 },
"mystic-valley": { name: "Mystic Valley", price: 34.99, stock: 5 },
"turbo-league": { name: "Turbo League", price: 44.99, stock: 5 }

};

const cart = new Map();
const cartCount = document.querySelector("#cart-count");
const cartPanel = document.querySelector("#cart-panel");
const cartItems = document.querySelector("#cart-items");
const cartMessage = document.querySelector("#cart-message");
const cartTotal = document.querySelector("#cart-total");
const checkoutButton = document.querySelector("#checkout-button");
const toast = document.querySelector("#toast");
let toastTimer;

function money(value) {
return `US$ ${value.toFixed(2)}`;

}

function showToast(message) {
toast.textContent = message;
toast.classList.add("show");
clearTimeout(toastTimer);
toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);

}

function renderCart() {
const count = [...cart.values()].reduce((sum, item) => sum + item.quantity, 0);
const total = [...cart.values()].reduce((sum, item) => sum + item.price * item.quantity, 0);
cartCount.textContent = count;
cartItems.replaceChildren();

if (count === 0) {
cartMessage.textContent = "Tu carrito está vacío.";
cartMessage.hidden = false;
} else {
cartMessage.textContent = "Estos son los videojuegos que seleccionaste.";
cartMessage.hidden = false;
for (const item of cart.values()) {
const li = document.createElement("li");
const name = document.createElement("span");
const price = document.createElement("strong");
name.textContent = `${item.name} × ${item.quantity}`;
price.textContent = money(item.price * item.quantity);
li.append(name, price);
cartItems.append(li);

}
  
}

cartTotal.textContent = money(total);
checkoutButton.disabled = count === 0;

}

function addGame(id) {
const game = games[id];
if (!game) {
showToast("No se encontró el videojuego seleccionado.");
return;
  
}
  
if (game.stock <= 0) {
showToast(`${game.name} está agotado y no se puede añadir al carrito.`);
return;

}

const current = cart.get(id);
if (current) current.quantity += 1;
else cart.set(id, { name: game.name, price: game.price, quantity: 1 });
renderCart();
showToast(`${game.name} se añadió al carrito.`);

}

document.querySelectorAll("[data-add]").forEach(button => {
button.addEventListener("click", () => addGame(button.dataset.add));

});

document.querySelectorAll("[data-filter]").forEach(button => {
button.addEventListener("click", () => {
document.querySelectorAll("[data-filter]").forEach(item => item.classList.remove("active"));
button.classList.add("active");
const category = button.dataset.filter;
let visibleCount = 0;
document.querySelectorAll(".game-card").forEach(card => {
const visible = category === "Todos" || card.dataset.category === category;
card.hidden = !visible;
if (visible) visibleCount += 1;
    
});
    
document.querySelector("#empty-filter").hidden = visibleCount !== 0;

});

});

document.querySelector("#cart-button").addEventListener("click", () => {
cartPanel.classList.add("open");
cartPanel.scrollIntoView({ behavior: "smooth", block: "center" });

});

document.querySelector("#close-cart").addEventListener("click", () => cartPanel.classList.remove("open"));
checkoutButton.addEventListener("click", () => {
if (cart.size === 0) {
showToast("Añade al menos un videojuego antes de continuar.");
return;
  
}
  
showToast("¡Selección lista! El proceso de pago no está habilitado en esta práctica.");

});

renderCart();
