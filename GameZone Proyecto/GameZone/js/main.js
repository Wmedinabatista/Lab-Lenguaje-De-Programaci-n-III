(() => {
"use strict";

const DATA_URL = "data/menu.json";
const STORAGE_KEY = "gamezone-menu-v1";
const DEFAULT_MENU = [
{ id: "home", name: "Inicio", url: "#inicio", icon: "⌂", parentId: null },
{ id: "games", name: "Videojuegos", url: "#videojuegos", icon: "🎮", parentId: null, children: [
{ id: "action", name: "Acción", url: "#videojuegos", icon: "⚔️", parentId: "games" },
{ id: "adventure", name: "Aventura", url: "#videojuegos", icon: "🧭", parentId: "games" },
{ id: "sports", name: "Deportes", url: "#videojuegos", icon: "🏆", parentId: "games" },
{ id: "racing", name: "Carreras", url: "#videojuegos", icon: "🏎️", parentId: "games" }
    
]},
    
{ id: "platforms", name: "Plataformas", url: "#videojuegos", icon: "🕹️", parentId: null, children: [
{ id: "pc", name: "PC", url: "#videojuegos", icon: "💻", parentId: "platforms" },
{ id: "playstation", name: "PlayStation", url: "#videojuegos", icon: "🎮", parentId: "platforms" },
{ id: "xbox", name: "Xbox", url: "#videojuegos", icon: "🟩", parentId: "platforms" },
{ id: "nintendo", name: "Nintendo", url: "#videojuegos", icon: "🔴", parentId: "platforms" }
    
]},
    
{ id: "news", name: "Novedades", url: "#novedades", icon: "✦", parentId: null },
{ id: "community", name: "Comunidad", url: "#acerca", icon: "◉", parentId: null },
{ id: "about", name: "Acerca de", url: "#acerca", icon: "ⓘ", parentId: null }
  
];

const nav = document.getElementById("mainNav");
const categoryGrid = document.getElementById("categoryGrid");
const adminList = document.getElementById("adminList");
const menuForm = document.getElementById("menuForm");
const itemName = document.getElementById("itemName");
const itemUrl = document.getElementById("itemUrl");
const itemIcon = document.getElementById("itemIcon");
const itemParent = document.getElementById("itemParent");
const editingId = document.getElementById("editingId");
const formTitle = document.getElementById("formTitle");
const saveButton = document.getElementById("saveButton");
const cancelEdit = document.getElementById("cancelEdit");
const formMessage = document.getElementById("formMessage");
const itemCount = document.getElementById("itemCount");
const resetMenu = document.getElementById("resetMenu");
const toast = document.getElementById("toast");
const mobileMenuToggle = document.getElementById("mobileMenuToggle");

let menuItems = [];
let toastTimer;

function clone(value) {
return JSON.parse(JSON.stringify(value));
  
}

function flatten(items, output = []) {
items.forEach(item => {
output.push(item);
if (Array.isArray(item.children)) flatten(item.children, output);
    
});
    
return output;
  
}

function normalizeItems(items, parentId = null) {
if (!Array.isArray(items)) return [];
return items.map(item => ({
id: String(item.id ?? createId()),
name: String(item.name ?? item.nombre ?? "Opción"),
url: String(item.url ?? item.enlace ?? "#inicio"),
icon: String(item.icon ?? item.icono ?? "🎮"),
parentId: item.parentId ?? parentId,
children: Array.isArray(item.children)
? normalizeItems(item.children, String(item.id))
: (Array.isArray(item.submenu) ? normalizeItems(item.submenu, String(item.id)) : [])

}));
  
}

function createId() {
return "item-" + (window.crypto && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2, 8));
  
}

async function loadInitialData() {
try {
const response = await fetch(DATA_URL, { cache: "no-store" });
if (!response.ok) throw new Error("No se pudo leer menu.json");
const data = await response.json();
if (!data || !Array.isArray(data.menu)) throw new Error("El archivo JSON no contiene un arreglo menu");
return normalizeItems(data.menu);
} catch (error) {
console.warn("No fue posible cargar data/menu.json. Se usarán los datos de respaldo.", error);
return normalizeItems(DEFAULT_MENU);
    
}
  
}

async function initialize() {
const initialItems = await loadInitialData();
try {
const saved = localStorage.getItem(STORAGE_KEY);
menuItems = saved ? normalizeItems(JSON.parse(saved)) : initialItems;
} catch (error) {
console.warn("El almacenamiento local no pudo leerse; se usarán los datos iniciales.", error);
menuItems = initialItems;

}
    
persistAndRender(false);
  
}

function persistAndRender(showNotice = false) {
try {
localStorage.setItem(STORAGE_KEY, JSON.stringify(menuItems));
} catch (error) {
console.warn("No fue posible guardar en localStorage.", error);
if (showNotice) showToast("No se pudieron guardar los cambios en este navegador.");
    
}
    
renderAll();
if (showNotice) showToast("Menú actualizado correctamente.");
  
}

function renderAll() {
renderNavigation();
renderCategories();
renderAdminList();
renderParentOptions();
  
}

function createElement(tag, className, text) {
const element = document.createElement(tag);
if (className) element.className = className;
if (text !== undefined && text !== null) element.textContent = text;
return element;
  
}

function createMenuNode(item, depth = 0) {
const li = createElement("li", "nav-item");
const hasChildren = item.children && item.children.length > 0;
if (hasChildren) {
const button = createElement("button", "nav-trigger");
button.type = "button";
button.setAttribute("aria-expanded", "false");
button.append(document.createTextNode(item.name + " "));
const chevron = createElement("span", "chevron", "⌄");
chevron.setAttribute("aria-hidden", "true");
button.appendChild(chevron);
button.addEventListener("click", () => {
const isOpen = li.classList.toggle("open");
button.setAttribute("aria-expanded", String(isOpen));

});
      
li.appendChild(button);
const sub = createElement("ul", "submenu");
item.children.forEach(child => sub.appendChild(createMenuNode(child, depth + 1)));
li.appendChild(sub);
} else {
const link = createElement("a", "nav-link", item.name);
link.href = safeUrl(item.url) ? item.url : "#inicio";
link.addEventListener("click", () => {
nav.querySelectorAll(".nav-item.open").forEach(openItem => {
openItem.classList.remove("open");
const trigger = openItem.querySelector(":scope > .nav-trigger");
if (trigger) trigger.setAttribute("aria-expanded", "false");
        
});
        
if (window.innerWidth <= 760) {
nav.classList.remove("mobile-open");
mobileMenuToggle.setAttribute("aria-expanded", "false");
        
}
      
});
      
li.appendChild(link);
    
}
    
return li;
  
}

function renderNavigation() {
nav.replaceChildren();
const list = createElement("ul", "nav-root");
// The nav root itself uses flex layout; no menu label is hard-coded in HTML.
list.style.display = "contents";
menuItems.forEach(item => list.appendChild(createMenuNode(item)));
nav.appendChild(list);
  
}

function renderCategories() {
categoryGrid.replaceChildren();
const parentsWithChildren = menuItems.filter(item => item.children && item.children.length);
const cards = parentsWithChildren.flatMap(parent => parent.children.map(child => ({
...child,
description: "Explora esta categoría dentro del universo GameZone."
    
})));
    
const topLevel = menuItems.filter(item => !["home", "news", "community", "about"].includes(item.id) && (!item.children || !item.children.length));
const allCards = cards.length ? cards.slice(0, 8) : topLevel;
if (!allCards.length) {
categoryGrid.appendChild(createElement("p", "empty-state", "Todavía no hay categorías. Agrega opciones desde el panel de administración."));
return;
    
}

allCards.forEach(item => {
const card = createElement("a", "category-card");
card.href = safeUrl(item.url) ? item.url : "#videojuegos";
const icon = createElement("span", "category-icon", item.icon || "🎮");
icon.setAttribute("aria-hidden", "true");
const arrow = createElement("span", "category-arrow", "↗");
arrow.setAttribute("aria-hidden", "true");
const title = createElement("h3", "", item.name);
const description = createElement("p", "", item.description);
card.append(icon, arrow, title, description);
categoryGrid.appendChild(card);
    
});
  
}

function renderAdminList() {
adminList.replaceChildren();
const allItems = flatten(menuItems);
itemCount.textContent = `${allItems.length} ${allItems.length === 1 ? "opción registrada" : "opciones registradas"}`;
if (!allItems.length) {
adminList.appendChild(createElement("p", "empty-state", "No hay opciones registradas. Utiliza el formulario para agregar una."));
return;
    
}
    
allItems.forEach(item => {
const row = createElement("div", "admin-row");
const main = createElement("div", "admin-row-main");
const icon = createElement("span", "admin-row-icon", item.icon || "🎮");
icon.setAttribute("aria-hidden", "true");
const copy = createElement("div", "admin-row-copy");
copy.appendChild(createElement("strong", "", item.name));
const parent = findParentName(item.parentId);
copy.appendChild(createElement("small", "", `${parent ? "Submenú de " + parent + " · " : ""}${item.url}`));
main.append(icon, copy);
const actions = createElement("div", "admin-row-actions");
const edit = createElement("button", "icon-button", "✎");
edit.type = "button";
edit.title = "Editar " + item.name;
edit.setAttribute("aria-label", "Editar " + item.name);
edit.addEventListener("click", () => startEdit(item));
const remove = createElement("button", "icon-button delete", "×");
remove.type = "button";
remove.title = "Eliminar " + item.name;
remove.setAttribute("aria-label", "Eliminar " + item.name);
remove.addEventListener("click", () => deleteItem(item.id));
actions.append(edit, remove);
row.append(main, actions);
adminList.appendChild(row);
    
});
  
}

function renderParentOptions(selected = "") {
const currentValue = selected || itemParent.value || "";
itemParent.replaceChildren();
itemParent.appendChild(new Option("Opción principal", ""));
menuItems.forEach(item => {
const option = new Option(item.name, item.id);
if (item.id === editingId.value) option.disabled = true;
itemParent.appendChild(option);

});
    
if ([...itemParent.options].some(option => option.value === currentValue)) itemParent.value = currentValue;
  
}

function findItem(id, items = menuItems) {
for (const item of items) {
if (item.id === id) return item;
const found = findItem(id, item.children || []);
if (found) return found;
    
}
    
return null;
  
}

function findParentName(parentId) {
if (!parentId) return "";
const parent = findItem(parentId);
return parent ? parent.name : "";
  
}

function findContainer(id, items = menuItems) {
for (const item of items) {
if (item.children && item.children.some(child => child.id === id)) return item.children;
const found = findContainer(id, item.children || []);
if (found) return found;
    
}
    
return null;
  
}

function safeUrl(value) {
const url = String(value || "").trim();
if (!url || /[\u0000-\u001F\u007F]/.test(url)) return false;
if (url.startsWith("#") || url.startsWith("/") || url.startsWith("./") || url.startsWith("../")) return true;
try {
const parsed = new URL(url, window.location.origin);
return parsed.protocol === "http:" || parsed.protocol === "https:";
} catch {
return false;
    
}
  
}

function setMessage(message, isError = false) {
formMessage.textContent = message;
formMessage.classList.toggle("error", isError);
  
}

function startEdit(item) {
editingId.value = item.id;
itemName.value = item.name;
itemUrl.value = item.url;
itemIcon.value = item.icon || "";
renderParentOptions(item.parentId || "");
formTitle.textContent = "Editar opción";
saveButton.innerHTML = "Guardar cambios <span aria-hidden=\"true\">→</span>";
cancelEdit.classList.remove("hidden");
setMessage("Editando: " + item.name);
document.getElementById("administrar").scrollIntoView({ behavior: "smooth", block: "start" });
itemName.focus({ preventScroll: true });
  
}

function clearForm() {
menuForm.reset();
editingId.value = "";
formTitle.textContent = "Agregar opción";
saveButton.innerHTML = "Guardar opción <span aria-hidden=\"true\">→</span>";
cancelEdit.classList.add("hidden");
setMessage("");
renderParentOptions("");
  
}

function isDescendant(candidateId, itemId) {
const item = findItem(itemId);
if (!item || !item.children) return false;
return item.children.some(child => child.id === candidateId || isDescendant(candidateId, child.id));
  
}

menuForm.addEventListener("submit", event => {
event.preventDefault();
const name = itemName.value.trim();
const url = itemUrl.value.trim();
const icon = itemIcon.value.trim() || "🎮";
const parentId = itemParent.value || null;
const currentId = editingId.value;

if (name.length < 2) return setMessage("El nombre debe tener al menos 2 caracteres.", true);
if (!safeUrl(url)) return setMessage("Introduce un enlace válido: por ejemplo #videojuegos o https://ejemplo.com.", true);
if (parentId && !findItem(parentId)) return setMessage("La ubicación seleccionada no es válida.", true);
if (currentId && (parentId === currentId || (parentId && isDescendant(parentId, currentId)))) {
return setMessage("Una opción no puede convertirse en submenú de sí misma ni de uno de sus descendientes.", true);
    
}

const allItems = flatten(menuItems);
const duplicate = allItems.some(item => item.name.toLocaleLowerCase() === name.toLocaleLowerCase() && item.id !== currentId && item.parentId === parentId);
if (duplicate) return setMessage("Ya existe una opción con ese nombre en esta ubicación.", true);

if (currentId) {
const item = findItem(currentId);
if (!item) return setMessage("No se encontró la opción que intentas editar. Actualiza la página e inténtalo de nuevo.", true);
const oldParentId = item.parentId;
if (oldParentId !== parentId) {
const oldContainer = oldParentId ? findContainer(currentId) : menuItems;
if (oldContainer) {
const index = oldContainer.findIndex(entry => entry.id === currentId);
if (index >= 0) oldContainer.splice(index, 1);

}
        
const newContainer = parentId ? findItem(parentId).children : menuItems;
if (!findItem(parentId) && parentId) return setMessage("No se encontró el menú padre.", true);
if (!Array.isArray(newContainer)) return setMessage("No se pudo localizar la ubicación seleccionada.", true);
item.parentId = parentId;
newContainer.push(item);
      
}
      
item.name = name;
item.url = url;
item.icon = icon;
if (item.children) item.children.forEach(child => { child.parentId = item.id; });
clearForm();
persistAndRender(true);
} else {
const newItem = { id: createId(), name, url, icon, parentId, children: [] };
const container = parentId ? findItem(parentId).children : menuItems;
container.push(newItem);
clearForm();
persistAndRender(true);
    
}
  
});

function deleteItem(id) {
const item = findItem(id);
if (!item) return;
const hasChildren = item.children && item.children.length > 0;
const message = hasChildren
? `¿Eliminar "${item.name}" y todas sus opciones secundarias?`
: `¿Eliminar la opción "${item.name}"?`;
if (!window.confirm(message)) return;
const container = item.parentId ? findContainer(id) : menuItems;
if (!container) return;
const index = container.findIndex(entry => entry.id === id);
if (index >= 0) container.splice(index, 1);
if (editingId.value === id) clearForm();
persistAndRender(true);
  
}

cancelEdit.addEventListener("click", clearForm);

resetMenu.addEventListener("click", () => {
if (!window.confirm("¿Restaurar el menú inicial? Se perderán los cambios guardados en este navegador.")) return;
menuItems = normalizeItems(DEFAULT_MENU);
clearForm();
persistAndRender(true);
showToast("Se restauró el menú de ejemplo.");
  
});

mobileMenuToggle.addEventListener("click", () => {
const isOpen = nav.classList.toggle("mobile-open");
mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
mobileMenuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
mobileMenuToggle.textContent = isOpen ? "×" : "☰";
  
});

function showToast(message) {
toast.textContent = message;
toast.classList.add("show");
clearTimeout(toastTimer);
toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  
}

initialize();

})();
